// Color palette builder — pure logic (no DOM). Works in OKLCH so lightness and
// hue steps look even to the eye. Self-contained on purpose: `node --test`
// can't resolve extensionless relative imports, so the few sRGB/OKLab helpers
// are duplicated here instead of importing ./color.

export interface Rgb {
  r: number; // 0–255
  g: number;
  b: number;
}

export interface Oklch {
  l: number; // 0–1
  c: number; // ≥ 0
  h: number; // degrees 0–360
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export interface Swatch {
  name: string;
  hex: string;
  isBase: boolean;
}

export interface ShadeStep {
  step: number; // 50, 100 … 900, 950
  hex: string;
  /** OKLCH lightness of `hex`, 0–1. */
  l: number;
  isBase: boolean;
}

export interface ShadeScale {
  steps: ShadeStep[];
  /** The step that holds the exact base color. */
  baseStep: number;
}

export const HARMONIES: { value: HarmonyType; label: string }[] = [
  { value: 'complementary', label: 'Complementary' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'split-complementary', label: 'Split' },
  { value: 'tetradic', label: 'Tetradic' },
  { value: 'monochromatic', label: 'Mono' }
];

export function isHarmony(v: unknown): v is HarmonyType {
  return HARMONIES.some(h => h.value === v);
}

// ---- Parsing / sRGB ---------------------------------------------------------

/** `#3b8`, `3B82F6`, ` #3b82f6 ` → `#3b82f6`; anything else → null (never black). */
export function parseHex(input: string): string | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return null;
  let d = m[1].toLowerCase();
  if (d.length === 3) d = d[0] + d[0] + d[1] + d[1] + d[2] + d[2];
  return '#' + d;
}

function mustParse(hex: string): string {
  const p = parseHex(hex);
  if (!p) throw new Error(`Invalid hex color: ${hex}`);
  return p;
}

export function hexToRgb(hex: string): Rgb {
  const h = mustParse(hex);
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16)
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const part = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v)))
      .toString(16)
      .padStart(2, '0');
  return '#' + part(r) + part(g) + part(b);
}

const toLinear = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (v: number) =>
  255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.max(v, 0) ** (1 / 2.4) - 0.055);

// ---- OKLab / OKLCH (Björn Ottosson) -----------------------------------------

function linearToOklab(r: number, g: number, b: number): [number, number, number] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
}

function oklabToLinear(L: number, a: number, b: number): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ];
}

export function hexToOklch(hex: string): Oklch {
  const { r, g, b } = hexToRgb(hex);
  const [L, A, B] = linearToOklab(toLinear(r), toLinear(g), toLinear(b));
  const c = Math.hypot(A, B);
  let h = (Math.atan2(B, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c: c < 1e-4 ? 0 : c, h: c < 1e-4 ? 0 : h };
}

function oklchToLinear({ l, c, h }: Oklch): [number, number, number] {
  const rad = (h * Math.PI) / 180;
  return oklabToLinear(l, c * Math.cos(rad), c * Math.sin(rad));
}

const EPS = 1e-6;
function inGamut([r, g, b]: [number, number, number]): boolean {
  return r >= -EPS && r <= 1 + EPS && g >= -EPS && g <= 1 + EPS && b >= -EPS && b <= 1 + EPS;
}

/** OKLCH → hex, clipping to sRGB by reducing chroma (lightness and hue are kept). */
export function oklchToHex(color: Oklch): string {
  const l = Math.min(1, Math.max(0, color.l));
  const h = ((color.h % 360) + 360) % 360;
  let c = Math.max(0, color.c);
  if (!inGamut(oklchToLinear({ l, c, h }))) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear({ l, c: mid, h }))) lo = mid;
      else hi = mid;
    }
    c = lo;
  }
  const [r, g, b] = oklchToLinear({ l, c, h });
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return rgbToHex({ r: fromLinear(clamp(r)), g: fromLinear(clamp(g)), b: fromLinear(clamp(b)) });
}

export function formatOklch(hex: string): string {
  const { l, c, h } = hexToOklch(hex);
  return `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${c === 0 ? 0 : h.toFixed(1)})`;
}

/** A pleasant random color: mid lightness, moderate chroma, any hue. */
export function randomHex(rand: () => number = Math.random): string {
  return oklchToHex({ l: 0.5 + rand() * 0.25, c: 0.08 + rand() * 0.12, h: rand() * 360 });
}

// ---- Harmonies --------------------------------------------------------------

const ROTATIONS: Record<Exclude<HarmonyType, 'monochromatic'>, { offset: number; name: string }[]> = {
  complementary: [{ offset: 180, name: 'Complement' }],
  analogous: [
    { offset: -30, name: 'Analogous −30°' },
    { offset: 30, name: 'Analogous +30°' }
  ],
  triadic: [
    { offset: 120, name: 'Triad +120°' },
    { offset: 240, name: 'Triad +240°' }
  ],
  'split-complementary': [
    { offset: 150, name: 'Split +150°' },
    { offset: 210, name: 'Split +210°' }
  ],
  tetradic: [
    { offset: 90, name: 'Square +90°' },
    { offset: 180, name: 'Square +180°' },
    { offset: 270, name: 'Square +270°' }
  ]
};

/** Hue offsets (degrees) each harmony applies, base (0) first. */
export function harmonyOffsets(type: Exclude<HarmonyType, 'monochromatic'>): number[] {
  return [0, ...ROTATIONS[type].map(r => r.offset)];
}

const MONO_LIGHTNESS = [0.93, 0.8, 0.66, 0.52, 0.38, 0.25];

/**
 * Harmony palette for `baseHex`. Hue rotations keep the base's OKLCH lightness
 * and chroma (chroma reduced only if out of gamut); the base comes first.
 * Monochromatic varies lightness only, ordered light → dark, with the base
 * replacing the nearest lightness step.
 */
export function harmony(baseHex: string, type: HarmonyType): Swatch[] {
  const base = mustParse(baseHex);
  const lch = hexToOklch(base);
  if (type === 'monochromatic') {
    const nearest = nearestIndex(MONO_LIGHTNESS, lch.l);
    return MONO_LIGHTNESS.map((l, i) =>
      i === nearest
        ? { name: 'Base', hex: base, isBase: true }
        : { name: `L ${Math.round(l * 100)}%`, hex: oklchToHex({ ...lch, l }), isBase: false }
    );
  }
  return [
    { name: 'Base', hex: base, isBase: true },
    ...ROTATIONS[type].map(r => ({
      name: r.name,
      hex: oklchToHex({ ...lch, h: lch.h + r.offset }),
      isBase: false
    }))
  ];
}

function nearestIndex(values: number[], target: number): number {
  let best = 0;
  for (let i = 1; i < values.length; i++) {
    if (Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// ---- Shade scale ------------------------------------------------------------

export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const SHADE_LIGHTNESS = [0.97, 0.935, 0.88, 0.81, 0.72, 0.63, 0.54, 0.46, 0.37, 0.27, 0.16];

/**
 * Tailwind-style 50–950 scale in OKLCH. Lightness runs ~97% → ~16%; chroma
 * eases toward both ends (more toward the light end, where pale tints should
 * stay soft). The step nearest the base lightness is the exact base color.
 */
export function shadeScale(baseHex: string): ShadeScale {
  const base = mustParse(baseHex);
  const lch = hexToOklch(base);
  const baseIdx = nearestIndex(SHADE_LIGHTNESS, lch.l);
  const top = Math.max(SHADE_LIGHTNESS[0], lch.l);
  const bottom = Math.min(SHADE_LIGHTNESS[SHADE_LIGHTNESS.length - 1], lch.l);

  const steps = SHADE_STEPS.map((step, i): ShadeStep => {
    if (i === baseIdx) return { step, hex: base, l: lch.l, isBase: true };
    const l = SHADE_LIGHTNESS[i];
    let factor: number;
    if (l > lch.l) {
      const t = top - lch.l > 0 ? (l - lch.l) / (top - lch.l) : 1;
      factor = 1 - 0.7 * t * t;
    } else {
      const t = lch.l - bottom > 0 ? (lch.l - l) / (lch.l - bottom) : 1;
      factor = 1 - 0.45 * t * t;
    }
    const hex = oklchToHex({ l, c: lch.c * factor, h: lch.h });
    return { step, hex, l: hexToOklch(hex).l, isBase: false };
  });
  return { steps, baseStep: SHADE_STEPS[baseIdx] };
}

// ---- Exports ----------------------------------------------------------------

/** "My Brand!" → "my-brand"; empty → "brand". */
export function slugName(name: string): string {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'brand';
}

const stepsOf = (scale: ShadeScale | ShadeStep[]) => (Array.isArray(scale) ? scale : scale.steps);

export function toCssVariables(name: string, scale: ShadeScale | ShadeStep[]): string {
  const n = slugName(name);
  const lines = stepsOf(scale).map(s => `  --${n}-${s.step}: ${s.hex};`);
  return `:root {\n${lines.join('\n')}\n}`;
}

/** Tailwind v4: CSS-first theme variables (`bg-brand-500` etc.). */
export function toTailwindTheme(name: string, scale: ShadeScale | ShadeStep[]): string {
  const n = slugName(name);
  const lines = stepsOf(scale).map(s => `  --color-${n}-${s.step}: ${s.hex};`);
  return `@theme {\n${lines.join('\n')}\n}`;
}

/** Tailwind v3: object for `theme.extend.colors` in tailwind.config.js. */
export function toTailwindConfig(name: string, scale: ShadeScale | ShadeStep[]): string {
  const n = slugName(name);
  const key = /^[a-z_$][a-z0-9_$]*$/i.test(n) ? n : `'${n}'`;
  const lines = stepsOf(scale).map(s => `          ${s.step}: '${s.hex}',`);
  return [
    '// tailwind.config.js',
    'module.exports = {',
    '  theme: {',
    '    extend: {',
    '      colors: {',
    `        ${key}: {`,
    ...lines,
    '        },',
    '      },',
    '    },',
    '  },',
    '};'
  ].join('\n');
}

export function toJson(name: string, scale: ShadeScale | ShadeStep[]): string {
  const obj: Record<string, string> = {};
  for (const s of stepsOf(scale)) obj[String(s.step)] = s.hex;
  return JSON.stringify({ [slugName(name)]: obj }, null, 2);
}

// ---- Contrast ---------------------------------------------------------------

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Black or white, whichever has the higher WCAG contrast against `hex`. */
export function bestTextColor(hex: string): '#000000' | '#ffffff' {
  return contrastRatio(hex, '#000000') >= contrastRatio(hex, '#ffffff') ? '#000000' : '#ffffff';
}
