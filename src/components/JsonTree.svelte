<script lang="ts" module>
  // JsonTree — recursive component that renders JSON as a collapsible tree
  // in a compact "formatted JSON" style. Used by the JSON Parser tool's Tree view.
  // Read-only; per-node copy appears on hover.

  // A JSON value that can be rendered by the tree.
  export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };
</script>

<script lang="ts">
  import { ChevronRight, Copy } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  // Self-import replaces the deprecated <svelte:self> in Svelte 5.
  import Self from './JsonTree.svelte';

  interface Props {
    data: JsonValue;
    key?: string | null; // key if this node is an object/array entry
    level?: number; // nesting depth for indentation
    // Broadcast signals bumped by the root toolbar to fold/unfold every node.
    collapseSignal?: number;
    expandSignal?: number;
  }

  let {
    data,
    key = null,
    level = 0,
    collapseSignal = 0,
    expandSignal = 0
  }: Props = $props();

  // Collapse state for this node — only meaningful for objects/arrays.
  let collapsed = $state(false);

  // React to ancestor broadcast: collapse-all sets every container node to collapsed.
  let lastCollapseSignal = 0;
  $effect(() => {
    if (collapseSignal !== lastCollapseSignal) {
      lastCollapseSignal = collapseSignal;
      collapsed = true;
    }
  });
  let lastExpandSignal = 0;
  $effect(() => {
    if (expandSignal !== lastExpandSignal) {
      lastExpandSignal = expandSignal;
      collapsed = false;
    }
  });

  // Determine the kind of value for rendering + coloring.
  function kindOf(value: JsonValue): 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null' {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return typeof value as 'string' | 'number' | 'boolean';
  }

  const kind = $derived(kindOf(data));
  const isContainer = $derived(kind === 'object' || kind === 'array');

  // Narrowed views of the data for safe iteration. Only valid when isContainer.
  const arrayItems = $derived(kind === 'array' ? (data as JsonValue[]) : []);
  const objectEntries = $derived(
    kind === 'object' ? Object.entries(data as { [key: string]: JsonValue }) : []
  );

  // Entry count for the collapsed badge (e.g. {3} / [2]).
  const childCount = $derived(
    isContainer ? (kind === 'array' ? arrayItems.length : objectEntries.length) : 0
  );

  function toggle() {
    collapsed = !collapsed;
  }

  // Value to copy for this node: the whole container serialized, or the scalar as-is.
  const copyValue = $derived(isContainer ? JSON.stringify(data) : String(data));

  function copyNode(e: MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(copyValue);
    toast.success('Copied to clipboard');
  }
</script>

<!-- Each node is a hoverable block; the copy button fades in on group hover. -->
<div class="jt-node group" style="--level: {level}">
  <div class="jt-row">
    {#if key !== null}
      <span class="jt-key">"{key}"</span><span class="jt-colon">: </span>
    {/if}

    {#if isContainer}
      <button
        type="button"
        onclick={toggle}
        class="jt-toggle"
        aria-label={collapsed ? 'Expand' : 'Collapse'}
      >
        <ChevronRight
          class="w-3 h-3 text-gray-400 dark:text-gray-500 transition-transform duration-150 {collapsed
            ? ''
            : 'rotate-90'}"
        />
      </button>

      {#if collapsed}
        <span class="jt-bracket">{kind === 'array' ? '[' : '{'}</span>
        <span class="jt-badge">{childCount}</span>
        <span class="jt-bracket">{kind === 'array' ? ']' : '}'}</span>
      {:else}
        <span class="jt-bracket">{kind === 'array' ? '[' : '{'}</span>
      {/if}
    {:else}
      {#if kind === 'string'}
        <span class="jt-string">"{data}"</span>
      {:else if kind === 'number'}
        <span class="jt-number">{data}</span>
      {:else if kind === 'boolean'}
        <span class="jt-boolean">{data}</span>
      {:else}
        <span class="jt-null">null</span>
      {/if}
    {/if}

    <!-- Per-node copy — fades in on row hover, anchored at the row end. -->
    <button
      type="button"
      onclick={copyNode}
      class="jt-copy opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
      aria-label="Copy value"
      title="Copy value"
    >
      <Copy class="w-3.5 h-3.5" />
    </button>
  </div>

  {#if isContainer && !collapsed}
    <div class="jt-children">
      {#if kind === 'array'}
        {#each arrayItems as item, i (i)}
          <div class="jt-line">
            <Self
              data={item}
              level={level + 1}
              collapseSignal={collapseSignal}
              expandSignal={expandSignal}
            />
            {#if i < arrayItems.length - 1}<span class="jt-comma">,</span>{/if}
          </div>
        {/each}
      {:else}
        {#each objectEntries as [k, v], i (k)}
          <div class="jt-line">
            <Self
              data={v}
              key={k}
              level={level + 1}
              collapseSignal={collapseSignal}
              expandSignal={expandSignal}
            />
            {#if i < objectEntries.length - 1}<span class="jt-comma">,</span>{/if}
          </div>
        {/each}
      {/if}
    </div>
    <div class="jt-row jt-closing">
      <span class="jt-bracket">{kind === 'array' ? ']' : '}'}</span>
    </div>
  {/if}
</div>

<style>
  /* Node wrapper: provides indent guide per nesting level. */
  .jt-node {
    position: relative;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: 0.8125rem;
    line-height: 1.5;
    padding-left: calc(var(--level) * 0.875rem);
  }

  /* Vertical guide line for nested blocks. */
  .jt-children {
    position: relative;
    margin-left: 0.625rem;
    padding-left: 0.625rem;
  }
  .jt-children::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    background-color: rgba(156, 163, 175, 0.3);
  }
  :global(.dark) .jt-children::before {
    background-color: rgba(148, 163, 184, 0.2);
  }

  /* Each logical line (key/value pair or array item). */
  .jt-line {
    display: flex;
    align-items: baseline;
  }

  /* Row: a single line of text (opening, scalar, or closing). */
  .jt-row {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    border-radius: 0.25rem;
    padding-right: 1.75rem; /* room for hover copy button */
    transition: background-color 0.12s ease;
  }
  .jt-row:hover {
    background-color: rgba(156, 163, 175, 0.12);
  }
  :global(.dark) .jt-row:hover {
    background-color: rgba(148, 163, 184, 0.1);
  }

  .jt-closing {
    padding-left: 0; /* closing brace aligns with its own node's indent, not children */
  }

  .jt-key {
    color: #6b7280; /* gray-500 */
  }
  :global(.dark) .jt-key {
    color: #9ca3af; /* gray-400 */
  }
  .jt-colon {
    color: #6b7280;
  }
  .jt-bracket {
    color: #4b5563; /* gray-600 */
    font-weight: 500;
  }
  :global(.dark) .jt-bracket {
    color: #d1d5db; /* gray-300 */
  }

  /* Collapsed badge — a small pill. */
  .jt-badge {
    margin: 0 0.25rem;
    padding: 0.05rem 0.375rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    border-radius: var(--radius-sm, 0.375rem);
    background-color: rgba(156, 163, 175, 0.2);
    color: #6b7280; /* gray-500 */
  }
  :global(.dark) .jt-badge {
    background-color: rgba(148, 163, 184, 0.18);
    color: #9ca3af; /* gray-400 */
  }

  .jt-comma {
    color: #6b7280;
  }

  /* Type coloring — amber accent light / purple accent dark, matching design system. */
  .jt-string {
    color: #16a34a; /* green-600 */
  }
  :global(.dark) .jt-string {
    color: #4ade80; /* green-400 */
  }
  .jt-number {
    color: #d97706; /* warning-600 / amber accent */
  }
  :global(.dark) .jt-number {
    color: #a78bfa; /* primary-400 / purple accent */
  }
  .jt-boolean {
    color: #d97706;
  }
  :global(.dark) .jt-boolean {
    color: #a78bfa;
  }
  .jt-null {
    color: #6b7280;
    font-style: italic;
  }
  :global(.dark) .jt-null {
    color: #9ca3af;
  }

  .jt-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    margin-left: -1rem;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    background: transparent;
    cursor: pointer;
    vertical-align: baseline;
    color: inherit;
    transition: background-color 0.12s ease;
  }
  .jt-toggle:hover {
    background-color: rgba(156, 163, 175, 0.2);
  }
  :global(.dark) .jt-toggle:hover {
    background-color: rgba(148, 163, 184, 0.2);
  }

  /* Hover copy button — anchored to the right edge of the row. */
  .jt-copy {
    position: absolute;
    right: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 0.375rem;
    color: #6b7280; /* gray-500 */
    background: transparent;
    border: none;
    cursor: pointer;
    transition: opacity 0.12s ease, background-color 0.12s ease, color 0.12s ease;
  }
  .jt-copy:hover {
    color: #b45309; /* warning-700 */
    background-color: rgba(251, 191, 36, 0.15);
  }
  :global(.dark) .jt-copy {
    color: #9ca3af; /* gray-400 */
  }
  :global(.dark) .jt-copy:hover {
    color: #c4b5fd; /* primary-300 */
    background-color: rgba(139, 92, 246, 0.18);
  }
</style>
