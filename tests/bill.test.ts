import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRENCIES,
  CURRENCY_CODES,
  DEFAULT_CURRENCY,
  calculateBill,
  parseAmount,
  parsePercent,
  formatMoney,
  formatPlain,
  describeShares,
  billSummary,
  splitEvenly,
  rescaleMinor,
  isCurrencyCode,
  type BillInput,
  type BillResult
} from '../src/lib/tools/bill.ts';

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

function bill(over: Partial<BillInput>): BillInput {
  return {
    subtotal: 0,
    servicePct: 0,
    taxPct: 0,
    tipPct: 0,
    taxOnService: true,
    tipBase: 'subtotal',
    people: 1,
    ...over
  };
}

function ok(r: BillResult) {
  if (!r.ok) throw new Error(`expected ok, got: ${r.error}`);
  return r;
}

test('shares sum exactly to the total: $100 / 3', () => {
  const r = ok(calculateBill(bill({ subtotal: 10000, people: 3 })));
  assert.deepEqual(r.perPerson, [3334, 3333, 3333]);
  assert.equal(sum(r.perPerson), r.total);
  assert.deepEqual(r.groups, [
    { amount: 3334, count: 1 },
    { amount: 3333, count: 2 }
  ]);
  assert.equal(describeShares(r.groups, 'USD'), '1 × $33.34 + 2 × $33.33');
});

test('shares sum exactly to the total: odd IDR amounts', () => {
  for (const [subtotal, people] of [
    [100_002, 3],
    [173_251, 4],
    [99_999, 7],
    [1, 5],
    [0, 3]
  ]) {
    const r = ok(calculateBill(bill({ subtotal, people, servicePct: 5, taxPct: 10 })));
    assert.equal(sum(r.perPerson), r.total, `${subtotal}/${people}`);
    assert.equal(r.perPerson.length, people);
    assert.ok(Math.max(...r.perPerson) - Math.min(...r.perPerson) <= 1);
  }
  const r = ok(calculateBill(bill({ subtotal: 100_001, people: 3 })));
  assert.deepEqual(r.perPerson, [33_334, 33_334, 33_333]);
  assert.equal(describeShares(r.groups, 'IDR'), `2 × ${formatMoney(33_334, 'IDR')} + 1 × ${formatMoney(33_333, 'IDR')}`);
});

test('splitEvenly is exact and never negative', () => {
  assert.deepEqual(splitEvenly(10, 4), [3, 3, 2, 2]);
  assert.deepEqual(splitEvenly(0, 2), [0, 0]);
});

test('service + tax with tax on service (PB1 style)', () => {
  const r = ok(calculateBill(bill({ subtotal: 100_000, servicePct: 5, taxPct: 10, taxOnService: true })));
  assert.equal(r.service, 5_000);
  assert.equal(r.tax, 10_500);
  assert.equal(r.total, 115_500);
});

test('service + tax without tax on service', () => {
  const r = ok(calculateBill(bill({ subtotal: 100_000, servicePct: 5, taxPct: 10, taxOnService: false })));
  assert.equal(r.service, 5_000);
  assert.equal(r.tax, 10_000);
  assert.equal(r.total, 115_000);
});

test('tax rate set with no service: tax is only what the rate says', () => {
  const r = ok(calculateBill(bill({ subtotal: 150_000, taxPct: 11 })));
  assert.equal(r.tax, 16_500);
  assert.equal(r.total, 166_500);
  const none = ok(calculateBill(bill({ subtotal: 150_000, taxPct: 0 })));
  assert.equal(none.tax, 0);
  assert.equal(none.total, 150_000);
});

test('tip base: subtotal vs after charges', () => {
  const base = { subtotal: 10_000, servicePct: 10, taxPct: 10, tipPct: 15, taxOnService: false } as const;
  const onSub = ok(calculateBill(bill({ ...base, tipBase: 'subtotal' })));
  assert.equal(onSub.tip, 1_500);
  assert.equal(onSub.total, 10_000 + 1_000 + 1_000 + 1_500);
  const onAll = ok(calculateBill(bill({ ...base, tipBase: 'afterCharges' })));
  assert.equal(onAll.tip, 1_800); // 15% of 12,000
  assert.equal(onAll.total, 13_800);
});

test('percentages round half up to the minor unit', () => {
  const r = ok(calculateBill(bill({ subtotal: 12_345, taxPct: 12.5 })));
  assert.equal(r.tax, 1_543); // 1543.125
  const half = ok(calculateBill(bill({ subtotal: 10, taxPct: 5 })));
  assert.equal(half.tax, 1); // 0.5 → 1
});

test('people 0, empty, fractional or negative are rejected', () => {
  for (const people of [0, -1, 1.5, NaN, undefined as unknown as number]) {
    const r = calculateBill(bill({ subtotal: 10_000, people }));
    assert.equal(r.ok, false, String(people));
    if (!r.ok) assert.match(r.error, /at least 1/);
  }
});

test('invalid subtotal and percentages are rejected', () => {
  assert.equal(calculateBill(bill({ subtotal: -1 })).ok, false);
  assert.equal(calculateBill(bill({ subtotal: 1.5 })).ok, false);
  assert.equal(calculateBill(bill({ subtotal: 100, tipPct: 101 })).ok, false);
  assert.equal(calculateBill(bill({ subtotal: 100, taxPct: -5 })).ok, false);
  assert.equal(calculateBill(bill({ subtotal: 100, servicePct: NaN })).ok, false);
});

test('rounding each share up reports the overpay', () => {
  const r = ok(calculateBill(bill({ subtotal: 173_250, people: 3, rounding: 1_000 })));
  assert.deepEqual(r.perPerson, [57_750, 57_750, 57_750]);
  assert.ok(r.rounded);
  assert.deepEqual(r.rounded.perPerson, [58_000, 58_000, 58_000]);
  assert.equal(r.rounded.total, 174_000);
  assert.equal(r.rounded.overpay, 750);

  const exact = ok(calculateBill(bill({ subtotal: 60_000, people: 3, rounding: 1_000 })));
  assert.equal(exact.rounded?.overpay, 0);
  assert.equal(ok(calculateBill(bill({ subtotal: 60_000, people: 3 }))).rounded, null);
});

test('rounding: uneven shares can round to the same amount', () => {
  const r = ok(calculateBill(bill({ subtotal: 100_001, people: 3, rounding: 500 })));
  assert.deepEqual(r.rounded?.perPerson, [33_500, 33_500, 33_500]);
  assert.equal(r.rounded?.overpay, 100_500 - 100_001);
});

test('parseAmount: id-ID formats', () => {
  assert.deepEqual(parseAmount('150000', 'id-ID', 0), { ok: true, minor: 150_000 });
  assert.deepEqual(parseAmount('150.000', 'id-ID', 0), { ok: true, minor: 150_000 });
  assert.deepEqual(parseAmount('1.250.000', 'id-ID', 0), { ok: true, minor: 1_250_000 });
  assert.deepEqual(parseAmount('150.000,50', 'id-ID', 2), { ok: true, minor: 15_000_050 });
  assert.deepEqual(parseAmount('Rp 150.000', 'id-ID', 0), { ok: true, minor: 150_000 });
  assert.deepEqual(parseAmount('12,5', 'id-ID', 2), { ok: true, minor: 1_250 });
  // A lone "." followed by 1–2 digits can't be a thousands group, so it is a decimal point.
  assert.deepEqual(parseAmount('12.5', 'id-ID', 2), { ok: true, minor: 1_250 });
  // Rupiah has no cents: extra decimals round half up.
  assert.deepEqual(parseAmount('150.000,50', 'id-ID', 0), { ok: true, minor: 150_001 });
  assert.deepEqual(parseAmount('150.000,49', 'id-ID', 0), { ok: true, minor: 150_000 });
});

test('parseAmount: en-US formats', () => {
  assert.deepEqual(parseAmount('150,000.50', 'en-US', 2), { ok: true, minor: 15_000_050 });
  assert.deepEqual(parseAmount('150000.5', 'en-US', 2), { ok: true, minor: 15_000_050 });
  assert.deepEqual(parseAmount('$1,234', 'en-US', 2), { ok: true, minor: 123_400 });
  assert.deepEqual(parseAmount('.99', 'en-US', 2), { ok: true, minor: 99 });
  assert.deepEqual(parseAmount('12,5', 'en-US', 2), { ok: true, minor: 1_250 });
  assert.deepEqual(parseAmount('1.005', 'en-US', 2), { ok: true, minor: 101 });
});

test('parseAmount: garbage is rejected with a message', () => {
  for (const [text, locale] of [
    ['abc', 'id-ID'],
    ['12a', 'en-US'],
    ['', 'id-ID'],
    ['   ', 'en-US'],
    ['-5', 'en-US'],
    ['1.2.3,4,5', 'id-ID'],
    ['150,000.50', 'id-ID'],
    ['1,23,456', 'en-US'],
    ['1e5', 'en-US'],
    ['99999999999999999', 'en-US']
  ]) {
    const r = parseAmount(text, locale, 2);
    assert.equal(r.ok, false, `${JSON.stringify(text)} in ${locale}`);
    if (!r.ok) assert.ok(r.error.length > 0);
  }
  const neg = parseAmount('-5', 'en-US');
  assert.ok(!neg.ok && /negative/.test(neg.error));
});

test('parsePercent: locale decimals, range, empty means 0', () => {
  assert.deepEqual(parsePercent('12,5', 'id-ID'), { ok: true, pct: 12.5 });
  assert.deepEqual(parsePercent('10%', 'en-US'), { ok: true, pct: 10 });
  assert.deepEqual(parsePercent('', 'en-US'), { ok: true, pct: 0 });
  assert.equal(parsePercent('101', 'en-US').ok, false);
  assert.equal(parsePercent('ten', 'en-US').ok, false);
});

test('IDR has 0 decimals and is the default', () => {
  assert.equal(DEFAULT_CURRENCY, 'IDR');
  assert.equal(CURRENCIES.IDR.decimals, 0);
  assert.equal(CURRENCIES.IDR.locale, 'id-ID');
  assert.equal(CURRENCIES.IDR.defaults.tip, 0);
  assert.deepEqual(CURRENCIES.IDR.servicePresets, [0, 5, 10]);
  assert.deepEqual(CURRENCIES.IDR.taxPresets, [0, 10, 11]);
  const s = formatMoney(150_000, 'IDR');
  assert.match(s, /^Rp\s?150\.000$/);
  assert.equal(formatPlain(1_250_000, 'IDR'), '1.250.000');
});

test('every currency formats and has sane config', () => {
  for (const code of ['IDR', 'USD', 'EUR', 'SGD', 'MYR']) {
    assert.ok(CURRENCY_CODES.includes(code as never), code);
    assert.ok(isCurrencyCode(code));
  }
  assert.equal(isCurrencyCode('XXX'), false);
  assert.equal(isCurrencyCode('toString'), false);
  assert.equal(formatMoney(3_333, 'USD'), '$33.33');
  for (const code of CURRENCY_CODES) {
    const c = CURRENCIES[code];
    assert.ok(formatMoney(12_345, code).length > 0);
    assert.ok(c.roundSteps.every((s) => Number.isInteger(s) && s > 0));
    // A formatted plain amount parses back to itself.
    const back = parseAmount(formatPlain(1_234_567, code), c.locale, c.decimals);
    assert.deepEqual(back, { ok: true, minor: 1_234_567 }, code);
  }
});

test('rescaleMinor converts between decimal precisions', () => {
  assert.equal(rescaleMinor(150_000, 0, 2), 15_000_000);
  assert.equal(rescaleMinor(15_050, 2, 0), 151);
  assert.equal(rescaleMinor(15_049, 2, 0), 150);
});

test('billSummary lists charges, split and rounding', () => {
  const rates = { servicePct: 5, taxPct: 10, tipPct: 0 };
  const r = ok(calculateBill(bill({ subtotal: 150_000, ...rates, people: 3, rounding: 1_000 })));
  const text = billSummary(r, rates, 'IDR');
  assert.match(text, /Bill: Rp\s?150\.000/);
  assert.match(text, /Service 5%: Rp\s?7\.500/);
  assert.match(text, /PB1 \/ PPN 10%: Rp\s?15\.750/);
  assert.doesNotMatch(text, /Tip/);
  assert.match(text, /Total: Rp\s?173\.250/);
  assert.match(text, /Split 3 ways: Rp\s?57\.750/);
  assert.match(text, /each pays Rp\s?58\.000 \(Rp\s?750 extra\)/);
});
