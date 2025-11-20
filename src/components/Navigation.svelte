<script lang="ts">
  import { navigate } from '../lib/router.js';
  import { onMount } from 'svelte';
  import { Sun, Moon } from '@lucide/svelte';
  import CommandPalette from './CommandPalette.svelte';

  let isDark = $state(false);
  let isCommandPaletteOpen = $state(false);

  function handleNavigation(event: MouseEvent, href: string) {
    event.preventDefault();
    navigate(href);
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

    // Add global event listeners
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<!-- Command Palette Modal -->
<CommandPalette bind:isOpen={isCommandPaletteOpen} />

<!-- Bottom Center Floating Navigation (Compact) -->
<div
  class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 px-3 py-2 transition-all duration-300"
>
  <!-- Navigation Menu (Compact Layout) -->
  <div class="flex items-center gap-1">
    <!-- Home -->
    <a
      href="/"
      class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-all"
      onclick={e => handleNavigation(e, '/')}
    >
      Home
    </a>

    <!-- Tools -->
    <a
      href="/tools"
      class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-all"
      onclick={e => handleNavigation(e, '/tools')}
    >
      Tools
    </a>

    <!-- Theme Toggle -->
    <button
      onclick={toggleTheme}
      class="w-10 h-8 rounded-lg bg-primary-600 hover:bg-primary-700 flex items-center justify-center transition-all transform hover:scale-105"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {#if isDark}
        <Sun class="w-4 h-4 text-white" />
      {:else}
        <Moon class="w-4 h-4 text-white" />
      {/if}
    </button>
  </div>
</div>
