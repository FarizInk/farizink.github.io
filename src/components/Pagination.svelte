<script lang="ts">
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  let {
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    showPageNumbers = true,
    maxVisiblePages = 5
  } = $props<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showPageNumbers?: boolean;
    maxVisiblePages?: number;
  }>();

  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePageClick(page: number) {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }

  // Generate visible page numbers with ellipsis
  const getVisiblePages = () => {
    if (!showPageNumbers || totalPages <= 1 || totalPages <= maxVisiblePages) {
      return Array.from({ length: Math.max(0, totalPages) }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  function canGoPrevious() {
    return currentPage > 1;
  }

  function canGoNext() {
    return currentPage < totalPages;
  }
</script>

{#if totalPages > 1}
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        onclick={handlePrevious}
        disabled={!canGoPrevious()}
        class="btn btn-sm btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous page"
      >
        <ChevronLeft class="w-4 h-4" />
        Previous
      </button>

      <!-- Page Numbers -->
      {#if showPageNumbers}
        <div class="flex items-center gap-1">
          {#each getVisiblePages() as page (page)}
            {#if page === '...'}
              <span class="px-3 py-1 text-secondary-500 dark:text-secondary-400">...</span>
            {:else}
              <button
                onclick={() => handlePageClick(page as number)}
                class="w-8 h-8 rounded-lg {page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800'} transition-colors"
                title={`Go to page ${page}`}
              >
                {page}
              </button>
            {/if}
          {/each}
        </div>
      {/if}

      <!-- Next Button -->
      <button
        onclick={handleNext}
        disabled={!canGoNext()}
        class="btn btn-sm btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next page"
      >
        Next
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
{/if}
