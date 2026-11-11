import { test } from 'node:test';
import assert from 'node:assert/strict';
import { domainToUnicode } from 'node:url';
import {
  buildUrl,
  hostnameToUnicode,
  isSpecialScheme,
  parseUrl,
  type ParsedUrl
} from '../src/lib/tools/url.ts';

function ok(input: string): ParsedUrl {
  const r = parseUrl(input);
  assert.equal(r.kind, 'ok', `expected ${input} to parse: ${r.kind === 'error' ? r.error : ''}`);
  return (r as { kind: 'ok'; url: ParsedUrl }).url;
}

test('empty input is empty, not an error', () => {
  assert.deepEqual(parseUrl(''), { kind: 'empty' });
  assert.deepEqual(parseUrl('   \n'), { kind: 'empty' });
});

test('non-http schemes are parsed as written', () => {
  const ws = ok('ws://host.example/socket');
  assert.equal(ws.protocol, 'ws:');
  assert.equal(ws.hostname, 'host.example');
  assert.equal(ws.assumedScheme, false);

  const wss = ok('wss://live.example');
  assert.equal(wss.scheme, 'wss');
  assert.equal(wss.effectivePort, '443');

  const mail = ok('mailto:x@example.com?subject=Hi');
  assert.equal(mail.protocol, 'mailto:');
  assert.equal(mail.pathname, 'x@example.com');
  assert.equal(mail.hostname, '');
  assert.equal(mail.origin, null);
  assert.equal(mail.effectivePort, '');
  assert.deepEqual(mail.params.map(p => [p.key, p.value]), [['subject', 'Hi']]);

  const pg = ok('postgres://u:p@db.local:5432/app');
  assert.equal(pg.protocol, 'postgres:');
  assert.equal(pg.username, 'u');
  assert.equal(pg.password, 'p');
  assert.equal(pg.hostname, 'db.local');
  assert.equal(pg.port, '5432');
  assert.equal(pg.portImplicit, false);
  assert.equal(pg.special, false);

  const ftp = ok('ftp://files.example/pub');
  assert.equal(ftp.protocol, 'ftp:');
  assert.equal(ftp.effectivePort, '21');
  assert.equal(ftp.portImplicit, true);
});

test('bare host input gets https://', () => {
  const u = ok('example.com/a?b=1');
  assert.equal(u.href, 'https://example.com/a?b=1');
  assert.equal(u.assumedScheme, true);
  assert.equal(ok('localhost:3000/x').href, 'https://localhost:3000/x');
  assert.equal(ok('example.com:8080').port, '8080');
  assert.equal(ok('//cdn.example.com/x.js').href, 'https://cdn.example.com/x.js');
});

test('implicit vs explicit ports', () => {
  const implicit = ok('https://example.com');
  assert.equal(implicit.port, '');
  assert.equal(implicit.effectivePort, '443');
  assert.equal(implicit.portImplicit, true);

  // The parser drops a default port even if typed.
  assert.equal(ok('http://example.com:80/').portImplicit, true);

  const explicit = ok('http://example.com:8080/');
  assert.equal(explicit.port, '8080');
  assert.equal(explicit.effectivePort, '8080');
  assert.equal(explicit.portImplicit, false);

  assert.equal(ok('ws://h.example').effectivePort, '80');
  const none = ok('custom://h.example/x');
  assert.equal(none.effectivePort, '');
  assert.equal(none.portImplicit, false);
});

test('credentials are shown decoded and raw', () => {
  const u = ok('https://al%20ice:p%40ss@example.com/');
  assert.equal(u.username, 'al ice');
  assert.equal(u.rawUsername, 'al%20ice');
  assert.equal(u.password, 'p@ss');
  assert.equal(u.rawPassword, 'p%40ss');
  assert.equal(ok('https://example.com').username, '');
});

test('query params keep order and duplicates', () => {
  const u = ok('https://e.com/?a=1&b=2&a=3&flag&&c=');
  assert.deepEqual(
    u.params.map(p => [p.key, p.value]),
    [
      ['a', '1'],
      ['b', '2'],
      ['a', '3'],
      ['flag', ''],
      ['c', '']
    ]
  );
});

test('encoded values are decoded, raw kept', () => {
  const u = ok('https://e.com/s?q=hello%20world&t=a+b&k%26=%E2%9C%93');
  assert.deepEqual(u.params, [
    { key: 'q', value: 'hello world', rawKey: 'q', rawValue: 'hello%20world' },
    { key: 't', value: 'a b', rawKey: 't', rawValue: 'a+b' },
    { key: 'k&', value: '✓', rawKey: 'k%26', rawValue: '%E2%9C%93' }
  ]);
});

test('path segments are decoded', () => {
  const u = ok('https://e.com/docs/my%20file/x.html');
  assert.deepEqual(u.pathSegments, ['docs', 'my file', 'x.html']);
  assert.deepEqual(ok('https://e.com').pathSegments, []);
});

test('hash keeps #, and a # inside the hash', () => {
  const u = ok('https://e.com/p?x=1#section-2#more');
  assert.equal(u.hash, '#section-2#more');
  assert.equal(u.search, '?x=1');
  assert.equal(ok('https://e.com/').hash, '');
});

test('invalid input gives a clear error', () => {
  for (const bad of ['hello world', '/just/a/path', 'http://exa mple.com', 'https://']) {
    const r = parseUrl(bad);
    assert.equal(r.kind, 'error', bad);
    assert.ok(r.kind === 'error' && r.error.length > 10);
  }
});

test('buildUrl round-trips unchanged params exactly', () => {
  const u = ok('https://e.com/s?q=hello%20world&a=1&a=2#top');
  assert.equal(buildUrl(u, u.params), u.href);
  assert.equal(buildUrl(u, u.params.map(p => ({ key: p.key, value: p.value }))), u.href);
});

test('buildUrl applies edits, keeps order, hash and duplicates', () => {
  const u = ok('https://e.com/s?a=1&b=2&a=3#top');
  const edited = [
    { key: 'a', value: '1' },
    { key: 'b', value: 'two words' },
    { key: 'a', value: '3' },
    { key: '', value: '' },
    { key: 'new', value: 'x&y' }
  ];
  assert.equal(buildUrl(u, edited), 'https://e.com/s?a=1&b=two+words&a=3&new=x%26y#top');
  assert.equal(buildUrl(u, []), 'https://e.com/s#top');
  const back = ok(buildUrl(u, edited));
  assert.deepEqual(
    back.params.map(p => [p.key, p.value]),
    edited.filter(p => p.key || p.value).map(p => [p.key, p.value])
  );
});

test('IDN hostname shown in Unicode', () => {
  const u = ok('https://münchen.de/');
  assert.equal(u.hostname, 'xn--mnchen-3ya.de');
  assert.equal(u.hostnameUnicode, 'münchen.de');
  assert.equal(ok('https://example.com').hostnameUnicode, null);
  for (const h of ['xn--mnchen-3ya.de', 'xn--fiqs8s.xn--fiqz9s', 'www.xn--bcher-kva.example', 'xn--ls8h.la']) {
    assert.equal(hostnameToUnicode(h), domainToUnicode(h), h);
  }
});

test('isSpecialScheme', () => {
  assert.equal(isSpecialScheme('https'), true);
  assert.equal(isSpecialScheme('WS:'), true);
  assert.equal(isSpecialScheme('file'), true);
  assert.equal(isSpecialScheme('mailto'), false);
  assert.equal(isSpecialScheme('postgres:'), false);
});
