<script lang="ts">
  import type { Note, CreateNoteData } from '../lib/notes';
  import { createNote, updateNote, validateTagIds, convertApiTagsToTagIds } from '../lib/notes';
  import { tags } from '../lib/stores/tags';
  import { X, Link2 } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import MultipleSelect from './MultipleSelect.svelte';

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
    tagIds: []
  });

  let selectedTagIds = $state<string[]>([]);

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
        tagIds: tagIds
      };
      selectedTagIds = tagIds; // Sync selected tags
    } else if (mode === 'create' && isOpen) {
      formData = {
        name: '',
        link: '',
        description: '',
        isPublic: true,
        isFavorite: false,
        tagIds: []
      };
      selectedTagIds = []; // Clear selected tags
    }
  });

  // Sync selectedTagIds to formData.tagIds when selectedTagIds changes
  $effect(() => {
    formData.tagIds = selectedTagIds;
  });

  
  function closeModal() {
    isOpen = false;
    formData = {
      name: '',
      link: '',
      description: '',
      isPublic: true,
      isFavorite: false,
      tagIds: []
    };
    selectedTagIds = [];
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
      const { valid: validTagIds, invalid: invalidTagIds } = validateTagIds(formData.tagIds || [], currentTags);

      if (invalidTagIds.length > 0) {
        toast.error(`Invalid tag IDs: ${invalidTagIds.join(', ')}`);
        return;
      }

      // Prepare submission data with tag IDs
      const submissionData: CreateNoteData = {
        ...formData,
        tagIds: validTagIds // Submit validated tag IDs
      };

      if (mode === 'create') {
        await createNote(submissionData);
        toast.success('Note created successfully!');
        onSuccess?.();
      } else if (mode === 'edit' && note) {
        await updateNote(note.id, submissionData);
        toast.success('Note updated successfully!');
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

<!-- Backdrop -->
{#if isOpen}
  <div
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50] flex items-center justify-center p-4"
    onclick={e => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }}
    onkeydown={e => e.key === 'Escape' && closeModal()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="note-modal-title"
    tabindex="-1"
  >
    <!-- Modal -->
    <div
      class="bg-white dark:bg-secondary-800 rounded-lg shadow-2xl w-full max-w-2xl border border-secondary-200 dark:border-secondary-700 overflow-hidden max-h-[90vh] overflow-y-auto"
      role="document"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700"
      >
        <h2
          id="note-modal-title"
          class="text-xl font-semibold text-secondary-900 dark:text-secondary-50"
        >
          {title}
        </h2>
        <button
          onclick={closeModal}
          class="w-8 h-8 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X class="w-4 h-4 text-secondary-500 dark:text-secondary-400" />
        </button>
      </div>

      <!-- Form -->
      <form onsubmit={handleSubmit} class="p-6 space-y-4">
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
          <textarea
            id="description"
            placeholder="Enter note description"
            class="textarea"
            rows={4}
            bind:value={formData.description}
            disabled={isLoading}
          ></textarea>
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

        <!-- Actions -->
        <div class="flex gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <button
            type="button"
            onclick={closeModal}
            class="flex-1 px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 btn btn-primary"
            disabled={isLoading || !formData.name?.trim()}
          >
            {#if isLoading}
              <div
                class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              ></div>
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            {:else}
              {mode === 'create' ? 'Create Note' : 'Update Note'}
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
