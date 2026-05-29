<script lang="ts">
  import type { Note } from '../lib/notes';
  import NoteForm from './NoteForm.svelte';
  import Modal from './Modal.svelte';
  import { Plus, Edit2, X, AlertTriangle } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    isOpen: boolean;
    mode: 'create' | 'edit';
    note?: Note | null;
    onSuccess?: (note: Note) => void;
  }

  let { isOpen = $bindable(false), mode = 'create', note = null, onSuccess }: Props = $props();

  let formSubmitFn: (() => void) | null = null;
  let formHasChanges = $state(false);
  let showConfirm = $state(false);

  function requestClose() {
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
    if (mode === 'create') {
      toast.success('Note created successfully!');
    } else {
      toast.success('Note updated successfully!');
    }
    onSuccess?.(savedNote);
    isOpen = false;
  }

  function handleFormReady(submitFn: () => void) {
    formSubmitFn = submitFn;
  }

  function handleHasChangesChange(hasChanges: boolean) {
    formHasChanges = hasChanges;
  }

  let title = $derived(mode === 'create' ? 'Create Note' : 'Edit Note');
  let submitText = $derived(mode === 'create' ? 'Create Note' : 'Update Note');
  let icon = $derived(mode === 'create' ? Plus : Edit2);
</script>

<Modal {isOpen} onClose={requestClose} locked={showConfirm} maxW="max-w-4xl">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    <button
      onclick={requestClose}
      class="btn-icon p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <X class="w-5 h-5 text-gray-500" />
    </button>
  </div>

  <div class="mb-6">
    <NoteForm
      {mode}
      {note}
      onSuccess={handleFormSuccess}
      onSubmitReady={handleFormReady}
      onHasChangesChange={handleHasChangesChange}
    />
  </div>

  <div
    class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
  >
    <button type="button" onclick={requestClose} class="btn btn-secondary"> Cancel </button>
    <button
      type="button"
      onclick={handleSubmit}
      class="btn btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
    >
      <svelte:component this={icon} class="w-4 h-4" />
      {submitText}
    </button>
  </div>

  {#snippet overlay()}
    {#if showConfirm}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
        onwheel={e => e.preventDefault()}
        ontouchmove={e => e.preventDefault()}
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-sm w-full mx-4"
        >
          <div class="flex items-center gap-3 mb-3">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30"
            >
              <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">Unsaved Changes</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-5">
            You have unsaved changes. Are you sure you want to discard them?
          </p>
          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              onclick={cancelDiscard}
              class="btn btn-secondary px-4 py-2 text-sm"
            >
              Keep Editing
            </button>
            <button
              type="button"
              onclick={confirmDiscard}
              class="px-4 py-2 text-sm font-medium rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    {/if}
  {/snippet}
</Modal>
