<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { toast } from 'svelte-sonner';
  import {
    X,
    Tag as TagIcon,
    Plus,
    Edit2,
    Trash2,
    RotateCw,
    CircleX
  } from '@lucide/svelte';
  import { deleteTag, type Tag } from '../lib/tags';
  import { tags, tagsStore, isLoadingTags } from '../lib/stores/tags';
  import Modal from './Modal.svelte';
  import TagFormModal from './TagFormModal.svelte';

  // Props
  let { isOpen = $bindable(false) }: { isOpen: boolean } = $props();

  // Local state
  let isLoading = $state(false);
  let searchQuery = $state('');
  let lastSearchQuery = $state('');
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let isSearchTyping = $derived(searchQuery.trim().length > 0);

  // Tag Form Modal state
  let showTagFormModal = $state(false);
  let tagFormMode = $state<'create' | 'edit'>('create');
  let editingTag = $state<Tag | null>(null);

  // Track initial load to prevent infinite loop
  let hasLoadedInitially = $state(false);

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Combined loading state (local + global)
  let isAnyLoading = $derived.by(() => $isLoadingTags || isLoading);

  // Load initial tags when modal opens
  $effect(() => {
    if (isOpen && !hasLoadedInitially) {
      tagsStore.loadTags();
      hasLoadedInitially = true;
      lastSearchQuery = '';
    }

    // Reset flag when modal closes
    if (!isOpen) {
      hasLoadedInitially = false;
    }
  });

  // Debounced search effect - separate from initial load
  $effect(() => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Only run search if modal is open and there's a query
    if (isOpen && searchQuery.trim() && hasLoadedInitially) {
      searchTimeout = setTimeout(() => {
        const trimmedQuery = searchQuery.trim();
        if (lastSearchQuery !== trimmedQuery) {
          lastSearchQuery = trimmedQuery;
          isSearchTyping = false;
          loadTags();
        }
      }, 300);
    }

    // Cleanup
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  });

  async function loadTags() {
    isLoading = true;

    try {
      // Use tagsStore to load tags (handles pagination internally)
      await tagsStore.loadTags();
    } catch (error) {
      toast.error('Failed to load tags');
      console.error('Load tags error:', error);
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
    // Refresh tags list after form is saved
    loadTags();
  }

  async function handleDelete(tag: Tag) {
    if (
      !confirm(`Are you sure you want to delete "${tag.name}"?\n\nThis action cannot be undone.`)
    ) {
      return;
    }

    try {
      await deleteTag(tag.tag);
      // Remove from store
      tagsStore.removeTag(tag.tag);
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('Failed to delete tag');
      console.error('Delete tag error:', error);
    }
  }

  function handleRefresh() {
    tagsStore.loadTags(true); // Force refresh from API
  }

  function handleClose() {
    isOpen = false;
    dispatch('close');
    lastSearchQuery = '';
  }

  function formatDate(dateInput: string | number): string {
    if (!dateInput) {
      return 'Unknown date';
    }

    try {
      const date = new Date(dateInput);
      // Check if date is invalid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  }
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-4xl" showCloseButton={false}>
  {#snippet header()}
    <div class="py-5 px-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-b border-warning-200 dark:border-primary-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-warning-400 to-amber-500 dark:from-primary-500 dark:to-primary-600 flex items-center justify-center shadow-lg">
            <TagIcon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 id="modal-title" class="text-lg font-bold text-gray-900 dark:text-white">
              Manage Tags
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {($tags || []).length} tag{($tags || []).length !== 1 ? 's' : ''} total
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- Refresh Button -->
          <button
            onclick={handleRefresh}
            disabled={isAnyLoading}
            class="w-9 h-9 rounded-lg bg-white dark:bg-secondary-700 hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            title="Refresh tags"
          >
            <RotateCw class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 ${isAnyLoading ? 'animate-spin' : ''}`} />
          </button>
          <!-- New Tag Button -->
          <button
            onclick={handleCreateNew}
            class="px-4 py-2 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={showTagFormModal || isAnyLoading}
          >
            <Plus class="w-4 h-4" />
            <span class="hidden sm:inline">New Tag</span>
          </button>
          <!-- Close Button -->
          <button
            onclick={handleClose}
            class="w-9 h-9 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="mt-4">
        <div class="relative group">
          <TagIcon
            class="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-secondary-400 group-focus-within:text-warning-500 dark:group-focus-within:text-primary-400 transition-colors"
          />
          <input
            type="text"
            class="input !pl-11 !py-2.5 border-secondary-200 dark:border-secondary-600 focus:border-warning-500 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
            placeholder="Search tags by name or identifier..."
            bind:value={searchQuery}
          />
          {#if searchQuery}
            <button
              type="button"
              onclick={() => (searchQuery = '')}
              class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Clear search"
            >
              <X class="w-4 h-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300" />
            </button>
          {/if}
          <!-- Search Status Indicator -->
          {#if searchQuery}
            <div class="absolute inset-y-0 right-10 flex items-center">
              {#if isSearchTyping || isAnyLoading}
                <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-warning-100 dark:bg-primary-900/30">
                  <div class="w-1.5 h-1.5 bg-warning-600 dark:bg-primary-500 rounded-full animate-ping"></div>
                  <span class="text-xs text-warning-700 dark:text-primary-300">
                    {isSearchTyping ? 'Typing...' : 'Searching...'}
                  </span>
                </div>
              {:else}
                <div class="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span class="text-xs text-green-700 dark:text-green-300">Ready</span>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="px-6 py-5">
      <!-- Tags List -->
      <div class="p-2">
        {#if isAnyLoading}
          <div class="flex flex-col items-center justify-center py-16">
            <div class="relative">
              <div class="w-16 h-16 rounded-2xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
                <RotateCw class="w-8 h-8 text-warning-600 dark:text-primary-400 animate-spin" />
              </div>
              <div
                class="absolute inset-0 w-16 h-16 rounded-2xl bg-warning-400/20 dark:bg-primary-400/20 animate-ping"
              ></div>
            </div>
            <p class="mt-4 text-secondary-600 dark:text-secondary-400 font-medium">
              Loading tags...
            </p>
          </div>
        {:else if ($tags || []).length === 0}
          <div class="text-center py-16">
            <div
              class="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 flex items-center justify-center"
            >
              <TagIcon class="w-10 h-10 text-secondary-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'No tags found' : 'No tags created yet'}
            </h3>
            <p class="text-secondary-600 dark:text-secondary-400 mb-6 max-w-xs mx-auto">
              {searchQuery
                ? 'Try adjusting your search terms to find tags'
                : 'Create your first tag to start organizing notes'}
            </p>
            {#if !searchQuery}
              <button
                onclick={handleCreateNew}
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Plus class="w-5 h-5" />
                Create Your First Tag
              </button>
            {/if}
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {#each $tags.filter(t => t) as tag (tag.id)}
              {@const isEditingThis = showTagFormModal && editingTag?.id === tag.id}
              <div
                class="tag-card group relative p-4 rounded-2xl border-2 transition-all duration-200 {isEditingThis
                  ? 'bg-warning-100 dark:bg-primary-900/40 border-warning-400 dark:border-primary-500'
                  : 'bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 hover:border-warning-300 dark:hover:border-primary-600 hover:shadow-lg hover:-translate-y-1'}"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <!-- Tag Badge -->
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                          <span
                            class="inline-block px-2.5 py-1 text-xs font-semibold rounded-lg {tag.color
                              ? ''
                              : 'bg-warning-50 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300 border border-warning-200 dark:border-primary-700'}"
                            style="background-color: {tag.color
                              ? tag.color + '15'
                              : undefined}; color: {tag.color || undefined}; border-color: {tag.color
                              ? tag.color + '40'
                              : undefined}"
                          >
                            {tag.tag}
                          </span>
                        </div>
                        <h3 class="font-bold text-gray-900 dark:text-white truncate">
                          {tag.name}
                        </h3>
                      </div>
                    </div>

                    <!-- Meta Info -->
                    <div class="flex items-center gap-3 text-xs text-secondary-500 dark:text-secondary-400">
                      <div class="flex items-center gap-1">
                        <svg
                          class="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Created {formatDate(tag.created_at)}
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-1.5 ml-3">
                    <button
                      onclick={() => handleEdit(tag)}
                      class="w-9 h-9 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 flex items-center justify-center transition-all duration-200 group/btn"
                      title="Edit tag"
                      disabled={showTagFormModal}
                    >
                      <Edit2 class="w-4 h-4 text-secondary-500 dark:text-secondary-400 group-hover/btn:text-warning-600 dark:group-hover/btn:text-primary-400" />
                    </button>
                    <button
                      onclick={() => handleDelete(tag)}
                      class="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center transition-all duration-200 group/btn"
                      title="Delete tag"
                      disabled={showTagFormModal}
                    >
                      <Trash2 class="w-4 h-4 text-red-500 dark:text-red-400 group-hover/btn:text-red-600 dark:group-hover/btn:text-red-300" />
                    </button>
                  </div>
                </div>

                <!-- Hover Glow Effect -->
                {#if !isEditingThis}
                  <div
                    class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style="background: radial-gradient(circle at center, {tag.color || 'rgb(251,191,36)'}08 0%, transparent 70%)"
                  ></div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="py-4 bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-between px-6 gap-6">
        <div class="text-sm text-secondary-600 dark:text-secondary-400">
          <span>
            {$tags.length} tag{$tags.length !== 1 ? 's' : ''} created
          </span>
        </div>
        <button
          type="button"
          onclick={handleClose}
          class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <TagIcon class="w-4 h-4" />
          Done
        </button>
      </div>
    </div>
  {/snippet}
</Modal>

<!-- Tag Form Modal -->
<TagFormModal
  bind:isOpen={showTagFormModal}
  mode={tagFormMode}
  tag={editingTag}
  onSuccess={handleTagFormSuccess}
/>
