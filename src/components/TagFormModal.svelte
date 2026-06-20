<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { X, Plus, Edit2 } from '@lucide/svelte';
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

    if (!formData.tag.trim() || !formData.name.trim()) {
      toast.error('Tag and name are required');
      return;
    }

    isLoading = true;

    try {
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

  let title = $derived(mode === 'create' ? 'Create Tag' : 'Edit Tag');
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-sm">
  <div class="flex items-center justify-between mb-5">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    <button onclick={handleClose} class="btn-icon hover:bg-gray-100 dark:hover:bg-gray-700">
      <X class="w-5 h-5 text-gray-500" />
    </button>
  </div>

  <form id="tag-form" onsubmit={handleSave} class="space-y-4">
    <div>
      <label for="tag-identifier" class="label">Tag Identifier</label>
      <input
        id="tag-identifier"
        type="text"
        placeholder="e.g., programming"
        class="input"
        bind:value={formData.tag}
        disabled={isLoading}
        autocomplete="off"
      />
      <p class="text-xs text-gray-400 mt-1">Lowercase, no spaces</p>
    </div>

    <div>
      <label for="tag-name" class="label">Display Name</label>
      <input
        id="tag-name"
        type="text"
        placeholder="e.g., Programming"
        class="input"
        bind:value={formData.name}
        disabled={isLoading}
        autocomplete="off"
      />
    </div>

    <div>
      <label for="tag-color" class="label">Color</label>
      <div class="flex items-center gap-2">
        <input
          id="tag-color"
          type="color"
          class="w-8 h-8 rounded-md cursor-pointer border border-gray-200 dark:border-gray-700 p-0.5"
          bind:value={formData.color}
          disabled={isLoading}
        />
        <input
          id="tag-color-hex"
          type="text"
          placeholder="#hex (optional)"
          class="input flex-1"
          bind:value={formData.color}
          disabled={isLoading}
        />
      </div>
    </div>
  </form>

  <div class="flex items-center justify-end gap-3 pt-5">
    <button
      type="button"
      onclick={handleClose}
      class="btn btn-secondary"
    >
      Cancel
    </button>
    <button
      type="submit"
      form="tag-form"
      disabled={isLoading}
      class="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
    >
      {isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
    </button>
  </div>
</Modal>
