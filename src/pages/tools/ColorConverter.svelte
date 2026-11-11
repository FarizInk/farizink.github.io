<script lang="ts">
  import { Palette } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { TextField, Slider, CopyChip, Button, EmptyState } from '$lib/components/ds';
  import {
    parseColor,
    toHex,
    formatRgb,
    formatRgbLegacy,
    formatHsl,
    formatHwb,
    formatOklch,
    formatOklab,
    formatHsv,
    formatCmyk,
    wcag,
    bestTextColor,
    namedColorFor,
    WHITE,
    BLACK,
    type Color
  } from '$lib/tools/color';

  const HISTORY_KEY = 'colorConverter.history';
  const HISTORY_MAX = 10;
  const RECORD_DELAY = 700;
  const DEFAULT = '#3b82f6';

  const initial = parseColor(DEFAULT);
  let text = $state(DEFAULT);
  let color = $state<Color>(initial.ok ? initial.color : { r: 0, g: 0, b: 0, alpha: 1 });
  let clipped = $state(false);
  let error = $state('');
  let alphaPct = $state(100);
  let history = $state<string[]>(readHistory());

  // ---- Outputs -------------------------------------------------------------
  const opaque = $derived<Color>({ ...color, alpha: 1 });
  const hex = $derived(toHex(color));
  const pickerHex = $derived(toHex(opaque));
  const cssColor = $derived(formatRgb(color));
  const opaqueCss = $derived(formatRgb(opaque));
  const name = $derived(namedColorFor(color));
  const translucent = $derived(color.alpha < 1);

  const formats = $derived([
    { id: 'HEX', value: hex },
    { id: 'RGB', value: formatRgb(color) },
    { id: 'RGB legacy', value: formatRgbLegacy(color) },
    { id: 'HSL', value: formatHsl(color) },
    { id: 'HWB', value: formatHwb(color) },
    { id: 'OKLCH', value: formatOklch(color) },
    { id: 'OKLab', value: formatOklab(color) },
    { id: 'HSV', value: formatHsv(color) },
    { id: 'CMYK', value: formatCmyk(color) }
  ]);

  const contrast = $derived([
    { id: 'white', label: 'White text', ink: 'white', ...wcag(opaque, WHITE) },
    { id: 'black', label: 'Black text', ink: 'black', ...wcag(opaque, BLACK) }
  ]);
  const best = $derived(bestTextColor(opaque));

  // ---- Input handlers ------------------------------------------------------
  function setColor(c: Color, isClipped = false) {
    color = c;
    clipped = isClipped;
    alphaPct = Math.round(c.alpha * 100);
    scheduleRecord();
  }

  function onText(e: Event & { currentTarget: HTMLInputElement }) {
    text = e.currentTarget.value;
    if (!text.trim()) {
      error = '';
      return;
    }
    const r = parseColor(text);
    if (r.ok) {
      error = '';
      setColor(r.color, r.clipped);
    } else {
      error = r.message;
    }
  }

  function onPicker(e: Event & { currentTarget: HTMLInputElement }) {
    const r = parseColor(e.currentTarget.value);
    if (!r.ok) return;
    setColor({ ...r.color, alpha: color.alpha });
    text = toHex(color);
    error = '';
  }

  function onAlpha(v: number) {
    color = { ...color, alpha: v / 100 };
    text = toHex(color);
    error = '';
    scheduleRecord();
  }

  // ---- History -------------------------------------------------------------
  function readHistory(): string[] {
    try {
      const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
      if (!Array.isArray(raw)) return [];
      return raw.filter((h): h is string => typeof h === 'string' && parseColor(h).ok).slice(0, HISTORY_MAX);
    } catch {
      return [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      /* storage blocked: history lives for this visit only */
    }
  }

  let recordTimer: ReturnType<typeof setTimeout> | undefined;
  function scheduleRecord() {
    clearTimeout(recordTimer);
    recordTimer = setTimeout(() => record(toHex(color)), RECORD_DELAY);
  }
  $effect(() => () => clearTimeout(recordTimer));

  function record(h: string) {
    if (history[0] === h) return;
    history = [h, ...history.filter(x => x !== h)].slice(0, HISTORY_MAX);
    saveHistory();
  }

  function restore(h: string) {
    const r = parseColor(h);
    if (!r.ok) return;
    clearTimeout(recordTimer);
    color = r.color;
    clipped = false;
    alphaPct = Math.round(r.color.alpha * 100);
    text = h;
    error = '';
  }

  function clearHistory() {
    history = [];
    saveHistory();
  }

  // Checkerboard behind translucent colors, drawn from theme tokens.
  const checker =
    'background-color: var(--bg-control); background-image: repeating-conic-gradient(var(--bg-control-hover) 0 25%, transparent 0 50%); background-size: 16px 16px;';
</script>

<ToolLayout
  title="Color Converter"
  description="Paste any CSS color — HEX, rgb(), hsl(), hwb(), oklch(), oklab() or a name — and get every format plus WCAG contrast."
  icon={Palette}
  color="warning"
>
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-label="Color input">
    <div class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
      <TextField
        label="Paste any color"
        mono
        value={text}
        oninput={onText}
        placeholder="#3b82f6, rgb(59 130 246 / 50%), oklch(62% 0.19 260), tomato…"
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
        error={error || undefined}
        hint={error ? undefined : 'HEX (3/4/6/8 digits), rgb(), hsl(), hwb(), oklch(), oklab() or a CSS color name.'}
      />
      <div class="flex flex-col gap-2">
        <label class="fz-field-label" for="cc-picker">Picker</label>
        <input
          id="cc-picker"
          type="color"
          class="h-12 w-full cursor-pointer rounded-md border-0 bg-control p-1.5 sm:w-20"
          value={pickerHex}
          oninput={onPicker}
        />
      </div>
    </div>

    <Slider label="Alpha" min={0} max={100} unit="%" bind:value={alphaPct} onchange={onAlpha} />

    {#if clipped}
      <p class="text-body-sm text-ink-muted">▼ Outside the sRGB gamut — chroma was reduced to the nearest displayable color.</p>
    {/if}
  </section>

  <div class="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
    <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-label="Preview">
      <div class="overflow-hidden rounded-md bg-sunken p-2">
        <div class="h-48 overflow-hidden rounded-sm" style={checker}>
          <div class="size-full" style="background-color: {cssColor}" role="img" aria-label="Preview of {hex}"></div>
        </div>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <span class="font-mono text-title text-ink">{hex}</span>
        {#if name}<span class="text-label font-mono text-ink-muted">{name}</span>{/if}
      </div>
    </section>

    <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="cc-formats">
      <h2 id="cc-formats" class="section-title">Formats</h2>
      <ul class="flex flex-col gap-2">
        {#each formats as f (f.id)}
          <li class="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md bg-control py-2 pr-2 pl-4">
            <span class="text-label w-24 shrink-0 font-mono text-ink-muted">{f.id}</span>
            <code class="min-w-0 flex-1 font-mono text-code break-all text-ink">{f.value}</code>
            <CopyChip value={f.value}>Copy<span class="sr-only"> {f.id}</span></CopyChip>
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cc-contrast">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id="cc-contrast" class="section-title">Contrast (WCAG 2)</h2>
      <span class="text-body-sm text-ink-muted">
        Best text color: <span class="font-mono text-ink">{best}</span>
      </span>
    </div>
    {#if translucent}
      <p class="text-body-sm text-ink-muted">Contrast uses the color at full opacity.</p>
    {/if}
    <div class="grid gap-4 md:grid-cols-2">
      {#each contrast as c (c.id)}
        <div class="flex flex-col gap-3 rounded-md bg-control p-3">
          <div class="flex flex-col gap-1 rounded-sm p-4" style="background-color: {opaqueCss}; color: {c.ink}">
            <span class="text-title">Large sample text</span>
            <span class="text-body-sm">Normal sample text — the quick brown fox.</span>
          </div>
          <div class="flex flex-wrap items-baseline justify-between gap-2 px-1">
            <span class="text-body-sm text-ink">{c.label}</span>
            <span class="font-mono text-title text-ink">{c.ratio.toFixed(2)}:1</span>
          </div>
          <ul class="grid grid-cols-2 gap-x-4 gap-y-1 px-1 text-body-sm">
            {#each [{ k: 'AA normal', v: c.aaNormal }, { k: 'AA large', v: c.aaLarge }, { k: 'AAA normal', v: c.aaaNormal }, { k: 'AAA large', v: c.aaaLarge }] as row (row.k)}
              <li class="flex justify-between gap-2">
                <span class="text-ink-muted">{row.k}</span>
                <span class="font-mono {row.v ? 'text-live' : 'text-negative'}">{row.v ? '▲ Pass' : '▼ Fail'}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cc-history">
    <div class="flex items-center justify-between gap-2">
      <h2 id="cc-history" class="section-title">Recent colors</h2>
      {#if history.length}
        <Button variant="ghost" size="sm" onclick={clearHistory}>Clear</Button>
      {/if}
    </div>
    {#if history.length === 0}
      <EmptyState title="No colors yet" text="Colors you settle on are kept here, on this device." />
    {:else}
      <ul class="flex flex-wrap gap-2">
        {#each history as h (h)}
          <li>
            <button
              type="button"
              class="group flex cursor-pointer flex-col items-center gap-1 rounded-md bg-control p-1.5 transition-[background-color,scale] duration-fast ease-spring hover:bg-control-hover active:scale-[.96]"
              onclick={() => restore(h)}
              aria-label="Restore {h}"
              title={h}
            >
              <span class="block size-11 overflow-hidden rounded-sm bg-sunken p-0.5">
                <span class="block size-full overflow-hidden rounded-sm" style={checker}>
                  <span class="block size-full" style="background-color: {h}"></span>
                </span>
              </span>
              <span class="text-label font-mono text-ink-muted">{h}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</ToolLayout>
