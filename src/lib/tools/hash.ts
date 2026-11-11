// Hash Generator logic: pure, bytes in → digests out. Text (UTF-8) and files share one path.
// SHA-* use SubtleCrypto; MD5 has no SubtleCrypto support, so it is implemented below (RFC 1321).
// Kept in one module: node --test can't resolve extensionless relative imports.

export const ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;
export type Algorithm = (typeof ALGORITHMS)[number];

export interface DigestResult {
  algorithm: Algorithm;
  bytes: Uint8Array;
}

export function textToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

export async function digest(algorithm: Algorithm, data: Uint8Array): Promise<Uint8Array> {
  if (algorithm === 'MD5') return md5(data);
  const buf = await crypto.subtle.digest(algorithm, data as Uint8Array<ArrayBuffer>);
  return new Uint8Array(buf);
}

/** Every algorithm in `ALGORITHMS` order. */
export function hashAll(data: Uint8Array): Promise<DigestResult[]> {
  return Promise.all(ALGORITHMS.map(async algorithm => ({ algorithm, bytes: await digest(algorithm, data) })));
}

export function toHex(bytes: Uint8Array, uppercase = false): string {
  let out = '';
  for (const b of bytes) out += b.toString(16).padStart(2, '0');
  return uppercase ? out.toUpperCase() : out;
}

export function toBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

export type OutputEncoding = 'hex' | 'base64';

export function formatDigest(bytes: Uint8Array, encoding: OutputEncoding, uppercase = false): string {
  return encoding === 'base64' ? toBase64(bytes) : toHex(bytes, uppercase);
}

// Leading labels people paste along with a digest: "sha256:", "SHA-256=", "sha512-" (SRI), "md5 ", "0x".
const LABEL = /^(?:md5|sha-?(?:1|224|256|384|512))\s*[:=\- ]\s*/i;

/** Trim, drop whitespace and a leading algorithm/0x label. Returns '' for blank input. */
export function normalizeExpected(input: string): string {
  const v = input.trim().replace(LABEL, '').replace(/\s+/g, '');
  // "0x" only counts as a prefix when hex follows, so a Base64 digest starting with "0x" survives.
  return /^0x[0-9a-f]+$/i.test(v) ? v.slice(2) : v;
}

/** True when `expected` equals the digest as hex (any case) or as Base64 (exact). */
export function matchesDigest(expected: string, bytes: Uint8Array): boolean {
  const e = normalizeExpected(expected);
  if (!e) return false;
  if (/^[0-9a-f]+$/i.test(e) && e.toLowerCase() === toHex(bytes)) return true;
  // Base64 is case-sensitive; tolerate missing "=" padding.
  return e.replace(/=+$/, '') === toBase64(bytes).replace(/=+$/, '');
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = n / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${units[i]}`;
}

// ───────── MD5 (RFC 1321) ─────────
// MD5 per RFC 1321. SubtleCrypto has no MD5, so it is implemented here (no dependency).
// Pure: bytes in, 16-byte digest out.

// Per-round left-rotation amounts (RFC 1321 §3.4).
const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15,
  21, 6, 10, 15, 21, 6, 10, 15, 21
];

// T[i] = floor(abs(sin(i + 1)) * 2^32)
const T = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0);

export function md5(input: Uint8Array): Uint8Array {
  const len = input.length;
  // Pad: 0x80, zeros to 56 mod 64, then the 64-bit little-endian bit length.
  const padded = new Uint8Array((((len + 8) >>> 6) + 1) << 6);
  padded.set(input);
  padded[len] = 0x80;
  const view = new DataView(padded.buffer);
  const bitLen = len * 8;
  view.setUint32(padded.length - 8, bitLen >>> 0, true);
  view.setUint32(padded.length - 4, Math.floor(bitLen / 0x100000000) >>> 0, true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;
  const M = new Uint32Array(16);

  for (let off = 0; off < padded.length; off += 64) {
    for (let j = 0; j < 16; j++) M[j] = view.getUint32(off + j * 4, true);
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) & 15;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) & 15;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) & 15;
      }
      const sum = (a + f + T[i] + M[g]) | 0;
      a = d;
      d = c;
      c = b;
      b = (b + ((sum << S[i]) | (sum >>> (32 - S[i])))) | 0;
    }
    a0 = (a0 + a) | 0;
    b0 = (b0 + b) | 0;
    c0 = (c0 + c) | 0;
    d0 = (d0 + d) | 0;
  }

  const out = new Uint8Array(16);
  const ov = new DataView(out.buffer);
  ov.setUint32(0, a0 >>> 0, true);
  ov.setUint32(4, b0 >>> 0, true);
  ov.setUint32(8, c0 >>> 0, true);
  ov.setUint32(12, d0 >>> 0, true);
  return out;
}
