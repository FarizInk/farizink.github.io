<script lang="ts">
  import { navigate, type Route } from '../lib/router';
  import { theme, toggleTheme } from '../lib/theme.svelte';
  import { allRoutes } from '../routes/index';
  import {
    Search,
    Command,
    LogOut,
    User,
    ArrowUpDown,
    ArrowRight,
    Sparkles,
    Sun,
    Moon,
    X
  } from '@lucide/svelte';
  import { IconButton } from '$lib/components/ds';
  import { getValidatedAuthState, logout } from '../lib/auth';
  import { toast } from 'svelte-sonner';
  import { onMount } from 'svelte';
  import { preventBodyScroll, restoreBodyScroll } from '../lib/modalScroll';

  let { isOpen = $bindable(false) } = $props();

  let searchQuery = $state('');
  let selectedIndex = $state(0);
  let filteredRoutes = $state<Route[]>(allRoutes);
  let authState = $state<{ isLoggedIn: boolean; username: string | null }>({
    isLoggedIn: false,
    username: null
  });
  // Track if we're currently validating to prevent race conditions
  let isValidating = $state(false);
  let isLoggingOut = $state(false);

  // Theme state
  const isDark = $derived(!theme.light);

  function closeModal() {
    isOpen = false;
    searchQuery = '';
    selectedIndex = 0;
  }

  // Sync auth state from localStorage immediately (for responsive UI)
  function syncAuthStateFromStorage() {
    if (typeof localStorage === 'undefined') return;

    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    authState = {
      isLoggedIn: !!(token && isLoggedIn),
      username
    };
  }

  async function updateAuthState() {
    if (isValidating) return; // Prevent concurrent validations
    isValidating = true;

    try {
      const state = await getValidatedAuthState();
      authState = {
        isLoggedIn: state.isValid && state.isLoggedIn,
        username: state.username
      };
    } finally {
      isValidating = false;
    }
  }

  function navigateToRoute(
    route: { path: string; title?: string; description?: string },
    event?: Event,
    newTab = false
  ) {
    // Stop event propagation to prevent it from reaching the login modal backdrop
    event?.stopPropagation();

    // Handle special routes like login
    if (route.path === '/login') {
      const evt = new CustomEvent('open-login-modal');
      document.dispatchEvent(evt);
      closeModal();
    } else if (route.path === '/logout') {
      if (isLoggingOut) return;
      handleLogout();
      closeModal();
    } else if (newTab) {
      window.open(route.path, '_blank');
      closeModal();
    } else {
      closeModal();
      navigate(route.path);
    }
  }

  function handleSearchKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filteredRoutes.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
    } else if (e.key === 'Enter' && filteredRoutes.length > 0) {
      e.preventDefault();
      const newTab = e.ctrlKey || e.metaKey;
      navigateToRoute(filteredRoutes[selectedIndex], undefined, newTab);
    }
    // Refocus search input to keep focus there
    const input = document.getElementById('command-palette-search');
    if (input && document.activeElement !== input) {
      (input as HTMLInputElement).focus();
    }
  }

  async function handleLogout() {
    if (isLoggingOut) return;
    isLoggingOut = true;
    const logoutPromise = (async () => {
      await logout();
      await updateAuthState();
    })();

    toast.promise(logoutPromise, {
      loading: 'Signing out...',
      success: 'Signed out successfully',
      error: error => (error instanceof Error ? error.message : 'Failed to sign out')
    });

    try {
      await logoutPromise;
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      isLoggingOut = false;
    }
  }

  // Get category label for route
  function getCategoryLabel(path: string): string {
    if (path === '/') return 'Page';
    if (path === '/notes') return 'Page';
    if (path === '/tools') return 'Page';
    if (path === '/login') return 'Auth';
    if (path === '/logout') return 'Auth';
    return 'Tool';
  }

  // Get category color
  function getCategoryColor(path: string): string {
    const category = getCategoryLabel(path);
    switch (category) {
      case 'Page':
        return 'bg-tile-deep text-ink-on-dark';
      case 'Auth':
        return 'bg-tile-violet text-ink-on-dark';
      default:
        return 'bg-tile-lilac text-ink-on-bright';
    }
  }

  // Default icon for routes without one
  const DefaultIcon = Sparkles;

  // Create dynamic routes based on auth state
  let dynamicRoutes = $derived.by(() => {
    // Filter out dynamic routes (containing ':') and login route from base routes
    const baseRoutes = allRoutes.filter(
      route => route.path !== '/login' && !route.path.includes(':') // Exclude dynamic parameter routes like /files/:code
    );
    const authRoute: Route = authState.isLoggedIn
      ? {
          path: '/logout',
          title: 'Logout - Fariz',
          description: `Sign out ${authState.username || 'your account'}`,
          component: null,
          icon: LogOut
        }
      : {
          path: '/login',
          title: 'Login - Fariz',
          description: 'Sign in to your account',
          component: null,
          icon: User
        };
    return [...baseRoutes, authRoute];
  });

  $effect(() => {
    if (searchQuery.trim() === '') {
      filteredRoutes = dynamicRoutes;
    } else {
      const query = searchQuery.toLowerCase();
      filteredRoutes = dynamicRoutes.filter(route => {
        const title = route.title?.toLowerCase() || '';
        const path = route.path.toLowerCase();

        return title.includes(query) || path.includes(query);
      });
    }
    selectedIndex = 0;
  });

  $effect(() => {
    if (!isOpen) return;
    const scrollId = preventBodyScroll();
    return () => restoreBodyScroll(scrollId);
  });

  // Update auth state when component mounts and listen for auth changes
  onMount(() => {
    // Sync auth from localStorage
    syncAuthStateFromStorage();

    // Then validate asynchronously (don't await, let it happen in background)
    updateAuthState();

    // Listen for auth state changes
    const handleLoginSuccess = () => {
      syncAuthStateFromStorage(); // Immediate update from localStorage
      updateAuthState(); // Then validate with API
    };
    const handleLogoutSuccess = () => {
      syncAuthStateFromStorage(); // Immediate update from localStorage
    };

    document.addEventListener('login-success', handleLoginSuccess);
    document.addEventListener('logout-success', handleLogoutSuccess);

    return () => {
      document.removeEventListener('login-success', handleLoginSuccess);
      document.removeEventListener('logout-success', handleLogoutSuccess);
    };
  });

  function scrollToSelected() {
    setTimeout(() => {
      const selectedItem = document.querySelector('[data-selected="true"]');
      const container = document.querySelector('.command-palette-list');

      if (selectedItem && container) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = selectedItem.getBoundingClientRect();

        // Check if item is outside viewport
        if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
          selectedItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }, 50);
  }

  // Scroll to selected item when selection changes
  $effect(() => {
    if (isOpen && filteredRoutes.length > 0) {
      scrollToSelected();
    }
  });

  $effect(() => {
    if (isOpen) {
      // Focus the search input when modal opens
      setTimeout(() => {
        const input = document.getElementById('command-palette-search');
        if (input) {
          (input as HTMLInputElement).focus();
        }

        // Auto-select first item
        if (filteredRoutes.length > 0) {
          selectedIndex = 0;
          // Force scroll to first item
          setTimeout(() => {
            scrollToSelected();
          }, 150);
        }
      }, 100);
    }
  });
</script>

<!-- Backdrop -->
{#if isOpen}
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-overlay backdrop-blur-sm"
    onclick={e => {
      // Only close if clicking the backdrop (not the modal content)
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }}
    onkeydown={e => e.key === 'Escape' && closeModal()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="command-palette-title"
    tabindex="-1"
  >
    <div
      class="mx-4 w-full max-w-2xl overflow-hidden rounded-lg bg-raised text-ink"
      role="document"
    >
      <!-- Header with Search -->
      <div class="flex flex-col gap-4 p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-md bg-tile-deep text-ink-on-dark">
              <Command class="size-5" />
            </span>
            <div>
              <h2 id="command-palette-title" class="text-title">Command palette</h2>
              <p class="text-body-sm font-normal text-ink-muted">Search pages, tools, and settings</p>
            </div>
          </div>

          <IconButton label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onclick={toggleTheme}>
            {#if isDark}<Sun />{:else}<Moon />{/if}
          </IconButton>
        </div>

        <div class="relative flex items-center">
          <Search class="pointer-events-none absolute left-4 size-5 text-ink-muted" />
          <input
            id="command-palette-search"
            type="text"
            placeholder="Search anything…"
            aria-label="Search pages and tools"
            class="text-body h-13 w-full rounded-pill bg-control pr-12 pl-12 text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            bind:value={searchQuery}
            onkeydown={handleSearchKeydown}
            autocomplete="off"
          />
          {#if searchQuery}
            <button
              onclick={() => (searchQuery = '')}
              class="absolute right-3 grid size-7 place-items-center rounded-pill bg-raised text-ink-muted hover:text-ink"
              aria-label="Clear search"
            >
              <X class="size-3.5" />
            </button>
          {/if}
        </div>
      </div>

      <!-- Results -->
      <div class="command-palette-list max-h-96 overflow-y-auto">
        {#if filteredRoutes.length > 0}
          <div class="p-2">
            {#each filteredRoutes as route, i (route.path)}
              {@const IconComp = route.icon || DefaultIcon}
              {@const selected = i === selectedIndex}
              <button
                class="cmd-item group flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors duration-150 {selected
                  ? 'bg-control'
                  : 'hover:bg-control'}"
                onclick={e => navigateToRoute(route, e, e.ctrlKey || e.metaKey)}
                role="option"
                aria-selected={selected}
                tabindex="-1"
              >
                <span
                  class="grid size-10 flex-none place-items-center rounded-md {selected
                    ? 'bg-accent text-ink-on-accent'
                    : 'bg-control text-ink'}"
                >
                  <IconComp class="size-5" />
                </span>

                <span class="min-w-0 flex-1">
                  <span class="block truncate text-body font-semibold">
                    {#if route.path === '/'}
                      Home
                    {:else if route.path === '/notes'}
                      Notes
                    {:else if route.path === '/tools'}
                      Tools
                    {:else if route.path === '/login'}
                      Login
                    {:else if route.path === '/logout'}
                      Logout
                    {:else}
                      {route.title?.replace(' - Fariz', '') || route.path}
                    {/if}
                  </span>
                  {#if route.path !== '/' && route.path !== '/notes' && route.path !== '/tools' && route.path !== '/login' && route.path !== '/logout'}
                    <span class="mt-0.5 block text-code text-ink-muted">{route.path}</span>
                  {/if}
                  {#if route.description && (route.path === '/login' || route.path === '/logout')}
                    <span class="mt-0.5 line-clamp-2 block text-body-sm font-normal text-ink-muted">
                      {route.description}
                    </span>
                  {/if}
                </span>

                <span class="text-label rounded-pill px-2.5 py-1 {getCategoryColor(route.path)}">
                  {getCategoryLabel(route.path)}
                </span>

                <ArrowRight
                  class="size-4 text-ink-muted {selected ? '' : 'opacity-0 group-hover:opacity-100'}"
                />
              </button>
            {/each}
          </div>
        {:else}
          <div class="p-8 text-center">
            <div class="mx-auto mb-4 grid size-16 place-items-center rounded-lg bg-control">
              <Search class="size-8 text-ink-muted" />
            </div>
            <h3 class="text-title mb-1">No results found</h3>
            <p class="text-body-sm font-normal text-ink-muted">Nothing matches "{searchQuery}"</p>
          </div>
        {/if}
      </div>

      <!-- Footer with keyboard shortcuts -->
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
          {#each [
            { key: 'nav', label: 'Navigate' },
            { key: '↵', label: 'Select' },
            { key: 'esc', label: 'Close' },
            { key: 'cmdk', label: 'Open' }
          ] as hint (hint.key)}
            <span class="flex items-center gap-2">
              <kbd class="flex items-center gap-1 rounded-md bg-control px-2 py-0.5 font-mono">
                {#if hint.key === 'nav'}
                  <ArrowUpDown class="size-3" />
                {:else if hint.key === 'cmdk'}
                  <Command class="size-3" /> K
                {:else}
                  {hint.key}
                {/if}
              </kbd>
              {hint.label}
            </span>
          {/each}
        </div>
        <span class="text-label hidden text-ink-muted sm:block">{isDark ? 'Dark' : 'Light'}</span>
      </div>
    </div>
  </div>
{/if}
