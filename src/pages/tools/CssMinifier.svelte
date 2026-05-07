<script lang="ts">
  import { Zap, Download, FileText, RefreshCw, Copy } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

  let cssInput = $state('');
  let cssOutput = $state('');
  let minified = $state(false);
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
    toast.success('Sample CSS loaded');
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  function downloadCss() {
    const blob = new Blob([cssOutput], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = minified ? 'styles.min.css' : 'styles.css';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSS downloaded');
  }

  function clearAll() {
    cssInput = '';
    cssOutput = '';
    originalSize = 0;
    minifiedSize = 0;
    compressionRatio = 0;
    toast.success('Cleared all');
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // React to changes in CSS input
  $effect(() => {
    if (cssInput) {
      processCss();
    }
  });
</script>

<ToolLayout
  title="CSS Minifier"
  description="Minify or beautify CSS code with real-time preview and size comparison."
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
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">CSS Minifier/Beautifier</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Optimize or format your CSS code</p>
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
        class="tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors {!minified
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Beautify CSS
      </button>
      <button
        onclick={() => (minified = true)}
        class="tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors {minified
          ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
      >
        Minify CSS
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={loadSampleCss}
      class="btn btn-copy"
    >
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Sample CSS
    </button>
    <button
      onclick={clearAll}
      class="btn btn-secondary"
    >
      Clear All
    </button>
    {#if cssOutput}
      <button
        onclick={() => copyToClipboard(cssOutput)}
        class="btn btn-copy"
      >
        <Copy class="w-4 h-4 mr-2" />
        Copy Result
      </button>
      <button
        onclick={downloadCss}
        class="btn btn-copy"
      >
        <Download class="w-4 h-4 mr-2" />
        Download CSS
      </button>
    {/if}
  </div>

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

  <!-- CSS Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input CSS</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {cssInput.length} characters
        </span>
      </div>

      <textarea
        bind:value={cssInput}
        placeholder="Enter your CSS code here..."
        class="code-editor min-h-[400px] lg:min-h-[600px]"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div class="flex justify-between items-center mb-4">
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
          readonly
          class="code-editor min-h-[400px] lg:min-h-[600px]"
        ></textarea>
        {#if !cssOutput}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            <FileText class="w-12 h-12 mb-2 opacity-50 text-gray-400 dark:text-gray-600" />
            <p class="text-gray-400 dark:text-gray-600 text-sm">
              Enter CSS code to see {minified ? 'minified' : 'beautified'} result
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify CSS</h3>
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify CSS</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Format CSS with proper indentation and line breaks for better readability
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
        Copy to clipboard or download processed CSS as a file for immediate use
      </p>
    </div>
  </div>
</ToolLayout>
