<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte';
  import { getCategoryOfTool } from '../lib/toolsConfig';
  import { Button, PageHeader, categoryTone } from '$lib/components/ds';

  interface Props {
    title: string;
    description: string;
    icon: typeof import('@lucide/svelte').ChevronLeft;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'secondary';
    children: import('svelte').Snippet;
  }

  // `color` is accepted for compatibility; the tile tone now comes from the tool's category.
  let { title, description, icon: Icon, children }: Props = $props();

  const toolId = window.location.pathname.split('/').filter(Boolean).pop() ?? '';
  const category = getCategoryOfTool(toolId);
  const tone = category ? categoryTone[category.id] : 'violet';

  // Last word of the title is highlighted in accent-text (PageHeader convention).
  const words = $derived(title.trim().split(' '));
  const highlight = $derived(words.length > 1 ? words[words.length - 1] : undefined);
  const lead = $derived(words.length > 1 ? words.slice(0, -1).join(' ') : title);
</script>

<svelte:head>
  <title>{title} - Developer Tools</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="mx-auto flex max-w-[1120px] flex-col pt-16 pb-12">
  <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-3">
    <Button variant="secondary" size="sm" href="/tools">
      {#snippet icon()}<ChevronLeft class="size-4" />{/snippet}
      All tools
    </Button>
    <ol class="text-label flex items-center gap-2 text-ink-muted">
      <li><a href="/" class="hover:text-ink">Home</a></li>
      <li aria-hidden="true">·</li>
      <li><a href="/tools" class="hover:text-ink">Tools</a></li>
      <li aria-hidden="true">·</li>
      <li class="max-w-[200px] truncate text-ink" aria-current="page">{title}</li>
    </ol>
  </nav>

  <PageHeader
    title={lead}
    {highlight}
    subtitle={description}
    badge={category?.shortName.toUpperCase()}
    iconTone={tone}
  >
    {#snippet icon()}<Icon />{/snippet}
  </PageHeader>

  <div class="flex flex-col gap-4">
    {@render children()}
  </div>
</div>
