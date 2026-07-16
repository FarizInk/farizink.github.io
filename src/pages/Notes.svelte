<script lang="ts">
  import type { Note } from '../lib/notes';
  import { deleteNote, getNote, regenerateSummarize, togglePin, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore } from '../lib/stores/tags';
  import { notesStore, notes, notesError, isLoadingNotes, hasMore, totalCount } from '../lib/stores/notes';
  import NoteCard from '../components/NoteCard.svelte';
  import NoteCardSkeleton from '../components/NoteCardSkeleton.svelte';
  import NoteModal from '../components/NoteModal.svelte';
  import NoteDetailModal from '../components/NoteDetailModal.svelte';
  import TagModal from '../components/TagModal.svelte';
  import NotesFilterModal from '../components/NotesFilterModal.svelte';
  import DeletedNotesModal from '../components/DeletedNotesModal.svelte';
  import NotesShortcutsModal from '../components/NotesShortcutsModal.svelte';
  import {
    Plus,
    Pin,
    RefreshCw,
    RotateCw,
    Tag as TagIcon,
    Trash2,
    Share2,
    Pencil,
    Calendar,
    Link2,
    Star,
    Clock,
    Image as ImageIcon,
    File,
    Tag,
    Search,
    Sparkles,
    Filter,
    X,
    BookOpen,
    Keyboard,
    Loader2
  } from '@lucide/svelte';
  import { onMount } from 'svelte';

  // View mode: 'list' for normal notes list, 'detail' for single note view
  let viewMode = $state<'list' | 'detail'>('list');
  let singleNote = $state<Note | null>(null);
  let isLoadingSingleNote = $state(false);
  let deletingNoteId = $state<string | null>(null);
  let isLoadingMore = $state(false);
  let isRegeneratingSummarize = $state(false);
  let isSummaryFull = $state(false);

  let searchQuery = $state('');

  // Filter state
  let activeFilters = $state<NoteFilters>({
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

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

  // Modal state
  let isModalOpen = $state(false);
  let modalMode = $state<'create' | 'edit'>('create');
  let selectedNote = $state<Note | null>(null);

  // Detail modal state
  let isDetailModalOpen = $state(false);
  let selectedDetailNote = $state<Note | null>(null);

  // Keyboard navigation state: id of the focused note card, helper-modal flag,
  // and a ref of the search input (focused by the `/` shortcut).
  let focusedNoteId = $state<string | null>(null);
  let showShortcutsModal = $state(false);
  let searchInput = $state<HTMLInputElement | null>(null);

  // Pinned-first partition of the loaded notes. The API already returns notes
  // pinned-first, so this just splits the cached array to drive a separate
  // "Pinned" list section.
  let pinnedNotes = $derived($notes.filter(n => n && n.is_pinned));
  let otherNotes = $derived($notes.filter(n => n && !n.is_pinned));

  // Combined visual order for keyboard navigation (pinned first, then others)
  let orderedNotes = $derived([...pinnedNotes, ...otherNotes]);
  let focusedIndex = $derived(
    focusedNoteId ? orderedNotes.findIndex(n => n.id === focusedNoteId) : -1
  );

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

  // Tag selection state
  let selectedIncludeTags = $state<string[]>([]);
  let selectedExcludeTags = $state<string[]>([]);

  async function loadNotes(append: boolean = false, showErrorToast: boolean = true) {
    const apiParams: NoteFilters = {
      ...activeFilters,
      includeTags: selectedIncludeTags.length > 0 ? selectedIncludeTags : undefined,
      excludeTags: selectedExcludeTags.length > 0 ? selectedExcludeTags : undefined
    };

    if (searchQuery.trim()) {
      apiParams.search = searchQuery.trim();
    }

    if (append) {
      await notesStore.loadMore(apiParams);
    } else {
      await notesStore.loadNotes(apiParams, true, showErrorToast);
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

  function handleRefresh() {
    const refreshPromise = (async () => {
      await loadNotes(false, false);
      if ($notesError) throw new Error($notesError);
    })();

    return toast.promise(refreshPromise, {
      loading: 'Refreshing notes...',
      success: 'Notes are up to date',
      error: error => (error instanceof Error ? error.message : 'Failed to refresh notes')
    });
  }

  async function handleDelete(note: Note) {
    if (deletingNoteId === note.id) return;
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    const replaceIndex = focusedIndex; // captured before the note leaves the list
    deletingNoteId = note.id;
    const deletePromise = (async () => {
      await deleteNote(note.id);
      notesStore.removeNote(note.id);
      const replacement = orderedNotes[replaceIndex] ?? orderedNotes[replaceIndex - 1] ?? null;
      focusedNoteId = replacement ? replacement.id : null;
    })();

    toast.promise(deletePromise, {
      loading: 'Deleting note...',
      success: 'Note deleted successfully',
      error: error => (error instanceof Error ? error.message : 'Failed to delete note')
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error('Delete note error:', error);
    } finally {
      deletingNoteId = null;
    }
  }

  function handleEdit(note: Note) {
    // Check if mobile - redirect to edit page
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      // Mobile: redirect to edit page
      window.location.href = `/notes/edit/${note.id}`;
    } else {
      // Desktop: use modal
      tagsStore.loadTags();
      modalMode = 'edit';
      selectedNote = note;
      isModalOpen = true;
    }
  }

  // Apply a pin state to the store + any open detail view, re-sorting the list
  // pinned-first (stable, so within-group order from the server is preserved).
  function applyPinState(noteId: string, pinned: boolean) {
    notes.update(arr => {
      const updated = arr.map(n => (n.id === noteId ? { ...n, is_pinned: pinned } : n));
      return [...updated].sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned));
    });
    if (selectedDetailNote && selectedDetailNote.id === noteId) {
      selectedDetailNote = { ...selectedDetailNote, is_pinned: pinned };
    }
    if (singleNote && singleNote.id === noteId) {
      singleNote = { ...singleNote, is_pinned: pinned };
    }
  }

  async function handleTogglePin(note: Note) {
    const newPinned = !note.is_pinned;
    applyPinState(note.id, newPinned); // optimistic
    const pinPromise = (async () => {
      const res = await togglePin(note.id);
      const serverPinned = res.data.is_pinned;
      if (serverPinned !== newPinned) {
        applyPinState(note.id, serverPinned);
      }
      return serverPinned;
    })();

    toast.promise(pinPromise, {
      loading: newPinned ? 'Pinning note...' : 'Unpinning note...',
      success: pinned => (pinned ? 'Note pinned' : 'Note unpinned'),
      error: 'Failed to toggle pin'
    });

    try {
      await pinPromise;
    } catch (error) {
      console.error('Toggle pin error:', error);
      applyPinState(note.id, note.is_pinned); // revert to original
    }
  }

  function handleCreate() {
    // Check if mobile - redirect to create page
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      // Mobile: redirect to create page
      window.location.href = '/notes/create';
    } else {
      // Desktop: use modal
      tagsStore.loadTags();
      modalMode = 'create';
      selectedNote = null;
      isModalOpen = true;
    }
  }

  function handleModalSuccess(savedNote: Note) {
    if (modalMode === 'create') {
      notesStore.prependItem(savedNote);
      notes.update(currentNotes => [savedNote, ...currentNotes]);
    } else if (modalMode === 'edit') {
      notesStore.updateItem('id', savedNote.id, savedNote);
      notes.update(currentNotes =>
        currentNotes.map(n => n.id === savedNote.id ? savedNote : n)
      );
      // Refresh any open detail view showing this note so it doesn't display
      // stale content after the edit — selectedDetailNote/singleNote hold their
      // own references, which the store update above does not touch.
      if (selectedDetailNote && selectedDetailNote.id === savedNote.id) {
        selectedDetailNote = savedNote;
      }
      if (singleNote && singleNote.id === savedNote.id) {
        singleNote = savedNote;
      }
    }
    selectedNote = null;
  }

  // Move keyboard focus by delta (+1 = next/down, -1 = previous/up), clamped to
  // the list bounds. With no current focus, only "next" starts at the first card.
  function moveFocus(delta: number) {
    if (orderedNotes.length === 0) return;
    if (focusedIndex < 0) {
      if (delta > 0) focusedNoteId = orderedNotes[0].id;
      return;
    }
    const next = Math.max(0, Math.min(focusedIndex + delta, orderedNotes.length - 1));
    focusedNoteId = orderedNotes[next].id;
  }

  function handleShowDetail(note: Note) {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      // Mobile: redirect to detail page via URL
      window.location.href = `/notes?id=${note.id}`;
    } else {
      // Desktop: use modal
      selectedDetailNote = note;
      isDetailModalOpen = true;
    }
  }

  function handleDetailModalClose() {
    isDetailModalOpen = false;
    selectedDetailNote = null;
  }

  function handleTagModalOpen() {
    tagsStore.loadTags();
    isTagModalOpen = true;
  }

  // Filter modal functions
  function openFilterModal() {
    tagsStore.loadTags();
    showFilterModal = true;
  }

  function closeFilterModal() {
    showFilterModal = false;
  }

  function applyFilters(
    filters: NoteFilters,
    newSearchQuery: string,
    includeTags: string[],
    excludeTags: string[]
  ) {
    activeFilters = { ...filters };
    // searchQuery is now bound, no need to assign
    selectedIncludeTags = [...includeTags];
    selectedExcludeTags = [...excludeTags];
    saveFiltersToStorage();
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
    // Reload notes when going back to list
    loadNotes(false);
  }

  function handleShare(note: Note) {
    const shareUrl = `${window.location.origin}/notes?id=${note.id}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  }

  async function handleRegenerateSummarize(note: Note) {
    if (!note.link) return;

    isRegeneratingSummarize = true;
    const regeneratePromise = (async () => {
      const response = await regenerateSummarize(note.id);
      if (singleNote && singleNote.id === note.id) {
        singleNote.link_summarize = response.data.link_summarize;
      }
      return response;
    })();

    toast.promise(regeneratePromise, {
      loading: 'Regenerating link summary...',
      success: 'Link summary regenerated successfully',
      error: error => (error instanceof Error ? error.message : 'Failed to regenerate summary')
    });

    try {
      await regeneratePromise;
    } catch (error) {
      console.error('Regenerate summarize error:', error);
    } finally {
      isRegeneratingSummarize = false;
    }
  }

  function getActiveFilterCount() {
    const count = Object.entries(activeFilters).filter(([key, value]) => {
      if (key === 'sortBy' && value === 'created_at') return false;
      if (key === 'sortOrder' && value === 'desc') return false;
      return value !== undefined && value !== null;
    }).length;

    const tagFilterCount =
      (selectedIncludeTags.length > 0 ? 1 : 0) + (selectedExcludeTags.length > 0 ? 1 : 0);

    return searchQuery.trim() ? count + tagFilterCount + 1 : count + tagFilterCount;
  }

  // Load notes and tags on mount
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (noteId) {
      viewMode = 'detail';
      isLoadingSingleNote = true;
      try {
        const response = await getNote(noteId);
        singleNote = response.data;
      } catch (error) {
        toast.error('Note not found');
        console.error('Get note error:', error);
        viewMode = 'list';
        window.history.replaceState({}, '', '/notes');
      } finally {
        isLoadingSingleNote = false;
      }
      return;
    }

    const storedFilters = loadFiltersFromStorage();
    if (storedFilters) {
      activeFilters = storedFilters.activeFilters;
      searchQuery = storedFilters.searchQuery || '';
      selectedIncludeTags = storedFilters.selectedIncludeTags || [];
      selectedExcludeTags = storedFilters.selectedExcludeTags || [];
    }

    const tagFilter = urlParams.get('tag');
    if (tagFilter) {
      selectedIncludeTags = [tagFilter];
    }

    loadNotes(false);

    const hasToken =
      typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    if (hasToken) {
      tagsStore.loadTags();
    }
  });

  // Listen for auth state changes
  $effect(() => {
    const handleAuthChange = () => {
      const newHasAuthToken =
        typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
      const previousHasAuthToken = hasAuthToken;
      hasAuthToken = newHasAuthToken;

      if (newHasAuthToken && !previousHasAuthToken) {
        tagsStore.loadTags(true);
      }
      if (!newHasAuthToken && previousHasAuthToken) {
        selectedIncludeTags = [];
        selectedExcludeTags = [];
      }
    };

    document.addEventListener('login-success', handleAuthChange);
    document.addEventListener('logout-success', handleAuthChange);

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

  // Keyboard shortcut for Ctrl+Shift+F / Command+Shift+F to open filter modal
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        openFilterModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Keep the focused card scrolled into view while navigating with j/k.
  $effect(() => {
    if (!focusedNoteId) return;
    const el = document.querySelector(`[data-note-card="${CSS.escape(focusedNoteId)}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  });

  // Single-key shortcuts for list navigation and per-note actions.
  // Guarded: inactive while typing in a field/editor or while any modal is open.
  // Esc is handled first; modals self-close on Esc (Modal.svelte), so here we
  // only act on Esc when NO modal is open.
  $effect(() => {
    const anyModalOpen = () =>
      isModalOpen ||
      isDetailModalOpen ||
      showFilterModal ||
      isTagModalOpen ||
      showDeletedNotesModal ||
      showShortcutsModal;

    const isTyping = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable);

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      // Esc: defer modal-closing to Modal.svelte; only act when no modal is open.
      if (key === 'Escape') {
        if (anyModalOpen()) return;
        const active = document.activeElement;
        if (active instanceof HTMLElement && active.tagName === 'INPUT') {
          active.blur();
        } else if (viewMode === 'detail') {
          backToList();
        }
        return;
      }

      // Skip all other single-keys shortcuts while typing or while a modal is open.
      if (isTyping(event.target) || anyModalOpen()) return;

      const focusedNote = focusedIndex >= 0 ? orderedNotes[focusedIndex] ?? null : null;

      switch (key) {
        case '/':
          if (viewMode === 'list') {
            event.preventDefault();
            searchInput?.focus();
          }
          break;
        case 'j':
        case 'ArrowDown':
          if (viewMode === 'list') {
            event.preventDefault();
            moveFocus(1);
          }
          break;
        case 'k':
        case 'ArrowUp':
          if (viewMode === 'list') {
            event.preventDefault();
            moveFocus(-1);
          }
          break;
        case 'Enter':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleShowDetail(focusedNote);
          }
          break;
        case 'l':
          if (viewMode === 'list' && $hasMore) {
            event.preventDefault();
            loadMoreNotes();
          }
          break;
        case 'n':
          event.preventDefault();
          handleCreate();
          break;
        case '?':
          event.preventDefault();
          showShortcutsModal = true;
          break;
        case 'p':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleTogglePin(focusedNote);
          }
          break;
        case 'e':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleEdit(focusedNote);
          }
          break;
        case 'x':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleDelete(focusedNote);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
</script>

<svelte:head>
  <title>Notes - Personal Knowledge Base</title>
  <meta
    name="description"
    content="Organize your thoughts, ideas, and resources. A personal note-taking system with tags, file attachments, and powerful search."
  />
</svelte:head>

<div class="notes-page">
  {#if viewMode === 'list'}
    <!-- Hero Section -->
    <div class="notes-hero-section">
      <div
        class="notes-hero-badge inline-flex items-center gap-2 px-4 py-2 bg-warning-100 dark:bg-primary-900/30 border border-warning-300 dark:border-primary-700 rounded-full text-warning-700 dark:text-warning-300 text-sm font-medium"
      >
        <BookOpen class="w-4 h-4" />
        <span>{$totalCount} Note{$totalCount === 1 ? '' : 's'}</span>
      </div>

      <h1 class="notes-hero-title">
        <span class="text-gray-900 dark:text-white">My</span>
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400 dark:from-primary-400 to-purple-500 bg-gradient-to-l"
          >Notes</span
        >
      </h1>

      <p class="notes-hero-description">
        Organize your thoughts, ideas, and resources. Fast, searchable, and always available.
      </p>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="peer relative flex items-center p-4 border-2 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg transition-all border-warning-500/20 dark:border-primary-500/20 focus-within:border-warning-500 focus-within:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:focus-within:border-primary-500 dark:focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]">
          <Search class="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500 transition-colors peer-focus:text-warning-500 dark:peer-focus:text-primary-400" />
          <input
            type="text"
            bind:value={searchQuery}
            bind:this={searchInput}
            onkeydown={e => {
              if (e.key === 'Enter') {
                // Apply current filters and search, like in the modal
                applyFilters(activeFilters, searchQuery, selectedIncludeTags, selectedExcludeTags);
              }
            }}
            placeholder="Search notes... (Ctrl+Shift+F)"
            class="flex-1 border-none bg-transparent text-base text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {#if searchQuery}
            <button
              onclick={() => {
               searchQuery = '';
                saveFiltersToStorage();
               loadNotes(false);
             }}
              class="notes-search-clear"
              aria-label="Clear search"
            >
              <X class="w-4 h-4" />
            </button>
          {/if}
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <!-- Filter Button -->
          <button
            onclick={openFilterModal}
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm leading-5 text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 {getActiveFilterCount() > 0 ? 'bg-warning-50 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300 ring-2 ring-warning-500/20 dark:ring-primary-500/20' : ''}"
          >
            <Filter class="w-4 h-4" />
            <span class="hidden sm:inline">Filter</span>
            {#if getActiveFilterCount() > 0}
              <span
                class="flex items-center justify-center min-w-6 h-5 px-1.5 bg-warning-500 dark:bg-primary-500 rounded-full text-xs font-bold text-white"
              >
                {getActiveFilterCount()}
              </span>
            {/if}
          </button>

          <!-- Refresh -->
          <button
            onclick={handleRefresh}
            disabled={$isLoadingNotes || isLoadingMore}
            class="btn-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-warning-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCw
              class={`w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-warning-500 dark:hover:text-primary-400 transition-colors ${$isLoadingNotes ? 'animate-spin' : ''}`}
            />
          </button>

          <!-- Keyboard shortcuts -->
          <button
            onclick={() => (showShortcutsModal = true)}
            class="btn-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-warning-50 dark:hover:bg-gray-700"
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard class="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-warning-500 dark:hover:text-primary-400 transition-colors" />
          </button>

          <!-- Authenticated Actions -->
          {#if hasAuthToken}
            <!-- Trash -->
            <button
              onclick={openDeletedNotesModal}
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm leading-5 text-amber-600 dark:text-amber-400 transition-all hover:bg-amber-50 dark:hover:bg-amber-900/20"
              title="View deleted notes"
            >
              <Trash2 class="w-4 h-4" />
              <span class="hidden sm:inline">Trash</span>
            </button>

            <!-- Tags -->
            <button
              onclick={handleTagModalOpen}
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm leading-5 text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Manage tags"
            >
              <TagIcon class="w-4 h-4" />
              <span class="hidden sm:inline">Tags</span>
            </button>

            <!-- Create Note -->
            <button
              onclick={handleCreate}
              class="btn btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
              title="New note"
            >
              <Plus class="w-4 h-4" />
              <span class="hidden sm:inline">New Note</span>
            </button>
          {/if}
        </div>
      </div>
    </div>

    <!-- Notes Grid -->
    <div class="notes-grid">
      {#if $isLoadingNotes && $notes.length === 0}
        <div class="flex flex-col gap-4" role="status" aria-label="Loading notes">
          {#each Array(3) as _, index (index)}
            <NoteCardSkeleton withPreview={index === 0} />
          {/each}
        </div>
      {:else if $notes.length === 0}
        <!-- Empty State -->
        <div
          class="text-center py-16 px-8 bg-white/90 dark:bg-gray-900/90 rounded-xl border border-dashed border-black/10 dark:border-white/10"
        >
          <div
            class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-warning-500/10 dark:bg-primary-500/10 rounded-full text-warning-500 dark:text-primary-400"
          >
            <BookOpen class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first note to get started'}
          </p>
          {#if !searchQuery && hasAuthToken}
            <button
              onclick={handleCreate}
              class="btn btn-primary gap-2 dark:from-primary-500 dark:to-primary-600 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 shadow-lg"
            >
              <Plus class="w-4 h-4" />
              Create Your First Note
            </button>
          {/if}
        </div>
      {:else}
        <!-- Pinned Section (only when there are pinned notes) -->
        {#if pinnedNotes.length > 0}
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-4">
              <Pin class="w-5 h-5 text-warning-600 dark:text-primary-400" />
              <h2 class="text-lg font-semibold text-secondary-900 dark:text-white">Pinned</h2>
              <span class="text-sm text-secondary-500 dark:text-secondary-400">({pinnedNotes.length})</span>
            </div>
            <div class="flex flex-col gap-4">
              {#each pinnedNotes as note, index (note.id)}
                <div data-note-card={note.id} style="animation-delay: {index * 30}ms">
                  <NoteCard
                    {note}
                    isFocused={note.id === focusedNoteId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    {hasAuthToken}
                    onShowDetail={handleShowDetail}
                    onShare={handleShare}
                    onTogglePin={handleTogglePin}
                  />
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Other Notes -->
        <div class="flex flex-col gap-4">
          {#each otherNotes as note, index (note.id)}
            <div data-note-card={note.id} style="animation-delay: {index * 30}ms">
              <NoteCard
                {note}
                isFocused={note.id === focusedNoteId}
                onEdit={handleEdit}
                onDelete={handleDelete}
                {hasAuthToken}
                onShowDetail={handleShowDetail}
                onShare={handleShare}
                onTogglePin={handleTogglePin}
              />
            </div>
          {/each}
        </div>

        <!-- Load More Button -->
        <div class="mt-8 flex justify-center">
          {#if $hasMore}
            <button
              onclick={loadMoreNotes}
              disabled={isLoadingMore}
              class="btn btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:bg-warning-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isLoadingMore}
                <RotateCw class="w-4 h-4 animate-spin" />
                Loading more...
              {:else}
                <Plus class="w-4 h-4" />
                Load More Notes
              {/if}
            </button>
          {:else if $notes.length > 0}
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full border border-gray-200 dark:border-gray-700"
            >
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Showing all {$notes.length} of {$totalCount} notes
              </span>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {:else if viewMode === 'detail'}
    <!-- Single Note Detail View -->
    {#if isLoadingSingleNote}
      <div class="flex flex-col items-center justify-center py-20">
        <div
          class="flex items-center justify-center w-16 h-16 mb-4 bg-warning-500/10 dark:bg-primary-500/10 rounded-full text-warning-500 dark:text-primary-400"
        >
          <RotateCw class="w-8 h-8 animate-spin" />
        </div>
        <p class="text-gray-600 dark:text-gray-400">Loading note...</p>
      </div>
    {:else if singleNote}
      <!-- Detail Content -->
      <div class="detail-view">
        <!-- Back Button -->
        <button
          onclick={backToList}
          class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-gray-600 dark:text-gray-400 hover:text-warning-600 dark:hover:text-primary-400 transition-colors"
        >
          <File class="w-4 h-4" />
          Back to all notes
        </button>

        <!-- Header Card -->
        <div
          class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-black/6 dark:border-white/8 p-4 sm:p-6 mb-6"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 sm:gap-3 mb-3">
                {#if singleNote.is_favorite}
                  <div
                    class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30 shrink-0"
                  >
                    <Star class="w-4 h-4 sm:w-5 sm:h-5 text-warning-600 dark:text-warning-400 fill-warning-600 dark:fill-warning-400" />
                  </div>
                {/if}
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white break-words">
                  {singleNote.name || 'Untitled Note'}
                </h1>
              </div>

              <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-1.5">
                  <Calendar class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="truncate">Created {new Date(singleNote.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Clock class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="truncate">Updated {new Date(singleNote.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                {#if singleNote.files && singleNote.files.length > 0}
                  <div class="flex items-center gap-1.5">
                    <ImageIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{singleNote.files.length} file{singleNote.files.length === 1 ? '' : 's'}</span>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-1.5 sm:gap-2">
              {#if singleNote.link}
                <button
                  onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                  class="btn-icon flex items-center justify-center w-9 sm:w-10 sm:h-10 rounded-xl bg-warning-50 dark:bg-primary-900/20 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-warning-200 dark:border-primary-800 transition-all shrink-0"
                  title="Open link"
                >
                  <Link2 class="w-4 h-4 sm:w-5 sm:h-5 text-warning-600 dark:text-primary-400" />
                </button>
              {/if}
              <button
                onclick={() => handleShare(singleNote)}
                class="btn-icon flex items-center justify-center w-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700 hover:border-warning-300 dark:hover:border-primary-800 transition-all shrink-0"
                title="Share note"
              >
                <Share2 class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </button>
              {#if hasAuthToken}
                <button
                  onclick={() => handleEdit(singleNote)}
                  class="btn-icon flex items-center justify-center w-9 sm:w-10 sm:h-10 rounded-xl bg-warning-50 dark:bg-primary-900/20 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-warning-200 dark:border-primary-800 transition-all shrink-0"
                  title="Edit note"
                >
                  <Pencil class="w-4 h-4 sm:w-5 sm:h-5 text-warning-600 dark:text-primary-400" />
                </button>
                <button
                  onclick={() => {
                    if (confirm('Are you sure you want to delete this note?')) {
                      handleDelete(singleNote);
                      backToList();
                    }
                  }}
                  class="btn-icon flex items-center justify-center w-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all shrink-0"
                  title="Delete note"
                >
                  <Trash2 class="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
                </button>
              {/if}
            </div>
          </div>
        </div>

        <!-- Content Card -->
        <div
          class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-black/6 dark:border-white/8 p-4 sm:p-6 space-y-6"
        >
          <!-- Link Section -->
          {#if singleNote.link}
            <div
              class="p-3 sm:p-4 bg-warning-50 dark:bg-primary-900/10 rounded-xl border border-warning-200 dark:border-primary-800"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shrink-0"
                >
                  <Link2 class="w-5 h-5 text-warning-600 dark:text-primary-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-warning-900 dark:text-primary-100 mb-1">
                    External Link
                  </p>
                  <a
                    href={singleNote.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 truncate block text-sm"
                  >
                    {singleNote.link}
                  </a>
                </div>
                <button
                  onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                  class="btn btn-primary px-4 py-2 shadow-md shrink-0"
                >
                  Visit
                </button>
              </div>

              <!-- Link Summarize Section -->
              <div class="mt-3 pt-3 border-t border-warning-200 dark:border-primary-700">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <p class="text-sm font-semibold text-warning-900 dark:text-primary-100 flex items-center gap-1.5">
                    <Sparkles class="w-4 h-4" />
                    AI Summary
                  </p>
                  <div class="flex items-center gap-2 sm:gap-2">
                    {#if singleNote.link_summarize && (singleNote.link_summarize.length > 150)}
                      <button
                        onclick={() => (isSummaryFull = !isSummaryFull)}
                        class="text-xs text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 font-medium transition-colors"
                      >
                        {isSummaryFull ? 'Show less' : 'Show more'}
                      </button>
                    {/if}
                    {#if hasAuthToken}
                      <button
                        onclick={() => handleRegenerateSummarize(singleNote)}
                        disabled={isRegeneratingSummarize}
                        class="btn btn-primary btn-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        title="Regenerate AI summary"
                      >
                        {#if isRegeneratingSummarize}
                          <Loader2 class="w-3.5 h-3.5 animate-spin" />
                          <span class="hidden xs:inline">Regenerating...</span>
                        {:else}
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                          <span class="hidden xs:inline">Regenerate</span>
                        {/if}
                      </button>
                    {/if}
                  </div>
                </div>
                {#if singleNote.link_summarize}
                  <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isSummaryFull || singleNote.link_summarize.length <= 150
                      ? singleNote.link_summarize
                      : singleNote.link_summarize.slice(0, 150) + '...'}
                  </p>
                {:else}
                  <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                    No summary available yet.{#if hasAuthToken} Click regenerate to generate AI summary.{/if}
                  </p>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Description -->
          {#if singleNote.description}
            <div>
              <div
                class="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-300"
              >
                {@html singleNote.description}
              </div>
            </div>
          {/if}

          <!-- Images -->
          {#if singleNote.files && singleNote.files.filter( f => f.mime_type.startsWith('image/') ).length > 0}
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
              >
                <ImageIcon class="w-5 h-5 text-warning-600 dark:text-primary-400" />
                Images ({singleNote.files.filter(f => f.mime_type.startsWith('image/')).length})
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each singleNote.files.filter( f => f.mime_type.startsWith('image/') ) as file, index (file.id + '-' + index)}
                  <div
                    class="group relative bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={file.presigned_url ||
                          file.url ||
                          `data:${file.mime_type};base64,${file.data}`}
                        alt={file.original_name}
                        class="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div class="absolute bottom-0 left-0 right-0 p-3">
                        <p class="text-white text-sm font-medium truncate">
                          {file.original_name}
                        </p>
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
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
              >
                <File class="w-5 h-5 text-warning-600 dark:text-primary-400" />
                Files ({singleNote.files.filter(f => !f.mime_type.startsWith('image/')).length})
              </h3>
              <div class="space-y-3">
                {#each singleNote.files.filter(f => !f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
                  <div
                    class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                  >
                    <div
                      class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0"
                    >
                      <File class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 dark:text-white truncate text-sm">
                        {file.original_name}
                      </p>
                      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <a
                      href={file.presigned_url || file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-primary px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-md shrink-0"
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
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
              >
                <Tag class="w-5 h-5 text-warning-600 dark:text-primary-400" />
                Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each singleNote.tags as tag (tag.id)}
                  <div
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border {!tag.color
                      ? 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700'
                      : ''}"
                    style="background-color: {tag.color
                      ? tag.color + '20'
                      : undefined}; color: {tag.color || undefined}; border-color: {tag.color
                      ? tag.color + '40'
                      : undefined}"
                  >
                    <div
                      class="w-2 h-2 rounded-full {!tag.color
                        ? 'bg-warning-600 dark:bg-primary-600'
                        : ''}"
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
              <div
                class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <Calendar class="w-8 h-8 text-gray-400" />
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                No additional content available
              </p>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Note not found -->
      <div
        class="text-center py-16 px-8 bg-white/90 dark:bg-gray-900/90 rounded-xl border border-dashed border-black/10 dark:border-white/10"
      >
        <div
          class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-warning-500/10 dark:bg-primary-500/10 rounded-full text-warning-500 dark:text-primary-400"
        >
          <File class="w-8 h-8" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Note not found
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          The note you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onclick={backToList}
          class="btn btn-primary gap-2 dark:from-primary-500 dark:to-primary-600 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 shadow-lg"
        >
          Back to Notes
        </button>
      </div>
    {/if}
  {/if}
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
  onTogglePin={handleTogglePin}
/>

<!-- Tag Management Modal -->
<TagModal
  bind:isOpen={isTagModalOpen}
  onclose={() => {
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
  bind:searchQuery
  initialIncludeTags={selectedIncludeTags}
  initialExcludeTags={selectedExcludeTags}
/>

<!-- Deleted Notes Modal -->
<DeletedNotesModal bind:isOpen={showDeletedNotesModal} onClose={handleDeletedNotesModalClose} />

<!-- Keyboard Shortcuts Helper Modal -->
<NotesShortcutsModal bind:isOpen={showShortcutsModal} />
