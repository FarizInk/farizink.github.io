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

  let actionLoadingIds = $state(new Set<string>());

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
    if (actionLoadingIds.has(note.id)) return;

    const confirmMessage = `Are you sure you want to permanently delete this note?${note.files && note.files.length > 0 ? `\n\nThis will also delete ${note.files.length} file(s) from storage.` : ''}\n\nThis action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    actionLoadingIds.add(note.id);

    try {
      await permanentDeleteNote(note.id);
      toast.success('Note permanently deleted');
      deletedNotesStore.removeDeletedNote(note.id);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to permanently delete note');
      console.error('Permanent delete note error:', error);
    } finally {
      actionLoadingIds.delete(note.id);
    }
  }

  async function handleRestore(note: Note) {
    if (actionLoadingIds.has(note.id)) return;

    actionLoadingIds.add(note.id);

    try {
      const response = await restoreNote(note.id);
      toast.success('Note restored successfully');
      deletedNotesStore.removeDeletedNote(note.id);
      notesStore.prependNote(response.data);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to restore note');
      console.error('Restore note error:', error);
    } finally {
      actionLoadingIds.delete(note.id);
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

<Modal {isOpen} onClose={closeModal} maxW="max-w-4xl">
  <div class="flex items-center justify-between mb-5">
    <div>
      <h2 class="text-lg font-bold text-gray-900 dark:text-white">Deleted Notes</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {#if $deletedCount > 0}
          {$deletedCount} note{ $deletedCount === 1 ? '' : 's'} in trash
        {:else}
          Trash is empty
        {/if}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <button
        type="button"
        onclick={handleRefresh}
        disabled={$isLoadingDeletedNotes}
       class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
       title="Refresh"
      >
        <RefreshCw class="w-4 h-4 { $isLoadingDeletedNotes ? 'animate-spin' : ''}" />
      </button>
      <button
        type="button"
        onclick={closeModal}
       class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700"
       aria-label="Close modal"
      >
        <X class="w-5 h-5 text-gray-500" />
      </button>
    </div>
  </div>

  <div>
    {#if $isLoadingDeletedNotes && $deletedNotes.length === 0}
      <div class="flex flex-col items-center justify-center py-12">
        <RotateCw class="w-8 h-8 text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500 dark:text-gray-400">Loading notes...</p>
      </div>
    {:else if $deletedNotes.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trash is empty</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Notes in trash will appear here temporarily
        </p>
      </div>
    {:else}
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

      <div class="mt-6 flex justify-center">
        {#if $hasMoreDeleted}
          <button
            onclick={handleLoadMore}
            disabled={$isLoadingDeletedNotes}
              class="btn btn-secondary flex items-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Showing all {$deletedNotes.length} of {$deletedCount} notes
            </span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Modal>
