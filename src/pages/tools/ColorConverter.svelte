<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { Palette, Zap, History, Copy, RefreshCw, ChevronLeft } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  let hexInput = $state('#3B82F6');
  let rgbInput = $state({ r: 59, g: 130, b: 246 });
  let hslInput = $state({ h: 217, s: 91, l: 60 });
  let hsvInput = $state({ h: 217, s: 76, v: 96 });
  let cmykInput = $state({ c: 76, m: 47, y: 0, k: 4 });

  let history = $state<Array<{ color: string; format: string; timestamp: Date }>>([]);

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function hslToRgb(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  function rgbToHsv(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }

  function rgbToCmyk(r: number, g: number, b: number) {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, Math.min(m, y));

    if (k === 1) {
      c = m = y = 0;
    } else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  }

  function updateFromHex() {
    const rgb = hexToRgb(hexInput);
    if (rgb) {
      rgbInput = rgb;
      hslInput = rgbToHsl(rgb.r, rgb.g, rgb.b);
      hsvInput = rgbToHsv(rgb.r, rgb.g, rgb.b);
      cmykInput = rgbToCmyk(rgb.r, rgb.g, rgb.b);
      addToHistory(hexInput, 'HEX');
    }
  }

  function updateFromRgb() {
    hexInput = rgbToHex(rgbInput.r, rgbInput.g, rgbInput.b);
    hslInput = rgbToHsl(rgbInput.r, rgbInput.g, rgbInput.b);
    hsvInput = rgbToHsv(rgbInput.r, rgbInput.g, rgbInput.b);
    cmykInput = rgbToCmyk(rgbInput.r, rgbInput.g, rgbInput.b);
    addToHistory(hexInput, 'RGB');
  }

  function updateFromHsl() {
    const rgb = hslToRgb(hslInput.h, hslInput.s, hslInput.l);
    rgbInput = rgb;
    hexInput = rgbToHex(rgb.r, rgb.g, rgb.b);
    hsvInput = rgbToHsv(rgb.r, rgb.g, rgb.b);
    cmykInput = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    addToHistory(hexInput, 'HSL');
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${format} value`);
  }

  function addToHistory(color: string, format: string) {
    // Avoid duplicates at the top of the list
    if (history.length > 0 && history[0].color === color) return;

    history.unshift({ color, format, timestamp: new Date() });
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    rgbInput = { r, g, b };
    updateFromRgb();
    toast.success('Generated random color');
  }

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"
      >
        <Palette class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between different color formats instantly. Perfect for designers and developers.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a
          href="/"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a
          href="/tools"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">Color Converter</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex justify-center">
    <button onclick={randomColor} class="btn btn-primary btn-sm">
      <RefreshCw class="w-4 h-4 mr-2" />
      Random Color
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Color Preview -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h2>
      <div
        class="w-full h-48 rounded-xl shadow-inner mb-4 transition-colors duration-300"
        style="background-color: {hexInput}"
      ></div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">HEX:</span>
          <span class="font-mono text-gray-900 dark:text-white ml-2">{hexInput}</span>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">RGB:</span>
          <span class="font-mono text-gray-900 dark:text-white ml-2"
            >{rgbInput.r}, {rgbInput.g}, {rgbInput.b}</span
          >
        </div>
      </div>
    </div>

    <!-- Color History -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Colors</h2>
      {#if history.length === 0}
        <div
          class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400"
        >
          <History class="w-8 h-8 mb-2 opacity-50" />
          <p>No colors yet. Start converting!</p>
        </div>
      {:else}
        <div class="grid grid-cols-5 gap-2">
          {#each history as item (item.timestamp.getTime())}
            <div class="group relative">
              <button
                type="button"
                class="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
                style="background-color: {item.color}"
                onclick={() => {
                  hexInput = item.color;
                  updateFromHex();
                }}
                aria-label={`Select color ${item.color}`}
              ></button>
              <div
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"
              >
                {item.color}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Color Formats -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
    <!-- HEX Format -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HEX</h3>
      <div class="flex gap-2">
        <input
          bind:value={hexInput}
          oninput={updateFromHex}
          class="input font-mono"
          placeholder="#000000"
        />
        <button onclick={() => copyToClipboard(hexInput, 'HEX')} class="btn btn-secondary btn-sm">
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- RGB Format -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">RGB</h3>
      <div class="space-y-3">
        {#each ['r', 'g', 'b'] as channel (channel)}
          <div class="flex items-center gap-2">
            <label
              for={`rgb-${channel}`}
              class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"
            >
              {channel}:
            </label>
            <input
              id={`rgb-${channel}`}
              type="range"
              min="0"
              max="255"
              bind:value={rgbInput[channel as keyof typeof rgbInput]}
              oninput={updateFromRgb}
              class="flex-1 accent-primary-500"
            />
            <input
              type="number"
              min="0"
              max="255"
              bind:value={rgbInput[channel as keyof typeof rgbInput]}
              oninput={updateFromRgb}
              class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        {/each}
        <button
          onclick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`, 'RGB')}
          class="btn btn-secondary w-full mt-2"
        >
          Copy RGB
        </button>
      </div>
    </div>

    <!-- HSL Format -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSL</h3>
      <div class="space-y-3">
        {#each ['h', 's', 'l'] as channel (channel)}
          <div class="flex items-center gap-2">
            <label
              for={`hsl-${channel}`}
              class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"
            >
              {channel}:
            </label>
            <input
              id={`hsl-${channel}`}
              type="range"
              min="0"
              max={channel === 'h' ? 360 : 100}
              bind:value={hslInput[channel as keyof typeof hslInput]}
              oninput={updateFromHsl}
              class="flex-1 accent-primary-500"
            />
            <input
              type="number"
              min="0"
              max={channel === 'h' ? 360 : 100}
              bind:value={hslInput[channel as keyof typeof hslInput]}
              oninput={updateFromHsl}
              class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        {/each}
        <button
          onclick={() =>
            copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`, 'HSL')}
          class="btn btn-secondary w-full mt-2"
        >
          Copy HSL
        </button>
      </div>
    </div>

    <!-- HSV Format -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSV</h3>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Hue:</span>
          <span class="font-mono text-gray-900 dark:text-white">{hsvInput.h}°</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Saturation:</span>
          <span class="font-mono text-gray-900 dark:text-white">{hsvInput.s}%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Value:</span>
          <span class="font-mono text-gray-900 dark:text-white">{hsvInput.v}%</span>
        </div>
        <button
          onclick={() =>
            copyToClipboard(`hsv(${hsvInput.h}, ${hsvInput.s}%, ${hsvInput.v}%)`, 'HSV')}
          class="btn btn-secondary w-full mt-4"
        >
          Copy HSV
        </button>
      </div>
    </div>

    <!-- CMYK Format -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">CMYK</h3>
      <div class="space-y-2">
        {#each ['c', 'm', 'y', 'k'] as channel (channel)}
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400 uppercase"
              >{channel === 'k' ? 'Key (Black)' : channel}:</span
            >
            <span class="font-mono text-gray-900 dark:text-white"
              >{cmykInput[channel as keyof typeof cmykInput]}%</span
            >
          </div>
        {/each}
        <button
          onclick={() =>
            copyToClipboard(
              `cmyk(${cmykInput.c}%, ${cmykInput.m}%, ${cmykInput.y}%, ${cmykInput.k}%)`,
              'CMYK'
            )}
          class="btn btn-secondary w-full mt-4"
        >
          Copy CMYK
        </button>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
        <Palette class="w-5 h-5" />
        <h3 class="font-medium">Multiple Formats</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Support for HEX, RGB, HSL, HSV, and CMYK color formats
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
        <Zap class="w-5 h-5" />
        <h3 class="font-medium">Live Conversion</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Real-time color conversion as you type or adjust sliders
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400">
        <History class="w-5 h-5" />
        <h3 class="font-medium">Color History</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Keep track of your recently used colors for quick access
      </p>
    </div>
  </div>
</div>
