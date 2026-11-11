import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatJson,
  minifyJson,
  sortKeysJson,
  validateJson,
  findUnsafeNumbers,
  escapeJsonString,
  unescapeJsonString,
  lineColumnAt,
  JsonSyntaxError
} from '../src/lib/tools/json.ts';

const BIG = '{"id":12345678901234567890,"price":1.10,"huge":1e400,"pi":3.14159265358979323846}';

test('formatJson keeps big integers, trailing zeros and overflowing exponents exactly', () => {
  const out = formatJson(BIG, 2);
  assert.equal(
    out,
    '{\n  "id": 12345678901234567890,\n  "price": 1.10,\n  "huge": 1e400,\n  "pi": 3.14159265358979323846\n}'
  );
});

test('minifyJson keeps number literals exactly', () => {
  const spaced = '{ "id" : 12345678901234567890 ,\n "price": 1.10, "huge": 1e400, "pi": 3.14159265358979323846 }';
  assert.equal(minifyJson(spaced), BIG);
});

test('sortKeysJson keeps number literals exactly', () => {
  assert.equal(
    sortKeysJson(BIG, 2),
    '{\n  "huge": 1e400,\n  "id": 12345678901234567890,\n  "pi": 3.14159265358979323846,\n  "price": 1.10\n}'
  );
});

test('round trip format → minify is lossless', () => {
  assert.equal(minifyJson(formatJson(BIG, '\t')), BIG);
});

test('sortKeysJson sorts nested objects, including inside arrays, and leaves array order alone', () => {
  const input = '{"b":{"z":1,"a":[{"y":2,"x":1},3,1]},"a":true,"C":null}';
  assert.equal(minifyJson(sortKeysJson(input, 2)), '{"C":null,"a":true,"b":{"a":[{"x":1,"y":2},3,1],"z":1}}');
});

test('sortKeysJson orders like Object.keys().sort() on decoded keys', () => {
  const input = '{"\\u0062":1,"a":2,"10":3,"9":4}';
  // Decoded keys: b, a, 10, 9 → sorted as strings: "10", "9", "a", "b". Raw key text is kept.
  assert.equal(minifyJson(sortKeysJson(input)), '{"10":3,"9":4,"a":2,"\\u0062":1}');
});

test('formatJson indent variants: 2, 4, tab', () => {
  const input = '{"a":[1,{"b":2}]}';
  assert.equal(formatJson(input, 2), '{\n  "a": [\n    1,\n    {\n      "b": 2\n    }\n  ]\n}');
  assert.equal(formatJson(input, 4), '{\n    "a": [\n        1,\n        {\n            "b": 2\n        }\n    ]\n}');
  assert.equal(formatJson(input, '\t'), '{\n\t"a": [\n\t\t1,\n\t\t{\n\t\t\t"b": 2\n\t\t}\n\t]\n}');
});

test('formatJson matches JSON.stringify for ordinary input', () => {
  const value = { name: 'Fariz', list: [1, 2.5, -3e-7, true, null], empty: {}, none: [], nested: { x: 'y' } };
  const text = JSON.stringify(value);
  assert.equal(formatJson(text, 2), JSON.stringify(value, null, 2));
  assert.equal(formatJson(text, 4), JSON.stringify(value, null, 4));
  assert.equal(minifyJson(JSON.stringify(value, null, 2)), text);
});

test('unicode and escaped strings are preserved verbatim', () => {
  const input = '{"emoji":"😀","jp":"日本語","esc":"line\\nbreak \\"quoted\\" \\u00e9 \\\\ \\/","key \\u0041":"é"}';
  const out = minifyJson(formatJson(input, 2));
  assert.equal(out, input);
  assert.deepEqual(JSON.parse(out), JSON.parse(input));
});

test('scalar documents and whitespace-only containers', () => {
  assert.equal(formatJson('  42  '), '42');
  assert.equal(formatJson('"hi"'), '"hi"');
  assert.equal(formatJson('[ ]'), '[]');
  assert.equal(formatJson('{ }'), '{}');
});

test('format/minify/sort throw JsonSyntaxError with location on invalid input', () => {
  assert.throws(
    () => formatJson('{"a":1,}'),
    (e: unknown) => e instanceof JsonSyntaxError && e.line === 1 && e.column === 8
  );
  assert.throws(() => minifyJson('[1 2]'), JsonSyntaxError);
  assert.throws(() => sortKeysJson('{"a":01}'), JsonSyntaxError);
  assert.throws(() => formatJson('{"a":1} x'), JsonSyntaxError);
  assert.throws(() => formatJson("{'a':1}"), JsonSyntaxError);
  assert.throws(() => formatJson('"tab\there"'), JsonSyntaxError);
  assert.throws(() => formatJson('"\\x"'), JsonSyntaxError);
  assert.throws(() => formatJson('NaN'), JsonSyntaxError);
  assert.throws(() => formatJson('1.'), JsonSyntaxError);
});

test('validateJson: valid input', () => {
  assert.deepEqual(validateJson('{"a":[1,2,{"b":null}]}'), { ok: true });
  assert.deepEqual(validateJson('12345678901234567890'), { ok: true });
});

test('validateJson: empty input is not valid', () => {
  const r = validateJson('   ');
  assert.equal(r.ok, false);
});

test('validateJson: trailing comma points at the closing brace', () => {
  const r = validateJson('{\n  "a": 1,\n}');
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.equal(r.line, 3);
  assert.equal(r.column, 1);
  assert.equal(r.position, 12);
  assert.ok(r.message.length > 0);
  assert.doesNotMatch(r.message, /position \d+/);
});

test('validateJson: missing opening quote on line 3', () => {
  const text = '{\n  "a": 1,\n  b": 2\n}';
  const r = validateJson(text);
  assert.equal(r.ok, false);
  if (r.ok) return;
  assert.equal(r.line, 3);
  assert.equal(r.column, 3);
  assert.equal(text[r.position], 'b');
});

test('validateJson: unterminated string and missing bracket', () => {
  const r1 = validateJson('{"a": "oops}');
  assert.equal(r1.ok, false);
  if (!r1.ok) assert.equal(r1.line, 1);

  const r2 = validateJson('[1, 2,\n 3');
  assert.equal(r2.ok, false);
  if (!r2.ok) {
    assert.equal(r2.line, 2);
    assert.equal(r2.column, 3);
  }
});

test('lineColumnAt is 1-based', () => {
  assert.deepEqual(lineColumnAt('ab\ncd', 0), { line: 1, column: 1 });
  assert.deepEqual(lineColumnAt('ab\ncd', 4), { line: 2, column: 2 });
});

test('findUnsafeNumbers reports only literals JavaScript would change', () => {
  const found = findUnsafeNumbers(
    '[12345678901234567890, 9007199254740991, -9007199254740993, 1.10, 0.1, 1e400, 3.14159265358979323846, 1e-7, 0, -0.0, 2.5E3]'
  );
  assert.deepEqual(
    found.map(n => n.raw),
    ['12345678901234567890', '-9007199254740993', '1e400', '3.14159265358979323846']
  );
  assert.equal(found[0].position, 1);
  assert.deepEqual(findUnsafeNumbers('{"a":1}'), []);
  assert.deepEqual(findUnsafeNumbers('{"a":'), []); // invalid → nothing to report
});

test('escapeJsonString / unescapeJsonString round-trip', () => {
  const samples = ['{"a":1}', 'plain', 'quotes " and \\ backslash', 'multi\nline\ttab', 'unicode é 😀 \u0001', ''];
  for (const s of samples) {
    assert.equal(unescapeJsonString(escapeJsonString(s)), s);
  }
  assert.equal(escapeJsonString('{"a":1}'), '"{\\"a\\":1}"');
});

test('unescapeJsonString accepts content without surrounding quotes', () => {
  assert.equal(unescapeJsonString('{\\"a\\":1}'), '{"a":1}');
  assert.equal(unescapeJsonString('  "x\\ny"  '), 'x\ny');
});

test('unescapeJsonString rejects invalid literals', () => {
  assert.throws(() => unescapeJsonString('bad \\x escape'));
  assert.throws(() => unescapeJsonString('an "inner" quote'));
});
