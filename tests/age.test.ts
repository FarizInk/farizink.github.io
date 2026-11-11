import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDateInput,
  formatDateInput,
  todayLocal,
  ageBetween,
  addMonths,
  nextBirthday,
  weekdayOf,
  calculateAge,
  ageSummary,
  type CalendarDate
} from '../src/lib/tools/age.ts';

const d = (s: string): CalendarDate => {
  const parsed = parseDateInput(s);
  assert.ok(parsed, `bad fixture ${s}`);
  return parsed;
};
const ymd = (birth: string, target: string) => {
  const age = ageBetween(d(birth), d(target));
  assert.ok(age);
  return [age.years, age.months, age.days];
};

test('parseDateInput / formatDateInput round-trip and reject invalid dates', () => {
  assert.deepEqual(parseDateInput('1990-12-25'), { y: 1990, m: 12, d: 25 });
  assert.equal(formatDateInput({ y: 1990, m: 1, d: 5 }), '1990-01-05');
  assert.equal(formatDateInput({ y: 33, m: 1, d: 5 }), '0033-01-05');
  for (const bad of ['', '1990-13-01', '1990-02-30', '2001-02-29', '1990-1-1', 'abc']) {
    assert.equal(parseDateInput(bad), null, bad);
  }
  assert.deepEqual(parseDateInput('2000-02-29'), { y: 2000, m: 2, d: 29 });
});

test('todayLocal uses local calendar fields, not UTC', () => {
  // 00:30 local time on Nov 11 must be Nov 11 whatever the zone.
  assert.deepEqual(todayLocal(new Date(2026, 10, 11, 0, 30)), { y: 2026, m: 11, d: 11 });
  assert.deepEqual(todayLocal(new Date(2026, 10, 11, 23, 59)), { y: 2026, m: 11, d: 11 });
});

test('same day is 0 years, 0 months, 0 days', () => {
  const age = ageBetween(d('2026-11-11'), d('2026-11-11'));
  assert.ok(age);
  assert.deepEqual([age.years, age.months, age.days, age.totalDays, age.totalMonths], [0, 0, 0, 0, 0]);
});

test('2000-01-31 → 2001-03-01 has no negative parts', () => {
  assert.deepEqual(ymd('2000-01-31', '2001-03-01'), [1, 1, 1]);
  assert.deepEqual(ymd('2000-01-31', '2000-03-01'), [0, 1, 1]); // leap year: Feb 29 + 1
  assert.deepEqual(ymd('2000-01-31', '2000-02-29'), [0, 1, 0]);
});

test('month-end clamping', () => {
  assert.deepEqual(addMonths(d('2001-01-31'), 1), d('2001-02-28'));
  assert.deepEqual(addMonths(d('2000-01-31'), 1), d('2000-02-29'));
  assert.deepEqual(addMonths(d('2000-03-31'), 1), d('2000-04-30'));
  assert.deepEqual(addMonths(d('2000-12-15'), 1), d('2001-01-15'));
  assert.deepEqual(addMonths(d('2000-01-15'), -1), d('1999-12-15'));
  assert.deepEqual(ymd('2001-01-31', '2001-02-28'), [0, 1, 0]);
  assert.deepEqual(ymd('2001-03-31', '2001-04-30'), [0, 1, 0]);
  assert.deepEqual(ymd('2001-03-31', '2001-05-01'), [0, 1, 1]);
});

test('every day pair in a span yields non-negative parts that add back up', () => {
  const start = d('1999-12-01');
  for (let i = 0; i < 120; i++) {
    for (let j = i; j < i + 800; j += 7) {
      const b = addDays(start, i);
      const t = addDays(start, j);
      const age = ageBetween(b, t);
      assert.ok(age);
      assert.ok(age.years >= 0 && age.months >= 0 && age.months < 12 && age.days >= 0);
      assert.equal(age.totalDays, j - i);
    }
  }
});

function addDays(date: CalendarDate, n: number): CalendarDate {
  const t = new Date(Date.UTC(date.y, date.m - 1, date.d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

test('leap-day birthdays', () => {
  assert.deepEqual(ymd('2000-02-29', '2001-02-28'), [1, 0, 0]);
  assert.deepEqual(ymd('2000-02-29', '2001-03-01'), [1, 0, 1]);
  assert.deepEqual(ymd('2000-02-29', '2004-02-29'), [4, 0, 0]);
  assert.deepEqual(ymd('2000-02-29', '2004-02-28'), [3, 11, 30]);
});

test('totals', () => {
  const age = ageBetween(d('2000-01-01'), d('2001-01-01'));
  assert.ok(age);
  assert.equal(age.totalDays, 366);
  assert.equal(age.totalMonths, 12);
  assert.equal(age.totalWeeks, 52);
  assert.equal(age.weekRemainderDays, 2);
  assert.equal(age.approxHours, 366 * 24);
});

test('target before birth returns null', () => {
  assert.equal(ageBetween(d('2000-01-02'), d('2000-01-01')), null);
});

test('weekdayOf', () => {
  assert.equal(weekdayOf(d('1970-01-01')), 'Thursday');
  assert.equal(weekdayOf(d('2026-11-11')), 'Wednesday');
  assert.equal(weekdayOf(d('2026-12-25')), 'Friday');
  assert.equal(weekdayOf(d('1900-01-01')), 'Monday');
});

test('next birthday: 1990-12-25 seen on 2026-11-11 is 2026-12-25 (not a day early)', () => {
  const next = nextBirthday(d('1990-12-25'), d('2026-11-11'));
  assert.deepEqual(next.date, d('2026-12-25'));
  assert.equal(next.daysUntil, 44);
  assert.equal(next.turning, 36);
  assert.equal(next.weekday, 'Friday');
});

test('next birthday is today → 0 days', () => {
  const next = nextBirthday(d('1990-11-11'), d('2026-11-11'));
  assert.equal(next.daysUntil, 0);
  assert.equal(next.turning, 36);
});

test('next birthday across year end', () => {
  const next = nextBirthday(d('1990-01-05'), d('2026-12-30'));
  assert.deepEqual(next.date, d('2027-01-05'));
  assert.equal(next.daysUntil, 6);
  assert.equal(next.turning, 37);
});

test('next birthday for a baby born today is in one year', () => {
  const next = nextBirthday(d('2026-11-11'), d('2026-11-11'));
  assert.deepEqual(next.date, d('2027-11-11'));
  assert.equal(next.turning, 1);
  assert.equal(next.daysUntil, 365);
});

test('leap-day birthday falls on Feb 28 in common years', () => {
  const common = nextBirthday(d('2000-02-29'), d('2026-01-10'));
  assert.deepEqual(common.date, d('2026-02-28'));
  assert.equal(common.shiftedFromLeapDay, true);
  const leap = nextBirthday(d('2000-02-29'), d('2027-03-01'));
  assert.deepEqual(leap.date, d('2028-02-29'));
  assert.equal(leap.shiftedFromLeapDay, false);
  assert.equal(leap.turning, 28);
});

test('calculateAge validation', () => {
  const today = d('2026-11-11');
  assert.equal(calculateAge('', '2026-11-11', today), null);
  const future = calculateAge('2026-11-12', '2026-11-11', today);
  assert.ok(future && !future.ok);
  assert.equal(future.field, 'birth');
  assert.match(future.error, /future/);
  const before = calculateAge('2000-01-01', '1999-12-31', today);
  assert.ok(before && !before.ok);
  assert.equal(before.field, 'target');
  const empty = calculateAge('2000-01-01', '', today);
  assert.ok(empty && !empty.ok && empty.field === 'target');
  const ok = calculateAge('2026-11-11', '2026-11-11', today);
  assert.ok(ok && ok.ok);
  assert.equal(ok.age.totalDays, 0);
});

test('ageSummary', () => {
  const age = ageBetween(d('1990-12-25'), d('2026-11-11'));
  assert.ok(age);
  assert.equal(
    ageSummary(d('1990-12-25'), d('2026-11-11'), age),
    'Born 1990-12-25: 35 years, 10 months, 17 days old on 2026-11-11 (13,105 days).'
  );
});
