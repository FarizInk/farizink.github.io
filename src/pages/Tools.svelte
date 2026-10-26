<script lang="ts">
  import { Search } from '@lucide/svelte';
  import { toolsByCategory } from '../lib/toolsConfig';
  import {
    Button,
    FilterTabs,
    PageHeader,
    SearchField,
    ToolCard,
    categoryTone
  } from '$lib/components/ds';

  let searchQuery = $state('');
  let selectedCategory = $state('all');

  const allTools = toolsByCategory.flatMap(category =>
    category.tools.map(tool => ({ ...tool, tone: categoryTone[category.id] }))
  );

  const tabs = [
    { id: 'all', label: 'All', count: allTools.length },
    ...toolsByCategory.map(c => ({ id: c.id, label: c.shortName, count: c.tools.length }))
  ];

  const filteredTools = $derived.by(() => {
    let tools =
      selectedCategory === 'all'
        ? allTools
        : allTools.filter(tool =>
            toolsByCategory.find(c => c.id === selectedCategory)?.tools.some(t => t.id === tool.id)
          );

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      tools = tools.filter(
        tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    return tools;
  });

  // Ctrl/Cmd + Shift + F focuses the search field (hinted inside it)
  function handleKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      document.querySelector<HTMLInputElement>('#tools-search input')?.focus();
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

<svelte:window onkeydown={handleKeydown} />

<div class="mx-auto flex max-w-[1120px] flex-col gap-6 pt-16 pb-12">
  <PageHeader
    align="center"
    badge="{allTools.length} TOOLS"
    title="Developer"
    highlight="Tools"
    subtitle="Essential utilities for developers, designers, and creators. Fast, free, and private."
  />

  <div id="tools-search">
    <SearchField bind:value={searchQuery} placeholder="Search tools…" shortcut="Ctrl ⇧ F" />
  </div>

  <FilterTabs items={tabs} bind:value={selectedCategory} />

  {#if filteredTools.length > 0}
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each filteredTools as tool (tool.id)}
        <ToolCard
          name={tool.name}
          description={tool.description}
          tone={tool.tone}
          features={tool.features}
          href="/tools/{tool.id}"
        >
          {#snippet icon()}<tool.icon />{/snippet}
        </ToolCard>
      {/each}
    </div>
  {:else}
    <div class="rounded-lg bg-card">
      <div class="flex flex-col items-center gap-3 px-6 py-12 text-center">
        <span class="grid size-14 place-items-center rounded-pill bg-control text-ink-muted">
          <Search class="size-6" />
        </span>
        <h2 class="text-title m-0">No tools found</h2>
        <p class="m-0 text-ink-muted">Nothing matches "{searchQuery}". Try another word or category.</p>
        <Button
          variant="secondary"
          onclick={() => {
            searchQuery = '';
            selectedCategory = 'all';
          }}
        >
          Clear filters
        </Button>
      </div>
    </div>
  {/if}
</div>
