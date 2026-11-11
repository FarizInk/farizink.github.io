import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  apiErrorMessage,
  statusFallback,
  readApiError,
  isPresignedUrlFresh,
  withFreshUrls,
  PRESIGNED_URL_TTL_MS
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
