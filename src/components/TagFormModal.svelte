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

  let title = $derived(mode === 'create' ? 'Create tag' : 'Edit tag');
</script>

<Modal {isOpen} onClose={handleClose} maxW="max-w-sm">
  <div class="mb-5 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-md bg-tile-deep text-ink-on-dark">
        {#if mode === 'create'}
          <Plus class="size-5" />
        {:else}
          <Edit2 class="size-5" />
        {/if}
      </div>
      <h2 class="text-title text-ink">
        {title}
      </h2>
    </div>
    <button type="button" onclick={handleClose} class="btn-icon" aria-label="Close">
      <X class="size-5" />
    </button>
  </div>

  <form id="tag-form" onsubmit={handleSave} class="space-y-4">
    <div>
      <label for="tag-identifier" class="label">Tag identifier</label>
      <input
        id="tag-identifier"
        type="text"
        placeholder="e.g., programming"
        class="input"
        bind:value={formData.tag}
        disabled={isLoading}
        autocomplete="off"
      />
      <p class="mt-1 text-body-sm text-ink-muted">Lowercase, no spaces</p>
    </div>

    <div>
      <label for="tag-name" class="label">Display name</label>
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
          class="size-10 shrink-0 cursor-pointer rounded-sm bg-control p-0.5"
          bind:value={formData.color}
          disabled={isLoading}
        />
        <input
          id="tag-color-hex"
          type="text"
          placeholder="Hex color (optional)"
          class="input flex-1 font-mono"
          bind:value={formData.color}
          disabled={isLoading}
        />
      </div>
    </div>
  </form>

  <div class="flex items-center justify-end gap-3 pt-5">
    <button type="button" onclick={handleClose} class="btn btn-secondary">
      Cancel
    </button>
    <button type="submit" form="tag-form" disabled={isLoading} class="btn btn-primary">
      {isLoading ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
    </button>
  </div>
</Modal>
