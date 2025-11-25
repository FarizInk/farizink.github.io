<script lang="ts">
  import type { Note } from '../lib/notes';
  import { getNotes, deleteNote, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteModal from '../components/NoteModal.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import {
    Plus,
    Search,
    RefreshCw,
    RotateCw,
    Globe,
    Star,
    Settings,
    X,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Calendar
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

  function handleSortChange(sortBy: 'created_at' | 'updated_at', sortOrder: 'asc' | 'desc') {
    activeFilters = { ...activeFilters, sortBy, sortOrder };
    currentPage = 1;
    hasMore = true;
    loadNotes(1, false);
  }

  function getSortLabel() {
    if (!activeFilters.sortBy) return 'Sort';
    const sortOption = sortOptions.find(opt => opt.value === activeFilters.sortBy);
    const orderLabel = activeFilters.sortOrder === 'desc' ? '↓' : '↑';
    return sortOption ? `${sortOption.label} ${orderLabel}` : 'Sort';
  }

  function getSortIcon() {
    if (!activeFilters.sortBy) return ArrowUpDown;
    return activeFilters.sortOrder === 'desc' ? ArrowDown : ArrowUp;
  }

  // Modal state
  let isModalOpen = $state(false);
  let modalMode = $state<'create' | 'edit'>('create');
  let selectedNote = $state<Note | null>(null);
  let isRefreshing = $state(false);

  // Detail modal state
  let isDetailModalOpen = $state(false);
  let selectedDetailNote = $state<Note | null>(null);

  // Auth state for conditional UI
  let hasAuthToken = $state(
    typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false
  );

  // Debounced search
  let debouncedSearchQuery = $state('');
  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let isInitialLoad = $state(true);

  // Watch searchQuery for debounce
  $effect(() => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for 500ms debounce
    searchTimeout = setTimeout(() => {
      // Manually update the state using assignment
      const tempQuery = searchQuery;
      // Force reactivity
      debouncedSearchQuery = '';
      debouncedSearchQuery = tempQuery;
    }, 500);

    // Cleanup function
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  });

  // Watch debouncedSearchQuery for API call (only after initial load is complete)
  $effect(() => {
    // Only trigger search after initial load is complete
    if (!isInitialLoad) {
      // Load notes when debounced search changes
      currentPage = 1;
      hasMore = true;
      loadNotes(1, false);
    }
  });

  async function loadNotes(page: number = 1, append: boolean = false) {
    if (!append) {
      isLoading = true;
    } else {
      isLoadingMore = true;
    }

    try {
      // Build API parameters including search
      const apiParams: NoteFilters = {
        ...activeFilters
      };

      // Add search parameter if there's a search query
      if (debouncedSearchQuery.trim()) {
        apiParams.search = debouncedSearchQuery.trim();
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

  function handleFilterChange(key: keyof NoteFilters, value: boolean | undefined) {
    activeFilters = { ...activeFilters, [key]: value };
    currentPage = 1;
    hasMore = true;
    loadNotes(1, false);
  }

  function clearFilters() {
    activeFilters = {
      sortBy: 'created_at',
      sortOrder: 'desc'
    };
    currentPage = 1;
    hasMore = true;
    loadNotes(1, false);
  }

  function getActiveFilterCount() {
    return Object.values(activeFilters).filter(value => value !== undefined).length;
  }

  // Load notes on mount
  onMount(() => {
    loadNotes(1, false).finally(() => {
      isInitialLoad = false;
    });
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

  // Infinite scroll detection
  $effect(() => {
    const handleScroll = () => {
      if (!hasMore || isLoadingMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 1000; // Load 1000px before bottom

      if (scrollPosition >= threshold) {
        loadMoreNotes();
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  });

  // Listen for auth state changes
  $effect(() => {
    const handleAuthChange = () => {
      hasAuthToken =
        typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
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
        <div class="flex items-center justify-between">
          <!-- Left Section: Title & Stats -->
          <div class="flex items-center gap-4">
            <div>
              <h1 class="text-3xl font-bold text-secondary-900 dark:text-white tracking-tight">
                My Notes
              </h1>
              {#if totalCount > 0}
                <div class="flex items-center gap-2 mt-1">
                  <span class="badge badge-primary">
                    {totalCount}
                    {totalCount === 1 ? 'Note' : 'Notes'}
                  </span>
                  <span class="text-sm text-secondary-500 dark:text-secondary-400">
                    {notes.length} shown
                  </span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Right Section: Actions -->
          <div class="flex items-center gap-3">
            <!-- Search Bar -->
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  class="w-4 h-4 text-secondary-400 group-focus-within:text-primary-500 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Quick search..."
                class="input w-64 !pl-10"
                bind:value={searchQuery}
              />
            </div>

            <!-- Filter Button -->
            <div class="relative">
              <button
                onclick={() => (showFilterPanel = !showFilterPanel)}
                class="flex items-center gap-2 px-3 py-1.5 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                title="Filter notes"
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

              <!-- Filter Panel -->
              {#if showFilterPanel}
                <div
                  class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 z-50"
                >
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="font-semibold text-secondary-900 dark:text-white">Filters</h3>
                      <button
                        onclick={() => (showFilterPanel = false)}
                        class="w-6 h-6 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    </div>

                    <!-- isPublic Filter - Only show when authenticated -->
                    {#if hasAuthToken}
                      <div class="mb-4">
                        <label
                          class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 block"
                        >
                          <Globe class="w-4 h-4 inline mr-1" />
                          Public Status
                        </label>
                        <div class="flex gap-2">
                          <button
                            onclick={() => handleFilterChange('isPublic', true)}
                            class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors {activeFilters.isPublic ===
                            true
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                          >
                            Public Only
                          </button>
                          <button
                            onclick={() => handleFilterChange('isPublic', false)}
                            class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors {activeFilters.isPublic ===
                            false
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                          >
                            Private Only
                          </button>
                          <button
                            onclick={() => handleFilterChange('isPublic', undefined)}
                            class="px-3 py-2 text-xs rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors {activeFilters.isPublic ===
                            undefined
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                              : ''}"
                          >
                            All
                          </button>
                        </div>
                      </div>
                    {/if}

                    <!-- isFavorite Filter -->
                    <div class="mb-4">
                      <label
                        class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 block"
                      >
                        <Star class="w-4 h-4 inline mr-1" />
                        Favorite Status
                      </label>
                      <div class="flex gap-2">
                        <button
                          onclick={() => handleFilterChange('isFavorite', true)}
                          class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors {activeFilters.isFavorite ===
                          true
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                        >
                          Favorites Only
                        </button>
                        <button
                          onclick={() => handleFilterChange('isFavorite', false)}
                          class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors {activeFilters.isFavorite ===
                          false
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                        >
                          Non-Favorites
                        </button>
                        <button
                          onclick={() => handleFilterChange('isFavorite', undefined)}
                          class="px-3 py-2 text-xs rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors {activeFilters.isFavorite ===
                          undefined
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : ''}"
                        >
                          All
                        </button>
                      </div>
                    </div>

                    <!-- Clear Filters -->
                    {#if getActiveFilterCount() > 0}
                      <button
                        onclick={clearFilters}
                        class="w-full px-3 py-2 text-xs bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                      >
                        Clear All Filters
                      </button>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>

            <!-- Sort Button -->
            <div class="relative">
              <button
                onclick={() => (showSortPanel = !showSortPanel)}
                class="flex items-center gap-2 px-3 py-1.5 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                title="Sort notes"
              >
                {#if getSortIcon() === ArrowUpDown}
                  <ArrowUpDown class="w-4 h-4" />
                {:else if getSortIcon() === ArrowDown}
                  <ArrowDown class="w-4 h-4" />
                {:else}
                  <ArrowUp class="w-4 h-4" />
                {/if}
                <span class="text-sm font-medium">{getSortLabel()}</span>
              </button>

              <!-- Sort Panel -->
              {#if showSortPanel}
                <div
                  class="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 z-50"
                >
                  <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                      <h3 class="font-semibold text-secondary-900 dark:text-white">Sort By</h3>
                      <button
                        onclick={() => (showSortPanel = false)}
                        class="w-6 h-6 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center"
                      >
                        <X class="w-4 h-4" />
                      </button>
                    </div>

                    {#each sortOptions as option (option.value)}
                      <div class="mb-3">
                        <div
                          class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1"
                        >
                          <Calendar class="w-4 h-4" />
                          {option.label}
                        </div>
                        <div class="flex gap-2">
                          <button
                            onclick={() => handleSortChange(option.value, 'desc')}
                            class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors flex items-center justify-center gap-1 {activeFilters.sortBy ===
                              option.value && activeFilters.sortOrder === 'desc'
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                          >
                            <ArrowDown class="w-3 h-3" />
                            Newest
                          </button>
                          <button
                            onclick={() => handleSortChange(option.value, 'asc')}
                            class="flex-1 px-3 py-2 text-xs rounded-md border transition-colors flex items-center justify-center gap-1 {activeFilters.sortBy ===
                              option.value && activeFilters.sortOrder === 'asc'
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                              : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                          >
                            <ArrowUp class="w-3 h-3" />
                            Oldest
                          </button>
                        </div>
                      </div>
                    {/each}

                    <!-- Clear Sort -->
                    {#if activeFilters.sortBy}
                      <button
                        onclick={() => {
                          activeFilters = {
                            ...activeFilters,
                            sortBy: undefined,
                            sortOrder: undefined
                          };
                          currentPage = 1;
                          loadNotes(1);
                          showSortPanel = false;
                        }}
                        class="w-full px-3 py-2 text-xs bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 rounded-md transition-colors"
                      >
                        Clear Sort
                      </button>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>

            <!-- Quick Actions -->
            <div
              class="flex items-center gap-2 p-1 bg-secondary-100 dark:bg-secondary-800 rounded-lg"
            >
              <!-- Refresh -->
              <button
                onclick={handleRefresh}
                disabled={isRefreshing}
                class="w-9 h-9 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>

              <!-- Divider -->
              <div class="w-px h-6 bg-secondary-300 dark:bg-secondary-600"></div>

              <!-- Create Note - Only show when authenticated -->
              {#if hasAuthToken}
                <button
                  onclick={handleCreate}
                  class="btn btn-primary flex items-center gap-2 px-3 py-1.5 text-sm"
                >
                  <Plus class="w-4 h-4" />
                  New Note
                </button>
              {/if}
            </div>
          </div>
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
      <!-- Notes Grid -->
      <div class="notes-grid">
        {#each notes as note (note.id)}
          <NoteCard
            {note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            {hasAuthToken}
            onShowDetail={handleShowDetail}
          />
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
{#if selectedDetailNote}
  <NoteDetailModal
    note={selectedDetailNote}
    bind:isOpen={isDetailModalOpen}
    onClose={handleDetailModalClose}
    onEdit={handleEdit}
    onDelete={handleDelete}
    {hasAuthToken}
  />
{/if}

<!-- Notes Grid Styles -->
<style>
  .notes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 640px) {
    .notes-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .notes-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
