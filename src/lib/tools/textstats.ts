// Character Counter: text statistics that match what people see (graphemes) and what
// machines store (UTF-8 bytes, UTF-16 units). Pure, self-contained — tested with `node --test`.

export interface TextStats {
  /** User-perceived characters (👍🏽, 👨‍👩‍👧, "é" = 1 each). */
  graphemes: number;
  /** Unicode code points (`[...s].length`). */
  codePoints: number;
  /** UTF-16 code units (`s.length`, what JS / many APIs count). */
  utf16Units: number;
  /** UTF-8 encoded size in bytes. */
  utf8Bytes: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  /** Per-grapheme classes: they add up to `graphemes`. */
  letters: number;
  digits: number;
  whitespace: number;
  punctuation: number;
  symbols: number;
  /** Rounded to whole seconds; 0 when there are no words. */
  readingSeconds: number;
  speakingSeconds: number;
}

export const READING_WPM = 230;
export const SPEAKING_WPM = 130;

export interface StatsOptions {
  /** Set false to force the regex fallbacks (for environments without Intl.Segmenter). */
  useSegmenter?: boolean;
}

const RE_LETTER = /^\p{L}/u;
const RE_DIGIT = /^\p{N}/u;
const RE_SPACE = /^\s/u;
const RE_PUNCT = /^\p{P}/u;
const RE_WORD = /[\p{L}\p{N}\p{M}]+(?:['’.\-_][\p{L}\p{N}\p{M}]+)*/gu;
const RE_HAS_WORD = /[\p{L}\p{N}]/u;

type Kind = 'letters' | 'digits' | 'whitespace' | 'punctuation' | 'symbols';

function classify(g: string): Kind {
  const c = g.charCodeAt(0);
  if (c < 128) {
    if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) return 'letters';
    if (c >= 48 && c <= 57) return 'digits';
    if (c === 32 || (c >= 9 && c <= 13)) return 'whitespace';
    return RE_PUNCT.test(g) ? 'punctuation' : 'symbols';
  }
  if (RE_LETTER.test(g)) return 'letters';
  if (RE_DIGIT.test(g)) return 'digits';
  if (RE_SPACE.test(g)) return 'whitespace';
  if (RE_PUNCT.test(g)) return 'punctuation';
  return 'symbols';
}

function hasSegmenter(): boolean {
  return typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function';
}

let cached: { grapheme: Intl.Segmenter; word: Intl.Segmenter; sentence: Intl.Segmenter } | null = null;
function segmenters() {
  cached ??= {
    grapheme: new Intl.Segmenter(undefined, { granularity: 'grapheme' }),
    word: new Intl.Segmenter(undefined, { granularity: 'word' }),
    sentence: new Intl.Segmenter(undefined, { granularity: 'sentence' })
  };
  return cached;
}

function utf8Length(cp: number): number {
  // Lone surrogates are encoded as U+FFFD (3 bytes), same as TextEncoder.
  return cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
}

export function textStats(text: string, opts: StatsOptions = {}): TextStats {
  const seg = opts.useSegmenter !== false && hasSegmenter() ? segmenters() : null;
  const s: TextStats = {
    graphemes: 0, codePoints: 0, utf16Units: text.length, utf8Bytes: 0,
    words: 0, sentences: 0, paragraphs: 0, lines: 0,
    letters: 0, digits: 0, whitespace: 0, punctuation: 0, symbols: 0,
    readingSeconds: 0, speakingSeconds: 0
  };
  if (!text) return s;

  // Code points + UTF-8 bytes in one pass.
  for (const ch of text) {
    s.codePoints++;
    s.utf8Bytes += utf8Length(ch.codePointAt(0) ?? 0);
  }

  // Graphemes + character classes in one pass (fallback: one code point = one character).
  const graphemes: Iterable<string> = seg
    ? (function* () { for (const g of seg.grapheme.segment(text)) yield g.segment; })()
    : text;
  for (const g of graphemes) {
    s.graphemes++;
    s[classify(g)]++;
  }

  if (seg) {
    for (const w of seg.word.segment(text)) if (w.isWordLike) s.words++;
    for (const x of seg.sentence.segment(text)) if (RE_HAS_WORD.test(x.segment)) s.sentences++;
  } else {
    s.words = text.match(RE_WORD)?.length ?? 0;
    s.sentences = text.split(/[.!?…]+(?=\s|$)/u).filter(x => RE_HAS_WORD.test(x)).length;
  }

  s.paragraphs = text.split(/(?:\r\n|\r|\n)[^\S\r\n]*(?:\r\n|\r|\n)\s*/).filter(p => p.trim()).length;
  s.lines = text.split(/\r\n|\r|\n/).length;
  s.readingSeconds = Math.round((s.words / READING_WPM) * 60);
  s.speakingSeconds = Math.round((s.words / SPEAKING_WPM) * 60);
  return s;
}

/** "0 s", "45 s", "3 min", "1 h 5 min" — rounded to whole minutes from one minute up. */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} s`;
  const min = Math.round(seconds / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  return min % 60 ? `${h} h ${min % 60} min` : `${h} h`;
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

/** "980 B", "1.2 KB", "3.4 MB" (1 KB = 1024 B). */
export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/** "1 word", "2 words". */
export function plural(n: number, one: string, many = `${one}s`): string {
  return `${formatCount(n)} ${n === 1 ? one : many}`;
}

export function statsSummary(s: TextStats): string {
  return [
    plural(s.graphemes, 'character'),
    plural(s.words, 'word'),
    plural(s.utf8Bytes, 'UTF-8 byte'),
    plural(s.lines, 'line'),
    `${formatDuration(s.readingSeconds)} read`
  ].join(' · ');
}

// ── SMS ────────────────────────────────────────────────────────────────────────

const GSM_BASIC =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?' +
  '¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';
const GSM_EXTENSION = '\f^{}\\[~]|€';
const BASIC = new Set(GSM_BASIC);
const EXTENSION = new Set(GSM_EXTENSION);

export interface SmsInfo {
  encoding: 'GSM-7' | 'UCS-2';
  /** Septets (GSM-7, extension chars count 2) or UTF-16 units (UCS-2). */
  units: number;
  segments: number;
  /** Capacity of one segment at the current length: 160/153 (GSM-7) or 70/67 (UCS-2). */
  perSegment: number;
  /** Units left before another segment is needed. */
  remaining: number;
  /** Distinct characters that forced UCS-2 (empty for GSM-7). */
  unicodeChars: string[];
}

export function smsInfo(text: string): SmsInfo {
  let septets = 0;
  const unicode = new Set<string>();
  for (const ch of text) {
    if (BASIC.has(ch)) septets += 1;
    else if (EXTENSION.has(ch)) septets += 2;
    else unicode.add(ch);
  }
  const gsm = unicode.size === 0;
  const units = gsm ? septets : text.length;
  const single = gsm ? 160 : 70;
  const multi = gsm ? 153 : 67;
  const segments = units === 0 ? 0 : units <= single ? 1 : Math.ceil(units / multi);
  const perSegment = segments > 1 ? multi : single;
  return {
    encoding: gsm ? 'GSM-7' : 'UCS-2',
    units,
    segments,
    perSegment,
    remaining: Math.max(segments, 1) * perSegment - units,
    unicodeChars: [...unicode]
  };
}

// ── Limits ─────────────────────────────────────────────────────────────────────

export interface Limit {
  id: string;
  label: string;
  max: number;
  note?: string;
}

/** Counted in graphemes. X weighs some characters (URLs, CJK, emoji) differently: approximate. */
export const LIMITS: Limit[] = [
  { id: 'x', label: 'X post', max: 280, note: 'approx. — X weighs links, CJK and emoji differently' },
  { id: 'title', label: 'Meta title', max: 60 },
  { id: 'description', label: 'Meta description', max: 160 }
];

export interface LimitStatus {
  count: number;
  max: number;
  /** 0–100, clamped for the bar. */
  percent: number;
  over: boolean;
  /** Left (≥ 0) or over by (when `over`). */
  diff: number;
}

export function limitStatus(count: number, max: number): LimitStatus {
  const over = count > max;
  return {
    count,
    max,
    percent: max > 0 ? Math.min(100, (count / max) * 100) : 100,
    over,
    diff: Math.abs(max - count)
  };
}

/** Positive whole number from a text field, or null. */
export function parseLimit(input: string | number | null | undefined): number | null {
  const n = typeof input === 'number' ? input : Number(String(input ?? '').trim());
  return Number.isInteger(n) && n > 0 ? n : null;
}
