import { apiClient, isAxiosError } from './axios';
import { fieldErrors, type LinkCore, type LinkPayload, type DailyPoint } from './linkHelpers';

export * from './linkHelpers';

// Types — Soul shortlinks (admin only). Shared as https://fariz.dev/s/<slug>;
// Cloudflare forwards /s/* to Soul, which records the click and redirects.
export interface Link extends LinkCore {
  id: number | string;
  short_url: string;
  /** Human clicks, all time (bots excluded). */
  clicks_count: number;
  last_clicked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LinksPage {
  data: Link[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export type StatsRange = '7d' | '30d' | '90d' | 'all';

export interface RankedItem {
  label: string;
  count: number;
}

export interface LinkStats {
  range: StatsRange;
  timezone: string;
  totals: { clicks: number; unique_visitors: number; bot_clicks: number };
  daily: DailyPoint[];
  referrers: RankedItem[];
  countries: RankedItem[];
  devices: RankedItem[];
  browsers: RankedItem[];
  os: RankedItem[];
}

/** Accepts both a bare object and a Laravel resource wrapper `{ data: {...} }`. */
function unwrap<T>(body: unknown, key: string): T {
  if (body && typeof body === 'object' && !(key in body) && 'data' in body) {
    const inner = (body as { data: unknown }).data;
    if (inner && typeof inner === 'object' && !Array.isArray(inner)) return inner as T;
  }
  return body as T;
}

/** Paginator as documented, or a resource collection with `meta`. */
function toPage(body: unknown): LinksPage {
  const b = (body ?? {}) as Partial<LinksPage> & { meta?: Partial<LinksPage> };
  const meta = b.meta ?? b;
  return {
    data: Array.isArray(b.data) ? b.data : [],
    current_page: Number(meta.current_page) || 1,
    last_page: Number(meta.last_page) || 1,
    per_page: Number(meta.per_page) || 20,
    total: Number(meta.total) || 0
  };
}

// A logged-in non-admin gets 403 here; that must not end their session.
const opts = { keepSessionOnForbidden: true };

/**
 * List links, newest first, 20 per page
 * GET /api/links?search=&page=
 */
export async function getLinks(page = 1, search = ''): Promise<LinksPage> {
  const params: Record<string, string | number> = { page };
  if (search.trim()) params.search = search.trim();
  const response = await apiClient.get('/api/links', { ...opts, params });
  return toPage(response.data);
}

/**
 * GET /api/links/{id}
 */
export async function getLink(id: string | number): Promise<Link> {
  const response = await apiClient.get(`/api/links/${id}`, opts);
  return unwrap<Link>(response.data, 'slug');
}

/**
 * POST /api/links → 201 + Link
 */
export async function createLink(data: LinkPayload): Promise<Link> {
  const response = await apiClient.post('/api/links', data, opts);
  return unwrap<Link>(response.data, 'slug');
}

/**
 * PATCH /api/links/{id} — partial update
 */
export async function updateLink(id: string | number, data: LinkPayload): Promise<Link> {
  const response = await apiClient.patch(`/api/links/${id}`, data, opts);
  return unwrap<Link>(response.data, 'slug');
}

/**
 * PATCH /api/links/{id}/toggle — flips is_active
 */
export async function toggleLink(id: string | number): Promise<Link> {
  const response = await apiClient.patch(`/api/links/${id}/toggle`, undefined, opts);
  return unwrap<Link>(response.data, 'slug');
}

/**
 * DELETE /api/links/{id} → 204 (click history goes with it)
 */
export async function deleteLink(id: string | number): Promise<void> {
  await apiClient.delete(`/api/links/${id}`, opts);
}

/**
 * GET /api/links/{id}/stats?range=
 */
export async function getLinkStats(id: string | number, range: StatsRange): Promise<LinkStats> {
  const response = await apiClient.get(`/api/links/${id}/stats`, { ...opts, params: { range } });
  return unwrap<LinkStats>(response.data, 'totals');
}

export type LinksErrorKind = 'unauthenticated' | 'forbidden' | 'not-found' | 'validation' | 'network' | 'other';

export interface LinksError {
  kind: LinksErrorKind;
  message: string;
  fields: Record<string, string>;
}

/** Normalizes an API failure into something the page can show. */
export function describeError(error: unknown): LinksError {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as { message?: string; error?: { message?: string } } | undefined;
    const apiMessage = data?.error?.message || data?.message;
    if (status === 401) return { kind: 'unauthenticated', message: 'Your session ended. Log in again.', fields: {} };
    if (status === 403) return { kind: 'forbidden', message: 'Only the admin account can manage links.', fields: {} };
    if (status === 404) return { kind: 'not-found', message: 'This link doesn’t exist (anymore).', fields: {} };
    if (status === 422) {
      return { kind: 'validation', message: apiMessage || 'Check the highlighted fields.', fields: fieldErrors(error.response?.data) };
    }
    if (!error.response) return { kind: 'network', message: 'Can’t reach Soul right now. Check your connection.', fields: {} };
    return { kind: 'other', message: apiMessage || `Soul answered with ${status}.`, fields: {} };
  }
  return { kind: 'other', message: error instanceof Error ? error.message : 'Something went wrong.', fields: {} };
}

/** Last list URL (with ?q=&page=) so the detail page can link back to the same spot. */
let lastListHref = '/links';
export function rememberListHref(href: string) {
  lastListHref = href;
}
export function listHref(): string {
  return lastListHref;
}
