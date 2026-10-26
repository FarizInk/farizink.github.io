<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import {
    Wallet,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    RefreshCw,
    Trash2,
    Pencil,
    X,
    Save,
    Calendar,
    Loader2,
    ChevronLeft,
    ChevronRight,
  } from '@lucide/svelte';
  import {
    getTransactions,
    getFinanceSummary,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    formatAmount,
    formatDate,
    recalculateFinanceSummary,
    type Transaction,
    type FinanceSummary,
    type TransactionFilters,
  } from '../lib/finance';
  import { getTags, type Tag } from '../lib/tags';
  import Skeleton from 'boneyard-js/svelte';
  import { Button, EmptyState, FilterTabs, PageHeader, StatTile } from '$lib/components/ds';
  import { fixtureTransactions, fixtureFinanceSummary } from '../lib/fixtures';
  import { isBoneyardCapture } from '../lib/boneyard';
  import Modal from '../components/Modal.svelte';

  // Auth
  let hasAuthToken = $state(false);
  let isCheckingAuth = $state(true);

  // Data
  let transactions = $state<Transaction[]>([]);
  let summary = $state<FinanceSummary | null>(null);
  let tags = $state<Tag[]>([]);
  let isLoading = $state(true);
  let isSubmitting = $state(false);
  let deletingTransactionId = $state<string | null>(null);
  let isRecalculating = $state(false);

  // Pagination
  let currentPage = $state(1);
  let totalPages = $state(1);
  let totalItems = $state(0);
  const pageSize = 10;

  // Filters
  let searchQuery = $state('');
  let filterType = $state<'all' | 'income' | 'expense'>('all');
  let showFilters = $state(false);

  // Modal state
  let showModal = $state(false);
  let modalMode = $state<'create' | 'edit'>('create');
  let editingTransaction = $state<Transaction | null>(null);

  // Form state
  let formType = $state<'income' | 'expense'>('expense');
  let formAmount = $state('');
  let formDescription = $state('');
  let formDate = $state(new Date().toISOString().slice(0, 16));
  let formTagIds = $state<string[]>([]);

  onMount(() => {
    hasAuthToken =
      typeof localStorage !== 'undefined' ? !!localStorage.getItem('authToken') : false;
    isCheckingAuth = false;

    if (hasAuthToken) {
      loadData();
      loadTags();
    }
  });

  async function loadData(showErrorToast: boolean = true) {
    isLoading = true;
    try {
      const filters: TransactionFilters = {};
      if (filterType !== 'all') filters.type = filterType;
      if (searchQuery.trim()) filters.search = searchQuery.trim();

      const [transactionsRes, summaryRes] = await Promise.all([
        getTransactions(currentPage, pageSize, filters),
        getFinanceSummary(),
      ]);

      transactions = transactionsRes.transactions;
      totalPages = transactionsRes.pagination.totalPages;
      totalItems = transactionsRes.pagination.total;
      summary = summaryRes;
    } catch (error) {
      console.error('Failed to load finance data:', error);
      if (showErrorToast) {
        toast.error('Failed to load finance data');
      } else {
        throw error;
      }
    } finally {
      isLoading = false;
    }
  }

  async function loadTags() {
    try {
      const res = await getTags(1, 100);
      tags = res.data || [];
    } catch {
      tags = [];
    }
  }

  function handleFilterChange(type: 'all' | 'income' | 'expense') {
    filterType = type;
    currentPage = 1;
    loadData();
  }

  function handleSearch() {
    currentPage = 1;
    loadData();
  }

  async function handleRefresh() {
    const refreshPromise = loadData(false);

    toast.promise(refreshPromise, {
      loading: 'Refreshing finance data...',
      success: 'Finance data is up to date',
      error: error => (error instanceof Error ? error.message : 'Failed to refresh finance data')
    });

    try {
      await refreshPromise;
    } catch (error) {
      console.error('Refresh finance error:', error);
    }
  }

  async function handleRecalculate() {
    isRecalculating = true;
    const recalculatePromise = (async () => {
      await recalculateFinanceSummary();
      await new Promise(r => setTimeout(r, 2000));
      await loadData(false);
    })();

    toast.promise(recalculatePromise, {
      loading: 'Recalculating finance summary...',
      success: 'Finance summary updated',
      error: error => (error instanceof Error ? error.message : 'Failed to recalculate summary')
    });

    try {
      await recalculatePromise;
    } catch (error) {
      console.error('Recalculate error:', error);
    } finally {
      isRecalculating = false;
    }
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openCreateModal() {
    modalMode = 'create';
    editingTransaction = null;
    formType = 'expense';
    formAmount = '';
    formDescription = '';
    formDate = new Date().toISOString().slice(0, 16);
    formTagIds = [];
    showModal = true;
  }

  function openEditModal(transaction: Transaction) {
    modalMode = 'edit';
    editingTransaction = transaction;
    formType = transaction.type;
    formAmount = String(transaction.amount);
    formDescription = transaction.description || '';
    formDate = transaction.transaction_date
      ? new Date(transaction.transaction_date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16);
    formTagIds = transaction.tags?.map((t: Tag) => t.id) || [];
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    editingTransaction = null;
  }

  async function handleSubmit() {
    if (!formAmount || parseInt(formAmount) < 1) {
      toast.error('Please enter a valid amount');
      return;
    }

    isSubmitting = true;
    try {
      const data = {
        type: formType,
        amount: parseInt(formAmount),
        description: formDescription || undefined,
        transaction_date: formDate || undefined,
        tag_ids: formTagIds.length > 0 ? formTagIds : undefined,
      };

      if (modalMode === 'create') {
        await createTransaction(data);
        toast.success('Transaction created');
      } else if (editingTransaction) {
        await updateTransaction(editingTransaction.id, data);
        toast.success('Transaction updated');
      }

      closeModal();
      loadData();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(modalMode === 'create' ? 'Failed to create transaction' : 'Failed to update transaction');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleDelete(transaction: Transaction) {
    if (deletingTransactionId === transaction.id) return;
    if (!confirm('Delete this transaction?')) return;

    deletingTransactionId = transaction.id;
    const deletePromise = (async () => {
      await deleteTransaction(transaction.id);
      await loadData(false);
    })();

    toast.promise(deletePromise, {
      loading: 'Deleting transaction...',
      success: 'Transaction deleted',
      error: error => (error instanceof Error ? error.message : 'Failed to delete transaction')
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error('Delete transaction error:', error);
    } finally {
      deletingTransactionId = null;
    }
  }

  function toggleTag(tagId: string) {
    if (formTagIds.includes(tagId)) {
      formTagIds = formTagIds.filter((id) => id !== tagId);
    } else {
      formTagIds = [...formTagIds, tagId];
    }
  }
</script>

<svelte:head>
  <title>Finance - Fariz</title>
  <meta name="description" content="Track your personal income and expenses." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#snippet summaryRow(data: FinanceSummary)}
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <StatTile label="Income" value={formatAmount(data.total_income)} delta={{ direction: 'up', text: 'Money in' }} />
    <StatTile label="Expense" value={formatAmount(data.total_expense)} delta={{ direction: 'down', text: 'Money out' }} />
    <StatTile
      label="Balance"
      value={formatAmount(data.balance)}
      tone={data.balance < 0 ? 'surface' : 'violet'}
      delta={data.balance < 0 ? { direction: 'down', text: 'Negative balance' } : undefined}
      caption={data.balance < 0 ? undefined : 'All accounts'}
    />
  </div>
{/snippet}

{#snippet transactionRow(transaction: Transaction, interactive: boolean)}
  <div class="group flex items-center justify-between gap-4 rounded-lg bg-card p-4">
    <div class="flex min-w-0 items-center gap-4">
      <span
        class="grid size-11 flex-none place-items-center rounded-md {transaction.type === 'income'
          ? 'bg-tile-lilac text-ink-on-bright'
          : 'bg-tile-deep text-ink-on-dark'}"
        role="img"
        aria-label={transaction.type === 'income' ? 'Income' : 'Expense'}
      >
        {#if transaction.type === 'income'}
          <ArrowUpRight class="size-5" />
        {:else}
          <ArrowDownRight class="size-5" />
        {/if}
      </span>
      <div class="min-w-0">
        <p class="truncate text-body-sm">{transaction.description || 'No description'}</p>
        <div class="mt-1 flex flex-wrap items-center gap-2">
          <span class="text-code flex items-center gap-1 text-ink-muted">
            <Calendar class="size-3" />
            {formatDate(transaction.transaction_date)}
          </span>
          {#each transaction.tags || [] as tag (tag.id)}
            <span class="inline-flex h-6 items-center gap-1.5 rounded-pill bg-sunken px-2.5 text-code text-ink">
              <span
                class="size-1.5 rounded-pill bg-accent"
                style={tag.color ? `background-color: ${tag.color}` : undefined}
                aria-hidden="true"
              ></span>
              {tag.name || tag.tag}
            </span>
          {/each}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="font-mono text-sm font-medium whitespace-nowrap tabular-nums sm:text-base {transaction.type === 'income'
          ? 'text-live'
          : 'text-negative'}"
      >
        {transaction.type === 'income' ? '+' : '−'}{formatAmount(transaction.amount)}
      </span>
      {#if interactive}
        <div class="flex items-center opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
          <button onclick={() => openEditModal(transaction)} class="btn-icon" title="Edit" aria-label="Edit transaction">
            <Pencil class="size-4" />
          </button>
          <button
            onclick={() => handleDelete(transaction)}
            class="btn-icon hover:text-negative"
            title="Delete"
            aria-label="Delete transaction"
          >
            <Trash2 class="size-4" />
          </button>
        </div>
      {/if}
    </div>
  </div>
{/snippet}

<div class="mx-auto max-w-[1120px] pt-16 pb-12">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="size-12 animate-spin rounded-pill border-4 border-control border-t-accent"></div>
    </div>
  {:else if !hasAuthToken && !isBoneyardCapture}
    <div class="flex min-h-[60vh] items-center justify-center">
      <EmptyState title="Login required" text="You need to be logged in to access finance.">
        {#snippet actions()}
          <Button onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}>Log in</Button>
        {/snippet}
      </EmptyState>
    </div>
  {:else}
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <PageHeader title="Personal" highlight="finance" subtitle="Track income and expenses." />
        <Button onclick={openCreateModal} class="mb-8">
          <Plus class="size-4" /> Add transaction
        </Button>
      </div>

      {#if isLoading && !summary}
        <Skeleton name="finance-summary" loading={true}>
          {@render summaryRow(fixtureFinanceSummary)}
        </Skeleton>
      {:else if summary}
        {@render summaryRow(summary)}
      {/if}

      <div class="flex flex-wrap items-center gap-3">
        <FilterTabs
          items={[
            { id: 'all', label: 'All' },
            { id: 'income', label: 'Income' },
            { id: 'expense', label: 'Expense' }
          ]}
          value={filterType}
          onchange={id => handleFilterChange(id as 'all' | 'income' | 'expense')}
        />

        <label class="relative min-w-[200px] flex-1">
          <Search class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            placeholder="Search transactions…"
            aria-label="Search transactions"
            bind:value={searchQuery}
            onkeydown={e => e.key === 'Enter' && handleSearch()}
            class="h-10 w-full rounded-pill bg-control pr-4 pl-10 text-body-sm font-normal text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          />
        </label>

        <button
          onclick={handleRefresh}
          disabled={isLoading}
          class="btn-icon"
          title="Refresh"
          aria-label="Refresh"
        >
          <RefreshCw class="size-4 {isLoading ? 'animate-spin' : ''}" />
        </button>
      </div>

      {#if isLoading}
        <Skeleton name="finance-transactions" loading={true}>
          <div class="space-y-3">
            {#each fixtureTransactions as transaction (transaction.id)}
              {@render transactionRow(transaction, false)}
            {/each}
          </div>
        </Skeleton>
      {:else if transactions.length === 0}
        <div class="rounded-lg bg-card">
          <EmptyState title="No transactions yet" text="Start tracking your finances.">
            {#snippet actions()}
              <Button onclick={openCreateModal}><Plus class="size-4" /> Add transaction</Button>
            {/snippet}
          </EmptyState>
        </div>
      {:else}
        <div class="space-y-3">
          {#each transactions as transaction (transaction.id)}
            {@render transactionRow(transaction, true)}
          {/each}
        </div>

        {#if totalPages > 1}
          <nav class="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <button
              onclick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              class="btn-icon"
              aria-label="Previous page"
            >
              <ChevronLeft class="size-4" />
            </button>
            {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page (page)}
              <button
                onclick={() => handlePageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                class="grid size-9 place-items-center rounded-pill font-mono text-sm transition-colors {page === currentPage
                  ? 'bg-accent text-ink-on-accent'
                  : 'bg-control text-ink hover:bg-control-hover'}"
              >
                {page}
              </button>
            {/each}
            <button
              onclick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              class="btn-icon"
              aria-label="Next page"
            >
              <ChevronRight class="size-4" />
            </button>
          </nav>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<!-- Create/Edit Modal -->
{#if showModal}
<Modal isOpen={showModal} onClose={closeModal} maxW="max-w-md">
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="grid size-10 place-items-center rounded-md bg-tile-deep text-ink-on-dark"><Wallet class="size-5" /></span>
      <h2 class="text-title">{modalMode === 'create' ? 'Add transaction' : 'Edit transaction'}</h2>
    </div>
    <button onclick={closeModal} class="btn-icon" aria-label="Close">
      <X class="size-5" />
    </button>
  </div>

  <div class="space-y-5">
    <div>
      <span class="label">Type</span>
      <div class="mode-toggle flex w-full" role="group" aria-label="Transaction type">
        <button
          type="button"
          onclick={() => (formType = 'income')}
          aria-pressed={formType === 'income'}
          class="mode-btn flex flex-1 items-center justify-center gap-2 {formType === 'income' ? 'active' : ''}"
        >
          <ArrowUpRight class="size-4" /> Income
        </button>
        <button
          type="button"
          onclick={() => (formType = 'expense')}
          aria-pressed={formType === 'expense'}
          class="mode-btn flex flex-1 items-center justify-center gap-2 {formType === 'expense' ? 'active' : ''}"
        >
          <ArrowDownRight class="size-4" /> Expense
        </button>
      </div>
    </div>

    <div>
      <label for="amount-input" class="label">Amount (IDR) *</label>
      <input id="amount-input" type="number" min="1" placeholder="e.g. 50000" bind:value={formAmount} class="input font-mono" />
    </div>

    <div>
      <label for="description-input" class="label">Description</label>
      <input id="description-input" type="text" placeholder="e.g. Makan siang" bind:value={formDescription} class="input" />
    </div>

    <div>
      <label for="date-input" class="label">Date</label>
      <input id="date-input" type="datetime-local" bind:value={formDate} class="input" />
    </div>

    {#if tags.length > 0}
      <div>
        <span class="label">Tags</span>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Select tags">
          {#each tags as tag (tag.id)}
            <button
              type="button"
              onclick={() => toggleTag(tag.id)}
              aria-pressed={formTagIds.includes(tag.id)}
              class="quick-btn {formTagIds.includes(tag.id) ? 'active' : ''}"
            >
              {tag.name || tag.tag}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <div class="flex items-center justify-end gap-3 pt-2">
      <Button variant="secondary" onclick={closeModal}>Cancel</Button>
      <Button onclick={handleSubmit} disabled={isSubmitting}>
        {#if isSubmitting}
          <Loader2 class="size-4 animate-spin" />
        {:else}
          <Save class="size-4" />
        {/if}
        {isSubmitting ? 'Saving…' : modalMode === 'create' ? 'Add transaction' : 'Save changes'}
      </Button>
    </div>
  </div>
</Modal>
{/if}
