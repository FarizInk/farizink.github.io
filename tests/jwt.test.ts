import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  base64UrlDecode,
  base64UrlToBytes,
  decodeJwt,
  normalizeToken,
  relativeTime,
  verifyHmac,
  type Finding
} from '../src/lib/tools/jwt.ts';

const SECRET = 'test-secret';
const NOW = Date.UTC(2026, 10, 11, 12, 0, 0); // fixed clock
const NOW_S = NOW / 1000;

const b64url = (v: unknown) =>
  Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');

function sign(payload: unknown, header: Record<string, unknown> = { alg: 'HS256', typ: 'JWT' }, secret = SECRET) {
  const h = b64url(header);
  const p = b64url(payload);
  const algs: Record<string, string> = { HS256: 'sha256', HS384: 'sha384', HS512: 'sha512' };
  const alg = algs[String(header.alg)];
  const s = alg ? createHmac(alg, secret).update(`${h}.${p}`).digest('base64url') : '';
  return `${h}.${p}.${s}`;
}

function codes(findings: Finding[]) {
  return findings.map(f => f.code).sort();
}

function jws(input: string, now = NOW) {
  const r = decodeJwt(input, now);
  if (r.kind !== 'jws') assert.fail(`expected jws, got ${JSON.stringify(r)}`);
  return r;
}

function err(input: string) {
  const r = decodeJwt(input, NOW);
  if (r.kind !== 'error') assert.fail(`expected error, got ${r.kind}`);
  return r.error;
}

test('base64UrlDecode: handles - and _ and missing padding', () => {
  // 0xfb 0xff → "+/8" in base64, "-_8" in base64url
  assert.deepEqual([...base64UrlToBytes('-_8')], [0xfb, 0xff]);
  assert.deepEqual([...base64UrlToBytes('-_8=')], [0xfb, 0xff]);
  assert.equal(base64UrlDecode('YQ'), 'a');
  assert.equal(base64UrlDecode('YWI'), 'ab');
  assert.equal(base64UrlDecode('YWJj'), 'abc');
});

test('base64UrlDecode: UTF-8 is decoded properly, not as Latin-1', () => {
  assert.equal(base64UrlDecode(b64url('Jöhn')), 'Jöhn');
  assert.equal(base64UrlDecode(b64url('日本')), '日本');
});

test('base64UrlDecode: rejects bad alphabet, impossible length and invalid UTF-8', () => {
  assert.throws(() => base64UrlDecode('ab+c'), /alphabet/);
  assert.throws(() => base64UrlDecode('abcde'), /length/);
  assert.throws(() => base64UrlDecode(Buffer.from([0xff, 0xfe]).toString('base64url')), /UTF-8/);
});

test('decodeJwt: UTF-8 claims survive', () => {
  const r = jws(sign({ name: 'Jöhn', place: '日本', exp: NOW_S + 3600 }));
  assert.equal(r.payload.name, 'Jöhn');
  assert.equal(r.payload.place, '日本');
  assert.equal(r.header.alg, 'HS256');
  assert.equal(r.alg, 'HS256');
});

test('decodeJwt: signature with - and _ is kept as base64url', () => {
  // find a payload whose signature contains - or _
  let token = '';
  for (let i = 0; i < 200 && !/[-_]/.test(token.split('.')[2] ?? ''); i++) token = sign({ i, exp: NOW_S + 60 });
  assert.match(token.split('.')[2], /[-_]/);
  const r = jws(token);
  assert.equal(r.signature, token.split('.')[2]);
  assert.equal(r.segments.header, token.split('.')[0]);
});

test('decodeJwt: trims whitespace and strips Bearer prefix', () => {
  const token = sign({ sub: 'x', exp: NOW_S + 60 });
  assert.equal(normalizeToken(`  Bearer ${token}\n`), token);
  assert.equal(normalizeToken(`bearer   ${token}`), token);
  const r = jws(`\n  Bearer ${token}  \n`);
  assert.equal(r.token, token);
  assert.equal(r.payload.sub, 'x');
});

test('decodeJwt: empty input', () => {
  assert.equal(decodeJwt('   ', NOW).kind, 'empty');
  assert.equal(decodeJwt('Bearer ', NOW).kind, 'empty');
});

test('findings: expired', () => {
  const r = jws(sign({ exp: NOW_S - 2 * 86400 }));
  assert.deepEqual(codes(r.findings), ['expired']);
  assert.equal(r.findings[0].level, 'error');
  assert.match(r.findings[0].message, /2 d ago/);
});

test('findings: valid window has no findings', () => {
  const r = jws(sign({ iat: NOW_S - 60, nbf: NOW_S - 60, exp: NOW_S + 3 * 3600 }));
  assert.deepEqual(r.findings, []);
});

test('findings: not yet valid (nbf in the future)', () => {
  const r = jws(sign({ nbf: NOW_S + 3600, exp: NOW_S + 7200 }));
  assert.deepEqual(codes(r.findings), ['not-yet-valid']);
  assert.match(r.findings[0].message, /in 1 h/);
});

test('findings: iat in the future beyond skew; small skew tolerated', () => {
  assert.deepEqual(codes(jws(sign({ iat: NOW_S + 3600, exp: NOW_S + 7200 })).findings), ['issued-in-future']);
  assert.deepEqual(jws(sign({ iat: NOW_S + 30, exp: NOW_S + 7200 })).findings, []);
});

test('findings: missing exp is info', () => {
  const r = jws(sign({ sub: 'x' }));
  assert.deepEqual(codes(r.findings), ['missing-exp']);
  assert.equal(r.findings[0].level, 'info');
});

test('findings: non-numeric time claim', () => {
  const r = jws(sign({ exp: '2030-01-01' }));
  assert.deepEqual(codes(r.findings), ['bad-time-claim']);
});

test('findings: alg none is a warning', () => {
  const token = sign({ sub: 'x', exp: NOW_S + 60 }, { alg: 'none' });
  assert.ok(token.endsWith('.'));
  const r = jws(token);
  assert.deepEqual(codes(r.findings), ['alg-none']);
  assert.equal(r.findings[0].level, 'warning');
  assert.equal(r.signature, '');
});

test('decodeJwt: 5 parts is reported as JWE', () => {
  const h = b64url({ alg: 'RSA-OAEP', enc: 'A256GCM' });
  const r = decodeJwt(`${h}.a2V5.aXY.Y2lwaGVy.dGFn`, NOW);
  assert.equal(r.kind, 'jwe');
  if (r.kind !== 'jwe') return;
  assert.equal(r.alg, 'RSA-OAEP');
  assert.equal(r.parts.length, 5);
  assert.match(r.message, /encrypted/i);
});

test('decodeJwt: wrong number of parts', () => {
  assert.match(err('abc'), /No dots/);
  assert.match(err('a.b'), /found 2/);
  assert.match(err('a.b.c.d'), /found 4/);
});

test('decodeJwt: specific segment errors', () => {
  const okP = b64url({ sub: 'x' });
  const okH = b64url({ alg: 'HS256' });
  assert.match(err(`.${okP}.sig`), /Header segment is empty/);
  assert.match(err(`a*b.${okP}.sig`), /Header is not valid base64url/);
  assert.match(err(`${b64url('not json')}.${okP}.sig`), /Header decodes to text that is not JSON/);
  assert.match(err(`${b64url('[1]')}.${okP}.sig`), /Header is JSON but not an object/);
  assert.match(err(`${okH}.a$b.sig`), /Payload is not valid base64url/);
  assert.match(err(`${okH}.${b64url('{oops')}.sig`), /Payload decodes to text that is not JSON/);
  assert.match(err(`${okH}.${okP}.si+g`), /Signature is not valid base64url/);
});

test('relativeTime', () => {
  assert.equal(relativeTime(new Date(NOW + 3 * 3600_000), NOW), 'in 3 h');
  assert.equal(relativeTime(new Date(NOW - 2 * 86400_000), NOW), '2 d ago');
  assert.equal(relativeTime(new Date(NOW - 90_000), NOW), '1 min ago');
  assert.equal(relativeTime(new Date(NOW + 2000), NOW), 'just now');
  assert.equal(relativeTime(new Date(NOW + 400 * 86400_000), NOW), 'in 1 y');
});

test('verifyHmac: HS256 valid / invalid secret', async () => {
  const token = sign({ sub: 'x' });
  assert.equal(await verifyHmac(token, SECRET), 'valid');
  assert.equal(await verifyHmac(`Bearer ${token}`, SECRET), 'valid');
  assert.equal(await verifyHmac(token, 'wrong'), 'invalid');
  assert.equal(await verifyHmac(token, ''), 'invalid');
});

test('verifyHmac: HS384 and HS512', async () => {
  assert.equal(await verifyHmac(sign({ a: 1 }, { alg: 'HS384' }), SECRET), 'valid');
  assert.equal(await verifyHmac(sign({ a: 1 }, { alg: 'HS512' }), SECRET), 'valid');
  assert.equal(await verifyHmac(sign({ a: 1 }, { alg: 'HS512' }), 'nope'), 'invalid');
});

test('verifyHmac: base64-encoded secret', async () => {
  const raw = Buffer.from([1, 2, 3, 250, 251, 252]);
  const h = b64url({ alg: 'HS256' });
  const p = b64url({ a: 1 });
  const s = createHmac('sha256', raw).update(`${h}.${p}`).digest('base64url');
  assert.equal(await verifyHmac(`${h}.${p}.${s}`, raw.toString('base64'), { secretEncoding: 'base64' }), 'valid');
});

test('verifyHmac: unsupported alg and malformed token', async () => {
  const rs = `${b64url({ alg: 'RS256' })}.${b64url({ a: 1 })}.c2ln`;
  assert.equal(await verifyHmac(rs, SECRET), 'unsupported-alg');
  assert.equal(await verifyHmac(sign({ a: 1 }, { alg: 'none' }), SECRET), 'unsupported-alg');
  assert.equal(await verifyHmac('nope', SECRET), 'malformed');
});
