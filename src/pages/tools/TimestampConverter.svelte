<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Calendar, Zap, Copy, RefreshCw, Clock, Check } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

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

  function copyISO() {
    const iso = new Date(parseInt(unixTimestamp) * 1000 || Date.now()).toISOString();
    navigator.clipboard.writeText(iso);
    toast.success('ISO string copied!');
  }

  function setNow() {
    const now = Math.floor(Date.now() / 1000);
    unixTimestamp = now.toString();
    convertFromTimestamp();
    toast.success('Set to current time');
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
  <div class="tool-card">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-label mb-2 text-ink-muted">Current timestamp</p>
        <p class="text-body-sm mb-2 text-ink-muted">Current Unix timestamp and date</p>
        <div class="mt-2 flex flex-wrap items-center gap-4">
          <span class="font-mono text-lg text-ink">{currentTimestamp}</span>
          <span class="text-body-sm text-ink-muted">({new Date().toLocaleString()})</span>
        </div>
      </div>
      <button class="btn btn-secondary" onclick={getCurrentTimestamp}>
        <RefreshCw class="size-4" />
        Refresh
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-primary" onclick={loadSampleTimestamp}>Load sample timestamp</button>
    <button class="btn btn-ghost" onclick={clearAll}>Clear all</button>
  </div>

  <!-- Conversion Tools -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Unix Timestamp to Date -->
    <div class="tool-card">
      <h2 class="section-title">Unix timestamp → Date</h2>

      <div class="space-y-4">
        <div>
          <label for="unix-timestamp" class="label">Unix timestamp</label>
          <input
            id="unix-timestamp"
            type="text"
            bind:value={unixTimestamp}
            placeholder="1704067200"
            class="tool-input font-mono! text-sm!"
          />
        </div>

        {#if isoString}
          <div>
            <label for="iso-string" class="label">ISO string</label>
            <div class="flex items-center gap-2">
              <input
                id="iso-string"
                type="text"
                bind:value={isoString}
                class="tool-input flex-1 font-mono! text-sm!"
                readonly
              />
              <button class="btn btn-sm btn-secondary" onclick={() => copyToClipboard(isoString, 'iso')}>
                {#if copiedText === 'iso'}
                  <Check class="size-4" />
                  Copied
                {:else}
                  <Copy class="size-4" />
                  Copy
                {/if}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Date to Unix Timestamp -->
    <div class="tool-card">
      <h2 class="section-title">Date → Unix timestamp</h2>

      <div class="space-y-4">
        <div>
          <label for="date-iso" class="label">Date (ISO format)</label>
          <input
            id="date-iso"
            type="datetime-local"
            bind:value={isoString}
            class="tool-input"
          />
        </div>

        {#if unixTimestamp && !isNaN(parseInt(unixTimestamp))}
          <div>
            <label for="unix-timestamp-result" class="label">Unix timestamp</label>
            <div class="flex items-center gap-2">
              <input
                id="unix-timestamp-result"
                type="text"
                bind:value={unixTimestamp}
                class="tool-input flex-1 font-mono! text-sm!"
                readonly
              />
              <button class="btn btn-sm btn-secondary" onclick={() => copyToClipboard(unixTimestamp, 'timestamp')}>
                {#if copiedText === 'timestamp'}
                  <Check class="size-4" />
                  Copied
                {:else}
                  <Copy class="size-4" />
                  Copy
                {/if}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Formatted Results -->
  {#if formattedDate}
    <div class="tool-card">
      <h2 class="section-title">Formatted results</h2>

      <div class="space-y-4">
        <div>
          <label for="date-format" class="label">Date format</label>
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

        <div class="flex items-center gap-2">
          <input
            type="text"
            bind:value={formattedDate}
            class="tool-input flex-1 font-mono! text-sm!"
            readonly
          />
          <button class="btn btn-sm btn-secondary" onclick={() => copyToClipboard(formattedDate, 'formatted')}>
                {#if copiedText === 'formatted'}
                  <Check class="size-4" />
                  Copied!
                {:else}
                  <Copy class="size-4" />
                  Copy
                {/if}
              </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Timestamp Information -->
  <div class="tool-card">
    <h2 class="section-title">About Unix timestamps</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="info-card">
        <h3 class="section-title-sm">What is a Unix timestamp?</h3>
        <p class="text-body-sm text-ink-muted">
          A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).
        </p>
      </div>

      <div class="info-card">
        <h3 class="section-title-sm">Common uses</h3>
        <p class="text-body-sm text-ink-muted">
          Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Calendar class="size-5" /></div>
      <h3 class="feature-title">Unix timestamps</h3>
      <p class="feature-description">
        Convert between Unix timestamps and human-readable dates instantly
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Copy class="size-5" /></div>
      <h3 class="feature-title">Multiple formats</h3>
      <p class="feature-description">Support for ISO, US, European, and custom date formats</p>
    </div>

    <div class="card">
      <div class="feature-icon"><Zap class="size-5" /></div>
      <h3 class="feature-title">Real-time updates</h3>
      <p class="feature-description">Get current timestamp and live updates as you type</p>
    </div>
  </div>
</ToolLayout>
