import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  toSlim,
  describe,
  summarize,
  level,
  readCache,
  writeCache,
  CACHE_KEY,
  CACHE_TTL_MS,
  type KVStorage,
  type SlimEvent
} from '../src/lib/github.ts';

function memory(init: Record<string, string> = {}): KVStorage {
  const data = new Map(Object.entries(init));
  return { getItem: k => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
}

const ev = (type: string, at: string, repo = 'a/b', extra: Partial<SlimEvent> = {}): SlimEvent => ({
  type,
  at,
  repo,
  ...extra
});

test('toSlim: keeps the fields we use and drops malformed events', () => {
  const raw = [
    {
      type: 'PullRequestEvent',
      created_at: '2026-11-18T10:00:00Z',
      repo: { name: 'x/y' },
      payload: { action: 'closed', pull_request: { merged: true } }
    },
    {
      type: 'CreateEvent',
      created_at: '2026-11-18T09:00:00Z',
      repo: { name: 'x/y' },
      payload: { ref_type: 'branch' }
    },
    { type: 'PushEvent', created_at: '2026-11-18T08:00:00Z' },
    null,
    'nope'
  ];
  assert.deepEqual(toSlim(raw), [
    {
      type: 'PullRequestEvent',
      at: '2026-11-18T10:00:00Z',
      repo: 'x/y',
      action: 'closed',
      merged: true
    },
    { type: 'CreateEvent', at: '2026-11-18T09:00:00Z', repo: 'x/y', refType: 'branch' }
  ]);
  assert.deepEqual(toSlim({ message: 'API rate limit exceeded' }), []);
});

test('describe: meaningful events get a verb, noise gets null', () => {
  assert.equal(describe(ev('PushEvent', '')), 'Pushed to');
  assert.equal(describe(ev('PullRequestEvent', '', 'a/b', { action: 'opened' })), 'Opened a PR in');
  assert.equal(
    describe(ev('PullRequestEvent', '', 'a/b', { action: 'closed', merged: true })),
    'Merged a PR in'
  );
  assert.equal(describe(ev('PullRequestEvent', '', 'a/b', { action: 'closed' })), null);
  assert.equal(describe(ev('PullRequestEvent', '', 'a/b', { action: 'assigned' })), null);
  assert.equal(describe(ev('CreateEvent', '', 'a/b', { refType: 'branch' })), null);
  assert.equal(describe(ev('CreateEvent', '', 'a/b', { refType: 'repository' })), 'Created');
  assert.equal(describe(ev('WatchEvent', '')), 'Starred');
  assert.equal(describe(ev('GollumEvent', '')), null);
});

test('summarize: buckets per local day, newest last, ignores noise', () => {
  const now = new Date(2026, 10, 23, 12, 0);
  const iso = (d: number, h = 10) => new Date(2026, 10, d, h).toISOString();
  const events = [
    ev('PushEvent', iso(23)),
    ev('PushEvent', iso(22)),
    ev('PushEvent', iso(22, 11)),
    ev('CreateEvent', iso(22), 'a/b', { refType: 'branch' }),
    ev('WatchEvent', iso(1)) // 22 days ago
  ];
  const a = summarize(events, now, 30);
  assert.equal(a.days.length, 30);
  assert.equal(a.days[29], 1);
  assert.equal(a.days[28], 2);
  assert.equal(a.days[29 - 22], 1);
  assert.equal(a.total, 4);
});

test('summarize: events older than the window still show in the feed', () => {
  const now = new Date(2026, 10, 23, 12, 0);
  const a = summarize([ev('ForkEvent', new Date(2026, 8, 1).toISOString())], now, 30);
  assert.equal(a.total, 0);
  assert.equal(a.items.length, 1);
});

test('summarize: feed is newest first, collapses repeats, capped', () => {
  const events = [
    ev('PushEvent', '2026-11-18T08:00:00Z', 'me/one'),
    ev('PushEvent', '2026-11-22T08:00:00Z', 'me/one'),
    ev('WatchEvent', '2026-11-23T02:00:00Z', 'x/star'),
    ev('PushEvent', '2026-11-11T08:00:00Z', 'me/site'),
    ev('ForkEvent', '2026-11-10T08:00:00Z', 'x/fork')
  ];
  const { items } = summarize(events, new Date('2026-11-23T12:00:00Z'), 30, 3);
  assert.deepEqual(
    items.map(i => `${i.verb} ${i.repo}`),
    ['Starred x/star', 'Pushed to me/one', 'Pushed to me/site']
  );
  assert.equal(items[0].url, 'https://github.com/x/star');
});

test('summarize: empty input gives an empty, well-formed result', () => {
  const a = summarize([], new Date(), 30);
  assert.equal(a.total, 0);
  assert.deepEqual(a.items, []);
  assert.ok(a.days.every(n => n === 0));
});

test('level: buckets counts into 0–4', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 6, 7, 50].map(level), [0, 1, 2, 2, 3, 3, 4, 4]);
});

test('cache: round-trips and reports freshness', () => {
  const s = memory();
  const events = [ev('PushEvent', '2026-11-22T08:00:00Z')];
  writeCache(s, events, 1_000);
  assert.deepEqual(readCache(s, 1_000 + CACHE_TTL_MS - 1), { events, fresh: true });
  assert.deepEqual(readCache(s, 1_000 + CACHE_TTL_MS), { events, fresh: false });
});

test('cache: missing or corrupt entries read as null', () => {
  assert.equal(readCache(memory()), null);
  assert.equal(readCache(memory({ [CACHE_KEY]: '{oops' })), null);
  assert.equal(readCache(memory({ [CACHE_KEY]: '{"savedAt":"x","events":[]}' })), null);
});

test('cache: a throwing storage never breaks the tile', () => {
  const broken: KVStorage = {
    getItem: () => {
      throw new Error('blocked');
    },
    setItem: () => {
      throw new Error('blocked');
    }
  };
  assert.equal(readCache(broken), null);
  assert.doesNotThrow(() => writeCache(broken, []));
});
