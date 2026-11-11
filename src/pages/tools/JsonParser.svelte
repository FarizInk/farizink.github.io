<script lang="ts">
  import { tick } from 'svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import JsonTree, { type JsonValue } from '../../components/JsonTree.svelte';
  import { Button, CopyChip, EmptyState, Segmented } from '$lib/components/ds';
  import {
    formatJson,
    minifyJson,
    sortKeysJson,
    validateJson,
    findUnsafeNumbers,
    escapeJsonString,
    unescapeJsonString,
    JsonSyntaxError,
    type JsonIndent
  } from '$lib/tools/json';
  import {
    FileJson,
    Trash2,
    AlertCircle,
    CircleCheck,
    TriangleAlert,
    Sparkles,
    Code,
    Wand2,
    History,
    ChevronDown,
    Crosshair,
    ArrowDownAZ,
    Quote,
    RemoveFormatting,
    ChevronsDownUp,
    ChevronsUpDown
  } from '@lucide/svelte';
  import hljs from 'highlight.js/lib/core';
  import jsonLang from 'highlight.js/lib/languages/json';
  // Token colors come from the scoped style block below (Fariz DS tokens),
  // so no highlight.js theme stylesheet is imported.

  hljs.registerLanguage('json', jsonLang);

  /** Debounce for live validation + highlighting. */
  const CHECK_DELAY_MS = 250;
  /** Above this many characters the editor shows plain text (hljs gets slow). */
  const HIGHLIGHT_LIMIT = 200_000;
  const LINE_HEIGHT_PX = 20; // keep in sync with .json-editor-layer

  let input = $state('');
  /** Message from the last action that failed (e.g. Unescape on non-string text). */
  let actionError = $state('');

  // Highlighted textarea overlay DOM handles (bind:this targets).
  let preEl = $state<HTMLPreElement | null>(null);
  let taEl = $state<HTMLTextAreaElement | null>(null);

  // ── Options ────────────────────────────────────────────────────────────────
  // Segmented binds plain strings: '2' | '4' | 'tab'.
  let indentChoice = $state('2');
  const indent = $derived<JsonIndent>(
    indentChoice === 'tab' ? '\t' : indentChoice === '4' ? 4 : 2
  );
  const indentOptions = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
    { value: 'tab', label: 'Tab' }
  ];

  let viewMode = $state('text'); // 'text' | 'tree'
  const viewOptions = [
    { value: 'text', label: 'Text' },
    { value: 'tree', label: 'Tree' }
  ];

  // ── Debounced live check ───────────────────────────────────────────────────
  // `checkedInput` trails `input` by CHECK_DELAY_MS; validation, highlighting and the
  // tree all derive from it, so typing stays cheap. Actions flush it immediately.
  let checkedInput = $state('');
  $effect(() => {
    const value = input;
    if (value === checkedInput) return;
    const timer = setTimeout(() => (checkedInput = value), CHECK_DELAY_MS);
    return () => clearTimeout(timer);
  });
  function flushCheck() {
    checkedInput = input;
  }

  const hasInput = $derived(checkedInput.trim() !== '');
  const validation = $derived(validateJson(checkedInput));
  const unsafeNumbers = $derived(
    hasInput && validation.ok ? findUnsafeNumbers(checkedInput) : []
  );

  // ── Highlighting ───────────────────────────────────────────────────────────
  const tooLargeToHighlight = $derived(input.length > HIGHLIGHT_LIMIT);
  // `null` gets an extra class (styling only) because hljs scopes true/false/null alike.
  const highlighted = $derived(
    checkedInput && checkedInput.length <= HIGHLIGHT_LIMIT
      ? hljs
          .highlight(checkedInput, { language: 'json' })
          .value.replaceAll(
            '<span class="hljs-keyword">null</span>',
            '<span class="hljs-keyword hljs-null">null</span>'
          )
      : ''
  );
  // While a keystroke is pending the overlay shows the current text uncolored, so the
  // visible glyphs never lag behind the (transparent) textarea.
  const showHighlight = $derived(!tooLargeToHighlight && checkedInput === input);

  const inputLines = $derived(input === '' ? 0 : input.split('\n').length);

  function syncScroll() {
    if (preEl && taEl) {
      preEl.scrollTop = taEl.scrollTop;
      preEl.scrollLeft = taEl.scrollLeft;
    }
  }

  // ── History ────────────────────────────────────────────────────────────────
  // In-memory stack, pushed only on actions (not manual edits). Cleared on refresh
  // or with "Clear history" — clearing the input keeps it.
  interface HistoryEntry {
    id: number; // monotonically increasing counter
    label: string;
    content: string; // snapshot of input BEFORE the action
  }
  let history = $state<HistoryEntry[]>([]);
  let historySeq = 0;
  const HISTORY_CAP = 20;

  function pushHistory(label: string) {
    historySeq += 1;
    history = [{ id: historySeq, label, content: input }, ...history.slice(0, HISTORY_CAP - 1)];
  }

  function loadFromHistory(entry: HistoryEntry) {
    pushHistory(`Before restoring #${entry.id}`);
    input = entry.content;
    actionError = '';
    flushCheck();
  }

  function clearHistory() {
    history = [];
    isHistoryOpen = false;
    triggerElement?.focus();
  }

  let isHistoryOpen = $state(false);
  let triggerElement = $state<HTMLButtonElement | null>(null);
  let dropdownElement = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!isHistoryOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
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
  });

  // ── Actions ────────────────────────────────────────────────────────────────
  function transform(label: string, fn: (text: string) => string) {
    actionError = '';
    try {
      const out = fn(input);
      if (out === input) return;
      pushHistory(label);
      input = out;
    } catch (e) {
      actionError =
        e instanceof JsonSyntaxError
          ? `${label} needs valid JSON: line ${e.line}, column ${e.column}: ${e.message}`
          : `${label} failed: ${e instanceof Error ? e.message : String(e)}`;
    }
    flushCheck();
  }

  const formatInput = () => transform('Format', text => formatJson(text, indent));
  const minifyInput = () => transform('Minify', minifyJson);
  const sortInput = () => transform('Sort keys', text => sortKeysJson(text, indent));
  const escapeInput = () => transform('Escape', escapeJsonString);
  const unescapeInput = () => transform('Unescape', unescapeJsonString);

  function loadSample() {
    transform('Load sample', () =>
      formatJson(
        '{"name":"FarizInk","role":"Developer","skills":["Svelte","TypeScript","Tailwind"],' +
          '"active":true,"id":12345678901234567890,"rating":4.90,"manager":null,' +
          '"projects":{"total":42,"featured":["Portfolio","Tools"]}}',
        indent
      )
    );
  }

  function clearInput() {
    if (input) pushHistory('Clear input');
    input = '';
    actionError = '';
    flushCheck();
    taEl?.focus();
  }

  async function goToError() {
    flushCheck();
    if (validation.ok) return;
    const { position, line } = validation;
    viewMode = 'text';
    await tick();
    if (!taEl) return;
    taEl.focus();
    taEl.setSelectionRange(position, Math.min(position + 1, input.length));
    taEl.scrollTop = Math.max(0, (line - 1) * LINE_HEIGHT_PX - taEl.clientHeight / 2);
    syncScroll();
  }

  // ── Tree view ──────────────────────────────────────────────────────────────
  let collapseSignal = $state(0);
  let expandSignal = $state(0);

  const parsed = $derived.by<JsonValue | null>(() => {
    if (!hasInput || !validation.ok) return null;
    try {
      return JSON.parse(checkedInput) as JsonValue;
    } catch {
      return null;
    }
  });
</script>

<ToolLayout
  title="JSON Parser"
  description="Parse, validate, format, and minify JSON data with syntax highlighting and error detection."
  icon={FileJson}
  color="warning"
>
  <!-- Toolbar -->
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div class="flex flex-wrap gap-2">
      <Button variant="secondary" onclick={loadSample}>
        {#snippet icon()}<Wand2 class="w-4 h-4" />{/snippet}
        Load sample
      </Button>
      <Button variant="ghost" onclick={clearInput} disabled={!input}>
        {#snippet icon()}<Trash2 class="w-4 h-4" />{/snippet}
        Clear input
      </Button>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-label text-ink-muted" aria-hidden="true">Indent</span>
      <Segmented
        label="Indentation for Format and Sort keys"
        options={indentOptions}
        bind:value={indentChoice}
      />
    </div>
  </div>

  <!-- Main Content — single in-place editor -->
  <div class="tool-card">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <h3 class="text-title text-ink">JSON editor</h3>
          <span class="text-count">({inputLines} lines)</span>
        </div>
        <Segmented label="Editor view" options={viewOptions} bind:value={viewMode} />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button size="sm" onclick={formatInput} disabled={!input}>
          {#snippet icon()}<Sparkles class="w-3.5 h-3.5" />{/snippet}
          Format
        </Button>
        <Button size="sm" variant="secondary" onclick={minifyInput} disabled={!input}>
          {#snippet icon()}<Code class="w-3.5 h-3.5" />{/snippet}
          Minify
        </Button>
        <Button size="sm" variant="secondary" onclick={sortInput} disabled={!input}>
          {#snippet icon()}<ArrowDownAZ class="w-3.5 h-3.5" />{/snippet}
          Sort keys
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onclick={escapeInput}
          disabled={!input}
          title="Wrap the whole input in a JSON string literal (quotes and backslashes escaped)"
        >
          {#snippet icon()}<Quote class="w-3.5 h-3.5" />{/snippet}
          Escape as string
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onclick={unescapeInput}
          disabled={!input}
          title="Decode a JSON string literal back to its text"
        >
          {#snippet icon()}<RemoveFormatting class="w-3.5 h-3.5" />{/snippet}
          Unescape string
        </Button>

        <!-- History dropdown -->
        <div class="relative">
          <button
            bind:this={triggerElement}
            onclick={() => (isHistoryOpen = !isHistoryOpen)}
            disabled={history.length === 0}
            aria-expanded={isHistoryOpen}
            aria-haspopup="true"
            class="btn btn-sm btn-secondary"
          >
            <History class="w-3.5 h-3.5" />
            History
            <ChevronDown
              class="w-3.5 h-3.5 transition-transform duration-fast {isHistoryOpen
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
                <span class="text-label text-ink-muted">Restore a previous version</span>
                <button
                  onclick={clearHistory}
                  class="text-body-sm text-ink-muted hover:text-ink transition-colors"
                >
                  Clear history
                </button>
              </div>
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
                    <span class="font-mono text-xs text-ink-muted">#{entry.id}</span>
                    <span class="text-body-sm text-ink">{entry.label}</span>
                  </span>
                  <span class="font-mono text-xs text-ink-muted truncate max-w-[8rem]">
                    {entry.content.trim().slice(0, 80) || '(empty)'}
                  </span>
                </button>
              {/each}
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
        <pre
          bind:this={preEl}
          aria-hidden="true"
          class="json-editor-layer json-editor-pre bg-control text-ink"><code
            class="hljs language-json"
            >{#if showHighlight}<!-- Safe: hljs.highlight() escapes <, > and & in the input; only its own <span> tags are markup. --><!-- eslint-disable-next-line svelte/no-at-html-tags --><span
              >{@html highlighted}</span
            >{:else}{input}{/if}</code
          ></pre>

        <textarea
          bind:value={input}
          bind:this={taEl}
          onscroll={syncScroll}
          aria-label="JSON input"
          aria-invalid={hasInput && !validation.ok}
          aria-describedby="json-status"
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
        {#if !hasInput}
          <EmptyState
            title="Nothing to show yet"
            text="Switch to Text and paste JSON to explore its structure here."
          />
        {:else if parsed === null}
          <EmptyState title="Invalid JSON" text="Fix the syntax error to render the tree.">
            {#snippet actions()}
              <Button size="sm" variant="secondary" onclick={goToError}>
                {#snippet icon()}<Crosshair class="w-3.5 h-3.5" />{/snippet}
                Go to error
              </Button>
            {/snippet}
          </EmptyState>
        {:else}
          <div class="flex items-center justify-end gap-2 py-2 px-3 sticky top-0 bg-sunken z-10">
            <Button size="sm" variant="ghost" onclick={() => (collapseSignal += 1)}>
              {#snippet icon()}<ChevronsDownUp class="w-3.5 h-3.5" />{/snippet}
              Collapse all
            </Button>
            <Button size="sm" variant="ghost" onclick={() => (expandSignal += 1)}>
              {#snippet icon()}<ChevronsUpDown class="w-3.5 h-3.5" />{/snippet}
              Expand all
            </Button>
          </div>
          <div class="json-tree-body p-3">
            <JsonTree data={parsed} {collapseSignal} {expandSignal} />
          </div>
        {/if}
      </div>
    {/if}

    <!-- Live status -->
    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div id="json-status" class="flex min-h-11 flex-1 items-center gap-2" aria-live="polite">
        {#if !hasInput}
          <span class="text-body-sm text-ink-muted">Paste or type JSON; it's checked as you type.</span>
        {:else if validation.ok}
          <CircleCheck class="w-4 h-4 flex-shrink-0 text-live" aria-hidden="true" />
          <span class="text-body-sm text-live">Valid JSON</span>
          <span class="text-body-sm text-ink-muted">· {checkedInput.length.toLocaleString()} characters</span>
        {:else}
          <AlertCircle class="w-4 h-4 flex-shrink-0 text-negative" aria-hidden="true" />
          <span class="text-body-sm text-negative">
            Invalid JSON: line {validation.line}, column {validation.column}
          </span>
          <span class="text-body-sm text-ink font-mono break-words min-w-0">{validation.message}</span>
          <Button size="sm" variant="secondary" onclick={goToError}>
            {#snippet icon()}<Crosshair class="w-3.5 h-3.5" />{/snippet}
            Go to error
          </Button>
        {/if}
      </div>
      {#if input}
        <CopyChip value={input}>Copy JSON</CopyChip>
      {/if}
    </div>

    {#if unsafeNumbers.length > 0}
      <div class="status-warning flex items-start gap-3 p-4 mt-4 rounded-md" role="status">
        <TriangleAlert class="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p class="text-body-sm">
          {unsafeNumbers.length}
          {unsafeNumbers.length === 1 ? 'number exceeds' : 'numbers exceed'} JavaScript's safe integer
          range or precision (e.g. <span class="font-mono">{unsafeNumbers[0].raw.slice(0, 40)}</span>)
          — kept exactly as written by Format, Minify and Sort keys. The Tree view shows
          JavaScript's rounded value.
        </p>
      </div>
    {/if}

    {#if tooLargeToHighlight}
      <p class="text-body-sm text-ink-muted mt-3">
        Syntax highlighting is off for input over 200 KB to keep typing fast.
      </p>
    {/if}

    {#if actionError}
      <div class="status-error flex items-start gap-3 p-4 mt-4 rounded-md" role="alert">
        <AlertCircle class="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p class="text-body-sm break-words">{actionError}</p>
      </div>
    {/if}
  </div>
</ToolLayout>

<style>
  /* Highlighted textarea overlay — the two layers must share identical metrics so
     the colored tokens line up character-for-character with the transparent textarea text. */
  .json-editor-layer {
    position: absolute;
    inset: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 20px; /* pinned for both <pre> and <textarea>; LINE_HEIGHT_PX in script */
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
     themes, which would double-pad and shift tokens out of alignment with the textarea. */
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
    border: 0;
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
