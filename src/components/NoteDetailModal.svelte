<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl } from '../lib/notes';
  import { handleImageError, formatFileSize } from '../lib/uiUtils';
  import {
    X,
    ExternalLink,
    Calendar,
    Tag,
    Star,
    Clock,
    Edit,
    Trash2,
    Link2,
    File,
    Image as ImageIcon,
    Download,
    Eye,
    AlertTriangle,
    Share2,
    Globe,
    Paperclip
  } from '@lucide/svelte';
  import Modal from './Modal.svelte';

  let {
    note,
    isOpen = $bindable(),
    onClose,
    onEdit,
    onDelete,
    hasAuthToken,
    isDeleted = false,
    onPermanentDelete,
    onShare
  } = $props<{
    note: Note | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
    onShare?: (note: Note) => void;
  }>();

  // Modal is only open when both isOpen is true AND note exists
  let shouldShowModal = $derived(isOpen && note !== null);

  function handleShare() {
    if (note) onShare?.(note);
  }

  function handleEdit() {
    if (note) onEdit?.(note);
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

  function downloadFile(file: Note['files'][number]) {
    const link = document.createElement('a');
    const fileUrl = getFileUrl(file);
    link.href = fileUrl;
    link.download = file.original_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function viewFile(file: Note['files'][number]) {
    const fileUrl = getFileUrl(file);
    window.open(fileUrl, '_blank');
  }
</script>

<Modal isOpen={shouldShowModal} {onClose} maxW="max-w-6xl" showCloseButton={false}>
  {#snippet header()}
    <!-- Enhanced Header with Glass Morphism -->
    <div class="py-4 px-4 sm:px-6 bg-gradient-to-b from-white/80 to-white/50 dark:from-gray-900/80 dark:to-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-start gap-4">
        <!-- Status Icon Badge -->
        <div class="flex-shrink-0">
          {#if isDeleted}
            <div
              class="relative group">
              <div
                class="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-75"
              ></div>
              <div
                class="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 flex items-center justify-center ring-2 ring-red-200 dark:ring-red-800/50 group-hover:scale-110 transition-transform duration-200"
              >
                <AlertTriangle class="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          {:else if note.is_favorite}
            <div
              class="relative group">
              <div
                class="absolute -inset-1 bg-gradient-to-r from-warning-400 to-amber-400 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"
              ></div>
              <div
                class="relative w-12 h-12 rounded-full bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/40 dark:to-warning-900/40 flex items-center justify-center ring-2 ring-warning-200 dark:ring-warning-800/50 group-hover:scale-110 transition-transform duration-200"
              >
                <Star class="w-6 h-6 text-warning-600 dark:text-warning-400 fill-warning-600 dark:fill-warning-400" />
              </div>
            </div>
          {:else}
            <div
              class="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 flex items-center justify-center ring-2 ring-secondary-200 dark:ring-secondary-700"
            >
              <Calendar class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            </div>
          {/if}
        </div>

        <!-- Title & Meta Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <h1
              id="modal-title"
              class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
            >
              {note.name || 'Untitled Note'}
            </h1>
          </div>

          <!-- Meta Info Pills -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            {#if isDeleted && note.deleted_at}
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-medium border border-red-200 dark:border-red-800"
              >
                <AlertTriangle class="w-3.5 h-3.5" />
                <span>Deleted {formatDate(note.deleted_at)}</span>
              </div>
            {:else}
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-50 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 font-medium"
              >
                <Calendar class="w-3.5 h-3.5" />
                <span>Created {formatDate(note.created_at)}</span>
              </div>
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-50 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 font-medium"
              >
                <Clock class="w-3.5 h-3.5" />
                <span>Updated {formatDate(note.updated_at)}</span>
              </div>
            {/if}
            {#if note.files && note.files.length > 0}
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium"
              >
                <Paperclip class="w-3.5 h-3.5" />
                <span>{note.files.length} file{note.files.length > 1 ? 's' : ''}</span>
              </div>
            {/if}
            {#if note.tags && note.tags.length > 0}
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning-50 dark:bg-primary-900/20 text-warning-700 dark:text-primary-400 font-medium"
              >
                <Tag class="w-3.5 h-3.5" />
                <span>{note.tags.length} tag{note.tags.length > 1 ? 's' : ''}</span>
              </div>
            {/if}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {#if note.link}
            <button
              onclick={handleLinkClick}
              class="group relative p-2 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Open link"
            >
              <ExternalLink class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
            </button>
          {/if}

          <button
            onclick={handleShare}
            class="group relative p-2 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Share note"
          >
            <Share2 class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          {#if isDeleted}
            {#if hasAuthToken && onPermanentDelete}
              <button
                onclick={handlePermanentDelete}
                class="group relative p-2 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all duration-200 hover:scale-105 active:scale-95"
                title="Permanently delete note"
              >
                <Trash2 class="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            {/if}
          {:else}
            {#if hasAuthToken}
              <button
                onclick={handleEdit}
                class="group relative p-2 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 transition-all duration-200 hover:scale-105 active:scale-95"
                title="Edit note"
              >
                <Edit class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
              </button>

              <button
                onclick={handleDelete}
                class="group relative p-2 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all duration-200 hover:scale-105 active:scale-95"
                title="Delete note"
              >
                <Trash2 class="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            {/if}
          {/if}

          <div class="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1"></div>

          <button
            onclick={onClose}
            class="group relative p-2 rounded-xl bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 border border-secondary-200 dark:border-secondary-600 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Close modal"
          >
            <X class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="overflow-y-auto max-h-[calc(90vh-180px)]">
      <div class="px-4 sm:px-6 py-6">
        <!-- Link Section -->
        {#if note.link}
          <div
            class="mb-6 p-4 bg-warning-50 dark:bg-primary-900/10 rounded-lg border border-warning-200 dark:border-primary-800"
          >
          <div class="flex items-center gap-3">
            <Link2 class="w-5 h-5 text-warning-600 dark:text-primary-400 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-warning-900 dark:text-primary-100 mb-1">External Link</p>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                class="text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 truncate block"
              >
                {note.link}
              </a>
            </div>
            <button
              onclick={handleLinkClick}
              class="px-3 py-2 bg-warning-600 dark:bg-primary-600 hover:bg-warning-700 dark:hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Visit
            </button>
          </div>
        </div>
      {/if}

      <!-- Images Section -->
      {#if note.files && note.files.filter(f => f?.mime_type?.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <ImageIcon class="w-5 h-5 text-warning-600 dark:text-primary-400" />
            Images ({note.files.filter(f => f?.mime_type?.startsWith('image/')).length})
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each note.files.filter( f => f?.mime_type?.startsWith('image/') ) as file, index (file.id + '-' + index)}
              <div
                class="group relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-all"
              >
                <!-- Image Container -->
                <div class="aspect-square bg-gray-100 dark:bg-gray-700">
                  <img
                    src={getFileUrl(file)}
                    alt={file.metadata?.alt || file.original_name}
                    class="w-full h-full object-cover"
                    onerror={handleImageError}
                  />
                  <!-- Fallback for broken images -->
                  <div
                    class="hidden w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                  >
                    <ImageIcon class="w-12 h-12 text-gray-500" />
                  </div>
                </div>

                <!-- Image Info Overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 class="font-medium truncate text-sm" title={file.original_name}>
                      {file.metadata?.title || file.original_name}
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
                <div
                  class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
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
            <div class="w-1 h-6 bg-warning-600 dark:bg-primary-600 rounded-full"></div>
            Description
          </h3>
          <div class="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
            {@html note.description}
          </div>
        </div>
      {/if}

      <!-- Other Files Section -->
      {#if note.files && note.files.filter(f => !f?.mime_type?.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
          >
            <File class="w-5 h-5 text-warning-600 dark:text-primary-400" />
            Files ({note.files.filter(f => !f?.mime_type?.startsWith('image/')).length})
          </h3>
          <div class="space-y-3">
            {#each note.files.filter(f => !f?.mime_type?.startsWith('image/')) as file, index (file.id + '-' + index)}
              <div
                class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
              >
                <!-- File Icon -->
                <div class="flex-shrink-0">
                  <div
                    class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    {#if file?.mime_type === 'application/pdf'}
                      <File class="w-8 h-8 text-red-600 dark:text-red-400" />
                    {:else if file?.mime_type?.includes('document')}
                      <File class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    {:else if file?.mime_type?.includes('text')}
                      <File class="w-8 h-8 text-green-600 dark:text-green-400" />
                    {:else}
                      <File class="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    {/if}
                  </div>
                </div>

                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-medium text-gray-900 dark:text-white mb-1 truncate"
                    title={file.original_name}
                  >
                    {file.metadata?.title || file.original_name}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {file.original_name}
                  </p>
                  <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span class="capitalize">
                      {file?.mime_type?.split('/')[1] || file?.mime_type}
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
                    class="flex items-center gap-1 px-3 py-1.5 text-sm bg-warning-50 dark:bg-primary-900/20 hover:bg-warning-100 dark:hover:bg-primary-900/30 text-warning-700 dark:text-primary-300 rounded transition-colors"
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
            <Tag class="w-5 h-5 text-warning-600 dark:text-primary-400" />
            Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each note.tags as tag, index (index)}
              <div
                class="flex items-center gap-1.5 px-3 py-2 hover:bg-opacity-80 rounded-full border transition-colors {!tag.color
                  ? 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700'
                  : ''}"
                style="background-color: {tag.color
                  ? tag.color + '20'
                  : undefined}; color: {tag.color || undefined}; border-color: {tag.color
                  ? tag.color + '40'
                  : undefined}"
              >
                <div
                  class="w-3 h-3 rounded-full {!tag.color
                    ? 'bg-warning-600 dark:bg-primary-600'
                    : ''}"
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
          <p class="text-gray-500 dark:text-gray-400">No additional content available</p>
        </div>
      {/if}
      </div>
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
