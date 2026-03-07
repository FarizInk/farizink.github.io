import { writable, get } from 'svelte/store';
import {
  getNotes,
  getDeletedNotes,
  permanentDeleteNote,
  restoreNote,
  type Note,
  type NoteFilters
} from '../notes';
import { toast } from 'svelte-sonner';
import { PaginatedStore } from './PaginatedStore';
import type { PaginatedResponse } from './PaginatedStore';

// ============================================================================
// ACTIVE NOTES STORE
// ============================================================================

// Basic stores for active notes - kept for backward compatibility
export const notes = writable<Note[]>([]);
export const isLoadingNotes = writable<boolean>(false);
export const notesError = writable<string | null>(null);
export const currentPage = writable<number>(1);
export const hasMore = writable<boolean>(true);
export const totalCount = writable<number>(0);
export const notesLimit = writable<number>(12);
export const currentFilters = writable<NoteFilters>({
  sortBy: 'created_at',
  sortOrder: 'desc'
});

// Helper function to sort notes based on filters
function sortNotes(notesList: Note[], filters: NoteFilters): Note[] {
  const { sortBy, sortOrder } = filters;

  return [...notesList].sort((a, b) => {
    const aValue = sortBy === 'created_at' ? a.created_at : a.updated_at;
    const bValue = sortBy === 'created_at' ? b.created_at : b.updated_at;

    const aTime = new Date(aValue).getTime();
    const bTime = new Date(bValue).getTime();

    return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
  });
}

// Active Notes Store class extending PaginatedStore
class NotesStore extends PaginatedStore<Note> {
  constructor() {
    super(12); // Default limit
  }

  /**
   * Fetch data from API - implements abstract method from PaginatedStore
   */
  protected async _fetchData(
    page: number,
    limit: number,
    filters?: NoteFilters | undefined,
    append: boolean = false
  ): Promise<void> {
    const response = await getNotes(page, limit, filters);

    // Map API response to PaginatedResponse format
    const paginatedResponse: PaginatedResponse<Note> = {
      data: response.notes,
      pagination: response.pagination
    };

    // Update base class state
    this.updatePaginationState(paginatedResponse, append);

    // Sync with exported stores for backward compatibility
    notes.set(this.getData());
    currentPage.set(this.getCurrentPage());
    hasMore.set(this.getHasMore()); // Now uses base class method correctly
    totalCount.set(this.getTotalCount()); // Now uses base class method correctly
  }

  /**
   * Load initial notes (page 1) - clears existing notes
   */
  async loadNotes(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingNotes);
    if (loading) return;

    isLoadingNotes.set(true);
    notesError.set(null);

    // Update current filters
    if (filters) {
      currentFilters.set(filters);
    }

    try {
      await this._fetchData(1, get(notesLimit), filters);
    } catch (error) {
      notesError.set(error instanceof Error ? error.message : String(error));
      notes.set([]);
      toast.error('Failed to load notes');
    } finally {
      isLoadingNotes.set(false);
    }
  }

  /**
   * Load more notes (pagination) - appends to existing notes
   */
  async loadMore(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingNotes);
    const more = get(hasMore);

    if (loading || !more) return;

    isLoadingNotes.set(true);

    try {
      const nextPage = get(currentPage) + 1;
      await this._fetchData(nextPage, get(notesLimit), filters, true);
    } catch (error) {
      notesError.set(error instanceof Error ? error.message : String(error));
      toast.error('Failed to load more notes');
    } finally {
      isLoadingNotes.set(false);
    }
  }

  /**
   * Prepend a new note to the store (after create) - with sorting
   */
  prependNote(note: Note): void {
    // Get current value
    let currentNotes: Note[] = [];
    const unsub = notes.subscribe(v => {
      currentNotes = v;
    });
    unsub();

    // Create new array with note prepended and sorted
    const sorted = sortNotes([note, ...currentNotes], { sortBy: 'created_at', sortOrder: 'desc' });

    // Use set() for explicit reactivity
    notes.set(sorted);
    totalCount.update(count => count + 1);
  }

  /**
   * Update a note in the store (after edit) - with re-sorting
   */
  updateNote(noteId: string, updatedNote: Note): void {
    // Update the notes store and sort in one operation
    notes.update(currentNotes => {
      // Update the specific note
      const updated = currentNotes.map(note => (note.id === noteId ? updatedNote : note));

      // Sort by updated_at descending
      return sortNotes(updated, { sortBy: 'updated_at', sortOrder: 'desc' });
    });
  }

  /**
   * Remove a note from the store (after delete)
   */
  removeNote(noteId: string): void {
    notes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
    totalCount.update(count => Math.max(0, count - 1));
  }

  /**
   * Clear all notes and reset pagination
   */
  clear(): void {
    super.clear();
    notes.set([]);
    currentPage.set(1);
    hasMore.set(true);
    totalCount.set(0);
  }

  /**
   * Reset store state
   */
  reset(): void {
    this.clear();
    isLoadingNotes.set(false);
    notesError.set(null);
    currentFilters.set({
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
  }

  // Getters for backward compatibility
  getCurrentNotes(): Note[] {
    return get(notes);
  }

  // Removed override methods - use base class implementations instead
  // The base class methods correctly access this.hasMore and this.totalCount
  // getHasMore(): boolean {
  //   return get(hasMore);
  // }
  // getTotalCount(): number {
  //   return get(totalCount);
  // }
}

// Create singleton instance for active notes
export const notesStore = new NotesStore();

// ============================================================================
// DELETED NOTES STORE (for trash/recycle bin)
// ============================================================================

// Basic stores for deleted notes - kept for backward compatibility
export const deletedNotes = writable<Note[]>([]);
export const isLoadingDeletedNotes = writable<boolean>(false);
export const deletedNotesError = writable<string | null>(null);
export const currentDeletedPage = writable<number>(1);
export const hasMoreDeleted = writable<boolean>(true);
export const deletedCount = writable<number>(0);

// Deleted Notes Store class extending PaginatedStore
class DeletedNotesStore extends PaginatedStore<Note> {
  constructor() {
    super(12); // Default limit
  }

  /**
   * Fetch data from API - implements abstract method from PaginatedStore
   */
  protected async _fetchData(
    page: number,
    limit: number,
    filters?: NoteFilters | undefined,
    append: boolean = false
  ): Promise<void> {
    const response = await getDeletedNotes(page, limit, filters);

    // Map API response to PaginatedResponse format
    const paginatedResponse: PaginatedResponse<Note> = {
      data: response.notes,
      pagination: response.pagination
    };

    // Update base class state
    this.updatePaginationState(paginatedResponse, append);

    // Sync with exported stores for backward compatibility
    deletedNotes.set(this.getData());
    currentDeletedPage.set(this.getCurrentPage());
    hasMoreDeleted.set(this.getHasMore());
    deletedCount.set(this.getTotalCount());
  }

  /**
   * Load initial deleted notes (page 1) - clears existing notes
   */
  async loadDeletedNotes(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingDeletedNotes);
    if (loading) return;

    isLoadingDeletedNotes.set(true);
    deletedNotesError.set(null);

    try {
      await this._fetchData(1, get(notesLimit), filters);
    } catch (error) {
      deletedNotesError.set(error instanceof Error ? error.message : String(error));
      deletedNotes.set([]);
      toast.error('Failed to load deleted notes');
    } finally {
      isLoadingDeletedNotes.set(false);
    }
  }

  /**
   * Load more deleted notes (pagination) - appends to existing notes
   */
  async loadMoreDeleted(filters?: NoteFilters): Promise<void> {
    const loading = get(isLoadingDeletedNotes);
    const more = get(hasMoreDeleted);

    if (loading || !more) return;

    isLoadingDeletedNotes.set(true);

    try {
      const nextPage = get(currentDeletedPage) + 1;
      await this._fetchData(nextPage, get(notesLimit), filters, true);
    } catch (error) {
      deletedNotesError.set(error instanceof Error ? error.message : String(error));
      toast.error('Failed to load more deleted notes');
    } finally {
      isLoadingDeletedNotes.set(false);
    }
  }

  /**
   * Permanently delete a note from the store
   */
  async permanentlyDeleteNote(noteId: string): Promise<void> {
    try {
      await permanentDeleteNote(noteId);
      toast.success('Note permanently deleted');
      // Remove from store
      deletedNotes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
      deletedCount.update(count => Math.max(0, count - 1));
    } catch (error) {
      toast.error('Failed to permanently delete note');
      throw error;
    }
  }

  /**
   * Restore a deleted note
   */
  async restoreDeletedNote(noteId: string): Promise<Note> {
    try {
      const response = await restoreNote(noteId);
      toast.success('Note restored successfully');
      // Remove from deleted notes store
      deletedNotes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
      deletedCount.update(count => Math.max(0, count - 1));
      return response.data;
    } catch (error) {
      toast.error('Failed to restore note');
      throw error;
    }
  }

  /**
   * Remove a deleted note from the store (when API call is done separately)
   */
  removeDeletedNote(noteId: string): void {
    deletedNotes.update(currentNotes => currentNotes.filter(n => n.id !== noteId));
    deletedCount.update(count => Math.max(0, count - 1));
  }

  /**
   * Clear all deleted notes and reset pagination
   */
  clear(): void {
    super.clear();
    deletedNotes.set([]);
    currentDeletedPage.set(1);
    hasMoreDeleted.set(true);
    deletedCount.set(0);
  }

  /**
   * Reset store state
   */
  reset(): void {
    this.clear();
    isLoadingDeletedNotes.set(false);
    deletedNotesError.set(null);
  }

  // Getters for backward compatibility
  getCurrentDeletedNotes(): Note[] {
    return get(deletedNotes);
  }

  getHasMoreDeleted(): boolean {
    return get(hasMoreDeleted);
  }

  getDeletedCount(): number {
    return get(deletedCount);
  }
}

// Create singleton instance for deleted notes
export const deletedNotesStore = new DeletedNotesStore();
