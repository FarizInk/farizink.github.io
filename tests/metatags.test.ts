import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  EMPTY_INPUT,
  EXAMPLE_INPUT,
  escapeAttr,
  buildMetaTags,
  buildJsonLd,
  buildHtmlDocument,
  validate,
  toIsoWithOffset,
  splitTags,
  truncate,
  breadcrumb,
  parseSaved,
  type MetaInput
} from '../src/lib/tools/metatags.ts';

const input = (over: Partial<MetaInput> = {}): MetaInput => ({ ...EMPTY_INPUT, ...over });
const html = (over: Partial<MetaInput> = {}) => buildMetaTags(input(over)).html;

test('escapeAttr escapes & < > " \'', () => {
  assert.equal(escapeAttr(`a & <b> "c" 'd'`), 'a &amp; &lt;b&gt; &quot;c&quot; &#39;d&#39;');
});

test('quotes, ampersands and < cannot break out of attributes', () => {
  const out = html({ title: 'The "Best" site', description: 'Tom & Jerry <script>alert(1)</script> "x" onload="y' });
  assert.ok(out.includes('<title>The &quot;Best&quot; site</title>'));
  assert.ok(out.includes('<meta property="og:title" content="The &quot;Best&quot; site">'));
  assert.ok(out.includes('content="Tom &amp; Jerry &lt;script&gt;alert(1)&lt;/script&gt; &quot;x&quot; onload=&quot;y"'));
  assert.ok(!out.includes('<script>'));
});

test('charset is first and emitted exactly once', () => {
  const { tags, html: out } = buildMetaTags(EXAMPLE_INPUT);
  assert.equal(tags[0], '<meta charset="utf-8">');
  assert.equal(out.match(/charset/g)?.length, 1);
  assert.ok(!out.includes('http-equiv'));
  assert.ok(!out.includes('name="language"'));
  assert.ok(tags[1].includes('name="viewport"'));
});

test('empty input gives empty output (defaults alone emit nothing)', () => {
  assert.deepEqual(buildMetaTags(EMPTY_INPUT), { tags: [], html: '' });
  assert.equal(html({ title: '   ', ogType: 'article', twitterCard: 'summary' }), '');
});

test('OG falls back to title/description/canonical; twitter tags are not duplicated', () => {
  const out = html({ title: 'My Page', description: 'About it', url: 'https://ex.com/p' });
  assert.ok(out.includes('<meta property="og:title" content="My Page">'));
  assert.ok(out.includes('<meta property="og:description" content="About it">'));
  assert.ok(out.includes('<meta property="og:url" content="https://ex.com/p">'));
  assert.ok(out.includes('<meta property="og:type" content="website">'));
  assert.ok(out.includes('<meta name="twitter:card" content="summary_large_image">'));
  assert.ok(!out.includes('twitter:title'), 'X falls back to og:title');
  assert.ok(!out.includes('twitter:description'));
});

test('fallbacks follow every keystroke (no frozen first character)', () => {
  assert.ok(html({ title: 'M' }).includes('og:title" content="M"'));
  assert.ok(html({ title: 'My site' }).includes('og:title" content="My site"'));
});

test('explicit og:title and twitter:title override the fallback', () => {
  const out = html({ title: 'Page', ogTitle: 'Social title', twitterTitle: 'X title', twitterImage: 'https://ex.com/x.png' });
  assert.ok(out.includes('<title>Page</title>'));
  assert.ok(out.includes('og:title" content="Social title"'));
  assert.ok(out.includes('<meta name="twitter:title" content="X title">'));
  assert.ok(out.includes('<meta name="twitter:image" content="https://ex.com/x.png">'));
});

test('twitter handles get an @', () => {
  const out = html({ title: 'T', twitterSite: 'fariz', twitterCreator: '@me' });
  assert.ok(out.includes('twitter:site" content="@fariz"'));
  assert.ok(out.includes('twitter:creator" content="@me"'));
});

test('article tags split into one article:tag each', () => {
  assert.deepEqual(splitTags(' a, b ,,A, c d '), ['a', 'b', 'c d']);
  const out = html({ title: 'T', ogType: 'article', articleTags: 'svelte, vite , seo' });
  assert.equal(out.match(/property="article:tag"/g)?.length, 3);
  assert.ok(out.includes('<meta property="article:tag" content="vite">'));
  assert.ok(!html({ title: 'T', ogType: 'website', articleTags: 'x' }).includes('article:'));
});

test('article times are full ISO 8601 with the offset', () => {
  assert.equal(toIsoWithOffset('2026-11-01T09:00', 420), '2026-11-01T09:00:00+07:00');
  assert.equal(toIsoWithOffset('2026-11-01T09:00', -330), '2026-11-01T09:00:00-05:30');
  assert.equal(toIsoWithOffset('2026-11-01T09:00:00Z'), '2026-11-01T09:00:00Z');
  assert.equal(toIsoWithOffset('nope'), '');
  assert.match(toIsoWithOffset('2026-11-01T09:00'), /^2026-11-01T09:00:00[+-]\d{2}:\d{2}$/);
  const out = html({ title: 'T', ogType: 'article', publishedTime: '2026-11-01T09:00', utcOffset: 0 });
  assert.ok(out.includes('<meta property="article:published_time" content="2026-11-01T09:00:00+00:00">'));
});

test('JSON-LD escapes </script> injection', () => {
  const ld = buildJsonLd(input({ title: 'x</script><script>alert(1)</script>', jsonLd: true }));
  assert.equal(ld.match(/<\/script>/g)?.length, 1);
  assert.ok(ld.endsWith('</script>'));
  assert.ok(ld.includes('\\u003c/script\\u003e'));
  const body = ld.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
  assert.equal(JSON.parse(body).name, 'x</script><script>alert(1)</script>');
});

test('JSON-LD type follows og:type and is off by default', () => {
  assert.equal(buildJsonLd(input({ title: 'T' })), '');
  assert.ok(buildJsonLd(input({ title: 'T', jsonLd: true })).includes('"@type": "WebSite"'));
  const art = buildJsonLd(input({ title: 'T', jsonLd: true, ogType: 'article', publishedTime: '2026-01-02T03:04', utcOffset: 60 }));
  assert.ok(art.includes('"@type": "Article"'));
  assert.ok(art.includes('"datePublished": "2026-01-02T03:04:00+01:00"'));
});

test('validate warns on length, relative/invalid URLs and missing image', () => {
  const fields = (o: Partial<MetaInput>) => validate(input(o)).map((w) => w.field);
  assert.deepEqual(fields({}), []);
  assert.ok(fields({ title: 'x'.repeat(61) }).includes('title'));
  assert.ok(!fields({ title: 'x'.repeat(60), image: 'https://e.com/i.png' }).includes('title'));
  assert.ok(fields({ description: 'x'.repeat(161) }).includes('description'));
  assert.ok(fields({ title: 'T' }).includes('image'), 'missing og:image');
  assert.match(validate(input({ title: 'T', image: '/img.png' }))[0].message, /relative/);
  assert.ok(fields({ url: 'example.com/page' }).includes('url'));
  assert.ok(!fields({ url: 'https://example.com/page' }).includes('url'));
  assert.deepEqual(fields(EXAMPLE_INPUT), []);
});

test('downloaded document escapes title, description and lang', () => {
  const doc = buildHtmlDocument(input({ title: '</title><b>x', description: '"<i>"', lang: 'en"><script>' }));
  assert.ok(doc.startsWith('<!doctype html>\n<html lang="en&quot;&gt;&lt;script&gt;">'));
  assert.ok(doc.includes('<h1>&lt;/title&gt;&lt;b&gt;x</h1>'));
  assert.ok(doc.includes('<p>&quot;&lt;i&gt;&quot;</p>'));
  assert.ok(!doc.includes('<b>') && !doc.includes('<i>') && !doc.includes('<script>'));
  assert.ok(doc.indexOf('<meta charset="utf-8">') < doc.indexOf('<title>'));
});

test('truncate and breadcrumb for the search preview', () => {
  assert.equal(truncate('short', 10), 'short');
  assert.equal(truncate('alpha beta gamma delta', 18), 'alpha beta gamma…');
  assert.equal(breadcrumb('https://www.ex.com/blog/my%20post'), 'ex.com › blog › my post');
  assert.equal(breadcrumb('not a url'), '');
});

test('parseSaved restores known keys and survives garbage', () => {
  assert.deepEqual(parseSaved(null), EMPTY_INPUT);
  assert.deepEqual(parseSaved('{bad'), EMPTY_INPUT);
  const r = parseSaved(JSON.stringify({ title: 'T', jsonLd: 'yes', ogType: 'bogus', extra: 1 }));
  assert.equal(r.title, 'T');
  assert.equal(r.jsonLd, false);
  assert.equal(r.ogType, 'website');
  assert.ok(!('extra' in r));
});
