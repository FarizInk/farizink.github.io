<script lang="ts">
  import { navigate, type Route } from '../lib/router';
  import { allRoutes } from '../routes/index';
  import { Search, Command, LogOut, User, ArrowUpDown, ArrowRight, Sparkles, Sun, Moon } from '@lucide/svelte';
  import { getValidatedAuthState, logout } from '../lib/auth';
  import { onMount } from 'svelte';

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

  // Theme state
  let isDark = $state(false);

  function closeModal() {
    isOpen = false;
    searchQuery = '';
    selectedIndex = 0;
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

  // Sync theme state from localStorage
  function syncThemeFromStorage() {
    if (typeof localStorage === 'undefined') return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Apply theme to html
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  function navigateToRoute(route: { path: string; title?: string; description?: string }, event?: Event) {
    // Stop event propagation to prevent it from reaching the login modal backdrop
    event?.stopPropagation();

    // Handle special routes like login
    if (route.path === '/login') {
      // Dispatch custom event to Navigation component
      const evt = new CustomEvent('open-login-modal');
      document.dispatchEvent(evt);
      closeModal();
    } else if (route.path === '/logout') {
      handleLogout();
      closeModal();
    } else {
      navigate(route.path);
      closeModal();
    }
  }

  async function handleLogout() {
    await logout();
    await updateAuthState(); // Refresh auth state
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
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Auth':
        return 'bg-purple-100 text-purple-700 dark:bg-primary-900/30 dark:text-primary-300';
      default:
        return 'bg-warning-100 text-warning-700 dark:bg-primary-900/30 dark:text-warning-300';
    }
  }

  // Default icon for routes without one
  const DefaultIcon = Sparkles;

  // Create dynamic routes based on auth state
  let dynamicRoutes = $derived.by(() => {
    const baseRoutes = allRoutes.filter(route => route.path !== '/login');
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

  // Update auth state when component mounts and listen for auth changes
  onMount(() => {
    // Sync theme and auth from localStorage
    syncThemeFromStorage();
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

    // Listen for theme changes from other components
    const handleThemeChange = () => {
      syncThemeFromStorage();
    };

    document.addEventListener('login-success', handleLoginSuccess);
    document.addEventListener('logout-success', handleLogoutSuccess);
    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('theme-changed', handleThemeChange);

    return () => {
      document.removeEventListener('login-success', handleLoginSuccess);
      document.removeEventListener('logout-success', handleLogoutSuccess);
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('theme-changed', handleThemeChange);
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
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-start justify-center pt-[15vh] animate-in fade-in duration-200"
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
    <!-- Modal -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-top-10 duration-300"
      role="document"
    >
      <!-- Header with Search -->
      <div class="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <Command class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="command-palette-title" class="text-lg font-bold text-gray-900 dark:text-white">
                Command Palette
              </h2>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Search pages, tools, and settings
              </p>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button
            onclick={toggleTheme}
            class="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:border-warning-400 dark:hover:border-primary-400 hover:shadow-md transition-all group"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {#if isDark}
              <Sun class="w-5 h-5 text-warning-600 dark:text-warning-400 group-hover:scale-110 transition-transform" />
            {:else}
              <Moon class="w-5 h-5 text-purple-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            {/if}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative flex items-center">
          <Search class="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            id="command-palette-search"
            type="text"
            placeholder="Search anything..."
            class="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-warning-500 dark:focus:border-purple-500 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] transition-all"
            bind:value={searchQuery}
            autocomplete="off"
          />
          {#if searchQuery}
            <button
              onclick={() => (searchQuery = '')}
              class="absolute right-3 w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              aria-label="Clear search"
            >
              <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      </div>

      <!-- Results -->
      <div class="max-h-96 overflow-y-auto command-palette-list">
        {#if filteredRoutes.length > 0}
          <div class="p-2">
            {#each filteredRoutes as route, i (route.path)}
              {@const IconComp = route.icon || DefaultIcon}
              <button
                class="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group {i === selectedIndex
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-2 border-warning-400 dark:border-primary-400 shadow-md'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-2 border-transparent'}"
                onclick={(e) => navigateToRoute(route, e)}
                onkeydown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateToRoute(route, e);
                  }
                }}
                role="option"
                aria-selected={i === selectedIndex}
                data-selected={i === selectedIndex}
                tabindex={i === 0 ? 0 : -1}
              >
                <!-- Icon -->
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center {i === selectedIndex
                    ? 'bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-primary-500 dark:to-primary-600 shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}"
                >
                  <IconComp
                    class="w-5 h-5 {i === selectedIndex ? 'text-white' : 'text-gray-600 dark:text-gray-400'}"
                  />
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0 text-left">
                  <div class="font-semibold text-gray-900 dark:text-white truncate flex items-center gap-2">
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
                  </div>
                  {#if route.path !== '/' && route.path !== '/notes' && route.path !== '/tools' && route.path !== '/login' && route.path !== '/logout'}
                    <div class="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-mono text-xs">
                      {route.path}
                    </div>
                  {/if}
                  {#if route.description && (route.path === '/login' || route.path === '/logout')}
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {route.description}
                    </div>
                  {/if}
                </div>

                <!-- Category Badge -->
                <span
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold {getCategoryColor(route.path)}"
                >
                  {getCategoryLabel(route.path)}
                </span>

                <!-- Arrow for selected -->
                {#if i === selectedIndex}
                  <div class="w-6 h-6 bg-yellow-400 dark:bg-primary-400 rounded-full flex items-center justify-center">
                    <ArrowRight class="w-4 h-4 text-white" />
                  </div>
                {:else}
                  <div class="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight class="w-4 h-4 text-gray-400" />
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        {:else}
          <div class="p-8 text-center">
            <div
              class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Search class="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No results found</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Try searching for "{searchQuery}"
            </p>
          </div>
        {/if}
      </div>

      <!-- Footer with keyboard shortcuts and theme indicator -->
      <div class="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <!-- Keyboard shortcuts -->
          <div class="flex items-center gap-6 text-xs text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <kbd
                class="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 font-mono shadow-sm"
              >
                <ArrowUpDown class="w-3 h-3" />
              </kbd>
              <span>Navigate</span>
            </div>
            <div class="flex items-center gap-2">
              <kbd
                class="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 font-mono shadow-sm"
              >
                ↵
              </kbd>
              <span>Select</span>
            </div>
            <div class="flex items-center gap-2">
              <kbd
                class="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 font-mono shadow-sm"
              >
                esc
              </kbd>
              <span>Close</span>
            </div>
            <div class="flex items-center gap-2">
              <kbd
                class="flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 font-mono shadow-sm"
              >
                <Command class="w-3 h-3" />
                K
              </kbd>
              <span>Open</span>
            </div>
          </div>

          <!-- Theme indicator (visible on mobile/smaller screens) -->
          <div class="hidden sm:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            {#if isDark}
              <Moon class="w-4 h-4 text-purple-600 dark:text-primary-400" />
              <span>Dark</span>
            {:else}
              <Sun class="w-4 h-4 text-warning-600 dark:text-warning-400" />
              <span>Light</span>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
