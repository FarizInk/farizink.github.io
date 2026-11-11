// BMI calculator logic — pure, self-contained (no relative imports so `node --test` can load it).
//
// Boundary rule: like the official tables, BMI is rounded to ONE decimal first and then
// classified against inclusive one-decimal ranges ("18.5–24.9"). So 24.94 → 24.9 → normal (WHO),
// 24.95 → 25.0 → overweight (WHO). Comparisons are done on integer tenths to avoid float drift.

export type Standard = 'asia' | 'kemenkes' | 'who';
export type Units = 'metric' | 'imperial';
export type CategoryKey = 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';

export interface Band {
  key: CategoryKey;
  label: string;
  /** Lowest BMI (one decimal) in the band, inclusive; null = open below. */
  min: number | null;
  /** Highest BMI (one decimal) in the band, inclusive; null = open above. */
  max: number | null;
}

export interface Category {
  key: CategoryKey;
  label: string;
  range: string;
}

export const LB_KG = 0.45359237;
export const IN_CM = 2.54;
export const HEIGHT_CM = { min: 50, max: 272 } as const;
export const WEIGHT_KG = { min: 2, max: 650 } as const;

export const STANDARDS: Record<Standard, { name: string; note: string; bands: Band[] }> = {
  asia: {
    name: 'Asia-Pacific (WHO)',
    note: 'WHO cut-offs for Asian adults (2000): health risks start at a lower BMI than the global table.',
    bands: [
      { key: 'underweight', label: 'Underweight', min: null, max: 18.4 },
      { key: 'normal', label: 'Normal', min: 18.5, max: 22.9 },
      { key: 'overweight', label: 'Overweight', min: 23, max: 24.9 },
      { key: 'obese1', label: 'Obese I', min: 25, max: 29.9 },
      { key: 'obese2', label: 'Obese II', min: 30, max: null }
    ]
  },
  kemenkes: {
    name: 'Kemenkes RI',
    note: 'Indonesian Ministry of Health (P2PTM) table: normal up to 25.0, obese above 27.0.',
    bands: [
      { key: 'underweight', label: 'Underweight', min: null, max: 18.4 },
      { key: 'normal', label: 'Normal', min: 18.5, max: 25 },
      { key: 'overweight', label: 'Overweight', min: 25.1, max: 27 },
      { key: 'obese1', label: 'Obese', min: 27.1, max: null }
    ]
  },
  who: {
    name: 'WHO global',
    note: 'The international WHO adult table, mostly based on European populations.',
    bands: [
      { key: 'underweight', label: 'Underweight', min: null, max: 18.4 },
      { key: 'normal', label: 'Normal', min: 18.5, max: 24.9 },
      { key: 'overweight', label: 'Overweight', min: 25, max: 29.9 },
      { key: 'obese1', label: 'Obese I', min: 30, max: 34.9 },
      { key: 'obese2', label: 'Obese II', min: 35, max: 39.9 },
      { key: 'obese3', label: 'Obese III', min: 40, max: null }
    ]
  }
};

const tenths = (n: number) => Math.round(n * 10 + 1e-9);
const fmt1 = (n: number) => n.toFixed(1);

/** Round to `d` decimals. */
export function round(n: number, d = 1): number {
  const f = 10 ** d;
  return Math.round(n * f + (n >= 0 ? 1e-9 : -1e-9)) / f;
}

export function rangeText(b: Band): string {
  if (b.min === null && b.max !== null) return `< ${fmt1(b.max + 0.1)}`;
  if (b.max === null && b.min !== null) return `≥ ${fmt1(b.min)}`;
  return `${fmt1(b.min ?? 0)}–${fmt1(b.max ?? 0)}`;
}

/** Classify a BMI (rounded to one decimal first) with the given standard. */
export function classify(bmi: number, standard: Standard): Category {
  const t = tenths(bmi);
  const bands = STANDARDS[standard].bands;
  const band =
    bands.find((b) => (b.min === null || t >= tenths(b.min)) && (b.max === null || t <= tenths(b.max))) ??
    bands[bands.length - 1];
  return { key: band.key, label: band.label, range: rangeText(band) };
}

// ---- Units ----
export const lbToKg = (lb: number) => lb * LB_KG;
export const kgToLb = (kg: number) => kg / LB_KG;
export const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * IN_CM;

/** Centimetres → whole feet + inches (one decimal, carried so inches stay < 12). */
export function cmToFtIn(cm: number): { ft: number; in: number } {
  const totalIn = round(cm / IN_CM, 1);
  let ft = Math.floor(totalIn / 12);
  let inch = round(totalIn - ft * 12, 1);
  if (inch >= 12) {
    ft += 1;
    inch = round(inch - 12, 1);
  }
  return { ft, in: inch };
}

/** Parse a user number: accepts "70", "70.5", "70,5". Empty → null; invalid → NaN. */
export function parseDecimal(text: string): number | null {
  const s = text.trim().replace(',', '.');
  if (s === '') return null;
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  return Number(s);
}

/** Format for an input field: up to `d` decimals, no trailing zeros. */
export const plain = (n: number, d = 1) => String(round(n, d));

// ---- Core ----
export type BmiResult =
  | { ok: true; bmi: number; rounded: number }
  | { ok: false; field: 'weight' | 'height'; error: string };

function limitText(field: 'weight' | 'height', units: Units): string {
  if (field === 'height') {
    if (units === 'metric') return `Height must be between ${HEIGHT_CM.min} and ${HEIGHT_CM.max} cm.`;
    const lo = cmToFtIn(HEIGHT_CM.min);
    const hi = cmToFtIn(HEIGHT_CM.max);
    return `Height must be between ${lo.ft} ft ${lo.in} in and ${hi.ft} ft ${hi.in} in.`;
  }
  if (units === 'metric') return `Weight must be between ${WEIGHT_KG.min} and ${WEIGHT_KG.max} kg.`;
  return `Weight must be between ${plain(kgToLb(WEIGHT_KG.min))} and ${Math.floor(kgToLb(WEIGHT_KG.max))} lb.`;
}

/** BMI = kg / m². Validates ranges (height 50–272 cm, weight 2–650 kg); never returns Infinity/NaN. */
export function computeBmi(weightKg: number, heightCm: number, units: Units = 'metric'): BmiResult {
  // Small tolerance so limits typed in the other unit system (e.g. 4.4 lb) are not rejected by float noise.
  if (!Number.isFinite(heightCm) || heightCm < HEIGHT_CM.min - 0.05 || heightCm > HEIGHT_CM.max + 0.05)
    return { ok: false, field: 'height', error: limitText('height', units) };
  if (!Number.isFinite(weightKg) || weightKg < WEIGHT_KG.min - 0.05 || weightKg > WEIGHT_KG.max + 0.05)
    return { ok: false, field: 'weight', error: limitText('weight', units) };
  const m = heightCm / 100;
  const bmi = weightKg / (m * m);
  return { ok: true, bmi, rounded: round(bmi, 1) };
}

/** BMI Prime: BMI divided by the upper limit of normal (23 for Asia-Pacific, 25 otherwise). */
export function bmiPrime(bmi: number, standard: Standard = 'who'): number {
  return round(bmi / (standard === 'asia' ? 23 : 25), 2);
}

/** Weight range (kg, one decimal) whose BMI falls in the standard's normal band. */
export function healthyWeightRange(heightCm: number, standard: Standard): { min: number; max: number } {
  const normal = STANDARDS[standard].bands.find((b) => b.key === 'normal');
  const h2 = (heightCm * heightCm) / 10000;
  return { min: round((normal?.min ?? 18.5) * h2, 1), max: round((normal?.max ?? 24.9) * h2, 1) };
}

/** How far a weight is from the healthy range (kg). */
export function distanceToRange(
  weightKg: number,
  range: { min: number; max: number }
): { direction: 'within' | 'gain' | 'lose'; kg: number } {
  if (weightKg < range.min) return { direction: 'gain', kg: range.min - weightKg };
  if (weightKg > range.max) return { direction: 'lose', kg: weightKg - range.max };
  return { direction: 'within', kg: 0 };
}

/** Adult BMI categories apply from 18; children and teens need age/sex percentile charts. */
export const adultCategoriesApply = (age: number | null) => age === null || age >= 18;

export type AgeResult = { ok: true; age: number | null } | { ok: false; error: string };

export function parseAge(text: string): AgeResult {
  const n = parseDecimal(text);
  if (n === null) return { ok: true, age: null };
  if (Number.isNaN(n) || !Number.isInteger(n) || n < 2 || n > 120)
    return { ok: false, error: 'Age must be a whole number between 2 and 120.' };
  return { ok: true, age: n };
}
