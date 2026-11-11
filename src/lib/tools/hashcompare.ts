// Hash Comparer helpers — pure and self-contained (no relative imports) so `node --test` can load them.

export type DigestEncoding = 'hex' | 'base64' | 'base64url' | 'unknown';

export interface NormalizedDigest {
  /** The input as typed. */
  raw: string;
  /** Digest with labels, prefixes, filename and all whitespace removed. Empty when the input is blank. */
  value: string;
  encoding: DigestEncoding | 'empty';
  /** Prefix/label that was stripped, e.g. `sha256-`, `SHA-256=`, `0x`. */
  prefix?: string;
  /** Algorithm named by a stripped label (`sha256:` → SHA-256). Claimed by the input, not verified. */
  declaredAlgorithm?: string;
  /** Filename from a `sha256sum`/`md5sum` or BSD `SHA256 (file) = …` line. */
  filename?: string;
  /** Looks like a salted password hash (bcrypt, argon2, scrypt, crypt). */
  passwordHash?: boolean;
}

export interface AlgorithmGuess {
  /** `MD5`, `SHA-256` … or `unknown`. Length alone can't prove the algorithm, so this is a guess. */
  algorithm: string;
  byteLength: number | null;
  /** Human label, e.g. `likely SHA-256 (64 hex)`. */
  label: string;
}

export type CompareStatus = 'empty' | 'waiting' | 'match' | 'mismatch' | 'different-encoding';

export interface CompareResult {
  status: CompareStatus;
  /** 0-based index into `display` strings of the first differing character; null when equal or not compared. */
  firstDifferenceIndex: number | null;
  /** Normalized lengths (characters) of both digests. */
  lengths: [number, number];
  /** true/false when both algorithm guesses are known; null otherwise. */
  sameAlgorithm: boolean | null;
  left: NormalizedDigest;
  right: NormalizedDigest;
  /** How the strings were compared: case-insensitive hex, exact base64/text, or decoded bytes. */
  comparedAs: 'hex' | 'exact' | 'bytes' | null;
  /** The two strings to show aligned in a diff (hex when compared as bytes). */
  display: [string, string];
}

const ALGORITHMS: Record<number, string> = {
  16: 'MD5',
  20: 'SHA-1',
  28: 'SHA-224',
  32: 'SHA-256',
  48: 'SHA-384',
  64: 'SHA-512'
};

const ALGO_NAMES: Record<string, string> = {
  md5: 'MD5',
  sha1: 'SHA-1',
  sha224: 'SHA-224',
  sha256: 'SHA-256',
  sha384: 'SHA-384',
  sha512: 'SHA-512'
};

const ALGO_PATTERN = 'md5|sha-?1|sha-?224|sha-?256|sha-?384|sha-?512';
// BSD/openssl style: `SHA256 (file.iso) = abc…`
const BSD_LINE = new RegExp(`^(${ALGO_PATTERN})\\s*\\((.*)\\)\\s*=\\s*(\\S+)$`, 'i');
// Label + separator: `sha256:`, `sha256-` (SRI), `SHA-256=` (Digest header), `md5 `.
const LABEL = new RegExp(`^(${ALGO_PATTERN})(\\s*[:=]\\s*|-|\\s+)`, 'i');
// coreutils: `<hex>  filename` or `<hex> *filename` (binary mode); a leading `\` marks escaped names.
const SUM_LINE = /^\\?([0-9a-f]{8,})[ \t]+\*?(.+)$/i;
const PASSWORD_HASH = /^\$(2[abxy]?|argon2(id|i|d)|scrypt|[156])\$/;

function algoName(label: string): string {
  return ALGO_NAMES[label.toLowerCase().replace('-', '')] ?? label.toUpperCase();
}

function detectEncoding(value: string, preferBase64: boolean): DigestEncoding {
  if (!preferBase64 && /^[0-9a-f]+$/i.test(value)) return 'hex';
  if (/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return 'base64';
  if (/^[A-Za-z0-9_-]+={0,2}$/.test(value)) return 'base64url';
  if (/^[0-9a-f]+$/i.test(value)) return 'hex';
  return 'unknown';
}

/** Strip labels, prefixes, checksum-file formatting and whitespace; detect the encoding. */
export function normalizeDigest(input: string): NormalizedDigest {
  const raw = input;
  let s = input.trim();
  if (!s) return { raw, value: '', encoding: 'empty' };
  if (PASSWORD_HASH.test(s)) {
    return { raw, value: s.replace(/\s+/g, ''), encoding: 'unknown', passwordHash: true };
  }

  const result: NormalizedDigest = { raw, value: '', encoding: 'unknown' };
  let preferBase64 = false;
  const singleLine = !/[\r\n]/.test(s);

  const bsd = singleLine ? BSD_LINE.exec(s) : null;
  if (bsd) {
    result.declaredAlgorithm = algoName(bsd[1]);
    result.filename = bsd[2];
    s = bsd[3];
  } else {
    const label = LABEL.exec(s);
    if (label) {
      const sep = label[2].trim();
      result.prefix = label[0].trim() || label[0];
      result.declaredAlgorithm = algoName(label[1]);
      // SRI (`sha256-`) and Digest headers (`SHA-256=`) carry base64.
      preferBase64 = sep === '-' || sep === '=';
      s = s.slice(label[0].length).trim();
    }
    if (/^0x/i.test(s)) {
      result.prefix = (result.prefix ?? '') + s.slice(0, 2);
      s = s.slice(2);
    }
    if (!preferBase64 && !/[\r\n]/.test(s)) {
      const sum = SUM_LINE.exec(s);
      // Only a filename if the rest isn't more hex (a digest pasted in space-separated groups).
      if (sum && !/^[0-9a-f\s]+$/i.test(sum[2])) {
        result.filename = sum[2].trim();
        s = sum[1];
      }
    }
  }

  result.value = s.replace(/\s+/g, '');
  result.encoding = result.value ? detectEncoding(result.value, preferBase64) : 'empty';
  return result;
}

function base64ByteLength(value: string): number | null {
  const body = value.replace(/=+$/, '');
  const rem = body.length % 4;
  if (rem === 1) return null;
  return Math.floor((body.length * 3) / 4);
}

/** Guess the algorithm from digest length. Length can't prove it, so the label says "likely". */
export function detectAlgorithm(normalized: string, encoding: DigestEncoding | 'empty'): AlgorithmGuess {
  const len = normalized.length;
  let bytes: number | null = null;
  let unit = '';
  if (encoding === 'hex') {
    bytes = len % 2 === 0 ? len / 2 : null;
    unit = `${len} hex`;
  } else if (encoding === 'base64' || encoding === 'base64url') {
    bytes = base64ByteLength(normalized);
    unit = bytes === null ? `${len} chars` : `${bytes} bytes`;
  }
  const algorithm = bytes !== null ? ALGORITHMS[bytes] : undefined;
  if (!algorithm) {
    return {
      algorithm: 'unknown',
      byteLength: bytes,
      label: encoding === 'empty' ? '' : `unknown algorithm${unit ? ` (${unit})` : ''}`
    };
  }
  return { algorithm, byteLength: bytes, label: `likely ${algorithm} (${unit})` };
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0 || !/^[0-9a-f]*$/i.test(hex)) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function base64ToBytes(value: string): Uint8Array | null {
  let b = value.replace(/-/g, '+').replace(/_/g, '/').replace(/=+$/, '');
  if (b.length % 4 === 1) return null;
  b += '='.repeat((4 - (b.length % 4)) % 4);
  try {
    const bin = atob(b);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

export function toBytes(d: NormalizedDigest): Uint8Array | null {
  if (d.encoding === 'hex') return hexToBytes(d.value);
  if (d.encoding === 'base64' || d.encoding === 'base64url') return base64ToBytes(d.value);
  return null;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

/** Index of the first differing character, or null when the strings are equal. */
export function firstDifference(a: string, b: string): number | null {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return i;
  return a.length === b.length ? null : n;
}

/** Compare two pasted digests. Hex is case-insensitive, base64 is exact; mixed encodings compare bytes. */
export function compareDigests(a: string, b: string): CompareResult {
  const left = normalizeDigest(a);
  const right = normalizeDigest(b);
  const lengths: [number, number] = [left.value.length, right.value.length];
  const base = { left, right, lengths, firstDifferenceIndex: null, comparedAs: null, display: [left.value, right.value] as [string, string] };

  if (!left.value && !right.value) return { ...base, status: 'empty', sameAlgorithm: null };
  if (!left.value || !right.value) return { ...base, status: 'waiting', sameAlgorithm: null };

  const ga = detectAlgorithm(left.value, left.encoding);
  const gb = detectAlgorithm(right.value, right.encoding);
  const sameAlgorithm = ga.algorithm !== 'unknown' && gb.algorithm !== 'unknown' ? ga.algorithm === gb.algorithm : null;

  if (left.encoding === 'hex' && right.encoding === 'hex') {
    const display: [string, string] = [left.value.toLowerCase(), right.value.toLowerCase()];
    const idx = firstDifference(display[0], display[1]);
    return { ...base, display, comparedAs: 'hex', sameAlgorithm, status: idx === null ? 'match' : 'mismatch', firstDifferenceIndex: idx };
  }

  if (left.encoding !== right.encoding) {
    const ba = toBytes(left);
    const bb = toBytes(right);
    if (ba && bb) {
      const display: [string, string] = [bytesToHex(ba), bytesToHex(bb)];
      const idx = firstDifference(display[0], display[1]);
      return {
        ...base,
        display,
        comparedAs: 'bytes',
        sameAlgorithm,
        status: idx === null ? 'different-encoding' : 'mismatch',
        firstDifferenceIndex: idx
      };
    }
  }

  // Same non-hex encoding (base64 is case-sensitive) or undecodable input: exact comparison.
  const idx = firstDifference(left.value, right.value);
  return { ...base, comparedAs: 'exact', sameAlgorithm, status: idx === null ? 'match' : 'mismatch', firstDifferenceIndex: idx };
}
