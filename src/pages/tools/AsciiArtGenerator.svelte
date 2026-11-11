<script lang="ts">
  import { Image } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, Segmented, Select, Textarea } from '$lib/components/ds';
  import { asComment, render, type CommentStyle, type FontId, type LetterSpacing } from '$lib/tools/asciiart';

  const SOFT_CAP = 200;

  const FONT_OPTIONS = [
    { value: 'standard', label: 'Standard' },
    { value: 'block', label: 'Block' },
    { value: 'small', label: 'Small' }
  ];
  const SPACING_OPTIONS = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' }
  ];
  const COMMENT_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'slash', label: '//' },
    { value: 'hash', label: '#' },
    { value: 'block', label: '/* */' }
  ];
  const WRAP_OPTIONS = [
    { value: 'none', label: 'No wrapping' },
    { value: '40', label: '40 columns' },
    { value: '60', label: '60 columns' },
    { value: '80', label: '80 columns' }
  ];

  let text = $state('Hello');
  let font = $state('standard');
  let spacing = $state('1');
  let comment = $state('none');
  let wrap = $state('none');

  const length = $derived(Array.from(text).length);
  const over = $derived(length > SOFT_CAP);
  const source = $derived(over ? Array.from(text).slice(0, SOFT_CAP).join('') : text);

  const result = $derived(
    render(source, font as FontId, {
      letterSpacing: Number(spacing) as LetterSpacing,
      maxWidth: wrap === 'none' ? undefined : Number(wrap)
    })
  );
  const lines = $derived(asComment(result.lines, comment as CommentStyle));
  const output = $derived(lines.join('\n'));
  const width = $derived(lines.reduce((m, l) => Math.max(m, Array.from(l).length), 0));
  const unsupportedList = $derived(result.unsupported.map(c => (c === ' ' ? 'space' : `“${c}”`)).join(', '));
</script>

<ToolLayout
  title="ASCII Art Generator"
  description="Turn text into banner-style ASCII art for READMEs, terminal splash screens and code comments."
  icon={Image}
  color="warning"
>
  <div class="grid min-w-0 gap-4 lg:grid-cols-[2fr_3fr]">
    <!-- Input + options -->
    <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="ascii-options-title">
      <h2 id="ascii-options-title" class="text-label text-ink-muted">Text & style</h2>

      <Textarea
        label="Text"
        rows={3}
        bind:value={text}
        placeholder="Hello world"
        hint={over ? undefined : `${length} / ${SOFT_CAP} characters. Each line becomes its own banner.`}
        error={over ? `Only the first ${SOFT_CAP} characters are drawn (${length} typed).` : undefined}
      />

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Font</span>
        <Segmented label="Font" options={FONT_OPTIONS} bind:value={font} />
      </div>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Letter spacing</span>
        <Segmented label="Letter spacing" options={SPACING_OPTIONS} bind:value={spacing} />
      </div>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Comment style</span>
        <Segmented label="Comment style" options={COMMENT_OPTIONS} bind:value={comment} />
      </div>

      <Select label="Wrap at" options={WRAP_OPTIONS} bind:value={wrap} hint="Breaks between words when a banner gets wider." />
    </section>

    <!-- Output -->
    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="ascii-output-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="ascii-output-title" class="text-label text-ink-muted">Output</h2>
        {#if output}
          <span class="font-mono text-body-sm text-ink-muted">{width} columns × {lines.length} lines</span>
        {/if}
      </div>

      {#if output}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <pre
          class="max-h-[32rem] min-w-0 overflow-auto rounded-md bg-sunken p-4 font-mono text-[13px] whitespace-pre text-ink {font === 'block' ? 'leading-none' : 'leading-tight'}"
          tabindex="0"
          aria-label="Generated ASCII art">{output}</pre>

        {#if result.unsupported.length}
          <p class="text-body-sm text-ink-muted">
            No glyph for {unsupportedList} — drawn as “?”. Supported: A–Z, 0–9, space and . , ! ? - _ : ; ' " / ( ) + = # @ & *
          </p>
        {/if}

        <div>
          <CopyChip value={output}>Copy</CopyChip>
        </div>
      {:else}
        <EmptyState title="No text yet" text="Type something on the left and the banner appears as you type." />
      {/if}
    </section>
  </div>
</ToolLayout>
