<script lang="ts">
  import { WifiOff, RefreshCw, CheckCircle } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let isOnline = $state(navigator.onLine);
  let showOfflineNotice = $state(false);
  let showBackOnlineNotice = $state(false);
  let isCheckingConnection = $state(false);

  onMount(() => {
    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  function handleOnline() {
    isOnline = true;
    showOfflineNotice = false;
    showBackOnlineNotice = true;

    // Hide back online notice after 3 seconds
    setTimeout(() => {
      showBackOnlineNotice = false;
    }, 3000);
  }

  function handleOffline() {
    isOnline = false;
    showOfflineNotice = true;
    showBackOnlineNotice = false;
  }

  async function checkConnection() {
    isCheckingConnection = true;

    try {
      // Try to fetch a small resource to check connection
      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache'
      });

      if (response.ok) {
        handleOnline();
      } else {
        handleOffline();
      }
    } catch {
      handleOffline();
    } finally {
      isCheckingConnection = false;
    }
  }
</script>

<!-- Offline Notice -->
{#if showOfflineNotice}
  <div class="fixed bottom-4 left-4 z-40">
    <div
      class="flex min-w-0 items-center gap-3 rounded-lg bg-raised p-3 text-ink shadow-pop"
    >
      <span class="grid size-8 flex-none place-items-center rounded-md bg-tile-lilac text-ink-on-bright">
        <WifiOff class="size-4" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-body-sm">You're offline</p>
        <p class="text-xs text-ink-muted">Some features may be limited</p>
      </div>
      <button
        onclick={checkConnection}
        class="btn-icon flex-none"
        disabled={isCheckingConnection}
        aria-label="Check connection"
        title="Check connection"
      >
        <RefreshCw class="size-4 {isCheckingConnection ? 'animate-spin' : ''}" />
      </button>
    </div>
  </div>
{/if}

<!-- Back Online Notice -->
{#if showBackOnlineNotice}
  <div class="fixed top-4 left-1/2 z-40 -translate-x-1/2">
    <div class="flex items-center gap-3 rounded-pill bg-raised px-4 py-2.5 text-ink shadow-pop">
      <CheckCircle class="size-5 flex-none text-live" />
      <p class="text-body-sm">Back online <span class="font-normal text-ink-muted">· all features are available</span></p>
    </div>
  </div>
{/if}

<!-- Connection Status Badge (shown when offline for extended time) -->
{#if !isOnline && !showOfflineNotice}
  <div class="fixed right-4 bottom-4 z-30">
    <div class="flex items-center gap-2 rounded-pill bg-raised px-3 py-2 text-body-sm text-ink shadow-pop">
      <WifiOff class="size-4 text-ink-muted" />
      <span>Offline mode</span>
    </div>
  </div>
{/if}
