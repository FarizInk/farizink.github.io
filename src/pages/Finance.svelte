<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import {
    Wallet,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Search,
    Filter,
    RefreshCw,
    Calculator,
    Trash2,
    Pencil,
    X,
    Save,
    Calendar,
    Tag as TagIcon,
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

  async function loadData() {
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
      toast.error('Failed to load finance data');
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

  async function handleRecalculate() {
    isRecalculating = true;
    try {
      await recalculateFinanceSummary();
      toast.success('Recalculate queued. Refreshing summary...');
      await new Promise(r => setTimeout(r, 2000));
      await loadData();
    } catch (error) {
      console.error('Recalculate error:', error);
      toast.error('Failed to recalculate summary');
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
    if (!confirm('Delete this transaction?')) return;

    try {
      await deleteTransaction(transaction.id);
      toast.success('Transaction deleted');
      loadData();
    } catch {
      toast.error('Failed to delete transaction');
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

<div class="min-h-screen">
  {#if isCheckingAuth}
    <div class="flex items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-warning-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else if !hasAuthToken}
    <div class="flex items-center justify-center min-h-[60vh] px-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet class="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to access finance.</p>
        <button
          onclick={() => document.dispatchEvent(new CustomEvent('open-login-modal'))}
          class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 dark:from-primary-600 dark:to-primary-500 text-white rounded-lg font-medium shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  {:else}
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wallet class="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Finance</h1>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Track income & expenses</p>
          </div>
        </div>
        <button
          onclick={openCreateModal}
          class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Add</span>
        </button>
      </div>

      <!-- Summary Cards -->
      {#if summary}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ArrowUpRight class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Income</span>
            </div>
            <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatAmount(summary.total_income)}
            </p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <ArrowDownRight class="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Expense</span>
            </div>
            <p class="text-xl font-bold text-red-600 dark:text-red-400">
              {formatAmount(summary.total_expense)}
            </p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign class="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">Balance</span>
            </div>
            <p class="text-xl font-bold {summary.balance >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}">
              {formatAmount(summary.balance)}
            </p>
          </div>
        </div>
      {/if}

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onclick={() => handleFilterChange('all')}
            class="px-4 py-2 text-sm font-medium transition-colors {filterType === 'all'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
          >
            All
          </button>
          <button
            onclick={() => handleFilterChange('income')}
            class="px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 {filterType === 'income'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
          >
            <TrendingUp class="w-3.5 h-3.5" />
            Income
          </button>
          <button
            onclick={() => handleFilterChange('expense')}
            class="px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 {filterType === 'expense'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
          >
            <TrendingDown class="w-3.5 h-3.5" />
            Expense
          </button>
        </div>

        <!-- Search -->
        <div class="flex-1 min-w-[200px] relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            bind:value={searchQuery}
            onkeydown={(e) => e.key === 'Enter' && handleSearch()}
            class="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
          />
        </div>

        <button
          onclick={() => loadData()}
          class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          title="Refresh"
        >
          <RefreshCw class="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <!-- Transactions List -->
      {#if isLoading}
        <div class="flex items-center justify-center py-20">
          <Loader2 class="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      {:else if transactions.length === 0}
        <div class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
          <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">No transactions yet</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Start tracking your finances</p>
          <button
            onclick={openCreateModal}
            class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-md"
          >
            <Plus class="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      {:else}
        <div class="space-y-3">
          {#each transactions as transaction (transaction.id)}
            <div class="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all flex items-center justify-between">
              <div class="flex items-center gap-4 min-w-0">
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 {transaction.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}"
                >
                  {#if transaction.type === 'income'}
                    <ArrowUpRight class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {:else}
                    <ArrowDownRight class="w-5 h-5 text-red-600 dark:text-red-400" />
                  {/if}
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {transaction.description || 'No description'}
                  </p>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar class="w-3 h-3" />
                      {formatDate(transaction.transaction_date)}
                    </span>
                    {#each (transaction.tags || []) as tag}
                      <span
                        class="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style="background-color: {(tag.color || '#6b7280') + '20'}; color: {tag.color || '#6b7280'}"
                      >
                        {tag.name || tag.tag}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span
                  class="text-sm sm:text-base font-bold whitespace-nowrap {transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}"
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                </span>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onclick={() => openEditModal(transaction)}
                    class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    <Pencil class="w-3.5 h-3.5 text-gray-500" />
                  </button>
                  <button
                    onclick={() => handleDelete(transaction)}
                    class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 class="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Pagination -->
        {#if totalPages > 1}
          <div class="flex items-center justify-center gap-2 mt-8">
            <button
              onclick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
              <button
                onclick={() => handlePageChange(page)}
                class="w-9 h-9 rounded-lg text-sm font-medium transition-colors {page === currentPage
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                {page}
              </button>
            {/each}
            <button
              onclick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<!-- Create/Edit Modal -->
{#if showModal}
<Modal isOpen={showModal} onClose={closeModal} maxW="max-w-md">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white">
      {modalMode === 'create' ? 'Add Transaction' : 'Edit Transaction'}
    </h2>
    <button onclick={closeModal} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <X class="w-5 h-5 text-gray-500" />
    </button>
  </div>

  <div class="space-y-5">
          <!-- Type -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Type</label>
            <div class="flex gap-3">
              <button
                type="button"
                onclick={() => (formType = 'income')}
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all {formType === 'income'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                <ArrowUpRight class="w-4 h-4" />
                Income
              </button>
              <button
                type="button"
                onclick={() => (formType = 'expense')}
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all {formType === 'expense'
                  ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                <ArrowDownRight class="w-4 h-4" />
                Expense
              </button>
            </div>
          </div>

          <!-- Amount -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Amount (IDR) *</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 50000"
              bind:value={formAmount}
              class="input"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Description</label>
            <input
              type="text"
              placeholder="e.g. Makan siang"
              bind:value={formDescription}
              class="input"
            />
          </div>

          <!-- Date -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Date</label>
            <input
              type="datetime-local"
              bind:value={formDate}
              class="input"
            />
          </div>

          <!-- Tags -->
          {#if tags.length > 0}
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Tags</label>
              <div class="flex flex-wrap gap-2">
                {#each tags as tag}
                  <button
                    type="button"
                    onclick={() => toggleTag(tag.id)}
                    class="text-xs px-3 py-1.5 rounded-full border font-medium transition-all {formTagIds.includes(tag.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  >
                    {tag.name || tag.tag}
                  </button>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              onclick={closeModal}
              class="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onclick={handleSubmit}
              disabled={isSubmitting}
              class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {#if isSubmitting}
                <Loader2 class="w-4 h-4 animate-spin" />
              {:else}
                <Save class="w-4 h-4" />
              {/if}
              {isSubmitting ? 'Saving...' : modalMode === 'create' ? 'Add Transaction' : 'Save Changes'}
            </button>
          </div>
  </div>
</Modal>
{/if}
