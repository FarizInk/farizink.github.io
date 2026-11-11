<script lang="ts">
  import { Palette, Shuffle } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { TextField, Segmented, CopyChip, Button } from '$lib/components/ds';
  import {
    parseHex,
    harmony,
    shadeScale,
    randomHex,
    formatOklch,
    bestTextColor,
    slugName,
    toCssVariables,
    toTailwindTheme,
    toTailwindConfig,
    toJson,
    isHarmony,
    HARMONIES,
    type HarmonyType
  } from '$lib/tools/palette';

  const BASE_KEY = 'colorPalette.base';
  const HARMONY_KEY = 'colorPalette.harmony';
  const DEFAULT = '#3b82f6';

  function read(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  function write(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage blocked: settings live for this visit only */
    }
  }

  const storedHarmony = read(HARMONY_KEY);
  const initialBase = parseHex(read(BASE_KEY) ?? '') ?? DEFAULT;
  let base = $state(initialBase);
  let text = $state(initialBase);
  let harmonyType = $state<HarmonyType>(isHarmony(storedHarmony) ? storedHarmony : 'complementary');
  let paletteName = $state('brand');
  let exportFormat = $state('css');

  const invalid = $derived(text.trim() !== '' && parseHex(text) === null);
  const swatches = $derived(harmony(base, harmonyType));
  const scale = $derived(shadeScale(base));
  const slug = $derived(slugName(paletteName));

  const XL_COLS: Record<number, string> = {
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    6: 'xl:grid-cols-6'
  };

  const FORMATS = [
    { value: 'css', label: 'CSS variables' },
    { value: 'tw4', label: 'Tailwind v4' },
    { value: 'tw3', label: 'Tailwind v3' },
    { value: 'json', label: 'JSON' }
  ];
  const code = $derived.by(() => {
    switch (exportFormat) {
      case 'tw4':
        return toTailwindTheme(paletteName, scale);
      case 'tw3':
        return toTailwindConfig(paletteName, scale);
      case 'json':
        return toJson(paletteName, scale);
      default:
        return toCssVariables(paletteName, scale);
    }
  });

  $effect(() => write(BASE_KEY, base));
  $effect(() => write(HARMONY_KEY, harmonyType));

  function onText(e: Event & { currentTarget: HTMLInputElement }) {
    text = e.currentTarget.value;
    const p = parseHex(text);
    if (p) base = p;
  }

  function setBase(hex: string) {
    base = hex;
    text = hex;
  }
</script>

<ToolLayout
  title="Color Palette Generator"
  description="Build a palette from one color: OKLCH harmonies, a 50–950 shade scale, and ready-to-paste CSS, Tailwind or JSON."
  icon={Palette}
  color="warning"
>
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-label="Base color">
    <div class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-start">
      <TextField
        label="Base color"
        mono
        value={text}
        oninput={onText}
        placeholder="#3b82f6"
        maxlength={8}
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
        error={invalid ? `Enter a 3- or 6-digit hex color — still showing ${base}.` : undefined}
        hint={invalid ? undefined : 'HEX with or without #, 3 or 6 digits.'}
      />
      <div class="flex flex-col gap-2">
        <label class="fz-field-label" for="cp-picker">Picker</label>
        <input
          id="cp-picker"
          type="color"
          class="h-12 w-full cursor-pointer rounded-md border-0 bg-control p-1.5 sm:w-20"
          value={base}
          oninput={e => setBase(e.currentTarget.value)}
        />
      </div>
      <div class="flex flex-col gap-2 sm:pt-7">
        <Button variant="secondary" onclick={() => setBase(randomHex())}>
          {#snippet icon()}<Shuffle class="size-4" aria-hidden="true" />{/snippet}
          Random
        </Button>
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cp-harmony">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 id="cp-harmony" class="section-title">Harmony</h2>
      <Segmented label="Harmony type" options={HARMONIES} bind:value={harmonyType} />
    </div>
    <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 {XL_COLS[swatches.length] ?? 'xl:grid-cols-3'}">
      {#each swatches as s, i (i)}
        <li class="flex flex-col gap-3 rounded-md bg-control p-2">
          <div
            class="flex h-28 flex-col justify-end gap-0.5 rounded-sm p-3"
            style="background-color: {s.hex}; color: {bestTextColor(s.hex)}"
          >
            <span class="text-body-sm font-medium">{s.name}{s.isBase && s.name !== 'Base' ? ' · base' : ''}</span>
            <span class="font-mono text-label">{formatOklch(s.hex)}</span>
          </div>
          <CopyChip value={s.hex}><span class="sr-only">Copy </span><span class="font-mono">{s.hex}</span></CopyChip>
        </li>
      {/each}
    </ul>
  </section>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cp-scale">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id="cp-scale" class="section-title">Shade scale</h2>
      <span class="text-body-sm text-ink-muted">
        Base color is step <span class="font-mono text-ink">{scale.baseStep}</span>
      </span>
    </div>
    <div class="flex h-20 overflow-hidden rounded-md" aria-hidden="true">
      {#each scale.steps as s (s.step)}
        <div
          class="flex flex-1 flex-col items-center justify-end pb-2 font-mono text-label"
          style="background-color: {s.hex}; color: {bestTextColor(s.hex)}"
        >
          <span>{s.step}</span>
          {#if s.isBase}<span>●</span>{/if}
        </div>
      {/each}
    </div>
    <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {#each scale.steps as s (s.step)}
        <li class="flex items-center gap-3 rounded-md bg-control py-1.5 pr-1.5 pl-1.5">
          <span class="size-8 shrink-0 rounded-pill" style="background-color: {s.hex}" aria-hidden="true"></span>
          <span class="min-w-0 flex-1 text-body-sm text-ink">
            <span class="font-mono">{slug}-{s.step}</span>
            {#if s.isBase}<span class="text-accent-text"> · base</span>{/if}
          </span>
          <CopyChip value={s.hex}><span class="sr-only">Copy </span><span class="font-mono">{s.hex}</span></CopyChip>
        </li>
      {/each}
    </ul>
  </section>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cp-export">
    <h2 id="cp-export" class="section-title">Export shade scale</h2>
    <div class="overflow-x-auto">
      <Segmented label="Export format" options={FORMATS} bind:value={exportFormat} />
    </div>
    <div class="max-w-xs">
      <TextField
        label="Palette name"
        mono
        bind:value={paletteName}
        placeholder="brand"
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
        hint="Used as {slug}-500"
      />
    </div>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (scrollable code must be keyboard-reachable) -->
    <pre
      class="max-h-96 overflow-auto rounded-md bg-sunken p-4 font-mono text-code text-ink"
      role="region"
      aria-label="Exported code"
      tabindex="0"><code>{code}</code></pre>
    <div>
      <CopyChip value={code}>Copy code</CopyChip>
    </div>
  </section>
</ToolLayout>
