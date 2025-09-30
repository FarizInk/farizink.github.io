<script lang="ts">
  import { navigate } from '../../lib/router.js';
import { ChevronLeft, Palette, Zap, Calendar } from '@lucide/svelte';

  let hexInput = $state('#3B82F6');
  let rgbInput = $state({ r: 59, g: 130, b: 246 });
  let hslInput = $state({ h: 217, s: 91, l: 60 });
  let hsvInput = $state({ h: 217, s: 76, v: 96 });
  let cmykInput = $state({ c: 76, m: 47, y: 0, k: 4 });

  let history = $state<Array<{ color: string; format: string; timestamp: Date }>>([]);
  let copiedText = $state('');

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
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
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
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
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }

  function rgbToCmyk(r: number, g: number, b: number) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
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
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function addToHistory(color: string, format: string) {
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
  }

  function handleBackToTools() {
    navigate('/tools');
  }
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
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
        <Palette class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Color Converter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between different color formats instantly. Perfect for designers and developers.
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
      <li class="text-gray-900 dark:text-white font-medium">Color Converter</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={randomColor}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Random Color
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Color Preview -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h2>
      <div
        class="w-full h-48 rounded-lg shadow-inner mb-4"
        style="background-color: {hexInput}"
      ></div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">HEX:</span>
          <span class="font-mono text-gray-900 dark:text-white ml-2">{hexInput}</span>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">RGB:</span>
          <span class="font-mono text-gray-900 dark:text-white ml-2">{rgbInput.r}, {rgbInput.g}, {rgbInput.b}</span>
        </div>
      </div>
    </div>

    <!-- Color History -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Colors</h2>
      {#if history.length === 0}
        <p class="text-gray-500 dark:text-gray-400 text-center py-8">No colors yet. Start converting!</p>
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
                onkeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    hexInput = item.color;
                    updateFromHex();
                  }
                }}
                aria-label={`Select color ${item.color}`}
              ></button>
              <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HEX</h3>
      <div class="flex gap-2">
        <input
          type="text"
          bind:value={hexInput}
          oninput={updateFromHex}
          class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
          placeholder="#000000"
        />
        <button
          onclick={() => copyToClipboard(hexInput, 'HEX')}
          class="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {copiedText === 'HEX' ? '✓' : 'Copy'}
        </button>
      </div>
    </div>

    <!-- RGB Format -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">RGB</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <label for="rgb-r" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">R:</label>
          <input
            id="rgb-r"
            type="range"
            min="0"
            max="255"
            bind:value={rgbInput.r}
            oninput={updateFromRgb}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgbInput.r}
            oninput={updateFromRgb}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div class="flex items-center gap-2">
          <label for="rgb-g" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">G:</label>
          <input
            id="rgb-g"
            type="range"
            min="0"
            max="255"
            bind:value={rgbInput.g}
            oninput={updateFromRgb}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgbInput.g}
            oninput={updateFromRgb}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div class="flex items-center gap-2">
          <label for="rgb-b" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">B:</label>
          <input
            id="rgb-b"
            type="range"
            min="0"
            max="255"
            bind:value={rgbInput.b}
            oninput={updateFromRgb}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="255"
            bind:value={rgbInput.b}
            oninput={updateFromRgb}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <button
          onclick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`, 'RGB')}
          class="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {copiedText === 'RGB' ? '✓ Copied!' : 'Copy RGB'}
        </button>
      </div>
    </div>

    <!-- HSL Format -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSL</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <label for="hsl-h" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">H:</label>
          <input
            id="hsl-h"
            type="range"
            min="0"
            max="360"
            bind:value={hslInput.h}
            oninput={updateFromHsl}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="360"
            bind:value={hslInput.h}
            oninput={updateFromHsl}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div class="flex items-center gap-2">
          <label for="hsl-s" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">S:</label>
          <input
            id="hsl-s"
            type="range"
            min="0"
            max="100"
            bind:value={hslInput.s}
            oninput={updateFromHsl}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="100"
            bind:value={hslInput.s}
            oninput={updateFromHsl}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <div class="flex items-center gap-2">
          <label for="hsl-l" class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">L:</label>
          <input
            id="hsl-l"
            type="range"
            min="0"
            max="100"
            bind:value={hslInput.l}
            oninput={updateFromHsl}
            class="flex-1"
          />
          <input
            type="number"
            min="0"
            max="100"
            bind:value={hslInput.l}
            oninput={updateFromHsl}
            class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
        <button
          onclick={() => copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`, 'HSL')}
          class="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {copiedText === 'HSL' ? '✓ Copied!' : 'Copy HSL'}
        </button>
      </div>
    </div>

    <!-- HSV Format -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
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
          onclick={() => copyToClipboard(`hsv(${hsvInput.h}, ${hsvInput.s}%, ${hsvInput.v}%)`, 'HSV')}
          class="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {copiedText === 'HSV' ? '✓ Copied!' : 'Copy HSV'}
        </button>
      </div>
    </div>

    <!-- CMYK Format -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">CMYK</h3>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Cyan:</span>
          <span class="font-mono text-gray-900 dark:text-white">{cmykInput.c}%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Magenta:</span>
          <span class="font-mono text-gray-900 dark:text-white">{cmykInput.m}%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Yellow:</span>
          <span class="font-mono text-gray-900 dark:text-white">{cmykInput.y}%</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600 dark:text-gray-400">Key (Black):</span>
          <span class="font-mono text-gray-900 dark:text-white">{cmykInput.k}%</span>
        </div>
        <button
          onclick={() => copyToClipboard(`cmyk(${cmykInput.c}%, ${cmykInput.m}%, ${cmykInput.y}%, ${cmykInput.k}%)`, 'CMYK')}
          class="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {copiedText === 'CMYK' ? '✓ Copied!' : 'Copy CMYK'}
        </button>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Palette class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Multiple Formats
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Support for HEX, RGB, HSL, HSV, and CMYK color formats
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Zap class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Live Conversion
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Real-time color conversion as you type or adjust sliders
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Calendar class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Color History
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Keep track of your recently used colors for quick access
      </p>
    </div>
  </div>
</div>