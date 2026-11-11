// Pure helpers for the HTML Entity Encoder tool (tested in tests/htmlentities.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports. Decoding is plain string work,
// so nothing in the input is ever parsed or executed as HTML.

/**
 * - `minimal`: only & < > " ' (safe in text and quoted attributes).
 * - `named`: like minimal, plus named entities (&copy; &nbsp; &mdash; …) where one exists.
 * - `numeric`: decimal references (&#38; &#169;).
 * - `hex`: hexadecimal references (&#x26; &#xA9;).
 */
export type HtmlMode = 'minimal' | 'named' | 'numeric' | 'hex';

export interface HtmlEncodeOptions {
  mode: HtmlMode;
  /** Also encode every character outside ASCII (é, —, 🎉) — named where possible in `named` mode. */
  nonAscii: boolean;
}

export function isHtmlMode(value: unknown): value is HtmlMode {
  return value === 'minimal' || value === 'named' || value === 'numeric' || value === 'hex';
}

/** Name → character. Covers the five specials plus the common typographic, currency, math and Latin-1 ones. */
export const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0',
  ensp: '\u2002',
  emsp: '\u2003',
  thinsp: '\u2009',
  zwnj: '\u200C',
  zwj: '\u200D',
  shy: '\u00AD',
  copy: '©',
  reg: '®',
  trade: '™',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  laquo: '«',
  raquo: '»',
  lsaquo: '‹',
  rsaquo: '›',
  bull: '•',
  middot: '·',
  dagger: '†',
  Dagger: '‡',
  prime: '′',
  Prime: '″',
  permil: '‰',
  sect: '§',
  para: '¶',
  deg: '°',
  iexcl: '¡',
  iquest: '¿',
  euro: '€',
  pound: '£',
  yen: '¥',
  cent: '¢',
  curren: '¤',
  plusmn: '±',
  times: '×',
  divide: '÷',
  minus: '−',
  ne: '≠',
  le: '≤',
  ge: '≥',
  asymp: '≈',
  infin: '∞',
  sum: '∑',
  radic: '√',
  micro: 'µ',
  frac14: '¼',
  frac12: '½',
  frac34: '¾',
  sup1: '¹',
  sup2: '²',
  sup3: '³',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  harr: '↔',
  hearts: '♥',
  spades: '♠',
  clubs: '♣',
  diams: '♦',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  pi: 'π',
  sigma: 'σ',
  omega: 'ω',
  Omega: 'Ω',
  Agrave: 'À',
  Aacute: 'Á',
  Acirc: 'Â',
  Atilde: 'Ã',
  Auml: 'Ä',
  Aring: 'Å',
  AElig: 'Æ',
  Ccedil: 'Ç',
  Egrave: 'È',
  Eacute: 'É',
  Ecirc: 'Ê',
  Euml: 'Ë',
  Iacute: 'Í',
  Ntilde: 'Ñ',
  Oacute: 'Ó',
  Ouml: 'Ö',
  Oslash: 'Ø',
  Uacute: 'Ú',
  Uuml: 'Ü',
  szlig: 'ß',
  agrave: 'à',
  aacute: 'á',
  acirc: 'â',
  atilde: 'ã',
  auml: 'ä',
  aring: 'å',
  aelig: 'æ',
  ccedil: 'ç',
  egrave: 'è',
  eacute: 'é',
  ecirc: 'ê',
  euml: 'ë',
  iacute: 'í',
  icirc: 'î',
  iuml: 'ï',
  ntilde: 'ñ',
  oacute: 'ó',
  ocirc: 'ô',
  ouml: 'ö',
  oslash: 'ø',
  uacute: 'ú',
  ucirc: 'û',
  uuml: 'ü',
  yuml: 'ÿ'
};

/** Character → name (the reverse table, used by `named` mode). */
const NAME_FOR: ReadonlyMap<string, string> = new Map(
  Object.entries(NAMED_ENTITIES).map(([name, ch]) => [ch, name])
);

/** The characters that are always escaped, with the minimal-mode reference for each. */
const SPECIAL: Readonly<Record<string, string>> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function dec(cp: number): string {
  return `&#${cp};`;
}

function hex(cp: number): string {
  return `&#x${cp.toString(16).toUpperCase()};`;
}

export function encodeHtml(text: string, options: HtmlEncodeOptions): string {
  const { mode, nonAscii } = options;
  let out = '';
  // for…of walks code points, so an emoji is one reference, not two surrogate halves.
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    const special = ch in SPECIAL;
    if (mode === 'numeric' && (special || (nonAscii && cp > 0x7f))) {
      out += dec(cp);
    } else if (mode === 'hex' && (special || (nonAscii && cp > 0x7f))) {
      out += hex(cp);
    } else if (mode === 'named' && (special || cp > 0x7f) && NAME_FOR.has(ch)) {
      out += `&${NAME_FOR.get(ch)};`;
    } else if (special) {
      out += SPECIAL[ch];
    } else if (nonAscii && cp > 0x7f) {
      out += hex(cp);
    } else {
      out += ch;
    }
  }
  return out;
}

function fromCodePoint(cp: number): string {
  // Null, surrogates and out-of-range values decode to U+FFFD, as browsers do.
  if (cp === 0 || cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) return '\uFFFD';
  return String.fromCodePoint(cp);
}

/**
 * Decode named (from NAMED_ENTITIES), decimal (`&#169;`) and hex (`&#xA9;`) references.
 * The terminating `;` is required. Unknown entities and stray `&` stay exactly as written,
 * and tags are left as literal text — nothing is parsed as HTML.
 */
export function decodeHtml(text: string): string {
  return text.replace(/&(?:#[xX]([0-9A-Fa-f]{1,8})|#([0-9]{1,10})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole, h, d, name) => {
    if (h !== undefined) return fromCodePoint(parseInt(h, 16));
    if (d !== undefined) return fromCodePoint(parseInt(d, 10));
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : whole;
  });
}

/** Entities shown in the tool's reference table. `label` names characters that are invisible on screen. */
export const REFERENCE: ReadonlyArray<{ char: string; entity: string; label?: string }> = [
  { char: '&', entity: '&amp;' },
  { char: '<', entity: '&lt;' },
  { char: '>', entity: '&gt;' },
  { char: '"', entity: '&quot;' },
  { char: "'", entity: '&#39;' },
  { char: '\u00A0', entity: '&nbsp;', label: '(non-breaking space)' },
  { char: '\u00AD', entity: '&shy;', label: '(soft hyphen)' },
  { char: '©', entity: '&copy;' },
  { char: '®', entity: '&reg;' },
  { char: '™', entity: '&trade;' },
  { char: '…', entity: '&hellip;' },
  { char: '—', entity: '&mdash;' },
  { char: '–', entity: '&ndash;' },
  { char: '“', entity: '&ldquo;' },
  { char: '”', entity: '&rdquo;' },
  { char: '€', entity: '&euro;' },
  { char: '×', entity: '&times;' },
  { char: '→', entity: '&rarr;' }
];
