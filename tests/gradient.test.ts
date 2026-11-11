import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addStop,
  applyPickerColor,
  defaultModel,
  distributeEvenly,
  getAlpha,
  isProbablyColor,
  makeStop,
  normalizeModel,
  PRESETS,
  presetModel,
  removeStop,
  resolvedPositions,
  reverseStops,
  sortStops,
  toCss,
  toCssDeclaration,
  toPickerHex,
  withAlpha,
  type GradientModel
} from '../src/lib/tools/gradient.ts';

function model(over: Partial<GradientModel> = {}): GradientModel {
  return {
    type: 'linear',
    repeating: false,
    angle: 90,
    shape: 'circle',
    size: 'farthest-corner',
    position: { x: 50, y: 50 },
    from: 0,
    stops: [makeStop('#ff0000', 0), makeStop('#0000ff', 100)],
    ...over
  };
}

/** Rough syntax check: known function, balanced parens, prelude matches the type, ≥2 stops. */
function looksValid(css: string): boolean {
  const m = /^(repeating-)?(linear|radial|conic)-gradient\((.*)\)$/.exec(css);
  if (!m) return false;
  const [, , type, body] = m;
  const args = body.split(/,(?![^(]*\))/).map(s => s.trim());
  const first = args[0];
  if (type === 'linear' && !/^-?\d+(\.\d+)?deg$/.test(first)) return false;
  if (type === 'radial' && !/^(circle|ellipse) (closest|farthest)-(side|corner) at \d+(\.\d+)?% \d+(\.\d+)?%$/.test(first)) return false;
  if (type === 'conic' && !/^from \d+(\.\d+)?deg at \d+(\.\d+)?% \d+(\.\d+)?%$/.test(first)) return false;
  return args.length >= 3;
}

test('toCss: linear', () => {
  assert.equal(toCss(model()), 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)');
});

test('toCss: radial with shape, size and position', () => {
  assert.equal(
    toCss(model({ type: 'radial', shape: 'ellipse', size: 'closest-side', position: { x: 20, y: 75 } })),
    'radial-gradient(ellipse closest-side at 20% 75%, #ff0000 0%, #0000ff 100%)'
  );
});

test('toCss: conic uses from-angle and position (not linear)', () => {
  assert.equal(
    toCss(model({ type: 'conic', from: 45, position: { x: 30, y: 40 } })),
    'conic-gradient(from 45deg at 30% 40%, #ff0000 0%, #0000ff 100%)'
  );
});

test('toCss: repeating prefix for every type', () => {
  assert.match(toCss(model({ repeating: true })), /^repeating-linear-gradient\(90deg, /);
  assert.equal(
    toCss(model({ type: 'radial', repeating: true })),
    'repeating-radial-gradient(circle farthest-corner at 50% 50%, #ff0000 0%, #0000ff 100%)'
  );
  assert.match(toCss(model({ type: 'conic', repeating: true })), /^repeating-conic-gradient\(from 0deg at 50% 50%, /);
});

test('switching type keeps valid syntax: linear 90deg → radial', () => {
  const m = model({ angle: 90 });
  m.type = 'radial';
  const css = toCss(m);
  assert.ok(!css.includes('90deg'), css);
  assert.ok(looksValid(css), css);
  assert.equal(css, 'radial-gradient(circle farthest-corner at 50% 50%, #ff0000 0%, #0000ff 100%)');
});

test('switching type keeps valid syntax: Fire (radial circle) preset → linear', () => {
  const fire = PRESETS.find(p => p.name === 'Fire');
  assert.ok(fire);
  const m = presetModel(fire);
  assert.equal(m.type, 'radial');
  m.type = 'linear';
  const css = toCss(m);
  assert.ok(!css.includes('circle'), css);
  assert.ok(looksValid(css), css);
  m.type = 'conic';
  assert.ok(looksValid(toCss(m)), toCss(m));
});

test('stops without positions are emitted bare; mixed positions keep explicit ones', () => {
  const m = model({ stops: [makeStop('red', null), makeStop('lime', null), makeStop('blue', null)] });
  assert.equal(toCss(m), 'linear-gradient(90deg, red, lime, blue)');
  m.stops[1].position = 30;
  assert.equal(toCss(m), 'linear-gradient(90deg, red, lime 30%, blue)');
});

test('toCss: stops are output in position order without reordering the model', () => {
  const m = model({ stops: [makeStop('#000', 80), makeStop('#fff', 10)] });
  assert.equal(toCss(m), 'linear-gradient(90deg, #fff 10%, #000 80%)');
  assert.equal(m.stops[0].color, '#000');
});

test('toCss: invalid stops are skipped instead of breaking the gradient', () => {
  const m = model({ stops: [makeStop('#ff0000', 0), makeStop('nope', 50), makeStop('#0000ff', 100)] });
  assert.equal(toCss(m), 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)');
  m.stops = [makeStop('#ff0000', 0), makeStop('###', 100)];
  assert.equal(toCss(m), 'linear-gradient(90deg, #ff0000 0%, #ff0000)');
  m.stops = [makeStop('x', 0), makeStop('y', 100)];
  assert.equal(toCss(m), '');
  assert.equal(toCssDeclaration(m), '');
});

test('toCss: custom color check is used', () => {
  const m = model({ stops: [makeStop('#ff0000', 0), makeStop('#0000ff', 100)] });
  assert.equal(toCss(m, v => v !== '#0000ff'), 'linear-gradient(90deg, #ff0000 0%, #ff0000)');
});

test('toCssDeclaration: fallback color first, optional', () => {
  const m = model();
  assert.equal(
    toCssDeclaration(m),
    'background-color: #ff0000;\nbackground-image: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);'
  );
  assert.equal(toCssDeclaration(m, { fallback: false }), 'background-image: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);');
});

test('resolvedPositions follows CSS fix-up rules', () => {
  const s = (p: number | null) => makeStop('#000', p);
  assert.deepEqual(resolvedPositions([s(null), s(null), s(null)]), [0, 50, 100]);
  assert.deepEqual(resolvedPositions([s(null), s(40), s(null), s(null)]), [0, 40, 70, 100]);
  assert.deepEqual(resolvedPositions([s(50), s(20)]), [50, 50]);
});

test('sortStops is stable and uses auto positions', () => {
  const a = makeStop('a', 50);
  const b = makeStop('b', 50);
  const c = makeStop('c', 10);
  assert.deepEqual(sortStops([a, b, c]).map(s => s.color), ['c', 'a', 'b']);
});

test('distributeEvenly spreads stops from 0 to 100', () => {
  const stops = [makeStop('a', 90), makeStop('b', 5), makeStop('c', null), makeStop('d', 100)];
  const out = distributeEvenly(stops);
  assert.deepEqual(out.map(s => s.position), [0, 33.33, 66.67, 100]);
  assert.deepEqual(out.map(s => s.color), ['b', 'a', 'c', 'd']);
  assert.equal(new Set(out.map(s => s.id)).size, 4);
});

test('reverseStops mirrors positions and order', () => {
  const out = reverseStops([makeStop('a', 0), makeStop('b', 30), makeStop('c', null)]);
  assert.deepEqual(out.map(s => [s.color, s.position]), [['c', null], ['b', 70], ['a', 100]]);
});

test('removeStop keeps a minimum of two stops', () => {
  const stops = [makeStop('a', 0), makeStop('b', 50), makeStop('c', 100)];
  const two = removeStop(stops, stops[1].id);
  assert.deepEqual(two.map(s => s.color), ['a', 'c']);
  assert.equal(removeStop(two, two[0].id).length, 2);
});

test('addStop fills the widest gap with a mixed color and a new id', () => {
  const stops = [makeStop('#000000', 0), makeStop('#ffffff', 20), makeStop('#ffffff', 100)];
  const out = addStop(stops);
  assert.equal(out.length, 4);
  assert.equal(out[2].position, 60);
  assert.equal(out[2].color, '#ffffff');
  const two = addStop([makeStop('#000000', 0), makeStop('#ffffff', 100)]);
  assert.equal(two[1].position, 50);
  assert.equal(two[1].color, '#808080');
  assert.equal(new Set(out.map(s => s.id)).size, 4);
});

test('presets produce valid-looking CSS, including radial and conic ones', () => {
  assert.ok(PRESETS.length >= 6 && PRESETS.length <= 8);
  assert.ok(PRESETS.some(p => p.model.type === 'radial'));
  assert.ok(PRESETS.some(p => p.model.type === 'conic'));
  for (const p of PRESETS) {
    const css = toCss(presetModel(p));
    assert.ok(looksValid(css), `${p.name}: ${css}`);
    assert.ok(p.model.stops.every(s => isProbablyColor(s.color)), p.name);
  }
});

test('presetModel gives fresh ids each time', () => {
  const a = presetModel(PRESETS[0]);
  const b = presetModel(PRESETS[0]);
  assert.notEqual(a.stops[0].id, b.stops[0].id);
});

test('isProbablyColor accepts common color syntaxes', () => {
  for (const v of [
    '#fff',
    '#ffff',
    '#ff0000',
    '#ff000080',
    'red',
    'RebeccaPurple',
    'transparent',
    'rgb(255, 0, 0)',
    'rgba(255,0,0,0.5)',
    'rgb(255 0 0 / 50%)',
    'hsl(120deg 50% 50%)',
    'hsla(120, 50%, 50%, .3)',
    'oklch(70% 0.1 250)',
    'oklch(0.7 0.1 250 / 0.5)'
  ]) {
    assert.ok(isProbablyColor(v), v);
  }
});

test('isProbablyColor rejects junk', () => {
  for (const v of ['', 'ff0000', '#ff000', '#gggggg', '#1234567', 'redd', 'rgb(1,2)', 'rgb(a, b, c)', 'rgb(1,2,3', 'url(x)', 'red;']) {
    assert.ok(!isProbablyColor(v), v);
  }
});

test('alpha helpers', () => {
  assert.equal(getAlpha('#ff000080'), 128 / 255);
  assert.equal(getAlpha('rgb(0 0 0 / 25%)'), 0.25);
  assert.equal(getAlpha('rgba(0,0,0,0.5)'), 0.5);
  assert.equal(getAlpha('red'), 1);
  assert.equal(withAlpha('#ff0000', 1), '#ff0000');
  assert.equal(withAlpha('#f00', 0.5), '#ff000080');
  assert.equal(applyPickerColor('#00000080', '#123456'), '#12345680');
  assert.equal(applyPickerColor('#000', '#123456'), '#123456');
  assert.equal(toPickerHex('#abc'), '#aabbcc');
  assert.equal(toPickerHex('rgb(255, 0, 128)'), '#ff0080');
  assert.equal(toPickerHex('red'), null);
});

test('normalizeModel validates stored data', () => {
  assert.deepEqual(Object.keys(normalizeModel(null)), Object.keys(defaultModel()));
  const m = normalizeModel({
    type: 'conic',
    repeating: true,
    angle: 999,
    shape: 'blob',
    position: { x: 10, y: 'x' },
    from: 30,
    stops: [{ color: '#000', position: 10 }, { color: '#fff', position: null }, { nope: 1 }]
  });
  assert.equal(m.type, 'conic');
  assert.equal(m.repeating, true);
  assert.equal(m.angle, 360);
  assert.equal(m.shape, 'circle');
  assert.deepEqual(m.position, { x: 10, y: 50 });
  assert.deepEqual(m.stops.map(s => [s.color, s.position]), [['#000', 10], ['#fff', null]]);
  assert.equal(normalizeModel({ stops: [{ color: '#000' }] }).stops.length, 2);
});
