<script lang="ts">
  import NoteForm from '../components/NoteForm.svelte';
  import Skeleton from 'boneyard-js/svelte';
  import { fixtureSingleNote } from '../lib/fixtures';
  import { isBoneyardCapture } from '../lib/boneyard';
  import { navigate, getCurrentRouterState } from '../lib/router';
  import { tagsStore } from '../lib/stores/tags';
  import { ChevronLeft, Save } from '@lucide/svelte';
  import { Button, EmptyState, PageHeader } from '$lib/components/ds';
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
    hasAuthToken =
      typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    isCheckingAuth = false;

    // During boneyard capture, skip fetching — the skeleton branch below is
    // forced on via isBoneyardCapture so its fixture form renders for the
    // snapshot (the headless browser has no auth token).
    if (isBoneyardCapture) return;

    if (!hasAuthToken) return;

    const routerState = getCurrentRouterState();
    const noteId = routerState.params.id;

    if (!noteId) {
      noteError = 'Note ID is required';
      return;
    }

    loadNote(noteId);

    // Load tags
    tagsStore.loadTags();
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

  function handleFormSuccess() {
    navigate('/notes');
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

<div class="mx-auto max-w-[768px] pt-16 pb-12">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="size-12 animate-spin rounded-pill border-4 border-control border-t-accent"></div>
    </div>
  {:else if !hasAuthToken && !isBoneyardCapture}
    <div class="flex min-h-[70vh] items-center justify-center">
      <EmptyState title="Login required" text="You need to be logged in to edit notes.">
        {#snippet actions()}
          <Button onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}>Log in</Button>
          <Button variant="secondary" onclick={() => navigate('/notes')}>Back to notes</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else if isLoadingNote || isBoneyardCapture}
    <div class="flex flex-col">
      <Button variant="ghost" size="sm" class="self-start" onclick={() => navigate('/notes')}>
        <ChevronLeft class="size-4" /> All notes
      </Button>

      <PageHeader title="Edit" highlight="note" subtitle="Edit your note details." />

      <Skeleton name="note-edit-form" loading={true}>
        <!-- Children render only during boneyard capture (dev), giving the
             headless browser a real NoteForm layout to snapshot. At runtime
             loading=true shows the generated bones instead. -->
        <NoteForm mode="edit" note={fixtureSingleNote} />
      </Skeleton>
    </div>
  {:else if noteError}
    <div class="flex min-h-[70vh] items-center justify-center">
      <EmptyState title="Couldn't load this note" text={noteError}>
        {#snippet actions()}
          <Button onclick={() => navigate('/notes')}>Back to notes</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else if note}
    <div class="flex flex-col">
      <Button variant="ghost" size="sm" class="self-start" onclick={() => navigate('/notes')}>
        <ChevronLeft class="size-4" /> All notes
      </Button>

      <PageHeader title="Edit" highlight="note" subtitle="Edit your note details." />

      <!-- Note Form -->
      {#if note}
        <Skeleton name="note-edit-form" loading={isLoadingNote}>
          <NoteForm
            mode="edit"
            {note}
            onSuccess={handleFormSuccess}
            onSubmitReady={handleFormReady}
          />
        </Skeleton>
      {/if}

      <!-- Action Buttons -->
      {#if note}
        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button variant="secondary" class="w-full sm:w-auto" onclick={handleCancel}>Cancel</Button>
          <Button class="w-full sm:w-auto" onclick={handleSubmit}>
            <Save class="size-4" /> Update note
          </Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
