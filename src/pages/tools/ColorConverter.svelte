<script lang="ts">
  import { Palette, Zap, History, Copy, RefreshCw } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import ToolLayout from '../../components/ToolLayout.svelte';

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
</script>

<ToolLayout
  title="Color Converter"
  description="Convert between different color formats instantly. Perfect for designers and developers."
  icon={Palette}
  color="warning"
>
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-primary" onclick={randomColor}>
      <RefreshCw class="size-4" />
      Random color
    </button>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Color Preview -->
    <div class="tool-card">
      <h2 class="section-title">Color preview</h2>
      <div
        class="mb-4 h-48 w-full rounded-md ring-1 ring-inset ring-ink/10"
        style="background-color: {hexInput}"
      ></div>
      <div class="text-body-sm grid grid-cols-2 gap-4">
        <div class="rounded-md bg-sunken p-3">
          <span class="text-ink-muted">HEX:</span>
          <span class="ml-2 font-mono text-ink">{hexInput}</span>
        </div>
        <div class="rounded-md bg-sunken p-3">
          <span class="text-ink-muted">RGB:</span>
          <span class="ml-2 font-mono text-ink">{rgbInput.r}, {rgbInput.g}, {rgbInput.b}</span>
        </div>
      </div>
    </div>

    <!-- Color History -->
    <div class="tool-card">
      <h2 class="section-title">Recent colors</h2>
      {#if history.length === 0}
        <div class="flex h-48 flex-col items-center justify-center text-ink-muted">
          <History class="mb-2 size-8" />
          <p class="text-body-sm">No colors yet. Start converting!</p>
        </div>
      {:else}
        <div class="grid grid-cols-5 gap-2">
          {#each history as item (item.timestamp.getTime())}
            <div class="group relative">
              <button
                type="button"
                class="h-12 w-full cursor-pointer rounded-sm ring-1 ring-inset ring-ink/10 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                style="background-color: {item.color}"
                onclick={() => {
                  hexInput = item.color;
                  updateFromHex();
                }}
                aria-label={`Select color ${item.color}`}
              ></button>
              <div
                class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-pill bg-ink px-2 py-1 font-mono text-xs whitespace-nowrap text-canvas opacity-0 transition-opacity group-hover:opacity-100"
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
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <!-- HEX Format -->
    <div class="tool-card">
      <h3 class="section-title">HEX</h3>
      <div class="flex gap-2">
        <input
          bind:value={hexInput}
          oninput={updateFromHex}
          class="tool-input flex-1 font-mono! text-sm!"
          placeholder="#000000"
        />
        <button
          onclick={() => copyToClipboard(hexInput, 'HEX')}
          class="btn btn-secondary"
          aria-label="Copy HEX"
          title="Copy HEX"
        >
          <Copy class="size-4" />
        </button>
      </div>
    </div>

    <!-- RGB Format -->
    <div class="tool-card">
      <h3 class="section-title">RGB</h3>
      <div class="space-y-3">
        {#each ['r', 'g', 'b'] as channel (channel)}
          <div class="flex items-center gap-2">
            <label
              for={`rgb-${channel}`}
              class="text-body-sm w-8 font-mono font-medium text-ink-muted uppercase"
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
              class="slider flex-1"
              style="--p: {(rgbInput[channel as keyof typeof rgbInput] / 255) * 100}%"
            />
            <input
              type="number" inputmode="decimal"
              min="0"
              max="255"
              bind:value={rgbInput[channel as keyof typeof rgbInput]}
              oninput={updateFromRgb}
              class="tool-input w-16! px-2! py-1! font-mono! text-sm!"
            />
          </div>
        {/each}
        <button
          onclick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`, 'RGB')}
          class="btn btn-secondary mt-2 w-full"
        >
          <Copy class="size-4" />
          Copy RGB
        </button>
      </div>
    </div>

    <!-- HSL Format -->
    <div class="tool-card">
      <h3 class="section-title">HSL</h3>
      <div class="space-y-3">
        {#each ['h', 's', 'l'] as channel (channel)}
          <div class="flex items-center gap-2">
            <label
              for={`hsl-${channel}`}
              class="text-body-sm w-8 font-mono font-medium text-ink-muted uppercase"
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
              class="slider flex-1"
              style="--p: {(hslInput[channel as keyof typeof hslInput] / (channel === 'h' ? 360 : 100)) * 100}%"
            />
            <input
              type="number" inputmode="decimal"
              min="0"
              max={channel === 'h' ? 360 : 100}
              bind:value={hslInput[channel as keyof typeof hslInput]}
              oninput={updateFromHsl}
              class="tool-input w-16! px-2! py-1! font-mono! text-sm!"
            />
          </div>
        {/each}
        <button
          onclick={() =>
            copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`, 'HSL')}
          class="btn btn-secondary mt-2 w-full"
        >
          <Copy class="size-4" />
          Copy HSL
        </button>
      </div>
    </div>

    <!-- HSV Format -->
    <div class="tool-card">
      <h3 class="section-title">HSV</h3>
      <div class="space-y-2">
        <div class="text-body-sm flex justify-between">
          <span class="text-ink-muted">Hue:</span>
          <span class="font-mono text-ink">{hsvInput.h}°</span>
        </div>
        <div class="text-body-sm flex justify-between">
          <span class="text-ink-muted">Saturation:</span>
          <span class="font-mono text-ink">{hsvInput.s}%</span>
        </div>
        <div class="text-body-sm flex justify-between">
          <span class="text-ink-muted">Value:</span>
          <span class="font-mono text-ink">{hsvInput.v}%</span>
        </div>
        <button
          onclick={() =>
            copyToClipboard(`hsv(${hsvInput.h}, ${hsvInput.s}%, ${hsvInput.v}%)`, 'HSV')}
          class="btn btn-secondary mt-4 w-full"
        >
          <Copy class="size-4" />
          Copy HSV
        </button>
      </div>
    </div>

    <!-- CMYK Format -->
    <div class="tool-card">
      <h3 class="section-title">CMYK</h3>
      <div class="space-y-2">
        {#each ['c', 'm', 'y', 'k'] as channel (channel)}
          <div class="text-body-sm flex justify-between">
            <span class="text-ink-muted uppercase">
              {channel === 'k' ? 'Key (Black)' : channel}:
            </span>
            <span class="font-mono text-ink">
              {cmykInput[channel as keyof typeof cmykInput]}%
            </span>
          </div>
        {/each}
        <button
          onclick={() =>
            copyToClipboard(
              `cmyk(${cmykInput.c}%, ${cmykInput.m}%, ${cmykInput.y}%, ${cmykInput.k}%)`,
              'CMYK'
            )}
          class="btn btn-secondary mt-4 w-full"
        >
          <Copy class="size-4" />
          Copy CMYK
        </button>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Palette class="size-5" /></div>
      <h3 class="feature-title">Multiple formats</h3>
      <p class="feature-description">Support for HEX, RGB, HSL, HSV, and CMYK color formats</p>
    </div>

    <div class="card">
      <div class="feature-icon"><Zap class="size-5" /></div>
      <h3 class="feature-title">Live conversion</h3>
      <p class="feature-description">Real-time color conversion as you type or adjust sliders</p>
    </div>

    <div class="card">
      <div class="feature-icon"><History class="size-5" /></div>
      <h3 class="feature-title">Color history</h3>
      <p class="feature-description">Keep track of your recently used colors for quick access</p>
    </div>
  </div>
</ToolLayout>
