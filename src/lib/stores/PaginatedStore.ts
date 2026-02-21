import { writable, get, type Writable } from 'svelte/store';

/**
 * Generic pagination state interface
 */
export interface PaginationState {
  page: number;
  limit: number;
  hasMore: boolean;
  totalCount: number;
}

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Base class for stores with pagination support
 * Provides common pagination logic that can be reused across different stores
 */
export abstract class PaginatedStore<T> {
  // Pagination state
  protected currentPage: Writable<number>;
  protected hasMore: Writable<boolean>;
  protected totalCount: Writable<number>;
  protected limit: Writable<number>;

  // Data state
  protected data: Writable<T[]>;
  protected isLoading: Writable<boolean>;
  protected error: Writable<string | null>;

  constructor(initialLimit: number = 12) {
    this.currentPage = writable(1);
    this.hasMore = writable(true);
    this.totalCount = writable(0);
    this.limit = writable(initialLimit);

    this.data = writable([]);
    this.isLoading = writable(false);
    this.error = writable(null);
  }

  /**
   * Clear all data and reset pagination
   */
  clear(): void {
    this.data.set([]);
    this.currentPage.set(1);
    this.hasMore.set(true);
    this.totalCount.set(0);
  }

  /**
   * Reset store state
   */
  reset(): void {
    this.clear();
    this.isLoading.set(false);
    this.error.set(null);
  }

  /**
   * Load initial data (page 1) - clears existing data
   */
  async loadData(filters?: any): Promise<void> {
    const loading = get(this.isLoading);
    if (loading) return;

    this.isLoading.set(true);
    this.error.set(null);

    // Clear existing data and reset pagination for fresh load
    this.clear();

    try {
      await this._fetchData(1, get(this.limit), filters);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : String(error));
      this.data.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Load more data (pagination) - appends to existing data
   */
  async loadMore(filters?: any): Promise<void> {
    const loading = get(this.isLoading);
    const more = get(this.hasMore);

    if (loading || !more) return;

    this.isLoading.set(true);

    try {
      const nextPage = get(this.currentPage) + 1;
      await this._fetchData(nextPage, get(this.limit), filters, true); // true = append mode
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : String(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Abstract method to fetch data - must be implemented by subclasses
   * @param page - Page number to fetch
   * @param limit - Number of items per page
   * @param filters - Optional filters to apply
   * @param append - Whether to append to existing data or replace
   */
  protected abstract _fetchData(
    page: number,
    limit: number,
    filters?: any,
    append?: boolean
  ): Promise<void>;

  /**
   * Update pagination state after successful data fetch
   * @param response - Paginated response from API
   * @param append - Whether data was appended or replaced
   */
  protected updatePaginationState(
    response: PaginatedResponse<T>,
    append: boolean = false
  ): void {
    const { pagination, data: items } = response;

    if (append) {
      // Append new data to existing
      this.data.update(currentData => [...currentData, ...items]);
    } else {
      // Replace all data
      this.data.set(items);
    }

    this.currentPage.set(pagination.page);
    this.hasMore.set(pagination.page < pagination.totalPages);
    this.totalCount.set(pagination.total);
  }

  /**
   * Get current page
   */
  getCurrentPage(): number {
    return get(this.currentPage);
  }

  /**
   * Get total count
   */
  getTotalCount(): number {
    return get(this.totalCount);
  }

  /**
   * Check if there's more data to load
   */
  getHasMore(): boolean {
    return get(this.hasMore);
  }

  /**
   * Get loading state
   */
  getIsLoading(): boolean {
    return get(this.isLoading);
  }

  /**
   * Get current data
   */
  getData(): T[] {
    return get(this.data);
  }

  /**
   * Get error state
   */
  getError(): string | null {
    return get(this.error);
  }

  /**
   * Update a single item in the data array
   * @param idKey - The key to use for matching items
   * @param idValue - The value to match against
   * @param updatedItem - The updated item
   */
  updateItem(idKey: keyof T, idValue: any, updatedItem: T): void {
    this.data.update(currentData =>
      currentData.map(item =>
        item[idKey] === idValue ? updatedItem : item
      )
    );
  }

  /**
   * Remove an item from the data array
   * @param idKey - The key to use for matching items
   * @param idValue - The value to match against
   */
  removeItem(idKey: keyof T, idValue: any): void {
    this.data.update(currentData =>
      currentData.filter(item => item[idKey] !== idValue)
    );
  }

  /**
   * Prepend a new item to the beginning of the data array
   * @param item - Item to prepend
   */
  prependItem(item: T): void {
    this.data.update(currentData => [item, ...currentData]);
    this.totalCount.update(count => count + 1);
  }

  /**
   * Decrease total count (used when deleting items)
   */
  decrementCount(): void {
    this.totalCount.update(count => Math.max(0, count - 1));
  }
}
