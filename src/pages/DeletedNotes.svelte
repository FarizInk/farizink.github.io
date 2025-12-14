<script lang="ts">
  import type { Note } from '../lib/notes';
  import { getDeletedNotes, permanentDeleteNote, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore, tagOptions, isLoadingTags, tags } from '../lib/stores/tags';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import MultipleSelect from '../components/MultipleSelect.svelte';
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
    Trash2,
    AlertTriangle,
    Clock
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
    sortBy: 'deleted_at',
    sortOrder: 'desc'
  });
  let showFilterModal = $state(false);

  // Sorting options
  const sortOptions = [
    { value: 'created_at', label: 'Date Created', icon: Calendar },
    { value: 'updated_at', label: 'Last Updated', icon: Calendar },
    { value: 'deleted_at', label: 'Date Deleted', icon: Clock }
  ] as const;

  // Modal state
  let selectedDetailNote = $state<Note | null>(null);
  let isDetailModalOpen = $state(false);

  // Auth state
  let hasAuthToken = $state(
    typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false
  );

  // Filter modal state
  let tempFilters = $state<NoteFilters>({
    sortBy: 'deleted_at',
    sortOrder: 'desc'
  });
  let tempSearchQuery = $state('');

  // Tag selection state
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
      // Build API parameters
      const apiParams: NoteFilters = {
        ...activeFilters,
        includeTags: selectedIncludeTags.length > 0 ? selectedIncludeTags : undefined,
        excludeTags: selectedExcludeTags.length > 0 ? selectedExcludeTags : undefined
      };

      // Add search parameter if there's a search query
      if (searchQuery.trim()) {
        apiParams.search = searchQuery.trim();
      }

      const response = await getDeletedNotes(page, 12, apiParams);

      if (append) {
        notes = [...notes, ...response.data.notes];
      } else {
        notes = response.data.notes;
      }

      currentPage = response.data.pagination.page;
      hasMore = currentPage < response.data.pagination.totalPages;
      totalCount = response.data.pagination.total;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to load deleted notes');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Load deleted notes error:', error);
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

  async function handlePermanentDelete(note: Note) {
    const confirmMessage = `Are you sure you want to permanently delete this note?${note.files && note.files.length > 0 ? `\n\nThis will also delete ${note.files.length} file(s) from storage.` : ''}\n\nThis action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await permanentDeleteNote(note.id);

      if (response.data.s3Errors && response.data.s3Errors.length > 0) {
        toast.warning(`Note deleted with ${response.data.s3Errors.length} file cleanup errors`, {
          description: response.data.s3Errors.join(', ')
        });
      } else {
        toast.success(`Note permanently deleted with ${response.data.deletedFilesCount} files`);
      }

      await loadNotes(currentPage);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to permanently delete note');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Permanent delete note error:', error);
    }
  }

  function handleShowDetail(note: Note) {
    selectedDetailNote = note;
    isDetailModalOpen = true;
  }

  function handleDetailModalClose() {
    isDetailModalOpen = false;
    selectedDetailNote = null;
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
      sortBy: 'deleted_at',
      sortOrder: 'desc'
    };
    tempSearchQuery = '';
    tempSelectedIncludeTags = [];
    tempSelectedExcludeTags = [];
  }

  function getActiveFilterCount() {
    const count = Object.entries(activeFilters).filter(([key, value]) => {
      // Don't count default sort values
      if (key === 'sortBy' && value === 'deleted_at') return false;
      if (key === 'sortOrder' && value === 'desc') return false;
      return value !== undefined && value !== null;
    }).length;

    // Count tag filters
    const tagFilterCount = (selectedIncludeTags.length > 0 ? 1 : 0) + (selectedExcludeTags.length > 0 ? 1 : 0);

    return searchQuery.trim() ? count + tagFilterCount + 1 : count + tagFilterCount;
  }

  // Load notes and tags on mount
  onMount(() => {
    loadNotes(1, false);
    tagsStore.loadTags();
  });

  // Close filter modal when clicking outside
  $effect(() => {
    if (showFilterModal) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const modal = target.closest('.modal-content');
        if (!modal) {
          closeFilterModal();
        }
      };

      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Listen for auth state changes
  $effect(() => {
    const handleAuthChange = () => {
      hasAuthToken = typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    };

    window.addEventListener('storage', (e) => {
      if (e.key === 'authToken') {
        handleAuthChange();
      }
    });

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  });
</script>

<div class="min-h-screen bg-secondary-50 dark:bg-secondary-900">
  <!-- Header with Trash Theme -->
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
              <div class="flex items-center gap-2">
                <Trash2 class="w-5 h-5 text-red-500" />
                <h1 class="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white tracking-tight">
                  Deleted Notes
                </h1>
              </div>
              {#if totalCount > 0}
                <div class="flex items-center gap-2">
                  <span class="badge badge-danger text-xs">
                    {totalCount}
                    {totalCount === 1 ? 'Item' : 'Items'}
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
                title="Filter and sort deleted notes"
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
                disabled={isLoading}
                class="w-8 h-8 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${isLoading ? 'animate-spin' : ''}`}
                />
              </button>
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

  <!-- Warning Banner -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
      <div class="flex-1">
        <p class="text-sm text-amber-800 dark:text-amber-200">
          <strong>Warning:</strong> These notes have been deleted and will be permanently removed after 30 days.
          <br />
          You can view the details or permanently delete them now.
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-20">
        <RotateCw class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
        <p class="text-secondary-500 dark:text-secondary-400">Loading deleted notes...</p>
      </div>
    {:else if notes.length === 0}
      <!-- Empty State -->
      <div class="text-center py-20">
        <div class="max-w-md mx-auto">
          <div
            class="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Trash2 class="w-8 h-8 text-secondary-400" />
          </div>
          <h2 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
            {searchQuery ? 'No deleted notes found' : 'Trash is empty'}
          </h2>
          <p class="text-secondary-500 dark:text-secondary-400">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Deleted notes will appear here temporarily'}
          </p>
        </div>
      </div>
    {:else}
      <!-- Notes List -->
      <div class="flex flex-col items-center gap-6">
        {#each notes as note (note.id)}
          <div class="w-full max-w-2xl">
            <NoteCard
              {note}
              {hasAuthToken}
              isDeleted={true}
              onShowDetail={handleShowDetail}
              onPermanentDelete={handlePermanentDelete}
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
              Loading more deleted notes...
            {:else}
              <Plus class="w-4 h-4" />
              Load More Deleted Notes
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
              Showing all {notes.length} deleted notes
            </span>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<!-- Note Detail Modal -->
{#if selectedDetailNote}
  <NoteDetailModal
    note={selectedDetailNote}
    bind:isOpen={isDetailModalOpen}
    onClose={handleDetailModalClose}
    {hasAuthToken}
    isDeleted={true}
    onPermanentDelete={handlePermanentDelete}
  />
{/if}

<!-- Filter Modal -->
{#if showFilterModal}
  <div
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50] flex items-center justify-center p-4"
    onclick={e => {
      if (e.target === e.currentTarget) {
        closeFilterModal();
      }
    }}
    onkeydown={e => e.key === 'Escape' && closeFilterModal()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="filter-modal-title"
    tabindex="-1"
  >
    <!-- Modal -->
    <div
      class="modal-content bg-white dark:bg-secondary-800 rounded-lg shadow-2xl w-full max-w-md border border-secondary-200 dark:border-secondary-700 overflow-hidden"
      role="document"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700"
      >
        <h2
          id="filter-modal-title"
          class="text-xl font-semibold text-secondary-900 dark:text-secondary-50"
        >
          Filter & Sort Deleted Notes
        </h2>
        <button
          onclick={closeFilterModal}
          class="w-8 h-8 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X class="w-4 h-4 text-secondary-500 dark:text-secondary-400" />
        </button>
      </div>

      <!-- Form -->
      <div class="p-6 space-y-6">
        <!-- Search -->
        <div>
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
              placeholder="Search deleted notes..."
              class="input w-full !pl-10"
              bind:value={tempSearchQuery}
            />
          </div>
        </div>

        <!-- Public Status Filter -->
        <div>
          <span class="label block mb-2" id="public-status-label">Public Status</span>
          <div class="flex gap-2" role="group" aria-labelledby="public-status-label">
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: true }}
              class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors {tempFilters.isPublic ===
              true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Public Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: false }}
              class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors {tempFilters.isPublic ===
              false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Private Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isPublic: undefined }}
              class="flex-1 px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors {tempFilters.isPublic ===
              undefined
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : ''}"
            >
              All
            </button>
          </div>
        </div>

        <!-- Favorite Status Filter -->
        <div>
          <span class="label block mb-2" id="favorite-status-label">Favorite Status</span>
          <div class="flex gap-2" role="group" aria-labelledby="favorite-status-label">
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: true }}
              class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors {tempFilters.isFavorite ===
              true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Favorites Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: false }}
              class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors {tempFilters.isFavorite ===
              false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Non-Favorites
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: undefined }}
              class="flex-1 px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors {tempFilters.isFavorite ===
              undefined
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : ''}"
            >
              All
            </button>
          </div>
        </div>

        <!-- Sort Options -->
        <div>
          <span class="label block mb-2" id="sort-options-label">Sort By</span>
          {#each sortOptions as option (option.value)}
            <div class="mb-3">
              <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                <option.icon class="w-4 h-4" />
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
                  {option.value === 'deleted_at' ? 'Most Recent' : 'Newest'}
                </button>
                <button
                  onclick={() => tempFilters = { ...tempFilters, sortBy: option.value, sortOrder: 'asc' }}
                  class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                    option.value && tempFilters.sortOrder === 'asc'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                >
                  <ArrowUp class="w-3 h-3" />
                  {option.value === 'deleted_at' ? 'Oldest' : 'Oldest'}
                </button>
              </div>
            </div>
          {/each}
        </div>

        <!-- Tag Filters -->
        {#if $tags.length > 0}
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
        {:else if $isLoadingTags}
          <div>
            <span class="label block mb-2">Tags</span>
            <div class="flex items-center justify-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
              <RotateCw class="w-4 h-4 text-secondary-400 animate-spin mr-2" />
              <span class="text-sm text-secondary-500">Loading tags...</span>
            </div>
          </div>
        {:else}
          <div>
            <span class="label block mb-2">Tags</span>
            <div class="text-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
              <Trash2 class="w-8 h-8 text-secondary-300 mx-auto mb-2" />
              <p class="text-sm text-secondary-500">No tags available</p>
            </div>
          </div>
        {/if}
      </div>

      <!-- Actions -->
      <div class="flex gap-3 p-6 border-t border-secondary-200 dark:border-secondary-700">
        <button
          onclick={clearFilters}
          class="flex-1 px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Clear Filters
        </button>
        <button
          onclick={applyFilters}
          class="flex-1 btn btn-primary"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
{/if}