<script lang="ts">
  import { navigate } from '../../lib/router.js';
import { ChevronLeft, Lock, Upload, Shield, FileText, Zap } from '@lucide/svelte';

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
    } catch (e) {
      error = 'Failed to encode text. Please check your input.';
      encodedText = '';
    }
  }

  function decodeBase64() {
    try {
      decodedText = decodeURIComponent(escape(atob(inputText)));
      encodedText = '';
      error = '';
    } catch (e) {
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
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const base64 = result.split(',')[1]; // Remove data URL prefix

        fileResult = {
          name: file.name,
          size: file.size,
          encoded: base64
        };

        isProcessing = false;
      } catch (e) {
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
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4">
        <Lock class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Base64 Converter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Encode and decode Base64 strings with support for text and file conversion.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
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
      <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
        <button
          onclick={() => activeTab = 'text'}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {
            activeTab === 'text'
              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }"
        >
          Text Converter
        </button>
        <button
          onclick={() => activeTab = 'file'}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {
            activeTab === 'file'
              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }"
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
      <button
        onclick={encodeBase64}
        class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
      >
        Encode to Base64
      </button>
      <button
        onclick={decodeBase64}
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Decode from Base64
      </button>
      <button
        onclick={loadSampleText}
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Load Sample Text
      </button>
      <button
        onclick={loadSampleBase64}
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Load Sample Base64
      </button>
      <button
        onclick={clearAll}
        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Clear All
      </button>
    </div>

    <!-- Error Display -->
    {#if error}
      <div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-700 dark:text-red-400 font-medium">Error: {error}</p>
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Input
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} characters
          </span>
        </div>
        <textarea
          bind:value={inputText}
          placeholder="Enter text or Base64 string to encode/decode..."
          class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        ></textarea>
      </div>

      <!-- Results Section -->
      <div>
        <!-- Encoded Result -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Base64 Result
            </h2>
            {#if encodedText}
              <button
                onclick={() => copyToClipboard(encodedText, 'encoded')}
                class="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                {copiedText === 'encoded' ? '✓ Copied!' : 'Copy'}
              </button>
            {/if}
          </div>
          <div class="relative">
            <textarea
              bind:value={encodedText}
              readonly
              placeholder="Base64 encoded text will appear here..."
              class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            ></textarea>
            {#if !encodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-gray-400 dark:text-gray-600">
                  Enter text above to see Base64 result
                </p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Decoded Result -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Decoded Result
            </h2>
            {#if decodedText}
              <button
                onclick={() => copyToClipboard(decodedText, 'decoded')}
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {copiedText === 'decoded' ? '✓ Copied!' : 'Copy'}
              </button>
            {/if}
          </div>
          <div class="relative">
            <textarea
              bind:value={decodedText}
              readonly
              placeholder="Decoded text will appear here..."
              class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            ></textarea>
            {#if !decodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-gray-400 dark:text-gray-600">
                  Enter Base64 string above to see decoded result
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- File Converter -->
    <div class="max-w-2xl mx-auto">
      <!-- File Upload -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload File for Base64 Conversion
        </h2>

        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <Upload class="w-12 h-12 mx-auto mb-4 text-gray-400" />

          <label for="file-upload" class="cursor-pointer">
            <span class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Click to upload
            </span>
            <span class="text-gray-600 dark:text-gray-400">
              or drag and drop
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            onchange={handleFileSelect}
            class="hidden"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Supports any file type
          </p>
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
            <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-gray-600 dark:text-gray-400">Processing file...</span>
          </div>
        </div>
      {/if}

      <!-- Error Display -->
      {#if error}
        <div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-700 dark:text-red-400 font-medium">Error: {error}</p>
        </div>
      {/if}

      <!-- File Result -->
      {#if fileResult}
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Conversion Result
          </h3>

          <div class="space-y-4">
            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">File Name:</span>
              <p class="text-gray-900 dark:text-white font-mono text-sm">{fileResult.name}</p>
            </div>

            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Original Size:</span>
              <p class="text-gray-900 dark:text-white">{formatFileSize(fileResult.size)}</p>
            </div>

            <div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Length:</span>
              <p class="text-gray-900 dark:text-white">{fileResult.encoded.length} characters</p>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Data:</span>
                <div class="flex gap-2">
                  <button
                    onclick={() => fileResult && copyToClipboard(fileResult.encoded, 'file-encoded')}
                    class="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  >
                    {copiedText === 'file-encoded' ? '✓ Copied!' : 'Copy'}
                  </button>
                  <button
                    onclick={downloadEncodedFile}
                    class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
              <textarea
                readonly
                value={fileResult.encoded}
                class="w-full h-32 p-3 font-mono text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4">
        <Shield class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Secure Encoding
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Encode text and files to Base64 format with proper UTF-8 handling for international characters
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4">
        <FileText class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        File Support
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Convert any file type to Base64 and download the encoded data for easy sharing
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4">
        <Zap class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Fast Processing
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instant encoding and decoding with efficient algorithms for both text and binary data
      </p>
    </div>
  </div>
</div>