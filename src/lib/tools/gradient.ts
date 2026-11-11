// Pure helpers for the CSS Gradient Generator tool (tested in tests/gradient.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.
//
// The model keeps every type's geometry separately (linear angle, radial shape/size,
// conic start angle, shared position), so switching type can never mix one type's
// parameters into another type's syntax.

export type GradientType = 'linear' | 'radial' | 'conic';
export type RadialShape = 'circle' | 'ellipse';
export type RadialSize = 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';

export interface ColorStop {
  id: string;
  color: string;
  /** Percent along the gradient line; null lets CSS place it (auto). */
  position: number | null;
}

export interface GradientModel {
  type: GradientType;
  repeating: boolean;
  /** Linear only, degrees. */
  angle: number;
  /** Radial only. */
  shape: RadialShape;
  size: RadialSize;
  /** Radial and conic center, percent. */
  position: { x: number; y: number };
  /** Conic only, start angle in degrees. */
  from: number;
  stops: ColorStop[];
}

export type ColorCheck = (value: string) => boolean;

export const GRADIENT_TYPES: readonly GradientType[] = ['linear', 'radial', 'conic'];
export const RADIAL_SHAPES: readonly RadialShape[] = ['circle', 'ellipse'];
export const RADIAL_SIZES: readonly RadialSize[] = [
  'closest-side',
  'closest-corner',
  'farthest-side',
  'farthest-corner'
];

// ---------- ids ----------

let seq = 0;

/** A stop id that is unique within this page session. */
export function newStopId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  seq += 1;
  return `stop-${Date.now().toString(36)}-${seq}`;
}

export function makeStop(color: string, position: number | null = null): ColorStop {
  return { id: newStopId(), color, position };
}

// ---------- numbers ----------

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Up to two decimals, no trailing zeros. */
function fmt(n: number): string {
  return String(Math.round(n * 100) / 100);
}

// ---------- colors ----------

const NAMED_COLORS = new Set(
  (
    'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown ' +
    'burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan ' +
    'darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid ' +
    'darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet ' +
    'deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ' +
    'ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki ' +
    'lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow ' +
    'lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray ' +
    'lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine ' +
    'mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise ' +
    'mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab ' +
    'orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru ' +
    'pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown ' +
    'seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan ' +
    'teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen transparent currentcolor'
  ).split(' ')
);

const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const FN_RE = /^(rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*([^()]*?)\s*\)$/i;

/**
 * Cheap color check for environments without `CSS.supports` (and for tests):
 * hex with 3/4/6/8 digits, color functions with 3–4 numeric components, or a
 * CSS named color. Not a full parser — the UI prefers `CSS.supports('color', v)`.
 */
export function isProbablyColor(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (HEX_RE.test(v)) return true;
  if (NAMED_COLORS.has(v.toLowerCase())) return true;
  const m = FN_RE.exec(v);
  if (!m) return false;
  const parts = m[2]
    .replace(/\s*\/\s*/, ' / ')
    .split(/\s*,\s*|\s+/)
    .filter(p => p && p !== '/');
  if (parts.length < 3 || parts.length > 4) return false;
  return parts.every(p => /^(?:[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?(?:%|deg|rad|grad|turn)?|none)$/i.test(p));
}

/** '#abc' / '#abcd' / '#aabbcc' / '#aabbccdd' → { hex6: '#aabbcc', alpha 0–1 }; null for anything else. */
export function parseHex(value: string): { hex6: string; alpha: number } | null {
  const v = value.trim().toLowerCase();
  if (!HEX_RE.test(v)) return null;
  let h = v.slice(1);
  if (h.length <= 4) h = [...h].map(c => c + c).join('');
  const alpha = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { hex6: `#${h.slice(0, 6)}`, alpha };
}

function byteHex(n: number): string {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
}

/**
 * '#rrggbb' for the native color picker. Handles hex and rgb()/rgba() with
 * plain numbers; returns null for anything else (the UI resolves those itself).
 */
export function toPickerHex(value: string): string | null {
  const hex = parseHex(value);
  if (hex) return hex.hex6;
  const m = /^rgba?\(\s*([^()]*)\)$/i.exec(value.trim());
  if (!m) return null;
  const parts = m[1].split(/\s*[,/]\s*|\s+/).filter(Boolean);
  if (parts.length < 3) return null;
  const rgb = parts.slice(0, 3).map(p => (p.endsWith('%') ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
  if (rgb.some(n => !Number.isFinite(n))) return null;
  return `#${rgb.map(byteHex).join('')}`;
}

/** Alpha 0–1 of a hex or rgb/hsl color (comma or slash syntax); 1 when unknown. */
export function getAlpha(value: string): number {
  const hex = parseHex(value);
  if (hex) return hex.alpha;
  const m = FN_RE.exec(value.trim());
  if (!m) return 1;
  const body = m[2];
  let a: string | undefined;
  if (body.includes('/')) a = body.split('/')[1]?.trim();
  else {
    const parts = body.split(',').map(s => s.trim());
    if (parts.length === 4) a = parts[3];
  }
  if (!a) return 1;
  const n = a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a);
  return Number.isFinite(n) ? clamp(n, 0, 1) : 1;
}

/** '#rrggbb' + alpha → '#rrggbb' (opaque) or '#rrggbbaa'. */
export function withAlpha(hex6: string, alpha: number): string {
  const base = parseHex(hex6)?.hex6 ?? hex6;
  const a = clamp(alpha, 0, 1);
  return a >= 1 ? base : `${base}${byteHex(a * 255)}`;
}

/**
 * Apply a color picked in a native `<input type="color">` (always '#rrggbb')
 * while keeping the stop's existing alpha.
 */
export function applyPickerColor(previous: string, picked: string): string {
  return withAlpha(picked, getAlpha(previous));
}

function mixHex(a: string, b: string): string | null {
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return null;
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const rgb = [0, 1, 2].map(i => (ch(pa.hex6, i) + ch(pb.hex6, i)) / 2);
  return withAlpha(`#${rgb.map(byteHex).join('')}`, (pa.alpha + pb.alpha) / 2);
}

// ---------- stops ----------

/**
 * Where each stop actually lands, in percent, following CSS fix-up rules:
 * a missing first position is 0, a missing last is 100, runs of missing
 * positions are spread evenly between their neighbours, and a position
 * smaller than an earlier one is raised to it.
 */
export function resolvedPositions(stops: readonly ColorStop[]): number[] {
  const n = stops.length;
  const out: (number | null)[] = stops.map(s => (s.position == null || !Number.isFinite(s.position) ? null : s.position));
  if (n === 0) return [];
  if (out[0] == null) out[0] = 0;
  if (n > 1 && out[n - 1] == null) out[n - 1] = 100;
  let max = -Infinity;
  for (let i = 0; i < n; i++) {
    const p = out[i];
    if (p != null) {
      max = Math.max(max, p);
      out[i] = max;
    }
  }
  let i = 0;
  while (i < n) {
    if (out[i] != null) {
      i++;
      continue;
    }
    const start = i - 1;
    let end = i;
    while (out[end] == null) end++;
    const a = out[start] as number;
    const b = out[end] as number;
    const steps = end - start;
    for (let k = 1; k < steps; k++) out[start + k] = a + ((b - a) * k) / steps;
    i = end;
  }
  return out as number[];
}

/** Stable sort by where each stop lands (explicit position or the CSS auto position). */
export function sortStops(stops: readonly ColorStop[]): ColorStop[] {
  // Auto positions are only meaningful in the original order, so resolve them first.
  const auto = resolvedPositions(stops);
  return stops
    .map((s, i) => ({ s, i, p: s.position ?? auto[i] }))
    .sort((a, b) => a.p - b.p || a.i - b.i)
    .map(r => r.s);
}

/** Insert a stop in the widest gap, colored halfway between its neighbours when both are hex. */
export function addStop(stops: readonly ColorStop[], color?: string): ColorStop[] {
  const sorted = sortStops(stops);
  if (sorted.length === 0) return [makeStop(color ?? '#000000', 0)];
  if (sorted.length === 1) return [...sorted, makeStop(color ?? sorted[0].color, 100)];
  const pos = resolvedPositions(sorted);
  let gap = 0;
  for (let i = 1; i < pos.length; i++) if (pos[i] - pos[i - 1] > pos[gap + 1] - pos[gap]) gap = i - 1;
  const at = (pos[gap] + pos[gap + 1]) / 2;
  const c = color ?? mixHex(sorted[gap].color, sorted[gap + 1].color) ?? sorted[gap].color;
  const next = [...sorted];
  next.splice(gap + 1, 0, makeStop(c, Math.round(at * 10) / 10));
  return next;
}

/** Remove a stop by id; never goes below two stops. */
export function removeStop(stops: readonly ColorStop[], id: string): ColorStop[] {
  if (stops.length <= 2) return [...stops];
  return stops.filter(s => s.id !== id);
}

/** Sort, then place stops evenly from 0% to 100%. */
export function distributeEvenly(stops: readonly ColorStop[]): ColorStop[] {
  const sorted = sortStops(stops);
  const n = sorted.length;
  return sorted.map((s, i) => ({
    ...s,
    position: n === 1 ? 0 : Math.round(((i * 100) / (n - 1)) * 100) / 100
  }));
}

/** Flip the gradient: reverse the order and mirror each position (p → 100 − p). */
export function reverseStops(stops: readonly ColorStop[]): ColorStop[] {
  return [...stops].reverse().map(s => ({
    ...s,
    position: s.position == null ? null : Math.round((100 - s.position) * 100) / 100
  }));
}

// ---------- CSS ----------

function stopList(stops: readonly ColorStop[], isColor: ColorCheck): ColorStop[] {
  const valid = stops.filter(s => isColor(s.color.trim()));
  return sortStops(valid);
}

function prelude(model: GradientModel): string {
  const at = `at ${fmt(model.position.x)}% ${fmt(model.position.y)}%`;
  if (model.type === 'radial') return `${model.shape} ${model.size} ${at}`;
  if (model.type === 'conic') return `from ${fmt(model.from)}deg ${at}`;
  return `${fmt(model.angle)}deg`;
}

/**
 * The gradient function, e.g. `repeating-radial-gradient(circle farthest-corner at 50% 50%, #f00 0%, #00f 100%)`.
 * Stops failing `isColor` are skipped; one valid stop is drawn as a solid gradient;
 * no valid stop gives ''.
 */
export function toCss(model: GradientModel, isColor: ColorCheck = isProbablyColor): string {
  const stops = stopList(model.stops, isColor);
  if (stops.length === 0) return '';
  const parts = stops.map(s => (s.position == null ? s.color.trim() : `${s.color.trim()} ${fmt(s.position)}%`));
  if (parts.length === 1) parts.push(stops[0].color.trim());
  const fn = `${model.repeating ? 'repeating-' : ''}${model.type}-gradient`;
  return `${fn}(${prelude(model)}, ${parts.join(', ')})`;
}

/**
 * Ready-to-paste CSS: a solid `background-color` fallback (first visible stop)
 * unless `fallback` is false, then `background-image`.
 */
export function toCssDeclaration(
  model: GradientModel,
  options: { fallback?: boolean; isColor?: ColorCheck } = {}
): string {
  const isColor = options.isColor ?? isProbablyColor;
  const css = toCss(model, isColor);
  if (!css) return '';
  const lines: string[] = [];
  if (options.fallback !== false) lines.push(`background-color: ${stopList(model.stops, isColor)[0].color.trim()};`);
  lines.push(`background-image: ${css};`);
  return lines.join('\n');
}

// ---------- defaults, presets, storage ----------

export function defaultModel(): GradientModel {
  return {
    type: 'linear',
    repeating: false,
    angle: 135,
    shape: 'circle',
    size: 'farthest-corner',
    position: { x: 50, y: 50 },
    from: 0,
    stops: [makeStop('#6a4bf0', 0), makeStop('#d6ff3d', 100)]
  };
}

export interface GradientPreset {
  name: string;
  model: Omit<GradientModel, 'stops'> & { stops: { color: string; position: number | null }[] };
}

const BASE = {
  repeating: false,
  angle: 90,
  shape: 'circle' as RadialShape,
  size: 'farthest-corner' as RadialSize,
  position: { x: 50, y: 50 },
  from: 0
};

export const PRESETS: readonly GradientPreset[] = [
  {
    name: 'Sunset',
    model: { ...BASE, type: 'linear', angle: 45, stops: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 100 }] }
  },
  {
    name: 'Ocean',
    model: { ...BASE, type: 'linear', angle: 135, stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] }
  },
  {
    name: 'Forest',
    model: { ...BASE, type: 'linear', angle: 90, stops: [{ color: '#38ef7d', position: 0 }, { color: '#11998e', position: 100 }] }
  },
  {
    name: 'Fire',
    model: {
      ...BASE,
      type: 'radial',
      shape: 'circle',
      stops: [{ color: '#f5af19', position: 0 }, { color: '#f12711', position: 100 }]
    }
  },
  {
    name: 'Spotlight',
    model: {
      ...BASE,
      type: 'radial',
      shape: 'ellipse',
      size: 'closest-corner',
      position: { x: 30, y: 25 },
      stops: [{ color: '#ffffffcc', position: 0 }, { color: '#3a2391', position: 60 }, { color: '#09070f', position: 100 }]
    }
  },
  {
    name: 'Spectrum',
    model: {
      ...BASE,
      type: 'conic',
      stops: [
        { color: '#ff0000', position: null },
        { color: '#ffff00', position: null },
        { color: '#00ff00', position: null },
        { color: '#00ffff', position: null },
        { color: '#0000ff', position: null },
        { color: '#ff00ff', position: null },
        { color: '#ff0000', position: null }
      ]
    }
  },
  {
    name: 'Pie',
    model: {
      ...BASE,
      type: 'conic',
      from: 45,
      stops: [
        { color: '#9b6bff', position: 0 },
        { color: '#9b6bff', position: 33 },
        { color: '#d6ff3d', position: 33 },
        { color: '#d6ff3d', position: 66 },
        { color: '#3ccf7a', position: 66 },
        { color: '#3ccf7a', position: 100 }
      ]
    }
  },
  {
    name: 'Stripes',
    model: {
      ...BASE,
      type: 'linear',
      repeating: true,
      angle: 45,
      stops: [
        { color: '#241838', position: 0 },
        { color: '#241838', position: 10 },
        { color: '#c3b0ff', position: 10 },
        { color: '#c3b0ff', position: 20 }
      ]
    }
  }
];

/** A fresh, editable model from a preset (new stop ids every time). */
export function presetModel(preset: GradientPreset): GradientModel {
  const m = preset.model;
  return {
    ...m,
    position: { ...m.position },
    stops: m.stops.map(s => makeStop(s.color, s.position))
  };
}

function num(v: unknown, fallback: number, min: number, max: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? clamp(v, min, max) : fallback;
}

/** Validate a stored/hand-edited model field by field; anything unusable falls back to the default. */
export function normalizeModel(raw: unknown): GradientModel {
  const d = defaultModel();
  if (!raw || typeof raw !== 'object') return d;
  const r = raw as Record<string, unknown>;
  const pos = (r.position && typeof r.position === 'object' ? r.position : {}) as Record<string, unknown>;
  const stops = Array.isArray(r.stops)
    ? r.stops
        .filter((s): s is Record<string, unknown> => !!s && typeof s === 'object' && typeof (s as Record<string, unknown>).color === 'string')
        .map(s =>
          makeStop(
            String(s.color).slice(0, 100),
            typeof s.position === 'number' && Number.isFinite(s.position) ? clamp(s.position, 0, 100) : null
          )
        )
        .slice(0, 32)
    : [];
  return {
    type: GRADIENT_TYPES.includes(r.type as GradientType) ? (r.type as GradientType) : d.type,
    repeating: typeof r.repeating === 'boolean' ? r.repeating : d.repeating,
    angle: num(r.angle, d.angle, 0, 360),
    shape: RADIAL_SHAPES.includes(r.shape as RadialShape) ? (r.shape as RadialShape) : d.shape,
    size: RADIAL_SIZES.includes(r.size as RadialSize) ? (r.size as RadialSize) : d.size,
    position: { x: num(pos.x, 50, 0, 100), y: num(pos.y, 50, 0, 100) },
    from: num(r.from, d.from, 0, 360),
    stops: stops.length >= 2 ? stops : d.stops
  };
}
