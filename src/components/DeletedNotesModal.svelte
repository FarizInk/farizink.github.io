<script lang="ts">
  import type { Note } from '../lib/notes';
  import {
    deletedNotesStore,
    deletedNotes,
    isLoadingDeletedNotes,
    hasMoreDeleted,
    deletedCount,
    notesStore
  } from '../lib/stores/notes';
  import { permanentDeleteNote, restoreNote } from '../lib/notes';
  import { toast } from 'svelte-sonner';
  import NoteCard from './NoteCard.svelte';
  import Modal from './Modal.svelte';
  import { RefreshCw, RotateCw, Plus, Trash2, X } from '@lucide/svelte';

  let { isOpen = $bindable(false), onSuccess } = $props<{
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
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  }

  function closeModal() {
    isOpen = false;
  }
</script>

<Modal {isOpen} onClose={closeModal} maxW="max-w-4xl" showCloseButton={false}>
  {#snippet header()}
    <div class="py-5 px-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-b border-red-200 dark:border-red-800">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 flex items-center justify-center shadow-lg">
            <Trash2 class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 id="modal-title" class="text-lg font-bold text-gray-900 dark:text-white">
              Deleted Notes
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {#if $deletedCount > 0}
                {$deletedCount} note{$deletedCount === 1 ? '' : ''} in trash
              {:else}
                Trash is empty
              {/if}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick={handleRefresh}
            disabled={$isLoadingDeletedNotes}
            class="w-9 h-9 rounded-lg bg-white dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-500 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              class={`w-4 h-4 text-secondary-600 dark:text-secondary-300 ${$isLoadingDeletedNotes ? 'animate-spin' : ''}`}
            />
          </button>
          <button
            type="button"
            onclick={closeModal}
            class="w-9 h-9 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="px-4 sm:px-6 py-6">
      <!-- Content -->
      <div>
        {#if $isLoadingDeletedNotes && $deletedNotes.length === 0}
          <!-- Loading State -->
          <div class="flex flex-col items-center justify-center py-12">
            <RotateCw class="w-8 h-8 text-warning-600 dark:text-primary-400 animate-spin mb-4" />
            <p class="text-secondary-500 dark:text-secondary-400">Loading notes...</p>
          </div>
        {:else if $deletedNotes.length === 0}
          <!-- Empty State -->
          <div class="text-center py-12">
            <div
              class="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trash2 class="w-8 h-8 text-secondary-400" />
            </div>
            <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Trash is empty
            </h3>
            <p class="text-sm text-secondary-500 dark:text-secondary-400">
              Notes in trash will appear here temporarily
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
              <div
                class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-full"
              >
                <div class="w-2 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full"></div>
                <span class="text-sm text-secondary-600 dark:text-secondary-400">
                  Showing all {$deletedNotes.length} of {$deletedCount} notes
                </span>
              </div>
            {:else}
              <!-- No deleted notes -->
              <div class="text-center">
                <p class="text-secondary-500 dark:text-secondary-400">No notes in trash</p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
</Modal>
