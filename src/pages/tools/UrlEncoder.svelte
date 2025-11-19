<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Link, Shield, Zap, CreditCard } from '@lucide/svelte';

  let inputText = $state('');
  let encodedText = $state('');
  let decodedText = $state('');
  let batchInput = $state('');
  let batchResults = $state<Array<{ original: string; encoded: string; decoded: string }>>([]);
  let copiedText = $state('');
  let activeTab = $state<'single' | 'batch'>('single');

  function encodeUrl() {
    try {
      encodedText = encodeURIComponent(inputText);
      // Auto decode to show round-trip
      decodedText = decodeURIComponent(encodedText);
    } catch {
      encodedText = '';
      decodedText = '';
    }
  }

  function decodeUrl() {
    try {
      decodedText = decodeURIComponent(inputText);
      // Auto encode to show round-trip
      encodedText = encodeURIComponent(decodedText);
    } catch {
      decodedText = 'Error: Invalid URL encoding';
      encodedText = '';
    }
  }

  function encodeBatch() {
    try {
      const lines = batchInput.split('\n').filter(line => line.trim());
      batchResults = lines.map(line => {
        try {
          const encoded = encodeURIComponent(line);
          const decoded = decodeURIComponent(encoded);
          return { original: line, encoded, decoded };
        } catch {
          return {
            original: line,
            encoded: 'Error: Invalid characters',
            decoded: 'Error: Invalid characters'
          };
        }
      });
    } catch {
      batchResults = [];
    }
  }

  function clearAll() {
    inputText = '';
    encodedText = '';
    decodedText = '';
    batchInput = '';
    batchResults = [];
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function copyBatchResults() {
    const results = batchResults
      .map(
        result =>
          `Original: ${result.original}\nEncoded: ${result.encoded}\nDecoded: ${result.decoded}\n`
      )
      .join('\n');
    copyToClipboard(results, 'batch');
  }

  function loadSampleUrls() {
    batchInput = `https://example.com/search?q=hello world&category=web development
https://test.com/path/to/file?name=John Doe&age=30&city=New York
https://api.example.com/users?filter=name eq "John Smith"&sort=created_at desc
https://site.com/page?param=value with spaces&another=special!@#$%^&*()chars
https://demo.com/search?query=测试&lang=zh-CN`;
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Auto-encode/decode when input changes
  $effect(() => {
    if (inputText && activeTab === 'single') {
      encodeUrl();
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4"
      >
        <Link class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Encoder/Decoder</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Encode and decode URLs safely. Perfect for handling special characters and international
        content.
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
      <li class="text-gray-900 dark:text-white font-medium">URL Encoder/Decoder</li>
    </ol>
  </nav>

  <!-- Tab Navigation -->
  <div class="mb-6">
    <div class="flex justify-center">
      <div
        class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
      >
        <button
          onclick={() => (activeTab = 'single')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'single'
            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Single URL
        </button>
        <button
          onclick={() => (activeTab = 'batch')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'batch'
            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Batch Processing
        </button>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    {#if activeTab === 'single'}
      <button
        onclick={encodeUrl}
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Encode URL
      </button>
      <button
        onclick={decodeUrl}
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Decode URL
      </button>
    {:else}
      <button
        onclick={encodeBatch}
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Process Batch
      </button>
      <button
        onclick={loadSampleUrls}
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Load Sample URLs
      </button>
    {/if}
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  {#if activeTab === 'single'}
    <!-- Single URL Processing -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text / URL</h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} characters
          </span>
        </div>
        <textarea
          bind:value={inputText}
          placeholder="Enter text or URL to encode/decode..."
          class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        ></textarea>

        <!-- Quick Examples -->
        <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Examples:</p>
          <div class="space-y-1">
            <button
              onclick={() => {
                inputText = 'https://example.com/search?q=hello world&category=web development';
                encodeUrl();
              }}
              class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              Query parameters with spaces
            </button>
            <button
              onclick={() => {
                inputText = 'https://test.com/path?name=John Doe&city=New York';
                encodeUrl();
              }}
              class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              Multiple parameters with special characters
            </button>
            <button
              onclick={() => {
                inputText = 'https://site.com/search?q=测试&lang=zh-CN';
                encodeUrl();
              }}
              class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              International characters (Chinese)
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div>
        <!-- Encoded Result -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Encoded URL</h2>
            {#if encodedText}
              <button
                onclick={() => copyToClipboard(encodedText, 'encoded')}
                class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                {copiedText === 'encoded' ? '✓ Copied!' : 'Copy'}
              </button>
            {/if}
          </div>
          <div class="relative">
            <textarea
              bind:value={encodedText}
             
              placeholder="Encoded URL will appear here..."
              class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            ></textarea>
            {#if !encodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-gray-400 dark:text-gray-600">
                  Enter text above to see encoded result
                </p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Decoded Result -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Decoded URL (Round-trip)
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
             
              placeholder="Decoded URL will appear here..."
              class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            ></textarea>
            {#if !decodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-gray-400 dark:text-gray-600">
                  Round-trip test result will appear here
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Batch Processing -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Batch Input -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Batch Input (one URL per line)
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {batchInput.split('\n').filter(line => line.trim()).length} URLs
          </span>
        </div>
        <textarea
          bind:value={batchInput}
          placeholder="Enter multiple URLs or text strings, one per line..."
          class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        ></textarea>
      </div>

      <!-- Batch Results -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Results</h2>
          {#if batchResults.length > 0}
            <button
              onclick={copyBatchResults}
              class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {copiedText === 'batch' ? '✓ Copied!' : 'Copy All'}
            </button>
          {/if}
        </div>
        <div
          class="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4"
        >
          {#if batchResults.length === 0}
            <div class="flex items-center justify-center h-full">
              <p class="text-gray-400 dark:text-gray-600">Process batch URLs to see results</p>
            </div>
          {:else}
            <div class="space-y-4">
              {#each batchResults as result, index (result.original + index)}
                <div class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    #{index + 1}
                  </div>
                  <div class="space-y-2">
                    <div>
                      <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
                        >Original:</span
                      >
                      <div class="font-mono text-xs text-gray-900 dark:text-white break-all">
                        {result.original}
                      </div>
                    </div>
                    <div>
                      <span class="text-xs font-medium text-green-600 dark:text-green-400"
                        >Encoded:</span
                      >
                      <div class="font-mono text-xs text-green-700 dark:text-green-300 break-all">
                        {result.encoded}
                      </div>
                    </div>
                    <div>
                      <span class="text-xs font-medium text-blue-600 dark:text-blue-400"
                        >Decoded:</span
                      >
                      <div class="font-mono text-xs text-blue-700 dark:text-blue-300 break-all">
                        {result.decoded}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Shield class="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe Encoding</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Properly encodes special characters, spaces, and international characters for safe URL
        transmission
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Process multiple URLs at once with batch mode for efficient workflow
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <CreditCard class="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Round-trip Testing</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Automatic round-trip testing ensures your URLs decode back to the original text
      </p>
    </div>
  </div>
</div>
