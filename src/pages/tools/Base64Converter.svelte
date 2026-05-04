<script lang="ts">
  import { Hash, Upload, Shield, FileText, Zap, Check, Copy } from '@lucide/svelte';
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
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Hash class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Base64 Converter</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Encode and decode text and files to Base64 format
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab Navigation -->
  <div class="mb-6">
    <div class="flex justify-center">
      <div
        class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
      >
        <button
          onclick={() => (activeTab = 'text')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'text'
            ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Text Converter
        </button>
        <button
          onclick={() => (activeTab = 'file')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'file'
            ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          File Converter
        </button>
      </div>
    </div>
  </div>

  {#if activeTab === 'text'}
    <!-- Text Converter -->
    <!-- Controls -->
    <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
      <button
        class="btn btn-copy"
        onclick={encodeBase64}>Encode to Base64</button
      >
      <button
        class="btn btn-copy"
        onclick={decodeBase64}>Decode from Base64</button
      >
      <button
        class="btn btn-secondary"
        onclick={loadSampleText}>Load Sample Text</button
      >
      <button
        class="btn btn-secondary"
        onclick={loadSampleBase64}>Load Sample Base64</button
      >
      <button
        class="btn btn-secondary"
        onclick={clearAll}>Clear All</button
      >
    </div>

    <!-- Error Display -->
    {#if error}
      <div
        class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
      >
        <p class="text-red-700 dark:text-red-400 font-medium">
          Error: {error}
        </p>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <textarea
          class="code-editor h-64"
          bind:value={inputText}
          placeholder="Enter text or Base64 string to encode/decode..."
        ></textarea>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
          {inputText.length} characters
        </p>
      </div>

      <!-- Results Section -->
      <div>
        <!-- Encoded Result -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Base64 Result</h2>
            {#if encodedText}
              <button
                class="btn btn-copy btn-sm"
                onclick={() => copyToClipboard(encodedText, 'encoded')}
              >
                {copiedText === 'encoded' ? '✓ Copied!' : 'Copy'}
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
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded Result</h2>
            {#if decodedText}
              <button
                class="btn btn-copy btn-sm"
                onclick={() => copyToClipboard(decodedText, 'decoded')}
              >
                {copiedText === 'decoded' ? '✓ Copied!' : 'Copy'}
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
    <div class="max-w-2xl mx-auto">
      <!-- File Upload -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload File for Base64 Conversion
        </h2>

        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
        >
          <Upload class="w-12 h-12 mx-auto mb-4 text-gray-400" />

          <label for="file-upload" class="cursor-pointer">
            <span class="text-warning-600 dark:text-primary-400 hover:underline font-medium">
              Click to upload
            </span>
            <span class="text-gray-600 dark:text-gray-400"> or drag and drop </span>
          </label>
          <input class="hidden" id="file-upload" type="file" onchange={handleFileSelect} />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Supports any file type</p>
        </div>

        {#if fileName}
          <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected file: {fileName}
            </p>
          </div>
        {/if}
      </div>

      <!-- Processing Status -->
      {#if isProcessing}
        <div class="text-center py-8">
          <div class="inline-flex items-center gap-2">
            <div
              class="w-5 h-5 border-2 border-yellow-600 dark:border-primary-500 border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-gray-600 dark:text-gray-400">Processing file...</span>
          </div>
        </div>
      {/if}

      <!-- Error Display -->
      {#if error}
        <div
          class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p class="text-red-700 dark:text-red-400 font-medium">
            Error: {error}
          </p>
        </div>
      {/if}

      <!-- File Result -->
      {#if fileResult}
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Conversion Result
          </h3>

          <div class="space-y-4">
            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">File Name:</span>
              <p class="text-gray-900 dark:text-white font-mono text-sm">{fileResult.name}</p>
            </div>

            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >Original Size:</span
              >
              <p class="text-gray-900 dark:text-white">{formatFileSize(fileResult.size)}</p>
            </div>

            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >Base64 Length:</span
              >
              <p class="text-gray-900 dark:text-white">{fileResult.encoded.length} characters</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Base64 Data:</span
                >
                <div class="flex gap-2">
                  <button
                    class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white transition-all"
                    onclick={() =>
                      fileResult && copyToClipboard(fileResult.encoded, 'file-encoded')}
                  >
                    {copiedText === 'file-encoded' ? '✓ Copied!' : 'Copy'}
                  </button>
                  <button
                    class="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all"
                    onclick={downloadEncodedFile}
                  >
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Shield class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Encoding</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Encode text and files to Base64 format with proper UTF-8 handling for international
        characters
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Support</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Convert any file type to Base64 and download the encoded data for easy sharing
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Processing</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Instant encoding and decoding with efficient algorithms for both text and binary data
      </p>
    </div>
  </div>
</ToolLayout>
