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
  // Light theme imported globally. The dark palette is applied via scoped
  // overrides below (importing github-dark.css raw would clobber light mode,
  // since both themes share the same `.hljs` selectors).
  import 'highlight.js/styles/github.css';

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
  const highlighted = $derived(
    input ? hljs.highlight(input, { language: 'json' }).value : ''
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
  <!-- Hero / Stats Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <FileJson class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">JSON Parser & Formatter</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Validate, beautify, or minify your JSON data
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          onclick={loadSample}
          class="btn btn-copy"
        >
          <Wand2 class="w-4 h-4" />
          Load Sample
        </button>
        <button
          onclick={clearAll}
          class="btn btn-secondary"
        >
          <Trash2 class="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content — single in-place editor -->
  <div class="tool-card">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-warning-100 dark:bg-primary-900/30 rounded-lg">
            <FileJson class="w-4 h-4 text-warning-600 dark:text-primary-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">JSON Editor</h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">({inputLines} lines)</span>
        </div>

        <!-- View mode toggle: Text | Tree -->
        <div class="mode-toggle inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
          <button
            onclick={() => setViewMode('text')}
            class="mode-btn px-2.5 py-1 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1 {viewMode ===
            'text'
              ? 'bg-yellow-100 dark:bg-purple-900/20 text-yellow-700 dark:text-purple-300 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
            aria-pressed={viewMode === 'text'}
          >
            <FileCode2 class="w-3.5 h-3.5" />
            Text
          </button>
          <button
            onclick={() => setViewMode('tree')}
            disabled={!input.trim()}
            class="mode-btn px-2.5 py-1 rounded-md text-xs font-medium transition-all inline-flex items-center gap-1 {viewMode ===
            'tree'
              ? 'bg-yellow-100 dark:bg-purple-900/20 text-yellow-700 dark:text-purple-300 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}"
            aria-pressed={viewMode === 'tree'}
          >
            <Eye class="w-3.5 h-3.5" />
            Tree
          </button>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          onclick={formatJSON}
          disabled={!input}
          class="btn btn-sm btn-copy"
        >
          <Sparkles class="w-3.5 h-3.5" />
          Format
        </button>
        <button
          onclick={minifyJSON}
          disabled={!input}
          class="btn btn-sm btn-secondary"
        >
          <Code class="w-3.5 h-3.5" />
          Minify
        </button>
        <button
          onclick={sortKeysJSON}
          disabled={!input}
          class="btn btn-sm btn-secondary"
        >
          Sort Keys
        </button>
        <button
          onclick={validateJSON}
          disabled={!input}
          class="btn btn-sm btn-secondary"
        >
          Validate
        </button>
        <button
          onclick={copyToClipboard}
          disabled={!input}
          class="btn btn-sm btn-secondary"
        >
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
              class="w-3.5 h-3.5 transition-transform duration-200 {isHistoryOpen
                ? 'rotate-180'
                : ''}"
            />
          </button>

          {#if isHistoryOpen}
            <div
              bind:this={dropdownElement}
              class="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto z-50
                     bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                     rounded-lg shadow-lg custom-scrollbar"
            >
              <div
                class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <span class="text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >History</span
                >
                <button
                  onclick={clearHistory}
                  class="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>

              {#if history.length === 0}
                <p class="px-3 py-4 text-sm text-gray-400 dark:text-gray-500 text-center">
                  No history yet
                </p>
              {:else}
                {#each history as entry (entry.id)}
                  <button
                    onclick={() => {
                      loadFromHistory(entry);
                      isHistoryOpen = false;
                    }}
                    class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left
                           hover:bg-yellow-50 dark:hover:bg-purple-900/20 transition-colors
                           border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
                  >
                    <span class="flex items-center gap-2 truncate">
                      <span class="text-xs text-gray-400 dark:text-gray-500">#{entry.seq}</span>
                      <span class="text-sm text-gray-700 dark:text-gray-300">{entry.label}</span>
                    </span>
                    <span class="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[8rem]">
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
          class="json-editor-layer json-editor-pre"
        ><code class="hljs language-json">{@html highlighted}</code></pre>

        <textarea
          bind:value={input}
          bind:this={taEl}
          onscroll={syncScroll}
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          placeholder="Paste your JSON here..."
          class="json-editor-layer json-editor-ta text-transparent caret-gray-900 dark:caret-white"
        ></textarea>
      </div>
    {:else}
      <!-- Tree view — DevTools inspector panel (distinct from the textarea) -->
      <div
        class="json-tree-view h-72 sm:h-96 lg:h-[28rem] overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        {#if treeError}
          <div class="flex items-start gap-3 p-4 h-full">
            <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-red-800 dark:text-red-200">Cannot render tree</p>
              <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                Fix the JSON syntax in Text mode first.
              </p>
            </div>
          </div>
        {:else if parsed === null}
          <div class="flex flex-col items-center justify-center h-full text-center p-6">
            <FileJson class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p class="text-gray-400 dark:text-gray-500 text-sm">
              Switch to <span class="font-semibold text-warning-600 dark:text-primary-400">Text</span>
              and paste JSON to explore its structure here.
            </p>
          </div>
        {:else}
          <div
            class="flex items-center justify-end gap-2 py-2 px-3 sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-700/50"
          >
            <button
              onclick={collapseAll}
              class="btn-icon px-2 py-1 text-xs"
              aria-label="Collapse all"
            >
              <ChevronsDownUp class="w-3.5 h-3.5" />
              Collapse all
            </button>
            <button
              onclick={expandAll}
              class="btn-icon px-2 py-1 text-xs"
              aria-label="Expand all"
            >
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
      <div
        class="flex items-start gap-3 p-4 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
      >
        <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div class="flex-1">
          <p class="text-sm font-medium text-red-800 dark:text-red-200">Error</p>
          <p class="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Instantly validates your JSON and provides helpful error messages for invalid syntax.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Code class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formatting</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Beautify minified JSON with proper indentation or minify it for production use.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Sparkles class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        All processing happens in your browser. No data is sent to any server.
      </p>
    </div>
  </div>
</ToolLayout>

<style>
  /* Highlighted textarea overlay — the two layers must share identical metrics so
     the colored tokens line up character-for-character with the transparent textarea text. */
  .json-editor-layer {
    position: absolute;
    inset: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.875rem; /* text-sm */
    line-height: 1.25rem; /* leading-5 = 20px, pinned for both <pre> and <textarea> */
    padding: 1rem; /* p-4 */
    white-space: pre; /* no wrap on both — horizontal scroll */
    tab-size: 2;
    letter-spacing: normal;
    box-sizing: border-box;
    margin: 0;
    border-radius: 0.5rem;
  }
  .json-editor-pre {
    pointer-events: none; /* clicks/selection reach the textarea */
    color: #111827; /* gray-900 default text color (matches textarea) */
    background-color: #ffffff; /* bg-white */
    border: 1px solid #d1d5db; /* gray-300, same width as the textarea border */
    z-index: 0;
    overflow: hidden; /* textarea scrolls; <pre> mirrors via JS */
  }
  :global(.dark) .json-editor-pre {
    color: #ffffff;
    background-color: #1f2937; /* gray-800 */
    border-color: #4b5563; /* gray-600 */
  }
  /* The github theme ships `pre code.hljs { display:block; padding:1em }` which would
     double-pad and shift tokens 16px out of alignment with the textarea. Neutralise it
     with high-specificity scoped selectors so the theme can't win. */
  .json-editor-pre :global(code.hljs) {
    font-family: inherit;
    background: transparent !important;
    padding: 0 !important;
    display: inline;
    color: inherit;
    white-space: pre;
  }

  /* ---- Dark palette (scoped, applied only under .dark) ----
     We deliberately did NOT import github-dark.css (its raw `.hljs` selectors would
     clobber light mode). These scoped rules mirror github-dark's token colors. */
  :global(.dark) .json-editor-pre :global(code.hljs) {
    color: #c9d1d9;
    background: transparent;
  }
  :global(.dark) .json-editor-pre :global(.hljs-comment),
  :global(.dark) .json-editor-pre :global(.hljs-quote) {
    color: #8b949e;
  }
  :global(.dark) .json-editor-pre :global(.hljs-keyword),
  :global(.dark) .json-editor-pre :global(.hljs-selector-tag),
  :global(.dark) .json-editor-pre :global(.hljs-literal),
  :global(.dark) .json-editor-pre :global(.hljs-type) {
    color: #ff7b72;
  }
  :global(.dark) .json-editor-pre :global(.hljs-string),
  :global(.dark) .json-editor-pre :global(.hljs-doctag) {
    color: #a5d6ff;
  }
  :global(.dark) .json-editor-pre :global(.hljs-number),
  :global(.dark) .json-editor-pre :global(.hljs-attr),
  :global(.dark) .json-editor-pre :global(.hljs-symbol) {
    color: #79c0ff;
  }
  :global(.dark) .json-editor-pre :global(.hljs-title),
  :global(.dark) .json-editor-pre :global(.hljs-section),
  :global(.dark) .json-editor-pre :global(.hljs-name) {
    color: #d2a8ff;
  }
  :global(.dark) .json-editor-pre :global(.hljs-attribute) {
    color: #79c0ff;
  }
  :global(.dark) .json-editor-pre :global(.hljs-variable),
  :global(.dark) .json-editor-pre :global(.hljs-template-variable) {
    color: #ffa657;
  }

  .json-editor-ta {
    background: transparent; /* show highlighted layer behind */
    border: 1px solid transparent; /* same width as the <pre> border so glyphs align; the visible border comes from the <pre> */
    z-index: 1;
    resize: none;
    outline: none;
  }
  /* Focus ring on the editable layer (amber light / purple dark, matching .code-editor). */
  .json-editor-ta:focus {
    border-color: #f59e0b; /* warning-500 */
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }
  :global(.dark) .json-editor-ta:focus {
    border-color: #a855f7; /* primary-500 */
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
  }
</style>
