<script lang="ts">
  import { GitCompare, Copy, Check, AlertCircle, FileText, Hash } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  let hash1 = $state('');
  let hash2 = $state('');
  let comparisonResult = $state<'match' | 'different' | 'empty' | null>(null);
  let copiedText = $state('');

  function compareHashes() {
    if (!hash1.trim() && !hash2.trim()) {
      comparisonResult = 'empty';
      return;
    }

    if (!hash1.trim() || !hash2.trim()) {
      comparisonResult = 'different';
      return;
    }

    // Clean and normalize hashes
    const cleanHash1 = hash1.trim().toLowerCase().replace(/\s+/g, '');
    const cleanHash2 = hash2.trim().toLowerCase().replace(/\s+/g, '');

    comparisonResult = cleanHash1 === cleanHash2 ? 'match' : 'different';
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    copiedText = field;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    hash1 = '';
    hash2 = '';
    comparisonResult = null;
  }

  function loadSampleHashes() {
    hash1 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    hash2 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    compareHashes();
  }

  function loadDifferentHashes() {
    hash1 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    hash2 = 'b591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    compareHashes();
  }

  // React to changes in hash inputs
  $effect(() => {
    if (hash1 && hash2) {
      compareHashes();
    } else if (!hash1 && !hash2) {
      comparisonResult = null;
    } else {
      comparisonResult = 'different';
    }
  });

  const comparisonIcon = $derived(() => {
    switch (comparisonResult) {
      case 'match':
        return Check;
      case 'different':
        return AlertCircle;
      case 'empty':
        return FileText;
      default:
        return GitCompare;
    }
  });

  const CurrentIcon = $derived(comparisonIcon());

  function getComparisonColor() {
    switch (comparisonResult) {
      case 'match':
        return 'text-success-600 bg-success-100 dark:bg-success-900/20 dark:text-success-400';
      case 'different':
        return 'text-danger-600 bg-danger-100 dark:bg-danger-900/20 dark:text-danger-400';
      case 'empty':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20 dark:text-secondary-400';
    }
  }

  function getComparisonMessage() {
    switch (comparisonResult) {
      case 'match':
        return 'Hashes Match! ✓';
      case 'different':
        return 'Hashes Do Not Match ✗';
      case 'empty':
        return 'Enter hashes to compare';
      default:
        return 'Ready to compare';
    }
  }
</script>

<ToolLayout
  title="Hash Comparer"
  description="Compare file hashes to verify integrity and detect modifications."
  icon={Hash}
  color="danger"
>
  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSampleHashes}
      class="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
    >
      Load Matching Hashes
    </button>
    <button
      onclick={loadDifferentHashes}
      class="px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors"
    >
      Load Different Hashes
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>

    <!-- Comparison Status -->
    <div class="mb-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center"
      >
        <div class="flex items-center justify-center gap-3">
          <div class="w-12 h-12 {getComparisonColor()} rounded-lg flex items-center justify-center">
            <CurrentIcon class="w-6 h-6" />

            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {getComparisonMessage()}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {comparisonResult === 'match'
                  ? 'Both hash values are identical'
                  : comparisonResult === 'different'
                    ? 'Hash values are different'
                    : 'Enter two hash values to compare'}
              </p>

              <!-- Hash Input Section -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Hash 1 -->
                <div
                  class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 1</h3>
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {hash1.length} characters
                      </span>
                      <button
                        onclick={() => copyToClipboard(hash1, 'hash1')}
                        disabled={!hash1.trim()}
                        class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {#if copiedText === 'hash1'}
                          <Check class="w-4 h-4 text-green-600" />
                        {:else}
                          <Copy class="w-4 h-4" />
                        {/if}
                      </button>
                    </div>

                    <textarea
                      bind:value={hash1}
                      placeholder="Enter first hash value..."
                      class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <!-- Hash 2 -->
                  <div
                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div class="flex justify-between items-center mb-4">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 2</h3>
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          {hash2.length} characters
                        </span>
                        <button
                          onclick={() => copyToClipboard(hash2, 'hash2')}
                          disabled={!hash2.trim()}
                          class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {#if copiedText === 'hash2'}
                            <Check class="w-4 h-4 text-green-600" />
                          {:else}
                            <Copy class="w-4 h-4" />
                          {/if}
                        </button>
                      </div>

                      <textarea
                        bind:value={hash2}
                        placeholder="Enter second hash value..."
                        class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Detailed Comparison Results -->
                  {#if comparisonResult && comparisonResult !== 'empty'}
                    <div
                      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
                    >
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Comparison Details
                      </h3>
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600 dark:text-gray-400">Match Status:</span>
                          <span
                            class="font-medium {comparisonResult === 'match'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'}"
                          >
                            {comparisonResult === 'match' ? '✓ Identical' : '✗ Different'}
                          </span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600 dark:text-gray-400">Hash 1 Length:</span>
                          <span class="font-medium text-gray-900 dark:text-white">
                            {hash1.trim().length} characters
                          </span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600 dark:text-gray-400">Hash 2 Length:</span>
                          <span class="font-medium text-gray-900 dark:text-white">
                            {hash2.trim().length} characters
                          </span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600 dark:text-gray-400">Length Match:</span>
                          <span
                            class="font-medium {hash1.trim().length === hash2.trim().length
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'}"
                          >
                            {hash1.trim().length === hash2.trim().length ? '✓ Yes' : '✗ No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  {/if}

                  <!-- Use Cases -->
                  <div
                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
                  >
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Common Use Cases
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                          File Integrity Check
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          Verify downloaded files by comparing hash values with original sources
                        </p>

                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                            Password Verification
                          </h4>
                          <p class="text-sm text-gray-600 dark:text-gray-400">
                            Compare stored password hashes with user-provided password hashes
                          </p>

                          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                              Data Deduplication
                            </h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                              Identify duplicate files or data blocks by comparing their hash values
                            </p>

                            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                                Blockchain Verification
                              </h4>
                              <p class="text-sm text-gray-600 dark:text-gray-400">
                                Validate blockchain transactions and smart contract hashes
                              </p>

                              <!-- Features Section -->
                              <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div
                                  class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                  <div
                                    class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
                                  >
                                    <GitCompare
                                      class="w-6 h-6 text-secondary-600 dark:text-secondary-400"
                                    />

                                    <h3
                                      class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                                    >
                                      Real-time Comparison
                                    </h3>
                                    <p class="text-gray-600 dark:text-gray-400">
                                      Instantly compare hash values as you type with automatic
                                      result updates
                                    </p>

                                    <div
                                      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                      <div
                                        class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
                                      >
                                        <Copy
                                          class="w-6 h-6 text-secondary-600 dark:text-secondary-400"
                                        />

                                        <h3
                                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                                        >
                                          Easy Copy & Paste
                                        </h3>
                                        <p class="text-gray-600 dark:text-gray-400">
                                          Quickly copy hash values and paste them for seamless data
                                          verification
                                        </p>
                                      </div>

                                      <div
                                        class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                      >
                                        <div
                                          class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
                                        >
                                          <FileText
                                            class="w-6 h-6 text-secondary-600 dark:text-secondary-400"
                                          />
                                        </div>
                                        <h3
                                          class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                                        >
                                          Detailed Analysis
                                        </h3>
                                        <p class="text-gray-600 dark:text-gray-400">
                                          Get comprehensive comparison details including length and
                                          character analysis
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></ToolLayout
>
