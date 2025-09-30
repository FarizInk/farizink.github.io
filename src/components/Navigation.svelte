<script lang="ts">
  import { navigate } from '../lib/router.js';
  import { onMount } from 'svelte';
  import { Sun, Moon } from '@lucide/svelte';

  let isDark = $state(false);

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
  });
</script>

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
        onclick={(e) => handleNavigation(e, '/tools')}
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
