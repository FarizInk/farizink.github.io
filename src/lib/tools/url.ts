// URL Parser — pure helpers (no DOM, no relative imports) so `node --test` can load them.
// Parsing is the WHATWG `URL` parser, the same one browsers and Node use.

/** One query parameter, in source order (duplicates kept). */
export interface QueryParam {
  /** Decoded (`%20` and `+` become spaces). */
  key: string;
  value: string;
  /** Exactly as written in the URL. */
  rawKey: string;
  rawValue: string;
}

export interface ParsedUrl {
  /** Normalised href produced by the parser. */
  href: string;
  /** True when `https://` was added because the input had no scheme. */
  assumedScheme: boolean;
  /** With trailing colon, e.g. `https:`. */
  protocol: string;
  /** Without colon, lowercase, e.g. `https`. */
  scheme: string;
  /** Special schemes (http, https, ws, wss, ftp, file) get host/port/origin semantics. */
  special: boolean;
  username: string;
  password: string;
  rawUsername: string;
  rawPassword: string;
  /** `hostname:port` as the parser keeps it. */
  host: string;
  /** ASCII hostname (IDN labels as punycode `xn--…`). */
  hostname: string;
  /** Unicode form of an IDN hostname, or null when it is the same as `hostname`. */
  hostnameUnicode: string | null;
  /** Port written in the URL. The parser drops a scheme's default port, so `https://x:443` → ''. */
  port: string;
  /** `port`, or the scheme's default; '' when there is neither. */
  effectivePort: string;
  /** True when `effectivePort` comes from the scheme default rather than the URL. */
  portImplicit: boolean;
  pathname: string;
  /** Decoded path segments (empty segments from `//` kept, leading slash dropped). */
  pathSegments: string[];
  /** With leading `?`, or ''. */
  search: string;
  /** With leading `#`, or ''. */
  hash: string;
  /** Origin, or null for opaque origins (non-special schemes such as `mailto:`). */
  origin: string | null;
  params: QueryParam[];
}

export type ParseResult =
  | { kind: 'empty' }
  | { kind: 'error'; error: string }
  | { kind: 'ok'; url: ParsedUrl };

/** Default ports for schemes that have one. */
export const DEFAULT_PORTS: Readonly<Record<string, string>> = {
  http: '80',
  https: '443',
  ws: '80',
  wss: '443',
  ftp: '21'
};

const SPECIAL = new Set(['http', 'https', 'ws', 'wss', 'ftp', 'file']);

/** Whether the WHATWG URL standard treats the scheme as "special". Accepts `https` or `https:`. */
export function isSpecialScheme(scheme: string): boolean {
  return SPECIAL.has(scheme.replace(/:$/, '').toLowerCase());
}

const SCHEME_RE = /^([a-z][a-z0-9+.-]*):(.*)$/is;
// `host`, `host:port`, `[v6]` followed by end, path, query or fragment.
const HOST_LIKE_RE = /^(?:\[[0-9a-f:.]+\]|[^\s/?#@:\\]+)(?::\d*)?(?:[/?#]|$)/i;

function looksLikeHost(s: string): boolean {
  if (!HOST_LIKE_RE.test(s)) return false;
  const host = s.split(/[/?#:]/, 1)[0];
  return s.startsWith('[') || host.includes('.') || host.toLowerCase() === 'localhost';
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Splits the raw query into params, keeping the source spelling alongside the decoded pair. */
export function parseQuery(search: string): QueryParam[] {
  const q = search.startsWith('?') ? search.slice(1) : search;
  const out: QueryParam[] = [];
  for (const piece of q.split('&')) {
    if (!piece) continue; // URLSearchParams skips empty pieces too
    const eq = piece.indexOf('=');
    const rawKey = eq === -1 ? piece : piece.slice(0, eq);
    const rawValue = eq === -1 ? '' : piece.slice(eq + 1);
    // Decode each piece with URLSearchParams so `+` and bad `%` escapes match the platform.
    const [[key, value] = ['', '']] = new URLSearchParams(piece);
    out.push({ key, value, rawKey, rawValue });
  }
  return out;
}

// --- Punycode (RFC 3492) decoding, for showing IDN hostnames in Unicode -------------------
// Node has `url.domainToUnicode`, browsers have no equivalent, so a small decoder lives here.

const BASE = 36;
const T_MIN = 1;
const T_MAX = 26;

function adapt(delta: number, numPoints: number, first: boolean): number {
  delta = first ? Math.floor(delta / 700) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > ((BASE - T_MIN) * T_MAX) >> 1) {
    delta = Math.floor(delta / (BASE - T_MIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - T_MIN + 1) * delta) / (delta + 38));
}

function punycodeDecode(input: string): string {
  const output: number[] = [];
  const basic = Math.max(input.lastIndexOf('-'), 0);
  for (let j = 0; j < basic; j++) output.push(input.charCodeAt(j));
  let n = 128;
  let bias = 72;
  let i = 0;
  for (let idx = basic > 0 ? basic + 1 : 0; idx < input.length; ) {
    const oldi = i;
    let w = 1;
    for (let k = BASE; ; k += BASE) {
      if (idx >= input.length) throw new RangeError('bad punycode');
      const c = input.charCodeAt(idx++);
      const digit =
        c >= 48 && c <= 57 ? c - 22 : c >= 65 && c <= 90 ? c - 65 : c >= 97 && c <= 122 ? c - 97 : BASE;
      if (digit >= BASE) throw new RangeError('bad punycode');
      i += digit * w;
      const t = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
    }
    const len = output.length + 1;
    bias = adapt(i - oldi, len, oldi === 0);
    n += Math.floor(i / len);
    i %= len;
    output.splice(i++, 0, n);
  }
  return String.fromCodePoint(...output);
}

/** `xn--mnchen-3ya.de` → `münchen.de`. Labels that fail to decode are left as they are. */
export function hostnameToUnicode(hostname: string): string {
  return hostname
    .split('.')
    .map(label => {
      if (!/^xn--/i.test(label)) return label;
      try {
        return punycodeDecode(label.slice(4).toLowerCase());
      } catch {
        return label;
      }
    })
    .join('.');
}

// --- Parse / build ---------------------------------------------------------------------------

/**
 * Parses user input as a URL. Adds `https://` only when there is no scheme and the input looks
 * like a host (`example.com/a`, `localhost:3000`, `//cdn.example.com/x`); every other scheme
 * (`ws:`, `mailto:`, `postgres:` …) is parsed as written.
 */
export function parseUrl(input: string): ParseResult {
  const text = input.trim();
  if (!text) return { kind: 'empty' };

  let candidate = text;
  let assumedScheme = false;
  const m = SCHEME_RE.exec(text);
  // `example.com:8080/x` and `localhost:3000` match the scheme pattern but are host:port.
  const isHostPort = !!m && /^\d+(?:[/?#]|$)/.test(m[2]) && looksLikeHost(text);
  if (!m || isHostPort) {
    if (text.startsWith('//')) {
      candidate = 'https:' + text;
    } else if (looksLikeHost(text)) {
      candidate = 'https://' + text;
    } else {
      return {
        kind: 'error',
        error: 'No scheme found. Start with one like https:// (or type a host such as example.com).'
      };
    }
    assumedScheme = true;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return {
      kind: 'error',
      error: assumedScheme
        ? `Not a valid URL, even as ${candidate}. Check the host for spaces or stray characters.`
        : 'Not a valid URL. Check the host, port and any spaces or stray characters.'
    };
  }

  const scheme = url.protocol.slice(0, -1).toLowerCase();
  const fallbackPort = DEFAULT_PORTS[scheme] ?? '';
  const unicode = hostnameToUnicode(url.hostname);
  const segments = url.pathname.replace(/^\//, '');

  return {
    kind: 'ok',
    url: {
      href: url.href,
      assumedScheme,
      protocol: url.protocol,
      scheme,
      special: isSpecialScheme(scheme),
      username: safeDecode(url.username),
      password: safeDecode(url.password),
      rawUsername: url.username,
      rawPassword: url.password,
      host: url.host,
      hostname: url.hostname,
      hostnameUnicode: unicode !== url.hostname ? unicode : null,
      port: url.port,
      effectivePort: url.port || fallbackPort,
      portImplicit: !url.port && !!fallbackPort,
      pathname: url.pathname,
      pathSegments: segments ? segments.split('/').map(safeDecode) : [],
      search: url.search,
      hash: url.hash,
      origin: url.origin === 'null' ? null : url.origin,
      params: parseQuery(url.search)
    }
  };
}

/** A key/value pair as edited in the UI (decoded text). */
export interface ParamPair {
  key: string;
  value: string;
}

/**
 * Rebuilds the href with `params` as its query (order and duplicates kept; rows with an empty
 * key and value are dropped). If the params are unchanged the original href is returned as is,
 * so an untouched URL doesn't get re-encoded.
 */
export function buildUrl(parts: Pick<ParsedUrl, 'href' | 'params'>, params: readonly ParamPair[]): string {
  const rows = params.filter(p => p.key !== '' || p.value !== '');
  const unchanged =
    rows.length === parts.params.length &&
    rows.every((p, i) => p.key === parts.params[i].key && p.value === parts.params[i].value);
  if (unchanged) return parts.href;

  const url = new URL(parts.href);
  const sp = new URLSearchParams();
  for (const p of rows) sp.append(p.key, p.value);
  url.search = sp.toString();
  return url.href;
}
