<script lang="ts">
  import { onMount } from 'svelte';
  import { Plus, RefreshCw, ChevronLeft, ChevronRight } from '@lucide/svelte';
  import { Button, CopyChip, EmptyState, PageHeader, SearchField, Skeleton as Shimmer } from '$lib/components/ds';
  import LoadingDelay from '../components/skeletons/LoadingDelay.svelte';
  import LinkFormModal from '../components/links/LinkFormModal.svelte';
  import LinkStatusBadge from '../components/links/LinkStatusBadge.svelte';
  import {
    getLinks,
    describeError,
    displayTitle,
    destinationHost,
    formatCount,
    relativeFrom,
    rememberListHref,
    type LinksPage,
    type LinksError
  } from '../lib/links';

  // Auth
  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);

  // Data
  let result = $state<LinksPage | null>(null);
  let isLoading = $state(false);
  let error = $state<LinksError | null>(null);
  let run = 0;

  // Query (mirrored in ?q=&page= so Back from a link's stats lands on the same page)
  let search = $state('');
  let appliedSearch = $state('');
  let page = $state(1);
  let searchTimer: ReturnType<typeof setTimeout> | undefined;

  let formOpen = $state(false);

  const lastPage = $derived(result?.last_page ?? 1);

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    search = appliedSearch = params.get('q') ?? '';
    page = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1);

    hasAuthToken = !!localStorage.getItem('authToken');
    isCheckingAuth = false;
    if (hasAuthToken) load();

    const onAuthChange = () => {
      const had = hasAuthToken;
      hasAuthToken = !!localStorage.getItem('authToken');
      if (hasAuthToken && !had) load();
      if (!hasAuthToken) {
        result = null;
        error = null;
        formOpen = false;
      }
    };
    document.addEventListener('login-success', onAuthChange);
    document.addEventListener('logout-success', onAuthChange);
    return () => {
      clearTimeout(searchTimer);
      document.removeEventListener('login-success', onAuthChange);
      document.removeEventListener('logout-success', onAuthChange);
    };
  });

  // Live search, debounced; a new query starts at page 1.
  $effect(() => {
    const q = search.trim();
    if (isCheckingAuth || !hasAuthToken || q === appliedSearch) return;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      appliedSearch = q;
      page = 1;
      load();
    }, 300);
  });

  function syncUrl() {
    const parts: string[] = [];
    if (appliedSearch) parts.push(`q=${encodeURIComponent(appliedSearch)}`);
    if (page > 1) parts.push(`page=${page}`);
    const qs = parts.join('&');
    const href = `/links${qs ? `?${qs}` : ''}`;
    rememberListHref(href);
    if (window.location.pathname + window.location.search !== href) window.history.replaceState(null, '', href);
  }

  async function load() {
    const id = ++run;
    isLoading = true;
    error = null;
    syncUrl();
    try {
      const res = await getLinks(page, appliedSearch);
      if (id !== run) return;
      // Deleted the last link on the last page, or a stale ?page= — step back.
      if (res.data.length === 0 && res.current_page > 1 && res.last_page < res.current_page) {
        page = res.last_page;
        load();
        return;
      }
      result = res;
    } catch (err) {
      if (id !== run) return;
      error = describeError(err);
    } finally {
      if (id === run) isLoading = false;
    }
  }

  function goTo(p: number) {
    if (p < 1 || p > lastPage || p === page) return;
    page = p;
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearSearch() {
    search = '';
  }

  const shortLabel = (url: string) => url.replace(/^https?:\/\//, '');
  // "/s/slug" — the part that differs between links, for narrow screens.
  const shortPath = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch {
      return shortLabel(url);
    }
  };
</script>

<svelte:head>
  <title>Links - Fariz</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="mx-auto max-w-[1120px] pt-16 pb-12">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="size-12 animate-spin rounded-pill border-4 border-control border-t-accent"></div>
    </div>
  {:else if !hasAuthToken}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState title="Login required" text="Short links are managed from the admin account. Log in to see yours.">
        {#snippet actions()}
          <Button onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}>Log in</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else if error?.kind === 'forbidden'}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState title="Admins only" text="You’re logged in, but only the admin account can manage short links.">
        {#snippet actions()}
          <Button variant="secondary" href="/">Back home</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else}
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-end justify-between gap-x-4">
        <PageHeader
          title="Short"
          highlight="links"
          subtitle="Links shared as fariz.dev/s/… — Soul counts the clicks and does the redirect."
          badge={result ? `${formatCount(result.total)} ${appliedSearch ? 'found' : result.total === 1 ? 'link' : 'links'}` : undefined}
        />
        <Button onclick={() => (formOpen = true)} class="mb-8">
          <Plus class="size-4" /> New link
        </Button>
      </div>

      <div class="flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <SearchField bind:value={search} placeholder="Search slug, title or URL…" label="Search links" />
        </div>
        <button onclick={() => load()} disabled={isLoading} class="btn-icon flex-none" title="Refresh" aria-label="Refresh links">
          <RefreshCw class="size-4 {isLoading ? 'animate-spin' : ''}" />
        </button>
      </div>

      {#if error}
        <div class="rounded-lg bg-card">
          <EmptyState title="Couldn’t load links" text={error.message}>
            {#snippet actions()}
              <Button variant="secondary" onclick={() => load()}><RefreshCw class="size-4" /> Try again</Button>
            {/snippet}
          </EmptyState>
        </div>
      {:else if !result}
        <LoadingDelay label="Loading links" class="flex flex-col gap-3">
          {#each [0, 1, 2, 3, 4] as i (i)}
            <div class="flex items-center gap-4 rounded-lg bg-card p-4 sm:p-5">
              <div class="flex min-w-0 flex-1 flex-col gap-2">
                <Shimmer width="38%" height={14} />
                <Shimmer width="60%" height={18} />
                <Shimmer width="30%" height={12} />
              </div>
              <Shimmer width={40} height={28} />
              <Shimmer width={44} height={44} round />
            </div>
          {/each}
        </LoadingDelay>
      {:else if result.data.length === 0}
        <div class="rounded-lg bg-card">
          {#if appliedSearch}
            <EmptyState title="Nothing matches “{appliedSearch}”" text="Try a slug, part of the title, or the destination host.">
              {#snippet actions()}
                <Button variant="secondary" onclick={clearSearch}>Clear search</Button>
              {/snippet}
            </EmptyState>
          {:else}
            <EmptyState title="No short links yet" text="Paste a long URL and get a fariz.dev/s/ link to share.">
              {#snippet actions()}
                <Button onclick={() => (formOpen = true)}><Plus class="size-4" /> New link</Button>
              {/snippet}
            </EmptyState>
          {/if}
        </div>
      {:else}
        <ul class="m-0 flex list-none flex-col gap-3 p-0 transition-opacity duration-fast {isLoading ? 'opacity-60' : ''}" aria-busy={isLoading}>
          {#each result.data as link (link.id)}
            <li
              class="relative flex items-center gap-3 rounded-lg bg-card p-4 transition-[translate,box-shadow] duration-base ease-soft hover:-translate-y-0.5 hover:shadow-lift sm:gap-5 sm:p-5"
            >
              <div class="flex min-w-0 flex-1 flex-col gap-1">
                <div class="flex min-w-0 items-center gap-2">
                  <a
                    href="/links/{link.id}"
                    class="min-w-0 truncate font-mono text-body-sm text-accent-text no-underline after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus-ring"
                    aria-label="{displayTitle(link)} — {shortLabel(link.short_url)}, stats and settings"
                  >
                    <span class="max-sm:hidden">{shortLabel(link.short_url)}</span><span class="sm:hidden">{shortPath(link.short_url)}</span>
                  </a>
                  <LinkStatusBadge {link} />
                </div>
                <p class="m-0 truncate text-body font-medium text-ink">{displayTitle(link)}</p>
                <p class="m-0 truncate font-mono text-[12px] text-ink-muted">
                  → {link.title ? destinationHost(link.destination_url) : link.destination_url.replace(/^https?:\/\//, '')}
                  <span class="max-sm:hidden"> · last click {relativeFrom(link.last_clicked_at)}</span>
                </p>
              </div>

              <div class="flex flex-none flex-col items-end">
                <span class="font-display text-[22px] leading-7 font-bold tabular-nums">{formatCount(link.clicks_count)}</span>
                <span class="text-label text-ink-muted">{link.clicks_count === 1 ? 'click' : 'clicks'}</span>
              </div>

              <div class="relative z-10 flex-none max-sm:[&>button]:gap-0 max-sm:[&>button]:pr-1.5">
                <CopyChip value={link.short_url}>
                  <span class="max-sm:sr-only">Copy</span><span class="sr-only"> {shortLabel(link.short_url)}</span>
                </CopyChip>
              </div>
            </li>
          {/each}
        </ul>

        {#if lastPage > 1}
          <nav class="flex items-center justify-center gap-3" aria-label="Pagination">
            <button onclick={() => goTo(page - 1)} disabled={page <= 1 || isLoading} class="btn-icon" aria-label="Previous page">
              <ChevronLeft class="size-4" />
            </button>
            <span class="font-mono text-body-sm text-ink-muted tabular-nums" aria-live="polite">
              Page <span class="text-ink">{result.current_page}</span> of {lastPage}
            </span>
            <button onclick={() => goTo(page + 1)} disabled={page >= lastPage || isLoading} class="btn-icon" aria-label="Next page">
              <ChevronRight class="size-4" />
            </button>
          </nav>
        {/if}
      {/if}
    </div>
  {/if}
</div>

{#if formOpen}
  <LinkFormModal
    bind:open={formOpen}
    onclose={() => (formOpen = false)}
    oncreated={() => {
      // New links land on top of page 1 (newest first).
      if (page !== 1 || appliedSearch) {
        search = appliedSearch = '';
        page = 1;
      }
      load();
    }}
  />
{/if}
