import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  asComment,
  BLOCK_RAW,
  CHARSET,
  columns,
  FONT_IDS,
  FONTS,
  render,
  SMALL_RAW,
  STANDARD_RAW
} from '../src/lib/tools/asciiart.ts';

const RAW: Record<string, Record<string, string[]>> = {
  standard: STANDARD_RAW,
  block: BLOCK_RAW,
  small: SMALL_RAW
};

test('raw glyph rows are already consistent (width per glyph, height per font)', () => {
  for (const id of FONT_IDS) {
    const font = FONTS[id];
    for (const [ch, rows] of Object.entries(RAW[id])) {
      assert.equal(rows.length, font.height, `${id} ${JSON.stringify(ch)} has ${rows.length} rows`);
      const widths = new Set(rows.map(columns));
      assert.equal(widths.size, 1, `${id} ${JSON.stringify(ch)} has rows of widths ${[...widths]}`);
    }
  }
});

test('built fonts: every glyph has the font height and one width', () => {
  assert.equal(FONTS.standard.height, 5);
  assert.equal(FONTS.block.height, 5);
  assert.equal(FONTS.small.height, 3);
  for (const id of FONT_IDS) {
    for (const [ch, rows] of Object.entries(FONTS[id].glyphs)) {
      assert.equal(rows.length, FONTS[id].height, `${id} ${ch}`);
      assert.equal(new Set(rows.map(columns)).size, 1, `${id} ${ch}`);
    }
  }
});

test('letters and digits share one width per font (columns line up)', () => {
  const expected = { standard: 5, block: 10, small: 3 } as const;
  for (const id of ['standard', 'block'] as const) {
    for (const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
      assert.equal(columns(FONTS[id].glyphs[ch][0]), expected[id], `${id} ${ch}`);
    }
  }
});

test('every font covers the full charset', () => {
  for (const id of FONT_IDS) {
    for (const ch of CHARSET) assert.ok(FONTS[id].glyphs[ch], `${id} is missing ${JSON.stringify(ch)}`);
  }
});

test('glyphs within a font are distinct', () => {
  for (const id of FONT_IDS) {
    const seen = new Map<string, string>();
    for (const [ch, rows] of Object.entries(FONTS[id].glyphs)) {
      const key = rows.join('\n');
      assert.ok(!seen.has(key), `${id}: ${JSON.stringify(ch)} looks identical to ${JSON.stringify(seen.get(key))}`);
      seen.set(key, ch);
    }
  }
});

test('render: exactly `height` lines per text line, blank line between blocks', () => {
  for (const id of FONT_IDS) {
    const h = FONTS[id].height;
    const one = render('HELLO', id);
    assert.equal(one.lines.length, h, id);
    const two = render('HI\nYOU', id);
    assert.equal(two.lines.length, 2 * h + 1, id);
    assert.equal(two.lines[h], '');
  }
});

test('render: no trailing whitespace or trailing blank lines', () => {
  for (const id of FONT_IDS) {
    const { lines } = render('Hi there!\n\nLOVE _\n\n', id, { letterSpacing: 2 });
    assert.ok(lines.length > 0);
    for (const l of lines) assert.equal(l, l.trimEnd());
    assert.notEqual(lines[lines.length - 1], '');
  }
});

test('render: lowercase maps to uppercase, blank input gives nothing', () => {
  assert.deepEqual(render('abc', 'standard').lines, render('ABC', 'standard').lines);
  assert.deepEqual(render('  \n \n', 'block'), { lines: [], unsupported: [], width: 0 });
});

test('render: letter spacing changes the column count', () => {
  const w = (s: 0 | 1 | 2) => render('AB', 'standard', { letterSpacing: s }).width;
  assert.equal(w(0), 10);
  assert.equal(w(1), 11);
  assert.equal(w(2), 12);
  assert.equal(render('HI', 'standard', { letterSpacing: 0 }).lines[0], '#   ######');
});

test('render: unsupported characters are reported once and drawn as "?"', () => {
  const r = render('A~é~', 'standard');
  assert.deepEqual(r.unsupported, ['~', 'é']);
  assert.deepEqual(r.lines, render('A???', 'standard').lines);
  assert.deepEqual(render('OK', 'small').unsupported, []);
});

test('render: wrapping by words respects maxWidth', () => {
  for (const id of FONT_IDS) {
    const h = FONTS[id].height;
    const r = render('HELLO WORLD FOO', id, { maxWidth: 40 });
    for (const l of r.lines) assert.ok(columns(l) <= 40, `${id}: ${columns(l)} > 40`);
    assert.ok(r.width <= 40);
    // block count = (lines + 1) / (h + 1)
    assert.equal((r.lines.length + 1) % (h + 1), 0);
  }
  // Standard "HELLO WORLD" = 11 glyphs: too wide for 40 → two blocks, words intact.
  const r = render('HELLO WORLD', 'standard', { maxWidth: 40 });
  assert.equal(r.lines.length, 11);
  assert.deepEqual(r.lines.slice(0, 5), render('HELLO', 'standard').lines);
  assert.deepEqual(r.lines.slice(6), render('WORLD', 'standard').lines);
  // Without maxWidth nothing wraps.
  assert.equal(render('HELLO WORLD', 'standard').lines.length, 5);
});

test('render: a word wider than maxWidth is broken by characters', () => {
  const r = render('ABCDEFGHIJ', 'block', { maxWidth: 40 });
  for (const l of r.lines) assert.ok(columns(l) <= 40);
  assert.ok(r.lines.length > 5);
  // Even a maxWidth smaller than one glyph still makes progress.
  assert.equal(render('AB', 'block', { maxWidth: 3 }).lines.length, 11);
});

test('asComment styles', () => {
  const lines = ['ab', '', 'c'];
  assert.deepEqual(asComment(lines, 'none'), lines);
  assert.deepEqual(asComment(lines, 'slash'), ['// ab', '//', '// c']);
  assert.deepEqual(asComment(lines, 'hash'), ['# ab', '#', '# c']);
  assert.deepEqual(asComment(lines, 'block'), ['/*', 'ab', '', 'c', '*/']);
  assert.deepEqual(asComment(['x*/y'], 'block'), ['/*', 'x* /y', '*/']);
  assert.deepEqual(asComment([], 'slash'), []);
});
