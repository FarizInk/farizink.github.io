<script lang="ts">
  import type { NoteFile } from '../lib/notes';
  import { getFileUrl } from '../lib/notes';
  import { formatFileSize } from '../lib/uiUtils';
  import { File as FileIcon, Trash2, Download, Undo, AlertTriangle } from '@lucide/svelte';

  let { files, filesToDelete = $bindable<string[]>([]) } = $props<{
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
    link.download = file.original_name;
    link.setAttribute('target', '_blank'); // Open in new tab for presigned URLs
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

{#if files.length > 0}
  <div class="space-y-6">
    <!-- Warning for files marked for deletion -->
    {#if filesToDelete.length > 0}
      <div class="status-warning rounded-md p-4">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <AlertTriangle class="w-5 h-5" />
              <span class="text-sm font-medium">
                {filesToDelete.length} file{filesToDelete.length > 1 ? 's' : ''} marked for deletion
              </span>
            </div>
            <p class="text-body-sm">
              These files will be permanently removed when you update the note.
            </p>
          </div>
          <button
            type="button"
            onclick={undoDeleteAll}
            class="btn btn-secondary btn-sm"
          >
            <Undo class="w-4 h-4" />
            Undo all
          </button>
        </div>
      </div>
    {/if}

    <!-- Images Section -->
    {#if files.filter(f => f.mime_type.startsWith('image/')).length > 0}
      <div>
        <div class="mb-3 flex items-center justify-between">
          <span class="text-label text-ink-muted">Images ({files.filter(f => f.mime_type.startsWith('image/')).length})</span>
          {#if filesToDelete.filter(id => {
            const file = files.find(f => f.id === id);
            return file && file.mime_type.startsWith('image/');
          }).length > 0}
            <button
              type="button"
              onclick={() => {
                const imageIdsToDelete = filesToDelete.filter(id => {
                  const file = files.find(f => f.id === id);
                  return file && file.mime_type.startsWith('image/');
                });
                filesToDelete = filesToDelete.filter(id => !imageIdsToDelete.includes(id));
              }}
              class="quick-btn"
            >
              Undo images ({filesToDelete.filter(id => {
                const file = files.find(f => f.id === id);
                return file && file.mime_type.startsWith('image/');
              }).length})
            </button>
          {/if}
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {#each files.filter( f => f.mime_type.startsWith('image/') ) as file, index (file.id + '-' + index)}
            <div
              class="relative group aspect-square rounded-md {filesToDelete.includes(
                file.id
              )
                ? 'bg-[color-mix(in_oklab,var(--negative)_16%,var(--bg-control))]'
                : 'bg-control'} overflow-hidden transition-colors"
            >
              <!-- Image -->
              <img
                src={getFileUrl(file)}
                alt={file.original_name}
                class="w-full h-full object-cover"
             onerror={e => {
                  const target = e.target as HTMLImageElement;
                  if (target.dataset.fallback) return;
                  target.dataset.fallback = '1';
                  if (file.data) {
                    target.src = `data:${file.mime_type};base64,${file.data}`;
                  }
              }}
              />

              <!-- Delete Overlay (always visible when marked for deletion) -->
              {#if filesToDelete.includes(file.id)}
                <div class="absolute inset-0 bg-negative/20 flex items-center justify-center z-10">
                  <div class="bg-negative text-ink-on-accent rounded-pill p-3" title="Marked for deletion">
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
                    class="btn-icon bg-raised text-ink"
                    title="Undo delete"
                    aria-label="Undo delete"
                  >
                    <Undo class="w-5 h-5" />
                  </button>
                </div>
              {/if}

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20"
              >
                <button
                  type="button"
                  onclick={() => downloadFile(file)}
                  class="btn-icon bg-raised text-ink"
                  title="Download image"
                  aria-label="Download image"
                >
                  <Download class="w-4 h-4" />
                </button>

                {#if !filesToDelete.includes(file.id)}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                  class="btn-icon bg-raised text-negative"
                  title="Delete file"
                  aria-label="Delete file"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                {/if}
              </div>

              <!-- File Info -->
              <div class="absolute bottom-0 left-0 right-0 bg-raised/90 px-2 py-1.5">
                <p class="text-ink text-xs truncate" title={file.original_name}>
                  {file.original_name}
                </p>
                <p class="text-ink-muted font-mono text-[11px]">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Other Files Section -->
    {#if files.filter(f => !f.mime_type.startsWith('image/')).length > 0}
      <div>
        <div class="mb-3 flex items-center justify-between">
          <span class="text-label text-ink-muted">Files ({files.filter(f => !f.mime_type.startsWith('image/')).length})</span>
          {#if filesToDelete.filter(id => {
            const file = files.find(f => f.id === id);
            return file && !file.mime_type.startsWith('image/');
          }).length > 0}
            <button
              type="button"
              onclick={() => {
                const fileIdsToDelete = filesToDelete.filter(id => {
                  const file = files.find(f => f.id === id);
                  return file && !file.mime_type.startsWith('image/');
                });
                filesToDelete = filesToDelete.filter(id => !fileIdsToDelete.includes(id));
              }}
              class="quick-btn"
            >
              Undo files ({filesToDelete.filter(id => {
                const file = files.find(f => f.id === id);
                return file && !file.mime_type.startsWith('image/');
              }).length})
            </button>
          {/if}
        </div>
        <div class="space-y-2">
          {#each files.filter(f => !f.mime_type.startsWith('image/')) as file, index (file.id + '-' + index)}
            <div
              class="flex items-center gap-3 p-3 rounded-md {filesToDelete.includes(
                file.id
              )
                ? 'bg-[color-mix(in_oklab,var(--negative)_16%,var(--bg-control))]'
                : 'bg-control'} transition-colors"
            >
              <!-- File Icon -->
              <div
                class="w-12 h-12 rounded-sm flex items-center justify-center {file.mime_type === 'application/pdf'
                  ? 'bg-tile-violet text-ink-on-dark'
                  : file.mime_type.includes('document')
                    ? 'bg-tile-deep text-ink-on-dark'
                    : file.mime_type.includes('text')
                      ? 'bg-tile-lilac text-ink-on-bright'
                      : 'bg-raised text-ink'}"
              >
                <FileIcon class="w-6 h-6" />
              </div>

              <!-- File Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-ink truncate">
                  {file.original_name}
                </p>
                <p class="text-count">
                  {file.mime_type.split('/')[1] || file.mime_type} • {formatFileSize(file.size)}
                </p>
                {#if filesToDelete.includes(file.id)}
                  <p class="flex items-center gap-1 text-xs text-negative font-medium mt-1">
                    <Trash2 class="w-3 h-3" />
                    Marked for deletion
                  </p>
                {/if}
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick={() => downloadFile(file)}
                  class="btn-icon"
                  title="Download file"
                  aria-label="Download file"
                >
                  <Download class="w-4 h-4" />
                </button>

                {#if filesToDelete.includes(file.id)}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                  class="btn-icon text-ink"
                  title="Undo delete"
                  aria-label="Undo delete"
                  >
                    <Undo class="w-4 h-4" />
                  </button>
                {:else}
                  <button
                    type="button"
                    onclick={() => toggleFileDelete(file.id)}
                  class="btn-icon hover:text-negative"
                  title="Delete file"
                  aria-label="Delete file"
                  >
                    <Trash2 class="w-4 h-4" />
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
