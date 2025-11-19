<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Code, Zap, Download, FileText } from '@lucide/svelte';

  let cssInput = $state('');
  let cssOutput = $state('');
  let minified = $state(false);
  let copiedText = $state('');
  let originalSize = $state(0);
  let minifiedSize = $state(0);
  let compressionRatio = $state(0);

  function processCss() {
    if (!cssInput.trim()) {
      cssOutput = '';
      originalSize = 0;
      minifiedSize = 0;
      compressionRatio = 0;
      return;
    }

    originalSize = new Blob([cssInput]).size;

    if (minified) {
      // Minify CSS
      let processed = cssInput
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around braces and semicolons
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        // Remove spaces around colons and commas
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        // Remove last semicolon in blocks
        .replace(/;}/g, '}')
        // Remove leading/trailing whitespace
        .trim();

      cssOutput = processed;
      minifiedSize = new Blob([processed]).size;
    } else {
      // Beautify CSS
      let processed = cssInput
        // Add newlines after braces and semicolons
        .replace(/}/g, '}\n')
        .replace(/;/g, ';\n')
        // Add indentation
        .split('\n')
        .map((line, index, array) => {
          let trimmed = line.trim();
          if (!trimmed) return '';

          let indent = 0;
          let currentIndent = 0;

          // Calculate current indentation based on previous lines
          for (let i = 0; i < index; i++) {
            if (array[i].includes('{')) currentIndent++;
            if (array[i].includes('}')) currentIndent--;
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

      cssOutput = processed;
      minifiedSize = new Blob([processed]).size;
    }

    compressionRatio =
      originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;
  }

  function loadSampleCss() {
    cssInput = `/* Sample CSS styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin-left: 20px;
}

.nav-links a {
    text-decoration: none;
    color: #666666;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #007bff;
}`;

    minified = true;
    processCss();
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadCss() {
    const blob = new Blob([cssOutput], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = minified ? 'styles.min.css' : 'styles.css';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    cssInput = '';
    cssOutput = '';
    originalSize = 0;
    minifiedSize = 0;
    compressionRatio = 0;
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

  // React to changes in CSS input
  $effect(() => {
    if (cssInput) {
      processCss();
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"
      >
        <Code class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Minifier/Beautifier</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Minify and format CSS code to optimize performance and improve readability.
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
      <li class="text-gray-900 dark:text-white font-medium">CSS Minifier</li>
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
          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Beautify CSS
      </button>
      <button
        onclick={() => (minified = true)}
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors {minified
          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Minify CSS
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSampleCss}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample CSS
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
    {#if cssOutput}
      <button
        onclick={() => copyToClipboard(cssOutput, 'output')}
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {copiedText === 'output' ? '✓ Copied!' : 'Copy Result'}
      </button>
      <button
        onclick={downloadCss}
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Download CSS
      </button>
    {/if}
  </div>

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

  <!-- CSS Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input CSS</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {cssInput.length} characters
        </span>
      </div>
      <textarea
        bind:value={cssInput}
        placeholder="Enter your CSS code here..."
        class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {minified ? 'Minified' : 'Beautified'} CSS
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {cssOutput.length} characters
        </span>
      </div>
      <div class="relative">
        <textarea
          bind:value={cssOutput}
         
          placeholder="{minified ? 'Minified' : 'Beautified'} CSS will appear here..."
          class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
        ></textarea>
        {#if !cssOutput}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="text-gray-400 dark:text-gray-600">
              Enter CSS code to see {minified ? 'minified' : 'beautified'} result
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
        <Zap class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify CSS</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Reduce file size by removing whitespace, comments, and unnecessary characters
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify CSS</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Format CSS with proper indentation and line breaks for better readability
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Download class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy to clipboard or download processed CSS as a file for immediate use
      </p>
    </div>
  </div>
</div>
