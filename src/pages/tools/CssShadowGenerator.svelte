<script lang="ts">
  import { Copy, Download, Plus, X, Settings2 } from '@lucide/svelte';
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

  // UI state
  let copied = $state(false);

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
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function downloadCSS() {
    const cssContent = `/* CSS Shadow Generator Output */\n\n/* Box Shadow */\n.box-shadow {\n  box-shadow: ${boxShadowCSS};\n}\n\n/* Text Shadow */\n.text-shadow {\n  text-shadow: ${textShadowCSS};\n}`;

    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadows.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
  }
</script>

<svelte:head>
  <title>CSS Shadow Generator - Developer Tools</title>
  <meta
    name="description"
    content="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview"
  />
</svelte:head>

<ToolLayout
  title="CSS Shadow Generator"
  description="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview."
  icon={Settings2}
  color="primary"
>
  <!-- Presets -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2>
      <div class="flex flex-wrap gap-2">
        <button
          onclick={() => loadPreset('card')}
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Card Shadow
        </button>
        <button
          onclick={() => loadPreset('button')}
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Button Shadow
        </button>
        <button
          onclick={() => loadPreset('neon')}
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Neon Effect
        </button>
        <button
          onclick={() => loadPreset('inset')}
          class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Inset Shadow
        </button>
        <button
          onclick={randomizeColor}
          class="px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900/20 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
        >
          🎨 Random Color
        </button>
        <button
          onclick={resetAll}
          class="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Controls Panel -->
    <div class="space-y-6">
      <!-- Tab Navigation -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex">
          <button
            onclick={() => (activeTab = 'box')}
            class="flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab ===
            'box'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-blue-900/10'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
          >
            Box Shadow
          </button>
          <button
            onclick={() => (activeTab = 'text')}
            class="flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab ===
            'text'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-blue-900/10'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
          >
            Text Shadow
          </button>
        </div>

        <div class="p-6">
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
                        class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    {/if}
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        for="xoffset-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        X Offset
                      </label>
                      <input
                        id="xoffset-{index}"
                        type="range"
                        bind:value={shadow.x}
                        min="-50"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.x}px</span>
                    </div>

                    <div>
                      <label
                        for="box-yoffset-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Y Offset
                      </label>
                      <input
                        id="box-yoffset-{index}"
                        type="range"
                        bind:value={shadow.y}
                        min="-50"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.y}px</span>
                    </div>

                    <div>
                      <label
                        for="box-blur-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Blur
                      </label>
                      <input
                        id="box-blur-{index}"
                        type="range"
                        bind:value={shadow.blur}
                        min="0"
                        max="100"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.blur}px</span>
                    </div>

                    <div>
                      <label
                        for="box-spread-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Spread
                      </label>
                      <input
                        id="box-spread-{index}"
                        type="range"
                        bind:value={shadow.spread}
                        min="-50"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.spread}px</span
                      >
                    </div>

                    <div>
                      <label
                        for="box-color-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Color
                      </label>
                      <div class="flex gap-2">
                        <input
                          id="box-color-{index}"
                          type="color"
                          bind:value={shadow.color}
                          class="w-12 h-8 rounded"
                        />
                        <input
                          type="text"
                          bind:value={shadow.color}
                          class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        for="box-opacity-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Opacity
                      </label>
                      <input
                        id="box-opacity-{index}"
                        type="range"
                        bind:value={shadow.opacity}
                        min="0"
                        max="100"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.opacity}%</span
                      >
                    </div>
                  </div>

                  <div class="flex items-center mt-4">
                    <input
                      id="box-inset-{index}"
                      type="checkbox"
                      bind:checked={shadow.inset}
                      class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label
                      for="box-inset-{index}"
                      class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Inset Shadow
                    </label>
                  </div>
                </div>
              {/each}

              <button
                onclick={addBoxShadow}
                class="w-full px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
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
                        class="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    {/if}
                  </div>

                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        for="text-xoffset-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        X Offset
                      </label>
                      <input
                        id="text-xoffset-{index}"
                        type="range"
                        bind:value={shadow.x}
                        min="-50"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.x}px</span>
                    </div>

                    <div>
                      <label
                        for="text-yoffset-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Y Offset
                      </label>
                      <input
                        id="text-yoffset-{index}"
                        type="range"
                        bind:value={shadow.y}
                        min="-50"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.y}px</span>
                    </div>

                    <div>
                      <label
                        for="text-blur-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Blur
                      </label>
                      <input
                        id="text-blur-{index}"
                        type="range"
                        bind:value={shadow.blur}
                        min="0"
                        max="50"
                        class="w-full"
                      />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{shadow.blur}px</span>
                    </div>

                    <div class="col-span-3">
                      <label
                        for="text-color-{index}"
                        class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Color
                      </label>
                      <div class="flex gap-2">
                        <input
                          id="text-color-{index}"
                          type="color"
                          bind:value={shadow.color}
                          class="w-12 h-8 rounded"
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
                          class="w-24"
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
                class="w-full px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus class="w-4 h-4 mr-2" />
                Add Text Shadow Layer
              </button>
            </div>
          {/if}
        </div>
      </div>

      <!-- Preview Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Settings</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="background-color"
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Background
              </label>
              <input
                id="background-color"
                type="color"
                bind:value={backgroundColor}
                class="w-full h-8 rounded"
              />
            </div>
            <div>
              <label
                for="text-color"
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Text Color
              </label>
              <input
                id="text-color"
                type="color"
                bind:value={textColor}
                class="w-full h-8 rounded"
              />
            </div>
          </div>

          <div>
            <label
              for="border-radius"
              class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Border Radius: {borderRadius}px
            </label>
            <input
              id="border-radius"
              type="range"
              bind:value={borderRadius}
              min="0"
              max="50"
              class="w-full"
            />
          </div>

          <div>
            <label
              for="preview-text"
              class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Preview Text
            </label>
            <input
              id="preview-text"
              type="text"
              bind:value={previewText}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div class="flex items-center gap-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                bind:checked={showBox}
                class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Box</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                bind:checked={showText}
                class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Text</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Panel -->
    <div class="space-y-6">
      <!-- Live Preview -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2>
        <div
          class="p-8 rounded-lg flex items-center justify-center min-h-[200px] transition-all duration-200"
          style="background-color: {backgroundColor};"
        >
          {#if showBox}
            <div
              class="p-8 rounded-lg transition-all duration-200"
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
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h2>
          <div class="flex gap-2">
            <button
              onclick={() => copyToClipboard(`box-shadow: ${boxShadowCSS};`)}
              class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy Box'}
            </button>
            <button
              onclick={() => copyToClipboard(`text-shadow: ${textShadowCSS};`)}
              class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
            <button
              onclick={downloadCSS}
              class="flex items-center px-3 py-1.5 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Download class="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>

        <div class="p-6 space-y-4">
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
</ToolLayout>
