<script lang="ts">
  import { Calculator, Plus, X } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Segmented, TextField } from '$lib/components/ds';
  import {
    DEFAULT_LOCALE,
    NUMBER_LOCALES,
    applyDecrease,
    applyIncrease,
    displayNumber,
    formatNumber,
    formatPercent,
    isNumberLocale,
    parseNumber,
    percentChange,
    percentDifference,
    percentOf,
    reversePercent,
    stackedDiscount,
    whatPercent,
    type Calc,
    type NumberLocale,
    type Parsed
  } from '$lib/tools/percent';

  const LOCALE_KEY = 'percentCalc.locale';

  function loadLocale(): NumberLocale {
    try {
      const saved = localStorage.getItem(LOCALE_KEY);
      return isNumberLocale(saved) ? saved : DEFAULT_LOCALE;
    } catch {
      return DEFAULT_LOCALE;
    }
  }

  let locale = $state<NumberLocale>(loadLocale());

  // Every inline input, as typed (in the current number format).
  type Key = 'ofP' | 'ofX' | 'whatX' | 'whatY' | 'chA' | 'chB' | 'adjX' | 'adjP' | 'revR' | 'revP' | 'discPrice';
  const initial: Record<Key, number> = {
    ofP: 15, ofX: 250000, whatX: 25, whatY: 200, chA: 80, chB: 100,
    adjX: 250000, adjP: 11, revR: 37500, revP: 15, discPrice: 100000
  };
  const toText = (n: number, loc: NumberLocale) => formatNumber(n, loc, 10);
  let text = $state(
    Object.fromEntries(Object.entries(initial).map(([k, n]) => [k, toText(n, locale)])) as Record<Key, string>
  );
  let discounts = $state<string[]>(['50', '20']);
  let direction = $state<'increase' | 'decrease'>('increase');

  /** Switch number format and rewrite what's typed so values keep their meaning. */
  function changeLocale(next: string) {
    if (!isNumberLocale(next)) return;
    const prev = locale;
    const convert = (s: string) => {
      const p = parseNumber(s, prev);
      return p.ok ? toText(p.value, next) : s;
    };
    for (const k of Object.keys(text) as Key[]) text[k] = convert(text[k]);
    discounts = discounts.map(convert);
    locale = next;
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* storage blocked: keep in memory */
    }
  }

  const n = $derived(
    Object.fromEntries((Object.keys(text) as Key[]).map(k => [k, parseNumber(text[k], locale)])) as Record<Key, Parsed>
  );
  const discParsed = $derived(discounts.map(d => parseNumber(d, locale)));

  type Out =
    | { state: 'empty' }
    | { state: 'error'; message: string }
    | { state: 'ok'; main: string; copy: string; formula: string; extra?: string; tone?: 'up' | 'down' };

  /** Read numbers from the given fields; an empty or invalid one short-circuits to a message. */
  function read(keys: Key[]): number[] | Out {
    const vals: number[] = [];
    for (const k of keys) {
      const p = n[k];
      if (!p.ok) return p.empty ? { state: 'empty' } : { state: 'error', message: p.message };
      vals.push(p.value);
    }
    return vals;
  }
  const isBad = (p: Parsed | undefined) => !!p && !p.ok && !p.empty;
  const fail = (r: Calc): Out => ({ state: 'error', message: r.ok ? '' : r.message });

  const f = (v: number) => displayNumber(v, locale, 4);
  const pc = (v: number, sign = false) => formatPercent(v, locale, { sign, maxDecimals: 4 });

  const outOf = $derived.by((): Out => {
    const v = read(['ofP', 'ofX']);
    if (!Array.isArray(v)) return v;
    const [p, x] = v;
    const r = percentOf(p, x);
    if (!r.ok) return fail(r);
    return { state: 'ok', main: f(r.value), copy: formatNumber(r.value, locale, 4), formula: `${f(p)} ÷ 100 × ${f(x)} = ${f(r.value)}` };
  });

  const outWhat = $derived.by((): Out => {
    const v = read(['whatX', 'whatY']);
    if (!Array.isArray(v)) return v;
    const [x, y] = v;
    const r = whatPercent(x, y);
    if (!r.ok) return fail(r);
    return { state: 'ok', main: pc(r.value), copy: pc(r.value), formula: `${f(x)} ÷ ${f(y)} × 100 = ${pc(r.value)}` };
  });

  const outChange = $derived.by((): Out => {
    const v = read(['chA', 'chB']);
    if (!Array.isArray(v)) return v;
    const [a, b] = v;
    const r = percentChange(a, b);
    if (!r.ok) return fail(r);
    const d = percentDifference(a, b);
    return {
      state: 'ok',
      main: pc(r.value, true),
      copy: pc(r.value, true),
      tone: r.value > 0 ? 'up' : r.value < 0 ? 'down' : undefined,
      formula: `(${f(b)} − ${f(a)}) ÷ |${f(a)}| × 100 = ${pc(r.value, true)}`,
      extra: d.ok
        ? `Not to be confused with the symmetric % difference (gap ÷ average of both): ${pc(d.value)}.`
        : undefined
    };
  });

  const outAdjust = $derived.by((): Out => {
    const v = read(['adjX', 'adjP']);
    if (!Array.isArray(v)) return v;
    const [x, p] = v;
    const up = direction === 'increase';
    const r = up ? applyIncrease(x, p) : applyDecrease(x, p);
    if (!r.ok) return fail(r);
    const delta = r.value - x;
    return {
      state: 'ok',
      main: f(r.value),
      copy: formatNumber(r.value, locale, 4),
      formula: `${f(x)} × (1 ${up ? '+' : '−'} ${f(p)} ÷ 100) = ${f(r.value)}`,
      extra: `Change: ${delta > 0 ? '+' : ''}${f(delta)}.`
    };
  });

  const outReverse = $derived.by((): Out => {
    const v = read(['revR', 'revP']);
    if (!Array.isArray(v)) return v;
    const [res, p] = v;
    const r = reversePercent(res, p);
    if (!r.ok) return fail(r);
    return { state: 'ok', main: f(r.value), copy: formatNumber(r.value, locale, 4), formula: `${f(res)} ÷ ${f(p)} × 100 = ${f(r.value)}` };
  });

  const outStacked = $derived.by((): Out => {
    const v = read(['discPrice']);
    if (!Array.isArray(v)) return v;
    const ps: number[] = [];
    for (const d of discParsed) {
      if (!d.ok) {
        if (d.empty) continue;
        return { state: 'error', message: d.message };
      }
      ps.push(d.value);
    }
    if (ps.length === 0) return { state: 'empty' };
    const r = stackedDiscount(v[0], ps);
    if (!r.ok) return fail(r);
    return {
      state: 'ok',
      main: f(r.value),
      copy: formatNumber(r.value, locale, 4),
      formula: r.steps.map(s => `${pc(s.percent)} off ${f(s.before)} → ${f(s.after)}`).join(' · '),
      extra:
        `Total discount ${pc(r.effective)}, you save ${f(r.saved)}.` +
        (ps.length > 1 ? ` Stacked discounts don't add up: not ${pc(ps.reduce((a, b) => a + b, 0))}.` : '')
    };
  });

  function addDiscount() {
    discounts = [...discounts, ''];
  }
  function removeDiscount(i: number) {
    discounts = discounts.filter((_, j) => j !== i);
  }

  const ph = $derived({ big: formatNumber(250000, locale), pct: formatNumber(12.5, locale) });
</script>

{#snippet field(k: Key, label: string, out: string, width: string, suffix?: string)}
  <span class={width}>
    <TextField
      bind:value={text[k]}
      aria-label={label}
      aria-invalid={isBad(n[k]) ? 'true' : undefined}
      aria-describedby={isBad(n[k]) ? out : undefined}
      {suffix}
      inputmode="decimal"
      autocomplete="off"
      placeholder={suffix ? ph.pct : ph.big}
      class="tabular-nums"
    />
  </span>
{/snippet}

{#snippet result(id: string, out: Out)}
  <div id={id} class="flex min-h-20 flex-col justify-center gap-2 rounded-md bg-sunken px-4 py-3" aria-live="polite">
    {#if out.state === 'empty'}
      <p class="text-body-sm text-ink-muted">Fill in the numbers to see the answer.</p>
    {:else if out.state === 'error'}
      <p class="text-body-sm text-negative">{out.message}</p>
    {:else}
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p
          class="font-display text-title tabular-nums break-all {out.tone === 'up' ? 'text-live' : out.tone === 'down' ? 'text-negative' : 'text-ink'}"
        >
          {#if out.tone === 'up'}<span aria-hidden="true">▲ </span>{:else if out.tone === 'down'}<span aria-hidden="true">▼ </span>{/if}{out.main}
        </p>
        <CopyChip value={out.copy}>Copy</CopyChip>
      </div>
      <p class="font-mono text-body-sm text-ink-muted tabular-nums">{out.formula}</p>
      {#if out.extra}<p class="text-body-sm text-ink-muted">{out.extra}</p>{/if}
    {/if}
  </div>
{/snippet}

<ToolLayout
  title="Percentage Calculator"
  description="Percent of a number, what percent one number is of another, percentage change, increase/decrease, reverse percentages and stacked discounts."
  icon={Calculator}
  color="warning"
>
  <div class="mx-auto flex max-w-3xl flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-card px-5 py-4">
      <span class="text-label text-ink-muted">Number format</span>
      <div class="w-64 max-w-full">
        <Segmented label="Number format" options={NUMBER_LOCALES} value={locale} onchange={changeLocale} />
      </div>
    </div>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-of-h">
      <h2 id="pct-of-h" class="text-label text-ink-muted">Percent of a number</h2>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        What is {@render field('ofP', 'Percentage', 'pct-of-out', 'w-32', '%')} of {@render field('ofX', 'Number', 'pct-of-out', 'w-44')}?
      </div>
      {@render result('pct-of-out', outOf)}
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-what-h">
      <h2 id="pct-what-h" class="text-label text-ink-muted">What percent</h2>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        {@render field('whatX', 'Part', 'pct-what-out', 'w-40')} is what % of {@render field('whatY', 'Whole', 'pct-what-out', 'w-44')}?
      </div>
      {@render result('pct-what-out', outWhat)}
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-ch-h">
      <h2 id="pct-ch-h" class="text-label text-ink-muted">Percentage change</h2>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        % change from {@render field('chA', 'Old value (from)', 'pct-ch-out', 'w-40')} to {@render field('chB', 'New value (to)', 'pct-ch-out', 'w-40')}
      </div>
      {@render result('pct-ch-out', outChange)}
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-adj-h">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="pct-adj-h" class="text-label text-ink-muted">Increase or decrease</h2>
        <div class="w-56 max-w-full">
          <Segmented
            label="Direction"
            options={[{ value: 'increase', label: 'Increase' }, { value: 'decrease', label: 'Decrease' }]}
            bind:value={direction}
          />
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        {direction === 'increase' ? 'Increase' : 'Decrease'}
        {@render field('adjX', 'Number', 'pct-adj-out', 'w-44')} by {@render field('adjP', 'Percentage', 'pct-adj-out', 'w-32', '%')}
      </div>
      {@render result('pct-adj-out', outAdjust)}
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-rev-h">
      <h2 id="pct-rev-h" class="text-label text-ink-muted">Reverse percentage</h2>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        {@render field('revR', 'Known amount', 'pct-rev-out', 'w-40')} is {@render field('revP', 'Percentage', 'pct-rev-out', 'w-32', '%')} of what?
      </div>
      {@render result('pct-rev-out', outReverse)}
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-5" aria-labelledby="pct-disc-h">
      <h2 id="pct-disc-h" class="text-label text-ink-muted">Stacked discount</h2>
      <div class="flex flex-wrap items-center gap-2 text-body-lg text-ink">
        Price {@render field('discPrice', 'Price', 'pct-disc-out', 'w-44')}, discounts
        {#each discParsed as parsed, i (i)}
          {#if i > 0}<span aria-hidden="true">+</span>{/if}
          <span class="flex items-center gap-1">
            <span class="w-28">
              <TextField
                bind:value={discounts[i]}
                aria-label="Discount {i + 1}"
                aria-invalid={isBad(parsed) ? 'true' : undefined}
                aria-describedby={isBad(parsed) ? 'pct-disc-out' : undefined}
                suffix="%"
                inputmode="decimal"
                autocomplete="off"
                placeholder="10"
                class="tabular-nums"
              />
            </span>
            {#if discounts.length > 1}
              <IconButton label="Remove discount {i + 1}" onclick={() => removeDiscount(i)}><X /></IconButton>
            {/if}
          </span>
        {/each}
        {#if discounts.length < 5}
          <Button variant="secondary" size="sm" onclick={addDiscount}>
            {#snippet icon()}<Plus class="size-4" />{/snippet}
            Add discount
          </Button>
        {/if}
      </div>
      {@render result('pct-disc-out', outStacked)}
    </section>

    <p class="px-1 text-body-sm text-ink-muted">
      Splitting a bill with tip, service and tax? Use the <a href="/tools/tip-calculator" class="text-accent-text underline">Tip Calculator</a>.
    </p>
  </div>
</ToolLayout>
