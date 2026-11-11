import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  encodeBytes,
  encodeText,
  decodeToBytes,
  bytesToText,
  toHexPreview,
  toDataUri,
  sniffMime,
  extForMime,
  formatBytes
} from '../src/lib/tools/base64.ts';

const utf8 = (s: string) => new TextEncoder().encode(s);

function decodeText(input: string): string {
  const r = decodeToBytes(input);
  assert.ok(r.ok, r.ok ? '' : r.error);
  const t = bytesToText(r.bytes);
  assert.ok(t.ok);
  return t.text;
}

const RFC4648: [string, string][] = [
  ['', ''],
  ['f', 'Zg=='],
  ['fo', 'Zm8='],
  ['foo', 'Zm9v'],
  ['foob', 'Zm9vYg=='],
  ['fooba', 'Zm9vYmE='],
  ['foobar', 'Zm9vYmFy']
];

test('encode: RFC 4648 test vectors', () => {
  for (const [plain, b64] of RFC4648) assert.equal(encodeText(plain), b64);
});

test('decode: RFC 4648 test vectors', () => {
  for (const [plain, b64] of RFC4648) assert.equal(decodeText(b64), plain);
});

test('encode: matches Buffer for every byte value and length', () => {
  const all = Uint8Array.from({ length: 256 }, (_, i) => i);
  for (let len = 0; len <= 256; len += 37) {
    const slice = all.subarray(0, len);
    assert.equal(encodeBytes(slice), Buffer.from(slice).toString('base64'));
  }
  const big = Uint8Array.from({ length: 100_003 }, (_, i) => (i * 31) & 255);
  assert.equal(encodeBytes(big), Buffer.from(big).toString('base64'));
  const back = decodeToBytes(encodeBytes(big));
  assert.ok(back.ok);
  assert.deepEqual(back.bytes, big);
});

test('UTF-8 text round-trips', () => {
  const text = 'héllo 日本 🎉';
  const b64 = encodeText(text);
  assert.equal(b64, Buffer.from(text, 'utf8').toString('base64'));
  assert.equal(decodeText(b64), text);
});

test('URL-safe encode uses -_ and can drop padding', () => {
  const bytes = Uint8Array.from([0xfb, 0xff, 0xbf, 0xfe]);
  assert.equal(encodeBytes(bytes), '+/+//g==');
  assert.equal(encodeBytes(bytes, { urlSafe: true }), '-_-__g==');
  assert.equal(encodeBytes(bytes, { urlSafe: true, padding: false }), '-_-__g');
  assert.equal(encodeText('f', { padding: false }), 'Zg');
});

test('decode accepts URL-safe alphabet and restores missing padding', () => {
  const r = decodeToBytes('-_-__g');
  assert.ok(r.ok);
  assert.deepEqual(Array.from(r.bytes), [0xfb, 0xff, 0xbf, 0xfe]);
  assert.equal(decodeText('Zm9vYg'), 'foob');
  assert.equal(decodeText('Zm9vYmE'), 'fooba');
  // JWT header segment (URL-safe, unpadded)
  assert.equal(decodeText('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'), '{"alg":"HS256","typ":"JWT"}');
});

test('decode ignores whitespace and newlines', () => {
  assert.equal(decodeText('  Zm9v\r\nYmFy\n\t'), 'foobar');
  assert.equal(decodeText('Zm 9v Ym E ='), 'fooba');
});

test('decode strips a data URI prefix and returns its MIME type', () => {
  const r = decodeToBytes('data:text/plain;charset=utf-8;base64,aGk=');
  assert.ok(r.ok);
  assert.equal(r.mime, 'text/plain');
  assert.equal(bytesToText(r.bytes).ok && (bytesToText(r.bytes) as { text: string }).text, 'hi');
  const plain = decodeToBytes('aGk=');
  assert.ok(plain.ok);
  assert.equal(plain.mime, undefined);
});

test('decode reports the position of an invalid character', () => {
  const r = decodeToBytes('Zm9v$mFy');
  assert.equal(r.ok, false);
  assert.match(!r.ok ? r.error : '', /Invalid character "\$" at position 5/);
  const prefixed = decodeToBytes('data:;base64,ab*c');
  assert.match(!prefixed.ok ? prefixed.error : '', /position 16/);
});

test('decode rejects impossible lengths and misplaced padding', () => {
  const r = decodeToBytes('Zm9vY');
  assert.equal(r.ok, false);
  assert.match(!r.ok ? r.error : '', /Impossible length: 5/);
  const after = decodeToBytes('Zg==Zg==');
  assert.equal(after.ok, false);
  assert.match(!after.ok ? after.error : '', /after "=" padding at position 5/);
  const wrong = decodeToBytes('Zm8==');
  assert.equal(wrong.ok, false);
  assert.match(!wrong.ok ? wrong.error : '', /Wrong padding/);
});

test('binary (non-UTF-8) bytes are detected as not text', () => {
  assert.deepEqual(bytesToText(Uint8Array.from([0x89, 0x50, 0x4e, 0x47])), { ok: false });
  assert.deepEqual(bytesToText(Uint8Array.from([0xc3, 0x28])), { ok: false });
  assert.deepEqual(bytesToText(utf8('ok')), { ok: true, text: 'ok' });
});

test('sniffMime recognises magic numbers', () => {
  const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0]);
  assert.equal(sniffMime(png)?.ext, 'png');
  assert.equal(sniffMime(Uint8Array.from([0xff, 0xd8, 0xff, 0xe0]))?.mime, 'image/jpeg');
  assert.equal(sniffMime(utf8('GIF89a...'))?.ext, 'gif');
  assert.equal(sniffMime(utf8('RIFF\0\0\0\0WEBPVP8 '))?.ext, 'webp');
  assert.equal(sniffMime(utf8('%PDF-1.7'))?.ext, 'pdf');
  assert.equal(sniffMime(Uint8Array.from([0x50, 0x4b, 0x03, 0x04]))?.ext, 'zip');
  assert.equal(sniffMime(Uint8Array.from([0x1f, 0x8b, 0x08]))?.ext, 'gz');
  assert.equal(sniffMime(utf8('hello')), null);
  assert.equal(sniffMime(new Uint8Array()), null);
  assert.equal(extForMime('image/png'), 'png');
  assert.equal(extForMime('application/x-unknown'), 'bin');
  assert.equal(extForMime(undefined), 'bin');
});

test('line wrap at 76 characters', () => {
  const bytes = Uint8Array.from({ length: 200 }, (_, i) => i);
  const wrapped = encodeBytes(bytes, { lineWrap76: true });
  const lines = wrapped.split('\n');
  assert.equal(lines.length, Math.ceil(encodeBytes(bytes).length / 76));
  for (const line of lines.slice(0, -1)) assert.equal(line.length, 76);
  assert.equal(lines.join(''), encodeBytes(bytes));
  const back = decodeToBytes(wrapped);
  assert.ok(back.ok);
  assert.deepEqual(back.bytes, bytes);
  assert.equal(encodeText('short', { lineWrap76: true }).includes('\n'), false);
});

test('toDataUri and toHexPreview', () => {
  assert.equal(toDataUri(utf8('hi'), 'text/plain'), 'data:text/plain;base64,aGk=');
  assert.equal(toDataUri(utf8('hi')), 'data:application/octet-stream;base64,aGk=');
  const preview = toHexPreview(utf8('ABC'));
  assert.match(preview, /^00000000 {2}41 42 43 +\|ABC\|$/);
  const long = toHexPreview(new Uint8Array(40), 32);
  assert.equal(long.split('\n').length, 3);
  assert.match(long, /… 8 more bytes$/);
});

test('formatBytes', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(3 * 1024 * 1024), '3 MB');
});
