<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Palette, Copy, Zap, RefreshCw } from '@lucide/svelte';

  let baseColor = $state('#3B82F6');
  let paletteType = $state('complementary');
  let palette = $state<Array<{ hex: string; name: string; hsl: string; rgb: string }>>([]);

  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  }

  function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
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

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToHex(h: number, s: number, l: number): string {
    h = h / 360;
    s = s / 100;
    l = l / 100;

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

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  function generatePalette() {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    let newPalette: Array<{ hex: string; name: string; hsl: string; rgb: string }> = [];

    switch (paletteType) {
      case 'complementary':
        newPalette = [
          {
            hex: baseColor,
            name: 'Base',
            hsl: `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
            rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`
          },
          {
            hex: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
            name: 'Complementary',
            hsl: `${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%`,
            rgb: ''
          }
        ];
        break;

      case 'triadic':
        newPalette = [
          {
            hex: baseColor,
            name: 'Base',
            hsl: `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
            rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`
          },
          {
            hex: hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
            name: 'Triadic 1',
            hsl: `${(hsl.h + 120) % 360}, ${hsl.s}%, ${hsl.l}%`,
            rgb: ''
          },
          {
            hex: hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
            name: 'Triadic 2',
            hsl: `${(hsl.h + 240) % 360}, ${hsl.s}%, ${hsl.l}%`,
            rgb: ''
          }
        ];
        break;

      case 'analogous':
        newPalette = [
          {
            hex: hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
            name: 'Analogous 1',
            hsl: `${(hsl.h - 30 + 360) % 360}, ${hsl.s}%, ${hsl.l}%`,
            rgb: ''
          },
          {
            hex: baseColor,
            name: 'Base',
            hsl: `${hsl.h}, ${hsl.s}%, ${hsl.l}%`,
            rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`
          },
          {
            hex: hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
            name: 'Analogous 2',
            hsl: `${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%`,
            rgb: ''
          }
        ];
        break;

      case 'monochromatic':
        newPalette = [
          {
            hex: hslToHex(hsl.h, hsl.s, 20),
            name: 'Dark',
            hsl: `${hsl.h}, ${hsl.s}%, 20%`,
            rgb: ''
          },
          {
            hex: hslToHex(hsl.h, hsl.s, 40),
            name: 'Dark Medium',
            hsl: `${hsl.h}, ${hsl.s}%, 40%`,
            rgb: ''
          },
          {
            hex: hslToHex(hsl.h, hsl.s, 60),
            name: 'Medium',
            hsl: `${hsl.h}, ${hsl.s}%, 60%`,
            rgb: ''
          },
          {
            hex: hslToHex(hsl.h, hsl.s, 80),
            name: 'Light Medium',
            hsl: `${hsl.h}, ${hsl.s}%, 80%`,
            rgb: ''
          },
          {
            hex: hslToHex(hsl.h, hsl.s, 95),
            name: 'Light',
            hsl: `${hsl.h}, ${hsl.s}%, 95%`,
            rgb: ''
          }
        ];
        break;
    }

    // Add RGB values for all colors
    newPalette = newPalette.map(color => {
      if (!color.rgb) {
        const rgb = hexToRgb(color.hex);
        return { ...color, rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}` };
      }
      return color;
    });

    palette = newPalette;
  }

  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    baseColor = color;
  }

  function copyToClipboard(color: string) {
    navigator.clipboard.writeText(color);
  }

  function loadSamplePalette() {
    baseColor = '#8B5CF6';
    paletteType = 'triadic';
    generatePalette();
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in base color or palette type
  $effect(() => {
    if (baseColor && paletteType) {
      generatePalette();
    }
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
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-4"
      >
        <Palette class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Palette Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate harmonious color palettes with complementary, triadic, and analogous colors.
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
      <li class="text-gray-900 dark:text-white font-medium">Color Palette Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label
          for="base-color-picker"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Base Color
        </label>
        <div class="flex gap-2">
          <input
            id="base-color-picker"
            type="color"
            bind:value={baseColor}
            class="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
          />
          <input
            id="base-color-text"
            type="text"
            bind:value={baseColor}
            placeholder="#000000"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button
            onclick={randomColor}
            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <label
          for="palette-type-select"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Palette Type
        </label>
        <select
          id="palette-type-select"
          bind:value={paletteType}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
          <option value="monochromatic">Monochromatic</option>
        </select>
      </div>

      <div class="flex items-end">
        <button
          onclick={loadSamplePalette}
          class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Load Sample Palette
        </button>
      </div>
    </div>
  </div>

  <!-- Color Palette -->
  {#if palette.length > 0}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Palette</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {#each palette as color, i (color.hex + i)}
          <div
            class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div class="h-24 w-full" style="background-color: {color.hex}"></div>
            <div class="p-3">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">{color.name}</h4>
              <div class="space-y-1 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">HEX:</span>
                  <button
                    onclick={() => copyToClipboard(color.hex)}
                    class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    title="Copy HEX"
                  >
                    {color.hex}
                  </button>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">HSL:</span>
                  <button
                    onclick={() => copyToClipboard(`hsl(${color.hsl})`)}
                    class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs"
                    title="Copy HSL"
                  >
                    {color.hsl}
                  </button>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">RGB:</span>
                  <button
                    onclick={() => copyToClipboard(`rgb(${color.rgb})`)}
                    class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs"
                    title="Copy RGB"
                  >
                    {color.rgb}
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Palette Types Information -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Palette Types</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Complementary</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Two colors opposite each other on the color wheel. Creates high contrast and visual
          interest.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Triadic</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Three colors evenly spaced on the color wheel. Creates vibrant, balanced color schemes.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Analogous</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Colors adjacent to each other on the color wheel. Creates harmonious and pleasing
          combinations.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Monochromatic</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Variations of a single color with different lightness values. Creates subtle and
          sophisticated looks.
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Palette class="w-6 h-6 text-pink-600 dark:text-pink-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Color Harmony</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Generate color schemes based on color theory principles for professional designs
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Copy class="w-6 h-6 text-pink-600 dark:text-pink-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Export colors in HEX, RGB, and HSL formats for use in any design tool
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-pink-600 dark:text-pink-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Preview</h3>
      <p class="text-gray-600 dark:text-gray-400">
        See your color palette in real-time as you adjust settings
      </p>
    </div>
  </div>
</div>
