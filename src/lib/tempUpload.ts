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
