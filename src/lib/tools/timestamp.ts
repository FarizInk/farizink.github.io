// Pure helpers for the Timestamp Converter tool (tested in tests/timestamp.test.ts).
// No DOM, no Svelte: everything that depends on "now" or a time zone takes it as an argument.

export type TimeUnit = 's' | 'ms' | 'us' | 'ns';
export type WallZone = 'local' | 'utc';

export const UNIT_NAMES: Record<TimeUnit, string> = {
  s: 'seconds',
  ms: 'milliseconds',
  us: 'microseconds',
  ns: 'nanoseconds'
};

export type ParsedTime =
  | { kind: 'unix'; date: Date; unit: TimeUnit; detectedUnit: TimeUnit; digits: number }
  | { kind: 'iso' | 'rfc2822'; date: Date; zone: 'utc' | 'offset' | 'local' }
  | { kind: 'now'; date: Date };

export type ParseResult = { ok: true; value: ParsedTime } | { ok: false; error: string };

/** Largest absolute epoch milliseconds a JS Date can hold. */
export const MAX_EPOCH_MS = 8.64e15;
const DAY_MS = 86_400_000;

const NUMBER_RE = /^-?\d+(\.\d+)?$/;
const ISO_RE =
  /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:[.,](\d+))?)?)?\s*(Z|[+-]\d{2}(?::?\d{2})?)?$/i;
const RFC2822_RE =
  /^(?:(mon|tue|wed|thu|fri|sat|sun),?\s+)?(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{4}|\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?(?:\s+(gmt|ut|utc|z|[+-]\d{4}|[ecmp][sd]t))?$/i;

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAMED_ZONES: Record<string, number> = {
  gmt: 0,
  ut: 0,
  utc: 0,
  z: 0,
  est: -300,
  edt: -240,
  cst: -360,
  cdt: -300,
  mst: -420,
  mdt: -360,
  pst: -480,
  pdt: -420
};

const FORMAT_HINT =
  'Try a Unix timestamp (1704067200), ISO 8601 (2024-01-01T00:00:00Z), RFC 2822 (Mon, 01 Jan 2024 00:00:00 GMT) or "now".';

// ---------------------------------------------------------------------------
// Small date utilities (year-safe: Date.UTC maps years 0–99 to 1900+)

function utcMs(y: number, m0: number, d: number, h = 0, mi = 0, s = 0, ms = 0): number {
  const dt = new Date(0);
  dt.setUTCFullYear(y, m0, d);
  dt.setUTCHours(h, mi, s, ms);
  return dt.getTime();
}

function localMs(y: number, m0: number, d: number, h = 0, mi = 0, s = 0, ms = 0): number {
  const dt = new Date(2000, 0, 1, 0, 0, 0, 0);
  dt.setFullYear(y, m0, d);
  dt.setHours(h, mi, s, ms);
  return dt.getTime();
}

function daysInMonth(y: number, m1: number): number {
  return new Date(utcMs(y, m1, 0)).getUTCDate();
}

function validFields(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  s: number
): string | null {
  if (mo < 1 || mo > 12) return `Month ${mo} doesn't exist (use 01–12).`;
  if (d < 1 || d > daysInMonth(y, mo)) return `Day ${d} doesn't exist in that month.`;
  if (h > 23) return `Hour ${h} is out of range (00–23).`;
  if (mi > 59) return `Minute ${mi} is out of range (00–59).`;
  if (s > 59) return `Second ${s} is out of range (00–59).`;
  return null;
}

function pad(n: number, len = 2): string {
  return String(Math.abs(n)).padStart(len, '0');
}

function padYear(y: number): string {
  if (y >= 0 && y <= 9999) return pad(y, 4);
  return (y < 0 ? '-' : '+') + pad(y, 6);
}

function inRange(ms: number): boolean {
  return Number.isFinite(ms) && Math.abs(ms) <= MAX_EPOCH_MS;
}

const OUT_OF_RANGE =
  'That date is outside the range JavaScript can represent (about ±275,000 years from 1970).';

// ---------------------------------------------------------------------------
// Parsing

/** True when the input is a plain number (the only inputs a unit override applies to). */
export function isNumericInput(input: string): boolean {
  return NUMBER_RE.test(input.trim());
}

/** Unit guessed from the count of significant digits; null when there are too many. */
export function detectUnit(digits: number): TimeUnit | null {
  if (digits <= 11) return 's';
  if (digits <= 14) return 'ms';
  if (digits <= 17) return 'us';
  if (digits <= 20) return 'ns';
  return null;
}

const BIG_DIVISOR: Record<TimeUnit, bigint> = { s: 1n, ms: 1n, us: 1000n, ns: 1_000_000n };
const MS_FACTOR: Record<TimeUnit, number> = { s: 1000, ms: 1, us: 1e-3, ns: 1e-6 };

function parseNumber(text: string, override: TimeUnit | 'auto'): ParseResult {
  const isDecimal = text.includes('.');
  const intPart = text.replace(/^-/, '').split('.')[0];
  const digits = intPart.replace(/^0+(?=\d)/, '').length;
  const detected = isDecimal ? 's' : detectUnit(digits);
  if (!detected && override === 'auto') {
    return {
      ok: false,
      error: `Too many digits (${digits}). Up to 20 digits (nanoseconds) are supported.`
    };
  }
  const detectedUnit: TimeUnit = detected ?? 'ns';
  const unit = override === 'auto' ? detectedUnit : override;

  let ms: number;
  if (isDecimal) {
    ms = Math.round(Number(text) * MS_FACTOR[unit]);
  } else {
    const n = BigInt(text);
    let q: bigint;
    if (unit === 's') q = n * 1000n;
    else {
      const div = BIG_DIVISOR[unit];
      q = n / div;
      if (n % div !== 0n && n < 0n) q -= 1n; // floor, so -1 µs is still before the epoch
    }
    const limit = BigInt(MAX_EPOCH_MS);
    if (q > limit || q < -limit) return { ok: false, error: OUT_OF_RANGE };
    ms = Number(q);
  }
  if (!inRange(ms)) return { ok: false, error: OUT_OF_RANGE };
  return { ok: true, value: { kind: 'unix', date: new Date(ms), unit, detectedUnit, digits } };
}

function parseOffset(raw: string): number | null {
  if (/^z$/i.test(raw)) return 0;
  const m = /^([+-])(\d{2}):?(\d{2})?$/.exec(raw);
  if (!m) return null;
  const h = Number(m[2]);
  const mi = Number(m[3] ?? '0');
  if (h > 23 || mi > 59) return null;
  return (m[1] === '-' ? -1 : 1) * (h * 60 + mi);
}

function parseIso(m: RegExpExecArray): ParseResult {
  const [, ys, mos, ds, hs, mis, ss, frac, off] = m;
  const y = Number(ys);
  const mo = Number(mos);
  const d = Number(ds);
  const h = Number(hs ?? '0');
  const mi = Number(mis ?? '0');
  const s = Number(ss ?? '0');
  const ms = frac ? Number(frac.slice(0, 3).padEnd(3, '0')) : 0;
  const bad = validFields(y, mo, d, h, mi, s);
  if (bad) return { ok: false, error: bad };

  let t: number;
  let zone: 'utc' | 'offset' | 'local';
  if (off) {
    const offMin = parseOffset(off);
    if (offMin === null)
      return { ok: false, error: `"${off}" is not a valid UTC offset (use Z, +07:00 or -0500).` };
    t = utcMs(y, mo - 1, d, h, mi, s, ms) - offMin * 60_000;
    zone = offMin === 0 ? 'utc' : 'offset';
  } else {
    t = localMs(y, mo - 1, d, h, mi, s, ms);
    zone = 'local';
  }
  if (!inRange(t)) return { ok: false, error: OUT_OF_RANGE };
  return { ok: true, value: { kind: 'iso', date: new Date(t), zone } };
}

function parseRfc2822(m: RegExpExecArray): ParseResult {
  const [, wd, ds, mon, ys, hs, mis, ss, zoneRaw] = m;
  let y = Number(ys);
  if (ys.length === 2) y += y < 50 ? 2000 : 1900;
  const mo = MONTHS.indexOf(mon.toLowerCase()) + 1;
  const d = Number(ds);
  const h = Number(hs);
  const mi = Number(mis);
  const s = Number(ss ?? '0');
  const bad = validFields(y, mo, d, h, mi, s);
  if (bad) return { ok: false, error: bad };

  if (wd) {
    const actual = WEEKDAYS[new Date(utcMs(y, mo - 1, d)).getUTCDay()];
    if (actual.slice(0, 3).toLowerCase() !== wd.toLowerCase()) {
      return {
        ok: false,
        error: `The weekday doesn't match: ${pad(d)} ${mon} ${y} is a ${actual}.`
      };
    }
  }

  let t: number;
  let zone: 'utc' | 'offset' | 'local';
  if (zoneRaw) {
    const key = zoneRaw.toLowerCase();
    const offMin = key in NAMED_ZONES ? NAMED_ZONES[key] : parseOffset(zoneRaw);
    if (offMin === null) return { ok: false, error: `"${zoneRaw}" is not a valid zone.` };
    t = utcMs(y, mo - 1, d, h, mi, s) - offMin * 60_000;
    zone = offMin === 0 ? 'utc' : 'offset';
  } else {
    t = localMs(y, mo - 1, d, h, mi, s);
    zone = 'local';
  }
  if (!inRange(t)) return { ok: false, error: OUT_OF_RANGE };
  return { ok: true, value: { kind: 'rfc2822', date: new Date(t), zone } };
}

/**
 * Parse anything a person might paste: Unix timestamps in s/ms/µs/ns (unit detected from
 * the digit count unless `unit` overrides it), decimal seconds, ISO 8601, RFC 2822 or "now".
 * Dates written without an offset are read as local time.
 */
export function parseTimeInput(
  input: string,
  now: Date = new Date(),
  unit: TimeUnit | 'auto' = 'auto'
): ParseResult {
  const text = input.trim();
  if (!text) return { ok: false, error: `Enter a timestamp or date. ${FORMAT_HINT}` };
  if (/^now$/i.test(text))
    return { ok: true, value: { kind: 'now', date: new Date(now.getTime()) } };
  if (NUMBER_RE.test(text)) return parseNumber(text, unit);
  if (/^[+-]?[\d.,\s]*(e[+-]?\d*)?$/i.test(text) || /^-?\d+[a-z]+$/i.test(text)) {
    return {
      ok: false,
      error:
        'Not a valid number. Use plain digits (optionally with "-" and one decimal point), no exponents or letters.'
    };
  }
  const iso = ISO_RE.exec(text);
  if (iso) return parseIso(iso);
  const rfc = RFC2822_RE.exec(text);
  if (rfc) return parseRfc2822(rfc);
  return { ok: false, error: `Couldn't read that. ${FORMAT_HINT}` };
}

/** One-line description of how the input was read, for the note under the field. */
export function describeParse(value: ParsedTime): string {
  switch (value.kind) {
    case 'now':
      return 'Detected: the current time';
    case 'unix': {
      const det = `${UNIT_NAMES[value.detectedUnit]} (${value.digits} digit${value.digits === 1 ? '' : 's'})`;
      return value.unit === value.detectedUnit
        ? `Detected: Unix ${det}`
        : `Reading as ${UNIT_NAMES[value.unit]} — auto-detect would pick ${det}`;
    }
    default: {
      const name = value.kind === 'iso' ? 'ISO 8601' : 'RFC 2822';
      const zone =
        value.zone === 'local'
          ? 'no offset, read as local time'
          : value.zone === 'utc'
            ? 'UTC'
            : 'with offset';
      return `Detected: ${name} date (${zone})`;
    }
  }
}

// ---------------------------------------------------------------------------
// Formatting

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const partsFormatters = new Map<string, Intl.DateTimeFormat>();

function zonedParts(date: Date, timeZone: string): ZonedParts {
  let f = partsFormatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      era: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    partsFormatters.set(timeZone, f);
  }
  const p: Record<string, string> = {};
  for (const part of f.formatToParts(date)) p[part.type] = part.value;
  const yearOfEra = Number(p.year);
  const year = p.era === 'BC' || p.era === 'B' ? 1 - yearOfEra : yearOfEra;
  return {
    year,
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour) % 24,
    minute: Number(p.minute),
    second: Number(p.second)
  };
}

/** Offset of `timeZone` from UTC at `date`, in minutes (Asia/Jakarta → 420). */
export function zoneOffsetMinutes(date: Date, timeZone: string): number {
  const p = zonedParts(date, timeZone);
  const wall = utcMs(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  const t = date.getTime();
  const wholeSecond = t - (((t % 1000) + 1000) % 1000);
  return Math.round((wall - wholeSecond) / 60_000);
}

/** ISO 8601 week of a calendar date: 2027-01-01 → { year: 2026, week: 53 }. */
export function isoWeek(year: number, month: number, day: number): { year: number; week: number } {
  const t = utcMs(year, month - 1, day);
  const dow = (new Date(t).getUTCDay() + 6) % 7; // Monday = 0
  const thursday = t + (3 - dow) * DAY_MS;
  const weekYear = new Date(thursday).getUTCFullYear();
  const week = 1 + Math.floor((thursday - utcMs(weekYear, 0, 1)) / DAY_MS / 7);
  return { year: weekYear, week };
}

/** Day of the year, 1-based (Dec 31 of a leap year → 366). */
export function dayOfYear(year: number, month: number, day: number): number {
  return 1 + Math.round((utcMs(year, month - 1, day) - utcMs(year, 0, 1)) / DAY_MS);
}

const REL_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * DAY_MS],
  ['month', 30 * DAY_MS],
  ['week', 7 * DAY_MS],
  ['day', DAY_MS],
  ['hour', 3_600_000],
  ['minute', 60_000],
  ['second', 1000]
];
const relFormat = new Intl.RelativeTimeFormat('en', { numeric: 'always' });

/** "3 hours ago" / "in 2 days" / "now" (whole units, truncated toward zero). */
export function relativeTime(date: Date, now: Date): string {
  const diff = date.getTime() - now.getTime();
  const abs = Math.abs(diff);
  if (abs < 1000) return 'now';
  for (const [unit, size] of REL_UNITS) {
    if (abs >= size) return relFormat.format(Math.trunc(diff / size), unit);
  }
  return 'now';
}

export interface FormattedTime {
  unixSeconds: string;
  unixMilliseconds: string;
  isoUtc: string;
  isoOffset: string;
  rfc2822: string;
  human: string;
  humanUtc: string;
  relative: string;
  dayOfWeek: string;
  isoWeek: string;
  dayOfYear: string;
}

const humanFormatters = new Map<string, Intl.DateTimeFormat>();
function humanFormat(date: Date, timeZone: string): string {
  let f = humanFormatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone, dateStyle: 'full', timeStyle: 'long' });
    humanFormatters.set(timeZone, f);
  }
  return f.format(date);
}

/**
 * Every representation of `date`. Calendar fields (offset ISO, human readable, weekday,
 * ISO week, day of year) are taken in `timeZone` (an IANA name such as "Asia/Jakarta" or "UTC").
 */
export function formatAll(date: Date, timeZone: string, now: Date = new Date()): FormattedTime {
  const t = date.getTime();
  const p = zonedParts(date, timeZone);
  const off = zoneOffsetMinutes(date, timeZone);
  const msPart = ((t % 1000) + 1000) % 1000;
  const sign = off < 0 ? '-' : '+';
  const isoOffset =
    `${padYear(p.year)}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}` +
    (msPart ? `.${pad(msPart, 3)}` : '') +
    `${sign}${pad(Math.floor(Math.abs(off) / 60))}:${pad(Math.abs(off) % 60)}`;
  const week = isoWeek(p.year, p.month, p.day);
  const human = humanFormat(date, timeZone);

  return {
    unixSeconds: String(Math.floor(t / 1000)),
    unixMilliseconds: String(t),
    isoUtc: date.toISOString(),
    isoOffset,
    rfc2822: date.toUTCString(),
    human: timeZone === 'UTC' ? human : `${human} (${timeZone})`,
    humanUtc: humanFormat(date, 'UTC'),
    relative: relativeTime(date, now),
    dayOfWeek: WEEKDAYS[new Date(utcMs(p.year, p.month - 1, p.day)).getUTCDay()],
    isoWeek: `${padYear(week.year)}-W${pad(week.week)}`,
    dayOfYear: String(dayOfYear(p.year, p.month, p.day))
  };
}

// ---------------------------------------------------------------------------
// <input type="datetime-local"> values

const DTL_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/;

/**
 * Date → "YYYY-MM-DDTHH:mm:ss" wall-clock value, read in local time or UTC.
 * Returns '' for years a datetime-local input can't show (outside 0000–9999).
 */
export function toDateTimeLocal(date: Date, zone: WallZone): string {
  if (!inRange(date.getTime())) return '';
  const u = zone === 'utc';
  const y = u ? date.getUTCFullYear() : date.getFullYear();
  if (y < 0 || y > 9999) return '';
  const mo = (u ? date.getUTCMonth() : date.getMonth()) + 1;
  const d = u ? date.getUTCDate() : date.getDate();
  const h = u ? date.getUTCHours() : date.getHours();
  const mi = u ? date.getUTCMinutes() : date.getMinutes();
  const s = u ? date.getUTCSeconds() : date.getSeconds();
  return `${pad(y, 4)}-${pad(mo)}-${pad(d)}T${pad(h)}:${pad(mi)}:${pad(s)}`;
}

/** "YYYY-MM-DDTHH:mm[:ss[.sss]]" read as local time or UTC → Date, or null when invalid. */
export function fromDateTimeLocal(value: string, zone: WallZone): Date | null {
  const m = DTL_RE.exec(value.trim());
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1, 6).map(Number);
  const s = Number(m[6] ?? '0');
  const ms = m[7] ? Number(m[7].padEnd(3, '0')) : 0;
  if (validFields(y, mo, d, h, mi, s)) return null;
  const t =
    zone === 'utc' ? utcMs(y, mo - 1, d, h, mi, s, ms) : localMs(y, mo - 1, d, h, mi, s, ms);
  return inRange(t) ? new Date(t) : null;
}
