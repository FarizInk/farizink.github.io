import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseNumber,
  percentOf,
  whatPercent,
  percentChange,
  applyIncrease,
  applyDecrease,
  reversePercent,
  percentDifference,
  stackedDiscount,
  formatNumber,
  formatPercent,
  displayNumber,
  clean,
  type Calc
} from '../src/lib/tools/percent.ts';

function value(r: Calc): number {
  assert.equal(r.ok, true, r.ok ? '' : r.message);
  return r.ok ? r.value : NaN;
}

function failMessage(r: Calc): string {
  assert.equal(r.ok, false);
  return r.ok ? '' : r.message;
}

test('percentChange is signed: 80 → 100 is +25%, 100 → 80 is −20%', () => {
  assert.equal(value(percentChange(80, 100)), 25);
  assert.equal(value(percentChange(100, 80)), -20);
  assert.equal(value(percentChange(50, 50)), 0);
});

test('percentChange from a negative base uses |from|', () => {
  assert.equal(value(percentChange(-10, -5)), 50);
});

test('percentChange from zero is a message, not NaN/Infinity', () => {
  assert.match(failMessage(percentChange(0, 10)), /undefined from zero/);
  assert.match(failMessage(percentChange(0, 0)), /undefined from zero/);
});

test('whatPercent: 25 is 12.5% of 200; of zero is a message', () => {
  assert.equal(value(whatPercent(25, 200)), 12.5);
  assert.equal(value(whatPercent(200, 200)), 100);
  failMessage(whatPercent(5, 0));
});

test('percentOf', () => {
  assert.equal(value(percentOf(15, 250000)), 37500);
  assert.equal(value(percentOf(50, 0)), 0);
  assert.equal(value(percentOf(-10, 200)), -20);
});

test('applyIncrease / applyDecrease', () => {
  assert.equal(value(applyIncrease(200, 10)), 220);
  assert.equal(value(applyDecrease(200, 10)), 180);
  assert.equal(value(applyDecrease(100, 100)), 0);
});

test('reversePercent: 37.500 is 15% of 250.000; 0% is a message', () => {
  assert.equal(value(reversePercent(37500, 15)), 250000);
  assert.equal(value(reversePercent(20, 25)), 80);
  failMessage(reversePercent(10, 0));
});

test('percentDifference is symmetric and guarded', () => {
  assert.equal(value(percentDifference(80, 100)).toFixed(2), '22.22');
  assert.equal(value(percentDifference(100, 80)).toFixed(2), '22.22');
  assert.equal(value(percentDifference(0, 0)), 0);
  assert.match(failMessage(percentDifference(-5, 5)), /cancel out/);
});

test('no calculation leaks NaN or Infinity', () => {
  const results: Calc[] = [
    percentChange(0, 0),
    whatPercent(0, 0),
    reversePercent(0, 0),
    percentDifference(-1, 1),
    percentOf(1e308, 1e308)
  ];
  for (const r of results) {
    if (r.ok) assert.ok(Number.isFinite(r.value));
    else assert.ok(r.message.length > 0);
  }
});

test('stackedDiscount: 50% + 20% on 100.000 → 40.000, effective 60%', () => {
  const r = stackedDiscount(100000, [50, 20]);
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.value, 40000);
  assert.equal(r.effective, 60);
  assert.equal(r.saved, 60000);
  assert.deepEqual(
    r.steps.map(s => [s.percent, s.before, s.amount, s.after]),
    [
      [50, 100000, 50000, 50000],
      [20, 50000, 10000, 40000]
    ]
  );
});

test('stackedDiscount rejects out-of-range discounts and negative prices', () => {
  assert.equal(stackedDiscount(100, [120]).ok, false);
  assert.equal(stackedDiscount(100, [-5]).ok, false);
  assert.equal(stackedDiscount(-100, [10]).ok, false);
  const zero = stackedDiscount(0, [50, 20]);
  assert.ok(zero.ok && zero.value === 0 && zero.effective === 60);
});

test('parseNumber id-ID: dots group, comma is decimal', () => {
  assert.deepEqual(parseNumber('1.250.000', 'id-ID'), { ok: true, value: 1250000 });
  assert.deepEqual(parseNumber('12,5', 'id-ID'), { ok: true, value: 12.5 });
  assert.deepEqual(parseNumber('1.250.000,5', 'id-ID'), { ok: true, value: 1250000.5 });
  assert.deepEqual(parseNumber(' 250000 ', 'id-ID'), { ok: true, value: 250000 });
  assert.deepEqual(parseNumber('−20', 'id-ID'), { ok: true, value: -20 });
  assert.deepEqual(parseNumber('15%', 'id-ID'), { ok: true, value: 15 });
  // A lone dot not followed by three digits is read as a decimal mark.
  assert.deepEqual(parseNumber('12.5', 'id-ID'), { ok: true, value: 12.5 });
});

test('parseNumber en-US: commas group, dot is decimal', () => {
  assert.deepEqual(parseNumber('1,250,000.5', 'en-US'), { ok: true, value: 1250000.5 });
  assert.deepEqual(parseNumber('1,250', 'en-US'), { ok: true, value: 1250 });
  assert.deepEqual(parseNumber('-0.75', 'en-US'), { ok: true, value: -0.75 });
});

test('parseNumber rejects garbage with a message and flags empty input', () => {
  for (const bad of ['abc', '12a', '1,2,3', '1.25.0000', '1,5,5', '--5', '.', '1e5']) {
    const r = parseNumber(bad, 'id-ID');
    assert.equal(r.ok, false, bad);
    if (!r.ok) {
      assert.equal(r.empty, false);
      assert.ok(r.message.length > 0);
    }
  }
  assert.equal(parseNumber('1.250,5,5', 'id-ID').ok, false);
  const empty = parseNumber('   ', 'en-US');
  assert.ok(!empty.ok && empty.empty);
});

test('formatNumber groups by locale and trims trailing zeros', () => {
  assert.equal(formatNumber(1250000.5, 'id-ID'), '1.250.000,5');
  assert.equal(formatNumber(1250000.5, 'en-US'), '1,250,000.5');
  assert.equal(formatNumber(40000, 'id-ID'), '40.000');
  assert.equal(formatNumber(1 / 3, 'en-US'), '0.33');
  assert.equal(formatNumber(-0.001, 'en-US', 2), '-0.001');
  assert.equal(formatNumber(-0, 'en-US'), '0');
  assert.equal(displayNumber(-1500, 'id-ID'), '−1.500');
});

test('formatPercent with explicit sign uses a real minus sign', () => {
  assert.equal(formatPercent(25, 'en-US', { sign: true }), '+25%');
  assert.equal(formatPercent(-20, 'en-US', { sign: true }), '−20%');
  assert.equal(formatPercent(0, 'en-US', { sign: true }), '0%');
  assert.equal(formatPercent(12.5, 'id-ID'), '12,5%');
  assert.equal(formatPercent(-12.5, 'id-ID'), '−12,5%');
});

test('float noise is cleaned before display', () => {
  assert.equal(clean(0.1 + 0.2), 0.3);
  assert.equal(value(applyIncrease(0.1, 200)), 0.3);
  assert.equal(value(percentOf(10, 0.1 + 0.2)), 0.03);
  assert.equal(formatNumber(0.1 + 0.2, 'en-US', 10), '0.3');
  assert.equal(formatPercent(value(whatPercent(0.1 + 0.2, 1)), 'id-ID', { maxDecimals: 6 }), '30%');
});
