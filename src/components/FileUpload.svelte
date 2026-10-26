<script lang="ts">
  import type { NoteFileData } from '../lib/notes';
  import { validateFile, createPreviewUrl, revokePreviewUrl } from '../lib/notes';
  import { formatFileSize, formatFileName } from '../lib/uiUtils';
  import { Upload, Image as ImageIcon, File, Trash2 } from '@lucide/svelte';

  let {
    files = $bindable<NoteFileData[]>([]),
    maxFiles = 10,
    maxFileSize = 100 * 1024 * 1024, // 100MB
    disabled = false
  } = $props<{
    files: NoteFileData[];
    maxFiles?: number;
    maxFileSize?: number;
    disabled?: boolean;
  }>();

  let fileInputRef = $state<HTMLInputElement | null>(null);
  let dragActive = $state(false);
  let previewUrls = $state(new Map<number, string>());

  // Generate preview URLs for image files
  function ensurePreviewUrls() {
    let changed = false;
    files.forEach((file, index) => {
      if (file.mimeType?.startsWith('image/') && file.file && !previewUrls.get(index)) {
        const url = createPreviewUrl(file.file);
        previewUrls.set(index, url);
        changed = true;
      }
    });
    return changed;
  }

  // Cleanup preview URLs on unmount
  $effect(() => {
    return () => {
      previewUrls.forEach(url => revokePreviewUrl(url));
    };
  });

  async function processFile(file: File): Promise<NoteFileData | null> {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return null;
    }

    try {
      // TEMPORARY: Don't compress images - use original file to avoid instanceof File issues
      const processedFile = file; // Use original file without compression

      return {
        file: processedFile,
        originalName: file.name,
        mimeType: file.type,
        size: file.size
      };
    } catch (error) {
      console.error('Error processing file:', error);
      alert(`Failed to process file "${file.name}"`);
      return null;
    }
  }

  async function handleFiles(fileList: FileList) {
    if (disabled || files.length >= maxFiles) return;

    const newFiles: NoteFileData[] = [];

    for (let i = 0; i < fileList.length && files.length + newFiles.length < maxFiles; i++) {
      const file = fileList[i];
      const processedFile = await processFile(file);
      if (processedFile && processedFile.file) {
        newFiles.push(processedFile);
        if (file.type.startsWith('image/')) {
          previewUrls.set(files.length + newFiles.length - 1, createPreviewUrl(processedFile.file));
        }
      }
    }

    if (newFiles.length > 0) {
      files = [...files, ...newFiles];
    }
  }

  async function handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      await handleFiles(target.files);
    }
    // Clear input to allow selecting same file again
    setTimeout(() => {
      target.value = '';
    }, 0);
  }

  function handleDrag(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    if (event.type === 'dragenter' || event.type === 'dragover') {
      dragActive = true;
    } else if (event.type === 'dragleave') {
      dragActive = false;
    }
  }

  async function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    dragActive = false;

    if (event.dataTransfer?.files) {
      await handleFiles(event.dataTransfer.files);
    }
  }

  function removeFile(index: number) {
    // Clean up preview URL
    const previewUrl = previewUrls.get(index);
    if (previewUrl) {
      revokePreviewUrl(previewUrl);
    }

    const newFiles = [...files];
    newFiles.splice(index, 1);
    files = newFiles;

    // Update preview URLs map - rebuild without the deleted index
    const entries: [number, string][] = [];
    previewUrls.forEach((url, i) => {
      if (i < index) {
        entries.push([i, url]);
      } else if (i > index) {
        entries.push([i - 1, url]);
      }
    });
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    previewUrls = new Map(entries);
  }

  function openFileDialog() {
    if (disabled || files.length >= maxFiles) return;

    // Try using the ref first
    if (fileInputRef) {
      fileInputRef.click();
    } else {
      // Fallback: create a new input element
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      // Accept all file types
      input.onchange = e => {
        handleFileInput(e);
        input.remove();
      };
      input.click();
    }
  }
</script>

<!-- File Upload Area -->
<div class="space-y-4">
  <!-- Drop Zone -->
  {#if files.length < maxFiles}
    <div
      class="relative"
      ondragenter={handleDrag}
      ondragleave={handleDrag}
      ondragover={handleDrag}
      ondrop={handleDrop}
      role="application"
    >
      <input
        bind:this={fileInputRef}
        type="file"
        multiple
        accept="*/*"
        onchange={handleFileInput}
        {disabled}
        class="hidden"
      />

      <div
        role="button"
        tabindex="0"
        onkeydown={e => (e.key === 'Enter' || e.key === ' ') && openFileDialog()}
        class={`
          rounded-lg p-6 text-center cursor-pointer transition-colors
          ${
            dragActive
              ? 'bg-tile-deep text-ink-on-dark'
              : 'bg-control text-ink hover:bg-control-hover'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onclick={openFileDialog}
      >
        <Upload class="w-8 h-8 mx-auto mb-3 {dragActive ? 'text-tile-lime' : 'text-accent-text'}" />
        <p class="text-sm font-medium mb-1">
          Click to upload or drag and drop
        </p>
        <p class="text-body-sm {dragActive ? 'text-ink-on-dark-muted' : 'text-ink-muted'}">All file types</p>
        <p class="text-count mt-1 {dragActive ? 'text-ink-on-dark-muted' : ''}">
          Max {formatFileSize(maxFileSize)} per file, up to {maxFiles} files
        </p>
      </div>
    </div>
  {/if}

  <!-- File List -->
  {#if files.length > 0}
    <div class="space-y-2">
      <div class="text-label text-ink-muted mb-2">
        Files ({files.length}/{maxFiles})
      </div>

      {#each files as file, index (index)}
        <div
          class="flex items-center gap-3 p-3 bg-control rounded-md"
        >
          <!-- File Icon/Preview -->
          <div
            class="flex-shrink-0 w-12 h-12 bg-raised rounded-sm flex items-center justify-center overflow-hidden"
          >
            {#if file.mimeType.startsWith('image/')}
              {#if previewUrls.get(index)}
                <img
                  src={previewUrls.get(index)}
                  alt={file.originalName}
                  class="w-full h-full object-cover rounded-sm"
                />
              {:else}
                <ImageIcon class="w-6 h-6 text-ink-muted" />
              {/if}
            {:else}
              <File class="w-6 h-6 text-ink-muted" />
            {/if}
          </div>

          <!-- File Info -->
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-ink truncate"
              title={file.originalName}
            >
              {formatFileName(file.originalName)}
            </p>
            <p class="text-count">
              {file.mimeType}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1">
            <button
              type="button"
              onclick={() => removeFile(index)}
              {disabled}
              title="Remove file"
              aria-label="Remove file"
              class="btn-icon hover:text-negative"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
