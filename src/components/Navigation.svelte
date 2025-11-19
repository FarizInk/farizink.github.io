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
      item.classList.remove(
        'bg-[var(--ds-secondary-100)]',
        'dark:bg-[var(--ds-secondary-700)]',
        'border-[var(--ds-primary-500)]'
      );
      item.classList.add('border-transparent');
      item.setAttribute('data-selected', 'false');
    });

    // Add selection to target item
    if (items[index]) {
      items[index].classList.add(
        'bg-[var(--ds-secondary-100)]',
        'dark:bg-[var(--ds-secondary-700)]',
        'border-[var(--ds-primary-500)]'
      );
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

    // Add global keyboard event listener
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<!-- Command Palette Modal -->
<CommandPalette bind:isOpen={isCommandPaletteOpen} />

<nav class="mb-8 w-full backdrop-blur-xs py-4 fixed top-0 z-40">
  <div class="flex justify-between items-center px-6">
    <!-- Navigation Links -->
    <div class="flex space-x-6">
      <a
        href="/"
        class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
        onclick={e => handleNavigation(e, '/')}
      >
        Home
      </a>

      <a
        href="/projects"
        class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
        onclick={e => handleNavigation(e, '/projects')}
      >
        Projects
      </a>

      <a
        href="/tools"
        class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
        onclick={e => handleNavigation(e, '/tools')}
      >
        Tools
      </a>
    </div>

    <!-- Theme Switcher -->
    <button
      onclick={toggleTheme}
      class="hover:cursor-pointer p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {#if isDark}
        <!-- Sun icon for light mode -->
        <Sun class="w-5 h-5" />
      {:else}
        <!-- Moon icon for dark mode -->
        <Moon class="w-5 h-5" />
      {/if}
    </button>
  </div>
</nav>
