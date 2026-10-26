<script lang="ts">
  import BentoCard from './BentoCard.svelte';
  interface Props {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    albumArt?: string;
    /** seconds */
    progress?: number;
    /** seconds */
    duration?: number;
    href?: string;
    colSpan?: 1 | 2 | 3 | 4;
  }
  let { isPlaying, title, artist, albumArt, progress = 0, duration = 0, href, colSpan = 2 }: Props = $props();

  const pct = $derived(duration ? Math.min(100, (progress / duration) * 100) : 0);
  const fmt = (s: number) => {
    s = Math.max(0, Math.floor(s));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };
</script>

<BentoCard tone="void" {colSpan} label="Now playing" {href} target="_blank">
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      {#if albumArt}
        <img src={albumArt} alt="" class="size-16 flex-none rounded-sm object-cover" />
      {:else}
        <div class="size-16 flex-none rounded-sm bg-ink-on-dark-muted" aria-hidden="true"></div>
      {/if}
      <div class="min-w-0">
        <p class="m-0 truncate text-body font-semibold">{isPlaying ? title : 'Not playing'}</p>
        <p class="m-0 text-body-sm font-normal text-ink-on-dark-muted">{isPlaying ? artist : 'No music playing right now'}</p>
      </div>
    </div>
    <div
      class="h-1.5 overflow-hidden rounded-pill bg-ink-on-dark/15"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div class="h-full rounded-pill bg-accent transition-[width] duration-slow ease-smooth" style="width: {pct}%"></div>
    </div>
    <div class="flex items-center justify-between text-code text-ink-on-dark-muted">
      <span class="inline-flex items-center gap-2">
        <span class="size-2 rounded-pill {isPlaying ? 'bg-live shadow-[0_0_0_4px_color-mix(in_oklab,var(--live)_20%,transparent)]' : 'bg-ink-on-dark-muted'}"></span>
        {isPlaying ? 'Playing' : 'Idle'}
      </span>
      <span>{isPlaying ? `${fmt(progress)} / ${fmt(duration)}` : '--:--'}</span>
    </div>
  </div>
</BentoCard>
