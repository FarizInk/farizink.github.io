// Pure helpers for the Tip Calculator / bill splitter (tested in tests/bill.test.ts).
// Money is always an integer count of minor units (sen, cents) so sums never drift.
// Self-contained: no relative imports (node --test runs this file directly).

export type CurrencyCode = 'IDR' | 'USD' | 'EUR' | 'SGD' | 'MYR';
export type TipBase = 'subtotal' | 'afterCharges';

export interface Currency {
  code: CurrencyCode;
  name: string;
  /** Short prefix for the bill field. */
  prefix: string;
  /** Locale used to format and parse amounts. */
  locale: string;
  /** Minor-unit digits (IDR has none). */
  decimals: number;
  /** What the tax is usually called, shown in the UI. */
  taxName: string;
  servicePresets: number[];
  taxPresets: number[];
  tipPresets: number[];
  defaults: { service: number; tax: number; tip: number; taxOnService: boolean; tipBase: TipBase };
  /** "Round each share up to" steps, in minor units. */
  roundSteps: number[];
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  IDR: {
    code: 'IDR',
    name: 'Indonesian rupiah',
    prefix: 'Rp',
    locale: 'id-ID',
    decimals: 0,
    taxName: 'PB1 / PPN',
    servicePresets: [0, 5, 10],
    taxPresets: [0, 10, 11],
    tipPresets: [0, 5, 10],
    defaults: { service: 0, tax: 0, tip: 0, taxOnService: true, tipBase: 'subtotal' },
    roundSteps: [500, 1000, 5000, 10000]
  },
  USD: {
    code: 'USD',
    name: 'US dollar',
    prefix: '$',
    locale: 'en-US',
    decimals: 2,
    taxName: 'Sales tax',
    servicePresets: [0, 5, 10],
    taxPresets: [0, 6, 8, 10],
    tipPresets: [0, 10, 15, 18, 20],
    defaults: { service: 0, tax: 0, tip: 15, taxOnService: false, tipBase: 'subtotal' },
    roundSteps: [10, 50, 100, 500]
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    prefix: '€',
    locale: 'de-DE',
    decimals: 2,
    taxName: 'VAT',
    servicePresets: [0, 5, 10],
    taxPresets: [0, 10, 19, 20],
    tipPresets: [0, 5, 10, 15],
    defaults: { service: 0, tax: 0, tip: 0, taxOnService: true, tipBase: 'subtotal' },
    roundSteps: [10, 50, 100, 500]
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore dollar',
    prefix: 'S$',
    locale: 'en-SG',
    decimals: 2,
    taxName: 'GST',
    servicePresets: [0, 10],
    taxPresets: [0, 9],
    tipPresets: [0, 5, 10],
    defaults: { service: 0, tax: 0, tip: 0, taxOnService: true, tipBase: 'subtotal' },
    roundSteps: [10, 50, 100, 500]
  },
  MYR: {
    code: 'MYR',
    name: 'Malaysian ringgit',
    prefix: 'RM',
    locale: 'ms-MY',
    decimals: 2,
    taxName: 'SST',
    servicePresets: [0, 10],
    taxPresets: [0, 6, 8],
    tipPresets: [0, 5, 10],
    defaults: { service: 0, tax: 0, tip: 0, taxOnService: true, tipBase: 'subtotal' },
    roundSteps: [5, 10, 50, 100]
  }
};

export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];
export const DEFAULT_CURRENCY: CurrencyCode = 'IDR';
/** Largest accepted amount in minor units (Rp10 trillion / $100 billion). */
export const MAX_MINOR = 1e13;
export const MAX_PEOPLE = 1000;

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && Object.hasOwn(CURRENCIES, value);
}

// ---------- Formatting ----------

const moneyFormats = new Map<string, Intl.NumberFormat>();

function moneyFormat(code: CurrencyCode): Intl.NumberFormat {
  let f = moneyFormats.get(code);
  if (!f) {
    const c = CURRENCIES[code];
    f = new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: c.decimals,
      maximumFractionDigits: c.decimals
    });
    moneyFormats.set(code, f);
  }
  return f;
}

/** Formats minor units as money: formatMoney(33334, "IDR") → "Rp 33.334", formatMoney(3333, "USD") → "$33.33". */
export function formatMoney(minor: number, code: CurrencyCode): string {
  return moneyFormat(code).format(minor / 10 ** CURRENCIES[code].decimals);
}

/** Formats minor units as a plain grouped number for an input field ("150.000" / "150,000.5"). */
export function formatPlain(minor: number, code: CurrencyCode): string {
  const c = CURRENCIES[code];
  return new Intl.NumberFormat(c.locale, { maximumFractionDigits: c.decimals }).format(minor / 10 ** c.decimals);
}

/** A percentage as people in that locale write it: 12.5 → "12,5" (id-ID). */
export function formatPctNumber(pct: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2, useGrouping: false }).format(pct);
}

/** Converts minor units between currencies with different decimals (rounding half up). */
export function rescaleMinor(minor: number, fromDecimals: number, toDecimals: number): number {
  if (toDecimals >= fromDecimals) return minor * 10 ** (toDecimals - fromDecimals);
  const div = 10 ** (fromDecimals - toDecimals);
  return Math.floor((minor + div / 2) / div);
}

// ---------- Parsing ----------

export type ParseResult = { ok: true; minor: number } | { ok: false; error: string };

export function separators(locale: string): { group: string; decimal: string } {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const group = parts.find((p) => p.type === 'group')?.value ?? ',';
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
  return { group: /\s/.test(group) ? ' ' : group, decimal };
}

const PREFIX_RE = /^(rp\.?|idr|usd|eur|sgd|myr|us\$|s\$|rm|\$|€)/i;
const SPACE_RE = /[\s\u00a0\u202f]/g;

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Parses an amount typed the local way and returns minor units.
 * id-ID: "150000", "150.000", "150.000,50", "12,5"; en-US: "150,000.50".
 * A lone separator followed by one or two digits is read as a decimal point either way
 * ("12.5" in id-ID → 12,5), since that can't be a thousands group.
 * Extra decimals beyond `decimals` are rounded half up.
 */
export function parseAmount(text: string, locale: string, decimals = 2): ParseResult {
  const { group, decimal } = separators(locale);
  const example = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals }).format(150000);
  const formatHint = `Type a number like ${example}.`;

  let s = text.trim().replace(SPACE_RE, '').replace(PREFIX_RE, '');
  if (!s) return { ok: false, error: 'Enter an amount.' };
  if (s.startsWith('-') || s.startsWith('−')) return { ok: false, error: "The amount can't be negative." };
  if (s.startsWith('+')) s = s.slice(1);

  const allowed = new RegExp(`^[\\d${escapeRe(group)}${escapeRe(decimal)}]+$`);
  if (!allowed.test(s) || !/\d/.test(s)) return { ok: false, error: `That isn't a number. ${formatHint}` };

  let intPart = s;
  let frac = '';
  const pieces = s.split(decimal);
  if (pieces.length > 2) {
    return { ok: false, error: `Use “${decimal}” only once, for decimals. ${formatHint}` };
  }
  if (pieces.length === 2) {
    [intPart, frac] = pieces;
    if (!/^\d*$/.test(frac)) return { ok: false, error: `Thousands go before “${decimal}”. ${formatHint}` };
  } else if (group !== ' ') {
    const g = s.split(group);
    if (g.length === 2 && /^\d{1,2}$/.test(g[1])) [intPart, frac] = g;
  }

  if (intPart.includes(group)) {
    const grouped = new RegExp(`^\\d{1,3}(${escapeRe(group)}\\d{3})+$`);
    if (!grouped.test(intPart)) return { ok: false, error: `Group thousands in threes. ${formatHint}` };
  }
  const digits = intPart.split(group).join('').replace(/^0+(?=\d)/, '') || '0';
  if (!/^\d+$/.test(digits)) return { ok: false, error: `That isn't a number. ${formatHint}` };
  if (digits.length > 15) return { ok: false, error: 'That amount is too large.' };

  const kept = frac.slice(0, decimals).padEnd(decimals, '0');
  const roundUp = frac.length > decimals && frac[decimals] >= '5' ? 1 : 0;
  const minor = Number(digits) * 10 ** decimals + (kept ? Number(kept) : 0) + roundUp;
  if (minor > MAX_MINOR) return { ok: false, error: 'That amount is too large.' };
  return { ok: true, minor };
}

/** Parses a percentage (0–100, up to 2 decimals) in the given locale. */
export function parsePercent(text: string, locale: string): { ok: true; pct: number } | { ok: false; error: string } {
  const trimmed = text.trim().replace(/%$/, '');
  if (!trimmed) return { ok: true, pct: 0 };
  const r = parseAmount(trimmed, locale, 2);
  if (!r.ok) return { ok: false, error: r.error.replace('amount', 'percentage') };
  if (r.minor > 10000) return { ok: false, error: 'Use a percentage from 0 to 100.' };
  return { ok: true, pct: r.minor / 100 };
}

// ---------- Calculation ----------

export interface BillInput {
  /** Bill before charges, in minor units. */
  subtotal: number;
  servicePct: number;
  taxPct: number;
  tipPct: number;
  /** Tax is charged on subtotal + service (usual for PB1 in Indonesia). */
  taxOnService: boolean;
  /** Tip on the subtotal only, or on subtotal + service + tax. */
  tipBase: TipBase;
  people: number;
  /** Round each share up to a multiple of this many minor units; 0 or absent = exact split. */
  rounding?: number;
}

export interface ShareGroup {
  amount: number;
  count: number;
}

export interface RoundedSplit {
  step: number;
  perPerson: number[];
  groups: ShareGroup[];
  total: number;
  /** How much more the table pays than the bill. */
  overpay: number;
}

export interface Bill {
  subtotal: number;
  service: number;
  tax: number;
  tip: number;
  total: number;
  people: number;
  /** Exact shares, largest first; they always sum to `total`. */
  perPerson: number[];
  groups: ShareGroup[];
  rounded: RoundedSplit | null;
}

export type BillResult = ({ ok: true } & Bill) | { ok: false; error: string };

/** pct% of an amount in minor units, rounded half up, exact for any safe integer. */
export function percentOf(minor: number, pct: number): number {
  const bp = BigInt(Math.round(pct * 100));
  return Number((BigInt(minor) * bp + BigInt(5000)) / BigInt(10000));
}

/** Splits `total` into `people` shares that sum exactly to it; the remainder goes one unit each to the first shares. */
export function splitEvenly(total: number, people: number): number[] {
  const base = Math.floor(total / people);
  const rest = total - base * people;
  return Array.from({ length: people }, (_, i) => base + (i < rest ? 1 : 0));
}

/** Groups equal neighbouring shares: [3334, 3333, 3333] → [{3334 × 1}, {3333 × 2}]. */
export function groupShares(shares: number[]): ShareGroup[] {
  const groups: ShareGroup[] = [];
  for (const amount of shares) {
    const last = groups[groups.length - 1];
    if (last && last.amount === amount) last.count++;
    else groups.push({ amount, count: 1 });
  }
  return groups;
}

function checkPct(name: string, pct: number): string | null {
  if (!Number.isFinite(pct) || pct < 0 || pct > 100) return `${name} must be between 0 and 100%.`;
  return null;
}

export function calculateBill(input: BillInput): BillResult {
  const { subtotal, people, taxOnService, tipBase } = input;
  const rounding = input.rounding ?? 0;
  if (!Number.isSafeInteger(subtotal) || subtotal < 0) return { ok: false, error: 'The bill must be a positive amount.' };
  if (subtotal > MAX_MINOR) return { ok: false, error: 'That amount is too large.' };
  if (typeof people !== 'number' || !Number.isInteger(people) || people < 1) {
    return { ok: false, error: 'Split between at least 1 person.' };
  }
  if (people > MAX_PEOPLE) return { ok: false, error: `Split between at most ${MAX_PEOPLE} people.` };
  if (!Number.isSafeInteger(rounding) || rounding < 0) return { ok: false, error: 'Invalid rounding step.' };
  const pctError =
    checkPct('Service', input.servicePct) ?? checkPct('Tax', input.taxPct) ?? checkPct('Tip', input.tipPct);
  if (pctError) return { ok: false, error: pctError };

  const service = percentOf(subtotal, input.servicePct);
  const tax = percentOf(subtotal + (taxOnService ? service : 0), input.taxPct);
  const tip = percentOf(tipBase === 'afterCharges' ? subtotal + service + tax : subtotal, input.tipPct);
  const total = subtotal + service + tax + tip;
  const perPerson = splitEvenly(total, people);

  let rounded: RoundedSplit | null = null;
  if (rounding > 0) {
    const shares = perPerson.map((s) => Math.ceil(s / rounding) * rounding);
    const roundedTotal = shares.reduce((a, b) => a + b, 0);
    rounded = { step: rounding, perPerson: shares, groups: groupShares(shares), total: roundedTotal, overpay: roundedTotal - total };
  }

  return { ok: true, subtotal, service, tax, tip, total, people, perPerson, groups: groupShares(perPerson), rounded };
}

/** "Rp 33.334" when everyone pays the same, else "2 × Rp 33.334 + 1 × Rp 33.333". */
export function describeShares(groups: ShareGroup[], code: CurrencyCode): string {
  if (groups.length === 1) return formatMoney(groups[0].amount, code);
  return groups.map((g) => `${g.count} × ${formatMoney(g.amount, code)}`).join(' + ');
}

/** Short plain-text summary for the clipboard. */
export function billSummary(
  bill: Bill,
  rates: { servicePct: number; taxPct: number; tipPct: number },
  code: CurrencyCode
): string {
  const c = CURRENCIES[code];
  const m = (v: number) => formatMoney(v, code);
  const p = (v: number) => `${formatPctNumber(v, c.locale)}%`;
  const lines = [`Bill: ${m(bill.subtotal)}`];
  if (bill.service) lines.push(`Service ${p(rates.servicePct)}: ${m(bill.service)}`);
  if (bill.tax) lines.push(`${c.taxName} ${p(rates.taxPct)}: ${m(bill.tax)}`);
  if (bill.tip) lines.push(`Tip ${p(rates.tipPct)}: ${m(bill.tip)}`);
  lines.push(`Total: ${m(bill.total)}`);
  if (bill.people > 1) {
    lines.push(`Split ${bill.people} ways: ${describeShares(bill.groups, code)}`);
  }
  if (bill.rounded && bill.rounded.overpay > 0) {
    lines.push(
      `Rounded up to ${m(bill.rounded.step)}: ${bill.people > 1 && bill.rounded.groups.length === 1 ? 'each pays ' : ''}${describeShares(bill.rounded.groups, code)} (${m(bill.rounded.overpay)} extra)`
    );
  }
  return lines.join('\n');
}
