<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl } from '../lib/notes';
  import {
    truncateText,
    formatFileName,
    handleImageError,
    getFileIconColor,
    formatMimeType
  } from '../lib/uiUtils';
  import {
    Pencil,
    Trash2,
    Link2,
    Calendar,
    Image as ImageIcon,
    File,
    Paperclip,
    RotateCcw,
    Share2
  } from '@lucide/svelte';

  let {
    note,
    onEdit,
    onDelete,
    hasAuthToken,
    onShowDetail,
    isDeleted = false,
    onPermanentDelete,
    onRestore,
    onShare
  } = $props<{
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    onShowDetail?: (note: Note) => void;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
    onRestore?: (note: Note) => void;
    onShare?: (note: Note) => void;
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

  function handleRestore() {
    onRestore?.(note);
  }

  function handleShare() {
    onShare?.(note);
  }

  function handleShowDetail() {
    onShowDetail?.(note);
  }
</script>

<div
  class="card card-hover !p-6 group relative overflow-hidden cursor-pointer {!note.is_public
    ? 'bg-gradient-to-br from-warning-50 to-warning-50 dark:from-primary-900/30 dark:to-primary-900/20 border-2 border-warning-300 dark:border-primary-500 shadow-lg'
    : ''}"
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
  {#if note.is_favorite}
    <div
      class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-warning-400 to-warning-600"
    ></div>
  {/if}

  <!-- Card Content -->
  <div class="relative">
    <!-- Header Section -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0 pr-4">
        {#if note.name}
          <h3
            class="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-all duration-200 mb-2"
            title={note.name}
          >
            {note.name}
          </h3>
        {/if}

        {#if note.link}
          <div class="flex items-center gap-2">
            <Link2 class="w-4 h-4 text-warning-600 dark:text-primary-400 flex-shrink-0" />
            <a
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 transition-colors cursor-pointer truncate hover:underline"
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
        {#if note.files.filter(f => f?.mime_type?.startsWith('image/')).length > 1}
          <div class="grid grid-cols-2 gap-2 overflow-hidden">
            {#each note.files
              .filter(f => f?.mime_type?.startsWith('image/'))
              .slice(0, 4) as file, index ((file?.id || 'unknown') + '-' + index)}
              <div
                class="relative group/file-preview aspect-square bg-secondary-100 dark:bg-secondary-900 rounded-lg overflow-hidden"
              >
                <img
                  src={getFileUrl(file)}
                  alt={file?.metadata?.alt || file?.original_name || 'file'}
                  class="w-full h-full object-cover rounded-lg"
                  onerror={handleImageError}
                />
                {#if file === note.files.filter( f => f?.mime_type?.startsWith('image/') )[0] && note.files.filter( f => f?.mime_type?.startsWith('image/') ).length > 4}
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span class="text-white font-semibold text-lg">
                      +{note.files.filter(f => f?.mime_type?.startsWith('image/')).length - 3}
                    </span>
                  </div>
                {/if}
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-300"
                >
                  <div class="absolute bottom-1 left-1 right-1 text-white">
                    <p class="text-xs font-medium truncate" title={file?.original_name || 'file'}>
                      {file?.metadata?.title || formatFileName(file?.original_name || 'file')}
                    </p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <!-- Single Image Preview -->
        {:else if note.files?.[0]?.mime_type?.startsWith('image/')}
          <div
            class="relative group/file-preview rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-800"
          >
            <img
              src={getFileUrl(note.files?.[0])}
              alt={note.files?.[0].metadata?.alt || note.files?.[0].original_name}
              class="w-full h-48 object-cover rounded-lg"
              onerror={handleImageError}
            />
            <!-- Fallback for broken images -->
            <div
              class="hidden w-full h-48 bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center rounded-lg"
            >
              <ImageIcon class="w-12 h-12 text-secondary-400" />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-2 left-2 right-2 text-white">
                <p class="text-sm font-medium truncate" title={note.files?.[0].original_name}>
                  {note.files?.[0].metadata?.title || formatFileName(note.files?.[0].original_name)}
                </p>
                {#if note.files?.[0].metadata?.width && note.files?.[0].metadata?.height}
                  <p class="text-xs opacity-90">
                    {note.files?.[0]?.metadata?.width} × {note.files?.[0]?.metadata?.height}
                  </p>
                {/if}
              </div>
            </div>
          </div>
          <!-- File Icon Preview -->
        {:else}
          <div
            class="flex items-center gap-3 p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg group hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
          >
            <div
              class="w-10 h-10 bg-secondary-200 dark:bg-secondary-700 rounded flex items-center justify-center"
            >
              {#if note.files?.[0]?.mime_type?.startsWith('image/')}
                <ImageIcon class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              {:else}
                <File class="w-5 h-5 {getFileIconColor(note.files?.[0]?.mime_type)}" />
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium text-secondary-900 dark:text-white truncate"
                title={note.files?.[0].original_name}
              >
                {note.files?.[0].metadata?.title || formatFileName(note.files?.[0].original_name)}
              </p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400 capitalize">
                {formatMimeType(note.files?.[0]?.mime_type)}
              </p>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Tags Section -->
    {#if note.tags && note.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each note.tags.slice(0, 5) as tag, index (index)}
          <div
            class="tag-group flex items-center gap-2 px-3 py-1.5 hover:bg-opacity-80 rounded-full border transition-all duration-200 {!tag.color
              ? 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700'
              : ''}"
            style="background-color: {tag.color
              ? tag.color + '20'
              : undefined}; color: {tag.color || undefined}; border-color: {tag.color
              ? tag.color + '40'
              : undefined}"
          >
            <div
              class="w-3 h-3 rounded-full tag-hover-scale transition-transform duration-200 {!tag.color
                ? 'bg-warning-600 dark:bg-primary-600'
                : ''}"
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
        {#if isDeleted && note.deleted_at}
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Calendar class="w-4 h-4" />
            <span>Deleted {formatDate(note.deleted_at)}</span>
          </div>
        {:else if note.created_at}
          <div class="flex items-center gap-2">
            <Calendar class="w-4 h-4" />
            <span>{formatDate(note.created_at)}</span>
          </div>
        {/if}
        {#if note.files && note.files.length > 0}
          <div class="flex items-center gap-1">
            <Paperclip class="w-3 h-3" />
            <span class="text-xs"
              >{note.files.length} {note.files.length === 1 ? 'file' : 'files'}</span
            >
          </div>
        {/if}
      </div>

      <!-- Action Buttons in Footer -->
      <div class="flex items-center gap-2">
        {#if isDeleted}
          <!-- Restore and Permanent Delete buttons for deleted notes -->
          {#if hasAuthToken && onRestore}
            <button
              onclick={e => {
                e.stopPropagation();
                handleRestore();
              }}
              class="btn-icon w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Restore note"
            >
              <RotateCcw class="w-4 h-4 text-green-600 dark:text-green-400" />
            </button>
          {/if}
          {#if hasAuthToken && onPermanentDelete}
            <button
              onclick={e => {
                e.stopPropagation();
                handlePermanentDelete();
              }}
              class="btn-icon p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Permanently delete note"
            >
              <Trash2 class="w-3.5 h-3.5 text-red-500" />
            </button>
          {/if}
        {:else}
          <!-- Share button - Always available -->
          <button
            onclick={e => {
              e.stopPropagation();
              handleShare();
            }}
            class="btn-icon w-8 h-8 rounded-lg bg-white dark:bg-secondary-700 hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            title="Share note"
          >
            <Share2
              class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors"
            />
          </button>
          <!-- Edit and Delete buttons - Only show when authenticated -->
          {#if hasAuthToken}
            <button
              onclick={e => {
                e.stopPropagation();
                handleEdit();
              }}
              class="btn-icon w-8 h-8 rounded-lg bg-white dark:bg-secondary-700 hover:bg-warning-50 dark:hover:bg-primary-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-warning-300 dark:hover:border-primary-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Edit note"
            >
              <Pencil
                class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-warning-600 dark:group-hover:text-primary-400"
              />
            </button>

            <button
              onclick={e => {
                e.stopPropagation();
                handleDelete();
              }}
              class="btn-icon w-8 h-8 rounded-lg bg-white dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
              title="Delete note"
            >
              <Trash2 class="w-4 h-4 text-secondary-600 dark:text-secondary-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
            </button>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
