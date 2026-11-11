// Pure helpers for the Slug Generator tool (tested in tests/slug.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.

export type SlugSeparator = '-' | '_' | '.' | '';

export interface SlugOptions {
  /** Joins words. '' glues them together. Default '-'. */
  separator?: string;
  /** Lowercase the result. Default true. */
  lowercase?: boolean;
  /** Turn accented / special Latin letters into ASCII (é → e, ß → ss). Default true. */
  transliterate?: boolean;
  /** Keep letters and digits from any script (日本語, Ελληνικά) instead of dropping them. Default false. */
  keepUnicode?: boolean;
  /** Drop common English stop words (a, the, of …). Default false. */
  removeStopWords?: boolean;
  /** Maximum length in characters; 0 or less = no limit. Default 0. */
  maxLength?: number;
  /** When truncating, keep whole words only. Default true. */
  breakAtWord?: boolean;
  /** Replace '&' with the word "and". Default false. */
  ampersand?: boolean;
}

export const DEFAULT_SLUG_OPTIONS: Required<SlugOptions> = {
  separator: '-',
  lowercase: true,
  transliterate: true,
  keepUnicode: false,
  removeStopWords: false,
  maxLength: 0,
  breakAtWord: true,
  ampersand: false
};

export const STOP_WORDS: ReadonlySet<string> = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'nor', 'so', 'yet',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'into', 'onto', 'as', 'about', 'than',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall',
  'this', 'that', 'these', 'those', 'it', 'its'
]);

/** Latin letters that NFKD does not decompose into a base letter + marks. */
const TRANSLIT: Record<string, string> = {
  ß: 'ss', ẞ: 'SS',
  æ: 'ae', Æ: 'AE',
  ø: 'o', Ø: 'O',
  œ: 'oe', Œ: 'OE',
  đ: 'd', Đ: 'D',
  ð: 'd', Ð: 'D',
  ł: 'l', Ł: 'L',
  þ: 'th', Þ: 'TH',
  ħ: 'h', Ħ: 'H',
  ŧ: 't', Ŧ: 'T',
  ı: 'i', ĸ: 'k', ŀ: 'l', Ŀ: 'L', ƒ: 'f'
};

// A Latin letter plus any combining marks that follow it.
const LATIN_CLUSTER = /\p{Script=Latin}\p{M}*/gu;
const MARKS = /\p{M}/gu;
// Apostrophes inside a word vanish: "don't" → "dont", not "don-t".
const INNER_APOSTROPHE = /(?<=[\p{L}\p{N}])['’ʼ](?=[\p{L}\p{N}])/gu;
const ASCII_WORD = /[A-Za-z0-9]+/g;
const UNICODE_WORD = /[\p{L}\p{N}][\p{L}\p{N}\p{M}]*/gu;

function transliterateLatin(text: string): string {
  return text.replace(LATIN_CLUSTER, cluster => {
    const base = cluster.normalize('NFC');
    if (base in TRANSLIT) return TRANSLIT[base];
    const stripped = cluster.normalize('NFKD').replace(MARKS, '');
    return [...stripped].map(c => TRANSLIT[c] ?? c).join('');
  });
}

/** Splits text into slug words (letters/digits only) after normalising it. */
function words(text: string, o: Required<SlugOptions>): string[] {
  // NFKC folds full-width letters, ligatures and superscripts but keeps kana composed.
  let s = text.normalize('NFKC');
  if (o.ampersand) s = s.replace(/&/g, ' and ');
  if (o.lowercase) s = s.toLowerCase();
  if (o.transliterate) s = transliterateLatin(s);
  s = s.replace(INNER_APOSTROPHE, '');
  const found = s.match(o.keepUnicode ? UNICODE_WORD : ASCII_WORD) ?? [];
  if (!o.removeStopWords) return found;
  const kept = found.filter(w => !STOP_WORDS.has(w.toLowerCase()));
  // A title made only of stop words ("To Be") still deserves a slug.
  return kept.length ? kept : found;
}

function cut(chars: string[], max: number): string {
  return chars.slice(0, max).join('');
}

/** Turns any text into a URL slug. Never throws; returns '' when nothing usable remains. */
export function slugify(text: string, opts: SlugOptions = {}): string {
  const o: Required<SlugOptions> = { ...DEFAULT_SLUG_OPTIONS, ...opts };
  const sep = o.separator;
  const list = words(String(text ?? ''), o);
  const full = list.join(sep);
  const max = Math.floor(o.maxLength);
  if (!(max > 0) || [...full].length <= max) return full;

  if (o.breakAtWord && sep !== '') {
    let out = '';
    let len = 0;
    for (const w of list) {
      const add = (out ? [...sep].length : 0) + [...w].length;
      if (len + add > max) break;
      out += (out ? sep : '') + w;
      len += add;
    }
    // A first word longer than the limit is cut rather than returning nothing.
    if (out) return out;
    return cut([...list[0]], max);
  }

  // Hard cut, then make sure the slug never ends with a separator.
  let out = cut([...full], max);
  if (sep) while (out.endsWith(sep)) out = out.slice(0, -sep.length);
  return out;
}

/** One slug per non-blank line; lines that produce no slug are skipped. */
export function slugifyLines(text: string, opts: SlugOptions = {}): string[] {
  return String(text ?? '')
    .split(/\r\n|\r|\n/)
    .map(line => slugify(line, opts))
    .filter(Boolean);
}

/** Makes every slug unique by appending -2, -3 … to repeats (separator configurable). */
export function uniqueSlugs(list: readonly string[], separator = '-'): string[] {
  const used = new Set<string>();
  const counts = new Map<string, number>();
  return list.map(slug => {
    if (!used.has(slug)) {
      used.add(slug);
      return slug;
    }
    let n = counts.get(slug) ?? 1;
    let candidate: string;
    do {
      n++;
      candidate = `${slug}${separator}${n}`;
    } while (used.has(candidate));
    counts.set(slug, n);
    used.add(candidate);
    return candidate;
  });
}
