<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { toast } from 'svelte-sonner';
  import {
    X,
    Tag as TagIcon,
    Plus,
    Edit2,
    Trash2,
    Save,
    RotateCw,
    Hash,
    Type,
    Eye
  } from '@lucide/svelte';
  import {
    getTags,
    createTag,
    updateTag,
    deleteTag,
    getTagNotes,
    type Tag,
    type TagCreateRequest
  } from '../lib/tags';
  import { tags as globalTags, tagsStore } from '../lib/stores/tags';

  // Props
  let { isOpen = $bindable(false) }: { isOpen: boolean } = $props();

  // Local state
  let isLoading = $state(false);
  let searchQuery = $state('');
  let debouncedSearchQuery = $state('');
  let lastSearchQuery = $state(''); // Track last executed search
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let isSearchTyping = $state(false);

  // Form state
  let isCreating = $state(false);
  let isEditing = $state(false);
  let editingTag = $state<Tag | null>(null);
  let formData = $state<TagCreateRequest>({
    tag: '',
    name: '',
    color: '#61DAFB' // Default color
  });

  // Tags from global store
  let tags = $derived(globalTags);

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Watch search query for typing indicator
  $effect(() => {
    if (searchQuery.trim()) {
      isSearchTyping = true;
    } else {
      isSearchTyping = false;
    }
  });

  // Combined load and search effect with caching
  $effect(() => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // When modal opens, load initial tags
    if (isOpen && !searchQuery.trim()) {
      // Load from global store first, then fallback to API
      const currentTags = get(globalTags) as Tag[];
      if (currentTags.length === 0) {
        tagsStore.loadTags(); // Load from API if store is empty
      }
      lastSearchQuery = '';
      return;
    }

    // Debounced search effect (always execute search API calls)
    if (searchQuery.trim() && isOpen) {
      searchTimeout = setTimeout(() => {
        // Only execute API call if search has actually changed
        if (lastSearchQuery !== searchQuery.trim()) {
          debouncedSearchQuery = searchQuery.trim();
          lastSearchQuery = searchQuery.trim();
          isSearchTyping = false;
          loadTags();
        }
      }, 300);
    }

    // Cleanup function
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  });

  async function loadTags() {
    isLoading = true;

    try {
      const response = await getTags(debouncedSearchQuery);
      const updatedTags = response.data.tags;

      // Update global store
      globalTags.set(updatedTags);
    } catch (error) {
      toast.error('Failed to load tags');
      console.error('Load tags error:', error);
    } finally {
      isLoading = false;
    }
  }

  function handleCreateNew() {
    isCreating = true;
    isEditing = false;
    editingTag = null;
    formData = { tag: '', name: '', color: '' };
  }

  function handleEdit(tag: Tag) {
    isCreating = false;
    isEditing = true;
    editingTag = tag;
    formData = { tag: tag.tag, name: tag.name, color: tag.color || '' };
  }

  function handleCancel() {
    isCreating = false;
    isEditing = false;
    editingTag = null;
    formData = { tag: '', name: '', color: '' };
  }

  async function handleSave() {
    // Validation
    if (!formData.tag.trim() || !formData.name.trim()) {
      toast.error('Tag and name are required');
      return;
    }

    // Check for duplicate tag (excluding current tag if editing)
    const currentTags = get(globalTags) as Tag[];
    const duplicateTag = currentTags.find((t: Tag) =>
      t.tag.toLowerCase() === formData.tag.toLowerCase() &&
      t.tag !== editingTag?.tag
    );

    if (duplicateTag) {
      toast.error('Tag identifier already exists');
      return;
    }

    try {
      // Prepare data with nullable color
      const submitData = {
        ...formData,
        color: formData.color?.trim() || undefined // Send undefined if empty
      };

      if (isCreating) {
        const response = await createTag(submitData);
        console.log('Create tag response:', response);
        // Ensure the new tag has createdAt field
        const newTag: Tag = {
          ...response.data,
          createdAt: typeof response.data.createdAt === 'number' ? response.data.createdAt : Date.now()
        };
        console.log('New tag to add:', newTag);
        // Add new tag to global store
        tagsStore.addTag(newTag);
        toast.success('Tag created successfully');
      } else if (isEditing && editingTag) {
        const response = await updateTag(editingTag.tag, submitData);
        // Update tag in global store (using tag as identifier)
        tagsStore.updateTag(editingTag.tag, response.data);
        toast.success('Tag updated successfully');
      }

      handleCancel();
    } catch (error) {
      toast.error(isCreating ? 'Failed to create tag' : 'Failed to update tag');
      console.error('Save tag error:', error);
    }
  }

  async function handleDelete(tag: Tag) {
    if (!confirm(`Are you sure you want to delete "${tag.name}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      await deleteTag(tag.tag);
      // Remove tag from global store (using tag as identifier)
      tagsStore.removeTag(tag.tag);
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('Failed to delete tag');
      console.error('Delete tag error:', error);
    }
  }

  async function handleViewTagNotes(tag: Tag) {
    try {
      const response = await getTagNotes(tag.tag);
      const notesCount = response.data?.pagination?.total || 0;

      if (notesCount > 0) {
        // Navigate to notes page with tag filter
        const baseUrl = window.location.origin;
        const notesUrl = `${baseUrl}/notes?tag=${encodeURIComponent(tag.tag)}`;

        // Close modal first
        handleClose();

        // Navigate to notes page
        window.location.href = notesUrl;

        toast.success(`Viewing ${notesCount} note${notesCount !== 1 ? 's' : ''} with tag "${tag.name}"`);
      } else {
        toast.info(`No notes found with tag "${tag.name}"`);
      }
    } catch (error) {
      toast.error('Failed to get tag notes');
      console.error('Get tag notes error:', error);
    }
  }

  function handleRefresh() {
    tagsStore.loadTags(searchQuery || undefined); // Use the global store to reload
  }

  function handleClose() {
    isOpen = false;
    dispatch('close');
    handleCancel(); // Reset form state
    lastSearchQuery = ''; // Reset last search to allow reload on next open
  }

  // Helper function to get current store value
  function get(store: { subscribe: (fn: (value: unknown) => void) => () => void }): unknown {
    let value: unknown;
    const unsubscribe = store.subscribe((v: unknown) => value = v);
    unsubscribe();
    return value;
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

<!-- Modal -->
{#if isOpen}
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onclick={handleClose}
      onkeydown={(e) => e.key === 'Escape' && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Tag management modal"
      tabindex="-1"
    ></div>

    <!-- Modal Content -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div
        class="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col"
        onkeydown={(e) => e.key === 'Escape' && handleClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabindex="0"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <TagIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 id="modal-title" class="text-xl font-bold text-gray-900 dark:text-white">Manage Tags</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {$tags.length} tag{$tags.length !== 1 ? 's' : ''} total
              </p>
            </div>
          </div>
          <button
            onclick={handleClose}
            class="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-hidden">
          <!-- Search & Actions -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Search -->
              <div class="relative flex-1">
                <input
                  type="text"
                  placeholder="Search tags..."
                  class="input !pl-10"
                  bind:value={searchQuery}
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {#if isSearchTyping}
                    <div class="flex items-center gap-1">
                      <div class="w-1 h-1 bg-primary-600 rounded-full animate-pulse"></div>
                      <div class="w-1 h-1 bg-primary-600 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
                      <div class="w-1 h-1 bg-primary-600 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                    </div>
                  {:else if isLoading && searchQuery}
                    <RotateCw class="w-4 h-4 text-primary-600 animate-spin" />
                  {:else}
                    <TagIcon class="w-4 h-4 text-gray-400" />
                  {/if}
                </div>
                {#if searchQuery}
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {#if isSearchTyping}
                      <span class="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                        Typing...
                      </span>
                    {:else if isLoading}
                      <span class="text-xs text-primary-600 bg-primary-100 dark:bg-primary-900 dark:text-primary-300 px-2 py-1 rounded">
                        Searching...
                      </span>
                    {:else}
                      <span class="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                        Ready
                      </span>
                    {/if}
                  </div>
                {/if}
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  onclick={handleRefresh}
                  disabled={isLoading}
                  class="btn btn-secondary flex items-center gap-2"
                >
                  <RotateCw class={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <button
                  onclick={handleCreateNew}
                  class="btn btn-primary flex items-center gap-2"
                  disabled={isCreating || isEditing}
                >
                  <Plus class="w-4 h-4" />
                  New Tag
                </button>
              </div>
            </div>
          </div>

          <!-- Create/Edit Form -->
          {#if isCreating || isEditing}
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-blue-900 dark:text-blue-100">
                  {isCreating ? 'Create New Tag' : 'Edit Tag'}
                </h3>
                <button
                  onclick={handleCancel}
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  Cancel
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="tag-identifier" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Hash class="w-4 h-4 inline mr-1" />
                    Tag Identifier
                  </label>
                  <input
                    id="tag-identifier"
                    type="text"
                    placeholder="e.g., programming"
                    class="input"
                    bind:value={formData.tag}
                    disabled={isLoading}
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Used internally (lowercase, no spaces)
                  </p>
                </div>

                <div>
                  <label for="tag-display-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type class="w-4 h-4 inline mr-1" />
                    Display Name
                  </label>
                  <input
                    id="tag-display-name"
                    type="text"
                    placeholder="e.g., Programming Resources"
                    class="input"
                    bind:value={formData.name}
                    disabled={isLoading}
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    User-friendly name shown in interface
                  </p>
                </div>
              </div>

              <div>
                <label for="tag-color-hex" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color <span class="text-gray-400 font-normal">(Optional - Leave empty for primary color)</span>
                </label>
                <div class="flex items-center gap-3">
                  <input
                    id="tag-color"
                    type="color"
                    class="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                    bind:value={formData.color}
                    disabled={isLoading}
                  />
                  <div class="flex-1 relative">
                    <input
                      id="tag-color-hex"
                      type="text"
                      placeholder="#61DAFB (optional)"
                      class="input w-full pr-20"
                      bind:value={formData.color}
                      disabled={isLoading}
                      pattern="^#[0-9A-Fa-f]{6}$"
                    />
                    {#if formData.color}
                      <button
                        type="button"
                        onclick={() => formData.color = ''}
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Clear color"
                        disabled={isLoading}
                      >
                        <X class="w-4 h-4" />
                      </button>
                    {/if}
                  </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enter hex color code (e.g., #61DAFB) or leave empty to use primary theme color
                </p>
              </div>

              <div class="flex justify-end gap-2 mt-4">
                <button
                  onclick={handleCancel}
                  class="btn btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onclick={handleSave}
                  class="btn btn-primary flex items-center gap-2"
                  disabled={isLoading || !formData.tag.trim() || !formData.name.trim()}
                >
                  {#if isLoading}
                    <RotateCw class="w-4 h-4 animate-spin" />
                    Saving...
                  {:else}
                    <Save class="w-4 h-4" />
                    {isCreating ? 'Create Tag' : 'Update Tag'}
                  {/if}
                </button>
              </div>
            </div>
          {/if}

          <!-- Tags List -->
          <div class="flex-1 overflow-y-auto">
            {#if isLoading}
              <div class="flex items-center justify-center py-12">
                <RotateCw class="w-6 h-6 text-primary-600 animate-spin" />
                <span class="ml-2 text-gray-600 dark:text-gray-400">Loading tags...</span>
              </div>
            {:else if $tags.length === 0}
              <div class="text-center py-12">
                <TagIcon class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No tags found' : 'No tags created yet'}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Create your first tag to organize your notes'
                  }
                </p>
                {#if !searchQuery}
                  <button onclick={handleCreateNew} class="btn btn-primary">
                    <Plus class="w-4 h-4 mr-2" />
                    Create First Tag
                  </button>
                {/if}
              </div>
            {:else}
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each $tags as tag (tag.tag)}
                    <div
                      class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                    >
                      <div class="flex items-start justify-between">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <div class="flex items-center gap-2">
                              <div
                                class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 {!tag.color ? 'bg-primary-600' : ''}"
                                style="background-color: {tag.color || undefined}"
                              ></div>
                              <span
                                class="inline-block px-2 py-1 text-xs font-medium rounded {!tag.color ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' : ''}"
                                style="background-color: {tag.color ? tag.color + '20' : undefined}; color: {tag.color || undefined}"
                              >
                                {tag.tag}
                              </span>
                            </div>
                          </div>
                          <h3 class="font-medium text-gray-900 dark:text-white truncate">
                            {tag.name}
                          </h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Created {formatDate(tag.createdAt)}
                          </p>
                        </div>

                        <div class="flex items-center gap-1 ml-2">
                          <button
                            onclick={() => handleViewTagNotes(tag)}
                            class="w-8 h-8 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors"
                            title="View notes with this tag"
                          >
                            <Eye class="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          </button>
                          <button
                            onclick={() => handleEdit(tag)}
                            class="w-8 h-8 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                            title="Edit tag"
                          >
                            <Edit2 class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          <button
                            onclick={() => handleDelete(tag)}
                            class="w-8 h-8 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors"
                            title="Delete tag"
                          >
                            <Trash2 class="w-4 h-4 text-red-500 dark:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}