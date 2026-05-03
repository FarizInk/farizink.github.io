<script lang="ts">
  import type { Note } from '../lib/notes';
  import NoteForm from './NoteForm.svelte';
  import Modal from './Modal.svelte';
  import { Plus, Edit2, X } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  interface Props {
    isOpen: boolean;
    mode: 'create' | 'edit';
    note?: Note | null;
    onSuccess?: (note: Note) => void;
  }

  let {
    isOpen = $bindable(false),
    mode = 'create',
    note = null,
    onSuccess
  }: Props = $props();

  let formSubmitFn: any = null;

  function closeModal() {
    isOpen = false;
  }

  function handleSubmit() {
    if (formSubmitFn) {
      formSubmitFn();
    } else {
    }
  }

  function handleFormSuccess(savedNote: Note) {
    if (mode === 'create') {
      toast.success('Note created successfully!');
    } else {
      toast.success('Note updated successfully!');
    }
    onSuccess?.(savedNote);
    closeModal();
  }

  function handleFormReady(submitFn: () => void) {
    formSubmitFn = submitFn;
  }

  let title = $derived(mode === 'create' ? 'Create Note' : 'Edit Note');
  let description = $derived(
    mode === 'create' ? 'Create a new note to save your thoughts' : 'Edit your note details'
  );
  let icon = $derived(mode === 'create' ? Plus : Edit2);
  let submitText = $derived(mode === 'create' ? 'Create Note' : 'Update Note');
</script>

<Modal {isOpen} onClose={closeModal} maxW="max-w-4xl" showCloseButton={false}>
  {#snippet header()}
    <div class="py-3 px-4 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-b border-warning-200 dark:border-primary-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-warning-400 to-amber-500 dark:from-primary-500 dark:to-primary-600 flex items-center justify-center shadow-lg">
            <svelte:component this={icon} class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              {description}
            </p>
          </div>
        </div>
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
  {/snippet}

  {#snippet body()}
    <div class="px-4 sm:px-6 py-6">
      <NoteForm
        {mode}
        {note}
        onSuccess={handleFormSuccess}
        onSubmitReady={handleFormReady}
      />
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-end px-6 py-4 gap-3">
        <button
          type="button"
          onclick={closeModal}
          class="px-2.5 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors font-medium flex items-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span class="hidden sm:inline">Cancel</span>
        </button>
        <button
          type="button"
          onclick={handleSubmit}
          class="px-2.5 py-2 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <svelte:component this={icon} class="w-4 h-4" />
          <span class="hidden sm:inline">{submitText}</span>
        </button>
      </div>
    </div>
  {/snippet}
</Modal>
