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
    Settings,
    Zap,
    Activity,
    CircleCheck,
    CircleX,
    Info,
    Heart,
  } from '@lucide/svelte';
  import CommandPalette from './CommandPalette.svelte';
  import LoginModal from './LoginModal.svelte';
  import Modal from './Modal.svelte';
  import { API_BASE_URL } from '../lib/constants';

  // Health status interface (Laravel API format)
  interface HealthData {
    status: string;
    service: string;
    timestamp: string;
    version: string;
  }

  let isDark = $state(false);
  let isCommandPaletteOpen = $state(false);
  let drawerOpen = $state(false);
  let isLoginModalOpen = $state(false);
  let isSettingsExpanded = $state(false);
  let isApiHealthModalOpen = $state(false);
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
  let healthData = $state<HealthData | null>(null);
  let lastChecked = $state<Date | null>(null);

  // Current year for footer
  let currentYear = $state(new Date().getFullYear());

  // Double click state for menu button
  let lastClickTime = 0;
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  const DOUBLE_CLICK_DELAY = 200;

  function handleNavigation(event: MouseEvent, href: string) {
    event.preventDefault();
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

  function openApiHealthModal() {
    // Close drawer and open modal
    drawerOpen = false;
    isApiHealthModalOpen = true;
    // Refresh health data when opening modal
    checkAPIHealth();
  }

  async function installPWA() {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as unknown as {
      prompt: () => void;
      userChoice: Promise<{ outcome: string }>;
    };
    promptEvent.prompt();
    await promptEvent.userChoice;

    deferredPrompt = null;
    canInstall = false;
  }

  async function refreshServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    isRefreshing = true;

    try {
      // Unregister current service worker
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
      }

      // Clear all caches
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));

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
        .then(() => {
          // registered
        })
        .catch(() => {
          // ignore
        });
    }
  }

  function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.unregister().then(() => {
          });
        }
      });
    }
  }

  async function checkAPIHealth() {
    apiHealthStatus = 'checking';
    apiHealthError = null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: HealthData = await response.json();
      healthData = data;
      lastChecked = new Date();
      if (data.status === 'ok') {
        apiHealthStatus = 'ok';
      } else {
        apiHealthStatus = 'error';
        apiHealthError = 'API status not ok';
        console.warn('API health status not ok:', apiHealthError);
      }
    } catch (err) {
      apiHealthStatus = 'error';
      apiHealthError = err instanceof Error ? err.message : 'Failed to check API health';
      healthData = null;
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

<!-- API Health Modal -->
<Modal
  isOpen={isApiHealthModalOpen}
  onClose={() => (isApiHealthModalOpen = false)}
  maxW="max-w-md"
>
  
    <div class="py-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20">
      <div class="flex items-center justify-between px-6">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center shadow-md"
          >
            {#if apiHealthStatus === 'checking'}
              <Activity class="w-6 h-6 text-white animate-pulse" />
            {:else if apiHealthStatus === 'ok'}
              <CircleCheck class="w-6 h-6 text-white" />
            {:else}
              <CircleX class="w-6 h-6 text-white" />
            {/if}
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">API Server Status</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {#if apiHealthStatus === 'checking'}
                Checking connection...
              {:else if apiHealthStatus === 'ok'}
                Connected & healthy
              {:else}
                Connection failed
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
  

  
    <div class="py-6">
      <div class="px-6">
      {#if apiHealthStatus === 'checking'}
        <div class="flex flex-col items-center justify-center py-8">
          <div class="w-12 h-12 border-4 border-warning-200 dark:border-primary-800 border-t-yellow-500 dark:border-t-primary-500 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Checking API health...</p>
        </div>
      {:else if healthData}
        <div class="space-y-4">
          <!-- Status Badge -->
          <div class="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/50">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-green-900 dark:text-green-300">API is Online</span>
          </div>

          <!-- Info Grid -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Service Name -->
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <Info class="w-3 h-3" />
                <span>Service</span>
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{healthData.service}</p>
            </div>

            <!-- Version -->
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span>Version</span>
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{healthData.version}</p>
            </div>

            <!-- Status -->
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Status</span>
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white capitalize">{healthData.status}</p>
            </div>

            <!-- Response Time -->
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Last Check</span>
              </div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">
                {lastChecked
                  ? new Date(lastChecked).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })
                  : '-'}
              </p>
            </div>
          </div>

          <!-- Timestamp -->
          <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Server Timestamp</span>
            </div>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {healthData.timestamp ? new Date(healthData.timestamp).toLocaleString() : '-'}
            </p>
          </div>
        </div>
      {:else}
        <!-- Error State -->
        <div class="space-y-4">
          <div class="flex flex-col items-center justify-center py-4">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <WifiOff class="w-8 h-8 text-red-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Connection Error
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
              Unable to connect to the API server
            </p>
          </div>

          {#if apiHealthError}
            <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700/50">
              <p class="text-xs text-red-600 dark:text-red-400 font-mono break-all">
                {apiHealthError}
              </p>
            </div>
          {/if}

          <button
            onclick={checkAPIHealth}
            class="btn btn-primary w-full flex items-center justify-center gap-2 p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
          >
            <RefreshCw class="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
        </div>
      {/if}
      </div>
    </div>
  

  
    <div class="py-4 bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-between px-6 gap-6">
        <div class="text-sm text-secondary-600 dark:text-secondary-400">
          {#if apiHealthStatus === 'checking'}
            <span>Checking API connection...</span>
          {:else if healthData}
            <span>API is online and healthy</span>
          {:else}
            <span>Unable to connect to API</span>
          {/if}
        </div>
        <button
          onclick={checkAPIHealth}
          class="btn btn-primary px-5 py-2.5  dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600  font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50"
          disabled={apiHealthStatus === 'checking'}
        >
          {#if apiHealthStatus === 'checking'}
            <RefreshCw class="w-4 h-4 animate-spin" />
            Checking...
          {:else}
            <RefreshCw class="w-4 h-4" />
            Refresh
          {/if}
        </button>
      </div>
    </div>
  
</Modal>

<!-- Floating Menu Button with Ping Effect (Matches Tools.svelte style) -->
<div class="fixed top-6 right-6 z-50 flex items-center justify-center">
  <!-- Animated ping rings -->
  <div
    class="absolute w-14 h-14 rounded-full border-2 border-warning-400/30 dark:border-primary-400/30 animate-ping"
    style="animation-delay: 0s;"
  ></div>
  <div
    class="absolute w-14 h-14 rounded-full border-2 border-warning-300/20 dark:border-primary-300/20 animate-ping"
    style="animation-delay: 0.5s;"
  ></div>

  <button
    onclick={handleMenuClick}
    class="relative z-10 w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-2 border-warning-500/20 dark:border-primary-500/20 hover:border-warning-500 dark:hover:border-primary-500 hover:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:hover:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
    title="Menu - Single click: Drawer, Double click: Command Palette"
  >
    <Menu class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
  </button>
</div>

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
    class="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 z-50 flex flex-col shadow-2xl"
  >
    <!-- Header -->
    <div class="py-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20">
      <div class="flex items-center justify-between px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-warning-600 to-amber-500 dark:from-primary-400 dark:to-primary-500">
            Menu
          </span>
        </h2>
        <button
          onclick={() => (drawerOpen = false)}
          class="btn-icon w-9 h-9 rounded-xl hover:bg-warning-100 dark:hover:bg-primary-900/30 flex items-center justify-center transition-all active:scale-95"
          aria-label="Close menu"
        >
          <X class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="flex-1 overflow-y-auto p-6 space-y-6">
      <!-- Main Navigation -->
      <div class="space-y-3">
        <!-- Home -->
        <a
          href="/"
          class="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700 hover:border-warning-300 dark:hover:border-primary-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          onclick={e => handleNavigation(e, '/')}
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md"
          >
            <House class="w-6 h-6 text-white" />
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Home</span>
        </a>

        <!-- Tools -->
        <a
          href="/tools"
          class="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700 hover:border-warning-300 dark:hover:border-primary-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          onclick={e => handleNavigation(e, '/tools')}
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md"
          >
            <Wrench class="w-6 h-6 text-white" />
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tools</span>
        </a>
      </div>



      <!-- Settings Section -->
      <div class="pt-6">
        <!-- Settings Toggle -->
        <button
          onclick={() => (isSettingsExpanded = !isSettingsExpanded)}
          class="btn w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 hover:from-warning-100 dark:hover:from-primary-900/30 hover:to-amber-100 dark:hover:to-primary-900/40 border border-warning-200 dark:border-primary-800 hover:border-warning-300 dark:hover:border-primary-400 transition-all duration-200 group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <Settings class="w-5 h-5 text-white" />
            </div>
            <div class="text-left">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Settings</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">Customize your experience</p>
            </div>
          </div>
          <div class="flex items-center">
            {#if isSettingsExpanded}
              <ChevronUp class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {:else}
              <ChevronDown class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            {/if}
          </div>
        </button>

        <!-- Settings Content (Only show when expanded) -->
        {#if isSettingsExpanded}
        <div class="mt-4 space-y-3">
          <!-- Status Cards -->
          <div class="flex flex-wrap gap-2 items-center">
            <!-- Theme Card (Clickable) -->
            <button
              onclick={toggleTheme}
              class="mode-btn flex-1 min-w-[120px] h-12 flex items-center justify-center gap-2 px-3 rounded-xl bg-gradient-to-br from-warning-50 to-amber-50 dark:from-indigo-900/30 dark:to-primary-900/20 border border-warning-200 dark:border-primary-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {#if isDark}
                <Moon class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span class="text-xs font-semibold text-primary-900 dark:text-primary-300">Dark</span>
              {:else}
                <Sun class="w-4 h-4 text-warning-600 dark:text-warning-400" />
                <span class="text-xs font-semibold text-warning-900 dark:text-warning-300">Light</span>
              {/if}
            </button>

            <!-- API Status Card (Clickable) -->
            <button
              onclick={openApiHealthModal}
              class="mode-btn flex-1 min-w-[120px] h-12 flex items-center justify-center gap-2 px-3 rounded-xl border transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 {healthData
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50 hover:border-green-300 dark:hover:border-green-600'
                : apiHealthStatus === 'checking'
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50 hover:border-red-300 dark:hover:border-red-600'}"
            >
              {#if apiHealthStatus === 'checking'}
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-semibold text-blue-900 dark:text-blue-300">Checking...</span>
              {:else if healthData}
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-xs font-semibold text-green-900 dark:text-green-300">Connected</span>
              {:else}
                <WifiOff class="w-3 h-3 text-red-500" />
                <span class="text-xs font-semibold text-red-900 dark:text-red-300">Offline</span>
              {/if}
            </button>
          </div>

          <!-- Service Worker Toggle -->
          <div
            class="w-full p-4 rounded-xl {serviceWorkerCanToggle
              ? 'bg-white dark:bg-gray-800 hover:bg-warning-50 dark:hover:bg-primary-900/20'
              : 'bg-gray-50 dark:bg-gray-800/50'} border border-gray-200 dark:border-gray-700 hover:border-warning-300 dark:hover:border-primary-400 transition-all duration-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/50 rounded-xl flex items-center justify-center"
                >
                  {#if serviceWorkerEnabled}
                    <Wifi class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {:else}
                    <WifiOff class="w-5 h-5 text-gray-400 dark:text-gray-600" />
                  {/if}
                </div>
                <div class="text-left">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Offline Mode</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {#if isPWAInstalled}
                      Always on (PWA)
                    {:else if serviceWorkerEnabled}
                      Enable for 34 tools
                    {:else}
                      Enable offline access
                    {/if}
                  </p>
                </div>
              </div>
              <button
                onclick={toggleServiceWorker}
                class="mode-btn w-12 h-6 rounded-full bg-gradient-to-r {serviceWorkerEnabled
                  ? 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700'
                  : 'from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'} relative transition-all duration-300 shadow-inner {serviceWorkerCanToggle
                  ? 'cursor-pointer hover:scale-105'
                  : 'cursor-not-allowed opacity-60'}"
                disabled={!serviceWorkerCanToggle}
                aria-label={serviceWorkerCanToggle
                  ? serviceWorkerEnabled
                    ? 'Disable Offline Mode'
                    : 'Enable Offline Mode'
                  : 'Offline Mode cannot be changed (PWA Installed)'}
              >
                <div
                  class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 {serviceWorkerEnabled
                    ? 'translate-x-6'
                    : 'translate-x-0.5'}"
                ></div>
              </button>
            </div>
            {#if isPWAInstalled && !serviceWorkerCanToggle}
              <p class="text-xs text-orange-600 dark:text-orange-400 mt-2 flex items-center gap-1">
                <Zap class="w-3 h-3" />
                Uninstall app to disable
              </p>
            {/if}
          </div>

          <!-- Install PWA -->
          {#if serviceWorkerEnabled}
            {#if canInstall && !isIOS}
              <button
                onclick={installPWA}
                class="btn btn-primary w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/50 hover:from-green-100 dark:hover:from-green-900/40 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div
                  class="w-11 h-11 bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md"
                >
                  <Download class="w-5 h-5 text-white" />
                </div>
                <div class="text-left">
                  <p class="text-sm font-semibold text-green-900 dark:text-green-100">Install App</p>
                  <p class="text-xs text-green-700 dark:text-green-300">Add to home screen</p>
                </div>
              </button>
            {:else if isIOS}
              <div class="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700/50">
                <div class="flex items-center gap-3">
                  <div
                    class="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center"
                  >
                    <Zap class="w-5 h-5 text-white" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">iOS Instructions</p>
                    <p class="text-xs text-blue-700 dark:text-blue-300">Tap Share → Add to Home Screen</p>
                  </div>
                </div>
              </div>
            {/if}
          {/if}

          <!-- Refresh Cache -->
          {#if serviceWorkerEnabled}
            <button
              onclick={refreshServiceWorker}
              disabled={isRefreshing}
              class="btn btn-secondary w-full flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-orange-800/50 rounded-xl flex items-center justify-center"
                >
                  <RefreshCw
                    class="w-5 h-5 text-orange-600 dark:text-orange-400 {isRefreshing
                      ? 'animate-spin'
                      : ''}"
                  />
                </div>
                <div class="text-left">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Refresh Cache</p>
                  {#if swUpdateAvailable}
                    <p class="text-xs text-green-600 dark:text-green-400">Update available</p>
                  {:else}
                    <p class="text-xs text-gray-500 dark:text-gray-400">Clear cached data</p>
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
        {/if}
      </div>
    </div>

    <!-- Footer -->
    <div class="p-6 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur">
      <div class="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>© {currentYear} Fariz</span>
        <span>•</span>
        <span class="flex items-center gap-1">Built with <Heart class="w-3 h-3 text-red-500 fill-red-500" /></span>
      </div>
    </div>
  </div>
{/if}
