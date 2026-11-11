import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  textStats,
  smsInfo,
  limitStatus,
  parseLimit,
  formatDuration,
  formatBytes,
  statsSummary
} from '../src/lib/tools/textstats.ts';

const MODES = [{ useSegmenter: true }, { useSegmenter: false }];

test('empty text is all zeros', () => {
  const s = textStats('');
  assert.equal(s.graphemes, 0);
  assert.equal(s.words, 0);
  assert.equal(s.lines, 0);
  assert.equal(s.readingSeconds, 0);
});

test('emoji count as one character (grapheme)', () => {
  assert.equal(textStats('👍🏽').graphemes, 1);
  assert.equal(textStats('👍🏽').codePoints, 2);
  assert.equal(textStats('👍🏽').utf16Units, 4);
  const family = '👨‍👩‍👧‍👦';
  assert.equal(textStats(family).graphemes, 1);
  assert.equal(textStats(family).codePoints, 7);
  assert.equal(textStats(`a${family}b`).graphemes, 3);
  assert.equal(textStats('👍🏽').symbols, 1);
});

test('é precomposed vs decomposed: one character, different code points', () => {
  const pre = textStats('\u00e9');
  const dec = textStats('e\u0301');
  assert.equal(pre.graphemes, 1);
  assert.equal(dec.graphemes, 1);
  assert.equal(pre.codePoints, 1);
  assert.equal(dec.codePoints, 2);
  assert.equal(pre.utf8Bytes, 2);
  assert.equal(dec.utf8Bytes, 3);
  assert.equal(pre.letters, 1);
  assert.equal(dec.letters, 1);
});

test('UTF-8 bytes match TextEncoder', () => {
  const enc = new TextEncoder();
  for (const [s, bytes] of [['hello', 5], ['é', 2], ['日本', 6], ['👍', 4], ['👍🏽', 8], ['a\ud800b', 5]] as const) {
    assert.equal(textStats(s).utf8Bytes, bytes, s);
    assert.equal(textStats(s).utf8Bytes, enc.encode(s).length, s);
  }
});

test('letters include accented, ß and CJK; classes add up to graphemes', () => {
  const s = textStats('Straße café 日本 42! 😀');
  assert.equal(s.letters, 12);
  assert.equal(s.digits, 2);
  assert.equal(s.punctuation, 1);
  assert.equal(s.symbols, 1);
  assert.equal(s.whitespace, 4);
  assert.equal(s.letters + s.digits + s.whitespace + s.punctuation + s.symbols, s.graphemes);
});

for (const opts of MODES) {
  const tag = opts.useSegmenter ? 'segmenter' : 'fallback';

  test(`words: English and accented (${tag})`, () => {
    assert.equal(textStats('The quick brown fox.', opts).words, 4);
    assert.equal(textStats("It's a well-known café in São Paulo, naïve résumé!", opts).words >= 8, true);
    assert.equal(textStats('café naïve résumé', opts).words, 3);
    assert.equal(textStats('  hello   world  ', opts).words, 2);
    assert.equal(textStats('— ... !!!', opts).words, 0);
  });

  test(`whitespace-only: 0 words, 0 reading time (${tag})`, () => {
    const s = textStats('   \n\t  \n ', opts);
    assert.equal(s.words, 0);
    assert.equal(s.sentences, 0);
    assert.equal(s.paragraphs, 0);
    assert.equal(s.readingSeconds, 0);
    assert.equal(s.speakingSeconds, 0);
    assert.equal(s.whitespace, s.graphemes);
  });

  test(`sentences: backslashes do not split (${tag})`, () => {
    assert.equal(textStats('C:\\Users\\fariz\\docs is the path', opts).sentences, 1);
    assert.equal(textStats('One. Two! Three? Four', opts).sentences, 4);
    assert.equal(textStats('...', opts).sentences, 0);
  });
}

test('paragraphs and lines', () => {
  const s = textStats('One\ntwo\n\nthree\n   \nfour');
  assert.equal(s.lines, 6);
  assert.equal(s.paragraphs, 3);
  assert.equal(textStats('a\r\nb').lines, 2);
  assert.equal(textStats('single').paragraphs, 1);
});

test('reading and speaking time', () => {
  const words = Array.from({ length: 230 }, () => 'word').join(' ');
  const s = textStats(words);
  assert.equal(s.words, 230);
  assert.equal(s.readingSeconds, 60);
  assert.equal(s.speakingSeconds, Math.round((230 / 130) * 60));
  assert.equal(formatDuration(0), '0 s');
  assert.equal(formatDuration(45), '45 s');
  assert.equal(formatDuration(150), '3 min');
  assert.equal(formatDuration(3900), '1 h 5 min');
});

test('SMS: plain ASCII 160 is one segment, 161 is two of 153', () => {
  const a160 = smsInfo('a'.repeat(160));
  assert.equal(a160.encoding, 'GSM-7');
  assert.equal(a160.segments, 1);
  assert.equal(a160.remaining, 0);
  const a161 = smsInfo('a'.repeat(161));
  assert.equal(a161.segments, 2);
  assert.equal(a161.perSegment, 153);
  assert.equal(a161.remaining, 306 - 161);
  assert.equal(smsInfo('').segments, 0);
  assert.equal(smsInfo('').remaining, 160);
});

test('SMS: one emoji switches to UCS-2 (70 per segment)', () => {
  const s = smsInfo('Hi 👍');
  assert.equal(s.encoding, 'UCS-2');
  assert.equal(s.perSegment, 70);
  assert.equal(s.units, 5);
  assert.equal(s.remaining, 65);
  assert.deepEqual(s.unicodeChars, ['👍']);
  assert.equal(smsInfo('x'.repeat(69) + '👍').segments, 2);
  assert.equal(smsInfo('x'.repeat(70) + '日').perSegment, 67);
});

test('SMS: extension chars (€ { } [ ] \\ ~ ^ |) count as 2 in GSM-7', () => {
  assert.equal(smsInfo('€').units, 2);
  assert.equal(smsInfo('{').units, 2);
  assert.equal(smsInfo('€').encoding, 'GSM-7');
  assert.equal(smsInfo('a'.repeat(159) + '{').segments, 2);
  assert.equal(smsInfo('a'.repeat(158) + '€').segments, 1);
  assert.equal(smsInfo('café ñ').encoding, 'GSM-7');
  assert.equal(smsInfo('ç').encoding, 'UCS-2');
});

test('limits and custom limit parsing', () => {
  assert.deepEqual(limitStatus(212, 280), { count: 212, max: 280, percent: (212 / 280) * 100, over: false, diff: 68 });
  const over = limitStatus(300, 280);
  assert.equal(over.over, true);
  assert.equal(over.diff, 20);
  assert.equal(over.percent, 100);
  assert.equal(parseLimit('500'), 500);
  assert.equal(parseLimit(' 42 '), 42);
  assert.equal(parseLimit(''), null);
  assert.equal(parseLimit('0'), null);
  assert.equal(parseLimit('-3'), null);
  assert.equal(parseLimit('2.5'), null);
  assert.equal(parseLimit('abc'), null);
});

test('formatBytes and summary', () => {
  assert.equal(formatBytes(980), '980 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(statsSummary(textStats('Hello world')), '11 characters · 2 words · 11 UTF-8 bytes · 1 line · 1 s read');
});
