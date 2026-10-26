<script lang="ts">
  import type { Note } from '../lib/notes';
  import NoteForm from './NoteForm.svelte';
  import Modal from './Modal.svelte';
  import { Plus, Edit2, X, AlertTriangle, Loader2 } from '@lucide/svelte';

  interface Props {
    isOpen: boolean;
    mode: 'create' | 'edit';
    note?: Note | null;
    onSuccess?: (note: Note) => void;
  }

  let { isOpen = $bindable(false), mode = 'create', note = null, onSuccess }: Props = $props();

  let formSubmitFn: (() => void) | null = null;
  let formHasChanges = $state(false);
  let isSubmitting = $state(false);
  let showConfirm = $state(false);

  function requestClose() {
    if (isSubmitting) return;
    if (formHasChanges) {
      showConfirm = true;
    } else {
      isOpen = false;
    }
  }

  function confirmDiscard() {
    showConfirm = false;
    isOpen = false;
  }

  function cancelDiscard() {
    showConfirm = false;
  }

  function handleSubmit() {
    if (formSubmitFn) {
      formSubmitFn();
    }
  }

  function handleFormSuccess(savedNote: Note) {
    onSuccess?.(savedNote);
    isOpen = false;
  }

  function handleFormReady(submitFn: () => void) {
    formSubmitFn = submitFn;
  }

  function handleHasChangesChange(hasChanges: boolean) {
    formHasChanges = hasChanges;
  }

  let title = $derived(mode === 'create' ? 'Create note' : 'Edit note');
  let submitText = $derived(mode === 'create' ? 'Create note' : 'Update note');
  let icon = $derived(mode === 'create' ? Plus : Edit2);
</script>

<Modal {isOpen} onClose={requestClose} locked={showConfirm} maxW="max-w-4xl">
  <div class="flex items-center justify-between gap-3 mb-6">
    <div class="flex items-center gap-3">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-deep text-ink-on-dark">
        {#if mode === 'create'}
          <Plus class="size-5" />
        {:else}
          <Edit2 class="size-5" />
        {/if}
      </div>
      <h2 class="text-title text-ink">
        {title}
      </h2>
    </div>
    <button
      onclick={requestClose}
      disabled={isSubmitting}
      class="btn-icon"
      aria-label="Close"
    >
      <X class="size-5" />
    </button>
  </div>

  <div class="mb-6">
    <NoteForm
      {mode}
      {note}
      onSuccess={handleFormSuccess}
      onSubmitReady={handleFormReady}
      onHasChangesChange={handleHasChangesChange}
      onLoadingChange={(loading) => (isSubmitting = loading)}
    />
  </div>

  <div class="flex items-center justify-end gap-3 pt-4">
    <button type="button" onclick={requestClose} disabled={isSubmitting} class="btn btn-secondary">Cancel</button>
    <button
      type="button"
      onclick={handleSubmit}
      disabled={isSubmitting}
      class="btn btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {#if isSubmitting}
        <Loader2 class="size-4 animate-spin" />
        Saving...
      {:else if mode === 'create'}
        <Plus class="size-4" />
        {submitText}
      {:else}
        <Edit2 class="size-4" />
        {submitText}
      {/if}
    </button>
  </div>

  {#snippet overlay()}
    {#if showConfirm}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="absolute inset-0 bg-overlay backdrop-blur-sm rounded-lg flex items-center justify-center z-10"
        onwheel={e => e.preventDefault()}
        ontouchmove={e => e.preventDefault()}
      >
        <div class="bg-raised rounded-lg p-6 max-w-sm w-full mx-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-lilac text-ink-on-bright">
              <AlertTriangle class="size-5" />
            </div>
            <h3 class="text-title text-ink">Unsaved changes</h3>
          </div>
          <p class="text-body-sm text-ink-muted mb-5">
            You have unsaved changes. Are you sure you want to discard them?
          </p>
          <div class="flex items-center justify-end gap-2">
            <button type="button" onclick={cancelDiscard} class="btn btn-secondary">
              Keep editing
            </button>
            <button type="button" onclick={confirmDiscard} class="btn btn-danger">
              Discard
            </button>
          </div>
        </div>
      </div>
    {/if}
  {/snippet}
</Modal>
