<script lang="ts">
  import type { Note } from '../lib/notes';
  import NoteForm from './NoteForm.svelte';
  import Modal from './Modal.svelte';
  import { Plus, Edit2, X, Save, Loader2 } from '@lucide/svelte';
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

  let formSubmitFn: (() => void) | null = null;

  function closeModal() {
    isOpen = false;
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
    closeModal();
  }

  function handleFormReady(submitFn: () => void) {
    formSubmitFn = submitFn;
  }

  let title = $derived(mode === 'create' ? 'Create Note' : 'Edit Note');
  let submitText = $derived(mode === 'create' ? 'Create Note' : 'Update Note');
  let icon = $derived(mode === 'create' ? Plus : Edit2);
</script>

<Modal {isOpen} onClose={closeModal} maxW="max-w-4xl">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    <button onclick={closeModal} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <X class="w-5 h-5 text-gray-500" />
    </button>
  </div>

  <div class="mb-6">
    <NoteForm
      {mode}
      {note}
      onSuccess={handleFormSuccess}
      onSubmitReady={handleFormReady}
    />
  </div>

  <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
    <button
      type="button"
      onclick={closeModal}
      class="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      Cancel
    </button>
    <button
      type="button"
      onclick={handleSubmit}
      class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
    >
      <svelte:component this={icon} class="w-4 h-4" />
      {submitText}
    </button>
  </div>
</Modal>
