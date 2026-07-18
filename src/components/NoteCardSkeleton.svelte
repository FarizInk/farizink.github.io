<script lang="ts">
  let { withPreview = true }: { withPreview?: boolean } = $props();
</script>

<div
  class="card !p-6 overflow-hidden border border-secondary-200 bg-white/90 dark:border-secondary-700 dark:bg-secondary-900/90"
  aria-hidden="true"
>
  <div class="animate-pulse space-y-4">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1 space-y-3">
        <div class="h-6 w-2/3 rounded bg-secondary-200 dark:bg-secondary-700"></div>
        <div class="h-4 w-4/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
      </div>
      <div class="h-8 w-8 shrink-0 rounded-lg bg-secondary-200 dark:bg-secondary-700"></div>
    </div>

    {#if withPreview}
      <div class="h-40 w-full rounded-lg bg-secondary-200 dark:bg-secondary-800"></div>
    {/if}

    <div class="space-y-2">
      <div class="h-3 w-full rounded bg-secondary-100 dark:bg-secondary-800"></div>
      <div class="h-3 w-3/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
    </div>

    <div class="flex items-center justify-between border-t border-secondary-100 pt-4 dark:border-secondary-800">
      <div class="h-3 w-24 rounded bg-secondary-100 dark:bg-secondary-800"></div>
      <div class="flex gap-2">
        <div class="h-8 w-8 rounded-lg bg-secondary-200 dark:bg-secondary-700"></div>
        <div class="h-8 w-8 rounded-lg bg-secondary-200 dark:bg-secondary-700"></div>
        <div class="h-8 w-8 rounded-lg bg-secondary-200 dark:bg-secondary-700"></div>
      </div>
    </div>
  </div>
</div>
