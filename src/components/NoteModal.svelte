<script lang="ts">
  import type { Note, CreateNoteData, UpdateNoteData } from '../lib/notes';
  import { createNote, updateNote, validateTagIds, convertApiTagsToTagIds } from '../lib/notes';
  import { tags } from '../lib/stores/tags';
  import { notesStore } from '../lib/stores/notes';
  import { Link2, Paperclip, Loader } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import MultipleSelect from './MultipleSelect.svelte';
  import FileUpload from './FileUpload.svelte';
  import ExistingFiles from './ExistingFiles.svelte';
  import TiptapEditor from './TiptapEditor.svelte';
  import Modal from './Modal.svelte';

  let {
    isOpen = $bindable(false),
    mode = 'create',
    note = null,
    onSuccess
  } = $props<{
    isOpen: boolean;
    mode?: 'create' | 'edit';
    note?: Note | null;
    onSuccess?: () => void;
  }>();

  let isLoading = $state(false);
  let formData = $state<CreateNoteData>({
    name: '',
    link: '',
    description: '',
    isPublic: true,
    isFavorite: false,
    tags: [],
    files: []
  });

  let selectedTagIds = $state<string[]>([]);
  let showFileSection = $state(false);

  // For edit mode - track files to delete
  let filesToDelete = $state<string[]>([]);

  // Convert tags to options for MultipleSelect
  let options = $derived($tags.map(tag => ({
    value: tag.tag,
    label: tag.name,
    description: tag.tag,
    color: tag.color // Keep null as null, MultipleSelect will handle fallback
  })));

  // Initialize form data when editing
  $effect(() => {
    if (mode === 'edit' && note && isOpen) {
      const tagIds = convertApiTagsToTagIds(note);
      formData = {
        name: note.name || '',
        link: note.link || '',
        description: note.description || '',
        isPublic: note.isPublic,
        isFavorite: note.isFavorite,
        tags: tagIds,
        files: [] // Note: In edit mode, we don't load existing files yet
      };
      selectedTagIds = tagIds; // Sync selected tags
      showFileSection = true; // Show file section in edit mode to manage existing files
      filesToDelete = []; // Clear files to delete
    } else if (mode === 'create' && isOpen) {
      formData = {
        name: '',
        link: '',
        description: '',
        isPublic: true,
        isFavorite: false,
        tags: [],
        files: []
      };
      selectedTagIds = []; // Clear selected tags
      showFileSection = false; // Hide file section by default
      filesToDelete = []; // Clear files to delete
    }
  });

  // Sync selectedTagIds to formData.tags when selectedTagIds changes
  $effect(() => {
    formData.tags = selectedTagIds;
  });


  function closeModal() {
    isOpen = false;
    formData = {
      name: '',
      link: '',
      description: '',
      isPublic: true,
      isFavorite: false,
      tags: [],
      files: []
    };
    selectedTagIds = [];
    showFileSection = false;
    filesToDelete = [];
  }




  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!formData.name?.trim()) {
      toast.error('Note name is required');
      return;
    }

    isLoading = true;

    try {
      // Validate tag IDs before submission
      const currentTags = $tags;
      const { valid: validTagIds, invalid: invalidTagIds } = validateTagIds(formData.tags || [], currentTags);

      if (invalidTagIds.length > 0) {
        toast.error(`Invalid tag IDs: ${invalidTagIds.join(', ')}`);
        return;
      }

      // Prepare submission data - files will be uploaded with the form
      const submissionData: CreateNoteData = {
        ...formData,
        tags: validTagIds
      };

      if (mode === 'create') {
        const response = await createNote(submissionData);
        toast.success('Note created successfully!');
        // Prepend to store instead of full refresh
        notesStore.prependNote(response.data);
        onSuccess?.();
      } else if (mode === 'edit' && note) {
        // Prepare update data
        const updateData: UpdateNoteData = {
          name: formData.name,
          link: formData.link,
          description: formData.description,
          isPublic: formData.isPublic,
          isFavorite: formData.isFavorite,
          tags: validTagIds,
          files: formData.files,
          deleteFileIds: filesToDelete.length > 0 ? filesToDelete : undefined
        };

        const response = await updateNote(note.id, updateData);
        toast.success('Note updated successfully!');
        // Update in store instead of full refresh
        notesStore.updateNote(note.id, response.data);
        onSuccess?.();
      }
    } catch (error) {
      toast.error(mode === 'create' ? 'Failed to create note' : 'Failed to update note');
      console.error('Note save error:', error);
    } finally {
      isLoading = false;
    }
  }


  const title = $derived(mode === 'create' ? 'Create Note' : 'Edit Note');
</script>

<Modal
  {isOpen}
  onClose={closeModal}
  maxW="max-w-4xl"
  {title}
  showCloseButton={false}
>
  {#snippet body()}
    <form id="note-form" onsubmit={handleSubmit} class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="label">Name *</label>
        <input
          id="name"
          type="text"
          placeholder="Enter note name"
          class="input"
          bind:value={formData.name}
          disabled={isLoading}
          required
        />
      </div>

      <!-- Link -->
      <div>
        <label for="link" class="label">Link (Optional)</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 class="w-4 h-4 text-secondary-400" />
          </div>
          <input
            id="link"
            type="url"
            placeholder=""
            class="input !pl-10"
            bind:value={formData.link}
            disabled={isLoading}
            autocomplete="off"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="label">Description (Optional)</label>
        <div class="mt-2">
          <TiptapEditor
            bind:content={formData.description}
            placeholder="Enter note description..."
            disabled={isLoading}
            maxHeight="200px"
          />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label for="tag-select" class="label">Tags (Optional)</label>
        <div class="mt-2">
          <MultipleSelect
            id="tag-select"
            {options}
            bind:selectedValues={selectedTagIds}
            placeholder="Select tags..."
            disabled={isLoading}
          />
        </div>

        <!-- Create New Tag Link -->
        <div class="text-sm mt-3">
          <span class="text-secondary-600 dark:text-secondary-400">Need a new tag? </span>
          <button
            type="button"
            onclick={() => alert('Use the "Manage Tags" button in the Notes page to create new tags.')}
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
          >
            Manage tags
          </button>
        </div>
      </div>

      <!-- Files Section -->
      <div>
        <button
          type="button"
          onclick={() => showFileSection = !showFileSection}
          class="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <Paperclip class="w-4 h-4" />
          <span>{mode === 'edit' ? 'Manage Files' : 'Attach Files'}</span>
          {#if (formData.files && formData.files.length > 0) || (mode === 'edit' && note?.files && note.files.length > 0)}
            <span class="badge badge-primary text-xs">
              ({(formData.files?.length || 0) + (mode === 'edit' && note?.files ? note.files.length : 0)})
            </span>
          {/if}
        </button>
      </div>

      {#if showFileSection}
        <div class="mt-3 space-y-4">
          <!-- Existing Files - Only in edit mode -->
          {#if mode === 'edit' && note?.files && note.files.length > 0}
            <ExistingFiles
              bind:files={note.files}
              bind:filesToDelete={filesToDelete}
            />
          {/if}

          <!-- New Files Upload -->
          <div>
            <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              {mode === 'edit' ? 'Add New Files' : 'Upload Files'}
            </div>
            <FileUpload
              bind:files={formData.files}
              disabled={isLoading}
              maxFiles={mode === 'edit' ? 10 - (note?.files?.length || 0) : 10}
            />
          </div>
        </div>
      {/if}

      <!-- Options -->
      <div class="flex items-center gap-6">
        <div class="custom-checkbox-container" class:opacity-50={isLoading}>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              bind:checked={formData.isPublic}
              disabled={isLoading}
            />
            <span class="checkmark"></span>
            <span class="label-text">Public</span>
          </label>
        </div>

        <div class="custom-checkbox-container" class:opacity-50={isLoading}>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              bind:checked={formData.isFavorite}
              disabled={isLoading}
            />
            <span class="checkmark"></span>
            <span class="label-text">Favorite</span>
          </label>
        </div>
      </div>
    </form>
  {/snippet}

  {#snippet footer()}
    <button
      type="button"
      onclick={closeModal}
      class="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      disabled={isLoading}
    >
      Cancel
    </button>
    <button
      type="submit"
      form="note-form"
      class="px-4 py-2 btn btn-primary disabled:opacity-50"
      disabled={isLoading || !formData.name?.trim()}
      onclick={(e) => {
        const form = document.getElementById('note-form') as HTMLFormElement;
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }}
    >
      {#if isLoading}
        <Loader class="w-4 h-4 animate-spin mr-2" />
        {mode === 'create' ? 'Creating...' : 'Updating...'}
      {:else}
        {mode === 'create' ? 'Create Note' : 'Update Note'}
      {/if}
    </button>
  {/snippet}
</Modal>
