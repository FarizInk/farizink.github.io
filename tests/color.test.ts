import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseColor,
  fromRgb255,
  toRgb255,
  toHex,
  formatRgb,
  formatRgbLegacy,
  formatHsl,
  formatHwb,
  formatOklch,
  formatOklab,
  formatHsv,
  formatCmyk,
  contrastRatio,
  wcag,
  bestTextColor,
  relativeLuminance,
  namedColorFor,
  NAMED_COLORS,
  WHITE,
  BLACK,
  type Color
} from '../src/lib/tools/color.ts';

function parse(input: string): Color {
  const r = parseColor(input);
  assert.ok(r.ok, `expected "${input}" to parse: ${r.ok ? '' : r.message}`);
  return r.color;
}
const hexOf = (input: string): string => toHex(parse(input));

test('out-of-range channels clamp instead of corrupting the hex', () => {
  assert.equal(toHex(fromRgb255(300, 0, 0)), '#ff0000');
  assert.equal(toHex(fromRgb255(-5, 0, 0)), '#000000');
  assert.equal(toHex(fromRgb255(255, 255, 256)), '#ffffff');
  assert.equal(hexOf('rgb(300, 0, 0)'), '#ff0000');
  assert.equal(hexOf('rgb(-5 0 0)'), '#000000');
  assert.equal(hexOf('rgb(255 255 256)'), '#ffffff');
  assert.deepEqual(toRgb255(fromRgb255(NaN, 1e9, -1e9)), { r: 0, g: 255, b: 0 });
});

test('hex: 3, 4, 6 and 8 digits, with or without #', () => {
  assert.equal(hexOf('#fff'), '#ffffff');
  assert.equal(hexOf('fff'), '#ffffff');
  assert.equal(hexOf('#ffff'), '#ffffff');
  assert.equal(hexOf('#fff8'), '#ffffff88');
  assert.equal(hexOf('#3B82F6'), '#3b82f6');
  assert.equal(hexOf('#3b82f680'), '#3b82f680');
  const c = parse('#3b82f680');
  assert.ok(Math.abs(c.alpha - 128 / 255) < 1e-9);
});

test('rgb(): legacy commas, modern spaces, percentages and alpha', () => {
  assert.equal(hexOf('rgb(59, 130, 246)'), '#3b82f6');
  assert.equal(hexOf('rgba(59, 130, 246, 0.5)'), '#3b82f680');
  assert.equal(hexOf('rgb(59 130 246)'), '#3b82f6');
  assert.equal(hexOf('rgb(59 130 246 / 50%)'), '#3b82f680');
  assert.equal(hexOf('rgb(59 130 246 / .5)'), '#3b82f680');
  assert.equal(hexOf('rgb(100% 0% 50%)'), '#ff0080');
  assert.equal(hexOf('RGB(255,0,0);'), '#ff0000');
  assert.equal(hexOf('rgb(255 0 0 / 2)'), '#ff0000');
});

test('hsl() / hwb(): legacy and modern forms, angle units', () => {
  assert.equal(hexOf('hsl(0, 100%, 50%)'), '#ff0000');
  assert.equal(hexOf('hsla(120, 100%, 25%, 1)'), '#008000');
  assert.equal(hexOf('hsl(240 100% 50%)'), '#0000ff');
  assert.equal(hexOf('hsl(0.5turn 100% 50% / 0.5)'), '#00ffff80');
  assert.equal(hexOf('hsl(217deg 91% 60%)'), '#3c83f6');
  assert.equal(hexOf('hwb(0 0% 0%)'), '#ff0000');
  assert.equal(hexOf('hwb(120 0% 50%)'), '#008000');
  assert.equal(hexOf('hwb(0 60% 60%)'), '#808080');
});

test('named colors, transparent', () => {
  assert.equal(Object.keys(NAMED_COLORS).length, 148);
  assert.equal(hexOf('rebeccapurple'), '#663399');
  assert.equal(hexOf('RebeccaPurple'), '#663399');
  assert.equal(hexOf('transparent'), '#00000000');
  assert.equal(namedColorFor(parse('#663399')), 'rebeccapurple');
  assert.equal(namedColorFor(parse('#663398')), null);
});

test('formatters', () => {
  const c = parse('#3b82f6');
  assert.equal(formatRgb(c), 'rgb(59 130 246)');
  assert.equal(formatRgbLegacy(c), 'rgb(59, 130, 246)');
  assert.equal(formatHsl(c), 'hsl(217.2 91.2% 59.8%)');
  assert.equal(formatHsv(c), '217°, 76%, 96%');
  assert.equal(formatCmyk(c), '76%, 47%, 0%, 4%');
  assert.match(formatOklch(c), /^oklch\(62\.\d+% 0\.\d+ 259\.\d+\)$/);
  assert.match(formatOklab(c), /^oklab\(62\.\d+% -0\.\d+ -0\.\d+\)$/);
  const half = { ...c, alpha: 0.5 };
  assert.equal(toHex(half), '#3b82f680');
  assert.equal(formatRgb(half), 'rgb(59 130 246 / 0.5)');
  assert.equal(formatRgbLegacy(half), 'rgba(59, 130, 246, 0.5)');
  assert.ok(formatHwb(half).endsWith(' / 0.5)'));
  assert.equal(formatOklch(parse('white')), 'oklch(100% 0 0)');
  assert.equal(formatOklch(parse('black')), 'oklch(0% 0 0)');
});

test('formatted strings parse back to the same color', () => {
  for (const hex of ['#3b82f6', '#ff0000', '#00ff00', '#123456', '#fedcba', '#777777', '#c0ffee']) {
    const c = parse(hex);
    for (const f of [formatRgb, formatRgbLegacy, formatHsl, formatHwb, formatOklch, formatOklab]) {
      assert.equal(hexOf(f(c)), hex, `${f.name}: ${f(c)}`);
    }
  }
});

test('OKLCH round-trip stays within 1/255 per channel', () => {
  for (const hex of ['#3b82f6', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#663399', '#808080', '#ffffff', '#000000', '#c0ffee']) {
    const a = parse(hex);
    const b = parse(formatOklch(a));
    for (const k of ['r', 'g', 'b'] as const) {
      assert.ok(Math.abs(a[k] - b[k]) <= 1 / 255, `${hex} ${k}: ${a[k]} vs ${b[k]}`);
    }
  }
  // Known reference value for pure red.
  assert.match(formatOklch(parse('red')), /^oklch\(62\.8% 0\.2577 29\.23\)$/);
});

test('out-of-gamut OKLCH is clipped and flagged', () => {
  const r = parseColor('oklch(70% 0.4 150)');
  assert.ok(r.ok);
  assert.equal(r.clipped, true);
  for (const k of ['r', 'g', 'b'] as const) assert.ok(r.color[k] >= 0 && r.color[k] <= 1);
  const inGamut = parseColor('oklch(62.8% 0.2577 29.23)');
  assert.ok(inGamut.ok);
  assert.equal(inGamut.clipped, false);
  assert.equal(toHex(inGamut.color), '#ff0000');
  assert.equal(hexOf('oklab(62.8% 0.2249 0.1258)'), '#ff0000');
  assert.equal(hexOf('oklch(0.628 0.2577 29.23 / 50%)'), '#ff000080');
});

test('WCAG contrast', () => {
  assert.equal(contrastRatio(BLACK, WHITE), 21);
  assert.equal(contrastRatio(WHITE, WHITE), 1);
  assert.equal(relativeLuminance(WHITE), 1);
  const grey = parse('#777');
  const ratio = contrastRatio(grey, WHITE);
  assert.ok(Math.abs(ratio - 4.48) < 0.01, `ratio ${ratio}`);
  const w = wcag(grey, WHITE);
  assert.deepEqual(
    { aaNormal: w.aaNormal, aaLarge: w.aaLarge, aaaNormal: w.aaaNormal, aaaLarge: w.aaaLarge },
    { aaNormal: false, aaLarge: true, aaaNormal: false, aaaLarge: false }
  );
  assert.equal(wcag(BLACK, WHITE).aaaNormal, true);
});

test('bestTextColor', () => {
  assert.equal(bestTextColor(parse('#ffffff')), 'black');
  assert.equal(bestTextColor(parse('#000000')), 'white');
  assert.equal(bestTextColor(parse('#ffd700')), 'black');
  assert.equal(bestTextColor(parse('navy')), 'white');
});

test('invalid inputs return messages', () => {
  for (const bad of ['', '   ', '#12', '#12345', '#ggg', 'notacolor', 'rgb(1, 2)', 'rgb(1 2 3 4)', 'rgb(a b c)', 'hsl(10% 50% 50%)', 'lab(50 0 0)', 'rgb(1, 2, 3 / 0.5)', 'rgb(1 2 3', '!!']) {
    const r = parseColor(bad);
    assert.equal(r.ok, false, `"${bad}" should fail`);
    if (!r.ok) assert.ok(r.message.length > 0);
  }
  const r = parseColor('#12345');
  assert.ok(!r.ok && /3, 4, 6 or 8/.test(r.message));
});
