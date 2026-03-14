<script lang="ts">
  import type { Note, CreateNoteData, UpdateNoteData } from '../lib/notes';
  import { createNote, createNoteWithFormData, updateNote, validateTagIds } from '../lib/notes';
  import { notesStore } from '../lib/stores/notes';
  import { tags } from '../lib/stores/tags';
  import { Link2, Paperclip, Loader, Plus, Edit2, X, FileText } from '@lucide/svelte';
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
  let options = $derived.by(() =>
    ($tags || []).map(tag => ({
      value: tag.id, // Use UUID as value
      label: tag.name,
      description: tag.tag,
      color: tag.color
    }))
  );

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
      showFileSection = false; // Hide file section by default
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
      const { valid: validTagIds, invalid: invalidTagIds } = validateTagIds(
        formData.tags || [],
        currentTags
      );

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
        const hasFiles =
          submissionData.files &&
          submissionData.files.length > 0 &&
          submissionData.files.some(f => f.file);

        if (hasFiles) {
          // Create FormData directly here to avoid Svelte 5 proxy issues
          const formData = new FormData();

          // Add note data
          if (submissionData.name) formData.append('name', submissionData.name);
          if (submissionData.link) formData.append('link', submissionData.link);
          if (submissionData.description)
            formData.append('description', submissionData.description);
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
            submissionData.files.forEach(fileData => {
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
        const hasFiles =
          submissionData.files &&
          submissionData.files.length > 0 &&
          submissionData.files.some(f => f.file);

        if (hasFiles) {
          // Create FormData directly here to avoid Svelte 5 proxy issues
          const formData = new FormData();

          // Add note data
          if (submissionData.name) formData.append('name', submissionData.name);
          if (submissionData.link) formData.append('link', submissionData.link);
          if (submissionData.description)
            formData.append('description', submissionData.description);
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
            submissionData.files.forEach(fileData => {
              if (fileData.file) {
                formData.append('files[]', fileData.file);
              }
            });
          }

          // Use raw axios for FormData upload
          const axios = (await import('axios')).default;
          const { API_BASE_URL } = await import('../lib/constants');
          const token =
            typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

          if (!token) {
            throw new Error('Authentication required');
          }

          const axiosResponse = await axios.put(`${API_BASE_URL}/api/notes/${note.id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
              // Don't set Content-Type for FormData - browser will set it with boundary
            },
            timeout: 30000
          });

          response = axiosResponse.data.data
            ? { data: axiosResponse.data.data }
            : { data: axiosResponse.data };
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
  const headerIcon = $derived(mode === 'create' ? Plus : Edit2);
</script>

<Modal {isOpen} onClose={closeModal} maxW="max-w-4xl" showCloseButton={false}>
  {#snippet header()}
    <div class="py-3 px-4 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-b border-warning-200 dark:border-primary-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-warning-400 to-amber-500 dark:from-primary-500 dark:to-primary-600 flex items-center justify-center shadow-lg">
            {#if mode === 'create'}
              <Plus class="w-6 h-6 text-white" />
            {:else}
              <Edit2 class="w-6 h-6 text-white" />
            {/if}
          </div>
          <div>
            <h2 id="modal-title" class="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              {mode === 'create' ? 'Create a new note to save your thoughts' : 'Edit your note details'}
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
              onclick={() =>
                alert('Use the "Manage Tags" button in the Notes page to create new tags.')}
              class="text-warning-600 hover:text-warning-700 dark:text-primary-400 dark:hover:text-primary-300 underline"
            >
              Manage tags
            </button>
          </div>
        </div>

        <!-- Files Section -->
        <div>
          <button
            type="button"
            onclick={() => (showFileSection = !showFileSection)}
            class="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-warning-600 dark:hover:text-primary-400 transition-colors"
          >
            <Paperclip class="w-4 h-4" />
            <span>{mode === 'edit' ? 'Manage Files' : 'Attach Files'}</span>
            {#if (formData.files && formData.files.length > 0) || (mode === 'edit' && note?.files && note.files.length > 0)}
              <span
                class="badge bg-warning-100 text-warning-700 dark:bg-primary-900 dark:text-primary-300 text-xs"
              >
                ({(formData.files?.length || 0) +
                  (mode === 'edit' && note?.files ? note.files.length : 0)})
              </span>
            {/if}
          </button>
        </div>

        {#if showFileSection}
          <div class="mt-3 space-y-4">
            <!-- Existing Files - Only in edit mode -->
            {#if mode === 'edit' && note?.files && note.files.length > 0}
              <ExistingFiles files={note.files} bind:filesToDelete />
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
              <input type="checkbox" bind:checked={formData.isPublic} disabled={isLoading} />
              <span class="checkmark"></span>
              <span class="label-text">Public</span>
            </label>
          </div>

          <div class="custom-checkbox-container" class:opacity-50={isLoading}>
            <label class="custom-checkbox">
              <input type="checkbox" bind:checked={formData.isFavorite} disabled={isLoading} />
              <span class="checkmark"></span>
              <span class="label-text">Favorite</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-end px-3 gap-2">
        <button
          type="button"
          onclick={closeModal}
          class="px-2.5 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-1.5"
          disabled={isLoading}
        >
          <X class="w-4 h-4" />
          <span class="hidden sm:inline">Cancel</span>
        </button>
        <button
          type="button"
          class="px-2.5 py-2 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
          disabled={isLoading || !formData.name?.trim()}
          onclick={e => {
            e.preventDefault();
            const form = document.getElementById('note-form') as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
        >
          {#if isLoading}
            <Loader class="w-4 h-4 animate-spin" />
            <span class="hidden sm:inline">{mode === 'create' ? 'Creating...' : 'Updating...'}</span>
          {:else}
            {#if mode === 'create'}
              <Plus class="w-4 h-4" />
              <span class="hidden sm:inline">Create Note</span>
            {:else}
              <Edit2 class="w-4 h-4" />
              <span class="hidden sm:inline">Update Note</span>
            {/if}
          {/if}
        </button>
      </div>
    </div>
  {/snippet}
</Modal>
