<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl } from '../lib/notes';
  import {
    truncateText,
    formatFileName,
    handleImageError,
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
    Share2,
    Pin,
    PinOff,
    Lock
  } from '@lucide/svelte';
  import { Tag } from '$lib/components/ds';

  let {
    note,
    onEdit,
    onDelete,
    hasAuthToken,
    onShowDetail,
    isDeleted = false,
    onPermanentDelete,
    onRestore,
    onShare,
    onTogglePin,
    isFocused = false
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
    onTogglePin?: (note: Note) => void;
    isFocused?: boolean;
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

  function handleTogglePin() {
    onTogglePin?.(note);
  }

  function handleShowDetail() {
    onShowDetail?.(note);
  }
</script>

<div
  class="group relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-lg bg-card p-6 text-ink transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring {isFocused
    ? 'outline-2 outline-offset-2 outline-focus-ring'
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
  <!-- Favorite accent bar -->
  {#if note.is_favorite}
    <div class="absolute top-0 left-0 h-full w-1 bg-accent" aria-hidden="true"></div>
  {/if}

  <!-- Eyebrows -->
  {#if note.is_pinned || !note.is_public}
    <div class="flex flex-wrap items-center gap-3">
      {#if note.is_pinned}
        <span class="font-mono text-xs font-medium tracking-wide text-accent-text">● PINNED</span>
      {/if}
      {#if !note.is_public}
        <span class="inline-flex items-center gap-1 font-mono text-xs font-medium tracking-wide text-ink-muted">
          <Lock class="size-3" aria-hidden="true" />
          PRIVATE
        </span>
      {/if}
    </div>
  {/if}

  {#if note.name}
    <h3
      class="m-0 font-display text-lg leading-6 font-semibold text-ink"
      title={note.name}
    >
      {note.name}
    </h3>
  {/if}

  {#if note.link}
    <div class="flex min-w-0 items-center gap-2">
      <Link2 class="size-4 shrink-0 text-accent-text" />
      <a
        href={note.link}
        target="_blank"
        rel="noopener noreferrer"
        class="truncate text-body-sm text-accent-text hover:underline"
        title={note.link}
      >
        {truncateText(note.link, 60)}
      </a>
    </div>
  {/if}

  <!-- File Preview -->
  {#if note.files && note.files.length > 0}
    <div>
      <!-- Multiple Images Grid -->
      {#if note.files.filter(f => f?.mime_type?.startsWith('image/')).length > 1}
        <div class="grid grid-cols-2 gap-2 overflow-hidden">
          {#each note.files
            .filter(f => f?.mime_type?.startsWith('image/'))
            .slice(0, 4) as file, index ((file?.id || 'unknown') + '-' + index)}
            <div
              class="relative group/file-preview aspect-square bg-sunken rounded-md overflow-hidden"
            >
              <img
                src={getFileUrl(file)}
                alt={file?.metadata?.alt || file?.original_name || 'file'}
                class="w-full h-full object-cover rounded-md"
                onerror={handleImageError}
              />
              {#if file === note.files.filter( f => f?.mime_type?.startsWith('image/') )[0] && note.files.filter( f => f?.mime_type?.startsWith('image/') ).length > 4}
                <div class="absolute inset-0 bg-tile-void/80 flex items-center justify-center">
                  <span class="font-mono text-ink-on-dark font-semibold text-lg">
                    +{note.files.filter(f => f?.mime_type?.startsWith('image/')).length - 3}
                  </span>
                </div>
              {/if}
              <div
                class="absolute inset-x-0 bottom-0 bg-tile-void/90 opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-150"
              >
                <div class="px-2 py-1 text-ink-on-dark">
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
          class="relative group/file-preview rounded-md overflow-hidden bg-sunken"
        >
          <img
            src={getFileUrl(note.files?.[0])}
            alt={note.files?.[0].metadata?.alt || note.files?.[0].original_name}
            class="w-full h-48 object-cover rounded-md"
            onerror={handleImageError}
          />
          <!-- Fallback for broken images -->
          <div
            class="hidden w-full h-48 bg-sunken flex items-center justify-center rounded-md"
          >
            <ImageIcon class="w-12 h-12 text-ink-muted" />
          </div>
          <div
            class="absolute inset-x-0 bottom-0 bg-tile-void/90 opacity-0 group-hover/file-preview:opacity-100 transition-opacity duration-150"
          >
            <div class="px-3 py-2 text-ink-on-dark">
              <p class="text-sm font-medium truncate" title={note.files?.[0].original_name}>
                {note.files?.[0].metadata?.title || formatFileName(note.files?.[0].original_name)}
              </p>
              {#if note.files?.[0].metadata?.width && note.files?.[0].metadata?.height}
                <p class="font-mono text-xs text-ink-on-dark-muted">
                  {note.files?.[0]?.metadata?.width} × {note.files?.[0]?.metadata?.height}
                </p>
              {/if}
            </div>
          </div>
        </div>
        <!-- File Icon Preview -->
      {:else}
        <div
          class="flex items-center gap-3 p-3 bg-sunken rounded-md"
        >
          <div
            class="size-10 bg-tile-deep text-ink-on-dark rounded-sm flex items-center justify-center"
          >
            {#if note.files?.[0]?.mime_type?.startsWith('image/')}
              <ImageIcon class="size-5" />
            {:else}
              <File class="size-5" />
            {/if}
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-body-sm font-medium text-ink truncate"
              title={note.files?.[0].original_name}
            >
              {note.files?.[0].metadata?.title || formatFileName(note.files?.[0].original_name)}
            </p>
            <p class="text-code text-ink-muted capitalize">
              {formatMimeType(note.files?.[0]?.mime_type)}
            </p>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Tags Section -->
  {#if note.tags && note.tags.length > 0}
    <div class="flex flex-wrap gap-2">
      {#each note.tags.slice(0, 5) as tag, index (index)}
        {#if tag.color}
          <Tag>
            <span class="size-2 rounded-pill" style="background-color: {tag.color}" aria-hidden="true"></span>
            {tag.name || tag.tag}
          </Tag>
        {:else}
          <Tag dot>{tag.name || tag.tag}</Tag>
        {/if}
      {/each}
      {#if note.tags.length > 5}
        <Tag>+{note.tags.length - 5} more</Tag>
      {/if}
    </div>
  {/if}

  <!-- Footer Section -->
  <div
    class="mt-auto flex items-center justify-between gap-3 pt-3 text-code text-ink-muted"
  >
    <div class="flex flex-wrap items-center gap-4">
      {#if isDeleted && note.deleted_at}
        <div class="flex items-center gap-2 text-negative">
          <Calendar class="size-4" />
          <span>Deleted {formatDate(note.deleted_at)}</span>
        </div>
      {:else if note.created_at}
        <div class="flex items-center gap-2">
          <Calendar class="size-4" />
          <span>{formatDate(note.created_at)}</span>
        </div>
      {/if}
      {#if note.files && note.files.length > 0}
        <div class="flex items-center gap-1">
          <Paperclip class="size-3" />
          <span>{note.files.length} {note.files.length === 1 ? 'file' : 'files'}</span>
        </div>
      {/if}
    </div>

    <!-- Action Buttons in Footer -->
    <div class="flex items-center gap-1">
      {#if isDeleted}
        <!-- Restore and Permanent Delete buttons for deleted notes -->
        {#if hasAuthToken && onRestore}
          <button
            onclick={e => {
              e.stopPropagation();
              handleRestore();
            }}
            class="btn-icon"
            title="Restore note"
          >
            <RotateCcw class="size-4" />
          </button>
        {/if}
        {#if hasAuthToken && onPermanentDelete}
          <button
            onclick={e => {
              e.stopPropagation();
              handlePermanentDelete();
            }}
            class="btn-icon hover:!text-negative"
            title="Permanently delete note"
          >
            <Trash2 class="size-4" />
          </button>
        {/if}
      {:else}
        <!-- Share button - Always available -->
        <button
          onclick={e => {
            e.stopPropagation();
            handleShare();
          }}
          class="btn-icon"
          title="Share note"
        >
          <Share2 class="size-4" />
        </button>
        <!-- Edit and Delete buttons - Only show when authenticated -->
        {#if hasAuthToken}
          {#if onTogglePin}
            <button
              onclick={e => {
                e.stopPropagation();
                handleTogglePin();
              }}
              class="btn-icon {note.is_pinned ? '!text-accent-text' : ''}"
              title={note.is_pinned ? 'Unpin note' : 'Pin note'}
            >
              {#if note.is_pinned}
                <PinOff class="size-4" />
              {:else}
                <Pin class="size-4" />
              {/if}
            </button>
          {/if}
          <button
            onclick={e => {
              e.stopPropagation();
              handleEdit();
            }}
            class="btn-icon"
            title="Edit note"
          >
            <Pencil class="size-4" />
          </button>

          <button
            onclick={e => {
              e.stopPropagation();
              handleDelete();
            }}
            class="btn-icon hover:!text-negative"
            title="Delete note"
          >
            <Trash2 class="size-4" />
          </button>
        {/if}
      {/if}
    </div>
  </div>
</div>
