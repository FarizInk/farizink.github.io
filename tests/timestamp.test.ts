import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseTimeInput,
  describeParse,
  detectUnit,
  isNumericInput,
  formatAll,
  relativeTime,
  isoWeek,
  dayOfYear,
  zoneOffsetMinutes,
  toDateTimeLocal,
  fromDateTimeLocal,
  type ParseResult,
  type ParsedTime
} from '../src/lib/tools/timestamp.ts';

const NOW = new Date('2026-06-15T12:00:00Z');
const NEW_YEAR_2024 = Date.UTC(2024, 0, 1); // 1704067200000

function ok(r: ParseResult): ParsedTime {
  if (!r.ok) assert.fail(`expected ok, got error: ${r.error}`);
  return r.value;
}
function err(r: ParseResult): string {
  if (r.ok) assert.fail(`expected an error, got ${r.value.date.toISOString()}`);
  return r.error;
}
function unixOf(input: string, unit: Parameters<typeof parseTimeInput>[2] = 'auto') {
  const v = ok(parseTimeInput(input, NOW, unit));
  assert.equal(v.kind, 'unix');
  return v as Extract<ParsedTime, { kind: 'unix' }>;
}

// --- unit detection -------------------------------------------------------

test('detectUnit: digit-count boundaries', () => {
  assert.equal(detectUnit(1), 's');
  assert.equal(detectUnit(11), 's');
  assert.equal(detectUnit(12), 'ms');
  assert.equal(detectUnit(14), 'ms');
  assert.equal(detectUnit(15), 'us');
  assert.equal(detectUnit(17), 'us');
  assert.equal(detectUnit(18), 'ns');
  assert.equal(detectUnit(20), 'ns');
  assert.equal(detectUnit(21), null);
});

test('parseTimeInput: seconds, ms, µs and ns all land on the same instant', () => {
  for (const [input, unit] of [
    ['1704067200', 's'],
    ['1704067200000', 'ms'],
    ['1704067200000000', 'us'],
    ['1704067200000000000', 'ns']
  ] as const) {
    const v = unixOf(input);
    assert.equal(v.detectedUnit, unit, input);
    assert.equal(v.unit, unit, input);
    assert.equal(v.date.getTime(), NEW_YEAR_2024, input);
  }
});

test('parseTimeInput: 13-digit ms is not multiplied again (regression)', () => {
  const v = unixOf('1704067200123');
  assert.equal(v.date.toISOString(), '2024-01-01T00:00:00.123Z');
});

test('parseTimeInput: µs/ns keep millisecond precision', () => {
  assert.equal(unixOf('1704067200123456').date.toISOString(), '2024-01-01T00:00:00.123Z');
  assert.equal(unixOf('1704067200123456789').date.toISOString(), '2024-01-01T00:00:00.123Z');
});

test('parseTimeInput: unit override beats detection', () => {
  const v = unixOf('1704067200', 'ms');
  assert.equal(v.unit, 'ms');
  assert.equal(v.detectedUnit, 's');
  assert.equal(v.date.getTime(), 1704067200);
  assert.match(describeParse(v), /Reading as milliseconds/);
});

test('parseTimeInput: override that overflows Date is an error, not a garbage date', () => {
  // 20 digits read as seconds is far beyond what a Date can hold.
  assert.match(err(parseTimeInput('17040672000000000000', NOW, 's')), /outside the range/);
});

test('parseTimeInput: zero, small and negative timestamps', () => {
  assert.equal(unixOf('0').date.getTime(), 0);
  assert.equal(unixOf('-1').date.toISOString(), '1969-12-31T23:59:59.000Z');
  assert.equal(unixOf('-86400').date.toISOString(), '1969-12-31T00:00:00.000Z');
  const ms = unixOf('-1704067200000');
  assert.equal(ms.unit, 'ms');
  assert.equal(ms.date.getTime(), -NEW_YEAR_2024);
  // negative µs floors toward the past
  assert.equal(unixOf('-1000000000000001').date.getTime(), -1000000000001);
});

test('parseTimeInput: leading zeros do not inflate the digit count', () => {
  const v = unixOf('0001704067200');
  assert.equal(v.unit, 's');
  assert.equal(v.date.getTime(), NEW_YEAR_2024);
});

test('parseTimeInput: decimals are seconds', () => {
  const v = unixOf('1704067200.5');
  assert.equal(v.unit, 's');
  assert.equal(v.date.toISOString(), '2024-01-01T00:00:00.500Z');
  assert.equal(unixOf('-0.25').date.getTime(), -250);
});

test('parseTimeInput: surrounding whitespace is fine', () => {
  assert.equal(unixOf('  1704067200 \n').date.getTime(), NEW_YEAR_2024);
});

// --- garbage --------------------------------------------------------------

test('parseTimeInput: rejects garbage with a clear message', () => {
  assert.match(err(parseTimeInput('1704067200abc', NOW)), /Not a valid number/);
  assert.match(err(parseTimeInput('1.7e9', NOW)), /Not a valid number/);
  assert.match(err(parseTimeInput('1,704,067,200', NOW)), /Not a valid number/);
  assert.match(err(parseTimeInput('1.2.3', NOW)), /Not a valid number/);
  assert.match(err(parseTimeInput('', NOW)), /Enter a timestamp/);
  assert.match(err(parseTimeInput('   ', NOW)), /Enter a timestamp/);
  assert.match(err(parseTimeInput('yesterday-ish', NOW)), /Couldn't read that/);
  assert.match(err(parseTimeInput('123456789012345678901', NOW)), /Too many digits \(21\)/);
});

test('parseTimeInput: rejects impossible calendar dates', () => {
  assert.match(err(parseTimeInput('2026-02-30', NOW)), /Day 30/);
  assert.match(err(parseTimeInput('2026-13-01T00:00:00Z', NOW)), /Month 13/);
  assert.match(err(parseTimeInput('2026-01-01T25:00:00Z', NOW)), /Hour 25/);
  assert.equal(
    ok(parseTimeInput('2024-02-29T00:00:00Z', NOW)).date.toISOString(),
    '2024-02-29T00:00:00.000Z'
  );
});

// --- now / ISO / RFC 2822 -------------------------------------------------

test('parseTimeInput: "now" uses the given clock', () => {
  const v = ok(parseTimeInput('NOW', NOW));
  assert.equal(v.kind, 'now');
  assert.equal(v.date.getTime(), NOW.getTime());
});

test('parseTimeInput: ISO 8601 with Z and with offsets', () => {
  const z = ok(parseTimeInput('2024-01-01T00:00:00Z', NOW));
  assert.equal(z.kind, 'iso');
  assert.equal(z.date.getTime(), NEW_YEAR_2024);
  assert.equal(ok(parseTimeInput('2024-01-01T07:00:00+07:00', NOW)).date.getTime(), NEW_YEAR_2024);
  assert.equal(ok(parseTimeInput('2023-12-31T19:00:00-0500', NOW)).date.getTime(), NEW_YEAR_2024);
  assert.equal(ok(parseTimeInput('2024-01-01 05:30+05:30', NOW)).date.getTime(), NEW_YEAR_2024);
  assert.equal(
    ok(parseTimeInput('2024-01-01T00:00:00.123456Z', NOW)).date.toISOString(),
    '2024-01-01T00:00:00.123Z'
  );
  const off = ok(parseTimeInput('2024-01-01T07:00:00+07:00', NOW));
  assert.match(describeParse(off), /ISO 8601 date \(with offset\)/);
});

test('parseTimeInput: ISO without an offset is local time (intended zone dependency)', () => {
  const v = ok(parseTimeInput('2024-01-01T00:00:00', NOW));
  assert.equal(v.date.getTime(), new Date(2024, 0, 1, 0, 0, 0).getTime());
  assert.match(describeParse(v), /read as local time/);
  const dateOnly = ok(parseTimeInput('2024-01-01', NOW));
  assert.equal(dateOnly.date.getTime(), new Date(2024, 0, 1).getTime());
});

test('parseTimeInput: RFC 2822 / HTTP dates', () => {
  const http = ok(parseTimeInput('Mon, 01 Jan 2024 00:00:00 GMT', NOW));
  assert.equal(http.kind, 'rfc2822');
  assert.equal(http.date.getTime(), NEW_YEAR_2024);
  assert.equal(
    ok(parseTimeInput('Mon, 1 Jan 2024 07:00:00 +0700', NOW)).date.getTime(),
    NEW_YEAR_2024
  );
  assert.equal(ok(parseTimeInput('31 Dec 2023 19:00 EST', NOW)).date.getTime(), NEW_YEAR_2024);
  // toUTCString output round-trips
  const d = new Date('2027-03-04T05:06:07Z');
  assert.equal(ok(parseTimeInput(d.toUTCString(), NOW)).date.getTime(), d.getTime());
  assert.match(err(parseTimeInput('Tue, 01 Jan 2024 00:00:00 GMT', NOW)), /Monday/);
});

test('isNumericInput', () => {
  assert.equal(isNumericInput(' 123 '), true);
  assert.equal(isNumericInput('-1.5'), true);
  assert.equal(isNumericInput('1e9'), false);
  assert.equal(isNumericInput('2024-01-01'), false);
});

test('describeParse: names the detected unit and digit count', () => {
  assert.equal(describeParse(unixOf('1704067200000')), 'Detected: Unix milliseconds (13 digits)');
});

// --- formatting -----------------------------------------------------------

test('formatAll: UTC and a fixed zone (independent of the machine zone)', () => {
  const d = new Date('2026-01-01T00:00:00Z');
  const utc = formatAll(d, 'UTC', NOW);
  assert.equal(utc.unixSeconds, '1767225600');
  assert.equal(utc.unixMilliseconds, '1767225600000');
  assert.equal(utc.isoUtc, '2026-01-01T00:00:00.000Z');
  assert.equal(utc.isoOffset, '2026-01-01T00:00:00+00:00');
  assert.equal(utc.rfc2822, 'Thu, 01 Jan 2026 00:00:00 GMT');
  assert.equal(utc.dayOfWeek, 'Thursday');
  assert.equal(utc.isoWeek, '2026-W01');
  assert.equal(utc.dayOfYear, '1');
  assert.match(utc.humanUtc, /Thursday, January 1, 2026/);

  const jkt = formatAll(d, 'Asia/Jakarta', NOW);
  assert.equal(jkt.isoOffset, '2026-01-01T07:00:00+07:00');
  assert.match(jkt.human, /7:00:00 AM/);
  assert.match(jkt.human, /\(Asia\/Jakarta\)$/);
  assert.equal(jkt.isoUtc, utc.isoUtc);

  const ny = formatAll(d, 'America/New_York', NOW);
  assert.equal(ny.isoOffset, '2025-12-31T19:00:00-05:00');
  assert.equal(ny.dayOfWeek, 'Wednesday');
  assert.equal(ny.dayOfYear, '365');
  assert.equal(ny.isoWeek, '2026-W01'); // Wed 2025-12-31 belongs to ISO week 1 of 2026

  const india = formatAll(new Date('2026-01-01T00:00:00.250Z'), 'Asia/Kolkata', NOW);
  assert.equal(india.isoOffset, '2026-01-01T05:30:00.250+05:30');
});

test('formatAll: Unix seconds floor for negative fractional instants', () => {
  assert.equal(formatAll(new Date(-500), 'UTC', NOW).unixSeconds, '-1');
});

test('zoneOffsetMinutes follows DST', () => {
  assert.equal(zoneOffsetMinutes(new Date('2026-01-15T12:00:00Z'), 'Europe/Berlin'), 60);
  assert.equal(zoneOffsetMinutes(new Date('2026-07-15T12:00:00Z'), 'Europe/Berlin'), 120);
  assert.equal(zoneOffsetMinutes(new Date('2026-07-15T12:00:00Z'), 'UTC'), 0);
});

test('isoWeek: year-boundary edge cases', () => {
  assert.deepEqual(isoWeek(2027, 1, 1), { year: 2026, week: 53 }); // Friday
  assert.deepEqual(isoWeek(2027, 1, 3), { year: 2026, week: 53 }); // Sunday
  assert.deepEqual(isoWeek(2027, 1, 4), { year: 2027, week: 1 }); // Monday
  assert.deepEqual(isoWeek(2024, 12, 30), { year: 2025, week: 1 });
  assert.deepEqual(isoWeek(2021, 1, 3), { year: 2020, week: 53 });
  assert.deepEqual(isoWeek(2026, 6, 15), { year: 2026, week: 25 });
  assert.equal(formatAll(new Date('2027-01-01T12:00:00Z'), 'UTC', NOW).isoWeek, '2026-W53');
});

test('dayOfYear: leap years', () => {
  assert.equal(dayOfYear(2024, 12, 31), 366);
  assert.equal(dayOfYear(2026, 12, 31), 365);
  assert.equal(dayOfYear(2024, 3, 1), 61);
});

test('relativeTime: past, future, now', () => {
  const at = (ms: number) => new Date(NOW.getTime() + ms);
  assert.equal(relativeTime(at(0), NOW), 'now');
  assert.equal(relativeTime(at(-500), NOW), 'now');
  assert.equal(relativeTime(at(-30_000), NOW), '30 seconds ago');
  assert.equal(relativeTime(at(-3 * 3_600_000 - 59 * 60_000), NOW), '3 hours ago');
  assert.equal(relativeTime(at(2 * 86_400_000 + 5000), NOW), 'in 2 days');
  assert.equal(relativeTime(at(-1 * 86_400_000), NOW), '1 day ago');
  assert.equal(relativeTime(at(14 * 86_400_000), NOW), 'in 2 weeks');
  assert.equal(relativeTime(at(-400 * 86_400_000), NOW), '1 year ago');
  assert.equal(formatAll(at(-60_000), 'UTC', NOW).relative, '1 minute ago');
});

// --- datetime-local -------------------------------------------------------

test('datetime-local: UTC round-trip is exact and zone-independent', () => {
  const d = new Date('2026-01-01T07:08:09Z');
  assert.equal(toDateTimeLocal(d, 'utc'), '2026-01-01T07:08:09');
  assert.equal(fromDateTimeLocal('2026-01-01T07:08:09', 'utc')?.getTime(), d.getTime());
  assert.equal(
    fromDateTimeLocal('2026-01-01T07:08', 'utc')?.toISOString(),
    '2026-01-01T07:08:00.000Z'
  );
});

test('datetime-local: local round-trip uses the wall clock, not toISOString', () => {
  const d = new Date(2026, 0, 1, 7, 8, 9);
  assert.equal(toDateTimeLocal(d, 'local'), '2026-01-01T07:08:09');
  assert.equal(fromDateTimeLocal('2026-01-01T07:08:09', 'local')?.getTime(), d.getTime());
  const now = new Date(NOW.getTime());
  assert.equal(fromDateTimeLocal(toDateTimeLocal(now, 'local'), 'local')?.getTime(), now.getTime());
});

test('datetime-local: invalid values give null / empty', () => {
  assert.equal(fromDateTimeLocal('', 'local'), null);
  assert.equal(fromDateTimeLocal('2026-02-30T00:00', 'utc'), null);
  assert.equal(fromDateTimeLocal('2026-01-01', 'utc'), null);
  assert.equal(toDateTimeLocal(new Date(Date.UTC(10000, 0, 1)), 'utc'), '');
  assert.equal(toDateTimeLocal(new Date(NaN), 'utc'), '');
  const year5 = new Date(0);
  year5.setUTCFullYear(5, 0, 1);
  assert.equal(toDateTimeLocal(year5, 'utc'), '0005-01-01T00:00:00');
  assert.equal(fromDateTimeLocal('0005-01-01T00:00:00', 'utc')?.getTime(), year5.getTime());
});
