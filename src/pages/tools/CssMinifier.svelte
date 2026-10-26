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
  // Size tracking
  const inputSize = $derived(new Blob([cssInput]).size);
  const outputSize = $derived(cssOutput ? new Blob([cssOutput]).size : 0);
  const savingsPercent = $derived(inputSize > 0 ? Math.round(((inputSize - outputSize) / inputSize) * 100) : 0);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

</script>

<ToolLayout
  title="CSS Minifier"
  description="Minify or beautify CSS code with real-time preview and size comparison."
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
      Beautify CSS
    </button>
    <button
      role="tab"
      aria-selected={minified}
      onclick={() => (minified = true)}
      class="tab-btn {minified ? 'active' : ''}"
    >
      Minify CSS
    </button>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    {#if cssOutput}
      <button
        onclick={() => copyToClipboard(cssOutput)}
        class="btn btn-primary"
      >
        <Copy class="w-4 h-4" />
        Copy result
      </button>
      <button
        onclick={downloadCss}
        class="btn btn-secondary"
      >
        <Download class="w-4 h-4" />
        Download CSS
      </button>
    {/if}
    <button
      onclick={loadSampleCss}
      class="btn btn-secondary"
    >
      <RefreshCw class="w-4 h-4" />
      Load sample CSS
    </button>
    <button
      onclick={clearAll}
      class="btn btn-ghost"
    >
      Clear all
    </button>
  </div>

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

  <!-- CSS Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">Input CSS</h2>
        <span class="text-count">
          {cssInput.length} characters
        </span>
      </div>

      <textarea
        bind:value={cssInput}
        placeholder="Enter your CSS code here..."
        class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"
      ></textarea>
    </div>

    <!-- Output Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">
          {minified ? 'Minified' : 'Beautified'} CSS
        </h2>
        <span class="text-count">
          {cssOutput.length} characters
        </span>
      </div>

      <div class="relative">
        <textarea
          bind:value={cssOutput}
          placeholder="{minified ? 'Minified' : 'Beautified'} CSS will appear here..."
          readonly
          class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"
        ></textarea>
        {#if !cssOutput}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            <FileText class="w-12 h-12 mb-2 opacity-50 text-ink-muted" />
            <p class="text-body-sm text-ink-muted">
              Enter CSS code to see {minified ? 'minified' : 'beautified'} result
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
      <h3 class="feature-title">Minify CSS</h3>
      <p class="feature-description">
        Reduce file size by removing whitespace, comments, and unnecessary characters
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Beautify CSS</h3>
      <p class="feature-description">
        Format CSS with proper indentation and line breaks for better readability
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Download class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Export results</h3>
      <p class="feature-description">
        Copy to clipboard or download processed CSS as a file for immediate use
      </p>
    </div>
  </div>
</ToolLayout>
