<script lang="ts">
  import NoteForm from '../components/NoteForm.svelte';
  import { navigate } from '../lib/router';
  import { Lock } from '@lucide/svelte';
  import { onMount } from 'svelte';

  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);
  let formSubmitFn: (() => void) | null = null;

  onMount(() => {
    hasAuthToken = typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    isCheckingAuth = false;

    if (hasAuthToken) {
      // Load tags
      import('../lib/stores/tags').then(({ tagsStore }) => {
        tagsStore.loadTags();
      });
    }
  });

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
  <title>Create Note - Fariz</title>
  <meta
    name="description"
    content="Create a new note to save your thoughts, ideas, and resources."
  />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="notes-create-page min-h-screen">
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
          You need to be logged in to create notes.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onclick={() => navigate('/notes')}
            class="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Go Back
          </button>
          <button
            onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}
            class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 dark:from-primary-600 dark:to-primary-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-700 dark:hover:to-primary-600 text-white rounded-lg font-medium transition-all shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  {:else}
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
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create Note</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Create a new note to save your thoughts</p>
      </div>

      <!-- Note Form -->
      {#if hasAuthToken}
        <NoteForm
          mode="create"
          onSuccess={() => navigate('/notes')}
          onSubmitReady={handleFormReady}
        />
      {/if}

      <!-- Action Buttons -->
      {#if hasAuthToken}
        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onclick={handleCancel}
            class="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onclick={handleSubmit}
            class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Note
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
