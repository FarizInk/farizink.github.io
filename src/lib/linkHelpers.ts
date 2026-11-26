// Pure helpers for the shortlink manager (/links). No relative imports so
// `node --test` can load this file directly (tests/linkHelpers.test.ts).

export type LinkStatus = 'active' | 'disabled' | 'expired';

export interface LinkCore {
  title: string | null;
  slug: string;
  destination_url: string;
  is_active: boolean;
  expires_at: string | null;
}

export interface DailyPoint {
  date: string; // YYYY-MM-DD in the stats timezone
  clicks: number;
}

export interface ChartBar {
  /** First day in the bar (YYYY-MM-DD). */
  start: string;
  /** Last day in the bar (YYYY-MM-DD); equals `start` for daily bars. */
  end: string;
  clicks: number;
}

export const SLUG_PATTERN = /^[a-z0-9-]{1,64}$/;
export const MAX_URL_LENGTH = 2048;

/** Expired wins over disabled: switching an expired link on would not revive it. */
export function linkStatus(link: Pick<LinkCore, 'is_active' | 'expires_at'>, now = Date.now()): LinkStatus {
  if (link.expires_at) {
    const t = Date.parse(link.expires_at);
    if (!Number.isNaN(t) && t <= now) return 'expired';
  }
  return link.is_active ? 'active' : 'disabled';
}

export const STATUS_LABEL: Record<LinkStatus, string> = {
  active: 'Active',
  disabled: 'Off',
  expired: 'Expired'
};

/** Host without a leading "www.", or the raw value when it isn't a URL. */
export function destinationHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function displayTitle(link: Pick<LinkCore, 'title' | 'destination_url'>): string {
  const title = link.title?.trim();
  return title || destinationHost(link.destination_url);
}

let regionNames: Intl.DisplayNames | null | undefined;

/** ISO-2 code → country name ("ID" → "Indonesia"). "Unknown" and junk pass through. */
export function countryName(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return code;
  if (regionNames === undefined) {
    try {
      regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    } catch {
      regionNames = null;
    }
  }
  try {
    return regionNames?.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

/** Laravel 422 body `{ message, errors: { field: [msg] } }` → `{ field: msg }`. */
export function fieldErrors(data: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!data || typeof data !== 'object') return out;
  const errors = (data as { errors?: unknown }).errors;
  if (!errors || typeof errors !== 'object') return out;
  for (const [field, value] of Object.entries(errors as Record<string, unknown>)) {
    const msg = Array.isArray(value) ? value[0] : value;
    if (typeof msg === 'string' && msg) out[field] = msg;
  }
  return out;
}

export function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

export function slugError(slug: string, required: boolean): string | null {
  const s = normalizeSlug(slug);
  if (!s) return required ? 'The slug cannot be empty.' : null;
  if (s.length > 64) return 'Use at most 64 characters.';
  if (!SLUG_PATTERN.test(s)) return 'Use only a–z, 0–9 and hyphens.';
  return null;
}

export function urlError(url: string): string | null {
  const u = url.trim();
  if (!u) return 'Paste the destination URL.';
  if (u.length > MAX_URL_LENGTH) return `Keep it under ${MAX_URL_LENGTH} characters.`;
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return 'Only http and https links work.';
  } catch {
    return 'That doesn’t look like a full URL (https://…).';
  }
  return null;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** ISO timestamp → `<input type="datetime-local">` value in the browser's time zone. */
export function toLocalInput(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `datetime-local` value (local time) → ISO string, or null when empty/invalid. */
export function fromLocalInput(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function expiryError(value: string, now = Date.now()): string | null {
  if (!value) return null;
  const iso = fromLocalInput(value);
  if (!iso) return 'Pick a valid date and time.';
  if (Date.parse(iso) <= now) return 'Pick a moment in the future.';
  return null;
}

export interface LinkFormValues {
  destination_url: string;
  slug: string;
  title: string;
  /** datetime-local value, '' for none */
  expires_at: string;
}

export interface LinkPayload {
  destination_url?: string;
  slug?: string;
  title?: string | null;
  expires_at?: string | null;
}

/** Client-side check; mirrors the API rules so most mistakes never hit the network. */
export function validateForm(
  values: LinkFormValues,
  mode: 'create' | 'edit',
  original?: Pick<LinkCore, 'expires_at'>
): Record<string, string> {
  const errors: Record<string, string> = {};
  const url = urlError(values.destination_url);
  if (url) errors.destination_url = url;
  const slug = slugError(values.slug, mode === 'edit');
  if (slug) errors.slug = slug;
  // An untouched past expiry on an existing link is not the user's mistake.
  const unchanged = mode === 'edit' && values.expires_at === toLocalInput(original?.expires_at);
  const expiry = unchanged ? null : expiryError(values.expires_at);
  if (expiry) errors.expires_at = expiry;
  return errors;
}

export function createPayload(values: LinkFormValues): LinkPayload {
  const payload: LinkPayload = { destination_url: values.destination_url.trim() };
  const slug = normalizeSlug(values.slug);
  if (slug) payload.slug = slug;
  const title = values.title.trim();
  if (title) payload.title = title;
  const expires = fromLocalInput(values.expires_at);
  if (expires) payload.expires_at = expires;
  return payload;
}

/** Only the fields that changed; cleared title/expiry are sent as null. */
export function updatePayload(values: LinkFormValues, original: LinkCore): LinkPayload {
  const payload: LinkPayload = {};
  const url = values.destination_url.trim();
  if (url !== original.destination_url) payload.destination_url = url;
  const slug = normalizeSlug(values.slug);
  if (slug !== original.slug) payload.slug = slug;
  const title = values.title.trim();
  if (title !== (original.title ?? '')) payload.title = title || null;
  if (values.expires_at !== toLocalInput(original.expires_at)) {
    payload.expires_at = fromLocalInput(values.expires_at);
  }
  return payload;
}

export function formValuesFrom(link: LinkCore): LinkFormValues {
  return {
    destination_url: link.destination_url,
    slug: link.slug,
    title: link.title ?? '',
    expires_at: toLocalInput(link.expires_at)
  };
}

/**
 * Daily points → chart bars. Up to `maxBars` days stay daily; longer ranges
 * (all time) fold into 7-day bars counted back from the last day, so the last
 * bar always ends today and only the first one may be partial.
 */
export function chartBars(daily: DailyPoint[], maxBars = 120): { bars: ChartBar[]; unit: 'day' | 'week' } {
  if (daily.length <= maxBars) {
    return { bars: daily.map(d => ({ start: d.date, end: d.date, clicks: d.clicks })), unit: 'day' };
  }
  const bars: ChartBar[] = [];
  for (let end = daily.length; end > 0; end -= 7) {
    const chunk = daily.slice(Math.max(0, end - 7), end);
    bars.unshift({
      start: chunk[0].date,
      end: chunk[chunk.length - 1].date,
      clicks: chunk.reduce((sum, d) => sum + d.clicks, 0)
    });
  }
  return { bars, unit: 'week' };
}

/** Clean axis maximum: 1, 2, 5 × 10ⁿ (so half of it is a whole number), at least 4. */
export function niceMax(value: number): number {
  if (!Number.isFinite(value) || value <= 4) return 4;
  const exp = Math.pow(10, Math.floor(Math.log10(value)));
  for (const step of [1, 2, 5, 10]) {
    if (step * exp >= value) return step * exp;
  }
  return 10 * exp;
}

const dayFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const dayYearFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "2026-11-26" → "26 Nov" (or "26 Nov 2026"). Read as a calendar date, no tz shift. */
export function formatDay(date: string, withYear = false): string {
  const t = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(t)) return date;
  return (withYear ? dayYearFmt : dayFmt).format(t);
}

export function formatBarRange(bar: ChartBar, withYear = false): string {
  return bar.start === bar.end
    ? formatDay(bar.start, withYear)
    : `${formatDay(bar.start)} – ${formatDay(bar.end, withYear)}`;
}

const numberFmt = new Intl.NumberFormat('en-US');
const compactFmt = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export function formatCount(n: number): string {
  return numberFmt.format(Number.isFinite(n) ? n : 0);
}

/** Axis ticks: full under 10,000, compact above. */
export function formatTick(n: number): string {
  return n >= 10000 ? compactFmt.format(n) : numberFmt.format(n);
}

const dateTimeFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const t = Date.parse(iso);
  return Number.isNaN(t) ? '—' : dateFmt.format(t);
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const t = Date.parse(iso);
  return Number.isNaN(t) ? '—' : dateTimeFmt.format(t);
}

/** "3 min ago", "2 days ago"; falls back to a date after 30 days. */
export function relativeFrom(iso: string | null | undefined, now = Date.now()): string {
  if (!iso) return 'never';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return 'never';
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d <= 30) return d === 1 ? 'yesterday' : `${d} days ago`;
  return dateFmt.format(t);
}
