<script lang="ts">
  import type { Component } from 'svelte';
  import { router } from './router';
  import type { RouterState } from './router';
  import { Button, EmptyState } from '$lib/components/ds';
  import LoadingDelay from '../components/skeletons/LoadingDelay.svelte';

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
  // a route renders synchronously instead of showing the loading bar.
  const componentCache = new Map<string, Component>();

  // Derive a friendly label from the route title (e.g. "Notes - Fariz" → "Loading Notes…")
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
          <!-- The page chunk is still downloading: a thin accent bar, no guessed page shape. -->
          <LoadingDelay label={routeLabel(route.title)} delay={150} class="min-h-[70vh]">
            <div class="fz-route-progress"></div>
          </LoadingDelay>
        {:then mod}
          {@const Component = mod.default}
          <Component params={routerState.params} />
        {/await}
      {/if}
    {/key}
  {:else}
    <div class="flex min-h-[70vh] items-center justify-center">
      <EmptyState
        code="404"
        title="Page not found"
        text="This page vanished into the digital void. Head home or try one of the tools."
      >
        {#snippet actions()}
          <Button href="/">Back to home</Button>
          <Button variant="secondary" href="/tools">Browse tools</Button>
        {/snippet}
      </EmptyState>
    </div>
  {/if}
</div>
