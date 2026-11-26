import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  linkStatus,
  destinationHost,
  displayTitle,
  countryName,
  fieldErrors,
  slugError,
  urlError,
  toLocalInput,
  fromLocalInput,
  expiryError,
  validateForm,
  createPayload,
  updatePayload,
  formValuesFrom,
  chartBars,
  niceMax,
  formatDay,
  formatBarRange,
  formatTick,
  relativeFrom,
  type LinkCore,
  type DailyPoint
} from '../src/lib/linkHelpers.ts';

const NOW = Date.parse('2026-11-26T12:00:00Z');
const base: LinkCore = {
  title: null,
  slug: 'cv',
  destination_url: 'https://www.example.com/a/b?c=1',
  is_active: true,
  expires_at: null
};

test('linkStatus: active, disabled, expired (expired wins)', () => {
  assert.equal(linkStatus(base, NOW), 'active');
  assert.equal(linkStatus({ ...base, is_active: false }, NOW), 'disabled');
  assert.equal(linkStatus({ ...base, expires_at: '2026-11-26T11:59:59Z' }, NOW), 'expired');
  assert.equal(linkStatus({ ...base, is_active: false, expires_at: '2026-01-01T00:00:00Z' }, NOW), 'expired');
  assert.equal(linkStatus({ ...base, expires_at: '2026-12-01T00:00:00Z' }, NOW), 'active');
  assert.equal(linkStatus({ ...base, expires_at: 'garbage' }, NOW), 'active');
});

test('destinationHost / displayTitle', () => {
  assert.equal(destinationHost('https://www.example.com/x'), 'example.com');
  assert.equal(destinationHost('not a url'), 'not a url');
  assert.equal(displayTitle(base), 'example.com');
  assert.equal(displayTitle({ ...base, title: '  My CV ' }), 'My CV');
  assert.equal(displayTitle({ ...base, title: '   ' }), 'example.com');
});

test('countryName maps ISO-2 and passes the rest through', () => {
  assert.equal(countryName('ID'), 'Indonesia');
  assert.equal(countryName('us'), 'United States');
  assert.equal(countryName('Unknown'), 'Unknown');
  assert.equal(countryName('XYZ'), 'XYZ');
});

test('fieldErrors takes the first message per field', () => {
  assert.deepEqual(
    fieldErrors({ message: 'x', errors: { slug: ['The slug has already been taken.', 'other'], title: 'Too long' } }),
    { slug: 'The slug has already been taken.', title: 'Too long' }
  );
  assert.deepEqual(fieldErrors(null), {});
  assert.deepEqual(fieldErrors({ message: 'no errors key' }), {});
});

test('slugError mirrors [a-z0-9-]{1,64}, lowercasing first', () => {
  assert.equal(slugError('', false), null);
  assert.ok(slugError('', true));
  assert.equal(slugError('My-Slug-2', true), null);
  assert.ok(slugError('has space', false));
  assert.ok(slugError('under_score', false));
  assert.ok(slugError('a'.repeat(65), false));
  assert.equal(slugError('a'.repeat(64), false), null);
});

test('urlError: http/https only, max 2048', () => {
  assert.equal(urlError('https://example.com'), null);
  assert.equal(urlError(' http://example.com/x '), null);
  assert.ok(urlError(''));
  assert.ok(urlError('example.com'));
  assert.ok(urlError('ftp://example.com'));
  assert.ok(urlError('javascript:alert(1)'));
  assert.ok(urlError('https://example.com/' + 'a'.repeat(2048)));
});

test('datetime-local round trip', () => {
  const iso = '2026-12-24T09:30:00.000Z';
  const local = toLocalInput(iso);
  assert.match(local, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  assert.equal(fromLocalInput(local), iso);
  assert.equal(toLocalInput(null), '');
  assert.equal(fromLocalInput(''), null);
  assert.equal(fromLocalInput('nope'), null);
});

test('expiryError wants a future moment', () => {
  assert.equal(expiryError(''), null);
  assert.ok(expiryError(toLocalInput('2020-01-01T00:00:00Z')));
  assert.equal(expiryError(toLocalInput(new Date(Date.now() + 86_400_000).toISOString())), null);
});

test('validateForm: create allows empty slug, edit does not; untouched past expiry is fine on edit', () => {
  const values = { destination_url: 'https://a.dev', slug: '', title: '', expires_at: '' };
  assert.deepEqual(validateForm(values, 'create'), {});
  assert.ok(validateForm(values, 'edit').slug);

  const expired = { ...base, expires_at: '2020-01-01T00:00:00Z' };
  assert.deepEqual(validateForm(formValuesFrom(expired), 'edit', expired), {});
  assert.ok(validateForm({ ...formValuesFrom(expired), expires_at: toLocalInput('2021-01-01T00:00:00Z') }, 'edit', expired).expires_at);
});

test('createPayload sends only what was filled', () => {
  assert.deepEqual(createPayload({ destination_url: ' https://a.dev ', slug: '', title: ' ', expires_at: '' }), {
    destination_url: 'https://a.dev'
  });
  const local = toLocalInput('2027-01-01T00:00:00Z');
  assert.deepEqual(createPayload({ destination_url: 'https://a.dev', slug: ' CV ', title: 'Mine', expires_at: local }), {
    destination_url: 'https://a.dev',
    slug: 'cv',
    title: 'Mine',
    expires_at: '2027-01-01T00:00:00.000Z'
  });
});

test('updatePayload sends changed fields; clearing title/expiry sends null', () => {
  const link: LinkCore = { ...base, title: 'Old', expires_at: '2027-01-01T00:00:00.000Z' };
  assert.deepEqual(updatePayload(formValuesFrom(link), link), {});
  assert.deepEqual(updatePayload({ ...formValuesFrom(link), slug: 'New-Slug' }, link), { slug: 'new-slug' });
  assert.deepEqual(updatePayload({ ...formValuesFrom(link), title: '', expires_at: '' }, link), {
    title: null,
    expires_at: null
  });
  assert.deepEqual(updatePayload({ ...formValuesFrom(base), title: 'New' }, base), { title: 'New' });
});

function days(n: number, end = '2026-11-26'): DailyPoint[] {
  const last = Date.parse(`${end}T00:00:00Z`);
  return Array.from({ length: n }, (_, i) => ({
    date: new Date(last - (n - 1 - i) * 86_400_000).toISOString().slice(0, 10),
    clicks: 1
  }));
}

test('chartBars keeps days up to 120, folds longer ranges into weeks ending today', () => {
  const short = chartBars(days(90));
  assert.equal(short.unit, 'day');
  assert.equal(short.bars.length, 90);

  const long = chartBars(days(200));
  assert.equal(long.unit, 'week');
  assert.equal(long.bars.length, Math.ceil(200 / 7));
  const last = long.bars[long.bars.length - 1];
  assert.equal(last.end, '2026-11-26');
  assert.equal(last.start, '2026-11-20');
  assert.equal(last.clicks, 7);
  assert.equal(long.bars[0].clicks, 4); // 200 = 28 × 7 + 4
  assert.equal(long.bars.reduce((s, b) => s + b.clicks, 0), 200);
});

test('niceMax gives clean, halvable maxima', () => {
  assert.equal(niceMax(0), 4);
  assert.equal(niceMax(3), 4);
  assert.equal(niceMax(7), 10);
  assert.equal(niceMax(12), 20);
  assert.equal(niceMax(20), 20);
  assert.equal(niceMax(41), 50);
  assert.equal(niceMax(999), 1000);
  assert.equal(niceMax(NaN), 4);
});

test('date and number formatting', () => {
  assert.equal(formatDay('2026-11-26'), '26 Nov');
  assert.equal(formatDay('2026-11-26', true), '26 Nov 2026');
  assert.equal(formatDay('bad'), 'bad');
  assert.equal(formatBarRange({ start: '2026-11-20', end: '2026-11-26', clicks: 0 }, true), '20 Nov – 26 Nov 2026');
  assert.equal(formatTick(5000), '5,000');
  assert.equal(formatTick(20000), '20K');
});

test('relativeFrom', () => {
  assert.equal(relativeFrom(null, NOW), 'never');
  assert.equal(relativeFrom('2026-11-26T11:59:30Z', NOW), 'just now');
  assert.equal(relativeFrom('2026-11-26T11:55:00Z', NOW), '5 min ago');
  assert.equal(relativeFrom('2026-11-25T11:00:00Z', NOW), 'yesterday');
  assert.equal(relativeFrom('2026-11-20T12:00:00Z', NOW), '6 days ago');
  assert.match(relativeFrom('2026-01-02T12:00:00Z', NOW), /2 Jan 2026/);
});
