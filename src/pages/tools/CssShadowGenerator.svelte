<script lang="ts">
  import { Copy, Download, Plus, X, Settings2, Sparkles, Zap } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Shadow properties
  let shadows = $state([
    {
      id: 1,
      x: 0,
      y: 4,
      blur: 6,
      spread: -1,
      color: '#000000',
      opacity: 20,
      inset: false
    }
  ]);

  // Text shadow properties
  let textShadows = $state([
    {
      id: 1,
      x: 2,
      y: 2,
      blur: 4,
      color: '#000000',
      opacity: 50
    }
  ]);

  // Preview settings
  let showText = $state(true);
  let showBox = $state(true);
  let backgroundColor = $state('#ffffff');
  let textColor = $state('#374151');
  let borderRadius = $state(8);
  let previewText = $state('Shadow Effect');
  let activeTab = $state('box');

  // Derived CSS output
  const boxShadowCSS = $derived.by(() => {
    return shadows
      .map(shadow => {
        const colorHex =
          shadow.color +
          Math.round(shadow.opacity * 2.55)
            .toString(16)
            .padStart(2, '0');
        const values = [shadow.x + 'px', shadow.y + 'px', shadow.blur + 'px'];
        if (shadow.spread !== 0) values.push(shadow.spread + 'px');
        if (shadow.inset) values.push('inset');
        return `${values.join(' ')} ${colorHex}`;
      })
      .join(', ');
  });

  const textShadowCSS = $derived.by(() => {
    return textShadows
      .map(shadow => {
        const colorHex =
          shadow.color +
          Math.round(shadow.opacity * 2.55)
            .toString(16)
            .padStart(2, '0');
        return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${colorHex}`;
      })
      .join(', ');
  });

  function addBoxShadow() {
    const newId = Math.max(...shadows.map(s => s.id)) + 1;
    shadows = [
      ...shadows,
      {
        id: newId,
        x: 0,
        y: 4,
        blur: 6,
        spread: -1,
        color: '#000000',
        opacity: 20,
        inset: false
      }
    ];
  }

  function removeBoxShadow(id: number) {
    if (shadows.length > 1) {
      shadows = shadows.filter(s => s.id !== id);
    }
  }

  function addTextShadow() {
    const newId = Math.max(...textShadows.map(s => s.id)) + 1;
    textShadows = [
      ...textShadows,
      {
        id: newId,
        x: 2,
        y: 2,
        blur: 4,
        color: '#000000',
        opacity: 50
      }
    ];
  }

  function removeTextShadow(id: number) {
    if (textShadows.length > 1) {
      textShadows = textShadows.filter(s => s.id !== id);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  function downloadCSS() {
    const cssContent = `/* CSS Shadow Generator Output */

/* Box Shadow */
.box-shadow {
  box-shadow: ${boxShadowCSS};
}

/* Text Shadow */
.text-shadow {
  text-shadow: ${textShadowCSS};
}`;

    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadows.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CSS downloaded');
  }

  function loadPreset(type: string) {
    switch (type) {
      case 'card':
        shadows = [
          {
            id: 1,
            x: 0,
            y: 10,
            blur: 15,
            spread: -3,
            color: '#000000',
            opacity: 10,
            inset: false
          }
        ];
        borderRadius = 12;
        break;
      case 'button':
        shadows = [
          {
            id: 1,
            x: 0,
            y: 4,
            blur: 6,
            spread: -2,
            color: '#000000',
            opacity: 15,
            inset: false
          },
          {
            id: 2,
            x: 0,
            y: 1,
            blur: 2,
            spread: 0,
            color: '#000000',
            opacity: 10,
            inset: false
          }
        ];
        borderRadius = 6;
        break;
      case 'neon':
        shadows = [
          {
            id: 1,
            x: 0,
            y: 0,
            blur: 20,
            spread: 0,
            color: '#3b82f6',
            opacity: 60,
            inset: false
          },
          {
            id: 2,
            x: 0,
            y: 0,
            blur: 40,
            spread: 0,
            color: '#3b82f6',
            opacity: 40,
            inset: false
          }
        ];
        textShadows = [
          {
            id: 1,
            x: 0,
            y: 0,
            blur: 10,
            color: '#3b82f6',
            opacity: 80
          }
        ];
        break;
      case 'inset':
        shadows = [
          {
            id: 1,
            x: 2,
            y: 2,
            blur: 4,
            spread: 0,
            color: '#000000',
            opacity: 15,
            inset: true
          }
        ];
        break;
    }
    toast.success(`Applied ${type} preset`);
  }

  function randomizeColor() {
    shadows = shadows.map(shadow => ({
      ...shadow,
      color:
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
    }));
    toast.success('Randomized color');
  }

  function resetAll() {
    shadows = [
      {
        id: 1,
        x: 0,
        y: 4,
        blur: 6,
        spread: -1,
        color: '#000000',
        opacity: 20,
        inset: false
      }
    ];
    textShadows = [
      {
        id: 1,
        x: 2,
        y: 2,
        blur: 4,
        color: '#000000',
        opacity: 50
      }
    ];
    showText = true;
    showBox = true;
    backgroundColor = '#ffffff';
    textColor = '#374151';
    borderRadius = 8;
    previewText = 'Shadow Effect';
    toast.success('Reset all');
  }
</script>

<ToolLayout
  title="CSS Shadow Generator"
  description="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview."
  icon={Settings2}
  color="warning"
>
  <!-- Presets -->
  <div class="tool-card">
    <h2 class="section-title">Quick presets</h2>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => loadPreset('card')}
        class="preset-btn">Card shadow</button
      >
      <button
        onclick={() => loadPreset('button')}
        class="preset-btn">Button shadow</button
      >
      <button
        onclick={() => loadPreset('neon')}
        class="preset-btn">Neon effect</button
      >
      <button
        onclick={() => loadPreset('inset')}
        class="preset-btn">Inset shadow</button
      >
      <button
        onclick={randomizeColor}
        class="btn btn-sm btn-secondary"
      >
        <Sparkles class="w-4 h-4" />
        Random color
      </button>
      <button
        onclick={resetAll}
        class="btn btn-sm btn-ghost"
        >Reset all</button
      >
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Controls Panel -->
    <div class="space-y-4">
      <!-- Tab Navigation -->
      <div class="tool-card">
        <div class="tab-nav" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'box'}
            onclick={() => (activeTab = 'box')}
            class="tab-btn flex-1 {activeTab === 'box' ? 'active' : ''}"
          >
            Box shadow
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'text'}
            onclick={() => (activeTab = 'text')}
            class="tab-btn flex-1 {activeTab === 'text' ? 'active' : ''}"
          >
            Text shadow
          </button>
        </div>

        <!-- Box Shadow Controls -->
        {#if activeTab === 'box'}
          <div class="space-y-4">
            {#each shadows as shadow, index (shadow.id)}
              <div class="result-card">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-label text-ink-muted">
                    Shadow {index + 1}
                  </h3>
                  {#if shadows.length > 1}
                    <button
                      onclick={() => removeBoxShadow(shadow.id)}
                      class="btn-icon hover:!text-negative"
                      aria-label="Remove shadow {index + 1}"
                      title="Remove shadow"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  {/if}
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="label">X offset</span>
                    <input
                      type="range"
                      bind:value={shadow.x}
                      min="-50"
                      max="50"
                      class="slider w-full"
                      style="--p: {((shadow.x + 50) / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.x}px</span>
                  </div>

                  <div>
                    <span class="label">Y offset</span>
                    <input
                      type="range"
                      bind:value={shadow.y}
                      min="-50"
                      max="50"
                      class="slider w-full"
                      style="--p: {((shadow.y + 50) / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.y}px</span>
                  </div>

                  <div>
                    <span class="label">Blur</span>
                    <input
                      type="range"
                      bind:value={shadow.blur}
                      min="0"
                      max="100"
                      class="slider w-full"
                      style="--p: {(shadow.blur / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.blur}px</span>
                  </div>

                  <div>
                    <span class="label">Spread</span>
                    <input
                      type="range"
                      bind:value={shadow.spread}
                      min="-50"
                      max="50"
                      class="slider w-full"
                      style="--p: {((shadow.spread + 50) / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.spread}px</span>
                  </div>

                  <div>
                    <span class="label">Color</span>
                    <div class="flex gap-2">
                      <input
                        type="color"
                        bind:value={shadow.color}
                        class="w-12 h-10 rounded-sm bg-control p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                      />
                      <input
                        type="text"
                        bind:value={shadow.color}
                        class="inline-input flex-1 min-w-0 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <span class="label">Opacity</span>
                    <input
                      type="range"
                      bind:value={shadow.opacity}
                      min="0"
                      max="100"
                      class="slider w-full"
                      style="--p: {(shadow.opacity / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.opacity}%</span>
                  </div>
                </div>

                <div class="flex items-center mt-4">
                  <label class="custom-checkbox">
                    <input
                      type="checkbox"
                      bind:checked={shadow.inset}
                      id="box-inset-{index}"
                    />
                    <span class="checkmark"></span>
                    <span class="label-text">Inset shadow</span>
                  </label>
                </div>
              </div>
            {/each}

            <button
              onclick={addBoxShadow}
              class="btn btn-secondary w-full"
            >
              <Plus class="w-4 h-4" />
              Add shadow layer
            </button>
          </div>
        {/if}

        <!-- Text Shadow Controls -->
        {#if activeTab === 'text'}
          <div class="space-y-4">
            {#each textShadows as shadow, index (shadow.id)}
              <div class="result-card">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-label text-ink-muted">
                    Text shadow {index + 1}
                  </h3>
                  {#if textShadows.length > 1}
                    <button
                      onclick={() => removeTextShadow(shadow.id)}
                      class="btn-icon hover:!text-negative"
                      aria-label="Remove text shadow {index + 1}"
                      title="Remove text shadow"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  {/if}
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <span class="label">X offset</span>
                    <input
                      type="range"
                      bind:value={shadow.x}
                      min="-50"
                      max="50"
                      class="slider w-full"
                      style="--p: {((shadow.x + 50) / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.x}px</span>
                  </div>

                  <div>
                    <span class="label">Y offset</span>
                    <input
                      type="range"
                      bind:value={shadow.y}
                      min="-50"
                      max="50"
                      class="slider w-full"
                      style="--p: {((shadow.y + 50) / 100) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.y}px</span>
                  </div>

                  <div>
                    <span class="label">Blur</span>
                    <input
                      type="range"
                      bind:value={shadow.blur}
                      min="0"
                      max="50"
                      class="slider w-full"
                      style="--p: {(shadow.blur / 50) * 100}%"
                    />
                    <span class="text-code text-ink-muted">{shadow.blur}px</span>
                  </div>

                  <div class="col-span-3">
                    <span class="label">Color</span>
                    <div class="flex items-center gap-2">
                      <input
                        type="color"
                        bind:value={shadow.color}
                        class="w-12 h-10 rounded-sm bg-control p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                      />
                      <input
                        type="text"
                        bind:value={shadow.color}
                        class="inline-input flex-1 min-w-0 font-mono"
                      />
                      <input
                        type="range"
                        bind:value={shadow.opacity}
                        min="0"
                        max="100"
                        class="slider w-24"
                        style="--p: {(shadow.opacity / 100) * 100}%"
                      />
                      <span class="text-code text-ink-muted w-12"
                        >{shadow.opacity}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            {/each}

            <button
              onclick={addTextShadow}
              class="btn btn-secondary w-full"
            >
              <Plus class="w-4 h-4" />
              Add text shadow layer
            </button>
          </div>
        {/if}
      </div>

      <!-- Preview Settings -->
      <div class="tool-card">
        <h2 class="section-title">Preview settings</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="background-color"
                class="label"
                >Background</label
              >
              <input
                type="color"
                bind:value={backgroundColor}
                id="background-color"
                class="w-full h-10 rounded-sm bg-control p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              />
            </div>
            <div>
              <label
                for="text-color"
                class="label"
                >Text color</label
              >
              <input
                type="color"
                bind:value={textColor}
                id="text-color"
                class="w-full h-10 rounded-sm bg-control p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              />
            </div>
          </div>

          <div>
            <label
              for="border-radius"
              class="label"
              >Border radius: <span class="font-mono text-ink">{borderRadius}px</span></label
            >
            <input
              type="range"
              bind:value={borderRadius}
              min="0"
              max="50"
              class="slider w-full"
              style="--p: {(borderRadius / 50) * 100}%"
            />
          </div>

          <div>
            <label
              for="preview-text"
              class="label"
              >Preview text</label
            >
            <input
              type="text"
              bind:value={previewText}
              id="preview-text"
              class="tool-input w-full"
            />
          </div>

          <div class="flex items-center gap-4">
            <label class="custom-checkbox">
              <input
                type="checkbox"
                bind:checked={showBox}
                id="show-box"
              />
              <span class="checkmark"></span>
              <span class="label-text">Show box</span>
            </label>
            <label class="custom-checkbox">
              <input
                type="checkbox"
                bind:checked={showText}
                id="show-text"
              />
              <span class="checkmark"></span>
              <span class="label-text">Show text</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Panel -->
    <div class="space-y-4">
      <!-- Live Preview -->
      <div class="tool-card">
        <h2 class="section-title">Live preview</h2>
        <!-- Canvas: token surface; the user-picked background (data) is applied inline on top. -->
        <div class="p-3 rounded-md bg-sunken">
          <div
            class="p-8 rounded-sm flex items-center justify-center min-h-[200px]"
            style="background-color: {backgroundColor};"
          >
            {#if showBox}
              <div
                class="p-8 flex items-center justify-center"
                style="box-shadow: {boxShadowCSS}; border-radius: {borderRadius}px; background: white;"
              >
                {#if showText}
                  <h3
                    class="text-2xl font-bold"
                    style="color: {textColor}; text-shadow: {textShadowCSS};"
                  >
                    {previewText}
                  </h3>
                {/if}
              </div>
            {:else if showText}
              <h3
                class="text-2xl font-bold"
                style="color: {textColor}; text-shadow: {textShadowCSS};"
              >
                {previewText}
              </h3>
            {/if}
          </div>
        </div>
      </div>

      <!-- CSS Output -->
      <div class="tool-card">
        <div class="card-header flex-wrap gap-2">
          <h2 class="section-title !mb-0">CSS code</h2>
          <div class="flex flex-wrap gap-2">
            <button
              onclick={() => copyToClipboard(`box-shadow: ${boxShadowCSS};`)}
              class="btn btn-sm btn-secondary"
            >
              <Copy class="w-4 h-4" />
              Copy box
            </button>
            <button
              onclick={() => copyToClipboard(`text-shadow: ${textShadowCSS};`)}
              class="btn btn-sm btn-secondary"
            >
              <Copy class="w-4 h-4" />
              Copy text
            </button>
            <button
              onclick={downloadCSS}
              class="btn btn-sm btn-primary"
            >
              <Download class="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="text-label text-ink-muted mb-2">Box shadow</h3>
            <pre
              class="bg-sunken p-4 rounded-md overflow-x-auto text-code text-ink"><code
                >box-shadow: {boxShadowCSS};</code
              ></pre>
          </div>

          <div>
            <h3 class="text-label text-ink-muted mb-2">Text shadow</h3>
            <pre
              class="bg-sunken p-4 rounded-md overflow-x-auto text-code text-ink"><code
                >text-shadow: {textShadowCSS};</code
              ></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Settings2 class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Real-time preview</h3>
      <p class="feature-description">
        See your shadow effects instantly as you adjust the controls
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Sparkles class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Multiple layers</h3>
      <p class="feature-description">
        Add multiple shadow layers for complex and beautiful effects
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Quick presets</h3>
      <p class="feature-description">
        Pre-built styles for cards, buttons, neon effects, and more
      </p>
    </div>
  </div>
</ToolLayout>
