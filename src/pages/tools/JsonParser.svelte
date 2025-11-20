<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { FileJson, Copy, Trash2, Check, AlertCircle, ChevronLeft } from '@lucide/svelte';
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
  }

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<div class="max-w-6xl mx-auto p-6 animate-fade-in">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-6">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-12">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-2xl mb-6 shadow-lg animate-scale-in"
      >
        <FileJson class="w-10 h-10 text-white" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4 tracking-tight"
      >
        JSON Parser
      </h1>
      <p
        class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto leading-relaxed"
      >
        Parse, validate, format, and minify JSON data with syntax highlighting and error detection.
      </p>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-8 flex flex-wrap gap-2 items-center justify-center">
    <button onclick={loadSample} class="btn btn-primary btn-sm">Load Sample</button>
    <button onclick={clearAll} class="btn btn-primary btn-sm text-red-500 hover:text-red-600">
      <Trash2 class="w-4 h-4 mr-2" />
      Clear
    </button>
  </div>

  <!-- Main Content -->
  <div class="mb-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <!-- Input Section -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-secondary-700 dark:text-secondary-300">Input JSON</h3>
          <div class="flex gap-2">
            <button onclick={formatJSON} disabled={!input} class="btn btn-primary btn-sm"
              >Format</button
            >
            <button onclick={minifyJSON} disabled={!input} class="btn btn-secondary btn-sm"
              >Minify</button
            >
          </div>
        </div>
        <textarea
          bind:value={input}
          placeholder="Paste your JSON here..."
          class="textarea font-mono text-sm h-[400px] lg:h-[600px]"
        ></textarea>
        {#if error}
          <div
            class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"
          >
            <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        {/if}
      </div>

      <!-- Output Section -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-secondary-700 dark:text-secondary-300">Output</h3>
          <button onclick={copyToClipboard} disabled={!output} class="btn btn-outline btn-sm">
            <Copy class="w-4 h-4 mr-2" />
            Copy
          </button>
        </div>
        <div class="relative h-[400px] lg:h-[600px]">
          <textarea
            readonly
            value={output}
            class="textarea font-mono text-sm h-full"
            placeholder="Result will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div
        class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Check class="w-6 h-6 text-success-600 dark:text-success-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validation</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instantly validates your JSON and provides helpful error messages for invalid syntax.
      </p>
    </div>
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div
        class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Check class="w-6 h-6 text-success-600 dark:text-success-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formatting</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Beautify minified JSON with proper indentation or minify it for production use.
      </p>
    </div>
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div
        class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Check class="w-6 h-6 text-success-600 dark:text-success-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3>
      <p class="text-gray-600 dark:text-gray-400">
        All processing happens in your browser. No data is sent to any server.
      </p>
    </div>
  </div>
</div>
