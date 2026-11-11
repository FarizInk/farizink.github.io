// Pure helpers for the Unit Converter (tested in tests/units.test.ts).
// Every unit is defined by its exact "base units per unit" factor from the official
// definition (e.g. 1 in = 0.0254 m, 1 lb = 0.45359237 kg). Conversion runs on exact
// decimal fractions (BigInt), so 1 ft is exactly 12 in and 1 mi exactly 1609.344 m;
// only the final result is rounded to the nearest double.
// Self-contained: no relative imports (node --test runs this file directly).

export type CategoryId =
  | 'length'
  | 'mass'
  | 'volume'
  | 'area'
  | 'temperature'
  | 'speed'
  | 'time'
  | 'data'
  | 'pressure'
  | 'energy';

export interface Unit {
  key: string;
  name: string;
  symbol: string;
  /** Base units per 1 unit, as an exact decimal or "a/b" fraction. Unused for temperature. */
  factor: string;
  /** Short clarification shown next to the name (e.g. "1000 B", "average"). */
  hint?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** Unit key of the base unit. */
  base: string;
  units: Unit[];
  /** Default [from, to] unit keys. */
  defaults: [string, string];
}

const u = (key: string, name: string, symbol: string, factor = '1', hint?: string): Unit =>
  hint ? { key, name, symbol, factor, hint } : { key, name, symbol, factor };

export const CATEGORIES: Category[] = [
  {
    id: 'length',
    name: 'Length',
    base: 'm',
    defaults: ['m', 'ft'],
    units: [
      u('mm', 'Millimetre', 'mm', '0.001'),
      u('cm', 'Centimetre', 'cm', '0.01'),
      u('m', 'Metre', 'm', '1'),
      u('km', 'Kilometre', 'km', '1000'),
      u('in', 'Inch', 'in', '0.0254'),
      u('ft', 'Foot', 'ft', '0.3048'),
      u('yd', 'Yard', 'yd', '0.9144'),
      u('mi', 'Mile', 'mi', '1609.344'),
      u('nmi', 'Nautical mile', 'nmi', '1852')
    ]
  },
  {
    id: 'mass',
    name: 'Mass',
    base: 'kg',
    defaults: ['kg', 'lb'],
    units: [
      u('mg', 'Milligram', 'mg', '0.000001'),
      u('g', 'Gram', 'g', '0.001'),
      u('ons', 'Ons', 'ons', '0.1', '100 g, Indonesian'),
      u('kg', 'Kilogram', 'kg', '1'),
      u('kuintal', 'Kuintal', 'kuintal', '100', '100 kg'),
      u('t', 'Tonne', 't', '1000'),
      u('oz', 'Ounce', 'oz', '0.028349523125'),
      u('lb', 'Pound', 'lb', '0.45359237'),
      u('st', 'Stone', 'st', '6.35029318')
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    base: 'L',
    defaults: ['L', 'us_gal'],
    units: [
      u('mL', 'Millilitre', 'mL', '0.001'),
      u('L', 'Litre', 'L', '1'),
      u('m3', 'Cubic metre', 'm³', '1000'),
      u('us_gal', 'US gallon', 'US gal', '3.785411784'),
      u('us_qt', 'US quart', 'US qt', '0.946352946'),
      u('us_pt', 'US pint', 'US pt', '0.473176473'),
      u('us_cup', 'US cup', 'US cup', '0.2365882365'),
      u('us_floz', 'US fluid ounce', 'US fl oz', '0.0295735295625'),
      u('us_tbsp', 'US tablespoon', 'US tbsp', '0.01478676478125'),
      u('us_tsp', 'US teaspoon', 'US tsp', '0.00492892159375'),
      u('uk_gal', 'UK gallon', 'UK gal', '4.54609', 'imperial'),
      u('uk_pt', 'UK pint', 'UK pt', '0.56826125', 'imperial'),
      u('uk_floz', 'UK fluid ounce', 'UK fl oz', '0.0284130625', 'imperial')
    ]
  },
  {
    id: 'area',
    name: 'Area',
    base: 'm2',
    defaults: ['m2', 'ft2'],
    units: [
      u('cm2', 'Square centimetre', 'cm²', '0.0001'),
      u('m2', 'Square metre', 'm²', '1'),
      u('are', 'Are', 'a', '100'),
      u('ha', 'Hectare', 'ha', '10000'),
      u('km2', 'Square kilometre', 'km²', '1000000'),
      u('in2', 'Square inch', 'in²', '0.00064516'),
      u('ft2', 'Square foot', 'ft²', '0.09290304'),
      u('yd2', 'Square yard', 'yd²', '0.83612736'),
      u('acre', 'Acre', 'ac', '4046.8564224'),
      u('mi2', 'Square mile', 'mi²', '2589988.110336')
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    base: 'K',
    defaults: ['C', 'F'],
    units: [u('C', 'Celsius', '°C'), u('F', 'Fahrenheit', '°F'), u('K', 'Kelvin', 'K')]
  },
  {
    id: 'speed',
    name: 'Speed',
    base: 'mps',
    defaults: ['kmh', 'mph'],
    units: [
      u('mps', 'Metre per second', 'm/s', '1'),
      u('kmh', 'Kilometre per hour', 'km/h', '1000/3600'),
      u('mph', 'Mile per hour', 'mph', '1609.344/3600'),
      u('kn', 'Knot', 'kn', '1852/3600'),
      u('fps', 'Foot per second', 'ft/s', '0.3048')
    ]
  },
  {
    id: 'time',
    name: 'Time',
    base: 's',
    defaults: ['h', 'min'],
    units: [
      u('ms', 'Millisecond', 'ms', '0.001'),
      u('s', 'Second', 's', '1'),
      u('min', 'Minute', 'min', '60'),
      u('h', 'Hour', 'h', '3600'),
      u('d', 'Day', 'd', '86400'),
      u('wk', 'Week', 'wk', '604800'),
      // Average Gregorian month and year: 365.2425 d / 12 and 365.2425 d.
      u('mo', 'Month (average)', 'mo', '2629746', '30.436875 d'),
      u('yr', 'Year (average)', 'yr', '31556952', '365.2425 d')
    ]
  },
  {
    id: 'data',
    name: 'Data',
    base: 'B',
    defaults: ['GB', 'GiB'],
    units: [
      u('bit', 'Bit', 'bit', '1/8'),
      u('B', 'Byte', 'B', '1'),
      u('kB', 'Kilobyte', 'kB', '1000', '1000 B'),
      u('MB', 'Megabyte', 'MB', '1000000', '1000² B'),
      u('GB', 'Gigabyte', 'GB', '1000000000', '1000³ B'),
      u('TB', 'Terabyte', 'TB', '1000000000000', '1000⁴ B'),
      u('KiB', 'Kibibyte', 'KiB', '1024', '1024 B'),
      u('MiB', 'Mebibyte', 'MiB', '1048576', '1024² B'),
      u('GiB', 'Gibibyte', 'GiB', '1073741824', '1024³ B'),
      u('TiB', 'Tebibyte', 'TiB', '1099511627776', '1024⁴ B')
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    base: 'Pa',
    defaults: ['bar', 'psi'],
    units: [
      u('Pa', 'Pascal', 'Pa', '1'),
      u('kPa', 'Kilopascal', 'kPa', '1000'),
      u('bar', 'Bar', 'bar', '100000'),
      // 1 lbf / 1 in² = 0.45359237 kg × 9.80665 m/s² / 0.00064516 m²
      u('psi', 'Pound per square inch', 'psi', '4.4482216152605/0.00064516'),
      u('atm', 'Standard atmosphere', 'atm', '101325'),
      u('mmHg', 'Millimetre of mercury', 'mmHg', '133.322387415')
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    base: 'J',
    defaults: ['kcal', 'kJ'],
    units: [
      u('J', 'Joule', 'J', '1'),
      u('kJ', 'Kilojoule', 'kJ', '1000'),
      u('cal', 'Calorie', 'cal', '4.184', 'thermochemical'),
      u('kcal', 'Kilocalorie', 'kcal', '4184', 'food Calorie'),
      u('Wh', 'Watt-hour', 'Wh', '3600'),
      u('kWh', 'Kilowatt-hour', 'kWh', '3600000')
    ]
  }
];

const BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

export function isCategoryId(v: unknown): v is CategoryId {
  return typeof v === 'string' && BY_ID.has(v as CategoryId);
}

export function getCategory(id: CategoryId): Category {
  const c = BY_ID.get(id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}

export function getUnit(category: CategoryId, key: string): Unit | undefined {
  return BY_ID.get(category)?.units.find((x) => x.key === key);
}

// ---- Exact decimal fractions ----

interface Frac {
  n: bigint;
  d: bigint;
}

const DECIMAL = /^([+-]?)(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i;

/** Parse a plain decimal ("0.3048", "-1.5e-7") into an exact fraction. */
function decimalFrac(s: string): Frac | null {
  const m = DECIMAL.exec(s.trim());
  if (!m || (!m[2] && !m[3])) return null;
  const digits = (m[2] || '') + (m[3] || '');
  const exp = Number(m[4] || 0) - (m[3] || '').length;
  let n = BigInt(digits || '0');
  if (m[1] === '-') n = -n;
  let d = 1n;
  if (exp >= 0) n *= 10n ** BigInt(exp);
  else d = 10n ** BigInt(-exp);
  return { n, d };
}

const factorCache = new Map<string, Frac>();

/** Parse a unit factor: a decimal or "a/b" with decimal parts. */
function factorFrac(f: string): Frac {
  let r = factorCache.get(f);
  if (r) return r;
  const [a, b = '1'] = f.split('/');
  const x = decimalFrac(a);
  const y = decimalFrac(b);
  if (!x || !y || y.n === 0n) throw new Error(`Bad factor: ${f}`);
  r = { n: x.n * y.d, d: x.d * y.n };
  factorCache.set(f, r);
  return r;
}

const mul = (a: Frac, b: Frac): Frac => ({ n: a.n * b.n, d: a.d * b.d });
const div = (a: Frac, b: Frac): Frac => ({ n: a.n * b.d, d: a.d * b.n });
const add = (a: Frac, b: Frac): Frac => ({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
const sub = (a: Frac, b: Frac): Frac => add(a, { n: -b.n, d: b.d });

/** Nearest double to an exact fraction (22 significant digits, then parsed). */
function fracToNumber(f: Frac): number {
  let { n, d } = f;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  if (n === 0n) return 0;
  const neg = n < 0n;
  if (neg) n = -n;
  const shift = 22 - (n.toString().length - d.toString().length);
  const q = shift >= 0 ? (n * 10n ** BigInt(shift)) / d : n / (d * 10n ** BigInt(-shift));
  const v = Number(`${q}e${-shift}`);
  return neg ? -v : v;
}

const ABS_ZERO_C = decimalFrac('273.15') as Frac;
const ABS_ZERO_F = decimalFrac('459.67') as Frac;
const NINE_FIFTHS: Frac = { n: 9n, d: 5n };

function toKelvin(v: Frac, unit: string): Frac | null {
  if (unit === 'K') return v;
  if (unit === 'C') return add(v, ABS_ZERO_C);
  if (unit === 'F') return div(add(v, ABS_ZERO_F), NINE_FIFTHS);
  return null;
}

function fromKelvin(k: Frac, unit: string): Frac | null {
  if (unit === 'K') return k;
  if (unit === 'C') return sub(k, ABS_ZERO_C);
  if (unit === 'F') return sub(mul(k, NINE_FIFTHS), ABS_ZERO_F);
  return null;
}

/** Error message for an input value in a unit, or undefined when it is valid. */
export function inputError(value: number, unit: string, category: CategoryId): string | undefined {
  if (!Number.isFinite(value)) return 'Enter a number.';
  if (category !== 'temperature') return undefined;
  const k = toKelvin(decimalFrac(String(value)) as Frac, unit);
  if (k && k.n * k.d < 0n) return 'Below absolute zero (0 K = −273.15 °C = −459.67 °F).';
  return undefined;
}

/**
 * Convert `value` from one unit to another in `category`.
 * Returns NaN for unknown units, non-finite input, or temperatures below absolute zero.
 */
export function convert(value: number, from: string, to: string, category: CategoryId): number {
  if (!Number.isFinite(value)) return NaN;
  const v = decimalFrac(String(value));
  if (!v) return NaN;
  if (category === 'temperature') {
    const k = toKelvin(v, from);
    if (!k || k.n * k.d < 0n) return NaN;
    const r = fromKelvin(k, to);
    return r ? fracToNumber(r) : NaN;
  }
  const a = getUnit(category, from);
  const b = getUnit(category, to);
  if (!a || !b) return NaN;
  if (a === b) return value;
  return fracToNumber(div(mul(v, factorFrac(a.factor)), factorFrac(b.factor)));
}

// ---- Formatting & parsing ----

export interface FormatOptions {
  /** BCP 47 locale for separators (default en-US). */
  locale?: string;
  /** Thousands grouping (default true). Use false for editable fields. */
  grouping?: boolean;
  /** Maximum significant digits (default 10). */
  digits?: number;
}

/**
 * Format with up to `digits` significant digits, dropping float noise
 * (0.1 + 0.2 → "0.3"); exponential below 1e-6 or from 1e15 ("1.5e-9").
 */
export function formatResult(n: number, opts: FormatOptions = {}): string {
  const { locale = 'en-US', grouping = true, digits = 10 } = opts;
  if (!Number.isFinite(n)) return '';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  const fmt = new Intl.NumberFormat(locale, { maximumSignificantDigits: digits, useGrouping: grouping });
  // Rounding can carry over the threshold (999999999999999.9 → 1e15), so check the rounded value.
  const rounded = Number(abs.toPrecision(digits));
  if (rounded >= 1e15 || rounded < 1e-6) {
    const [mant, exp] = n.toExponential(digits - 1).split('e');
    return `${fmt.format(Number(mant))}e${Number(exp)}`;
  }
  return fmt.format(n);
}

/**
 * Parse a typed number. Accepts comma or dot decimals ("1,5" = "1.5"), grouped
 * thousands when both separators appear ("1.234,5", "1,234.5") or one repeats
 * ("1.000.000"), spaces, a leading sign, and exponents ("1e-9"). NaN when invalid.
 */
/**
 * A single separator is always the decimal mark ("1,5" = "1.5" = 1.5; "1.000" = 1), because
 * the editable fields show results ungrouped with a "." decimal. Use two groups ("1.000.000")
 * or a mixed form ("1.234,5") for thousands.
 */
export function parseNumber(text: string): number {
  const s = text.trim().replace(/[\s\u00a0\u202f_']/g, '').replace(/[\u2212\u2012\u2013]/g, '-');
  const m = /^([+-]?)([\d.,]+)(?:[eE]([+-]?\d+))?$/.exec(s);
  if (!m) return NaN;
  let body = m[2];
  const commas = body.split(',').length - 1;
  const dots = body.split('.').length - 1;
  if (commas && dots) {
    const decimal = body.lastIndexOf(',') > body.lastIndexOf('.') ? ',' : '.';
    const group = decimal === ',' ? '.' : ',';
    if (body.split(decimal).length - 1 > 1) return NaN;
    if (body.indexOf(group) > body.indexOf(decimal)) return NaN;
    body = body.split(group).join('').replace(decimal, '.');
  } else if (commas) {
    body = commas === 1 ? body.replace(',', '.') : body.split(',').join('');
  } else if (dots > 1) {
    body = body.split('.').join('');
  }
  if (!/\d/.test(body)) return NaN;
  const v = Number(`${m[1]}${body}${m[3] !== undefined ? `e${m[3]}` : ''}`);
  return Number.isFinite(v) ? v : NaN;
}

/** "Metre (m)" style label for selects. */
export function unitLabel(unit: Unit): string {
  return unit.name === unit.symbol ? unit.name : `${unit.name} (${unit.symbol})`;
}
