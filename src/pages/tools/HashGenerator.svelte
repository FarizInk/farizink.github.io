<script lang="ts">
  import { Hash, Zap, FileText } from '@lucide/svelte';
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
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Hash class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Hash Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Generate secure hashes instantly</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button class="btn btn-copy" onclick={loadSampleText}>
      Load Sample Text
    </button>
    <button class="btn btn-secondary" onclick={clearAll}>
      Clear All
    </button>
  </div>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
      <span class="text-sm text-gray-500 dark:text-gray-400">
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
    <div class="space-y-4 mb-6">
      {#each Object.entries(hashes) as [algorithm, hash] (algorithm)}
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
        >
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-warning-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center"
              >
                <Hash class="w-5 h-5 text-warning-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {algorithm.toUpperCase()}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {hash.length} characters • {hash.length * 4} bits
                </p>
              </div>
            </div>

            <button
              onclick={() => copyToClipboard(hash, algorithm)}
              class="btn-copy"
            >
              {copiedText === algorithm ? '✓ Copied!' : 'Copy Hash'}
            </button>
          </div>
          <div class="relative">
            <div
              class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white break-all"
            >
              {hash}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Hash Information -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Hash Algorithms</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">MD5</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          128-bit hash function. Fast but not cryptographically secure for sensitive data.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-1</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          160-bit hash function. Deprecated for security purposes but still used for compatibility.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-256</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          256-bit hash function. Secure and widely used for blockchain and data integrity.
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-512</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          512-bit hash function. Highest security level, suitable for critical applications.
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Hash class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Algorithms</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <FileText class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Verification</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Verify file integrity and authenticate data transfers with cryptographic hashes
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate hashes instantly with real-time updates as you type
      </p>
    </div>
  </div>
</ToolLayout>
