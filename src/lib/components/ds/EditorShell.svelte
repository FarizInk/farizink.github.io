<script lang="ts" module>
  // Toolbar definition: [name, label | null, svg paths | null]. Names match Tiptap's isActive() / commands.
  export const TOOL_GROUPS: [string, string | null, string[] | null][][] = [
    [['bold', 'B', null], ['italic', null, ['M10 4h8', 'M6 20h8', 'M14 4l-4 16']], ['strike', null, ['M5 12h14', 'M16 6a4 3 0 0 0-8 1c0 4 8 3 8 7a4 3 0 0 1-8 1']], ['code', null, ['M8 8l-4 4 4 4', 'M16 8l4 4-4 4']], ['highlight', null, ['M4 20h8', 'M14 4l6 6-9 9H5v-6z']]],
    [['h1', 'H1', null], ['h2', 'H2', null], ['h3', 'H3', null]],
    [['bulletList', null, ['M9 6h11', 'M9 12h11', 'M9 18h11', 'M4 6h.01', 'M4 12h.01', 'M4 18h.01']], ['orderedList', null, ['M10 6h10', 'M10 12h10', 'M10 18h10', 'M4 5h1v4', 'M4 15h2l-2 3h2']], ['taskList', null, ['M4 6l2 2 3-3', 'M4 16l2 2 3-3', 'M13 7h7', 'M13 17h7']], ['blockquote', null, ['M7 7h4v6H5V9a2 2 0 0 1 2-2z', 'M15 7h4v6h-6V9a2 2 0 0 1 2-2z']], ['codeBlock', null, ['M4 5h16v14H4z', 'M9 10l-2 2 2 2', 'M15 10l2 2-2 2']]],
    [['link', null, ['M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1', 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1']], ['image', null, ['M4 5h16v14H4z', 'M4 16l5-5 4 4 3-3 4 4', 'M15 9h.01']], ['hr', null, ['M4 12h16']]],
    [['undo', null, ['M9 14L4 9l5-5', 'M4 9h11a5 5 0 0 1 0 10h-3']], ['redo', null, ['M15 14l5-5-5-5', 'M20 9H9a5 5 0 0 0 0 10h3']]]
  ];
  const LABELS: Record<string, string> = { bold: 'Bold', italic: 'Italic', strike: 'Strikethrough', code: 'Inline code', highlight: 'Highlight', h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3', bulletList: 'Bullet list', orderedList: 'Numbered list', taskList: 'Task list', blockquote: 'Quote', codeBlock: 'Code block', link: 'Link', image: 'Image', hr: 'Divider', undo: 'Undo', redo: 'Redo' };
  export const toolLabel = (n: string) => LABELS[n] ?? n;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Editor } from '@tiptap/core';

  interface Props {
    /** A Tiptap Editor instance (v2 or v3). The toolbar reads isActive() and runs commands on it. */
    editor?: Editor | null;
    /** Right side of the toolbar ("Saved · 128 words"). */
    meta?: string;
    /** Called for link/image so the page can ask for a URL (e.g. with Modal). */
    onrequest?: (kind: 'link' | 'image') => void;
    /** Toolbar names to show (default: all). Hide the ones whose extension isn't installed. */
    tools?: string[];
    /** Disables every toolbar button. */
    disabled?: boolean;
    /** The element Tiptap mounts into (give it class "fz-prose"). */
    children: Snippet;
  }
  let { editor = null, meta, onrequest, tools, disabled = false, children }: Props = $props();
  const groups = $derived(
    tools ? TOOL_GROUPS.map((g) => g.filter(([n]) => tools.includes(n))).filter((g) => g.length) : TOOL_GROUPS
  );

  // Re-read active marks on every transaction.
  let tick = $state(0);
  $effect(() => {
    if (!editor) return;
    const bump = () => tick++;
    editor.on('transaction', bump);
    return () => { editor?.off('transaction', bump); };
  });

  function isActive(n: string): boolean {
    void tick;
    if (!editor) return false;
    if (n === 'h1' || n === 'h2' || n === 'h3') return editor.isActive('heading', { level: Number(n[1]) });
    if (['undo', 'redo', 'image', 'hr'].includes(n)) return false;
    return editor.isActive(n);
  }

  function run(n: string) {
    if (!editor) return;
    // Chain typed loosely so the shell works whichever extensions are installed.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = editor.chain().focus() as any;
    const map: Record<string, () => unknown> = {
      bold: () => c.toggleBold().run(),
      italic: () => c.toggleItalic().run(),
      strike: () => c.toggleStrike().run(),
      code: () => c.toggleCode().run(),
      highlight: () => c.toggleHighlight?.().run(),
      h1: () => c.toggleHeading({ level: 1 }).run(),
      h2: () => c.toggleHeading({ level: 2 }).run(),
      h3: () => c.toggleHeading({ level: 3 }).run(),
      bulletList: () => c.toggleBulletList().run(),
      orderedList: () => c.toggleOrderedList().run(),
      taskList: () => c.toggleTaskList?.().run(),
      blockquote: () => c.toggleBlockquote().run(),
      codeBlock: () => c.toggleCodeBlock().run(),
      hr: () => c.setHorizontalRule().run(),
      undo: () => c.undo().run(),
      redo: () => c.redo().run(),
      link: () => onrequest?.('link'),
      image: () => onrequest?.('image')
    };
    map[n]?.();
  }
</script>

<div class="fz-editor">
  <div class="fz-toolbar" role="toolbar" aria-label="Formatting">
    {#each groups as group, gi (gi)}
      <div class="fz-tool-group">
        {#each group as [name, text, paths] (name)}
          <button type="button" class="fz-tool" aria-pressed={isActive(name)} {disabled} aria-label={toolLabel(name)} title={toolLabel(name)}
            onmousedown={(e) => e.preventDefault()} onclick={() => run(name)}>
            {#if text}{text}{:else if paths}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{#each paths as d (d)}<path {d} />{/each}</svg>{/if}
          </button>
        {/each}
      </div>
    {/each}
    {#if meta}<span class="fz-editor-meta">{meta}</span>{/if}
  </div>
  {@render children()}
</div>
