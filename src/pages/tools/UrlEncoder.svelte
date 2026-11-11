<script lang="ts">
  import { ArrowUpDown, Link } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, IconButton, Segmented, Switch, Textarea } from '$lib/components/ds';
  import {
    decodeUrl,
    decodeUrlLines,
    encodeUrl,
    encodeUrlLines,
    isUrlMode,
    looksEncoded,
    type UrlMode,
    type UrlResult
  } from '$lib/tools/urlencode';

  interface Settings {
    direction: string; // 'encode' | 'decode'
    mode: string; // UrlMode
    batch: boolean;
  }

  const STORAGE_KEY = 'urlEncoder.options';
  const DEFAULTS: Settings = { direction: 'encode', mode: 'component', batch: false };

  const DIRECTIONS = [
    { value: 'encode', label: 'Encode' },
    { value: 'decode', label: 'Decode' }
  ];

  const MODES = [
    { value: 'component', label: 'Component' },
    { value: 'uri', label: 'Full URL' },
    { value: 'form', label: 'Form' }
  ];

  const MODE_HELP: Record<UrlMode, string> = {
    component: 'encodeURIComponent: for one query value or path segment. Escapes / ? & = # too.',
    uri: 'encodeURI: for a whole URL. Keeps : / ? # & = so the link still works; escapes spaces and non-ASCII.',
    form: 'application/x-www-form-urlencoded (HTML forms, URLSearchParams): spaces become +, and + decodes back to a space.'
  };

  function loadSettings(): Settings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const saved = JSON.parse(raw) as Partial<Record<keyof Settings, unknown>>;
      const s: Settings = { ...DEFAULTS };
      if (saved.direction === 'encode' || saved.direction === 'decode') s.direction = saved.direction;
      if (isUrlMode(saved.mode)) s.mode = saved.mode;
      if (typeof saved.batch === 'boolean') s.batch = saved.batch;
      return s;
    } catch {
      return { ...DEFAULTS };
    }
  }

  let s = $state<Settings>(loadSettings());
  let input = $state('');

  $effect(() => {
    const data = JSON.stringify(s);
    try {
      localStorage.setItem(STORAGE_KEY, data);
    } catch {
      /* storage blocked: options just won't persist */
    }
  });

  const encoding = $derived(s.direction === 'encode');
  const mode = $derived<UrlMode>(isUrlMode(s.mode) ? s.mode : 'component');
  const result = $derived<UrlResult>(
    input === ''
      ? { ok: true, value: '' }
      : encoding
        ? (s.batch ? encodeUrlLines : encodeUrl)(input, mode)
        : (s.batch ? decodeUrlLines : decodeUrl)(input, mode)
  );
  const output = $derived(result.ok ? result.value : '');
  const error = $derived(result.ok ? undefined : result.message);
  const doubleEncodeWarning = $derived(encoding && looksEncoded(input));

  const placeholder = $derived(
    encoding
      ? s.batch
        ? 'hello world\ncafé & crème\nhttps://example.com/a path?q=1'
        : 'https://example.com/search?q=café & crème'
      : s.batch
        ? 'hello%20world\ncaf%C3%A9%20%26%20cr%C3%A8me'
        : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dcaf%C3%A9'
  );

  function swap() {
    if (output) input = output;
    s.direction = encoding ? 'decode' : 'encode';
  }
</script>

<ToolLayout
  title="URL Encoder"
  description="Encode and decode URLs for safe transmission and parameter handling."
  icon={Link}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="url-main-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="url-main-title" class="text-label text-ink-muted">{encoding ? 'Encode' : 'Decode'}</h2>
        <div class="flex items-center gap-2">
          <div class="w-56">
            <Segmented label="Direction" options={DIRECTIONS} bind:value={s.direction} />
          </div>
          <IconButton label="Use output as input" onclick={swap}><ArrowUpDown /></IconButton>
        </div>
      </div>

      <Textarea
        label={encoding ? 'Text to encode' : 'Text to decode'}
        hint={s.batch ? 'Each line is processed on its own.' : undefined}
        rows={s.batch ? 8 : 5}
        mono
        spellcheck={false}
        bind:value={input}
        {placeholder}
        {error}
      />

      {#if doubleEncodeWarning}
        <p class="text-body-sm text-ink-muted" role="status">
          <span class="text-accent-text">Heads up:</span> this already looks URL-encoded (it has %XX escapes).
          Encoding it again turns <code class="font-mono">%20</code> into <code class="font-mono">%2520</code>
          — switch to Decode if you meant to read it.
        </p>
      {/if}

      <div class="flex flex-col gap-3">
        <h3 id="url-output-title" class="text-label text-ink-muted">{encoding ? 'Encoded' : 'Decoded'}</h3>
        {#if output}
          <pre
            class="max-h-80 overflow-auto rounded-md bg-sunken px-5 py-4 font-mono text-code break-all whitespace-pre-wrap text-ink"
            aria-labelledby="url-output-title"
            aria-live="polite">{output}</pre>
          <div class="flex flex-wrap items-center gap-3">
            <CopyChip value={output}>Copy output</CopyChip>
            <span class="text-body-sm text-ink-muted">{[...input].length} → {[...output].length} characters</span>
          </div>
        {:else if !error}
          <EmptyState
            title="Nothing to show yet"
            text={encoding ? 'Type or paste text above — it is encoded as you type.' : 'Paste percent-encoded text above — it is decoded as you type.'}
          />
        {/if}
      </div>
    </section>

    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="url-options-title">
      <h2 id="url-options-title" class="text-label text-ink-muted">Options</h2>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Encoding</span>
        <Segmented label="Encoding" options={MODES} bind:value={s.mode} />
        <p class="text-body-sm text-ink-muted">{MODE_HELP[mode]}</p>
      </div>

      <Switch
        label="Process each line separately"
        description="Batch: one value per line, empty lines kept"
        bind:checked={s.batch}
      />
    </section>
  </div>
</ToolLayout>
