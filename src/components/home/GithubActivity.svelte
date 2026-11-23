<!-- GitHub tile: 30-day public activity strip + the latest few events. Public API, no token, cached 10 min. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUpRight } from '@lucide/svelte';
  import { BentoCard, Skeleton } from '$lib/components/ds';
  import LoadingDelay from '../skeletons/LoadingDelay.svelte';
  import { relativeTime } from '../../lib/diary';
  import {
    GITHUB_EVENTS_URL,
    GITHUB_PROFILE_URL,
    GITHUB_USER,
    toSlim,
    summarize,
    level,
    readCache,
    writeCache,
    type SlimEvent
  } from '../../lib/github';

  const DAYS = 30;
  const levelClass = [
    'bg-ink-on-dark/10',
    'bg-ink-on-dark/35',
    'bg-ink-on-dark/55',
    'bg-ink-on-dark/75',
    'bg-ink-on-dark'
  ];

  let events = $state<SlimEvent[]>([]);
  let phase = $state<'loading' | 'ready' | 'error'>('loading');
  const now = new Date();

  const activity = $derived(summarize(events, now, DAYS));
  const stripLabel = $derived(
    `${activity.total} public ${activity.total === 1 ? 'event' : 'events'} on GitHub in the last ${DAYS} days`
  );

  function dayLabel(index: number, count: number): string {
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (DAYS - 1 - index)
    ).toLocaleDateString('en', { month: 'short', day: 'numeric' });
    return `${date}: ${count} ${count === 1 ? 'event' : 'events'}`;
  }

  onMount(() => {
    let storage: Storage | null = null;
    try {
      storage = window.localStorage;
    } catch {
      storage = null;
    }

    const cached = storage ? readCache(storage) : null;
    if (cached) {
      events = cached.events;
      phase = 'ready';
      if (cached.fresh) return;
    }

    const controller = new AbortController();
    fetch(GITHUB_EVENTS_URL, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    })
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`GitHub ${res.status}`))))
      .then(raw => {
        const slim = toSlim(raw);
        events = slim;
        phase = 'ready';
        if (storage) writeCache(storage, slim);
      })
      .catch(() => {
        // Keep showing stale cache (e.g. rate-limited); only error when there's nothing at all.
        if (!controller.signal.aborted && !cached) phase = 'error';
      });

    return () => controller.abort();
  });
</script>

<BentoCard tone="violet" colSpan={2}>
  <div class="flex items-center justify-between gap-3">
    <span class="text-label text-ink-on-dark">GitHub</span>
    <a
      href={GITHUB_PROFILE_URL}
      target="_blank"
      rel="noopener"
      class="text-body-sm inline-flex items-center gap-1 text-ink-on-dark no-underline hover:underline"
    >
      @{GITHUB_USER}<ArrowUpRight class="size-4" aria-hidden="true" />
    </a>
  </div>

  {#if phase === 'loading'}
    <LoadingDelay label="Loading GitHub activity" class="flex flex-col gap-4">
      <Skeleton height={24} />
      <Skeleton variant="text" lines={3} />
    </LoadingDelay>
  {:else if phase === 'error'}
    <p class="text-body-sm m-0 mt-auto font-normal text-ink-on-dark-muted">
      Couldn't load activity right now — it's all on the profile.
    </p>
  {:else}
    <div class="flex flex-col gap-2">
      <div class="flex gap-1" role="img" aria-label={stripLabel}>
        {#each activity.days as count, i (i)}
          <span
            class="h-6 min-w-0 flex-1 rounded-[3px] {levelClass[level(count)]}"
            title={dayLabel(i, count)}
          ></span>
        {/each}
      </div>
      <p class="text-code m-0 text-ink-on-dark-muted" aria-hidden="true">
        {activity.total} public {activity.total === 1 ? 'event' : 'events'} · last {DAYS} days
      </p>
    </div>

    {#if activity.items.length}
      <ul class="m-0 mt-auto flex list-none flex-col gap-1.5 p-0">
        {#each activity.items as item (item.at + item.repo)}
          <li class="text-body-sm flex min-w-0 items-baseline gap-2 font-normal">
            <span class="min-w-0 truncate">
              {item.verb}
              <a
                href={item.url}
                target="_blank"
                rel="noopener"
                class="font-semibold text-ink-on-dark no-underline hover:underline"
              >
                {item.repo}
              </a>
            </span>
            <time datetime={item.at} class="ml-auto flex-none text-code text-ink-on-dark-muted">
              {relativeTime(item.at, now)}
            </time>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-body-sm m-0 mt-auto font-normal text-ink-on-dark-muted">
        No public activity lately.
      </p>
    {/if}
  {/if}
</BentoCard>
