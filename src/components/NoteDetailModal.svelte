<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate, getFileUrl } from '../lib/notes';
  import { createSummarizePoller } from '../lib/summarize.svelte';
  import { onDestroy } from 'svelte';
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
    RefreshCw,
    Pin,
    PinOff,
    Sparkles,
    StickyNote
  } from '@lucide/svelte';
  import Modal from './Modal.svelte';
  import { Tag } from '$lib/components/ds';

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
    onTogglePin,
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
    onTogglePin?: (note: Note) => void;
    hideActions?: boolean;
  }>();

  // Modal is only open when both isOpen is true AND note exists
  let shouldShowModal = $derived(isOpen && note !== null);

  // Summarize poller: owns status/summary reactive state, polling, and retry.
  const poller = createSummarizePoller();

  // Toggle state for summary view (short/full)
  let isSummaryFull = $state(false);

  // Drive the poller from the modal lifecycle: activate when a linked note is
  // shown, stop when the modal closes or the note has no link. Reads only
  // shouldShowModal / note / note.link so poll updates don't retrigger it.
  $effect(() => {
    if (shouldShowModal && note && note.link) {
      isSummaryFull = false;
      void poller.activate(note);
    } else {
      poller.stop();
    }
  });

  onDestroy(() => {
    poller.stop();
  });

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

  function handleTogglePin() {
    if (note) onTogglePin?.(note);
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
      <div class="flex items-center justify-between gap-3">
        <!-- Mobile: "Detail" title, Desktop: Title & Meta Info -->
        <div class="hidden sm:flex flex-1 min-w-0 items-start gap-3">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-lilac text-ink-on-bright">
            <StickyNote class="size-5" />
          </div>
          <div class="flex-1 min-w-0">
          {#if note.is_pinned && !isDeleted}
            <span class="font-mono text-xs font-medium tracking-wide text-accent-text">● PINNED</span>
          {/if}
          <div class="flex items-center gap-2 mb-2">
            <h1
              id="modal-title"
              class="font-display text-title font-semibold {note.is_favorite && !isDeleted ? 'text-accent-text' : 'text-ink'}"
            >
              {note.name || 'Untitled note'}
            </h1>
          </div>

          <!-- Meta Info Pills (Desktop only) -->
          <div class="flex flex-wrap items-center gap-2">
            {#if isDeleted && note.deleted_at}
              <div
                class="inline-flex h-7 items-center gap-1.5 px-3 rounded-pill bg-[color-mix(in_oklab,var(--negative)_16%,var(--bg-control))] text-negative text-code"
              >
                <AlertTriangle class="size-3.5" />
                <span>Deleted {formatDate(note.deleted_at)}</span>
              </div>
            {:else}
              <div class="inline-flex h-7 items-center gap-1.5 px-3 rounded-pill bg-sunken text-ink-muted text-code">
                <Calendar class="size-3.5" />
                <span>{formatDate(note.created_at)}</span>
              </div>
              <div class="inline-flex h-7 items-center gap-1.5 px-3 rounded-pill bg-sunken text-ink-muted text-code">
                <Clock class="size-3.5" />
                <span>{formatDate(note.updated_at)}</span>
              </div>
            {/if}
            {#if note.files && note.files.length > 0}
              <div class="inline-flex h-7 items-center gap-1.5 px-3 rounded-pill bg-sunken text-ink-muted text-code">
                <Paperclip class="size-3.5" />
                <span>{note.files.length} file{note.files.length > 1 ? 's' : ''}</span>
              </div>
            {/if}
          </div>
          </div>
        </div>

        <!-- Mobile: "Detail" title -->
        <h1 class="sm:hidden text-title text-ink">
          Detail
        </h1>

        <!-- Action Buttons (Desktop only) -->
        <div class="hidden sm:flex items-center gap-1 flex-shrink-0">
          {#if note.link}
            <button onclick={handleLinkClick} class="btn-icon" title="Open link" aria-label="Open link">
              <ExternalLink class="size-5" />
            </button>
          {/if}

          <button onclick={handleShare} class="btn-icon" title="Share note" aria-label="Share note">
            <Share2 class="size-5" />
          </button>

          {#if !hideActions}
            {#if isDeleted}
              {#if hasAuthToken && onPermanentDelete}
                <button
                  onclick={handlePermanentDelete}
                  class="btn-icon hover:text-negative"
                  title="Permanently delete note"
                  aria-label="Permanently delete note"
                >
                  <Trash2 class="size-5" />
                </button>
              {/if}
            {:else}
              {#if hasAuthToken}
                {#if onTogglePin}
                  <button
                    onclick={handleTogglePin}
                    class="btn-icon {note.is_pinned ? 'text-accent-text' : ''}"
                    title={note.is_pinned ? 'Unpin note' : 'Pin note'}
                    aria-label={note.is_pinned ? 'Unpin note' : 'Pin note'}
                  >
                    {#if note.is_pinned}
                      <PinOff class="size-5" />
                    {:else}
                      <Pin class="size-5" />
                    {/if}
                  </button>
                {/if}
                <button onclick={handleEdit} class="btn-icon" title="Edit note" aria-label="Edit note">
                  <Edit class="size-5" />
                </button>

                <button onclick={handleDelete} class="btn-icon hover:text-negative" title="Delete note" aria-label="Delete note">
                  <Trash2 class="size-5" />
                </button>
              {/if}
            {/if}
          {/if}

          <div class="w-2" aria-hidden="true"></div>
        </div>

        <!-- Close Button (Always visible) -->
        <button onclick={onClose} class="btn-icon shrink-0" title="Close modal" aria-label="Close modal">
          <X class="size-5" />
        </button>
      </div>
    </div>

    <div class="">
        <!-- Mobile: Title, Meta Info & Action Buttons -->
        <div class="sm:hidden mb-6 space-y-4">
          <!-- Title -->
          {#if note.is_pinned && !isDeleted}
            <span class="font-mono text-xs font-medium tracking-wide text-accent-text">● PINNED</span>
          {/if}
          <h2
            class="font-display text-title font-semibold {note.is_favorite && !isDeleted ? 'text-accent-text' : 'text-ink'}"
          >
            {note.name || 'Untitled note'}
          </h2>

          <!-- Meta Info (2 lines, no chip style) -->
          <div class="text-code text-ink-muted space-y-1">
            {#if isDeleted && note.deleted_at}
              <div class="flex items-center gap-1.5 text-negative">
                <AlertTriangle class="size-3.5" />
                <span>Deleted {formatDate(note.deleted_at)}</span>
              </div>
            {:else}
              <div class="flex items-center gap-1.5">
                <Calendar class="size-3.5" />
                <span>{formatDate(note.created_at)}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <Clock class="size-3.5" />
                <span>{formatDate(note.updated_at)}</span>
              </div>
            {/if}
            {#if note.files && note.files.length > 0}
              <div class="flex items-center gap-1.5">
                <Paperclip class="size-3.5" />
                <span>{note.files.length} file{note.files.length > 1 ? 's' : ''}</span>
              </div>
            {/if}
          </div>

          <!-- Action Buttons (Mobile) - Grid layout for auto wrap -->
          <div class="grid grid-cols-2 gap-2">
            {#if note.link}
              <button onclick={handleLinkClick} class="btn btn-secondary btn-sm">
                <ExternalLink class="size-4" />
                <span>Open link</span>
              </button>
            {/if}

            <button onclick={handleShare} class="btn btn-secondary btn-sm">
              <Share2 class="size-4" />
              <span>Share</span>
            </button>

            {#if !hideActions}
              {#if isDeleted}
                {#if hasAuthToken && onPermanentDelete}
                  <button onclick={handlePermanentDelete} class="btn btn-secondary btn-sm col-span-2 hover:text-negative">
                    <Trash2 class="size-4" />
                    <span>Delete permanently</span>
                  </button>
                {/if}
              {:else}
                {#if hasAuthToken}
                  {#if onTogglePin}
                    <button onclick={handleTogglePin} class="btn btn-secondary btn-sm">
                      {#if note.is_pinned}
                        <PinOff class="size-4 text-accent-text" />
                        <span>Unpin</span>
                      {:else}
                        <Pin class="size-4" />
                        <span>Pin</span>
                      {/if}
                    </button>
                  {/if}
                  <button onclick={handleEdit} class="btn btn-secondary btn-sm">
                    <Edit class="size-4" />
                    <span>Edit</span>
                  </button>

                  <button onclick={handleDelete} class="btn btn-secondary btn-sm hover:text-negative">
                    <Trash2 class="size-4" />
                    <span>Delete</span>
                  </button>
                {/if}
              {/if}
            {/if}
          </div>
        </div>
        <!-- Link Section -->
        {#if note.link}
          <div class="mb-6 p-4 bg-sunken rounded-md">
          <div class="flex items-center gap-3 mb-3">
            <Link2 class="size-5 text-accent-text flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-label text-ink-muted mb-1">External link</p>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                class="text-body-sm text-accent-text hover:underline truncate block"
              >
                {note.link}
              </a>
            </div>
            <button onclick={handleLinkClick} class="btn btn-primary btn-sm">
              Visit
            </button>
          </div>

          <!-- Link Summarize Section -->
          <div class="mt-4">
            <div class="flex items-center justify-between mb-2">
              <p class="text-body-sm font-semibold text-ink flex items-center gap-1.5">
                <Sparkles class="size-4 text-accent-text" />
                AI summary
              </p>
              {#if poller.status === 'idle' && !poller.summary && hasAuthToken}
                <button
                  onclick={() => poller.retry()}
                  disabled={poller.isRegenerating}
                  class="btn btn-secondary btn-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Regenerate AI summary (may take a few minutes)"
                >
                  {#if poller.isRegenerating}
                    <Loader2 class="size-3.5 animate-spin" />
                    <span>Regenerating...</span>
                  {:else}
                    <RefreshCw class="size-3.5" />
                    <span>Retry</span>
                  {/if}
                </button>
              {/if}
            </div>

            {#if poller.status === 'pending' || (!poller.summary && poller.status === null)}
              <!-- pending, or first fetch in flight -->
              <div class="flex items-center gap-2 text-body-sm text-ink-muted">
                <Loader2 class="size-4 animate-spin text-accent-text" />
                <span>Summarizing…</span>
              </div>
            {:else if poller.summary}
              <!-- done (or have a summary) — preserve bullets/newlines -->
              <p class="text-body-sm text-ink whitespace-pre-wrap break-words">
                {isSummaryFull || poller.summary.length <= 150
                  ? poller.summary
                  : poller.summary.slice(0, 150) + '...'}
              </p>
              {#if poller.summary.length > 150}
                <button
                  onclick={() => (isSummaryFull = !isSummaryFull)}
                  class="quick-btn text-accent-text mt-1"
                >
                  {isSummaryFull ? 'Show less' : 'Show more'}
                </button>
              {/if}
            {:else if poller.status === 'idle'}
              <!-- not ready; retry button (if any) is in the header above -->
              <p class="text-body-sm text-ink-muted italic">
                Summary not ready yet. It will retry automatically.
              </p>
            {:else}
              <!-- done but empty -->
              <p class="text-body-sm text-ink-muted italic">
                No summary available.
              </p>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Images Section -->
      {#if note.files && note.files.filter(f => f?.mime_type?.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3 class="section-title mb-3 flex items-center gap-2">
            <ImageIcon class="size-5 text-accent-text" />
            Images ({note.files.filter(f => f?.mime_type?.startsWith('image/')).length})
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each note.files.filter( f => f?.mime_type?.startsWith('image/') ) as file, index (file.id + '-' + index)}
              <div class="group relative bg-sunken rounded-md overflow-hidden">
                <!-- Image Container -->
                <div class="aspect-square bg-sunken overflow-hidden">
                  <img
                    src={getFileUrl(file)}
                    alt={file.metadata?.alt || file.original_name}
                    class="w-full h-full object-cover"
                    onerror={handleImageError}
                  />
                  <!-- Fallback for broken images -->
                  <div class="hidden w-full h-full bg-sunken flex items-center justify-center">
                    <ImageIcon class="size-12 text-ink-muted" />
                  </div>
                </div>

                <!-- Image Info Overlay -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div class="absolute bottom-0 left-0 right-0 p-3 bg-tile-void/90 text-ink-on-dark">
                    <h3 class="text-body-sm font-medium truncate" title={file.original_name}>
                      {file.metadata?.title || file.original_name}
                    </h3>
                    <div class="flex items-center gap-2 text-code text-ink-on-dark-muted">
                      <span>{formatFileSize(file.size)}</span>
                      {#if file.metadata?.width && file.metadata?.height}
                        <span>•</span>
                        <span>{file.metadata.width} × {file.metadata.height}</span>
                      {/if}
                    </div>
                  </div>
                </div>

                <!-- Image Actions -->
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div class="flex gap-1">
                    <button
                      onclick={() => viewFile(file)}
                      class="btn-icon bg-raised text-ink hover:bg-control-hover"
                      title="View image"
                      aria-label="View image"
                    >
                      <Eye class="size-4" />
                    </button>
                    <button
                      onclick={() => downloadFile(file)}
                      class="btn-icon bg-raised text-ink hover:bg-control-hover"
                      title="Download image"
                      aria-label="Download image"
                    >
                      <Download class="size-4" />
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
          <div class="prose prose-sm max-w-none text-ink">
            {@html note.description}
          </div>
        </div>
      {/if}

      <!-- Other Files Section -->
      {#if note.files && note.files.filter(f => !f?.mime_type?.startsWith('image/')).length > 0}
        <div class="mb-6">
          <h3 class="section-title mb-3 flex items-center gap-2">
            <File class="size-5 text-accent-text" />
            Files ({note.files.filter(f => !f?.mime_type?.startsWith('image/')).length})
          </h3>
          <div class="space-y-3">
            {#each note.files.filter(f => !f?.mime_type?.startsWith('image/')) as file, index (file.id + '-' + index)}
              <div class="flex items-center gap-4 p-4 bg-sunken rounded-md">
                <!-- File Icon -->
                <div class="flex-shrink-0">
                  <div
                    class="size-16 rounded-md flex items-center justify-center {file?.mime_type === 'application/pdf'
                      ? 'bg-tile-violet text-ink-on-dark'
                      : file?.mime_type?.includes('document')
                        ? 'bg-tile-deep text-ink-on-dark'
                        : file?.mime_type?.includes('text')
                          ? 'bg-tile-lilac text-ink-on-bright'
                          : 'bg-control text-ink'}"
                  >
                    <File class="size-8" />
                  </div>
                </div>

                <!-- File Info -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-body font-medium text-ink mb-1 truncate" title={file.original_name}>
                    {file.metadata?.title || file.original_name}
                  </h3>
                  <p class="text-body-sm text-ink-muted mb-2">
                    {file.original_name}
                  </p>
                  <div class="flex items-center gap-4 text-code text-ink-muted">
                    <span class="capitalize">
                      {file?.mime_type?.split('/')[1] || file?.mime_type}
                    </span>
                    <span>{formatFileSize(file.size)}</span>
                    {#if file.metadata?.pages}
                      <span>{file.metadata.pages} pages</span>
                    {/if}
                  </div>

                  {#if file.metadata?.description}
                    <p class="text-body-sm text-ink-muted mt-2 line-clamp-2">
                      {file.metadata.description}
                    </p>
                  {/if}
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-2">
                  <button onclick={() => viewFile(file)} class="btn btn-ghost btn-sm">
                    <Eye class="size-4" />
                    View
                  </button>
                  <button onclick={() => downloadFile(file)} class="btn btn-secondary btn-sm">
                    <Download class="size-4" />
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
              {#if tag.color}
                <Tag>
                  <span class="size-2 rounded-pill" style="background-color: {tag.color}" aria-hidden="true"></span>
                  {tag.name || tag.tag}
                </Tag>
              {:else}
                <Tag dot>{tag.name || tag.tag}</Tag>
              {/if}
            {/each}
          </div>
        </div>
      {/if}

      <!-- Empty State if no content -->
      {#if !note.description && (!note.tags || note.tags.length === 0) && !note.link && (!note.files || note.files.length === 0)}
        <div class="text-center py-12">
          <div class="size-16 bg-sunken rounded-pill flex items-center justify-center mx-auto mb-4">
            <Calendar class="size-8 text-ink-muted" />
          </div>
          <p class="text-body text-ink-muted">No additional content available</p>
        </div>
      {/if}
    </div>
</Modal>
