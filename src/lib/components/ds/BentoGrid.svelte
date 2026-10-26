<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, enter = true, class: klass = '' }: { children: Snippet; /** Tiles rise in order once on mount. */ enter?: boolean; class?: string } = $props();
</script>

<!-- 4 columns ≥768px, 2 below; gap space-4 / space-3 -->
<div class="grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 {enter ? 'fz-enter' : ''} {klass}">
  {@render children()}
</div>
