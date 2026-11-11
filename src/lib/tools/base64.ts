// Base64 Converter logic: byte-based encode/decode (standard + URL-safe), UTF-8 text helpers,
// hex preview, data URIs and magic-number MIME sniffing.
// Kept in one module: node --test can't resolve extensionless relative imports.

export interface EncodeOptions {
  /** Use the URL-safe alphabet (`-` and `_` instead of `+` and `/`). */
  urlSafe?: boolean;
  /** Keep trailing `=` padding (default true). */
  padding?: boolean;
  /** Insert a newline every 76 characters (MIME style). */
  lineWrap76?: boolean;
}

export type DecodeResult =
  | { ok: true; bytes: Uint8Array; mime?: string }
  | { ok: false; error: string };

export type TextResult = { ok: true; text: string } | { ok: false };

export interface SniffResult {
  mime: string;
  ext: string;
  label: string;
}

const STD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** char code → 6-bit value; accepts both alphabets. -1 = not a Base64 character. */
const LOOKUP = (() => {
  const table = new Int16Array(128).fill(-1);
  for (let i = 0; i < STD.length; i++) table[STD.charCodeAt(i)] = i;
  table['-'.charCodeAt(0)] = 62;
  table['_'.charCodeAt(0)] = 63;
  return table;
})();

function encodeChunk(bytes: Uint8Array, start: number, end: number, out: string[]): void {
  let s = '';
  for (let i = start; i < end; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < end ? bytes[i + 1] : 0;
    const b2 = i + 2 < end ? bytes[i + 2] : 0;
    const n = (b0 << 16) | (b1 << 8) | b2;
    s += STD[(n >> 18) & 63] + STD[(n >> 12) & 63];
    s += i + 1 < end ? STD[(n >> 6) & 63] : '=';
    s += i + 2 < end ? STD[n & 63] : '=';
  }
  out.push(s);
}

/** Base64-encode raw bytes. */
export function encodeBytes(bytes: Uint8Array, opts: EncodeOptions = {}): string {
  const { urlSafe = false, padding = true, lineWrap76 = false } = opts;
  // Chunked so multi-megabyte files don't build one giant concatenation chain.
  const CHUNK = 3 * 8192;
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += CHUNK) {
    encodeChunk(bytes, i, Math.min(i + CHUNK, bytes.length), parts);
  }
  let out = parts.join('');
  if (urlSafe) out = out.replace(/\+/g, '-').replace(/\//g, '_');
  if (!padding) out = out.replace(/=+$/, '');
  if (lineWrap76 && out.length > 76) {
    const lines: string[] = [];
    for (let i = 0; i < out.length; i += 76) lines.push(out.slice(i, i + 76));
    out = lines.join('\n');
  }
  return out;
}

/** Base64-encode a string as UTF-8. */
export function encodeText(text: string, opts: EncodeOptions = {}): string {
  return encodeBytes(new TextEncoder().encode(text), opts);
}

function isSpace(c: number): boolean {
  return c === 32 || c === 9 || c === 10 || c === 13 || c === 12 || c === 11;
}

const DATA_URI = /^\s*data:([^,]*);base64,/i;

/**
 * Decode Base64 to bytes. Ignores whitespace, accepts standard and URL-safe alphabets
 * (even mixed), restores missing padding and strips a `data:<mime>;base64,` prefix.
 * Positions in errors are 1-based and refer to the original input.
 */
export function decodeToBytes(input: string): DecodeResult {
  let start = 0;
  let mime: string | undefined;
  const m = DATA_URI.exec(input);
  if (m) {
    start = m[0].length;
    mime = m[1].split(';')[0].trim().toLowerCase() || undefined;
  }

  const values = new Uint8Array(Math.max(0, input.length - start));
  let n = 0;
  let pad = 0;
  for (let i = start; i < input.length; i++) {
    const c = input.charCodeAt(i);
    if (isSpace(c)) continue;
    if (c === 61 /* = */) {
      pad++;
      continue;
    }
    const v = c < 128 ? LOOKUP[c] : -1;
    if (v < 0) {
      const ch = String.fromCodePoint(input.codePointAt(i) ?? c);
      return { ok: false, error: `Invalid character "${ch}" at position ${i + 1}.` };
    }
    if (pad > 0) {
      return { ok: false, error: `Unexpected data after "=" padding at position ${i + 1}.` };
    }
    values[n++] = v;
  }

  if (n % 4 === 1) {
    return {
      ok: false,
      error: `Impossible length: ${n} Base64 characters can't form whole bytes (one character too many or too few).`
    };
  }
  if (pad > 0) {
    const expected = (4 - (n % 4)) % 4;
    if (pad !== expected) {
      return {
        ok: false,
        error: `Wrong padding: expected ${expected === 0 ? 'no' : expected} "=" for ${n} characters, found ${pad}.`
      };
    }
  }

  const out = new Uint8Array(Math.floor((n * 3) / 4));
  let o = 0;
  let i = 0;
  for (; i + 4 <= n; i += 4) {
    const x = (values[i] << 18) | (values[i + 1] << 12) | (values[i + 2] << 6) | values[i + 3];
    out[o++] = (x >> 16) & 255;
    out[o++] = (x >> 8) & 255;
    out[o++] = x & 255;
  }
  const rest = n - i;
  if (rest === 2) {
    out[o++] = ((values[i] << 2) | (values[i + 1] >> 4)) & 255;
  } else if (rest === 3) {
    const x = (values[i] << 12) | (values[i + 1] << 6) | values[i + 2];
    out[o++] = (x >> 10) & 255;
    out[o++] = (x >> 2) & 255;
  }
  return mime ? { ok: true, bytes: out, mime } : { ok: true, bytes: out };
}

/** Interpret bytes as strict UTF-8. */
export function bytesToText(bytes: Uint8Array): TextResult {
  try {
    const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
    return { ok: true, text };
  } catch {
    return { ok: false };
  }
}

function hex2(b: number): string {
  return b.toString(16).padStart(2, '0');
}

/** Classic hexdump of the first `max` bytes: offset, 16 hex bytes, printable ASCII. */
export function toHexPreview(bytes: Uint8Array, max = 256): string {
  const len = Math.min(bytes.length, max);
  const lines: string[] = [];
  for (let off = 0; off < len; off += 16) {
    const row = bytes.subarray(off, Math.min(off + 16, len));
    const hex = Array.from(row, hex2).join(' ').padEnd(16 * 3 - 1, ' ');
    const ascii = Array.from(row, b => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('');
    lines.push(`${off.toString(16).padStart(8, '0')}  ${hex}  |${ascii}|`);
  }
  if (bytes.length > max) lines.push(`… ${bytes.length - max} more bytes`);
  return lines.join('\n');
}

/** `data:<mime>;base64,<standard padded Base64>` */
export function toDataUri(bytes: Uint8Array, mime = 'application/octet-stream'): string {
  return `data:${mime || 'application/octet-stream'};base64,${encodeBytes(bytes)}`;
}

function startsWith(bytes: Uint8Array, sig: number[], offset = 0): boolean {
  if (bytes.length < offset + sig.length) return false;
  return sig.every((b, i) => bytes[offset + i] === b);
}

const ascii = (s: string) => Array.from(s, c => c.charCodeAt(0));

/** Recognise a few common file types by their magic numbers. */
export function sniffMime(bytes: Uint8Array): SniffResult | null {
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return { mime: 'image/png', ext: 'png', label: 'PNG' };
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return { mime: 'image/jpeg', ext: 'jpg', label: 'JPEG' };
  if (startsWith(bytes, ascii('GIF87a')) || startsWith(bytes, ascii('GIF89a')))
    return { mime: 'image/gif', ext: 'gif', label: 'GIF' };
  if (startsWith(bytes, ascii('RIFF')) && startsWith(bytes, ascii('WEBP'), 8))
    return { mime: 'image/webp', ext: 'webp', label: 'WebP' };
  if (startsWith(bytes, ascii('%PDF-'))) return { mime: 'application/pdf', ext: 'pdf', label: 'PDF' };
  if (
    startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
    startsWith(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
    startsWith(bytes, [0x50, 0x4b, 0x07, 0x08])
  )
    return { mime: 'application/zip', ext: 'zip', label: 'ZIP' };
  if (startsWith(bytes, [0x1f, 0x8b])) return { mime: 'application/gzip', ext: 'gz', label: 'gzip' };
  return null;
}

/** File extension for a MIME type we know, else 'bin'. */
export function extForMime(mime: string | undefined): string {
  const known: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/gzip': 'gz',
    'application/json': 'json',
    'text/plain': 'txt',
    'text/html': 'html',
    'text/css': 'css'
  };
  return (mime && known[mime]) || 'bin';
}

/** Human-readable byte size: 0 B, 512 B, 1.5 KB, 2.25 MB. */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = n / 1024;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u++;
  }
  return `${parseFloat(v.toFixed(2))} ${units[u]}`;
}
