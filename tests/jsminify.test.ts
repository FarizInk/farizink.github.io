import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  minifyJs,
  beautifyJs,
  byteSize,
  formatBytes,
  savedPercent,
  sanitizeMinify,
  sanitizeBeautify,
  DEFAULT_MINIFY,
  DEFAULT_BEAUTIFY,
  SAMPLE_JS,
  type MinifyOptions
} from '../src/lib/tools/jsminify.ts';

/** Run `body` (a function body that returns a value) before and after minifying; results must match. */
async function sameResult(body: string, opts: MinifyOptions = DEFAULT_MINIFY) {
  const src = `function run() {\n${body}\n}`;
  const res = await minifyJs(src, opts);
  assert.ok(res.ok, res.ok ? '' : res.message);
  const expected = new Function(`${src};return run();`)();
  const actual = new Function(`${res.code};return run();`)();
  assert.deepEqual(actual, expected, `minified: ${res.code}`);
  return res.code;
}

const PLAIN: MinifyOptions = { ...DEFAULT_MINIFY, compress: false, mangle: false };
const BOTH = [DEFAULT_MINIFY, PLAIN];

test('minify: trailing line comment does not swallow the next line', async () => {
  for (const o of BOTH) {
    const code = await sameResult('let a = 1 // one\nlet b = 2 // two\nreturn a + b', o);
    assert.ok(!code.includes('//'));
  }
});

test('minify: ASI-dependent code stays valid', async () => {
  for (const o of BOTH) await sameResult('let a=1\nlet b=2\nreturn [a, b]', o);
});

test('minify: return followed by newline still returns undefined', async () => {
  for (const o of BOTH) await sameResult('var x = 5\nfunction f() { return\nx }\nreturn f()', o);
});

test('minify: unary plus/minus are not merged into ++ / --', async () => {
  for (const o of BOTH) {
    await sameResult('let b = 1, c = "2"; return b + +c', o);
    await sameResult('let e = 5, f = -3; return e - -f', o);
  }
});

test('minify: strings with // and double spaces are kept intact', async () => {
  for (const o of BOTH) {
    const code = await sameResult('return ["http://x.y/a  b", \'/* not a comment */\', "a  //  b"]', o);
    assert.ok(code.includes('http://x.y/a  b'));
  }
});

test('minify: template literal with newlines is kept', async () => {
  for (const o of BOTH) await sameResult('const n = 2\nreturn `line 1\n  line ${n}\n\nend`', o);
});

test('minify: regex literal with escaped slash and star', async () => {
  for (const o of BOTH) await sameResult('return "a/b a//b a/*b".replace(/a\\/*b/g, "X")', o);
});

test('minify: sample evaluates the same and gets smaller', async () => {
  const res = await minifyJs(SAMPLE_JS, DEFAULT_MINIFY);
  assert.ok(res.ok);
  assert.ok(byteSize(res.code) < byteSize(SAMPLE_JS));
  assert.ok(res.code.startsWith('/*! cart.js'), 'license comment kept');
  const none = await minifyJs(SAMPLE_JS, { ...DEFAULT_MINIFY, comments: 'none' });
  assert.ok(none.ok && !none.code.includes('MIT'));
});

test('minify: module source type accepts import/export', async () => {
  const src = 'import { x } from "./x.js";\nexport const y = x + 1;';
  const mod = await minifyJs(src, { ...DEFAULT_MINIFY, sourceType: 'module' });
  assert.ok(mod.ok, mod.ok ? '' : mod.message);
  assert.ok(mod.code.includes('export'));
});

test('minify: syntax error returns message with 1-based line/column', async () => {
  const res = await minifyJs('let a = 1;\nlet b = (2;', DEFAULT_MINIFY);
  assert.equal(res.ok, false);
  if (!res.ok) {
    assert.ok(res.message.length > 0);
    assert.equal(res.line, 2);
    assert.equal(res.column, 11);
  }
});

test('beautify: keeps ===, &&, ++ and formats', async () => {
  const res = await beautifyJs('if(a===b&&c){i++;x=y}', DEFAULT_BEAUTIFY);
  assert.ok(res.ok);
  assert.ok(res.code.includes('a === b && c'));
  assert.ok(res.code.includes('i++;'));
  assert.ok(!res.code.includes('= = ='));
});

test('beautify: options (indent, semicolons, quotes)', async () => {
  const src = 'function f(){return "hi"}';
  const tab = await beautifyJs(src, { indent: 'tab', semicolons: false, quotes: 'double', printWidth: 80 });
  assert.ok(tab.ok);
  assert.equal(tab.code, 'function f() {\n\treturn "hi"\n}\n');
  const four = await beautifyJs(src, { indent: '4', semicolons: true, quotes: 'single', printWidth: 80 });
  assert.ok(four.ok);
  assert.equal(four.code, "function f() {\n    return 'hi';\n}\n");
});

test('beautify: syntax error returns a clean message and line/column', async () => {
  const res = await beautifyJs('let a = 1;\nlet b = (2;', DEFAULT_BEAUTIFY);
  assert.equal(res.ok, false);
  if (!res.ok) {
    assert.ok(!res.message.includes('\n'));
    assert.ok(!/\(\d+:\d+\)$/.test(res.message));
    assert.equal(res.line, 2);
    assert.equal(res.column, 11);
  }
});

test('byteSize counts UTF-8 bytes', () => {
  assert.equal(byteSize(''), 0);
  assert.equal(byteSize('abc'), 3);
  assert.equal(byteSize('é'), 2);
  assert.equal(byteSize('😀'), 4);
});

test('formatBytes and savedPercent', () => {
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(2048), '2.0 KB');
  assert.equal(savedPercent(200, 50), 75);
  assert.equal(savedPercent(100, 120), -20);
  assert.equal(savedPercent(0, 10), 0);
});

test('sanitize options falls back to defaults on junk', () => {
  assert.deepEqual(sanitizeMinify(null), DEFAULT_MINIFY);
  assert.deepEqual(sanitizeMinify({ compress: 'yes', ecma: '1999', sourceType: 'module' }), {
    ...DEFAULT_MINIFY,
    sourceType: 'module'
  });
  assert.deepEqual(sanitizeBeautify({ indent: 'tab', printWidth: 7 }), { ...DEFAULT_BEAUTIFY, indent: 'tab' });
  assert.deepEqual(sanitizeBeautify({ printWidth: 120 }), { ...DEFAULT_BEAUTIFY, printWidth: 120 });
});
