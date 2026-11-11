// Pure helpers for the Temp File Upload tool and the /files/:code page.
// Kept framework-free so `npm test` can exercise them with node --test.

/**
 * Presigned S3 URLs from the Soul backend live 1 hour (temporaryUrl 3600s),
 * while the files themselves live 24 hours. Treat a URL as stale a bit
 * before the real deadline so the UI never offers a link that is about to die.
 */
export const PRESIGNED_URL_TTL_MS = 50 * 60 * 1000;

/** True while a presigned URL issued at `issuedAt` should still work. */
export function isPresignedUrlFresh(
  issuedAt: string | undefined,
  now: number = Date.now()
): boolean {
  if (!issuedAt) return false;
  const issued = new Date(issuedAt).getTime();
  if (Number.isNaN(issued)) return false;
  return now - issued < PRESIGNED_URL_TTL_MS;
}

interface ApiErrorBody {
  message?: unknown;
  error?: { code?: unknown; message?: unknown } | unknown;
  errors?: Record<string, unknown>;
}

/**
 * Extract a human message from a Soul API error body.
 * - Custom errors (400/500): { success: false, error: { code, message } }
 * - Laravel validation (422): { message, errors }
 */
export function apiErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback;
  const b = body as ApiErrorBody;

  const nested = b.error;
  if (nested && typeof nested === 'object') {
    const msg = (nested as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim()) return msg;
  }
  if (typeof nested === 'string' && nested.trim()) return nested;

  if (typeof b.message === 'string' && b.message.trim()) return b.message;

  if (b.errors && typeof b.errors === 'object') {
    for (const value of Object.values(b.errors)) {
      const first = Array.isArray(value) ? value[0] : value;
      if (typeof first === 'string' && first.trim()) return first;
    }
  }

  return fallback;
}

/** Fallback text for statuses where the body is often not JSON (proxy/PHP limits, crashes). */
export function statusFallback(status: number, fallback: string): string {
  if (status === 413) return 'File is too large for the server to accept';
  if (status === 429) return 'Too many requests — please wait a moment and try again';
  if (status >= 500) return `Server error (${status}) — please try again later`;
  return fallback;
}

/** Read a failed fetch Response and return the best message to show. */
export async function readApiError(response: Response, fallback: string): Promise<string> {
  const body = await response.json().catch(() => null);
  return apiErrorMessage(body, statusFallback(response.status, fallback));
}

/**
 * Replace presigned URLs on `files` with fresh ones (matched by id). Files the
 * shortlink no longer returns get an empty URL — their old link is dead anyway.
 */
export function withFreshUrls<T extends { id: string; presigned_url: string }>(
  files: T[],
  fresh: { id: string; presigned_url: string }[]
): { files: T[]; missing: number } {
  const byId = new Map(fresh.map(f => [f.id, f.presigned_url]));
  let missing = 0;
  const updated = files.map(f => {
    const url = byId.get(f.id);
    if (!url) {
      missing++;
      return { ...f, presigned_url: '' };
    }
    return { ...f, presigned_url: url };
  });
  return { files: updated, missing };
}

/** Human file size: 0 Bytes, 512 Bytes, 1.5 KB, 12.34 MB … */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export interface SelectLimits {
  maxFiles: number;
  maxBytes: number;
}

export interface SelectResult<T> {
  /** New files to append to `existing`, in the order they came in. */
  accepted: T[];
  /** Files left out because the list was full. */
  skippedTooMany: number;
  /** Files left out because they exceed `maxBytes`. */
  skippedTooLarge: T[];
  /** Files whose name is already selected (names key the file list). */
  skippedDuplicate: number;
}

/**
 * Pick which of `incoming` can join `existing`: skip duplicate names and
 * oversized files individually, then fill up to `maxFiles` and count the rest.
 */
export function selectFiles<T extends { name: string; size: number }>(
  existing: readonly T[],
  incoming: readonly T[],
  { maxFiles, maxBytes }: SelectLimits
): SelectResult<T> {
  const names = new Set(existing.map(f => f.name));
  const accepted: T[] = [];
  const skippedTooLarge: T[] = [];
  let skippedTooMany = 0;
  let skippedDuplicate = 0;

  for (const file of incoming) {
    if (names.has(file.name)) {
      skippedDuplicate++;
      continue;
    }
    if (file.size > maxBytes) {
      skippedTooLarge.push(file);
      continue;
    }
    if (existing.length + accepted.length >= maxFiles) {
      skippedTooMany++;
      continue;
    }
    names.add(file.name);
    accepted.push(file);
  }

  return { accepted, skippedTooMany, skippedTooLarge, skippedDuplicate };
}

/** Transfer speed, e.g. "3.2 MB/s". Empty when unknown. */
export function formatSpeed(bytesPerSecond: number): string {
  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return '';
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
  let value = bytesPerSecond;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  const digits = value >= 100 || i === 0 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[i]}`;
}

/** Remaining time, e.g. "45s", "3m 05s", "1h 02m". Empty when unknown. */
export function formatEta(bytesRemaining: number, bytesPerSecond: number): string {
  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return '';
  if (!Number.isFinite(bytesRemaining) || bytesRemaining <= 0) return '0s';
  const total = Math.ceil(bytesRemaining / bytesPerSecond);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  if (h > 0) return `${h}h ${pad(m)}m`;
  if (m > 0) return `${m}m ${pad(s)}s`;
  return `${s}s`;
}

/**
 * Share of each file that has been sent, in percent, when one multipart
 * request carries them in order and `fraction` (0–1) of it has been sent.
 */
export function perFileProgress(sizes: readonly number[], fraction: number): number[] {
  const total = sizes.reduce((s, n) => s + n, 0);
  const f = Math.min(Math.max(Number.isFinite(fraction) ? fraction : 0, 0), 1);
  let sent = total * f;
  return sizes.map(size => {
    if (size <= 0) return f >= 1 || sent > 0 ? 100 : 0;
    const part = Math.min(Math.max(sent, 0), size);
    sent -= size;
    return Math.floor((part / size) * 100);
  });
}

/** "Expires in 2 days" / "Expires in 3h 12m" / "Expires in 5 minutes" / "Expires soon" / "Expired". */
export function formatExpiresAt(dateStr: string, now: number = Date.now()): string {
  const at = new Date(dateStr).getTime();
  if (Number.isNaN(at)) return '';
  const diffMs = at - now;
  if (diffMs <= 0) return 'Expired';
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24);
    return `Expires in ${days} day${days > 1 ? 's' : ''}`;
  }
  if (diffHours > 0) return `Expires in ${diffHours}h ${diffMins}m`;
  if (diffMins > 0) return `Expires in ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
  return 'Expires soon';
}

/** Error message for a failed XMLHttpRequest, same rules as readApiError. */
export function xhrErrorMessage(status: number, responseText: string, fallback: string): string {
  if (status === 0) return 'Network error — check your connection and try again';
  let body: unknown = null;
  try {
    body = responseText ? JSON.parse(responseText) : null;
  } catch {
    body = null;
  }
  return apiErrorMessage(body, statusFallback(status, fallback));
}

export interface UploadProgress {
  loaded: number;
  total: number;
}

export interface UploadHandle<T> {
  promise: Promise<T>;
  abort: () => void;
}

/** Thrown (as the rejection) when an upload is cancelled with `abort()`. */
export class UploadAbortedError extends Error {
  constructor() {
    super('Upload cancelled');
    this.name = 'UploadAbortedError';
  }
}

/**
 * POST `body` with XMLHttpRequest so upload progress can be reported.
 * Resolves with the parsed JSON body on 2xx, rejects with an Error carrying
 * the server's message otherwise (or UploadAbortedError on abort).
 */
export function uploadWithProgress<T>(
  url: string,
  body: FormData,
  onprogress: (p: UploadProgress) => void,
  fallback = 'Upload failed'
): UploadHandle<T> {
  const xhr = new XMLHttpRequest();
  const promise = new Promise<T>((resolve, reject) => {
    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onprogress({ loaded: e.loaded, total: e.total });
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as T);
        } catch {
          reject(new Error('Unexpected response from the server'));
        }
      } else {
        reject(new Error(xhrErrorMessage(xhr.status, xhr.responseText, fallback)));
      }
    };
    xhr.onerror = () => reject(new Error(xhrErrorMessage(0, '', fallback)));
    xhr.ontimeout = () => reject(new Error('Upload timed out — please try again'));
    xhr.onabort = () => reject(new UploadAbortedError());
    xhr.send(body);
  });
  return { promise, abort: () => xhr.abort() };
}
