// Lorem ipsum generator: deterministic placeholder text from a seed.
// Self-contained (no relative imports) so `node --test` can load it directly.

export type LoremUnit = 'words' | 'sentences' | 'paragraphs' | 'list';
export type LoremFormat = 'text' | 'html' | 'markdown';

export interface LoremOptions {
  unit: LoremUnit;
  amount: number;
  startWithLorem: boolean;
  format: LoremFormat;
  seed: number;
}

export interface LoremResult {
  text: string;
  words: number;
  characters: number;
  /** The amount actually used, after clamping. */
  amount: number;
}

export const LIMITS: Record<LoremUnit, { min: number; max: number }> = {
  words: { min: 1, max: 2000 },
  sentences: { min: 1, max: 200 },
  paragraphs: { min: 1, max: 50 },
  list: { min: 1, max: 50 }
};

/** The classic opening, split into words (the comma stays on "amet,"). */
export const CLASSIC = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit'];
export const CLASSIC_SENTENCE = CLASSIC.join(' ') + '.';

const WORDS = `
lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip
ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat
nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt
mollit anim id est laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis
praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi obcaecati
cupiditate provident similique mollitia animi dolorum fuga harum quidem rerum facilis expedita
distinctio nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit quo minus quod
maxime placeat facere possimus omnis voluptas assumenda repellendus temporibus autem quibusdam
aut officiis debitis necessitatibus saepe eveniet voluptates repudiandae recusandae itaque earum
hic tenetur sapiente delectus reiciendis voluptatibus maiores alias perferendis doloribus
asperiores repellat neque porro quisquam dolorem adipisci numquam eius modi tempora incidunt
magnam aliquam quaerat
`
  .trim()
  .split(/\s+/);

/** Clamp to the unit's range; NaN/garbage → min, ±Infinity → the nearest bound. */
export function clampAmount(unit: LoremUnit, amount: number): number {
  const { min, max } = LIMITS[unit] ?? LIMITS.paragraphs;
  const n = typeof amount === 'number' ? amount : Number(amount);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** mulberry32: tiny, fast, good-enough PRNG returning floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

const between = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
const capitalize = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

function pickWords(rng: Rng, count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    let w = WORDS[Math.floor(rng() * WORDS.length)];
    if (w === out[i - 1]) w = WORDS[(WORDS.indexOf(w) + 1) % WORDS.length];
    out.push(w);
  }
  return out;
}

/** One sentence of 6–14 words: capitalized, maybe a comma, ends with . (sometimes ? or !). */
function sentence(rng: Rng): string {
  const words = pickWords(rng, between(rng, 6, 14));
  if (rng() < 0.45) {
    const at = between(rng, 2, words.length - 3);
    words[at - 1] += ',';
  }
  words[0] = capitalize(words[0]);
  const r = rng();
  return words.join(' ') + (r < 0.06 ? '?' : r < 0.1 ? '!' : '.');
}

function sentences(rng: Rng, count: number, startWithLorem: boolean): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(i === 0 && startWithLorem ? CLASSIC_SENTENCE : sentence(rng));
  return out;
}

function wordsRun(rng: Rng, count: number, startWithLorem: boolean): string {
  const lead = startWithLorem ? CLASSIC.slice(0, count) : [];
  const words = [...lead, ...pickWords(rng, count - lead.length)];
  // Drop the classic comma when nothing follows it.
  words[words.length - 1] = words[words.length - 1].replace(/,$/, '');
  words[0] = capitalize(words[0]);
  return words.join(' ');
}

const countWords = (s: string) => s.split(/\s+/).filter(Boolean).length;

export function generate(opts: LoremOptions): LoremResult {
  const unit: LoremUnit = opts.unit in LIMITS ? opts.unit : 'paragraphs';
  const amount = clampAmount(unit, opts.amount);
  const rng = mulberry32(Number.isFinite(opts.seed) ? opts.seed : 1);
  const lorem = !!opts.startWithLorem;

  // Blocks: each is one paragraph (or list item) of plain text.
  let blocks: string[];
  if (unit === 'words') blocks = [wordsRun(rng, amount, lorem)];
  else if (unit === 'sentences') blocks = [sentences(rng, amount, lorem).join(' ')];
  else if (unit === 'list') blocks = sentences(rng, amount, lorem);
  else {
    blocks = [];
    for (let i = 0; i < amount; i++) blocks.push(sentences(rng, between(rng, 3, 7), lorem && i === 0).join(' '));
  }

  const words = blocks.reduce((n, b) => n + countWords(b), 0);
  let text: string;
  if (unit === 'list') {
    if (opts.format === 'html') text = `<ul>\n${blocks.map(b => `  <li>${b}</li>`).join('\n')}\n</ul>`;
    else if (opts.format === 'markdown') text = blocks.map(b => `- ${b}`).join('\n');
    else text = blocks.join('\n');
  } else if (opts.format === 'html') {
    text = blocks.map(b => `<p>${b}</p>`).join('\n');
  } else {
    text = blocks.join('\n\n');
  }

  return { text, words, characters: text.length, amount };
}
