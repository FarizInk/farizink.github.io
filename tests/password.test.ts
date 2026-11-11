import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  randomInt,
  shuffle,
  charClasses,
  charset,
  generatePassword,
  generatePassphrase,
  entropyBits,
  strengthOf,
  UPPER,
  LOWER,
  DIGITS,
  SYMBOLS,
  AMBIGUOUS,
  type RandomSource,
  type CharOptions
} from '../src/lib/tools/password.ts';
import { WORDS } from '../src/lib/tools/wordlist.ts';

/** Deterministic xorshift32 source for reproducible tests. */
function seeded(seed = 0x9e3779b9): RandomSource {
  let s = seed >>> 0 || 1;
  return buf => {
    for (let i = 0; i < buf.length; i++) {
      s ^= s << 13;
      s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5;
      s >>>= 0;
      buf[i] = s;
    }
  };
}

/** Source that replays a fixed sequence of 32-bit values. */
function sequence(values: number[]): RandomSource & { calls: () => number } {
  let i = 0;
  const fn = ((buf: Uint32Array) => {
    for (let k = 0; k < buf.length; k++) buf[k] = values[i++];
  }) as RandomSource & { calls: () => number };
  fn.calls = () => i;
  return fn;
}

const ALL: CharOptions = { length: 16, upper: true, lower: true, digits: true, symbols: true };

test('randomInt: rejects values at or above the limit and retries', () => {
  // n = 3: 2^32 % 3 = 1, so limit = 2^32 - 1 and 0xFFFFFFFF must be rejected.
  const src = sequence([0xffffffff, 5]);
  assert.equal(randomInt(3, src), 5 % 3);
  assert.equal(src.calls(), 2);
  // n = 2^31 + 1: limit = 2^31 + 1, so 2^31 + 1 is rejected and 7 is accepted.
  const src2 = sequence([2 ** 31 + 1, 7]);
  assert.equal(randomInt(2 ** 31 + 1, src2), 7);
  assert.equal(src2.calls(), 2);
});

test('randomInt: accepts values just below the limit', () => {
  const src = sequence([0xfffffffe]);
  assert.equal(randomInt(3, src), 0xfffffffe % 3);
  assert.equal(src.calls(), 1);
});

test('randomInt: n = 1 always gives 0; invalid n throws', () => {
  assert.equal(randomInt(1, seeded()), 0);
  for (const bad of [0, -1, 1.5, NaN, 2 ** 32 + 1]) {
    assert.throws(() => randomInt(bad, seeded()), RangeError);
  }
});

test('randomInt: default crypto source stays in range', () => {
  for (let i = 0; i < 1000; i++) {
    const v = randomInt(7);
    assert.ok(Number.isInteger(v) && v >= 0 && v < 7);
  }
});

test('randomInt: roughly uniform (chi-square over 10 buckets)', () => {
  const n = 10;
  const draws = 100_000;
  const counts = new Array<number>(n).fill(0);
  for (let i = 0; i < draws; i++) counts[randomInt(n)]++;
  const expected = draws / n;
  const chi = counts.reduce((sum, c) => sum + (c - expected) ** 2 / expected, 0);
  // 9 degrees of freedom: p = 0.0001 critical value is 33.72 (keeps the CSPRNG test from flaking).
  assert.ok(chi < 33.72, `chi-square ${chi.toFixed(2)} too high: ${counts.join(',')}`);
});

test('shuffle: keeps every element', () => {
  const items = Array.from({ length: 50 }, (_, i) => i);
  const out = shuffle([...items], seeded());
  assert.deepEqual([...out].sort((a, b) => a - b), items);
});

test('generatePassword: exact length', () => {
  for (const length of [4, 8, 16, 64, 128]) {
    assert.equal(generatePassword({ ...ALL, length }).length, length);
  }
});

test('generatePassword: every enabled class appears in every password', () => {
  const src = seeded(42);
  const combos: Array<Partial<CharOptions>> = [
    { upper: true, lower: true, digits: true, symbols: true },
    { upper: true, lower: false, digits: true, symbols: false },
    { upper: false, lower: true, digits: false, symbols: true },
    { upper: false, lower: false, digits: true, symbols: false }
  ];
  for (const combo of combos) {
    const opts = { ...ALL, ...combo, length: 4 } as CharOptions;
    for (let i = 0; i < 500; i++) {
      const pw = generatePassword(opts, src);
      const has = (set: string) => [...pw].some(c => set.includes(c));
      assert.equal(has(UPPER), opts.upper, pw);
      assert.equal(has(LOWER), opts.lower, pw);
      assert.equal(has(DIGITS), opts.digits, pw);
      assert.equal(has(SYMBOLS), opts.symbols, pw);
    }
  }
});

test('generatePassword: custom characters form their own guaranteed class', () => {
  const opts: CharOptions = { length: 2, upper: false, lower: true, digits: false, symbols: false, custom: 'éé§' };
  assert.equal(charClasses(opts).length, 2);
  for (let i = 0; i < 200; i++) {
    const pw = generatePassword(opts, seeded(i + 1));
    assert.ok([...pw].some(c => 'é§'.includes(c)), pw);
  }
});

test('charset: deduplicated, custom overlap ignored, whitespace dropped', () => {
  const set = charset({ length: 8, upper: false, lower: true, digits: false, symbols: false, custom: 'abc z  ' });
  assert.equal(set, LOWER);
  // custom adding nothing new is not an extra class
  assert.equal(charClasses({ length: 8, upper: false, lower: true, digits: false, symbols: false, custom: 'xyz' }).length, 1);
  assert.equal(new Set(charset({ ...ALL, custom: '!!@@ab' })).size, charset({ ...ALL, custom: '!!@@ab' }).length);
});

test('generatePassword: exclude ambiguous is respected', () => {
  const opts: CharOptions = { ...ALL, length: 64, excludeAmbiguous: true, custom: '|`O' };
  const set = charset(opts);
  for (const c of AMBIGUOUS) assert.ok(!set.includes(c), `charset contains ${c}`);
  const src = seeded(7);
  for (let i = 0; i < 300; i++) {
    const pw = generatePassword(opts, src);
    for (const c of AMBIGUOUS) assert.ok(!pw.includes(c), `${pw} contains ${c}`);
  }
});

test('generatePassword: errors when no class or length too short', () => {
  assert.throws(() => generatePassword({ length: 10, upper: false, lower: false, digits: false, symbols: false }), /at least one/);
  assert.throws(() => generatePassword({ ...ALL, length: 3 }), /at least 4/);
});

test('generatePassword: deterministic with an injected source', () => {
  assert.equal(generatePassword(ALL, seeded(5)), generatePassword(ALL, seeded(5)));
});

test('wordlist: at least 1024 distinct lowercase words of 3–8 letters', () => {
  assert.ok(WORDS.length >= 1024, `only ${WORDS.length} words`);
  assert.equal(new Set(WORDS).size, WORDS.length);
  for (const w of WORDS) assert.match(w, /^[a-z]{3,8}$/);
});

test('generatePassphrase: word count, separator, words from the list', () => {
  const src = seeded(9);
  for (const [words, separator] of [[4, '-'], [6, '.'], [8, '_']] as const) {
    const phrase = generatePassphrase({ words, separator, capitalize: false, appendDigit: false }, WORDS, src);
    const parts = phrase.split(separator);
    assert.equal(parts.length, words);
    for (const p of parts) assert.ok(WORDS.includes(p), p);
  }
});

test('generatePassphrase: capitalize and append digit', () => {
  const phrase = generatePassphrase({ words: 5, separator: ' ', capitalize: true, appendDigit: true }, WORDS, seeded(3));
  assert.match(phrase, /\d$/);
  const parts = phrase.slice(0, -1).split(' ');
  assert.equal(parts.length, 5);
  for (const p of parts) {
    assert.match(p, /^[A-Z][a-z]+$/);
    assert.ok(WORDS.includes(p.toLowerCase()));
  }
});

test('generatePassphrase: empty separator and invalid input', () => {
  const phrase = generatePassphrase({ words: 3, separator: '', capitalize: false, appendDigit: false }, ['aaa', 'bbb'], seeded());
  assert.match(phrase, /^(aaa|bbb){3}$/);
  assert.throws(() => generatePassphrase({ words: 0, separator: '-', capitalize: false, appendDigit: false }, WORDS));
});

test('entropyBits: character and passphrase math', () => {
  assert.equal(entropyBits({ mode: 'chars', length: 16, charsetSize: 64 }), 96);
  assert.equal(entropyBits({ mode: 'chars', length: 10, charsetSize: 1 }), 0);
  assert.equal(entropyBits({ mode: 'passphrase', words: 5, listSize: 1024 }), 50);
  assert.ok(Math.abs(entropyBits({ mode: 'passphrase', words: 5, listSize: 1024, appendDigit: true }) - (50 + Math.log2(10))) < 1e-9);
  const n = charset(ALL).length;
  assert.equal(n, 26 + 26 + 10 + SYMBOLS.length);
  assert.ok(Math.abs(entropyBits({ mode: 'chars', length: 20, charsetSize: n }) - 20 * Math.log2(n)) < 1e-9);
});

test('strengthOf: bands', () => {
  assert.equal(strengthOf(0).band, 'weak');
  assert.equal(strengthOf(39.9).band, 'weak');
  assert.equal(strengthOf(40).band, 'fair');
  assert.equal(strengthOf(59.9).band, 'fair');
  assert.equal(strengthOf(60).band, 'strong');
  assert.equal(strengthOf(80).band, 'very-strong');
  assert.equal(strengthOf(80).label, 'Very strong');
  assert.equal(strengthOf(500).ratio, 1);
});
