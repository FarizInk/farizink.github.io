<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Droplets, Copy, Download, Zap, Plus, Trash2 } from '@lucide/svelte';

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
    const stops = sortedGradientStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      cssCode = `background: linear-gradient(${gradientDirection}, ${stops});`;
    } else if (gradientType === 'radial') {
      cssCode = `background: radial-gradient(${gradientDirection}, ${stops});`;
    } else if (gradientType === 'conic') {
      cssCode = `background: conic-gradient(from ${gradientDirection}, ${stops});`;
    }
  }

  function addColorStop() {
    const newPosition = gradientStops.length > 0
      ? Math.round((gradientStops[gradientStops.length - 1].position + gradientStops[0].position) / 2)
      : 50;

    gradientStops = [...gradientStops, { color: '#000000', position: Math.min(100, Math.max(0, newPosition)) }];
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

  function handleBackToTools() {
    navigate('/tools');
  }

  // Create a derived value for sorted gradient stops
  const sortedGradientStops = $derived(
    [...gradientStops].sort((a, b) => a.position - b.position)
  );

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

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4">
        <Droplets class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        CSS Gradient Generator
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Create beautiful CSS gradients with live preview and easy customization.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">CSS Gradient Generator</li>
    </ol>
  </nav>

  <!-- Gradient Preview -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
    <div
      class="h-48 w-full rounded-lg shadow-inner"
      style="background: {gradientStyle()}"
    ></div>
  </div>

  <!-- Controls -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Gradient Settings -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gradient Settings</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gradient Type
          </label>
          <select
            bind:value={gradientType}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {gradientType === 'linear' ? 'Direction' : 'Shape'}
          </label>
          <select
            bind:value={gradientDirection}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
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
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Stops</h3>
        <button
          onclick={addColorStop}
          class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus class="w-4 h-4" />
          Add Stop
        </button>
      </div>

      <div class="space-y-3">
        {#each gradientStops as stop, index}
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
              class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <div class="flex items-center gap-1">
              <input
                type="range"
                bind:value={stop.position}
                oninput={() => updateColorStop(index, 'position', parseInt(stop.position))}
                min="0"
                max="100"
                class="w-20"
              />
              <span class="text-sm text-gray-600 dark:text-gray-400 w-10">{stop.position}%</span>
            </div>
            {#if gradientStops.length > 2}
              <button
                onclick={() => removeColorStop(index)}
                class="p-1 text-red-600 hover:text-red-700 transition-colors"
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
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h3>
      <div class="flex gap-2">
        <button
          onclick={() => copyToClipboard(cssCode, 'css')}
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {copiedText === 'css' ? '✓ Copied!' : 'Copy CSS'}
        </button>
        <button
          onclick={downloadCss}
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Download CSS
        </button>
      </div>
    </div>
    <pre class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto">{cssCode}</pre>
  </div>

  <!-- Preset Gradients -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preset Gradients</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each presetGradients as preset}
        <button
          onclick={() => loadPreset(preset)}
          class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
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
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
        <Droplets class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Multiple Gradient Types
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Create linear, radial, and conic gradients with customizable directions
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
        <Copy class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Live Preview
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        See your gradient in real-time as you adjust colors and positions
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
        <Zap class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        CSS Export
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy clean CSS code or download as a file for immediate use
      </p>
    </div>
  </div>
</div>