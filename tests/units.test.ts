import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES,
  convert,
  formatResult,
  getUnit,
  inputError,
  parseNumber,
  unitLabel
} from '../src/lib/tools/units.ts';

test('length uses exact international definitions', () => {
  assert.equal(convert(1, 'mi', 'm', 'length'), 1609.344);
  assert.equal(convert(1, 'mi', 'km', 'length'), 1.609344);
  assert.equal(convert(1, 'ft', 'in', 'length'), 12);
  assert.equal(convert(1, 'in', 'cm', 'length'), 2.54);
  assert.equal(convert(1, 'nmi', 'm', 'length'), 1852);
  assert.equal(convert(1609.344, 'm', 'mi', 'length'), 1);
});

test('mass: pound, ounce, stone and Indonesian ons/kuintal', () => {
  assert.equal(convert(1, 'lb', 'kg', 'mass'), 0.45359237);
  assert.equal(convert(1, 'lb', 'oz', 'mass'), 16);
  assert.equal(convert(1, 'st', 'lb', 'mass'), 14);
  assert.equal(convert(1, 'ons', 'g', 'mass'), 100);
  assert.equal(convert(1, 'kuintal', 'kg', 'mass'), 100);
  assert.equal(convert(5, 'ons', 'kg', 'mass'), 0.5);
  assert.equal(convert(1, 't', 'kuintal', 'mass'), 10);
});

test('volume: US vs UK gallon', () => {
  assert.equal(convert(1, 'us_gal', 'L', 'volume'), 3.785411784);
  assert.equal(convert(1, 'uk_gal', 'L', 'volume'), 4.54609);
  assert.notEqual(convert(1, 'us_gal', 'L', 'volume'), convert(1, 'uk_gal', 'L', 'volume'));
  assert.equal(convert(1, 'us_gal', 'us_floz', 'volume'), 128);
  assert.equal(convert(1, 'uk_gal', 'uk_floz', 'volume'), 160);
  assert.equal(convert(1, 'uk_gal', 'uk_pt', 'volume'), 8);
  assert.equal(convert(1, 'us_cup', 'us_tbsp', 'volume'), 16);
  assert.equal(convert(1, 'us_tbsp', 'us_tsp', 'volume'), 3);
});

test('area: acre, hectare, square mile', () => {
  assert.equal(convert(1, 'acre', 'm2', 'area'), 4046.8564224);
  assert.equal(convert(1, 'ha', 'm2', 'area'), 10000);
  assert.equal(convert(1, 'mi2', 'acre', 'area'), 640);
  assert.equal(convert(1, 'ft2', 'in2', 'area'), 144);
});

test('temperature via formulas, rejects below absolute zero', () => {
  assert.equal(convert(100, 'C', 'F', 'temperature'), 212);
  assert.equal(convert(100, 'C', 'K', 'temperature'), 373.15);
  assert.equal(convert(212, 'F', 'K', 'temperature'), 373.15);
  assert.equal(convert(98.6, 'F', 'C', 'temperature'), 37);
  assert.equal(convert(-40, 'C', 'F', 'temperature'), -40);
  assert.equal(convert(0, 'K', 'C', 'temperature'), -273.15);
  assert.equal(convert(-273.15, 'C', 'K', 'temperature'), 0);
  assert.ok(Number.isNaN(convert(-300, 'C', 'F', 'temperature')));
  assert.ok(Number.isNaN(convert(-1, 'K', 'C', 'temperature')));
  assert.ok(Number.isNaN(convert(-500, 'F', 'C', 'temperature')));
  assert.ok(inputError(-300, 'C', 'temperature'));
  assert.equal(inputError(-273.15, 'C', 'temperature'), undefined);
  assert.equal(inputError(-300, 'm', 'length'), undefined);
});

test('data: decimal vs binary prefixes', () => {
  assert.equal(convert(1, 'MiB', 'B', 'data'), 1048576);
  assert.equal(convert(1, 'MB', 'B', 'data'), 1000000);
  assert.equal(convert(1, 'B', 'bit', 'data'), 8);
  assert.equal(convert(1, 'GiB', 'MiB', 'data'), 1024);
  assert.equal(convert(1, 'TB', 'GB', 'data'), 1000);
});

test('speed, time, pressure, energy', () => {
  assert.equal(convert(36, 'kmh', 'mps', 'speed'), 10);
  assert.equal(convert(10, 'mps', 'kmh', 'speed'), 36);
  assert.equal(convert(1, 'kn', 'kmh', 'speed'), 1.852);
  assert.equal(convert(60, 'mph', 'kmh', 'speed'), 96.56064);
  assert.equal(convert(1, 'yr', 'd', 'time'), 365.2425);
  assert.equal(convert(1, 'mo', 'd', 'time'), 30.436875);
  assert.equal(convert(12, 'mo', 'yr', 'time'), 1);
  assert.equal(convert(1, 'atm', 'Pa', 'pressure'), 101325);
  assert.equal(convert(760, 'mmHg', 'atm', 'pressure') > 0.9999, true);
  assert.equal(formatResult(convert(1, 'psi', 'Pa', 'pressure')), '6,894.757293');
  assert.equal(convert(1, 'kcal', 'kJ', 'energy'), 4.184);
  assert.equal(convert(1, 'kWh', 'J', 'energy'), 3600000);
});

test('round-trips return the input within 1e-12 relative', () => {
  const values = [1, 0.1, 3.3, 123456.789, 1e-7, 9.87e12, -42.5];
  for (const c of CATEGORIES) {
    for (const a of c.units) {
      for (const b of c.units) {
        for (const v of values) {
          if (c.id === 'temperature' && v < 0) continue;
          const there = convert(v, a.key, b.key, c.id);
          assert.ok(Number.isFinite(there), `${c.id} ${v} ${a.key}→${b.key}`);
          const back = convert(there, b.key, a.key, c.id);
          // Temperature has offsets (273.15, 459.67), so tiny values are judged against the offset scale.
          const scale = c.id === 'temperature' ? Math.max(Math.abs(v), 500) : Math.abs(v);
          assert.ok(Math.abs(back - v) <= scale * 1e-12, `${c.id} ${v} ${a.key}→${b.key}→${a.key} = ${back}`);
        }
      }
    }
  }
});

test('unknown units give NaN; every category defines its defaults', () => {
  assert.ok(Number.isNaN(convert(1, 'm', 'lb', 'length')));
  for (const c of CATEGORIES) {
    assert.ok(getUnit(c.id, c.defaults[0]) && getUnit(c.id, c.defaults[1]), c.id);
    assert.ok(getUnit(c.id, c.base), c.id);
  }
  assert.equal(unitLabel(getUnit('length', 'mi')!), 'Mile (mi)');
});

test('formatResult: significant digits, no float noise, exponents', () => {
  assert.equal(formatResult(0.1 + 0.2), '0.3');
  assert.equal(formatResult(1609.344), '1,609.344');
  assert.equal(formatResult(1609.344, { grouping: false }), '1609.344');
  assert.equal(formatResult(1609.344, { locale: 'id-ID' }), '1.609,344');
  assert.equal(formatResult(1 / 3), '0.3333333333');
  assert.equal(formatResult(0), '0');
  assert.equal(formatResult(-0), '0');
  assert.equal(formatResult(1.5e-9), '1.5e-9');
  assert.equal(formatResult(0.000001), '0.000001');
  assert.equal(formatResult(6.02214076e23), '6.02214076e23');
  assert.equal(formatResult(-2.5e20), '-2.5e20');
  assert.equal(formatResult(123456789012345), '123,456,789,000,000');
  assert.equal(formatResult(NaN), '');
  assert.equal(formatResult(Infinity), '');
});

test('parseNumber: comma decimals and grouping', () => {
  assert.equal(parseNumber('1,5'), 1.5);
  assert.equal(parseNumber('1.5'), 1.5);
  assert.equal(parseNumber(' 42 '), 42);
  assert.equal(parseNumber('-0,25'), -0.25);
  assert.equal(parseNumber('−3'), -3);
  assert.equal(parseNumber('1.234,5'), 1234.5);
  assert.equal(parseNumber('1,234.5'), 1234.5);
  assert.equal(parseNumber('1.000.000'), 1000000);
  // A single separator is always the decimal mark.
  assert.equal(parseNumber('1.000'), 1);
  assert.equal(parseNumber('1609,344'), 1609.344);
  assert.equal(parseNumber('1 000 000'), 1000000);
  assert.equal(parseNumber('1e-9'), 1e-9);
  assert.equal(parseNumber('2,5e3'), 2500);
  assert.equal(parseNumber('.5'), 0.5);
  assert.ok(Number.isNaN(parseNumber('')));
  assert.ok(Number.isNaN(parseNumber('abc')));
  assert.ok(Number.isNaN(parseNumber('1,2,3.4,5')));
  assert.ok(Number.isNaN(parseNumber('.')));
});
