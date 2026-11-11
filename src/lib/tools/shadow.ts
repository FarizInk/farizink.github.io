// CSS shadow builder — pure logic for the CSS Shadow Generator tool.
// Self-contained (no relative imports) so `node --test` can load it directly.
//
// Colors are stored as normalized `#rrggbb` plus a separate opacity (0–100).
// Output uses the comma form `rgba(r, g, b, a)`: it is valid in every browser
// that supports box-shadow/text-shadow, so the copied CSS works anywhere, and
// the alpha is always well-formed (no more `#00033` or `red33`).

export type ShadowKind = 'box' | 'text';

export interface ShadowLayer {
  id: number;
  x: number;
  y: number;
  blur: number;
  /** Box only — ignored for text-shadow. */
  spread: number;
  /** Normalized `#rrggbb`. */
  color: string;
  /** 0–100. */
  opacity: number;
  /** Box only — ignored for text-shadow. */
  inset: boolean;
  enabled: boolean;
}

export interface ShadowModel {
  kind: ShadowKind;
  layers: ShadowLayer[];
}

export const LIMITS = {
  offset: { min: -100, max: 100 },
  blur: { min: 0, max: 200 },
  spread: { min: -100, max: 100 },
  opacity: { min: 0, max: 100 }
} as const;

/** `#abc`, `abc`, `#aabbcc`, `aabbcc` → `#aabbcc` (lowercase); anything else → null. */
export function parseHexColor(input: string): string | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return null;
  let hex = m[1].toLowerCase();
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  return `#${hex}`;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) n = 0;
  return Math.min(max, Math.max(min, n));
}

function px(n: number): string {
  return n === 0 ? '0' : `${n}px`;
}

/** `#rrggbb` + opacity → `rgba(r, g, b, a)`; invalid colors fall back to black. */
export function toRgba(color: string, opacity: number): string {
  const hex = parseHexColor(color) ?? '#000000';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = Math.round(clamp(opacity, 0, 100)) / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** One layer's value, e.g. `inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)`. */
export function layerToCss(layer: ShadowLayer, kind: ShadowKind): string {
  const parts: string[] = [];
  if (kind === 'box' && layer.inset) parts.push('inset');
  parts.push(px(layer.x), px(layer.y), px(Math.max(0, layer.blur)));
  if (kind === 'box') parts.push(px(layer.spread));
  parts.push(toRgba(layer.color, layer.opacity));
  return parts.join(' ');
}

/** The property value only (`none` when no layer is enabled). */
export function toCssValue(model: ShadowModel): string {
  const on = model.layers.filter(l => l.enabled);
  return on.length ? on.map(l => layerToCss(l, model.kind)).join(', ') : 'none';
}

export function propertyName(kind: ShadowKind): string {
  return kind === 'box' ? 'box-shadow' : 'text-shadow';
}

/** Full declaration, layers on their own lines when there are several. */
export function toCss(model: ShadowModel): string {
  const on = model.layers.filter(l => l.enabled);
  const prop = propertyName(model.kind);
  if (on.length <= 1) return `${prop}: ${toCssValue(model)};`;
  return `${prop}:\n  ${on.map(l => layerToCss(l, model.kind)).join(',\n  ')};`;
}

// ---- layer list operations (all return a new model) ----

function nextId(model: ShadowModel): number {
  return model.layers.reduce((max, l) => Math.max(max, l.id), 0) + 1;
}

export function defaultLayer(kind: ShadowKind, id = 1): ShadowLayer {
  return kind === 'box'
    ? { id, x: 0, y: 4, blur: 12, spread: 0, color: '#000000', opacity: 20, inset: false, enabled: true }
    : { id, x: 2, y: 2, blur: 4, spread: 0, color: '#000000', opacity: 50, inset: false, enabled: true };
}

export function addLayer(model: ShadowModel): ShadowModel {
  return { ...model, layers: [...model.layers, defaultLayer(model.kind, nextId(model))] };
}

/** Removes a layer but always keeps at least one. */
export function removeLayer(model: ShadowModel, id: number): ShadowModel {
  if (model.layers.length <= 1) return model;
  return { ...model, layers: model.layers.filter(l => l.id !== id) };
}

/** Inserts a copy right after the original. */
export function duplicateLayer(model: ShadowModel, id: number): ShadowModel {
  const i = model.layers.findIndex(l => l.id === id);
  if (i < 0) return model;
  const copy = { ...model.layers[i], id: nextId(model) };
  const layers = [...model.layers];
  layers.splice(i + 1, 0, copy);
  return { ...model, layers };
}

/** Moves a layer one step up (-1) or down (+1); no-op at the ends. */
export function moveLayer(model: ShadowModel, id: number, dir: -1 | 1): ShadowModel {
  const i = model.layers.findIndex(l => l.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= model.layers.length) return model;
  const layers = [...model.layers];
  [layers[i], layers[j]] = [layers[j], layers[i]];
  return { ...model, layers };
}

/** Sanitizes untrusted data (e.g. from localStorage) into a valid model. */
export function normalizeModel(raw: unknown, fallbackKind: ShadowKind = 'box'): ShadowModel {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const kind: ShadowKind = obj.kind === 'text' || obj.kind === 'box' ? obj.kind : fallbackKind;
  const list = Array.isArray(obj.layers) ? obj.layers : [];
  const seen = new Set<number>();
  const layers: ShadowLayer[] = [];
  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const l = item as Record<string, unknown>;
    const num = (v: unknown, lo: number, hi: number, d: number) =>
      typeof v === 'number' && Number.isFinite(v) ? clamp(Math.round(v), lo, hi) : d;
    let id = typeof l.id === 'number' && Number.isInteger(l.id) && l.id > 0 ? l.id : 0;
    if (!id || seen.has(id)) id = Math.max(0, ...seen) + 1;
    seen.add(id);
    layers.push({
      id,
      x: num(l.x, LIMITS.offset.min, LIMITS.offset.max, 0),
      y: num(l.y, LIMITS.offset.min, LIMITS.offset.max, 0),
      blur: num(l.blur, LIMITS.blur.min, LIMITS.blur.max, 0),
      spread: num(l.spread, LIMITS.spread.min, LIMITS.spread.max, 0),
      color: typeof l.color === 'string' ? (parseHexColor(l.color) ?? '#000000') : '#000000',
      opacity: num(l.opacity, 0, 100, 100),
      inset: l.inset === true,
      enabled: l.enabled !== false
    });
  }
  if (!layers.length) layers.push(defaultLayer(kind));
  return { kind, layers };
}

// ---- presets ----

export interface ShadowPreset {
  name: string;
  kind: ShadowKind;
  /** Suggested preview colors (output data, not UI chrome). */
  preview?: { background: string; foreground: string };
  layers: Omit<ShadowLayer, 'id' | 'enabled'>[];
}

const L = (
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number,
  inset = false
): Omit<ShadowLayer, 'id' | 'enabled'> => ({ x, y, blur, spread, color, opacity, inset });

const LIGHT = { background: '#f1f5f9', foreground: '#ffffff' };

export const PRESETS: ShadowPreset[] = [
  { name: 'Soft', kind: 'box', preview: LIGHT, layers: [L(0, 1, 3, 0, '#000000', 10), L(0, 1, 2, -1, '#000000', 10)] },
  { name: 'Medium', kind: 'box', preview: LIGHT, layers: [L(0, 4, 6, -1, '#000000', 10), L(0, 2, 4, -2, '#000000', 10)] },
  { name: 'Elevated', kind: 'box', preview: LIGHT, layers: [L(0, 20, 25, -5, '#000000', 10), L(0, 8, 10, -6, '#000000', 10)] },
  { name: 'Inset', kind: 'box', preview: LIGHT, layers: [L(0, 2, 4, 0, '#000000', 15, true)] },
  {
    name: 'Smooth',
    kind: 'box',
    preview: LIGHT,
    layers: [
      L(0, 1, 1, 0, '#000000', 8),
      L(0, 2, 2, 0, '#000000', 8),
      L(0, 4, 4, 0, '#000000', 8),
      L(0, 8, 8, 0, '#000000', 8),
      L(0, 16, 16, 0, '#000000', 8)
    ]
  },
  { name: 'Glow', kind: 'box', preview: { background: '#0f0a1e', foreground: '#1e1633' }, layers: [L(0, 0, 24, 4, '#9b6bff', 60)] },
  { name: 'Soft text', kind: 'text', preview: { background: '#ffffff', foreground: '#1f2937' }, layers: [L(1, 2, 4, 0, '#000000', 25)] },
  {
    name: 'Neon',
    kind: 'text',
    preview: { background: '#0b0714', foreground: '#ffffff' },
    layers: [L(0, 0, 4, 0, '#ffffff', 90), L(0, 0, 10, 0, '#ff2bd6', 90), L(0, 0, 20, 0, '#ff2bd6', 80), L(0, 0, 40, 0, '#ff2bd6', 60)]
  },
  {
    name: 'Outline',
    kind: 'text',
    preview: { background: '#ffffff', foreground: '#ffffff' },
    layers: [L(-1, -1, 0, 0, '#111111', 100), L(1, -1, 0, 0, '#111111', 100), L(-1, 1, 0, 0, '#111111', 100), L(1, 1, 0, 0, '#111111', 100)]
  },
  {
    name: 'Retro',
    kind: 'text',
    preview: { background: '#fff4d6', foreground: '#f25c54' },
    layers: [L(3, 3, 0, 0, '#2b2d42', 100), L(6, 6, 0, 0, '#43aa8b', 100)]
  }
];

export function presetsFor(kind: ShadowKind): ShadowPreset[] {
  return PRESETS.filter(p => p.kind === kind);
}

export function presetModel(preset: ShadowPreset): ShadowModel {
  return {
    kind: preset.kind,
    layers: preset.layers.map((l, i) => ({ ...l, id: i + 1, enabled: true }))
  };
}
