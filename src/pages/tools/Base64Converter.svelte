<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Hash, Upload, Shield, FileText, Zap } from '@lucide/svelte';

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

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"
      >
        <Hash class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Base64 Converter</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Encode and decode Base64 strings with support for text and file conversion.
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
      <li class="text-gray-900 dark:text-white font-medium">Base64 Converter</li>
    </ol>
  </nav>

  <!-- Tab Navigation -->
  <div class="mb-6">
    <div class="flex justify-center">
      <div
        class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
      >
        <button
          onclick={() => (activeTab = 'text')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'text'
            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Text Converter
        </button>
        <button
          onclick={() => (activeTab = 'file')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'file'
            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
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
    <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
      <button class="btn btn-primary" onclick={encodeBase64}>Encode to Base64</button>
      <button class="btn btn-primary" onclick={decodeBase64}>Decode from Base64</button>
      <button class="btn btn-primary btn-sm" onclick={loadSampleText}>Load Sample Text</button>
      <button class="btn btn-primary btn-sm" onclick={loadSampleBase64}>Load Sample Base64</button>
      <button class="btn btn-primary btn-sm" onclick={clearAll}>Clear All</button>
    </div>

    <!-- Error Display -->
    {#if error}
      <div
        class="mb-4 p-4 bg-danger-100 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"
      >
        <p class="text-danger-700 dark:text-danger-400 font-medium">
          Error: {error}
        </p>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <textarea
          class="textarea"
          bind:value={inputText}
          placeholder="Enter text or Base64 string to encode/decode..."
          rows={16}
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
                class="btn btn-primary btn-sm"
                onclick={() => copyToClipboard(encodedText, 'encoded')}
              >
                {copiedText === 'encoded' ? '✓ Copied!' : 'Copy'}
              </button>
            {/if}
          </div>
          <textarea
            class="textarea"
            bind:value={encodedText}
            placeholder="Base64 encoded text will appear here..."
            rows={7}
          ></textarea>
        </div>

        <!-- Decoded Result -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded Result</h2>
            {#if decodedText}
              <button
                class="btn btn-primary btn-sm"
                onclick={() => copyToClipboard(decodedText, 'decoded')}
              >
                {copiedText === 'decoded' ? '✓ Copied!' : 'Copy'}
              </button>
            {/if}
          </div>
          <textarea
            class="textarea"
            bind:value={decodedText}
            placeholder="Decoded text will appear here..."
            rows={7}
          ></textarea>
        </div>
      </div>
    </div>
  {:else}
    <!-- File Converter -->
    <div class="max-w-2xl mx-auto">
      <!-- File Upload -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload File for Base64 Conversion
        </h2>

        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
        >
          <Upload class="w-12 h-12 mx-auto mb-4 text-gray-400" />

          <label for="file-upload" class="cursor-pointer">
            <span
              class="text-primary-600 dark:text-blue-400 hover:underline font-medium"
            >
              Click to upload
            </span>
            <span class="text-gray-600 dark:text-gray-400"> or drag and drop </span>
          </label>
          <input class="input hidden" id="file-upload" type="file" onchange={handleFileSelect} />
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
              class="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-gray-600 dark:text-gray-400">Processing file...</span>
          </div>
        </div>
      {/if}

      <!-- Error Display -->
      {#if error}
        <div
          class="mb-4 p-4 bg-danger-100 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"
        >
          <p class="text-danger-700 dark:text-danger-400 font-medium">
            Error: {error}
          </p>
        </div>
      {/if}

      <!-- File Result -->
      {#if fileResult}
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
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
                    class="btn btn-primary btn-sm"
                    onclick={() =>
                      fileResult && copyToClipboard(fileResult.encoded, 'file-encoded')}
                  >
                    {copiedText === 'file-encoded' ? '✓ Copied!' : 'Copy'}
                  </button>
                  <button class="btn btn-primary btn-sm" onclick={downloadEncodedFile}>
                    Download
                  </button>
                </div>
              </div>
              <textarea class="textarea" value={fileResult.encoded} rows={8}></textarea>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Shield class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Encoding</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Encode text and files to Base64 format with proper UTF-8 handling for international
        characters
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Support</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Convert any file type to Base64 and download the encoded data for easy sharing
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Processing</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instant encoding and decoding with efficient algorithms for both text and binary data
      </p>
    </div>
  </div>
</div>
