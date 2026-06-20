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
  <div class="flex items-center justify-between mb-5">
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white">Manage Tags</h2>
      <span class="text-xs text-gray-400">{filteredTags.length}</span>
    </div>
    <div class="flex items-center gap-1">
      <button
        onclick={handleRefresh}
        disabled={isAnyLoading}
        class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        title="Refresh"
      >
        <RotateCw class="w-4 h-4 {isAnyLoading ? 'animate-spin' : ''}" />
      </button>
      <button
        onclick={handleCreateNew}
        class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700"
        title="New tag"
      >
        <Plus class="w-4 h-4" />
      </button>
      <button
        onclick={handleClose}
        class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <X class="w-5 h-5 text-gray-500" />
      </button>
    </div>
  </div>

  <div class="mb-4 relative">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    <input
      type="text"
      class="input !pl-10"
      placeholder="Search tags..."
      bind:value={searchQuery}
    />
  </div>

  <div class="max-h-[50vh] overflow-y-auto">
    {#if isAnyLoading && $tags.length === 0}
      <div class="flex items-center justify-center py-10">
        <RotateCw class="w-5 h-5 animate-spin text-gray-400" />
      </div>
    {:else if filteredTags.length === 0}
      <div class="text-center py-10">
        <TagIcon class="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p class="text-sm text-gray-500">
          {searchQuery ? 'No tags found' : 'No tags yet'}
        </p>
        {#if !searchQuery}
          <button onclick={handleCreateNew} class="mt-2 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 hover:underline">
            Create your first tag
          </button>
        {/if}
      </div>
    {:else}
      <div class="grid grid-cols-2 gap-2">
        {#each filteredTags as tag (tag.id)}
          {@const hasColor = !!tag.color}
          <div
            class="group flex items-center justify-between px-2.5 py-2 rounded-lg border transition-all duration-200 {hasColor
              ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              : 'bg-amber-50 border-amber-200 dark:bg-purple-900/20 dark:border-purple-700 hover:border-amber-300 dark:hover:border-purple-600'}"
            style={hasColor ? `border-color: ${tag.color}30` : ''}
          >
            <div class="flex items-center gap-2 min-w-0">
              <span
                class="w-2.5 h-2.5 rounded-full flex-shrink-0 {hasColor ? '' : 'bg-amber-500 dark:bg-purple-400'}"
                style={hasColor ? `background-color: ${tag.color}` : ''}
              ></span>
              <div class="min-w-0">
                <span class="text-sm font-medium text-gray-900 dark:text-white truncate block">
                  {tag.name}
                </span>
                <span class="text-xs text-gray-400 truncate block">
                  {tag.tag}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0">
              <button
                onclick={() => handleEdit(tag)}
                class="btn-icon w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Edit"
              >
                <Edit2 class="w-3 h-3" />
              </button>
              <button
                onclick={() => handleDelete(tag)}
                disabled={deletingTagId === tag.tag}
                class="btn-icon btn-danger w-6 h-6 rounded-md flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete"
              >
                {#if deletingTagId === tag.tag}
                  <RotateCw class="w-3 h-3 animate-spin" />
                {:else}
                  <Trash2 class="w-3 h-3" />
                {/if}
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="flex items-center justify-between pt-5 border-t border-gray-200 dark:border-gray-700 mt-4">
    <span class="text-xs text-gray-400">
      {$tags.length} tag{$tags.length !== 1 ? 's' : ''}
    </span>
    <button
      onclick={handleClose}
      class="btn btn-primary shadow-md hover:shadow-lg"
    >
      Done
    </button>
  </div>
</Modal>

<TagFormModal
  bind:isOpen={showTagFormModal}
  mode={tagFormMode}
  tag={editingTag}
  onSuccess={handleTagFormSuccess}
/>
