<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { X, Plus, Edit2, Save, RotateCw, Hash, Type } from '@lucide/svelte';
  import { createTag, updateTag, type Tag, type TagCreateRequest } from '../lib/tags';
  import { tagsStore } from '../lib/stores/tags';
  import Modal from './Modal.svelte';

  interface Props {
    isOpen: boolean;
    mode: 'create' | 'edit';
    tag?: Tag | null;
    onSuccess?: () => void;
  }

  let { isOpen = $bindable(false), mode = 'create', tag = null, onSuccess }: Props = $props();

  let isLoading = $state(false);
  let formData = $state<TagCreateRequest>({
    tag: '',
    name: '',
    color: ''
  });

  // Initialize form data when editing or opening
  $effect(() => {
    if (isOpen) {
      if (mode === 'edit' && tag) {
        formData = { tag: tag.tag, name: tag.name, color: tag.color || '' };
      } else {
        formData = { tag: '', name: '', color: '' };
      }
    }
  });

  function handleClose() {
    isOpen = false;
    formData = { tag: '', name: '', color: '' };
  }

  async function handleSave(event: Event) {
    event.preventDefault();

    // Validation
    if (!formData.tag.trim() || !formData.name.trim()) {
      toast.error('Tag and name are required');
      return;
    }

    isLoading = true;

    try {
      // Prepare data with nullable color
      const submitData = {
        ...formData,
        color: formData.color?.trim() || undefined
      };

      if (mode === 'create') {
        const newTag = await createTag(submitData);
        tagsStore.addTag(newTag);
        toast.success('Tag created successfully');
      } else if (mode === 'edit' && tag) {
        const updatedTag = await updateTag(tag.tag, submitData);
        tagsStore.updateTag(tag.tag, updatedTag);
        toast.success('Tag updated successfully');
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(mode === 'create' ? 'Failed to create tag' : 'Failed to update tag');
      console.error('Save tag error:', error);
    } finally {
      isLoading = false;
    }
  }

  const title = $derived(mode === 'create' ? 'Create New Tag' : 'Edit Tag');
  const subtitle = $derived(mode === 'create' ? 'Add a new tag to organize notes' : 'Update tag details');
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-lg" showCloseButton={false}>
  {#snippet header()}
    <div class="py-5 px-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-b border-warning-200 dark:border-primary-700">
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
            <p class="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onclick={handleClose}
          class="w-9 h-9 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <form onsubmit={handleSave} class="px-6 py-6 space-y-5">
      <!-- Tag Identifier -->
      <div>
        <label for="tag-identifier" class="label flex items-center gap-2">
          <Hash class="w-4 h-4 text-warning-500 dark:text-primary-400" />
          Tag Identifier
        </label>
        <input
          id="tag-identifier"
          type="text"
          placeholder="e.g., programming"
          class="input"
          bind:value={formData.tag}
          disabled={isLoading}
          autocomplete="off"
        />
        <p class="text-xs text-secondary-500 dark:text-secondary-400 mt-1.5">
          Used internally (lowercase, no spaces)
        </p>
      </div>

      <!-- Display Name -->
      <div>
        <label for="tag-display-name" class="label flex items-center gap-2">
          <Type class="w-4 h-4 text-warning-500 dark:text-primary-400" />
          Display Name
        </label>
        <input
          id="tag-display-name"
          type="text"
          placeholder="e.g., Programming Resources"
          class="input"
          bind:value={formData.name}
          disabled={isLoading}
          autocomplete="off"
        />
        <p class="text-xs text-secondary-500 dark:text-secondary-400 mt-1.5">
          User-friendly name shown in interface
        </p>
      </div>

      <!-- Color -->
      <div>
        <label for="tag-color-hex" class="label flex items-center gap-2">
          <div
            class="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
          ></div>
          Color
          <span class="text-secondary-400 font-normal text-xs">(Optional)</span>
        </label>
        <div class="flex items-center gap-3">
          <div class="relative">
            <input
              id="tag-color"
              type="color"
              class="w-14 h-14 rounded-xl border-2 border-secondary-200 dark:border-secondary-600 cursor-pointer overflow-hidden"
              bind:value={formData.color}
              disabled={isLoading}
            />
            {#if !formData.color}
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class="w-6 h-6 rounded-full bg-gradient-to-br from-warning-400 to-primary-500 opacity-50"
                ></div>
              </div>
            {/if}
          </div>
          <div class="flex-1 relative">
            <input
              id="tag-color-hex"
              type="text"
              placeholder="#61DAFB (optional)"
              class="input w-full pr-10"
              bind:value={formData.color}
              disabled={isLoading}
              pattern="^#[0-9A-Fa-f]{6}$"
            />
            {#if formData.color}
              <button
                type="button"
                onclick={() => (formData.color = '')}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-400 hover:text-danger-500 transition-colors"
                title="Clear color"
                disabled={isLoading}
              >
                <X class="w-4 h-4" />
              </button>
            {/if}
          </div>
          <!-- Color Preview -->
          {#if formData.color}
            <div
              class="w-14 h-14 rounded-xl border-2 border-white dark:border-secondary-600 shadow-md flex items-center justify-center"
              style="background-color: {formData.color}"
            >
              <span class="text-xs font-medium mix-blend-difference text-white">
                {formData.color.toUpperCase()}
              </span>
            </div>
          {:else}
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-warning-100 to-amber-100 dark:from-primary-900/40 dark:to-primary-800/40 border-2 border-warning-200 dark:border-primary-700 flex items-center justify-center">
              <span class="text-xs font-medium text-warning-700 dark:text-primary-300">Theme</span>
            </div>
          {/if}
        </div>
      </div>
    </form>
  {/snippet}

  {#snippet footer()}
    <div class="py-4 bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-between px-6 gap-6">
        <div class="text-sm text-secondary-600 dark:text-secondary-400">
          <span>{mode === 'create' ? 'Fill in the tag details' : 'Make changes to the tag'}</span>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            onclick={handleClose}
            class="px-5 py-2.5 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="tag-form"
            class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50"
            disabled={isLoading || !formData.tag.trim() || !formData.name.trim()}
          >
            {#if isLoading}
              <RotateCw class="w-4 h-4 animate-spin" />
              Saving...
            {:else}
              <Save class="w-4 h-4" />
              {mode === 'create' ? 'Create Tag' : 'Update Tag'}
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/snippet}
</Modal>
