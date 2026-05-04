<script lang="ts">
  import { navigate } from '../lib/router';
  import { Search, Sparkles, X } from '@lucide/svelte';
  import { toolsByCategory } from '../lib/toolsConfig';

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

  const totalTools = $derived(toolsByCategory.flatMap(c => c.tools).length);
</script>

<svelte:head>
  <title>Developer Tools - Collection of Useful Tools</title>
  <meta
    name="description"
    content="A collection of useful developer tools including JSON formatter, color converter, password generator, and more."
  />
</svelte:head>

<div class="tools-page">
  <!-- Hero Section -->
  <div class="tools-hero-section">
    <div
      class="tools-hero-badge inline-flex items-center gap-2 px-4 py-2 bg-warning-100 dark:bg-primary-900/30 border border-warning-300 dark:border-primary-700 rounded-full text-warning-700 dark:text-warning-300 text-sm font-medium"
    >
      <Sparkles class="w-4 h-4" />
      <span>{totalTools} Tools Available</span>
    </div>

    <h1 class="tools-hero-title">
      <span class="text-gray-900 dark:text-white">Developer</span>
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400 dark:from-primary-400 to-purple-500 bg-gradient-to-l"
        >Tools</span
      >
    </h1>

    <p class="tools-hero-description">
      Essential utilities crafted for developers, designers, and creators. Fast, free, and
      privacy-focused.
    </p>

    <!-- Search Bar -->
    <div class="peer relative max-w-500 mx-auto flex items-center p-3.5 border-2 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg transition-all border-warning-500/20 dark:border-primary-500/20 focus-within:border-warning-500 focus-within:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:focus-within:border-purple-500 dark:focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]">
      <Search class="mr-3 text-gray-400 dark:text-gray-500 transition-colors peer-focus:dark:text-primary-400 peer-focus:text-yellow-500" />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search tools..."
        class="flex-1 border-none bg-transparent text-base text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      {#if searchQuery}
        <button onclick={() => (searchQuery = '')} class="tools-search-clear" aria-label="Clear search">
          <X class="w-3 h-3" />
        </button>
      {/if}
    </div>
  </div>

  <!-- Category Tabs -->
  <div class="flex flex-wrap justify-center gap-2 mb-8">
    {#each categories as category (category)}
      <button
        onclick={() => (selectedCategory = category)}
        class="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-sm transition-all {selectedCategory ===
        category
          ? 'bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-primary-600 dark:to-primary-500 border-transparent text-white shadow-lg'
          : 'text-gray-600 dark:text-gray-400 hover:bg-warning-50 dark:hover:bg-gray-700 hover:border-warning-500/50 dark:hover:border-primary-500/50 hover:-translate-y-0.5'}"
      >
        {category}
        <span
          class="flex items-center justify-center min-w-7 h-6 px-2 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-bold {selectedCategory ===
          category
            ? 'bg-white/20 text-white'
            : 'text-gray-600 dark:text-gray-400'}"
        >
          {getCategoryCount(category)}
        </span>
      </button>
    {/each}
  </div>

  <!-- Tools Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredTools as tool, index (tool.id)}
      <button
        onclick={() => navigateToTool(tool.id)}
        onkeydown={e => handleKeydown(e, tool.id)}
        class="flex gap-4 p-5 bg-white/90 dark:bg-gray-900/90 border border-black/6 dark:border-white/8 rounded-xl text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-warning-500/30 dark:hover:border-primary-500/30 hover:shadow-yellow-500/15 dark:hover:shadow-purple-500/15 focus:outline-none focus:border-warning-500 dark:focus:border-purple-500 focus:ring-3 focus:ring-yellow-500/20 dark:focus:ring-purple-500/20"
        style="animation-delay: {index * 50}ms"
        tabindex="0"
        aria-label="Open {tool.name}"
      >
        <div
          class="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-primary-900/30 dark:to-primary-800/30 text-warning-700 dark:text-primary-400"
        >
          <tool.icon class="w-6 h-6" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
            {#if tool.comingSoon}
              <span
                class="px-2 py-0.5 bg-warning-500/15 dark:bg-primary-500/15 text-warning-700 dark:text-primary-400 text-xs font-semibold rounded-full uppercase tracking-wider"
                >Soon</span
              >
            {/if}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {tool.description}
          </p>

          <div class="flex flex-wrap gap-1.5">
            {#each tool.features.slice(0, 3) as feature (feature)}
              <span
                class="px-2 py-1 bg-black/4 dark:bg-white/6 rounded-md text-gray-600 dark:text-gray-400 text-xs font-medium"
                >{feature}</span
              >
            {/each}
            {#if tool.features.length > 3}
              <span
                class="px-2 py-1 bg-warning-500/10 dark:bg-primary-500/10 text-warning-700 dark:text-primary-400 rounded-md text-xs font-medium"
                >+{tool.features.length - 3}</span
              >
            {/if}
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- No Results -->
  {#if filteredTools.length === 0}
    <div
      class="text-center py-16 px-8 bg-white/90 dark:bg-gray-900/90 rounded-xl border border-dashed border-black/10 dark:border-white/10"
    >
      <div
        class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-warning-500/10 dark:bg-primary-500/10 rounded-full text-yellow-500 dark:text-primary-400"
      >
        <Search class="w-12 h-12" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tools found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Try adjusting your search or browse all categories
      </p>
      <button
        onclick={() => (searchQuery = '')}
        class="inline-flex items-center gap-2 px-4 py-2 bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-all"
      >
        Clear Search
      </button>
    </div>
  {/if}
</div>

