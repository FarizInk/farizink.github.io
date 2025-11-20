<script lang="ts">
  import { onMount } from 'svelte';
  import { createRouter } from './lib/router.js';
  import Router from './lib/Router.svelte';
  import Navigation from './components/Navigation.svelte';
  import ScrollToTop from './components/ScrollToTop.svelte';
  import PixelBackground from './components/PixelBackground.svelte';
  import LoveIcon from './components/icons/LoveIcon.svelte';
  import Thanks from './components/Thanks.svelte';
  import Modal from './components/Modal.svelte';
  import PWAInstallPrompt from './components/PWAInstallPrompt.svelte';
  import OfflineIndicator from './components/OfflineIndicator.svelte';
  import { Toaster } from 'svelte-sonner';
  import { allRoutes } from './routes/index.js';
  import { router } from './lib/router.js';

  let isDark = $state(false);
  let currentPath = $state('/');

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

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Subscribe to router changes to track current path
    const unsubscribe = router.subscribe(routerState => {
      currentPath = routerState.currentPath;
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<div
  class="min-h-screen flex flex-col justify-between relative bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300"
>
  <PixelBackground />
  <Navigation />
  <ScrollToTop />
  <div class="flex-1">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <Router />
    </div>
  </div>

  {#if currentPath !== '/'}
    <footer
      class="flex justify-center items-center text-secondary-600 dark:text-secondary-400 py-8 mt-12 border-t border-secondary-200 dark:border-secondary-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm"
    >
      Made with <button
        type="button"
        onclick={openThanksModal}
        class="hover:cursor-pointer hover:scale-110 transition-transform duration-200"
      >
        <LoveIcon class="w-5 h-5 mx-1 text-rose-600" />
      </button> in Surabaya.
    </footer>
  {/if}
</div>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  <Thanks />
</Modal>

<!-- PWA Components -->
<PWAInstallPrompt />
<OfflineIndicator />

<Toaster position="top-center" theme={isDark ? 'dark' : 'light'} />
