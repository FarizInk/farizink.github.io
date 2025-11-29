<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate } from '../lib/notes';
  import { Pencil, Trash2, Link2, Calendar, Tag } from '@lucide/svelte';

  let { note, onEdit, onDelete, hasAuthToken, onShowDetail } = $props<{
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    onShowDetail?: (note: Note) => void;
  }>();

  function handleEdit() {
    onEdit?.(note);
  }

  function handleDelete() {
    onDelete?.(note);
  }

  function handleShowDetail() {
    onShowDetail?.(note);
  }

  function truncateText(text: string | null, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  function truncateTitle(text: string | null, maxLength: number = 50): string {
    if (!text) return 'Untitled Note';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
</script>

<div
  class="card card-hover !p-6 group relative overflow-hidden cursor-pointer {!note.isPublic ? 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/20 border-2 border-primary-300 dark:border-primary-500 shadow-lg' : ''}"
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
  {#if note.isFavorite}
    <div
      class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"
    ></div>
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

    <!-- Description Section -->
    {#if note.description}
      <p
        class="text-secondary-600 dark:text-secondary-300 text-base leading-relaxed mb-4 line-clamp-3"
      >
        {truncateText(note.description, 200)}
      </p>
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
      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4" />
        <span>{formatDate(note.createdAt)}</span>
      </div>

      <!-- Action Buttons in Footer -->
      <div class="flex items-center gap-2">
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
