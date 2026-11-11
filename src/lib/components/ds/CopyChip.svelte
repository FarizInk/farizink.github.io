<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    value: string;
    copiedText?: string;
    resetMs?: number;
    oncopy?: (value: string) => void;
    /** Idle glyph: 'copy' (default) for values, 'mail' for an email address. */
    glyph?: 'copy' | 'mail';
    children?: Snippet;
  }
  let { value, copiedText = 'Copied!', resetMs = 1600, oncopy, glyph = 'copy', children }: Props = $props();
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try { await navigator.clipboard?.writeText(value); } catch { /* clipboard blocked: still confirm */ }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), resetMs);
    oncopy?.(value);
  }
</script>

<button
  type="button"
  onclick={copy}
  title="Click to copy"
  class="inline-flex h-11 cursor-pointer items-center gap-2 rounded-pill bg-control py-0 pr-4 pl-1.5 text-body-sm text-ink transition-[background-color,scale] duration-fast ease-spring hover:bg-control-hover active:scale-[.96]"
>
  <span
    class="grid size-8 place-items-center rounded-pill transition-colors duration-fast {copied ? 'bg-live text-card' : 'bg-accent text-ink-on-accent'}"
    aria-hidden="true"
  >
    {#if copied}
      <svg viewBox="0 0 24 24" class="fz-pop-icon size-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
    {:else if glyph === 'mail'}
      <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>
    {:else}
      <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
    {/if}
  </span>
  <span aria-live="polite">{#if copied}{copiedText}{:else if children}{@render children()}{:else}{value}{/if}</span>
</button>
