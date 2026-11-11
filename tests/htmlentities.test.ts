import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeHtml, decodeHtml, isHtmlMode, NAMED_ENTITIES, REFERENCE } from '../src/lib/tools/htmlentities.ts';

const MIN = { mode: 'minimal', nonAscii: false } as const;

test('minimal escapes & < > " \' (safe in attributes)', () => {
  assert.equal(encodeHtml(`<a title="x" alt='y'>&</a>`, MIN), '&lt;a title=&quot;x&quot; alt=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
  assert.equal(encodeHtml('café ©', MIN), 'café ©');
});

test('named mode uses names where available', () => {
  const opts = { mode: 'named', nonAscii: false } as const;
  assert.equal(encodeHtml(`"'& © — …\u00A0é`, opts), '&quot;&apos;&amp; &copy; &mdash; &hellip;&nbsp;&eacute;');
  // No name for 🎉: left raw unless nonAscii is on, then hex.
  assert.equal(encodeHtml('🎉', opts), '🎉');
  assert.equal(encodeHtml('© 🎉', { mode: 'named', nonAscii: true }), '&copy; &#x1F389;');
});

test('numeric and hex modes', () => {
  assert.equal(encodeHtml('<&> ©', { mode: 'numeric', nonAscii: false }), '&#60;&#38;&#62; ©');
  assert.equal(encodeHtml('<&> ©', { mode: 'numeric', nonAscii: true }), '&#60;&#38;&#62; &#169;');
  assert.equal(encodeHtml('<&> ©', { mode: 'hex', nonAscii: true }), '&#x3C;&#x26;&#x3E; &#xA9;');
});

test('emoji is one code point reference', () => {
  assert.equal(encodeHtml('🎉', { mode: 'hex', nonAscii: true }), '&#x1F389;');
  assert.equal(encodeHtml('🎉', { mode: 'numeric', nonAscii: true }), '&#127881;');
  assert.equal(encodeHtml('🎉', { mode: 'minimal', nonAscii: true }), '&#x1F389;');
});

test('decode keeps tags as literal text', () => {
  assert.equal(decodeHtml('<b>&amp;</b>'), '<b>&</b>');
  const xss = '<img src=x onerror="alert(1)">';
  assert.equal(decodeHtml(xss), xss);
  assert.equal(decodeHtml('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'), xss);
});

test('decode named, decimal and hex', () => {
  assert.equal(decodeHtml('&copy; &#169; &#xA9; &#XA9; &#x1F389; &nbsp;'), '© © © © 🎉 \u00A0');
  assert.equal(decodeHtml('&#0; &#xD800; &#x110000;'), '\uFFFD \uFFFD \uFFFD');
});

test('unknown or unterminated entities stay untouched', () => {
  assert.equal(decodeHtml('&bogus; &amp &copy &toString; &constructor; a & b'), '&bogus; &amp &copy &toString; &constructor; a & b');
  assert.equal(decodeHtml('&amp;lt;'), '&lt;');
});

test('round-trips in every mode', () => {
  const s = `<p class="x">Tom & Jerry's “café” — 50€ 🎉\u00A0</p>`;
  for (const mode of ['minimal', 'named', 'numeric', 'hex'] as const) {
    for (const nonAscii of [false, true]) {
      assert.equal(decodeHtml(encodeHtml(s, { mode, nonAscii })), s, `${mode}/${nonAscii}`);
    }
  }
});

test('every named entity decodes; reference table is consistent', () => {
  for (const [name, ch] of Object.entries(NAMED_ENTITIES)) assert.equal(decodeHtml(`&${name};`), ch);
  for (const row of REFERENCE) assert.equal(decodeHtml(row.entity), row.char);
});

test('isHtmlMode', () => {
  assert.equal(isHtmlMode('hex'), true);
  assert.equal(isHtmlMode('x'), false);
});
