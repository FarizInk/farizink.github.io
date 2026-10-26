<script lang="ts">
  import BentoCard from './BentoCard.svelte';
  import Tag from './Tag.svelte';
  interface Props {
    title: string;
    excerpt?: string;
    labels?: string[];
    date: string;
    attachments?: number;
    pinned?: boolean;
    href?: string;
    onclick?: (e: MouseEvent) => void;
  }
  let { title, excerpt, labels = [], date, attachments = 0, pinned = false, href, onclick }: Props = $props();
</script>

<BentoCard {href} {onclick}>
  {#if pinned}<span class="font-mono text-xs font-medium tracking-wide text-accent-text">● PINNED</span>{/if}
  <h3 class="m-0 font-display text-lg leading-6 font-semibold">{title}</h3>
  {#if excerpt}<p class="m-0 line-clamp-3 text-body-sm font-normal text-ink-muted">{excerpt}</p>{/if}
  {#if labels.length}
    <div class="flex flex-wrap gap-2">{#each labels as l (l)}<Tag dot>{l}</Tag>{/each}</div>
  {/if}
  <div class="mt-auto flex items-center justify-between pt-2 text-code text-ink-muted">
    <span>{date}</span>
    {#if attachments}<span>{attachments} {attachments > 1 ? 'files' : 'file'}</span>{/if}
  </div>
</BentoCard>
