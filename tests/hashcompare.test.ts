import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareDigests, detectAlgorithm, normalizeDigest } from '../src/lib/tools/hashcompare.ts';

// Digests of "hello world".
const SHA256_HEX = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
const SHA256_B64 = 'uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek=';

test('hex compares case-insensitively', () => {
  const r = compareDigests(SHA256_HEX, SHA256_HEX.toUpperCase());
  assert.equal(r.status, 'match');
  assert.equal(r.firstDifferenceIndex, null);
  assert.equal(r.comparedAs, 'hex');
});

test('base64 compares case-sensitively (lowercasing bug)', () => {
  const swapped = SHA256_B64.replace('uU0n', 'uu0n');
  const r = compareDigests(SHA256_B64, swapped);
  assert.equal(r.left.encoding, 'base64');
  assert.equal(r.status, 'mismatch');
  assert.equal(r.firstDifferenceIndex, 1);
});

test('SRI prefix is stripped and read as base64', () => {
  const d = normalizeDigest(`sha256-${SHA256_B64}`);
  assert.equal(d.value, SHA256_B64);
  assert.equal(d.encoding, 'base64');
  assert.equal(d.prefix, 'sha256-');
  assert.equal(d.declaredAlgorithm, 'SHA-256');
  assert.equal(compareDigests(`sha256-${SHA256_B64}`, SHA256_B64).status, 'match');
});

test('other labels: sha256:, SHA-256=, md5 ', () => {
  assert.equal(normalizeDigest(`sha256:${SHA256_HEX}`).value, SHA256_HEX);
  assert.equal(normalizeDigest(`sha256:${SHA256_HEX}`).encoding, 'hex');
  const digest = normalizeDigest(`SHA-256=${SHA256_B64}`);
  assert.equal(digest.value, SHA256_B64);
  assert.equal(digest.encoding, 'base64');
  const md5 = normalizeDigest('md5 5eb63bbbe01eeed093cb22bb8f5acdc3');
  assert.equal(md5.value, '5eb63bbbe01eeed093cb22bb8f5acdc3');
  assert.equal(md5.declaredAlgorithm, 'MD5');
});

test('sha256sum line keeps the filename', () => {
  const d = normalizeDigest(`${SHA256_HEX}  ubuntu-24.04.iso\n`);
  assert.equal(d.value, SHA256_HEX);
  assert.equal(d.filename, 'ubuntu-24.04.iso');
  const bin = normalizeDigest(`${SHA256_HEX} *file.bin`);
  assert.equal(bin.filename, 'file.bin');
  const bsd = normalizeDigest(`SHA256 (file.tar.gz) = ${SHA256_HEX}`);
  assert.equal(bsd.value, SHA256_HEX);
  assert.equal(bsd.filename, 'file.tar.gz');
  assert.equal(compareDigests(`${SHA256_HEX}  ubuntu-24.04.iso`, SHA256_HEX).status, 'match');
});

test('0x prefix is stripped', () => {
  const d = normalizeDigest(`0x${SHA256_HEX}`);
  assert.equal(d.value, SHA256_HEX);
  assert.equal(d.prefix, '0x');
  assert.equal(compareDigests(`0x${SHA256_HEX}`, SHA256_HEX).status, 'match');
});

test('whitespace and newlines inside are removed', () => {
  const grouped = SHA256_HEX.match(/.{1,8}/g)!.join(' ');
  const wrapped = `  ${SHA256_HEX.slice(0, 32)}\n${SHA256_HEX.slice(32)}\n`;
  assert.equal(normalizeDigest(grouped).value, SHA256_HEX);
  assert.equal(normalizeDigest(grouped).filename, undefined);
  assert.equal(normalizeDigest(wrapped).value, SHA256_HEX);
  const r = compareDigests(grouped, wrapped);
  assert.equal(r.status, 'match');
  assert.deepEqual(r.lengths, [64, 64]);
});

test('first difference index', () => {
  const changed = SHA256_HEX.slice(0, 10) + 'f' + SHA256_HEX.slice(11);
  assert.equal(compareDigests(SHA256_HEX, changed).firstDifferenceIndex, 10);
  const short = compareDigests(SHA256_HEX, SHA256_HEX.slice(0, 40));
  assert.equal(short.status, 'mismatch');
  assert.equal(short.firstDifferenceIndex, 40);
  assert.equal(short.sameAlgorithm, false);
});

test('algorithm detection by hex length', () => {
  const cases: [number, string][] = [
    [32, 'MD5'],
    [40, 'SHA-1'],
    [56, 'SHA-224'],
    [64, 'SHA-256'],
    [96, 'SHA-384'],
    [128, 'SHA-512']
  ];
  for (const [len, name] of cases) {
    const g = detectAlgorithm('a'.repeat(len), 'hex');
    assert.equal(g.algorithm, name);
    assert.equal(g.label, `likely ${name} (${len} hex)`);
  }
  assert.equal(detectAlgorithm('a'.repeat(50), 'hex').algorithm, 'unknown');
});

test('algorithm detection by base64 byte length', () => {
  const cases: [string, string][] = [
    ['XrY7u+Ae7tCTyyK7j1rNww==', 'MD5'],
    ['Kq5sNclPz7QV2+lfQIuc6R7oRu0=', 'SHA-1'],
    ['LwVHf8JLtPrv2GUXFW2v3s7EW4rTzyUipWNYKw==', 'SHA-224'],
    [SHA256_B64, 'SHA-256'],
    ['/b2OdaZ/KfcBpOBAOF4uI5hjA+oQI5IRr5B/y7g1eLPkF8txzmRu/QgZ3YwIjeG9', 'SHA-384'],
    ['MJ7MSJwS1utMxA9QyQLytNDtd+5RGnx6m808qG1M2G+YndNbxf9JlnDaNCVbRbDP2DDoH2Bdz33FVC6TrpzXbw==', 'SHA-512']
  ];
  for (const [value, name] of cases) {
    const d = normalizeDigest(value);
    assert.equal(d.encoding, 'base64', value);
    assert.equal(detectAlgorithm(d.value, d.encoding).algorithm, name);
  }
  assert.equal(detectAlgorithm('abc$', 'unknown').algorithm, 'unknown');
});

test('waiting with one side empty, empty with both', () => {
  assert.equal(compareDigests(SHA256_HEX, '').status, 'waiting');
  assert.equal(compareDigests('   ', SHA256_HEX).status, 'waiting');
  assert.equal(compareDigests('', ' \n').status, 'empty');
});

test('hex vs base64 of the same SHA-256 digest matches across encodings', () => {
  const r = compareDigests(SHA256_HEX, `sha256-${SHA256_B64}`);
  assert.equal(r.status, 'different-encoding');
  assert.equal(r.comparedAs, 'bytes');
  assert.equal(r.sameAlgorithm, true);
  assert.deepEqual(r.display, [SHA256_HEX, SHA256_HEX]);
  const other = compareDigests(SHA256_HEX.replace(/^b9/, '00'), SHA256_B64);
  assert.equal(other.status, 'mismatch');
  assert.equal(other.firstDifferenceIndex, 0);
});

test('password hashes are flagged', () => {
  assert.equal(normalizeDigest('$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy').passwordHash, true);
});
