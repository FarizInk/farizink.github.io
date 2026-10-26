<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props { code?: string; title: string; text?: string; actions?: Snippet }
  let { code, title, text, actions }: Props = $props();
</script>

<div class="flex flex-col items-center gap-3 px-6 py-12 text-center">
  {#if code}<span class="font-display text-[96px] leading-[88px] font-bold tracking-tighter text-accent-text">{code}</span>{/if}
  <h2 class="text-title m-0">{title}</h2>
  {#if text}<p class="m-0 max-w-[420px] text-ink-muted">{text}</p>{/if}
  {#if actions}<div class="mt-2 flex flex-wrap justify-center gap-3">{@render actions()}</div>{/if}
</div>
