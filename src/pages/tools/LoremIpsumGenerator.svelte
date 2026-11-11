<script lang="ts">
  import { FileText, Shuffle } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, Segmented, Slider, Switch, TextField } from '$lib/components/ds';
  import { clampAmount, generate, LIMITS, type LoremFormat, type LoremUnit } from '$lib/tools/lorem';

  const UNITS = [
    { value: 'words', label: 'Words' },
    { value: 'sentences', label: 'Sentences' },
    { value: 'paragraphs', label: 'Paragraphs' },
    { value: 'list', label: 'List' }
  ];
  const FORMATS = [
    { value: 'text', label: 'Text' },
    { value: 'html', label: 'HTML' },
    { value: 'markdown', label: 'Markdown' }
  ];
  const UNIT_NOUN: Record<LoremUnit, string> = {
    words: 'Words',
    sentences: 'Sentences',
    paragraphs: 'Paragraphs',
    list: 'List items'
  };

  const newSeed = () => Math.floor(Math.random() * 2 ** 32);

  let unit = $state<string>('paragraphs');
  let format = $state<string>('text');
  let startWithLorem = $state(true);
  let seed = $state(newSeed());
  // Each unit remembers its own amount, so switching units never lands out of range.
  let amounts = $state<Record<LoremUnit, number>>({ words: 50, sentences: 5, paragraphs: 3, list: 5 });

  const u = $derived(unit as LoremUnit);
  const range = $derived(LIMITS[u]);
  const result = $derived(
    generate({ unit: u, amount: amounts[u], startWithLorem, format: format as LoremFormat, seed })
  );
  const isCode = $derived(format !== 'text');
  const paragraphs = $derived(result.text.split(/\n+/));

  /** Snap the typed value back into range once the field loses focus. */
  function commitAmount() {
    amounts[u] = clampAmount(u, Number(amounts[u]));
  }
</script>

<svelte:head>
  <title>Lorem Ipsum Generator - Developer Tools</title>
  <meta
    name="description"
    content="Generate Lorem Ipsum placeholder text as words, sentences, paragraphs or a list — plain text, HTML or Markdown."
  />
</svelte:head>

<ToolLayout
  title="Lorem Ipsum Generator"
  description="Placeholder text as words, sentences, paragraphs or a list — plain text, HTML or Markdown. Updates as you change the options."
  icon={FileText}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[2fr_3fr]">
    <!-- Options -->
    <section class="flex min-w-0 flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="lorem-options-title">
      <h2 id="lorem-options-title" class="text-label text-ink-muted">Options</h2>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Unit</span>
        <Segmented label="Unit" options={UNITS} bind:value={unit} />
      </div>

      <div class="flex flex-col gap-3">
        <Slider
          label={UNIT_NOUN[u]}
          min={range.min}
          max={range.max}
          bind:value={amounts[u]}
          marks={[String(range.min), String(range.max)]}
        />
        <TextField
          label="Exact amount"
          hint={`${range.min}–${range.max}`}
          type="number"
          inputmode="numeric"
          min={range.min}
          max={range.max}
          step="1"
          bind:value={amounts[u]}
          onblur={commitAmount}
        />
      </div>

      <Switch
        label="Start with “Lorem ipsum…”"
        description="Open with the classic “Lorem ipsum dolor sit amet, consectetur adipiscing elit”"
        bind:checked={startWithLorem}
      />

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Format</span>
        <Segmented label="Format" options={FORMATS} bind:value={format} />
      </div>
    </section>

    <!-- Output -->
    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="lorem-output-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="lorem-output-title" class="text-label text-ink-muted">Generated text</h2>
        <Button variant="secondary" size="sm" onclick={() => (seed = newSeed())}>
          {#snippet icon()}<Shuffle class="size-4" aria-hidden="true" />{/snippet}
          Shuffle
        </Button>
      </div>

      <!-- Focusable so keyboard users can scroll long output. -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <div
        class="max-h-[32rem] overflow-auto rounded-md bg-sunken p-5 text-ink"
        role="region"
        aria-label="Generated text"
        tabindex="0"
      >
        {#if isCode}
          <pre class="font-mono text-code whitespace-pre-wrap break-words">{result.text}</pre>
        {:else if u === 'list'}
          <ul class="flex list-disc flex-col gap-1 pl-5 text-body">
            {#each paragraphs as line, i (i)}<li>{line}</li>{/each}
          </ul>
        {:else}
          <div class="flex flex-col gap-4 text-body">
            {#each paragraphs as p, i (i)}<p>{p}</p>{/each}
          </div>
        {/if}
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <CopyChip value={result.text}>Copy</CopyChip>
        <p class="text-body-sm text-ink-muted" aria-live="polite">
          <span class="font-mono text-ink">{result.words.toLocaleString()}</span>
          {result.words === 1 ? 'word' : 'words'} ·
          <span class="font-mono text-ink">{result.characters.toLocaleString()}</span>
          {result.characters === 1 ? 'character' : 'characters'}
        </p>
      </div>
    </section>
  </div>
</ToolLayout>
