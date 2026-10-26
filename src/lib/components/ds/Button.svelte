<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'md' | 'sm';
    href?: string;
    icon?: Snippet;
    /** Trailing icon that nudges 2px toward the action on hover. */
    iconRight?: Snippet;
    children: Snippet;
  }
  let { variant = 'primary', size = 'md', href, icon, iconRight, children, class: klass = '', ...rest }: Props = $props();

  const variants = {
    primary: 'bg-accent text-ink-on-accent hover:bg-accent-hover',
    secondary: 'bg-control text-ink hover:bg-control-hover',
    ghost: 'bg-transparent text-ink hover:bg-control'
  };
  const cls = $derived(
    [
      'inline-flex items-center justify-center gap-2 rounded-pill text-body-sm no-underline cursor-pointer',
      'transition-[background-color,scale] duration-fast ease-spring active:scale-[.96]',
      'disabled:cursor-not-allowed disabled:opacity-45',
      size === 'sm' ? 'h-9 px-4' : 'h-11 px-6',
      variants[variant],
      klass
    ].join(' ')
  );
</script>

{#if href}
  <a {href} class={cls}>{@render icon?.()}{@render children()}{#if iconRight}<span class="fz-nudge">{@render iconRight()}</span>{/if}</a>
{:else}
  <button type="button" class={cls} {...rest}>{@render icon?.()}{@render children()}{#if iconRight}<span class="fz-nudge">{@render iconRight()}</span>{/if}</button>
{/if}
