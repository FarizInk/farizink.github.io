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
  <!-- Tab Navigation -->
  <div class="tab-nav" role="tablist">
    <button
      role="tab"
      aria-selected={activeTab === 'single'}
      onclick={() => (activeTab = 'single')}
      class="tab-btn {activeTab === 'single' ? 'active' : ''}"
    >
      Single URL
    </button>
    <button
      role="tab"
      aria-selected={activeTab === 'batch'}
      onclick={() => (activeTab = 'batch')}
      class="tab-btn {activeTab === 'batch' ? 'active' : ''}"
    >
      Batch processing
    </button>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    {#if activeTab === 'single'}
      <button class="btn btn-primary" onclick={encodeUrl}>
        Encode URL
      </button>
      <button class="btn btn-secondary" onclick={decodeUrl}>
        Decode URL
      </button>
    {:else}
      <button class="btn btn-primary" onclick={encodeBatch}>
        Process batch
      </button>
      <button class="btn btn-secondary" onclick={loadSampleUrls}>
        Load sample URLs
      </button>
    {/if}
    <button class="btn btn-ghost" onclick={clearAll}>
      Clear all
    </button>
  </div>

  {#if activeTab === 'single'}
    <!-- Single URL Processing -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Input Section -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title !mb-0">Input text / URL</h2>
          <span class="text-count">
            {inputText.length} characters
          </span>
        </div>

        <textarea
          bind:value={inputText}
          placeholder="Enter text or URL to encode/decode..."
          class="code-editor h-64"
        ></textarea>

        <!-- Quick Examples -->
        <div class="info-card mt-4">
          <p class="text-label text-ink-muted mb-3">Quick examples</p>
          <div class="flex flex-col gap-2">
            <button
              onclick={() => {
                inputText = 'https://example.com/search?q=hello world&category=web development';
                encodeUrl();
              }}
              class="quick-btn w-full"
            >
              Query parameters with spaces
            </button>
            <button
              onclick={() => {
                inputText = 'https://test.com/path?name=John Doe&city=New York';
                encodeUrl();
              }}
              class="quick-btn w-full"
            >
              Multiple parameters with special characters
            </button>
            <button
              onclick={() => {
                inputText = 'https://site.com/search?q=测试&lang=zh-CN';
                encodeUrl();
              }}
              class="quick-btn w-full"
            >
              International characters (Chinese)
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="card flex flex-col gap-4">
        <!-- Encoded Result -->
        <div>
          <div class="card-header !mb-2">
            <h2 class="section-title !mb-0">Encoded URL</h2>
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
              class="code-editor h-28"
            ></textarea>
            {#if !encodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-body-sm text-ink-muted">
                  Enter text above to see encoded result
                </p>
              </div>
            {/if}
          </div>
        </div>

        <!-- Decoded Result -->
        <div>
          <div class="card-header !mb-2">
            <h2 class="section-title !mb-0">
              Decoded URL (round-trip)
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
              class="code-editor h-28"
            ></textarea>
            {#if !decodedText}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p class="text-body-sm text-ink-muted">
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Batch Input -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title !mb-0">
            Batch input (one URL per line)
          </h2>
          <span class="text-count">
            {batchInput.split('\n').filter(line => line.trim()).length} URLs
          </span>
        </div>

        <textarea
          bind:value={batchInput}
          placeholder="Enter multiple URLs or text strings, one per line..."
          class="code-editor h-48 sm:h-64 lg:h-96"
        ></textarea>
      </div>

      <!-- Batch Results -->
      <div class="card">
        <div class="card-header">
          <h2 class="section-title !mb-0">Batch results</h2>
          {#if batchResults.length > 0}
            <button class="btn btn-sm btn-copy" onclick={copyBatchResults}>
              <Copy class="w-3.5 h-3.5" />
              {copiedText === 'batch' ? 'Copied!' : 'Copy all'}
            </button>
          {/if}
        </div>

        <div
          class="h-48 sm:h-64 lg:h-96 overflow-y-auto rounded-md bg-sunken p-4"
        >
          {#if batchResults.length === 0}
            <div class="flex items-center justify-center h-full">
              <p class="text-body-sm text-ink-muted">Process batch URLs to see results</p>
            </div>
          {:else}
            <div class="space-y-2">
              {#each batchResults as result, index (result.original + index)}
                <div class="rounded-md bg-control p-3">
                  <div class="text-code text-ink-muted mb-1">
                    #{index + 1}
                  </div>
                  <div class="space-y-2">
                    <div>
                      <span class="text-label text-ink-muted">Original</span>
                      <div class="font-mono text-xs text-ink break-all">
                        {result.original}
                      </div>
                    </div>
                    <div>
                      <span class="text-label text-accent-text">Encoded</span>
                      <div class="font-mono text-xs text-ink break-all">
                        {result.encoded}
                      </div>
                    </div>
                    <div>
                      <span class="text-label text-accent-text">Decoded</span>
                      <div class="font-mono text-xs text-ink break-all">
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Shield class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Safe encoding</h3>
      <p class="feature-description">
        Properly encodes special characters, spaces, and international characters for safe URL
        transmission
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Batch processing</h3>
      <p class="feature-description">
        Process multiple URLs at once with batch mode for efficient workflow
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <CreditCard class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Round-trip testing</h3>
      <p class="feature-description">
        Automatic round-trip testing ensures your URLs decode back to the original text
      </p>
    </div>
  </div>
</ToolLayout>
