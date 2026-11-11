// Pure helpers for the ASCII Art Generator tool (tested in tests/asciiart.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.
//
// Fonts are plain data: each font has a fixed `height` and a glyph map where every row of a
// glyph has the same width. Rows are padded with `padEnd` when a font is built, and the raw
// definitions are exported so the tests can assert they were already consistent.
//
// Unsupported characters are rendered with the font's "?" glyph and reported (unique, in order
// of first appearance) in `RenderResult.unsupported`. Tabs count as spaces.

export type FontId = 'standard' | 'block' | 'small';
export type LetterSpacing = 0 | 1 | 2;
export type CommentStyle = 'none' | 'slash' | 'hash' | 'block';

export interface Font {
  id: FontId;
  name: string;
  /** Number of rows every glyph has. */
  height: number;
  /** Uppercase character → rows (all the same width). */
  glyphs: Record<string, string[]>;
}

export interface RenderOptions {
  /** Empty columns between two glyphs. Default 1. */
  letterSpacing?: LetterSpacing;
  /** Wrap by words when a rendered line would be wider than this many columns. */
  maxWidth?: number;
}

export interface RenderResult {
  lines: string[];
  /** Characters the font has no glyph for (shown as "?"), unique, in order of appearance. */
  unsupported: string[];
  /** Widest output line, in columns (code points). */
  width: number;
}

/** Characters every font must cover. */
export const CHARSET = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'0123456789',
  ' ',
  ...'.,!?-_:;\'"/()+=#@&*'
];

// ---------------------------------------------------------------------------------------------
// Standard: 5 rows of '#', letters and digits 5 columns wide.

export const STANDARD_RAW: Record<string, string[]> = {
  A: [' ### ', '#   #', '#####', '#   #', '#   #'],
  B: ['#### ', '#   #', '#### ', '#   #', '#### '],
  C: [' ####', '#    ', '#    ', '#    ', ' ####'],
  D: ['#### ', '#   #', '#   #', '#   #', '#### '],
  E: ['#####', '#    ', '#### ', '#    ', '#####'],
  F: ['#####', '#    ', '#### ', '#    ', '#    '],
  G: [' ####', '#    ', '#  ##', '#   #', ' ####'],
  H: ['#   #', '#   #', '#####', '#   #', '#   #'],
  I: ['#####', '  #  ', '  #  ', '  #  ', '#####'],
  J: ['#####', '   # ', '   # ', '#  # ', ' ##  '],
  K: ['#   #', '#  # ', '###  ', '#  # ', '#   #'],
  L: ['#    ', '#    ', '#    ', '#    ', '#####'],
  M: ['#   #', '## ##', '# # #', '#   #', '#   #'],
  N: ['#   #', '##  #', '# # #', '#  ##', '#   #'],
  O: [' ### ', '#   #', '#   #', '#   #', ' ### '],
  P: ['#### ', '#   #', '#### ', '#    ', '#    '],
  Q: [' ### ', '#   #', '# # #', '#  # ', ' ## #'],
  R: ['#### ', '#   #', '#### ', '#  # ', '#   #'],
  S: [' ####', '#    ', ' ### ', '    #', '#### '],
  T: ['#####', '  #  ', '  #  ', '  #  ', '  #  '],
  U: ['#   #', '#   #', '#   #', '#   #', ' ### '],
  V: ['#   #', '#   #', '#   #', ' # # ', '  #  '],
  W: ['#   #', '#   #', '# # #', '## ##', '#   #'],
  X: ['#   #', ' # # ', '  #  ', ' # # ', '#   #'],
  Y: ['#   #', ' # # ', '  #  ', '  #  ', '  #  '],
  Z: ['#####', '   # ', '  #  ', ' #   ', '#####'],
  '0': [' ### ', '#  ##', '# # #', '##  #', ' ### '],
  '1': ['  #  ', ' ##  ', '  #  ', '  #  ', ' ### '],
  '2': [' ### ', '#   #', '  ## ', ' #   ', '#####'],
  '3': ['#### ', '    #', ' ### ', '    #', '#### '],
  '4': ['#   #', '#   #', '#####', '    #', '    #'],
  '5': ['#####', '#    ', '#### ', '    #', '#### '],
  '6': [' ### ', '#    ', '#### ', '#   #', ' ### '],
  '7': ['#####', '    #', '   # ', '  #  ', '  #  '],
  '8': [' ### ', '#   #', ' ### ', '#   #', ' ### '],
  '9': [' ### ', '#   #', ' ####', '    #', ' ### '],
  ' ': ['   ', '   ', '   ', '   ', '   '],
  '.': [' ', ' ', ' ', ' ', '#'],
  ',': ['  ', '  ', '  ', ' #', '# '],
  '!': ['#', '#', '#', ' ', '#'],
  '?': [' ### ', '#   #', '  ## ', '     ', '  #  '],
  '-': ['   ', '   ', '###', '   ', '   '],
  _: ['     ', '     ', '     ', '     ', '#####'],
  ':': [' ', '#', ' ', '#', ' '],
  ';': ['  ', ' #', '  ', ' #', '# '],
  "'": ['#', '#', ' ', ' ', ' '],
  '"': ['# #', '# #', '   ', '   ', '   '],
  '/': ['    #', '   # ', '  #  ', ' #   ', '#    '],
  '(': [' #', '# ', '# ', '# ', ' #'],
  ')': ['# ', ' #', ' #', ' #', '# '],
  '+': ['     ', '  #  ', '#####', '  #  ', '     '],
  '=': ['     ', '#####', '     ', '#####', '     '],
  '#': [' # # ', '#####', ' # # ', '#####', ' # # '],
  '@': [' ### ', '#   #', '# ###', '#    ', ' ####'],
  '&': [' ##  ', '#  # ', ' ##  ', '#  # ', ' ## #'],
  '*': ['     ', '# # #', ' ### ', '# # #', '     ']
};

// ---------------------------------------------------------------------------------------------
// Small: 3 rows of plain ASCII strokes, letters mostly 3 columns wide.

export const SMALL_RAW: Record<string, string[]> = {
  A: [' _ ', '|_|', '| |'],
  B: [' _ ', '|_)', '|_)'],
  C: [' _ ', '|  ', '|_ '],
  D: [' _ ', '| \\', '|_/'],
  E: [' _ ', '|_ ', '|_ '],
  F: [' _ ', '|_ ', '|  '],
  G: [' _ ', '/ _', '\\_|'],
  H: ['   ', '|_|', '| |'],
  I: ['___', ' | ', '_|_'],
  J: ['   ', '  |', '\\_|'],
  K: ['   ', '|/ ', '|\\ '],
  L: ['   ', '|  ', '|_ '],
  M: ['    ', '|\\/|', '|  |'],
  N: ['    ', '|\\ |', '| \\|'],
  O: [' _ ', '/ \\', '\\_/'],
  P: [' _ ', '|_)', '|  '],
  Q: [' _ ', '/ \\', '\\_X'],
  R: [' _ ', '|_)', '| \\'],
  S: [' _ ', '(_ ', ' _)'],
  T: ['___', ' | ', ' | '],
  U: ['   ', '| |', '|_|'],
  V: ['   ', '\\ /', ' V '],
  W: ['    ', '|  |', '|/\\|'],
  X: ['   ', '\\_/', '/ \\'],
  Y: ['   ', '\\_/', ' | '],
  Z: ['__', ' /', '/_'],
  '0': [' _ ', '| |', '|_|'],
  '1': ['   ', '/| ', ' | '],
  '2': [' _ ', ' _)', '/_ '],
  '3': ['__ ', ' _)', '__)'],
  '4': ['   ', '|_|', '  |'],
  '5': [' __', '|_ ', '__)'],
  '6': [' _ ', '|_ ', '|_)'],
  '7': ['__ ', ' / ', '/  '],
  '8': [' _ ', '(_)', '(_)'],
  '9': [' _ ', '(_|', '  |'],
  ' ': ['  ', '  ', '  '],
  '.': [' ', ' ', '.'],
  ',': [' ', ' ', ','],
  '!': ['|', '|', '.'],
  '?': ['__', ' )', ' .'],
  '-': ['   ', '---', '   '],
  _: ['   ', '   ', '___'],
  ':': [' ', '.', '.'],
  ';': [' ', '.', ','],
  "'": ["'", ' ', ' '],
  '"': ['"', ' ', ' '],
  '/': ['  /', ' / ', '/  '],
  '(': ['/', '|', '\\'],
  ')': ['\\', '|', '/'],
  '+': ['   ', '_|_', ' | '],
  '=': ['   ', '___', '___'],
  '#': ['_|_|_', '_|_|_', ' | | '],
  '@': [' __ ', '/(_|', '\\__ '],
  '&': [' _ ', '(_ ', '(_\\'],
  '*': ['   ', '\\|/', '/|\\']
};

/** Block: the standard shapes drawn with full blocks, each pixel two columns wide. */
export const BLOCK_RAW: Record<string, string[]> = Object.fromEntries(
  Object.entries(STANDARD_RAW).map(([ch, rows]) => [
    ch,
    rows.map(row => row.replace(/#/g, '██').replace(/ /g, '  '))
  ])
);

/** Code-point length (█ and friends count as one column). */
export function columns(s: string): number {
  return Array.from(s).length;
}

function padTo(s: string, width: number): string {
  return s + ' '.repeat(Math.max(0, width - columns(s)));
}

/** Build a font, padding every row of a glyph to that glyph's widest row. */
function buildFont(id: FontId, name: string, height: number, raw: Record<string, string[]>): Font {
  const glyphs: Record<string, string[]> = {};
  for (const [ch, rows] of Object.entries(raw)) {
    const width = Math.max(...rows.map(columns));
    const fixed = Array.from({ length: height }, (_, i) => padTo(rows[i] ?? '', width));
    glyphs[ch] = fixed;
  }
  return { id, name, height, glyphs };
}

export const FONTS: Record<FontId, Font> = {
  standard: buildFont('standard', 'Standard', 5, STANDARD_RAW),
  block: buildFont('block', 'Block', 5, BLOCK_RAW),
  small: buildFont('small', 'Small', 3, SMALL_RAW)
};

export const FONT_IDS: FontId[] = ['standard', 'block', 'small'];

/** Width of one glyph in columns. */
export function glyphWidth(glyph: string[]): number {
  return glyph.length ? columns(glyph[0]) : 0;
}

/** Normalise one character to its glyph key (uppercase; tabs → space). */
function keyOf(ch: string): string {
  if (ch === '\t') return ' ';
  const up = ch.toUpperCase();
  return Array.from(up).length === 1 ? up : ch;
}

function glyphFor(font: Font, ch: string): string[] | undefined {
  return font.glyphs[keyOf(ch)];
}

/** Rendered width in columns of a run of characters (unsupported chars use "?"). */
function runWidth(chars: string[], font: Font, spacing: number): number {
  if (!chars.length) return 0;
  let w = 0;
  for (const ch of chars) w += glyphWidth(glyphFor(font, ch) ?? font.glyphs['?']);
  return w + spacing * (chars.length - 1);
}

/** Render one run of characters as `font.height` rows (trailing whitespace trimmed). */
function renderRun(chars: string[], font: Font, spacing: number): string[] {
  const gap = ' '.repeat(spacing);
  const rows: string[] = [];
  for (let r = 0; r < font.height; r++) {
    const parts = chars.map(ch => (glyphFor(font, ch) ?? font.glyphs['?'])[r]);
    rows.push(parts.join(gap).trimEnd());
  }
  return rows;
}

/** Split one input line into runs that each render within `maxWidth` columns. */
function wrapRun(chars: string[], font: Font, spacing: number, maxWidth: number | undefined): string[][] {
  if (!maxWidth || maxWidth <= 0 || runWidth(chars, font, spacing) <= maxWidth) return [chars];

  // Words keep their characters; spaces between words are dropped at a break.
  const words: string[][] = [];
  let cur: string[] = [];
  for (const ch of chars) {
    if (keyOf(ch) === ' ') {
      if (cur.length) words.push(cur);
      cur = [];
    } else cur.push(ch);
  }
  if (cur.length) words.push(cur);

  const out: string[][] = [];
  let line: string[] = [];
  const flush = () => {
    if (line.length) out.push(line);
    line = [];
  };
  for (const word of words) {
    const candidate = line.length ? [...line, ' ', ...word] : word;
    if (runWidth(candidate, font, spacing) <= maxWidth) {
      line = candidate;
      continue;
    }
    flush();
    if (runWidth(word, font, spacing) <= maxWidth) {
      line = word;
      continue;
    }
    // A single word wider than maxWidth: break it by characters (at least one per run).
    for (const ch of word) {
      if (line.length && runWidth([...line, ch], font, spacing) > maxWidth) flush();
      line.push(ch);
    }
  }
  flush();
  return out;
}

/**
 * Render text as a banner. Each non-blank input line (and each wrapped piece of it) becomes a
 * block of exactly `font.height` rows; blocks are separated by one blank line. Blank input
 * lines are skipped. Trailing whitespace is trimmed from every row and trailing empty lines are
 * dropped from the whole output (so a final block of only high glyphs like `'` can be shorter).
 */
export function render(text: string, fontOrId: Font | FontId, options: RenderOptions = {}): RenderResult {
  const font = typeof fontOrId === 'string' ? FONTS[fontOrId] : fontOrId;
  const spacing = Math.max(0, Math.min(2, Math.round(options.letterSpacing ?? 1)));
  const unsupported: string[] = [];
  const lines: string[] = [];

  for (const raw of text.replace(/\r\n?/g, '\n').split('\n')) {
    const chars = Array.from(raw.replace(/\s+$/u, '').replace(/^\s+/u, ''));
    if (!chars.length) continue;
    for (const ch of chars) {
      if (!glyphFor(font, ch) && !unsupported.includes(ch)) unsupported.push(ch);
    }
    for (const run of wrapRun(chars, font, spacing, options.maxWidth)) {
      if (lines.length) lines.push('');
      lines.push(...renderRun(run, font, spacing));
    }
  }

  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  const width = lines.reduce((m, l) => Math.max(m, columns(l)), 0);
  return { lines, unsupported, width };
}

/** Prefix lines with `// ` or `# `, or wrap them in a block comment. Empty input stays empty. */
export function asComment(lines: string[], style: CommentStyle): string[] {
  if (!lines.length || style === 'none') return [...lines];
  if (style === 'slash' || style === 'hash') {
    const p = style === 'slash' ? '//' : '#';
    return lines.map(l => (l ? `${p} ${l}` : p));
  }
  // Block: keep the art untouched; defuse any accidental "*/" so the comment can't end early.
  return ['/*', ...lines.map(l => l.replace(/\*\//g, '* /')), '*/'];
}
