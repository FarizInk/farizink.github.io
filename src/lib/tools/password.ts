// Password Generator logic — pure, framework-free, unit-tested in tests/password.test.ts.
// Randomness only from a CSPRNG (crypto.getRandomValues). The source is injectable so
// tests can pass a deterministic generator.
// The passphrase word list is passed in (see src/lib/tools/wordlist.ts) instead of imported,
// so this module loads unchanged in Vite and in Node's type-stripping test runner.

/** Fills the array with uniformly random 32-bit values (same contract as crypto.getRandomValues). */
export type RandomSource = (buf: Uint32Array) => unknown;

export const cryptoSource: RandomSource = buf => crypto.getRandomValues(buf);

const RANGE = 2 ** 32;

/**
 * Unbiased integer in [0, n). Rejection sampling: values at or above the largest multiple
 * of n that fits in 32 bits are discarded, so every residue is equally likely.
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

/** In-place Fisher–Yates shuffle driven by randomInt. */
export function shuffle<T>(items: T[], source: RandomSource = cryptoSource): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(i + 1, source);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// ── Character mode ────────────────────────────────────────────────────────────

export const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const DIGITS = '0123456789';
export const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>?/~';
/** Characters that are easy to confuse when read or typed. */
export const AMBIGUOUS = 'Il1|O0o`\'"';

export interface CharOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
  /** Extra characters added as their own class (deduplicated against the others). */
  custom?: string;
  excludeAmbiguous?: boolean;
}

function uniqueChars(s: string): string[] {
  return [...new Set([...s])];
}

/**
 * The enabled character classes after filtering. Each class is non-empty and no character
 * appears in two classes. Custom characters only count as a class when they add something new.
 */
export function charClasses(opts: CharOptions): string[][] {
  const drop = (c: string) => /\s/.test(c) || (opts.excludeAmbiguous === true && AMBIGUOUS.includes(c));
  const seen = new Set<string>();
  const classes: string[][] = [];
  const add = (chars: string) => {
    const cls = uniqueChars(chars).filter(c => !drop(c) && !seen.has(c));
    cls.forEach(c => seen.add(c));
    if (cls.length > 0) classes.push(cls);
  };
  if (opts.upper) add(UPPER);
  if (opts.lower) add(LOWER);
  if (opts.digits) add(DIGITS);
  if (opts.symbols) add(SYMBOLS);
  if (opts.custom) add(opts.custom);
  return classes;
}

/** The full deduplicated pool a character password draws from. */
export function charset(opts: CharOptions): string {
  return charClasses(opts).flat().join('');
}

/**
 * Random password with at least one character from every enabled class:
 * one pick per class, the rest from the whole pool, then a CSPRNG shuffle.
 */
export function generatePassword(opts: CharOptions, source: RandomSource = cryptoSource): string {
  const classes = charClasses(opts);
  if (classes.length === 0) throw new Error('Enable at least one character type.');
  if (!Number.isInteger(opts.length) || opts.length < classes.length) {
    throw new Error(`Length must be at least ${classes.length} to include every enabled character type.`);
  }
  const pool = classes.flat();
  const out = classes.map(cls => cls[randomInt(cls.length, source)]);
  while (out.length < opts.length) out.push(pool[randomInt(pool.length, source)]);
  return shuffle(out, source).join('');
}

// ── Passphrase mode ───────────────────────────────────────────────────────────

export interface PassphraseOptions {
  words: number;
  separator: string;
  capitalize: boolean;
  /** Append one random digit (0–9) after the last word. */
  appendDigit: boolean;
}

export function generatePassphrase(
  opts: PassphraseOptions,
  list: readonly string[],
  source: RandomSource = cryptoSource
): string {
  if (list.length < 2) throw new Error('The word list is empty.');
  if (!Number.isInteger(opts.words) || opts.words < 1) throw new Error('Use at least one word.');
  const picked = Array.from({ length: opts.words }, () => {
    const w = list[randomInt(list.length, source)];
    return opts.capitalize ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  });
  let phrase = picked.join(opts.separator);
  if (opts.appendDigit) phrase += String(randomInt(10, source));
  return phrase;
}

// ── Strength ──────────────────────────────────────────────────────────────────

export type EntropyInput =
  | { mode: 'chars'; length: number; charsetSize: number }
  | { mode: 'passphrase'; words: number; listSize: number; appendDigit?: boolean };

/**
 * Bits of entropy of the generator (not of a given string):
 * chars = length × log2(charset), passphrase = words × log2(list) (+ log2(10) for the digit).
 * Capitalisation and the separator are fixed choices, so they add nothing.
 */
export function entropyBits(input: EntropyInput): number {
  if (input.mode === 'chars') {
    return input.charsetSize > 1 && input.length > 0 ? input.length * Math.log2(input.charsetSize) : 0;
  }
  if (input.listSize < 2 || input.words < 1) return 0;
  return input.words * Math.log2(input.listSize) + (input.appendDigit ? Math.log2(10) : 0);
}

export type StrengthBand = 'weak' | 'fair' | 'strong' | 'very-strong';

export interface Strength {
  band: StrengthBand;
  label: string;
  /** 0..1 fill for a meter (128 bits = full). */
  ratio: number;
}

export function strengthOf(bits: number): Strength {
  const ratio = Math.max(0, Math.min(1, bits / 128));
  if (bits < 40) return { band: 'weak', label: 'Weak', ratio };
  if (bits < 60) return { band: 'fair', label: 'Fair', ratio };
  if (bits < 80) return { band: 'strong', label: 'Strong', ratio };
  return { band: 'very-strong', label: 'Very strong', ratio };
}
