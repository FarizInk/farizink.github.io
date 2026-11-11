// Pure helpers for the QR Code Generator: payload builders, contrast checks, capacity.
// Self-contained (no relative imports) so `node --test` can load it directly.

export type Ecc = 'L' | 'M' | 'Q' | 'H';
export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

/** Byte-mode capacity of the largest QR code (version 40) per error-correction level. */
export const BYTE_CAPACITY: Record<Ecc, number> = { L: 2953, M: 2331, Q: 1663, H: 1273 };

/** Share of damaged code each level can recover from. */
export const ECC_RECOVERY: Record<Ecc, string> = { L: '7%', M: '15%', Q: '25%', H: '30%' };

export interface CapacityHint {
  bytes: number;
  text: string;
}

export function capacityHint(ecc: Ecc): CapacityHint {
  const bytes = BYTE_CAPACITY[ecc];
  return {
    bytes,
    text: `Level ${ecc} fits at most ${bytes.toLocaleString('en-US')} bytes (${ECC_RECOVERY[ecc]} recovery). Lower the level or shorten the content.`
  };
}

/** Number of bytes `text` takes as UTF-8 (what byte mode encodes). */
export function utf8Length(text: string): number {
  return new TextEncoder().encode(text).length;
}

// ── Payload builders ───────────────────────────────────────────────

/** Escape the characters that are special in the WIFI: format: \ ; , : " */
export function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

export interface WifiInput {
  ssid: string;
  password?: string;
  security?: WifiSecurity;
  hidden?: boolean;
}

export function wifiPayload({ ssid, password = '', security = 'WPA', hidden = false }: WifiInput): string {
  if (!ssid) return '';
  const pass = security === 'nopass' ? '' : `P:${escapeWifi(password)};`;
  return `WIFI:T:${security};S:${escapeWifi(ssid)};${pass}H:${hidden ? 'true' : 'false'};;`;
}

export interface EmailInput {
  to: string;
  subject?: string;
  body?: string;
}

export function emailPayload({ to, subject = '', body = '' }: EmailInput): string {
  const addr = to.trim();
  if (!addr && !subject && !body) return '';
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${addr}${params.length ? `?${params.join('&')}` : ''}`;
}

/** Keep digits, a leading +, and the dial characters * # ; drop spaces, dashes, brackets. */
export function cleanPhone(phone: string): string {
  const trimmed = phone.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  return plus + trimmed.replace(/[^0-9*#]/g, '');
}

export function phonePayload(phone: string): string {
  const n = cleanPhone(phone);
  return n ? `tel:${n}` : '';
}

/** SMSTO:<number>:<message> — the form most scanner apps prefill. */
export function smsPayload(phone: string, message = ''): string {
  const n = cleanPhone(phone);
  if (!n && !message) return '';
  return message ? `SMSTO:${n}:${message}` : `SMSTO:${n}`;
}

/** Escape a vCard 3.0 text value: \ , ; and newlines. */
export function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r\n|\r|\n/g, '\\n');
}

export interface VCardInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  org?: string;
  url?: string;
}

export function vcardPayload(v: VCardInput): string {
  const first = (v.firstName ?? '').trim();
  const last = (v.lastName ?? '').trim();
  const phone = (v.phone ?? '').trim();
  const email = (v.email ?? '').trim();
  const org = (v.org ?? '').trim();
  const url = (v.url ?? '').trim();
  if (!first && !last && !phone && !email && !org && !url) return '';

  const full = [first, last].filter(Boolean).join(' ') || org;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
    `FN:${escapeVCard(full)}`
  ];
  if (org) lines.push(`ORG:${escapeVCard(org)}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(phone)}`);
  if (email) lines.push(`EMAIL:${escapeVCard(email)}`);
  if (url) lines.push(`URL:${escapeVCard(url)}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

// ── Colors ─────────────────────────────────────────────────────────

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHexColor(value: string): boolean {
  return HEX.test(value.trim());
}

/** '#abc' / 'abc' / '#aabbcc' → '#aabbcc' (lowercase); null when invalid. */
export function normalizeHex(value: string): string | null {
  const m = HEX.exec(value.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].replace(/./g, c => c + c) : m[1];
  return `#${h.toLowerCase()}`;
}

/** WCAG 2.x relative luminance of a hex color (0 = black, 1 = white). */
export function luminance(hex: string): number {
  const h = normalizeHex(hex);
  if (!h) throw new Error(`Invalid hex color: ${hex}`);
  const channel = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

/** WCAG contrast ratio between two hex colors, 1–21. */
export function contrastRatio(hexA: string, hexB: string): number {
  const a = luminance(hexA);
  const b = luminance(hexB);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** Minimum contrast below which many phone cameras fail to read the code. */
export const MIN_SCAN_CONTRAST = 4;

/** A warning when the colors are likely to make the code unscannable, else null. */
export function scanWarning(fg: string, bg: string): string | null {
  if (!isHexColor(fg) || !isHexColor(bg)) return null;
  const ratio = contrastRatio(fg, bg);
  if (luminance(fg) > luminance(bg)) {
    return `Foreground is lighter than background — inverted codes don't scan on many readers.`;
  }
  if (ratio < MIN_SCAN_CONTRAST) {
    return `Contrast is ${ratio.toFixed(1)}:1 — aim for at least ${MIN_SCAN_CONTRAST}:1 or scanners may fail.`;
  }
  return null;
}
