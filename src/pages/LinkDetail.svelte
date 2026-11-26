<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { ChevronLeft, Pencil, Trash2, Loader2, ExternalLink, RefreshCw } from '@lucide/svelte';
  import { Button, CopyChip, EmptyState, Modal, Segmented, StatTile, Switch, Skeleton as Shimmer } from '$lib/components/ds';
  import LoadingDelay from '../components/skeletons/LoadingDelay.svelte';
  import StatTileSkeleton from '../components/skeletons/StatTileSkeleton.svelte';
  import LinkFormModal from '../components/links/LinkFormModal.svelte';
  import LinkStatusBadge from '../components/links/LinkStatusBadge.svelte';
  import ClicksChart from '../components/links/ClicksChart.svelte';
  import RankedList from '../components/links/RankedList.svelte';
  import { getCurrentRouterState, navigate } from '../lib/router';
  import {
    getLink,
    getLinkStats,
    toggleLink,
    deleteLink,
    describeError,
    displayTitle,
    linkStatus,
    countryName,
    formatCount,
    formatDate,
    formatDateTime,
    relativeFrom,
    listHref,
    type Link,
    type LinkStats,
    type LinksError,
    type StatsRange
  } from '../lib/links';

  const RANGES: { value: StatsRange; label: string }[] = [
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: 'all', label: 'All' }
  ];

  // Auth
  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);

  const id = getCurrentRouterState().params.id ?? '';
  const backHref = listHref();

  let link = $state<Link | null>(null);
  let linkError = $state<LinksError | null>(null);

  let range = $state<StatsRange>('30d');
  let stats = $state<LinkStats | null>(null);
  let statsLoading = $state(false);
  let statsError = $state<LinksError | null>(null);
  let statsRun = 0;

  let active = $state(false);
  let toggling = $state(false);
  let editOpen = $state(false);
  let deleteOpen = $state(false);
  let deleting = $state(false);

  const status = $derived(link ? linkStatus(link) : 'active');
  const shortLabel = $derived(link ? link.short_url.replace(/^https?:\/\//, '') : '');

  onMount(() => {
    const r = new URLSearchParams(window.location.search).get('range');
    if (r && RANGES.some(x => x.value === r)) range = r as StatsRange;

    hasAuthToken = !!localStorage.getItem('authToken');
    isCheckingAuth = false;
    if (hasAuthToken) loadAll();

    const onAuthChange = () => {
      const had = hasAuthToken;
      hasAuthToken = !!localStorage.getItem('authToken');
      if (hasAuthToken && !had) loadAll();
      if (!hasAuthToken) {
        link = stats = null;
        editOpen = deleteOpen = false;
      }
    };
    document.addEventListener('login-success', onAuthChange);
    document.addEventListener('logout-success', onAuthChange);
    return () => {
      document.removeEventListener('login-success', onAuthChange);
      document.removeEventListener('logout-success', onAuthChange);
    };
  });

  function loadAll() {
    loadLink();
    loadStats();
  }

  async function loadLink() {
    linkError = null;
    try {
      link = await getLink(id);
      active = link.is_active;
    } catch (err) {
      linkError = describeError(err);
    }
  }

  async function loadStats() {
    const run = ++statsRun;
    statsLoading = true;
    statsError = null;
    try {
      const res = await getLinkStats(id, range);
      if (run === statsRun) stats = res;
    } catch (err) {
      if (run === statsRun) statsError = describeError(err);
    } finally {
      if (run === statsRun) statsLoading = false;
    }
  }

  function setRange(r: string) {
    range = r as StatsRange;
    const url = new URL(window.location.href);
    if (range === '30d') url.searchParams.delete('range');
    else url.searchParams.set('range', range);
    window.history.replaceState(null, '', url.pathname + url.search);
    loadStats();
  }

  async function onToggle(wanted: boolean) {
    if (!link || toggling) return;
    toggling = true;
    try {
      link = await toggleLink(link.id);
      active = link.is_active;
      if (active !== wanted) {
        // Someone flipped it elsewhere in between; the server state wins.
        toast.info(active ? 'The link was already off — it’s on now.' : 'The link was already on — it’s off now.');
      }
    } catch (err) {
      active = !wanted;
      toast.error(describeError(err).message);
    } finally {
      toggling = false;
    }
  }

  async function onDelete() {
    if (!link || deleting) return;
    deleting = true;
    try {
      await deleteLink(link.id);
      toast.success(`Deleted ${shortLabel}`);
      deleteOpen = false;
      navigate(backHref);
    } catch (err) {
      toast.error(describeError(err).message);
    } finally {
      deleting = false;
    }
  }

  const countryLabel = (code: string) => (code === 'Unknown' ? 'Unknown' : countryName(code));
</script>

<svelte:head>
  <title>{link ? `${displayTitle(link)} - Links` : 'Link - Fariz'}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="mx-auto max-w-[1120px] pt-16 pb-12">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="size-12 animate-spin rounded-pill border-4 border-control border-t-accent"></div>
    </div>
  {:else if !hasAuthToken}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState title="Login required" text="Short links are managed from the admin account. Log in to see this one.">
        {#snippet actions()}
          <Button onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}>Log in</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else if linkError?.kind === 'forbidden'}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState title="Admins only" text="You’re logged in, but only the admin account can manage short links.">
        {#snippet actions()}
          <Button variant="secondary" href="/">Back home</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else if linkError?.kind === 'not-found'}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState code="404" title="This link vanished into the void" text="It may have been deleted. Your other links are still there.">
        {#snippet actions()}
          <Button href={backHref}>All links</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else}
    <div class="flex flex-col gap-6">
      <a
        href={backHref}
        class="inline-flex w-fit items-center gap-1 rounded-pill py-1 pr-3 text-body-sm text-ink-muted no-underline hover:text-ink"
      >
        <ChevronLeft class="size-4" /> All links
      </a>

      <!-- Link card -->
      {#if linkError}
        <div class="rounded-lg bg-card">
          <EmptyState title="Couldn’t load this link" text={linkError.message}>
            {#snippet actions()}
              <Button variant="secondary" onclick={loadAll}><RefreshCw class="size-4" /> Try again</Button>
            {/snippet}
          </EmptyState>
        </div>
      {:else if !link}
        <LoadingDelay label="Loading link">
          <div class="flex flex-col gap-5 rounded-lg bg-card p-6 sm:p-8">
            <Shimmer width={72} height={24} class="rounded-pill" />
            <Shimmer width="55%" height={36} />
            <Shimmer width={260} height={44} class="max-w-full rounded-pill" />
            <Shimmer width="70%" height={14} />
          </div>
        </LoadingDelay>
      {:else}
        <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6 sm:p-8" aria-labelledby="link-title">
          <div class="flex flex-wrap items-center gap-2">
            <LinkStatusBadge {link} />
            <span class="font-mono text-[12px] text-ink-muted">created {formatDate(link.created_at)}</span>
          </div>

          <h1 id="link-title" class="text-display m-0 break-words max-sm:text-[28px] max-sm:leading-8">{displayTitle(link)}</h1>

          <div class="flex min-w-0 flex-col gap-3">
            <div class="max-w-full min-w-0 [&_button]:max-w-full [&_button>span:first-child]:flex-none [&_button>span:last-child]:min-w-0 [&_button>span:last-child]:truncate">
              <CopyChip value={link.short_url}>{shortLabel}</CopyChip>
            </div>
            <a
              href={link.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex max-w-full items-start gap-1.5 font-mono text-[13px] break-all text-ink-muted no-underline hover:text-ink"
            >
              <span aria-hidden="true">→</span>
              <span class="min-w-0">{link.destination_url}</span>
              <ExternalLink class="mt-0.5 size-3.5 flex-none" aria-hidden="true" /><span class="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <dl class="m-0 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <div class="flex min-w-0 flex-col gap-1">
              <dt class="text-label text-ink-muted">All-time clicks</dt>
              <dd class="m-0 font-mono text-body-sm tabular-nums">{formatCount(link.clicks_count)}</dd>
            </div>
            <div class="flex min-w-0 flex-col gap-1">
              <dt class="text-label text-ink-muted">Last click</dt>
              <dd class="m-0 font-mono text-body-sm" title={formatDateTime(link.last_clicked_at)}>{relativeFrom(link.last_clicked_at)}</dd>
            </div>
            <div class="flex min-w-0 flex-col gap-1">
              <dt class="text-label text-ink-muted">Expires</dt>
              <dd class="m-0 font-mono text-body-sm {status === 'expired' ? 'text-negative' : ''}">
                {link.expires_at ? formatDateTime(link.expires_at) : 'Never'}
              </dd>
            </div>
            <div class="flex min-w-0 flex-col gap-1">
              <dt class="text-label text-ink-muted">Updated</dt>
              <dd class="m-0 font-mono text-body-sm">{relativeFrom(link.updated_at)}</dd>
            </div>
          </dl>

          <div class="flex flex-col gap-4 rounded-md bg-control p-4 sm:flex-row sm:items-center sm:justify-between">
            <Switch
              bind:checked={active}
              disabled={toggling}
              onchange={e => onToggle((e.currentTarget as HTMLInputElement).checked)}
              label="Redirect visitors"
              description={status === 'expired'
                ? 'Expired — change the expiry date to bring it back.'
                : active
                  ? 'Visitors are sent to the destination.'
                  : 'Turned off: visitors are not redirected.'}
            />
            <div class="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onclick={() => (editOpen = true)}><Pencil class="size-4" /> Edit</Button>
              <Button variant="ghost" size="sm" class="text-negative" onclick={() => (deleteOpen = true)}>
                <Trash2 class="size-4" /> Delete
              </Button>
            </div>
          </div>
        </section>
      {/if}

      <!-- Stats -->
      {#if !linkError}
        <section class="flex min-w-0 flex-col gap-4" aria-labelledby="stats-title">
          <div class="flex flex-wrap items-center justify-between gap-3 pt-4">
            <h2 id="stats-title" class="text-title m-0">Stats</h2>
            <div class="max-w-full">
              <Segmented label="Stats range" options={RANGES} value={range} onchange={setRange} />
            </div>
          </div>

          {#if statsError && !stats}
            <div class="rounded-lg bg-card">
              <EmptyState title="Couldn’t load stats" text={statsError.message}>
                {#snippet actions()}
                  <Button variant="secondary" onclick={loadStats}><RefreshCw class="size-4" /> Try again</Button>
                {/snippet}
              </EmptyState>
            </div>
          {:else if !stats}
            <LoadingDelay label="Loading stats" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatTileSkeleton label="Clicks" tone="violet" />
                <StatTileSkeleton label="Unique visitors" />
                <StatTileSkeleton label="Bots filtered" />
              </div>
              <div class="flex flex-col gap-4 rounded-lg bg-card p-6">
                <Shimmer width={120} height={12} />
                <Shimmer height={200} />
              </div>
            </LoadingDelay>
          {:else}
            <div class="flex flex-col gap-4 transition-opacity duration-fast {statsLoading ? 'opacity-60' : ''}" aria-busy={statsLoading}>
              {#if statsError}
                <p class="status-error m-0 rounded-md p-3 text-body-sm" role="alert">
                  Couldn’t refresh: {statsError.message} Showing the previous range.
                </p>
              {/if}
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatTile label="Clicks" value={formatCount(stats.totals.clicks)} tone="violet" caption="Humans only" />
                <StatTile
                  label="Unique visitors"
                  value={formatCount(stats.totals.unique_visitors)}
                  caption={stats.totals.clicks
                    ? `${(stats.totals.clicks / Math.max(1, stats.totals.unique_visitors)).toFixed(1)} clicks each`
                    : 'No visitors yet'}
                />
                <StatTile label="Bots filtered" value={formatCount(stats.totals.bot_clicks)} caption="Not counted as clicks" />
              </div>

              <div class="min-w-0 rounded-lg bg-card p-6">
                <ClicksChart daily={stats.daily} timezone={stats.timezone} />
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <RankedList title="Referrers" items={stats.referrers} />
                <RankedList title="Countries" items={stats.countries} format={countryLabel} />
                <RankedList title="Devices" items={stats.devices} />
                <RankedList title="Browsers" items={stats.browsers} />
                <RankedList title="Operating systems" items={stats.os} />
              </div>
            </div>
          {/if}
        </section>
      {/if}
    </div>
  {/if}
</div>

{#if editOpen && link}
  <LinkFormModal
    bind:open={editOpen}
    {link}
    onclose={() => (editOpen = false)}
    onsaved={saved => {
      link = saved;
      active = saved.is_active;
      toast.success('Link saved');
    }}
  />
{/if}

<Modal
  bind:open={deleteOpen}
  title="Delete this link?"
  description="{shortLabel} stops working right away, and its {link
    ? formatCount(link.clicks_count)
    : ''} recorded clicks are deleted with it. This can’t be undone."
>
  {#snippet actions()}
    <Button variant="secondary" onclick={() => (deleteOpen = false)}>Cancel</Button>
    <Button onclick={onDelete} disabled={deleting}>
      {#if deleting}<Loader2 class="size-4 animate-spin" />{:else}<Trash2 class="size-4" />{/if}
      {deleting ? 'Deleting…' : 'Delete link'}
    </Button>
  {/snippet}
</Modal>
