<script lang="ts">
  import type { Note, CreateNoteData, UpdateNoteData } from '../lib/notes';
  import { createNote, createNoteWithFormData, updateNote, validateTagIds, convertApiTagsToTagIds } from '../lib/notes';
  import { notesStore } from '../lib/stores/notes';
  import { tags } from '../lib/stores/tags';
  import { Link2, Paperclip, Loader } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import TagsSelector from './TagsSelector.svelte';
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

  // Convert tags to options for TagsSelector - use UUID as value
  let options = $derived.by(() => ($tags || []).map(tag => ({
    value: tag.id,      // Use UUID as value
    label: tag.name,
    description: tag.tag,
    color: tag.color
  })));

  // Helper to extract tag UUIDs from note
  function getTagUuidsFromNote(note: Note): string[] {
    if (!note.tags || !Array.isArray(note.tags)) return [];
    return note.tags.map(tag => tag.id).filter(id => id);
  }

  // Initialize form data when editing
  $effect(() => {
    if (mode === 'edit' && note && isOpen) {
      const tagUuids = getTagUuidsFromNote(note);
      formData = {
        name: note.name || '',
        link: note.link || '',
        description: note.description || '',
        isPublic: note.is_public,
        isFavorite: note.is_favorite,
        tags: tagUuids,
        files: []
      };
      selectedTagIds = tagUuids; // Sync selected tags (UUIDs)
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

      // Prepare submission data
      const submissionData: CreateNoteData = {
        name: formData.name,
        link: formData.link,
        description: formData.description,
        isPublic: formData.isPublic,
        isFavorite: formData.isFavorite,
        tags: validTagIds,
        files: formData.files
      };

      let response;
      if (mode === 'create') {
        // Check if we have files to upload
        const hasFiles = submissionData.files && submissionData.files.length > 0 && submissionData.files.some(f => f.file);

        if (hasFiles) {
          // Create FormData directly here to avoid Svelte 5 proxy issues
          const formData = new FormData();

          // Add note data
          if (submissionData.name) formData.append('name', submissionData.name);
          if (submissionData.link) formData.append('link', submissionData.link);
          if (submissionData.description) formData.append('description', submissionData.description);
          formData.append('is_public', submissionData.isPublic ? '1' : '0');
          formData.append('is_favorite', submissionData.isFavorite ? '1' : '0');

          // Add tags
          if (submissionData.tags && submissionData.tags.length > 0) {
            submissionData.tags.forEach(tagId => {
              formData.append('tag_ids[]', tagId);
            });
          }

          // Add files
          if (submissionData.files) {
            submissionData.files.forEach((fileData) => {
              if (fileData.file) {
                formData.append('files[]', fileData.file);
              }
            });
          }

          response = await createNoteWithFormData(formData);
        } else {
          response = await createNote(submissionData);
        }
        toast.success('Note created successfully!');
        // Add to store from response
        notesStore.prependNote(response.data);
      } else if (mode === 'edit' && note) {
        // Check if we have files to upload
        const hasFiles = submissionData.files && submissionData.files.length > 0 && submissionData.files.some(f => f.file);

        if (hasFiles) {
          // Create FormData directly here to avoid Svelte 5 proxy issues
          const formData = new FormData();

          // Add note data
          if (submissionData.name) formData.append('name', submissionData.name);
          if (submissionData.link) formData.append('link', submissionData.link);
          if (submissionData.description) formData.append('description', submissionData.description);
          formData.append('is_public', submissionData.isPublic ? '1' : '0');
          formData.append('is_favorite', submissionData.isFavorite ? '1' : '0');

          // Add tags
          if (submissionData.tags && submissionData.tags.length > 0) {
            submissionData.tags.forEach(tagId => {
              formData.append('tag_ids[]', tagId);
            });
          }

          // Add files to delete
          if (filesToDelete.length > 0) {
            formData.append('delete_file_ids', JSON.stringify(filesToDelete));
          }

          // Add new files
          if (submissionData.files) {
            submissionData.files.forEach((fileData) => {
              if (fileData.file) {
                formData.append('files[]', fileData.file);
              }
            });
          }

          // Use raw axios for FormData upload
          const axios = (await import('axios')).default;
          const { API_BASE_URL } = await import('../lib/constants');
          const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

          if (!token) {
            throw new Error('Authentication required');
          }

          const axiosResponse = await axios.put(`${API_BASE_URL}/api/notes/${note.id}`, formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
              // Don't set Content-Type for FormData - browser will set it with boundary
            },
            timeout: 30000
          });

          response = axiosResponse.data.data ? { data: axiosResponse.data.data } : { data: axiosResponse.data };
        } else {
          // No new files - use regular JSON update
          const updateData: UpdateNoteData = {
            name: formData.name,
            link: formData.link,
            description: formData.description,
            isPublic: formData.isPublic,
            isFavorite: formData.isFavorite,
            tags: validTagIds,
            deleteFileIds: filesToDelete.length > 0 ? filesToDelete : undefined
          };

          response = await updateNote(note.id, updateData);
        }

        toast.success('Note updated successfully!');
        // Update store from response
        notesStore.updateNote(note.id, response.data);
      }

      // Close modal after successful save
      onSuccess?.();
      closeModal();
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
    <div class="max-h-[calc(100vh-240px)] overflow-y-auto pr-2 -mr-2">
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
          autocomplete="off"
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
          />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label for="tag-select" class="label">Tags (Optional)</label>
        <div class="mt-2">
          <TagsSelector
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
            class="text-yellow-600 hover:text-yellow-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
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
          class="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-yellow-600 dark:hover:text-primary-400 transition-colors"
        >
          <Paperclip class="w-4 h-4" />
          <span>{mode === 'edit' ? 'Manage Files' : 'Attach Files'}</span>
          {#if (formData.files && formData.files.length > 0) || (mode === 'edit' && note?.files && note.files.length > 0)}
            <span class="badge bg-yellow-100 text-yellow-700 dark:bg-primary-900 dark:text-primary-300 text-xs">
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
              files={note.files}
              bind:filesToDelete={filesToDelete}
            />
          {/if}

          <!-- New Files Upload -->
          <div>
            <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              {mode === 'edit' ? 'Add New Files' : 'Upload Files'}
            </div>
            <FileUpload
              bind:files={formData.files!}
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
    </div>
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
      type="button"
      class="px-4 py-2 btn bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50 flex items-center"
      disabled={isLoading || !formData.name?.trim()}
      onclick={(e) => {
        e.preventDefault();
        const form = document.getElementById('note-form') as HTMLFormElement;
        if (form) {
          form.requestSubmit();
        }
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
