import { apiClient, isAxiosError } from './axios';
import type { Tag } from './tags';

// Types
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FinanceSummary {
  total_income: number;
  total_expense: number;
  balance: number;
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  search?: string;
  tag?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  description?: string;
  transaction_date?: string;
  tag_ids?: string[];
}

export interface UpdateTransactionData {
  type?: 'income' | 'expense';
  amount?: number;
  description?: string;
  transaction_date?: string;
  tag_ids?: string[];
}

/**
 * Get transactions with pagination and filters
 * GET /api/finance/transactions
 */
export async function getTransactions(
  page: number = 1,
  limit: number = 10,
  filters?: TransactionFilters
): Promise<TransactionsResponse> {
  const params: Record<string, string | number> = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (filters?.type) params.type = filters.type;
  if (filters?.search) params.search = filters.search.trim();
  if (filters?.tag) params.tag = filters.tag;
  if (filters?.from) params.from = filters.from;
  if (filters?.to) params.to = filters.to;
  if (filters?.sortBy) params.sort_by = filters.sortBy;
  if (filters?.sortOrder) params.sort_order = filters.sortOrder;

  const response = await apiClient.get('/api/finance/transactions', { params });
  return response.data.data;
}

/**
 * Get finance summary
 * GET /api/finance/summary
 */
export async function getFinanceSummary(
  from?: string,
  to?: string
): Promise<FinanceSummary> {
  const params: Record<string, string> = {};
  if (from) params.from = from;
  if (to) params.to = to;

  const response = await apiClient.get('/api/finance/summary', { params });
  return response.data.data;
}

/**
 * Create a new transaction
 * POST /api/finance/transactions
 */
export async function createTransaction(data: CreateTransactionData): Promise<Transaction> {
  const response = await apiClient.post('/api/finance/transactions', data);
  return response.data.data;
}

/**
 * Get single transaction
 * GET /api/finance/transactions/{id}
 */
export async function getTransaction(id: string): Promise<Transaction> {
  const response = await apiClient.get(`/api/finance/transactions/${id}`);
  return response.data.data;
}

/**
 * Update a transaction
 * PUT /api/finance/transactions/{id}
 */
export async function updateTransaction(
  id: string,
  data: UpdateTransactionData
): Promise<Transaction> {
  const response = await apiClient.put(`/api/finance/transactions/${id}`, data);
  return response.data.data;
}

/**
 * Delete a transaction (soft delete)
 * DELETE /api/finance/transactions/{id}
 */
export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/api/finance/transactions/${id}`);
}

/**
 * Get deleted transactions
 * GET /api/finance/transactions/deleted
 */
export async function getDeletedTransactions(
  page: number = 1,
  limit: number = 10
): Promise<TransactionsResponse> {
  const response = await apiClient.get('/api/finance/transactions/deleted', {
    params: { page, limit },
  });
  return response.data.data;
}

/**
 * Restore a deleted transaction
 * POST /api/finance/transactions/{id}/restore
 */
export async function restoreTransaction(id: string): Promise<Transaction> {
  const response = await apiClient.post(`/api/finance/transactions/${id}/restore`);
  return response.data.data;
}


/**
 * Recalculate finance summary from all transactions
 * POST /api/finance/recalculate
 */
export async function recalculateFinanceSummary(): Promise<FinanceSummary> {
  const response = await apiClient.post('/api/finance/recalculate');
  return response.data.data;
}

/**
 * Format amount to IDR currency
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
