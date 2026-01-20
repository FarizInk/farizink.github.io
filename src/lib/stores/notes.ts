import { writable, derived, get } from 'svelte/store';
import { getNotes, getDeletedNotes, permanentDeleteNote, type Note, type NoteFilters } from '../notes';
import { toast } from 'svelte-sonner';

// Basic stores for active notes
export const notes = writable<Note[]>([]);
export const isLoadingNotes = writable<boolean>(false);
export const notesError = writable<string | null>(null);
export const currentPage = writable<number>(1);
export const hasMore = writable<boolean>(true);
export const totalCount = writable<number>(0);

// Stores for pagination info
export const notesLimit = writable<number>(12);

// Current filter state (for tracking what filters are applied)
export const currentFilters = writable<NoteFilters>({
  sortBy: 'created_at',
  sortOrder: 'desc'
});

// Helper function to sort notes based on filters
function sortNotes(notesList: Note[], filters: NoteFilters): Note[] {
  const { sortBy, sortOrder } = filters;

  return [...notesList].sort((a, b) => {
    const aValue = sortBy === 'created_at' ? a.createdAt : a.updatedAt;
    const bValue = sortBy === 'created_at' ? b.createdAt : b.updatedAt;

    const aTime = new Date(aValue).getTime();
    const bTime = new Date(bValue).getTime();

    return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
  });
}

// Global Notes Store class with methods
class NotesStore {
  // Clear all notes and reset pagination
  clear(): void {
    notes.set([]);
    currentPage.set(1);
    hasMore.set(true);
    totalCount.set(0);
  }

  // Reset store state
  reset(): void {
    this.clear();
    isLoadingNotes.set(false);
    notesError.set(null);
    currentFilters.set({
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
  }

  // Load initial notes (page 1) - clears existing notes
  async loadNotes(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingNotes);
    if (loading) return;

    isLoadingNotes.set(true);
    notesError.set(null);

    // Clear existing notes and reset pagination for fresh load
    this.clear();

    // Update current filters
    if (filters) {
      currentFilters.set(filters);
    }

    try {
      const response = await getNotes(1, get(notesLimit), filters);
      notes.set(response.data.notes);
      currentPage.set(response.data.pagination.page);
      hasMore.set(response.data.pagination.page < response.data.pagination.totalPages);
      totalCount.set(response.data.pagination.total);
    } catch (error) {
      notesError.set(error instanceof Error ? error.message : String(error));
      notes.set([]);
      toast.error('Failed to load notes');
    } finally {
      isLoadingNotes.set(false);
    }
  }

  // Load more notes (pagination) - appends to existing notes
  async loadMore(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingNotes);
    const more = get(hasMore);

    if (loading || !more) return;

    isLoadingNotes.set(true);

    try {
      const nextPage = get(currentPage) + 1;
      const response = await getNotes(nextPage, get(notesLimit), filters);

      // Append new notes to existing ones
      notes.update(currentNotes => [...currentNotes, ...response.data.notes]);

      currentPage.set(response.data.pagination.page);
      hasMore.set(response.data.pagination.page < response.data.pagination.totalPages);
      totalCount.set(response.data.pagination.total);
    } catch (error) {
      notesError.set(error instanceof Error ? error.message : String(error));
      toast.error('Failed to load more notes');
    } finally {
      isLoadingNotes.set(false);
    }
  }

  // Prepend a new note to the store (after create)
  prependNote(note: Note): void {
    notes.update(currentNotes => {
      const filters = get(currentFilters);
      const sorted = sortNotes([note, ...currentNotes], filters);
      return sorted;
    });
    totalCount.update(count => count + 1);
  }

  // Update a note in the store (after edit) - with re-sorting
  updateNote(noteId: string, updatedNote: Note): void {
    notes.update(currentNotes => {
      const filters = get(currentFilters);

      // Remove the old note and add the updated one
      const filtered = currentNotes.filter(n => n.id !== noteId);
      const sorted = sortNotes([updatedNote, ...filtered], filters);

      return sorted;
    });
  }

  // Remove a note from the store (after delete)
  removeNote(noteId: string): void {
    notes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
    totalCount.update(count => Math.max(0, count - 1));
  }

  // Get current notes value
  getCurrentNotes(): Note[] {
    return get(notes);
  }

  // Check if has more pages
  getHasMore(): boolean {
    return get(hasMore);
  }

  // Get total count
  getTotalCount(): number {
    return get(totalCount);
  }
}

// Create singleton instance for active notes
export const notesStore = new NotesStore();

// ============================================================================
// DELETED NOTES STORE (for trash/recycle bin)
// ============================================================================

// Basic stores for deleted notes
export const deletedNotes = writable<Note[]>([]);
export const isLoadingDeletedNotes = writable<boolean>(false);
export const deletedNotesError = writable<string | null>(null);
export const currentDeletedPage = writable<number>(1);
export const hasMoreDeleted = writable<boolean>(true);
export const deletedCount = writable<number>(0);

// Global Deleted Notes Store class with methods
class DeletedNotesStore {
  // Clear all deleted notes and reset pagination
  clear(): void {
    deletedNotes.set([]);
    currentDeletedPage.set(1);
    hasMoreDeleted.set(true);
    deletedCount.set(0);
  }

  // Reset store state
  reset(): void {
    this.clear();
    isLoadingDeletedNotes.set(false);
    deletedNotesError.set(null);
  }

  // Load initial deleted notes (page 1) - clears existing notes
  async loadDeletedNotes(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingDeletedNotes);
    if (loading) return;

    isLoadingDeletedNotes.set(true);
    deletedNotesError.set(null);

    // Clear existing notes and reset pagination for fresh load
    this.clear();

    try {
      const response = await getDeletedNotes(1, get(notesLimit), filters);
      deletedNotes.set(response.data.notes);
      currentDeletedPage.set(response.data.pagination.page);
      hasMoreDeleted.set(response.data.pagination.page < response.data.pagination.totalPages);
      deletedCount.set(response.data.pagination.total);
    } catch (error) {
      deletedNotesError.set(error instanceof Error ? error.message : String(error));
      deletedNotes.set([]);
      toast.error('Failed to load deleted notes');
    } finally {
      isLoadingDeletedNotes.set(false);
    }
  }

  // Load more deleted notes (pagination) - appends to existing notes
  async loadMoreDeleted(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingDeletedNotes);
    const more = get(hasMoreDeleted);

    if (loading || !more) return;

    isLoadingDeletedNotes.set(true);

    try {
      const nextPage = get(currentDeletedPage) + 1;
      const response = await getDeletedNotes(nextPage, get(notesLimit), filters);

      // Append new deleted notes to existing ones
      deletedNotes.update(currentNotes => [...currentNotes, ...response.data.notes]);

      currentDeletedPage.set(response.data.pagination.page);
      hasMoreDeleted.set(response.data.pagination.page < response.data.pagination.totalPages);
      deletedCount.set(response.data.pagination.total);
    } catch (error) {
      deletedNotesError.set(error instanceof Error ? error.message : String(error));
      toast.error('Failed to load more deleted notes');
    } finally {
      isLoadingDeletedNotes.set(false);
    }
  }

  // Permanently delete a note from the store (after permanent delete)
  async permanentlyDeleteNote(noteId: string): Promise<void> {
    try {
      await permanentDeleteNote(noteId);
      toast.success('Note permanently deleted');
      // Remove from store
      deletedNotes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
      deletedCount.update(count => Math.max(0, count - 1));
    } catch (error) {
      toast.error('Failed to permanently delete note');
      console.error('Permanent delete error:', error);
      throw error;
    }
  }

  // Get current deleted notes value
  getCurrentDeletedNotes(): Note[] {
    return get(deletedNotes);
  }

  // Check if has more pages
  getHasMoreDeleted(): boolean {
    return get(hasMoreDeleted);
  }

  // Get total count
  getDeletedCount(): number {
    return get(deletedCount);
  }
}

// Create singleton instance for deleted notes
export const deletedNotesStore = new DeletedNotesStore();
