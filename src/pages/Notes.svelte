<script lang="ts">
  import type { Note } from '../lib/notes';
  import { deleteNote, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore } from '../lib/stores/tags';
  import { notesStore, notes, isLoadingNotes, hasMore, totalCount } from '../lib/stores/notes';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteModal from '../components/NoteModal.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import TagModal from '../components/TagModal.svelte';
  import NotesFilterModal from '../components/NotesFilterModal.svelte';
  import {
    Plus,
    RefreshCw,
    RotateCw,
    Settings,
    Tag as TagIcon,
    Trash2
  } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let searchQuery = $state('');

  // Filter state
  let activeFilters = $state<NoteFilters>({
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  let showFilterPanel = $state(false);

  // localStorage key for notes filter
  const NOTES_FILTER_STORAGE_KEY = 'notesFilters';

  // Save filters to localStorage
  function saveFiltersToStorage() {
    if (typeof localStorage === 'undefined') return;
    const filterData = {
      activeFilters,
      searchQuery,
      selectedIncludeTags,
      selectedExcludeTags
    };
    localStorage.setItem(NOTES_FILTER_STORAGE_KEY, JSON.stringify(filterData));
  }

  // Load filters from localStorage
  function loadFiltersFromStorage() {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(NOTES_FILTER_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  // Sorting state
  let showSortPanel = $state(false);

  // Modal state
  let isModalOpen = $state(false);
  let modalMode = $state<'create' | 'edit'>('create');
  let selectedNote = $state<Note | null>(null);

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

  // Tag selection state (using global store for available tags)
  let selectedIncludeTags = $state<string[]>([]);
  let selectedExcludeTags = $state<string[]>([]);

  async function loadNotes(append: boolean = false) {
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

    if (append) {
      // Load more - appends to existing notes
      await notesStore.loadMore(apiParams);
    } else {
      // Fresh load - clears and loads from page 1
      await notesStore.loadNotes(apiParams);
    }
  }

  async function loadMoreNotes() {
    await loadNotes(true);
  }

  async function handleRefresh() {
    await loadNotes(false);
  }

  async function handleDelete(note: Note) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await deleteNote(note.id);
      toast.success('Note deleted successfully');
      // Remove from store instead of refreshing
      notesStore.removeNote(note.id);
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
    tagsStore.loadTags(); // Load tags when opening edit modal
    modalMode = 'edit';
    selectedNote = note;
    isModalOpen = true;
  }

  function handleCreate() {
    tagsStore.loadTags(); // Load tags when opening create modal
    modalMode = 'create';
    selectedNote = null;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedNote = null;
  }

  function handleModalSuccess() {
    // NoteModal handles store updates (prepend for create, update for edit)
    // No need to refresh - just close modal
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
    tagsStore.loadTags(); // Load tags when modal is opened
    isTagModalOpen = true;
  }

  // Filter modal functions
  function openFilterModal() {
    tagsStore.loadTags(); // Load tags when opening filter modal
    showFilterModal = true;
  }

  function closeFilterModal() {
    showFilterModal = false;
  }

  function applyFilters(filters: NoteFilters, newSearchQuery: string, includeTags: string[], excludeTags: string[]) {
    activeFilters = { ...filters };
    searchQuery = newSearchQuery;
    selectedIncludeTags = [...includeTags];
    selectedExcludeTags = [...excludeTags];
    saveFiltersToStorage(); // Save to localStorage
    loadNotes(false);
  }

  function clearFilters() {
    activeFilters = {
      sortBy: 'created_at',
      sortOrder: 'desc'
    };
    searchQuery = '';
    selectedIncludeTags = [];
    selectedExcludeTags = [];
    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(NOTES_FILTER_STORAGE_KEY);
    }
    loadNotes(false);
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
    // Load filters from localStorage
    const storedFilters = loadFiltersFromStorage();
    if (storedFilters) {
      // Restore filter state from localStorage
      activeFilters = storedFilters.activeFilters;
      searchQuery = storedFilters.searchQuery || '';
      selectedIncludeTags = storedFilters.selectedIncludeTags || [];
      selectedExcludeTags = storedFilters.selectedExcludeTags || [];
    }

    // Check for tag filter in URL (URL param takes precedence over localStorage)
    const urlParams = new URLSearchParams(window.location.search);
    const tagFilter = urlParams.get('tag');

    if (tagFilter) {
      selectedIncludeTags = [tagFilter];
    }

    loadNotes(false);
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

  // Keyboard shortcut for Ctrl+F / Command+F to open filter modal
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+F or Command+F
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault(); // Prevent browser's default find
        openFilterModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
              {#if $totalCount > 0}
                <div class="flex items-center gap-2">
                  <span class="badge badge-primary text-xs">
                    {$totalCount}
                    {$totalCount === 1 ? 'Note' : 'Notes'}
                  </span>
                  <span class="text-xs text-secondary-500 dark:text-secondary-400 hidden sm:inline">
                    {$notes.length} shown
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
                disabled={$isLoadingNotes}
                class="w-8 h-8 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${$isLoadingNotes ? 'animate-spin' : ''}`}
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
          {#if $totalCount > 0}
            <div class="flex items-center gap-2 sm:hidden">
              <span class="text-xs text-secondary-500 dark:text-secondary-400">
                {$notes.length} shown
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
    {#if $isLoadingNotes}
      <div class="flex flex-col items-center justify-center py-20">
        <RotateCw class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
        <p class="text-secondary-500 dark:text-secondary-400">Loading notes...</p>
      </div>
    {:else if $notes.length === 0}
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
        {#each $notes as note (note.id)}
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
      {#if $hasMore}
        <div class="mt-8 flex justify-center">
          <button
            onclick={loadMoreNotes}
            disabled={$isLoadingNotes}
            class="btn btn-secondary flex items-center gap-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if $isLoadingNotes}
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
      {#if !$hasMore && $notes.length > 0}
        <div class="mt-8 text-center">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full"
          >
            <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
            <span class="text-sm text-secondary-600 dark:text-secondary-400">
              Showing all {$notes.length} notes
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
<NotesFilterModal
  isOpen={showFilterModal}
  onClose={closeFilterModal}
  onApply={applyFilters}
  onClear={clearFilters}
  title="Filter & Sort Notes"
  searchPlaceholder="Search notes..."
  showPublicFilter={hasAuthToken}
  defaultSortBy="created_at"
  defaultSortOrder="desc"
  initialFilters={activeFilters}
  initialSearchQuery={searchQuery}
  initialIncludeTags={selectedIncludeTags}
  initialExcludeTags={selectedExcludeTags}
/>

