<script lang="ts">
  import type { Note } from '../lib/notes';
  import { deleteNote, getNote, regenerateSummarize, togglePin, type NoteFilters } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import { tagsStore } from '../lib/stores/tags';
  import { notesStore, notes, notesError, isLoadingNotes, hasMore, totalCount } from '../lib/stores/notes';
  import NoteCard from '../components/NoteCard.svelte';
  import Skeleton from 'boneyard-js/svelte';
  import { fixtureNotes, fixtureSingleNote } from '../lib/fixtures';
  import { isBoneyardCapture } from '../lib/boneyard';
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
    Keyboard,
    Loader2,
    ChevronLeft
  } from '@lucide/svelte';
  import { Button, EmptyState, PageHeader } from '$lib/components/ds';
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
    // During boneyard capture, skip fetching — the loading branches below are
    // forced on via isBoneyardCapture so their fixtures render for the snapshot.
    if (isBoneyardCapture) {
      if (new URLSearchParams(window.location.search).get('id')) viewMode = 'detail';
      isTagModalOpen = true;
      return;
    }

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

<div class="mx-auto flex max-w-[1120px] flex-col gap-6 pt-16 pb-12">
  {#if viewMode === 'list'}
    <PageHeader
      align="center"
      badge="{$totalCount} {$totalCount === 1 ? 'NOTE' : 'NOTES'}"
      title="My"
      highlight="Notes"
      subtitle="Organize your thoughts, ideas, and resources. Fast, searchable, and always available."
    />

    <!-- Search -->
    <label class="relative flex w-full items-center">
      <Search class="pointer-events-none absolute left-4 size-5 text-ink-muted" />
      <input
        type="search"
        bind:value={searchQuery}
        bind:this={searchInput}
        onkeydown={e => {
          if (e.key === 'Enter') {
            // Apply current filters and search, like in the modal
            applyFilters(activeFilters, searchQuery, selectedIncludeTags, selectedExcludeTags);
          }
        }}
        placeholder="Search notes…"
        aria-label="Search notes"
        class="text-body h-13 w-full rounded-pill bg-card pr-12 pl-12 text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:pr-28"
      />
      {#if searchQuery}
        <button
          onclick={() => {
            searchQuery = '';
            saveFiltersToStorage();
            loadNotes(false);
          }}
          class="absolute right-3 grid size-7 sm:right-24 place-items-center rounded-pill bg-sunken text-ink-muted hover:text-ink"
          aria-label="Clear search"
        >
          <X class="size-3.5" />
        </button>
      {/if}
      <kbd class="absolute right-4 rounded-md max-sm:hidden bg-control px-1.5 py-0.5 font-mono text-xs text-ink-muted">Ctrl ⇧ F</kbd>
    </label>

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onclick={openFilterModal}>
        <Filter class="size-4" />
        Filter
        {#if getActiveFilterCount() > 0}
          <span class="grid h-6 min-w-6 place-items-center rounded-pill bg-accent px-1.5 font-mono text-xs text-ink-on-accent">
            {getActiveFilterCount()}
          </span>
        {/if}
      </Button>

      <button
        onclick={handleRefresh}
        disabled={$isLoadingNotes || isLoadingMore}
        class="btn-icon"
        title="Refresh"
        aria-label="Refresh"
      >
        <RefreshCw class="size-4 {$isLoadingNotes ? 'animate-spin' : ''}" />
      </button>

      <button
        onclick={() => (showShortcutsModal = true)}
        class="btn-icon"
        title="Keyboard shortcuts (?)"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard class="size-4" />
      </button>

      {#if hasAuthToken}
        <Button variant="ghost" size="sm" onclick={openDeletedNotesModal} title="View deleted notes">
          <Trash2 class="size-4" /> Trash
        </Button>
        <Button variant="ghost" size="sm" onclick={handleTagModalOpen} title="Manage tags">
          <TagIcon class="size-4" /> Tags
        </Button>
        <Button size="sm" class="ml-auto" onclick={handleCreate} title="New note">
          <Plus class="size-4" /> New note
        </Button>
      {/if}
    </div>

    <!-- Notes -->
    <div class="flex flex-col gap-4">
      {#if ($isLoadingNotes && $notes.length === 0) || isBoneyardCapture}
        <div class="flex flex-col gap-4" role="status" aria-label="Loading notes">
          {#each Array(3) as _, index (index)}
            <Skeleton name="note-card" loading={true}>
              <!-- Children render only during boneyard capture (dev), giving the
                   headless browser a real NoteCard layout to snapshot. At runtime
                   loading=true shows the generated bones instead. -->
              <NoteCard note={fixtureNotes[index] ?? fixtureNotes[0]} {hasAuthToken} />
            </Skeleton>
          {/each}
        </div>
      {:else if $notes.length === 0}
        <div class="rounded-lg bg-card">
          <EmptyState
            title={searchQuery ? 'No notes found' : 'No notes yet'}
            text={searchQuery ? 'Try adjusting your search terms.' : 'Create your first note to get started.'}
          >
            {#snippet actions()}
              {#if !searchQuery && hasAuthToken}
                <Button onclick={handleCreate}><Plus class="size-4" /> Create your first note</Button>
              {/if}
            {/snippet}
          </EmptyState>
        </div>
      {:else}
        {#if pinnedNotes.length > 0}
          <section class="flex flex-col gap-4">
            <h2 class="text-label flex items-center gap-2 text-ink-muted">
              <Pin class="size-4" /> Pinned · {pinnedNotes.length}
            </h2>
            {#each pinnedNotes as note (note.id)}
              <div data-note-card={note.id}>
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
          </section>
        {/if}

        <section class="flex flex-col gap-4">
          {#if pinnedNotes.length > 0}
            <h2 class="text-label mt-2 text-ink-muted">Other notes</h2>
          {/if}
          {#each otherNotes as note (note.id)}
            <div data-note-card={note.id}>
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
        </section>

        <div class="mt-4 flex justify-center">
          {#if $hasMore}
            <Button variant="secondary" onclick={loadMoreNotes} disabled={isLoadingMore}>
              {#if isLoadingMore}
                <RotateCw class="size-4 animate-spin" /> Loading more…
              {:else}
                <Plus class="size-4" /> Load more notes
              {/if}
            </Button>
          {:else if $notes.length > 0}
            <p class="text-code inline-flex items-center gap-2 rounded-pill bg-card px-4 py-2 text-ink-muted">
              Showing all {$notes.length} of {$totalCount} notes
            </p>
          {/if}
        </div>
      {/if}
    </div>
  {:else if viewMode === 'detail'}
    {#if isLoadingSingleNote || isBoneyardCapture}
      <div class="mx-auto flex w-full max-w-[900px] flex-col gap-4">
        <Button variant="ghost" size="sm" class="self-start"><ChevronLeft class="size-4" /> All notes</Button>

        <Skeleton name="note-detail" loading={true}>
          <div class="flex flex-col gap-4">
            <div class="card flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0 flex-1">
                <h1 class="text-display m-0 mb-3 break-words max-sm:text-[28px] max-sm:leading-8">
                  {fixtureSingleNote.name || 'Untitled note'}
                </h1>
                <div class="text-code flex flex-wrap items-center gap-4 text-ink-muted">
                  <span class="flex items-center gap-1.5"><Calendar class="size-4" /> Created Aug 22, 2026</span>
                  <span class="flex items-center gap-1.5"><Clock class="size-4" /> Updated Aug 22, 2026</span>
                  <span class="flex items-center gap-1.5"><ImageIcon class="size-4" /> 1 file</span>
                </div>
              </div>
              <div class="flex items-center justify-end gap-2">
                <span class="btn-icon bg-control hover:bg-control-hover"><Share2 class="size-4" /></span>
                <span class="btn-icon bg-control hover:bg-control-hover"><Pencil class="size-4" /></span>
                <span class="btn-icon bg-control hover:bg-control-hover text-negative"><Trash2 class="size-4" /></span>
              </div>
            </div>
            <div class="card">
              <div class="prose max-w-none text-ink">
                <p>Key differences between Svelte 4 and 5: $state, $derived, $props, $effect.</p>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    {:else if singleNote}
      <div class="mx-auto flex w-full max-w-[900px] flex-col gap-4">
        <Button variant="ghost" size="sm" class="self-start" onclick={backToList}>
          <ChevronLeft class="size-4" /> All notes
        </Button>

        <!-- Header Card -->
        <div class="card flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0 flex-1">
            {#if singleNote.is_pinned || singleNote.is_favorite}
              <p class="text-label mb-2 flex items-center gap-3 text-accent-text">
                {#if singleNote.is_pinned}<span>● Pinned</span>{/if}
                {#if singleNote.is_favorite}<span class="flex items-center gap-1"><Star class="size-3.5 fill-current" /> Favorite</span>{/if}
              </p>
            {/if}
            <h1 class="text-display m-0 mb-3 break-words max-sm:text-[28px] max-sm:leading-8">
              {singleNote.name || 'Untitled note'}
            </h1>

            <div class="text-code flex flex-wrap items-center gap-4 text-ink-muted">
              <span class="flex items-center gap-1.5">
                <Calendar class="size-4" />
                Created {new Date(singleNote.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span class="flex items-center gap-1.5">
                <Clock class="size-4" />
                Updated {new Date(singleNote.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              {#if singleNote.files && singleNote.files.length > 0}
                <span class="flex items-center gap-1.5">
                  <ImageIcon class="size-4" />
                  {singleNote.files.length} file{singleNote.files.length === 1 ? '' : 's'}
                </span>
              {/if}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-2">
            {#if singleNote.link}
              <button
                onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                class="btn-icon bg-control hover:bg-control-hover"
                title="Open link"
                aria-label="Open link"
              >
                <Link2 class="size-4" />
              </button>
            {/if}
            <button
              onclick={() => handleShare(singleNote)}
              class="btn-icon bg-control hover:bg-control-hover"
              title="Share note"
              aria-label="Share note"
            >
              <Share2 class="size-4" />
            </button>
            {#if hasAuthToken}
              <button
                onclick={() => handleEdit(singleNote)}
                class="btn-icon bg-control hover:bg-control-hover"
                title="Edit note"
                aria-label="Edit note"
              >
                <Pencil class="size-4" />
              </button>
              <button
                onclick={() => {
                  if (confirm('Are you sure you want to delete this note?')) {
                    handleDelete(singleNote);
                    backToList();
                  }
                }}
                class="btn-icon bg-control hover:bg-control-hover text-negative hover:text-negative"
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 class="size-4" />
              </button>
            {/if}
          </div>
        </div>

        <!-- Content Card -->
        <div class="card space-y-6">
          {#if singleNote.link}
            <div class="rounded-md bg-sunken p-4">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span class="grid size-10 flex-none place-items-center rounded-md bg-tile-deep text-ink-on-dark">
                  <Link2 class="size-5" />
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-label mb-1 text-ink-muted">External link</p>
                  <a
                    href={singleNote.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block truncate text-body-sm text-accent-text underline-offset-2 hover:underline"
                  >
                    {singleNote.link}
                  </a>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onclick={() => window.open(singleNote.link, '_blank', 'noopener,noreferrer')}
                >
                  Visit
                </Button>
              </div>

              <div class="mt-5">
                <div class="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-label flex items-center gap-1.5 text-ink">
                    <Sparkles class="size-4" /> AI summary
                  </p>
                  <div class="flex items-center gap-2">
                    {#if singleNote.link_summarize && singleNote.link_summarize.length > 150}
                      <button
                        onclick={() => (isSummaryFull = !isSummaryFull)}
                        class="text-body-sm text-accent-text hover:underline"
                      >
                        {isSummaryFull ? 'Show less' : 'Show more'}
                      </button>
                    {/if}
                    {#if hasAuthToken}
                      <Button
                        variant="secondary"
                        size="sm"
                        onclick={() => handleRegenerateSummarize(singleNote)}
                        disabled={isRegeneratingSummarize}
                        title="Regenerate AI summary"
                      >
                        {#if isRegeneratingSummarize}
                          <Loader2 class="size-3.5 animate-spin" /> Regenerating…
                        {:else}
                          <RefreshCw class="size-3.5" /> Regenerate
                        {/if}
                      </Button>
                    {/if}
                  </div>
                </div>
                {#if singleNote.link_summarize}
                  <p class="text-body-sm font-normal text-ink">
                    {isSummaryFull || singleNote.link_summarize.length <= 150
                      ? singleNote.link_summarize
                      : singleNote.link_summarize.slice(0, 150) + '…'}
                  </p>
                {:else}
                  <p class="text-body-sm font-normal text-ink-muted">
                    No summary available yet.{#if hasAuthToken} Click regenerate to generate an AI summary.{/if}
                  </p>
                {/if}
              </div>
            </div>
          {/if}

          {#if singleNote.description}
            <div class="prose max-w-none text-ink">
              {@html singleNote.description}
            </div>
          {/if}

          {#if singleNote.files && singleNote.files.filter(f => f.mime_type.startsWith('image/')).length > 0}
            <section>
              <h3 class="text-label mb-3 flex items-center gap-2 text-ink-muted">
                <ImageIcon class="size-4" />
                Images · {singleNote.files.filter(f => f.mime_type.startsWith('image/')).length}
              </h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each singleNote.files.filter(f => f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
                  <figure class="m-0 overflow-hidden rounded-md bg-sunken">
                    <div class="aspect-square">
                      <img
                        src={file.presigned_url || file.url || `data:${file.mime_type};base64,${file.data}`}
                        alt={file.original_name}
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <figcaption class="flex items-center justify-between gap-2 px-3 py-2">
                      <span class="truncate text-body-sm">{file.original_name}</span>
                      <span class="text-code flex-none text-ink-muted">{(file.size / 1024).toFixed(0)} KB</span>
                    </figcaption>
                  </figure>
                {/each}
              </div>
            </section>
          {/if}

          {#if singleNote.files && singleNote.files.filter(f => !f.mime_type.startsWith('image/')).length > 0}
            <section>
              <h3 class="text-label mb-3 flex items-center gap-2 text-ink-muted">
                <File class="size-4" />
                Files · {singleNote.files.filter(f => !f.mime_type.startsWith('image/')).length}
              </h3>
              <div class="space-y-3">
                {#each singleNote.files.filter(f => !f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
                  <div class="flex items-center gap-3 rounded-md bg-sunken p-3">
                    <span class="grid size-10 flex-none place-items-center rounded-md bg-card">
                      <File class="size-5 text-ink-muted" />
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-body-sm">{file.original_name}</p>
                      <p class="text-code text-ink-muted">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <a
                      href={file.presigned_url || file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn btn-secondary btn-sm"
                    >
                      View
                    </a>
                  </div>
                {/each}
              </div>
            </section>
          {/if}

          {#if singleNote.tags && singleNote.tags.length > 0}
            <section>
              <h3 class="text-label mb-3 flex items-center gap-2 text-ink-muted">
                <Tag class="size-4" /> Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each singleNote.tags as tag (tag.id)}
                  <span class="inline-flex h-7 items-center gap-1.5 rounded-pill bg-sunken px-3 text-code text-ink">
                    <span
                      class="size-2 rounded-pill bg-accent"
                      style={tag.color ? `background-color: ${tag.color}` : undefined}
                      aria-hidden="true"
                    ></span>
                    {tag.name || tag.tag}
                  </span>
                {/each}
              </div>
            </section>
          {/if}

          {#if !singleNote.description && (!singleNote.tags || singleNote.tags.length === 0) && !singleNote.link && (!singleNote.files || singleNote.files.length === 0)}
            <p class="py-8 text-center text-ink-muted">No additional content in this note.</p>
          {/if}
        </div>
      </div>
    {:else}
      <div class="mx-auto w-full max-w-[900px] rounded-lg bg-card">
        <EmptyState
          title="Note not found"
          text="This note doesn't exist or has been deleted."
        >
          {#snippet actions()}
            <Button onclick={backToList}>Back to notes</Button>
          {/snippet}
        </EmptyState>
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
