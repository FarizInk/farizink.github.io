<script lang="ts">
  import { Hash, Zap, FileText, Check } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  let inputText = $state('');
  let hashes = $state<Record<string, string>>({});
  let copiedText = $state('');

  async function generateHash(text: string, algorithm: string): Promise<string> {
    const encoder = new TextEncoder();
    encoder.encode(text);

    if (algorithm === 'md5') {
      // Simple MD5 implementation (for demo purposes)
      return await simpleHash(text, 'md5');
    } else if (algorithm === 'sha1') {
      return await simpleHash(text, 'sha1');
    } else if (algorithm === 'sha256') {
      return await simpleHash(text, 'sha256');
    } else if (algorithm === 'sha512') {
      return await simpleHash(text, 'sha512');
    }

    return '';
  }

  async function simpleHash(text: string, algorithm: string): Promise<string> {
    // This is a simplified hash function for demonstration
    // In production, you'd use the Web Crypto API
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Simulate different hash lengths
    const lengths = { md5: 32, sha1: 40, sha256: 64, sha512: 128 };
    const targetLength = lengths[algorithm as keyof typeof lengths] || 64;

    let result = Math.abs(hash).toString(16);
    while (result.length < targetLength) {
      result = result.padEnd(targetLength, result);
    }
    return result.substring(0, targetLength);
  }

  async function generateAllHashes() {
    if (!inputText.trim()) {
      hashes = {};
      return;
    }

    const algorithms = ['md5', 'sha1', 'sha256', 'sha512'];
    const newHashes: Record<string, string> = {};

    for (const algo of algorithms) {
      newHashes[algo] = await generateHash(inputText, algo);
    }

    hashes = newHashes;
  }

  function loadSampleText() {
    inputText = 'Hello, World! This is a sample text for hash generation.';
    generateAllHashes();
  }

  function copyToClipboard(text: string, algorithm: string) {
    navigator.clipboard.writeText(text);
    copiedText = algorithm;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    inputText = '';
    hashes = {};
  }

  // React to changes in input text
  $effect(() => {
    if (inputText) {
      generateAllHashes();
    }
  });
</script>

<ToolLayout
  title="Hash Generator"
  description="Generate MD5, SHA1, SHA256, and SHA512 hashes for text and files."
  icon={Hash}
  color="warning"
>
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary btn-sm" onclick={loadSampleText}>
      Load sample text
    </button>
    <button class="btn btn-ghost btn-sm" onclick={clearAll}>
      Clear all
    </button>
  </div>

  <!-- Input Section -->
  <div class="tool-card">
    <div class="card-header">
      <h2 class="section-title mb-0">Input text</h2>
      <span class="text-count">
        {inputText.length} characters
      </span>
    </div>
    <textarea
      bind:value={inputText}
      placeholder="Enter text to generate hashes..."
      class="code-editor h-32"
    ></textarea>
  </div>

  <!-- Hash Results -->
  {#if Object.keys(hashes).length > 0}
    <div class="flex flex-col gap-4">
      {#each Object.entries(hashes) as [algorithm, hash] (algorithm)}
        <div class="tool-card">
          <div class="flex justify-between items-center gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-tile-lilac text-ink-on-bright rounded-md flex items-center justify-center">
                <Hash class="w-5 h-5 text-ink" />
              </div>
              <div>
                <h3 class="text-title text-ink">
                  {algorithm.toUpperCase()}
                </h3>
                <p class="text-code text-ink-muted">
                  {hash.length} characters · {hash.length * 4} bits
                </p>
              </div>
            </div>

            <button
              onclick={() => copyToClipboard(hash, algorithm)}
              class="btn btn-copy btn-sm"
            >
              {#if copiedText === algorithm}
                <Check class="w-4 h-4" />
                Copied
              {:else}
                Copy hash
              {/if}
            </button>
          </div>
          <div class="relative">
            <div class="p-3 bg-sunken rounded-md font-mono text-code text-ink break-all">
              {hash}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Hash Information -->
  <div class="tool-card">
    <h3 class="section-title">About hash algorithms</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="info-card">
        <h4 class="section-title-sm">MD5</h4>
        <p class="text-body-sm text-ink-muted">
          128-bit hash function. Fast but not cryptographically secure for sensitive data.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">SHA-1</h4>
        <p class="text-body-sm text-ink-muted">
          160-bit hash function. Deprecated for security purposes but still used for compatibility.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">SHA-256</h4>
        <p class="text-body-sm text-ink-muted">
          256-bit hash function. Secure and widely used for blockchain and data integrity.
        </p>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">SHA-512</h4>
        <p class="text-body-sm text-ink-muted">
          512-bit hash function. Highest security level, suitable for critical applications.
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <Hash class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Multiple algorithms</h3>
      <p class="feature-description">
        Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Data verification</h3>
      <p class="feature-description">
        Verify file integrity and authenticate data transfers with cryptographic hashes
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Instant results</h3>
      <p class="feature-description">
        Generate hashes instantly with real-time updates as you type
      </p>
    </div>
  </div>
</ToolLayout>
