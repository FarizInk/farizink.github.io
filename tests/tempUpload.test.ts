import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  apiErrorMessage,
  statusFallback,
  readApiError,
  isPresignedUrlFresh,
  withFreshUrls,
  PRESIGNED_URL_TTL_MS,
  selectFiles,
  formatEta,
  formatSpeed,
  formatExpiresAt,
  formatFileSize,
  perFileProgress,
  xhrErrorMessage
} from '../src/lib/tempUpload.ts';

test('apiErrorMessage reads nested custom error', () => {
  const body = { success: false, error: { code: 'UPLOAD_FAILED', message: 'Disk full' } };
  assert.equal(apiErrorMessage(body, 'x'), 'Disk full');
});

test('apiErrorMessage reads Laravel validation message', () => {
  const body = { message: 'The files.0 field must not be greater than 102400 kilobytes.', errors: {} };
  assert.equal(apiErrorMessage(body, 'x'), body.message);
});

test('apiErrorMessage falls back to first validation error', () => {
  const body = { errors: { file_ids: ['The file ids field is required.'] } };
  assert.equal(apiErrorMessage(body, 'x'), 'The file ids field is required.');
});

test('apiErrorMessage falls back for empty / non-object bodies', () => {
  assert.equal(apiErrorMessage(null, 'fb'), 'fb');
  assert.equal(apiErrorMessage('<html>', 'fb'), 'fb');
  assert.equal(apiErrorMessage({ error: { message: '' } }, 'fb'), 'fb');
});

test('statusFallback covers 413 and 5xx', () => {
  assert.match(statusFallback(413, 'fb'), /too large/);
  assert.match(statusFallback(500, 'fb'), /Server error \(500\)/);
  assert.equal(statusFallback(400, 'fb'), 'fb');
});

test('readApiError uses server message, then status fallback for non-JSON', async () => {
  const json = new Response(JSON.stringify({ success: false, error: { code: 'E', message: 'Boom' } }), {
    status: 500
  });
  assert.equal(await readApiError(json, 'fb'), 'Boom');

  const html = new Response('<h1>502 Bad Gateway</h1>', { status: 502 });
  assert.match(await readApiError(html, 'fb'), /Server error \(502\)/);

  const tooBig = new Response('', { status: 413 });
  assert.match(await readApiError(tooBig, 'fb'), /too large/);
});

test('isPresignedUrlFresh respects the 50 minute window', () => {
  const now = Date.parse('2026-11-02T12:00:00Z');
  assert.equal(isPresignedUrlFresh('2026-11-02T11:30:00Z', now), true);
  assert.equal(isPresignedUrlFresh(new Date(now - PRESIGNED_URL_TTL_MS).toISOString(), now), false);
  assert.equal(isPresignedUrlFresh('2026-11-02T10:00:00Z', now), false);
  assert.equal(isPresignedUrlFresh(undefined, now), false);
  assert.equal(isPresignedUrlFresh('garbage', now), false);
});

test('withFreshUrls swaps urls by id and counts missing', () => {
  const files = [
    { id: 'a', presigned_url: 'old-a', original_name: 'a.txt' },
    { id: 'b', presigned_url: 'old-b', original_name: 'b.txt' }
  ];
  const { files: out, missing } = withFreshUrls(files, [{ id: 'a', presigned_url: 'new-a' }]);
  assert.equal(out[0].presigned_url, 'new-a');
  assert.equal(out[0].original_name, 'a.txt');
  assert.equal(out[1].presigned_url, '');
  assert.equal(missing, 1);
});

const MB = 1024 * 1024;
const f = (name: string, size = 1) => ({ name, size });

test('selectFiles fills up to the limit and counts the rest', () => {
  const existing = [f('a'), f('b'), f('c'), f('d'), f('e'), f('f'), f('g'), f('h')];
  const r = selectFiles(existing, [f('x'), f('y'), f('z'), f('w')], { maxFiles: 10, maxBytes: 100 * MB });
  assert.deepEqual(r.accepted.map(x => x.name), ['x', 'y']);
  assert.equal(r.skippedTooMany, 2);
  assert.equal(r.skippedTooLarge.length, 0);
});

test('selectFiles skips oversized files individually and duplicates by name', () => {
  const r = selectFiles([f('a.txt')], [f('big.iso', 101 * MB), f('a.txt', 5), f('ok.png', 100 * MB), f('ok.png', 3)], {
    maxFiles: 10,
    maxBytes: 100 * MB
  });
  assert.deepEqual(r.accepted.map(x => x.name), ['ok.png']);
  assert.deepEqual(r.skippedTooLarge.map(x => x.name), ['big.iso']);
  assert.equal(r.skippedDuplicate, 2);
  assert.equal(r.skippedTooMany, 0);
});

test('selectFiles accepts nothing when already full', () => {
  const full = Array.from({ length: 10 }, (_, i) => f(`f${i}`));
  const r = selectFiles(full, [f('n'), f('huge', 200 * MB)], { maxFiles: 10, maxBytes: 100 * MB });
  assert.equal(r.accepted.length, 0);
  assert.equal(r.skippedTooMany, 1);
  assert.equal(r.skippedTooLarge.length, 1);
});

test('formatSpeed', () => {
  assert.equal(formatSpeed(0), '');
  assert.equal(formatSpeed(NaN), '');
  assert.equal(formatSpeed(500), '500 B/s');
  assert.equal(formatSpeed(1536), '1.5 KB/s');
  assert.equal(formatSpeed(3.2 * MB), '3.2 MB/s');
  assert.equal(formatSpeed(150 * MB), '150 MB/s');
});

test('formatEta', () => {
  assert.equal(formatEta(100, 0), '');
  assert.equal(formatEta(100, Infinity), '');
  assert.equal(formatEta(0, 10), '0s');
  assert.equal(formatEta(450, 10), '45s');
  assert.equal(formatEta(1850, 10), '3m 05s');
  assert.equal(formatEta(37_200, 10), '1h 02m');
});

test('formatFileSize', () => {
  assert.equal(formatFileSize(0), '0 Bytes');
  assert.equal(formatFileSize(512), '512 Bytes');
  assert.equal(formatFileSize(1536), '1.5 KB');
  assert.equal(formatFileSize(100 * MB), '100 MB');
});

test('perFileProgress splits overall progress across files in order', () => {
  assert.deepEqual(perFileProgress([100, 100], 0), [0, 0]);
  assert.deepEqual(perFileProgress([100, 100], 0.25), [50, 0]);
  assert.deepEqual(perFileProgress([100, 300], 0.5), [100, 33]);
  assert.deepEqual(perFileProgress([100, 100], 1), [100, 100]);
  assert.deepEqual(perFileProgress([100], 2), [100]);
});

test('formatExpiresAt uses the given now', () => {
  const now = Date.parse('2026-11-02T12:00:00Z');
  assert.equal(formatExpiresAt('2026-11-04T13:00:00Z', now), 'Expires in 2 days');
  assert.equal(formatExpiresAt('2026-11-02T15:12:30Z', now), 'Expires in 3h 12m');
  assert.equal(formatExpiresAt('2026-11-02T12:05:30Z', now), 'Expires in 5 minutes');
  assert.equal(formatExpiresAt('2026-11-02T12:00:30Z', now), 'Expires soon');
  assert.equal(formatExpiresAt('2026-11-02T11:00:00Z', now), 'Expired');
  assert.equal(formatExpiresAt('garbage', now), '');
  // Same timestamp, later clock → label moves on.
  assert.equal(formatExpiresAt('2026-11-02T15:12:30Z', now + 3 * 3600_000), 'Expires in 12 minutes');
});

test('xhrErrorMessage reads JSON body, then status fallback', () => {
  assert.equal(xhrErrorMessage(422, JSON.stringify({ message: 'Too many files' }), 'fb'), 'Too many files');
  assert.equal(xhrErrorMessage(500, JSON.stringify({ error: { message: 'Disk full' } }), 'fb'), 'Disk full');
  assert.match(xhrErrorMessage(413, '<html>413</html>', 'fb'), /too large/);
  assert.match(xhrErrorMessage(502, '', 'fb'), /Server error \(502\)/);
  assert.equal(xhrErrorMessage(400, 'nope', 'fb'), 'fb');
  assert.match(xhrErrorMessage(0, '', 'fb'), /Network error/);
});
