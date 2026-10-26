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
        return 'bg-card text-live';
      case 'different':
        return 'bg-card text-negative';
      case 'empty':
        return 'bg-card text-ink-muted';
      default:
        return 'bg-card text-ink-muted';
    }
  }

  function getComparisonMessage() {
    switch (comparisonResult) {
      case 'match':
        return 'Hashes match';
      case 'different':
        return 'Hashes do not match';
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
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button onclick={loadSampleHashes} class="btn btn-secondary btn-sm">Load matching hashes</button>
    <button onclick={loadDifferentHashes} class="btn btn-secondary btn-sm">Load different hashes</button>
    <button onclick={clearAll} class="btn btn-ghost btn-sm">Clear all</button>
  </div>

  <!-- Comparison Status -->
  <div class="rounded-lg p-6 {getComparisonColor()}" role="status" aria-live="polite">
    <div class="flex items-center justify-center gap-3 text-center sm:text-left">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-control">
        <CurrentIcon class="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h3 class="text-title m-0">{getComparisonMessage()}</h3>
        <p class="text-body-sm m-0 text-ink-muted">{getComparisonSubtext()}</p>
      </div>
    </div>
  </div>

  <!-- Hash Input Section -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Hash 1 -->
    <div class="tool-card">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="section-title m-0">Hash 1</h3>
        <div class="flex items-center gap-2">
          <span class="text-count tabular-nums">
            {hash1.length} characters
          </span>
          <button
            onclick={() => copyToClipboard(hash1, 'hash1')}
            disabled={!hash1.trim()}
            class="btn-icon"
            aria-label="Copy hash 1"
            title="Copy hash 1"
          >
            {#if copiedText === 'hash1'}
              <Check class="h-4 w-4 text-live" />
            {:else}
              <Copy class="h-4 w-4" />
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
    <div class="tool-card">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="section-title m-0">Hash 2</h3>
        <div class="flex items-center gap-2">
          <span class="text-count tabular-nums">
            {hash2.length} characters
          </span>
          <button
            onclick={() => copyToClipboard(hash2, 'hash2')}
            disabled={!hash2.trim()}
            class="btn-icon"
            aria-label="Copy hash 2"
            title="Copy hash 2"
          >
            {#if copiedText === 'hash2'}
              <Check class="h-4 w-4 text-live" />
            {:else}
              <Copy class="h-4 w-4" />
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
    <div class="tool-card">
      <h3 class="section-title">Comparison details</h3>
      <div class="space-y-4 text-body">
        <div class="flex items-center justify-between">
          <span class="text-ink-muted">Match status</span>
          <span
            class="inline-flex items-center gap-1.5 font-medium {comparisonResult === 'match'
              ? 'text-live'
              : 'text-negative'}"
          >
            {#if comparisonResult === 'match'}
              <Check class="h-4 w-4" aria-hidden="true" />
            {:else}
              <AlertCircle class="h-4 w-4" aria-hidden="true" />
            {/if}
            {comparisonResult === 'match' ? 'Identical' : 'Different'}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-ink-muted">Hash 1 length</span>
          <span class="font-mono font-medium text-ink tabular-nums">
            {hash1.trim().length} characters
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-ink-muted">Hash 2 length</span>
          <span class="font-mono font-medium text-ink tabular-nums">
            {hash2.trim().length} characters
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-ink-muted">Length match</span>
          <span
            class="inline-flex items-center gap-1.5 font-medium {hash1.trim().length === hash2.trim().length
              ? 'text-live'
              : 'text-negative'}"
          >
            {#if hash1.trim().length === hash2.trim().length}
              <Check class="h-4 w-4" aria-hidden="true" />
            {:else}
              <AlertCircle class="h-4 w-4" aria-hidden="true" />
            {/if}
            {hash1.trim().length === hash2.trim().length ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  {/if}

  <!-- Use Cases -->
  <div class="tool-card">
    <h3 class="section-title">Common use cases</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="rounded-md bg-sunken p-4">
        <h4 class="mb-2 font-medium text-ink">File integrity check</h4>
        <p class="text-body-sm m-0 text-ink-muted">
          Verify downloaded files by comparing hash values with original sources
        </p>
      </div>
      <div class="rounded-md bg-sunken p-4">
        <h4 class="mb-2 font-medium text-ink">Password verification</h4>
        <p class="text-body-sm m-0 text-ink-muted">
          Compare stored password hashes with user-provided password hashes
        </p>
      </div>
      <div class="rounded-md bg-sunken p-4">
        <h4 class="mb-2 font-medium text-ink">Data deduplication</h4>
        <p class="text-body-sm m-0 text-ink-muted">
          Identify duplicate files or data blocks by comparing their hash values
        </p>
      </div>
      <div class="rounded-md bg-sunken p-4">
        <h4 class="mb-2 font-medium text-ink">Blockchain verification</h4>
        <p class="text-body-sm m-0 text-ink-muted">
          Validate blockchain transactions and smart contract hashes
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon">
        <GitCompare class="h-6 w-6" />
      </div>
      <h3 class="feature-title">Real-time comparison</h3>
      <p class="feature-description">
        Instantly compare hash values as you type with automatic result updates
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Copy class="h-6 w-6" />
      </div>
      <h3 class="feature-title">Easy copy and paste</h3>
      <p class="feature-description">
        Quickly copy hash values and paste them for seamless data verification
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="h-6 w-6" />
      </div>
      <h3 class="feature-title">Detailed analysis</h3>
      <p class="feature-description">
        Get comprehensive comparison details including length and character analysis
      </p>
    </div>
  </div>
</ToolLayout>
