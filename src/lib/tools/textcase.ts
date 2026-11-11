// Pure helpers for the Text Case Converter tool (tested in tests/textcase.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.
//
// Every word-based case goes through one Unicode-aware tokenizer:
// - Words are runs of letters (\p{L}), combining marks (\p{M}) and numbers (\p{N}) in any
//   script, so `café olé` keeps its accents and `日本語` is a word. Everything else
//   (spaces, punctuation, `_`, `-`, `.`, `/`, emoji …) separates words and is dropped.
// - An apostrophe between two letters is removed first, so `don't` is one word (`dont`)
//   rather than `don` + `t`.
// - Inside a run, new words start at a lower → Upper hump (`helloWorld` → hello, World) and
//   where an acronym meets a capitalised word (`XMLHttpRequest` → XML, Http, Request).
// - Digits: a letter ↔ digit change also starts a new word, so `version2Beta` → version, 2,
//   Beta and `utf8` → utf, 8 (snake_case gives `utf_8`). camelCase / PascalCase glue them back
//   (`version2Beta`), and the results are stable when converted again.
//
// Text-preserving transforms (aLtErNaTiNg, iNVERSE) keep the input as is and only change the
// case of letters. They walk code points (`[...s]`), so emoji and astral characters stay whole.

/** Apostrophes (straight and typographic) between two letters are dropped. */
const APOSTROPHE = /(?<=\p{L}\p{M}*)['’](?=\p{L})/gu;
/** Anything that is not a letter, mark or number separates words. */
const SEPARATOR = /[^\p{L}\p{M}\p{N}]+/u;
/** Zero-width word boundaries inside a run of letters/digits. */
const BOUNDARY = new RegExp(
  [
    '(?<=\\p{Ll}\\p{M}*)(?=\\p{Lu})', // lower → Upper: helloWorld
    '(?<=\\p{Lu}\\p{M}*)(?=\\p{Lu}\\p{M}*\\p{Ll})', // ACRONYM → Word: XMLHttp
    '(?<=\\p{L}\\p{M}*)(?=\\p{N})', // letter → digit: version2
    '(?<=\\p{N})(?=\\p{L})' // digit → letter: 2Beta
  ].join('|'),
  'u'
);

/** Split text into words (see the header comment for the rules). Never returns empty strings. */
export function tokenize(text: string): string[] {
  return text
    .replace(APOSTROPHE, '')
    .split(SEPARATOR)
    .flatMap(run => run.split(BOUNDARY))
    .filter(w => w !== '');
}

const lower = (w: string) => w.toLowerCase();
const upper = (w: string) => w.toUpperCase();
/** First code point upper case, the rest lower case. */
function capitalize(w: string): string {
  const [first = '', ...rest] = [...w];
  return first.toUpperCase() + rest.join('').toLowerCase();
}

/**
 * Words kept lower case in Title Case unless they are the first or last word:
 * articles, coordinating conjunctions and short prepositions (common style-guide list).
 */
export const TITLE_SMALL_WORDS: ReadonlySet<string> = new Set([
  'a',
  'an',
  'the',
  'and',
  'but',
  'or',
  'nor',
  'for',
  'so',
  'yet',
  'as',
  'at',
  'by',
  'in',
  'of',
  'off',
  'on',
  'per',
  'to',
  'up',
  'via',
  'vs'
]);

// ---- word-based cases ------------------------------------------------------------

export function camelCase(text: string): string {
  return tokenize(text)
    .map((w, i) => (i === 0 ? lower(w) : capitalize(w)))
    .join('');
}

export function pascalCase(text: string): string {
  return tokenize(text).map(capitalize).join('');
}

export function snakeCase(text: string): string {
  return tokenize(text).map(lower).join('_');
}

export function constantCase(text: string): string {
  return tokenize(text).map(upper).join('_');
}

export function kebabCase(text: string): string {
  return tokenize(text).map(lower).join('-');
}

export function trainCase(text: string): string {
  return tokenize(text).map(capitalize).join('-');
}

export function dotCase(text: string): string {
  return tokenize(text).map(lower).join('.');
}

export function pathCase(text: string): string {
  return tokenize(text).map(lower).join('/');
}

/** Words capitalised and joined by spaces; small words (TITLE_SMALL_WORDS) stay lower case except first/last. */
export function titleCase(text: string): string {
  const words = tokenize(text);
  const last = words.length - 1;
  return words
    .map((w, i) => {
      const l = lower(w);
      return i !== 0 && i !== last && TITLE_SMALL_WORDS.has(l) ? l : capitalize(w);
    })
    .join(' ');
}

/** First word capitalised, the rest lower case, joined by spaces. */
export function sentenceCase(text: string): string {
  return tokenize(text)
    .map((w, i) => (i === 0 ? capitalize(w) : lower(w)))
    .join(' ');
}

/** Words in lower case joined by single spaces (punctuation dropped). */
export function lowerCase(text: string): string {
  return tokenize(text).map(lower).join(' ');
}

/** Words in upper case joined by single spaces (punctuation dropped). */
export function upperCase(text: string): string {
  return tokenize(text).map(upper).join(' ');
}

// ---- text-preserving transforms --------------------------------------------------

const isCased = (c: string) => c.toLowerCase() !== c.toUpperCase();

/**
 * aLtErNaTiNg case: letters alternate lower/upper, starting lower. Only letters that have a
 * case advance the alternation, so spaces, digits and emoji don't break the rhythm.
 */
export function alternatingCase(text: string): string {
  let n = 0;
  return [...text]
    .map(c => {
      if (!isCased(c)) return c;
      return n++ % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
    })
    .join('');
}

/** iNVERSE case: every upper-case letter becomes lower case and vice versa. */
export function inverseCase(text: string): string {
  return [...text].map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase())).join('');
}

// ---- catalogue --------------------------------------------------------------------

export type CaseGroup = 'code' | 'text';

export type CaseId =
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'constant'
  | 'kebab'
  | 'train'
  | 'dot'
  | 'path'
  | 'title'
  | 'sentence'
  | 'lower'
  | 'upper'
  | 'alternating'
  | 'inverse';

export interface CaseDef {
  id: CaseId;
  label: string;
  group: CaseGroup;
  /** False for transforms that keep the text as is (line splitting makes no difference). */
  wordBased: boolean;
  convert: (text: string) => string;
}

export const CASES: readonly CaseDef[] = [
  { id: 'camel', label: 'camelCase', group: 'code', wordBased: true, convert: camelCase },
  { id: 'pascal', label: 'PascalCase', group: 'code', wordBased: true, convert: pascalCase },
  { id: 'snake', label: 'snake_case', group: 'code', wordBased: true, convert: snakeCase },
  { id: 'constant', label: 'CONSTANT_CASE', group: 'code', wordBased: true, convert: constantCase },
  { id: 'kebab', label: 'kebab-case', group: 'code', wordBased: true, convert: kebabCase },
  { id: 'train', label: 'Train-Case', group: 'code', wordBased: true, convert: trainCase },
  { id: 'dot', label: 'dot.case', group: 'code', wordBased: true, convert: dotCase },
  { id: 'path', label: 'path/case', group: 'code', wordBased: true, convert: pathCase },
  { id: 'title', label: 'Title Case', group: 'text', wordBased: true, convert: titleCase },
  { id: 'sentence', label: 'Sentence case', group: 'text', wordBased: true, convert: sentenceCase },
  { id: 'lower', label: 'lower case', group: 'text', wordBased: true, convert: lowerCase },
  { id: 'upper', label: 'UPPER CASE', group: 'text', wordBased: true, convert: upperCase },
  {
    id: 'alternating',
    label: 'aLtErNaTiNg',
    group: 'text',
    wordBased: false,
    convert: alternatingCase
  },
  { id: 'inverse', label: 'iNVERSE', group: 'text', wordBased: false, convert: inverseCase }
];

export interface ConvertOptions {
  /** Convert each line on its own and keep the line breaks. Default false (the whole text is one input). */
  perLine?: boolean;
}

/** Apply one case; with `perLine`, each line (split on \n or \r\n) is converted independently. */
export function convert(text: string, def: CaseDef, opts: ConvertOptions = {}): string {
  if (opts.perLine && def.wordBased) {
    return text.split(/\r?\n/).map(def.convert).join('\n');
  }
  return def.convert(text);
}

export interface CaseResult {
  id: CaseId;
  label: string;
  group: CaseGroup;
  value: string;
}

/** Every case at once, in catalogue order. */
export function convertAll(text: string, opts: ConvertOptions = {}): CaseResult[] {
  return CASES.map(def => ({
    id: def.id,
    label: def.label,
    group: def.group,
    value: convert(text, def, opts)
  }));
}
