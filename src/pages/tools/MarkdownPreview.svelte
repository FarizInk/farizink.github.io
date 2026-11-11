<script lang="ts">
  import { tick } from 'svelte';
  import {
    Bold,
    Code,
    Download,
    FileText,
    Heading2,
    Italic,
    Link,
    List,
    Quote,
    RotateCcw
  } from '@lucide/svelte';
  import hljs from 'highlight.js/lib/core';
  import bash from 'highlight.js/lib/languages/bash';
  import css from 'highlight.js/lib/languages/css';
  import javascript from 'highlight.js/lib/languages/javascript';
  import json from 'highlight.js/lib/languages/json';
  import php from 'highlight.js/lib/languages/php';
  import python from 'highlight.js/lib/languages/python';
  import sql from 'highlight.js/lib/languages/sql';
  import typescript from 'highlight.js/lib/languages/typescript';
  import xml from 'highlight.js/lib/languages/xml';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, IconButton, Segmented, Switch, Textarea } from '$lib/components/ds';
  import {
    firstHeading,
    formatSelection,
    renderMarkdown,
    toHtmlDocument,
    wordStats,
    type FormatKind,
    type Highlighter
  } from '$lib/tools/markdown';

  // Core + a handful of languages keeps highlight.js small; token colors come from the
  // scoped styles below (DS tokens), so no highlight.js theme stylesheet is imported.
  for (const [name, lang] of Object.entries({ bash, css, javascript, json, php, python, sql, typescript, xml })) {
    hljs.registerLanguage(name, lang);
  }
  const highlight: Highlighter = (code, lang) =>
    hljs.getLanguage(lang) ? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value : null;

  const SAMPLE = [
    '# Markdown Preview',
    '',
    'Write **GitHub Flavored Markdown** on the left and see it rendered here. Raw HTML is',
    'sanitized, so scripts and `javascript:` links never run.',
    '',
    '## Text',
    '',
    'You can write **bold**, *italic*, ***both***, ~~strikethrough~~ and `inline code`.',
    'Links like [fariz.dev](https://fariz.dev) open in a new tab; bare URLs such as',
    'https://github.com are linked automatically.',
    '',
    '## Lists',
    '',
    '1. First step',
    '2. Second step',
    '   - a nested point',
    '   - another one',
    '3. Third step',
    '',
    '- [x] Write the draft',
    '- [ ] Proofread it',
    '',
    '> Blockquotes are handy for notes and quotes.',
    '> They can span several lines.',
    '',
    '## Code',
    '',
    '```ts',
    'function fibonacci(n: number): number {',
    '  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);',
    '}',
    '',
    'console.log(fibonacci(10)); // 55',
    '```',
    '',
    '## Table',
    '',
    '| Feature       | Syntax         | Aligned right |',
    '| :------------ | :------------- | ------------: |',
    '| Bold          | `**text**`     |             1 |',
    '| Strikethrough | `~~text~~`     |             2 |',
    '| Task          | `- [ ] item`   |             3 |',
    '',
    '---',
    '',
    'Your draft is saved in this browser as you type.',
    ''
  ].join('\n');

  const STORAGE_KEY = 'tools.markdownPreview.draft';
  const EDITOR_ID = 'markdown-editor';
  /** Inputs longer than this re-render after typing pauses instead of on every keystroke. */
  const DEBOUNCE_FROM = 20_000;
  const VIEWS = [
    { value: 'write', label: 'Write' },
    { value: 'preview', label: 'Preview' }
  ];

  function loadDraft(): string {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return saved;
    } catch {
      /* storage blocked: start from the sample */
    }
    return SAMPLE;
  }

  const initialDraft = loadDraft();
  let markdown = $state(initialDraft);
  let breaks = $state(false);
  let view = $state('write');

  // Large documents: render the last value typing paused on.
  let settled = $state(initialDraft);
  $effect(() => {
    const value = markdown;
    if (value.length <= DEBOUNCE_FROM) {
      settled = value;
      return;
    }
    const timer = setTimeout(() => (settled = value), 250);
    return () => clearTimeout(timer);
  });
  const source = $derived(markdown.length <= DEBOUNCE_FROM ? markdown : settled);

  // Sanitized by renderMarkdown (DOMPurify + URL allow-list) — the only thing passed to {@html}.
  const html = $derived(renderMarkdown(source, { breaks, highlight }));
  const stats = $derived(wordStats(markdown));
  const title = $derived(firstHeading(markdown) ?? 'Document');

  // Persist the draft (debounced). The untouched sample isn't stored.
  $effect(() => {
    const value = markdown;
    const timer = setTimeout(() => {
      try {
        if (value === SAMPLE) localStorage.removeItem(STORAGE_KEY);
        else localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage full or blocked: the draft just isn't kept */
      }
    }, 400);
    return () => clearTimeout(timer);
  });

  const TOOLS: { kind: FormatKind; label: string; icon: typeof Bold }[] = [
    { kind: 'bold', label: 'Bold (Ctrl+B)', icon: Bold },
    { kind: 'italic', label: 'Italic (Ctrl+I)', icon: Italic },
    { kind: 'code', label: 'Code', icon: Code },
    { kind: 'link', label: 'Link (Ctrl+K)', icon: Link },
    { kind: 'heading', label: 'Heading', icon: Heading2 },
    { kind: 'list', label: 'Bulleted list', icon: List },
    { kind: 'quote', label: 'Quote', icon: Quote }
  ];
  const SHORTCUTS: Record<string, FormatKind> = { b: 'bold', i: 'italic', k: 'link' };

  async function applyFormat(kind: FormatKind) {
    const ta = document.getElementById(EDITOR_ID) as HTMLTextAreaElement | null;
    if (!ta) return;
    const edit = formatSelection(ta.value, ta.selectionStart, ta.selectionEnd, kind);
    ta.focus();
    ta.setSelectionRange(edit.from, edit.to);
    // insertText keeps the browser's undo history; fall back to a plain value update.
    let inserted = false;
    try {
      inserted = document.execCommand('insertText', false, edit.insert);
    } catch {
      inserted = false;
    }
    if (!inserted) {
      markdown = ta.value.slice(0, edit.from) + edit.insert + ta.value.slice(edit.to);
      await tick();
    }
    ta.setSelectionRange(edit.selStart, edit.selEnd);
  }

  function onEditorKeydown(e: KeyboardEvent) {
    if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
    const kind = SHORTCUTS[e.key.toLowerCase()];
    if (!kind) return;
    e.preventDefault();
    e.stopPropagation(); // Ctrl+K would otherwise open the command palette
    void applyFormat(kind);
  }

  function fileBase(): string {
    const slug = title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, '-')
      .slice(0, 60);
    return slug || 'document';
  }

  function download(content: string, type: string, ext: string) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileBase()}.${ext}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
</script>

<ToolLayout
  title="Markdown Preview"
  description="Write GitHub Flavored Markdown — tables, task lists, strikethrough, code highlighting — with a live, sanitized preview. Export as Markdown or a standalone HTML page."
  icon={FileText}
  color="warning"
>
  <section class="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg bg-card p-6" aria-label="Options">
    <div class="w-full sm:w-64 lg:hidden">
      <Segmented label="Show" options={VIEWS} bind:value={view} />
    </div>
    <Switch label="Line breaks as <br>" description="Single newlines break the line" bind:checked={breaks} />
    <div class="flex gap-2 sm:ml-auto">
      <Button variant="secondary" size="sm" onclick={() => (markdown = SAMPLE)} disabled={markdown === SAMPLE}>
        {#snippet icon()}<RotateCcw class="size-4" />{/snippet}
        Reset to sample
      </Button>
      <Button variant="ghost" size="sm" onclick={() => (markdown = '')} disabled={markdown === ''}>Clear</Button>
    </div>
  </section>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <section
      class="{view === 'write' ? 'flex' : 'hidden'} min-w-0 flex-col gap-4 rounded-lg bg-card p-6 lg:flex"
      aria-label="Editor"
    >
      <div class="flex flex-wrap gap-2" role="group" aria-label="Formatting">
        {#each TOOLS as tool (tool.kind)}
          <IconButton label={tool.label} onclick={() => applyFormat(tool.kind)}>
            <tool.icon />
          </IconButton>
        {/each}
      </div>
      <Textarea
        id={EDITOR_ID}
        label="Markdown"
        mono
        rows={22}
        bind:value={markdown}
        onkeydown={onEditorKeydown}
        placeholder="# Start writing…"
        spellcheck={false}
      />
      <p class="text-label m-0 font-mono text-ink-muted">
        {stats.words.toLocaleString()} words · {stats.characters.toLocaleString()} characters · {stats.readingMinutes} min read
      </p>
    </section>

    <section
      class="{view === 'preview' ? 'flex' : 'hidden'} min-w-0 flex-col gap-4 rounded-lg bg-card p-6 lg:flex"
      aria-labelledby="md-preview-heading"
    >
      <h2 id="md-preview-heading" class="text-label m-0 font-mono text-ink-muted">Preview</h2>
      {#if html}
        <div class="md-preview prose min-w-0 text-ink lg:max-h-[640px] lg:overflow-y-auto">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- `html` comes from renderMarkdown(), sanitized by DOMPurify with a URL allow-list -->
          {@html html}
        </div>
      {:else}
        <EmptyState title="Nothing to preview" text="Type Markdown in the editor, or reset to the sample to see what's supported." />
      {/if}
    </section>
  </div>

  <section class="flex flex-wrap items-center gap-3 rounded-lg bg-card p-6" aria-label="Export">
    <CopyChip value={markdown}>Copy Markdown</CopyChip>
    <CopyChip value={html}>Copy HTML</CopyChip>
    <Button
      variant="secondary"
      onclick={() => download(markdown, 'text/markdown;charset=utf-8', 'md')}
      disabled={markdown === ''}
    >
      {#snippet icon()}<Download class="size-4" />{/snippet}
      Download .md
    </Button>
    <Button
      variant="secondary"
      onclick={() => download(toHtmlDocument(html, title), 'text/html;charset=utf-8', 'html')}
      disabled={html === ''}
    >
      {#snippet icon()}<Download class="size-4" />{/snippet}
      Download .html
    </Button>
  </section>
</ToolLayout>

<style>
  /* Additions to the shared `.prose` styles for GFM output. Flat: cells are separated by
     colour steps and spacing, not borders. Wide tables and code scroll inside the preview. */
  .md-preview > :global(:first-child) {
    margin-top: 0;
  }
  .md-preview :global(table) {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    margin: 1em 0;
    border-collapse: separate;
    border-spacing: 2px;
    overflow-wrap: normal;
  }
  .md-preview :global(th),
  .md-preview :global(td) {
    padding: 0.5rem 0.75rem;
    background: var(--bg-control);
    text-align: left;
    vertical-align: top;
  }
  .md-preview :global(th) {
    background: var(--bg-control-hover);
    font-weight: 600;
  }
  .md-preview :global(th[align='center']),
  .md-preview :global(td[align='center']) {
    text-align: center;
  }
  .md-preview :global(th[align='right']),
  .md-preview :global(td[align='right']) {
    text-align: right;
  }
  .md-preview :global(pre) {
    max-width: 100%;
    overflow-wrap: normal;
  }
  .md-preview :global(del) {
    color: var(--ink-muted);
  }
  .md-preview :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }
  .md-preview :global(li:has(> input[type='checkbox'])) {
    list-style: none;
  }
  .md-preview :global(ul:has(> li > input[type='checkbox'])) {
    padding-left: 0.25em;
  }
  .md-preview :global(input[type='checkbox']) {
    appearance: none;
    display: inline-grid;
    place-items: center;
    width: 18px;
    height: 18px;
    margin: 0 0.5em 0 0;
    vertical-align: -3px;
    border-radius: 5px;
    background: var(--bg-control);
  }
  .md-preview :global(input[type='checkbox']:checked) {
    background: var(--accent);
  }
  .md-preview :global(input[type='checkbox']:checked::after) {
    content: '';
    width: 9px;
    height: 5px;
    margin-top: -2px;
    border-left: 2px solid var(--ink-on-accent);
    border-bottom: 2px solid var(--ink-on-accent);
    transform: rotate(-45deg);
  }

  /* Code blocks sit on tile-void (dark in both themes), so tokens use on-dark tile colours. */
  .md-preview :global(.hljs-keyword),
  .md-preview :global(.hljs-built_in),
  .md-preview :global(.hljs-selector-tag),
  .md-preview :global(.hljs-name),
  .md-preview :global(.hljs-meta) {
    color: var(--tile-lilac);
  }
  .md-preview :global(.hljs-string),
  .md-preview :global(.hljs-attr),
  .md-preview :global(.hljs-regexp),
  .md-preview :global(.hljs-symbol) {
    color: var(--tile-lime);
  }
  .md-preview :global(.hljs-number),
  .md-preview :global(.hljs-literal),
  .md-preview :global(.hljs-title),
  .md-preview :global(.hljs-type) {
    color: var(--ink-on-dark);
    font-weight: 600;
  }
  .md-preview :global(.hljs-comment),
  .md-preview :global(.hljs-quote) {
    color: var(--ink-on-dark-muted);
    font-style: italic;
  }
</style>
