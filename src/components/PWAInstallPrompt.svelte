<script lang="ts">
  import { Download, X, Smartphone, Monitor } from '@lucide/svelte';
  import { onMount } from 'svelte';

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  let deferredPrompt: BeforeInstallPromptEvent | null = null;
  let showInstallPrompt = $state(false);
  let isInstalled = $state(false);
  let isIOS = $state(false);

  onMount(() => {
    // Check if already installed
    checkIfInstalled();

    // Check if iOS
    isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: boolean }).MSStream;

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  });

  function handleBeforeInstallPrompt(e: Event) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    showInstallPrompt = true;
  }

  function handleAppInstalled() {
    console.log('PWA was installed');
    isInstalled = true;
    showInstallPrompt = false;
    deferredPrompt = null;
  }

  function checkIfInstalled() {
    // Check if running in standalone mode (installed PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
    }
  }

  async function installPWA() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }

    deferredPrompt = null;
    showInstallPrompt = false;
  }

  function dismissPrompt() {
    showInstallPrompt = false;
    deferredPrompt = null;
  }

  // Don't show on iOS devices (iOS doesn't support install prompts)
  const shouldShowPrompt = $derived(showInstallPrompt && !isInstalled && !isIOS);
</script>

{#if shouldShowPrompt}
  <div class="fixed top-4 left-4 right-4 md:left-4 md:right-auto md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-in slide-in-from-top duration-300">
    <div class="flex items-start gap-3">
      <!-- App Icon -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">F</span>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
            Install Fariz Tools
          </h3>
          <span class="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs rounded-full font-medium">
            Free
          </span>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          Install our app for offline access to all 34 developer tools and get the native app experience.
        </p>

        <!-- Features -->
        <div class="grid grid-cols-2 gap-2 mb-3">
          <div class="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Smartphone class="w-3 h-3" />
            <span>Works Offline</span>
          </div>
          <div class="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Monitor class="w-3 h-3" />
            <span>Fast & Native</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            onclick={installPWA}
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Download class="w-4 h-4" />
            Install
          </button>
          <button
            onclick={dismissPrompt}
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg transition-colors duration-200"
            aria-label="Dismiss"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isIOS && !isInstalled}
  <!-- iOS Installation Instructions (small, non-intrusive) -->
  <div class="fixed top-20 left-4 right-4 md:left-4 md:right-auto md:w-80 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-3 z-40">
    <div class="flex items-center gap-3">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <span class="text-blue-600 dark:text-blue-400 text-sm">i</span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-gray-700 dark:text-gray-300">
          <strong>Add to Home Screen:</strong> Tap
          <span class="inline-flex items-center gap-1 px-1 bg-gray-200 dark:bg-gray-700 rounded">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <rect x="7" y="10" width="10" height="10" rx="1" stroke="currentColor" stroke-width="1" fill="none"/>
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" stroke-width="1"/>
            </svg>
            Share
          </span>
          → "Add to Home Screen"
        </p>
      </div>
    </div>
  </div>
{/if}