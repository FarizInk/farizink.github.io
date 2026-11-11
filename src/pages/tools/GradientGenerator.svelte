<script lang="ts">
  import { ArrowLeftRight, Palette, Plus, Rows3, Trash2 } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Segmented, Select, Slider, Switch, TextField } from '$lib/components/ds';
  import {
    addStop,
    applyPickerColor,
    distributeEvenly,
    getAlpha,
    isProbablyColor,
    normalizeModel,
    PRESETS,
    presetModel,
    removeStop,
    resolvedPositions,
    reverseStops,
    toCss,
    toCssDeclaration,
    toPickerHex,
    withAlpha,
    type ColorStop,
    type GradientModel,
    type GradientType,
    type RadialShape,
    type RadialSize
  } from '$lib/tools/gradient';

  const STORAGE_KEY = 'gradientGenerator.model';

  const TYPES = [
    { value: 'linear', label: 'Linear' },
    { value: 'radial', label: 'Radial' },
    { value: 'conic', label: 'Conic' }
  ];
  const SHAPES = [
    { value: 'circle', label: 'Circle' },
    { value: 'ellipse', label: 'Ellipse' }
  ];
  const SIZES = [
    { value: 'farthest-corner', label: 'Farthest corner' },
    { value: 'farthest-side', label: 'Farthest side' },
    { value: 'closest-corner', label: 'Closest corner' },
    { value: 'closest-side', label: 'Closest side' }
  ];
  const QUICK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

  /** Real browser check when available; the module heuristic otherwise. */
  const supportsCss = typeof CSS !== 'undefined' && typeof CSS.supports === 'function';
  function isColor(value: string): boolean {
    const v = value.trim();
    if (!v || /[;{}]|var\(/i.test(v)) return false;
    return supportsCss ? CSS.supports('color', v) : isProbablyColor(v);
  }

  function load(): GradientModel {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return normalizeModel(raw ? JSON.parse(raw) : null);
    } catch {
      return normalizeModel(null);
    }
  }

  let model = $state<GradientModel>(load());
  let fallback = $state(true);

  $effect(() => {
    const data = JSON.stringify(model);
    try {
      localStorage.setItem(STORAGE_KEY, data);
    } catch {
      /* storage blocked: the gradient just won't persist */
    }
  });

  const gradient = $derived(toCss(model, isColor));
  const cssCode = $derived(toCssDeclaration(model, { fallback, isColor }));
  const autoPositions = $derived(resolvedPositions(model.stops));
  const invalidCount = $derived(model.stops.filter(s => !isColor(s.color)).length);
  const repeatHint = $derived(
    model.repeating && autoPositions.length > 0 && autoPositions[autoPositions.length - 1] >= 100
  );

  const presetCss = PRESETS.map(p => toCss(presetModel(p)));

  // ---- native color picker bridge ----
  let canvasCtx: CanvasRenderingContext2D | null | undefined;
  /** '#rrggbb' for any CSS color (named, hsl, oklch …) via canvas normalisation. */
  function resolveHex(value: string): string | null {
    const direct = toPickerHex(value);
    if (direct) return direct;
    if (!isColor(value)) return null;
    if (canvasCtx === undefined) canvasCtx = document.createElement('canvas').getContext('2d');
    if (!canvasCtx) return null;
    canvasCtx.fillStyle = '#000000';
    canvasCtx.fillStyle = value.trim();
    return toPickerHex(String(canvasCtx.fillStyle));
  }

  function pickerValue(stop: ColorStop): string {
    return resolveHex(stop.color) ?? '#000000';
  }

  function alphaPct(stop: ColorStop): number {
    return Math.round(getAlpha(stop.color) * 100);
  }

  function setAlpha(stop: ColorStop, pct: number) {
    stop.color = withAlpha(resolveHex(stop.color) ?? '#000000', pct / 100);
  }
</script>

<ToolLayout
  title="CSS Gradient Generator"
  description="Build linear, radial and conic CSS gradients with color stops, transparency and repeating patterns."
  icon={Palette}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <!-- Preview + output -->
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="grad-preview-title">
      <h2 id="grad-preview-title" class="text-label text-ink-muted">Preview</h2>
      <div class="relative h-64 overflow-hidden rounded-md bg-sunken sm:h-80">
        {#if gradient}
          <div
            class="absolute inset-0"
            role="img"
            aria-label="Gradient preview"
            style:background-image={gradient}
          ></div>
        {:else}
          <p class="grid h-full place-items-center p-6 text-center text-body text-ink-muted">
            No valid color stops — fix the colors below to see the gradient.
          </p>
        {/if}
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h3 class="text-label text-ink-muted">CSS</h3>
          {#if cssCode}<CopyChip value={cssCode}>Copy CSS</CopyChip>{/if}
        </div>
        <pre
          class="overflow-x-auto rounded-md bg-sunken p-4 font-mono text-code whitespace-pre-wrap break-all text-ink"
          aria-label="Generated CSS">{cssCode || '/* no valid color stops */'}</pre>
        <Switch
          label="Solid fallback color"
          description="Adds background-color with the first stop for very old browsers"
          bind:checked={fallback}
        />
      </div>
    </section>

    <!-- Geometry -->
    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="grad-settings-title">
      <h2 id="grad-settings-title" class="text-label text-ink-muted">Settings</h2>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label" aria-hidden="true">Type</span>
        <Segmented label="Gradient type" options={TYPES} bind:value={() => model.type, v => (model.type = v as GradientType)} />
      </div>

      <div class="flex flex-col gap-2">
        <Switch
          label="Repeating"
          description="Repeat the stops to fill the box"
          bind:checked={model.repeating}
        />
        {#if repeatHint}
          <p class="text-body-sm text-ink-muted">
            Repeating only shows when the last stop is below 100% — try the Stripes preset.
          </p>
        {/if}
      </div>

      {#if model.type === 'linear'}
        <div class="flex flex-col gap-3">
          <Slider label="Angle" min={0} max={360} unit="°" bind:value={model.angle} />
          <div class="flex flex-wrap gap-2" role="group" aria-label="Quick angles">
            {#each QUICK_ANGLES as a (a)}
              <button
                type="button"
                class="quick-btn rounded-pill"
                class:active={model.angle === a}
                aria-pressed={model.angle === a}
                onclick={() => (model.angle = a)}>{a}°</button
              >
            {/each}
          </div>
        </div>
      {:else}
        {#if model.type === 'radial'}
          <div class="flex flex-col gap-2">
            <span class="fz-field-label" aria-hidden="true">Shape</span>
            <Segmented
              label="Shape"
              options={SHAPES}
              bind:value={() => model.shape, v => (model.shape = v as RadialShape)}
            />
          </div>
          <Select
            label="Size"
            options={SIZES}
            bind:value={() => model.size, v => (model.size = v as RadialSize)}
          />
        {:else}
          <Slider label="Start angle" min={0} max={360} unit="°" bind:value={model.from} />
        {/if}
        <Slider label="Center X" min={0} max={100} unit="%" bind:value={model.position.x} />
        <Slider label="Center Y" min={0} max={100} unit="%" bind:value={model.position.y} />
      {/if}
    </section>
  </div>

  <!-- Color stops -->
  <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="grad-stops-title">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 id="grad-stops-title" class="text-label text-ink-muted">
        Color stops ({model.stops.length})
      </h2>
      <div class="flex flex-wrap gap-2">
        <Button size="sm" onclick={() => (model.stops = addStop(model.stops))}>
          {#snippet icon()}<Plus class="size-4" />{/snippet}
          Add stop
        </Button>
        <Button size="sm" variant="secondary" onclick={() => (model.stops = distributeEvenly(model.stops))}>
          {#snippet icon()}<Rows3 class="size-4" />{/snippet}
          Distribute evenly
        </Button>
        <Button size="sm" variant="secondary" onclick={() => (model.stops = reverseStops(model.stops))}>
          {#snippet icon()}<ArrowLeftRight class="size-4" />{/snippet}
          Reverse
        </Button>
      </div>
    </div>

    {#if invalidCount > 0}
      <p class="text-body-sm text-negative" role="status">
        ▼ {invalidCount} invalid {invalidCount === 1 ? 'color is' : 'colors are'} skipped in the preview and CSS.
      </p>
    {/if}

    <ol class="flex flex-col gap-3">
      {#each model.stops as stop, i (stop.id)}
        <li
          class="grid items-end gap-4 rounded-md bg-sunken p-4 sm:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(0,14rem)_minmax(0,1fr)_minmax(0,1fr)_auto]"
        >
          <input
            type="color"
            aria-label="Stop {i + 1} color picker"
            class="h-11 w-14 cursor-pointer rounded-pill bg-control p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            value={pickerValue(stop)}
            oninput={e => (stop.color = applyPickerColor(stop.color, e.currentTarget.value))}
          />
          <TextField
            label="Stop {i + 1} color"
            mono
            spellcheck={false}
            autocomplete="off"
            placeholder="#9b6bff"
            bind:value={stop.color}
            error={isColor(stop.color) ? undefined : 'Not a valid CSS color — skipped'}
          />
          <Slider
            label="Stop {i + 1} position"
            min={0}
            max={100}
            unit="%"
            bind:value={() => stop.position ?? Math.round(autoPositions[i] ?? 0), v => (stop.position = v)}
          />
          <Slider
            label="Stop {i + 1} opacity"
            min={0}
            max={100}
            unit="%"
            bind:value={() => alphaPct(stop), v => setAlpha(stop, v)}
          />
          {#if model.stops.length > 2}
            <IconButton label="Remove stop {i + 1}" onclick={() => (model.stops = removeStop(model.stops, stop.id))}>
              <Trash2 />
            </IconButton>
          {/if}
        </li>
      {/each}
    </ol>
  </section>

  <!-- Presets -->
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="grad-presets-title">
    <h2 id="grad-presets-title" class="text-label text-ink-muted">Presets</h2>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {#each PRESETS as preset, i (preset.name)}
        <button
          type="button"
          onclick={() => (model = presetModel(preset))}
          class="flex cursor-pointer flex-col gap-2 rounded-md bg-control p-2 text-left transition-[background-color,scale] duration-fast ease-spring hover:bg-control-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:scale-[.96]"
        >
          <span class="block h-16 w-full rounded-sm" style:background-image={presetCss[i]} aria-hidden="true"></span>
          <span class="px-1 text-body-sm font-medium text-ink">{preset.name}</span>
        </button>
      {/each}
    </div>
  </section>
</ToolLayout>
