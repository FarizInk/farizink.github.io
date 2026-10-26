<script lang="ts">
  import type { Snippet } from 'svelte';
  let { tone = 'neutral', dot = false, children }: { tone?: 'neutral' | 'accent'; dot?: boolean; children: Snippet } = $props();
</script>

<span class="inline-flex h-7 items-center gap-1.5 rounded-pill px-3 text-code {tone === 'accent' ? 'bg-tile-lilac text-ink-on-bright' : 'bg-sunken text-ink'}">
  {#if dot}<span class="size-2 rounded-pill bg-accent" aria-hidden="true"></span>{/if}
  {@render children()}
</span>
