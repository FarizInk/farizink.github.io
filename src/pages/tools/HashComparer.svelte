<script lang="ts">
  import { GitCompare, Copy, Check, AlertCircle, FileText, Hash } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

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
    toast.success('Hash copied to clipboard');
  }

  function clearAll() {
    hash1 = '';
    hash2 = '';
    comparisonResult = null;
    toast.success('Cleared all');
  }

  function loadSampleHashes() {
    hash1 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    hash2 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    compareHashes();
    toast.success('Matching hashes loaded');
  }

  function loadDifferentHashes() {
    hash1 = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    hash2 = 'b591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    compareHashes();
    toast.success('Different hashes loaded');
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
        return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'different':
        return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'empty':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-warning-100 dark:bg-primary-900/20 text-warning-600 dark:text-primary-400 border-warning-200 dark:border-primary-800';
    }
  }

  function getComparisonMessage() {
    switch (comparisonResult) {
      case 'match':
        return 'Hashes Match!';
      case 'different':
        return 'Hashes Do Not Match';
      case 'empty':
        return 'Enter hashes to compare';
      default:
        return 'Ready to compare';
    }
  }

  function getComparisonSubtext() {
    switch (comparisonResult) {
      case 'match':
        return 'Both hash values are identical';
      case 'different':
        return 'Hash values are different';
      case 'empty':
        return 'Enter two hash values to compare';
      default:
        return 'Enter two hash values to compare';
    }
  }
</script>

<ToolLayout
  title="Hash Comparer"
  description="Compare file hashes to verify integrity and detect modifications."
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
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Hash Comparer</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Compare file hashes to verify integrity
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={loadSampleHashes}
      class="btn btn-copy"
    >
      Load Matching Hashes
    </button>
    <button
      onclick={loadDifferentHashes}
      class="btn btn-copy"
    >
      Load Different Hashes
    </button>
    <button
      onclick={clearAll}
      class="btn btn-secondary"
    >
      Clear All
    </button>
  </div>

  <!-- Comparison Status -->
  <div class="rounded-xl border p-6 mb-6 text-center {getComparisonColor()}">
    <div class="flex items-center justify-center gap-3">
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-gray-800"
      >
        <CurrentIcon class="w-6 h-6" />
      </div>
      <div>
        <h3 class="text-lg font-semibold">{getComparisonMessage()}</h3>
        <p class="text-sm opacity-80">{getComparisonSubtext()}</p>
      </div>
    </div>
  </div>

  <!-- Hash Input Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Hash 1 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
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
            class="btn-icon"
          >
            {#if copiedText === 'hash1'}
              <Check class="w-4 h-4 text-green-600" />
            {:else}
              <Copy class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>
      <textarea
        bind:value={hash1}
        placeholder="Enter first hash value..."
        class="code-editor min-h-[150px]"
      ></textarea>
    </div>

    <!-- Hash 2 -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
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
            class="btn-icon"
          >
            {#if copiedText === 'hash2'}
              <Check class="w-4 h-4 text-green-600" />
            {:else}
              <Copy class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>
      <textarea
        bind:value={hash2}
        placeholder="Enter second hash value..."
        class="code-editor min-h-[150px]"
      ></textarea>
    </div>
  </div>

  <!-- Detailed Comparison Results -->
  {#if comparisonResult && comparisonResult !== 'empty'}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison Details</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-600 dark:text-gray-400">Match Status:</span>
          <span
            class="font-medium {comparisonResult === 'match'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'}"
          >
            {comparisonResult === 'match' ? 'Identical' : 'Different'}
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
            {hash1.trim().length === hash2.trim().length ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Use Cases -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">File Integrity Check</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Verify downloaded files by comparing hash values with original sources
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Password Verification</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Compare stored password hashes with user-provided password hashes
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Data Deduplication</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Identify duplicate files or data blocks by comparing their hash values
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Blockchain Verification</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Validate blockchain transactions and smart contract hashes
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <GitCompare class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Comparison</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Instantly compare hash values as you type with automatic result updates
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Copy class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy & Paste</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Quickly copy hash values and paste them for seamless data verification
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detailed Analysis</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Get comprehensive comparison details including length and character analysis
      </p>
    </div>
  </div>
</ToolLayout>
