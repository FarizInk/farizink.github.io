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
  import { ChevronLeft } from '@lucide/svelte';
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
      <div class="mx-auto flex max-w-[1120px] flex-col pt-16 pb-12">
        <div class="flex items-center gap-3">
          <span class="btn btn-secondary btn-sm"><ChevronLeft class="size-4" /> All tools</span>
          <span class="text-label text-ink-muted">Home · Tools · Tool title</span>
        </div>
        <div class="flex flex-col items-start gap-3 py-8">
          <span class="size-14 rounded-md bg-tile-deep text-ink-on-dark"></span>
          <span class="h-7 w-28 rounded-pill bg-tile-deep text-ink-on-dark"></span>
          <h1 class="text-display m-0">Tool title</h1>
          <p class="text-body-lg m-0 text-ink-muted">A short tool description for layout capture.</p>
        </div>
        <div class="flex flex-col gap-4">
          <div class="card space-y-3">
            <div class="h-6 w-1/3 rounded-md bg-sunken"></div>
            <div class="h-4 w-full rounded-md bg-sunken"></div>
            <div class="h-4 w-3/5 rounded-md bg-sunken"></div>
          </div>
          <div class="card space-y-3">
            <div class="h-6 w-1/4 rounded-md bg-sunken"></div>
            <div class="h-10 w-full rounded-md bg-sunken"></div>
            <div class="h-4 w-2/5 rounded-md bg-sunken"></div>
          </div>
        </div>
      </div>
    </Skeleton>

    <!-- Generic content shell — for non-tool routes (Notes, Finance, etc.) -->
    <Skeleton name="route-content" loading={true}>
      <div class="mx-auto max-w-[1120px] space-y-6 pt-16 pb-12">
        <div class="space-y-3 py-8">
          <div class="h-10 w-2/5 rounded-md bg-sunken"></div>
          <div class="h-5 w-3/5 rounded-md bg-sunken"></div>
        </div>
        <div class="card space-y-3">
          <div class="h-6 w-1/3 rounded-md bg-sunken"></div>
          <div class="h-4 w-full rounded-md bg-sunken"></div>
          <div class="h-4 w-4/5 rounded-md bg-sunken"></div>
        </div>
        <div class="card space-y-3">
          <div class="h-6 w-1/4 rounded-md bg-sunken"></div>
          <div class="h-10 w-full rounded-md bg-sunken"></div>
        </div>
      </div>
    </Skeleton>
  </div>
{/if}