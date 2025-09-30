<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Code, CheckCircle, Layout, Copy } from '@lucide/svelte';

  let inputJson = $state('');
  let outputJson = $state('');
  let error = $state('');
  let isValid = $state(false);
  let indentSize = $state(2);

  function formatJson() {
    try {
      const parsed = JSON.parse(inputJson);
      outputJson = JSON.stringify(parsed, null, indentSize);
      error = '';
      isValid = true;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid JSON';
      isValid = false;
      outputJson = '';
    }
  }

  function minifyJson() {
    try {
      const parsed = JSON.parse(inputJson);
      outputJson = JSON.stringify(parsed);
      error = '';
      isValid = true;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Invalid JSON';
      isValid = false;
      outputJson = '';
    }
  }

  function clearAll() {
    inputJson = '';
    outputJson = '';
    error = '';
    isValid = false;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(outputJson);
  }

  function loadSample() {
    inputJson = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": [
    "reading",
    "swimming",
    "coding"
  ],
  "address": {
    "street": "123 Main St",
    "zip": "10001"
  }
}`;
    formatJson();
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4"
      >
        <Code class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JSON Parser & Formatter</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Format, validate, and minify JSON data with ease. Perfect for developers working with APIs
        and configuration files.
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
      <li class="text-gray-900 dark:text-white font-medium">JSON Parser</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center">
    <button
      onclick={formatJson}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Format JSON
    </button>

    <button
      onclick={minifyJson}
      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Minify JSON
    </button>

    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>

    <button
      onclick={loadSample}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample
    </button>

    <div class="flex items-center gap-2">
      <label for="indent" class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Indent:
      </label>
      <select
        id="indent"
        bind:value={indentSize}
        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value={2}>2 spaces</option>
        <option value={4}>4 spaces</option>
        <option value="\t">Tab</option>
      </select>
    </div>
  </div>

  <!-- Error Display -->
  {#if error}
    <div
      class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-red-700 dark:text-red-400 font-medium">Error: {error}</p>
    </div>
  {/if}

  <!-- Success Message -->
  {#if isValid && !error}
    <div
      class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
    >
      <p class="text-green-700 dark:text-green-400 font-medium">✓ Valid JSON</p>
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JSON</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {inputJson.length} characters
        </span>
      </div>
      <textarea
        bind:value={inputJson}
        placeholder="Paste your JSON here..."
        class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Output</h2>
        {#if outputJson}
          <button
            onclick={copyToClipboard}
            class="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        {/if}
      </div>
      <div class="relative">
        <textarea
          bind:value={outputJson}
          readonly
          placeholder="Formatted JSON will appear here..."
          class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
        ></textarea>
        {#if !outputJson && !error}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="text-gray-400 dark:text-gray-600">
              Format or minify your JSON to see the output
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <CheckCircle class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validate JSON</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instant validation with detailed error messages for malformed JSON
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Layout class="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Format & Minify</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Pretty print with custom indentation or compress to minified format
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Copy class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Copy Results</h3>
      <p class="text-gray-600 dark:text-gray-400">
        One-click copy to clipboard for easy sharing and pasting
      </p>
    </div>
  </div>
</div>
