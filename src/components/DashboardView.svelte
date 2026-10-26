<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from '../lib/router';
  import { getNotes, type Note } from '../lib/notes';
  import { getFinanceSummary, formatAmount, type FinanceSummary } from '../lib/finance';
  import { formatDate } from '../lib/notes';
  import { truncateText } from '../lib/uiUtils';
  import { stripHtml } from '../lib/uiUtils';
  import { getCached, setCache } from '../lib/cache';
  import Skeleton from 'boneyard-js/svelte';
  import { fixtureNotes, fixtureFinanceSummary } from '../lib/fixtures';
  import NoteDetailModal from './NoteDetailModal.svelte';
  import { Button, NoteCard, ServiceTile, StatTile, type TileTone } from '$lib/components/ds';
  import {
    FileText,
    Eye,
    EyeOff,
    ArrowRight,
    Server,
    Wifi,
    HardDrive,
    Image,
    Cloud,
    Activity,
    RefreshCw
  } from '@lucide/svelte';

  let latestNotes = $state<Note[]>([]);
  let financeSummary = $state<FinanceSummary | null>(null);
  let isLoading = $state(true);
  let isRefreshing = $state(false);
  let showAmounts = $state(true);
  let hasAuthToken = $state(false);

  // Note detail modal
  let isDetailModalOpen = $state(false);
  let selectedDetailNote = $state<Note | null>(null);

  // Cache keys
  const CACHE_KEY_NOTES = 'dashboard:latestNotes';
  const CACHE_KEY_FINANCE = 'dashboard:financeSummary';

  // Self-hosted apps
  const myApps: { name: string; url: string; description: string; icon: typeof Wifi; tone: TileTone }[] = [
    {
      name: '9Router',
      url: 'https://router.fariz.dev',
      description: 'Network router management',
      icon: Wifi,
      tone: 'deep'
    },
    {
      name: 'RustFS',
      url: 'https://rustfs.fariz.dev',
      description: 'File storage server',
      icon: HardDrive,
      tone: 'violet'
    },
    {
      name: 'Immich',
      url: 'https://immich.fariz.dev',
      description: 'Photo & video backup',
      icon: Image,
      tone: 'lilac'
    },
    {
      name: 'HH',
      url: 'https://hh.fariz.dev',
      description: 'Scrapper provider',
      icon: Server,
      tone: 'deep'
    },
    {
      name: 'Uptime',
      url: 'https://uptime.fariz.dev/status',
      description: 'Service status monitor',
      icon: Activity,
      tone: 'violet'
    },
    {
      name: 'Cloud',
      url: 'https://cloud.fariz.dev',
      description: 'Cloud services',
      icon: Cloud,
      tone: 'lilac'
    }
  ];

  const STORAGE_KEY_SHOW_AMOUNTS = 'dashboardShowAmounts';

  function loadShowAmountsPreference() {
    if (typeof localStorage === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEY_SHOW_AMOUNTS);
    return stored !== null ? stored === 'true' : true;
  }

  function saveShowAmountsPreference() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_SHOW_AMOUNTS, JSON.stringify(showAmounts));
  }

  function toggleShowAmounts() {
    showAmounts = !showAmounts;
    saveShowAmountsPreference();
  }

  function openNoteDetail(note: Note) {
    selectedDetailNote = note;
    isDetailModalOpen = true;
  }

  function closeNoteDetail() {
    isDetailModalOpen = false;
  }

  function maskedAmount(): string {
    return '\u2022'.repeat(8);
  }

  function displayAmount(amount: number): string {
    return showAmounts ? formatAmount(amount) : maskedAmount();
  }

  onMount(async () => {
    hasAuthToken = !!localStorage.getItem('authToken');
    if (!hasAuthToken) return;

    showAmounts = loadShowAmountsPreference();

    // Try to load from cache first
    const cachedNotes = getCached<Note[]>(CACHE_KEY_NOTES);
    const cachedFinance = getCached<FinanceSummary>(CACHE_KEY_FINANCE);

    if (cachedNotes || cachedFinance) {
      // Show cached data immediately
      latestNotes = cachedNotes?.data ?? [];
      financeSummary = cachedFinance?.data ?? null;
      isLoading = false;

      // Background refresh
      isRefreshing = true;
      try {
        const [notesResponse, summary] = await Promise.all([
          getNotes(1, 3, { sortBy: 'created_at', sortOrder: 'desc' }),
          getFinanceSummary()
        ]);
        latestNotes = notesResponse.notes;
        financeSummary = summary;
        setCache(CACHE_KEY_NOTES, notesResponse.notes);
        setCache(CACHE_KEY_FINANCE, summary);
      } catch (error) {
        console.error('Background refresh failed:', error);
      } finally {
        isRefreshing = false;
      }
    } else {
      // No cache — fetch from network
      isLoading = true;
      try {
        const [notesResponse, summary] = await Promise.all([
          getNotes(1, 3, { sortBy: 'created_at', sortOrder: 'desc' }),
          getFinanceSummary()
        ]);
        latestNotes = notesResponse.notes;
        financeSummary = summary;
        setCache(CACHE_KEY_NOTES, notesResponse.notes);
        setCache(CACHE_KEY_FINANCE, summary);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        isLoading = false;
      }
    }
  });
</script>

{#snippet financeRow(summary: FinanceSummary)}
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <StatTile
      label="Income"
      value={displayAmount(summary.total_income)}
      delta={{ direction: 'up', text: 'Money in' }}
    />
    <StatTile
      label="Expense"
      value={displayAmount(summary.total_expense)}
      delta={{ direction: 'down', text: 'Money out' }}
    />
    <StatTile label="Balance" value={displayAmount(summary.balance)} caption="All accounts" tone="violet" />
  </div>
{/snippet}

{#snippet notesList(notes: Note[], interactive: boolean)}
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    {#each notes as note (note.id)}
      <NoteCard
        title={note.name || 'Untitled note'}
        excerpt={note.description ? truncateText(stripHtml(note.description), 120) : undefined}
        labels={(note.tags ?? []).slice(0, 2).map(tag => tag.name || tag.tag)}
        date={formatDate(note.created_at)}
        attachments={note.files?.length ?? 0}
        pinned={note.is_pinned}
        onclick={interactive ? () => openNoteDetail(note) : undefined}
      />
    {/each}
  </div>
{/snippet}

{#snippet appsGrid()}
  <section class="flex flex-col gap-4">
    <h2 class="text-label text-ink-muted">Self-hosted apps</h2>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {#each myApps as app (app.name)}
        <ServiceTile name={app.name} description={app.description} href={app.url} tone={app.tone}>
          {#snippet mark()}<app.icon class="size-5" />{/snippet}
        </ServiceTile>
      {/each}
    </div>
  </section>
{/snippet}

{#snippet notesHeader()}
  <div class="flex items-center justify-between">
    <h2 class="text-label text-ink-muted">Latest notes</h2>
    <Button variant="ghost" size="sm" onclick={() => navigate('/notes')}>
      View all <ArrowRight class="size-4" />
    </Button>
  </div>
{/snippet}

{#if isLoading}
  <div class="space-y-10">
    <section class="flex flex-col gap-4">
      <h2 class="text-label text-ink-muted">Finance summary</h2>
      <Skeleton name="dashboard-finance" loading={true}>
        {@render financeRow(fixtureFinanceSummary)}
      </Skeleton>
    </section>

    {@render appsGrid()}

    <section class="flex flex-col gap-4">
      {@render notesHeader()}
      <Skeleton name="dashboard-notes" loading={true}>
        {@render notesList(fixtureNotes, false)}
      </Skeleton>
    </section>
  </div>
{:else}
  <div class="space-y-10">
    {#if isRefreshing}
      <p class="flex items-center gap-2 text-code text-ink-muted">
        <RefreshCw class="size-3.5 animate-spin" /> Updating…
      </p>
    {/if}

    {#if financeSummary}
      <section class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-label text-ink-muted">Finance summary</h2>
          <Button
            variant="ghost"
            size="sm"
            onclick={toggleShowAmounts}
            title={showAmounts ? 'Hide amounts' : 'Show amounts'}
          >
            {#if showAmounts}<EyeOff class="size-4" />{:else}<Eye class="size-4" />{/if}
            {showAmounts ? 'Hide' : 'Show'}
          </Button>
        </div>
        {@render financeRow(financeSummary)}
      </section>
    {/if}

    {@render appsGrid()}

    <section class="flex flex-col gap-4">
      {@render notesHeader()}
      {#if latestNotes.length === 0}
        <div class="flex flex-col items-center gap-3 rounded-lg bg-card py-10 text-center">
          <FileText class="size-10 text-ink-muted" />
          <p class="text-body-sm font-normal text-ink-muted">No notes yet</p>
        </div>
      {:else}
        {@render notesList(latestNotes, true)}
      {/if}
    </section>
  </div>
{/if}

<!-- Note Detail Modal -->
<NoteDetailModal
  note={selectedDetailNote}
  bind:isOpen={isDetailModalOpen}
  onClose={closeNoteDetail}
  {hasAuthToken}
  hideActions={true}
/>
