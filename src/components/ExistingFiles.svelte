<script lang="ts">
  import type { NoteFile } from '../lib/notes';
  import { getFileUrl } from '../lib/notes';
  import { File as FileIcon, Trash2, Download, Undo, AlertTriangle } from '@lucide/svelte';

  let {
    files = $bindable<NoteFile[]>([]),
    filesToDelete = $bindable<string[]>([])
  } = $props<{
    files: NoteFile[];
    filesToDelete: string[];
  }>();

  function toggleFileDelete(fileId: string) {
    if (filesToDelete.includes(fileId)) {
      filesToDelete = filesToDelete.filter(id => id !== fileId);
    } else {
      filesToDelete = [...filesToDelete, fileId];
    }
  }

  function undoDeleteAll() {
    filesToDelete = [];
  }

  function downloadFile(file: NoteFile) {
    const link = document.createElement('a');
    link.href = getFileUrl(file);
    link.download = file.originalName;
    link.setAttribute('target', '_blank'); // Open in new tab for presigned URLs
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getFileIcon(mimeType: string) {
    // Return appropriate icon based on file type
    return FileIcon;
  }
</script>

{#if files.length > 0}
  <div class="space-y-6">
    <!-- Warning for files marked for deletion -->
    {#if filesToDelete.length > 0}
      <div class="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <AlertTriangle class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                {filesToDelete.length} file{filesToDelete.length > 1 ? 's' : ''} marked for deletion
              </span>
            </div>
            <p class="text-xs text-yellow-700 dark:text-yellow-300">
              These files will be permanently removed when you update the note.
            </p>
          </div>
          <button
            type="button"
            onclick={undoDeleteAll}
            class="px-3 py-1.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-md transition-colors"
          >
            Undo All
          </button>
        </div>
      </div>
    {/if}

    <!-- Images Section -->
    {#if files.filter(f => f.mimeType.startsWith('image/')).length > 0}
      <div>
        <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3 flex items-center justify-between">
          <span>Images ({files.filter(f => f.mimeType.startsWith('image/')).length})</span>
          {#if filesToDelete.filter(id => {
              const file = files.find(f => f.id === id);
              return file && file.mimeType.startsWith('image/');
            }).length > 0}
            <button
              type="button"
              onclick={() => {
                const imageIdsToDelete = filesToDelete.filter(id => {
                  const file = files.find(f => f.id === id);
                  return file && file.mimeType.startsWith('image/');
                });
                filesToDelete = filesToDelete.filter(id => !imageIdsToDelete.includes(id));
              }}
              class="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
            >
              Undo Images ({filesToDelete.filter(id => {
                const file = files.find(f => f.id === id);
                return file && file.mimeType.startsWith('image/');
              }).length})
            </button>
          {/if}
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {#each files.filter(f => f.mimeType.startsWith('image/')) as file (file.id)}
            <div
              class="relative group aspect-square bg-white dark:bg-secondary-800 rounded-lg border {filesToDelete.includes(file.id) ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10' : 'border-secondary-200 dark:border-secondary-600'} overflow-hidden transition-all"
            >
              <!-- Image -->
              <img
                src={getFileUrl(file)}
                alt={file.originalName}
                class="w-full h-full object-cover"
                onerror={`this.src='data:${file.mimeType};base64,${file.data}'`}
              />

              <!-- Delete Overlay -->
              {#if filesToDelete.includes(file.id)}
                <div class="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                  <div class="bg-red-600 text-white rounded-full p-2">
                    <Trash2 class="w-4 h-4" />
                  </div>
                </div>
              {/if}

              <!-- Delete Overlay (always visible when marked for deletion) -->
              {#if filesToDelete.includes(file.id)}
                <div class="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10">
                  <div class="bg-red-600 text-white rounded-full p-3">
                    <Trash2 class="w-6 h-6" />
                  </div>
                </div>
              {/if}

              <!-- Undo Button (always visible when marked for deletion) -->
              {#if filesToDelete.includes(file.id)}
                <div class="absolute top-2 right-2 z-30">
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                    class="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    title="Undo delete"
                  >
                    <Undo class="w-5 h-5" />
                  </button>
                </div>
              {/if}

              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-20">
                <button
                  type="button"
                  onclick={() => downloadFile(file)}
                  class="w-8 h-8 bg-white/90 hover:bg-white dark:bg-black/80 hover:dark:bg-black/90 rounded-lg flex items-center justify-center transition-colors"
                  title="Download image"
                >
                  <Download class="w-4 h-4 text-gray-800 dark:text-gray-200" />
                </button>

                {#if !filesToDelete.includes(file.id)}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                    class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Delete file"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                {/if}
              </div>

              <!-- File Info -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p class="text-white text-xs truncate" title={file.originalName}>
                  {file.originalName}
                </p>
                <p class="text-white/80 text-xs">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Other Files Section -->
    {#if files.filter(f => !f.mimeType.startsWith('image/')).length > 0}
      <div>
        <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3 flex items-center justify-between">
          <span>Files ({files.filter(f => !f.mimeType.startsWith('image/')).length})</span>
          {#if filesToDelete.filter(id => {
              const file = files.find(f => f.id === id);
              return file && !file.mimeType.startsWith('image/');
            }).length > 0}
            <button
              type="button"
              onclick={() => {
                const fileIdsToDelete = filesToDelete.filter(id => {
                  const file = files.find(f => f.id === id);
                  return file && !file.mimeType.startsWith('image/');
                });
                filesToDelete = filesToDelete.filter(id => !fileIdsToDelete.includes(id));
              }}
              class="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
            >
              Undo Files ({filesToDelete.filter(id => {
                const file = files.find(f => f.id === id);
                return file && !file.mimeType.startsWith('image/');
              }).length})
            </button>
          {/if}
        </div>
        <div class="space-y-2">
          {#each files.filter(f => !f.mimeType.startsWith('image/')) as file (file.id)}
            <div
              class="flex items-center gap-3 p-3 bg-white dark:bg-secondary-800 rounded-lg border {filesToDelete.includes(file.id) ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10' : 'border-secondary-200 dark:border-secondary-600'} transition-colors"
            >
              <!-- File Icon -->
              <div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-700 rounded-lg flex items-center justify-center">
                {#if file.mimeType === 'application/pdf'}
                  <FileIcon class="w-6 h-6 text-red-600 dark:text-red-400" />
                {:else if file.mimeType.includes('document')}
                  <FileIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                {:else if file.mimeType.includes('text')}
                  <FileIcon class="w-6 h-6 text-green-600 dark:text-green-400" />
                {:else}
                  <FileIcon class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                {/if}
              </div>

              <!-- File Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-secondary-900 dark:text-white truncate">
                  {file.originalName}
                </p>
                <p class="text-xs text-secondary-500 dark:text-secondary-400">
                  {file.mimeType.split('/')[1] || file.mimeType} • {formatFileSize(file.size)}
                </p>
                {#if filesToDelete.includes(file.id)}
                  <p class="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
                    Marked for deletion
                  </p>
                {/if}
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick={() => downloadFile(file)}
                  class="w-8 h-8 rounded hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center transition-colors"
                  title="Download file"
                >
                  <Download class="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                </button>

                {#if filesToDelete.includes(file.id)}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                    class="w-8 h-8 rounded bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center transition-colors"
                    title="Undo delete"
                  >
                    <Undo class="w-4 h-4" />
                  </button>
                {:else}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                    class="w-8 h-8 rounded hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors"
                    title="Delete file"
                  >
                    <Trash2 class="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    </div>
{/if}