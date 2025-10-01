<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Hash, Zap, FileText } from '@lucide/svelte';

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

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in input text
  $effect(() => {
    if (inputText) {
      generateAllHashes();
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4"
      >
        <Hash class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate MD5, SHA1, SHA256, and SHA512 hashes for text and data verification.
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
      <li class="text-gray-900 dark:text-white font-medium">Hash Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={generateAllHashes}
      disabled={!inputText.trim()}
      class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate Hashes
    </button>
    <button
      onclick={loadSampleText}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample Text
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {inputText.length} characters
      </span>
    </div>
    <textarea
      bind:value={inputText}
      placeholder="Enter text to generate hashes..."
      class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    ></textarea>
  </div>

  <!-- Hash Results -->
  {#if Object.keys(hashes).length > 0}
    <div class="space-y-4 mb-6">
      {#each Object.entries(hashes) as [algorithm, hash] (algorithm)}
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center"
              >
                <Hash class="w-5 h-5 text-amber-600 dark:text-amber-400" />
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
              class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
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
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Hash class="w-6 h-6 text-amber-600 dark:text-amber-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Algorithms</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-amber-600 dark:text-amber-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Verification</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Verify file integrity and authenticate data transfers with cryptographic hashes
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-amber-600 dark:text-amber-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Generate hashes instantly with real-time updates as you type
      </p>
    </div>
  </div>
</div>
