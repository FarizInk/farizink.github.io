<script lang="ts">
  import { Hash, Upload, Shield, FileText, Zap, AlertCircle, Check } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  let inputText = $state('');
  let encodedText = $state('');
  let decodedText = $state('');
  let activeTab = $state<'text' | 'file'>('text');
  let isProcessing = $state(false);
  let error = $state('');
  let fileName = $state('');
  let fileResult = $state<{ name: string; size: number; encoded: string } | null>(null);
  let copiedText = $state('');

  function encodeBase64() {
    try {
      encodedText = btoa(unescape(encodeURIComponent(inputText)));
      decodedText = '';
      error = '';
    } catch {
      error = 'Failed to encode text. Please check your input.';
      encodedText = '';
    }
  }

  function decodeBase64() {
    try {
      decodedText = decodeURIComponent(escape(atob(inputText)));
      encodedText = '';
      error = '';
    } catch {
      error = 'Invalid Base64 string. Please check your input.';
      decodedText = '';
    }
  }

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      fileName = file.name;
      processFile(file);
    }
  }

  function processFile(file: File) {
    isProcessing = true;
    error = '';

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const result = e.target?.result as string;
        const base64 = result.split(',')[1]; // Remove data URL prefix

        fileResult = {
          name: file.name,
          size: file.size,
          encoded: base64
        };

        isProcessing = false;
      } catch {
        error = 'Failed to process file.';
        isProcessing = false;
      }
    };

    reader.onerror = () => {
      error = 'Failed to read file.';
      isProcessing = false;
    };

    reader.readAsDataURL(file);
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadEncodedFile() {
    if (fileResult) {
      const dataUrl = `data:application/octet-stream;base64,${fileResult.encoded}`;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileResult.name + '.b64';
      a.click();
    }
  }

  function clearAll() {
    inputText = '';
    encodedText = '';
    decodedText = '';
    error = '';
    fileName = '';
    fileResult = null;
  }

  function loadSampleText() {
    inputText = 'Hello, World! This is a sample text for Base64 encoding.';
    encodeBase64();
  }

  function loadSampleBase64() {
    inputText = 'SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=';
    decodeBase64();
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
</script>

<ToolLayout
  title="Base64 Converter"
  description="Encode and decode Base64 strings with support for text and file conversion"
  icon={Hash}
  color="warning"
>
  <!-- Tab Navigation -->
  <div class="flex justify-center">
    <div class="mode-toggle">
      <button
        onclick={() => (activeTab = 'text')}
        class="mode-btn {activeTab === 'text' ? 'active' : ''}"
      >
        Text converter
      </button>
      <button
        onclick={() => (activeTab = 'file')}
        class="mode-btn {activeTab === 'file' ? 'active' : ''}"
      >
        File converter
      </button>
    </div>
  </div>

  {#if activeTab === 'text'}
    <!-- Text Converter -->
    <!-- Controls -->
    <div class="flex flex-wrap gap-2 items-center justify-center">
      <button class="btn btn-primary" onclick={encodeBase64}>Encode to Base64</button>
      <button class="btn btn-secondary" onclick={decodeBase64}>Decode from Base64</button>
      <button class="btn btn-ghost" onclick={loadSampleText}>Load sample text</button>
      <button class="btn btn-ghost" onclick={loadSampleBase64}>Load sample Base64</button>
      <button class="btn btn-ghost" onclick={clearAll}>Clear all</button>
    </div>

    <!-- Error Display -->
    {#if error}
      <div class="status-error flex items-center gap-2 p-4 rounded-md" role="alert">
        <AlertCircle class="w-5 h-5 shrink-0" />
        <p class="text-body-sm">
          Error: {error}
        </p>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Input Section -->
      <div>
        <textarea
          class="code-editor h-64"
          bind:value={inputText}
          placeholder="Enter text or Base64 string to encode/decode..."
        ></textarea>
        <p class="text-count mt-1 text-right">
          {inputText.length} characters
        </p>
      </div>

      <!-- Results Section -->
      <div>
        <!-- Encoded Result -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="section-title-sm mb-0">Base64 result</h2>
            {#if encodedText}
              <button
                class="btn btn-copy btn-sm"
                onclick={() => copyToClipboard(encodedText, 'encoded')}
              >
                {#if copiedText === 'encoded'}<Check class="w-4 h-4" /> Copied{:else}Copy{/if}
              </button>
            {/if}
          </div>
          <textarea
            class="code-editor h-28"
            bind:value={encodedText}
            placeholder="Base64 encoded text will appear here..."
          ></textarea>
        </div>

        <!-- Decoded Result -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="section-title-sm mb-0">Decoded result</h2>
            {#if decodedText}
              <button
                class="btn btn-copy btn-sm"
                onclick={() => copyToClipboard(decodedText, 'decoded')}
              >
                {#if copiedText === 'decoded'}<Check class="w-4 h-4" /> Copied{:else}Copy{/if}
              </button>
            {/if}
          </div>
          <textarea
            class="code-editor h-28"
            bind:value={decodedText}
            placeholder="Decoded text will appear here..."
          ></textarea>
        </div>
      </div>
    </div>
  {:else}
    <!-- File Converter -->
    <div class="max-w-2xl mx-auto w-full flex flex-col gap-4">
      <!-- File Upload -->
      <div class="tool-card">
        <h2 class="section-title">Upload file for Base64 conversion</h2>

        <div class="rounded-md bg-control p-8 text-center">
          <Upload class="w-12 h-12 mx-auto mb-4 text-ink-muted" />

          <label for="file-upload" class="cursor-pointer text-body-sm">
            <span class="text-accent-text hover:underline">
              Click to upload
            </span>
            <span class="text-ink-muted"> or drag and drop </span>
          </label>
          <input class="hidden" id="file-upload" type="file" onchange={handleFileSelect} />
          <p class="text-count mt-2">Supports any file type</p>
        </div>

        {#if fileName}
          <div class="info-card mt-4">
            <p class="text-body-sm text-ink">
              Selected file: <span class="font-mono">{fileName}</span>
            </p>
          </div>
        {/if}
      </div>

      <!-- Processing Status -->
      {#if isProcessing}
        <div class="text-center py-8">
          <div class="inline-flex items-center gap-2">
            <div
              class="w-5 h-5 border-2 border-accent border-t-transparent rounded-pill animate-spin"
            ></div>
            <span class="text-body-sm text-ink-muted">Processing file...</span>
          </div>
        </div>
      {/if}

      <!-- Error Display -->
      {#if error}
        <div class="status-error flex items-center gap-2 p-4 rounded-md" role="alert">
          <AlertCircle class="w-5 h-5 shrink-0" />
          <p class="text-body-sm">
            Error: {error}
          </p>
        </div>
      {/if}

      <!-- File Result -->
      {#if fileResult}
        <div class="tool-card">
          <h3 class="section-title">Conversion result</h3>

          <div class="flex flex-col gap-4">
            <div>
              <span class="text-label text-ink-muted">File name</span>
              <p class="text-ink font-mono text-code">{fileResult.name}</p>
            </div>

            <div>
              <span class="text-label text-ink-muted">Original size</span>
              <p class="text-ink font-mono text-code">{formatFileSize(fileResult.size)}</p>
            </div>

            <div>
              <span class="text-label text-ink-muted">Base64 length</span>
              <p class="text-ink font-mono text-code">{fileResult.encoded.length} characters</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-label text-ink-muted">Base64 data</span>
                <div class="flex gap-2">
                  <button
                    class="btn btn-copy btn-sm"
                    onclick={() =>
                      fileResult && copyToClipboard(fileResult.encoded, 'file-encoded')}
                  >
                    {#if copiedText === 'file-encoded'}<Check class="w-4 h-4" /> Copied{:else}Copy{/if}
                  </button>
                  <button class="btn btn-ghost btn-sm" onclick={downloadEncodedFile}>
                    Download
                  </button>
                </div>
              </div>
              <textarea
                class="code-editor h-48"
                value={fileResult.encoded}
              ></textarea>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <Shield class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Secure encoding</h3>
      <p class="feature-description">
        Encode text and files to Base64 format with proper UTF-8 handling for international
        characters
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">File support</h3>
      <p class="feature-description">
        Convert any file type to Base64 and download the encoded data for easy sharing
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Fast processing</h3>
      <p class="feature-description">
        Instant encoding and decoding with efficient algorithms for both text and binary data
      </p>
    </div>
  </div>
</ToolLayout>
