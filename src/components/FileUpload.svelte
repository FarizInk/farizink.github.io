<script lang="ts">
  import type { NoteFileData, NoteFile } from '../lib/notes';
  import { validateFile, compressImage, createPreviewUrl, revokePreviewUrl } from '../lib/notes';
  import { X, Upload, Image as ImageIcon, File, Trash2, Eye, Star } from '@lucide/svelte';

  let {
    files = $bindable<NoteFileData[]>([]),
    maxFiles = 10,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    disabled = false
  } = $props<{
    files: NoteFileData[];
    maxFiles?: number;
    maxFileSize?: number;
    disabled?: boolean;
  }>();

  let fileInputRef = $state<HTMLInputElement | null>(null);
  let dragActive = $state(false);
  let previewUrls = $state<Map<number, string>>(new Map());

  // Cleanup preview URLs on unmount
  $effect(() => {
    return () => {
      previewUrls.forEach(url => revokePreviewUrl(url));
    };
  });

  const acceptedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  function isAcceptedType(type: string): boolean {
    return acceptedTypes.includes(type);
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatFileName(name: string): string {
    const maxLength = 30;
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength / 2) + '...' + name.substring(name.length - maxLength / 2);
  }

  function getFileIcon(mimeType: string) {
    if (mimeType.startsWith('image/')) {
      return ImageIcon;
    }
    return File;
  }

  async function processFile(file: File): Promise<NoteFileData | null> {
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return null;
    }

    try {
      // Compress image if needed
      const processedFile = file.type.startsWith('image/')
        ? await compressImage(file, 1920, 1080, 0.8)
        : file;

      // Create preview URL
      const previewUrl = createPreviewUrl(processedFile);

      return {
        file: processedFile, // Store actual file for multipart upload
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
    const newPreviewUrls = new Map<number, string>();

    for (let i = 0; i < fileList.length && files.length + newFiles.length < maxFiles; i++) {
      const file = fileList[i];
      const processedFile = await processFile(file);
      if (processedFile && processedFile.file) {
        newFiles.push(processedFile);
        // Create preview URL for image files
        if (file.type.startsWith('image/')) {
          newPreviewUrls.set(files.length + newFiles.length - 1, createPreviewUrl(processedFile.file));
        }
      }
    }

    if (newFiles.length > 0) {
      files = [...files, ...newFiles];
      previewUrls = new Map([...previewUrls, ...newPreviewUrls]);
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

    // Update preview URLs map
    const newPreviewUrls = new Map<number, string>();
    previewUrls.forEach((url, i) => {
      if (i < index) {
        newPreviewUrls.set(i, url);
      } else if (i > index) {
        newPreviewUrls.set(i - 1, url);
      }
    });
    previewUrls = newPreviewUrls;
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
      input.accept = acceptedTypes.join(',');
      input.onchange = (e) => {
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
        accept={acceptedTypes.join(',')}
        onchange={handleFileInput}
        disabled={disabled}
        class="hidden"
      />

      <div
        role="button"
        tabindex="0"
        onkeydown={e => (e.key === 'Enter' || e.key === ' ') && openFileDialog()}
        class={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onclick={openFileDialog}
      >
        <Upload class="w-8 h-8 mx-auto mb-3 text-secondary-400" />
        <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
          Click to upload or drag and drop
        </p>
        <p class="text-xs text-secondary-500 dark:text-secondary-400">
          Images (JPEG, PNG, GIF, WebP), PDF, DOC, DOCX, TXT
        </p>
        <p class="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
          Max {formatFileSize(maxFileSize)} per file, up to {maxFiles} files
        </p>
      </div>
    </div>
  {/if}

  <!-- File List -->
  {#if files.length > 0}
    <div class="space-y-2">
      <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
        Files ({files.length}/{maxFiles})
      </div>

      {#each files as file, index (index)}
        <div
          class="flex items-center gap-3 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-600"
        >
          <!-- File Icon/Preview -->
          <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 dark:bg-secondary-700 rounded flex items-center justify-center">
            {#if file.mimeType.startsWith('image/')}
              {#if previewUrls.get(index)}
                <img
                  src={previewUrls.get(index)}
                  alt={file.originalName}
                  class="w-full h-full object-cover rounded"
                />
              {:else if file.file}
                <img
                  src={createPreviewUrl(file.file)}
                  alt={file.originalName}
                  class="w-full h-full object-cover rounded"
                />
              {:else}
                <ImageIcon class="w-6 h-6 text-secondary-500 dark:text-secondary-400" />
              {/if}
            {:else}
              <File class="w-6 h-6 text-secondary-500 dark:text-secondary-400" />
            {/if}
          </div>

          <!-- File Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-secondary-900 dark:text-white truncate" title={file.originalName}>
              {formatFileName(file.originalName)}
            </p>
            <p class="text-xs text-secondary-500 dark:text-secondary-400">
              {file.mimeType}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1">
            <button
              type="button"
              onclick={() => removeFile(index)}
              disabled={disabled}
              title="Remove file"
              class="w-8 h-8 rounded hover:bg-red-100 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 class="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>