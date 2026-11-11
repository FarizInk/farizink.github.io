import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beautifyCss, minifyCss, percentSaved, utf8Bytes, type CssResult } from '../src/lib/tools/cssminify.ts';

const MIN = { restructure: false, keepSpecialComments: false };

function code(r: CssResult): string {
  assert.ok(r.ok, r.ok ? '' : `expected ok, got error: ${r.message}`);
  return r.code;
}

test('minify: empty / whitespace input gives empty output', async () => {
  assert.equal(code(await minifyCss('', MIN)), '');
  assert.equal(code(await minifyCss('  \n ', MIN)), '');
});

test('minify: `.a :hover` stays a descendant selector', async () => {
  const out = code(await minifyCss('.a :hover { color: red; }', MIN));
  assert.match(out, /\.a :hover\{/);
});

test('minify: strings keep their comments and double spaces', async () => {
  const out = code(await minifyCss('.a { content: "x  /* not a comment */  y"; }', MIN));
  assert.ok(out.includes('"x  /* not a comment */  y"'), out);
});

test('minify: url() with a space and a data URI with ; survive', async () => {
  const out = code(
    await minifyCss('.a { background: url("a b.png"); }\n.b { background: url(data:image/png;base64,AAA=); }', MIN)
  );
  // csso may unquote and escape the space; both spellings are the same URL.
  assert.ok(out.includes('url("a b.png")') || out.includes('url(a\\ b.png)'), out);
  assert.ok(out.includes('url(data:image/png;base64,AAA=)'), out);
});

test('minify: calc() keeps the spaces around +', async () => {
  const out = code(await minifyCss('.a { width: calc( 1px  +  2px ); }', MIN));
  assert.ok(out.includes('calc(1px + 2px)'), out);
});

test('minify: @media query stays intact', async () => {
  const out = code(await minifyCss('@media screen and (min-width: 600px) { .a { color: red; } }', MIN));
  assert.equal(out, '@media screen and (min-width:600px){.a{color:red}}');
});

test('minify: /*! license */ kept only when asked', async () => {
  const src = '/*! license */\n/* note */\n.a { color: red; }';
  const kept = code(await minifyCss(src, { restructure: true, keepSpecialComments: true }));
  assert.ok(kept.includes('/*! license */'), kept);
  assert.ok(!kept.includes('note'), kept);
  const dropped = code(await minifyCss(src, { restructure: true, keepSpecialComments: false }));
  assert.ok(!dropped.includes('license'), dropped);
});

test('minify: restructure merges rules with equal declarations, off leaves them', async () => {
  const src = '.a { color: red; } .b { color: red; }';
  assert.equal(code(await minifyCss(src, { restructure: true, keepSpecialComments: false })), '.a,.b{color:red}');
  assert.equal(code(await minifyCss(src, MIN)), '.a{color:red}.b{color:red}');
});

test('minify: syntax csso would drop is an error with line/column, not silent loss', async () => {
  const r = await minifyCss('.a { color: red; }\n.b {\n  &:hover { color: blue; }\n}', MIN);
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.line, 3);
    assert.equal(typeof r.column, 'number');
  }
});

test('minify: unparsed at-rule preludes that csso keeps are not errors', async () => {
  const out = code(await minifyCss('@container card (min-width: 400px) { .a { color: red; } }', MIN));
  assert.ok(out.includes('@container card (min-width: 400px)'), out);
});

test('beautify: one declaration per line, strings not split', async () => {
  const out = code(await beautifyCss('.a{color:red;content:"a;b  {c}";background:url(data:image/png;base64,A;B)}', { indent: 2, printWidth: 80 }));
  assert.equal(out, '.a {\n  color: red;\n  content: "a;b  {c}";\n  background: url(data:image/png;base64,A;B);\n}\n');
});

test('beautify: indent 4 and tab', async () => {
  assert.equal(code(await beautifyCss('.a{color:red}', { indent: 4, printWidth: 80 })), '.a {\n    color: red;\n}\n');
  assert.equal(code(await beautifyCss('.a{color:red}', { indent: 'tab', printWidth: 80 })), '.a {\n\tcolor: red;\n}\n');
});

test('beautify: keeps `.a :hover` and nested @media', async () => {
  const out = code(await beautifyCss('@media (min-width:600px){.a :hover{color:red}}', { indent: 2, printWidth: 80 }));
  assert.equal(out, '@media (min-width: 600px) {\n  .a :hover {\n    color: red;\n  }\n}\n');
});

test('beautify: invalid CSS returns message with line and column', async () => {
  const r = await beautifyCss('.a { color: red; }\n.b { color: blue; }}', { indent: 2, printWidth: 80 });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.line, 2);
    assert.equal(typeof r.column, 'number');
    assert.match(r.message, /Unexpected \}/);
    assert.ok(!r.message.includes('\n'), 'message has no code frame');
  }
});

test('utf8Bytes counts multi-byte characters', () => {
  assert.equal(utf8Bytes(''), 0);
  assert.equal(utf8Bytes('abc'), 3);
  assert.equal(utf8Bytes('é'), 2);
  assert.equal(utf8Bytes('✓'), 3);
});

test('percentSaved', () => {
  assert.equal(percentSaved(0, 0), 0);
  assert.equal(percentSaved(200, 50), 75);
  assert.equal(percentSaved(100, 150), -50);
});
