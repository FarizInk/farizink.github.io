<script lang="ts">
  import type { Note } from '../lib/notes';
  import { deleteNote, getNote, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore } from '../lib/stores/tags';
  import { notesStore, notes, isLoadingNotes, hasMore, totalCount } from '../lib/stores/notes';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteModal from '../components/NoteModal.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import TagModal from '../components/TagModal.svelte';
  import NotesFilterModal from '../components/NotesFilterModal.svelte';
  import DeletedNotesModal from '../components/DeletedNotesModal.svelte';
  import {
    Plus,
    RefreshCw,
    RotateCw,
    Settings,
    Tag as TagIcon,
    Trash2,
    ArrowLeft,
    Share2,
    Pencil,
    Calendar,
    Link2
  } from '@lucide/svelte';
  import { onMount } from 'svelte';

  // View mode: 'list' for normal notes list, 'detail' for single note view
  let viewMode = $state<'list' | 'detail'>('list');
  let singleNote = $state<Note | null>(null);
  let isLoadingSingleNote = $state(false);
  let isLoadingMore = $state(false);

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

  // Deleted notes modal state
  let showDeletedNotesModal = $state(false);

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
    if (isLoadingMore) return;
    isLoadingMore = true;
    try {
      await loadNotes(true);
    } finally {
      isLoadingMore = false;
    }
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
    // NoteModal handles store updates
    // Just clear local state - filters stay as they are
    selectedNote = null;
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

  function openDeletedNotesModal() {
    showDeletedNotesModal = true;
  }

  function handleDeletedNotesModalClose() {
    showDeletedNotesModal = false;
  }

  function backToList() {
    viewMode = 'list';
    singleNote = null;
    window.history.replaceState({}, '', '/notes');
  }

  function handleShare(note: Note) {
    const shareUrl = `${window.location.origin}/notes?id=${note.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
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
  onMount(async () => {
    // Check for id query parameter first (single note view)
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (noteId) {
      // Load single note
      viewMode = 'detail';
      isLoadingSingleNote = true;
      try {
        const response = await getNote(noteId);
        singleNote = response.data;
      } catch (error) {
        toast.error('Note not found');
        console.error('Get note error:', error);
        // Redirect to list view on error
        viewMode = 'list';
        window.history.replaceState({}, '', '/notes');
      } finally {
        isLoadingSingleNote = false;
      }
      return; // Don't load notes list
    }

    // Normal list view - Load filters from localStorage
    const storedFilters = loadFiltersFromStorage();
    if (storedFilters) {
      // Restore filter state from localStorage
      activeFilters = storedFilters.activeFilters;
      searchQuery = storedFilters.searchQuery || '';
      selectedIncludeTags = storedFilters.selectedIncludeTags || [];
      selectedExcludeTags = storedFilters.selectedExcludeTags || [];
    }

    // Check for tag filter in URL (URL param takes precedence over localStorage)
    const tagFilter = urlParams.get('tag');

    if (tagFilter) {
      selectedIncludeTags = [tagFilter];
    }

    loadNotes(false);

    // Load tags on mount - only if authenticated
    const hasToken = typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    if (hasToken) {
      tagsStore.loadTags();
    }
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

      // Load tags when user logs in - force refresh
      if (newHasAuthToken && !previousHasAuthToken) {
        tagsStore.loadTags(true);
      }
      // Clear selections when user logs out
      if (!newHasAuthToken && previousHasAuthToken) {
        selectedIncludeTags = [];
        selectedExcludeTags = [];
      }
    };

    // Listen for login event
    document.addEventListener('login-success', handleAuthChange);
    // Listen for logout event
    document.addEventListener('logout-success', handleAuthChange);

    // Listen for storage changes (in case login/logout happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'isLoggedIn') {
        handleAuthChange();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('login-success', handleAuthChange);
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

<style>
  /* Prose styling for note description */
  :global(.prose p) {
    line-height: 1.7;
    margin: 0 0 1em 0;
  }

  :global(.prose ul),
  :global(.prose ol) {
    margin: 0.75em 0;
    padding-left: 1.5em;
  }

  :global(.prose ul) {
    list-style-type: disc;
  }

  :global(.prose ol) {
    list-style-type: decimal;
  }

  :global(.prose li p) {
    margin-bottom: 0;
  }

  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4),
  :global(.prose h5),
  :global(.prose h6) {
    margin: 1.25em 0 0.5em 0;
    font-weight: 600;
    line-height: 1.3;
  }

  :global(.prose h1) {
    font-size: 1.875rem;
  }

  :global(.prose h2) {
    font-size: 1.5rem;
  }

  :global(.prose h3) {
    font-size: 1.25rem;
  }

  :global(.prose a) {
    color: rgb(139 92 246);
    text-decoration: underline;
  }

  :global(.dark .prose a) {
    color: rgb(167 139 250);
  }

  :global(.prose code) {
    background-color: rgb(243 244 246);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }

  :global(.dark .prose code) {
    background-color: rgb(31 41 55);
  }

  :global(.prose pre) {
    background-color: rgb(243 244 246);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1em 0;
  }

  :global(.dark .prose pre) {
    background-color: rgb(31 41 55);
  }

  :global(.prose pre code) {
    background-color: transparent;
    padding: 0;
  }

  :global(.prose blockquote) {
    border-left: 4px solid rgb(139 92 246);
    padding-left: 1rem;
    margin: 1em 0;
    color: rgb(107 114 128);
    font-style: italic;
  }

  :global(.dark .prose blockquote) {
    color: rgb(156 163 175);
    border-left-color: rgb(139 92 246);
  }

  :global(.prose strong) {
    font-weight: 600;
  }

  :global(.prose em) {
    font-style: italic;
  }

  :global(.prose hr) {
    border: none;
    border-top: 1px solid rgb(229 231 235);
    margin: 2em 0;
  }

  :global(.dark .prose hr) {
    border-top-color: rgb(55 65 81);
  }
</style>

<div class="min-h-screen">
  {#if viewMode === 'list'}
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
                  <span class="badge bg-yellow-100 text-yellow-700 dark:bg-primary-900 dark:text-primary-300 text-xs">
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
                    class="w-5 h-5 bg-yellow-600 dark:bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {getActiveFilterCount()}
                  </span>
                {/if}
              </button>

              <!-- Refresh -->
              <button
                onclick={handleRefresh}
                disabled={$isLoadingNotes || isLoadingMore}
                class="w-8 h-8 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-yellow-600 dark:group-hover:text-primary-400 transition-colors ${$isLoadingNotes ? 'animate-spin' : ''}`}
                />
              </button>

              <!-- Manage Tags - Only show when authenticated -->
              {#if hasAuthToken}
                <button
                  onclick={openDeletedNotesModal}
                  class="flex items-center gap-1 px-2 py-1.5 text-xs sm:text-sm bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-md transition-colors"
                  title="View deleted notes"
                >
                  <Trash2 class="w-4 h-4" />
                  <span class="hidden sm:inline">Trash</span>
                </button>

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
                  class="btn flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-primary-600 dark:hover:bg-primary-700"
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
  {/if}

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if viewMode === 'list'}
    <!-- Loading State - Only show when no notes yet -->
    {#if $isLoadingNotes && $notes.length === 0}
      <div class="flex flex-col items-center justify-center py-20">
        <RotateCw class="w-8 h-8 text-yellow-600 dark:text-primary-400 animate-spin mb-4" />
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
            <button onclick={handleCreate} class="btn bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-primary-600 dark:hover:bg-primary-700">
              <Plus class="w-4 h-4 mr-2" />
              Create Your First Note
            </button>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Notes List -->
      <div class="flex flex-col items-center gap-6">
        {#each $notes.filter(n => n) as note (note.id)}
          <div class="w-full max-w-2xl">
            <NoteCard
              {note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              {hasAuthToken}
              onShowDetail={handleShowDetail}
              onShare={handleShare}
            />
          </div>
        {/each}
      </div>

      <!-- Load More Button / End Indicator -->
      <div class="mt-8 flex justify-center">
        {#if $hasMore}
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
        {:else if $notes.length > 0}
          <!-- End of list - show total count -->
          <div class="flex items-center gap-3">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full"
            >
              <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
              <span class="text-sm text-secondary-600 dark:text-secondary-400">
                Showing all {$notes.length} of {$totalCount} notes
              </span>
            </div>
          </div>
        {:else}
          <!-- No notes state -->
          <div class="text-center">
            <p class="text-secondary-500 dark:text-secondary-400">No notes found</p>
          </div>
        {/if}
      </div>
    {/if}
    {:else if viewMode === 'detail'}
      <!-- Single Note Detail View -->
      {#if isLoadingSingleNote}
        <div class="flex flex-col items-center justify-center py-20">
          <RotateCw class="w-8 h-8 text-yellow-600 dark:text-primary-400 animate-spin mb-4" />
          <p class="text-secondary-500 dark:text-secondary-400">Loading note...</p>
        </div>
      {:else if singleNote}
        <!-- Note Detail Content -->
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-secondary-200 dark:border-secondary-700 px-6 py-4 mb-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  {#if singleNote.is_favorite}
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 flex items-center justify-center">
                      <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  {/if}
                  <h1 class="text-2xl font-bold text-secondary-900 dark:text-white truncate">
                    {singleNote.name || 'Untitled Note'}
                  </h1>
                </div>
                <div class="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400">
                  <div class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    <span>Created: {new Date(singleNote.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Updated: {new Date(singleNote.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex items-center gap-2">
                {#if singleNote.link}
                  <button
                    onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                    class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center transition-colors"
                    title="Open link"
                  >
                    <Link2 class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                {/if}
                <button
                  onclick={() => handleShare(singleNote)}
                  class="w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-blue-300 dark:hover:border-blue-800 flex items-center justify-center transition-colors"
                  title="Share note"
                >
                  <Share2 class="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
                </button>
                {#if hasAuthToken}
                  <button
                    onclick={() => handleEdit(singleNote)}
                    class="w-10 h-10 rounded-lg bg-yellow-50 dark:bg-primary-900/20 hover:bg-yellow-100 dark:hover:bg-primary-900/30 border border-yellow-200 dark:border-primary-800 flex items-center justify-center transition-colors"
                    title="Edit note"
                  >
                    <Pencil class="w-5 h-5 text-yellow-600 dark:text-primary-400" />
                  </button>
                  <button
                    onclick={() => {
                      if (confirm('Are you sure you want to delete this note?')) {
                        handleDelete(singleNote);
                        backToList();
                      }
                    }}
                    class="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center transition-colors"
                    title="Delete note"
                  >
                    <Trash2 class="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                {/if}
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-secondary-200 dark:border-secondary-700 p-6 space-y-6">
            <!-- Link Section -->
            {#if singleNote.link}
              <div class="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex items-center gap-3">
                  <Link2 class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">External Link</p>
                    <a
                      href={singleNote.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 truncate block"
                    >
                      {singleNote.link}
                    </a>
                  </div>
                  <button
                    onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                    class="px-3 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Visit
                  </button>
                </div>
              </div>
            {/if}

            <!-- Description -->
            {#if singleNote.description}
              <div>
                <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <div class="w-1 h-6 bg-yellow-600 dark:bg-primary-600 rounded-full"></div>
                  Description
                </h3>
                <div class="prose prose-sm max-w-none dark:prose-invert text-secondary-700 dark:text-secondary-300">
                  {@html singleNote.description}
                </div>
              </div>
            {/if}

            <!-- Images -->
            {#if singleNote.files && singleNote.files.filter(f => f.mime_type.startsWith('image/')).length > 0}
              <div>
                <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Images ({singleNote.files.filter(f => f.mime_type.startsWith('image/')).length})
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {#each singleNote.files.filter(f => f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
                    <div class="group relative bg-secondary-50 dark:bg-secondary-700 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <div class="aspect-square bg-secondary-100 dark:bg-secondary-600">
                        <img
                          src={file.presigned_url || file.url || `data:${file.mime_type};base64,${file.data}`}
                          alt={file.original_name}
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div class="absolute bottom-0 left-0 right-0 p-3">
                          <p class="text-white text-sm font-medium truncate">{file.original_name}</p>
                          <p class="text-white/80 text-xs">{(file.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Other Files -->
            {#if singleNote.files && singleNote.files.filter(f => !f.mime_type.startsWith('image/')).length > 0}
              <div>
                <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  Files ({singleNote.files.filter(f => !f.mime_type.startsWith('image/')).length})
                </h3>
                <div class="space-y-3">
                  {#each singleNote.files.filter(f => !f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
                    <div class="flex items-center gap-4 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg border border-secondary-200 dark:border-secondary-600">
                      <div class="w-12 h-12 bg-secondary-200 dark:bg-secondary-600 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-secondary-500 dark:text-secondary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-secondary-900 dark:text-white truncate">{file.original_name}</p>
                        <p class="text-sm text-secondary-500 dark:text-secondary-400">{(file.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <a
                        href={file.presigned_url || file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        View
                      </a>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Tags -->
            {#if singleNote.tags && singleNote.tags.length > 0}
              <div>
                <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  Tags
                </h3>
                <div class="flex flex-wrap gap-2">
                  {#each singleNote.tags as tag (tag.id)}
                    <div
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border {!tag.color ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700' : ''}"
                      style="background-color: {tag.color ? tag.color + '20' : undefined}; color: {tag.color || undefined}; border-color: {tag.color ? tag.color + '40' : undefined}"
                    >
                      <div
                        class="w-2 h-2 rounded-full {!tag.color ? 'bg-yellow-600 dark:bg-primary-600' : ''}"
                        style="background-color: {tag.color || undefined}"
                      ></div>
                      <span class="text-sm font-medium">{tag.name || tag.tag}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Empty State -->
            {#if !singleNote.description && (!singleNote.tags || singleNote.tags.length === 0) && !singleNote.link && (!singleNote.files || singleNote.files.length === 0)}
              <div class="text-center py-12">
                <div class="w-16 h-16 bg-secondary-100 dark:bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar class="w-8 h-8 text-secondary-400" />
                </div>
                <p class="text-secondary-500 dark:text-secondary-400">No additional content available</p>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Note not found -->
        <div class="text-center py-20">
          <div class="max-w-md mx-auto">
            <h2 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              Note not found
            </h2>
            <p class="text-secondary-500 dark:text-secondary-400 mb-6">
              The note you're looking for doesn't exist or has been deleted.
            </p>
            <button onclick={backToList} class="btn bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-primary-600 dark:hover:bg-primary-700">
              Back to Notes
            </button>
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
  onShare={handleShare}
/>

<!-- Tag Management Modal -->
<TagModal
  bind:isOpen={isTagModalOpen}
  on:close={() => {
    isTagModalOpen = false;
    // Refresh tags after tag management from global store - force refresh
    tagsStore.loadTags(true);
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

<!-- Deleted Notes Modal -->
<DeletedNotesModal
  bind:isOpen={showDeletedNotesModal}
  onClose={handleDeletedNotesModalClose}
/>

