<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Code, Zap, Download, FileText } from '@lucide/svelte';

  let jsInput = $state('');
  let jsOutput = $state('');
  let minified = $state(false);
  let copiedText = $state('');
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
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadJs() {
    const blob = new Blob([jsOutput], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = minified ? 'script.min.js' : 'script.js';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    jsInput = '';
    jsOutput = '';
    originalSize = 0;
    minifiedSize = 0;
    compressionRatio = 0;
    error = '';
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in JS input
  $effect(() => {
    if (jsInput) {
      processJs();
    }
  });
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4"
      >
        <Code class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        JavaScript Minifier/Beautifier
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Minify and format JavaScript code to optimize performance and improve readability.
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
      <li class="text-gray-900 dark:text-white font-medium">JavaScript Minifier</li>
    </ol>
  </nav>

  <!-- Mode Toggle -->
  <div class="mb-6 flex justify-center">
    <div
      class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
    >
      <button
        onclick={() => (minified = false)}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {!minified
          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Beautify JavaScript
      </button>
      <button
        onclick={() => (minified = true)}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {minified
          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Minify JavaScript
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSampleJs}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample JavaScript
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
    {#if jsOutput}
      <button
        onclick={() => copyToClipboard(jsOutput, 'output')}
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {copiedText === 'output' ? '✓ Copied!' : 'Copy Result'}
      </button>
      <button
        onclick={downloadJs}
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Download JavaScript
      </button>
    {/if}
  </div>

  <!-- Error Display -->
  {#if error}
    <div
      class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-red-700 dark:text-red-400 font-medium">{error}</p>
    </div>
  {/if}

  <!-- Statistics -->
  {#if originalSize > 0}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            {formatFileSize(originalSize)}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            {formatFileSize(minifiedSize)}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p>
          <p
            class="text-lg font-semibold {minifiedSize < originalSize
              ? 'text-green-600'
              : 'text-red-600'} dark:text-{minifiedSize < originalSize ? 'green-400' : 'red-400'}"
          >
            {minifiedSize < originalSize ? '-' : '+'}{formatFileSize(
              Math.abs(minifiedSize - originalSize)
            )}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Compression</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{compressionRatio}%</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- JavaScript Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JavaScript</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {jsInput.length} characters
        </span>
      </div>
      <textarea
        bind:value={jsInput}
        placeholder="Enter your JavaScript code here..."
        class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
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
          readonly
          placeholder="{minified ? 'Minified' : 'Beautified'} JavaScript will appear here..."
          class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
        ></textarea>
        {#if !jsOutput}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="text-gray-400 dark:text-gray-600">
              Enter JavaScript code to see {minified ? 'minified' : 'beautified'} result
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
        class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify JavaScript</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Reduce file size by removing whitespace, comments, and unnecessary characters
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify JavaScript</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Format JavaScript with proper indentation and line breaks for better readability
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Download class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy to clipboard or download processed JavaScript as a file for immediate use
      </p>
    </div>
  </div>
</div>
