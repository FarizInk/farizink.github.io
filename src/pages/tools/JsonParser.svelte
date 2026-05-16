<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import {
    FileJson,
    Copy,
    Trash2,
    Check,
    AlertCircle,
    Sparkles,
    Code,
    Wand2
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  let input = $state('');
  let output = $state('');
  let error = $state('');

  function formatJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to format';
        return;
      }
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed, null, 2);
      error = '';
      toast.success('JSON formatted successfully');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function minifyJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to minify';
        return;
      }
      const parsed = JSON.parse(input);
      output = JSON.stringify(parsed);
      error = '';
      toast.success('JSON minified successfully');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function sortKeysJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to sort';
        return;
      }
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed);
      output = JSON.stringify(sorted, null, 2);
      error = '';
      toast.success('JSON sorted by keys');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function sortObjectKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((result: any, key: string) => {
          result[key] = sortObjectKeys(obj[key]);
          return result;
        }, {});
    }
    return obj;
  }

  function validateJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to validate';
        return;
      }
      JSON.parse(input);
      error = '';
      output = '✅ Valid JSON';
      toast.success('JSON is valid!');
    } catch (e) {
      error = (e as Error).message;
      output = '';
      toast.error('Invalid JSON');
    }
  }

  function copyToClipboard() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  }

  function clearAll() {
    input = '';
    output = '';
    error = '';
    toast.success('Cleared all content');
  }

  function loadSample() {
    input = JSON.stringify(
      {
        name: 'FarizInk',
        role: 'Developer',
        skills: ['Svelte', 'TypeScript', 'Tailwind'],
        active: true,
        projects: {
          total: 42,
          featured: ['Portfolio', 'Tools']
        }
      },
      null,
      2
    );
    error = '';
    output = '';
    toast.success('Sample JSON loaded');
  }

  // Get line count
  const inputLines = $derived(input.split('\n').length);
  const outputLines = $derived(output.split('\n').length);
</script>

<ToolLayout
  title="JSON Parser"
  description="Parse, validate, format, and minify JSON data with syntax highlighting and error detection."
  icon={FileJson}
  color="warning"
>
  <!-- Hero / Stats Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <FileJson class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">JSON Parser & Formatter</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Validate, beautify, or minify your JSON data
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          onclick={loadSample}
          class="btn btn-copy"
        >
          <Wand2 class="w-4 h-4" />
          Load Sample
        </button>
        <button
          onclick={clearAll}
          class="btn btn-secondary"
        >
          <Trash2 class="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-warning-100 dark:bg-primary-900/30 rounded-lg">
            <FileJson class="w-4 h-4 text-warning-600 dark:text-primary-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input JSON</h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">({inputLines} lines)</span>
        </div>
        <div class="flex gap-2">
          <div class="flex flex-wrap gap-2">
            <button
              onclick={formatJSON}
              disabled={!input}
              class="btn btn-sm btn-copy"
            >
              <Sparkles class="w-3.5 h-3.5" />
              Format
            </button>
            <button
              onclick={minifyJSON}
              disabled={!input}
              class="btn btn-sm btn-secondary"
            >
              <Code class="w-3.5 h-3.5" />
              Minify
            </button>
            <button
              onclick={sortKeysJSON}
              disabled={!input}
              class="btn btn-sm btn-secondary"
            >
              Sort Keys
            </button>
            <button
              onclick={validateJSON}
              disabled={!input}
              class="btn btn-sm btn-secondary"
            >
              Validate
            </button>
          </div>
        </div>
      </div>

      <textarea
        bind:value={input}
        placeholder="Paste your JSON here..."
        class="code-editor h-48 sm:h-64 lg:h-80"
      ></textarea>

      {#if error}
        <div
          class="flex items-start gap-3 p-4 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="text-sm font-medium text-red-800 dark:text-red-200">Error</p>
            <p class="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Output Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Check class="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Output</h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">({outputLines} lines)</span>
        </div>
        <button
          onclick={copyToClipboard}
          disabled={!output}
          class="btn btn-sm btn-secondary"
        >
          <Copy class="w-3.5 h-3.5" />
          Copy
        </button>
      </div>

      <div class="relative min-h-48 sm:min-h-64 lg:min-h-80">
        <textarea
          readonly
          value={output}
          placeholder="Result will appear here..."
          class="code-editor h-80 lg:h-96 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
        ></textarea>
        {#if !output && !error}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            <FileJson class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p class="text-gray-400 dark:text-gray-500 text-sm">
              Enter JSON and click <span class="font-semibold text-warning-600 dark:text-primary-400"
                >Format</span
              >
              or <span class="font-semibold text-warning-600 dark:text-primary-400">Minify</span>
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Instantly validates your JSON and provides helpful error messages for invalid syntax.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Code class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formatting</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Beautify minified JSON with proper indentation or minify it for production use.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Sparkles class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        All processing happens in your browser. No data is sent to any server.
      </p>
    </div>
  </div>
</ToolLayout>
