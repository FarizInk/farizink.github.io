<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Link, Shield, Zap, CreditCard, Copy } from '@lucide/svelte';

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

  // Auto-encode/decode when input changes
  $effect(() => {
    if (inputText && activeTab === 'single') {
      encodeUrl();
    }
  });
</script>

<ToolLayout
  title="URL Encoder"
  description="Encode and decode URLs for safe transmission and parameter handling."
  icon={Link}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Link class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">URL Encoder/Decoder</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Encode and decode URLs for safe transmission
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
          onclick={() => (activeTab = 'single')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'single'
            ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Single URL
        </button>
        <button
          onclick={() => (activeTab = 'batch')}
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors {activeTab === 'batch'
            ? 'bg-warning-100 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
        >
          Batch Processing
        </button>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    {#if activeTab === 'single'}
      <button class="btn btn-copy" onclick={encodeUrl}>
        Encode URL
      </button>
      <button class="btn btn-copy" onclick={decodeUrl}>
        Decode URL
      </button>
    {:else}
      <button class="btn btn-copy" onclick={encodeBatch}>
        Process Batch
      </button>
      <button class="btn btn-secondary" onclick={loadSampleUrls}>
        Load Sample URLs
      </button>
    {/if}
    <button class="btn btn-secondary" onclick={clearAll}>
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
          class="code-editor h-64"
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
              class="block w-full text-left text-sm text-warning-600 dark:text-primary-400 hover:underline"
            >
              Query parameters with spaces
            </button>
            <button
              onclick={() => {
                inputText = 'https://test.com/path?name=John Doe&city=New York';
                encodeUrl();
              }}
              class="block w-full text-left text-sm text-warning-600 dark:text-primary-400 hover:underline"
            >
              Multiple parameters with special characters
            </button>
            <button
              onclick={() => {
                inputText = 'https://site.com/search?q=测试&lang=zh-CN';
                encodeUrl();
              }}
              class="block w-full text-left text-sm text-warning-600 dark:text-primary-400 hover:underline"
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
              <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(encodedText, 'encoded')}>
                <Copy class="w-3.5 h-3.5" />
                {copiedText === 'encoded' ? 'Copied!' : 'Copy'}
              </button>
            {/if}
          </div>

          <div class="relative">
            <textarea
              bind:value={encodedText}
              placeholder="Encoded URL will appear here..."
              class="code-editor h-28 bg-gray-50 dark:bg-gray-900"
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
              <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(decodedText, 'decoded')}>
                <Copy class="w-3.5 h-3.5" />
                {copiedText === 'decoded' ? 'Copied!' : 'Copy'}
              </button>
            {/if}
          </div>

          <div class="relative">
            <textarea
              bind:value={decodedText}
              placeholder="Decoded URL will appear here..."
              class="code-editor h-28 bg-gray-50 dark:bg-gray-900"
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
          class="code-editor h-96"
        ></textarea>
      </div>

      <!-- Batch Results -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Results</h2>
          {#if batchResults.length > 0}
            <button class="btn btn-sm btn-copy" onclick={copyBatchResults}>
              <Copy class="w-3.5 h-3.5" />
              {copiedText === 'batch' ? 'Copied!' : 'Copy All'}
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
                      <span class="text-xs font-medium text-warning-600 dark:text-primary-400"
                        >Encoded:</span
                      >
                      <div class="font-mono text-xs text-green-700 dark:text-green-300 break-all">
                        {result.encoded}
                      </div>
                    </div>
                    <div>
                      <span class="text-xs font-medium text-warning-600 dark:text-primary-400"
                        >Decoded:</span
                      >
                      <div class="font-mono text-xs text-warning-700 dark:text-warning-300 break-all">
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Shield class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe Encoding</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Properly encodes special characters, spaces, and international characters for safe URL
        transmission
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Process multiple URLs at once with batch mode for efficient workflow
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <CreditCard class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Round-trip Testing</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Automatic round-trip testing ensures your URLs decode back to the original text
      </p>
    </div>
  </div>
</ToolLayout>
