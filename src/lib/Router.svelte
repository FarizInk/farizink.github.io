<script lang="ts">
  import { router, type RouterState } from './router.js';

  let routerState: RouterState = $state({
    currentPath: '/',
    currentRoute: null,
    params: {}
  });

  // Subscribe to router state changes
  router.subscribe((state) => {
    routerState = state;
  });
</script>

{#if routerState.currentRoute}
  {@const Component = routerState.currentRoute.component}
  <Component params={routerState.params} />
{:else}
  <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
    <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
      Go Home
    </a>
  </div>
{/if}
