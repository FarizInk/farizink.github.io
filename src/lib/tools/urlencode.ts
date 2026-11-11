// Pure helpers for the URL Encoder tool (tested in tests/urlencode.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.

/**
 * - `component`: encodeURIComponent — for one query value or path segment; escapes everything reserved.
 * - `uri`: encodeURI — for a whole URL; keeps : / ? # & = + @ etc. so the URL still works.
 * - `form`: application/x-www-form-urlencoded (HTML forms, URLSearchParams) — spaces become `+`.
 */
export type UrlMode = 'component' | 'uri' | 'form';

export type UrlResult = { ok: true; value: string } | { ok: false; message: string };

export const URL_MODES: readonly UrlMode[] = ['component', 'uri', 'form'];

export function isUrlMode(value: unknown): value is UrlMode {
  return value === 'component' || value === 'uri' || value === 'form';
}

/** Characters encodeURI keeps as-is; decodeURI leaves their %XX escapes alone too. */
const URI_RESERVED = new Set([';', '/', '?', ':', '@', '&', '=', '+', '$', ',', '#']);

function hex2(byte: number): string {
  return '%' + byte.toString(16).toUpperCase().padStart(2, '0');
}

export function encodeUrl(text: string, mode: UrlMode): UrlResult {
  try {
    if (mode === 'uri') return { ok: true, value: encodeURI(text) };
    const encoded = encodeURIComponent(text);
    if (mode === 'component') return { ok: true, value: encoded };
    // Form encoding (WHATWG): only A-Z a-z 0-9 * - . _ stay literal, space becomes '+'.
    return {
      ok: true,
      value: encoded.replace(/[!'()~]/g, c => hex2(c.charCodeAt(0))).replace(/%20/g, '+')
    };
  } catch {
    return {
      ok: false,
      message: 'The text contains a broken character (an unpaired UTF-16 surrogate) that cannot be encoded.'
    };
  }
}

function isHex(c: string | undefined): boolean {
  return c !== undefined && /^[0-9A-Fa-f]$/.test(c);
}

/**
 * Decode a run of UTF-8 bytes. Returns the text, or the index (into `bytes`) of the
 * byte where the sequence goes wrong.
 */
function decodeUtf8(bytes: number[]): { ok: true; value: string } | { ok: false; at: number } {
  let out = '';
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i];
    let need = 0;
    let cp = 0;
    let min = 0;
    if (b < 0x80) {
      out += String.fromCharCode(b);
      i++;
      continue;
    } else if (b >= 0xc2 && b <= 0xdf) {
      need = 1;
      cp = b & 0x1f;
      min = 0x80;
    } else if (b >= 0xe0 && b <= 0xef) {
      need = 2;
      cp = b & 0x0f;
      min = 0x800;
    } else if (b >= 0xf0 && b <= 0xf4) {
      need = 3;
      cp = b & 0x07;
      min = 0x10000;
    } else {
      return { ok: false, at: i };
    }
    for (let k = 1; k <= need; k++) {
      const c = bytes[i + k];
      if (c === undefined || (c & 0xc0) !== 0x80) return { ok: false, at: i };
      cp = (cp << 6) | (c & 0x3f);
    }
    if (cp < min || cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) return { ok: false, at: i };
    out += String.fromCodePoint(cp);
    i += need + 1;
  }
  return { ok: true, value: out };
}

/** Position for messages: 1-based character column. */
function at(index: number): string {
  return `character ${index + 1}`;
}

export function decodeUrl(text: string, mode: UrlMode): UrlResult {
  const src = mode === 'form' ? text.replace(/\+/g, ' ') : text;
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src[i] !== '%') {
      out += src[i];
      i++;
      continue;
    }
    // Collect a run of consecutive %XX escapes: a multi-byte character spans several.
    const start = i;
    const bytes: number[] = [];
    const offsets: number[] = [];
    while (src[i] === '%') {
      if (!isHex(src[i + 1]) || !isHex(src[i + 2])) {
        const seq = src.slice(i, i + 3);
        return {
          ok: false,
          message: `Malformed escape "${seq}" at ${at(i)}: "%" must be followed by two hex digits (0-9, A-F). Write a literal % as %25.`
        };
      }
      bytes.push(parseInt(src.slice(i + 1, i + 3), 16));
      offsets.push(i);
      i += 3;
    }
    const decoded = decodeUtf8(bytes);
    if (!decoded.ok) {
      const pos = offsets[decoded.at];
      return {
        ok: false,
        message: `Invalid UTF-8 sequence starting at ${at(pos)} ("${src.slice(pos, start + bytes.length * 3)}"): the bytes don't form a complete character.`
      };
    }
    if (mode === 'uri') {
      // Like decodeURI: keep escapes of reserved characters, so the URL's structure doesn't change.
      let k = 0;
      for (const ch of decoded.value) {
        const cp = ch.codePointAt(0) ?? 0;
        const len = cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
        out += URI_RESERVED.has(ch) ? src.slice(offsets[k], offsets[k] + 3) : ch;
        k += len;
      }
    } else {
      out += decoded.value;
    }
  }
  return { ok: true, value: out };
}

/**
 * Heuristic: the text already contains valid percent-escapes (e.g. `%20`, `%C3%A9`), so encoding
 * it again would double-encode (`%20` → `%2520`).
 */
export function looksEncoded(text: string): boolean {
  if (!/%[0-9A-Fa-f]{2}/.test(text)) return false;
  return decodeUrl(text, 'component').ok;
}

/** Apply `fn` to each line; keeps empty lines so input and output line up. First failing line wins. */
function eachLine(text: string, fn: (line: string) => UrlResult): UrlResult {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  for (let n = 0; n < lines.length; n++) {
    const r = fn(lines[n]);
    if (!r.ok) return { ok: false, message: `Line ${n + 1}: ${r.message}` };
    out.push(r.value);
  }
  return { ok: true, value: out.join('\n') };
}

export function encodeUrlLines(text: string, mode: UrlMode): UrlResult {
  return eachLine(text, line => encodeUrl(line, mode));
}

export function decodeUrlLines(text: string, mode: UrlMode): UrlResult {
  return eachLine(text, line => decodeUrl(line, mode));
}
