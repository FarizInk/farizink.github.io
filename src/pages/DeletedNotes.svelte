<script lang="ts">
  import type { Note } from '../lib/notes';
  import { type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore } from '../lib/stores/tags';
  import { deletedNotesStore, deletedNotes, isLoadingDeletedNotes, hasMoreDeleted, deletedCount } from '../lib/stores/notes';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import NotesFilterModal from '../components/NotesFilterModal.svelte';
  import {
    Plus,
    RefreshCw,
    RotateCw,
    Settings,
    Trash2,
    AlertTriangle,
    Calendar,
    Clock
  } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let searchQuery = $state('');

  // Filter state
  let activeFilters = $state<NoteFilters>({
    sortBy: 'deleted_at',
    sortOrder: 'desc'
  });
  let showFilterModal = $state(false);

  // Tag selection state
  let selectedIncludeTags = $state<string[]>([]);
  let selectedExcludeTags = $state<string[]>([]);

  // Modal state
  let selectedDetailNote = $state<Note | null>(null);
  let isDetailModalOpen = $state(false);

  // Auth state
  let hasAuthToken = $state(
    typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false
  );

  async function loadNotes(append: boolean = false) {
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

    if (append) {
      // Load more - appends to existing notes
      await deletedNotesStore.loadMoreDeleted(apiParams);
    } else {
      // Fresh load - clears and loads from page 1
      await deletedNotesStore.loadDeletedNotes(apiParams);
    }
  }

  async function loadMoreNotes() {
    await loadNotes(true);
  }

  async function handleRefresh() {
    await loadNotes(false);
  }

  async function handlePermanentDelete(note: Note) {
    const confirmMessage = `Are you sure you want to permanently delete this note?${note.files && note.files.length > 0 ? `\n\nThis will also delete ${note.files.length} file(s) from storage.` : ''}\n\nThis action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      await deletedNotesStore.permanentlyDeleteNote(note.id);
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
    loadNotes(false);
  }

  function clearFilters() {
    activeFilters = {
      sortBy: 'deleted_at',
      sortOrder: 'desc'
    };
    searchQuery = '';
    selectedIncludeTags = [];
    selectedExcludeTags = [];
    loadNotes(false);
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
    loadNotes(false);
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
              {#if $deletedCount > 0}
                <div class="flex items-center gap-2">
                  <span class="badge badge-danger text-xs">
                    {$deletedCount}
                    {$deletedCount === 1 ? 'Item' : 'Items'}
                  </span>
                  <span class="text-xs text-secondary-500 dark:text-secondary-400 hidden sm:inline">
                    {$deletedNotes.length} shown
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
                disabled={$isLoadingDeletedNotes}
                class="w-8 h-8 rounded-md hover:bg-secondary-200 dark:hover:bg-secondary-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                title="Refresh"
              >
                <RefreshCw
                  class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${$isLoadingDeletedNotes ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
          </div>

          <!-- Mobile Stats Only -->
          {#if $deletedCount > 0}
            <div class="flex items-center gap-2 sm:hidden">
              <span class="text-xs text-secondary-500 dark:text-secondary-400">
                {$deletedNotes.length} shown
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
    {#if $isLoadingDeletedNotes}
      <div class="flex flex-col items-center justify-center py-20">
        <RotateCw class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin mb-4" />
        <p class="text-secondary-500 dark:text-secondary-400">Loading deleted notes...</p>
      </div>
    {:else if $deletedNotes.length === 0}
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
        {#each $deletedNotes as note (note.id)}
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
      {#if $hasMoreDeleted}
        <div class="mt-8 flex justify-center">
          <button
            onclick={loadMoreNotes}
            disabled={$isLoadingDeletedNotes}
            class="btn btn-secondary flex items-center gap-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if $isLoadingDeletedNotes}
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
      {#if !$hasMoreDeleted && $deletedNotes.length > 0}
        <div class="mt-8 text-center">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full"
          >
            <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
            <span class="text-sm text-secondary-600 dark:text-secondary-400">
              Showing all {$deletedNotes.length} deleted notes
            </span>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<!-- Note Detail Modal -->
<NoteDetailModal
  note={selectedDetailNote}
  bind:isOpen={isDetailModalOpen}
  onClose={handleDetailModalClose}
  {hasAuthToken}
  isDeleted={true}
  onPermanentDelete={handlePermanentDelete}
/>

<!-- Filter Modal -->
<NotesFilterModal
  isOpen={showFilterModal}
  onClose={closeFilterModal}
  onApply={applyFilters}
  onClear={clearFilters}
  title="Filter Deleted Notes"
  searchPlaceholder="Search deleted notes..."
  sortOptions={[
    { value: 'created_at', label: 'Date Created', icon: Calendar },
    { value: 'updated_at', label: 'Last Updated', icon: Calendar },
    { value: 'deleted_at', label: 'Date Deleted', icon: Clock }
  ]}
  showPublicFilter={true}
  defaultSortBy="deleted_at"
  defaultSortOrder="desc"
  initialFilters={activeFilters}
  initialSearchQuery={searchQuery}
  initialIncludeTags={selectedIncludeTags}
  initialExcludeTags={selectedExcludeTags}
/>