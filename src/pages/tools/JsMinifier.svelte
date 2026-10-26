<script lang="ts">
  import { Zap, Download, FileText, RefreshCw, Copy, AlertCircle } from '@lucide/svelte';
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
  // Size tracking
  const inputSize = $derived(new Blob([jsInput]).size);
  const outputSize = $derived(jsOutput ? new Blob([jsOutput]).size : 0);
  const savingsPercent = $derived(inputSize > 0 ? Math.round(((inputSize - outputSize) / inputSize) * 100) : 0);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

</script>

<ToolLayout
  title="JavaScript Minifier"
  description="Minify or beautify JavaScript code with real-time preview and size comparison."
  icon={FileText}
  color="warning"
>
  <!-- Mode Toggle -->
  <div class="tab-nav" role="tablist">
    <button
      role="tab"
      aria-selected={!minified}
      onclick={() => (minified = false)}
      class="tab-btn {!minified ? 'active' : ''}"
    >
      Beautify JavaScript
    </button>
    <button
      role="tab"
      aria-selected={minified}
      onclick={() => (minified = true)}
      class="tab-btn {minified ? 'active' : ''}"
    >
      Minify JavaScript
    </button>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    {#if jsOutput}
      <button
        onclick={() => copyToClipboard(jsOutput)}
        class="btn btn-primary"
      >
        <Copy class="w-4 h-4" />
        Copy result
      </button>
      <button
        onclick={downloadJs}
        class="btn btn-secondary"
      >
        <Download class="w-4 h-4" />
        Download JavaScript
      </button>
    {/if}
    <button
      onclick={loadSampleJs}
      class="btn btn-secondary"
    >
      <RefreshCw class="w-4 h-4" />
      Load sample JavaScript
    </button>
    <button
      onclick={clearAll}
      class="btn btn-ghost"
    >
      Clear all
    </button>
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="status-error flex items-start gap-2 p-3 rounded-md">
      <AlertCircle class="w-5 h-5 text-negative flex-shrink-0 mt-0.5" />
      <p class="text-body-sm text-negative">{error}</p>
    </div>
  {/if}

  <!-- Statistics -->
  {#if originalSize > 0}
    <div class="stats-card">
      <div class="stat-item">
        <p class="text-label text-ink-muted">Original size</p>
        <p class="stat-value font-mono">
          {formatFileSize(originalSize)}
        </p>
      </div>

      <div class="stat-item">
        <p class="text-label text-ink-muted">Processed size</p>
        <p class="stat-value font-mono">
          {formatFileSize(minifiedSize)}
        </p>
      </div>

      <div class="stat-item">
        <p class="text-label text-ink-muted">Size change</p>
        <p
          class="stat-value font-mono {minifiedSize < originalSize
            ? '!text-live'
            : '!text-negative'}"
        >
          {minifiedSize < originalSize ? '-' : '+'}{formatFileSize(
            Math.abs(minifiedSize - originalSize)
          )}
        </p>
      </div>

      <div class="stat-item">
        <p class="text-label text-ink-muted">Compression</p>
        <p class="stat-value font-mono">{compressionRatio}%</p>
      </div>
    </div>
  {/if}

  <!-- JavaScript Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">Input JavaScript</h2>
        <span class="text-count">
          {jsInput.length} characters
        </span>
      </div>

      <textarea
        bind:value={jsInput}
        placeholder="Enter your JavaScript code here..."
        class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">
          {minified ? 'Minified' : 'Beautified'} JavaScript
        </h2>
        <span class="text-count">
          {jsOutput.length} characters
        </span>
      </div>

      <div class="relative">
        <textarea
          bind:value={jsOutput}
          placeholder="{minified ? 'Minified' : 'Beautified'} JavaScript will appear here..."
          readonly
          class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"
        ></textarea>
        {#if !jsOutput}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            <FileText class="w-12 h-12 mb-2 opacity-50 text-ink-muted" />
            <p class="text-body-sm text-ink-muted">
              Enter JavaScript code to see {minified ? 'minified' : 'beautified'} result
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Minify JavaScript</h3>
      <p class="feature-description">
        Reduce file size by removing whitespace, comments, and unnecessary characters
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Beautify JavaScript</h3>
      <p class="feature-description">
        Format JavaScript with proper indentation and line breaks for better readability
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Download class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Export results</h3>
      <p class="feature-description">
        Copy to clipboard or download processed JavaScript as a file for immediate use
      </p>
    </div>
  </div>
</ToolLayout>
