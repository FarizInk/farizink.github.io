// Pure helpers for the JSON Parser tool (tested in tests/json.test.ts).
// Self-contained: no DOM, no Svelte, no relative imports.
//
// Format / minify / sort never go through JSON.parse → JSON.stringify, because that
// silently rounds numbers JavaScript can't represent (12345678901234567890 becomes
// 12345678901234567000, 1e400 becomes null). Instead a small strict parser builds a
// tree whose leaves keep their exact source text, and the printer writes those
// leaves back verbatim. Strings keep their original escapes too.

/** Indentation for pretty-printing: a number of spaces, or a literal string such as '\t'. */
export type JsonIndent = number | string;

export type JsonValidation =
  | { ok: true }
  | { ok: false; message: string; line: number; column: number; position: number };

/** A number literal whose value can't be held exactly by a JavaScript number. */
export interface UnsafeNumber {
  raw: string;
  position: number;
}

/** Thrown by the format/minify/sort helpers on malformed input. */
export class JsonSyntaxError extends Error {
  position: number;
  line: number;
  column: number;
  constructor(message: string, position: number, line: number, column: number) {
    super(message);
    this.name = 'JsonSyntaxError';
    this.position = position;
    this.line = line;
    this.column = column;
  }
}

type JsonNode =
  | { kind: 'object'; entries: { key: string; value: JsonNode }[] }
  | { kind: 'array'; items: JsonNode[] }
  | { kind: 'number'; raw: string; position: number }
  | { kind: 'literal'; raw: string }; // strings (raw, quotes included), true, false, null

/** 1-based line and column (UTF-16 code units) of a 0-based offset. */
export function lineColumnAt(text: string, position: number): { line: number; column: number } {
  const pos = Math.max(0, Math.min(position, text.length));
  let line = 1;
  let lineStart = 0;
  for (let i = 0; i < pos; i++) {
    if (text.charCodeAt(i) === 10) {
      line++;
      lineStart = i + 1;
    }
  }
  return { line, column: pos - lineStart + 1 };
}

/** 0-based offset of a 1-based line/column (inverse of lineColumnAt). */
function positionAt(text: string, line: number, column: number): number {
  let pos = 0;
  for (let l = 1; l < line; l++) {
    const nl = text.indexOf('\n', pos);
    if (nl === -1) return text.length;
    pos = nl + 1;
  }
  return Math.min(pos + Math.max(column - 1, 0), text.length);
}

function describeChar(ch: string): string {
  if (ch === '\n') return 'line break';
  if (ch === '\r') return 'carriage return';
  if (ch === '\t') return 'tab';
  return `'${ch}'`;
}

// ── Strict parser ────────────────────────────────────────────────────────────

class Parser {
  text: string;
  pos = 0;
  numbers: UnsafeNumber[] | null;

  constructor(text: string, collectNumbers: boolean) {
    this.text = text;
    this.numbers = collectNumbers ? [] : null;
  }

  fail(message: string, position = this.pos): never {
    const { line, column } = lineColumnAt(this.text, position);
    throw new JsonSyntaxError(message, position, line, column);
  }

  unexpected(expected: string): never {
    if (this.pos >= this.text.length) this.fail(`Unexpected end of input, expected ${expected}`);
    this.fail(`Unexpected ${describeChar(this.text[this.pos])}, expected ${expected}`);
  }

  ws() {
    const t = this.text;
    while (this.pos < t.length) {
      const c = t.charCodeAt(this.pos);
      if (c === 32 || c === 9 || c === 10 || c === 13) this.pos++;
      else break;
    }
  }

  parseDocument(): JsonNode {
    this.ws();
    if (this.pos >= this.text.length) this.fail('No JSON to parse');
    const node = this.value();
    this.ws();
    if (this.pos < this.text.length) {
      this.fail(`Unexpected ${describeChar(this.text[this.pos])} after the end of the JSON value`);
    }
    return node;
  }

  value(): JsonNode {
    const ch = this.text[this.pos];
    if (ch === '{') return this.object();
    if (ch === '[') return this.array();
    if (ch === '"') return { kind: 'literal', raw: this.string() };
    if (ch === '-' || (ch >= '0' && ch <= '9')) return this.number();
    for (const word of ['true', 'false', 'null']) {
      if (this.text.startsWith(word, this.pos)) {
        this.pos += word.length;
        return { kind: 'literal', raw: word };
      }
    }
    return this.unexpected('a value');
  }

  object(): JsonNode {
    this.pos++; // {
    const entries: { key: string; value: JsonNode }[] = [];
    this.ws();
    if (this.text[this.pos] === '}') {
      this.pos++;
      return { kind: 'object', entries };
    }
    for (;;) {
      this.ws();
      if (this.text[this.pos] !== '"') {
        if (this.text[this.pos] === '}' && entries.length > 0) this.fail('Trailing comma before }');
        this.unexpected('a double-quoted property name');
      }
      const key = this.string();
      this.ws();
      if (this.text[this.pos] !== ':') this.unexpected("':' after property name");
      this.pos++;
      this.ws();
      const value = this.value();
      entries.push({ key, value });
      this.ws();
      const next = this.text[this.pos];
      if (next === ',') {
        this.pos++;
        continue;
      }
      if (next === '}') {
        this.pos++;
        return { kind: 'object', entries };
      }
      this.unexpected("',' or '}' after property value");
    }
  }

  array(): JsonNode {
    this.pos++; // [
    const items: JsonNode[] = [];
    this.ws();
    if (this.text[this.pos] === ']') {
      this.pos++;
      return { kind: 'array', items };
    }
    for (;;) {
      this.ws();
      if (this.text[this.pos] === ']' && items.length > 0) this.fail('Trailing comma before ]');
      items.push(this.value());
      this.ws();
      const next = this.text[this.pos];
      if (next === ',') {
        this.pos++;
        continue;
      }
      if (next === ']') {
        this.pos++;
        return { kind: 'array', items };
      }
      this.unexpected("',' or ']' after array element");
    }
  }

  /** Returns the raw string literal, quotes and escapes included. */
  string(): string {
    const t = this.text;
    const start = this.pos;
    this.pos++; // opening quote
    while (this.pos < t.length) {
      const c = t.charCodeAt(this.pos);
      if (c === 34) {
        this.pos++;
        return t.slice(start, this.pos);
      }
      if (c === 92) {
        const esc = t[this.pos + 1];
        if (esc === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(t.slice(this.pos + 2, this.pos + 6))) {
            this.fail('Bad Unicode escape in string (expected \\u followed by 4 hex digits)');
          }
          this.pos += 6;
        } else if (esc !== undefined && '"\\/bfnrt'.includes(esc)) {
          this.pos += 2;
        } else {
          this.fail('Bad escape sequence in string', this.pos);
        }
        continue;
      }
      if (c < 0x20) this.fail(`Bad control character (${describeChar(t[this.pos])}) in string`);
      this.pos++;
    }
    return this.fail('Unterminated string', start);
  }

  number(): JsonNode {
    const t = this.text;
    const start = this.pos;
    const digit = () => this.pos < t.length && t[this.pos] >= '0' && t[this.pos] <= '9';
    if (t[this.pos] === '-') this.pos++;
    if (t[this.pos] === '0') {
      this.pos++;
      if (digit()) this.fail('Numbers cannot have leading zeros');
    } else if (digit()) {
      while (digit()) this.pos++;
    } else {
      this.unexpected('a digit after the minus sign');
    }
    if (t[this.pos] === '.') {
      this.pos++;
      if (!digit()) this.unexpected('a digit after the decimal point');
      while (digit()) this.pos++;
    }
    if (t[this.pos] === 'e' || t[this.pos] === 'E') {
      this.pos++;
      if (t[this.pos] === '+' || t[this.pos] === '-') this.pos++;
      if (!digit()) this.unexpected('a digit in the exponent');
      while (digit()) this.pos++;
    }
    const raw = t.slice(start, this.pos);
    if (this.numbers && !isExactNumber(raw)) this.numbers.push({ raw, position: start });
    return { kind: 'number', raw, position: start };
  }
}

function parseTree(text: string, collectNumbers = false): { node: JsonNode; numbers: UnsafeNumber[] } {
  const parser = new Parser(text, collectNumbers);
  try {
    return { node: parser.parseDocument(), numbers: parser.numbers ?? [] };
  } catch (e) {
    if (e instanceof RangeError) {
      // Recursion limit on absurdly deep nesting.
      const { line, column } = lineColumnAt(text, parser.pos);
      throw new JsonSyntaxError('JSON is nested too deeply to process', parser.pos, line, column);
    }
    throw e;
  }
}

// ── Number exactness ─────────────────────────────────────────────────────────

/** Significant digits + exponent of a decimal literal, e.g. "1.10" → { digits: "11", exp: 0 }. */
function canonicalDecimal(raw: string): { neg: boolean; digits: string; exp: number } {
  const m = /^(-?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(raw);
  if (!m) return { neg: false, digits: '', exp: 0 };
  const intPart = m[2];
  const frac = m[3] ?? '';
  let digits = intPart + frac;
  let exp = Number(m[4] ?? 0) + intPart.length; // value = 0.digits × 10^exp
  const lead = digits.search(/[1-9]/);
  if (lead === -1) return { neg: false, digits: '0', exp: 0 };
  digits = digits.slice(lead);
  exp -= lead;
  digits = digits.replace(/0+$/, '');
  return { neg: m[1] === '-', digits, exp };
}

/** True when Number(raw) represents exactly the decimal value written in raw. */
function isExactNumber(raw: string): boolean {
  const n = Number(raw);
  if (!Number.isFinite(n)) return false;
  // Fast path: plain integers inside the safe range are always exact.
  if (/^-?\d+$/.test(raw)) return Number.isSafeInteger(n);
  const a = canonicalDecimal(raw);
  const b = canonicalDecimal(String(n));
  if (a.digits === '0' && b.digits === '0') return true;
  return a.neg === b.neg && a.digits === b.digits && a.exp === b.exp;
}

// ── Printing ─────────────────────────────────────────────────────────────────

function indentUnit(indent: JsonIndent): string {
  if (typeof indent === 'number') return ' '.repeat(Math.max(0, Math.min(10, Math.floor(indent))));
  return indent;
}

function print(node: JsonNode, unit: string): string {
  const out: string[] = [];
  const pretty = unit !== '';
  const walk = (n: JsonNode, depth: number) => {
    if (n.kind === 'number' || n.kind === 'literal') {
      out.push(n.raw);
      return;
    }
    const isObj = n.kind === 'object';
    const size = isObj ? n.entries.length : n.items.length;
    const [open, close] = isObj ? ['{', '}'] : ['[', ']'];
    if (size === 0) {
      out.push(open + close);
      return;
    }
    const inner = pretty ? '\n' + unit.repeat(depth + 1) : '';
    out.push(open);
    for (let i = 0; i < size; i++) {
      if (i > 0) out.push(',');
      out.push(inner);
      if (isObj) {
        const entry = n.entries[i];
        out.push(entry.key, pretty ? ': ' : ':');
        walk(entry.value, depth + 1);
      } else {
        walk(n.items[i], depth + 1);
      }
    }
    if (pretty) out.push('\n' + unit.repeat(depth));
    out.push(close);
  };
  walk(node, 0);
  return out.join('');
}

function decodeKey(raw: string): string {
  return JSON.parse(raw) as string;
}

function sortNode(node: JsonNode): JsonNode {
  if (node.kind === 'array') return { kind: 'array', items: node.items.map(sortNode) };
  if (node.kind !== 'object') return node;
  const entries = node.entries
    .map(e => ({ key: e.key, sortKey: decodeKey(e.key), value: sortNode(e.value) }))
    // Same order as Object.keys(...).sort(): UTF-16 code units. Stable for duplicate keys.
    .sort((a, b) => (a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : 0))
    .map(({ key, value }) => ({ key, value }));
  return { kind: 'object', entries };
}

/** Pretty-prints JSON, keeping every number and string literal exactly as written. Throws JsonSyntaxError. */
export function formatJson(text: string, indent: JsonIndent = 2): string {
  return print(parseTree(text).node, indentUnit(indent) || ' ');
}

/** Removes all insignificant whitespace, keeping literals exactly as written. Throws JsonSyntaxError. */
export function minifyJson(text: string): string {
  return print(parseTree(text).node, '');
}

/** Sorts object keys recursively and pretty-prints, keeping literals exactly as written. Throws JsonSyntaxError. */
export function sortKeysJson(text: string, indent: JsonIndent = 2): string {
  return print(sortNode(parseTree(text).node), indentUnit(indent) || ' ');
}

/** Number literals that would change value if read by JSON.parse (unsafe integers, extra precision, overflow). */
export function findUnsafeNumbers(text: string): UnsafeNumber[] {
  try {
    return parseTree(text, true).numbers;
  } catch {
    return [];
  }
}

// ── Validation ───────────────────────────────────────────────────────────────

/** Strips the engine's own location suffix so the UI can show line/column separately. */
function cleanEngineMessage(message: string): string {
  return message
    .replace(/^JSON\.parse:\s*/, '')
    .replace(/\s*(?:in JSON\s*)?at position \d+(?:\s*\(line \d+ column \d+\))?/, '')
    .replace(/\s*at line \d+ column \d+ of the JSON data/, '')
    .trim();
}

/** Extracts a 0-based error offset from an engine JSON.parse error message, if it has one. */
export function engineErrorPosition(text: string, message: string): number | null {
  const pos = /position (\d+)/.exec(message);
  if (pos) return Math.min(Number(pos[1]), text.length);
  const lc = /line (\d+) column (\d+)/.exec(message);
  if (lc) return positionAt(text, Number(lc[1]), Number(lc[2]));
  return null;
}

/**
 * Checks that text is valid JSON. Uses the native parser for speed and its message;
 * the location comes from the engine message when it has one, otherwise from the
 * strict parser in this module.
 */
export function validateJson(text: string): JsonValidation {
  if (!text.trim()) {
    return { ok: false, message: 'No JSON to parse', line: 1, column: 1, position: 0 };
  }
  try {
    JSON.parse(text);
    return { ok: true };
  } catch (e) {
    const engineMessage = e instanceof Error ? e.message : String(e);
    let ownError: JsonSyntaxError | null = null;
    try {
      parseTree(text);
    } catch (inner) {
      if (inner instanceof JsonSyntaxError) ownError = inner;
    }
    const enginePos = engineErrorPosition(text, engineMessage);
    const position = enginePos ?? ownError?.position ?? 0;
    const { line, column } = lineColumnAt(text, position);
    // Prefer our wording when the engine's message has no location (Safari, older V8):
    // it then usually quotes a chunk of the input instead of saying what's wrong.
    const message =
      enginePos === null && ownError ? ownError.message : cleanEngineMessage(engineMessage) || 'Invalid JSON';
    return { ok: false, message, line, column, position };
  }
}

// ── String escaping ──────────────────────────────────────────────────────────

/** Turns any text into a JSON string literal (quotes included), e.g. to embed JSON inside JSON. */
export function escapeJsonString(text: string): string {
  return JSON.stringify(text);
}

/**
 * Decodes a JSON string literal back to its text. Accepts it with surrounding quotes
 * ("{\"a\":1}") or without ({\"a\":1}). Throws an Error when it isn't a valid string literal.
 */
export function unescapeJsonString(text: string): string {
  const trimmed = text.trim();
  const quoted =
    trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"') ? trimmed : `"${text}"`;
  let value: unknown;
  try {
    value = JSON.parse(quoted);
  } catch {
    throw new Error('Not a valid JSON string literal: check for unescaped quotes or bad backslash escapes');
  }
  if (typeof value !== 'string') throw new Error('Not a JSON string literal');
  return value;
}
