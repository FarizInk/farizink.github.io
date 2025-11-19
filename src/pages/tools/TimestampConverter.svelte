<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Calendar, Zap, Copy, RefreshCw } from '@lucide/svelte';

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

  function handleBackToTools() {
    navigate('/tools');
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-4"
      >
        <Calendar class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Unix Timestamp Converter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert Unix timestamps to human-readable dates and vice versa.
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
      <li class="text-gray-900 dark:text-white font-medium">Timestamp Converter</li>
    </ol>
  </nav>

  <!-- Current Timestamp -->
  <div
    class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800 p-6 mb-6"
  >
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Timestamp</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-2">Current Unix timestamp and date</p>
        <div class="flex items-center gap-4">
          <span class="text-lg font-mono text-gray-900 dark:text-white">{currentTimestamp}</span>
          <span class="text-gray-600 dark:text-gray-400">({new Date().toLocaleString()})</span>
        </div>
      </div>
      <button
        onclick={getCurrentTimestamp}
        class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
      >
        <RefreshCw class="w-4 h-4" />
        Refresh
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSampleTimestamp}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample Timestamp
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <!-- Conversion Tools -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Unix Timestamp to Date -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Unix Timestamp → Date
      </h3>

      <div class="space-y-4">
        <div>
          <label
            for="unix-timestamp"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Unix Timestamp
          </label>
          <input
            id="unix-timestamp"
            type="text"
            bind:value={unixTimestamp}
            placeholder="1704067200"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
          />
        </div>

        {#if isoString}
          <div>
            <label
              for="iso-string"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              ISO String
            </label>
            <div class="flex gap-2">
              <input
                id="iso-string"
                type="text"
                bind:value={isoString}
               
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
              />
              <button
                onclick={() => copyToClipboard(isoString, 'iso')}
                class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                {copiedText === 'iso' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Date to Unix Timestamp -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Date → Unix Timestamp
      </h3>

      <div class="space-y-4">
        <div>
          <label
            for="date-iso"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Date (ISO format)
          </label>
          <input
            id="date-iso"
            type="datetime-local"
            bind:value={isoString}
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {#if unixTimestamp && !isNaN(parseInt(unixTimestamp))}
          <div>
            <label
              for="unix-timestamp-result"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Unix Timestamp
            </label>
            <div class="flex gap-2">
              <input
                id="unix-timestamp-result"
                type="text"
                bind:value={unixTimestamp}
               
                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
              />
              <button
                onclick={() => copyToClipboard(unixTimestamp, 'timestamp')}
                class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
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
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Formatted Results</h3>

      <div class="mb-4">
        <label
          for="date-format"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Date Format
        </label>
        <select
          id="date-format"
          bind:value={selectedFormat}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
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
         
          class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <button
          onclick={() => copyToClipboard(formattedDate, 'formatted')}
          class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          {copiedText === 'formatted' ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  {/if}

  <!-- Timestamp Information -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Unix Timestamps</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">What is a Unix Timestamp?</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).
        </p>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.
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
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Calendar class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unix Timestamps</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Convert between Unix timestamps and human-readable dates instantly
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Copy class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Support for ISO, US, European, and custom date formats
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Get current timestamp and live updates as you type
      </p>
    </div>
  </div>
</div>
