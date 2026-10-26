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
  import Skeleton from 'boneyard-js/svelte';
  import { fixtureNotes } from '../lib/fixtures';
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
    const deletePromise = (async () => {
      await permanentDeleteNote(note.id);
      deletedNotesStore.removeDeletedNote(note.id);
      onSuccess?.();
    })();

    toast.promise(deletePromise, {
      loading: 'Permanently deleting note...',
      success: 'Note permanently deleted',
      error: error => (error instanceof Error ? error.message : 'Failed to permanently delete note')
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error('Permanent delete note error:', error);
    } finally {
      actionLoadingIds.delete(note.id);
    }
  }

  async function handleRestore(note: Note) {
    if (actionLoadingIds.has(note.id)) return;

    actionLoadingIds.add(note.id);
    const restorePromise = (async () => {
      const response = await restoreNote(note.id);
      deletedNotesStore.removeDeletedNote(note.id);
      notesStore.prependNote(response.data);
      onSuccess?.();
      return response;
    })();

    toast.promise(restorePromise, {
      loading: 'Restoring note...',
      success: 'Note restored successfully',
      error: error => (error instanceof Error ? error.message : 'Failed to restore note')
    });

    try {
      await restorePromise;
    } catch (error) {
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
  <div class="flex items-center justify-between gap-3 mb-5">
    <div class="flex items-center gap-3">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-violet text-ink-on-dark">
        <Trash2 class="size-5" />
      </div>
      <div>
      <h2 class="text-title text-ink">Deleted notes</h2>
      <p class="text-body-sm text-ink-muted">
        {#if $deletedCount > 0}
          {$deletedCount} note{ $deletedCount === 1 ? '' : 's'} in trash
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
       class="btn-icon disabled:opacity-50"
       title="Refresh"
      >
        <RefreshCw class="size-4 { $isLoadingDeletedNotes ? 'animate-spin' : ''}" />
      </button>
      <button
        type="button"
        onclick={closeModal}
       class="btn-icon"
       aria-label="Close modal"
      >
        <X class="size-5" />
      </button>
    </div>
  </div>

  <div>
    {#if $isLoadingDeletedNotes && $deletedNotes.length === 0}
      <div class="flex flex-col items-center gap-4">
        {#each Array(3) as _, index (index)}
          <div class="w-full max-w-2xl">
            <Skeleton name="note-card" loading={true}>
              <NoteCard note={fixtureNotes[index] ?? fixtureNotes[0]} hasAuthToken={true} isDeleted={true} />
            </Skeleton>
          </div>
        {/each}
      </div>
    {:else if $deletedNotes.length === 0}
      <div class="text-center py-12">
        <div class="size-16 bg-sunken rounded-pill flex items-center justify-center mx-auto mb-4">
          <Trash2 class="size-8 text-ink-muted" />
        </div>
        <h3 class="text-title text-ink mb-2">Trash is empty</h3>
        <p class="text-body-sm text-ink-muted">
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
            class="btn btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if $isLoadingDeletedNotes}
              <RotateCw class="size-4 animate-spin" />
              Loading more...
            {:else}
              <Plus class="size-4" />
              Load more
            {/if}
          </button>
        {:else if $deletedNotes.length > 0}
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-sunken rounded-pill">
            <div class="size-2 bg-ink-muted rounded-pill"></div>
            <span class="text-code text-ink-muted">
              Showing all {$deletedNotes.length} of {$deletedCount} notes
            </span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Modal>
