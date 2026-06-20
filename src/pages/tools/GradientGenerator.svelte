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
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Palette class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">CSS Gradient Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Create stunning CSS gradients</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Gradient Preview -->
  <div
    class="tool-card mb-6"
  >
    <h3 class="section-title">Preview</h3>
    <div class="h-48 w-full rounded-lg shadow-inner" style="background: {gradientStyle()}"></div>
  </div>

  <!-- Controls -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
    <!-- Gradient Settings -->
    <div
      class="tool-card"
    >
      <h3 class="section-title">Gradient Settings</h3>

      <div class="space-y-4">
        <div>
          <label
            for="gradient-type-select"
            class="label"
          >
            Gradient Type
          </label>
          <select id="gradient-type-select" bind:value={gradientType} class="tool-select">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>

        <div>
          <label
            for="gradient-direction"
            class="label"
          >
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
    <div
      class="tool-card"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Stops</h3>
        <button class="btn btn-sm btn-copy" onclick={addColorStop}>
          <Plus class="w-4 h-4 mr-1" />
          Add Stop
        </button>
      </div>

      <div class="space-y-3">
        {#each gradientStops as stop, index (stop.color + index)}
          <div class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <input
              type="color"
              bind:value={stop.color}
              oninput={() => updateColorStop(index, 'color', stop.color)}
              class="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            />
            <input
              type="text"
              bind:value={stop.color}
              oninput={() => updateColorStop(index, 'color', stop.color)}
              placeholder="#000000"
              class="tool-input flex-1 text-sm px-2 py-1"
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
              />
              <span class="text-sm text-gray-600 dark:text-gray-400 w-10">{stop.position}%</span>
            </div>
            {#if gradientStops.length > 2}
              <button
                onclick={() => removeColorStop(index)}
                class="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- CSS Output -->
  <div
    class="tool-card mb-6"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h3>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(cssCode, 'css')}>
          <Copy class="w-4 h-4 mr-1" />
          {copiedText === 'css' ? 'Copied!' : 'Copy CSS'}
        </button>
        <button class="btn btn-sm" onclick={downloadCss} style="background-color: #16a34a; color: white;">
          <Download class="w-4 h-4 mr-1" />
          Download
        </button>
      </div>
    </div>

    <pre
      class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto">{cssCode}</pre>
  </div>

  <!-- Preset Gradients -->
  <div
    class="tool-card mb-6"
  >
    <h3 class="section-title">Preset Gradients</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each presetGradients as preset, i (preset.name + i)}
        <button
          onclick={() => loadPreset(preset)}
          class="preset-btn"
        >
          <div
            class="h-16 w-full rounded mb-2"
            style="background: {preset.type === 'linear'
              ? `linear-gradient(${preset.direction}, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
              : `radial-gradient(${preset.direction}, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`}"
          ></div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">{preset.name}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Droplets class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Multiple Gradient Types
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Create linear, radial, and conic gradients with customizable directions
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Copy class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        See your gradient in real-time as you adjust colors and positions
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">CSS Export</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy clean CSS code or download as a file for immediate use
      </p>
    </div>
  </div>
</ToolLayout>
