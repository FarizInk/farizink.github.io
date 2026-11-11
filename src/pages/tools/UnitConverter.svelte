<script lang="ts">
  import { ArrowUpDown, Calculator, History, Trash2 } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Select, TextField, type Option } from '$lib/components/ds';
  import {
    CATEGORIES,
    convert,
    formatResult,
    getCategory,
    getUnit,
    inputError,
    isCategoryId,
    parseNumber,
    unitLabel,
    type CategoryId
  } from '$lib/tools/units';

  type Side = 'from' | 'to';
  interface HistoryEntry {
    category: CategoryId;
    from: string;
    to: string;
    /** Which field held the typed value, and the text exactly as typed. */
    side: Side;
    text: string;
  }

  const STORAGE_KEY = 'unitConverter.history';
  const HISTORY_MAX = 10;
  const RECORD_DELAY_MS = 1200;

  function loadHistory(): HistoryEntry[] {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(raw)) return [];
      return raw
        .filter(
          (e): e is HistoryEntry =>
            !!e &&
            isCategoryId(e.category) &&
            !!getUnit(e.category, e.from) &&
            !!getUnit(e.category, e.to) &&
            (e.side === 'from' || e.side === 'to') &&
            typeof e.text === 'string'
        )
        .slice(0, HISTORY_MAX);
    } catch {
      return [];
    }
  }

  function saveHistory(list: HistoryEntry[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* storage blocked: history stays in memory */
    }
  }

  let category = $state<CategoryId>('length');
  let fromUnit = $state('m');
  let toUnit = $state('ft');
  let side = $state<Side>('from');
  let text = $state('1');
  let history = $state<HistoryEntry[]>(loadHistory());
  /** Only record conversions the user made, not the initial state or a restored entry. */
  let dirty = $state(false);

  const cat = $derived(getCategory(category));
  const unitOptions: Option[] = $derived(cat.units.map((u) => ({ value: u.key, label: unitLabel(u), hint: u.hint })));
  const sym = (key: string, c: CategoryId = category) => getUnit(c, key)?.symbol ?? key;

  const srcUnit = $derived(side === 'from' ? fromUnit : toUnit);
  const dstUnit = $derived(side === 'from' ? toUnit : fromUnit);
  const value = $derived(parseNumber(text));
  const empty = $derived(text.trim() === '');
  const error = $derived(empty ? undefined : inputError(value, srcUnit, category));
  const valid = $derived(!empty && !error);
  const result = $derived(valid ? convert(value, srcUnit, dstUnit, category) : NaN);

  const fromValue = $derived(side === 'from' ? value : result);
  const toValue = $derived(side === 'from' ? result : value);
  const plain = (n: number) => formatResult(n, { grouping: false });
  const fromText = $derived(side === 'from' ? text : plain(result));
  const toText = $derived(side === 'to' ? text : plain(result));
  const line = $derived(
    valid ? `${formatResult(fromValue)} ${sym(fromUnit)} = ${formatResult(toValue)} ${sym(toUnit)}` : ''
  );

  const table = $derived(
    valid
      ? cat.units
          .filter((u) => u.key !== fromUnit)
          .map((u) => ({ unit: u, value: formatResult(convert(fromValue, fromUnit, u.key, category)) }))
      : []
  );

  // Record the current conversion once the user pauses.
  $effect(() => {
    if (!dirty || !valid) return;
    const entry: HistoryEntry = { category, from: fromUnit, to: toUnit, side, text: text.trim() };
    const timer = setTimeout(() => record(entry), RECORD_DELAY_MS);
    return () => clearTimeout(timer);
  });

  const keyOf = (e: HistoryEntry) => `${e.category}|${e.from}|${e.to}|${e.side}|${e.text}`;

  function record(entry: HistoryEntry) {
    const k = keyOf(entry);
    history = [entry, ...history.filter((e) => keyOf(e) !== k)].slice(0, HISTORY_MAX);
    saveHistory(history);
  }

  function describe(e: HistoryEntry): string {
    const src = e.side === 'from' ? e.from : e.to;
    const dst = e.side === 'from' ? e.to : e.from;
    const v = parseNumber(e.text);
    return `${formatResult(v)} ${sym(src, e.category)} → ${formatResult(convert(v, src, dst, e.category))} ${sym(dst, e.category)}`;
  }

  function restore(e: HistoryEntry) {
    category = e.category;
    fromUnit = e.from;
    toUnit = e.to;
    side = e.side;
    text = e.text;
    dirty = false;
  }

  function clearHistory() {
    history = [];
    saveHistory(history);
  }

  function pickCategory(id: CategoryId) {
    if (id === category) return;
    category = id;
    [fromUnit, toUnit] = getCategory(id).defaults;
  }

  function edit(s: Side, v: string) {
    side = s;
    text = v;
    dirty = true;
  }

  // Swap units only; the typed value stays exactly as entered.
  function swap() {
    [fromUnit, toUnit] = [toUnit, fromUnit];
    dirty = true;
  }
</script>

<ToolLayout
  title="Unit Converter"
  description="Convert length, mass, volume, area, temperature and more using exact official definitions."
  icon={Calculator}
  color="warning"
>
  <div class="grid items-start gap-4 lg:grid-cols-[3fr_2fr]">
    <div class="flex flex-col gap-4">
      <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="uc-title">
        <h2 id="uc-title" class="sr-only">Convert</h2>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Category">
          {#each CATEGORIES as c (c.id)}
            <Button
              size="sm"
              variant={c.id === category ? 'primary' : 'secondary'}
              aria-pressed={c.id === category}
              onclick={() => pickCategory(c.id)}
            >
              {c.name}
            </Button>
          {/each}
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <TextField
            label="From value"
            value={fromText}
            oninput={(e) => edit('from', e.currentTarget.value)}
            inputmode="decimal"
            autocomplete="off"
            hint={side === 'from' && error ? undefined : 'Comma or dot for decimals.'}
            error={side === 'from' ? error : undefined}
            class="tabular-nums"
          />
          <Select label="From unit" options={unitOptions} bind:value={fromUnit} onchange={() => (dirty = true)} />
        </div>

        <div class="flex justify-center">
          <IconButton label="Swap units" onclick={swap}><ArrowUpDown /></IconButton>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <TextField
            label="To value"
            value={toText}
            oninput={(e) => edit('to', e.currentTarget.value)}
            inputmode="decimal"
            autocomplete="off"
            error={side === 'to' ? error : undefined}
            class="tabular-nums"
          />
          <Select label="To unit" options={unitOptions} bind:value={toUnit} onchange={() => (dirty = true)} />
        </div>

        <div class="flex flex-col gap-3 rounded-md bg-control px-4 py-4" aria-live="polite">
          {#if valid}
            <p class="font-mono text-body-lg break-words tabular-nums text-ink">{line}</p>
            <div class="flex flex-wrap gap-2">
              <CopyChip value={line}>Copy line</CopyChip>
              <CopyChip value={plain(toValue)} />
            </div>
          {:else}
            <p class="text-body text-ink-muted">
              {error ? `▼ ${error}` : 'Enter a value to convert.'}
            </p>
          {/if}
        </div>
      </section>

      {#if table.length}
        <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="uc-table-title">
          <h2 id="uc-table-title" class="text-label text-ink-muted">
            {formatResult(fromValue)} {sym(fromUnit)} in other units
          </h2>
          <ul class="flex flex-col gap-1">
            {#each table as row (row.unit.key)}
              <li>
                <button
                  type="button"
                  class="flex w-full cursor-pointer items-baseline justify-between gap-4 rounded-md px-3 py-2 text-left transition-colors duration-fast hover:bg-control {row
                    .unit.key === toUnit
                    ? 'bg-control'
                    : ''}"
                  aria-pressed={row.unit.key === toUnit}
                  aria-label="Convert to {row.unit.name}: {row.value} {row.unit.symbol}"
                  onclick={() => {
                    toUnit = row.unit.key;
                    dirty = true;
                  }}
                >
                  <span class="text-body-sm text-ink-muted">
                    {row.unit.name}{#if row.unit.hint}<span class="text-ink-muted"> · {row.unit.hint}</span>{/if}
                  </span>
                  <span class="font-mono text-body-sm break-all text-right tabular-nums text-ink">
                    {row.value} {row.unit.symbol}
                  </span>
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </div>

    <section class="flex flex-col gap-3 rounded-lg bg-card p-6 lg:sticky lg:top-6" aria-labelledby="uc-history-title">
      <div class="flex items-center justify-between gap-3">
        <h2 id="uc-history-title" class="text-label text-ink-muted">History</h2>
        {#if history.length}
          <Button variant="ghost" size="sm" onclick={clearHistory}>
            {#snippet icon()}<Trash2 class="size-4" />{/snippet}
            Clear
          </Button>
        {/if}
      </div>
      {#if history.length === 0}
        <div class="flex flex-col items-center gap-2 py-6 text-center text-ink-muted">
          <History class="size-6" aria-hidden="true" />
          <p class="text-body-sm">Your recent conversions are saved here automatically.</p>
        </div>
      {:else}
        <ul class="flex flex-col gap-2">
          {#each history as e (keyOf(e))}
            <li>
              <button
                type="button"
                class="w-full cursor-pointer rounded-md bg-control px-4 py-3 text-left transition-colors duration-fast hover:bg-control-hover"
                onclick={() => restore(e)}
              >
                <span class="block text-label text-ink-muted">{getCategory(e.category).name}</span>
                <span class="block font-mono text-code break-words tabular-nums text-ink">{describe(e)}</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  </div>
</ToolLayout>
