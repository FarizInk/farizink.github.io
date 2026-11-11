import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  encodeUrl,
  decodeUrl,
  looksEncoded,
  encodeUrlLines,
  decodeUrlLines,
  isUrlMode,
  type UrlResult
} from '../src/lib/tools/urlencode.ts';

function value(r: UrlResult): string {
  assert.equal(r.ok, true, r.ok ? '' : r.message);
  return (r as { ok: true; value: string }).value;
}

function message(r: UrlResult): string {
  assert.equal(r.ok, false);
  return (r as { ok: false; message: string }).message;
}

const URL_IN = 'https://example.com/a path/café?q=hello world&x=1#top';

test('component mode escapes everything reserved', () => {
  assert.equal(
    value(encodeUrl(URL_IN, 'component')),
    'https%3A%2F%2Fexample.com%2Fa%20path%2Fcaf%C3%A9%3Fq%3Dhello%20world%26x%3D1%23top'
  );
});

test('uri mode keeps the URL structure', () => {
  assert.equal(value(encodeUrl(URL_IN, 'uri')), 'https://example.com/a%20path/caf%C3%A9?q=hello%20world&x=1#top');
});

test('form mode uses + for spaces and matches URLSearchParams', () => {
  const v = value(encodeUrl(URL_IN, 'form'));
  assert.equal(v, 'https%3A%2F%2Fexample.com%2Fa+path%2Fcaf%C3%A9%3Fq%3Dhello+world%26x%3D1%23top');
  for (const s of [URL_IN, "it's (fine)! ~ok* a+b", 'ünï 🎉']) {
    assert.equal(value(encodeUrl(s, 'form')), new URLSearchParams({ k: s }).toString().slice(2));
  }
});

test('form decode turns + into space; component keeps +', () => {
  assert.equal(value(decodeUrl('hello+world%2B1', 'form')), 'hello world+1');
  assert.equal(value(decodeUrl('hello+world%2B1', 'component')), 'hello+world+1');
});

test('uri decode keeps reserved escapes, decodes the rest', () => {
  assert.equal(value(decodeUrl('a%2Fb%20c%3Fd%C3%A9', 'uri')), 'a%2Fb c%3Fdé');
  assert.equal(value(decodeUrl('a%2Fb%20c%3Fd%C3%A9', 'component')), 'a/b c?dé');
});

test('round-trips in every mode', () => {
  const samples = [URL_IN, 'ünï 🎉 + & = ?', "!'()*~-._", ''];
  for (const mode of ['component', 'form'] as const) {
    for (const s of samples) {
      assert.equal(value(decodeUrl(value(encodeUrl(s, mode)), mode)), s, `${mode}: ${s}`);
    }
  }
  // uri mode keeps reserved characters literal, so a whole URL round-trips.
  assert.equal(value(decodeUrl(value(encodeUrl(URL_IN, 'uri')), 'uri')), URL_IN);
});

test('matches the built-ins', () => {
  const s = 'a%2Fb%20%E2%82%AC%F0%9F%8E%89';
  assert.equal(value(decodeUrl(s, 'component')), decodeURIComponent(s));
  assert.equal(value(decodeUrl(s, 'uri')), decodeURI(s));
});

test('malformed escapes give a clear error with position', () => {
  const zz = message(decodeUrl('abc%zz', 'component'));
  assert.match(zz, /%zz/);
  assert.match(zz, /character 4/);
  assert.match(message(decodeUrl('100%', 'component')), /character 4/);
  const trunc = message(decodeUrl('x%E0%A4', 'component'));
  assert.match(trunc, /UTF-8/);
  assert.match(trunc, /character 2/);
  assert.match(message(decodeUrl('%FF', 'form')), /UTF-8/);
});

test('lone surrogate cannot be encoded', () => {
  assert.match(message(encodeUrl('a\uD800b', 'component')), /surrogate/);
});

test('looksEncoded detects existing escapes', () => {
  assert.equal(looksEncoded('hello%20world'), true);
  assert.equal(looksEncoded('caf%C3%A9'), true);
  assert.equal(looksEncoded('hello world'), false);
  assert.equal(looksEncoded('100% sure'), false);
  assert.equal(looksEncoded('%E0%A4'), false);
  // Encoding encoded text again double-encodes — what the warning is for.
  assert.equal(value(encodeUrl('hello%20world', 'component')), 'hello%2520world');
});

test('batch helpers work line by line and keep empty lines', () => {
  assert.equal(value(encodeUrlLines('a b\n\nc/d', 'component')), 'a%20b\n\nc%2Fd');
  assert.equal(value(decodeUrlLines('a+b\r\nc%2Fd', 'form')), 'a b\nc/d');
  assert.match(message(decodeUrlLines('ok\nbad%zz', 'component')), /^Line 2: /);
});

test('isUrlMode', () => {
  assert.equal(isUrlMode('form'), true);
  assert.equal(isUrlMode('nope'), false);
});
