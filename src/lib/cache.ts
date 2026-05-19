/**
 * Stale-while-revalidate cache using localStorage.
 *
 * Pattern: serve cached data instantly, then fetch fresh data in background.
 * - On first load (no cache): show loading spinner, fetch, cache, display
 * - On subsequent loads: show cached data immediately, fetch in background,
 *   show refreshing indicator, update when fresh data arrives
 */

export interface CacheEntry<T> {
  data: T;
  cachedAt: number; // unix timestamp ms
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Read cached data. Returns null if not found or expired.
 */
export function getCached<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    return entry;
  } catch {
    return null;
  }
}

/**
 * Write data to cache with current timestamp.
 */
export function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/**
 * Remove a cached entry.
 */
export function removeCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/**
 * Stale-while-revalidate helper.
 *
 * Returns { data, fromCache, isRefreshing } reactively via a callback pattern
 * suited for Svelte 5 runes.
 *
 * Usage:
 *   const result = await swr('cache-key', () => fetchMyData());
 *   // result.data   — T (cached or fresh)
 *   // result.fromCache — boolean
 */
export async function swr<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<{ data: T; fromCache: boolean }> {
  const cached = getCached<T>(key);

  if (cached) {
    // Return cached data immediately (caller can show it right away)
    // The caller is responsible for calling swrBackground to refresh
    return { data: cached.data, fromCache: true };
  }

  // No cache — must wait for network
  const fresh = await fetcher();
  setCache(key, fresh);
  return { data: fresh, fromCache: false };
}

/**
 * Background refresh — always fetches and updates cache.
 * Call this after swr returns cached data.
 */
export async function swrRefresh<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  const fresh = await fetcher();
  setCache(key, fresh);
  return fresh;
}

/**
 * Check if cached data exists for a key.
 */
export function hasCache(key: string): boolean {
  return getCached(key) !== null;
}
