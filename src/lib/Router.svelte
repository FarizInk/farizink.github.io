<script lang="ts">
  import type { Component } from 'svelte';
  import { router } from './router';
  import type { RouterState } from './router';
  import { toast } from 'svelte-sonner';
  import Skeleton from 'boneyard-js/svelte';
  import { Button, EmptyState } from '$lib/components/ds';

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
          <div use:loadingToast={{ title: routeLabel(route.title) }} class="min-h-[70vh]">
            <Skeleton name={route.path.startsWith('/tools') ? 'route-tool' : 'route-content'} loading={true}>
              <!-- Children render only during boneyard capture (dev), not here. -->
            </Skeleton>
          </div>
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
