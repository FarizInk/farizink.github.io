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
  <div class="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300">
    <div class="bg-orange-500 text-white px-4 py-3 shadow-lg">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <WifiOff class="w-5 h-5 flex-shrink-0" />
          <div>
            <p class="font-semibold text-sm">You're offline</p>
            <p class="text-xs opacity-90">Some features may be limited. 34 developer tools still work offline.</p>
          </div>
        </div>
        <button
          onclick={checkConnection}
          class="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
          disabled={isCheckingConnection}
        >
          {#if isCheckingConnection}
            <RefreshCw class="w-3 h-3 animate-spin" />
            Checking...
          {:else}
            <RefreshCw class="w-3 h-3" />
            Retry
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Back Online Notice -->
{#if showBackOnlineNotice}
  <div class="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300">
    <div class="bg-green-600 text-white px-4 py-3 shadow-lg">
      <div class="max-w-4xl mx-auto flex items-center gap-3">
        <CheckCircle class="w-5 h-5 flex-shrink-0" />
        <div>
          <p class="font-semibold text-sm">Back online</p>
          <p class="text-xs opacity-90">All features are now available.</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Connection Status Badge (shown when offline for extended time) -->
{#if !isOnline && !showOfflineNotice}
  <div class="fixed bottom-4 right-4 z-40">
    <div class="bg-gray-900/90 text-white backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
      <WifiOff class="w-4 h-4" />
      <span>Offline Mode</span>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-in-from-top {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-in {
    animation: slide-in-from-top 0.3s ease-out;
  }
</style>