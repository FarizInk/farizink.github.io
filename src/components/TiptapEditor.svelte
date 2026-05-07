<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import Placeholder from '@tiptap/extension-placeholder';
  import type { Level } from '@tiptap/extension-heading';
  import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Undo,
    Redo
  } from '@lucide/svelte';

  // Props
  let {
    content = $bindable(''),
    placeholder = 'Type something...',
    disabled = false
  } = $props<{
    content?: string;
    placeholder?: string;
    disabled?: boolean;
  }>();

  let editor = $state<Editor | null>(null);
  let editorElement: HTMLElement;
  let editorContainer: HTMLElement;
  let isResizing = $state(false);
  let startY = $state(0);
  let startHeight = $state(0);

  // External update tracking
  let isExternalUpdate = $state(false);
  let lastContent = $state('');

  // Active formatting states
  let activeFormats = $state({
    bold: false,
    italic: false,
    strike: false,
    code: false,
    heading1: false,
    heading2: false,
    heading3: false,
    bulletList: false,
    orderedList: false,
    blockquote: false,
    link: false
  });

  // Can undo/redo states
  let historyState = $state({
    canUndo: false,
    canRedo: false
  });

  // Update all active states
  function updateActiveStates() {
    if (!editor) return;
    activeFormats = {
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      strike: editor.isActive('strike'),
      code: editor.isActive('code'),
      heading1: editor.isActive('heading', { level: 1 }),
      heading2: editor.isActive('heading', { level: 2 }),
      heading3: editor.isActive('heading', { level: 3 }),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      blockquote: editor.isActive('blockquote'),
      link: editor.isActive('link')
    };
    historyState = {
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo()
    };
  }

  // Button base class helper
  const btnBase = 'btn-icon p-2 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border';
  const btnInactive = 'border-transparent hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-600 dark:text-secondary-400';
  const btnActive = 'bg-gradient-to-r from-warning-100 to-amber-100 dark:from-primary-900/40 dark:to-primary-800/30 text-warning-700 dark:text-primary-300 border-warning-200 dark:border-primary-700 shadow-sm';

  // Initialize editor
  onMount(() => {
    const initialContent = content || '';
    lastContent = initialContent;

    editor = new Editor({
      element: editorElement,
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          link: false
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-warning-600 dark:text-primary-400 underline hover:text-warning-800 dark:hover:text-primary-300 transition-colors'
          }
        }),
        Placeholder.configure({ placeholder })
      ],
      content: content || '',
      editable: !disabled,
      editorProps: {
        attributes: {
          class: 'prose prose-sm max-w-none focus:outline-none min-h-[130px] max-h-full overflow-y-auto p-4 text-secondary-800 dark:text-secondary-200'
        }
      },
      onUpdate: () => {
        updateActiveStates();
        if (!isExternalUpdate) {
          content = editor!.getHTML();
          lastContent = content;
        }
        isExternalUpdate = false;
      },
      onSelectionUpdate: () => updateActiveStates(),
      onTransaction: () => updateActiveStates()
    });

    updateActiveStates();
  });

  // Sync external content changes
  $effect(() => {
    if (editor && content !== lastContent) {
      const currentHTML = editor.getHTML();
      if (content !== currentHTML) {
        isExternalUpdate = true;
        editor.commands.setContent(content || '');
        lastContent = content;
        setTimeout(() => (isExternalUpdate = false), 0);
      }
    }
  });

  // Sync editable state
  $effect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  });

  onDestroy(() => {
    editor?.destroy();
  });

  // Formatting commands
  function toggleBold() {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }

  function toggleItalic() {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
  }

  function toggleStrike() {
    if (!editor) return;
    editor.chain().focus().toggleStrike().run();
  }

  function toggleCode() {
    if (!editor) return;
    editor.chain().focus().toggleCode().run();
  }

  function setHeading(level: Level) {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level }).run();
  }

  function toggleBulletList() {
    if (!editor) return;
    editor.chain().focus().toggleBulletList().run();
  }

  function toggleOrderedList() {
    if (!editor) return;
    editor.chain().focus().toggleOrderedList().run();
  }

  function toggleBlockquote() {
    if (!editor) return;
    editor.chain().focus().toggleBlockquote().run();
  }

  function setLink() {
    if (!editor) return;
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }

  function unsetLink() {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }

  // Resize handlers
  function startResize(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    isResizing = true;
    startY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    startHeight = editorContainer.offsetHeight;

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchmove', handleResize, { passive: false });
    document.addEventListener('touchend', stopResize);
  }

  function handleResize(e: MouseEvent | TouchEvent) {
    if (!isResizing) return;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const newHeight = Math.max(130, startHeight + (clientY - startY));
    editorContainer.style.height = `${newHeight}px`;
  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
    document.removeEventListener('touchmove', handleResize);
    document.removeEventListener('touchend', stopResize);
  }
</script>

<div
  class="border border-secondary-200 dark:border-secondary-700 rounded-2xl overflow-hidden bg-white dark:bg-secondary-800 shadow-sm hover:shadow-md transition-shadow"
>
  <!-- Toolbar -->
  <div
    class="rounded-t-2xl border-b border-secondary-200 dark:border-secondary-700 p-2 flex flex-wrap gap-1 bg-secondary-50/50 dark:bg-secondary-900/50 backdrop-blur-sm"
  >
    <!-- History -->
    <button
      type="button"
      onclick={() => editor?.chain().focus().undo().run()}
      disabled={disabled || !historyState.canUndo}
      class="{btnBase} {btnInactive}"
      title="Undo"
      aria-label="Undo"
    >
      <Undo class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={() => editor?.chain().focus().redo().run()}
      disabled={disabled || !historyState.canRedo}
      class="{btnBase} {btnInactive}"
      title="Redo"
      aria-label="Redo"
    >
      <Redo class="w-4 h-4" />
    </button>

    <div class="w-px bg-secondary-200 dark:bg-secondary-700 mx-1"></div>

    <!-- Text Formatting -->
    <button
      type="button"
      onclick={toggleBold}
      {disabled}
      class="{btnBase} {activeFormats.bold ? btnActive : btnInactive}"
      title="Bold"
      aria-label="Bold"
      aria-pressed={activeFormats.bold}
    >
      <Bold class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleItalic}
      {disabled}
      class="{btnBase} {activeFormats.italic ? btnActive : btnInactive}"
      title="Italic"
      aria-label="Italic"
      aria-pressed={activeFormats.italic}
    >
      <Italic class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleStrike}
      {disabled}
      class="{btnBase} {activeFormats.strike ? btnActive : btnInactive}"
      title="Strikethrough"
      aria-label="Strikethrough"
      aria-pressed={activeFormats.strike}
    >
      <Strikethrough class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleCode}
      {disabled}
      class="{btnBase} {activeFormats.code ? btnActive : btnInactive}"
      title="Code"
      aria-label="Code"
      aria-pressed={activeFormats.code}
    >
      <Code class="w-4 h-4" />
    </button>

    <div class="w-px bg-secondary-200 dark:bg-secondary-700 mx-1"></div>

    <!-- Headings -->
    <button
      type="button"
      onclick={() => setHeading(1)}
      {disabled}
      class="{btnBase} {activeFormats.heading1 ? btnActive : btnInactive}"
      title="Heading 1"
      aria-label="Heading 1"
      aria-pressed={activeFormats.heading1}
    >
      <Heading1 class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={() => setHeading(2)}
      {disabled}
      class="{btnBase} {activeFormats.heading2 ? btnActive : btnInactive}"
      title="Heading 2"
      aria-label="Heading 2"
      aria-pressed={activeFormats.heading2}
    >
      <Heading2 class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={() => setHeading(3)}
      {disabled}
      class="{btnBase} {activeFormats.heading3 ? btnActive : btnInactive}"
      title="Heading 3"
      aria-label="Heading 3"
      aria-pressed={activeFormats.heading3}
    >
      <Heading3 class="w-4 h-4" />
    </button>

    <div class="w-px bg-secondary-200 dark:bg-secondary-700 mx-1"></div>

    <!-- Lists & Quote -->
    <button
      type="button"
      onclick={toggleBulletList}
      {disabled}
      class="{btnBase} {activeFormats.bulletList ? btnActive : btnInactive}"
      title="Bullet List"
      aria-label="Bullet List"
      aria-pressed={activeFormats.bulletList}
    >
      <List class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleOrderedList}
      {disabled}
      class="{btnBase} {activeFormats.orderedList ? btnActive : btnInactive}"
      title="Ordered List"
      aria-label="Ordered List"
      aria-pressed={activeFormats.orderedList}
    >
      <ListOrdered class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleBlockquote}
      {disabled}
      class="{btnBase} {activeFormats.blockquote ? btnActive : btnInactive}"
      title="Blockquote"
      aria-label="Blockquote"
      aria-pressed={activeFormats.blockquote}
    >
      <Quote class="w-4 h-4" />
    </button>

    <div class="w-px bg-secondary-200 dark:bg-secondary-700 mx-1"></div>

    <!-- Link -->
    <button
      type="button"
      onclick={activeFormats.link ? unsetLink : setLink}
      {disabled}
      class="{btnBase} {activeFormats.link ? btnActive : btnInactive}"
      title={activeFormats.link ? 'Remove Link' : 'Add Link'}
      aria-label={activeFormats.link ? 'Remove Link' : 'Add Link'}
      aria-pressed={activeFormats.link}
    >
      <LinkIcon class="w-4 h-4" />
    </button>
  </div>

  <!-- Editor Content -->
  <div
    class="relative rounded-b-2xl"
    bind:this={editorContainer}
    style="min-height: 130px; overflow: hidden;"
  >
    <div bind:this={editorElement} class="h-full"></div>

    <!-- Resize Handle -->
    {#if !disabled}
      <button
        type="button"
        aria-label="Drag to resize editor"
        class="absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-gradient-to-r hover:from-warning-400 hover:to-amber-400 dark:hover:from-primary-500 dark:hover:to-primary-400 transition-colors group bg-transparent border-0 p-0"
        onmousedown={startResize}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            startResize(e as unknown as MouseEvent);
          }
        }}
      >
        <div class="absolute inset-x-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-1 bg-secondary-300 dark:bg-secondary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </button>
    {/if}
  </div>
</div>

<style>
  /* TipTap editor content styling */
  :global(.ProseMirror p),
  :global(.ProseMirror li),
  :global(.ProseMirror h1),
  :global(.ProseMirror h2),
  :global(.ProseMirror h3),
  :global(.ProseMirror h4),
  :global(.ProseMirror h5),
  :global(.ProseMirror h6) {
    color: #334155;
  }

  :global(html.dark .ProseMirror p),
  :global(html.dark .ProseMirror li),
  :global(html.dark .ProseMirror h1),
  :global(html.dark .ProseMirror h2),
  :global(html.dark .ProseMirror h3),
  :global(html.dark .ProseMirror h4),
  :global(html.dark .ProseMirror h5),
  :global(html.dark .ProseMirror h6) {
    color: #e2e8f0;
  }

  :global(.ProseMirror code) {
    background-color: #fef3c7;
    color: #92400e;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family: ui-monospace, monospace;
  }

  :global(html.dark .ProseMirror code) {
    background-color: rgba(88, 28, 135, 0.3);
    color: #d8b4fe;
  }

  :global(.ProseMirror pre) {
    background-color: #1e293b;
    color: #f1f5f9;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  :global(html.dark .ProseMirror pre) {
    background-color: #000;
  }

  :global(.ProseMirror pre code) {
    background-color: transparent;
    padding: 0;
    color: #f1f5f9;
  }

  :global(.ProseMirror a) {
    color: #d97706;
    text-decoration: underline;
    transition: color 0.2s;
  }

  :global(html.dark .ProseMirror a) {
    color: #a78bfa;
  }

  :global(.ProseMirror a:hover) {
    color: #b45309;
  }

  :global(html.dark .ProseMirror a:hover) {
    color: #c4b5fd;
  }

  :global(.ProseMirror blockquote) {
    border-left: 4px solid #fbbf24;
    padding-left: 1rem;
    font-style: italic;
    color: #475569;
  }

  :global(html.dark .ProseMirror blockquote) {
    border-left-color: #8b5cf6;
    color: #94a3b8;
  }

  :global(.ProseMirror ul),
  :global(.ProseMirror ol) {
    padding-left: 1.5rem;
  }

  :global(.ProseMirror ul li),
  :global(.ProseMirror ol li) {
    margin-bottom: 0.25rem;
  }

  :global(.ProseMirror ul) {
    list-style-type: disc;
  }

  :global(.ProseMirror ol) {
    list-style-type: decimal;
  }

  :global(.ProseMirror h1) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  :global(.ProseMirror h2) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  :global(.ProseMirror h3) {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  :global(.ProseMirror p:not(:last-child)),
  :global(.ProseMirror ul:not(:last-child)),
  :global(.ProseMirror ol:not(:last-child)) {
    margin-bottom: 0.75rem;
  }

  /* Placeholder */
  :global(.ProseMirror p.is-editor-empty:first-child::before) {
    color: #9ca3af;
    float: left;
    height: 0;
    pointer-events: none;
    content: attr(data-placeholder);
  }

  :global(html.dark .ProseMirror p.is-editor-empty:first-child::before) {
    color: #64748b;
  }

  /* Selection */
  :global(.ProseMirror:focus) {
    outline: none;
  }

  :global(.ProseMirror ::selection) {
    background-color: #fef08a;
  }

  :global(html.dark .ProseMirror ::selection) {
    background-color: rgba(88, 28, 135, 0.5);
  }
</style>
