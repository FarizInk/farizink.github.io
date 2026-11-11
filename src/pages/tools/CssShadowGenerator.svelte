<script lang="ts">
  import { ArrowDown, ArrowUp, ChevronDown, Copy, Plus, Settings2, Trash2 } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Segmented, Slider, Switch, TextField } from '$lib/components/ds';
  import {
    LIMITS,
    addLayer,
    duplicateLayer,
    moveLayer,
    normalizeModel,
    parseHexColor,
    presetModel,
    presetsFor,
    removeLayer,
    toCss,
    toCssValue,
    type ShadowKind,
    type ShadowLayer,
    type ShadowModel,
    type ShadowPreset
  } from '$lib/tools/shadow';

  const STORAGE_KEY = 'cssShadowGenerator.state';
  const KINDS = [
    { value: 'box', label: 'Box shadow' },
    { value: 'text', label: 'Text shadow' }
  ];
  // Preview colors are output data (what the shadow is rendered on), not UI chrome.
  const BACKGROUNDS = [
    { name: 'White', value: '#ffffff' },
    { name: 'Slate', value: '#f1f5f9' },
    { name: 'Night', value: '#0b0714' },
    { name: 'Violet', value: '#6a4bf0' }
  ];

  interface Saved {
    kind: ShadowKind;
    box: ShadowModel;
    text: ShadowModel;
    background: string;
    foreground: { box: string; text: string };
  }

  function load(): Saved {
    let raw: Partial<Saved> = {};
    try {
      raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') ?? {};
    } catch {
      /* storage blocked or corrupt: start fresh */
    }
    return {
      kind: raw.kind === 'text' ? 'text' : 'box',
      box: normalizeModel(raw.box ? { ...raw.box, kind: 'box' } : null, 'box'),
      text: normalizeModel(raw.text ? { ...raw.text, kind: 'text' } : null, 'text'),
      background: parseHexColor(String(raw.background ?? '')) ?? '#f1f5f9',
      foreground: {
        box: parseHexColor(String(raw.foreground?.box ?? '')) ?? '#ffffff',
        text: parseHexColor(String(raw.foreground?.text ?? '')) ?? '#1f2937'
      }
    };
  }

  const saved = load();
  let kind = $state<ShadowKind>(saved.kind);
  let models = $state<Record<ShadowKind, ShadowModel>>({ box: saved.box, text: saved.text });
  let background = $state(saved.background);
  let foreground = $state(saved.foreground);
  let sampleText = $state('Shadow');
  let expanded = $state<number[]>([saved[saved.kind].layers[0].id]);
  /** In-progress hex text per layer while it isn't a valid color yet. */
  let hexDrafts = $state<Record<string, string>>({});

  $effect(() => {
    const data = JSON.stringify({ kind, ...models, background, foreground });
    try {
      localStorage.setItem(STORAGE_KEY, data);
    } catch {
      /* storage blocked: settings just won't persist */
    }
  });

  const model = $derived(models[kind]);
  const cssValue = $derived(toCssValue(model));
  const cssCode = $derived(toCss(model));
  const presets = $derived(presetsFor(kind));

  function update(fn: (m: ShadowModel) => ShadowModel) {
    models[kind] = fn(models[kind]);
  }

  function switchKind(v: string) {
    kind = v as ShadowKind;
    hexDrafts = {};
    expanded = [models[kind].layers[0].id];
  }

  function add() {
    update(addLayer);
    const last = models[kind].layers.at(-1);
    if (last) expanded = [...expanded, last.id];
  }

  function applyPreset(p: ShadowPreset) {
    models[kind] = presetModel(p);
    if (p.preview) {
      background = p.preview.background;
      foreground[kind] = p.preview.foreground;
    }
    hexDrafts = {};
    expanded = [];
  }

  function toggle(id: number) {
    expanded = expanded.includes(id) ? expanded.filter(x => x !== id) : [...expanded, id];
  }

  const draftKey = (layer: ShadowLayer) => `${kind}-${layer.id}`;

  function onHexInput(layer: ShadowLayer, value: string) {
    const hex = parseHexColor(value);
    if (hex) {
      layer.color = hex;
      delete hexDrafts[draftKey(layer)];
    } else {
      hexDrafts[draftKey(layer)] = value;
    }
  }

  function setNumber(layer: ShadowLayer, key: 'x' | 'y' | 'blur' | 'spread', value: number, min: number, max: number) {
    if (Number.isFinite(value)) layer[key] = Math.min(max, Math.max(min, Math.round(value)));
  }

  type NumKey = 'x' | 'y' | 'blur' | 'spread';
  const FIELDS: { key: NumKey; label: string; min: number; max: number; boxOnly?: boolean }[] = [
    { key: 'x', label: 'X offset', ...LIMITS.offset },
    { key: 'y', label: 'Y offset', ...LIMITS.offset },
    { key: 'blur', label: 'Blur', ...LIMITS.blur },
    { key: 'spread', label: 'Spread', ...LIMITS.spread, boxOnly: true }
  ];
</script>

<ToolLayout
  title="CSS Shadow Generator"
  description="Build multi-layer CSS box-shadow and text-shadow effects with a live preview."
  icon={Settings2}
  color="warning"
>
  <div class="flex flex-col gap-4">
    <Segmented label="Shadow type" options={KINDS} value={kind} onchange={switchKind} />

    <div class="grid gap-4 lg:grid-cols-[2fr_3fr]">
      <!-- Preview + output -->
      <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6 lg:sticky lg:top-4 lg:self-start" aria-labelledby="sh-preview">
        <h2 id="sh-preview" class="text-label text-ink-muted">Preview</h2>
        <div class="grid h-64 place-items-center overflow-hidden rounded-md p-8 sm:h-72" style:background-color={background}>
          {#if kind === 'box'}
            <div
              class="size-36 rounded-lg"
              role="img"
              aria-label="Box shadow preview"
              style:background-color={foreground.box}
              style:box-shadow={cssValue}
            ></div>
          {:else}
            <p class="font-display text-display break-all text-center" style:color={foreground.text} style:text-shadow={cssValue}>
              {sampleText || 'Shadow'}
            </p>
          {/if}
        </div>

        <div class="flex flex-wrap items-end gap-3">
          <div class="flex items-center gap-2" role="group" aria-label="Preview background">
            {#each BACKGROUNDS as bg (bg.value)}
              <button
                type="button"
                class="size-8 cursor-pointer rounded-pill transition-[scale] duration-fast ease-spring active:scale-90 aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-accent"
                style:background-color={bg.value}
                aria-label="{bg.name} background"
                aria-pressed={background === bg.value}
                onclick={() => (background = bg.value)}
              ></button>
            {/each}
          </div>
          <label class="flex items-center gap-2 text-body-sm text-ink-muted">
            <input type="color" class="h-9 w-12 cursor-pointer rounded-pill bg-control p-1" bind:value={background} />
            Background
          </label>
          <label class="flex items-center gap-2 text-body-sm text-ink-muted">
            <input type="color" class="h-9 w-12 cursor-pointer rounded-pill bg-control p-1" bind:value={foreground[kind]} />
            {kind === 'box' ? 'Element' : 'Text'}
          </label>
        </div>
        {#if kind === 'text'}
          <TextField label="Sample text" bind:value={sampleText} maxlength={40} />
        {/if}

        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-label text-ink-muted">CSS</h3>
            <CopyChip value={cssCode}>Copy CSS</CopyChip>
          </div>
          <pre
            class="overflow-x-auto rounded-md bg-sunken p-4 font-mono text-code whitespace-pre-wrap break-all text-ink"
            aria-label="Generated CSS">{cssCode}</pre>
        </div>
      </section>

      <!-- Presets + layers -->
      <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="sh-layers">
        <div class="flex flex-col gap-3">
          <h2 class="text-label text-ink-muted">Presets</h2>
          <div class="flex flex-wrap gap-2">
            {#each presets as p (p.name)}
              <Button variant="secondary" size="sm" onclick={() => applyPreset(p)}>{p.name}</Button>
            {/each}
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="sh-layers" class="text-label text-ink-muted">Layers</h2>
            <p class="text-body-sm text-ink-muted">The first layer is drawn on top.</p>
          </div>
          <Button variant="secondary" size="sm" onclick={add}>
            {#snippet icon()}<Plus size={16} />{/snippet}
            Add layer
          </Button>
        </div>

        <ol class="flex flex-col gap-3">
          {#each model.layers as layer, i (layer.id)}
            {@const open = expanded.includes(layer.id)}
            {@const draft = hexDrafts[draftKey(layer)]}
            <li class="flex flex-col gap-4 rounded-md bg-control p-4" class:opacity-60={!layer.enabled && !open}>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-sm text-left text-ink"
                  aria-expanded={open}
                  aria-controls="sh-layer-{layer.id}"
                  onclick={() => toggle(layer.id)}
                >
                  <ChevronDown size={18} class="shrink-0 transition-[rotate] duration-fast {open ? '' : '-rotate-90'}" aria-hidden="true" />
                  <span class="size-5 shrink-0 rounded-pill" style:background-color={layer.color} style:opacity={layer.opacity / 100} aria-hidden="true"></span>
                  <span class="min-w-0">
                    <span class="block text-body-sm">Layer {i + 1}</span>
                    <span class="block truncate font-mono text-code text-ink-muted">
                      {layer.x} {layer.y} {layer.blur}{kind === 'box' ? ` ${layer.spread}` : ''}{kind === 'box' && layer.inset ? ' inset' : ''}
                    </span>
                  </span>
                </button>
                <Switch label="Show" aria-label="Show layer {i + 1}" bind:checked={layer.enabled} />
                <div class="flex flex-wrap gap-1">
                  {#if i > 0}
                    <IconButton label="Move layer {i + 1} up" onclick={() => update(m => moveLayer(m, layer.id, -1))}><ArrowUp /></IconButton>
                  {/if}
                  {#if i < model.layers.length - 1}
                    <IconButton label="Move layer {i + 1} down" onclick={() => update(m => moveLayer(m, layer.id, 1))}><ArrowDown /></IconButton>
                  {/if}
                  <IconButton label="Duplicate layer {i + 1}" onclick={() => update(m => duplicateLayer(m, layer.id))}><Copy /></IconButton>
                  {#if model.layers.length > 1}
                    <IconButton label="Remove layer {i + 1}" onclick={() => update(m => removeLayer(m, layer.id))}><Trash2 /></IconButton>
                  {/if}
                </div>
              </div>

              {#if open}
                <div id="sh-layer-{layer.id}" class="grid gap-4 sm:grid-cols-2">
                  {#each FIELDS.filter(f => !f.boxOnly || kind === 'box') as f (f.key)}
                    <div class="flex items-end gap-3">
                      <div class="min-w-0 flex-1">
                        <Slider label={f.label} unit="px" min={f.min} max={f.max} bind:value={layer[f.key]} />
                      </div>
                      <div class="w-24 shrink-0">
                        <TextField
                          type="number"
                          inputmode="numeric"
                          aria-label="{f.label} in pixels, layer {i + 1}"
                          min={f.min}
                          max={f.max}
                          step={1}
                          value={layer[f.key]}
                          oninput={e => setNumber(layer, f.key, e.currentTarget.valueAsNumber, f.min, f.max)}
                          onchange={e => (e.currentTarget.value = String(layer[f.key]))}
                        />
                      </div>
                    </div>
                  {/each}

                  <div class="flex items-end gap-3">
                    <input
                      type="color"
                      aria-label="Layer {i + 1} color picker"
                      class="h-11 w-14 shrink-0 cursor-pointer rounded-pill bg-sunken p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                      value={layer.color}
                      oninput={e => onHexInput(layer, e.currentTarget.value)}
                    />
                    <div class="min-w-0 flex-1">
                      <TextField
                        label="Color (hex)"
                        mono
                        spellcheck={false}
                        autocomplete="off"
                        value={draft ?? layer.color}
                        error={draft !== undefined ? 'Use #rgb or #rrggbb' : undefined}
                        oninput={e => onHexInput(layer, e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <Slider label="Opacity" unit="%" min={0} max={100} bind:value={layer.opacity} />

                  {#if kind === 'box'}
                    <Switch label="Inset" description="Draw the shadow inside the element" bind:checked={layer.inset} />
                  {/if}
                </div>
              {/if}
            </li>
          {/each}
        </ol>
      </section>
    </div>
  </div>
</ToolLayout>
