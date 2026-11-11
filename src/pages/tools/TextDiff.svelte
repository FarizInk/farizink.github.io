<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { GitCompare, ArrowLeftRight, Download, FileText, X } from '@lucide/svelte';
  import {
    Button,
    CopyChip,
    EmptyState,
    IconButton,
    Segmented,
    Switch,
    Textarea
  } from '$lib/components/ds';
  import {
    computeDiff,
    toSplitRows,
    collapseRows,
    unifiedPatch,
    splitLines,
    type DiffRow,
    type SplitRow
  } from '$lib/tools/diff';

  const DEBOUNCE_OVER = 50_000; // chars (both sides) before typing is debounced
  const CONTEXT = 3;

  let original = $state('');
  let changed = $state('');
  let ignoreWhitespace = $state(false);
  let ignoreCase = $state(false);
  let charLevel = $state(false);
  let view = $state('unified');

  // Inputs the diff runs on: immediate for normal sizes, debounced for large ones.
  let a = $state('');
  let b = $state('');
  $effect(() => {
    const x = original;
    const y = changed;
    if (x.length + y.length <= DEBOUNCE_OVER) {
      a = x;
      b = y;
      return;
    }
    const t = setTimeout(() => {
      a = x;
      b = y;
    }, 300);
    return () => clearTimeout(t);
  });
  const pending = $derived(a !== original || b !== changed);

  // Side by side needs room; below md it falls back to unified.
  let wide = $state(true);
  $effect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    wide = mq.matches;
    const on = (e: MediaQueryListEvent) => (wide = e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  });
  const effectiveView = $derived(view === 'split' && wide ? 'split' : 'unified');

  const bothEmpty = $derived(a === '' && b === '');
  const result = $derived(
    computeDiff(a, b, { ignoreWhitespace, ignoreCase, inline: charLevel ? 'char' : 'word' })
  );
  const patch = $derived(
    bothEmpty ? '' : unifiedPatch(a, b, 'original.txt', 'changed.txt', CONTEXT)
  );
  const textsDiffer = $derived(a.replace(/\r\n?/g, '\n') !== b.replace(/\r\n?/g, '\n'));

  const unifiedItems = $derived(collapseRows(result.rows, r => r.type === 'equal', CONTEXT));
  const splitRows = $derived(toSplitRows(result.rows));
  const splitItems = $derived(collapseRows(splitRows, r => r.left?.type === 'equal', CONTEXT));

  // Expanded gaps belong to one diff result + view; a new result collapses everything again.
  let expandedFor = $state.raw<object | null>(null);
  let expanded = $state<string[]>([]);
  const isOpen = (key: string) => expandedFor === result && expanded.includes(key);
  function expand(key: string) {
    if (expandedFor !== result) {
      expandedFor = result;
      expanded = [];
    }
    expanded.push(key);
  }

  const originalLines = $derived(splitLines(original).length);
  const changedLines = $derived(splitLines(changed).length);
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

  function swap() {
    [original, changed] = [changed, original];
  }
  function clearAll() {
    original = '';
    changed = '';
  }
  function loadSample() {
    original = `function calculateSum(a, b) {
  return a + b;
}

// Example usage
const result = calculateSum(5, 3);
console.log(result);

export default calculateSum;`;
    changed = `/** Adds numbers together. */
function calculateSum(a, b, c = 0) {
  return a + b + c;
}

// Example usage
const result = calculateSum(5, 3, 2);
console.log('Result:', result);

export default calculateSum;`;
  }
  function downloadPatch() {
    const blob = new Blob([patch], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diff.patch';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  const viewOptions = [
    { value: 'unified', label: 'Unified' },
    { value: 'split', label: 'Side by side' }
  ];

  const rowTone = (row: DiffRow | null) =>
    row === null
      ? 'bg-control/40'
      : row.type === 'added'
        ? 'bg-live/10'
        : row.type === 'removed'
          ? 'bg-negative/10'
          : '';
  const markText = (row: DiffRow) =>
    row.type === 'added' ? '+' : row.type === 'removed' ? '−' : '';
  const markTone = (row: DiffRow) =>
    row.type === 'added' ? 'text-live' : row.type === 'removed' ? 'text-negative' : '';
  const srLabel = (row: DiffRow) =>
    row.type === 'added' ? 'Added: ' : row.type === 'removed' ? 'Removed: ' : '';
</script>

{#snippet lineText(row: DiffRow, oldSide: boolean)}
  <span class="min-w-0 py-0.5 pr-3 whitespace-pre-wrap [overflow-wrap:anywhere]">
    <span class="sr-only">{srLabel(row)}</span>
    {#if row.segments}
      {#each row.segments as seg, s (s)}
        {#if seg.changed && row.type === 'added'}
          <ins class="rounded-[4px] bg-live/30 text-ink no-underline">{seg.text}</ins>
        {:else if seg.changed}
          <del class="rounded-[4px] bg-negative/30 text-ink no-underline">{seg.text}</del>
        {:else}{seg.text}{/if}
      {/each}
    {:else}{oldSide && row.oldText !== undefined ? row.oldText : row.text}{/if}
  </span>
{/snippet}

{#snippet gap(key: string, count: number)}
  <button
    type="button"
    onclick={() => expand(key)}
    class="col-span-full flex cursor-pointer items-center gap-2 bg-control px-3 py-1.5 text-left text-label text-ink-muted transition-colors duration-fast hover:bg-control-hover hover:text-ink"
  >
    <span aria-hidden="true">⋯</span>
    Show {plural(count, 'unchanged line')}
  </button>
{/snippet}

{#snippet unifiedRow(row: DiffRow)}
  <div class="col-span-full grid grid-cols-subgrid {rowTone(row)}">
    <span class="px-2 py-0.5 text-right text-ink-muted select-none">{row.oldNo ?? ''}</span>
    <span class="px-2 py-0.5 text-right text-ink-muted select-none">{row.newNo ?? ''}</span>
    <span class="py-0.5 pr-2 font-bold select-none {markTone(row)}" aria-hidden="true"
      >{markText(row)}</span
    >
    {@render lineText(row, false)}
  </div>
{/snippet}

{#snippet splitHalf(row: DiffRow | null, oldSide: boolean)}
  <span class="py-0.5 pl-2 text-right text-ink-muted select-none {rowTone(row)}">
    {row ? (oldSide ? row.oldNo : row.newNo) : ''}
  </span>
  <span
    class="px-2 py-0.5 font-bold select-none {rowTone(row)} {row ? markTone(row) : ''}"
    aria-hidden="true"
  >
    {row ? markText(row) : ''}
  </span>
  <span class="flex min-w-0 {rowTone(row)}">
    {#if row}{@render lineText(row, oldSide)}{/if}
  </span>
{/snippet}

{#snippet splitRow(r: SplitRow)}
  <div class="col-span-full grid grid-cols-subgrid">
    {@render splitHalf(r.left, true)}
    {@render splitHalf(r.right, false)}
  </div>
{/snippet}

<ToolLayout
  title="Text Diff Tool"
  description="Compare two texts side-by-side and highlight differences."
  icon={GitCompare}
  color="warning"
>
  <!-- Inputs -->
  <section aria-label="Texts to compare" class="flex flex-col gap-4 rounded-lg bg-card p-6">
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onclick={loadSample}>
        {#snippet icon()}<FileText class="size-4" />{/snippet}
        Load sample
      </Button>
      <Button variant="ghost" size="sm" onclick={clearAll} disabled={!original && !changed}>
        {#snippet icon()}<X class="size-4" />{/snippet}
        Clear
      </Button>
      <span class="ml-auto">
        <IconButton label="Swap original and changed" onclick={swap}>
          <ArrowLeftRight />
        </IconButton>
      </span>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Textarea
        label="Original"
        bind:value={original}
        mono
        rows={12}
        spellcheck={false}
        autocomplete="off"
        placeholder="Paste the original text…"
        hint={plural(originalLines, 'line')}
      />
      <Textarea
        label="Changed"
        bind:value={changed}
        mono
        rows={12}
        spellcheck={false}
        autocomplete="off"
        placeholder="Paste the changed text…"
        hint={plural(changedLines, 'line')}
      />
    </div>
    <div class="flex flex-wrap gap-x-6 gap-y-3">
      <Switch
        label="Ignore whitespace"
        description="Leading, trailing and repeated spaces"
        bind:checked={ignoreWhitespace}
      />
      <Switch label="Ignore case" bind:checked={ignoreCase} />
      <Switch
        label="Character highlights"
        description="Off: highlight whole words"
        bind:checked={charLevel}
      />
    </div>
  </section>

  <!-- Result -->
  <section
    aria-labelledby="diff-result-title"
    class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6"
  >
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 id="diff-result-title" class="text-title text-ink">Differences</h2>
      {#if !bothEmpty && !result.identical}
        <div class="hidden md:block">
          <Segmented label="Diff view" options={viewOptions} bind:value={view} />
        </div>
      {/if}
    </div>

    {#if bothEmpty}
      <EmptyState
        title="Nothing to compare yet"
        text="Paste text into Original and Changed — differences show up as you type."
      >
        {#snippet actions()}
          <Button variant="secondary" onclick={loadSample}>Load sample</Button>
        {/snippet}
      </EmptyState>
    {:else}
      <p class="text-body-sm text-ink-muted" role="status">
        {#if pending}
          Comparing…
        {:else if result.identical}
          <span class="text-ink">No differences</span>{#if textsDiffer}
            · texts differ only in {[ignoreWhitespace && 'whitespace', ignoreCase && 'case']
              .filter(Boolean)
              .join(' or ')}{/if}
          · {plural(result.stats.unchanged, 'line')}
        {:else}
          <span class="font-mono text-live">+{result.stats.added}</span> added ·
          <span class="font-mono text-negative">−{result.stats.removed}</span> removed ·
          <span class="font-mono">{result.stats.unchanged}</span> unchanged
          {#if result.approximate}· too large for a line-by-line match, showing a full replace{/if}
        {/if}
      </p>

      {#if !result.identical}
        <div class="flex flex-wrap items-center gap-2">
          <CopyChip value={patch}>Copy patch</CopyChip>
          <Button variant="secondary" onclick={downloadPatch}>
            {#snippet icon()}<Download class="size-4" />{/snippet}
            Download .patch
          </Button>
        </div>

        <div class="overflow-hidden rounded-md bg-sunken font-mono text-code text-ink">
          {#if effectiveView === 'unified'}
            <div
              class="grid grid-cols-[auto_auto_auto_minmax(0,1fr)] py-1"
              role="region"
              aria-label="Unified diff"
            >
              {#each unifiedItems as item (item.kind === 'gap' ? `g${item.start}` : `r${item.index}`)}
                {#if item.kind === 'row'}
                  {@render unifiedRow(item.row)}
                {:else if isOpen(`u${item.start}`)}
                  {#each result.rows.slice(item.start, item.end) as row, k (item.start + k)}
                    {@render unifiedRow(row)}
                  {/each}
                {:else}
                  {@render gap(`u${item.start}`, item.count)}
                {/if}
              {/each}
            </div>
          {:else}
            <div
              class="grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_minmax(0,1fr)] py-1"
              role="region"
              aria-label="Side by side diff"
            >
              {#each splitItems as item (item.kind === 'gap' ? `g${item.start}` : `r${item.index}`)}
                {#if item.kind === 'row'}
                  {@render splitRow(item.row)}
                {:else if isOpen(`s${item.start}`)}
                  {#each splitRows.slice(item.start, item.end) as r, k (item.start + k)}
                    {@render splitRow(r)}
                  {/each}
                {:else}
                  {@render gap(`s${item.start}`, item.count)}
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/if}
  </section>
</ToolLayout>
