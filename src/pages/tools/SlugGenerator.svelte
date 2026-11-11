<script lang="ts">
  import { Type } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, Segmented, Slider, Switch, Textarea } from '$lib/components/ds';
  import { DEFAULT_SLUG_OPTIONS, slugify, slugifyLines, uniqueSlugs, type SlugOptions } from '$lib/tools/slug';

  interface Settings {
    mode: string; // 'single' | 'batch'
    separator: string;
    lowercase: boolean;
    keepUnicode: boolean;
    removeStopWords: boolean;
    ampersand: boolean;
    maxLength: number;
    breakAtWord: boolean;
  }

  const STORAGE_KEY = 'slugGenerator.options';
  const MAX_LIMIT = 200;
  const BATCH_PLACEHOLDER = ['My First Post', 'Café Crème Brûlée', 'My First Post'].join('\n');

  const DEFAULTS: Settings = {
    mode: 'single',
    separator: DEFAULT_SLUG_OPTIONS.separator,
    lowercase: DEFAULT_SLUG_OPTIONS.lowercase,
    keepUnicode: DEFAULT_SLUG_OPTIONS.keepUnicode,
    removeStopWords: DEFAULT_SLUG_OPTIONS.removeStopWords,
    ampersand: DEFAULT_SLUG_OPTIONS.ampersand,
    maxLength: DEFAULT_SLUG_OPTIONS.maxLength,
    breakAtWord: DEFAULT_SLUG_OPTIONS.breakAtWord
  };

  const MODES = [
    { value: 'single', label: 'Single' },
    { value: 'batch', label: 'Batch' }
  ];

  const SEPARATORS = [
    { value: '-', label: 'Hyphen -' },
    { value: '_', label: 'Underscore _' },
    { value: '.', label: 'Dot .' },
    { value: '', label: 'None' }
  ];

  /** Saved options, validated field by field so a stale or hand-edited entry can't break the page. */
  function loadSettings(): Settings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const saved = JSON.parse(raw) as Partial<Record<keyof Settings, unknown>>;
      const s: Settings = { ...DEFAULTS };
      if (saved.mode === 'single' || saved.mode === 'batch') s.mode = saved.mode;
      if (typeof saved.separator === 'string' && SEPARATORS.some(o => o.value === saved.separator)) {
        s.separator = saved.separator;
      }
      for (const k of ['lowercase', 'keepUnicode', 'removeStopWords', 'ampersand', 'breakAtWord'] as const) {
        if (typeof saved[k] === 'boolean') s[k] = saved[k];
      }
      if (typeof saved.maxLength === 'number' && Number.isFinite(saved.maxLength)) {
        s.maxLength = Math.min(MAX_LIMIT, Math.max(0, Math.round(saved.maxLength)));
      }
      return s;
    } catch {
      return { ...DEFAULTS };
    }
  }

  let s = $state<Settings>(loadSettings());
  let singleText = $state('');
  let batchText = $state('');

  $effect(() => {
    const data = JSON.stringify(s);
    try {
      localStorage.setItem(STORAGE_KEY, data);
    } catch {
      /* storage blocked: options just won't persist */
    }
  });

  const opts = $derived<SlugOptions>({
    separator: s.separator,
    lowercase: s.lowercase,
    keepUnicode: s.keepUnicode,
    removeStopWords: s.removeStopWords,
    ampersand: s.ampersand,
    maxLength: s.maxLength,
    breakAtWord: s.breakAtWord
  });

  const slug = $derived(slugify(singleText, opts));
  const batch = $derived(uniqueSlugs(slugifyLines(batchText, opts), s.separator || '-'));
  const batchJoined = $derived(batch.join('\n'));
  const isBatch = $derived(s.mode === 'batch');
  const hasInput = $derived((isBatch ? batchText : singleText).trim() !== '');
  const lengthLabel = $derived(s.maxLength > 0 ? `${s.maxLength} characters` : 'No limit');
</script>

<ToolLayout
  title="Slug Generator"
  description="Turn titles into clean, URL-friendly slugs. Accents are transliterated, punctuation and emoji are dropped."
  icon={Type}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <!-- Input + result -->
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="slug-main-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="slug-main-title" class="text-label text-ink-muted">{isBatch ? 'Titles' : 'Title'}</h2>
        <div class="w-full sm:w-56">
          <Segmented label="Mode" options={MODES} bind:value={s.mode} />
        </div>
      </div>

      {#if isBatch}
        <Textarea
          label="Titles, one per line"
          hint="Each line becomes a slug. Repeats get -2, -3 … so every slug is unique."
          rows={8}
          bind:value={batchText}
          placeholder={BATCH_PLACEHOLDER}
        />
      {:else}
        <Textarea
          label="Text to slugify"
          rows={3}
          bind:value={singleText}
          placeholder="Café Crème Brûlée: A Beginner's Guide"
        />
      {/if}

      <div class="flex flex-col gap-3" aria-live="polite">
        <h3 class="text-label text-ink-muted">{isBatch ? `Slugs (${batch.length})` : 'Slug'}</h3>

        {#if isBatch && batch.length}
          <ol class="flex max-h-80 flex-col gap-1 overflow-auto rounded-md bg-sunken p-4 font-mono text-code text-ink">
            {#each batch as item, i (i)}
              <li class="break-all">{item}</li>
            {/each}
          </ol>
          <div>
            <CopyChip value={batchJoined}>Copy all</CopyChip>
          </div>
        {:else if !isBatch && slug}
          <output
            class="block rounded-md bg-sunken px-5 py-4 font-mono text-body break-all text-ink"
            aria-label="Generated slug"
          >
            {slug}
          </output>
          <div class="flex flex-wrap items-center gap-3">
            <CopyChip value={slug}>Copy slug</CopyChip>
            <span class="text-body-sm text-ink-muted">{[...slug].length} characters</span>
          </div>
          <p class="font-mono text-body-sm break-all text-ink-muted">
            https://example.com/blog/<span class="text-accent-text">{slug}</span>
          </p>
        {:else if hasInput}
          <p class="text-body text-ink-muted">
            Nothing usable left — the text has no letters or digits that fit these options.
            {#if !s.keepUnicode}Try turning on “Keep non-Latin letters”.{/if}
          </p>
        {:else}
          <EmptyState
            title={isBatch ? 'No titles yet' : 'No text yet'}
            text={isBatch ? 'Paste one title per line to get a list of slugs.' : 'Type a title above and the slug appears as you type.'}
          />
        {/if}
      </div>
    </section>

    <!-- Options -->
    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="slug-options-title">
      <h2 id="slug-options-title" class="text-label text-ink-muted">Options</h2>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Separator</span>
        <Segmented label="Separator" options={SEPARATORS} bind:value={s.separator} />
      </div>

      <div class="flex flex-col gap-4">
        <Switch label="Lowercase" bind:checked={s.lowercase} />
        <Switch
          label="Keep non-Latin letters"
          description="Keep 日本語, Ελληνικά, Кириллица … instead of dropping them"
          bind:checked={s.keepUnicode}
        />
        <Switch label="Remove stop words" description="a, the, of, to, in …" bind:checked={s.removeStopWords} />
        <Switch label="Replace & with “and”" bind:checked={s.ampersand} />
      </div>

      <div class="flex flex-col gap-3">
        <Slider label="Max length" min={0} max={MAX_LIMIT} step={5} bind:value={s.maxLength} marks={['No limit', String(MAX_LIMIT)]} />
        <p class="text-body-sm text-ink-muted">{lengthLabel}. 0 means no limit.</p>
        <Switch
          label="Break at word"
          description="Cut between words, never mid-word"
          bind:checked={s.breakAtWord}
          disabled={s.maxLength === 0 || s.separator === ''}
        />
      </div>
    </section>
  </div>
</ToolLayout>
