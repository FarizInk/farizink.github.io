import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  adultCategoriesApply,
  bmiPrime,
  classify,
  cmToFtIn,
  computeBmi,
  distanceToRange,
  ftInToCm,
  healthyWeightRange,
  kgToLb,
  lbToKg,
  parseAge,
  parseDecimal
} from '../src/lib/tools/bmi.ts';

const near = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`);

test('70 kg / 175 cm = 22.9', () => {
  const r = computeBmi(70, 175);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.rounded, 22.9);
});

test('BMI 24 differs by standard', () => {
  assert.equal(classify(24, 'who').key, 'normal');
  assert.equal(classify(24, 'asia').key, 'overweight');
  assert.equal(classify(24, 'kemenkes').key, 'normal');
});

test('boundaries are inclusive one-decimal ranges', () => {
  // 18.5
  for (const s of ['who', 'asia', 'kemenkes'] as const) {
    assert.equal(classify(18.4, s).key, 'underweight');
    assert.equal(classify(18.5, s).key, 'normal');
    assert.equal(classify(18.44, s).key, 'underweight');
    assert.equal(classify(18.45, s).key, 'normal', 'rounds to 18.5 first');
  }
  // 23
  assert.equal(classify(22.9, 'asia').key, 'normal');
  assert.equal(classify(23, 'asia').key, 'overweight');
  assert.equal(classify(23, 'who').key, 'normal');
  // 25
  assert.equal(classify(24.9, 'who').key, 'normal');
  assert.equal(classify(25, 'who').key, 'overweight');
  assert.equal(classify(24.96, 'who').key, 'overweight', '24.96 rounds to 25.0');
  assert.equal(classify(25, 'asia').key, 'obese1');
  assert.equal(classify(25, 'kemenkes').key, 'normal');
  assert.equal(classify(25.1, 'kemenkes').key, 'overweight');
  // 27
  assert.equal(classify(27, 'kemenkes').key, 'overweight');
  assert.equal(classify(27.1, 'kemenkes').key, 'obese1');
  assert.equal(classify(27, 'asia').key, 'obese1');
  // 30
  assert.equal(classify(29.9, 'who').key, 'overweight');
  assert.equal(classify(30, 'who').key, 'obese1');
  assert.equal(classify(30, 'asia').key, 'obese2');
  assert.equal(classify(40, 'who').key, 'obese3');
});

test('range text', () => {
  assert.equal(classify(24, 'asia').range, '23.0–24.9');
  assert.equal(classify(10, 'who').range, '< 18.5');
  assert.equal(classify(45, 'who').range, '≥ 40.0');
  assert.equal(classify(30, 'kemenkes').range, '≥ 27.1');
});

test('invalid height/weight → error, never Infinity', () => {
  for (const [w, h] of [
    [70, 0],
    [70, -170],
    [70, 49],
    [70, 300],
    [70, NaN],
    [70, Infinity]
  ]) {
    const r = computeBmi(w, h);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.field, 'height');
  }
  for (const w of [0, -5, 1, 700, NaN]) {
    const r = computeBmi(w, 170);
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.field, 'weight');
  }
  assert.equal(computeBmi(2, 50).ok, true);
  assert.equal(computeBmi(650, 272).ok, true);
  const imp = computeBmi(70, 0, 'imperial');
  assert.ok(!imp.ok && /ft/.test(imp.error));
});

test('unit conversions', () => {
  near(lbToKg(1), 0.45359237);
  near(lbToKg(kgToLb(70)), 70);
  near(kgToLb(lbToKg(154.3)), 154.3);
  near(ftInToCm(5, 9), 175.26);
  assert.deepEqual(cmToFtIn(175.26), { ft: 5, in: 9 });
  assert.deepEqual(cmToFtIn(ftInToCm(6, 11.5)), { ft: 6, in: 11.5 });
  assert.deepEqual(cmToFtIn(182.88), { ft: 6, in: 0 });
});

test('healthy range for 170 cm per standard', () => {
  assert.deepEqual(healthyWeightRange(170, 'who'), { min: 53.5, max: 72 });
  assert.deepEqual(healthyWeightRange(170, 'asia'), { min: 53.5, max: 66.2 });
  assert.deepEqual(healthyWeightRange(170, 'kemenkes'), { min: 53.5, max: 72.3 });
});

test('distance to range', () => {
  const r = { min: 53.5, max: 66.2 };
  assert.deepEqual(distanceToRange(60, r), { direction: 'within', kg: 0 });
  assert.equal(distanceToRange(70, r).direction, 'lose');
  near(distanceToRange(70, r).kg, 3.8, 1e-9);
  assert.equal(distanceToRange(50, r).direction, 'gain');
});

test('bmi prime', () => {
  assert.equal(bmiPrime(25), 1);
  assert.equal(bmiPrime(23, 'asia'), 1);
  assert.equal(bmiPrime(22.857), 0.91);
});

test('under-18 flag', () => {
  assert.equal(adultCategoriesApply(null), true);
  assert.equal(adultCategoriesApply(18), true);
  assert.equal(adultCategoriesApply(17), false);
  assert.deepEqual(parseAge(''), { ok: true, age: null });
  assert.deepEqual(parseAge('15'), { ok: true, age: 15 });
  assert.equal(parseAge('-3').ok, false);
  assert.equal(parseAge('200').ok, false);
});

test('parseDecimal accepts comma decimals', () => {
  assert.equal(parseDecimal('70,5'), 70.5);
  assert.equal(parseDecimal(' 70.5 '), 70.5);
  assert.equal(parseDecimal(''), null);
  assert.ok(Number.isNaN(parseDecimal('-5') as number));
  assert.ok(Number.isNaN(parseDecimal('abc') as number));
});
