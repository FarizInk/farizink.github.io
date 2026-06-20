<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl, regenerateSummarize } from '../lib/notes';
  import { handleImageError, formatFileSize } from '../lib/uiUtils';
  import { toast } from 'svelte-sonner';
  import {
    X,
    ExternalLink,
    Calendar,
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
    Paperclip,
    Loader2,
    Sparkles
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
    onShare,
    hideActions = false
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
    hideActions?: boolean;
  }>();

  // Modal is only open when both isOpen is true AND note exists
  let shouldShowModal = $derived(isOpen && note !== null);

  // Loading state for regenerate summarize
  let isRegenerating = $state(false);

  // Toggle state for summary view (short/full)
  let isSummaryFull = $state(false);

  async function handleRegenerateSummarize() {
    if (!note || !note.link) return;

    isRegenerating = true;
    try {
      const response = await regenerateSummarize(note.id);
      // Update the note with new link_summarize
      if (response.data && response.data.link_summarize) {
        note.link_summarize = response.data.link_summarize;
      }
      toast.success('Link summary regenerated successfully!');
    } catch (error) {
      console.error('Regenerate summarize error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate summary';
      toast.error(errorMessage);
    } finally {
      isRegenerating = false;
    }
  }

  function handleShare() {
    if (!note) return;
    if (onShare) {
      onShare(note);
      return;
    }
    // Fallback: copy share URL to clipboard
    const shareUrl = `${window.location.origin}/notes?id=${note.id}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
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

<Modal isOpen={shouldShowModal} {onClose} maxW="max-w-6xl">
<div class="mb-5">
      <div class="flex items-center justify-between">
        <!-- Mobile: "Detail" title, Desktop: Title & Meta Info -->
        <div class="hidden sm:block flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <h1
              id="modal-title"
              class="text-xl sm:text-2xl font-bold tracking-tight {isDeleted ? 'text-red-600 dark:text-red-400' : ''} {note.is_favorite && !isDeleted ? 'bg-gradient-to-r from-warning-500 via-amber-500 to-yellow-500 dark:from-warning-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent' : ''} {!isDeleted && !note.is_favorite ? 'text-gray-900 dark:text-white' : ''}"
            >
              {note.name || 'Untitled Note'}
            </h1>
          </div>

          <!-- Meta Info Pills (Desktop only) -->
          <div class="flex flex-wrap items-center gap-2 text-sm">
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
                <span>{formatDate(note.created_at)}</span>
              </div>
              <div
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-50 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 font-medium"
              >
                <Clock class="w-3.5 h-3.5" />
                <span>{formatDate(note.updated_at)}</span>
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
          </div>
        </div>

        <!-- Mobile: "Detail" title -->
        <h1 class="sm:hidden text-lg font-semibold text-gray-900 dark:text-white">
          Detail
        </h1>

        <!-- Action Buttons (Desktop only) -->
        <div class="hidden sm:flex items-center gap-2 flex-shrink-0">
          {#if note.link}
            <button
              onclick={handleLinkClick}
              class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 hover:scale-105 active:scale-95"
              title="Open link"
            >
              <ExternalLink class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
            </button>
          {/if}

          <button
            onclick={handleShare}
            class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 hover:scale-105 active:scale-95"
            title="Share note"
          >
            <Share2 class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
          </button>

          {#if !hideActions}
            {#if isDeleted}
              {#if hasAuthToken && onPermanentDelete}
                <button
                  onclick={handlePermanentDelete}
                  class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-700 hover:scale-105 active:scale-95"
                  title="Permanently delete note"
                >
                  <Trash2 class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </button>
              {/if}
            {:else}
              {#if hasAuthToken}
                <button
                  onclick={handleEdit}
                  class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 hover:scale-105 active:scale-95"
                  title="Edit note"
                >
                  <Edit class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors" />
                </button>

                <button
                  onclick={handleDelete}
                  class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-700 hover:scale-105 active:scale-95"
                  title="Delete note"
                >
                  <Trash2 class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                </button>
              {/if}
            {/if}
          {/if}

          <div class="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1"></div>
        </div>

        <!-- Close Button (Always visible) -->
        <button
          onclick={onClose}
          class="btn-icon group relative bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600 border border-secondary-200 dark:border-secondary-600 hover:scale-105 active:scale-95 sm:mx-1"
          title="Close modal"
        >
          <X class="w-5 h-5 text-secondary-600 dark:text-secondary-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>

    <div class="">
        <!-- Mobile: Title, Meta Info & Action Buttons -->
        <div class="sm:hidden mb-6 space-y-4">
          <!-- Title -->
          <h2
            class="text-xl font-bold tracking-tight {isDeleted ? 'text-red-600 dark:text-red-400' : ''} {note.is_favorite && !isDeleted ? 'bg-gradient-to-r from-warning-500 via-amber-500 to-yellow-500 dark:from-warning-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent' : ''} {!isDeleted && !note.is_favorite ? 'text-gray-900 dark:text-white' : ''}"
          >
            {note.name || 'Untitled Note'}
          </h2>

          <!-- Meta Info (2 lines, no chip style) -->
          <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {#if isDeleted && note.deleted_at}
              <div class="flex items-center gap-1.5">
                <AlertTriangle class="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span class="text-red-700 dark:text-red-400">Deleted {formatDate(note.deleted_at)}</span>
              </div>
            {:else}
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                <span>{formatDate(note.created_at)}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5" />
                <span>{formatDate(note.updated_at)}</span>
              </div>
            {/if}
            {#if note.files && note.files.length > 0}
              <div class="flex items-center gap-1.5">
                <Paperclip class="w-3.5 h-3.5" />
                <span>{note.files.length} file{note.files.length > 1 ? 's' : ''}</span>
              </div>
            {/if}
          </div>

          <!-- Action Buttons (Mobile) - Grid layout for auto wrap -->
          <div class="grid grid-cols-2 gap-2">
            {#if note.link}
              <button
                onclick={handleLinkClick}
                class="btn btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 rounded-xl transition-all text-sm font-medium"
              >
                <ExternalLink class="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                <span class="text-secondary-700 dark:text-secondary-300">Open Link</span>
              </button>
            {/if}

            <button
              onclick={handleShare}
              class="btn btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 rounded-xl transition-all text-sm font-medium"
            >
              <Share2 class="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
              <span class="text-secondary-700 dark:text-secondary-300">Share</span>
            </button>

            {#if !hideActions}
              {#if isDeleted}
                {#if hasAuthToken && onPermanentDelete}
                  <button
                    onclick={handlePermanentDelete}
                    class="btn col-span-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-700 rounded-xl transition-all text-sm font-medium"
                  >
                    <Trash2 class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    <span class="text-secondary-700 dark:text-secondary-300 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">Delete Permanently</span>
                  </button>
                {/if}
              {:else}
                {#if hasAuthToken}
                  <button
                    onclick={handleEdit}
                    class="btn btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 dark:bg-secondary-700 hover:bg-warning-100 dark:hover:bg-primary-900/30 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-500 rounded-xl transition-all text-sm font-medium"
                  >
                    <Edit class="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                    <span class="text-secondary-700 dark:text-secondary-300">Edit</span>
                  </button>

                  <button
                    onclick={handleDelete}
                    class="btn flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary-100 dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-700 rounded-xl transition-all text-sm font-medium"
                  >
                    <Trash2 class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    <span class="text-secondary-700 dark:text-secondary-300 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">Delete</span>
                  </button>
                {/if}
              {/if}
            {/if}
          </div>
        </div>
        <!-- Link Section -->
        {#if note.link}
          <div
            class="mb-6 p-4 bg-warning-50 dark:bg-primary-900/10 rounded-lg border border-warning-200 dark:border-primary-800"
          >
          <div class="flex items-center gap-3 mb-3">
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
              class="btn btn-primary px-3 py-2 bg-warning-600 dark:bg-primary-600 hover:bg-warning-700 dark:hover:bg-primary-700 text-white"
            >
              Visit
            </button>
          </div>

          <!-- Link Summarize Section -->
          <div class="mt-3 pt-3 border-t border-warning-200 dark:border-primary-700">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-warning-900 dark:text-primary-100 flex items-center gap-1.5">
                <Sparkles class="w-4 h-4" />
                AI Summary
              </p>
              <div class="flex items-center gap-2">
                {#if note.link_summarize && (note.link_summarize.length > 150)}
                  <button
                    onclick={() => (isSummaryFull = !isSummaryFull)}
                      class="quick-btn text-xs text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 font-medium transition-colors"
                    >
                      {isSummaryFull ? 'Show less' : 'Show more'}
                    </button>
                {/if}
                {#if hasAuthToken}
                  <button
                    onclick={handleRegenerateSummarize}
                    disabled={isRegenerating}
                      class="btn btn-primary btn-sm flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Regenerate AI summary"
                  >
                    {#if isRegenerating}
                      <Loader2 class="w-3.5 h-3.5 animate-spin" />
                      <span>Regenerating...</span>
                    {:else}
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Regenerate</span>
                    {/if}
                  </button>
                {/if}
              </div>
            </div>
            {#if note.link_summarize}
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {isSummaryFull || note.link_summarize.length <= 150
                  ? note.link_summarize
                  : note.link_summarize.slice(0, 150) + '...'}
              </p>
            {:else}
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                No summary available yet.{#if hasAuthToken} Click regenerate to generate AI summary.{/if}
              </p>
            {/if}
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
                <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={getFileUrl(file)}
                    alt={file.metadata?.alt || file.original_name}
                    class="w-full h-full object-cover rounded-lg"
                    onerror={handleImageError}
                  />
                  <!-- Fallback for broken images -->
                  <div
                    class="hidden w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg"
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
                      class="btn-icon w-8 h-8 bg-white/90 hover:bg-white dark:bg-black/80 hover:dark:bg-black/90 rounded-lg flex items-center justify-center transition-colors"
                      title="View image"
                    >
                      <Eye class="w-4 h-4 text-gray-800 dark:text-gray-200" />
                    </button>
                    <button
                      onclick={() => downloadFile(file)}
                      class="btn-icon w-8 h-8 bg-white/90 hover:bg-white dark:bg-black/80 hover:dark:bg-black/90 rounded-lg flex items-center justify-center transition-colors"
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
                    class="btn btn-sm flex items-center gap-1 px-3 py-1.5 text-sm bg-warning-50 dark:bg-primary-900/20 hover:bg-warning-100 dark:hover:bg-primary-900/30 text-warning-700 dark:text-primary-300 rounded transition-colors"
                  >
                    <Eye class="w-3 h-3" />
                    View
                  </button>
                  <button
                    onclick={() => downloadFile(file)}
                    class="btn btn-secondary btn-sm flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
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
</Modal>
