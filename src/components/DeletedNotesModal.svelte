<script lang="ts">
  import type { Note } from '../lib/notes';
  import { deletedNotesStore, deletedNotes, isLoadingDeletedNotes, hasMoreDeleted, deletedCount, notesStore } from '../lib/stores/notes';
  import { permanentDeleteNote, restoreNote } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import NoteCard from './NoteCard.svelte';
  import Modal from './Modal.svelte';
  import { RefreshCw, RotateCw, Plus, Trash2 } from '@lucide/svelte';

  let {
    isOpen = $bindable(false),
    onSuccess
  } = $props<{
    isOpen?: boolean;
    onSuccess?: () => void;
  }>();

  // Load deleted notes when modal opens
  $effect(() => {
    if (isOpen) {
      deletedNotesStore.loadDeletedNotes();
    }
  });

  async function handleRefresh() {
    await deletedNotesStore.loadDeletedNotes();
  }

  async function handleLoadMore() {
    await deletedNotesStore.loadMoreDeleted();
  }

  async function handlePermanentDelete(note: Note) {
    const confirmMessage = `Are you sure you want to permanently delete this note?${note.files && note.files.length > 0 ? `\n\nThis will also delete ${note.files.length} file(s) from storage.` : ''}\n\nThis action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      await permanentDeleteNote(note.id);
      toast.success('Note permanently deleted');
      // Remove from store
      deletedNotesStore.removeDeletedNote(note.id);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to permanently delete note');
      console.error('Permanent delete note error:', error);
    }
  }

  async function handleRestore(note: Note) {
    try {
      const response = await restoreNote(note.id);
      toast.success('Note restored successfully');
      // Remove from deleted notes store
      deletedNotesStore.removeDeletedNote(note.id);
      // Add to active notes store
      notesStore.prependNote(response.data);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to restore note');
      console.error('Restore note error:', error);
    }
  }

  function handleShare(note: Note) {
    const shareUrl = `${window.location.origin}/notes?id=${note.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  }

  function closeModal() {
    isOpen = false;
  }
</script>

<Modal
  {isOpen}
  onClose={closeModal}
  maxW="max-w-4xl"
  title="Deleted Notes"
  showCloseButton={true}
>
  {#snippet header()}
    <div class="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <Trash2 class="w-5 h-5 text-red-500" />
        <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">
          Deleted Notes
        </h2>
        {#if $deletedCount > 0}
          <span class="badge badge-danger text-xs">
            {$deletedCount}
          </span>
        {/if}
      </div>
      <div class="flex items-center gap-2">
        <button
          onclick={handleRefresh}
          disabled={$isLoadingDeletedNotes}
          class="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw
            class={`w-4 h-4 text-gray-600 dark:text-gray-400 ${$isLoadingDeletedNotes ? 'animate-spin' : ''}`}
          />
        </button>
        <button
          onclick={closeModal}
          class="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="px-4 sm:px-6 py-4">
      <!-- Content -->
      <div class="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 -mr-2">
        {#if $isLoadingDeletedNotes && $deletedNotes.length === 0}
          <!-- Loading State -->
          <div class="flex flex-col items-center justify-center py-12">
            <RotateCw class="w-8 h-8 text-yellow-600 dark:text-primary-400 animate-spin mb-4" />
            <p class="text-secondary-500 dark:text-secondary-400">Loading deleted notes...</p>
          </div>
        {:else if $deletedNotes.length === 0}
          <!-- Empty State -->
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 class="w-8 h-8 text-secondary-400" />
            </div>
            <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Trash is empty
            </h3>
            <p class="text-sm text-secondary-500 dark:text-secondary-400">
              Deleted notes will appear here temporarily
            </p>
          </div>
        {:else}
          <!-- Notes List -->
          <div class="flex flex-col items-center gap-4">
            {#each $deletedNotes as note (note.id)}
              <div class="w-full max-w-2xl">
                <NoteCard
                  {note}
                  hasAuthToken={true}
                  isDeleted={true}
                  onPermanentDelete={handlePermanentDelete}
                  onRestore={handleRestore}
                  onShare={handleShare}
                />
              </div>
            {/each}
          </div>

          <!-- Load More Button / End Indicator -->
          <div class="mt-6 flex justify-center">
            {#if $hasMoreDeleted}
              <button
                onclick={handleLoadMore}
                disabled={$isLoadingDeletedNotes}
                class="btn btn-secondary flex items-center gap-2 px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {#if $isLoadingDeletedNotes}
                  <RotateCw class="w-4 h-4 animate-spin" />
                  Loading more...
                {:else}
                  <Plus class="w-4 h-4" />
                  Load More
                {/if}
              </button>
            {:else if $deletedNotes.length > 0}
              <!-- End of list - show total count -->
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full">
                <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
                <span class="text-sm text-secondary-600 dark:text-secondary-400">
                  Showing all {$deletedNotes.length} of {$deletedCount} deleted notes
                </span>
              </div>
            {:else}
              <!-- No deleted notes -->
              <div class="text-center">
                <p class="text-secondary-500 dark:text-secondary-400">No deleted notes</p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
</Modal>
