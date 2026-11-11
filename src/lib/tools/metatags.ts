// Pure helpers for the Meta Tag Generator tool (tested in tests/metatags.test.ts).
// No DOM, no Svelte, no relative imports.
//
// Rules:
// - Empty fields emit nothing. Fallbacks (og:title ← title, …) are resolved here, at output
//   time, never copied into the form state.
// - Twitter/X: X reads og:title, og:description and og:image when the twitter:* equivalents
//   are missing, so twitter:title/description/image are only emitted when the user overrides
//   them with a different value. twitter:card has no OG fallback and is always emitted with
//   the social tags; twitter:image:alt is emitted alongside any image that has alt text.

export type OgType = 'website' | 'article' | 'profile';
export type TwitterCard = 'summary_large_image' | 'summary';

export interface MetaInput {
  title: string;
  description: string;
  author: string;
  /** Canonical URL of the page. */
  url: string;
  robots: string;
  themeColor: string;
  /** `<html lang>` of the downloaded document. */
  lang: string;
  viewport: boolean;

  ogType: OgType;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  image: string;
  imageAlt: string;
  imageWidth: string;
  imageHeight: string;
  siteName: string;
  locale: string;

  twitterCard: TwitterCard;
  twitterSite: string;
  twitterCreator: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  /** `datetime-local` values (YYYY-MM-DDTHH:mm) or full ISO 8601. */
  publishedTime: string;
  modifiedTime: string;
  articleAuthor: string;
  articleSection: string;
  /** Comma-separated. */
  articleTags: string;

  jsonLd: boolean;
  /**
   * Offset east of UTC in minutes for article times (420 = +07:00). When undefined the
   * runtime's local offset for each date is used (DST-aware).
   */
  utcOffset?: number;
}

export const EMPTY_INPUT: MetaInput = {
  title: '',
  description: '',
  author: '',
  url: '',
  robots: '',
  themeColor: '',
  lang: '',
  viewport: true,
  ogType: 'website',
  ogTitle: '',
  ogDescription: '',
  ogUrl: '',
  image: '',
  imageAlt: '',
  imageWidth: '',
  imageHeight: '',
  siteName: '',
  locale: '',
  twitterCard: 'summary_large_image',
  twitterSite: '',
  twitterCreator: '',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  publishedTime: '',
  modifiedTime: '',
  articleAuthor: '',
  articleSection: '',
  articleTags: '',
  jsonLd: false
};

export const EXAMPLE_INPUT: MetaInput = {
  ...EMPTY_INPUT,
  title: 'Shipping a Tiny Static Site in 2026',
  description:
    'Notes on building a fast, accessible portfolio with Svelte 5, Vite and a flat design system — and deploying it to GitHub Pages.',
  author: 'Fariz',
  url: 'https://fariz.dev/blog/tiny-static-site',
  themeColor: '#9b6bff',
  lang: 'en',
  ogType: 'article',
  image: 'https://fariz.dev/og/tiny-static-site.png',
  imageAlt: 'A purple bento grid layout on a dark background',
  imageWidth: '1200',
  imageHeight: '630',
  siteName: 'fariz.dev',
  locale: 'en_US',
  twitterSite: '@fariz',
  twitterCreator: '@fariz',
  publishedTime: '2026-11-01T09:00',
  articleAuthor: 'Fariz',
  articleSection: 'Engineering',
  articleTags: 'svelte, vite, static sites',
  jsonLd: true
};

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/** Escape text for an HTML attribute value or text node. */
export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const clean = (s: string | undefined) => (s ?? '').trim();

function meta(attr: 'name' | 'property', key: string, content: string): string {
  return `<meta ${attr}="${key}" content="${escapeAttr(content)}">`;
}

export function splitTags(tags: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tags.split(',')) {
    const v = t.trim();
    if (v && !seen.has(v.toLowerCase())) {
      seen.add(v.toLowerCase());
      out.push(v);
    }
  }
  return out;
}

function formatOffset(minutes: number): string {
  const sign = minutes < 0 ? '-' : '+';
  const abs = Math.abs(minutes);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** Offset east of UTC in minutes for a wall-clock time in the runtime's zone. */
function localOffset(local: string): number {
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? -new Date().getTimezoneOffset() : -d.getTimezoneOffset();
}

/** "+07:00"-style label for the runtime's current offset. */
export function currentOffsetLabel(): string {
  return formatOffset(-new Date().getTimezoneOffset());
}

/**
 * `datetime-local` value → full ISO 8601 with offset ("2026-11-01T09:00:00+07:00").
 * Values that already carry Z or an offset are returned unchanged; invalid input → ''.
 */
export function toIsoWithOffset(value: string, offsetMinutes?: number): string {
  const v = clean(value);
  if (!v) return '';
  if (/(Z|[+-]\d{2}:?\d{2})$/i.test(v) && /T/.test(v)) return v;
  const m = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(v);
  if (!m) return '';
  const [, date, hh = '00', mm = '00', ss = '00'] = m;
  const wall = `${date}T${hh}:${mm}:${ss}`;
  return wall + formatOffset(offsetMinutes ?? localOffset(wall));
}

function handle(v: string): string {
  const s = clean(v);
  if (!s) return '';
  return s.startsWith('@') ? s : `@${s}`;
}

export function isAbsoluteUrl(v: string): boolean {
  if (!/^https?:\/\//i.test(v)) return false;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

/** Resolved values after fallbacks — what the tags and previews show. */
export function resolve(input: MetaInput) {
  const title = clean(input.title);
  const description = clean(input.description);
  const url = clean(input.url);
  const ogTitle = clean(input.ogTitle) || title;
  const ogDescription = clean(input.ogDescription) || description;
  const ogUrl = clean(input.ogUrl) || url;
  const image = clean(input.image);
  return {
    title,
    description,
    url,
    ogTitle,
    ogDescription,
    ogUrl,
    image,
    twitterTitle: clean(input.twitterTitle) || ogTitle,
    twitterDescription: clean(input.twitterDescription) || ogDescription,
    twitterImage: clean(input.twitterImage) || image
  };
}

/** `<script type="application/ld+json">` body, with `<` escaped so `</script>` can't break out. */
export function buildJsonLd(input: MetaInput): string {
  const r = resolve(input);
  if (!input.jsonLd || !(r.ogTitle || r.title)) return '';
  const name = r.title || r.ogTitle;
  const desc = r.description || r.ogDescription;
  const pageUrl = r.url || r.ogUrl;
  const data: Record<string, unknown> = { '@context': 'https://schema.org' };
  if (input.ogType === 'article') {
    data['@type'] = 'Article';
    data.headline = name;
    if (desc) data.description = desc;
    if (r.image) data.image = r.image;
    const pub = toIsoWithOffset(input.publishedTime, input.utcOffset);
    const mod = toIsoWithOffset(input.modifiedTime, input.utcOffset);
    if (pub) data.datePublished = pub;
    if (mod) data.dateModified = mod;
    const author = clean(input.articleAuthor) || clean(input.author);
    if (author) data.author = { '@type': 'Person', name: author };
    if (pageUrl) data.mainEntityOfPage = pageUrl;
  } else {
    data['@type'] = 'WebSite';
    data.name = clean(input.siteName) || name;
    if (desc) data.description = desc;
    if (pageUrl) data.url = pageUrl;
  }
  const json = JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

/** Ordered tags; `<meta charset>` first. Empty input → no tags. */
export function buildMetaTags(input: MetaInput): { tags: string[]; html: string } {
  const r = resolve(input);
  const body: string[] = [];

  if (r.title) body.push(`<title>${escapeAttr(r.title)}</title>`);
  if (r.description) body.push(meta('name', 'description', r.description));
  if (clean(input.author)) body.push(meta('name', 'author', clean(input.author)));
  if (r.url) body.push(`<link rel="canonical" href="${escapeAttr(r.url)}">`);
  if (clean(input.robots)) body.push(meta('name', 'robots', clean(input.robots)));
  if (clean(input.themeColor)) body.push(meta('name', 'theme-color', clean(input.themeColor)));

  // Open Graph
  const og: string[] = [];
  if (r.ogTitle) og.push(meta('property', 'og:title', r.ogTitle));
  if (r.ogDescription) og.push(meta('property', 'og:description', r.ogDescription));
  if (r.ogUrl) og.push(meta('property', 'og:url', r.ogUrl));
  if (r.image) {
    og.push(meta('property', 'og:image', r.image));
    if (clean(input.imageWidth)) og.push(meta('property', 'og:image:width', clean(input.imageWidth)));
    if (clean(input.imageHeight)) og.push(meta('property', 'og:image:height', clean(input.imageHeight)));
    if (clean(input.imageAlt)) og.push(meta('property', 'og:image:alt', clean(input.imageAlt)));
  }
  if (clean(input.siteName)) og.push(meta('property', 'og:site_name', clean(input.siteName)));
  if (clean(input.locale)) og.push(meta('property', 'og:locale', clean(input.locale)));
  // og:type only makes sense next to other OG data.
  if (og.length) body.push(meta('property', 'og:type', input.ogType || 'website'), ...og);

  // Article
  if (input.ogType === 'article') {
    const pub = toIsoWithOffset(input.publishedTime, input.utcOffset);
    const mod = toIsoWithOffset(input.modifiedTime, input.utcOffset);
    if (pub) body.push(meta('property', 'article:published_time', pub));
    if (mod) body.push(meta('property', 'article:modified_time', mod));
    if (clean(input.articleAuthor)) body.push(meta('property', 'article:author', clean(input.articleAuthor)));
    if (clean(input.articleSection)) body.push(meta('property', 'article:section', clean(input.articleSection)));
    for (const tag of splitTags(input.articleTags)) body.push(meta('property', 'article:tag', tag));
  }

  // Twitter / X — only what doesn't already fall back to OG.
  const tw: string[] = [];
  const site = handle(input.twitterSite);
  const creator = handle(input.twitterCreator);
  if (site) tw.push(meta('name', 'twitter:site', site));
  if (creator) tw.push(meta('name', 'twitter:creator', creator));
  if (r.twitterTitle && r.twitterTitle !== r.ogTitle) tw.push(meta('name', 'twitter:title', r.twitterTitle));
  if (r.twitterDescription && r.twitterDescription !== r.ogDescription)
    tw.push(meta('name', 'twitter:description', r.twitterDescription));
  if (r.twitterImage && r.twitterImage !== r.image) tw.push(meta('name', 'twitter:image', r.twitterImage));
  if (r.twitterImage && clean(input.imageAlt)) tw.push(meta('name', 'twitter:image:alt', clean(input.imageAlt)));
  if (tw.length || og.length) body.push(meta('name', 'twitter:card', input.twitterCard || 'summary_large_image'), ...tw);

  const jsonLd = buildJsonLd(input);
  if (jsonLd) body.push(jsonLd);

  if (!body.length) return { tags: [], html: '' };
  const tags = [
    '<meta charset="utf-8">',
    ...(input.viewport ? ['<meta name="viewport" content="width=device-width, initial-scale=1">'] : []),
    ...body
  ];
  return { tags, html: tags.join('\n') };
}

export interface MetaWarning {
  field: keyof MetaInput;
  message: string;
}

export function validate(input: MetaInput): MetaWarning[] {
  const r = resolve(input);
  const out: MetaWarning[] = [];
  if (r.title.length > TITLE_MAX)
    out.push({ field: 'title', message: `Title is ${r.title.length} characters; search results usually cut it after ~${TITLE_MAX}.` });
  if (r.description.length > DESCRIPTION_MAX)
    out.push({
      field: 'description',
      message: `Description is ${r.description.length} characters; search results usually cut it after ~${DESCRIPTION_MAX}.`
    });
  const urls: [keyof MetaInput, string][] = [
    ['url', 'Canonical URL'],
    ['ogUrl', 'og:url']
  ];
  for (const [field, label] of urls) {
    const v = clean(input[field] as string);
    if (v && !isAbsoluteUrl(v)) out.push({ field, message: `${label} should be a full URL starting with https://.` });
  }
  const images: [keyof MetaInput, string][] = [
    ['image', 'Image URL'],
    ['twitterImage', 'X image URL']
  ];
  for (const [field, label] of images) {
    const v = clean(input[field] as string);
    if (!v) continue;
    if (!/^[a-z][a-z\d+.-]*:/i.test(v) || v.startsWith('//'))
      out.push({ field, message: `${label} is relative; Open Graph needs an absolute URL (https://…).` });
    else if (!isAbsoluteUrl(v)) out.push({ field, message: `${label} is not a valid http(s) URL.` });
  }
  if (!r.image && (r.ogTitle || r.ogDescription))
    out.push({ field: 'image', message: 'No og:image — shared links will show a text-only card.' });
  return out;
}

/** Complete HTML document for download; every user value is escaped. */
export function buildHtmlDocument(input: MetaInput): string {
  const { tags } = buildMetaTags(input);
  const r = resolve(input);
  const lang = escapeAttr(clean(input.lang) || 'en');
  const head = (tags.length ? tags : ['<meta charset="utf-8">'])
    .map((t) => t.split('\n').map((l) => `    ${l}`).join('\n'))
    .join('\n');
  const heading = escapeAttr(r.title || 'Untitled page');
  const desc = r.description ? `\n    <p>${escapeAttr(r.description)}</p>` : '';
  return `<!doctype html>
<html lang="${lang}">
  <head>
${head}
  </head>
  <body>
    <h1>${heading}</h1>${desc}
  </body>
</html>
`;
}

/** SERP-style truncation on a word boundary. */
export function truncate(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–—-]+$/, '')}…`;
}

/** "example.com › blog › post" for the search preview; '' when not a URL. */
export function breadcrumb(url: string): string {
  const v = clean(url);
  if (!isAbsoluteUrl(v)) return '';
  const u = new URL(v);
  const parts = u.pathname.split('/').filter(Boolean).map((p) => {
    try {
      return decodeURIComponent(p);
    } catch {
      return p;
    }
  });
  return [u.host.replace(/^www\./, ''), ...parts].join(' › ');
}

export function hostOf(url: string): string {
  const v = clean(url);
  return isAbsoluteUrl(v) ? new URL(v).host.replace(/^www\./, '') : '';
}

/** Restore a saved form, ignoring unknown keys and wrong types. */
export function parseSaved(raw: string | null): MetaInput {
  const out: MetaInput = { ...EMPTY_INPUT };
  if (!raw) return out;
  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== 'object') return out;
    const target = out as unknown as Record<string, unknown>;
    for (const key of Object.keys(EMPTY_INPUT)) {
      if (typeof data[key] === typeof target[key]) target[key] = data[key];
    }
  } catch {
    /* corrupt storage: start fresh */
  }
  if (!['website', 'article', 'profile'].includes(out.ogType)) out.ogType = 'website';
  if (!['summary', 'summary_large_image'].includes(out.twitterCard)) out.twitterCard = 'summary_large_image';
  return out;
}
