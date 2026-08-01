<script lang="ts">
  import type { Component } from 'svelte';
  import { router } from './router';
  import type { RouterState } from './router';
  import { toast } from 'svelte-sonner';

  // Subscribe to router state changes with proper Svelte 5 runes
  let routerState: RouterState = $state({
    currentPath: '/',
    currentRoute: null,
    params: {}
  });

  // Subscribe to router store and update state
  const unsubscribe = router.subscribe(state => {
    routerState = state;
  });

  // Cleanup on destroy
  $effect(() => {
    return unsubscribe;
  });

  // Cache of already-loaded lazy route components keyed by path, so revisiting
  // a route renders synchronously instead of flashing the loading toast.
  const componentCache = new Map<string, Component>();

  // Svelte action: show a Sonner loading toast after 1s delay.
  // If the route loads quickly (from cache), the toast never appears.
  function loadingToast(node: HTMLElement, { title }: { title: string }) {
    let id: string | undefined;
    const timer = setTimeout(() => {
      id = toast.loading(title);
    }, 1000);
    return {
      destroy() {
        clearTimeout(timer);
        if (id) toast.dismiss(id);
      }
    };
  }

  // Derive a friendly label from the route title (e.g. "Notes - Fariz" → "Notes")
  function routeLabel(title?: string): string {
    if (!title) return 'Loading page…';
    const clean = title.replace(/\s*[-–—]\s*Fariz$/, '').trim();
    return clean ? `Loading ${clean}…` : 'Loading page…';
  }
</script>

<div class="tv-page">
  {#if routerState.currentRoute}
    {@const route = routerState.currentRoute}
    {@const resolved = componentCache.get(route.path) ?? route.component ?? null}
    {#key route.path}
      {#if resolved}
        {@const Component = resolved}
        <Component params={routerState.params} />
      {:else if route.load}
        {#await route.load().then(mod => {
          componentCache.set(route.path, mod.default);
          return mod;
        })}
          <div use:loadingToast={{ title: routeLabel(route.title) }} class="flex items-center justify-center min-h-[70vh]">
            <div
              class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        {:then mod}
          {@const Component = mod.default}
          <Component params={routerState.params} />
        {/await}
      {/if}
    {/key}
  {:else}
    <div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div class="mb-8">
        <div
          class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-primary-900/20 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            class="w-16 h-16 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"
            ></path>
          </svg>
        </div>
        <h1
          class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          404
        </h1>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Oops! Page Not Found
        </h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
          The page you're looking for seems to have vanished into the digital void. Let's get you back
          to safety!
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="/"
          class="btn btn-primary btn-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Back to Home
        </a>

        <button
          onclick={() => history.back()}
          class="btn btn-secondary inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Go Back
        </button>
      </div>

      <div class="mt-12 text-sm text-gray-500 dark:text-gray-400">
        <p>Lost? Try checking the URL or explore our tools below</p>
      </div>
    </div>
  {/if}
</div>
