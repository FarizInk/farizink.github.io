<script lang="ts">
  import { Droplets, Copy, Zap, Plus, Trash2, Palette, Download } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  let gradientType = $state('linear');
  let gradientDirection = $state('90deg');
  let gradientStops = $state<Array<{ color: string; position: number }>>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
  ]);
  let cssCode = $state('');
  let copiedText = $state('');

  interface PresetGradient {
    name: string;
    type: string;
    direction: string;
    stops: Array<{ color: string; position: number }>;
  }

  const presetGradients: PresetGradient[] = [
    {
      name: 'Sunset',
      type: 'linear',
      direction: '45deg',
      stops: [
        { color: '#ff6b6b', position: 0 },
        { color: '#feca57', position: 100 }
      ]
    },
    {
      name: 'Ocean',
      type: 'linear',
      direction: '135deg',
      stops: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 }
      ]
    },
    {
      name: 'Forest',
      type: 'linear',
      direction: '90deg',
      stops: [
        { color: '#38ef7d', position: 0 },
        { color: '#11998e', position: 100 }
      ]
    },
    {
      name: 'Fire',
      type: 'radial',
      direction: 'circle',
      stops: [
        { color: '#f12711', position: 0 },
        { color: '#f5af19', position: 100 }
      ]
    }
  ];

  function generateCssCode() {
    const stops = sortedGradientStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');

    if (gradientType === 'linear') {
      cssCode = `background: linear-gradient(${gradientDirection}, ${stops});`;
    } else if (gradientType === 'radial') {
      cssCode = `background: radial-gradient(${gradientDirection}, ${stops});`;
    } else if (gradientType === 'conic') {
      cssCode = `background: conic-gradient(from ${gradientDirection}, ${stops});`;
    }
  }

  function addColorStop() {
    const newPosition =
      gradientStops.length > 0
        ? Math.round(
            (gradientStops[gradientStops.length - 1].position + gradientStops[0].position) / 2
          )
        : 50;

    gradientStops = [
      ...gradientStops,
      { color: '#000000', position: Math.min(100, Math.max(0, newPosition)) }
    ];
    generateCssCode();
  }

  function removeColorStop(index: number) {
    if (gradientStops.length > 2) {
      gradientStops = gradientStops.filter((_, i) => i !== index);
      generateCssCode();
    }
  }

  function updateColorStop(index: number, field: 'color' | 'position', value: string | number) {
    const newStops = [...gradientStops];
    if (field === 'color') {
      newStops[index].color = value as string;
    } else {
      newStops[index].position = Math.min(100, Math.max(0, value as number));
    }
    gradientStops = newStops;
    generateCssCode();
  }

  function loadPreset(preset: PresetGradient) {
    gradientType = preset.type;
    gradientDirection = preset.direction;
    gradientStops = [...preset.stops];
    generateCssCode();
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadCss() {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Create a derived value for sorted gradient stops
  const sortedGradientStops = $derived([...gradientStops].sort((a, b) => a.position - b.position));

  // Create a derived value for the gradient style
  const gradientStyle = $derived(() => {
    const stops = sortedGradientStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    if (gradientType === 'linear') {
      return `linear-gradient(${gradientDirection}, ${stops})`;
    } else if (gradientType === 'radial') {
      return `radial-gradient(${gradientDirection}, ${stops})`;
    } else {
      return `linear-gradient(${gradientDirection}, ${stops})`;
    }
  });

  // React to changes and generate CSS code
  $effect(() => {
    generateCssCode();
  });
</script>

<ToolLayout
  title="CSS Gradient Generator"
  description="Create stunning CSS gradients with color stops, direction, and live preview."
  icon={Palette}
  color="warning"
>
  <!-- Gradient Preview -->
  <div class="tool-card">
    <h3 class="section-title">Preview</h3>
    <div class="h-48 w-full rounded-md ring-1 ring-inset ring-ink/10" style="background: {gradientStyle()}"></div>
  </div>

  <!-- Controls -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Gradient Settings -->
    <div class="tool-card">
      <h3 class="section-title">Gradient settings</h3>

      <div class="space-y-4">
        <div>
          <label for="gradient-type-select" class="label">Gradient type</label>
          <select id="gradient-type-select" bind:value={gradientType} class="tool-select">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>

        <div>
          <label for="gradient-direction" class="label">
            {gradientType === 'linear' ? 'Direction' : 'Shape'}
          </label>
          <select id="gradient-direction" bind:value={gradientDirection} class="tool-select">
            {#if gradientType === 'linear'}
              <option value="0deg">↑ Top</option>
              <option value="45deg">↗ Top Right</option>
              <option value="90deg">→ Right</option>
              <option value="135deg">↘ Bottom Right</option>
              <option value="180deg">↓ Bottom</option>
              <option value="225deg">↙ Bottom Left</option>
              <option value="270deg">← Left</option>
              <option value="315deg">↖ Top Left</option>
            {:else if gradientType === 'radial'}
              <option value="circle">Circle</option>
              <option value="ellipse">Ellipse</option>
            {:else}
              <option value="0deg">0°</option>
              <option value="45deg">45°</option>
              <option value="90deg">90°</option>
              <option value="135deg">135°</option>
              <option value="180deg">180°</option>
              <option value="225deg">225°</option>
              <option value="270deg">270°</option>
              <option value="315deg">315°</option>
            {/if}
          </select>
        </div>
      </div>
    </div>

    <!-- Color Stops -->
    <div class="tool-card">
      <div class="card-header">
        <h3 class="section-title mb-0!">Color stops</h3>
        <button class="btn btn-sm btn-secondary" onclick={addColorStop}>
          <Plus class="size-4" />
          Add stop
        </button>
      </div>

      <div class="space-y-3">
        {#each gradientStops as stop, index (stop.color + index)}
          <div class="flex items-center gap-2 rounded-md bg-sunken p-3">
            <input
              type="color"
              bind:value={stop.color}
              oninput={() => updateColorStop(index, 'color', stop.color)}
              class="h-8 w-12 cursor-pointer rounded-sm bg-control p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            />
            <input
              type="text"
              bind:value={stop.color}
              oninput={() => updateColorStop(index, 'color', stop.color)}
              placeholder="#000000"
              class="tool-input flex-1 px-2! py-1! font-mono! text-sm!"
            />
            <div class="flex items-center gap-1">
              <input
                type="range"
                bind:value={stop.position}
                oninput={e =>
                  updateColorStop(
                    index,
                    'position',
                    parseInt((e.target as HTMLInputElement).value)
                  )}
                min="0"
                max="100"
                class="slider w-20"
                style="--p: {stop.position}%"
              />
              <span class="text-count w-10">{stop.position}%</span>
            </div>
            {#if gradientStops.length > 2}
              <button
                onclick={() => removeColorStop(index)}
                class="btn-icon hover:text-negative!"
                aria-label="Remove color stop"
                title="Remove color stop"
              >
                <Trash2 class="size-4" />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- CSS Output -->
  <div class="tool-card">
    <div class="card-header">
      <h3 class="section-title mb-0!">CSS code</h3>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-primary" onclick={() => copyToClipboard(cssCode, 'css')}>
          <Copy class="size-4" />
          {copiedText === 'css' ? 'Copied!' : 'Copy CSS'}
        </button>
        <button class="btn btn-sm btn-secondary" onclick={downloadCss}>
          <Download class="size-4" />
          Download
        </button>
      </div>
    </div>

    <pre
      class="text-code overflow-x-auto rounded-md bg-sunken p-4 font-mono text-ink">{cssCode}</pre>
  </div>

  <!-- Preset Gradients -->
  <div class="tool-card">
    <h3 class="section-title">Preset gradients</h3>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      {#each presetGradients as preset, i (preset.name + i)}
        <button
          onclick={() => loadPreset(preset)}
          class="flex cursor-pointer flex-col rounded-md bg-control p-2 text-left transition-colors hover:bg-control-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <div
            class="mb-2 h-16 w-full rounded-sm"
            style="background: {preset.type === 'linear'
              ? `linear-gradient(${preset.direction}, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
              : `radial-gradient(${preset.direction}, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`}"
          ></div>
          <p class="text-body-sm px-1 font-medium text-ink">{preset.name}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Droplets class="size-5" /></div>
      <h3 class="feature-title">Multiple gradient types</h3>
      <p class="feature-description">
        Create linear, radial, and conic gradients with customizable directions
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Copy class="size-5" /></div>
      <h3 class="feature-title">Live preview</h3>
      <p class="feature-description">
        See your gradient in real-time as you adjust colors and positions
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Zap class="size-5" /></div>
      <h3 class="feature-title">CSS export</h3>
      <p class="feature-description">Copy clean CSS code or download as a file for immediate use</p>
    </div>
  </div>
</ToolLayout>
