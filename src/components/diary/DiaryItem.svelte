<script lang="ts">
  import { Globe, Lock } from '@lucide/svelte';
  import type { Note } from '../../lib/notes';
  import { excerpt, relativeTime } from '../../lib/diary';

  interface Props {
    note: Note;
    onedit: (note: Note) => void;
  }
  let { note, onedit }: Props = $props();

  const preview = $derived(excerpt(note.description));
  const shownTags = $derived(note.tags.slice(0, 2));
</script>

<button
  type="button"
  onclick={() => onedit(note)}
  class="flex w-full flex-col gap-1.5 rounded-lg bg-card p-4 text-left text-ink transition-[background-color,scale] duration-fast ease-spring hover:bg-control active:scale-[.985]"
>
  <span class="text-body font-semibold break-words">{note.name || 'Untitled'}</span>
  {#if preview}
    <span class="line-clamp-2 text-body-sm font-normal text-ink-muted">{preview}</span>
  {/if}
  <span class="flex flex-wrap items-center gap-2 text-code text-ink-muted">
    <time datetime={note.created_at} title={new Date(note.created_at).toLocaleString()}>
      {relativeTime(note.created_at)}
    </time>
    {#if note.is_public}
      <Globe class="size-3.5" aria-hidden="true" /><span class="sr-only">Public</span>
    {:else}
      <Lock class="size-3.5" aria-hidden="true" /><span class="sr-only">Private</span>
    {/if}
    {#each shownTags as tag (tag.id)}
      <span class="rounded-pill bg-control px-2 py-0.5 text-xs">{tag.name || tag.tag}</span>
    {/each}
  </span>
</button>
