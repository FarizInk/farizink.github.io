import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  tokenize,
  camelCase,
  pascalCase,
  snakeCase,
  constantCase,
  kebabCase,
  trainCase,
  dotCase,
  pathCase,
  titleCase,
  sentenceCase,
  lowerCase,
  upperCase,
  alternatingCase,
  inverseCase,
  CASES,
  convert,
  convertAll
} from '../src/lib/tools/textcase.ts';

const byId = (id: string) => {
  const def = CASES.find(c => c.id === id);
  assert.ok(def, `case ${id} exists`);
  return def;
};

test('tokenize: separators, humps, acronyms, digits', () => {
  assert.deepEqual(tokenize('helloWorld'), ['hello', 'World']);
  assert.deepEqual(tokenize('Hello World!'), ['Hello', 'World']);
  assert.deepEqual(tokenize('XMLHttpRequest'), ['XML', 'Http', 'Request']);
  assert.deepEqual(tokenize('getHTTPResponseCode'), ['get', 'HTTP', 'Response', 'Code']);
  assert.deepEqual(tokenize('version2Beta'), ['version', '2', 'Beta']);
  assert.deepEqual(tokenize('utf8'), ['utf', '8']);
  assert.deepEqual(tokenize('user_id field'), ['user', 'id', 'field']);
  assert.deepEqual(tokenize('foo-bar baz'), ['foo', 'bar', 'baz']);
  assert.deepEqual(tokenize('  --__..//  '), []);
  assert.deepEqual(tokenize(''), []);
});

test('tokenize: Unicode letters are kept, emoji separate words', () => {
  assert.deepEqual(tokenize('café olé'), ['café', 'olé']);
  assert.deepEqual(tokenize('Ελληνικά κείμενο'), ['Ελληνικά', 'κείμενο']);
  assert.deepEqual(tokenize('привет Мир'), ['привет', 'Мир']);
  assert.deepEqual(tokenize('日本語 テキスト'), ['日本語', 'テキスト']);
  assert.deepEqual(tokenize('hello🙂world'), ['hello', 'world']);
  // Combining marks (NFD) stay inside their word.
  assert.deepEqual(tokenize('café olé'), ['café', 'olé']);
  assert.deepEqual(tokenize('éClair'), ['é', 'Clair']);
});

test('tokenize: apostrophes inside words are dropped', () => {
  assert.deepEqual(tokenize("don't stop"), ['dont', 'stop']);
  assert.deepEqual(tokenize('it’s fine'), ['its', 'fine']);
  assert.deepEqual(tokenize("'quoted'"), ['quoted']);
});

test('audit: snake/kebab split camel humps before lowercasing', () => {
  assert.equal(snakeCase('helloWorld'), 'hello_world');
  assert.equal(kebabCase('helloWorld'), 'hello-world');
});

test('audit: trailing/leading punctuation leaves no stray separators', () => {
  assert.equal(snakeCase('Hello World!'), 'hello_world');
  assert.equal(kebabCase('...Hello, World!!!'), 'hello-world');
  assert.equal(camelCase('(hello world)'), 'helloWorld');
  assert.equal(constantCase('--max--retries--'), 'MAX_RETRIES');
});

test('audit: accented letters are kept, not turned into separators', () => {
  assert.equal(snakeCase('café olé'), 'café_olé');
  assert.equal(kebabCase('Crème Brûlée'), 'crème-brûlée');
  assert.equal(pascalCase('café olé'), 'CaféOlé');
});

test('audit: camelCase uses the word index, not the string offset', () => {
  assert.equal(camelCase('user_id field'), 'userIdField');
  assert.equal(camelCase('foo-bar baz'), 'fooBarBaz');
  assert.equal(camelCase('Hello World'), 'helloWorld');
});

test('audit: title case splits underscores', () => {
  assert.equal(titleCase('user_id field'), 'User Id Field');
});

test('all word-based cases on one input', () => {
  const s = 'XMLHttpRequest version2Beta';
  assert.equal(camelCase(s), 'xmlHttpRequestVersion2Beta');
  assert.equal(pascalCase(s), 'XmlHttpRequestVersion2Beta');
  assert.equal(snakeCase(s), 'xml_http_request_version_2_beta');
  assert.equal(constantCase(s), 'XML_HTTP_REQUEST_VERSION_2_BETA');
  assert.equal(kebabCase(s), 'xml-http-request-version-2-beta');
  assert.equal(trainCase(s), 'Xml-Http-Request-Version-2-Beta');
  assert.equal(dotCase(s), 'xml.http.request.version.2.beta');
  assert.equal(pathCase(s), 'xml/http/request/version/2/beta');
  assert.equal(sentenceCase(s), 'Xml http request version 2 beta');
  assert.equal(lowerCase(s), 'xml http request version 2 beta');
  assert.equal(upperCase(s), 'XML HTTP REQUEST VERSION 2 BETA');
});

test('acronyms', () => {
  assert.equal(camelCase('getHTTPResponseCode'), 'getHttpResponseCode');
  assert.equal(snakeCase('getHTTPResponseCode'), 'get_http_response_code');
  assert.equal(constantCase('XMLHttpRequest'), 'XML_HTTP_REQUEST');
  assert.equal(kebabCase('parseURL'), 'parse-url');
});

test('non-Latin scripts', () => {
  assert.equal(snakeCase('Привет Мир'), 'привет_мир');
  assert.equal(camelCase('Привет мир'), 'приветМир');
  assert.equal(titleCase('ελληνικό κείμενο'), 'Ελληνικό Κείμενο');
  assert.equal(kebabCase('日本語 テキスト'), '日本語-テキスト');
});

test('title case keeps small words lower except first and last', () => {
  assert.equal(titleCase('the lord of the rings'), 'The Lord of the Rings');
  assert.equal(titleCase('a tale of two cities'), 'A Tale of Two Cities');
  assert.equal(titleCase('what are you looking at'), 'What Are You Looking At');
  assert.equal(titleCase('HELLO WORLD'), 'Hello World');
});

test('sentence case', () => {
  assert.equal(sentenceCase('HELLO big World'), 'Hello big world');
  assert.equal(sentenceCase('ÉCOLE normale'), 'École normale');
});

test('idempotence of word-based cases', () => {
  const samples = [
    'XMLHttpRequest',
    'getHTTPResponseCode',
    'version2Beta',
    'Hello World!',
    'café olé',
    'user_id field',
    'the lord of the rings',
    'Привет Мир'
  ];
  for (const def of CASES.filter(c => c.wordBased)) {
    for (const s of samples) {
      const once = def.convert(s);
      assert.equal(def.convert(once), once, `${def.id}(${def.id}(${JSON.stringify(s)}))`);
    }
  }
});

test('cases round-trip through each other', () => {
  const s = 'getHTTPResponseCode';
  assert.equal(snakeCase(camelCase(s)), snakeCase(s));
  assert.equal(camelCase(kebabCase(s)), camelCase(s));
  assert.equal(pascalCase(constantCase(s)), pascalCase(s));
});

test('alternating case walks code points and only counts letters', () => {
  assert.equal(alternatingCase('hello world'), 'hElLo WoRlD');
  assert.equal(alternatingCase('ab😀cd'), 'aB😀cD');
  assert.equal(alternatingCase('👩‍💻 dev'), '👩‍💻 dEv');
  assert.equal(alternatingCase('a1b2c3'), 'a1B2c3');
});

test('inverse case swaps letter case and leaves emoji whole', () => {
  assert.equal(inverseCase('Hello World'), 'hELLO wORLD');
  assert.equal(inverseCase('Ab😀Cd'), 'aB😀cD');
  assert.equal(inverseCase('𝒜 👍🏽 Ok'), '𝒜 👍🏽 oK');
  assert.equal(inverseCase('Ünïcode'), 'üNÏCODE');
  assert.equal(inverseCase(inverseCase('Hello World')), 'Hello World');
  // No lone surrogates left behind.
  const out = inverseCase('😀🙂');
  assert.equal(out, '😀🙂');
  assert.equal([...out].length, 2);
});

test('multi-line: whole text vs each line separately', () => {
  const s = 'first line\nSecond Line\r\n\nthird';
  assert.equal(convert(s, byId('snake')), 'first_line_second_line_third');
  assert.equal(convert(s, byId('snake'), { perLine: true }), 'first_line\nsecond_line\n\nthird');
  assert.equal(convert(s, byId('camel'), { perLine: true }), 'firstLine\nsecondLine\n\nthird');
  assert.equal(convert(s, byId('title'), { perLine: true }), 'First Line\nSecond Line\n\nThird');
  // Text-preserving transforms are the same either way.
  assert.equal(convert('Ab\nCd', byId('inverse'), { perLine: true }), 'aB\ncD');
});

test('convertAll returns every case in order', () => {
  const all = convertAll('hello world');
  assert.deepEqual(
    all.map(r => r.label),
    [
      'camelCase',
      'PascalCase',
      'snake_case',
      'CONSTANT_CASE',
      'kebab-case',
      'Train-Case',
      'dot.case',
      'path/case',
      'Title Case',
      'Sentence case',
      'lower case',
      'UPPER CASE',
      'aLtErNaTiNg',
      'iNVERSE'
    ]
  );
  assert.deepEqual(
    all.map(r => r.value),
    [
      'helloWorld',
      'HelloWorld',
      'hello_world',
      'HELLO_WORLD',
      'hello-world',
      'Hello-World',
      'hello.world',
      'hello/world',
      'Hello World',
      'Hello world',
      'hello world',
      'HELLO WORLD',
      'hElLo WoRlD',
      'HELLO WORLD'
    ]
  );
  assert.ok(all.every(r => r.group === 'code' || r.group === 'text'));
});

test('empty and separator-only input gives empty word cases', () => {
  for (const r of convertAll('')) assert.equal(r.value, '');
  for (const r of convertAll('!!! ...').filter(r => r.group === 'code')) assert.equal(r.value, '');
});
