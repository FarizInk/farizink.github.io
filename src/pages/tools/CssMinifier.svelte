<script lang="ts">
  import { Download, FileText } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, Segmented, Switch, Textarea } from '$lib/components/ds';
  import {
    beautifyCss,
    formatBytes,
    minifyCss,
    percentSaved,
    utf8Bytes,
    type CssResult,
    type Indent
  } from '$lib/tools/cssminify';

  type Mode = 'minify' | 'beautify';

  const MODES = [
    { value: 'minify', label: 'Minify' },
    { value: 'beautify', label: 'Beautify' }
  ];
  const INDENTS = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
    { value: 'tab', label: 'Tab' }
  ];
  const WIDTHS = [
    { value: '80', label: '80' },
    { value: '100', label: '100' },
    { value: '120', label: '120' }
  ];
  const STORAGE_KEY = 'cssMinifier';
  /** Inputs larger than this aren't saved to localStorage (options still are). */
  const MAX_SAVED_CHARS = 200_000;
  const DEBOUNCE_MS = 300;

  const SAMPLE = `/*! Sample stylesheet — MIT */
/* Layout */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.nav  a :hover {
    color: #663399;
    transition: color 0.3s ease;
}

.card::before {
    content: "a  /* not a comment */  b";
    background: url("images/hero banner.png") no-repeat;
    width: calc(100% - 2 * 16px);
}

.icon {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>");
}

@media screen and (min-width: 768px) {
    .container {
        padding: 40px;
    }
}
`;

  interface Saved {
    input: string;
    mode: Mode;
    restructure: boolean;
    keepSpecial: boolean;
    indent: string;
    width: string;
  }

  function loadSaved(): Partial<Saved> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const v: unknown = raw ? JSON.parse(raw) : null;
      if (!v || typeof v !== 'object') return {};
      const o = v as Record<string, unknown>;
      return {
        input: typeof o.input === 'string' ? o.input : undefined,
        mode: o.mode === 'minify' || o.mode === 'beautify' ? o.mode : undefined,
        restructure: typeof o.restructure === 'boolean' ? o.restructure : undefined,
        keepSpecial: typeof o.keepSpecial === 'boolean' ? o.keepSpecial : undefined,
        indent: INDENTS.some(i => i.value === o.indent) ? (o.indent as string) : undefined,
        width: WIDTHS.some(w => w.value === o.width) ? (o.width as string) : undefined
      };
    } catch {
      return {};
    }
  }

  const saved = loadSaved();
  let input = $state(saved.input ?? '');
  let mode = $state<string>(saved.mode ?? 'minify');
  let restructure = $state(saved.restructure ?? true);
  let keepSpecial = $state(saved.keepSpecial ?? true);
  let indent = $state(saved.indent ?? '2');
  let width = $state(saved.width ?? '80');

  /** Last finished run. `mode` and `inBytes` describe the input it was produced from. */
  let result = $state<{ mode: Mode; inBytes: number; res: CssResult } | null>(null);
  let busy = $state(false);
  /** Libraries already fetched, so "Loading…" only shows on first use of each mode. */
  let loaded = $state<Record<Mode, boolean>>({ minify: false, beautify: false });
  let gzip = $state<{ in: number; out: number } | null>(null);
  let run = 0;

  $effect(() => {
    const src = input;
    const m = mode as Mode;
    const minOpts = { restructure, keepSpecialComments: keepSpecial };
    const beautyOpts = { indent: (indent === 'tab' ? 'tab' : Number(indent)) as Indent, printWidth: Number(width) };
    const id = ++run;

    if (!src.trim()) {
      busy = false;
      result = null;
      gzip = null;
      return;
    }
    busy = true;
    const timer = setTimeout(async () => {
      let res: CssResult;
      try {
        res = m === 'minify' ? await minifyCss(src, minOpts) : await beautifyCss(src, beautyOpts);
      } catch (e) {
        res = { ok: false, message: `Could not load the ${m === 'minify' ? 'minifier' : 'formatter'}: ${e instanceof Error ? e.message : String(e)}` };
      }
      if (id !== run) return;
      loaded[m] = true;
      result = { mode: m, inBytes: utf8Bytes(src), res };
      busy = false;
      gzip = null;
      if (res.ok) {
        const [a, b] = await Promise.all([gzipSize(src), gzipSize(res.code)]);
        if (id === run && a !== null && b !== null) gzip = { in: a, out: b };
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  });

  // Persist input and options (debounced; storage errors are ignored).
  $effect(() => {
    const data: Saved = {
      input: input.length <= MAX_SAVED_CHARS ? input : '',
      mode: mode as Mode,
      restructure,
      keepSpecial,
      indent,
      width
    };
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* storage full or blocked */
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  });

  async function gzipSize(text: string): Promise<number | null> {
    if (typeof CompressionStream === 'undefined') return null;
    try {
      const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
      return (await new Response(stream).arrayBuffer()).byteLength;
    } catch {
      return null;
    }
  }

  // Only show a result that belongs to the current mode (switching modes must not show stale output).
  const current = $derived(result && result.mode === mode ? result.res : null);
  const output = $derived(current?.ok ? current.code : '');
  const error = $derived(current && !current.ok ? current : null);
  const inBytes = $derived(utf8Bytes(input));
  const outBytes = $derived(utf8Bytes(output));
  const savedPct = $derived(result ? percentSaved(result.inBytes, outBytes) : 0);
  const gzipSaved = $derived(gzip ? percentSaved(gzip.in, gzip.out) : 0);
  const firstLoad = $derived(busy && !loaded[mode as Mode]);
  const outLabel = $derived(mode === 'minify' ? 'Minified CSS' : 'Beautified CSS');

  function signed(pct: number): string {
    return pct >= 0 ? `▼ ${pct}% smaller` : `▲ ${Math.abs(pct)}% larger`;
  }

  function download() {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'minify' ? 'styles.min.css' : 'styles.css';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  /** Put the caret at the error position in the input. */
  function goToError(line: number, column: number) {
    const el = document.getElementById('css-input') as HTMLTextAreaElement | null;
    if (!el) return;
    const lines = input.split('\n');
    let offset = 0;
    for (let i = 0; i < Math.min(line - 1, lines.length); i++) offset += lines[i].length + 1;
    offset = Math.min(offset + Math.max(column - 1, 0), input.length);
    el.focus();
    el.setSelectionRange(offset, offset);
  }
</script>

<ToolLayout
  title="CSS Minifier"
  description="Minify CSS with csso or beautify it with Prettier, in your browser. Strings, url() and selectors stay intact."
  icon={FileText}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-4 sm:p-6" aria-label="Input and options">
    <div class="w-full sm:w-64">
      <Segmented label="Mode" options={MODES} bind:value={mode} />
    </div>

    {#if mode === 'minify'}
      <div class="flex flex-wrap gap-x-8 gap-y-3">
        <Switch label="Restructure" description="Merge and move rules for smaller output" bind:checked={restructure} />
        <Switch label="Keep /*! comments" description="License comments survive" bind:checked={keepSpecial} />
      </div>
    {:else}
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <div class="flex min-w-0 flex-col gap-2">
          <span class="text-label font-mono text-ink-muted" aria-hidden="true">Indent</span>
          <Segmented label="Indent" options={INDENTS} bind:value={indent} />
        </div>
        <div class="flex min-w-0 flex-col gap-2">
          <span class="text-label font-mono text-ink-muted" aria-hidden="true">Print width</span>
          <Segmented label="Print width" options={WIDTHS} bind:value={width} />
        </div>
      </div>
    {/if}

    <Textarea
      id="css-input"
      label="CSS input"
      bind:value={input}
      rows={12}
      mono
      placeholder="Paste or type CSS…"
      spellcheck={false}
      autocomplete="off"
      hint={input ? `${input.length.toLocaleString()} characters · ${formatBytes(inBytes)}` : 'Output updates as you type.'}
    />

    <div class="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onclick={() => (input = SAMPLE)}>Load sample</Button>
      <Button variant="ghost" size="sm" disabled={!input} onclick={() => (input = '')}>Clear</Button>
    </div>
  </section>

  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-4 sm:p-6" aria-label="Output">
    <p class="sr-only" aria-live="polite">
      {#if firstLoad}Loading…{:else if output}{outLabel} ready, {formatBytes(outBytes)}{/if}
    </p>

    {#if !input.trim()}
      <EmptyState title="Nothing to process yet" text="Paste CSS above or load the sample to see the {mode === 'minify' ? 'minified' : 'beautified'} result." />
    {:else if firstLoad && !current}
      <p class="text-body-sm text-ink-muted">Loading {mode === 'minify' ? 'csso' : 'Prettier'}…</p>
    {:else if error}
      <div class="flex flex-col items-start gap-2" role="alert">
        <p class="m-0 text-body-sm text-negative">
          ▼ {#if error.line}<span class="font-mono">Line {error.line}:{error.column ?? 1}</span> — {/if}{error.message}
        </p>
        {#if error.line}
          <Button variant="ghost" size="sm" onclick={() => goToError(error.line ?? 1, error.column ?? 1)}>Show in input</Button>
        {/if}
      </div>
    {:else if current}
      <dl class="m-0 flex flex-wrap gap-x-8 gap-y-3">
        <div class="flex flex-col gap-1">
          <dt class="text-label font-mono text-ink-muted">Size</dt>
          <dd class="m-0 font-mono text-body text-ink">{formatBytes(result?.inBytes ?? 0)} → {formatBytes(outBytes)}</dd>
        </div>
        <div class="flex flex-col gap-1">
          <dt class="text-label font-mono text-ink-muted">Saved</dt>
          <dd class="m-0 font-mono text-body {savedPct >= 0 ? 'text-live' : 'text-negative'}">{signed(savedPct)}</dd>
        </div>
        {#if gzip}
          <div class="flex flex-col gap-1">
            <dt class="text-label font-mono text-ink-muted">Gzip (estimate)</dt>
            <dd class="m-0 font-mono text-body text-ink">
              {formatBytes(gzip.in)} → {formatBytes(gzip.out)} <span class="text-ink-muted">({signed(gzipSaved)})</span>
            </dd>
          </div>
        {/if}
      </dl>

      <Textarea label={outLabel} value={output} readonly rows={12} mono spellcheck={false} />

      <div class="flex flex-wrap items-center gap-2">
        <CopyChip value={output}>Copy output</CopyChip>
        <Button variant="secondary" onclick={download}>
          {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
          Download {mode === 'minify' ? '.min.css' : '.css'}
        </Button>
        {#if busy}<span class="text-body-sm text-ink-muted">Updating…</span>{/if}
      </div>
    {:else}
      <p class="text-body-sm text-ink-muted">Working…</p>
    {/if}
  </section>
</ToolLayout>
