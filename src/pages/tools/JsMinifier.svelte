<script lang="ts">
  import { FileText, Download } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, Segmented, Switch, Textarea } from '$lib/components/ds';
  import {
    DEFAULT_BEAUTIFY,
    DEFAULT_MINIFY,
    PRINT_WIDTHS,
    SAMPLE_JS,
    byteSize,
    formatBytes,
    sanitizeBeautify,
    sanitizeMinify,
    savedPercent,
    transformJs,
    type BeautifyOptions,
    type MinifyOptions,
    type Mode
  } from '$lib/tools/jsminify';

  const STORAGE_KEY = 'jsMinifier';
  /** Inputs larger than this (in characters) are not persisted. */
  const MAX_STORED_INPUT = 200_000;
  const DEBOUNCE_MS = 300;

  const MODES = [
    { value: 'minify', label: 'Minify' },
    { value: 'beautify', label: 'Beautify' }
  ];
  const COMMENTS = [
    { value: 'license', label: 'License' },
    { value: 'none', label: 'None' }
  ];
  const ECMAS = [
    { value: '2015', label: 'ES2015' },
    { value: '2020', label: 'ES2020' },
    { value: 'latest', label: 'Latest' }
  ];
  const SOURCES = [
    { value: 'script', label: 'Script' },
    { value: 'module', label: 'Module' }
  ];
  const INDENTS = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
    { value: 'tab', label: 'Tab' }
  ];
  const QUOTES = [
    { value: 'single', label: 'Single' },
    { value: 'double', label: 'Double' }
  ];
  const WIDTHS = PRINT_WIDTHS.map(w => ({ value: String(w), label: String(w) }));

  interface Stored {
    mode?: unknown;
    input?: unknown;
    minify?: unknown;
    beautify?: unknown;
  }

  function load(): Stored {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === 'object' ? (parsed as Stored) : {};
    } catch {
      return {};
    }
  }

  const saved = load();
  let mode = $state<Mode>(saved.mode === 'beautify' ? 'beautify' : 'minify');
  let input = $state(typeof saved.input === 'string' ? saved.input : '');
  let minifyOpts = $state<MinifyOptions>(sanitizeMinify(saved.minify ?? DEFAULT_MINIFY));
  let beautifyOpts = $state<BeautifyOptions>(sanitizeBeautify(saved.beautify ?? DEFAULT_BEAUTIFY));

  let output = $state('');
  let error = $state('');
  let busy = $state(false);
  let gzipSize = $state<number | null>(null);
  /** Which libraries have finished their first (lazy) load. */
  let loaded = $state<Record<Mode, boolean>>({ minify: false, beautify: false });
  // Bumped on every new run; an async result is only applied if it belongs to the latest run.
  let run = 0;

  const canGzip = typeof CompressionStream !== 'undefined';

  async function gzipBytes(text: string): Promise<number | null> {
    if (!canGzip) return null;
    try {
      const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
      return (await new Response(stream).arrayBuffer()).byteLength;
    } catch {
      return null;
    }
  }

  function persist() {
    try {
      const data = {
        mode,
        input: input.length <= MAX_STORED_INPUT ? input : '',
        minify: minifyOpts,
        beautify: beautifyOpts
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or blocked: not critical */
    }
  }

  $effect(() => {
    const code = input;
    const currentMode = mode;
    const mOpts = $state.snapshot(minifyOpts);
    const bOpts = $state.snapshot(beautifyOpts);
    const id = ++run;

    if (!code.trim()) {
      output = '';
      error = '';
      gzipSize = null;
      busy = false;
      const timer = setTimeout(persist, DEBOUNCE_MS);
      return () => clearTimeout(timer);
    }

    busy = true;
    const timer = setTimeout(async () => {
      persist();
      try {
        const res = await transformJs(currentMode, code, mOpts, bOpts);
        if (id !== run) return;
        loaded[currentMode] = true;
        if (res.ok) {
          output = res.code;
          error = '';
          const gz = await gzipBytes(res.code);
          if (id === run) gzipSize = gz;
        } else {
          output = '';
          gzipSize = null;
          error = res.line != null ? `Line ${res.line}, column ${res.column}: ${res.message}` : res.message;
        }
      } catch (e) {
        if (id !== run) return;
        output = '';
        gzipSize = null;
        error = `Could not load the ${currentMode === 'minify' ? 'minifier' : 'formatter'}: ${e instanceof Error ? e.message : String(e)}`;
      } finally {
        if (id === run) busy = false;
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  });

  const inputBytes = $derived(byteSize(input));
  const outputBytes = $derived(byteSize(output));
  const saving = $derived(savedPercent(inputBytes, outputBytes));
  const loadingLib = $derived(busy && !loaded[mode]);
  const fileName = $derived(mode === 'minify' ? 'script.min.js' : 'script.js');

  function download() {
    const url = URL.createObjectURL(new Blob([output], { type: 'text/javascript' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
</script>

{#snippet group(label: string)}
  <span class="text-label font-mono text-ink-muted" aria-hidden="true">{label}</span>
{/snippet}

<ToolLayout
  title="JavaScript Minifier"
  description="Minify JavaScript with terser or beautify it with Prettier, right in your browser. Nothing is uploaded."
  icon={FileText}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6" aria-label="Mode and options">
    <div class="w-full sm:w-64">
      <Segmented label="Mode" options={MODES} bind:value={mode as string} />
    </div>

    {#if mode === 'minify'}
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Switch label="Compress" description="Rewrite code to be shorter" bind:checked={minifyOpts.compress} />
        <Switch label="Mangle names" description="Shorten local variable names" bind:checked={minifyOpts.mangle} />
      </div>
      <div class="flex flex-wrap gap-x-6 gap-y-4">
        <div class="flex flex-col gap-2">
          {@render group('Keep comments')}
          <Segmented label="Keep comments" options={COMMENTS} bind:value={minifyOpts.comments as string} />
        </div>
        <div class="flex flex-col gap-2">
          {@render group('Output target')}
          <Segmented label="Output target" options={ECMAS} bind:value={minifyOpts.ecma as string} />
        </div>
        <div class="flex flex-col gap-2">
          {@render group('Source type')}
          <Segmented label="Source type" options={SOURCES} bind:value={minifyOpts.sourceType as string} />
        </div>
      </div>
    {:else}
      <Switch label="Semicolons" description="Add semicolons at the end of statements" bind:checked={beautifyOpts.semicolons} />
      <div class="flex flex-wrap gap-x-6 gap-y-4">
        <div class="flex flex-col gap-2">
          {@render group('Indent')}
          <Segmented label="Indent" options={INDENTS} bind:value={beautifyOpts.indent as string} />
        </div>
        <div class="flex flex-col gap-2">
          {@render group('Quotes')}
          <Segmented label="Quotes" options={QUOTES} bind:value={beautifyOpts.quotes as string} />
        </div>
        <div class="flex flex-col gap-2">
          {@render group('Print width')}
          <Segmented
            label="Print width"
            options={WIDTHS}
            value={String(beautifyOpts.printWidth)}
            onchange={v => (beautifyOpts.printWidth = Number(v))}
          />
        </div>
      </div>
    {/if}
  </section>

  <div class="grid min-w-0 gap-4 lg:grid-cols-2">
    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-label="Input">
      <Textarea
        label="JavaScript input"
        bind:value={input}
        rows={14}
        mono
        wrap="off"
        spellcheck={false}
        autocomplete="off"
        placeholder="Paste JavaScript here…"
        error={error || undefined}
        hint={input ? `${input.length.toLocaleString()} characters · ${formatBytes(inputBytes)}` : 'Processed as you type.'}
      />
      <div class="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onclick={() => (input = SAMPLE_JS)}>Load sample</Button>
        <Button variant="ghost" size="sm" onclick={() => (input = '')} disabled={!input}>Clear</Button>
      </div>
    </section>

    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-label="Output">
      <p class="sr-only" aria-live="polite">
        {#if loadingLib}Loading {mode === 'minify' ? 'minifier' : 'formatter'}…{:else if output && !busy}Output updated{/if}
      </p>

      {#if !input.trim()}
        <EmptyState
          title="Nothing to {mode} yet"
          text="Paste JavaScript on the left, or load the sample to try it."
        />
      {:else if loadingLib}
        <p class="text-body-sm text-ink-muted">Loading {mode === 'minify' ? 'minifier' : 'formatter'}…</p>
      {:else if error && !output}
        <EmptyState code="ERR" title="Fix the error to see output" text="The input could not be parsed." />
      {:else}
        <Textarea
          label={mode === 'minify' ? 'Minified output' : 'Beautified output'}
          value={output}
          readonly
          rows={14}
          mono
          wrap={mode === 'minify' ? 'soft' : 'off'}
          spellcheck={false}
          aria-busy={busy}
        />

        <dl class="flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
          <div class="flex gap-2">
            <dt class="text-ink-muted">Size</dt>
            <dd class="font-mono text-ink">{formatBytes(inputBytes)} → {formatBytes(outputBytes)}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="text-ink-muted">{saving >= 0 ? 'Saved' : 'Grew'}</dt>
            <dd class="font-mono {saving > 0 ? 'text-live' : saving < 0 ? 'text-negative' : 'text-ink'}">
              {saving > 0 ? '▼' : saving < 0 ? '▲' : ''}
              {Math.abs(saving)}%
            </dd>
          </div>
          {#if gzipSize != null}
            <div class="flex gap-2">
              <dt class="text-ink-muted">Gzip</dt>
              <dd class="font-mono text-ink">≈ {formatBytes(gzipSize)}</dd>
            </div>
          {/if}
        </dl>

        <div class="flex flex-wrap gap-2">
          <CopyChip value={output}>Copy output</CopyChip>
          <Button variant="secondary" onclick={download}>
            {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
            Download {fileName}
          </Button>
        </div>
      {/if}
    </section>
  </div>
</ToolLayout>
