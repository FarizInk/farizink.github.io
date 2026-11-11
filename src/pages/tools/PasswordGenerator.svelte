<script lang="ts">
  import { Lock, RefreshCw } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, Checkbox, CopyChip, IconButton, Segmented, Slider, Switch, TextField } from '$lib/components/ds';
  import {
    AMBIGUOUS,
    charset,
    entropyBits,
    generatePassphrase,
    generatePassword,
    strengthOf,
    type CharOptions
  } from '$lib/tools/password';
  import { WORDS } from '$lib/tools/wordlist';

  /** Every option the generator has. Presets replace the whole object, so nothing leaks between them. */
  interface Settings {
    mode: string; // 'chars' | 'passphrase' (string because Segmented binds a string)
    length: number;
    upper: boolean;
    lower: boolean;
    digits: boolean;
    symbols: boolean;
    excludeAmbiguous: boolean;
    custom: string;
    words: number;
    separator: string;
    capitalize: boolean;
    appendDigit: boolean;
  }

  const BASE: Settings = {
    mode: 'chars',
    length: 20,
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
    excludeAmbiguous: false,
    custom: '',
    words: 6,
    separator: '-',
    capitalize: false,
    appendDigit: false
  };

  const PRESETS: { id: string; label: string; settings: Settings }[] = [
    { id: 'strong', label: 'Strong', settings: { ...BASE } },
    {
      id: 'readable',
      label: 'Easy to read',
      settings: { ...BASE, length: 16, symbols: false, excludeAmbiguous: true }
    },
    { id: 'max', label: 'Maximum', settings: { ...BASE, length: 64 } },
    { id: 'passphrase', label: 'Passphrase', settings: { ...BASE, mode: 'passphrase' } },
    {
      id: 'memorable',
      label: 'Memorable',
      settings: { ...BASE, mode: 'passphrase', words: 5, separator: ' ', capitalize: true, appendDigit: true }
    }
  ];

  const MODES = [
    { value: 'chars', label: 'Characters' },
    { value: 'passphrase', label: 'Passphrase' }
  ];

  const SEPARATORS = [
    { value: '-', label: 'Hyphen' },
    { value: '.', label: 'Dot' },
    { value: '_', label: 'Underscore' },
    { value: ' ', label: 'Space' },
    { value: '', label: 'None' }
  ];

  const BATCH_SIZE = 5;
  const HISTORY_SIZE = 10;

  let s = $state<Settings>({ ...BASE });
  // Bumping a nonce re-runs the derived generator without changing any option.
  let nonce = $state(0);
  let batchOpen = $state(false);
  let batchNonce = $state(0);
  // Copied passwords, in memory only: never written to storage.
  let history = $state<string[]>([]);

  const charOpts = $derived<CharOptions>({
    length: s.length,
    upper: s.upper,
    lower: s.lower,
    digits: s.digits,
    symbols: s.symbols,
    custom: s.custom,
    excludeAmbiguous: s.excludeAmbiguous
  });
  const isPassphrase = $derived(s.mode === 'passphrase');
  const poolSize = $derived(charset(charOpts).length);

  function makeOne(): string {
    return isPassphrase
      ? generatePassphrase(
          { words: s.words, separator: s.separator, capitalize: s.capitalize, appendDigit: s.appendDigit },
          WORDS
        )
      : generatePassword(charOpts);
  }

  // Live: any option change (or a nonce bump) produces a fresh password.
  const result = $derived.by(() => {
    void nonce;
    try {
      return { value: makeOne(), error: '' };
    } catch (e) {
      return { value: '', error: e instanceof Error ? e.message : String(e) };
    }
  });

  const batch = $derived.by(() => {
    void batchNonce;
    if (!batchOpen) return [];
    try {
      return Array.from({ length: BATCH_SIZE }, makeOne);
    } catch {
      return [];
    }
  });

  const bits = $derived(
    isPassphrase
      ? entropyBits({ mode: 'passphrase', words: s.words, listSize: WORDS.length, appendDigit: s.appendDigit })
      : entropyBits({ mode: 'chars', length: s.length, charsetSize: poolSize })
  );
  const strength = $derived(strengthOf(bits));
  const activePreset = $derived(
    PRESETS.find(p => (Object.keys(BASE) as (keyof Settings)[]).every(k => p.settings[k] === s[k]))?.id
  );

  function applyPreset(settings: Settings) {
    s = { ...settings };
  }

  function remember(value: string) {
    history = [value, ...history.filter(v => v !== value)].slice(0, HISTORY_SIZE);
  }

  function showBatch() {
    batchOpen = true;
    batchNonce++;
  }

  /** Splits a password so digits and symbols can be tinted (letters stay ink). */
  function kind(c: string): string {
    if (/[a-z]/i.test(c)) return '';
    return /\d/.test(c) ? 'text-accent-text' : 'text-ink-muted';
  }
</script>

<ToolLayout
  title="Password Generator"
  description="Random passwords and word passphrases made in your browser with the Web Crypto API. Nothing is sent or saved."
  icon={Lock}
  color="warning"
>
  <!-- Result -->
  <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="pw-result-title">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 id="pw-result-title" class="text-label text-ink-muted">
        {isPassphrase ? 'Your passphrase' : 'Your password'}
      </h2>
      <div class="w-full sm:w-72">
        <Segmented label="Generator type" options={MODES} bind:value={s.mode} />
      </div>
    </div>

    {#if result.error}
      <p class="text-body text-negative" role="alert">▼ {result.error}</p>
    {:else}
      <output
        class="block rounded-md bg-sunken px-5 py-4 font-mono text-title break-all text-ink"
        aria-label={isPassphrase ? 'Generated passphrase' : 'Generated password'}
      >
        {#each [...result.value] as c, i (i)}<span class={kind(c)}>{c}</span>{/each}
      </output>
    {/if}

    <div class="flex flex-wrap items-center gap-3">
      {#if result.value}
        <CopyChip value={result.value} oncopy={remember}>Copy</CopyChip>
      {/if}
      <IconButton label={isPassphrase ? 'Generate a new passphrase' : 'Generate a new password'} onclick={() => nonce++}>
        <RefreshCw />
      </IconButton>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <p class="text-body text-ink">
          <span class="font-medium {strength.band === 'weak' ? 'text-negative' : 'text-ink'}">{strength.label}</span>
          <span class="text-ink-muted"> · {Math.round(bits)} bits of entropy</span>
        </p>
        <p class="text-body-sm text-ink-muted">
          {#if isPassphrase}
            {s.words} words × log2({WORDS.length}){s.appendDigit ? ' + log2(10)' : ''}
          {:else}
            {s.length} chars × log2({poolSize})
          {/if}
        </p>
      </div>
      <div class="h-2 overflow-hidden rounded-pill bg-sunken" aria-hidden="true">
        <div
          class="h-full rounded-pill transition-[width] duration-base ease-smooth {strength.band === 'weak' ? 'bg-negative' : 'bg-accent'}"
          style="width: {Math.max(strength.ratio * 100, 2)}%"
        ></div>
      </div>
      <p class="text-body-sm text-ink-muted">
        Under 40 bits weak · 40–59 fair · 60–79 strong · 80+ very strong. Entropy measures the generator, so it
        assumes an attacker knows these settings.
      </p>
    </div>
  </section>

  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <!-- Options -->
    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="pw-options-title">
      <h2 id="pw-options-title" class="text-label text-ink-muted">Options</h2>

      <div class="flex flex-col gap-2" role="group" aria-labelledby="pw-presets-label">
        <span id="pw-presets-label" class="fz-field-label">Presets</span>
        <div class="flex flex-wrap gap-2">
          {#each PRESETS as p (p.id)}
            <Button
              size="sm"
              variant={activePreset === p.id ? 'primary' : 'secondary'}
              aria-pressed={activePreset === p.id}
              onclick={() => applyPreset(p.settings)}
            >
              {p.label}
            </Button>
          {/each}
        </div>
      </div>

      {#if isPassphrase}
        <Slider label="Words" min={3} max={12} bind:value={s.words} marks={['3', '12']} />

        <div class="flex flex-col gap-2">
          <span class="fz-field-label" aria-hidden="true">Separator</span>
          <Segmented label="Separator" options={SEPARATORS} bind:value={s.separator} />
        </div>

        <div class="flex flex-col gap-3">
          <Switch label="Capitalize words" bind:checked={s.capitalize} />
          <Switch
            label="Add a digit at the end"
            description="Adds about 3.3 bits; helps with sites that demand a number"
            bind:checked={s.appendDigit}
          />
        </div>
        <p class="text-body-sm text-ink-muted">
          Words are drawn from a list of {WORDS.length} common English words, each one adding about
          {Math.log2(WORDS.length).toFixed(1)} bits.
        </p>
      {:else}
        <Slider label="Length" min={8} max={128} bind:value={s.length} marks={['8', '128']} />

        <div class="grid gap-3 sm:grid-cols-2">
          <Checkbox label="Uppercase" description="A–Z" bind:checked={s.upper} />
          <Checkbox label="Lowercase" description="a–z" bind:checked={s.lower} />
          <Checkbox label="Digits" description="0–9" bind:checked={s.digits} />
          <Checkbox label="Symbols" description="!@#$%^&amp;* …" bind:checked={s.symbols} />
        </div>

        <Switch
          label="Exclude look-alikes"
          description={`Leaves out ${AMBIGUOUS.split('').join(' ')}`}
          bind:checked={s.excludeAmbiguous}
        />

        <TextField
          label="Extra characters"
          optional
          mono
          hint="Added as their own group; at least one will appear. Duplicates and spaces are ignored."
          bind:value={s.custom}
          autocomplete="off"
          spellcheck={false}
        />
        <p class="text-body-sm text-ink-muted">
          Every enabled group appears at least once; the rest is drawn from all {poolSize} characters and shuffled.
        </p>
      {/if}
    </section>

    <div class="flex flex-col gap-4">
      <!-- Several at once -->
      <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="pw-batch-title">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="pw-batch-title" class="text-label text-ink-muted">Several at once</h2>
          <Button size="sm" variant="secondary" onclick={showBatch} disabled={!!result.error}>
            {#snippet icon()}<RefreshCw class="size-4" />{/snippet}
            Generate {BATCH_SIZE}
          </Button>
        </div>
        {#if batch.length > 0}
          <ul class="flex flex-col gap-2">
            {#each batch as pw, i (i)}
              <li class="flex items-center gap-3 rounded-md bg-sunken py-1.5 pr-1.5 pl-4">
                <span class="min-w-0 flex-1 font-mono text-body-sm break-all text-ink">{pw}</span>
                <CopyChip value={pw} oncopy={remember}>Copy<span class="sr-only"> option {i + 1}</span></CopyChip>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-body-sm text-ink-muted">Pick from a few candidates with the same settings.</p>
        {/if}
      </section>

      <!-- Copied this session -->
      <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="pw-history-title">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="pw-history-title" class="text-label text-ink-muted">Copied this visit</h2>
          {#if history.length > 0}
            <Button size="sm" variant="ghost" onclick={() => (history = [])}>Clear</Button>
          {/if}
        </div>
        {#if history.length > 0}
          <ul class="flex flex-col gap-2">
            {#each history as pw, i (pw)}
              <li class="flex items-center gap-3 rounded-md bg-sunken py-1.5 pr-1.5 pl-4">
                <span class="min-w-0 flex-1 font-mono text-body-sm break-all text-ink">{pw}</span>
                <CopyChip value={pw}>Copy<span class="sr-only"> copied item {i + 1}</span></CopyChip>
              </li>
            {/each}
          </ul>
        {/if}
        <p class="text-body-sm text-ink-muted">
          Kept in memory only, never saved. Gone when you leave or reload the page.
        </p>
      </section>
    </div>
  </div>
</ToolLayout>
