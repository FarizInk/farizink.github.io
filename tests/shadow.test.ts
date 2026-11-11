import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseHexColor,
  toRgba,
  layerToCss,
  toCss,
  toCssValue,
  addLayer,
  removeLayer,
  duplicateLayer,
  moveLayer,
  normalizeModel,
  defaultLayer,
  PRESETS,
  presetModel,
  type ShadowLayer,
  type ShadowModel
} from '../src/lib/tools/shadow.ts';

const layer = (o: Partial<ShadowLayer> = {}): ShadowLayer => ({ ...defaultLayer('box'), ...o });
const RGBA = /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0?\.\d+)\)$/;

test('parseHexColor normalizes 3/6 digits with or without #', () => {
  assert.equal(parseHexColor('#000'), '#000000');
  assert.equal(parseHexColor('fA0'), '#ffaa00');
  assert.equal(parseHexColor(' #1E90ff '), '#1e90ff');
  assert.equal(parseHexColor('123456'), '#123456');
});

test('parseHexColor rejects invalid colors', () => {
  for (const bad of ['', 'red', '#00033', '#12345g', '#1234', 'rgb(0,0,0)']) {
    assert.equal(parseHexColor(bad), null, bad);
  }
});

test('#000 at 20% becomes a valid rgba with alpha 0.2', () => {
  const rgba = toRgba('#000', 20);
  assert.equal(rgba, 'rgba(0, 0, 0, 0.2)');
  assert.match(rgba, RGBA);
  assert.equal(toRgba('#ff8000', 100), 'rgba(255, 128, 0, 1)');
  assert.equal(toRgba('#ff8000', 0), 'rgba(255, 128, 0, 0)');
});

test('invalid color falls back to black, opacity is clamped', () => {
  assert.equal(toRgba('red', 50), 'rgba(0, 0, 0, 0.5)');
  assert.equal(toRgba('#fff', 250), 'rgba(255, 255, 255, 1)');
});

test('inset and spread only appear for box shadows', () => {
  const l = layer({ x: 2, y: 3, blur: 4, spread: 5, inset: true, color: '#000000', opacity: 20 });
  assert.equal(layerToCss(l, 'box'), 'inset 2px 3px 4px 5px rgba(0, 0, 0, 0.2)');
  assert.equal(layerToCss(l, 'text'), '2px 3px 4px rgba(0, 0, 0, 0.2)');
});

test('toCss joins enabled layers and skips disabled ones', () => {
  const m: ShadowModel = {
    kind: 'box',
    layers: [
      layer({ id: 1, x: 1, y: 1, blur: 0, spread: 0, opacity: 10 }),
      layer({ id: 2, x: 9, y: 9, blur: 9, spread: 9, enabled: false }),
      layer({ id: 3, x: 0, y: 2, blur: 4, spread: -1, opacity: 30 })
    ]
  };
  assert.equal(toCssValue(m), '1px 1px 0 0 rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.3)');
  assert.equal(toCss(m), 'box-shadow:\n  1px 1px 0 0 rgba(0, 0, 0, 0.1),\n  0 2px 4px -1px rgba(0, 0, 0, 0.3);');
  assert.equal(toCss({ kind: 'text', layers: [m.layers[0]] }), 'text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);');
});

test('none when all layers are disabled', () => {
  const m: ShadowModel = { kind: 'text', layers: [layer({ enabled: false })] };
  assert.equal(toCss(m), 'text-shadow: none;');
  assert.equal(toCss({ ...m, kind: 'box' }), 'box-shadow: none;');
});

test('moveLayer reorders and is a no-op at the ends', () => {
  let m: ShadowModel = { kind: 'box', layers: [layer({ id: 1 }), layer({ id: 2 }), layer({ id: 3 })] };
  m = moveLayer(m, 3, -1);
  assert.deepEqual(m.layers.map(l => l.id), [1, 3, 2]);
  m = moveLayer(m, 1, 1);
  assert.deepEqual(m.layers.map(l => l.id), [3, 1, 2]);
  assert.deepEqual(moveLayer(m, 3, -1).layers.map(l => l.id), [3, 1, 2]);
  assert.deepEqual(moveLayer(m, 2, 1).layers.map(l => l.id), [3, 1, 2]);
});

test('add, duplicate and remove keep ids unique and at least one layer', () => {
  let m: ShadowModel = { kind: 'box', layers: [layer({ id: 1, x: 7 })] };
  m = addLayer(m);
  assert.deepEqual(m.layers.map(l => l.id), [1, 2]);
  m = duplicateLayer(m, 1);
  assert.deepEqual(m.layers.map(l => l.id), [1, 3, 2]);
  assert.equal(m.layers[1].x, 7);
  m = removeLayer(removeLayer(m, 1), 3);
  assert.deepEqual(m.layers.map(l => l.id), [2]);
  assert.equal(removeLayer(m, 2).layers.length, 1);
});

test('normalizeModel sanitizes stored data', () => {
  const m = normalizeModel({ kind: 'text', layers: [{ id: 1, x: 999, color: 'nope', opacity: -5 }, { id: 1 }, 'junk'] });
  assert.equal(m.kind, 'text');
  assert.equal(m.layers.length, 2);
  assert.equal(m.layers[0].x, 100);
  assert.equal(m.layers[0].color, '#000000');
  assert.equal(m.layers[0].opacity, 0);
  assert.notEqual(m.layers[0].id, m.layers[1].id);
  assert.equal(normalizeModel(null).layers.length, 1);
  assert.equal(normalizeModel('garbage', 'text').kind, 'text');
});

test('presets exist for both kinds and produce valid-looking CSS', () => {
  assert.ok(PRESETS.some(p => p.kind === 'box'));
  assert.ok(PRESETS.some(p => p.kind === 'text'));
  const layerRe = /^(inset )?(-?\d+px|0)( (-?\d+px|0)){2,3} rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0?\.\d+)\)$/;
  for (const p of PRESETS) {
    const m = presetModel(p);
    const css = toCss(m);
    const prop = p.kind === 'box' ? 'box-shadow' : 'text-shadow';
    assert.ok(css.startsWith(`${prop}:`), p.name);
    assert.ok(css.endsWith(';'), p.name);
    for (const part of m.layers.map(l => layerToCss(l, p.kind))) {
      assert.match(part, layerRe, `${p.name}: ${part}`);
      if (p.kind === 'text') assert.ok(!part.includes('inset'), p.name);
    }
    assert.equal(new Set(m.layers.map(l => l.id)).size, m.layers.length);
  }
});
