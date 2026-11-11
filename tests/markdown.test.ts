import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  renderMarkdown,
  isSafeUrl,
  isExternalUrl,
  toHtmlDocument,
  firstHeading,
  wordStats,
  formatSelection,
  type FormatKind
} from '../src/lib/tools/markdown.ts';

// No DOM library is installed, so DOMPurify can't run under node --test. These tests cover the
// marked rendering + link policy with a pass-through sanitizer; isSafeUrl is tested on its own.
const render = (src: string, breaks = false) => renderMarkdown(src, { breaks, sanitize: s => s });

test('renderMarkdown: empty input renders nothing', () => {
  assert.equal(render(''), '');
  assert.equal(render('  \n\n '), '');
});

test('renderMarkdown: ** inside code spans and fenced blocks is left alone', () => {
  const html = render('Use `a**b**c` here\n\n```js\nconst x = 2 ** 3 ** 2;\n```\n\n**bold**');
  assert.match(html, /<code>a\*\*b\*\*c<\/code>/);
  assert.match(html, /<pre><code class="language-js">const x = 2 \*\* 3 \*\* 2;\n<\/code><\/pre>/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.equal(html.match(/<strong>/g)?.length, 1);
});

test('renderMarkdown: code block contents are escaped', () => {
  assert.match(render('```\n<b>x</b> & y\n```'), /&lt;b&gt;x&lt;\/b&gt; &amp; y/);
});

test('renderMarkdown: ordered and nested lists', () => {
  const html = render('1. one\n2. two\n   1. two-a\n   2. two-b\n3. three\n\n- a\n  - a1\n- b');
  assert.match(html, /<ol>\s*<li>one<\/li>\s*<li>two<ol>\s*<li>two-a<\/li>\s*<li>two-b<\/li>\s*<\/ol>\s*<\/li>\s*<li>three<\/li>\s*<\/ol>/);
  assert.match(html, /<ul>\s*<li>a<ul>\s*<li>a1<\/li>\s*<\/ul>\s*<\/li>\s*<li>b<\/li>\s*<\/ul>/);
});

test('renderMarkdown: separate lists stay separate (no wrap-everything)', () => {
  const html = render('- a\n\nparagraph\n\n- b');
  assert.equal(html.match(/<ul>/g)?.length, 2);
  assert.match(html, /<\/ul>\s*<p>paragraph<\/p>\s*<ul>/);
});

test('renderMarkdown: GFM table with alignment', () => {
  const html = render('| Name | Qty |\n| :--- | ---: |\n| apple | 3 |');
  assert.match(html, /<table>/);
  assert.match(html, /<th align="left">Name<\/th>/);
  assert.match(html, /<th align="right">Qty<\/th>/);
  assert.match(html, /<td align="left">apple<\/td>/);
});

test('renderMarkdown: task list', () => {
  const html = render('- [x] done\n- [ ] todo');
  assert.match(html, /<input checked="" disabled="" type="checkbox"\s*\/?>\s*done/);
  assert.match(html, /<input disabled="" type="checkbox"\s*\/?>\s*todo/);
});

test('renderMarkdown: blockquote and strikethrough', () => {
  assert.match(render('> quoted\n> more'), /<blockquote>\s*<p>quoted\nmore<\/p>\s*<\/blockquote>/);
  assert.match(render('~~gone~~'), /<del>gone<\/del>/);
});

test('renderMarkdown: breaks option turns single newlines into <br>', () => {
  assert.doesNotMatch(render('a\nb'), /<br>/);
  assert.match(render('a\nb', true), /a<br>b/);
});

test('renderMarkdown: external links open in a new tab, relative ones do not', () => {
  assert.equal(
    render('[site](https://example.com "Ex")').trim(),
    '<p><a href="https://example.com" title="Ex" target="_blank" rel="noopener noreferrer">site</a></p>'
  );
  assert.equal(render('[top](#intro)').trim(), '<p><a href="#intro">top</a></p>');
  assert.match(render('Visit https://example.com today'), /<a href="https:\/\/example.com" target="_blank" rel="noopener noreferrer">https:\/\/example.com<\/a>/);
});

test('renderMarkdown: unsafe link and image URLs are dropped', () => {
  assert.equal(render('[click](javascript:alert(1))').trim(), '<p>click</p>');
  assert.equal(render('![pic](data:image/svg+xml;base64,AAAA)').trim(), '<p>pic</p>');
  assert.match(render('![cat](/cat.png)'), /<img src="\/cat.png" alt="cat" loading="lazy">/);
});

test('renderMarkdown: highlighter output is used for fenced blocks with a language', () => {
  const html = renderMarkdown('```ts\nlet a\n```\n\n```\nplain\n```', {
    sanitize: s => s,
    highlight: (code, lang) => (lang === 'ts' ? `<span class="hljs-keyword">${code}</span>` : null)
  });
  assert.match(html, /<code class="hljs language-ts"><span class="hljs-keyword">let a<\/span>\n<\/code>/);
  assert.match(html, /<pre><code>plain\n<\/code><\/pre>/);
});

test('renderMarkdown: without a DOM the default sanitizer refuses to run', () => {
  assert.throws(() => renderMarkdown('# hi'), /no DOM/);
});

test('isSafeUrl: allows http(s), mailto, relative and anchors', () => {
  for (const url of [
    'https://example.com',
    'http://example.com/a?b=c',
    'HTTPS://EXAMPLE.COM',
    'mailto:me@example.com',
    '/path',
    './file.md',
    '../up',
    'docs/page.html',
    '#section',
    '?q=1',
    '//cdn.example.com/x.png'
  ]) {
    assert.equal(isSafeUrl(url), true, url);
  }
});

test('isSafeUrl: rejects javascript:, data:, vbscript:, file: and obfuscations', () => {
  for (const url of [
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    ' javascript:alert(1)',
    'java\tscript:alert(1)',
    'java\nscript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'file:///etc/passwd',
    ''
  ]) {
    assert.equal(isSafeUrl(url), false, JSON.stringify(url));
  }
});

test('isExternalUrl', () => {
  assert.equal(isExternalUrl('https://a.b'), true);
  assert.equal(isExternalUrl('//a.b'), true);
  assert.equal(isExternalUrl('/a'), false);
  assert.equal(isExternalUrl('mailto:x@y.z'), false);
});

test('toHtmlDocument: full document with doctype, charset, viewport and escaped title', () => {
  const doc = toHtmlDocument('<p>hi</p>', '<script>alert("x")</script> & co');
  assert.ok(doc.startsWith('<!doctype html>'));
  assert.match(doc, /<meta charset="utf-8">/);
  assert.match(doc, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(doc, /<title>&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; co<\/title>/);
  assert.doesNotMatch(doc, /<script>/);
  assert.match(doc, /<body>\n<p>hi<\/p>\n<\/body>/);
  assert.doesNotMatch(doc, /class="/);
  assert.match(toHtmlDocument('', '  '), /<title>Document<\/title>/);
});

test('firstHeading', () => {
  assert.equal(firstHeading('intro\n\n## The **Title** ##\n# Later'), 'The Title');
  assert.equal(firstHeading('no heading'), null);
});

test('wordStats', () => {
  assert.deepEqual(wordStats(''), { words: 0, characters: 0, readingMinutes: 0 });
  const s = wordStats("# Hello world\n\nIt's a [link](https://example.com/very/long) — ok?");
  assert.equal(s.words, 6); // Hello world It's a link ok
  assert.equal(s.readingMinutes, 1);
  assert.equal(wordStats('héllo 👋').characters, 7);
  assert.equal(wordStats('word '.repeat(1000)).readingMinutes, 5);
});

function apply(text: string, start: number, end: number, kind: FormatKind) {
  const e = formatSelection(text, start, end, kind);
  const out = text.slice(0, e.from) + e.insert + text.slice(e.to);
  return { out, selected: out.slice(e.selStart, e.selEnd) };
}

test('formatSelection: inline wraps the selection or inserts a placeholder', () => {
  assert.deepEqual(apply('say hi now', 4, 6, 'bold'), { out: 'say **hi** now', selected: 'hi' });
  assert.deepEqual(apply('x', 1, 1, 'italic'), { out: 'x*italic text*', selected: 'italic text' });
  assert.deepEqual(apply('run npm i', 4, 9, 'code'), { out: 'run `npm i`', selected: 'npm i' });
  assert.deepEqual(apply('a\nb', 0, 3, 'code'), { out: '```\na\nb\n```', selected: 'a\nb' });
});

test('formatSelection: link selects the URL when text is selected', () => {
  assert.deepEqual(apply('see docs', 4, 8, 'link'), { out: 'see [docs](https://)', selected: 'https://' });
  assert.deepEqual(apply('', 0, 0, 'link'), { out: '[link text](https://)', selected: 'link text' });
});

test('formatSelection: line formats prefix every selected line and toggle off', () => {
  assert.equal(apply('one\ntwo\nthree', 1, 6, 'list').out, '- one\n- two\nthree');
  assert.equal(apply('- one\n- two', 0, 11, 'list').out, 'one\ntwo');
  assert.equal(apply('quote me', 3, 3, 'quote').out, '> quote me');
  assert.equal(apply('Title', 0, 0, 'heading').out, '## Title');
  assert.equal(apply('## Title', 0, 0, 'heading').out, '### Title');
});
