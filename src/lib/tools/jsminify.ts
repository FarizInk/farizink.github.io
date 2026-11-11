// JS Minifier logic: terser (minify) and prettier standalone (beautify), both loaded with
// dynamic import() so they only download when the tool is actually used.
// Kept in one module: node --test can't resolve extensionless relative imports.

export type Mode = 'minify' | 'beautify';
export type CommentMode = 'none' | 'license';
export type EcmaTarget = '2015' | '2020' | 'latest';
export type SourceType = 'script' | 'module';
export type IndentStyle = '2' | '4' | 'tab';
export type QuoteStyle = 'double' | 'single';

export interface MinifyOptions {
  compress: boolean;
  mangle: boolean;
  comments: CommentMode;
  ecma: EcmaTarget;
  sourceType: SourceType;
}

export interface BeautifyOptions {
  indent: IndentStyle;
  semicolons: boolean;
  quotes: QuoteStyle;
  printWidth: number;
}

export const DEFAULT_MINIFY: MinifyOptions = {
  compress: true,
  mangle: true,
  comments: 'license',
  ecma: '2020',
  sourceType: 'script'
};

export const DEFAULT_BEAUTIFY: BeautifyOptions = {
  indent: '2',
  semicolons: true,
  quotes: 'single',
  printWidth: 80
};

export const PRINT_WIDTHS = [60, 80, 100, 120] as const;

export type TransformResult =
  | { ok: true; code: string }
  | { ok: false; message: string; line?: number; column?: number };

const ECMA = { '2015': 2015, '2020': 2020, latest: 2025 } as const;

/** Minify with terser. Errors (syntax or otherwise) come back as `{ ok: false }` with a 1-based position. */
export async function minifyJs(code: string, opts: MinifyOptions = DEFAULT_MINIFY): Promise<TransformResult> {
  const { minify } = await import('terser');
  const isModule = opts.sourceType === 'module';
  try {
    const out = await minify(code, {
      ecma: ECMA[opts.ecma],
      module: isModule,
      compress: opts.compress ? {} : false,
      mangle: opts.mangle,
      // 'some' keeps /*! … */, @license and @preserve comments.
      format: { comments: opts.comments === 'license' ? 'some' : false }
    });
    return { ok: true, code: out.code ?? '' };
  } catch (e) {
    return terserError(e);
  }
}

function terserError(e: unknown): TransformResult {
  if (e && typeof e === 'object') {
    const err = e as { message?: unknown; line?: unknown; col?: unknown };
    const message = typeof err.message === 'string' ? err.message : String(e);
    // terser: line is 1-based, col is 0-based.
    if (typeof err.line === 'number' && typeof err.col === 'number') {
      return { ok: false, message, line: err.line, column: err.col + 1 };
    }
    return { ok: false, message };
  }
  return { ok: false, message: String(e) };
}

/** Pretty-print with prettier (babel parser). */
export async function beautifyJs(code: string, opts: BeautifyOptions = DEFAULT_BEAUTIFY): Promise<TransformResult> {
  const [prettier, babel, estree] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/babel'),
    import('prettier/plugins/estree')
  ]);
  try {
    const out = await prettier.format(code, {
      parser: 'babel',
      plugins: [babel, estree],
      useTabs: opts.indent === 'tab',
      tabWidth: opts.indent === '4' ? 4 : 2,
      semi: opts.semicolons,
      singleQuote: opts.quotes === 'single',
      printWidth: opts.printWidth
    });
    return { ok: true, code: out };
  } catch (e) {
    return prettierError(e);
  }
}

function prettierError(e: unknown): TransformResult {
  if (e && typeof e === 'object') {
    const err = e as { message?: unknown; loc?: { start?: { line?: unknown; column?: unknown } } };
    const raw = typeof err.message === 'string' ? err.message : String(e);
    // First line only (the rest is a code frame), without the trailing "(line:col)".
    const message = raw.split('\n')[0].replace(/\s*\(\d+:\d+\)\s*$/, '');
    const start = err.loc?.start;
    // prettier: both 1-based.
    if (start && typeof start.line === 'number' && typeof start.column === 'number') {
      return { ok: false, message, line: start.line, column: start.column };
    }
    return { ok: false, message };
  }
  return { ok: false, message: String(e) };
}

export function transformJs(
  mode: Mode,
  code: string,
  minifyOpts: MinifyOptions,
  beautifyOpts: BeautifyOptions
): Promise<TransformResult> {
  return mode === 'minify' ? minifyJs(code, minifyOpts) : beautifyJs(code, beautifyOpts);
}

/** UTF-8 byte length. */
export function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

/** Percentage saved going from `before` to `after` bytes; negative when the output grew. */
export function savedPercent(before: number, after: number): number {
  if (before <= 0) return 0;
  return Math.round(((before - after) / before) * 1000) / 10;
}

/** Normalize stored options (from localStorage) against the defaults; unknown values fall back. */
export function sanitizeMinify(raw: unknown): MinifyOptions {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    compress: typeof o.compress === 'boolean' ? o.compress : DEFAULT_MINIFY.compress,
    mangle: typeof o.mangle === 'boolean' ? o.mangle : DEFAULT_MINIFY.mangle,
    comments: o.comments === 'none' || o.comments === 'license' ? o.comments : DEFAULT_MINIFY.comments,
    ecma: o.ecma === '2015' || o.ecma === '2020' || o.ecma === 'latest' ? o.ecma : DEFAULT_MINIFY.ecma,
    sourceType: o.sourceType === 'script' || o.sourceType === 'module' ? o.sourceType : DEFAULT_MINIFY.sourceType
  };
}

export function sanitizeBeautify(raw: unknown): BeautifyOptions {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const width = Number(o.printWidth);
  return {
    indent: o.indent === '2' || o.indent === '4' || o.indent === 'tab' ? o.indent : DEFAULT_BEAUTIFY.indent,
    semicolons: typeof o.semicolons === 'boolean' ? o.semicolons : DEFAULT_BEAUTIFY.semicolons,
    quotes: o.quotes === 'single' || o.quotes === 'double' ? o.quotes : DEFAULT_BEAUTIFY.quotes,
    printWidth: (PRINT_WIDTHS as readonly number[]).includes(width) ? width : DEFAULT_BEAUTIFY.printWidth
  };
}

export const SAMPLE_JS = `/*! cart.js — MIT License */
// Totals for a shopping cart
const TAX_RATE = 0.08;

function calculateTotal(items, tax = TAX_RATE) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.quantity; // line total
  }
  const taxAmount = subtotal * tax;
  return {
    subtotal,
    tax: taxAmount,
    total: subtotal + taxAmount,
    label: \`Total: $\${(subtotal + taxAmount).toFixed(2)}\`
  };
}

const isUrl = s => /^https?:\\/\\//.test(s);
const cart = [
  { name: 'Book', price: 15.99, quantity: 2 },
  { name: 'Pen', price: 1.5, quantity: 10 }
];

if (cart.length === 0 || !isUrl('https://fariz.dev')) {
  console.warn('Nothing to total');
} else {
  console.log(calculateTotal(cart).label);
}
`;
