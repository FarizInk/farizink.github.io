// GitHub public activity for the Home bento tile.
// Pure helpers (no relative imports) so `node --test` can load them directly.

export const GITHUB_USER = 'FarizInk';
export const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`;
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;

/** Unauthenticated API allows 60 requests/hour per visitor IP — cache well under that. */
export const CACHE_KEY = 'githubActivity';
export const CACHE_TTL_MS = 10 * 60 * 1000;

/** The few fields we keep from a raw GitHub event (also what gets cached). */
export interface SlimEvent {
  type: string;
  at: string;
  repo: string;
  action?: string;
  refType?: string;
  merged?: boolean;
}

export interface ActivityItem {
  verb: string;
  repo: string;
  url: string;
  at: string;
}

export interface Activity {
  /** Events per day, oldest first; last entry is today (viewer's local day). */
  days: number[];
  total: number;
  items: ActivityItem[];
}

export interface KVStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/** Validates and trims the raw API response; anything malformed is dropped. */
export function toSlim(raw: unknown): SlimEvent[] {
  if (!Array.isArray(raw)) return [];
  const out: SlimEvent[] = [];
  for (const e of raw) {
    if (!isObj(e) || typeof e.type !== 'string' || typeof e.created_at !== 'string') continue;
    if (!isObj(e.repo) || typeof e.repo.name !== 'string') continue;
    const p = isObj(e.payload) ? e.payload : {};
    const pr = isObj(p.pull_request) ? p.pull_request : {};
    const slim: SlimEvent = { type: e.type, at: e.created_at, repo: e.repo.name };
    if (typeof p.action === 'string') slim.action = p.action;
    if (typeof p.ref_type === 'string') slim.refType = p.ref_type;
    if (pr.merged === true) slim.merged = true;
    out.push(slim);
  }
  return out;
}

/** Human verb for an event, or null for noise (branch creation, PR assignment, …). */
export function describe(e: SlimEvent): string | null {
  switch (e.type) {
    case 'PushEvent':
      return 'Pushed to';
    case 'PullRequestEvent':
      if (e.action === 'opened') return 'Opened a PR in';
      if (e.action === 'closed' && e.merged) return 'Merged a PR in';
      return null;
    case 'PullRequestReviewEvent':
      return 'Reviewed a PR in';
    case 'IssuesEvent':
      return e.action === 'opened' ? 'Opened an issue in' : null;
    case 'IssueCommentEvent':
      return 'Commented in';
    case 'CreateEvent':
      return e.refType === 'repository' ? 'Created' : null;
    case 'ReleaseEvent':
      return e.action === 'published' ? 'Released' : null;
    case 'WatchEvent':
      return 'Starred';
    case 'ForkEvent':
      return 'Forked';
    default:
      return null;
  }
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function summarize(
  events: SlimEvent[],
  now: Date = new Date(),
  dayCount = 30,
  itemCount = 3
): Activity {
  const days = new Array<number>(dayCount).fill(0);
  const items: ActivityItem[] = [];
  const today = startOfDay(now);
  let total = 0;

  const sorted = [...events].sort((a, b) => b.at.localeCompare(a.at));
  for (const e of sorted) {
    const verb = describe(e);
    if (!verb) continue;
    const at = new Date(e.at);
    if (Number.isNaN(at.getTime())) continue;

    // Round, not floor: a DST shift makes a day 23 or 25 hours long.
    const ago = Math.round((today - startOfDay(at)) / 86_400_000);
    if (ago >= 0 && ago < dayCount) {
      days[dayCount - 1 - ago]++;
      total++;
    }

    const last = items[items.length - 1];
    if (items.length < itemCount && !(last && last.verb === verb && last.repo === e.repo)) {
      items.push({ verb, repo: e.repo, url: `https://github.com/${e.repo}`, at: e.at });
    }
  }
  return { days, total, items };
}

/** 0–4 intensity bucket for the activity strip. */
export function level(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

interface CacheEntry {
  savedAt: number;
  events: SlimEvent[];
}

/** Cached events, or null. `fresh` says whether they are still within the TTL. */
export function readCache(
  storage: KVStorage,
  now = Date.now()
): { events: SlimEvent[]; fresh: boolean } | null {
  try {
    const raw = storage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (typeof parsed?.savedAt !== 'number' || !Array.isArray(parsed.events)) return null;
    return { events: parsed.events, fresh: now - parsed.savedAt < CACHE_TTL_MS };
  } catch {
    return null;
  }
}

export function writeCache(storage: KVStorage, events: SlimEvent[], now = Date.now()): void {
  try {
    storage.setItem(CACHE_KEY, JSON.stringify({ savedAt: now, events } satisfies CacheEntry));
  } catch {
    // storage full or blocked — the tile still works without a cache
  }
}
