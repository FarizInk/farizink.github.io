<script lang="ts">
  import { Zap, Download, FileText, RefreshCw, Copy, AlertCircle, Check } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

  let jsInput = $state('');
  let jsOutput = $state('');
  let minified = $state(false);
  let originalSize = $state(0);
  let minifiedSize = $state(0);
  let compressionRatio = $state(0);
  let error = $state('');

  function processJs() {
    if (!jsInput.trim()) {
      jsOutput = '';
      originalSize = 0;
      minifiedSize = 0;
      compressionRatio = 0;
      error = '';
      return;
    }

    originalSize = new Blob([jsInput]).size;

    try {
      if (minified) {
        // Minify JavaScript
        let processed = jsInput
          // Remove single-line comments (but keep // URLs)
          .replace(/(?:^|\n|\r)\s*\/\/.*$/gm, '')
          // Remove multi-line comments
          .replace(/\/\*[\s\S]*?\*\//g, '')
          // Remove extra whitespace
          .replace(/\s+/g, ' ')
          // Remove spaces around operators and punctuation
          .replace(/\s*([+\-*/=<>!&|,;:{}()[\]])\s*/g, '$1')
          // Remove leading/trailing whitespace
          .trim();

        jsOutput = processed;
        minifiedSize = new Blob([processed]).size;
      } else {
        // Beautify JavaScript
        let processed = jsInput
          // Add spacing around operators
          .replace(/([+\-*/=<>!&|,;:{}()[\]])/g, ' $1 ')
          // Fix multiple spaces
          .replace(/\s+/g, ' ')
          // Add newlines after semicolons and braces
          .replace(/;/g, ';\n')
          .replace(/{/g, '{\n')
          .replace(/}/g, '\n}\n')
          // Add indentation
          .split('\n')
          .map((line, index, array) => {
            let trimmed = line.trim();
            if (!trimmed) return '';

            let indent = 0;
            let currentIndent = 0;

            // Calculate current indentation based on previous lines
            for (let i = 0; i < index; i++) {
              const prevLine = array[i].trim();
              if (prevLine === '{') currentIndent++;
              if (prevLine === '}') currentIndent--;
            }

            indent = Math.max(0, currentIndent);

            // Reduce indentation for closing braces
            if (trimmed === '}') {
              indent = Math.max(0, indent - 1);
            }

            return '  '.repeat(indent) + trimmed;
          })
          .filter(line => line.trim())
          .join('\n');

        jsOutput = processed;
        minifiedSize = new Blob([processed]).size;
      }

      compressionRatio =
        originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;
      error = '';
    } catch {
      error = 'Error processing JavaScript. Please check your syntax.';
      jsOutput = '';
    }
  }

  function loadSampleJs() {
    jsInput = `// Sample JavaScript function
function calculateTotal(items, tax = 0.08) {
    let subtotal = 0;

    // Calculate subtotal
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        subtotal += item.price * item.quantity;
    }

    // Calculate tax and total
    const taxAmount = subtotal * tax;
    const total = subtotal + taxAmount;

    return {
        subtotal: subtotal,
        tax: taxAmount,
        total: total,
        currency: 'USD'
    };
}

// Example usage
const cartItems = [
    { name: 'Book', price: 15.99, quantity: 2 },
    { name: 'Pen', price: 2.49, quantity: 5 },
    { name: 'Notebook', price: 8.99, quantity: 1 }
];

const result = calculateTotal(cartItems);
console.log('Total amount:', result.total);`;

    minified = true;
    processJs();
    toast.success('Sample JavaScript loaded');
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  function downloadJs() {
    const blob = new Blob([jsOutput], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = minified ? 'script.min.js' : 'script.js';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JavaScript downloaded');
  }

  function clearAll() {
    jsInput = '';
    jsOutput = '';
    originalSize = 0;
    minifiedSize = 0;
    compressionRatio = 0;
    error = '';
    toast.success('Cleared all');
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // React to changes in JS input
  $effect(() => {
    if (jsInput) {
      processJs();
    }
  });
</script>

<ToolLayout
  title="JavaScript Minifier"
  description="Minify or beautify JavaScript code with real-time preview and size comparison."
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
          <FileText class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            JavaScript Minifier/Beautifier
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Optimize or format your JavaScript code
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mode Toggle -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm"
  >
    <div
      class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
    >
      <button
        onclick={() => (minified = false)}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {!minified
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Beautify JavaScript
      </button>
      <button
        onclick={() => (minified = true)}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {minified
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Minify JavaScript
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={loadSampleJs}
      class="btn btn-copy"
    >
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Sample JavaScript
    </button>
    <button
      onclick={clearAll}
      class="btn btn-secondary"
    >
      Clear All
    </button>
    {#if jsOutput}
      <button
        onclick={() => copyToClipboard(jsOutput)}
        class="btn btn-copy"
      >
        <Copy class="w-4 h-4 mr-2" />
        Copy Result
      </button>
      <button
        onclick={downloadJs}
        class="btn btn-copy"
      >
        <Download class="w-4 h-4 mr-2" />
        Download JavaScript
      </button>
    {/if}
  </div>

  <!-- Error Display -->
  {#if error}
    <div
      class="flex items-start gap-2 p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
    >
      <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      <p class="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
    </div>
  {/if}

  <!-- Statistics -->
  {#if originalSize > 0}
    <div
      class="flex justify-center gap-8 p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6 flex-wrap shadow-sm"
    >
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">
          {formatFileSize(originalSize)}
        </p>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">
          {formatFileSize(minifiedSize)}
        </p>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p>
        <p
          class="text-lg font-semibold {minifiedSize < originalSize
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'}"
        >
          {minifiedSize < originalSize ? '-' : '+'}{formatFileSize(
            Math.abs(minifiedSize - originalSize)
          )}
        </p>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Compression</p>
        <p class="text-lg font-semibold text-gray-900 dark:text-white">{compressionRatio}%</p>
      </div>
    </div>
  {/if}

  <!-- JavaScript Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JavaScript</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {jsInput.length} characters
        </span>
      </div>

      <textarea
        bind:value={jsInput}
        placeholder="Enter your JavaScript code here..."
        class="code-editor min-h-[400px] lg:min-h-[600px]"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {minified ? 'Minified' : 'Beautified'} JavaScript
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {jsOutput.length} characters
        </span>
      </div>

      <div class="relative">
        <textarea
          bind:value={jsOutput}
          placeholder="{minified ? 'Minified' : 'Beautified'} JavaScript will appear here..."
          readonly
          class="code-editor min-h-[400px] lg:min-h-[600px]"
        ></textarea>
        {#if !jsOutput}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            <FileText class="w-12 h-12 mb-2 opacity-50 text-gray-400 dark:text-gray-600" />
            <p class="text-gray-400 dark:text-gray-600 text-sm">
              Enter JavaScript code to see {minified ? 'minified' : 'beautified'} result
            </p>
          </div>
        {/if}
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
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify JavaScript</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Reduce file size by removing whitespace, comments, and unnecessary characters
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify JavaScript</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Format JavaScript with proper indentation and line breaks for better readability
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Download class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy to clipboard or download processed JavaScript as a file for immediate use
      </p>
    </div>
  </div>
</ToolLayout>
