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

  const title = $derived(mode === 'create' ? 'Create Tag' : 'Edit Tag');
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-sm" showCloseButton={false}>
  {#snippet header()}
    <div class="flex items-center justify-between px-3 py-2 border-b border-secondary-200 dark:border-secondary-700">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-warning-100 dark:bg-primary-900 flex items-center justify-center">
          {#if mode === 'create'}
            <Plus class="w-3.5 h-3.5 text-warning-600 dark:text-primary-400" />
          {:else}
            <Edit2 class="w-3.5 h-3.5 text-warning-600 dark:text-primary-400" />
          {/if}
        </div>
        <h2 id="modal-title" class="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <button
        type="button"
        onclick={handleClose}
        class="w-7 h-7 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center"
        aria-label="Close modal"
      >
        <X class="w-3.5 h-3.5 text-gray-500" />
      </button>
    </div>
  {/snippet}

  {#snippet body()}
    <form id="tag-form" onsubmit={handleSave} class="px-3 py-3 space-y-3">
      <div>
        <label for="tag-identifier" class="label !text-xs !mb-1">Tag Identifier</label>
        <input
          id="tag-identifier"
          type="text"
          placeholder="e.g., programming"
          class="input !py-1.5 text-sm"
          bind:value={formData.tag}
          disabled={isLoading}
          autocomplete="off"
        />
        <p class="text-[11px] text-secondary-400 mt-0.5">Lowercase, no spaces</p>
      </div>

      <div>
        <label for="tag-name" class="label !text-xs !mb-1">Display Name</label>
        <input
          id="tag-name"
          type="text"
          placeholder="e.g., Programming"
          class="input !py-1.5 text-sm"
          bind:value={formData.name}
          disabled={isLoading}
          autocomplete="off"
        />
      </div>

      <div>
        <label for="tag-color" class="label !text-xs !mb-1">Color</label>
        <div class="flex items-center gap-2">
          <input
            id="tag-color"
            type="color"
            class="w-8 h-8 rounded-md cursor-pointer border border-secondary-200 dark:border-secondary-600 p-0.5"
            bind:value={formData.color}
            disabled={isLoading}
          />
          <input
            id="tag-color-hex"
            type="text"
            placeholder="#hex (optional)"
            class="input !py-1.5 !text-sm flex-1"
            bind:value={formData.color}
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  {/snippet}

  {#snippet footer()}
    <button
      type="button"
      onclick={handleClose}
      class="px-3 py-1 text-sm text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-md transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      form="tag-form"
      disabled={isLoading}
      class="px-3 py-1 text-sm bg-warning-500 hover:bg-warning-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-md transition-colors disabled:opacity-50"
    >
      {isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
    </button>
  {/snippet}
</Modal>
