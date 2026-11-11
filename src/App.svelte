<script lang="ts">
  import { onMount } from 'svelte';
  import { createRouter } from './lib/router';
  import Router from './lib/Router.svelte';
  import Navigation from './components/Navigation.svelte';
  import ScrollToTop from './components/ScrollToTop.svelte';
  import { theme } from './lib/theme.svelte';
  import LoveIcon from './components/icons/LoveIcon.svelte';
  import Thanks from './components/Thanks.svelte';
  import Modal from './components/Modal.svelte';
  import OfflineIndicator from './components/OfflineIndicator.svelte';
  import { Toaster } from 'svelte-sonner';
  import { allRoutes } from './routes/index';
  import { router } from './lib/router';

  let currentPath = $state('/');

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
  class="relative flex min-h-screen flex-col justify-between bg-canvas text-ink"
  style="isolation: isolate;"
>
  <Navigation />
  <ScrollToTop />
  <div class="flex-1">
    <div class="mx-auto w-full max-w-[1184px] px-4 md:px-8">
      <Router />
    </div>
  </div>

  {#if currentPath !== '/'}
    <footer
      class="mt-12 flex items-center justify-center py-8 text-body-sm font-normal text-ink-muted"
    >
      Made with
      <button
        type="button"
        onclick={openThanksModal}
        aria-label="View credits"
        class="mx-1 inline-flex items-center rounded-pill align-middle text-negative transition-transform duration-150 hover:-rotate-6"
      >
        <LoveIcon class="size-4" />
      </button>
      at Sidoarjo.
    </footer>
  {/if}
</div>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  <Thanks />
</Modal>

<!-- PWA Components -->
<OfflineIndicator />

<Toaster position="top-center" theme={theme.light ? 'light' : 'dark'} />
