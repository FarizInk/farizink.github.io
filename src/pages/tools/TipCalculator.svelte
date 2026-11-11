<script lang="ts">
  import { Calculator, Minus, Plus, RotateCcw } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Segmented, Select, StatTile, Switch, TextField, type Option } from '$lib/components/ds';
  import {
    CURRENCIES,
    CURRENCY_CODES,
    DEFAULT_CURRENCY,
    MAX_PEOPLE,
    billSummary,
    calculateBill,
    describeShares,
    formatMoney,
    formatPctNumber,
    formatPlain,
    isCurrencyCode,
    parseAmount,
    parsePercent,
    rescaleMinor,
    type CurrencyCode,
    type TipBase
  } from '$lib/tools/bill';

  type RateKey = 'service' | 'tax' | 'tip';

  const STORAGE_KEY = 'tipCalculator.currency';

  function loadCurrency(): CurrencyCode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isCurrencyCode(saved)) return saved;
    } catch {
      /* storage blocked: use the default */
    }
    return DEFAULT_CURRENCY;
  }

  function defaultsFor(c: CurrencyCode) {
    const { defaults, locale } = CURRENCIES[c];
    return {
      rates: {
        service: formatPctNumber(defaults.service, locale),
        tax: formatPctNumber(defaults.tax, locale),
        tip: formatPctNumber(defaults.tip, locale)
      } as Record<RateKey, string>,
      taxOnService: defaults.taxOnService,
      tipBase: defaults.tipBase
    };
  }

  const initialCode = loadCurrency();
  const initial = defaultsFor(initialCode);

  let code = $state<CurrencyCode>(initialCode);
  let billText = $state('');
  let rates = $state<Record<RateKey, string>>(initial.rates);
  let taxOnService = $state(initial.taxOnService);
  let tipBase = $state<TipBase>(initial.tipBase);
  let peopleText = $state('2');
  let roundStep = $state('0');

  const cur = $derived(CURRENCIES[code]);

  const currencyOptions: Option[] = CURRENCY_CODES.map((c) => ({
    value: c,
    label: `${c} · ${CURRENCIES[c].name}`,
    hint: CURRENCIES[c].prefix
  }));
  const tipBaseOptions = [
    { value: 'subtotal', label: 'Subtotal' },
    { value: 'afterCharges', label: 'After service & tax' }
  ];
  const roundOptions: Option[] = $derived([
    { value: '0', label: 'Exact split' },
    ...cur.roundSteps.map((s) => ({ value: String(s), label: `Up to nearest ${formatMoney(s, code)}` }))
  ]);

  // ---- Parsing (live) ----
  const billParsed = $derived(billText.trim() ? parseAmount(billText, cur.locale, cur.decimals) : null);
  const billError = $derived(billParsed && !billParsed.ok ? billParsed.error : undefined);
  const parsedRates = $derived({
    service: parsePercent(rates.service, cur.locale),
    tax: parsePercent(rates.tax, cur.locale),
    tip: parsePercent(rates.tip, cur.locale)
  });
  const pct = (k: RateKey) => {
    const r = parsedRates[k];
    return r.ok ? r.pct : NaN;
  };
  const people = $derived(/^\d+$/.test(peopleText.trim()) ? Number(peopleText.trim()) : NaN);
  const peopleError = $derived(
    !Number.isInteger(people) || people < 1
      ? 'Split between at least 1 person.'
      : people > MAX_PEOPLE
        ? `Split between at most ${MAX_PEOPLE} people.`
        : undefined
  );

  const inputsOk = $derived(
    billParsed?.ok === true && !peopleError && parsedRates.service.ok && parsedRates.tax.ok && parsedRates.tip.ok
  );
  const result = $derived(
    inputsOk && billParsed?.ok
      ? calculateBill({
          subtotal: billParsed.minor,
          servicePct: pct('service'),
          taxPct: pct('tax'),
          tipPct: pct('tip'),
          taxOnService,
          tipBase,
          people,
          rounding: Number(roundStep)
        })
      : null
  );
  const bill = $derived(result?.ok ? result : null);
  const money = (minor: number) => formatMoney(minor, code);
  const pctLabel = (k: RateKey) => `${formatPctNumber(pct(k), cur.locale)}%`;

  const rounded = $derived(bill?.rounded && bill.rounded.overpay > 0 ? bill.rounded : null);
  const headline = $derived.by(() => {
    if (!bill) return '';
    const groups = rounded ? rounded.groups : bill.groups;
    return money(groups[0].amount);
  });
  const caption = $derived.by(() => {
    if (!bill) return '';
    if (rounded) {
      const each = rounded.groups.length === 1 ? '' : `${describeShares(rounded.groups, code)} · `;
      return `${each}Rounded up to ${money(rounded.step)}, ${money(rounded.overpay)} over the bill in total. Exact: ${describeShares(bill.groups, code)}.`;
    }
    if (bill.people === 1) return 'One person pays the whole bill.';
    if (bill.groups.length === 1) return `Each of ${bill.people} people pays the same.`;
    return `${describeShares(bill.groups, code)}. Shares differ by ${money(1)} so they add up to the exact total.`;
  });
  const summary = $derived(
    bill ? billSummary(bill, { servicePct: pct('service'), taxPct: pct('tax'), tipPct: pct('tip') }, code) : ''
  );

  const rows = $derived.by(() => {
    if (!bill) return [];
    const list: { label: string; value: string }[] = [{ label: 'Subtotal', value: money(bill.subtotal) }];
    if (bill.service || pct('service') > 0) list.push({ label: `Service ${pctLabel('service')}`, value: money(bill.service) });
    if (bill.tax || pct('tax') > 0) list.push({ label: `${cur.taxName} ${pctLabel('tax')}`, value: money(bill.tax) });
    if (bill.tip || pct('tip') > 0) list.push({ label: `Tip ${pctLabel('tip')}`, value: money(bill.tip) });
    return list;
  });

  // ---- Actions ----
  function changeCurrency(next: string) {
    if (!isCurrencyCode(next) || next === code) return;
    const prev = CURRENCIES[code];
    if (billParsed?.ok) {
      billText = formatPlain(rescaleMinor(billParsed.minor, prev.decimals, CURRENCIES[next].decimals), next);
    }
    const d = defaultsFor(next);
    code = next;
    rates = d.rates;
    taxOnService = d.taxOnService;
    tipBase = d.tipBase;
    roundStep = '0';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked: choice lasts for this visit */
    }
  }

  function setPeople(n: number) {
    peopleText = String(Math.min(MAX_PEOPLE, Math.max(1, n)));
  }

  function reset() {
    const d = defaultsFor(code);
    billText = '';
    rates = d.rates;
    taxOnService = d.taxOnService;
    tipBase = d.tipBase;
    peopleText = '2';
    roundStep = '0';
  }

  const rateRows = $derived<{ key: RateKey; label: string; hint: string; presets: number[] }[]>([
    { key: 'service', label: 'Service charge', hint: 'Added to the subtotal.', presets: cur.servicePresets },
    {
      key: 'tax',
      label: `Tax (${cur.taxName})`,
      hint: taxOnService ? 'Charged on subtotal + service.' : 'Charged on the subtotal only.',
      presets: cur.taxPresets
    },
    { key: 'tip', label: 'Tip', hint: 'Optional, on top of the bill.', presets: cur.tipPresets }
  ]);
</script>

<ToolLayout
  title="Tip Calculator"
  description="Split a bill with service charge, tax and tip. Exact per-person shares in rupiah or any currency, with optional round-up."
  icon={Calculator}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <!-- Inputs -->
    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="tip-bill-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="tip-bill-title" class="text-label text-ink-muted">Bill</h2>
        <Button variant="ghost" size="sm" onclick={reset}>
          {#snippet icon()}<RotateCcw class="size-4" />{/snippet}
          Reset
        </Button>
      </div>

      <div class="grid gap-4 sm:grid-cols-[2fr_3fr]">
        <Select label="Currency" options={currencyOptions} value={code} onchange={changeCurrency} />
        <TextField
          label="Bill amount"
          prefix={cur.prefix}
          inputmode="decimal"
          autocomplete="off"
          placeholder={formatPlain(cur.decimals ? 15000050 : 150000, code)}
          hint={billError ? undefined : `Before service and tax. ${formatPlain(cur.decimals ? 15000050 : 150000, code)} works.`}
          error={billError}
          bind:value={billText}
          class="tabular-nums"
        />
      </div>

      {#each rateRows as row (row.key)}
        {@const parsed = parsedRates[row.key]}
        <div class="flex flex-col gap-2" role="group" aria-labelledby="tip-rate-{row.key}">
          <span id="tip-rate-{row.key}" class="fz-field-label">{row.label}</span>
          <div class="flex flex-wrap items-start gap-2">
            <div class="flex flex-wrap gap-2 pt-1.5">
              {#each row.presets as p (p)}
                {@const active = parsed.ok && parsed.pct === p}
                <Button
                  size="sm"
                  variant={active ? 'primary' : 'secondary'}
                  aria-pressed={active}
                  aria-label="{row.label} {p}%"
                  onclick={() => (rates[row.key] = formatPctNumber(p, cur.locale))}
                >
                  {formatPctNumber(p, cur.locale)}%
                </Button>
              {/each}
            </div>
            <div class="w-32">
              <TextField
                bind:value={rates[row.key]}
                suffix="%"
                inputmode="decimal"
                autocomplete="off"
                placeholder="0"
                aria-label="Custom {row.label.toLowerCase()} percentage"
                error={parsed.ok ? undefined : parsed.error}
                class="tabular-nums"
              />
            </div>
          </div>
          {#if parsed.ok}<p class="fz-field-hint">{row.hint}</p>{/if}
        </div>

        {#if row.key === 'tax'}
          <Switch
            bind:checked={taxOnService}
            label="Tax applies to service charge"
            description="Usual for PB1 in Indonesian restaurants."
          />
        {/if}
      {/each}

      {#if pct('tip') > 0}
        <div class="flex flex-col gap-2">
          <span class="fz-field-label">Tip is calculated on</span>
          <Segmented
            label="Tip is calculated on"
            options={tipBaseOptions}
            value={tipBase}
            onchange={(v) => (tipBase = v === 'afterCharges' ? 'afterCharges' : 'subtotal')}
          />
        </div>
      {/if}

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex flex-col gap-2">
          <label for="tip-people" class="fz-field-label">People</label>
          <div class="flex items-start gap-2">
            <span class="pt-0.5">
              <IconButton label="One person fewer" onclick={() => setPeople((Number.isNaN(people) ? 2 : people) - 1)}>
                <Minus />
              </IconButton>
            </span>
            <div class="w-24">
              <TextField
                id="tip-people"
                bind:value={peopleText}
                inputmode="numeric"
                autocomplete="off"
                error={peopleError}
                class="text-center tabular-nums"
              />
            </div>
            <span class="pt-0.5">
              <IconButton label="One person more" onclick={() => setPeople((Number.isNaN(people) ? 0 : people) + 1)}>
                <Plus />
              </IconButton>
            </span>
          </div>
        </div>
        <Select label="Round each share" options={roundOptions} bind:value={roundStep} />
      </div>
    </section>

    <!-- Results -->
    <section class="flex flex-col gap-4" aria-labelledby="tip-result-title" aria-live="polite">
      <h2 id="tip-result-title" class="sr-only">Result</h2>
      {#if bill}
        <StatTile
          tone="lime"
          label={rounded ? 'Each pays (rounded)' : bill.people === 1 ? 'Total to pay' : 'Per person'}
          value={headline}
          {caption}
        />

        <div class="flex flex-col gap-4 rounded-lg bg-card p-6">
          <h3 class="text-label text-ink-muted">Breakdown</h3>
          <dl class="flex flex-col gap-2 text-body">
            {#each rows as r (r.label)}
              <div class="flex items-baseline justify-between gap-4">
                <dt class="text-ink-muted">{r.label}</dt>
                <dd class="font-mono tabular-nums text-ink">{r.value}</dd>
              </div>
            {/each}
            <div class="mt-1 flex items-baseline justify-between gap-4 rounded-md bg-control px-4 py-3">
              <dt class="font-medium text-ink">Total</dt>
              <dd class="font-mono text-body-lg font-medium tabular-nums text-ink">{money(bill.total)}</dd>
            </div>
            {#if rounded}
              <div class="flex items-baseline justify-between gap-4">
                <dt class="text-ink-muted">Collected after rounding</dt>
                <dd class="font-mono tabular-nums text-ink">{money(rounded.total)}</dd>
              </div>
            {/if}
          </dl>
          <div>
            <CopyChip value={summary}>Copy summary</CopyChip>
          </div>
        </div>
      {:else}
        <div class="flex flex-col gap-2 rounded-lg bg-card p-6">
          <h3 class="text-label text-ink-muted">Per person</h3>
          <p class="text-body text-ink-muted">
            {#if result && !result.ok}
              ▼ {result.error}
            {:else if billError || peopleError || (billParsed && !inputsOk)}
              Fix the highlighted field to see the split.
            {:else}
              Enter the bill amount to see each person's share.
            {/if}
          </p>
        </div>
      {/if}
    </section>
  </div>
</ToolLayout>
