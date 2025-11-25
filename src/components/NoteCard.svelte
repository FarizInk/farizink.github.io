<script lang="ts">
  import type { Note } from '../lib/notes';
  import { formatDate } from '../lib/notes';
  import { Pencil, Trash2, Star, Link2, Calendar, Tag } from '@lucide/svelte';

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
  class="card card-hover !p-2 group relative overflow-hidden cursor-pointer"
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

  <!-- Compact Card Content -->
  <div class="relative pl-2.5 py-1.5">
    <!-- Compact Header Section -->
    <div class="flex items-start justify-between mb-1">
      <div class="flex-1 min-w-0 pr-2">
        {#if note.name}
          <h3
            class="text-base font-semibold text-secondary-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-200"
            title={note.name}
          >
            {truncateTitle(note.name)}
          </h3>
        {/if}

        {#if note.link}
          <div class="flex items-center gap-1 mt-0.5">
            <Link2 class="w-2.5 h-2.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <a
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-blue-700 dark:text-blue-300 truncate hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer"
              title={note.link}
            >
              {truncateText(note.link, 25)}
            </a>
          </div>
        {/if}
      </div>

      <!-- Compact Actions -->
      <div
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <!-- Favorite indicator -->
        {#if note.isFavorite}
          <div
            class="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 flex items-center justify-center shadow-sm"
          >
            <Star
              class="w-3 h-3 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400"
            />
          </div>
        {/if}

        <!-- Edit and Delete buttons - Only show when authenticated -->
        {#if hasAuthToken}
          <button
            onclick={e => {
              e.stopPropagation();
              handleEdit();
            }}
            class="w-5 h-5 rounded-md bg-white dark:bg-secondary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            title="Edit note"
          >
            <Pencil
              class="w-2.5 h-2.5 text-secondary-600 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"
            />
          </button>

          <button
            onclick={e => {
              e.stopPropagation();
              handleDelete();
            }}
            class="w-5 h-5 rounded-md bg-white dark:bg-secondary-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-secondary-200 dark:border-secondary-600 hover:border-red-300 dark:hover:border-red-600 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            title="Delete note"
          >
            <Trash2
              class="w-2.5 h-2.5 text-secondary-600 dark:text-secondary-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
            />
          </button>
        {/if}
      </div>
    </div>

    <!-- Compact Description -->
    {#if note.description}
      <p
        class="text-secondary-600 dark:text-secondary-300 text-sm leading-relaxed mb-1 line-clamp-2"
      >
        {truncateText(note.description, 100)}
      </p>
    {/if}

    <!-- Compact Tags Section -->
    {#if note.tags && note.tags.length > 0}
      <div class="flex flex-wrap gap-0.5 mb-1">
        {#each note.tags.slice(0, 3) as tag (tag)}
          <div
            class="tag-group flex items-center gap-0.5 px-1 py-0.5 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-700 transition-all duration-200"
          >
            <Tag
              class="w-2 h-2 text-primary-600 dark:text-primary-400 tag-hover-scale transition-transform duration-200"
            />
            <span class="text-xs font-medium text-primary-700 dark:text-primary-300">{tag}</span>
          </div>
        {/each}
        {#if note.tags.length > 3}
          <div
            class="px-1 py-0.5 bg-secondary-100 dark:bg-secondary-700 rounded-full text-xs text-secondary-600 dark:text-secondary-300"
          >
            +{note.tags.length - 3}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Compact Footer Section -->
    <div
      class="flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-400"
    >
      <div class="flex items-center gap-1">
        <Calendar class="w-3 h-3" />
        <span>{formatDate(note.createdAt)}</span>
      </div>

      <div class="flex items-center gap-2">
        {#if hasAuthToken}
          {#if note.isPublic}
            <div
              class="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800"
            >
              <div class="w-1 h-1 bg-green-500 dark:bg-green-400 rounded-full"></div>
              <span class="text-xs font-medium text-green-700 dark:text-green-300">Public</span>
            </div>
          {:else}
            <div
              class="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-900/20 rounded-full border border-gray-200 dark:border-gray-800"
            >
              <div class="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Private</span>
            </div>
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
