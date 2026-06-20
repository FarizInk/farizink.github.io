<script lang="ts">
  import NoteForm from '../components/NoteForm.svelte';
  import { navigate, getCurrentRouterState } from '../lib/router';
  import { Lock } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import type { Note } from '../lib/notes';
  import { getNote } from '../lib/notes';

  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);
  let note = $state<Note | null>(null);
  let isLoadingNote = $state(false);
  let noteError = $state<string | null>(null);
  let formSubmitFn: (() => void) | null = null;

  onMount(() => {
    hasAuthToken = typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    isCheckingAuth = false;

    if (!hasAuthToken) return;

    const routerState = getCurrentRouterState();
    const noteId = routerState.params.id;

    if (!noteId) {
      noteError = 'Note ID is required';
      return;
    }

    loadNote(noteId);

    // Load tags
    import('../lib/stores/tags').then(({ tagsStore }) => {
      tagsStore.loadTags();
    });
  });

  async function loadNote(noteId: string) {
    isLoadingNote = true;
    noteError = null;

    try {
      const response = await getNote(noteId);
      note = response.data;
    } catch (error) {
      console.error('Failed to load note:', error);
      noteError = 'Note not found or you do not have permission to edit it.';
    } finally {
      isLoadingNote = false;
    }
  }

  function handleCancel() {
    navigate('/notes');
  }

  function handleSubmit() {
    if (formSubmitFn) {
      formSubmitFn();
    }
  }

  function handleFormReady(submitFn: () => void) {
    formSubmitFn = submitFn;
  }
</script>

<svelte:head>
  <title>Edit Note - Fariz</title>
  <meta
    name="description"
    content="Edit your note to update your thoughts, ideas, and resources."
  />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="notes-edit-page min-h-screen ">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-warning-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if !hasAuthToken}
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock class="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to edit notes.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onclick={() => navigate('/notes')}
            class="btn btn-secondary px-5 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Go Back
          </button>
          <button
            onclick={() => navigate('/login')}
            class="btn btn-primary px-5 py-2.5   rounded-lg font-medium transition-all shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  {:else if isLoadingNote}
    <div class="flex items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-warning-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if noteError}
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{noteError}</p>
        <button
          onclick={() => navigate('/notes')}
          class="btn btn-primary px-5 py-2.5   rounded-lg font-medium transition-all shadow-md"
        >
          Go Back to Notes
        </button>
      </div>
    </div>
  {:else if note}
    <div class="max-w-3xl mx-auto px-4 py-8">
      <button
        onclick={() => navigate('/notes')}
        class="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-warning-600 dark:hover:text-primary-400 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Notes
      </button>

      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Note</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Edit your note details</p>
      </div>

      <!-- Note Form -->
      {#if note}
        <NoteForm
          mode="edit"
          {note}
          onSuccess={() => navigate('/notes')}
          onSubmitReady={handleFormReady}
        />
      {/if}

      <!-- Action Buttons -->
      {#if note}
        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onclick={handleCancel}
            class="btn btn-secondary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onclick={handleSubmit}
            class="btn btn-primary dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Update Note
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
