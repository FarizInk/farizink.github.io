<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tileClass, type TileTone } from './tones';
  interface Props {
    name: string;
    description: string;
    href: string;
    mark?: Snippet;
    tone?: TileTone;
    status?: 'up' | 'down' | 'unknown';
  }
  let { name, description, href, mark, tone = 'deep', status = 'unknown' }: Props = $props();
  const dot = { up: 'bg-live', down: 'bg-negative', unknown: 'bg-ink-muted' };
  const text = { up: 'UP', down: 'DOWN', unknown: '—' };
</script>

<a
  {href}
  target="_blank"
  rel="noopener"
  class="flex items-center gap-3 rounded-lg bg-card p-4 text-ink no-underline transition-[translate,scale,box-shadow] duration-base ease-soft hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:scale-[.985]"
>
  <span class="grid size-10 flex-none place-items-center rounded-md font-display text-base font-bold {tileClass[tone]}">
    {#if mark}{@render mark()}{:else}{name.charAt(0)}{/if}
  </span>
  <span class="min-w-0">
    <span class="block text-[15px] leading-5 font-semibold">{name}</span>
    <span class="block text-[13px] leading-[18px] text-ink-muted">{description}</span>
  </span>
  {#if status !== 'unknown'}
    <span class="ml-auto flex items-center gap-2 font-mono text-xs font-medium text-ink-muted">
      <span class="size-2 rounded-pill {dot[status]}"></span>{text[status]}
    </span>
  {/if}
</a>
