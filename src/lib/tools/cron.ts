// Standard 5-field (Vixie) cron: parsing, next-run search and plain-English description.
// Pure module — no DOM, no imports — so it runs under `node --test` with type stripping.

export type CronFieldName = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';
export type CronTimeZone = 'local' | 'UTC';

export interface CronFieldSpec {
  name: CronFieldName;
  /** Human label used in errors and the UI ("day of month"). */
  label: string;
  min: number;
  max: number;
  /** Optional names accepted in place of numbers (index = value - nameOffset). */
  names?: readonly string[];
}

/** One comma-separated piece of a field: `*`, `a`, `a-b`, with optional `/step`. */
export interface CronItem {
  star: boolean;
  start: number;
  end: number;
  step: number;
  /** True when written as a single value (`5`, or `5/10` meaning 5-max/10). */
  single: boolean;
}

export interface CronField {
  spec: CronFieldSpec;
  /** Source text of the field (after macro expansion). */
  text: string;
  items: CronItem[];
  values: Set<number>;
}

export interface ParsedCron {
  /** Normalised expression: the five fields joined by single spaces. */
  expression: string;
  /** Macro the expression was written as (e.g. "@daily"), if any. */
  macro?: string;
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
  /** Vixie rule: a day field is restricted unless it starts with `*`. */
  domRestricted: boolean;
  dowRestricted: boolean;
}

export interface CronError {
  /** The offending field, or 'expression' for whole-expression problems. */
  field: CronFieldName | 'expression';
  /** 0-based field index, -1 for 'expression'. */
  index: number;
  /** Problem without the field prefix, e.g. "25 is out of range 0–23". */
  reason: string;
  /** Full message, e.g. "hour: 25 is out of range 0–23". */
  message: string;
}

export type CronParseResult = { ok: true; cron: ParsedCron } | { ok: false; error: CronError };

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const;
export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
] as const;

const MONTH_ABBR = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
] as const;
const WEEKDAY_ABBR = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export const CRON_FIELDS: readonly CronFieldSpec[] = [
  { name: 'minute', label: 'minute', min: 0, max: 59 },
  { name: 'hour', label: 'hour', min: 0, max: 23 },
  { name: 'dayOfMonth', label: 'day of month', min: 1, max: 31 },
  { name: 'month', label: 'month', min: 1, max: 12, names: MONTH_ABBR },
  { name: 'dayOfWeek', label: 'day of week', min: 0, max: 7, names: WEEKDAY_ABBR }
];

export const CRON_MACROS: Readonly<Record<string, string>> = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@midnight': '0 0 * * *',
  '@hourly': '0 * * * *'
};

class FieldError extends Error {}

function fieldError(spec: CronFieldSpec, index: number, reason: string): CronError {
  return { field: spec.name, index, reason, message: `${spec.label}: ${reason}` };
}

function exprError(reason: string): CronError {
  return { field: 'expression', index: -1, reason, message: reason };
}

function parseValue(raw: string, spec: CronFieldSpec): number {
  if (raw === '') throw new FieldError('a value is missing');
  if (/^\d+$/.test(raw)) {
    const n = Number(raw);
    if (n < spec.min || n > spec.max)
      throw new FieldError(`${n} is out of range ${spec.min}–${spec.max}`);
    return n;
  }
  if (spec.names) {
    const i = spec.names.indexOf(raw.toUpperCase());
    if (i >= 0) return spec.name === 'month' ? i + 1 : i;
    const kind = spec.name === 'month' ? 'month name (JAN–DEC)' : 'weekday name (SUN–SAT)';
    throw new FieldError(`"${raw}" is not a number or ${kind}`);
  }
  throw new FieldError(`"${raw}" is not a number`);
}

function parseItem(raw: string, spec: CronFieldSpec): CronItem {
  if (raw === '') throw new FieldError('empty list entry (check the commas)');
  const parts = raw.split('/');
  if (parts.length > 2) throw new FieldError(`"${raw}" has more than one "/"`);
  const [base, stepRaw] = parts;
  let step = 1;
  if (stepRaw !== undefined) {
    if (!/^\d+$/.test(stepRaw))
      throw new FieldError(`step "${stepRaw}" in "${raw}" is not a number`);
    step = Number(stepRaw);
    if (step < 1) throw new FieldError(`step in "${raw}" must be at least 1`);
  }
  // `*` for day of week covers 0–6 (7 is only an alias of Sunday).
  const top = spec.name === 'dayOfWeek' ? 6 : spec.max;
  if (base === '*') return { star: true, start: spec.min, end: top, step, single: false };

  const range = base.split('-');
  if (range.length > 2) throw new FieldError(`"${base}" is not a valid range`);
  const start = parseValue(range[0], spec);
  if (range.length === 2) {
    const end = parseValue(range[1], spec);
    if (end < start) throw new FieldError(`range ${range[0]}-${range[1]} goes backwards`);
    return { star: false, start, end, step, single: false };
  }
  // `a/n` means a-max/n (cronie); a plain `a` is a single value.
  return { star: false, start, end: stepRaw !== undefined ? top : start, step, single: true };
}

function parseField(text: string, spec: CronFieldSpec): CronField {
  const items = text.split(',').map(raw => parseItem(raw, spec));
  const values = new Set<number>();
  for (const it of items) {
    for (let v = it.start; v <= it.end; v += it.step)
      values.add(spec.name === 'dayOfWeek' && v === 7 ? 0 : v);
  }
  return { spec, text, items, values };
}

/** Parse a 5-field cron expression or macro. Never throws. */
export function parseCron(input: string): CronParseResult {
  const trimmed = input.trim();
  if (trimmed === '') return { ok: false, error: exprError('Enter a cron expression') };

  let macro: string | undefined;
  let source = trimmed;
  if (trimmed.startsWith('@')) {
    const key = trimmed.toLowerCase();
    if (key === '@reboot')
      return { ok: false, error: exprError('@reboot runs at startup, not on a schedule') };
    if (!(key in CRON_MACROS)) {
      return {
        ok: false,
        error: exprError(
          `Unknown macro ${trimmed} (use @yearly, @monthly, @weekly, @daily or @hourly)`
        )
      };
    }
    macro = key;
    source = CRON_MACROS[key];
  }

  const parts = source.split(/\s+/);
  if (parts.length !== 5) {
    return {
      ok: false,
      error: exprError(`Expected 5 fields (minute hour day month weekday), got ${parts.length}`)
    };
  }

  const fields: CronField[] = [];
  for (let i = 0; i < 5; i++) {
    const spec = CRON_FIELDS[i];
    try {
      fields.push(parseField(parts[i], spec));
    } catch (e) {
      if (e instanceof FieldError) return { ok: false, error: fieldError(spec, i, e.message) };
      throw e;
    }
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = fields;
  return {
    ok: true,
    cron: {
      expression: parts.join(' '),
      macro,
      minute,
      hour,
      dayOfMonth,
      month,
      dayOfWeek,
      domRestricted: !parts[2].startsWith('*'),
      dowRestricted: !parts[4].startsWith('*')
    }
  };
}

// ---------------------------------------------------------------- next runs

export interface NextRunsResult {
  runs: Date[];
  /** The schedule can never fire (e.g. `0 0 31 2 *`). */
  impossible: boolean;
  /** Fewer than `count` runs were found inside the search window. */
  limitReached: boolean;
}

/** How far ahead nextRuns searches. */
export const SEARCH_YEARS = 5;

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function weekday(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function dayMatches(cron: ParsedCron, year: number, month: number, day: number): boolean {
  const dom = cron.dayOfMonth.values.has(day);
  const dow = cron.dayOfWeek.values.has(weekday(year, month, day));
  return cron.domRestricted && cron.dowRestricted ? dom || dow : dom && dow;
}

/** True when no calendar day can ever match (day-of-month never fits the allowed months). */
export function isImpossible(cron: ParsedCron): boolean {
  if (cron.domRestricted && cron.dowRestricted) return false; // OR rule: any weekday will do
  const maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (const m of cron.month.values) {
    for (const d of cron.dayOfMonth.values) if (d <= maxDays[m - 1]) return false;
  }
  return true;
}

function sorted(set: Set<number>): number[] {
  return [...set].sort((a, b) => a - b);
}

/** Smallest value in `list` that is >= v, or undefined. */
function nextIn(list: number[], v: number): number | undefined {
  for (const x of list) if (x >= v) return x;
  return undefined;
}

function partsOf(date: Date, tz: CronTimeZone) {
  return tz === 'UTC'
    ? {
        y: date.getUTCFullYear(),
        mo: date.getUTCMonth() + 1,
        d: date.getUTCDate(),
        h: date.getUTCHours(),
        mi: date.getUTCMinutes()
      }
    : {
        y: date.getFullYear(),
        mo: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        mi: date.getMinutes()
      };
}

function build(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  tz: CronTimeZone
): Date | null {
  if (tz === 'UTC') return new Date(Date.UTC(y, mo - 1, d, h, mi));
  const date = new Date(y, mo - 1, d, h, mi);
  // Local times skipped by a DST jump don't exist; cron doesn't fire them here.
  if (date.getHours() !== h || date.getMinutes() !== mi || date.getDate() !== d) return null;
  return date;
}

/**
 * The next `count` times (strictly after `from`) the schedule fires, searching up to
 * SEARCH_YEARS ahead. Jumps month → day → hour → minute instead of scanning minutes.
 */
export function nextRuns(
  cron: ParsedCron,
  from: Date,
  count: number,
  timeZone: CronTimeZone = 'local'
): NextRunsResult {
  if (isImpossible(cron)) return { runs: [], impossible: true, limitReached: true };

  const months = sorted(cron.month.values);
  const hours = sorted(cron.hour.values);
  const minutes = sorted(cron.minute.values);
  const runs: Date[] = [];

  // Start at the next whole minute.
  const start = new Date(Math.floor(from.getTime() / 60000) * 60000 + 60000);
  let { y, mo, d, h, mi } = partsOf(start, timeZone);
  const lastYear = y + SEARCH_YEARS;

  const nextMonth = () => {
    const m = nextIn(months, mo + 1);
    if (m === undefined) {
      y++;
      mo = months[0];
    } else mo = m;
    d = 1;
    h = 0;
    mi = 0;
  };

  while (runs.length < count && y <= lastYear) {
    if (!cron.month.values.has(mo)) {
      const m = nextIn(months, mo);
      if (m === undefined) {
        y++;
        mo = months[0];
      } else mo = m;
      d = 1;
      h = 0;
      mi = 0;
      continue;
    }
    if (d > daysInMonth(y, mo)) {
      nextMonth();
      continue;
    }
    if (!dayMatches(cron, y, mo, d)) {
      d++;
      h = 0;
      mi = 0;
      continue;
    }
    const hh = nextIn(hours, h);
    if (hh === undefined) {
      d++;
      h = 0;
      mi = 0;
      continue;
    }
    if (hh !== h) {
      h = hh;
      mi = 0;
    }
    const mm = nextIn(minutes, mi);
    if (mm === undefined) {
      h++;
      mi = 0;
      continue;
    }
    mi = mm;
    const date = build(y, mo, d, h, mi, timeZone);
    if (date && date.getTime() > from.getTime()) runs.push(date);
    mi++;
  }

  return { runs, impossible: false, limitReached: runs.length < count };
}

// ---------------------------------------------------------------- description

const pad = (n: number) => String(n).padStart(2, '0');

function joinList(xs: string[]): string {
  if (xs.length <= 1) return xs.join('');
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
}

function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][n % 10] ?? 'th');
  return `${n}${s}`;
}

const isAll = (f: CronField) => f.items.length === 1 && f.items[0].star && f.items[0].step === 1;
const isStarStep = (f: CronField) => f.items.length === 1 && f.items[0].star && f.items[0].step > 1;
const isPlainSingles = (f: CronField) => f.items.every(it => it.single && it.step === 1);
const isOnlyZero = (f: CronField) => isPlainSingles(f) && f.values.size === 1 && f.values.has(0);

/** Describe one field's items with a value formatter and a unit for steps ("minutes"). */
function describeItems(f: CronField, fmt: (n: number) => string, unit: string): string {
  return joinList(
    f.items.map(it => {
      if (it.star)
        return it.step === 1 ? `every ${unit.replace(/s$/, '')}` : `every ${it.step} ${unit}`;
      if (it.single && it.step === 1) return fmt(it.start);
      if (it.step === 1) return `${fmt(it.start)} through ${fmt(it.end)}`;
      if (it.single) return `every ${it.step} ${unit} from ${fmt(it.start)}`;
      return `every ${it.step} ${unit} from ${fmt(it.start)} through ${fmt(it.end)}`;
    })
  );
}

const fmtMonth = (n: number) => MONTH_NAMES[n - 1];
const fmtWeekday = (n: number) => WEEKDAY_NAMES[n % 7];

function timePhrase(c: ParsedCron): string {
  const { minute, hour } = c;
  // Fixed times: "At 09:00 and 17:30".
  if (
    isPlainSingles(minute) &&
    isPlainSingles(hour) &&
    minute.values.size * hour.values.size <= 6
  ) {
    const times: string[] = [];
    for (const h of sorted(hour.values))
      for (const m of sorted(minute.values)) times.push(`${pad(h)}:${pad(m)}`);
    return `At ${joinList(times)}`;
  }

  let minutePart: string;
  if (isAll(minute)) minutePart = 'Every minute';
  else if (isStarStep(minute)) minutePart = `Every ${minute.items[0].step} minutes`;
  else if (isAll(hour) && isOnlyZero(minute)) return 'Every hour';
  else if (isStarStep(hour) && isOnlyZero(minute)) return `Every ${hour.items[0].step} hours`;
  else {
    const many = minute.values.size > 1;
    minutePart = `At minute${many ? 's' : ''} ${describeItems(minute, String, 'minutes')}`;
  }

  if (isAll(hour))
    return minutePart.startsWith('At') ? `${minutePart} past every hour` : minutePart;
  if (isStarStep(hour)) {
    return `${minutePart} ${minutePart.startsWith('At') ? 'past' : 'of'} every ${ordinal(hour.items[0].step)} hour`;
  }
  if (hour.items.length === 1 && !hour.items[0].star && hour.items[0].step === 1) {
    const it = hour.items[0];
    return `${minutePart}, between ${pad(it.start)}:00 and ${pad(it.end)}:59`;
  }
  const many = hour.values.size > 1;
  return `${minutePart}, during hour${many ? 's' : ''} ${describeItems(hour, pad, 'hours')}`;
}

function domPhrase(f: CronField): string {
  if (isStarStep(f)) return `every ${ordinal(f.items[0].step)} day of the month`;
  const many = f.values.size > 1;
  return `day${many ? 's' : ''} ${describeItems(f, String, 'days')} of the month`;
}

function dowPhrase(f: CronField): string {
  if (isStarStep(f)) return `every ${ordinal(f.items[0].step)} day of the week`;
  return describeItems(f, fmtWeekday, 'days');
}

/** Plain-English description, e.g. "At 09:00, Monday through Friday". */
export function describeCron(c: ParsedCron): string {
  let s = timePhrase(c);
  const dom = !isAll(c.dayOfMonth);
  const dow = !isAll(c.dayOfWeek);
  const dowIsRange =
    c.dayOfWeek.items.length === 1 && !c.dayOfWeek.items[0].single && !c.dayOfWeek.items[0].star;

  if (dom && dow && c.domRestricted && c.dowRestricted) {
    s += ` on ${domPhrase(c.dayOfMonth)} or on ${dowPhrase(c.dayOfWeek)}`;
  } else {
    if (dom) s += ` on ${domPhrase(c.dayOfMonth)}`;
    if (dow)
      s +=
        dowIsRange && !dom
          ? `, ${dowPhrase(c.dayOfWeek)}`
          : ` ${dom ? 'and' : 'on'} ${dowPhrase(c.dayOfWeek)}`;
  }

  if (!isAll(c.month)) {
    s += isStarStep(c.month)
      ? `, every ${ordinal(c.month.items[0].step)} month`
      : `, in ${describeItems(c.month, fmtMonth, 'months')}`;
  }

  if (dom && dow && c.domRestricted && c.dowRestricted) {
    s += ' (runs when either the day of month or the weekday matches)';
  }
  return s;
}

// ---------------------------------------------------------------- display helpers

/** Short summary of a field's expanded values for the breakdown ("0, 15, 30, 45", "every"). */
export function summarizeField(f: CronField): string {
  const { spec } = f;
  if (isAll(f)) return 'every value';
  const vals = sorted(f.values);
  const fmt =
    spec.name === 'month'
      ? (n: number) => MONTH_NAMES[n - 1].slice(0, 3)
      : spec.name === 'dayOfWeek'
        ? (n: number) => WEEKDAY_NAMES[n].slice(0, 3)
        : String;
  if (vals.length <= 8) return vals.map(fmt).join(', ');
  return `${vals.length} values: ${vals.slice(0, 4).map(fmt).join(', ')} … ${fmt(vals[vals.length - 1])}`;
}

/** Relative time from `now` to `date`, e.g. "in 3 h", "in 45 min", "in 2 d". */
export function relativeFromNow(date: Date, now: Date): string {
  const mins = Math.max(0, Math.round((date.getTime() - now.getTime()) / 60000));
  if (mins < 1) return 'in under a minute';
  if (mins < 60) return `in ${mins} min`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `in ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 60) return `in ${days} d`;
  const months = Math.round(days / 30.44);
  if (months < 24) return `in ${months} mo`;
  return `in ${Math.round(days / 365.25)} y`;
}
