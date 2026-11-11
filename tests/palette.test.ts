import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseHex,
  hexToOklch,
  oklchToHex,
  harmony,
  harmonyOffsets,
  shadeScale,
  SHADE_STEPS,
  toCssVariables,
  toTailwindTheme,
  toTailwindConfig,
  toJson,
  slugName,
  bestTextColor,
  randomHex,
  HARMONIES
} from '../src/lib/tools/palette.ts';

const BASE = '#3b82f6';
const HEX = /^#[0-9a-f]{6}$/;

function hueDiff(a: number, b: number): number {
  return ((((a - b) % 360) + 540) % 360) - 180;
}

test('parseHex: accepts 3/6 digits with or without #, normalizes to lowercase #rrggbb', () => {
  assert.equal(parseHex('#3B82F6'), '#3b82f6');
  assert.equal(parseHex('3b82f6'), '#3b82f6');
  assert.equal(parseHex('#3b8'), '#33bb88');
  assert.equal(parseHex('FFF'), '#ffffff');
  assert.equal(parseHex('  #abc  '), '#aabbcc');
});

test('parseHex: invalid input gives null, never black', () => {
  for (const bad of ['', '#', '#3b', '#3b82', '#3b82f', '#3b82f6a', 'zzz', 'red', '#ggg', '##fff']) {
    assert.equal(parseHex(bad), null, bad);
  }
});

test('oklch round trip keeps in-gamut colors', () => {
  for (const hex of ['#3b82f6', '#000000', '#ffffff', '#ff0000', '#808080', '#d6ff3d']) {
    assert.equal(oklchToHex(hexToOklch(hex)), hex);
  }
});

test('oklchToHex clips out-of-gamut colors by reducing chroma, keeping lightness', () => {
  const hex = oklchToHex({ l: 0.7, c: 0.5, h: 150 });
  assert.match(hex, HEX);
  const back = hexToOklch(hex);
  assert.ok(Math.abs(back.l - 0.7) < 0.01);
  assert.ok(back.c < 0.5);
  assert.ok(Math.abs(hueDiff(back.h, 150)) < 3);
});

for (const type of ['complementary', 'analogous', 'triadic', 'split-complementary', 'tetradic'] as const) {
  test(`harmony ${type}: base first, expected hue offsets, same lightness`, () => {
    const sw = harmony('3B82F6', type);
    const offsets = harmonyOffsets(type);
    assert.equal(sw.length, offsets.length);
    assert.equal(sw[0].hex, BASE);
    assert.equal(sw[0].isBase, true);
    assert.equal(sw.filter(s => s.isBase).length, 1);
    const base = hexToOklch(BASE);
    sw.forEach((s, i) => {
      assert.match(s.hex, HEX);
      const c = hexToOklch(s.hex);
      assert.ok(Math.abs(hueDiff(c.h, base.h + offsets[i])) < 3, `${s.name}: hue ${c.h}`);
      assert.ok(Math.abs(c.l - base.l) < 0.01, `${s.name}: lightness ${c.l}`);
    });
  });
}

test('harmony offsets match their names', () => {
  assert.deepEqual(harmonyOffsets('complementary'), [0, 180]);
  assert.deepEqual(harmonyOffsets('analogous'), [0, -30, 30]);
  assert.deepEqual(harmonyOffsets('triadic'), [0, 120, 240]);
  assert.deepEqual(harmonyOffsets('split-complementary'), [0, 150, 210]);
  assert.deepEqual(harmonyOffsets('tetradic'), [0, 90, 180, 270]);
  assert.equal(HARMONIES.length, 6);
});

test('monochromatic: includes the exact base, same hue, light to dark', () => {
  for (const hex of [BASE, '#fef3c7', '#1e1b4b', '#808080']) {
    const sw = harmony(hex, 'monochromatic');
    assert.ok(sw.length >= 5);
    assert.equal(sw.filter(s => s.isBase && s.hex === hex).length, 1, hex);
    const ls = sw.map(s => hexToOklch(s.hex).l);
    for (let i = 1; i < ls.length; i++) assert.ok(ls[i] < ls[i - 1], `${hex} step ${i}`);
  }
});

test('shadeScale: 11 named steps, valid hex, strictly darker, contains base', () => {
  for (const hex of [BASE, '#ef4444', '#d6ff3d', '#111111', '#fafafa', '#000000', '#ffffff', '#6a4bf0']) {
    const scale = shadeScale(hex);
    assert.deepEqual(scale.steps.map(s => s.step), SHADE_STEPS);
    assert.deepEqual(SHADE_STEPS, [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);
    scale.steps.forEach(s => assert.match(s.hex, HEX));
    for (let i = 1; i < scale.steps.length; i++) {
      assert.ok(scale.steps[i].l < scale.steps[i - 1].l, `${hex}: ${scale.steps[i].step}`);
    }
    const based = scale.steps.filter(s => s.isBase);
    assert.equal(based.length, 1);
    assert.equal(based[0].hex, hex);
    assert.equal(based[0].step, scale.baseStep);
  }
});

test('shadeScale: lightness spans ~97% to ~16% and base lands on a sensible step', () => {
  const scale = shadeScale(BASE); // L ≈ 0.62 → 500
  assert.equal(scale.baseStep, 500);
  assert.ok(scale.steps[0].l > 0.95);
  assert.ok(scale.steps[10].l < 0.2);
  assert.equal(shadeScale('#ffffff').baseStep, 50);
  assert.equal(shadeScale('#000000').baseStep, 950);
});

test('shadeScale: chroma eases toward the ends', () => {
  const scale = shadeScale(BASE);
  const c = scale.steps.map(s => hexToOklch(s.hex).c);
  const base = hexToOklch(BASE).c;
  assert.ok(c[0] < base * 0.5);
  assert.ok(c[10] < base);
});

test('slugName sanitizes and falls back to brand', () => {
  assert.equal(slugName('My Brand!'), 'my-brand');
  assert.equal(slugName('   '), 'brand');
  assert.equal(slugName('primary'), 'primary');
});

test('toCssVariables', () => {
  const css = toCssVariables('brand', shadeScale(BASE));
  assert.ok(css.startsWith(':root {\n'));
  assert.ok(css.endsWith('\n}'));
  assert.match(css, /^ {2}--brand-50: #[0-9a-f]{6};$/m);
  assert.match(css, /^ {2}--brand-500: #3b82f6;$/m);
  assert.equal(css.match(/--brand-\d+:/g)?.length, 11);
});

test('toTailwindTheme (v4)', () => {
  const css = toTailwindTheme('Ocean Blue', shadeScale(BASE));
  assert.ok(css.startsWith('@theme {\n'));
  assert.match(css, /^ {2}--color-ocean-blue-500: #3b82f6;$/m);
  assert.equal(css.match(/--color-ocean-blue-\d+:/g)?.length, 11);
});

test('toTailwindConfig (v3) evaluates to the expected object', () => {
  const scale = shadeScale(BASE);
  const src = toTailwindConfig('brand', scale);
  assert.match(src, /module\.exports = \{/);
  const module = { exports: {} as { theme: { extend: { colors: Record<string, Record<string, string>> } } } };
  new Function('module', src)(module);
  const colors = module.exports.theme.extend.colors.brand;
  assert.equal(Object.keys(colors).length, 11);
  assert.equal(colors['500'], BASE);
  // Names that aren't identifiers are quoted.
  assert.match(toTailwindConfig('my brand', scale), /'my-brand': \{/);
});

test('toJson', () => {
  const scale = shadeScale(BASE);
  const parsed = JSON.parse(toJson('brand', scale));
  assert.deepEqual(Object.keys(parsed), ['brand']);
  assert.equal(parsed.brand['500'], BASE);
  assert.equal(parsed.brand['50'], scale.steps[0].hex);
  assert.equal(Object.keys(parsed.brand).length, 11);
});

test('bestTextColor picks the higher WCAG contrast', () => {
  assert.equal(bestTextColor('#ffffff'), '#000000');
  assert.equal(bestTextColor('#000000'), '#ffffff');
  assert.equal(bestTextColor('#d6ff3d'), '#000000');
  assert.equal(bestTextColor('#3a2391'), '#ffffff');
  assert.equal(bestTextColor('#3b82f6'), '#000000'); // 5.71 vs 3.68
});

test('randomHex gives valid hex and is deterministic for a given rand', () => {
  let i = 0;
  const seq = [0.1, 0.5, 0.9];
  const rand = () => seq[i++ % seq.length];
  const a = randomHex(rand);
  i = 0;
  assert.equal(randomHex(rand), a);
  assert.match(a, HEX);
});
