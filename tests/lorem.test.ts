import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generate, clampAmount, LIMITS, CLASSIC_SENTENCE, type LoremOptions } from '../src/lib/tools/lorem.ts';

const base: LoremOptions = { unit: 'paragraphs', amount: 3, startWithLorem: false, format: 'text', seed: 42 };
const gen = (o: Partial<LoremOptions>) => generate({ ...base, ...o });
const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;
/** Split a run of sentences on terminal punctuation followed by a space. */
const splitSentences = (s: string) => s.split(/(?<=[.?!])\s+/).filter(Boolean);

test('words: exact count, with and without the classic start', () => {
  assert.equal(gen({ unit: 'words', amount: 3, startWithLorem: true }).text, 'Lorem ipsum dolor');
  assert.equal(gen({ unit: 'words', amount: 5, startWithLorem: true }).text, 'Lorem ipsum dolor sit amet');
  assert.equal(gen({ unit: 'words', amount: 1, startWithLorem: true }).text, 'Lorem');
  for (const amount of [1, 7, 8, 9, 25, 300]) {
    for (const startWithLorem of [true, false]) {
      const r = gen({ unit: 'words', amount, startWithLorem });
      assert.equal(wordCount(r.text), amount, `${amount} words, lorem=${startWithLorem}`);
      assert.equal(r.words, amount);
    }
  }
  assert.ok(gen({ unit: 'words', amount: 12, startWithLorem: true }).text.startsWith('Lorem ipsum dolor sit amet, consectetur adipiscing elit '));
});

test('sentences: exact count; the classic sentence counts as sentence 1', () => {
  const one = gen({ unit: 'sentences', amount: 1, startWithLorem: true });
  assert.equal(one.text, CLASSIC_SENTENCE);
  assert.equal(CLASSIC_SENTENCE, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  for (const amount of [1, 2, 4, 17]) {
    for (const startWithLorem of [true, false]) {
      const r = gen({ unit: 'sentences', amount, startWithLorem, seed: amount * 7 });
      assert.equal(splitSentences(r.text).length, amount, `${amount} sentences, lorem=${startWithLorem}`);
      if (startWithLorem) assert.ok(r.text.startsWith(CLASSIC_SENTENCE));
      else assert.ok(!r.text.startsWith('Lorem ipsum dolor sit amet'));
    }
  }
});

test('paragraphs: exact count, 3–7 sentences each, classic start only on the first', () => {
  for (const amount of [1, 4, 10]) {
    const r = gen({ unit: 'paragraphs', amount, startWithLorem: true });
    const paras = r.text.split('\n\n');
    assert.equal(paras.length, amount);
    assert.ok(paras[0].startsWith(CLASSIC_SENTENCE));
    for (const p of paras) {
      const n = splitSentences(p).length;
      assert.ok(n >= 3 && n <= 7, `paragraph has ${n} sentences`);
    }
    assert.equal(r.words, wordCount(r.text));
  }
});

test('list: exact item count in every format', () => {
  assert.equal(gen({ unit: 'list', amount: 6 }).text.split('\n').length, 6);
  const md = gen({ unit: 'list', amount: 4, format: 'markdown', startWithLorem: true });
  const lines = md.text.split('\n');
  assert.equal(lines.length, 4);
  assert.ok(lines.every(l => l.startsWith('- ')));
  assert.equal(lines[0], `- ${CLASSIC_SENTENCE}`);
  const html = gen({ unit: 'list', amount: 5, format: 'html' });
  assert.ok(html.text.startsWith('<ul>\n') && html.text.endsWith('\n</ul>'));
  assert.equal(html.text.match(/<li>/g)?.length, 5);
});

test('html wraps paragraphs, sentences and words in <p>', () => {
  const r = gen({ unit: 'paragraphs', amount: 3, format: 'html' });
  const lines = r.text.split('\n');
  assert.equal(lines.length, 3);
  assert.ok(lines.every(l => /^<p>[^<]+<\/p>$/.test(l)));
  assert.equal(gen({ unit: 'words', amount: 3, startWithLorem: true, format: 'html' }).text, '<p>Lorem ipsum dolor</p>');
  // Word count ignores markup.
  assert.equal(gen({ unit: 'words', amount: 3, startWithLorem: true, format: 'html' }).words, 3);
});

test('markdown separates paragraphs with blank lines', () => {
  const r = gen({ unit: 'paragraphs', amount: 3, format: 'markdown' });
  assert.equal(r.text.split('\n\n').length, 3);
  assert.ok(!r.text.includes('<'));
});

test('clamps huge, zero, negative, fractional and NaN amounts', () => {
  assert.equal(clampAmount('paragraphs', 1_000_000), LIMITS.paragraphs.max);
  assert.equal(clampAmount('words', 0), 1);
  assert.equal(clampAmount('sentences', -5), 1);
  assert.equal(clampAmount('list', Number.NaN), 1);
  assert.equal(clampAmount('words', Infinity), 2000);
  assert.equal(clampAmount('sentences', 2.6), 3);
  const huge = gen({ unit: 'paragraphs', amount: 1_000_000 });
  assert.equal(huge.amount, 50);
  assert.equal(huge.text.split('\n\n').length, 50);
  assert.equal(wordCount(gen({ unit: 'words', amount: 1e9 }).text), 2000);
  assert.equal(splitSentences(gen({ unit: 'sentences', amount: Number.NaN }).text).length, 1);
  assert.equal(gen({ unit: 'list', amount: -3 }).text.split('\n').length, 1);
});

test('same seed → same output; different seed → different output', () => {
  const a = gen({ unit: 'paragraphs', amount: 4, seed: 123 });
  const b = gen({ unit: 'paragraphs', amount: 4, seed: 123 });
  const c = gen({ unit: 'paragraphs', amount: 4, seed: 124 });
  assert.deepEqual(a, b);
  assert.notEqual(a.text, c.text);
});

test('sentences start uppercase, end with punctuation, are 6–14 words', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const r = gen({ unit: 'sentences', amount: 30, seed });
    for (const s of splitSentences(r.text)) {
      assert.match(s, /^[A-Z]/);
      assert.match(s, /[.?!]$/);
      const n = wordCount(s);
      assert.ok(n >= 6 && n <= 14, `sentence has ${n} words: ${s}`);
    }
  }
  // Some variation: commas and the occasional ? or ! show up across many sentences.
  const many = gen({ unit: 'sentences', amount: 200, seed: 9 }).text;
  assert.ok(many.includes(','));
  assert.match(many, /[?!]/);
});

test('characters equals output length', () => {
  const r = gen({ unit: 'list', amount: 3, format: 'html' });
  assert.equal(r.characters, r.text.length);
});
