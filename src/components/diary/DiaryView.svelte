<script lang="ts">
  import { onMount, tick, untrack } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { SlidersHorizontal } from '@lucide/svelte';
  import { Button, EmptyState, MultiSelect, Skeleton as Shimmer } from '$lib/components/ds';
  import DiaryComposer from './DiaryComposer.svelte';
  import DiaryItem from './DiaryItem.svelte';
  import DiaryEditModal from './DiaryEditModal.svelte';
  import { createNote, deleteNote, getNotes, updateNote, type Note } from '../../lib/notes';
  import { tags, tagsStore } from '../../lib/stores/tags';
  import { readTagIds, sortNewestFirst, writeTagIds, type DiaryEditData } from '../../lib/diary';
  import LoadingDelay from '../skeletons/LoadingDelay.svelte';
  import { scrollTopButton } from '../../lib/scrollTop.svelte';

  let tagIds = $state<string[]>(readTagIds(localStorage));
  let notes = $state<Note[]>([]);
  let page = $state(0);
  let totalPages = $state(1);
  let loading = $state(false);
  let loaded = $state(false);
  let error = $state<string | null>(null);
  let editing = $state<Note | null>(null);
  let showFilter = $state(false);
  let sentinel: HTMLElement | undefined = $state();
  // Bumped whenever the list is reset, so responses for an old filter are dropped.
  let reqId = 0;

  const tagOptions = $derived($tags.map(t => ({ value: t.id, label: t.name || t.tag })));
  const activeTags = $derived(
    tagIds.flatMap(id => $tags.filter(t => t.id === id)).map(t => ({ id: t.id, name: t.name || t.tag }))
  );
  const done = $derived(loaded && page >= totalPages);

  async function loadPage(reset = false) {
    if (reset) {
      reqId++;
      page = 0;
      totalPages = 1;
      notes = [];
      loaded = false;
      loading = false;
    }
    if (loading || page >= totalPages) return;
    const id = reqId;
    loading = true;
    error = null;
    try {
      const res = await getNotes(page + 1, 20, {
        includeTags: tagIds.length ? tagIds : undefined,
        sortBy: 'created_at',
        sortOrder: 'desc'
      });
      if (id !== reqId) return;
      const seen = new Set(notes.map(n => n.id));
      notes = sortNewestFirst([...notes, ...res.notes.filter(n => !seen.has(n.id))]);
      page = res.pagination.page;
      totalPages = res.pagination.totalPages;
      loaded = true;
    } catch (e) {
      if (id !== reqId) return;
      error = e instanceof Error ? e.message : 'Failed to load entries';
    } finally {
      if (id === reqId) loading = false;
    }
    // A short feed may leave the sentinel on screen: keep filling until it scrolls away.
    // Measure after Svelte has rendered the new entries.
    await tick();
    if (id === reqId && !error && sentinelVisible()) loadPage();
  }

  function sentinelVisible(): boolean {
    if (!sentinel) return false;
    const rect = sentinel.getBoundingClientRect();
    return rect.top < window.innerHeight + 400;
  }

  function setTags(ids: string[]) {
    tagIds = ids;
    writeTagIds(localStorage, ids);
    loadPage(true);
  }

  async function create(name: string): Promise<boolean> {
    try {
      const res = await createNote({ name, tags: tagIds, isPublic: true });
      notes = [res.data, ...notes];
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not post the entry');
      return false;
    }
  }

  async function save(id: string, data: DiaryEditData): Promise<boolean> {
    try {
      const res = await updateNote(id, data);
      notes = notes.map(n => (n.id === id ? res.data : n));
      editing = null;
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save the entry');
      return false;
    }
  }

  async function remove(id: string): Promise<boolean> {
    try {
      await deleteNote(id);
      notes = notes.filter(n => n.id !== id);
      editing = null;
      toast.success('Moved to trash');
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not delete the entry');
      return false;
    }
  }

  // Drop stored tag ids that no longer exist on the server (only once tags have loaded).
  $effect(() => {
    const known = $tags;
    if (!known.length) return;
    untrack(() => {
      const kept = tagIds.filter(id => known.some(t => t.id === id));
      if (kept.length !== tagIds.length) setTags(kept);
    });
  });

  onMount(() => {
    tagsStore.loadTags();
    loadPage(true);
  });

  $effect(() => {
    if (!sentinel) return;
    const io = new IntersectionObserver(entries => {
      // Entries can be stale (measured before the last render), so re-check the live position.
      if (entries.some(e => e.isIntersecting) && sentinelVisible()) loadPage();
    }, { rootMargin: '400px' });
    io.observe(sentinel);
    return () => io.disconnect();
  });
</script>

{#snippet entrySkeletons(count: number)}
  <div class="flex flex-col gap-2">
    {#each Array.from({ length: count }, (_, i) => i) as i (i)}
      <div class="flex flex-col gap-2 rounded-lg bg-card p-4">
        <Shimmer width="55%" height={18} />
        <Shimmer variant="text" lines={2} />
      </div>
    {/each}
  </div>
{/snippet}

{#snippet feed(list: Note[])}
  <div class="flex flex-col gap-2">
    {#each list as note (note.id)}
      <DiaryItem {note} onedit={n => (editing = n)} />
    {/each}
  </div>
{/snippet}

<section class="mx-auto flex w-full max-w-[640px] flex-col gap-3 pb-28" aria-label="Diary">
  <div class="flex items-center gap-2">
    <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-code text-ink-muted">
      {#if activeTags.length}
        {#each activeTags as tag (tag.id)}
          <span class="rounded-pill bg-tile-lilac px-2.5 py-0.5 text-xs text-ink-on-bright">{tag.name}</span>
        {/each}
      {:else}
        <span>All notes</span>
      {/if}
    </div>
    <Button variant="ghost" size="sm" onclick={() => (showFilter = !showFilter)} aria-expanded={showFilter}>
      <SlidersHorizontal class="size-4" /> Tags
    </Button>
  </div>

  {#if showFilter}
    <div class="rounded-lg bg-card p-3">
      <MultiSelect
        label="Diary tags"
        options={tagOptions}
        value={tagIds}
        onchange={setTags}
        placeholder="All notes"
        hint="New entries get these tags. Empty shows every note."
      />
    </div>
  {/if}

  <!-- Pinned to the bottom on every width. While the back-to-top button (fixed right-5 bottom-6, 44px)
       is showing, the composer makes room for it; wider screens keep equal gutters so it stays centred. -->
  <div
    class="fixed bottom-4 left-4 z-30 transition-[left,right] duration-base ease-soft {scrollTopButton.visible
      ? 'right-[72px] sm:left-[72px]'
      : 'right-4'}"
  >
    <div class="mx-auto max-w-[640px]">
      <DiaryComposer onsubmit={create} />
    </div>
  </div>

  {#if !loaded && loading}
    <LoadingDelay label="Loading entries">{@render entrySkeletons(4)}</LoadingDelay>
  {:else if error && !notes.length}
    <EmptyState title="Couldn't load entries" text={error}>
      {#snippet actions()}
        <Button variant="secondary" onclick={() => loadPage(true)}>Retry</Button>
      {/snippet}
    </EmptyState>
  {:else if loaded && !notes.length}
    <EmptyState title="No entries yet — write the first one above" />
  {:else}
    {@render feed(notes)}
  {/if}

  <div bind:this={sentinel} aria-hidden="true"></div>

  {#if loaded && loading}
    <LoadingDelay label="Loading more entries">{@render entrySkeletons(2)}</LoadingDelay>
  {:else if error && notes.length}
    <div class="flex justify-center py-2">
      <Button variant="secondary" size="sm" onclick={() => loadPage()}>Retry</Button>
    </div>
  {:else if done && notes.length}
    <p class="py-3 text-center text-code text-ink-muted">That's everything</p>
  {/if}
</section>

<DiaryEditModal note={editing} onsave={save} ondelete={remove} onclose={() => (editing = null)} />
