<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Calendar, Zap, Copy, RefreshCw, Clock, Sparkles, Check } from '@lucide/svelte';

  let unixTimestamp = $state('');
  let formattedDate = $state('');
  let selectedFormat = $state('iso');

  function formatDate(date: Date, format: string): string {
    switch (format) {
      case 'iso':
        return date.toISOString();
      case 'us':
        return date.toLocaleString('en-US');
      case 'european':
        return date.toLocaleString('en-GB');
      case 'readable':
        return date.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      case 'short':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      case 'time':
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      case 'date':
        return date.toISOString().split('T')[0];
      default:
        return date.toISOString();
    }
  }

  let copiedText = $state('');
  let currentTimestamp = $state('');
  let isoString = $state('');

  function getCurrentTimestamp() {
    const now = new Date();
    currentTimestamp = Math.floor(now.getTime() / 1000).toString();
    unixTimestamp = currentTimestamp;
    convertFromTimestamp();
  }

  function convertFromTimestamp() {
    if (!unixTimestamp) {
      formattedDate = '';
      isoString = '';
      return;
    }

    try {
      const timestamp = parseInt(unixTimestamp);
      const date = new Date(timestamp * 1000);

      if (isNaN(date.getTime())) {
        formattedDate = 'Invalid timestamp';
        isoString = '';
        return;
      }

      isoString = date.toISOString();
      formattedDate = formatDate(date, selectedFormat);
    } catch {
      formattedDate = 'Invalid timestamp';
      isoString = '';
    }
  }

  function convertFromDate() {
    if (!isoString) {
      unixTimestamp = '';
      formattedDate = '';
      return;
    }

    try {
      const date = new Date(isoString);

      if (isNaN(date.getTime())) {
        unixTimestamp = 'Invalid date';
        formattedDate = '';
        return;
      }

      unixTimestamp = Math.floor(date.getTime() / 1000).toString();
      formattedDate = formatDate(date, selectedFormat);
    } catch {
      unixTimestamp = 'Invalid date';
      formattedDate = '';
    }
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    copiedText = field;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function loadSampleTimestamp() {
    unixTimestamp = '1704067200'; // 2024-01-01 00:00:00 UTC
    convertFromTimestamp();
  }

  function clearAll() {
    unixTimestamp = '';
    formattedDate = '';
    isoString = '';
  }

  // Get current timestamp on mount
  getCurrentTimestamp();

  // React to changes in inputs
  $effect(() => {
    if (unixTimestamp) {
      convertFromTimestamp();
    }
  });

  $effect(() => {
    if (isoString) {
      convertFromDate();
    }
  });

  $effect(() => {
    if (isoString) {
      const date = new Date(isoString);
      if (!isNaN(date.getTime())) {
        formattedDate = formatDate(date, selectedFormat);
      }
    }
  });
</script>

<ToolLayout
  title="Timestamp Converter"
  description="Convert between Unix timestamps, ISO dates, and human-readable formats."
  icon={Clock}
  color="warning"
>
  <!-- Current Timestamp -->
  <div
    class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-primary-900/20 dark:to-primary-900/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Timestamp</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-2">Current Unix timestamp and date</p>
        <div class="flex items-center gap-4 mt-2">
          <span class="text-lg font-mono text-gray-900 dark:text-white">{currentTimestamp}</span>
          <span class="text-gray-600 dark:text-gray-400">({new Date().toLocaleString()})</span>
        </div>
      </div>
      <button class="btn btn-copy" onclick={getCurrentTimestamp}>
        <RefreshCw class="w-4 h-4" />
        Refresh
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button class="btn btn-copy" onclick={loadSampleTimestamp}>Load Sample Timestamp</button>
    <button class="btn btn-secondary" onclick={clearAll}>Clear All</button>
  </div>

  <!-- Conversion Tools -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Unix Timestamp to Date -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Unix Timestamp → Date
      </h2>

      <div class="space-y-4">
        <div>
          <label
            for="unix-timestamp"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Unix Timestamp</label
          >
          <input
            id="unix-timestamp"
            type="text"
            bind:value={unixTimestamp}
            placeholder="1704067200"
            class="tool-input font-mono text-sm"
          />
        </div>

        {#if isoString}
          <div>
            <label
              for="iso-string"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >ISO String</label
            >
            <div class="flex gap-2">
              <input
                id="iso-string"
                type="text"
                bind:value={isoString}
                class="tool-input flex-1 font-mono text-sm"
                readonly
              />
              <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(isoString, 'iso')}>
                {copiedText === 'iso' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Date to Unix Timestamp -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Date → Unix Timestamp
      </h2>

      <div class="space-y-4">
        <div>
          <label
            for="date-iso"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Date (ISO format)</label
          >
          <input
            id="date-iso"
            type="datetime-local"
            bind:value={isoString}
            class="tool-input"
          />
        </div>

        {#if unixTimestamp && !isNaN(parseInt(unixTimestamp))}
          <div>
            <label
              for="unix-timestamp-result"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Unix Timestamp</label
            >
            <div class="flex gap-2">
              <input
                id="unix-timestamp-result"
                type="text"
                bind:value={unixTimestamp}
                class="tool-input flex-1 font-mono text-sm"
                readonly
              />
              <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(unixTimestamp, 'timestamp')}>
                {copiedText === 'timestamp' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Formatted Results -->
  {#if formattedDate}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Formatted Results</h2>

      <div class="space-y-4">
        <div>
          <label
            for="date-format"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Date Format</label
          >
          <select id="date-format" bind:value={selectedFormat} class="tool-select">
            <option value="iso">ISO 8601</option>
            <option value="us">US Format</option>
            <option value="european">European Format</option>
            <option value="readable">Readable</option>
            <option value="short">Short Date</option>
            <option value="time">Time Only</option>
            <option value="date">Date Only</option>
          </select>
        </div>

        <div class="flex gap-2">
          <input
            type="text"
            bind:value={formattedDate}
            class="tool-input flex-1 text-sm"
            readonly
          />
          <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(formattedDate, 'formatted')}>
            {copiedText === 'formatted' ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Timestamp Information -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
  >
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Unix Timestamps</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <h3 class="font-medium text-gray-900 dark:text-white mb-2">What is a Unix Timestamp?</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).
        </p>
      </div>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <h3 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.
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
        <Calendar class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unix Timestamps</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Convert between Unix timestamps and human-readable dates instantly
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Support for ISO, US, European, and custom date formats
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Get current timestamp and live updates as you type
      </p>
    </div>
  </div>
</ToolLayout>
