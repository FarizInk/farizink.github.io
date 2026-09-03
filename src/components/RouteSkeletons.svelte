<!--
  Dev-only capture block for route-loading skeletons.

  Boneyard captures layouts by snapshotting rendered <Skeleton> content in a
  headless browser. Route lazy-load skeletons can't be captured from the real
  destination page (it isn't loaded yet), so this component renders two
  representative shells during dev for boneyard to snapshot:
    - "route-tool": a ToolLayout shell (used for /tools/* transitions)
    - "route-content": a generic content shell (used for other routes)

  This block is hidden (display:none) and only mounted in dev — at runtime the
  generated bones are loaded from src/bones/registry, so this component never
  ships to production in a meaningful way (import.meta.env.DEV is false in prod
  builds and tree-shaken).
-->
<script lang="ts">
  import Skeleton from 'boneyard-js/svelte';
  import { ChevronLeft, Home, ArrowRight } from '@lucide/svelte';
</script>

{#if import.meta.env.DEV}
  <!-- Off-screen (not display:none) so elements keep layout for boneyard to
       snapshot, but remain invisible to users during dev. -->
  <div
    aria-hidden="true"
    data-boneyard-capture
    style="position:fixed; top:0; left:-99999px; width:100vw; pointer-events:none; opacity:0;"
  >
    <!-- Tool shell — mirrors ToolLayout structure -->
    <Skeleton name="route-tool" loading={true}>
      <div class="tool-layout">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
              <ChevronLeft class="w-4 h-4" />
              <span>Back to Tools</span>
            </div>
          </div>
          <div class="tool-hero text-center relative flex flex-col items-center">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="tool-title !mb-0">
                <span class="title-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500">
                  Tool Title
                </span>
              </h1>
            </div>
            <p class="tool-description max-w-xl">A short tool description for layout capture.</p>
          </div>
          <nav class="mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <li class="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Home class="w-3.5 h-3.5" />
                <span class="hidden sm:inline">Home</span>
              </li>
              <ArrowRight class="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
              <li class="text-gray-500 dark:text-gray-400">Tools</li>
              <ArrowRight class="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
              <li class="text-gray-900 dark:text-white font-medium">Current Tool</li>
            </ol>
          </nav>
          <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-dot bg-purple-50 dark:bg-primary-900/20"></div>
            <div class="divider-line"></div>
          </div>
          <div class="tool-content">
            <div class="max-w-2xl mx-auto space-y-4">
              <div class="card p-6 space-y-3">
                <div class="h-6 w-1/3 rounded bg-secondary-200 dark:bg-secondary-700"></div>
                <div class="h-4 w-full rounded bg-secondary-100 dark:bg-secondary-800"></div>
                <div class="h-4 w-3/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
              </div>
              <div class="card p-6 space-y-3">
                <div class="h-6 w-1/4 rounded bg-secondary-200 dark:bg-secondary-700"></div>
                <div class="h-10 w-full rounded bg-secondary-100 dark:bg-secondary-800"></div>
                <div class="h-4 w-2/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>

    <!-- Generic content shell — for non-tool routes (Notes, Finance, etc.) -->
    <Skeleton name="route-content" loading={true}>
      <div class="max-w-4xl mx-auto py-8 space-y-6">
        <div class="space-y-2">
          <div class="h-8 w-2/5 rounded bg-secondary-200 dark:bg-secondary-700"></div>
          <div class="h-4 w-3/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
        </div>
        <div class="card p-6 space-y-3">
          <div class="h-6 w-1/3 rounded bg-secondary-200 dark:bg-secondary-700"></div>
          <div class="h-4 w-full rounded bg-secondary-100 dark:bg-secondary-800"></div>
          <div class="h-4 w-4/5 rounded bg-secondary-100 dark:bg-secondary-800"></div>
        </div>
        <div class="card p-6 space-y-3">
          <div class="h-6 w-1/4 rounded bg-secondary-200 dark:bg-secondary-700"></div>
          <div class="h-10 w-full rounded bg-secondary-100 dark:bg-secondary-800"></div>
        </div>
      </div>
    </Skeleton>
  </div>
{/if}