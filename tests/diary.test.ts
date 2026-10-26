import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  textToHtml,
  htmlToText,
  excerpt,
  readTagIds,
  writeTagIds,
  relativeTime,
  readHomeView,
  writeHomeView,
  descriptionForSave,
  sortNewestFirst,
  type KVStorage
} from '../src/lib/diary.ts';

function memory(init: Record<string, string> = {}): KVStorage {
  const data = new Map(Object.entries(init));
  return {
    getItem: k => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v)
  };
}

test('textToHtml: empty text gives empty html', () => {
  assert.equal(textToHtml(''), '');
  assert.equal(textToHtml('   \n\n  '), '');
});

test('textToHtml: blank lines split paragraphs, single newlines become <br>', () => {
  assert.equal(textToHtml('a\nb\n\nc'), '<p>a<br>b</p><p>c</p>');
});

test('textToHtml: escapes html and trims surrounding blank lines', () => {
  assert.equal(textToHtml('<b>&'), '<p>&lt;b&gt;&amp;</p>');
  assert.equal(textToHtml('\n\nhello\n\n'), '<p>hello</p>');
});

test('htmlToText: round-trips textToHtml output', () => {
  for (const t of ['a\nb\n\nc', 'x < y & z', 'quote "here"']) {
    assert.equal(htmlToText(textToHtml(t)), t);
  }
});

test('htmlToText: null gives empty string', () => {
  assert.equal(htmlToText(null), '');
});

test('htmlToText: rich html from Notes becomes readable plain text', () => {
  const out = htmlToText('<ul><li>one</li><li>two</li></ul><p><strong>B</strong> &amp; c</p>');
  assert.ok(out.includes('one'));
  assert.ok(out.includes('two'));
  assert.ok(out.includes('B & c'));
  assert.ok(!out.includes('<'));
});

test('excerpt: joins paragraphs with spaces', () => {
  assert.equal(excerpt('<p>a</p><p>b</p>'), 'a b');
});

test('excerpt: truncates with an ellipsis', () => {
  const out = excerpt('<p>' + 'x'.repeat(200) + '</p>', 10);
  assert.equal(out, 'x'.repeat(10) + '…');
});

test('excerpt: null gives empty string', () => {
  assert.equal(excerpt(null), '');
});

test('readTagIds: missing or invalid storage gives []', () => {
  assert.deepEqual(readTagIds(memory()), []);
  assert.deepEqual(readTagIds(memory({ diaryTagIds: 'abc' })), []);
  assert.deepEqual(readTagIds(memory({ diaryTagIds: '{}' })), []);
});

test('readTagIds: keeps only string ids', () => {
  assert.deepEqual(readTagIds(memory({ diaryTagIds: '["a",1,"b"]' })), ['a', 'b']);
});

test('writeTagIds then readTagIds returns the ids', () => {
  const s = memory();
  writeTagIds(s, ['x']);
  assert.deepEqual(readTagIds(s), ['x']);
});

test('relativeTime: buckets', () => {
  const now = new Date('2026-10-26T12:00:00Z');
  const ago = (ms: number) => new Date(now.getTime() - ms).toISOString();
  assert.equal(relativeTime(ago(30_000), now), 'just now');
  assert.equal(relativeTime(ago(5 * 60_000), now), '5m ago');
  assert.equal(relativeTime(ago(3 * 3_600_000), now), '3h ago');
  assert.equal(relativeTime(ago(2 * 86_400_000), now), '2d ago');
  const old = relativeTime(ago(10 * 86_400_000), now);
  assert.ok(old.includes('Oct') && old.includes('16'), old);
});

test('readHomeView: stored view wins', () => {
  assert.equal(readHomeView(memory({ homeView: 'diary' })), 'diary');
});

test('readHomeView: migrates legacy homeShowDashboard', () => {
  assert.equal(readHomeView(memory({ homeShowDashboard: 'true' })), 'dashboard');
  assert.equal(readHomeView(memory({ homeShowDashboard: 'false' })), 'profile');
});

test('readHomeView: invalid or empty gives profile', () => {
  assert.equal(readHomeView(memory({ homeView: 'bogus' })), 'profile');
  assert.equal(readHomeView(memory()), 'profile');
});

test('writeHomeView then readHomeView returns the view', () => {
  const s = memory();
  writeHomeView(s, 'dashboard');
  assert.equal(readHomeView(s), 'dashboard');
});

test('descriptionForSave: empty text sends an empty paragraph so the backend clears it', () => {
  assert.equal(descriptionForSave(''), '<p></p>');
  assert.equal(descriptionForSave('  \n '), '<p></p>');
  assert.equal(htmlToText(descriptionForSave('')), '');
});

test('descriptionForSave: non-empty text is converted to paragraphs', () => {
  assert.equal(descriptionForSave('a\n\nb'), '<p>a</p><p>b</p>');
});

test('sortNewestFirst: orders by created_at descending regardless of pinning', () => {
  const n = (id: string, created_at: string, is_pinned = false) => ({ id, created_at, is_pinned });
  const sorted = sortNewestFirst([
    n('old-pinned', '2026-01-01T00:00:00Z', true),
    n('new', '2026-10-26T00:00:00Z'),
    n('mid', '2026-05-01T00:00:00Z')
  ]);
  assert.deepEqual(sorted.map(x => x.id), ['new', 'mid', 'old-pinned']);
});
