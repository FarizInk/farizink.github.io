<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from '../lib/router';
  import { getNotes, type Note } from '../lib/notes';
  import { getFinanceSummary, formatAmount, type FinanceSummary } from '../lib/finance';
  import { formatDate } from '../lib/notes';
  import { truncateText } from '../lib/uiUtils';
  import { stripHtml } from '../lib/uiUtils';
  import NoteDetailModal from './NoteDetailModal.svelte';
  import {
    FileText,
    Wallet,
    Eye,
    EyeOff,
    Loader2,
    ArrowRight,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Globe,
    Server,
    Wifi,
    HardDrive,
    Image,
    Activity
  } from '@lucide/svelte';

  let latestNotes = $state<Note[]>([]);
  let financeSummary = $state<FinanceSummary | null>(null);
  let isLoading = $state(true);
  let showAmounts = $state(true);
  let hasAuthToken = $state(false);

  // Note detail modal
  let isDetailModalOpen = $state(false);
  let selectedDetailNote = $state<Note | null>(null);

  // Self-hosted apps
  const myApps = [
    {
      name: '9Router',
      url: 'https://9router.fariz.dev',
      description: 'Network router management',
      icon: Wifi,
      color: 'from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-600'
    },
    {
      name: 'RustFS',
      url: 'https://rustfs.fariz.dev',
      description: 'File storage server',
      icon: HardDrive,
      color: 'from-orange-400 to-red-500 dark:from-orange-500 dark:to-red-600'
    },
    {
      name: 'Immich',
      url: 'https://immich.fariz.dev',
      description: 'Photo & video backup',
      icon: Image,
      color: 'from-violet-400 to-purple-500 dark:from-violet-500 dark:to-purple-600'
    },
    {
      name: 'HH',
      url: 'https://hh.fariz.dev',
      description: 'Scrapper provider',
      icon: Server,
      color: 'from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-600'
    },
    {
      name: 'Uptime',
      url: 'https://uptime.fariz.dev/status',
      description: 'Service status monitor',
      icon: Activity,
      color: 'from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600'
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
    return '•'.repeat(8);
  }

  function displayAmount(amount: number): string {
    return showAmounts ? formatAmount(amount) : maskedAmount();
  }

  onMount(async () => {
    hasAuthToken = !!localStorage.getItem('authToken');
    if (!hasAuthToken) return;

    showAmounts = loadShowAmountsPreference();
    isLoading = true;

    try {
      const [notesResponse, summary] = await Promise.all([
        getNotes(1, 3, { sortBy: 'created_at', sortOrder: 'desc' }),
        getFinanceSummary()
      ]);
      latestNotes = notesResponse.notes;
      financeSummary = summary;
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <div class="flex items-center justify-center py-20">
    <Loader2 class="w-8 h-8 animate-spin text-primary-500" />
  </div>
{:else}
  <div class="space-y-8">
    <!-- Finance Summary -->
    {#if financeSummary}
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div
              class="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600 rounded-xl flex items-center justify-center shadow-sm"
            >
              <Wallet class="w-4.5 h-4.5 text-white" />
            </div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Finance Summary</h2>
          </div>
          <button
            type="button"
            onclick={toggleShowAmounts}
            class="btn-icon flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={showAmounts ? 'Hide amounts' : 'Show amounts'}
          >
            {#if showAmounts}
              <Eye class="w-4 h-4" />
            {:else}
              <EyeOff class="w-4 h-4" />
            {/if}
            <span class="hidden sm:inline">{showAmounts ? 'Hide' : 'Show'}</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Balance -->
          <div
            class="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/60 dark:border-blue-700/40 p-4"
          >
            <div class="flex items-center gap-2 mb-2">
              <DollarSign class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span class="text-sm font-medium text-blue-700 dark:text-blue-300">Balance</span>
            </div>
            <p class="text-xl font-bold text-blue-900 dark:text-blue-100 tracking-tight">
              {displayAmount(financeSummary.balance)}
            </p>
          </div>

          <!-- Income -->
          <div
            class="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/60 dark:border-green-700/40 p-4"
          >
            <div class="flex items-center gap-2 mb-2">
              <TrendingUp class="w-4 h-4 text-green-600 dark:text-green-400" />
              <span class="text-sm font-medium text-green-700 dark:text-green-300">Income</span>
            </div>
            <p class="text-xl font-bold text-green-900 dark:text-green-100 tracking-tight">
              {displayAmount(financeSummary.total_income)}
            </p>
          </div>

          <!-- Expense -->
          <div
            class="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200/60 dark:border-red-700/40 p-4"
          >
            <div class="flex items-center gap-2 mb-2">
              <TrendingDown class="w-4 h-4 text-red-600 dark:text-red-400" />
              <span class="text-sm font-medium text-red-700 dark:text-red-300">Expense</span>
            </div>
            <p class="text-xl font-bold text-red-900 dark:text-red-100 tracking-tight">
              {displayAmount(financeSummary.total_expense)}
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- My Apps -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <div
          class="w-9 h-9 bg-gradient-to-br from-indigo-400 to-blue-500 dark:from-indigo-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-sm"
        >
          <Globe class="w-4.5 h-4.5 text-white" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">My Apps</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each myApps as app}
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br {app.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
            >
              <app.icon class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              >
                {app.name}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{app.description}</p>
            </div>
            <ArrowRight
              class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0"
            />
          </a>
        {/each}
      </div>
    </div>

    <!-- Latest Notes -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div
            class="w-9 h-9 bg-gradient-to-br from-warning-400 to-amber-500 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center shadow-sm"
          >
            <FileText class="w-4.5 h-4.5 text-white" />
          </div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Latest Notes</h2>
        </div>
        <button
          type="button"
          onclick={() => navigate('/notes')}
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-warning-50 dark:bg-primary-900/20 text-warning-700 dark:text-primary-300 hover:bg-warning-100 dark:hover:bg-primary-900/30 transition-colors"
        >
          View All
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      {#if latestNotes.length === 0}
        <div
          class="text-center py-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
        >
          <FileText class="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p class="text-sm text-gray-500 dark:text-gray-400">No notes yet</p>
        </div>
      {:else}
        <div class="space-y-3">
          {#each latestNotes as note (note.id)}
            <button
              type="button"
              onclick={() => openNoteDetail(note)}
              class="w-full text-left group rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-4 hover:border-warning-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-warning-600 dark:group-hover:text-primary-400 transition-colors"
                  >
                    {note.name || 'Untitled Note'}
                  </h3>
                  {#if note.description}
                   <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {truncateText(stripHtml(note.description), 120)}
                   </p>
                 {/if}
                  <div
                    class="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500"
                  >
                    <span>{formatDate(note.created_at)}</span>
                    {#if note.tags && note.tags.length > 0}
                      <span class="flex items-center gap-1">
                        {#each note.tags.slice(0, 2) as tag}
                          <span
                            class="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium"
                            style="background-color: {tag.color
                              ? tag.color + '20'
                              : 'rgba(245, 158, 11, 0.1)'}; color: {tag.color || 'inherit'}"
                          >
                            {tag.name || tag.tag}
                          </span>
                        {/each}
                        {#if note.tags.length > 2}
                          <span class="text-gray-400">+{note.tags.length - 2}</span>
                        {/if}
                      </span>
                    {/if}
                  </div>
                </div>
                <ArrowRight
                  class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-warning-500 dark:group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1"
                />
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Note Detail Modal -->
<NoteDetailModal
  note={selectedDetailNote}
  bind:isOpen={isDetailModalOpen}
  onClose={closeNoteDetail}
  {hasAuthToken}
/>
