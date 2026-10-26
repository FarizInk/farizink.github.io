<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    /** Required: becomes aria-label and tooltip. */
    label: string;
    href?: string;
    target?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }
  let { label, href, target, onclick, children }: Props = $props();
  const cls =
    'inline-grid size-11 place-items-center rounded-pill bg-control text-ink no-underline cursor-pointer ' +
    'transition-[background-color,rotate,scale,color] duration-fast ease-spring hover:-rotate-6 hover:bg-tile-violet hover:text-ink-on-dark active:scale-90 [&_svg]:size-5';
</script>

{#if href}
  <a {href} {target} rel={target === '_blank' ? 'noopener' : undefined} aria-label={label} title={label} class={cls}>{@render children()}</a>
{:else}
  <button type="button" aria-label={label} title={label} {onclick} class={cls}>{@render children()}</button>
{/if}
