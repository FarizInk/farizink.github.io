<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Menu,
    House,
    Wrench,
    FileText,
    Wallet,
    Download,
    X,
    RefreshCw,
    WifiOff,
    Zap,
    Activity,
    CircleCheck,
    CircleX,
    ChevronRight
  } from '@lucide/svelte';
  import CommandPalette from './CommandPalette.svelte';
  import LoginModal from './LoginModal.svelte';
  import Modal from './Modal.svelte';
  import { API_BASE_URL } from '../lib/constants';
  import { IconButton, Sidebar, Switch, ThemeSwitch } from '$lib/components/ds';
  import { getAllTools } from '../lib/toolsConfig';

  // Health status interface (Laravel API format)
  interface HealthData {
    status: string;
    service: string;
    timestamp: string;
    version: string;
  }

  let isCommandPaletteOpen = $state(false);
  let drawerOpen = $state(false);
  let isLoginModalOpen = $state(false);
  let isLoggedIn = $state(false);
  let activeNavId = $state<string | undefined>(undefined);
  const toolCount = getAllTools().length;
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

  // Double click state for menu button
  let lastClickTime = 0;
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  const DOUBLE_CLICK_DELAY = 200;

  function handleOpenLoginModal() {
    isLoginModalOpen = true;
    drawerOpen = false;
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
      item.classList.remove('bg-control');
      item.setAttribute('data-selected', 'false');
    });

    // Add selection to target item
    if (items[index]) {
      items[index].classList.add('bg-control');
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

  // Menu context, refreshed each time the drawer opens.
  $effect(() => {
    if (!drawerOpen) return;
    isLoggedIn = !!localStorage.getItem('authToken');
    const path = window.location.pathname;
    activeNavId =
      path === '/'
        ? 'home'
        : path.startsWith('/tools')
          ? 'tools'
          : path.startsWith('/notes')
            ? 'notes'
            : path.startsWith('/finance')
              ? 'finance'
              : undefined;
  });

  onMount(() => {
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
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="grid size-12 place-items-center rounded-md bg-tile-deep text-ink-on-dark">
        {#if apiHealthStatus === 'checking'}
          <Activity class="size-6" />
        {:else if apiHealthStatus === 'ok'}
          <CircleCheck class="size-6" />
        {:else}
          <CircleX class="size-6" />
        {/if}
      </div>
      <div>
        <h2 class="text-title">API server status</h2>
        <p class="text-body-sm font-normal text-ink-muted">
          {#if apiHealthStatus === 'checking'}
            Checking connection…
          {:else if apiHealthStatus === 'ok'}
            Connected and healthy
          {:else}
            Connection failed
          {/if}
        </p>
      </div>
    </div>
    <button onclick={() => (isApiHealthModalOpen = false)} class="btn-icon" aria-label="Close">
      <X class="size-5" />
    </button>
  </div>

  {#if apiHealthStatus === 'checking'}
    <div class="flex flex-col items-center justify-center py-8">
      <div
        class="mb-4 size-12 animate-spin rounded-pill border-4 border-control border-t-accent"
      ></div>
      <p class="text-ink-muted">Checking API health…</p>
    </div>
  {:else if healthData}
    <div class="space-y-3">
      <div class="flex items-center justify-center gap-2 rounded-md bg-sunken p-3">
        <span class="size-2 rounded-pill bg-live"></span>
        <span class="text-label text-live">Online</span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        {#each [
          { label: 'Service', value: healthData.service },
          { label: 'Version', value: healthData.version },
          { label: 'Status', value: healthData.status },
          {
            label: 'Last check',
            value: lastChecked
              ? new Date(lastChecked).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })
              : '-'
          }
        ] as item (item.label)}
          <div class="rounded-md bg-sunken p-3">
            <p class="text-label mb-1 text-ink-muted">{item.label}</p>
            <p class="text-body-sm">{item.value}</p>
          </div>
        {/each}
      </div>

      <div class="rounded-md bg-sunken p-3">
        <p class="text-label mb-1 text-ink-muted">Server timestamp</p>
        <p class="text-body-sm">
          {healthData.timestamp ? new Date(healthData.timestamp).toLocaleString() : '-'}
        </p>
      </div>
    </div>
  {:else}
    <div class="space-y-4">
      <div class="flex flex-col items-center justify-center py-4">
        <div class="mb-4 grid size-16 place-items-center rounded-pill bg-sunken">
          <WifiOff class="size-8 text-negative" />
        </div>
        <h3 class="text-title mb-1">Connection error</h3>
        <p class="text-center text-body-sm font-normal text-ink-muted">
          Unable to connect to the API server.
        </p>
      </div>

      {#if apiHealthError}
        <div class="rounded-md bg-sunken p-3">
          <p class="break-all font-mono text-xs text-negative">{apiHealthError}</p>
        </div>
      {/if}
    </div>
  {/if}

  <button
    onclick={checkAPIHealth}
    disabled={apiHealthStatus === 'checking'}
    class="btn btn-primary mt-6 w-full"
  >
    <RefreshCw class="size-4 {apiHealthStatus === 'checking' ? 'animate-spin' : ''}" />
    {apiHealthStatus === 'checking' ? 'Checking…' : 'Refresh'}
  </button>
</Modal>

<!-- Menu (single click: drawer, double click: command palette). Theme lives in the drawer. -->
<div class="fixed top-5 right-5 z-50">
  <IconButton label="Menu (double-click for command palette)" onclick={handleMenuClick}>
    <Menu />
  </IconButton>
</div>

{#snippet homeIcon()}<House />{/snippet}
{#snippet toolsIcon()}<Wrench />{/snippet}
{#snippet notesIcon()}<FileText />{/snippet}
{#snippet financeIcon()}<Wallet />{/snippet}

<Sidebar
  bind:open={drawerOpen}
  logo="/android-chrome-192x192.png"
  activeId={activeNavId}
  groups={[
    {
      label: 'Explore',
      items: [
        { id: 'home', label: 'Home', href: '/', icon: homeIcon },
        { id: 'tools', label: 'Tools', href: '/tools', icon: toolsIcon, badge: toolCount }
      ]
    },
    ...(isLoggedIn
      ? [
          {
            label: 'Personal',
            items: [
              { id: 'notes', label: 'Notes', href: '/notes', icon: notesIcon },
              { id: 'finance', label: 'Finance', href: '/finance', icon: financeIcon }
            ]
          }
        ]
      : [])
  ]}
>
  <div class="flex flex-col gap-2 rounded-lg bg-card p-3">
    <span class="text-label px-1 text-ink-muted">Theme</span>
    <ThemeSwitch />
  </div>

  <div class="flex flex-col gap-1 rounded-lg bg-card p-2">
    <button
      onclick={openApiHealthModal}
      class="flex min-h-12 items-center gap-3 rounded-md px-2 text-left transition-colors hover:bg-control"
    >
      <span class="grid size-9 place-items-center rounded-sm bg-control">
        <span
          class="size-2 rounded-pill {apiHealthStatus === 'checking'
            ? 'bg-ink-muted'
            : healthData
              ? 'bg-live'
              : 'bg-negative'}"
        ></span>
      </span>
      <span class="min-w-0 flex-1 text-body-sm">
        API status
        <span class="block text-xs font-normal text-ink-muted">
          {apiHealthStatus === 'checking' ? 'Checking…' : healthData ? 'Online' : 'Offline'}
        </span>
      </span>
      <ChevronRight class="size-4 text-ink-muted" />
    </button>

    <div class="flex min-h-12 items-center gap-3 px-2 py-1 {serviceWorkerCanToggle ? '' : 'opacity-80'}">
      <Switch
        checked={serviceWorkerEnabled}
        disabled={!serviceWorkerCanToggle}
        onchange={toggleServiceWorker}
        label="Offline mode"
        description={isPWAInstalled
          ? 'Always on (PWA) — uninstall the app to disable'
          : serviceWorkerEnabled
            ? 'Enabled for 34 tools'
            : 'Enable offline access'}
      />
    </div>

    {#if serviceWorkerEnabled}
      {#if canInstall && !isIOS}
        <button
          onclick={installPWA}
          class="flex min-h-12 items-center gap-3 rounded-md px-2 text-left transition-colors hover:bg-control"
        >
          <span class="grid size-9 place-items-center rounded-sm bg-control text-ink-muted"><Download class="size-[18px]" /></span>
          <span class="min-w-0 flex-1 text-body-sm">
            Install app
            <span class="block text-xs font-normal text-ink-muted">Add to home screen</span>
          </span>
        </button>
      {:else if isIOS}
        <div class="flex min-h-12 items-center gap-3 px-2">
          <span class="grid size-9 place-items-center rounded-sm bg-control text-ink-muted"><Zap class="size-[18px]" /></span>
          <span class="min-w-0 flex-1 text-body-sm">
            iOS install
            <span class="block text-xs font-normal text-ink-muted">Tap Share → Add to Home Screen</span>
          </span>
        </div>
      {/if}

      <button
        onclick={refreshServiceWorker}
        disabled={isRefreshing}
        class="flex min-h-12 items-center gap-3 rounded-md px-2 text-left transition-colors hover:bg-control disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span class="grid size-9 place-items-center rounded-sm bg-control text-ink-muted">
          <RefreshCw class="size-[18px] {isRefreshing ? 'animate-spin' : ''}" />
        </span>
        <span class="min-w-0 flex-1 text-body-sm">
          Refresh cache
          <span class="block text-xs font-normal {swUpdateAvailable ? 'text-live' : 'text-ink-muted'}">
            {isRefreshing ? 'Refreshing…' : swUpdateAvailable ? 'Update available' : 'Clear cached data'}
          </span>
        </span>
      </button>
    {/if}
  </div>
</Sidebar>
