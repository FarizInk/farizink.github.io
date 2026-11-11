// Color Converter logic — pure, self-contained (no relative imports so `node --test` can load it).
// Internal model: sRGB channels r, g, b as 0–1 floats plus alpha 0–1.
// OKLab conversions use Björn Ottosson's matrices (https://bottosson.github.io/posts/oklab/).

export interface Color {
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export type ParseResult =
  | { ok: true; color: Color; clipped: boolean }
  | { ok: false; message: string };

export interface Oklab {
  l: number;
  a: number;
  b: number;
}
export interface Oklch {
  l: number;
  c: number;
  h: number;
}

// ---------------------------------------------------------------------------
// Helpers

const clamp01 = (x: number): number => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);
const normHue = (h: number): number => {
  const r = h % 360;
  return r < 0 ? r + 360 : r;
};

/** Round to `dp` decimals and render without trailing zeros (never "-0"). */
export function num(x: number, dp: number): string {
  const v = Number(x.toFixed(dp));
  return (Object.is(v, -0) ? 0 : v).toString();
}

/** Build a color from 0–255 channels (and 0–1 alpha); every value is clamped. */
export function fromRgb255(r: number, g: number, b: number, alpha = 1): Color {
  return { r: clamp01(r / 255), g: clamp01(g / 255), b: clamp01(b / 255), alpha: clamp01(alpha) };
}

/** 0–255 integer channels. */
export function toRgb255(c: Color): { r: number; g: number; b: number } {
  return {
    r: Math.round(clamp01(c.r) * 255),
    g: Math.round(clamp01(c.g) * 255),
    b: Math.round(clamp01(c.b) * 255)
  };
}

const alphaStr = (a: number): string => num(clamp01(a), 3);

// ---------------------------------------------------------------------------
// Named colors (CSS Color 4: 148 keywords)

const NAMED_SRC =
  'aliceblue:f0f8ff antiquewhite:faebd7 aqua:00ffff aquamarine:7fffd4 azure:f0ffff beige:f5f5dc ' +
  'bisque:ffe4c4 black:000000 blanchedalmond:ffebcd blue:0000ff blueviolet:8a2be2 brown:a52a2a ' +
  'burlywood:deb887 cadetblue:5f9ea0 chartreuse:7fff00 chocolate:d2691e coral:ff7f50 ' +
  'cornflowerblue:6495ed cornsilk:fff8dc crimson:dc143c cyan:00ffff darkblue:00008b darkcyan:008b8b ' +
  'darkgoldenrod:b8860b darkgray:a9a9a9 darkgreen:006400 darkgrey:a9a9a9 darkkhaki:bdb76b ' +
  'darkmagenta:8b008b darkolivegreen:556b2f darkorange:ff8c00 darkorchid:9932cc darkred:8b0000 ' +
  'darksalmon:e9967a darkseagreen:8fbc8f darkslateblue:483d8b darkslategray:2f4f4f ' +
  'darkslategrey:2f4f4f darkturquoise:00ced1 darkviolet:9400d3 deeppink:ff1493 deepskyblue:00bfff ' +
  'dimgray:696969 dimgrey:696969 dodgerblue:1e90ff firebrick:b22222 floralwhite:fffaf0 ' +
  'forestgreen:228b22 fuchsia:ff00ff gainsboro:dcdcdc ghostwhite:f8f8ff gold:ffd700 ' +
  'goldenrod:daa520 gray:808080 green:008000 greenyellow:adff2f grey:808080 honeydew:f0fff0 ' +
  'hotpink:ff69b4 indianred:cd5c5c indigo:4b0082 ivory:fffff0 khaki:f0e68c lavender:e6e6fa ' +
  'lavenderblush:fff0f5 lawngreen:7cfc00 lemonchiffon:fffacd lightblue:add8e6 lightcoral:f08080 ' +
  'lightcyan:e0ffff lightgoldenrodyellow:fafad2 lightgray:d3d3d3 lightgreen:90ee90 lightgrey:d3d3d3 ' +
  'lightpink:ffb6c1 lightsalmon:ffa07a lightseagreen:20b2aa lightskyblue:87cefa ' +
  'lightslategray:778899 lightslategrey:778899 lightsteelblue:b0c4de lightyellow:ffffe0 lime:00ff00 ' +
  'limegreen:32cd32 linen:faf0e6 magenta:ff00ff maroon:800000 mediumaquamarine:66cdaa ' +
  'mediumblue:0000cd mediumorchid:ba55d3 mediumpurple:9370db mediumseagreen:3cb371 ' +
  'mediumslateblue:7b68ee mediumspringgreen:00fa9a mediumturquoise:48d1cc mediumvioletred:c71585 ' +
  'midnightblue:191970 mintcream:f5fffa mistyrose:ffe4e1 moccasin:ffe4b5 navajowhite:ffdead ' +
  'navy:000080 oldlace:fdf5e6 olive:808000 olivedrab:6b8e23 orange:ffa500 orangered:ff4500 ' +
  'orchid:da70d6 palegoldenrod:eee8aa palegreen:98fb98 paleturquoise:afeeee palevioletred:db7093 ' +
  'papayawhip:ffefd5 peachpuff:ffdab9 peru:cd853f pink:ffc0cb plum:dda0dd powderblue:b0e0e6 ' +
  'purple:800080 rebeccapurple:663399 red:ff0000 rosybrown:bc8f8f royalblue:4169e1 ' +
  'saddlebrown:8b4513 salmon:fa8072 sandybrown:f4a460 seagreen:2e8b57 seashell:fff5ee sienna:a0522d ' +
  'silver:c0c0c0 skyblue:87ceeb slateblue:6a5acd slategray:708090 slategrey:708090 snow:fffafa ' +
  'springgreen:00ff7f steelblue:4682b4 tan:d2b48c teal:008080 thistle:d8bfd8 tomato:ff6347 ' +
  'turquoise:40e0d0 violet:ee82ee wheat:f5deb3 white:ffffff whitesmoke:f5f5f5 yellow:ffff00 ' +
  'yellowgreen:9acd32';

export const NAMED_COLORS: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(NAMED_SRC.split(' ').map(pair => {
    const [name, hex] = pair.split(':');
    return [name, `#${hex}`];
  }))
);

/** First CSS keyword that names exactly this (opaque) color, or null. */
export function namedColorFor(c: Color): string | null {
  if (c.alpha < 1) return c.alpha === 0 ? 'transparent' : null;
  const hex = toHex(c);
  for (const [name, value] of Object.entries(NAMED_COLORS)) if (value === hex) return name;
  return null;
}

// ---------------------------------------------------------------------------
// Color spaces

const toLinear = (c: number): number => {
  const a = Math.abs(c);
  const v = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return c < 0 ? -v : v;
};
const fromLinear = (c: number): number => {
  const a = Math.abs(c);
  const v = a <= 0.0031308 ? a * 12.92 : 1.055 * Math.pow(a, 1 / 2.4) - 0.055;
  return c < 0 ? -v : v;
};

export function toOklab(c: Color): Oklab {
  return toOklabRaw([clamp01(c.r), clamp01(c.g), clamp01(c.b)]);
}

function toOklabRaw(rgb: [number, number, number]): Oklab {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  };
}

/** OKLab → gamma-encoded sRGB, unclamped (may fall outside 0–1). */
function oklabToRgbRaw(L: number, A: number, B: number): [number, number, number] {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  ];
}

const GAMUT_EPS = 1e-4;
const inGamut = (rgb: number[]): boolean => rgb.every(v => v >= -GAMUT_EPS && v <= 1 + GAMUT_EPS);

export function toOklch(c: Color): Oklch {
  const { l, a, b } = toOklab(c);
  const chroma = Math.hypot(a, b);
  const h = chroma < 1e-4 ? 0 : normHue((Math.atan2(b, a) * 180) / Math.PI);
  return { l, c: chroma, h };
}

/** Distance in OKLab between a raw (unclamped) sRGB triple and the same triple clipped to 0–1. */
function clipError(rgb: [number, number, number]): number {
  const raw = toOklabRaw(rgb);
  const cl = toOklabRaw([clamp01(rgb[0]), clamp01(rgb[1]), clamp01(rgb[2])]);
  return Math.hypot(raw.l - cl.l, raw.a - cl.a, raw.b - cl.b);
}

/** Below this OKLab distance a clip is invisible (CSS Color 4 gamut-mapping JND). */
const JND = 0.02;
/** Clips smaller than this are just rounding noise and don't raise the `clipped` flag. */
const CLIP_NOTICE = 0.002;

/**
 * OKLCH → sRGB. Out-of-gamut colors are gamut-mapped as in CSS Color 4: lightness and
 * hue stay, chroma is reduced (binary search) until a plain clip is no longer visible.
 * `clipped` reports a visible change.
 */
export function fromOklch(L: number, C: number, H: number, alpha = 1): { color: Color; clipped: boolean } {
  const l = clamp01(L);
  const c0 = Math.max(0, C);
  const rad = (normHue(H) * Math.PI) / 180;
  const at = (c: number): [number, number, number] => oklabToRgbRaw(l, c * Math.cos(rad), c * Math.sin(rad));
  const done = (rgb: [number, number, number], clipped: boolean) => ({
    color: { r: clamp01(rgb[0]), g: clamp01(rgb[1]), b: clamp01(rgb[2]), alpha: clamp01(alpha) },
    clipped
  });

  if (l >= 1 || l <= 0) return done(l >= 1 ? [1, 1, 1] : [0, 0, 0], false);
  let rgb = at(c0);
  if (inGamut(rgb)) return done(rgb, false);
  // A barely-out color (e.g. from rounding) is simply clipped.
  const err = clipError(rgb);
  if (err < CLIP_NOTICE) return done(rgb, false);
  if (err < JND) return done(rgb, true);

  let lo = 0;
  let hi = c0;
  let loInGamut = true;
  while (hi - lo > 1e-4) {
    const mid = (lo + hi) / 2;
    rgb = at(mid);
    if (loInGamut && inGamut(rgb)) {
      lo = mid;
      continue;
    }
    const e = clipError(rgb);
    if (e < JND) {
      if (JND - e < 1e-4) break;
      loInGamut = false;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return done(rgb, true);
}

export function fromOklab(L: number, A: number, B: number, alpha = 1): { color: Color; clipped: boolean } {
  const c = Math.hypot(A, B);
  const h = (Math.atan2(B, A) * 180) / Math.PI;
  return fromOklch(L, c, h, alpha);
}

export function fromHsl(h: number, s: number, l: number, alpha = 1): Color {
  const S = clamp01(s);
  const L = clamp01(l);
  const H = normHue(h);
  const f = (n: number): number => {
    const k = (n + H / 30) % 12;
    return L - S * Math.min(L, 1 - L) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return { r: clamp01(f(0)), g: clamp01(f(8)), b: clamp01(f(4)), alpha: clamp01(alpha) };
}

export function fromHwb(h: number, w: number, bl: number, alpha = 1): Color {
  const W = clamp01(w);
  const B = clamp01(bl);
  if (W + B >= 1) {
    const gray = W / (W + B);
    return { r: gray, g: gray, b: gray, alpha: clamp01(alpha) };
  }
  const base = fromHsl(h, 1, 0.5);
  const k = 1 - W - B;
  return {
    r: clamp01(base.r * k + W),
    g: clamp01(base.g * k + W),
    b: clamp01(base.b * k + W),
    alpha: clamp01(alpha)
  };
}

/** Hue (degrees), saturation and lightness (0–1). */
export function toHsl(c: Color): { h: number; s: number; l: number } {
  const r = clamp01(c.r);
  const g = clamp01(c.g);
  const b = clamp01(c.b);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d < 1e-9) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  return { h: hueOf(r, g, b, max, d), s: clamp01(s), l };
}

function hueOf(r: number, g: number, b: number, max: number, d: number): number {
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return normHue(h * 60);
}

/** Hue (degrees), saturation and value (0–1). */
export function toHsv(c: Color): { h: number; s: number; v: number } {
  const r = clamp01(c.r);
  const g = clamp01(c.g);
  const b = clamp01(c.b);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  return { h: d < 1e-9 ? 0 : hueOf(r, g, b, max, d), s: max === 0 ? 0 : d / max, v: max };
}

/** Hue (degrees), whiteness and blackness (0–1). */
export function toHwb(c: Color): { h: number; w: number; b: number } {
  const { h, s, v } = toHsv(c);
  return { h, w: (1 - s) * v, b: 1 - v };
}

/** Naive (device-independent) CMYK, 0–1 each. */
export function toCmyk(c: Color): { c: number; m: number; y: number; k: number } {
  const r = clamp01(c.r);
  const g = clamp01(c.g);
  const b = clamp01(c.b);
  const k = 1 - Math.max(r, g, b);
  if (k >= 1 - 1e-9) return { c: 0, m: 0, y: 0, k: 1 };
  return { c: (1 - r - k) / (1 - k), m: (1 - g - k) / (1 - k), y: (1 - b - k) / (1 - k), k };
}

// ---------------------------------------------------------------------------
// Formatters

const hex2 = (n: number): string => n.toString(16).padStart(2, '0');

/** `#rrggbb`, or `#rrggbbaa` when alpha < 1. Lowercase. */
export function toHex(c: Color): string {
  const { r, g, b } = toRgb255(c);
  const a = Math.round(clamp01(c.alpha) * 255);
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 255 ? hex2(a) : ''}`;
}

const slashAlpha = (a: number): string => (clamp01(a) < 1 ? ` / ${alphaStr(a)}` : '');

/** Modern syntax: `rgb(59 130 246)` / `rgb(59 130 246 / 0.5)`. */
export function formatRgb(c: Color): string {
  const { r, g, b } = toRgb255(c);
  return `rgb(${r} ${g} ${b}${slashAlpha(c.alpha)})`;
}

/** Legacy comma syntax: `rgb(59, 130, 246)` or `rgba(59, 130, 246, 0.5)`. */
export function formatRgbLegacy(c: Color): string {
  const { r, g, b } = toRgb255(c);
  return clamp01(c.alpha) < 1 ? `rgba(${r}, ${g}, ${b}, ${alphaStr(c.alpha)})` : `rgb(${r}, ${g}, ${b})`;
}

export function formatHsl(c: Color): string {
  const { h, s, l } = toHsl(c);
  return `hsl(${num(h, 1)} ${num(s * 100, 1)}% ${num(l * 100, 1)}%${slashAlpha(c.alpha)})`;
}

export function formatHwb(c: Color): string {
  const { h, w, b } = toHwb(c);
  return `hwb(${num(h, 1)} ${num(w * 100, 1)}% ${num(b * 100, 1)}%${slashAlpha(c.alpha)})`;
}

export function formatOklch(c: Color): string {
  const { l, c: ch, h } = toOklch(c);
  return `oklch(${num(l * 100, 2)}% ${num(ch, 4)} ${num(h, 2)}${slashAlpha(c.alpha)})`;
}

export function formatOklab(c: Color): string {
  const { l, a, b } = toOklab(c);
  return `oklab(${num(l * 100, 2)}% ${num(a, 4)} ${num(b, 4)}${slashAlpha(c.alpha)})`;
}

export function formatHsv(c: Color): string {
  const { h, s, v } = toHsv(c);
  return `${Math.round(h) % 360}°, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%`;
}

export function formatCmyk(c: Color): string {
  const { c: cy, m, y, k } = toCmyk(c);
  return [cy, m, y, k].map(v => `${Math.round(v * 100)}%`).join(', ');
}

// ---------------------------------------------------------------------------
// Contrast (WCAG 2.x). Alpha is ignored: colors are treated as opaque.

export function relativeLuminance(c: Color): number {
  return 0.2126 * toLinear(clamp01(c.r)) + 0.7152 * toLinear(clamp01(c.g)) + 0.0722 * toLinear(clamp01(c.b));
}

export function contrastRatio(a: Color, b: Color): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export interface WcagResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

export function wcag(a: Color, b: Color): WcagResult {
  const ratio = contrastRatio(a, b);
  return { ratio, aaNormal: ratio >= 4.5, aaLarge: ratio >= 3, aaaNormal: ratio >= 7, aaaLarge: ratio >= 4.5 };
}

export const WHITE: Color = Object.freeze({ r: 1, g: 1, b: 1, alpha: 1 });
export const BLACK: Color = Object.freeze({ r: 0, g: 0, b: 0, alpha: 1 });

/** Whichever of black or white reads better on `bg`. */
export function bestTextColor(bg: Color): 'black' | 'white' {
  return contrastRatio(bg, BLACK) >= contrastRatio(bg, WHITE) ? 'black' : 'white';
}

// ---------------------------------------------------------------------------
// Parsing

type Token = { value: number; unit: '' | '%' | 'deg' | 'rad' | 'grad' | 'turn' } | 'none';

const TOKEN_RE = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|grad|turn)?$/i;

function token(raw: string): Token | null {
  if (/^none$/i.test(raw)) return 'none';
  const m = TOKEN_RE.exec(raw);
  if (!m) return null;
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return null;
  return { value, unit: (m[2]?.toLowerCase() ?? '') as Exclude<Token, 'none'>['unit'] };
}

class ParseError extends Error {}
const fail = (message: string): never => {
  throw new ParseError(message);
};

/** A 0–1 fraction from a number (scaled by `numberScale`) or a percentage. */
function fraction(t: Token, fn: string, raw: string, numberScale: number, allowNumber = true, allowPercent = true): number {
  if (t === 'none') return 0;
  if (t.unit === '%' && allowPercent) return t.value / 100;
  if (t.unit === '' && allowNumber) return t.value / numberScale;
  return fail(`"${raw}" is not a valid value in ${fn}()`);
}

function hue(t: Token, fn: string, raw: string): number {
  if (t === 'none') return 0;
  switch (t.unit) {
    case '':
    case 'deg':
      return t.value;
    case 'rad':
      return (t.value * 180) / Math.PI;
    case 'grad':
      return t.value * 0.9;
    case 'turn':
      return t.value * 360;
    default:
      return fail(`Hue "${raw}" in ${fn}() needs a number or an angle (deg, rad, grad, turn)`);
  }
}

function splitArgs(fn: string, body: string): { raws: string[]; alphaRaw: string | null } {
  const inner = body.trim();
  if (!inner) fail(`${fn}() is empty`);
  if (inner.includes(',')) {
    if (inner.includes('/')) fail(`Don't mix commas and "/" in ${fn}()`);
    const parts = inner.split(',').map(p => p.trim());
    if (parts.some(p => !p || /\s/.test(p))) fail(`Malformed value list in ${fn}()`);
    if (parts.length < 3 || parts.length > 4) fail(`${fn}() needs 3 values plus an optional alpha`);
    return { raws: parts.slice(0, 3), alphaRaw: parts[3] ?? null };
  }
  const slash = inner.split('/');
  if (slash.length > 2) fail(`Only one "/" is allowed in ${fn}()`);
  const raws = slash[0].trim().split(/\s+/).filter(Boolean);
  if (raws.length !== 3) fail(`${fn}() needs 3 values plus an optional "/ alpha"`);
  const alphaRaw = slash.length === 2 ? slash[1].trim() : null;
  if (alphaRaw === '') fail(`Missing alpha after "/" in ${fn}()`);
  return { raws, alphaRaw };
}

function parseFunction(fn: string, body: string): { color: Color; clipped: boolean } {
  const { raws, alphaRaw } = splitArgs(fn, body);
  const toks = raws.map(r => token(r) ?? fail(`"${r}" is not a number in ${fn}()`));
  let alpha = 1;
  if (alphaRaw !== null) {
    const t = token(alphaRaw) ?? fail(`Alpha "${alphaRaw}" is not a number in ${fn}()`);
    alpha = clamp01(fraction(t, fn, alphaRaw, 1));
  }
  const f = (i: number, scale: number, num = true, pct = true): number => fraction(toks[i], fn, raws[i], scale, num, pct);

  switch (fn) {
    case 'rgb':
    case 'rgba': {
      const [r, g, b] = [0, 1, 2].map(i => f(i, 255));
      return { color: { r: clamp01(r), g: clamp01(g), b: clamp01(b), alpha }, clipped: false };
    }
    case 'hsl':
    case 'hsla':
      return { color: fromHsl(hue(toks[0], fn, raws[0]), f(1, 100), f(2, 100), alpha), clipped: false };
    case 'hwb':
      return { color: fromHwb(hue(toks[0], fn, raws[0]), f(1, 100), f(2, 100), alpha), clipped: false };
    case 'oklch':
      // L: 0–1 or %, C: number or % (100% = 0.4), H: angle.
      return fromOklch(f(0, 1), Math.max(0, f(1, 0.4) * 0.4), hue(toks[2], fn, raws[2]), alpha);
    case 'oklab':
      return fromOklab(f(0, 1), f(1, 0.4) * 0.4, f(2, 0.4) * 0.4, alpha);
    default:
      return fail(`${fn}() isn't supported — try hex, rgb(), hsl(), hwb(), oklch() or oklab()`);
  }
}

function parseHex(digits: string): Color | null {
  if (!/^[0-9a-f]+$/i.test(digits)) return null;
  let full: string;
  if (digits.length === 3 || digits.length === 4) full = [...digits].map(d => d + d).join('');
  else if (digits.length === 6 || digits.length === 8) full = digits;
  else return null;
  const n = (i: number): number => parseInt(full.slice(i, i + 2), 16);
  return { r: n(0) / 255, g: n(2) / 255, b: n(4) / 255, alpha: full.length === 8 ? n(6) / 255 : 1 };
}

/** Parse any CSS color the converter understands. */
export function parseColor(input: string): ParseResult {
  const s = input.trim().replace(/;$/, '').trim();
  if (!s) return { ok: false, message: 'Enter a color, e.g. #3b82f6, rgb(59 130 246) or rebeccapurple' };

  const lower = s.toLowerCase();
  if (lower === 'transparent') return { ok: true, color: { r: 0, g: 0, b: 0, alpha: 0 }, clipped: false };
  const named = NAMED_COLORS[lower];
  if (named) return { ok: true, color: parseHex(named.slice(1)) as Color, clipped: false };

  const fnMatch = /^([a-z]+)\((.*)\)$/is.exec(s);
  if (fnMatch) {
    try {
      const { color, clipped } = parseFunction(fnMatch[1].toLowerCase(), fnMatch[2]);
      return { ok: true, color, clipped };
    } catch (e) {
      if (e instanceof ParseError) return { ok: false, message: e.message };
      throw e;
    }
  }
  if (/^[a-z]+\(/i.test(s)) return { ok: false, message: 'Missing closing ")"' };

  const hexBody = s.startsWith('#') ? s.slice(1) : s;
  if (/^[0-9a-f]+$/i.test(hexBody)) {
    const c = parseHex(hexBody);
    return c
      ? { ok: true, color: c, clipped: false }
      : { ok: false, message: `HEX needs 3, 4, 6 or 8 digits (got ${hexBody.length})` };
  }
  if (s.startsWith('#')) return { ok: false, message: 'HEX may only contain 0–9 and a–f' };
  if (/^[a-z]+$/i.test(s)) return { ok: false, message: `"${s}" isn't a CSS color name` };
  return { ok: false, message: "Couldn't read that color — try hex, rgb(), hsl(), hwb(), oklch(), oklab() or a CSS name" };
}
