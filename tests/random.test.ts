import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  randomInt,
  randomFloat,
  parseItems,
  validateItems,
  pickOne,
  pickMany,
  shuffle,
  splitIntoGroups,
  removeLines,
  type Item,
  type RandomSource
} from '../src/lib/tools/random.ts';

/** Deterministic seeded source (mulberry32) so statistical tests are reproducible. */
function seeded(seed: number): RandomSource {
  let a = seed >>> 0;
  return buf => {
    for (let i = 0; i < buf.length; i++) {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      buf[i] = (t ^ (t >>> 14)) >>> 0;
    }
  };
}

function items(...names: string[]): Item[] {
  return names.map((text, line) => ({ text, weight: 1, line }));
}

const TRIALS = 30000;

test('randomInt: stays in range, rejects bad n', () => {
  const src = seeded(1);
  for (let i = 0; i < 1000; i++) {
    const x = randomInt(7, src);
    assert.ok(Number.isInteger(x) && x >= 0 && x < 7);
  }
  assert.throws(() => randomInt(0), RangeError);
  assert.throws(() => randomInt(2.5), RangeError);
});

test('randomInt: rejection sampling discards values above the last full multiple', () => {
  // n = 3: limit = 2^32 - (2^32 % 3) = 4294967295; 0xFFFFFFFF must be rejected.
  const values = [0xffffffff, 5];
  let i = 0;
  const src: RandomSource = buf => {
    buf[0] = values[i++];
  };
  assert.equal(randomInt(3, src), 5 % 3);
  assert.equal(i, 2);
});

test('randomInt: works with the real crypto source', () => {
  const x = randomInt(10);
  assert.ok(x >= 0 && x < 10);
});

test('randomFloat: in [0, 1)', () => {
  const src = seeded(2);
  for (let i = 0; i < 1000; i++) {
    const f = randomFloat(src);
    assert.ok(f >= 0 && f < 1);
  }
  assert.ok(randomFloat(buf => buf.fill(0xffffffff)) < 1);
});

test('parseItems: one per line, trims, drops empties, keeps line numbers', () => {
  const got = parseItems('  Alice \n\n Bob\r\n   \nCarol');
  assert.deepEqual(got, [
    { text: 'Alice', weight: 1, line: 0 },
    { text: 'Bob', weight: 1, line: 2 },
    { text: 'Carol', weight: 1, line: 4 }
  ]);
  assert.deepEqual(parseItems(''), []);
});

test('parseItems: "name * weight" syntax', () => {
  const got = parseItems('Pizza * 3\nSushi*0.5\nTacos\nA * B * 2');
  assert.deepEqual(
    got.map(i => [i.text, i.weight]),
    [
      ['Pizza', 3],
      ['Sushi', 0.5],
      ['Tacos', 1],
      ['A * B', 2]
    ]
  );
});

test('parseItems: invalid weights are kept as-is for validation', () => {
  const got = parseItems('a * 0\nb * -2\nc * x\nd *');
  assert.equal(got[0].weight, 0);
  assert.equal(got[1].weight, -2);
  assert.ok(Number.isNaN(got[2].weight));
  assert.ok(Number.isNaN(got[3].weight));
});

test('parseItems: with weights off the whole line is the name', () => {
  assert.deepEqual(parseItems('Pizza * 3', { weights: false }), [{ text: 'Pizza * 3', weight: 1, line: 0 }]);
  // A leading * is never a weight.
  assert.equal(parseItems('* 3')[0].text, '* 3');
});

test('validateItems: empty list and bad weights', () => {
  assert.match(validateItems([], false) ?? '', /at least one/);
  const bad = parseItems('ok * 2\nzero * 0');
  assert.equal(validateItems(bad, false), null); // weights ignored when off
  assert.match(validateItems(bad, true) ?? '', /Line 2 .*zero.*greater than 0/);
  assert.match(validateItems(parseItems('n * -1'), true) ?? '', /greater than 0/);
  assert.match(validateItems(parseItems('n * abc'), true) ?? '', /greater than 0/);
  assert.match(validateItems(parseItems('n * Infinity'), true) ?? '', /greater than 0/);
});

test('pickMany: validation errors', () => {
  const three = items('a', 'b', 'c');
  assert.throws(() => pickMany(three, 4, { unique: true }), /without repeats from 3 items/);
  assert.throws(() => pickMany(three, 0), RangeError);
  assert.throws(() => pickMany(three, NaN), RangeError);
  assert.throws(() => pickMany(three, 1.5), RangeError);
  assert.throws(() => pickMany([], 1), /at least one/);
  assert.throws(() => pickOne(parseItems('a * 0'), true), /greater than 0/);
  assert.throws(() => pickMany(parseItems('a * -1\nb'), 1, { weighted: true }), /greater than 0/);
  // Same invalid weights are fine with weighting off.
  assert.equal(pickOne(parseItems('a * 0'), false).text, 'a');
});

test('pickMany unique: 2 of 3 equal items → each appears ≈ 2/3 (old bias: 0.78/0.67/0.56)', () => {
  for (const weighted of [false, true]) {
    const src = seeded(weighted ? 11 : 12);
    const three = items('a', 'b', 'c');
    const counts = new Map<string, number>();
    for (let t = 0; t < TRIALS; t++) {
      const got = pickMany(three, 2, { unique: true, weighted }, src);
      assert.equal(got.length, 2);
      assert.notEqual(got[0].text, got[1].text);
      for (const g of got) counts.set(g.text, (counts.get(g.text) ?? 0) + 1);
    }
    for (const name of ['a', 'b', 'c']) {
      const rate = (counts.get(name) ?? 0) / TRIALS;
      assert.ok(Math.abs(rate - 2 / 3) < 0.02, `weighted=${weighted} ${name}: ${rate}`);
    }
  }
});

test('pickMany unique weighted: sequential draws without replacement', () => {
  // Weights 2,1,1 picking 2: P(a in result) = 1/2 + 2 * (1/4) * (2/3) = 5/6.
  const src = seeded(13);
  const list = parseItems('a * 2\nb\nc');
  let a = 0;
  for (let t = 0; t < TRIALS; t++) {
    if (pickMany(list, 2, { unique: true, weighted: true }, src).some(i => i.text === 'a')) a++;
  }
  assert.ok(Math.abs(a / TRIALS - 5 / 6) < 0.02, `a: ${a / TRIALS}`);
});

test('pickMany unique: k = n returns every item once', () => {
  const list = items('a', 'b', 'c', 'd');
  const got = pickMany(list, 4, { unique: true }, seeded(3));
  assert.deepEqual(got.map(i => i.text).sort(), ['a', 'b', 'c', 'd']);
});

test('pickOne weighted: proportional to weight', () => {
  const src = seeded(21);
  const list = parseItems('a * 1\nb * 2\nc * 5');
  const counts = [0, 0, 0];
  for (let t = 0; t < TRIALS; t++) counts[pickOne(list, true, src).line]++;
  [1 / 8, 2 / 8, 5 / 8].forEach((p, i) => assert.ok(Math.abs(counts[i] / TRIALS - p) < 0.015, `${i}: ${counts[i] / TRIALS}`));
});

test('pickOne unweighted: ignores weights (hidden weights do not apply)', () => {
  const src = seeded(22);
  const list = parseItems('a * 1\nb * 100');
  let b = 0;
  for (let t = 0; t < TRIALS; t++) if (pickOne(list, false, src).text === 'b') b++;
  assert.ok(Math.abs(b / TRIALS - 0.5) < 0.02, `b: ${b / TRIALS}`);
});

test('pickMany duplicates allowed: k may exceed n, repeats happen, uniform', () => {
  const src = seeded(31);
  const list = items('x', 'x', 'y'); // two items with the same text are distinct entries
  const got = pickMany(list, 10, { unique: false }, src);
  assert.equal(got.length, 10);
  const counts = [0, 0, 0];
  for (let t = 0; t < TRIALS; t++) for (const g of pickMany(list, 2, {}, src)) counts[g.line]++;
  for (const c of counts) assert.ok(Math.abs(c / (2 * TRIALS) - 1 / 3) < 0.02, `${c / (2 * TRIALS)}`);
  let repeats = 0;
  for (let t = 0; t < 1000; t++) {
    const [p, q] = pickMany(list, 2, {}, src);
    if (p.line === q.line) repeats++;
  }
  assert.ok(repeats > 0);
});

test('shuffle: permutation, input untouched, uniform over 3 items', () => {
  const src = seeded(41);
  const input = ['a', 'b', 'c'];
  const counts = new Map<string, number>();
  for (let t = 0; t < TRIALS; t++) {
    const s = shuffle(input, src);
    const key = s.join('');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  assert.deepEqual(input, ['a', 'b', 'c']);
  assert.equal(counts.size, 6);
  for (const [k, c] of counts) assert.ok(Math.abs(c / TRIALS - 1 / 6) < 0.015, `${k}: ${c / TRIALS}`);
  assert.deepEqual(shuffle([]), []);
});

test('splitIntoGroups: balanced, every item once', () => {
  const src = seeded(51);
  const list = Array.from({ length: 10 }, (_, i) => i);
  for (const n of [1, 2, 3, 4, 7, 10, 12]) {
    const groups = splitIntoGroups(list, n, src);
    assert.equal(groups.length, n);
    const sizes = groups.map(g => g.length);
    assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1, `n=${n}: ${sizes}`);
    assert.deepEqual(groups.flat().sort((a, b) => a - b), list);
  }
  assert.throws(() => splitIntoGroups(list, 0), RangeError);
  assert.throws(() => splitIntoGroups([], 2), RangeError);
});

test('removeLines: drops picked lines by number, keeps duplicates elsewhere', () => {
  const text = 'a\nb\n\na\nc';
  const list = parseItems(text);
  const second = list.filter(i => i.text === 'a')[1];
  assert.equal(removeLines(text, [second.line]), 'a\nb\n\nc');
});
