import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeDiff,
  inlineSegments,
  toSplitRows,
  collapseRows,
  unifiedPatch,
  splitLines,
  type DiffRow
} from '../src/lib/tools/diff.ts';

const shape = (rows: DiffRow[]) =>
  rows.map(r => `${r.type[0]}${r.oldNo ?? '-'}:${r.newNo ?? '-'} ${r.text}`);

test('splitLines: empty text has no lines; LF, CRLF and CR all split', () => {
  assert.deepEqual(splitLines(''), []);
  assert.deepEqual(splitLines('a\r\nb\nc\rd'), ['a', 'b', 'c', 'd']);
  assert.deepEqual(splitLines('a\n'), ['a', '']);
});

test('insertion at the top only marks that line', () => {
  const d = computeDiff('b\nc\nd', 'a\nb\nc\nd');
  assert.deepEqual(shape(d.rows), ['a-:1 a', 'e1:2 b', 'e2:3 c', 'e3:4 d']);
  assert.deepEqual(d.stats, { added: 1, removed: 0, unchanged: 3 });
  assert.equal(d.identical, false);
});

test('deletion keeps order and line numbers', () => {
  const d = computeDiff('a\nb\nc', 'a\nc');
  assert.deepEqual(shape(d.rows), ['e1:1 a', 'r2:- b', 'e3:2 c']);
  assert.deepEqual(d.stats, { added: 0, removed: 1, unchanged: 2 });
});

test('modification pairs removed + added with word-level segments', () => {
  const d = computeDiff('x\nfoo bar baz\ny', 'x\nfoo qux baz\ny');
  assert.deepEqual(shape(d.rows), ['e1:1 x', 'r2:- foo bar baz', 'a-:2 foo qux baz', 'e3:3 y']);
  assert.deepEqual(d.rows[1].segments, [
    { text: 'foo ', changed: false },
    { text: 'bar', changed: true },
    { text: ' baz', changed: false }
  ]);
  assert.deepEqual(d.rows[2].segments, [
    { text: 'foo ', changed: false },
    { text: 'qux', changed: true },
    { text: ' baz', changed: false }
  ]);
});

test('char-level segments when inline is "char"', () => {
  const s = inlineSegments('cat', 'cut', { inline: 'char' });
  assert.deepEqual(s.old, [
    { text: 'c', changed: false },
    { text: 'a', changed: true },
    { text: 't', changed: false }
  ]);
  assert.deepEqual(s.new, [
    { text: 'c', changed: false },
    { text: 'u', changed: true },
    { text: 't', changed: false }
  ]);
});

test('added empty lines are kept as rows', () => {
  const d = computeDiff('a\nb', 'a\n\n\nb');
  assert.deepEqual(shape(d.rows), ['e1:1 a', 'a-:2 ', 'a-:3 ', 'e2:4 b']);
  assert.equal(d.stats.added, 2);
});

test('ignoreWhitespace compares loosely but shows original text', () => {
  const d = computeDiff('  foo   bar', 'foo bar  ', { ignoreWhitespace: true });
  assert.equal(d.identical, true);
  assert.equal(d.rows[0].type, 'equal');
  assert.equal(d.rows[0].text, 'foo bar  ');
  assert.equal(d.rows[0].oldText, '  foo   bar');
  assert.equal(computeDiff('  foo', 'foo').identical, false);
});

test('ignoreCase compares loosely but shows original text, also inline', () => {
  const d = computeDiff('Hello World', 'hello world', { ignoreCase: true });
  assert.equal(d.identical, true);
  assert.equal(d.rows[0].text, 'hello world');
  assert.equal(d.rows[0].oldText, 'Hello World');

  const m = computeDiff('Hello World', 'hello there', { ignoreCase: true });
  assert.deepEqual(m.rows[0].segments, [
    { text: 'Hello ', changed: false },
    { text: 'World', changed: true }
  ]);
  assert.deepEqual(m.rows[1].segments, [
    { text: 'hello ', changed: false },
    { text: 'there', changed: true }
  ]);
});

test('one side empty: everything added or removed', () => {
  const add = computeDiff('', 'a\nb');
  assert.deepEqual(shape(add.rows), ['a-:1 a', 'a-:2 b']);
  assert.deepEqual(add.stats, { added: 2, removed: 0, unchanged: 0 });
  const rem = computeDiff('a\nb', '');
  assert.deepEqual(shape(rem.rows), ['r1:- a', 'r2:- b']);
  assert.equal(rem.rows[0].segments, undefined);
  const none = computeDiff('', '');
  assert.deepEqual(none.rows, []);
  assert.equal(none.identical, true);
});

test('identical input', () => {
  const d = computeDiff('a\nb\nc', 'a\nb\nc');
  assert.equal(d.identical, true);
  assert.deepEqual(d.stats, { added: 0, removed: 0, unchanged: 3 });
  assert.ok(d.rows.every(r => r.type === 'equal' && r.oldText === undefined));
});

test('CRLF vs LF line endings are not differences', () => {
  const d = computeDiff('a\r\nb\r\nc', 'a\nb\nc');
  assert.equal(d.identical, true);
  assert.equal(d.rows.length, 3);
  assert.ok(!unifiedPatch('a\r\nb\r\n', 'a\nb\n').includes('@@'));
});

test('toSplitRows aligns removed/added runs side by side', () => {
  const d = computeDiff('a\nb\nc\nd', 'a\nB\nd\ne');
  const split = toSplitRows(d.rows).map(
    r => `${r.left ? r.left.text : '_'}|${r.right ? r.right.text : '_'}`
  );
  assert.deepEqual(split, ['a|a', 'b|B', 'c|_', 'd|d', '_|e']);
});

test('collapseRows hides long unchanged runs, keeping context around changes', () => {
  const a = Array.from({ length: 20 }, (_, k) => `line ${k + 1}`);
  const b = [...a];
  b[10] = 'changed';
  const d = computeDiff(a.join('\n'), b.join('\n'));
  const items = collapseRows(d.rows, r => r.type === 'equal', 3);
  const gaps = items.filter(x => x.kind === 'gap');
  assert.equal(gaps.length, 2);
  assert.deepEqual(gaps[0], { kind: 'gap', start: 0, end: 7, count: 7 });
  assert.deepEqual(gaps[1], { kind: 'gap', start: 15, end: 21, count: 6 });
  const shown = items.filter(x => x.kind === 'row').map(x => (x.kind === 'row' ? x.row.text : ''));
  assert.deepEqual(shown, [
    'line 8',
    'line 9',
    'line 10',
    'line 11',
    'changed',
    'line 12',
    'line 13',
    'line 14'
  ]);
  // Short unchanged runs are not collapsed.
  const small = computeDiff('a\nb\nc', 'a\nB\nc');
  assert.ok(collapseRows(small.rows, r => r.type === 'equal').every(x => x.kind === 'row'));
});

test('unifiedPatch produces a standard two-file patch', () => {
  const p = unifiedPatch('x\ny\nz\n', 'x\nY\nz\n', 'old.txt', 'new.txt');
  assert.equal(
    p,
    '===================================================================\n' +
      '--- old.txt\n+++ new.txt\n@@ -1,3 +1,3 @@\n x\n-y\n+Y\n z\n'
  );
  assert.ok(!unifiedPatch('same', 'same').includes('@@'));
});
