import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ALGORITHMS,
  digest,
  hashAll,
  textToBytes,
  toHex,
  toBase64,
  formatDigest,
  normalizeExpected,
  matchesDigest,
  formatBytes
} from '../src/lib/tools/hash.ts';

async function hex(algorithm: (typeof ALGORITHMS)[number], text: string): Promise<string> {
  return toHex(await digest(algorithm, textToBytes(text)));
}

// RFC 1321 Appendix A.5 test suite.
const MD5_VECTORS: [string, string][] = [
  ['', 'd41d8cd98f00b204e9800998ecf8427e'],
  ['a', '0cc175b9c0f1b6a831c399e269772661'],
  ['abc', '900150983cd24fb0d6963f7d28e17f72'],
  ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
  ['abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
  ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'd174ab98d277d9f5a5611c2c9f419d9f'],
  [
    '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
    '57edf4a22be3c955ac49da2e2107b67a'
  ]
];

for (const [input, expected] of MD5_VECTORS) {
  test(`MD5 RFC 1321: ${JSON.stringify(input.length > 20 ? input.slice(0, 20) + '…' : input)}`, async () => {
    assert.equal(await hex('MD5', input), expected);
  });
}

test('MD5: padding boundaries (55, 56, 63, 64, 65 bytes) match node:crypto', async () => {
  const { createHash } = await import('node:crypto');
  for (const n of [55, 56, 63, 64, 65, 119, 120, 1000]) {
    const s = 'x'.repeat(n);
    assert.equal(await hex('MD5', s), createHash('md5').update(s).digest('hex'), `length ${n}`);
  }
});

test('SHA-1 known vectors', async () => {
  assert.equal(await hex('SHA-1', ''), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  assert.equal(await hex('SHA-1', 'abc'), 'a9993e364706816aba3e25717850c26c9cd0d89d');
});

test('SHA-256 known vectors', async () => {
  assert.equal(await hex('SHA-256', ''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert.equal(await hex('SHA-256', 'abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('SHA-512 known vectors', async () => {
  assert.equal(
    await hex('SHA-512', ''),
    'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e'
  );
  assert.equal(
    await hex('SHA-512', 'abc'),
    'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f'
  );
});

test('non-ASCII text is hashed as UTF-8 (values from node:crypto)', async () => {
  const s = 'café 日本';
  assert.equal(await hex('MD5', s), '59c190d9f1ebe4e93b59d54510b3d48c');
  assert.equal(await hex('SHA-1', s), 'b5bb092e7351381e12094e77a955cc72f3755b96');
  assert.equal(await hex('SHA-256', s), '5ce3bbb3520e72079460b7a3b2479cb0a9605f2f9963557dc77d9eb7361fe727');
  assert.equal(
    await hex('SHA-384', s),
    '5c10c2546e2f5dd81dfab893bbfce81e1fa79db549f7ab4a1dfd5360063a55f34ab6b97b2e19ee4b07d8fb686ef4522e'
  );
  assert.equal(
    await hex('SHA-512', s),
    'cc204bc89350761df1042f874efa86131ef38debcdff7e5539fc382eff2d59ad647e0a08f238cf3202bf814ba5a808bf715bc4ba17e142d9cfb9f8149c414c22'
  );
});

test('hashAll returns every algorithm in order', async () => {
  const all = await hashAll(textToBytes('abc'));
  assert.deepEqual(
    all.map(r => r.algorithm),
    [...ALGORITHMS]
  );
  assert.deepEqual(
    all.map(r => r.bytes.length),
    [16, 20, 32, 48, 64]
  );
});

test('formatDigest: hex lower/upper and Base64', async () => {
  const bytes = await digest('SHA-256', textToBytes('abc'));
  assert.equal(formatDigest(bytes, 'hex'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  assert.equal(formatDigest(bytes, 'hex', true), 'BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD');
  assert.equal(formatDigest(bytes, 'base64'), 'ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=');
  assert.equal(formatDigest(bytes, 'base64', true), toBase64(bytes), 'uppercase does not affect Base64');
});

test('normalizeExpected strips whitespace and labels', () => {
  assert.equal(normalizeExpected(''), '');
  assert.equal(normalizeExpected('   '), '');
  assert.equal(normalizeExpected('  ABC123  '), 'ABC123');
  assert.equal(normalizeExpected('sha256:abc123'), 'abc123');
  assert.equal(normalizeExpected('SHA-256=abc123'), 'abc123');
  assert.equal(normalizeExpected('sha512-AbC/+='), 'AbC/+=');
  assert.equal(normalizeExpected('md5: abc123'), 'abc123');
  assert.equal(normalizeExpected('0xDEADbeef'), 'DEADbeef');
  assert.equal(normalizeExpected('0xZZ+/'), '0xZZ+/', '0x kept when not followed by hex only');
});

test('matchesDigest: hex is case-insensitive, Base64 is exact', async () => {
  const bytes = await digest('SHA-256', textToBytes('abc'));
  const h = toHex(bytes);
  const b = toBase64(bytes);
  assert.ok(matchesDigest(h, bytes));
  assert.ok(matchesDigest(h.toUpperCase(), bytes));
  assert.ok(matchesDigest(`sha256:${h}`, bytes));
  assert.ok(matchesDigest(`0x${h}`, bytes));
  assert.ok(matchesDigest(`  ${h}\n`, bytes));
  assert.ok(matchesDigest(b, bytes));
  assert.ok(matchesDigest(`sha256-${b}`, bytes));
  assert.ok(matchesDigest(b.replace(/=+$/, ''), bytes));
  assert.ok(!matchesDigest(b.toLowerCase(), bytes));
  assert.ok(!matchesDigest(h.slice(1), bytes));
  assert.ok(!matchesDigest('', bytes));
});

test('formatBytes', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(1023), '1023 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(5 * 1024 * 1024), '5.0 MB');
});
