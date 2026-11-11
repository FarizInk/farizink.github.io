// JWT Decoder logic: pure parsing + findings, plus optional HMAC verification via WebCrypto.
// Kept in one module: node --test can't resolve extensionless relative imports.

export type JsonObject = Record<string, unknown>;

export type FindingLevel = 'error' | 'warning' | 'info';
export type FindingCode =
  | 'expired'
  | 'not-yet-valid'
  | 'issued-in-future'
  | 'alg-none'
  | 'missing-exp'
  | 'missing-signature'
  | 'bad-time-claim';

export interface Finding {
  level: FindingLevel;
  code: FindingCode;
  message: string;
}

export interface Segments {
  header: string;
  payload: string;
  signature: string;
}

export type DecodeResult =
  | { kind: 'empty' }
  | { kind: 'error'; error: string }
  | {
      kind: 'jws';
      /** The token after trimming and stripping a `Bearer ` prefix. */
      token: string;
      header: JsonObject;
      payload: JsonObject;
      segments: Segments;
      /** Signature as its base64url segment ('' for unsecured tokens). */
      signature: string;
      alg: string | undefined;
      findings: Finding[];
    }
  | {
      kind: 'jwe';
      token: string;
      header: JsonObject;
      /** The five raw segments: header, encrypted key, IV, ciphertext, tag. */
      parts: string[];
      alg: string | undefined;
      message: string;
    };

/** Tolerated clock skew for `iat` in the future, in seconds. */
export const IAT_SKEW_SECONDS = 60;

const B64URL = /^[A-Za-z0-9_-]*={0,2}$/;

/** Decode a base64url (or padded) segment to bytes. Throws on invalid input. */
export function base64UrlToBytes(input: string): Uint8Array {
  if (!B64URL.test(input)) throw new Error('contains characters outside the base64url alphabet');
  const bare = input.replace(/=+$/, '');
  if (bare.length % 4 === 1) throw new Error('has an impossible length for base64url');
  const b64 = bare.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/** Decode a base64url segment as UTF-8 text. Throws on invalid base64url or invalid UTF-8. */
export function base64UrlDecode(input: string): string {
  const bytes = base64UrlToBytes(input);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('is not valid UTF-8 text');
  }
}

/** Trim whitespace (including inner line breaks from wrapped pastes) and a leading `Bearer `. */
export function normalizeToken(input: string): string {
  return input
    .trim()
    .replace(/^bearer(\s+|$)/i, '')
    .replace(/\s+/g, '');
}

function decodeJsonSegment(segment: string, name: 'Header' | 'Payload'): JsonObject {
  if (segment === '') throw new Error(`${name} segment is empty.`);
  let text: string;
  try {
    text = base64UrlDecode(segment);
  } catch (e) {
    throw new Error(`${name} is not valid base64url: it ${(e as Error).message}.`);
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error(`${name} decodes to text that is not JSON.`);
  }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${name} is JSON but not an object.`);
  }
  return value as JsonObject;
}

/** Human relative time between `date` and `now` (ms): "in 3 h", "2 d ago", "just now". */
export function relativeTime(date: Date, now: number): string {
  const diff = Math.round((date.getTime() - now) / 1000);
  const abs = Math.abs(diff);
  if (abs < 5) return 'just now';
  let amount: string;
  if (abs < 60) amount = `${abs} s`;
  else if (abs < 3600) amount = `${Math.floor(abs / 60)} min`;
  else if (abs < 86400) amount = `${Math.floor(abs / 3600)} h`;
  else if (abs < 86400 * 365) amount = `${Math.floor(abs / 86400)} d`;
  else amount = `${Math.floor(abs / (86400 * 365))} y`;
  return diff > 0 ? `in ${amount}` : `${amount} ago`;
}

/** A NumericDate claim (seconds since epoch) as a Date, or undefined when absent/invalid. */
export function claimDate(payload: JsonObject, claim: string): Date | undefined {
  const v = payload[claim];
  return typeof v === 'number' && Number.isFinite(v) ? new Date(v * 1000) : undefined;
}

export const TIME_CLAIMS = ['exp', 'nbf', 'iat'] as const;

function findingsFor(header: JsonObject, payload: JsonObject, signature: string, now: number): Finding[] {
  const out: Finding[] = [];
  const alg = header.alg;
  if (typeof alg === 'string' && alg.toLowerCase() === 'none') {
    out.push({
      level: 'warning',
      code: 'alg-none',
      message: 'alg is "none": the token is unsigned and anyone could have written it.'
    });
  } else if (signature === '') {
    out.push({ level: 'warning', code: 'missing-signature', message: 'Signature segment is empty.' });
  }

  for (const claim of TIME_CLAIMS) {
    if (claim in payload && claimDate(payload, claim) === undefined) {
      out.push({
        level: 'warning',
        code: 'bad-time-claim',
        message: `${claim} is not a number of seconds since 1970.`
      });
    }
  }

  const exp = claimDate(payload, 'exp');
  const nbf = claimDate(payload, 'nbf');
  const iat = claimDate(payload, 'iat');
  if (exp && exp.getTime() < now) {
    out.push({ level: 'error', code: 'expired', message: `Expired ${relativeTime(exp, now)}.` });
  }
  if (nbf && nbf.getTime() > now) {
    out.push({ level: 'error', code: 'not-yet-valid', message: `Not valid yet — becomes valid ${relativeTime(nbf, now)}.` });
  }
  if (iat && iat.getTime() > now + IAT_SKEW_SECONDS * 1000) {
    out.push({ level: 'warning', code: 'issued-in-future', message: `Issued in the future (${relativeTime(iat, now)}).` });
  }
  if (!('exp' in payload)) {
    out.push({ level: 'info', code: 'missing-exp', message: 'No exp claim: this token never expires on its own.' });
  }
  return out;
}

/** Decode a JWT (JWS, or the header of a JWE). `now` is in milliseconds. Never throws. */
export function decodeJwt(input: string, now: number = Date.now()): DecodeResult {
  const token = normalizeToken(input);
  if (token === '') return { kind: 'empty' };
  const parts = token.split('.');

  try {
    if (parts.length === 5) {
      const header = decodeJsonSegment(parts[0], 'Header');
      return {
        kind: 'jwe',
        token,
        header,
        parts,
        alg: typeof header.alg === 'string' ? header.alg : undefined,
        message: 'This is an encrypted token (JWE). Its payload cannot be decoded without the decryption key.'
      };
    }
    if (parts.length !== 3) {
      const error =
        parts.length === 1
          ? 'No dots found — a JWT has three base64url parts: header.payload.signature.'
          : `Expected 3 dot-separated parts (header.payload.signature), found ${parts.length}.`;
      return { kind: 'error', error };
    }
    const [h, p, s] = parts;
    const header = decodeJsonSegment(h, 'Header');
    const payload = decodeJsonSegment(p, 'Payload');
    if (s !== '' && !B64URL.test(s)) {
      return { kind: 'error', error: 'Signature is not valid base64url: it contains characters outside the base64url alphabet.' };
    }
    return {
      kind: 'jws',
      token,
      header,
      payload,
      segments: { header: h, payload: p, signature: s },
      signature: s,
      alg: typeof header.alg === 'string' ? header.alg : undefined,
      findings: findingsFor(header, payload, s, now)
    };
  } catch (e) {
    return { kind: 'error', error: (e as Error).message };
  }
}

const HMAC_HASH: Record<string, string> = { HS256: 'SHA-256', HS384: 'SHA-384', HS512: 'SHA-512' };

/** True when `alg` is an HMAC algorithm this module can verify. */
export function isHmacAlg(alg: string | undefined): boolean {
  return alg !== undefined && alg in HMAC_HASH;
}

export type VerifyStatus = 'valid' | 'invalid' | 'unsupported-alg' | 'malformed';

export interface VerifyOptions {
  /** How the secret string is turned into key bytes. Default 'utf8'. */
  secretEncoding?: 'utf8' | 'base64';
}

/** Verify an HS256/384/512 signature with a shared secret, locally via WebCrypto. */
export async function verifyHmac(input: string, secret: string, options: VerifyOptions = {}): Promise<VerifyStatus> {
  const decoded = decodeJwt(input);
  if (decoded.kind !== 'jws') return 'malformed';
  const hash = decoded.alg ? HMAC_HASH[decoded.alg] : undefined;
  if (!hash) return 'unsupported-alg';

  let keyBytes: Uint8Array;
  if (options.secretEncoding === 'base64') {
    try {
      keyBytes = base64UrlToBytes(secret.trim().replace(/\+/g, '-').replace(/\//g, '_'));
    } catch {
      return 'invalid';
    }
  } else {
    keyBytes = new TextEncoder().encode(secret);
  }
  // WebCrypto rejects zero-length HMAC keys; an empty secret simply doesn't match.
  if (keyBytes.length === 0) return 'invalid';

  let sig: Uint8Array;
  try {
    sig = base64UrlToBytes(decoded.signature);
  } catch {
    return 'invalid';
  }
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes as Uint8Array<ArrayBuffer>,
    { name: 'HMAC', hash },
    false,
    ['verify']
  );
  const data = new TextEncoder().encode(`${decoded.segments.header}.${decoded.segments.payload}`);
  const ok = await crypto.subtle.verify('HMAC', key, sig as Uint8Array<ArrayBuffer>, data);
  return ok ? 'valid' : 'invalid';
}
