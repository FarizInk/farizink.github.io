// Random Picker logic — pure, framework-free, unit-tested in tests/random.test.ts.
// Randomness only from a CSPRNG (crypto.getRandomValues). The source is injectable so tests
// can pass a deterministic or seeded generator. Self-contained: no relative imports, so Node's
// type-stripping test runner loads it unchanged.
//
// Item syntax: one item per line. With weights on, a line may end in `* <weight>`
// ("Pizza * 3" is three times as likely as a weight-1 line). The last `*` splits name and weight.

/** Fills the array with uniformly random 32-bit values (same contract as crypto.getRandomValues). */
export type RandomSource = (buf: Uint32Array) => unknown;

export const cryptoSource: RandomSource = buf => crypto.getRandomValues(buf);

export interface Item {
  /** Display name (weight suffix removed when weights are parsed). */
  text: string;
  /** Relative weight; only used when weighting is on. May be invalid (0, negative, NaN) — see validateItems. */
  weight: number;
  /** 0-based line number in the source text, so a pick can be removed from the list. */
  line: number;
}

export interface PickOptions {
  /** No repeats: each item at most once. */
  unique?: boolean;
  /** Use item weights. */
  weighted?: boolean;
}

const RANGE = 2 ** 32;

/**
 * Unbiased integer in [0, n). Rejection sampling: values at or above the largest multiple of n
 * that fits in 32 bits are discarded, so every residue is equally likely.
 */
export function randomInt(n: number, source: RandomSource = cryptoSource): number {
  if (!Number.isInteger(n) || n < 1 || n > RANGE) {
    throw new RangeError(`randomInt: n must be an integer in 1..2^32, got ${n}`);
  }
  const limit = RANGE - (RANGE % n);
  const buf = new Uint32Array(1);
  for (;;) {
    source(buf);
    const x = buf[0];
    if (x < limit) return x % n;
  }
}

/** Uniform float in [0, 1) with 53 random bits. */
export function randomFloat(source: RandomSource = cryptoSource): number {
  const buf = new Uint32Array(2);
  source(buf);
  return ((buf[0] >>> 5) * 2 ** 26 + (buf[1] >>> 6)) / 2 ** 53;
}

/** Splits text into items: one per line, trimmed, empty lines dropped. */
export function parseItems(text: string, opts: { weights?: boolean } = {}): Item[] {
  const weights = opts.weights ?? true;
  const out: Item[] = [];
  text.split(/\r?\n/).forEach((raw, line) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const star = trimmed.lastIndexOf('*');
    if (weights && star > 0) {
      const name = trimmed.slice(0, star).trim();
      const token = trimmed.slice(star + 1).trim();
      if (name) {
        out.push({ text: name, weight: token === '' ? NaN : Number(token), line });
        return;
      }
    }
    out.push({ text: trimmed, weight: 1, line });
  });
  return out;
}

/** First problem with the items for this mode, or null. */
export function validateItems(items: Item[], weighted: boolean): string | null {
  if (items.length === 0) return 'Add at least one item.';
  if (weighted) {
    const bad = items.find(it => !Number.isFinite(it.weight) || it.weight <= 0);
    if (bad) return `Line ${bad.line + 1} ("${bad.text}"): weight must be a number greater than 0.`;
  }
  return null;
}

function assertValid(items: Item[], weighted: boolean): void {
  const err = validateItems(items, weighted);
  if (err) throw new RangeError(err);
}

/** Index of a weighted draw from `items`. */
function weightedIndex(items: Item[], source: RandomSource): number {
  let total = 0;
  for (const it of items) total += it.weight;
  let r = randomFloat(source) * total;
  for (let i = 0; i < items.length; i++) {
    r -= items[i].weight;
    if (r < 0) return i;
  }
  return items.length - 1; // floating-point rounding: last item
}

/** One item, uniformly or by weight. */
export function pickOne<T extends Item>(items: T[], weighted = false, source: RandomSource = cryptoSource): T {
  assertValid(items, weighted);
  return items[weighted ? weightedIndex(items, source) : randomInt(items.length, source)];
}

/**
 * k items. unique + unweighted: partial Fisher–Yates. unique + weighted: sequential weighted
 * draws without replacement (total recomputed after each removal). Not unique: independent draws.
 */
export function pickMany<T extends Item>(
  items: T[],
  k: number,
  opts: PickOptions = {},
  source: RandomSource = cryptoSource
): T[] {
  const { unique = false, weighted = false } = opts;
  assertValid(items, weighted);
  if (!Number.isInteger(k) || k < 1) throw new RangeError('Number of picks must be a whole number of at least 1.');
  if (unique && k > items.length) {
    throw new RangeError(`Can't pick ${k} without repeats from ${items.length} item${items.length === 1 ? '' : 's'}.`);
  }

  if (!unique) {
    return Array.from({ length: k }, () => items[weighted ? weightedIndex(items, source) : randomInt(items.length, source)]);
  }
  const pool = items.slice();
  if (!weighted) {
    for (let i = 0; i < k; i++) {
      const j = i + randomInt(pool.length - i, source);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, k);
  }
  const out: T[] = [];
  for (let i = 0; i < k; i++) {
    const j = weightedIndex(pool, source);
    out.push(pool[j]);
    pool.splice(j, 1);
  }
  return out;
}

/** New array in uniformly random order (Fisher–Yates). */
export function shuffle<T>(items: readonly T[], source: RandomSource = cryptoSource): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, source);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffles, then deals round-robin into nGroups groups; sizes differ by at most 1. */
export function splitIntoGroups<T>(items: readonly T[], nGroups: number, source: RandomSource = cryptoSource): T[][] {
  if (!Number.isInteger(nGroups) || nGroups < 1) throw new RangeError('Number of groups must be a whole number of at least 1.');
  if (items.length === 0) throw new RangeError('Add at least one item.');
  const groups: T[][] = Array.from({ length: nGroups }, () => []);
  shuffle(items, source).forEach((it, i) => groups[i % nGroups].push(it));
  return groups;
}

/** Removes the given 0-based lines from text (used for elimination draws). */
export function removeLines(text: string, lines: Iterable<number>): string {
  const drop = new Set(lines);
  return text
    .split(/\r?\n/)
    .filter((_, i) => !drop.has(i))
    .join('\n');
}
