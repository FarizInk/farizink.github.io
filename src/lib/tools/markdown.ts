// Markdown Preview helpers: GFM rendering (marked), sanitizing (DOMPurify), URL allow-list,
// standalone-document export, word stats and toolbar formatting.
// Self-contained on purpose (only package imports) so `node --test` can load it directly.
import { Marked, type Tokens } from 'marked';
import createDOMPurify from 'dompurify';

/** Turns rendered HTML into HTML that is safe to inject. */
export type Sanitizer = (html: string) => string;
/** Returns highlighted, already-escaped HTML for a code block, or null to fall back to plain text. */
export type Highlighter = (code: string, lang: string) => string | null;

export interface RenderOptions {
  /** Treat single line breaks as `<br>` (GitHub comments style). Default false. */
  breaks?: boolean;
  /** Syntax highlighter for fenced code blocks with a language. */
  highlight?: Highlighter;
  /** Sanitizer to use; defaults to DOMPurify in the browser. Required where there is no `window`. */
  sanitize?: Sanitizer;
}

export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const SAFE_SCHEMES = new Set(['http', 'https', 'mailto']);

/**
 * URL allow-list for links and images: http(s), mailto, and scheme-less URLs
 * (relative paths, `?query`, `#anchor`). Anything else — `javascript:`, `data:`, `vbscript:`,
 * `file:` … — is rejected. Whitespace and control characters are ignored when detecting the
 * scheme, as browsers do (`java\tscript:` is still `javascript:`).
 */
export function isSafeUrl(url: string): boolean {
  // eslint-disable-next-line no-control-regex
  const compact = url.replace(/[\u0000- \u007f-\u009f]/g, '');
  if (compact === '') return false;
  if (compact.startsWith('//')) return true; // protocol-relative: inherits http(s)
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(compact);
  if (!scheme) return true; // relative path, ?query or #anchor
  return SAFE_SCHEMES.has(scheme[1].toLowerCase());
}

/** Absolute http(s) or protocol-relative URL — opens in a new tab. */
export function isExternalUrl(url: string): boolean {
  return /^(https?:)?\/\//i.test(url.trim());
}

/** Fenced-code language names are copied into a class attribute: keep them boring. */
function cleanLang(lang: string | undefined): string {
  return (lang ?? '').trim().split(/\s+/)[0].replace(/[^\w+#.-]/g, '').toLowerCase();
}

function createMarked(breaks: boolean, highlight: Highlighter | undefined): Marked {
  return new Marked({
    gfm: true,
    breaks,
    async: false,
    renderer: {
      code({ text, lang }: Tokens.Code): string {
        const language = cleanLang(lang);
        const highlighted = language && highlight ? highlight(text, language) : null;
        const body = highlighted ?? escapeHtml(text);
        const cls = language ? ` class="${highlighted !== null ? 'hljs ' : ''}language-${language}"` : '';
        return `<pre><code${cls}>${body}${body.endsWith('\n') ? '' : '\n'}</code></pre>\n`;
      },
      link({ href, title, tokens }: Tokens.Link): string {
        const inner = this.parser.parseInline(tokens);
        if (!isSafeUrl(href)) return inner;
        const t = title ? ` title="${escapeHtml(title)}"` : '';
        const ext = isExternalUrl(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${escapeHtml(href)}"${t}${ext}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image): string {
        if (!isSafeUrl(href)) return escapeHtml(text);
        const t = title ? ` title="${escapeHtml(title)}"` : '';
        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${t} loading="lazy">`;
      }
    }
  });
}

let browserSanitizer: Sanitizer | null = null;

/** DOMPurify (own instance, so its hooks don't leak to other users) with the link policy applied. */
function getBrowserSanitizer(): Sanitizer {
  if (browserSanitizer) return browserSanitizer;
  if (typeof window === 'undefined') {
    throw new Error('renderMarkdown: no DOM available — pass a `sanitize` function');
  }
  const purify = createDOMPurify(window);
  purify.addHook('afterSanitizeAttributes', node => {
    const el = node as Element;
    for (const attr of ['href', 'src']) {
      const v = el.getAttribute?.(attr);
      if (v !== null && v !== undefined && !isSafeUrl(v)) el.removeAttribute(attr);
    }
    if (el.tagName === 'A') {
      const href = el.getAttribute('href');
      if (href && isExternalUrl(href)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      } else {
        el.removeAttribute('target');
      }
    }
  });
  const sanitize: Sanitizer = html =>
    purify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target'],
      FORBID_TAGS: ['style', 'form', 'button', 'textarea', 'select'],
      FORBID_ATTR: ['style']
    });
  browserSanitizer = sanitize;
  return sanitize;
}

/** GFM (tables, task lists, strikethrough, autolinks) → sanitized HTML. */
export function renderMarkdown(src: string, opts: RenderOptions = {}): string {
  if (!src.trim()) return '';
  const html = createMarked(opts.breaks ?? false, opts.highlight).parse(src, { async: false });
  return (opts.sanitize ?? getBrowserSanitizer())(html);
}

const DOC_CSS = `
:root { color-scheme: light dark; }
body { max-width: 760px; margin: 0 auto; padding: 32px 20px 64px; font: 16px/1.7 system-ui, -apple-system, "Segoe UI", sans-serif; color: #1b1726; background: #fff; overflow-wrap: anywhere; }
h1, h2, h3, h4, h5, h6 { line-height: 1.3; margin: 1.4em 0 .5em; }
a { color: #6d28d9; }
code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .9em; }
code { background: #f0edf7; padding: .1em .35em; border-radius: 4px; }
pre { background: #f0edf7; padding: 14px 16px; border-radius: 8px; overflow-x: auto; }
pre code { background: none; padding: 0; }
blockquote { margin: 1em 0; padding: .25em 1em; color: #555; border-left: 4px solid #c3b0ff; }
table { border-collapse: collapse; display: block; overflow-x: auto; }
th, td { border: 1px solid #ddd; padding: 6px 12px; text-align: left; }
img { max-width: 100%; }
hr { border: 0; border-top: 1px solid #ddd; margin: 2em 0; }
li:has(> input[type="checkbox"]) { list-style: none; }
@media (prefers-color-scheme: dark) {
  body { color: #ece8f5; background: #141019; }
  a { color: #bda2ff; }
  code, pre { background: #251d3a; }
  blockquote { color: #b9b2cc; }
  th, td, hr { border-color: #3a3156; }
}`.trim();

/** Wraps an HTML fragment in a minimal standalone document. `html` must already be sanitized. */
export function toHtmlDocument(html: string, title: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title.trim() || 'Document')}</title>
<style>
${DOC_CSS}
</style>
</head>
<body>
${html}
</body>
</html>
`;
}

/** First `# Heading` in the source, for document titles and file names. */
export function firstHeading(src: string): string | null {
  const m = /^ {0,3}#{1,6}[ \t]+(.+?)[ \t#]*$/m.exec(src);
  return m ? m[1].replace(/[*_`~[\]]/g, '').trim() || null : null;
}

export interface WordStats {
  words: number;
  characters: number;
  /** Whole minutes at 200 words per minute; 0 for empty text, at least 1 otherwise. */
  readingMinutes: number;
}

export function wordStats(src: string): WordStats {
  const text = src.replace(/\]\([^)]*\)/g, ']'); // link targets are not words
  const words = text.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return {
    words,
    characters: [...src].length,
    readingMinutes: words === 0 ? 0 : Math.max(1, Math.round(words / 200))
  };
}

export type FormatKind = 'bold' | 'italic' | 'code' | 'link' | 'heading' | 'list' | 'quote';

/** Replace `text[from, to)` with `insert`, then select `[selStart, selEnd)` in the new text. */
export interface FormatEdit {
  from: number;
  to: number;
  insert: string;
  selStart: number;
  selEnd: number;
}

const PLACEHOLDER: Record<'bold' | 'italic' | 'code' | 'link', string> = {
  bold: 'bold text',
  italic: 'italic text',
  code: 'code',
  link: 'link text'
};

/** Toolbar / shortcut formatting for the selection `[start, end)` of `text`. */
export function formatSelection(text: string, start: number, end: number, kind: FormatKind): FormatEdit {
  const sel = text.slice(start, end);

  if (kind === 'heading' || kind === 'list' || kind === 'quote') {
    const from = text.lastIndexOf('\n', start - 1) + 1;
    const nl = text.indexOf('\n', end > start && text[end - 1] === '\n' ? end - 1 : end);
    const to = nl === -1 ? text.length : nl;
    const lines = text.slice(from, to).split('\n');
    let out: string[];
    if (kind === 'heading') {
      out = lines.map(l => (/^#{1,5} /.test(l) ? `#${l}` : /^#{6} /.test(l) ? l.replace(/^#+ /, '') : `## ${l}`));
    } else {
      const prefix = kind === 'list' ? '- ' : '> ';
      const filled = lines.filter(l => l.trim() !== '');
      const allPrefixed = filled.length > 0 && filled.every(l => l.startsWith(prefix));
      out = lines.map(l => (allPrefixed ? (l.startsWith(prefix) ? l.slice(prefix.length) : l) : l.trim() === '' && lines.length > 1 ? l : prefix + l));
    }
    const insert = out.join('\n');
    return { from, to, insert, selStart: from, selEnd: from + insert.length };
  }

  if (kind === 'code' && sel.includes('\n')) {
    const body = sel.endsWith('\n') ? sel : `${sel}\n`;
    const insert = `\`\`\`\n${body}\`\`\``;
    return { from: start, to: end, insert, selStart: start + 4, selEnd: start + 4 + body.length - 1 };
  }

  if (kind === 'link') {
    const label = sel || PLACEHOLDER.link;
    const insert = `[${label}](https://)`;
    // With text selected, select the URL to type over; otherwise select the placeholder label.
    return sel
      ? { from: start, to: end, insert, selStart: start + label.length + 3, selEnd: start + insert.length - 1 }
      : { from: start, to: end, insert, selStart: start + 1, selEnd: start + 1 + label.length };
  }

  const mark = kind === 'bold' ? '**' : kind === 'italic' ? '*' : '`';
  const inner = sel || PLACEHOLDER[kind];
  return {
    from: start,
    to: end,
    insert: mark + inner + mark,
    selStart: start + mark.length,
    selEnd: start + mark.length + inner.length
  };
}
