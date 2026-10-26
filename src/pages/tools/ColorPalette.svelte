<script lang="ts">
  import { Palette, Copy, Zap, RefreshCw } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

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
    toast.success('Copied to clipboard');
  }

  function loadSamplePalette() {
    baseColor = '#8B5CF6';
    paletteType = 'triadic';
    generatePalette();
  }

  // React to changes in base color or palette type
  $effect(() => {
    if (baseColor && paletteType) {
      generatePalette();
    }
  });
</script>

<ToolLayout
  title="Color Palette Generator"
  description="Generate harmonious color palettes with complementary, triadic, and analogous colors."
  icon={Palette}
  color="warning"
>
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button onclick={loadSamplePalette} class="btn btn-primary">
      <RefreshCw class="size-4" />
      Load sample
    </button>
    <button onclick={randomColor} class="btn btn-secondary">
      <RefreshCw class="size-4" />
      Random color
    </button>
  </div>

  <!-- Base Color & Type Selection -->
  <div class="tool-card">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label for="base-color-picker" class="label">Base color</label>
        <div class="flex gap-2">
          <input
            class="h-11 w-12 cursor-pointer rounded-sm bg-control p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            id="base-color-picker"
            type="color"
            bind:value={baseColor}
          />
          <input
            type="text"
            bind:value={baseColor}
            class="tool-input flex-1 font-mono!"
            maxlength={7}
          />
        </div>
      </div>

      <div>
        <label for="palette-type-select" class="label">Palette type</label>
        <select id="palette-type-select" bind:value={paletteType} class="tool-select">
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
          <option value="monochromatic">Monochromatic</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Color Palette -->
  {#if palette.length > 0}
    <div class="tool-card">
      <h3 class="section-title">Generated palette</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {#each palette as color, i (color.hex + i)}
          <div class="overflow-hidden rounded-md bg-sunken">
            <div class="h-24 w-full" style="background-color: {color.hex}"></div>
            <div class="p-3">
              <h4 class="text-body-sm mb-2 font-medium text-ink">{color.name}</h4>
              <div class="space-y-1 text-xs">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-ink-muted">HEX:</span>
                  <button
                    onclick={() => copyToClipboard(color.hex)}
                    class="quick-btn font-mono"
                    title="Copy HEX"
                  >
                    {color.hex}
                  </button>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-ink-muted">HSL:</span>
                  <button
                    onclick={() => copyToClipboard(`hsl(${color.hsl})`)}
                    class="quick-btn font-mono"
                    title="Copy HSL"
                  >
                    {color.hsl}
                  </button>
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-ink-muted">RGB:</span>
                  <button
                    onclick={() => copyToClipboard(`rgb(${color.rgb})`)}
                    class="quick-btn font-mono"
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
  <div class="tool-card">
    <h3 class="section-title">Palette types</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="info-card">
        <h4 class="section-title-sm">Complementary</h4>
        <p class="text-body-sm text-ink-muted">
          Two colors opposite each other on the color wheel. Creates high contrast and visual
          interest.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">Triadic</h4>
        <p class="text-body-sm text-ink-muted">
          Three colors evenly spaced on the color wheel. Creates vibrant, balanced color schemes.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">Analogous</h4>
        <p class="text-body-sm text-ink-muted">
          Colors adjacent to each other on the color wheel. Creates harmonious and pleasing
          combinations.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">Monochromatic</h4>
        <p class="text-body-sm text-ink-muted">
          Variations of a single color with different lightness values. Creates subtle and
          sophisticated looks.
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Palette class="size-5" /></div>
      <h3 class="feature-title">Color harmony</h3>
      <p class="feature-description">
        Generate color schemes based on color theory principles for professional designs
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Copy class="size-5" /></div>
      <h3 class="feature-title">Multiple formats</h3>
      <p class="feature-description">
        Export colors in HEX, RGB, and HSL formats for use in any design tool
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Zap class="size-5" /></div>
      <h3 class="feature-title">Instant preview</h3>
      <p class="feature-description">See your color palette in real-time as you adjust settings</p>
    </div>
  </div>
</ToolLayout>
