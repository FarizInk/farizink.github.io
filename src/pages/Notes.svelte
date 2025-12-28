<script lang="ts">
  import type { Note } from '../lib/notes';
  import { getNotes, deleteNote, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore, tagOptions, isLoadingTags, tags } from '../lib/stores/tags';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteModal from '../components/NoteModal.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import TagModal from '../components/TagModal.svelte';
  import MultipleSelect from '../components/MultipleSelect.svelte';
  import Modal from '../components/Modal.svelte';
  import {
    Plus,
    Search,
    RefreshCw,
    RotateCw,
    Settings,
    X,
    ArrowUp,
    ArrowDown,
    Calendar,
    Tag as TagIcon,
    Trash2
  } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let notes = $state<Note[]>([]);
  let isLoading = $state(false);
  let isLoadingMore = $state(false);
  let searchQuery = $state('');
  let currentPage = $state(1);
  let hasMore = $state(true);
  let totalCount = $state(0);

  // Filter state
  let activeFilters = $state<NoteFilters>({
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  let showFilterPanel = $state(false);

  // Sorting state
  let showSortPanel = $state(false);
  const sortOptions = [
    { value: 'created_at', label: 'Date Created', icon: Calendar },
    { value: 'updated_at', label: 'Last Updated', icon: Calendar }
  ] as const;

  
  
  
  // Modal state
  let isModalOpen = $state(false);
  let modalMode = $state<'create' | 'edit'>('create');
  let selectedNote = $state<Note | null>(null);
  let isRefreshing = $state(false);

  // Detail modal state
  let isDetailModalOpen = $state(false);
  let selectedDetailNote = $state<Note | null>(null);

  // Tag modal state
  let isTagModalOpen = $state(false);

  // Auth state for conditional UI
  let hasAuthToken = $state(
    typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false
  );

  // Filter modal state
  let showFilterModal = $state(false);
  let tempFilters = $state<NoteFilters>({
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  let tempSearchQuery = $state('');

  // Tag selection state (using global store for available tags)
  let selectedIncludeTags = $state<string[]>([]);
  let selectedExcludeTags = $state<string[]>([]);
  let tempSelectedIncludeTags = $state<string[]>([]);
  let tempSelectedExcludeTags = $state<string[]>([]);

  async function loadNotes(page: number = 1, append: boolean = false) {
    if (!append) {
      isLoading = true;
    } else {
      isLoadingMore = true;
    }

    try {
      // Build API parameters including search and tags
      const apiParams: NoteFilters = {
        ...activeFilters,
        includeTags: selectedIncludeTags.length > 0 ? selectedIncludeTags : undefined,
        excludeTags: selectedExcludeTags.length > 0 ? selectedExcludeTags : undefined
      };

      // Add search parameter if there's a search query
      if (searchQuery.trim()) {
        apiParams.search = searchQuery.trim();
      }

      const response = await getNotes(page, 12, apiParams);

      if (append) {
        // Append new notes to existing ones
        notes = [...notes, ...response.data.notes];
      } else {
        // Replace all notes (for new search/filter/sort)
        notes = response.data.notes;
      }

      currentPage = response.data.pagination.page;
      hasMore = currentPage < response.data.pagination.totalPages;
      totalCount = response.data.pagination.total;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to load notes');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Load notes error:', error);
    } finally {
      isLoading = false;
      isLoadingMore = false;
    }
  }

  async function loadMoreNotes() {
    if (isLoadingMore || !hasMore) return;

    await loadNotes(currentPage + 1, true);
  }

  async function handleRefresh() {
    currentPage = 1;
    hasMore = true;
    await loadNotes(1, false);
  }

  async function handleDelete(note: Note) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await deleteNote(note.id);
      toast.success('Note deleted successfully');
      await loadNotes(currentPage);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to delete note');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Delete note error:', error);
    }
  }

  function handleEdit(note: Note) {
    modalMode = 'edit';
    selectedNote = note;
    isModalOpen = true;
  }

  function handleCreate() {
    modalMode = 'create';
    selectedNote = null;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedNote = null;
  }

  function handleModalSuccess() {
    // Refresh notes after successful create/update/delete
    loadNotes(currentPage);
    handleModalClose();
  }

  function handleShowDetail(note: Note) {
    selectedDetailNote = note;
    isDetailModalOpen = true;
  }

  function handleDetailModalClose() {
    isDetailModalOpen = false;
    selectedDetailNote = null;
  }

  function handleTagModalOpen() {
    isTagModalOpen = true;
  }

  // Filter modal functions
  function openFilterModal() {
    tempFilters = { ...activeFilters };
    tempSearchQuery = searchQuery;
    tempSelectedIncludeTags = [...selectedIncludeTags];
    tempSelectedExcludeTags = [...selectedExcludeTags];
    showFilterModal = true;
  }

  function closeFilterModal() {
    showFilterModal = false;
  }

  function applyFilters() {
    activeFilters = { ...tempFilters };
    searchQuery = tempSearchQuery;
    selectedIncludeTags = [...tempSelectedIncludeTags];
    selectedExcludeTags = [...tempSelectedExcludeTags];
    currentPage = 1;
    hasMore = true;
    loadNotes(1, false);
    closeFilterModal();
  }

  function clearFilters() {
    tempFilters = {
      sortBy: 'created_at',
      sortOrder: 'desc'
    };
    tempSearchQuery = '';
    tempSelectedIncludeTags = [];
    tempSelectedExcludeTags = [];
  }

  function getActiveFilterCount() {
    const count = Object.entries(activeFilters).filter(([key, value]) => {
      // Don't count default sort values
      if (key === 'sortBy' && value === 'created_at') return false;
      if (key === 'sortOrder' && value === 'desc') return false;
      return value !== undefined && value !== null;
    }).length;

    // Count tag filters
    const tagFilterCount = (selectedIncludeTags.length > 0 ? 1 : 0) + (selectedExcludeTags.length > 0 ? 1 : 0);

    return searchQuery.trim() ? count + tagFilterCount + 1 : count + tagFilterCount;
  }

  
  // Load notes and tags on mount
  onMount(() => {
    // Check for tag filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');

    if (tagFilter) {
      selectedIncludeTags = [tagFilter];
    }

    loadNotes(1, false);
    // Load tags from global store
    tagsStore.loadTags();
  });

  // Close panels when clicking outside
  $effect(() => {
    if (showFilterPanel || showSortPanel) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const filterContainer = target.closest('.relative');
        if (!filterContainer) {
          showFilterPanel = false;
          showSortPanel = false;
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  
  // Listen for auth state changes
  $effect(() => {
    const handleAuthChange = () => {
      const newHasAuthToken = typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
      const previousHasAuthToken = hasAuthToken;
      hasAuthToken = newHasAuthToken;

      // Load tags when user logs in
      if (newHasAuthToken && !previousHasAuthToken) {
        tagsStore.loadTags();
      }
      // Clear selections when user logs out
      if (!newHasAuthToken && previousHasAuthToken) {
        selectedIncludeTags = [];
        selectedExcludeTags = [];
      }
    };

    // Listen for logout event
    document.addEventListener('logout-success', handleAuthChange);

    // Listen for storage changes (in case login/logout happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        handleAuthChange();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('logout-success', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  });
</script>

<div class="min-h-screen bg-secondary-50 dark:bg-secondary-900">
  <!-- Header with Island Notch Design -->
  <div class="sticky top-0 z-40 pt-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-secondary-200 dark:border-secondary-700 px-6 py-4"
      >
        <!-- Compact Responsive Header -->
        <div class="flex flex-col gap-2">
          <!-- Mobile: Stacked, Desktop: Side by side -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <!-- Title & Stats -->
            <div class="flex items-center gap-3">
              <h1 class="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white tracking-tight">
                My Notes
              </h1>
              {#if totalCount > 0}
                <div class="flex items-center gap-2">
                  <span class="badge badge-primary text-xs">
                    {totalCount}
                    {totalCount === 1 ? 'Note' : 'Notes'}
                  </span>
                  <span class="text-xs text-secondary-500 dark:text-secondary-400 hidden sm:inline">
                    {notes.length} shown
                  </span>
                </div>
              {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-1 sm:gap-2">
              <!-- Filter Button -->
              <button
                onclick={openFilterModal}
                class="flex items-center gap-2 px-3 py-1.5 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                title="Filter and sort notes"
              >
                <Settings class="w-4 h-4" />
                <span class="text-sm font-medium">Filter</span>
                {#if getActiveFilterCount() > 0}
                  <span
                    class="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {getActiveFilterCount()}
                  </span>
                {/if}
              </button>

              <!-- Refresh -->
              <button
                onclick={handleRefresh}
                disabled={isRefreshing}
                class="w-8 h-8 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>

              <!-- Manage Tags - Only show when authenticated -->
              {#if hasAuthToken}
                <a
                  href="/notes/deleted"
                  class="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-md transition-colors"
                  title="View deleted notes"
                >
                  <Trash2 class="w-4 h-4" />
                  <span class="hidden sm:inline">Trash</span>
                </a>

                <button
                  onclick={handleTagModalOpen}
                  class="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 rounded-md transition-colors"
                  title="Manage tags"
                >
                  <TagIcon class="w-4 h-4" />
                  <span class="hidden sm:inline">Tags</span>
                </button>

                <!-- Create Note - Only show when authenticated -->
                <button
                  onclick={handleCreate}
                  class="btn btn-primary flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm"
                  title="New note"
                >
                  <Plus class="w-4 h-4" />
                  <span class="hidden sm:inline">New</span>
                </button>
              {/if}
            </div>
          </div>

          <!-- Mobile Stats Only -->
          {#if totalCount > 0}
            <div class="flex items-center gap-2 sm:hidden">
              <span class="text-xs text-secondary-500 dark:text-secondary-400">
                {notes.length} shown
              </span>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-20">
        <RotateCw class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
        <p class="text-secondary-500 dark:text-secondary-400">Loading notes...</p>
      </div>
    {:else if notes.length === 0}
      <!-- Empty State -->
      <div class="text-center py-20">
        <div class="max-w-md mx-auto">
          <div
            class="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Plus class="w-8 h-8 text-secondary-400" />
          </div>
          <h2 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h2>
          <p class="text-secondary-500 dark:text-secondary-400 mb-6">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first note to get started'}
          </p>
          {#if !searchQuery && hasAuthToken}
            <button onclick={handleCreate} class="btn btn-primary">
              <Plus class="w-4 h-4 mr-2" />
              Create Your First Note
            </button>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Notes List -->
      <div class="flex flex-col items-center gap-6">
        {#each notes as note (note.id)}
          <div class="w-full max-w-2xl">
            <NoteCard
              {note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              {hasAuthToken}
              onShowDetail={handleShowDetail}
            />
          </div>
        {/each}
      </div>

      <!-- Load More Button -->
      {#if hasMore}
        <div class="mt-8 flex justify-center">
          <button
            onclick={loadMoreNotes}
            disabled={isLoadingMore}
            class="btn btn-secondary flex items-center gap-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isLoadingMore}
              <RotateCw class="w-4 h-4 animate-spin" />
              Loading more notes...
            {:else}
              <Plus class="w-4 h-4" />
              Load More Notes
            {/if}
          </button>
        </div>
      {/if}

      <!-- End of Notes Indicator -->
      {#if !hasMore && notes.length > 0}
        <div class="mt-8 text-center">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full"
          >
            <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
            <span class="text-sm text-secondary-600 dark:text-secondary-400">
              Showing all {notes.length} notes
            </span>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<!-- Note Modal -->
<NoteModal
  bind:isOpen={isModalOpen}
  mode={modalMode}
  note={selectedNote}
  onSuccess={handleModalSuccess}
/>

<!-- Note Detail Modal -->
<NoteDetailModal
  note={selectedDetailNote}
  bind:isOpen={isDetailModalOpen}
  onClose={handleDetailModalClose}
  onEdit={handleEdit}
  onDelete={handleDelete}
  {hasAuthToken}
/>

<!-- Tag Management Modal -->
<TagModal
  bind:isOpen={isTagModalOpen}
  on:close={() => {
    isTagModalOpen = false;
    // Refresh tags after tag management from global store
    tagsStore.loadTags();
  }}
/>

<!-- Filter Modal -->
<Modal isOpen={showFilterModal} onClose={closeFilterModal} maxW="max-w-3xl" title="Filter & Sort Notes">
  {#snippet body()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Search - Full Width -->
      <div class="md:col-span-2">
        <label for="modal-search" class="label">Search</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              class="w-4 h-4 text-secondary-400 group-focus-within:text-primary-500 transition-colors"
            />
          </div>
          <input
            id="modal-search"
            type="text"
            placeholder="Search notes..."
            class="input w-full !pl-10"
            bind:value={tempSearchQuery}
          />
        </div>
      </div>

      <!-- Sort Options - Full Width -->
      <div class="md:col-span-2">
        <span class="label block mb-2" id="sort-options-label">Sort By</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each sortOptions as option (option.value)}
            <div class="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
              <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                {option.label}
              </div>
              <div class="flex gap-2">
                <button
                  onclick={() => tempFilters = { ...tempFilters, sortBy: option.value, sortOrder: 'desc' }}
                  class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                    option.value && tempFilters.sortOrder === 'desc'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                >
                  <ArrowDown class="w-3 h-3" />
                  Newest
                </button>
                <button
                  onclick={() => tempFilters = { ...tempFilters, sortBy: option.value, sortOrder: 'asc' }}
                  class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                    option.value && tempFilters.sortOrder === 'asc'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                >
                  <ArrowUp class="w-3 h-3" />
                  Oldest
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Public Status Filter - Only show when authenticated -->
      {#if hasAuthToken}
        <div>
          <span class="label block mb-2" id="public-status-label">Public Status</span>
          <div class="flex flex-col gap-2" role="group" aria-labelledby="public-status-label">
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: true }}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic ===
              true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Public Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: false }}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic ===
              false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Private Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: undefined }}
              class="px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors text-left {tempFilters.isPublic ===
              undefined
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : ''}"
            >
              All Notes
            </button>
          </div>
        </div>
      {/if}

      <!-- Favorite Status Filter -->
      <div>
        <span class="label block mb-2" id="favorite-status-label">Favorite Status</span>
        <div class="flex flex-col gap-2" role="group" aria-labelledby="favorite-status-label">
          <button
            onclick={() => tempFilters = { ...tempFilters, isFavorite: true }}
            class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite ===
            true
              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
          >
            Favorites Only
          </button>
          <button
            onclick={() => tempFilters = { ...tempFilters, isFavorite: false }}
            class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite ===
            false
              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
          >
            Non-Favorites
          </button>
          <button
            onclick={() => tempFilters = { ...tempFilters, isFavorite: undefined }}
            class="px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors text-left {tempFilters.isFavorite ===
            undefined
              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
              : ''}"
          >
            All Notes
          </button>
        </div>
      </div>

      <!-- Tag Filters - Only show when authenticated -->
      {#if hasAuthToken && $tags.length > 0}
        <!-- Include Tags -->
        <div>
          <label for="include-tags" class="label">Include Tags</label>
          <MultipleSelect
            id="include-tags"
            options={$tagOptions}
            bind:selectedValues={tempSelectedIncludeTags}
            placeholder="Select tags to include (OR logic)..."
            maxHeight="max-h-40"
          />
        </div>

        <!-- Exclude Tags -->
        <div>
          <label for="exclude-tags" class="label">Exclude Tags</label>
          <MultipleSelect
            id="exclude-tags"
            options={$tagOptions}
            bind:selectedValues={tempSelectedExcludeTags}
            placeholder="Select tags to exclude..."
            maxHeight="max-h-40"
          />
        </div>
      {:else if hasAuthToken && $isLoadingTags}
        <div class="md:col-span-2">
          <span class="label block mb-2">Tags</span>
          <div class="flex items-center justify-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
            <RotateCw class="w-4 h-4 text-secondary-400 animate-spin mr-2" />
            <span class="text-sm text-secondary-500">Loading tags...</span>
          </div>
        </div>
      {:else if hasAuthToken}
        <div class="md:col-span-2">
          <span class="label block mb-2">Tags</span>
          <div class="text-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
            <TagIcon class="w-8 h-8 text-secondary-300 mx-auto mb-2" />
            <p class="text-sm text-secondary-500">No tags available</p>
            <button
              onclick={() => {
                closeFilterModal();
                handleTagModalOpen();
              }}
              class="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mt-1"
            >
              Create tags first
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/snippet}

  {#snippet footer()}
    <button
      onclick={clearFilters}
      class="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      Clear Filters
    </button>
    <button
      onclick={applyFilters}
      class="px-4 py-2 btn btn-primary"
    >
      Apply Filters
    </button>
  {/snippet}
</Modal>

