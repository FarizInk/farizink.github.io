<script lang="ts">
  import { onMount } from 'svelte';
  import { createRouter } from './lib/router.js';
  import Router from './lib/Router.svelte';
  import Navigation from './components/Navigation.svelte';
  import PixelBackground from './components/PixelBackground.svelte';
  import LoveIcon from './components/icons/LoveIcon.svelte';
  import Thanks from './components/Thanks.svelte';
  import Modal from './components/Modal.svelte';
  import { Toaster } from 'svelte-sonner';
  import { allRoutes } from './routes/index.js';

  let isDark = $state(false);

  onMount(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Listen for theme changes
    const handleThemeChange = () => {
      const theme = localStorage.getItem('theme');
      isDark =
        theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    // Listen for storage changes and system theme changes
    window.addEventListener('storage', handleThemeChange);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    // Also listen for custom theme changes
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleThemeChange);
      observer.disconnect();
    };
  });

  // Use split routes
  const routes = allRoutes;

  let showThanksModal = $state(false);

  const openThanksModal = () => {
    showThanksModal = true;
  };

  const closeThanksModal = () => {
    showThanksModal = false;
  };

  onMount(() => {
    createRouter(routes);
  });
</script>

<div class="min-h-screen flex flex-col justify-between relative">
  <PixelBackground />
  <Navigation />
  <div class="flex-1 pt-[56px]">
    <div class="container mx-auto">
      <Router />
    </div>
  </div>

  <footer class="flex justify-center items-center text-black dark:text-white py-4">
    Made with <button type="button" onclick={openThanksModal} class="hover:cursor-pointer">
      <LoveIcon class="w-5 h-5 mx-1 text-rose-600" />
    </button> in Surabaya.
  </footer>
</div>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  <Thanks />
</Modal>

<Toaster position="top-center" theme={isDark ? 'dark' : 'light'} />
