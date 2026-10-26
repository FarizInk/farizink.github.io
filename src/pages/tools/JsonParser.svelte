<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import JsonTree, { type JsonValue } from '../../components/JsonTree.svelte';
  import {
    FileJson,
    Copy,
    Trash2,
    Check,
    AlertCircle,
    Sparkles,
    Code,
    Wand2,
    History,
    ChevronDown,
    Eye,
    FileCode2,
    ChevronsDownUp,
    ChevronsUpDown
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import hljs from 'highlight.js/lib/core';
  import jsonLang from 'highlight.js/lib/languages/json';
  // Token colors come from the scoped style block below (Fariz DS tokens),
  // so no highlight.js theme stylesheet is imported.

  hljs.registerLanguage('json', jsonLang);

  let input = $state('');
  let error = $state('');

  // Highlighted textarea overlay DOM handles (bind:this targets).
  let preEl = $state<HTMLPreElement | null>(null);
  let taEl = $state<HTMLTextAreaElement | null>(null);

  // In-memory history stack. Pushed only on actions (Format/Minify/Sort/Load Sample),
  // not on manual textarea edits. Cleared on page refresh and on Clear All.
  interface HistoryEntry {
    id: number; // monotonically increasing counter (no Date.now)
    label: string; // 'Format' | 'Minify' | 'Sort Keys' | 'Load Sample'
    content: string; // snapshot of input BEFORE the action
    seq: number; // display order
  }
  let history = $state<HistoryEntry[]>([]);
  let historySeq = 0;
  const HISTORY_CAP = 20;

  function pushHistory(label: string) {
    historySeq += 1;
    history = [
      { id: historySeq, label, content: input, seq: historySeq },
      ...history.slice(0, HISTORY_CAP - 1)
    ];
  }

  function formatJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to format';
        return;
      }
      const parsed = JSON.parse(input);
      pushHistory('Format');
      input = JSON.stringify(parsed, null, 2);
      error = '';
      toast.success('JSON formatted successfully');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function minifyJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to minify';
        return;
      }
      const parsed = JSON.parse(input);
      pushHistory('Minify');
      input = JSON.stringify(parsed);
      error = '';
      toast.success('JSON minified successfully');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function sortKeysJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to sort';
        return;
      }
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed);
      pushHistory('Sort Keys');
      input = JSON.stringify(sorted, null, 2);
      error = '';
      toast.success('JSON sorted by keys');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function sortObjectKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((result: any, key: string) => {
          result[key] = sortObjectKeys(obj[key]);
          return result;
        }, {});
    }
    return obj;
  }

  function validateJSON() {
    try {
      if (!input.trim()) {
        error = 'Please enter some JSON to validate';
        return;
      }
      JSON.parse(input);
      error = '';
      toast.success('JSON is valid!');
    } catch (e) {
      error = (e as Error).message;
      toast.error('Invalid JSON');
    }
  }

  function copyToClipboard() {
    if (!input) return;
    navigator.clipboard.writeText(input);
    toast.success('Copied to clipboard');
  }

  function clearAll() {
    input = '';
    error = '';
    history = [];
    toast.success('Cleared all content');
  }

  function loadSample() {
    pushHistory('Load Sample');
    input = JSON.stringify(
      {
        name: 'FarizInk',
        role: 'Developer',
        skills: ['Svelte', 'TypeScript', 'Tailwind'],
        active: true,
        projects: {
          total: 42,
          featured: ['Portfolio', 'Tools']
        }
      },
      null,
      2
    );
    error = '';
    toast.success('Sample JSON loaded');
  }

  function loadFromHistory(entry: HistoryEntry) {
    input = entry.content;
    error = '';
    toast.success(`Restored: ${entry.label}`);
  }

  function clearHistory() {
    history = [];
    isHistoryOpen = false;
    toast.success('History cleared');
  }

  // History dropdown open/close — pattern from MultipleSelect.svelte
  let isHistoryOpen = $state(false);
  let triggerElement = $state<HTMLButtonElement | null>(null);
  let dropdownElement = $state<HTMLDivElement | null>(null);

  function toggleHistory() {
    isHistoryOpen = !isHistoryOpen;
  }

  $effect(() => {
    if (isHistoryOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!triggerElement?.contains(target) && !dropdownElement?.contains(target)) {
          isHistoryOpen = false;
        }
      };
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          isHistoryOpen = false;
          triggerElement?.focus();
        }
      };
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  });

  // Get line count
  const inputLines = $derived(input.split('\n').length);

  // Re-highlight on every keystroke. For invalid JSON, hljs tokenizes best-effort
  // (no throw) so it never flashes a false error — the error banner stays driven
  // only by the action buttons.
  // `null` gets an extra class (styling only) because hljs scopes true/false/null alike.
  const highlighted = $derived(
    input
      ? hljs
          .highlight(input, { language: 'json' })
          .value.replaceAll(
            '<span class="hljs-keyword">null</span>',
            '<span class="hljs-keyword hljs-null">null</span>'
          )
      : ''
  );

  function syncScroll() {
    if (preEl && taEl) {
      preEl.scrollTop = taEl.scrollTop;
      preEl.scrollLeft = taEl.scrollLeft;
    }
  }

  // View mode: 'text' (editable textarea) or 'tree' (collapsible render).
  type ViewMode = 'text' | 'tree';
  let viewMode = $state<ViewMode>('text');

  // Broadcast signals for the tree's collapse-all / expand-all buttons.
  let collapseSignal = $state(0);
  let expandSignal = $state(0);

  // Parse input for tree rendering. Derived so it recomputes live as the user
  // edits in text mode (and when an action modifies input in-place).
  const parsed = $derived.by(() => {
    if (!input.trim()) return null;
    try {
      return JSON.parse(input) as JsonValue;
    } catch {
      return null; // invalid JSON → tree shows a message instead of rendering
    }
  });
  const treeError = $derived(!!input.trim() && parsed === null);

  function setViewMode(mode: ViewMode) {
    viewMode = mode;
  }

  function collapseAll() {
    collapseSignal += 1;
  }
  function expandAll() {
    expandSignal += 1;
  }
</script>

<ToolLayout
  title="JSON Parser"
  description="Parse, validate, format, and minify JSON data with syntax highlighting and error detection."
  icon={FileJson}
  color="warning"
>
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button onclick={loadSample} class="btn btn-secondary">
      <Wand2 class="w-4 h-4" />
      Load sample
    </button>
    <button onclick={clearAll} class="btn btn-ghost">
      <Trash2 class="w-4 h-4" />
      Clear
    </button>
  </div>

  <!-- Main Content — single in-place editor -->
  <div class="tool-card">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <h3 class="text-title text-ink">JSON editor</h3>
          <span class="text-count">({inputLines} lines)</span>
        </div>

        <!-- View mode toggle: Text | Tree -->
        <div class="mode-toggle">
          <button
            onclick={() => setViewMode('text')}
            class="mode-btn inline-flex items-center gap-1.5 {viewMode === 'text' ? 'active' : ''}"
            aria-pressed={viewMode === 'text'}
          >
            <FileCode2 class="w-3.5 h-3.5" />
            Text
          </button>
          <button
            onclick={() => setViewMode('tree')}
            disabled={!input.trim()}
            class="mode-btn inline-flex items-center gap-1.5 disabled:opacity-45 disabled:cursor-not-allowed {viewMode ===
            'tree'
              ? 'active'
              : ''}"
            aria-pressed={viewMode === 'tree'}
          >
            <Eye class="w-3.5 h-3.5" />
            Tree
          </button>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button onclick={formatJSON} disabled={!input} class="btn btn-sm btn-primary">
          <Sparkles class="w-3.5 h-3.5" />
          Format
        </button>
        <button onclick={minifyJSON} disabled={!input} class="btn btn-sm btn-secondary">
          <Code class="w-3.5 h-3.5" />
          Minify
        </button>
        <button onclick={sortKeysJSON} disabled={!input} class="btn btn-sm btn-secondary">
          Sort keys
        </button>
        <button onclick={validateJSON} disabled={!input} class="btn btn-sm btn-secondary">
          Validate
        </button>
        <button onclick={copyToClipboard} disabled={!input} class="btn btn-sm btn-secondary">
          <Copy class="w-3.5 h-3.5" />
          Copy
        </button>

        <!-- History dropdown -->
        <div class="relative">
          <button
            bind:this={triggerElement}
            onclick={toggleHistory}
            disabled={history.length === 0}
            aria-expanded={isHistoryOpen}
            aria-haspopup="true"
            class="btn btn-sm btn-secondary"
          >
            <History class="w-3.5 h-3.5" />
            History
            <ChevronDown
              class="w-3.5 h-3.5 transition-transform duration-150 {isHistoryOpen
                ? 'rotate-180'
                : ''}"
            />
          </button>

          {#if isHistoryOpen}
            <div
              bind:this={dropdownElement}
              class="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto z-50
                     bg-raised rounded-md shadow-pop p-1.5 custom-scrollbar"
            >
              <div class="flex items-center justify-between px-3 py-2">
                <span class="text-label text-ink-muted">History</span>
                <button
                  onclick={clearHistory}
                  class="text-body-sm text-ink-muted hover:text-ink transition-colors"
                >
                  Clear
                </button>
              </div>

              {#if history.length === 0}
                <p class="px-3 py-4 text-body-sm text-ink-muted text-center">No history yet</p>
              {:else}
                {#each history as entry (entry.id)}
                  <button
                    onclick={() => {
                      loadFromHistory(entry);
                      isHistoryOpen = false;
                    }}
                    class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left
                           rounded-sm hover:bg-control transition-colors"
                  >
                    <span class="flex items-center gap-2 truncate">
                      <span class="font-mono text-xs text-ink-muted">#{entry.seq}</span>
                      <span class="text-body-sm text-ink">{entry.label}</span>
                    </span>
                    <span class="font-mono text-xs text-ink-muted truncate max-w-[8rem]">
                      {entry.content.trim() || '…'}
                    </span>
                  </button>
                {/each}
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>

    {#if viewMode === 'text'}
      <!-- Highlighted textarea overlay: transparent editable textarea over a
           highlighted <pre><code>. Both layers share identical metrics so the
           colored tokens line up with the user's text exactly. -->
      <div class="json-editor-overlay relative h-72 sm:h-96 lg:h-[28rem]">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- `highlighted` is the output of hljs.highlight(), which escapes <, >, & when emitting tokens, so it is not raw user input. -->
        <pre
          bind:this={preEl}
          aria-hidden="true"
          class="json-editor-layer json-editor-pre bg-control text-ink"
        ><code class="hljs language-json">{@html highlighted}</code></pre>

        <textarea
          bind:value={input}
          bind:this={taEl}
          onscroll={syncScroll}
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          placeholder="Paste your JSON here..."
          class="json-editor-layer json-editor-ta text-transparent caret-ink"
        ></textarea>
      </div>
    {:else}
      <!-- Tree view — DevTools inspector panel (distinct from the textarea) -->
      <div
        class="json-tree-view h-72 sm:h-96 lg:h-[28rem] overflow-auto rounded-md bg-sunken text-ink"
      >
        {#if treeError}
          <div class="flex items-start gap-3 p-4 h-full" role="alert">
            <AlertCircle class="w-5 h-5 text-negative flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-body-sm text-negative">Invalid JSON: cannot render tree</p>
              <p class="text-body-sm text-ink-muted mt-1">Fix the JSON syntax in Text mode first.</p>
            </div>
          </div>
        {:else if parsed === null}
          <div class="flex flex-col items-center justify-center h-full text-center p-6">
            <FileJson class="w-12 h-12 text-ink-muted mb-3" />
            <p class="text-body-sm text-ink-muted">
              Switch to <span class="font-semibold text-accent-text">Text</span>
              and paste JSON to explore its structure here.
            </p>
          </div>
        {:else}
          <div
            class="flex items-center justify-end gap-2 py-2 px-3 sticky top-0 bg-sunken z-10"
          >
            <button onclick={collapseAll} class="btn-icon text-xs" aria-label="Collapse all">
              <ChevronsDownUp class="w-3.5 h-3.5" />
              Collapse all
            </button>
            <button onclick={expandAll} class="btn-icon text-xs" aria-label="Expand all">
              <ChevronsUpDown class="w-3.5 h-3.5" />
              Expand all
            </button>
          </div>
          <div class="json-tree-body p-3">
            <JsonTree data={parsed} {collapseSignal} {expandSignal} />
          </div>
        {/if}
      </div>
    {/if}

    {#if error}
      <div class="status-error flex items-start gap-3 p-4 mt-4 rounded-md" role="alert">
        <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div class="flex-1">
          <p class="text-body-sm">Error</p>
          <p class="text-body-sm text-ink mt-1 font-mono break-words">{error}</p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Validation</h3>
      <p class="feature-description">
        Instantly validates your JSON and provides helpful error messages for invalid syntax.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Code class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Formatting</h3>
      <p class="feature-description">
        Beautify minified JSON with proper indentation or minify it for production use.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Sparkles class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Privacy</h3>
      <p class="feature-description">
        All processing happens in your browser. No data is sent to any server.
      </p>
    </div>
  </div>
</ToolLayout>

<style>
  /* Highlighted textarea overlay — the two layers must share identical metrics so
     the colored tokens line up character-for-character with the transparent textarea text.
     Surface/text colors come from the bg-sunken / text-ink utilities on the markup. */
  .json-editor-layer {
    position: absolute;
    inset: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 20px; /* pinned for both <pre> and <textarea> */
    font-weight: 400;
    padding: 1rem;
    white-space: pre; /* no wrap on both — horizontal scroll */
    tab-size: 2;
    letter-spacing: normal;
    box-sizing: border-box;
    margin: 0;
    border-radius: var(--radius-md);
  }
  .json-editor-pre {
    pointer-events: none; /* clicks/selection reach the textarea */
    z-index: 0;
    overflow: hidden; /* textarea scrolls; <pre> mirrors via JS */
  }
  /* hljs core ships `pre code.hljs { display:block; padding:1em }`-style rules in its
     themes, which would double-pad and shift tokens out of alignment with the textarea.
     Neutralise with high-specificity scoped selectors. */
  .json-editor-pre :global(code.hljs) {
    font-family: inherit;
    background: transparent !important;
    padding: 0 !important;
    display: inline;
    color: inherit;
    white-space: pre;
  }

  /* Token colors (Fariz DS tokens; switch with the theme automatically).
     Weights stay at 400/500 — both shipped by IBM Plex Mono with identical advance
     widths — so highlighted glyphs never drift from the textarea text. */
  .json-editor-pre :global(.hljs-attr) {
    color: var(--accent-text); /* keys */
  }
  .json-editor-pre :global(.hljs-string) {
    color: var(--live); /* strings */
  }
  .json-editor-pre :global(.hljs-number),
  .json-editor-pre :global(.hljs-literal) {
    color: var(--ink); /* numbers, true/false */
    font-weight: 500;
  }
  .json-editor-pre :global(.hljs-null) {
    color: var(--ink-muted); /* null */
    font-weight: 400;
  }
  .json-editor-pre :global(.hljs-punctuation),
  .json-editor-pre :global(.hljs-comment) {
    color: var(--ink-muted); /* punctuation, comments */
  }

  .json-editor-ta {
    background: transparent; /* show highlighted layer behind */
    border: 0; /* flat: no border on either layer, so glyphs stay aligned */
    z-index: 1;
    resize: none;
    outline: none;
  }
  .json-editor-ta::placeholder {
    color: var(--ink-muted);
  }
  .json-editor-ta:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
</style>
