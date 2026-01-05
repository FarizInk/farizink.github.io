<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl, addRefreshParam, isPresignedUrl } from '../lib/notes';
  import { X, ExternalLink, Calendar, Tag, Star, Clock, Edit, Trash2, Link2, File, Image as ImageIcon, Download, Eye, AlertTriangle } from '@lucide/svelte';
  import Modal from './Modal.svelte';

  let {
    note,
    isOpen = $bindable(),
    onClose,
    onEdit,
    onDelete,
    hasAuthToken,
    isDeleted = false,
    onPermanentDelete
  } = $props<{
    note: Note | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
  }>();

  // Modal is only open when both isOpen is true AND note exists
  let shouldShowModal = $derived(isOpen && note !== null);

  function handleEdit() {
    if (note) onEdit?.(note);
    onClose();
  }

  function handleDelete() {
    if (note && confirm('Are you sure you want to delete this note?')) {
      onDelete?.(note);
      onClose();
    }
  }

  function handlePermanentDelete() {
    if (!note) return;
    const confirmMessage = `Are you sure you want to permanently delete this note?${note.files && note.files.length > 0 ? `\n\nThis will also delete ${note.files.length} file(s) from storage.` : ''}\n\nThis action cannot be undone.`;

    if (confirm(confirmMessage)) {
      onPermanentDelete?.(note);
      onClose();
    }
  }

  function handleLinkClick() {
    if (note && note.link) {
      window.open(note.link, '_blank', 'noopener,noreferrer');
    }
  }

  function downloadFile(file: Note['files'][0]) {
    const link = document.createElement('a');
    const fileUrl = getFileUrl(file);
    link.href = fileUrl;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function viewFile(file: Note['files'][0]) {
    const fileUrl = getFileUrl(file);
    window.open(fileUrl, '_blank');
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    const originalSrc = img.src;

    // Try to refresh the URL once if it's a presigned URL
    if (isPresignedUrl(originalSrc) && !img.dataset.refreshed) {
      img.dataset.refreshed = 'true';
      img.src = addRefreshParam(originalSrc);
    } else {
      // Fallback to hide image and show placeholder
      img.style.display = 'none';
      const placeholder = img.nextElementSibling as HTMLElement;
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getFileIcon(mimeType: string) {
    if (mimeType.startsWith('image/')) {
      return ImageIcon;
    }
    return File;
  }
</script>

<Modal isOpen={shouldShowModal} onClose={onClose} maxW="max-w-6xl" showCloseButton={false}>
  {#snippet header()}
    <div class="flex items-start justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex-1 min-w-0 pr-4">
        <div class="flex items-center gap-3 mb-2">
          {#if isDeleted}
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center"
            >
              <AlertTriangle class="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          {:else if note.isFavorite}
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 flex items-center justify-center"
            >
              <Star
                class="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400"
              />
            </div>
          {/if}

          <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white truncate">
            {note.name || 'Untitled Note'}
          </h2>
        </div>

        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {#if isDeleted && note.deletedAt}
            <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
              <AlertTriangle class="w-4 h-4" />
              <span>Deleted: {formatDate(note.deletedAt)}</span>
            </div>
          {:else}
            <div class="flex items-center gap-1">
              <Calendar class="w-4 h-4" />
              <span>Created: {formatDate(note.createdAt)}</span>
            </div>
            <div class="flex items-center gap-1">
              <Clock class="w-4 h-4" />
              <span>Updated: {formatDate(note.updatedAt)}</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        {#if note.link}
          <button
            onclick={handleLinkClick}
            class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center transition-colors"
            title="Open link"
          >
            <ExternalLink class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </button>
        {/if}

        {#if isDeleted}
          <!-- Permanent Delete button for deleted notes -->
          {#if hasAuthToken && onPermanentDelete}
            <button
              onclick={handlePermanentDelete}
              class="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center transition-colors"
              title="Permanently delete note"
            >
              <Trash2 class="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          {/if}
        {:else}
          <!-- Edit and Delete buttons for regular notes -->
          {#if hasAuthToken}
            <button
              onclick={handleEdit}
              class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center transition-colors"
              title="Edit note"
            >
              <Edit class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </button>

            <button
              onclick={handleDelete}
              class="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center transition-colors"
              title="Delete note"
            >
              <Trash2 class="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          {/if}
        {/if}

        <button
          onclick={onClose}
          class="w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 flex items-center justify-center transition-colors"
          title="Close modal"
        >
          <X class="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
        </button>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="overflow-y-auto max-h-[calc(90vh-180px)]">
      <!-- Link Section -->
      {#if note.link}
        <div
          class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div class="flex items-center gap-3">
            <Link2 class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                External Link
              </p>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 truncate block"
              >
                {note.link}
              </a>
            </div>
            <button
              onclick={handleLinkClick}
              class="px-3 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Visit
            </button>
          </div>
        </div>
      {/if}

      <!-- Images Section -->
      {#if note.files && note.files.filter(f => f.mimeType.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <ImageIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            Images ({note.files.filter(f => f.mimeType.startsWith('image/')).length})
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each note.files.filter(f => f.mimeType.startsWith('image/')) as file (file.id)}
              <div
                class="group relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-all"
              >
                <!-- Image Container -->
                <div class="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={getFileUrl(file)}
                    alt={file.metadata?.alt || file.originalName}
                    class="w-full h-full object-cover"
                    onerror={handleImageError}
                  />
                  <!-- Fallback for broken images -->
                  <div class="hidden w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <ImageIcon class="w-12 h-12 text-gray-500" />
                  </div>
                </div>

                <!-- Image Info Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 class="font-medium truncate text-sm" title={file.originalName}>
                      {file.metadata?.title || file.originalName}
                    </h3>
                    <div class="flex items-center gap-2 text-xs opacity-90">
                      <span>{formatFileSize(file.size)}</span>
                      {#if file.metadata?.width && file.metadata?.height}
                        <span>•</span>
                        <span>{file.metadata.width} × {file.metadata.height}</span>
                      {/if}
                    </div>
                  </div>
                </div>

                <!-- Image Actions -->
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="flex gap-1">
                    <button
                      onclick={() => viewFile(file)}
                      class="w-8 h-8 bg-white/90 hover:bg-white dark:bg-black/80 hover:dark:bg-black/90 rounded-lg flex items-center justify-center transition-colors"
                      title="View image"
                    >
                      <Eye class="w-4 h-4 text-gray-800 dark:text-gray-200" />
                    </button>
                    <button
                      onclick={() => downloadFile(file)}
                      class="w-8 h-8 bg-white/90 hover:bg-white dark:bg-black/80 hover:dark:bg-black/90 rounded-lg flex items-center justify-center transition-colors"
                      title="Download image"
                    >
                      <Download class="w-4 h-4 text-gray-800 dark:text-gray-200" />
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Description Section -->
      {#if note.description}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <div class="w-1 h-6 bg-primary-600 rounded-full"></div>
            Description
          </h3>
          <div class="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
            {@html note.description}
          </div>
        </div>
      {/if}

      <!-- Other Files Section -->
      {#if note.files && note.files.filter(f => !f.mimeType.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <File class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            Files ({note.files.filter(f => !f.mimeType.startsWith('image/')).length})
          </h3>
          <div class="space-y-3">
            {#each note.files.filter(f => !f.mimeType.startsWith('image/')) as file (file.id)}
              <div
                class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
              >
                <!-- File Icon -->
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {#if file.mimeType === 'application/pdf'}
                      <File class="w-8 h-8 text-red-600 dark:text-red-400" />
                    {:else if file.mimeType.includes('document')}
                      <File class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    {:else if file.mimeType.includes('text')}
                      <File class="w-8 h-8 text-green-600 dark:text-green-400" />
                    {:else}
                      <File class="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    {/if}
                  </div>
                </div>

                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 dark:text-white mb-1 truncate" title={file.originalName}>
                    {file.metadata?.title || file.originalName}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {file.originalName}
                  </p>
                  <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span class="capitalize">
                      {file.mimeType.split('/')[1] || file.mimeType}
                    </span>
                    <span>{formatFileSize(file.size)}</span>
                    {#if file.metadata?.pages}
                      <span>{file.metadata.pages} pages</span>
                    {/if}
                  </div>

                  {#if file.metadata?.description}
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {file.metadata.description}
                    </p>
                  {/if}
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2">
                  <button
                    onclick={() => viewFile(file)}
                    class="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded transition-colors"
                  >
                    <Eye class="w-3 h-3" />
                    View
                  </button>
                  <button
                    onclick={() => downloadFile(file)}
                    class="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
                  >
                    <Download class="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Tags Section -->
      {#if note.tags && note.tags.length > 0}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <Tag class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each note.tags as tag (tag.tag)}
              <div
                class="flex items-center gap-1.5 px-3 py-2 hover:bg-opacity-80 rounded-full border transition-colors {!tag.color ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700' : ''}"
                style="background-color: {tag.color ? tag.color + '20' : undefined}; color: {tag.color || undefined}; border-color: {tag.color ? tag.color + '40' : undefined}"
              >
                <div
                  class="w-3 h-3 rounded-full border border-current/30 {!tag.color ? 'bg-primary-600 border-primary-500' : ''}"
                  style="background-color: {tag.color || undefined}"
                ></div>
                <span class="text-sm font-medium">{tag.name || tag.tag}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Empty State if no content -->
      {#if !note.description && (!note.tags || note.tags.length === 0) && !note.link && (!note.files || note.files.length === 0)}
        <div class="text-center py-12">
          <div
            class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Calendar class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500 dark:text-gray-400">
            No additional content available
          </p>
        </div>
      {/if}
    </div>
  {/snippet}
</Modal>

<style>
  /* Custom scrollbar for modal content */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  /* Better typography */
  :global(.prose p) {
    line-height: 1.7;
    margin: 0 0 1em 0;
  }

  /* List styling - fix for missing bullets */
  :global(.prose ul),
  :global(.prose ol) {
    margin: 0.75em 0;
    padding-left: 1.5em;
  }

  :global(.prose ul) {
    list-style-type: disc;
  }

  :global(.prose ul ul) {
    list-style-type: circle;
  }

  :global(.prose ul ul ul) {
    list-style-type: square;
  }

  :global(.prose ol) {
    list-style-type: decimal;
  }

  :global(.prose ol ol) {
    list-style-type: lower-alpha;
  }

  :global(.prose ol ol ol) {
    list-style-type: lower-roman;
  }

  :global(.prose li p) {
    margin-bottom: 0;
  }

  /* Headings styling */
  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4),
  :global(.prose h5),
  :global(.prose h6) {
    margin: 1.25em 0 0.5em 0;
    font-weight: 600;
    line-height: 1.3;
  }

  :global(.prose h1) {
    font-size: 1.875rem;
  }

  :global(.prose h2) {
    font-size: 1.5rem;
  }

  :global(.prose h3) {
    font-size: 1.25rem;
  }

  :global(.prose h4) {
    font-size: 1.125rem;
  }

  /* Links styling */
  :global(.prose a) {
    color: rgb(139 92 246);
    text-decoration: underline;
  }

  :global(.dark .prose a) {
    color: rgb(167 139 250);
  }

  :global(.prose a:hover) {
    text-decoration: none;
  }

  /* Code styling */
  :global(.prose code) {
    background-color: rgb(243 244 246);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }

  :global(.dark .prose code) {
    background-color: rgb(31 41 55);
  }

  :global(.prose pre) {
    background-color: rgb(243 244 246);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1em 0;
  }

  :global(.dark .prose pre) {
    background-color: rgb(31 41 55);
  }

  :global(.prose pre code) {
    background-color: transparent;
    padding: 0;
  }

  /* Blockquote styling */
  :global(.prose blockquote) {
    border-left: 4px solid rgb(139 92 246);
    padding-left: 1rem;
    margin: 1em 0;
    color: rgb(107 114 128);
    font-style: italic;
  }

  :global(.dark .prose blockquote) {
    color: rgb(156 163 175);
    border-left-color: rgb(139 92 246);
  }

  /* Strong/em styling */
  :global(.prose strong) {
    font-weight: 600;
  }

  :global(.prose em) {
    font-style: italic;
  }

  /* Horizontal rule */
  :global(.prose hr) {
    border: none;
    border-top: 1px solid rgb(229 231 235);
    margin: 2em 0;
  }

  :global(.dark .prose hr) {
    border-top-color: rgb(55 65 81);
  }
</style>
