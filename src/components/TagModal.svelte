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
    } catch (error) {
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
    if (!confirm(`Delete "${tag.name}"?`)) return;
    try {
      await deleteTag(tag.tag);
      tagsStore.removeTag(tag.tag);
      toast.success('Tag deleted');
    } catch (error) {
      toast.error('Failed to delete tag');
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

<Modal {isOpen} onClose={handleClose} maxW="max-w-lg" showCloseButton={false}>
  {#snippet header()}
    <div class="flex items-center justify-between px-3 py-2 border-b border-secondary-200 dark:border-secondary-700">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-warning-100 dark:bg-primary-900 flex items-center justify-center">
          <TagIcon class="w-3.5 h-3.5 text-warning-600 dark:text-primary-400" />
        </div>
        <h2 id="modal-title" class="text-sm font-semibold text-gray-900 dark:text-white">
          Manage Tags
        </h2>
        <span class="text-xs text-secondary-400">
          {filteredTags.length}
        </span>
      </div>
      <div class="flex items-center gap-1">
        <button
          onclick={handleRefresh}
          disabled={isAnyLoading}
          class="w-7 h-7 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <RotateCw class="w-3.5 h-3.5 {isAnyLoading ? 'animate-spin' : ''}" />
        </button>
        <button
          onclick={handleCreateNew}
          class="w-7 h-7 rounded-md bg-warning-100 dark:bg-primary-900 hover:bg-warning-200 dark:hover:bg-primary-800 flex items-center justify-center"
          title="New tag"
        >
          <Plus class="w-3.5 h-3.5 text-warning-600 dark:text-primary-400" />
        </button>
        <button
          onclick={handleClose}
          class="w-7 h-7 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center"
          aria-label="Close"
        >
          <X class="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="px-3 pt-2 pb-1">
      <div class="relative">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary-400 pointer-events-none" />
        <input
          type="text"
          class="input !py-1.5 !pl-8 text-sm"
          placeholder="Search tags..."
          bind:value={searchQuery}
        />
      </div>
    </div>
    <div class="px-3 pb-3 max-h-[50vh] overflow-y-auto">
      {#if isAnyLoading && $tags.length === 0}
        <div class="flex items-center justify-center py-10">
          <RotateCw class="w-5 h-5 animate-spin text-warning-500" />
        </div>
      {:else if filteredTags.length === 0}
        <div class="text-center py-10">
          <TagIcon class="w-8 h-8 mx-auto mb-2 text-secondary-300" />
          <p class="text-sm text-secondary-500">
            {searchQuery ? 'No tags found' : 'No tags yet'}
          </p>
          {#if !searchQuery}
            <button onclick={handleCreateNew} class="mt-2 text-sm text-warning-600 hover:underline">
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
                ? 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
                : 'bg-warning-50 border-warning-200 dark:bg-primary-900/20 dark:border-primary-700 hover:border-warning-300 dark:hover:border-primary-600'}"
              style={hasColor ? `border-color: ${tag.color}30` : ''}
            >
              <div class="flex items-center gap-2 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full flex-shrink-0 {hasColor ? '' : 'bg-warning-500 dark:bg-primary-400'}"
                  style={hasColor ? `background-color: ${tag.color}` : ''}
                ></span>
                <div class="min-w-0">
                  <span class="text-sm font-medium text-gray-900 dark:text-white truncate block">
                    {tag.name}
                  </span>
                  <span class="text-[11px] text-secondary-400 truncate block">
                    {tag.tag}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0">
                <button
                  onclick={() => handleEdit(tag)}
                  class="w-6 h-6 rounded-md flex items-center justify-center hover:bg-warning-100 dark:hover:bg-primary-900/50 text-secondary-400 hover:text-warning-600 dark:hover:text-primary-400 transition-colors"
                  title="Edit"
                >
                  <Edit2 class="w-3 h-3" />
                </button>
                <button
                  onclick={() => handleDelete(tag)}
                  class="w-6 h-6 rounded-md flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 text-secondary-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 class="w-3 h-3" />
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <span class="text-xs text-secondary-400 mr-auto">
      {$tags.length} tag{$tags.length !== 1 ? 's' : ''}
    </span>
    <button
      onclick={handleClose}
      class="px-3 py-1 text-sm bg-warning-500 hover:bg-warning-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-md transition-colors"
    >
      Done
    </button>
  {/snippet}
</Modal>

<TagFormModal
  bind:isOpen={showTagFormModal}
  mode={tagFormMode}
  tag={editingTag}
  onSuccess={handleTagFormSuccess}
/>
