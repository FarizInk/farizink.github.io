// Age calculator logic. Works on plain calendar dates ({ y, m, d }, m = 1–12) so results never
// depend on the viewer's time zone: no `new Date('YYYY-MM-DD')` (that is UTC midnight) and no
// `toISOString()` (that converts to UTC). Self-contained so `node --test` can import it directly.
//
// Leap-day convention: someone born on Feb 29 has their birthday on Feb 28 in common years, and
// adding whole months/years clamps to the end of the month (Jan 31 + 1 month = Feb 28/29). So a
// Feb 29 baby turns 1 on Feb 28 of the next year.

export interface CalendarDate {
  y: number;
  m: number;
  d: number;
}

export interface Age {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalDays: number;
  totalWeeks: number;
  /** Days left over after whole weeks (0–6). */
  weekRemainderDays: number;
  /** totalDays × 24 — calendar hours, ignoring the time of day and DST. */
  approxHours: number;
}

export interface NextBirthday {
  date: CalendarDate;
  daysUntil: number;
  turning: number;
  weekday: string;
  /** True when a Feb 29 birthday falls on Feb 28 because that year is not a leap year. */
  shiftedFromLeapDay: boolean;
}

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function daysInMonth(y: number, m: number): number {
  return [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
}

/** Parses the value of an `<input type="date">` ('YYYY-MM-DD'). Returns null for anything invalid. */
export function parseDateInput(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (y < 1 || m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

export function formatDateInput(date: CalendarDate): string {
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(date.y, 4)}-${pad(date.m)}-${pad(date.d)}`;
}

/** Today's calendar date in the viewer's local time zone. */
export function todayLocal(now: Date = new Date()): CalendarDate {
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

/** Days since 1970-01-01 (proleptic Gregorian, UTC arithmetic — independent of local time zone). */
export function dayNumber(date: CalendarDate): number {
  const t = new Date(0);
  t.setUTCFullYear(date.y, date.m - 1, date.d); // setUTCFullYear keeps years 0–99 literal
  return Math.round(t.getTime() / 86_400_000);
}

export function compareDates(a: CalendarDate, b: CalendarDate): number {
  return a.y - b.y || a.m - b.m || a.d - b.d;
}

/** Adds whole months, clamping the day to the end of the resulting month. */
export function addMonths(date: CalendarDate, months: number): CalendarDate {
  const index = date.y * 12 + (date.m - 1) + months;
  const y = Math.floor(index / 12);
  const m = index - y * 12 + 1;
  return { y, m, d: Math.min(date.d, daysInMonth(y, m)) };
}

export function weekdayOf(date: CalendarDate): string {
  // 1970-01-01 was a Thursday (index 4).
  return WEEKDAYS[(((dayNumber(date) + 4) % 7) + 7) % 7];
}

/** "Wednesday, 11 November 2026" */
export function formatDateLong(date: CalendarDate): string {
  return `${weekdayOf(date)}, ${date.d} ${MONTHS[date.m - 1]} ${date.y}`;
}

/**
 * Age on `target`: add whole years, then whole months, to the birth date (clamping to month end),
 * then count the remaining days. All parts are ≥ 0. Returns null when target is before birth.
 */
export function ageBetween(birth: CalendarDate, target: CalendarDate): Age | null {
  if (compareDates(target, birth) < 0) return null;

  let totalMonths = (target.y - birth.y) * 12 + (target.m - birth.m);
  if (compareDates(addMonths(birth, totalMonths), target) > 0) totalMonths--;
  const anchor = addMonths(birth, totalMonths);

  const totalDays = dayNumber(target) - dayNumber(birth);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: dayNumber(target) - dayNumber(anchor),
    totalMonths,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    weekRemainderDays: totalDays % 7,
    approxHours: totalDays * 24
  };
}

/** The birthday in year `y` (Feb 29 → Feb 28 in common years). */
export function birthdayInYear(birth: CalendarDate, y: number): CalendarDate {
  return { y, m: birth.m, d: Math.min(birth.d, daysInMonth(y, birth.m)) };
}

/** First birthday on or after `today` (never the birth day itself). */
export function nextBirthday(birth: CalendarDate, today: CalendarDate): NextBirthday {
  let y = Math.max(today.y, birth.y + 1);
  let date = birthdayInYear(birth, y);
  if (compareDates(date, today) < 0) date = birthdayInYear(birth, ++y);
  return {
    date,
    daysUntil: dayNumber(date) - dayNumber(today),
    turning: y - birth.y,
    weekday: weekdayOf(date),
    shiftedFromLeapDay: date.d !== birth.d
  };
}

export type AgeResult =
  | { ok: true; birth: CalendarDate; target: CalendarDate; age: Age; next: NextBirthday }
  | { ok: false; field: 'birth' | 'target'; error: string };

/** Validates both inputs and computes everything the UI shows. `today` is the viewer's local date. */
export function calculateAge(birthInput: string, targetInput: string, today: CalendarDate): AgeResult | null {
  const birth = parseDateInput(birthInput);
  if (!birthInput.trim()) return null;
  if (!birth) return { ok: false, field: 'birth', error: 'Enter a valid date of birth.' };
  if (compareDates(birth, today) > 0) {
    return { ok: false, field: 'birth', error: 'Date of birth can’t be in the future.' };
  }
  const target = parseDateInput(targetInput);
  if (!target) return { ok: false, field: 'target', error: 'Enter a valid date.' };
  const age = ageBetween(birth, target);
  if (!age) return { ok: false, field: 'target', error: 'This date is before the date of birth.' };
  return { ok: true, birth, target, age, next: nextBirthday(birth, target) };
}

export function plural(n: number, word: string): string {
  return `${n.toLocaleString('en-US')} ${word}${n === 1 ? '' : 's'}`;
}

export function formatAge(age: Age): string {
  return `${plural(age.years, 'year')}, ${plural(age.months, 'month')}, ${plural(age.days, 'day')}`;
}

/** One-line summary for the clipboard. */
export function ageSummary(birth: CalendarDate, target: CalendarDate, age: Age): string {
  return `Born ${formatDateInput(birth)}: ${formatAge(age)} old on ${formatDateInput(target)} (${plural(age.totalDays, 'day')}).`;
}
