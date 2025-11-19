<script lang="ts">
  import { navigate } from '../lib/router.js';
  import { Search, ChevronRight } from '@lucide/svelte';
  import { toolsByCategory } from '../lib/toolsConfig.js';

  let searchQuery = $state('');
  let selectedCategory = $state('All');

  const categories = ['All', ...toolsByCategory.map(c => c.name)];

  // Filter tools based on search query and selected category
  const filteredTools = $derived.by(() => {
    let tools = toolsByCategory.flatMap(category => category.tools);

    // Filter by category first
    if (selectedCategory !== 'All') {
      tools = toolsByCategory.find(c => c.name === selectedCategory)?.tools || [];
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      tools = tools.filter(
        tool =>
          tool.name.toLowerCase().includes(lowercaseQuery) ||
          tool.description.toLowerCase().includes(lowercaseQuery) ||
          tool.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
      );
    }

    return tools;
  });

  // Get tool count for each category
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') {
      return toolsByCategory.flatMap(c => c.tools).length;
    }
    return toolsByCategory.find(c => c.name === categoryName)?.tools.length || 0;
  };

  function navigateToTool(toolId: string) {
    navigate(`/tools/${toolId}`);
  }

  function handleKeydown(e: KeyboardEvent, toolId: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateToTool(toolId);
    }
  }
</script>

<svelte:head>
  <title>Developer Tools - Collection of Useful Tools</title>
  <meta
    name="description"
    content="A collection of useful developer tools including JSON formatter, color converter, password generator, and more."
  />
</svelte:head>

<div class="container mx-auto px-4 py-6 max-w-4xl">
  <!-- Header -->
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Tools</h1>
    <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Essential tools for developers, designers, and power users.
    </p>
  </div>

  <!-- Search Bar -->
  <div class="max-w-md mx-auto mb-6">
    <div class="relative">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search tools..."
        class="input w-full !pl-10 text-sm"
      />
    </div>
  </div>

  <!-- Category Filter -->
  <div class="flex flex-wrap justify-center gap-1 mb-6">
    {#each categories as category (category)}
      <button
        onclick={() => (selectedCategory = category)}
        class="btn btn-sm {selectedCategory === category ? 'btn-primary' : 'btn-secondary'}"
      >
        {category}
        <span class="badge badge-primary ml-1">{getCategoryCount(category)}</span>
      </button>
    {/each}
  </div>

  <!-- Tools List -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"
  >
    {#each filteredTools as tool, index (tool.id)}
      <button
        onclick={() => navigateToTool(tool.id)}
        onkeydown={e => handleKeydown(e, tool.id)}
        class="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset group"
        tabindex="0"
        aria-label="Open {tool.name}"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <tool.icon class="w-5 h-5 text-white" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3
                  class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  {tool.name}
                </h3>
                <!-- Tool Number Badge -->
                <div class="badge badge-primary text-xs font-bold">
                  {index + 1}
                </div>
                {#if tool.comingSoon}
                  <span class="badge badge-warning"> Coming Soon </span>
                {/if}
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                {tool.description}
              </p>
            </div>
          </div>

          <ChevronRight
            class="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 ml-3"
          />
        </div>

        <!-- Features Tags -->
        <div class="flex flex-wrap gap-1 mt-3 ml-[3.5rem]">
          {#each tool.features.slice(0, 4) as feature (feature)}
            <span class="badge">
              {feature}
            </span>
          {/each}
          {#if tool.features.length > 4}
            <span class="badge">
              +{tool.features.length - 4}
            </span>
          {/if}
        </div>
      </button>
    {/each}
  </div>

  <!-- No Results -->
  {#if filteredTools.length === 0}
    <div
      class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div class="text-gray-400 mb-4">
        <Search class="w-12 h-12 mx-auto" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tools found</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Try adjusting your search terms or browse all categories.
      </p>
    </div>
  {/if}
</div>

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
