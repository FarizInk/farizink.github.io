<script lang="ts">
  import type { Note } from '../lib/notes';
  import type { NoteFileData } from '../lib/notes';
  import type { Tag } from '../lib/tags';
  import { createNote, updateNote } from '../lib/notes';
  import { tags } from '../lib/stores/tags';
  import { Link2, Paperclip, ChevronDown, Settings2 } from '@lucide/svelte';
  import TagsSelector from './TagsSelector.svelte';
  import FileUpload from './FileUpload.svelte';
  import ExistingFiles from './ExistingFiles.svelte';
  import TiptapEditor from './TiptapEditor.svelte';
  import TagModal from './TagModal.svelte';
  import { onMount } from 'svelte';

  interface Props {
    mode: 'create' | 'edit';
    note?: Note | null;
    disabled?: boolean;
    onSuccess?: (note: Note) => void;
    onError?: (error: string) => void;
    onSubmitReady?: (submitFn: () => void) => void;
    onHasChangesChange?: (hasChanges: boolean) => void;
  }

  let {
    mode = 'create',
    note = null,
    disabled = false,
    onSuccess,
    onError,
    onSubmitReady,
    onHasChangesChange,
  }: Props = $props();

  // Simple local form state
  let localName = $state('');
  let localLink = $state('');
  let localDescription = $state('');
  let localIsPublic = $state(true);
  let localIsFavorite = $state(false);
  let localSelectedTagIds = $state<string[]>([]);
  let localFiles = $state<NoteFileData[]>([]);
  let localFilesToDelete = $state<string[]>([]);
  let localShowFileSection = $state(false);
  let showTagModal = $state(false);
  let isLoading = $state(false);


  // Track initial values for change detection
  let initialName = $state('');
  let initialLink = $state('');
  let initialDescription = $state('');
  let initialIsPublic = $state(true);
  let initialIsFavorite = $state(false);
  let initialSelectedTagIds = $state<string[]>([]);
  let formPopulated = $state(false);

  // Detect if form has unsaved changes
  let hasChanges = $derived.by(() => {
    if (!formPopulated) return false;
    if (mode === 'create') {
      if (localName.trim()) return true;
      if (localLink.trim()) return true;
      if (localDescription.trim()) return true;
      if (!localIsPublic) return true;
      if (localIsFavorite) return true;
      if (localSelectedTagIds.length > 0) return true;
      if (localFiles.length > 0) return true;
      return false;
    } else {
      if (localName !== initialName) return true;
      if (localLink !== initialLink) return true;
      if (localDescription !== initialDescription) return true;
      if (localIsPublic !== initialIsPublic) return true;
      if (localIsFavorite !== initialIsFavorite) return true;
      if (JSON.stringify(localSelectedTagIds) !== JSON.stringify(initialSelectedTagIds)) return true;
      if (localFiles.length > 0) return true;
      if (localFilesToDelete.length > 0) return true;
      return false;
    }
  });

  // Expose hasChanges to parent via callback
  $effect(() => {
    onHasChangesChange?.(hasChanges);
  });
  // Get available tags from store
  let availableTags = $state<Tag[]>([]);
  let tagOptions = $derived(availableTags.map(tag => ({
    value: tag.id,
    label: tag.name,
    description: tag.tag,
    color: tag.color
  })));

  // Populate form for edit mode
  onMount(() => {

    // Load tags
    const unsubTags = tags.subscribe((t) => {
      availableTags = t || [];
    });

    // If edit mode and note exists, populate form
    if (mode === 'edit' && note) {
      localName = note.name || '';
      localLink = note.link || '';
      localDescription = note.description || '';
      localIsPublic = note.is_public ?? true;
      localIsFavorite = note.is_favorite ?? false;
      localSelectedTagIds = note.tags?.map(t => t.id).filter(id => id) || [];
      localFiles = [];

    }

    // Snapshot initial values after population
    initialName = localName;
    initialLink = localLink;
    initialDescription = localDescription;
    initialIsPublic = localIsPublic;
    initialIsFavorite = localIsFavorite;
    initialSelectedTagIds = [...localSelectedTagIds];
    formPopulated = true;

    // Notify parent that form is ready with submit function
    if (onSubmitReady) {
      onSubmitReady(submit);
    }

    return () => {
      unsubTags();
    };
  });

  // Direct submit function
  async function submit() {
    if (isLoading) return;

    // Validate
    if (!localName.trim()) {
      onError?.('Note name is required');
      return;
    }

    isLoading = true;

    try {
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        throw new Error('Authentication required');
      }

      // Check if we have files to upload
      const hasFiles = localFiles && localFiles.length > 0;

      let response: { id: string; [key: string]: unknown };
      if (hasFiles) {
        // Use FormData for file uploads - build it here to bypass Svelte proxy issues
        const formData = new FormData();

        // Add basic fields
        formData.append('name', localName);
        if (localLink) formData.append('link', localLink);
        if (localDescription) formData.append('description', localDescription);
        formData.append('is_public', localIsPublic ? '1' : '0');
        formData.append('is_favorite', localIsFavorite ? '1' : '0');

        // Add tags
        if (localSelectedTagIds && localSelectedTagIds.length > 0) {
          localSelectedTagIds.forEach(tagId => {
            formData.append('tag_ids[]', tagId);
          });
        }

        // Add delete file IDs for update mode
        if (mode === 'edit' && localFilesToDelete.length > 0) {
          formData.append('delete_file_ids', JSON.stringify(localFilesToDelete));
        }

        // Add files with dot notation
        const filesToProcess = Array.from(localFiles);
        for (let i = 0; i < filesToProcess.length; i++) {
          const fileProperty = filesToProcess[i]?.file;
          if (fileProperty) {
            formData.append('files[]', fileProperty as File);
          }
        }

        // Send request directly
        const axios = (await import('axios')).default;
        const { API_BASE_URL } = await import('../lib/constants');

        if (mode === 'create') {
          const axiosResponse = await axios.post(`${API_BASE_URL}/api/notes`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            },
            timeout: 30000
          });
          response = axiosResponse.data.data ? { data: axiosResponse.data.data } : { data: axiosResponse.data };
        } else if (note) {
          const axiosResponse = await axios.put(`${API_BASE_URL}/api/notes/${note.id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            },
            timeout: 30000
          });

          // Backend doesn't return files in update response, reload note data
          if (hasFiles) {
            const reloadResponse = await axios.get(`${API_BASE_URL}/api/notes/${note.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
              }
            });
            response = reloadResponse.data.data ? { data: reloadResponse.data.data } : { data: reloadResponse.data };
          } else {
            response = axiosResponse.data.data ? { data: axiosResponse.data.data } : { data: axiosResponse.data };
          }
        }
      } else {
        // No files - use JSON
        const submissionData: Record<string, unknown> = {
          name: localName,
          link: localLink,
          description: localDescription,
          isPublic: localIsPublic,
          isFavorite: localIsFavorite,
          tags: localSelectedTagIds
        };

        if (mode === 'create') {
          response = await createNote(submissionData);
        } else if (note) {
          const updateData: Record<string, unknown> = {
            name: localName,
            link: localLink,
            description: localDescription,
            isPublic: localIsPublic,
            isFavorite: localIsFavorite,
            tags: localSelectedTagIds
          };

          if (localFilesToDelete.length > 0) {
            updateData.deleteFileIds = localFilesToDelete;
          }

          response = await updateNote(note.id, updateData);
        }
      }

      onSuccess?.(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to save note';
      onError?.(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      isLoading = false;
    }
  }

  function handleSubmitInternal(e: Event) {
    e.preventDefault();
    submit();
  }
</script>

<div class="note-form space-y-5">
  <form id="note-form" class="space-y-5" onsubmit={handleSubmitInternal}>
      <!-- Name -->
      <div>
        <label for="name" class="label">Title <span class="text-red-500">*</span></label>
        <input
          id="name"
          type="text"
          placeholder="Enter note name"
          class="input"
          bind:value={localName}
          disabled={isLoading}
          autocomplete="off"
          required
        />
      </div>

      <!-- Link -->
      <div>
        <label for="link" class="label">Link</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 class="w-4 h-4 text-secondary-400" />
          </div>
          <input
            id="link"
            type="url"
            placeholder="https://example.com"
            class="input !pl-10"
            bind:value={localLink}
            disabled={isLoading}
            autocomplete="off"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="label">Description</label>
        <div class="mt-2">
          <TiptapEditor
            bind:content={localDescription}
            placeholder="Enter note description..."
            disabled={isLoading}
          />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <div class="flex gap-2 items-center">
            <label for="tag-select" class="label">Tags</label>
            <!-- Manage Tags Link -->
            <div>
              <button
                type="button"
                onclick={() => (showTagModal = true)}
                class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-purple-400 transition-colors group"
              >
                <Settings2 class="w-3.5 h-3.5" />
                <span>Manage tags</span>
              </button>
            </div>
        </div>
        <div class="mt-2">
          <TagsSelector
            id="tag-select"
            options={tagOptions}
            bind:selectedValues={localSelectedTagIds}
            placeholder="Select tags..."
            disabled={isLoading}
          />
        </div>
      </div>

      <!-- Files Section Toggle -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <button
          type="button"
          onclick={() => (localShowFileSection = !localShowFileSection)}
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div class="flex items-center gap-2">
            <Paperclip class="w-4 h-4 text-gray-400" />
            <span>{mode === 'edit' ? 'Files' : 'Attach Files'}</span>
            {#if (localFiles && localFiles.length > 0) || (mode === 'edit' && note?.files && note.files.length > 0)}
              <span class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-purple-900/40 dark:text-purple-300">
                {(localFiles?.length || 0) + (mode === 'edit' && note?.files ? note.files.length : 0)}
              </span>
            {/if}
          </div>
          <ChevronDown class="w-4 h-4 text-gray-400 transition-transform duration-200 {localShowFileSection ? 'rotate-180' : ''}" />
        </button>
      </div>

      {#if localShowFileSection}
        <div class="space-y-4">
          <!-- Existing Files - Only in edit mode -->
          {#if mode === 'edit' && note?.files && note.files.length > 0}
            <ExistingFiles files={note.files} bind:filesToDelete={localFilesToDelete} />
          {/if}

          <!-- New Files Upload -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              {mode === 'edit' ? 'Add New Files' : 'Upload Files'}
            </div>
            <FileUpload
              bind:files={localFiles}
              disabled={isLoading}
              maxFiles={mode === 'edit' ? 10 - (note?.files?.length || 0) : 10}
            />
          </div>
        </div>
      {/if}

      <!-- Options -->
      <div class="flex items-center gap-6">
        <div class="custom-checkbox-container" class:opacity-50={disabled || isLoading}>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              bind:checked={localIsPublic}
              disabled={isLoading}
            />
            <span class="checkmark"></span>
            <span class="label-text">Public</span>
          </label>
        </div>

        <div class="custom-checkbox-container" class:opacity-50={disabled || isLoading}>
          <label class="custom-checkbox">
            <input
              type="checkbox"
              bind:checked={localIsFavorite}
              disabled={isLoading}
            />
            <span class="checkmark"></span>
            <span class="label-text">Favorite</span>
          </label>
        </div>
      </div>
    </form>
  </div>

<TagModal bind:isOpen={showTagModal} />
