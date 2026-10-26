<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tileClass, type TileTone } from './tones';
  interface Props {
    title: string;
    /** Last word, rendered in accent-text (replaces the old two-tone title). */
    highlight?: string;
    subtitle?: string;
    badge?: string | Snippet;
    align?: 'start' | 'center';
    /** Optional 24px stroke icon shown in a tile square above the title. */
    icon?: Snippet;
    iconTone?: TileTone;
  }
  let { title, highlight, subtitle, badge, align = 'start', icon, iconTone = 'violet' }: Props = $props();
</script>

<header class="flex flex-col gap-3 py-8 {align === 'center' ? 'items-center px-6 text-center' : 'items-start'}">
  {#if icon}
    <span class="mb-1 grid size-14 place-items-center rounded-md [&_svg]:size-6 {tileClass[iconTone]}">{@render icon()}</span>
  {/if}
  {#if badge}
    <span class="inline-flex h-7 items-center gap-1.5 rounded-pill bg-tile-violet px-3 font-mono text-xs font-medium tracking-wide text-ink-on-dark">
      {#if typeof badge === 'string'}{badge}{:else}{@render badge()}{/if}
    </span>
  {/if}
  <h1 class="text-display m-0 max-sm:text-[32px] max-sm:leading-9">{title}{#if highlight}<span class="text-accent-text">{' ' + highlight}</span>{/if}</h1>
  {#if subtitle}<p class="text-body-lg m-0 max-w-[560px] text-ink-muted">{subtitle}</p>{/if}
</header>
