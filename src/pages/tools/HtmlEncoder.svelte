<script lang="ts">
  import { ArrowUpDown, FileText } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, IconButton, Segmented, Switch, Textarea } from '$lib/components/ds';
  import { decodeHtml, encodeHtml, isHtmlMode, REFERENCE, type HtmlMode } from '$lib/tools/htmlentities';

  interface Settings {
    direction: string; // 'encode' | 'decode'
    mode: string; // HtmlMode
    nonAscii: boolean;
  }

  const STORAGE_KEY = 'htmlEncoder.options';
  const DEFAULTS: Settings = { direction: 'encode', mode: 'minimal', nonAscii: false };

  const DIRECTIONS = [
    { value: 'encode', label: 'Encode' },
    { value: 'decode', label: 'Decode' }
  ];

  const MODES = [
    { value: 'minimal', label: 'Minimal' },
    { value: 'named', label: 'Named' },
    { value: 'numeric', label: 'Numeric' },
    { value: 'hex', label: 'Hex' }
  ];

  const MODE_HELP: Record<HtmlMode, string> = {
    minimal: 'Only & < > " \' — enough for text and quoted attribute values.',
    named: 'Also uses names like &copy; &nbsp; &mdash; wherever one exists.',
    numeric: 'Decimal references: &#38; &#60; &#169;.',
    hex: 'Hexadecimal references: &#x26; &#x3C; &#xA9;.'
  };

  function loadSettings(): Settings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const saved = JSON.parse(raw) as Partial<Record<keyof Settings, unknown>>;
      const s: Settings = { ...DEFAULTS };
      if (saved.direction === 'encode' || saved.direction === 'decode') s.direction = saved.direction;
      if (isHtmlMode(saved.mode)) s.mode = saved.mode;
      if (typeof saved.nonAscii === 'boolean') s.nonAscii = saved.nonAscii;
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
  const mode = $derived<HtmlMode>(isHtmlMode(s.mode) ? s.mode : 'minimal');
  const output = $derived(encoding ? encodeHtml(input, { mode, nonAscii: s.nonAscii }) : decodeHtml(input));

  const placeholder = $derived(
    encoding
      ? `<a href="/?q=1&x=2" title="Tom's café">© 2026 — 🎉</a>`
      : '&lt;b&gt;Tom &amp; Jerry&lt;/b&gt; &copy; &#169; &#x1F389;'
  );

  function swap() {
    if (output) input = output;
    s.direction = encoding ? 'decode' : 'encode';
  }
</script>

<ToolLayout
  title="HTML Entity Encoder"
  description="Encode and decode HTML entities to prevent XSS attacks and display special characters."
  icon={FileText}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="html-main-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="html-main-title" class="text-label text-ink-muted">{encoding ? 'Encode' : 'Decode'}</h2>
        <div class="flex items-center gap-2">
          <div class="w-56">
            <Segmented label="Direction" options={DIRECTIONS} bind:value={s.direction} />
          </div>
          <IconButton label="Use output as input" onclick={swap}><ArrowUpDown /></IconButton>
        </div>
      </div>

      <Textarea
        label={encoding ? 'Text to encode' : 'Text to decode'}
        hint={encoding ? undefined : 'Decoded as plain text: tags are never parsed or run.'}
        rows={6}
        mono
        spellcheck={false}
        bind:value={input}
        {placeholder}
      />

      <div class="flex flex-col gap-3">
        <h3 id="html-output-title" class="text-label text-ink-muted">{encoding ? 'Encoded' : 'Decoded'}</h3>
        {#if output}
          <pre
            class="max-h-80 overflow-auto rounded-md bg-sunken px-5 py-4 font-mono text-code break-all whitespace-pre-wrap text-ink"
            aria-labelledby="html-output-title"
            aria-live="polite">{output}</pre>
          <div class="flex flex-wrap items-center gap-3">
            <CopyChip value={output}>Copy output</CopyChip>
            <span class="text-body-sm text-ink-muted">{[...input].length} → {[...output].length} characters</span>
          </div>
        {:else}
          <EmptyState
            title="Nothing to show yet"
            text={encoding ? 'Type or paste text or HTML above — it is encoded as you type.' : 'Paste text with entities above — it is decoded as you type.'}
          />
        {/if}
      </div>
    </section>

    <div class="flex flex-col gap-4">
      <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="html-options-title">
        <h2 id="html-options-title" class="text-label text-ink-muted">Options</h2>

        <div class="flex flex-col gap-2">
          <span class="fz-field-label" aria-hidden="true">Entity style</span>
          <Segmented label="Entity style" options={MODES} bind:value={s.mode} />
          <p class="text-body-sm text-ink-muted">{MODE_HELP[mode]}</p>
        </div>

        <Switch
          label="Encode non-ASCII"
          description="Turn é, —, 🎉 … into references too (named where possible)"
          bind:checked={s.nonAscii}
        />
        {#if !encoding}
          <p class="text-body-sm text-ink-muted">Options apply to encoding. Decoding understands named, decimal and hex references.</p>
        {/if}
      </section>

      <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="html-ref-title">
        <h2 id="html-ref-title" class="text-label text-ink-muted">Common entities</h2>
        <table class="w-full text-body-sm">
          <thead class="sr-only">
            <tr><th scope="col">Character</th><th scope="col">Entity</th></tr>
          </thead>
          <tbody>
            {#each REFERENCE as row (row.entity)}
              <tr>
                <td class="py-1 pr-4 text-ink">
                  {#if row.label}<span class="text-ink-muted">{row.label}</span>{:else}<span class="font-mono">{row.char}</span>{/if}
                </td>
                <td class="py-1 text-right font-mono text-accent-text">{row.entity}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    </div>
  </div>
</ToolLayout>
