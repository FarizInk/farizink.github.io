<script lang="ts">
  import { navigate } from '../lib/router';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import {
    Sun,
    Moon,
    Menu,
    House,
    Wrench,
    Download,
    X,
    RefreshCw,
    Wifi,
    WifiOff,
    ChevronDown,
    ChevronUp,
    Settings
  } from '@lucide/svelte';
  import CommandPalette from './CommandPalette.svelte';
  import LoginModal from './LoginModal.svelte';
  import HealthChecker from './HealthChecker.svelte';
  import { API_BASE_URL } from '../lib/constants';

  let isDark = $state(false);
  let isCommandPaletteOpen = $state(false);
  let drawerOpen = $state(false);
  let isLoginModalOpen = $state(false);
  let isSettingsExpanded = $state(false);
  let deferredPrompt: Event | null = null;
  let isIOS = $state(false);
  let canInstall = $state(false);
  let swUpdateAvailable = $state(false);
  let isRefreshing = $state(false);

  // Service Worker Settings
  let serviceWorkerEnabled = $state(false);
  let isPWAInstalled = $state(false);
  let serviceWorkerCanToggle = $state(true);

  // API Health Status
  let apiHealthStatus = $state<'ok' | 'error' | 'checking'>('checking');
  let apiHealthError = $state<string | null>(null);

  // Double click state for menu button
  let lastClickTime = 0;
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  const DOUBLE_CLICK_DELAY = 200; // milliseconds between clicks

  function handleNavigation(event: MouseEvent, href: string) {
    event.preventDefault();
    console.log('Navigating to:', href);
    navigate(href);
    drawerOpen = false;
  }

  function handleOpenLoginModal() {
    isLoginModalOpen = true;
    drawerOpen = false;
  }

  function toggleTheme() {
    isDark = !isDark;
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Double click handler for menu button
  function handleMenuClick(e: MouseEvent) {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;

    // Clear any existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
    }

    if (timeSinceLastClick < DOUBLE_CLICK_DELAY) {
      // Double click detected - open command palette
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      isCommandPaletteOpen = true;
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Wait for potential second click before opening drawer
      clickTimeout = setTimeout(() => {
        drawerOpen = true;
        clickTimeout = null;
      }, DOUBLE_CLICK_DELAY);
    }

    lastClickTime = now;
  }

  function handleKeydown(event: KeyboardEvent) {
    // Check for Ctrl+K or Cmd+K
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      isCommandPaletteOpen = !isCommandPaletteOpen;

      // Auto-select first item when opening
      if (isCommandPaletteOpen) {
        setTimeout(() => {
          const commandPalette = document.querySelector('.command-palette-list');
          if (commandPalette) {
            const items = commandPalette.querySelectorAll('[role="option"]');
            if (items.length > 0) {
              selectItem(items, 0);
            }
          }
        }, 150);
      }
      return;
    }

    // Handle command palette navigation when open
    if (isCommandPaletteOpen) {
      const commandPalette = document.querySelector('.command-palette-list');

      if (commandPalette) {
        const items = commandPalette.querySelectorAll('[role="option"]');
        let currentIndex = -1;

        // Find current selected index using data-selected attribute
        items.forEach((item, index) => {
          if (item.getAttribute('data-selected') === 'true') {
            currentIndex = index;
          }
        });

        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, items.length - 1);
            selectItem(items, nextIndex);
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            const prevIndex = Math.max(currentIndex - 1, 0);
            selectItem(items, prevIndex);
            break;
          }
          case 'Enter':
            event.preventDefault();
            if (currentIndex >= 0 && items[currentIndex]) {
              (items[currentIndex] as HTMLElement).click();
            }
            break;
          case 'Escape':
            event.preventDefault();
            isCommandPaletteOpen = false;
            break;
        }
      }
    }
  }

  function selectItem(items: globalThis.NodeListOf<Element>, index: number) {
    // Remove selection from all items
    items.forEach(item => {
      item.classList.remove('bg-secondary-100', 'dark:bg-secondary-700', 'border-primary-500');
      item.classList.add('border-transparent');
      item.setAttribute('data-selected', 'false');
    });

    // Add selection to target item
    if (items[index]) {
      items[index].classList.add('bg-secondary-100', 'dark:bg-secondary-700', 'border-primary-500');
      items[index].classList.remove('border-transparent');
      items[index].setAttribute('data-selected', 'true');

      // Scroll to selected item
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  async function installPWA() {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as unknown as {
      prompt: () => void;
      userChoice: Promise<{ outcome: string }>;
    };
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    canInstall = false;
  }

  async function refreshServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    isRefreshing = true;

    try {
      // Unregister current service worker
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log('Service Worker unregistered');
      }

      // Clear all caches
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
      console.log('All caches cleared');

      // Reload page
      window.location.reload();
    } catch (error) {
      console.error('Error refreshing service worker:', error);
      isRefreshing = false;
    }
  }

  function checkForSWUpdate() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found!');
          swUpdateAvailable = true;
        });
      }
    });
  }

  function checkPWAInstallation() {
    // Check if running as installed PWA
    isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches;
  }

  function initializeServiceWorkerSettings() {
    // Load from localStorage first
    const savedSetting = localStorage.getItem('serviceWorkerEnabled');
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    if (isInstalled) {
      // PWA installed - SW must be ON and cannot be toggled
      serviceWorkerEnabled = true;
      serviceWorkerCanToggle = false;
      // Force update localStorage to ensure consistency
      localStorage.setItem('serviceWorkerEnabled', 'true');
    } else {
      // Not installed - can use saved preference or default to OFF
      serviceWorkerEnabled = savedSetting === 'true' || false;
      serviceWorkerCanToggle = true;
    }
  }

  function toggleServiceWorker() {
    if (!serviceWorkerCanToggle) return;

    const newSetting = !serviceWorkerEnabled;

    // Update local state
    serviceWorkerEnabled = newSetting;
    localStorage.setItem('serviceWorkerEnabled', newSetting.toString());

    // Handle service worker based on new setting
    if (newSetting) {
      registerServiceWorker();
    } else {
      unregisterServiceWorker();
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator && serviceWorkerEnabled) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.unregister().then(() => {
            console.log('Service Worker unregistered');
          });
        }
      });
    }
  }

  async function checkAPIHealth() {
    apiHealthStatus = 'checking';
    apiHealthError = null;

    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.data.status === 'ok') {
        apiHealthStatus = 'ok';
      } else {
        apiHealthStatus = 'error';
        apiHealthError = 'API status not ok';
        console.warn('API health status not ok:', apiHealthError);
      }
    } catch (err) {
      apiHealthStatus = 'error';
      apiHealthError = err instanceof Error ? err.message : 'Failed to check API health';
      console.error('API health check failed:', apiHealthError, err);
    }
  }

  onMount(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Initialize Service Worker settings
    initializeServiceWorkerSettings();
    checkPWAInstallation();

    // Check API health status
    checkAPIHealth();

    // PWA Install Logic
    isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream: boolean }).MSStream;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      canInstall = true;
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      canInstall = false;
      console.log('PWA installed - forcing Service Worker ON');

      // Force Service Worker to ON for installed PWA
      serviceWorkerEnabled = true;
      serviceWorkerCanToggle = false;
      localStorage.setItem('serviceWorkerEnabled', 'true');

      // Update PWA installation status
      checkPWAInstallation();

      // Ensure Service Worker is registered
      registerServiceWorker();
    });

    // Check for service worker updates
    checkForSWUpdate();

    // Listen for PWA display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
      checkPWAInstallation();
      initializeServiceWorkerSettings();
    });

    // Add global event listeners
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('open-login-modal', handleOpenLoginModal);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('open-login-modal', handleOpenLoginModal);
    };
  });
</script>

<svelte:window
  on:keydown={e => {
    if (e.key === 'Escape' && drawerOpen) {
      drawerOpen = false;
    }
  }}
/>

<!-- Command Palette Modal -->
<CommandPalette bind:isOpen={isCommandPaletteOpen} />

<!-- Login Modal -->
<LoginModal bind:isOpen={isLoginModalOpen} />

<!-- Floating Menu Icon (Top Right) -->
<button
  onclick={handleMenuClick}
  class="fixed top-6 right-6 z-50 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
  title="Menu - Single click: Drawer, Double click: Command Palette"
>
  <Menu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
</button>

<!-- Backdrop -->
{#if drawerOpen}
  <div
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
    onclick={() => (drawerOpen = false)}
    onkeydown={e => e.key === 'Escape' && (drawerOpen = false)}
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
    tabindex="-1"
  ></div>
{/if}

<!-- Sidebar -->
{#if drawerOpen}
  <div
    transition:fly={{ x: 320, duration: 300, opacity: 0 }}
    class="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-50"
  >
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
          <button
            onclick={() => (drawerOpen = false)}
            class="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <X class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <!-- Menu Grid (Main Navigation) -->
      <div class="p-6 flex-1">
        <div class="grid grid-cols-2 gap-4">
          <!-- Home -->
          <a
            href="/"
            class="group flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            onclick={e => handleNavigation(e, '/')}
          >
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
            >
              <House class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">Home</span>
          </a>

          <!-- Tools -->
          <a
            href="/tools"
            class="group flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            onclick={e => handleNavigation(e, '/tools')}
          >
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
            >
              <Wrench class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">Tools</span>
          </a>
        </div>
      </div>

      <!-- Settings (Bottom Section) -->
      <div class="border-t border-gray-200 dark:border-gray-700">
        <!-- Settings Header with Summary/Detail Toggle -->
        <button
          onclick={() => (isSettingsExpanded = !isSettingsExpanded)}
          class="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Settings class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Settings</h3>
            </div>
            <div class="flex items-center">
              {#if isSettingsExpanded}
                <ChevronUp class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              {:else}
                <ChevronDown class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              {/if}
            </div>
          </div>
        </button>

        <div class="p-6 overflow-hidden">
          <!-- Settings Content -->
          <!-- Summary View (Always present, hidden with CSS) -->
          <div
            class="space-y-2 transition-all duration-300 ease-in-out transform {isSettingsExpanded
              ? 'opacity-0 -translate-y-2 pointer-events-none absolute'
              : 'opacity-100 translate-y-0 relative'}"
          >
            <!-- Status Row: All indicators in one line -->
            <div class="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
              <!-- Theme Status -->
              <div class="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-gray-700">
                {#if isDark}
                  <Moon class="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span class="text-gray-700 dark:text-gray-300 font-medium">Dark</span>
                {:else}
                  <Sun class="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                  <span class="text-gray-700 dark:text-gray-300 font-medium">Light</span>
                {/if}
              </div>

              <!-- Divider -->
              <div class="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>

              <!-- Service Worker Status -->
              <div class="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-gray-700">
                {#if serviceWorkerEnabled}
                  <Wifi class="w-3 h-3 text-green-600 dark:text-green-400" />
                  <span class="text-gray-700 dark:text-gray-300">SW On</span>
                {:else}
                  <WifiOff class="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <span class="text-gray-500 dark:text-gray-400">SW Off</span>
                {/if}
              </div>

              <!-- Divider -->
              <div class="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>

              <!-- API Health -->
              <div
                class="flex items-center gap-1 px-2 py-1 rounded-md {apiHealthStatus === 'ok'
                  ? 'bg-green-50 dark:bg-green-900/30'
                  : apiHealthStatus === 'checking'
                  ? 'bg-blue-50 dark:bg-blue-900/30'
                  : 'bg-red-50 dark:bg-red-900/30'}"
              >
                {#if apiHealthStatus === 'checking'}
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span class="text-blue-700 dark:text-blue-300">API...</span>
                {:else if apiHealthStatus === 'ok'}
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-green-700 dark:text-green-300">API OK</span>
                {:else}
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-red-700 dark:text-red-300">API Error</span>
                {/if}
              </div>

              <!-- PWA Status (Inline) -->
              <!-- {#if isPWAInstalled}
                <div
                  class="flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/50"
                >
                  <div class="w-2 h-2 bg-green-600 rounded"></div>
                  <span class="text-green-800 dark:text-green-200">App</span>
                </div>
              {:else if canInstall}
                <div
                  class="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50"
                >
                  <Download class="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span class="text-blue-800 dark:text-blue-200">Install</span>
                </div>
              {/if} -->
            </div>
          </div>

          <!-- Detailed View (Always present, hidden with CSS) -->
          <div
            class="space-y-3 transition-all duration-300 ease-in-out transform {isSettingsExpanded
              ? 'opacity-100 translate-y-0 relative'
              : 'opacity-0 -translate-y-2 pointer-events-none absolute'}"
            style="min-height: 0;"
          >
            <!-- Health Checker -->
            <HealthChecker />

            <!-- Theme Toggle -->
            <button
              onclick={toggleTheme}
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                >
                  {#if isDark}
                    <Sun class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  {:else}
                    <Moon class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  {/if}
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
              <div
                class="w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-600 relative transition-colors"
              >
                <div
                  class="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform {isDark
                    ? 'translate-x-4.5'
                    : 'translate-x-0.5'}"
                ></div>
              </div>
            </button>

            <!-- Service Worker Toggle -->
            <div
              class="w-full p-3 rounded-lg {serviceWorkerCanToggle
                ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'bg-gray-50 dark:bg-gray-800'} transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
                  >
                    {#if serviceWorkerEnabled}
                      <Wifi class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    {:else}
                      <WifiOff class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    {/if}
                  </div>
                  <div class="text-left">
                    <span class="text-sm font-medium text-gray-900 dark:text-white"
                      >Offline Mode</span
                    >
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {#if isPWAInstalled}
                        Always enabled (PWA Installed)
                      {:else if serviceWorkerEnabled}
                        34 tools work offline
                      {:else}
                        Enable for offline access
                      {/if}
                    </p>
                  </div>
                </div>
                <button
                  onclick={toggleServiceWorker}
                  class="w-10 h-6 rounded-full {serviceWorkerEnabled
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'} relative transition-colors {serviceWorkerCanToggle
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-60'}"
                  disabled={!serviceWorkerCanToggle}
                  aria-label={serviceWorkerCanToggle
                    ? serviceWorkerEnabled
                      ? 'Disable Offline Mode'
                      : 'Enable Offline Mode'
                    : 'Offline Mode cannot be changed (PWA Installed)'}
                >
                  <div
                    class="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform {serviceWorkerEnabled
                      ? 'translate-x-4.5'
                      : 'translate-x-0.5'}"
                  ></div>
                </button>
              </div>
              {#if isPWAInstalled && !serviceWorkerCanToggle}
                <p class="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Uninstall app to disable offline mode
                </p>
              {/if}
            </div>

            <!-- Install PWA (only show when SW is enabled) -->
            {#if serviceWorkerEnabled}
              {#if canInstall && !isIOS}
                <button
                  onclick={installPWA}
                  class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center"
                    >
                      <Download class="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white"
                      >Install App</span
                    >
                  </div>
                  <svg
                    class="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              {:else if isIOS}
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-blue-600 dark:text-blue-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
                        iOS Instructions
                      </p>
                      <p class="text-xs text-blue-700 dark:text-blue-300">
                        Tap Share → Add to Home Screen
                      </p>
                    </div>
                  </div>
                </div>
              {/if}
            {/if}

            <!-- Service Worker Refresh (only show when SW is enabled) -->
            {#if serviceWorkerEnabled}
              <button
                onclick={refreshServiceWorker}
                class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                disabled={isRefreshing}
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center"
                  >
                    <RefreshCw
                      class="w-4 h-4 text-orange-600 dark:text-orange-400 {isRefreshing
                        ? 'animate-spin'
                        : ''}"
                    />
                  </div>
                  <div class="text-left">
                    <span class="text-sm font-medium text-gray-900 dark:text-white"
                      >Refresh Cache</span
                    >
                    {#if swUpdateAvailable}
                      <p class="text-xs text-green-600 dark:text-green-400">Update available</p>
                    {/if}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  {#if isRefreshing}
                    <span class="text-xs text-gray-500">Refreshing...</span>
                  {:else}
                    <svg
                      class="w-4 h-4 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  {/if}
                </div>
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
