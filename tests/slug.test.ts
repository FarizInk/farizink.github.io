import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, slugifyLines, uniqueSlugs } from '../src/lib/tools/slug.ts';

test('defaults: lowercase, hyphen', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
  assert.equal(slugify(''), '');
  assert.equal(slugify('   '), '');
});

test('every separator works, including none (no regex crash)', () => {
  assert.equal(slugify('Hello World', { separator: '' }), 'helloworld');
  assert.equal(slugify('Hello World', { separator: '_' }), 'hello_world');
  assert.equal(slugify('Hello World', { separator: '.' }), 'hello.world');
  assert.equal(slugify('a.b..c', { separator: '.' }), 'a.b.c');
});

test('accented Latin is transliterated', () => {
  assert.equal(slugify('Café Crème Brûlée naïve'), 'cafe-creme-brulee-naive');
  assert.equal(slugify('Ångström Øresund Łódź'), 'angstrom-oresund-lodz');
});

test('letters NFKD does not decompose', () => {
  assert.equal(slugify('Straße'), 'strasse');
  assert.equal(slugify('Æsir Ærø'), 'aesir-aero');
  assert.equal(slugify('Œuvre Þing Đorđe'), 'oeuvre-thing-dorde');
  assert.equal(slugify('ÆSIR', { lowercase: false }), 'AESIR');
});

test('non-Latin letters: dropped by default, kept with keepUnicode', () => {
  assert.equal(slugify('Café 日本語 test'), 'cafe-test');
  assert.equal(slugify('日本語 Café'), 'cafe');
  assert.equal(slugify('日本語'), '');
  assert.equal(slugify('Café 日本語 test', { keepUnicode: true }), 'cafe-日本語-test');
  assert.equal(slugify('がんばって', { keepUnicode: true }), 'がんばって');
  assert.equal(slugify('Привет Мир', { keepUnicode: true }), 'привет-мир');
});

test('emoji and punctuation removed', () => {
  assert.equal(slugify('Hello, World! 🎉🚀 (2026) — “quoted”?'), 'hello-world-2026-quoted');
  assert.equal(slugify("Don't stop"), 'dont-stop');
});

test('repeated spaces and separators collapse; ends trimmed', () => {
  assert.equal(slugify('  --hello   ___ world--  '), 'hello-world');
  assert.equal(slugify('__a__b__', { separator: '_' }), 'a_b');
});

test('maxLength breaks at word boundary and never ends with a separator', () => {
  const title = 'How to Create Amazing URL Slugs';
  assert.equal(slugify(title, { maxLength: 20 }), 'how-to-create');
  assert.equal(slugify(title, { maxLength: 20, breakAtWord: false }), 'how-to-create-amazin');
  assert.equal(slugify(title, { maxLength: 14, breakAtWord: false }), 'how-to-create');
  assert.equal(slugify('Supercalifragilistic word', { maxLength: 5 }), 'super');
  assert.equal(slugify(title, { maxLength: 0 }), 'how-to-create-amazing-url-slugs');
  for (let n = 1; n < 40; n++) {
    const s = slugify(title, { maxLength: n });
    assert.ok(s.length <= n);
    assert.ok(!s.endsWith('-') && !s.startsWith('-'));
  }
});

test('stop words removed only when asked', () => {
  const t = 'The Ultimate Guide to Web Development in 2024';
  assert.equal(slugify(t), 'the-ultimate-guide-to-web-development-in-2024');
  assert.equal(slugify(t, { removeStopWords: true }), 'ultimate-guide-web-development-2024');
  assert.equal(slugify('To Be', { removeStopWords: true }), 'to-be');
});

test('& becomes "and" when asked, otherwise it is dropped', () => {
  assert.equal(slugify('Salt & Pepper', { ampersand: true }), 'salt-and-pepper');
  assert.equal(slugify('R&D', { ampersand: true }), 'r-and-d');
  assert.equal(slugify('Salt & Pepper'), 'salt-pepper');
});

test('slugifyLines: one slug per non-empty line', () => {
  assert.deepEqual(slugifyLines('First Post\n\n  \r\nSecond Post\r\n🎉\nThird'), [
    'first-post',
    'second-post',
    'third'
  ]);
  assert.deepEqual(slugifyLines(''), []);
});

test('uniqueSlugs appends -2, -3 to repeats', () => {
  assert.deepEqual(uniqueSlugs(['a', 'b', 'a', 'a', 'b']), ['a', 'b', 'a-2', 'a-3', 'b-2']);
  assert.deepEqual(uniqueSlugs(['a', 'a-2', 'a']), ['a', 'a-2', 'a-3']);
  assert.deepEqual(uniqueSlugs(['a', 'a'], '_'), ['a', 'a_2']);
});

test('idempotent: slugify(slug) === slug', () => {
  const inputs = ['Café Crème Brûlée naïve 日本語', 'Hello,   World!!', 'Straße & Æsir', 'x'];
  const variants = [
    {},
    { separator: '_' },
    { separator: '.' },
    { separator: '' },
    { keepUnicode: true },
    { ampersand: true, removeStopWords: true },
    { maxLength: 10 }
  ];
  for (const input of inputs) {
    for (const v of variants) {
      const once = slugify(input, v);
      assert.equal(slugify(once, v), once, `${input} ${JSON.stringify(v)}`);
    }
  }
});
