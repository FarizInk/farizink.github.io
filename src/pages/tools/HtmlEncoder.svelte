<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Code, Zap, FileText, Copy, RefreshCw } from '@lucide/svelte';

  let inputText = $state('');
  let encodedText = $state('');
  let decodedText = $state('');
  let copiedText = $state('');
  let activeTab = $state<'encode' | 'decode'>('encode');

  function encodeHtml() {
    const div = document.createElement('div');
    div.textContent = inputText;
    encodedText = div.innerHTML;
    decodedText = '';
  }

  function decodeHtml() {
    const div = document.createElement('div');
    div.innerHTML = inputText;
    decodedText = div.textContent || div.innerText || '';
    encodedText = '';
  }

  function loadSampleText() {
    inputText =
      '<div class="container">\n  <h1>Hello World!</h1>\n  <p>This is a <strong>sample</strong> text with <em>HTML</em> tags.</p>\n</div>';
    activeTab = 'encode';
    encodeHtml();
  }


  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    inputText = '';
    encodedText = '';
    decodedText = '';
  }
</script>

<ToolLayout
  title="HTML Entity Encoder"
  description="Encode and decode HTML entities to prevent XSS attacks and display special characters."
  icon={FileText}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Code class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">HTML Entity Encoder</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Encode and decode HTML entities safely
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab Navigation -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm"
  >
    <div
      class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
    >
      <button
        onclick={() => (activeTab = 'encode')}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'encode'
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Encode HTML
      </button>
      <button
        onclick={() => (activeTab = 'decode')}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'decode'
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Decode HTML
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={activeTab === 'encode' ? encodeHtml : decodeHtml}
      disabled={!inputText.trim()}
      class="btn btn-copy"
    >
      {activeTab === 'encode' ? 'Encode HTML' : 'Decode HTML'}
    </button>
    <button class="btn btn-secondary" onclick={loadSampleText}>
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Sample
    </button>
    <button class="btn btn-secondary" onclick={clearAll}>
      Clear All
    </button>
  </div>

  <!-- Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {inputText.length} characters
        </span>
      </div>

      <textarea
        bind:value={inputText}
        placeholder="Enter {activeTab === 'encode'
          ? 'HTML code or text'
          : 'HTML entities'} to {activeTab === 'encode' ? 'encode' : 'decode'}..."
        class="code-editor h-64"
      ></textarea>
    </div>

    <!-- Results Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {activeTab === 'encode' ? 'Encoded' : 'Decoded'} Result
        </h2>
        {#if (activeTab === 'encode' && encodedText) || (activeTab === 'decode' && decodedText)}
          <button
            onclick={() =>
              copyToClipboard(activeTab === 'encode' ? encodedText : decodedText, 'result')}
            class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-all"
          >
            <Copy class="w-4 h-4 mr-1" />
            {copiedText === 'result' ? 'Copied!' : 'Copy'}
          </button>
        {/if}
      </div>

      <div class="relative">
        {#if activeTab === 'encode'}
          <textarea
            bind:value={encodedText}
            placeholder="Encoded HTML will appear here..."
            class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            readonly
          ></textarea>
          {#if !encodedText}
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p>
            </div>
          {/if}
        {:else}
          <textarea
            bind:value={decodedText}
            placeholder="Decoded HTML will appear here..."
            class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            readonly
          ></textarea>
          {#if !decodedText}
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-gray-400 dark:text-gray-600">
                Enter HTML entities above to see decoded result
              </p>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>

  <!-- Common HTML Entities Reference -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common HTML Entities</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300"
              >Character</th
            >
            <th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300"
              >Entity Name</th
            >
            <th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300"
              >Entity Number</th
            >
            <th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300"
              >Description</th
            >
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono">&lt;</td>
            <td class="py-2 px-3 font-mono">&amp;lt;</td>
            <td class="py-2 px-3 font-mono">&amp;#60;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Less than</td>
          </tr>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono">&gt;</td>
            <td class="py-2 px-3 font-mono">&amp;gt;</td>
            <td class="py-2 px-3 font-mono">&amp;#62;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Greater than</td>
          </tr>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono">&amp;</td>
            <td class="py-2 px-3 font-mono">&amp;amp;</td>
            <td class="py-2 px-3 font-mono">&amp;#38;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Ampersand</td>
          </tr>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono">"</td>
            <td class="py-2 px-3 font-mono">&amp;quot;</td>
            <td class="py-2 px-3 font-mono">&amp;#34;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Quotation mark</td>
          </tr>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono">'</td>
            <td class="py-2 px-3 font-mono">&amp;apos;</td>
            <td class="py-2 px-3 font-mono">&amp;#39;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Apostrophe</td>
          </tr>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <td class="py-2 px-3 font-mono"> </td>
            <td class="py-2 px-3 font-mono">&amp;nbsp;</td>
            <td class="py-2 px-3 font-mono">&amp;#160;</td>
            <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Non-breaking space</td>
          </tr>
        </tbody>
      </table>
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
        <Code class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encode HTML</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Convert HTML tags and special characters to entities for safe display
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <FileText class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decode HTML</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Convert HTML entities back to readable characters
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unicode Support</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Full support for Unicode characters and special symbols
      </p>
    </div>
  </div>
</ToolLayout>
