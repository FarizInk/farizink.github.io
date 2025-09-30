<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Code, Zap, FileText } from '@lucide/svelte';

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

  function loadSampleEncoded() {
    inputText =
      '&lt;div class=&quot;container&quot;&gt;\n  &lt;h1&gt;Hello World!&lt;/h1&gt;\n  &lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; text with &lt;em&gt;HTML&lt;/em&gt; tags.&lt;/p&gt;\n&lt;/div&gt;';
    activeTab = 'decode';
    decodeHtml();
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
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4"
      >
        <Code class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        HTML Entity Encoder/Decoder
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert HTML entities and special characters for safe display and storage.
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
      <li class="text-gray-900 dark:text-white font-medium">HTML Encoder</li>
    </ol>
  </nav>

  <!-- Tab Navigation -->
  <div class="mb-6">
    <div class="flex justify-center">
      <div
        class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
      >
        <button
          onclick={() => (activeTab = 'encode')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'encode'
            ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Encode HTML
        </button>
        <button
          onclick={() => (activeTab = 'decode')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'decode'
            ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Decode HTML
        </button>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={activeTab === 'encode' ? encodeHtml : decodeHtml}
      disabled={!inputText.trim()}
      class="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {activeTab === 'encode' ? 'Encode HTML' : 'Decode HTML'}
    </button>
    <button
      onclick={loadSampleText}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample Text
    </button>
    <button
      onclick={loadSampleEncoded}
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Load Sample Encoded
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
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
        class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
      ></textarea>
    </div>

    <!-- Results Section -->
    <div>
      <!-- Encoded/Decoded Result -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {activeTab === 'encode' ? 'Encoded' : 'Decoded'} Result
        </h2>
        {#if (activeTab === 'encode' && encodedText) || (activeTab === 'decode' && decodedText)}
          <button
            onclick={() =>
              copyToClipboard(activeTab === 'encode' ? encodedText : decodedText, 'result')}
            class="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
          >
            {copiedText === 'result' ? '✓ Copied!' : 'Copy'}
          </button>
        {/if}
      </div>
      <div class="relative">
        {#if activeTab === 'encode'}
          <textarea
            bind:value={encodedText}
            readonly
            placeholder="Encoded HTML will appear here..."
            class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
          ></textarea>
          {#if !encodedText}
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p>
            </div>
          {/if}
        {:else}
          <textarea
            bind:value={decodedText}
            readonly
            placeholder="Decoded HTML will appear here..."
            class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
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
    class="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
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
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Code class="w-6 h-6 text-rose-600 dark:text-rose-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encode HTML</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Convert HTML tags and special characters to entities for safe display
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-rose-600 dark:text-rose-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decode HTML</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Convert HTML entities back to readable characters
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-rose-600 dark:text-rose-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unicode Support</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Full support for Unicode characters and special symbols
      </p>
    </div>
  </div>
</div>
