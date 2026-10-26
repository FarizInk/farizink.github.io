<script lang="ts">
  import type { Snippet } from 'svelte';
  import { toneClass, labelClass, colSpanClass, rowSpanClass, type Tone } from './tones';

  interface Props {
    tone?: Tone;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    label?: string;
    title?: string;
    size?: 'md' | 'lg';
    href?: string;
    target?: string;
    /** Makes the card a button (same hover-lift as href). */
    onclick?: (e: MouseEvent) => void;
    class?: string;
    children?: Snippet;
  }
  let { tone = 'surface', colSpan = 1, rowSpan = 1, label, title, size = 'md', href, target, onclick, class: klass = '', children }: Props = $props();

  const cls = $derived(
    [
      'relative flex min-w-0 flex-col gap-3 rounded-lg no-underline',
      'transition-[translate,scale,box-shadow] duration-base ease-soft',
      size === 'lg' ? 'p-8' : 'p-6',
      toneClass[tone],
      colSpanClass[colSpan],
      rowSpanClass[rowSpan],
      href || onclick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[.985] active:duration-fast' : '',
      klass
    ].join(' ')
  );
</script>

{#snippet body()}
  {#if label}<span class="text-label {labelClass[tone]}">{label}</span>{/if}
  {#if title}<h3 class="text-title m-0">{title}</h3>{/if}
  {@render children?.()}
{/snippet}

{#if href}
  <a {href} {target} rel={target === '_blank' ? 'noopener' : undefined} class={cls}>{@render body()}</a>
{:else if onclick}
  <button type="button" {onclick} class="{cls} w-full text-left">{@render body()}</button>
{:else}
  <section class={cls}>{@render body()}</section>
{/if}
