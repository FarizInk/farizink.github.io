import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCron,
  nextRuns,
  describeCron,
  summarizeField,
  relativeFromNow,
  type ParsedCron
} from '../src/lib/tools/cron.ts';

function ok(expr: string): ParsedCron {
  const r = parseCron(expr);
  if (!r.ok) throw new Error(`expected "${expr}" to parse: ${r.error.message}`);
  return r.cron;
}

function err(expr: string) {
  const r = parseCron(expr);
  if (r.ok) throw new Error(`expected "${expr}" to fail`);
  return r.error;
}

const vals = (s: Set<number>) => [...s].sort((a, b) => a - b);
const iso = (ds: Date[]) => ds.map(d => d.toISOString().slice(0, 16) + 'Z');
const at = (s: string) => new Date(s);

// ------------------------------------------------------------- parsing

test('parseCron: star, single, range, list', () => {
  const c = ok('* 5 1-3 1,6,12 *');
  assert.equal(c.minute.values.size, 60);
  assert.deepEqual(vals(c.hour.values), [5]);
  assert.deepEqual(vals(c.dayOfMonth.values), [1, 2, 3]);
  assert.deepEqual(vals(c.month.values), [1, 6, 12]);
  assert.deepEqual(vals(c.dayOfWeek.values), [0, 1, 2, 3, 4, 5, 6]);
});

test('parseCron: steps (*/n, a-b/n, a/n)', () => {
  assert.deepEqual(vals(ok('*/15 * * * *').minute.values), [0, 15, 30, 45]);
  assert.deepEqual(vals(ok('10-30/10 * * * *').minute.values), [10, 20, 30]);
  assert.deepEqual(vals(ok('50/5 * * * *').minute.values), [50, 55]);
  assert.deepEqual(vals(ok('0 */6 * * *').hour.values), [0, 6, 12, 18]);
  assert.deepEqual(vals(ok('0 0 */10 * *').dayOfMonth.values), [1, 11, 21, 31]);
});

test('parseCron: month and weekday names, case-insensitive', () => {
  const c = ok('0 0 * jan-Mar,DEC mon-fri');
  assert.deepEqual(vals(c.month.values), [1, 2, 3, 12]);
  assert.deepEqual(vals(c.dayOfWeek.values), [1, 2, 3, 4, 5]);
  assert.deepEqual(vals(ok('0 0 * * SUN,sat').dayOfWeek.values), [0, 6]);
});

test('parseCron: 7 is Sunday', () => {
  assert.deepEqual(vals(ok('0 0 * * 7').dayOfWeek.values), [0]);
  assert.deepEqual(vals(ok('0 0 * * 5-7').dayOfWeek.values), [0, 5, 6]);
});

test('parseCron: macros expand', () => {
  assert.equal(ok('@yearly').expression, '0 0 1 1 *');
  assert.equal(ok('@annually').expression, '0 0 1 1 *');
  assert.equal(ok('@monthly').expression, '0 0 1 * *');
  assert.equal(ok('@weekly').expression, '0 0 * * 0');
  assert.equal(ok('@daily').expression, '0 0 * * *');
  assert.equal(ok('@MIDNIGHT').expression, '0 0 * * *');
  assert.equal(ok('@hourly').expression, '0 * * * *');
  assert.equal(ok('@daily').macro, '@daily');
  assert.equal(err('@reboot').field, 'expression');
  assert.equal(err('@sometimes').field, 'expression');
});

test('parseCron: extra whitespace is fine', () => {
  const c = ok('  0   9 *\t* 1-5  ');
  assert.equal(c.expression, '0 9 * * 1-5');
});

test('parseCron: wrong field count', () => {
  const e = err('* * * *');
  assert.equal(e.field, 'expression');
  assert.match(e.message, /5 fields/);
  assert.equal(err('* * * * * *').field, 'expression');
  assert.equal(err('   ').field, 'expression');
});

test('parseCron: out-of-range values name the field', () => {
  assert.deepEqual(
    { field: err('0 25 * * *').field, message: err('0 25 * * *').message },
    { field: 'hour', message: 'hour: 25 is out of range 0–23' }
  );
  assert.equal(err('99 99 99 99 99').field, 'minute');
  assert.equal(err('60 * * * *').message, 'minute: 60 is out of range 0–59');
  assert.equal(err('0 0 0 * *').field, 'dayOfMonth');
  assert.equal(err('0 0 32 * *').field, 'dayOfMonth');
  assert.equal(err('0 0 * 13 *').field, 'month');
  assert.equal(err('0 0 * 0 *').field, 'month');
  assert.equal(err('0 0 * * 8').field, 'dayOfWeek');
});

test('parseCron: garbage names the field', () => {
  assert.equal(err('abc * * * *').field, 'minute');
  assert.equal(err('* x * * *').field, 'hour');
  assert.equal(err('* * L * *').field, 'dayOfMonth');
  assert.equal(err('* * * FOO *').field, 'month');
  assert.equal(err('* * * * MON#2').field, 'dayOfWeek');
  assert.equal(err('* * * * JAN').field, 'dayOfWeek'); // month name in weekday field
  assert.equal(err('*/0 * * * *').field, 'minute');
  assert.equal(err('1,,2 * * * *').field, 'minute');
  assert.equal(err('30-10 * * * *').field, 'minute');
  assert.equal(err('1-2-3 * * * *').field, 'minute');
  assert.equal(err('-5 * * * *').field, 'minute');
  assert.equal(err('* * * * *x').field, 'dayOfWeek');
});

test('parseCron: day restriction flags (Vixie: field starting with * is unrestricted)', () => {
  const both = ok('0 0 1 * 1');
  assert.equal(both.domRestricted, true);
  assert.equal(both.dowRestricted, true);
  const neither = ok('0 0 * * *');
  assert.equal(neither.domRestricted, false);
  assert.equal(neither.dowRestricted, false);
  assert.equal(ok('0 0 */2 * 1').domRestricted, false);
});

// ------------------------------------------------------------- next runs

test('nextRuns: */15 every quarter hour, strictly after from', () => {
  const r = nextRuns(ok('*/15 * * * *'), at('2026-01-01T10:00:00Z'), 5, 'UTC');
  assert.deepEqual(iso(r.runs), [
    '2026-01-01T10:15Z',
    '2026-01-01T10:30Z',
    '2026-01-01T10:45Z',
    '2026-01-01T11:00Z',
    '2026-01-01T11:15Z'
  ]);
  assert.equal(r.impossible, false);
  assert.equal(r.limitReached, false);
});

test('nextRuns: seconds in from round up to the next minute', () => {
  const r = nextRuns(ok('* * * * *'), at('2026-01-01T10:00:30Z'), 2, 'UTC');
  assert.deepEqual(iso(r.runs), ['2026-01-01T10:01Z', '2026-01-01T10:02Z']);
});

test('nextRuns: 0 0 1 * * runs monthly across a year boundary', () => {
  const r = nextRuns(ok('0 0 1 * *'), at('2026-11-15T12:00:00Z'), 4, 'UTC');
  assert.deepEqual(iso(r.runs), [
    '2026-12-01T00:00Z',
    '2027-01-01T00:00Z',
    '2027-02-01T00:00Z',
    '2027-03-01T00:00Z'
  ]);
});

test('nextRuns: 0 9 * * 1-5 skips weekends', () => {
  // 2026-11-13 is a Friday.
  const r = nextRuns(ok('0 9 * * 1-5'), at('2026-11-13T10:00:00Z'), 3, 'UTC');
  assert.deepEqual(iso(r.runs), ['2026-11-16T09:00Z', '2026-11-17T09:00Z', '2026-11-18T09:00Z']);
});

test('nextRuns: 7 and 0 both mean Sunday', () => {
  const a = nextRuns(ok('0 0 * * 7'), at('2026-11-11T00:00:00Z'), 2, 'UTC');
  const b = nextRuns(ok('0 0 * * SUN'), at('2026-11-11T00:00:00Z'), 2, 'UTC');
  assert.deepEqual(iso(a.runs), ['2026-11-15T00:00Z', '2026-11-22T00:00Z']);
  assert.deepEqual(iso(a.runs), iso(b.runs));
});

test('nextRuns: DOM/DOW OR rule when both are restricted', () => {
  // Day 1 of the month OR any Monday. 2026-11-30 is a Monday.
  const r = nextRuns(ok('0 0 1 * 1'), at('2026-11-25T00:00:00Z'), 4, 'UTC');
  assert.deepEqual(iso(r.runs), [
    '2026-11-30T00:00Z',
    '2026-12-01T00:00Z',
    '2026-12-07T00:00Z',
    '2026-12-14T00:00Z'
  ]);
});

test('nextRuns: AND when only one day field is restricted (*/2 counts as unrestricted)', () => {
  // Odd days AND Monday. Mondays in Dec 2026: 7, 14, 21, 28 → 7 and 21.
  const r = nextRuns(ok('0 0 */2 * 1'), at('2026-12-01T00:00:00Z'), 2, 'UTC');
  assert.deepEqual(iso(r.runs), ['2026-12-07T00:00Z', '2026-12-21T00:00Z']);
});

test('nextRuns: Feb 29 only in leap years', () => {
  const r = nextRuns(ok('0 0 29 2 *'), at('2026-11-11T00:00:00Z'), 2, 'UTC');
  assert.deepEqual(iso(r.runs), ['2028-02-29T00:00Z']);
  assert.equal(r.impossible, false);
  assert.equal(r.limitReached, true); // 2032 is beyond the 5-year window
});

test('nextRuns: impossible 0 0 31 2 * returns nothing with a flag', () => {
  const r = nextRuns(ok('0 0 31 2 *'), at('2026-11-11T00:00:00Z'), 5, 'UTC');
  assert.deepEqual(r.runs, []);
  assert.equal(r.impossible, true);
  // ...but with a weekday as well, the OR rule makes it possible.
  assert.equal(nextRuns(ok('0 0 31 2 1'), at('2026-11-11T00:00:00Z'), 1, 'UTC').runs.length, 1);
});

test('nextRuns: yearly macro', () => {
  const r = nextRuns(ok('@yearly'), at('2026-11-11T00:00:00Z'), 2, 'UTC');
  assert.deepEqual(iso(r.runs), ['2027-01-01T00:00Z', '2028-01-01T00:00Z']);
});

test('nextRuns: local mode returns times matching local fields', () => {
  const r = nextRuns(ok('30 14 * * *'), new Date(2026, 5, 1, 15, 0), 2, 'local');
  assert.equal(r.runs.length, 2);
  for (const d of r.runs) {
    assert.equal(d.getHours(), 14);
    assert.equal(d.getMinutes(), 30);
  }
  assert.equal(r.runs[0].getDate(), 2);
});

// ------------------------------------------------------------- description

test('describeCron: common schedules', () => {
  const d = (e: string) => describeCron(ok(e));
  assert.equal(d('0 9 * * 1-5'), 'At 09:00, Monday through Friday');
  assert.equal(d('*/15 * * * *'), 'Every 15 minutes');
  assert.equal(d('0 0 1 * *'), 'At 00:00 on day 1 of the month');
  assert.equal(d('* * * * *'), 'Every minute');
  assert.equal(d('0 * * * *'), 'Every hour');
  assert.equal(d('0 */4 * * *'), 'Every 4 hours');
  assert.equal(d('5 * * * *'), 'At minute 5 past every hour');
  assert.equal(d('0 0 * * 0'), 'At 00:00 on Sunday');
  assert.equal(d('0 0 * * 0,6'), 'At 00:00 on Sunday and Saturday');
  assert.equal(d('0 9,17 * * *'), 'At 09:00 and 17:00');
  assert.equal(d('@yearly'), 'At 00:00 on day 1 of the month, in January');
  assert.equal(d('* 9-17 * * *'), 'Every minute, between 09:00 and 17:59');
});

test('describeCron: mentions the OR rule when both day fields are set', () => {
  const s = describeCron(ok('0 0 1 * 1'));
  assert.match(s, /day 1 of the month or on Monday/);
  assert.match(s, /either/);
});

test('describeCron: 7 reads as Sunday, not a parseInt of the range', () => {
  assert.equal(describeCron(ok('0 0 * * 5-7')), 'At 00:00, Friday through Sunday');
});

// ------------------------------------------------------------- helpers

test('summarizeField', () => {
  const c = ok('*/15 0 * jan,jul 1-5');
  assert.equal(summarizeField(c.minute), '0, 15, 30, 45');
  assert.equal(summarizeField(c.dayOfMonth), 'every value');
  assert.equal(summarizeField(c.month), 'Jan, Jul');
  assert.equal(summarizeField(c.dayOfWeek), 'Mon, Tue, Wed, Thu, Fri');
  assert.match(summarizeField(ok('*/5 * * * *').minute), /^12 values/);
});

test('relativeFromNow', () => {
  const now = at('2026-01-01T00:00:00Z');
  assert.equal(relativeFromNow(at('2026-01-01T00:00:20Z'), now), 'in under a minute');
  assert.equal(relativeFromNow(at('2026-01-01T00:45:00Z'), now), 'in 45 min');
  assert.equal(relativeFromNow(at('2026-01-01T03:00:00Z'), now), 'in 3 h');
  assert.equal(relativeFromNow(at('2026-01-05T00:00:00Z'), now), 'in 4 d');
});
