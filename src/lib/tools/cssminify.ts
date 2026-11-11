// CSS Minifier logic: csso minifies, Prettier (postcss plugin) beautifies. Both are real CSS
// parsers, so strings, url(), comments-in-strings and selector combinators survive intact.
// The libraries are imported lazily (dynamic import) so they stay out of the main bundle.
// Kept in one module: node --test can't resolve extensionless relative imports.

export type CssResult = { ok: true; code: string } | { ok: false; message: string; line?: number; column?: number };

export interface MinifyOptions {
  /** csso structural optimisations (merge/move rules and declarations). */
  restructure: boolean;
  /** Keep special comments that start with `/*!` (licenses). */
  keepSpecialComments: boolean;
}

export type Indent = 2 | 4 | 'tab';

export interface BeautifyOptions {
  indent: Indent;
  printWidth: number;
}

export const DEFAULT_MINIFY: MinifyOptions = { restructure: true, keepSpecialComments: true };
export const DEFAULT_BEAUTIFY: BeautifyOptions = { indent: 2, printWidth: 80 };

type Csso = typeof import('csso');
let cssoPromise: Promise<Csso> | undefined;
function loadCsso(): Promise<Csso> {
  cssoPromise ??= import('csso').catch(e => {
    cssoPromise = undefined;
    throw e;
  });
  return cssoPromise;
}

type PrettierKit = {
  format: (typeof import('prettier/standalone'))['format'];
  plugin: typeof import('prettier/plugins/postcss');
};
let prettierPromise: Promise<PrettierKit> | undefined;
function loadPrettier(): Promise<PrettierKit> {
  prettierPromise ??= Promise.all([import('prettier/standalone'), import('prettier/plugins/postcss')])
    .then(([standalone, plugin]) => ({ format: standalone.format, plugin }))
    .catch(e => {
      prettierPromise = undefined;
      throw e;
    });
  return prettierPromise;
}

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

const squash = (s: string) => s.replace(/\s+/g, '');

/**
 * Minify with csso. csso's parser is tolerant: syntax it can't parse becomes a raw chunk that the
 * compressor may silently drop (e.g. CSS nesting, media range syntax). When that would happen we
 * return an error pointing at the chunk instead of output with missing code.
 */
export async function minifyCss(code: string, opts: MinifyOptions = DEFAULT_MINIFY): Promise<CssResult> {
  if (!code.trim()) return { ok: true, code: '' };
  const csso = await loadCsso();

  let output: string;
  try {
    output = csso.minify(code, {
      restructure: opts.restructure,
      comments: opts.keepSpecialComments ? 'exclamation' : false
    }).css;
  } catch (e) {
    return { ok: false, message: errorMessage(e) };
  }

  const errors: { message: string; line: number; column: number }[] = [];
  const ast = csso.syntax.parse(code, {
    positions: true,
    onParseError: (err: { message?: string; line?: number; column?: number }) => {
      errors.push({ message: err.message ?? 'Parse error', line: err.line ?? 1, column: err.column ?? 1 });
    }
  });
  if (errors.length === 0) return { ok: true, code: output };

  // Parse errors: fine as long as every unparsed chunk made it into the output untouched.
  const kept = squash(output);
  const lost: { line: number; column: number; text: string }[] = [];
  csso.syntax.walk(ast, node => {
    if (lost.length || node.type !== 'Raw') return;
    const text = squash(node.value);
    if (text && !kept.includes(text)) {
      lost.push({ line: node.loc?.start.line ?? 1, column: node.loc?.start.column ?? 1, text: node.value.trim() });
    }
  });
  const drop = lost[0];
  if (!drop) return { ok: true, code: output };

  const first = errors.find(e => e.line === drop.line) ?? errors[0];
  const snippet = drop.text.length > 40 ? `${drop.text.slice(0, 40)}…` : drop.text;
  return {
    ok: false,
    message: `${first.message} — csso can't parse “${snippet}” and would drop it (nesting and media range syntax aren't supported)`,
    line: drop.line,
    column: drop.column
  };
}

/** Beautify with Prettier's CSS printer. Syntax errors come back with line/column. */
export async function beautifyCss(code: string, opts: BeautifyOptions = DEFAULT_BEAUTIFY): Promise<CssResult> {
  if (!code.trim()) return { ok: true, code: '' };
  const { format, plugin } = await loadPrettier();
  try {
    const out = await format(code, {
      parser: 'css',
      plugins: [plugin],
      printWidth: opts.printWidth,
      useTabs: opts.indent === 'tab',
      tabWidth: opts.indent === 'tab' ? 2 : opts.indent
    });
    return { ok: true, code: out };
  } catch (e) {
    const loc = (e as { loc?: { start?: { line?: number; column?: number } } })?.loc?.start;
    // Prettier's message is "CssSyntaxError: Unclosed block (1:1)" followed by a code frame.
    const message = errorMessage(e)
      .split('\n')[0]
      .replace(/^CssSyntaxError:\s*/, '')
      .replace(/\s*\(\d+:\d+\)\s*$/, '');
    return { ok: false, message: message || 'Invalid CSS', line: loc?.line, column: loc?.column };
  }
}

/** Size of a string in UTF-8 bytes. */
export function utf8Bytes(s: string): number {
  return new TextEncoder().encode(s).length;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Percentage saved going from `before` to `after` bytes (negative when the output grew). */
export function percentSaved(before: number, after: number): number {
  if (before <= 0) return 0;
  return Math.round(((before - after) / before) * 1000) / 10;
}
