<script lang="ts">
  import { toast } from 'svelte-sonner';
  import {
    X,
    Tag as TagIcon,
    Plus,
    Edit2,
    Trash2,
    RotateCw,
    Search
  } from '@lucide/svelte';
  import { deleteTag, type Tag } from '../lib/tags';
  import { tags, tagsStore, isLoadingTags } from '../lib/stores/tags';
  import { Skeleton as Shimmer } from '$lib/components/ds';
  import LoadingDelay from './skeletons/LoadingDelay.svelte';
  import Modal from './Modal.svelte';
  import TagFormModal from './TagFormModal.svelte';

  let { isOpen = $bindable(false), onclose }: { isOpen: boolean; onclose?: () => void } = $props();

  let isLoading = $state(false);
  let deletingTagId = $state<string | null>(null);
  let searchQuery = $state('');

  let showTagFormModal = $state(false);
  let tagFormMode = $state<'create' | 'edit'>('create');
  let editingTag = $state<Tag | null>(null);
  let hasLoadedInitially = $state(false);

  let isAnyLoading = $derived.by(() => $isLoadingTags || isLoading);

  $effect(() => {
    if (isOpen && !hasLoadedInitially) {
      tagsStore.loadTags();
      hasLoadedInitially = true;
    }
    if (!isOpen) {
      hasLoadedInitially = false;
    }
  });

  async function loadTags() {
    isLoading = true;
    try {
      await tagsStore.loadTags();
    } catch {
      toast.error('Failed to load tags');
    } finally {
      isLoading = false;
    }
  }

  function handleCreateNew() {
    tagFormMode = 'create';
    editingTag = null;
    showTagFormModal = true;
  }

  function handleEdit(tag: Tag) {
    tagFormMode = 'edit';
    editingTag = tag;
    showTagFormModal = true;
  }

  function handleTagFormSuccess() {
    loadTags();
  }

  async function handleDelete(tag: Tag) {
    if (deletingTagId === tag.tag) return;
    if (!confirm(`Delete "${tag.name}"?`)) return;

    deletingTagId = tag.tag;
    try {
      await deleteTag(tag.tag);
      tagsStore.removeTag(tag.tag);
      toast.success('Tag deleted');
    } catch {
      toast.error('Failed to delete tag');
    } finally {
      deletingTagId = null;
    }
  }

  function handleRefresh() {
    tagsStore.loadTags(true);
  }

  function handleClose() {
    isOpen = false;
    onclose?.();
  }

  let filteredTags = $derived(
    searchQuery.trim()
      ? $tags.filter(t =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : $tags
  );
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-lg">
  <div class="mb-5 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-md bg-tile-violet text-ink-on-dark">
        <TagIcon class="size-5" />
      </div>
      <h2 class="text-title text-ink">Manage tags</h2>
      <span class="font-mono text-xs text-ink-muted">{filteredTags.length}</span>
    </div>
    <div class="flex items-center gap-1">
      <button onclick={handleRefresh} disabled={isAnyLoading} class="btn-icon" title="Refresh" aria-label="Refresh">
        <RotateCw class="size-4 {isAnyLoading ? 'animate-spin' : ''}" />
      </button>
      <button onclick={handleCreateNew} class="btn-icon" title="New tag" aria-label="New tag">
        <Plus class="size-4" />
      </button>
      <button onclick={handleClose} class="btn-icon" aria-label="Close">
        <X class="size-5" />
      </button>
    </div>
  </div>

  <div class="relative mb-4">
    <Search class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
    <input type="text" class="input !pl-10" placeholder="Search tags..." bind:value={searchQuery} />
  </div>

  <div class="max-h-[50vh] overflow-y-auto">
    {#if isAnyLoading && $tags.length === 0}
      <!-- Tag rows are bg-control already, so each placeholder is a whole row. -->
      <LoadingDelay label="Loading tags" class="grid grid-cols-2 gap-2">
        {#each Array.from({ length: 8 }, (_, i) => i) as i (i)}<Shimmer height={52} class="rounded-md" />{/each}
      </LoadingDelay>
    {:else if filteredTags.length === 0}
      <div class="py-10 text-center">
        <TagIcon class="mx-auto mb-2 size-8 text-ink-muted" />
        <p class="text-body-sm text-ink-muted">
          {searchQuery ? 'No tags found' : 'No tags yet'}
        </p>
        {#if !searchQuery}
          <button onclick={handleCreateNew} class="mt-2 text-body-sm text-accent-text hover:underline">
            Create your first tag
          </button>
        {/if}
      </div>
    {:else}
      <div class="grid grid-cols-2 gap-2">
        {#each filteredTags as tag (tag.id)}
          {@const hasColor = !!tag.color}
          <div class="group flex items-center justify-between rounded-md bg-control px-3 py-2 transition-colors hover:bg-control-hover">
            <div class="flex min-w-0 items-center gap-2">
              <span
                class="size-2.5 shrink-0 rounded-pill {hasColor ? '' : 'bg-accent'}"
                style={hasColor ? `background-color: ${tag.color}` : ''}
                aria-hidden="true"
              ></span>
              <div class="min-w-0">
                <span class="block truncate text-body-sm font-medium text-ink">
                  {tag.name}
                </span>
                <span class="block truncate font-mono text-xs text-ink-muted">
                  {tag.tag}
                </span>
              </div>
            </div>
            <div class="ml-1 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <button onclick={() => handleEdit(tag)} class="btn-icon !h-7 !min-w-7 !px-0" title="Edit" aria-label="Edit tag">
                <Edit2 class="size-3.5" />
              </button>
              <button
                onclick={() => handleDelete(tag)}
                disabled={deletingTagId === tag.tag}
                class="btn-icon !h-7 !min-w-7 !px-0 hover:!text-negative"
                title="Delete"
                aria-label="Delete tag"
              >
                {#if deletingTagId === tag.tag}
                  <RotateCw class="size-3.5 animate-spin" />
                {:else}
                  <Trash2 class="size-3.5" />
                {/if}
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="mt-4 flex items-center justify-between pt-5">
    <span class="font-mono text-xs text-ink-muted">
      {$tags.length} tag{$tags.length !== 1 ? 's' : ''}
    </span>
    <button onclick={handleClose} class="btn btn-primary">Done</button>
  </div>
</Modal>

<TagFormModal
  bind:isOpen={showTagFormModal}
  mode={tagFormMode}
  tag={editingTag}
  onSuccess={handleTagFormSuccess}
/>
