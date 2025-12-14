<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl, addRefreshParam, isPresignedUrl } from '../lib/notes';
  import { Pencil, Trash2, Link2, Calendar, Image as ImageIcon, File, Paperclip, RefreshCw, AlertTriangle, RotateCcw } from '@lucide/svelte';

  let { note, onEdit, onDelete, hasAuthToken, onShowDetail, isDeleted = false, onPermanentDelete } = $props<{
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    onShowDetail?: (note: Note) => void;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
  }>();

  function handleEdit() {
    onEdit?.(note);
  }

  function handleDelete() {
    onDelete?.(note);
  }

  function handlePermanentDelete() {
    onPermanentDelete?.(note);
  }

  function handleShowDetail() {
    onShowDetail?.(note);
  }

  function truncateText(text: string | null, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  function getFileIcon(mimeType: string) {
    if (mimeType.startsWith('image/')) {
      return ImageIcon;
    }
    return File;
  }

  function formatFileName(name: string): string {
    const maxLength = 20;
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
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


  </script>

<div
  class="card card-hover !p-6 group relative overflow-hidden cursor-pointer {isDeleted ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-500 opacity-90' : (!note.isPublic ? 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/20 border-2 border-primary-300 dark:border-primary-500 shadow-lg' : '')}"
  role="button"
  tabindex="0"
  onclick={handleShowDetail}
  onkeydown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleShowDetail();
    }
  }}
  aria-label={`View details for ${note.name || 'note'}`}
>
  <!-- Card Accent Border -->
  {#if isDeleted}
    <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-red-600"></div>
  {:else if note.isFavorite}
    <div
      class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"
    ></div>
  {/if}

  <!-- Deleted Badge -->
  {#if isDeleted}
    <div class="absolute top-2 right-2 flex items-center gap-1 bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded-full">
      <AlertTriangle class="w-3 h-3 text-red-600 dark:text-red-400" />
      <span class="text-xs font-medium text-red-700 dark:text-red-300">Deleted</span>
    </div>
  {/if}

  <!-- Card Content -->
  <div class="relative">
    <!-- Header Section -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0 pr-4">
        {#if note.name}
          <h3
            class="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-200 mb-2"
            title={note.name}
          >
            {note.name}
          </h3>
        {/if}

        {#if note.link}
          <div class="flex items-center gap-2">
            <Link2 class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <a
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer truncate hover:underline"
              title={note.link}
            >
              {truncateText(note.link, 60)}
            </a>
          </div>
        {/if}
      </div>
    </div>

    <!-- File Preview -->
    {#if note.files && note.files.length > 0}
      <div class="mb-4">
        <!-- Multiple Images Grid -->
        {#if note.files.filter(f => f.mimeType.startsWith('image/')).length > 1}
          <div class="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {#each note.files.filter(f => f.mimeType.startsWith('image/')).slice(0, 4) as file (file.id)}
              <div class="relative group/file-preview aspect-square bg-secondary-100 dark:bg-secondary-800">
                <img
                  src={getFileUrl(file)}
                  alt={file.metadata?.alt || file.originalName}
                  class="w-full h-full object-cover"
                  onerror={handleImageError}
                />
                {#if file === note.files.filter(f => f.mimeType.startsWith('image/'))[0] && note.files.filter(f => f.mimeType.startsWith('image/')).length > 4}
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span class="text-white font-semibold text-lg">
                      +{note.files.filter(f => f.mimeType.startsWith('image/')).length - 3}
                    </span>
                  </div>
                {/if}
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-300">
                  <div class="absolute bottom-1 left-1 right-1 text-white">
                    <p class="text-xs font-medium truncate" title={file.originalName}>
                      {file.metadata?.title || formatFileName(file.originalName)}
                    </p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        <!-- Single Image Preview -->
        {:else if note.files[0].mimeType.startsWith('image/')}
          <div class="relative group/file-preview rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-800">
            <img
              src={getFileUrl(note.files[0])}
              alt={note.files[0].metadata?.alt || note.files[0].originalName}
              class="w-full h-48 object-cover"
              onerror={handleImageError}
            />
            <!-- Fallback for broken images -->
            <div class="hidden w-full h-48 bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
              <ImageIcon class="w-12 h-12 text-secondary-400" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-2 left-2 right-2 text-white">
                <p class="text-sm font-medium truncate" title={note.files[0].originalName}>
                  {note.files[0].metadata?.title || formatFileName(note.files[0].originalName)}
                </p>
                {#if note.files[0].metadata?.width && note.files[0].metadata?.height}
                  <p class="text-xs opacity-90">
                    {note.files[0].metadata.width} × {note.files[0].metadata.height}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        <!-- File Icon Preview -->
        {:else}
          <div class="flex items-center gap-3 p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg group hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors">
            <div class="w-10 h-10 bg-secondary-200 dark:bg-secondary-700 rounded flex items-center justify-center">
              {#if note.files[0].mimeType === 'application/pdf'}
                <File class="w-5 h-5 text-red-600 dark:text-red-400" />
              {:else if note.files[0].mimeType.includes('document')}
                <File class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {:else if note.files[0].mimeType.includes('text')}
                <File class="w-5 h-5 text-green-600 dark:text-green-400" />
              {:else}
                <File class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-secondary-900 dark:text-white truncate" title={note.files[0].originalName}>
                {note.files[0].metadata?.title || formatFileName(note.files[0].originalName)}
              </p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400 capitalize">
                {note.files[0].mimeType.replace('application/', '').replace('image/', '')}
              </p>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    
    <!-- Tags Section -->
    {#if note.tags && note.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each note.tags.slice(0, 5) as tag (tag.tag)}
          <div
            class="tag-group flex items-center gap-2 px-3 py-1.5 hover:bg-opacity-80 rounded-full border transition-all duration-200 {!tag.color ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700' : ''}"
            style="background-color: {tag.color ? tag.color + '20' : undefined}; color: {tag.color || undefined}; border-color: {tag.color ? tag.color + '40' : undefined}"
          >
            <div
              class="w-3 h-3 rounded-full border border-current/30 tag-hover-scale transition-transform duration-200 {!tag.color ? 'bg-primary-600 border-primary-500' : ''}"
              style="background-color: {tag.color || undefined}"
            ></div>
            <span class="text-sm font-medium">{tag.name || tag.tag}</span>
          </div>
        {/each}
        {#if note.tags.length > 5}
          <div
            class="px-3 py-1.5 bg-secondary-100 dark:bg-secondary-700 rounded-full text-sm text-secondary-600 dark:text-secondary-300 font-medium"
          >
            +{note.tags.length - 5} more
          </div>
        {/if}
      </div>
    {/if}

    <!-- Footer Section -->
    <div
      class="flex items-center justify-between text-sm text-secondary-500 dark:text-secondary-400 pt-4 border-t border-secondary-100 dark:border-secondary-700"
    >
      <div class="flex items-center gap-4">
        {#if isDeleted && note.deletedAt}
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle class="w-4 h-4" />
            <span>Deleted {formatDate(note.deletedAt)}</span>
          </div>
        {:else if note.createdAt}
          <div class="flex items-center gap-2">
            <Calendar class="w-4 h-4" />
            <span>{formatDate(note.createdAt)}</span>
          </div>
        {/if}
        {#if note.files && note.files.length > 0}
          <div class="flex items-center gap-1">
            <Paperclip class="w-3 h-3" />
            <span class="text-xs">{note.files.length} {note.files.length === 1 ? 'file' : 'files'}</span>
          </div>
        {/if}
      </div>

      <!-- Action Buttons in Footer -->
      <div class="flex items-center gap-2">
        {#if isDeleted}
          <!-- Permanent Delete button for deleted notes -->
          {#if hasAuthToken && onPermanentDelete}
            <button
              onclick={e => {
                e.stopPropagation();
                handlePermanentDelete();
              }}
              class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Permanently delete note"
            >
              <Trash2
                class="w-4 h-4 text-red-600 dark:text-red-400"
              />
            </button>
          {/if}
        {:else}
          <!-- Edit and Delete buttons - Only show when authenticated -->
          {#if hasAuthToken}
            <button
              onclick={e => {
                e.stopPropagation();
                handleEdit();
              }}
              class="w-8 h-8 rounded-lg bg-white dark:bg-secondary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Edit note"
            >
              <Pencil
                class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"
              />
            </button>

            <button
              onclick={e => {
                e.stopPropagation();
                handleDelete();
              }}
              class="w-8 h-8 rounded-lg bg-white dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Delete note"
            >
              <Trash2
                class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
              />
            </button>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Smooth animations for better UX */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Stagger animation for tags */
  .tag-group {
    animation: slideInLeft 0.3s ease-out forwards;
    opacity: 0;
  }

  /* Enhanced hover effects */
  .group:hover {
    transform: scale(1.02);
  }

  /* Smooth color transitions */
  * {
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  /* Card entrance animation */
  .card {
    animation: fadeInUp 0.4s ease-out;
  }

  /* Better readability with improved typography */
  p {
    line-height: 1.6;
    word-wrap: break-word;
  }

  /* Focus states for accessibility */
  button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
</style>
