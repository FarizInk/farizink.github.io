// Pure helpers for the Percentage Calculator (tested in tests/percent.test.ts).
// Every calculation returns { ok: true, value } or { ok: false, message } and never NaN/Infinity.
// Self-contained: no relative imports (node --test runs this file directly).

export type NumberLocale = 'id-ID' | 'en-US';

export const NUMBER_LOCALES: { value: NumberLocale; label: string }[] = [
  { value: 'id-ID', label: '1.250.000,5' },
  { value: 'en-US', label: '1,250,000.5' }
];

export const DEFAULT_LOCALE: NumberLocale = 'id-ID';

export function isNumberLocale(v: unknown): v is NumberLocale {
  return v === 'id-ID' || v === 'en-US';
}

export type Parsed = { ok: true; value: number } | { ok: false; empty: boolean; message: string };
export type Calc = { ok: true; value: number } | { ok: false; message: string };

export interface DiscountStep {
  percent: number;
  before: number;
  amount: number;
  after: number;
}
export type Stacked =
  | { ok: true; value: number; effective: number; saved: number; steps: DiscountStep[] }
  | { ok: false; message: string };

const MINUS = '\u2212';

/** Drop float noise (0.1 + 0.2 → 0.3) and turn −0 into 0. */
export function clean(n: number): number {
  const r = Number(n.toPrecision(12));
  return r === 0 ? 0 : r;
}

function done(n: number, message = 'The result is too large to show.'): Calc {
  return Number.isFinite(n) ? { ok: true, value: clean(n) } : { ok: false, message };
}

const GROUPED = /^\d{1,3}(?:G\d{3})+$/;

/**
 * Parse a number typed the way people write it in `locale`.
 * id-ID: "1.250.000", "12,5", "1.250.000,5"; en-US: "1,250,000.5".
 * A lone separator that is not followed by exactly three digits is read as the decimal mark,
 * so "12.5" still means 12.5 in id-ID and "12,5" means 12.5 in en-US.
 */
export function parseNumber(text: string, locale: NumberLocale): Parsed {
  let s = text.replace(/\s/g, '').replace(/%$/, '');
  if (s === '') return { ok: false, empty: true, message: 'Enter a number.' };
  let sign = 1;
  if (/^[-\u2212]/.test(s)) {
    sign = -1;
    s = s.slice(1);
  } else if (s.startsWith('+')) s = s.slice(1);

  const bad: Parsed = { ok: false, empty: false, message: `"${text.trim()}" is not a number.` };
  if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return bad;

  const group = locale === 'id-ID' ? '.' : ',';
  const decimal = locale === 'id-ID' ? ',' : '.';
  const groups = s.split(group).length - 1;
  const decimals = s.split(decimal).length - 1;

  let intPart: string;
  let fracPart = '';
  if (decimals > 1) return bad;
  if (decimals === 1) {
    [intPart, fracPart] = s.split(decimal);
  } else if (groups === 1 && !GROUPED.test(s.replace(group, 'G'))) {
    // Lone "other" separator not followed by 3 digits: treat it as the decimal mark.
    [intPart, fracPart] = s.split(group);
    if (intPart === '' && fracPart === '') return bad;
    const n = Number(`${intPart || '0'}.${fracPart || '0'}`);
    return Number.isFinite(n) ? { ok: true, value: clean(sign * n) } : bad;
  } else {
    intPart = s;
  }

  if (intPart.includes(group)) {
    if (!GROUPED.test(intPart.split(group).join('G'))) {
      return { ok: false, empty: false, message: `Check the separators in "${text.trim()}".` };
    }
    intPart = intPart.split(group).join('');
  }
  if (intPart === '' && fracPart === '') return bad;
  if (!/^\d*$/.test(intPart) || !/^\d*$/.test(fracPart)) return bad;
  const n = Number(`${intPart || '0'}.${fracPart || '0'}`);
  if (!Number.isFinite(n)) return { ok: false, empty: false, message: 'That number is too large.' };
  return { ok: true, value: clean(sign * n) };
}

/** "What is p% of x?" */
export function percentOf(p: number, x: number): Calc {
  return done((p * x) / 100);
}

/** "x is what % of y?" */
export function whatPercent(x: number, y: number): Calc {
  if (y === 0) return { ok: false, message: 'Percent of zero is undefined: the whole can’t be 0.' };
  return done((x / y) * 100);
}

/** Signed % change from `from` to `to`, measured against |from|. */
export function percentChange(from: number, to: number): Calc {
  if (from === 0) return { ok: false, message: 'Percentage change is undefined from zero.' };
  return done(((to - from) / Math.abs(from)) * 100);
}

export function applyIncrease(x: number, p: number): Calc {
  return done(x * (1 + p / 100));
}

export function applyDecrease(x: number, p: number): Calc {
  return done(x * (1 - p / 100));
}

/** "result is p% of what?" */
export function reversePercent(result: number, p: number): Calc {
  if (p === 0) return { ok: false, message: 'Nothing can be found from 0%: every number’s 0% is 0.' };
  return done((result * 100) / p);
}

/** Symmetric percentage difference: |a − b| relative to their average. Not a change. */
export function percentDifference(a: number, b: number): Calc {
  if (a === 0 && b === 0) return { ok: true, value: 0 };
  const mean = (a + b) / 2;
  if (mean === 0) return { ok: false, message: 'Percentage difference is undefined when the numbers cancel out (a = −b).' };
  return done((Math.abs(a - b) / Math.abs(mean)) * 100);
}

/** Apply discounts one after another (50% + 20% means 20% off the already-halved price). */
export function stackedDiscount(price: number, percents: number[]): Stacked {
  if (!Number.isFinite(price)) return { ok: false, message: 'Enter a price.' };
  if (price < 0) return { ok: false, message: 'The price can’t be negative.' };
  const steps: DiscountStep[] = [];
  let current = price;
  for (const p of percents) {
    if (!Number.isFinite(p) || p < 0 || p > 100) return { ok: false, message: 'Each discount must be between 0% and 100%.' };
    const amount = clean((current * p) / 100);
    const after = clean(current - amount);
    steps.push({ percent: p, before: current, amount, after });
    current = after;
  }
  const saved = clean(price - current);
  const effective = price === 0 ? clean((1 - percents.reduce((k, p) => k * (1 - p / 100), 1)) * 100) : clean((saved / price) * 100);
  return { ok: true, value: current, effective, saved, steps };
}

/** Locale-formatted number with grouping; trailing zeros trimmed. Tiny non-zero values keep 3 significant digits. */
export function formatNumber(value: number, locale: NumberLocale, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  const v = clean(value);
  if (v !== 0 && Math.abs(v) < 0.5 * 10 ** -maxDecimals) {
    return new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }).format(v);
  }
  if (v === 0) return '0';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: maxDecimals, useGrouping: true }).format(v);
}

/** "12,5%", or with `sign`: "+25%", "−20%" (real minus sign), "0%". */
export function formatPercent(value: number, locale: NumberLocale, opts: { sign?: boolean; maxDecimals?: number } = {}): string {
  const body = formatNumber(Math.abs(value), locale, opts.maxDecimals ?? 2);
  if (body === '—') return body;
  const zero = body === '0';
  const neg = value < 0 && !zero;
  const prefix = neg ? MINUS : opts.sign && !zero ? '+' : '';
  return `${prefix}${body}%`;
}

/** Like formatNumber but with a real minus sign, for display. */
export function displayNumber(value: number, locale: NumberLocale, maxDecimals = 2): string {
  return formatNumber(value, locale, maxDecimals).replace(/^-/, MINUS);
}
