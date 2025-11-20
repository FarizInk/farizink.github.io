<script lang="ts">
  import { navigate } from '../lib/router.js';
  import { allRoutes } from '../routes/index.js';
  import { Search, Command } from '@lucide/svelte';

  let { isOpen = $bindable(false) } = $props();

  let searchQuery = $state('');
  let selectedIndex = $state(0);
  let filteredRoutes = $state(allRoutes);

  function closeModal() {
    isOpen = false;
    searchQuery = '';
    selectedIndex = 0;
  }

  function navigateToRoute(route: { path: string; title?: string; description?: string }) {
    navigate(route.path);
    closeModal();
  }

  $effect(() => {
    if (searchQuery.trim() === '') {
      filteredRoutes = allRoutes;
    } else {
      const query = searchQuery.toLowerCase();
      filteredRoutes = allRoutes.filter(route => {
        const title = route.title?.toLowerCase() || '';
        const path = route.path.toLowerCase();
        const description = route.description?.toLowerCase() || '';

        // Extract tool name from path for better search
        const toolName = path.split('/').pop()?.replace(/-/g, ' ') || '';

        return (
          title.includes(query) ||
          path.includes(query) ||
          description.includes(query) ||
          toolName.includes(query)
        );
      });
    }
    selectedIndex = 0;
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
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-start justify-center pt-[20vh]"
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
      class="bg-white dark:bg-secondary-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4 border border-secondary-200 dark:border-secondary-700 overflow-hidden"
      role="document"
    >
      <!-- Search Input -->
      <div
        class="flex items-center px-4 py-3 border-b border-secondary-200 dark:border-secondary-700"
      >
        <Search class="w-5 h-5 text-secondary-500 mr-3" />
        <input
          id="command-palette-search"
          type="text"
          placeholder="Type a command or search..."
          class="flex-1 bg-transparent outline-none text-secondary-900 dark:text-secondary-50 placeholder-secondary-500 dark:placeholder-secondary-500"
          bind:value={searchQuery}
        />
        <div class="flex items-center gap-1 text-xs text-secondary-500">
          <div
            class="flex items-center gap-1 px-2 py-1 bg-secondary-100 dark:bg-secondary-700 rounded"
          >
            <Command class="w-3 h-3" />
            <span>K</span>
          </div>
          <span class="mx-1">to open</span>
        </div>
      </div>

      <!-- Results -->
      <div class="max-h-96 overflow-y-auto command-palette-list">
        {#if filteredRoutes.length > 0}
          <div class="py-2">
            {#each filteredRoutes as route, i (route.path)}
              <div
                class="px-4 py-3 cursor-pointer transition-colors border-l-2 border-transparent {i ===
                selectedIndex
                  ? 'bg-secondary-100 dark:bg-secondary-700 border-primary-500'
                  : 'hover:bg-secondary-50 dark:hover:bg-secondary-600'}"
                onclick={() => navigateToRoute(route)}
                onkeydown={e => (e.key === 'Enter' || e.key === ' ') && navigateToRoute(route)}
                role="option"
                aria-selected={i === selectedIndex}
                data-selected={i === selectedIndex}
                tabindex={i === 0 ? 0 : -1}
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-secondary-900 dark:text-secondary-50 truncate">
                      {route.title?.replace(' - Fariz', '') || route.path}
                    </div>
                    {#if route.path !== '/' && route.path !== '/projects' && route.path !== '/tools'}
                      <div class="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                        {route.path}
                      </div>
                    {/if}
                    {#if route.description && route.path !== '/' && route.path !== '/tools'}
                      <div
                        class="text-sm text-secondary-400 dark:text-secondary-500 mt-1 line-clamp-2"
                      >
                        {route.description}
                      </div>
                    {/if}
                  </div>
                  <div class="ml-4 text-xs text-secondary-400 dark:text-secondary-500">
                    {#if route.path === '/'}Home
                    {:else if route.path === '/projects'}Projects
                    {:else if route.path === '/tools'}Tools
                    {:else}Tool
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="px-4 py-8 text-center text-secondary-500 dark:text-secondary-400">
            <Search class="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div>No results found for "{searchQuery}"</div>
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div
        class="px-4 py-2 bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 text-xs text-secondary-500 dark:text-secondary-400"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <kbd
                class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600"
                >↑↓</kbd
              >
              <span>to navigate</span>
            </div>
            <div class="flex items-center gap-1">
              <kbd
                class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600"
                >↵</kbd
              >
              <span>to select</span>
            </div>
            <div class="flex items-center gap-1">
              <kbd
                class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600"
                >esc</kbd
              >
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
