<script lang="ts">
  import NoteForm from '../components/NoteForm.svelte';
  import { navigate } from '../lib/router';
  import { tagsStore } from '../lib/stores/tags';
  import { ChevronLeft, Plus } from '@lucide/svelte';
  import { Button, EmptyState, PageHeader } from '$lib/components/ds';
  import { onMount } from 'svelte';

  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);
  let formSubmitFn: (() => void) | null = null;

  onMount(() => {
    hasAuthToken =
      typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    isCheckingAuth = false;

    if (hasAuthToken) {
      // Load tags
      tagsStore.loadTags();
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

<div class="mx-auto max-w-[768px] pt-16 pb-12">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="size-12 animate-spin rounded-pill border-4 border-control border-t-accent"></div>
    </div>
  {:else if !hasAuthToken}
    <div class="flex min-h-[70vh] items-center justify-center">
      <EmptyState title="Login required" text="You need to be logged in to create notes.">
        {#snippet actions()}
          <Button onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}>Log in</Button>
          <Button variant="secondary" onclick={() => navigate('/notes')}>Back to notes</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else}
    <div class="flex flex-col">
      <Button variant="ghost" size="sm" class="self-start" onclick={() => navigate('/notes')}>
        <ChevronLeft class="size-4" /> All notes
      </Button>

      <PageHeader title="Create" highlight="note" subtitle="Create a new note to save your thoughts." />

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
        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="secondary" class="w-full sm:w-auto" onclick={handleCancel}>Cancel</Button>
          <Button class="w-full sm:w-auto" onclick={handleSubmit}>
            <Plus class="size-4" /> Create note
          </Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
