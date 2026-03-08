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
  const boxShadowCSS = $derived(() => {
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

  const textShadowCSS = $derived(() => {
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
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Settings2 class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">CSS Shadow Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Create beautiful shadow effects</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Presets -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2>
    <div class="flex flex-wrap gap-2">
      <button
        onclick={() => loadPreset('card')}
        class="btn btn-sm btn-secondary">Card Shadow</button
      >
      <button
        onclick={() => loadPreset('button')}
        class="btn btn-sm btn-secondary">Button Shadow</button
      >
      <button
        onclick={() => loadPreset('neon')}
        class="btn btn-sm btn-secondary">Neon Effect</button
      >
      <button
        onclick={() => loadPreset('inset')}
        class="btn btn-sm btn-secondary">Inset Shadow</button
      >
      <button
        onclick={randomizeColor}
        class="btn btn-sm btn-copy"
      >
        🎨 Random Color
      </button>
      <button
        onclick={resetAll}
        class="px-3 py-1.5 text-sm rounded transition-colors bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30"
        >Reset All</button
      >
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Controls Panel -->
    <div class="space-y-4">
      <!-- Tab Navigation -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onclick={() => (activeTab = 'box')}
            class="px-4 py-3 text-sm font-medium border-b-2 transition-colors flex-1 {activeTab ===
            'box'
              ? 'border-warning-500 dark:border-primary-500 text-warning-600 dark:text-primary-400 bg-warning-50 dark:bg-primary-900/20'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
          >
            Box Shadow
          </button>
          <button
            onclick={() => (activeTab = 'text')}
            class="px-4 py-3 text-sm font-medium border-b-2 transition-colors flex-1 {activeTab ===
            'text'
              ? 'border-warning-500 dark:border-primary-500 text-warning-600 dark:text-primary-400 bg-warning-50 dark:bg-primary-900/20'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
          >
            Text Shadow
          </button>
        </div>

        <!-- Box Shadow Controls -->
        {#if activeTab === 'box'}
          <div class="space-y-4">
            {#each shadows as shadow, index (shadow.id)}
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    Shadow {index + 1}
                  </h3>
                  {#if shadows.length > 1}
                    <button
                      onclick={() => removeBoxShadow(shadow.id)}
                      class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 transition-all"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  {/if}
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >X Offset</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.x}
                      min="-50"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.x}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Y Offset</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.y}
                      min="-50"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.y}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Blur</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.blur}
                      min="0"
                      max="100"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.blur}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Spread</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.spread}
                      min="-50"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.spread}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Color</label
                    >
                    <div class="flex gap-2">
                      <input
                        type="color"
                        bind:value={shadow.color}
                        class="w-12 h-8 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        bind:value={shadow.color}
                        class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Opacity</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.opacity}
                      min="0"
                      max="100"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.opacity}%</span>
                  </div>
                </div>

                <div class="flex items-center mt-4">
                  <label class="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      bind:checked={shadow.inset}
                      id="box-inset-{index}"
                      class="peer w-4 h-4 text-warning-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-purple-400"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inset Shadow</span>
                  </label>
                </div>
              </div>
            {/each}

            <button
              onclick={addBoxShadow}
              class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-all"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Shadow Layer
            </button>
          </div>
        {/if}

        <!-- Text Shadow Controls -->
        {#if activeTab === 'text'}
          <div class="space-y-4">
            {#each textShadows as shadow, index (shadow.id)}
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                    Text Shadow {index + 1}
                  </h3>
                  {#if textShadows.length > 1}
                    <button
                      onclick={() => removeTextShadow(shadow.id)}
                      class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 transition-all"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  {/if}
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >X Offset</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.x}
                      min="-50"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.x}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Y Offset</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.y}
                      min="-50"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.y}px</span>
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Blur</label
                    >
                    <input
                      type="range"
                      bind:value={shadow.blur}
                      min="0"
                      max="50"
                      class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                    />
                    <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.blur}px</span>
                  </div>

                  <div class="col-span-3">
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >Color</label
                    >
                    <div class="flex gap-2">
                      <input
                        type="color"
                        bind:value={shadow.color}
                        class="w-12 h-8 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        bind:value={shadow.color}
                        class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="range"
                        bind:value={shadow.opacity}
                        min="0"
                        max="100"
                        class="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400 w-12"
                        >{shadow.opacity}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            {/each}

            <button
              onclick={addTextShadow}
              class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-all"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Text Shadow Layer
            </button>
          </div>
        {/if}
      </div>

      <!-- Preview Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Settings</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="background-color"
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Background</label
              >
              <input
                type="color"
                bind:value={backgroundColor}
                id="background-color"
                class="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label
                for="text-color"
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Text Color</label
              >
              <input
                type="color"
                bind:value={textColor}
                id="text-color"
                class="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label
              for="border-radius"
              class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Border Radius: {borderRadius}px</label
            >
            <input
              type="range"
              bind:value={borderRadius}
              min="0"
              max="50"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
            />
          </div>

          <div>
            <label
              for="preview-text"
              class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Preview Text</label
            >
            <input
              type="text"
              bind:value={previewText}
              id="preview-text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
            />
          </div>

          <div class="flex items-center gap-4">
            <label class="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                bind:checked={showBox}
                id="show-box"
                class="peer w-4 h-4 text-warning-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-purple-400"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Box</span>
            </label>
            <label class="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                bind:checked={showText}
                id="show-text"
                class="peer w-4 h-4 text-warning-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-purple-400"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Text</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Panel -->
    <div class="space-y-4">
      <!-- Live Preview -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2>
        <div
          class="p-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[200px] transition-all duration-200"
          style="background-color: {backgroundColor};"
        >
          {#if showBox}
            <div
              class="p-8 rounded-lg transition-all duration-200 flex items-center justify-center"
              style="box-shadow: {boxShadowCSS}; border-radius: {borderRadius}px; background: white;"
            >
              {#if showText}
                <h3
                  class="text-2xl font-bold transition-all duration-200"
                  style="color: {textColor}; text-shadow: {textShadowCSS};"
                >
                  {previewText}
                </h3>
              {/if}
            </div>
          {:else if showText}
            <h3
              class="text-2xl font-bold transition-all duration-200"
              style="color: {textColor}; text-shadow: {textShadowCSS};"
            >
              {previewText}
            </h3>
          {/if}
        </div>
      </div>

      <!-- CSS Output -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h2>
          <div class="flex gap-2">
            <button
              onclick={() => copyToClipboard(`box-shadow: ${boxShadowCSS};`)}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Copy class="w-4 h-4 mr-1" />
              Copy Box
            </button>
            <button
              onclick={() => copyToClipboard(`text-shadow: ${textShadowCSS};`)}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Copy class="w-4 h-4 mr-1" />
              Copy Text
            </button>
            <button
              onclick={downloadCSS}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-all"
            >
              <Download class="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Box Shadow</h3>
            <pre
              class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code
                >box-shadow: {boxShadowCSS};</code
              ></pre>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Shadow</h3>
            <pre
              class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code
                >text-shadow: {textShadowCSS};</code
              ></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Settings2 class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        See your shadow effects instantly as you adjust the controls
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Sparkles class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Layers</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Add multiple shadow layers for complex and beautiful effects
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Presets</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Pre-built styles for cards, buttons, neon effects, and more
      </p>
    </div>
  </div>
</ToolLayout>
