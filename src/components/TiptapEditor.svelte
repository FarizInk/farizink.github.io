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

  // Initialize editor on mount
  onMount(() => {
    editor = new Editor({
      element: editorElement,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3]
          },
          // Exclude default link extension to avoid duplicate
          link: false
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer'
          }
        }),
        Placeholder.configure({
          placeholder: placeholder
        })
      ],
      content: content || '',
      editable: !disabled,
      editorProps: {
        attributes: {
          class:
            'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[130px] overflow-y-auto p-3'
        }
      },
      onUpdate: ({ editor }) => {
        content = editor.getHTML();
      }
    });
  });

  // Update content when prop changes
  $effect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  });

  // Update editable state when disabled changes
  $effect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  });

  // Cleanup on destroy
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  // Toolbar actions
  function setHeading(level: Level) {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }

  function toggleBold() {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  }

  function toggleItalic() {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  }

  function toggleStrike() {
    if (editor) {
      editor.chain().focus().toggleStrike().run();
    }
  }

  function toggleCode() {
    if (editor) {
      editor.chain().focus().toggleCode().run();
    }
  }

  function toggleBulletList() {
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
    }
  }

  function toggleOrderedList() {
    if (editor) {
      editor.chain().focus().toggleOrderedList().run();
    }
  }

  function toggleBlockquote() {
    if (editor) {
      editor.chain().focus().toggleBlockquote().run();
    }
  }

  function setLink() {
    if (editor) {
      const url = window.prompt('Enter URL:');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  }

  function unsetLink() {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  }

  function undo() {
    if (editor) {
      editor.chain().focus().undo().run();
    }
  }

  function redo() {
    if (editor) {
      editor.chain().focus().redo().run();
    }
  }

  // Resize handler
  function startResize(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    isResizing = true;

    if (e instanceof MouseEvent) {
      startY = e.clientY;
    } else {
      startY = e.touches[0].clientY;
    }

    startHeight = editorContainer.offsetHeight;

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchmove', handleResize, { passive: false });
    document.addEventListener('touchend', stopResize);
  }

  function handleResize(e: MouseEvent | TouchEvent) {
    if (!isResizing) return;

    let clientY: number;
    if (e instanceof MouseEvent) {
      clientY = e.clientY;
    } else {
      e.preventDefault(); // Prevent scrolling while resizing
      clientY = e.touches[0].clientY;
    }

    const deltaY = clientY - startY;
    const newHeight = Math.max(130, startHeight + deltaY); // Min 130px
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
  class="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
>
  <!-- Toolbar -->
  <div
    class="border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-700"
  >
    <!-- Undo/Redo -->
    <button
      type="button"
      onclick={undo}
      disabled={disabled || !editor?.can().undo()}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title="Undo"
    >
      <Undo class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={redo}
      disabled={disabled || !editor?.can().redo()}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title="Redo"
    >
      <Redo class="w-4 h-4" />
    </button>

    <!-- Divider -->
    <div class="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

    <!-- Text Formatting -->
    <button
      type="button"
      onclick={toggleBold}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'bold'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Bold"
    >
      <Bold class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleItalic}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'italic'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Italic"
    >
      <Italic class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleStrike}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'strike'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Strikethrough"
    >
      <Strikethrough class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleCode}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'code'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Code"
    >
      <Code class="w-4 h-4" />
    </button>

    <!-- Divider -->
    <div class="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

    <!-- Headings -->
    <button
      type="button"
      onclick={() => setHeading(1)}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'heading',
        { level: 1 }
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Heading 1"
    >
      <Heading1 class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={() => setHeading(2)}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'heading',
        { level: 2 }
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Heading 2"
    >
      <Heading2 class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={() => setHeading(3)}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'heading',
        { level: 3 }
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Heading 3"
    >
      <Heading3 class="w-4 h-4" />
    </button>

    <!-- Divider -->
    <div class="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

    <!-- Lists -->
    <button
      type="button"
      onclick={toggleBulletList}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'bulletList'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Bullet List"
    >
      <List class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleOrderedList}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'orderedList'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Ordered List"
    >
      <ListOrdered class="w-4 h-4" />
    </button>
    <button
      type="button"
      onclick={toggleBlockquote}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'blockquote'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title="Quote"
    >
      <Quote class="w-4 h-4" />
    </button>

    <!-- Divider -->
    <div class="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

    <!-- Link -->
    <button
      type="button"
      onclick={editor?.isActive('link') ? unsetLink : setLink}
      {disabled}
      class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {editor?.isActive(
        'link'
      )
        ? 'bg-blue-200 dark:bg-blue-800'
        : ''}"
      title={editor?.isActive('link') ? 'Remove Link' : 'Add Link'}
    >
      <LinkIcon class="w-4 h-4" />
    </button>
  </div>

  <!-- Editor Content -->
  <div class="prose-wrapper" bind:this={editorContainer}>
    <div bind:this={editorElement}></div>
    <!-- Resize handle indicator -->
    <div
      class="resize-handle"
      onmousedown={startResize}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Drag to resize editor"
    >
      <div class="resize-handle-bar"></div>
    </div>
  </div>
</div>

<style>
  .prose-wrapper {
    position: relative;
  }

  :global(.prose-wrapper .ProseMirror) {
    min-height: 130px;
    overflow-y: auto;
    resize: none;
    padding: 1rem;
    padding-bottom: 1.5rem;
  }

  :global(.prose-wrapper .ProseMirror:focus) {
    outline: none;
  }

  :global(.prose-wrapper .ProseMirror .is-empty::before) {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  :global(.dark .prose-wrapper .ProseMirror .is-empty::before) {
    color: #6b7280;
  }

  :global(.prose-wrapper .ProseMirror h1) {
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
  }

  :global(.prose-wrapper .ProseMirror h2) {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.75em 0;
  }

  :global(.prose-wrapper .ProseMirror h3) {
    font-size: 1.17em;
    font-weight: bold;
    margin: 0.83em 0;
  }

  :global(.prose-wrapper .ProseMirror ul) {
    list-style-type: disc;
    padding-left: 2em;
    margin: 1em 0;
  }

  :global(.prose-wrapper .ProseMirror ol) {
    list-style-type: decimal;
    padding-left: 2em;
    margin: 1em 0;
  }

  :global(.prose-wrapper .ProseMirror blockquote) {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
    color: #666;
  }

  :global(.prose-wrapper .ProseMirror code) {
    background-color: #f1f3f4;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.9em;
  }

  :global(.prose-wrapper .ProseMirror pre) {
    background-color: #f1f3f4;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
  }

  :global(.prose-wrapper .ProseMirror pre code) {
    background-color: transparent;
    padding: 0;
  }

  :global(.dark .prose-wrapper .ProseMirror blockquote) {
    border-left-color: #4b5563;
    color: #9ca3af;
  }

  :global(.dark .prose-wrapper .ProseMirror code) {
    background-color: #374151;
    color: #e5e7eb;
  }

  :global(.dark .prose-wrapper .ProseMirror pre) {
    background-color: #374151;
  }

  :global(.dark .prose-wrapper .ProseMirror pre code) {
    background-color: transparent;
  }

  /* Resize handle styles */
  .resize-handle {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: s-resize;
    opacity: 0.5;
    transition: opacity 0.2s;
    pointer-events: auto;
    z-index: 10;
  }

  .resize-handle:hover {
    opacity: 1;
  }

  .resize-handle-bar {
    width: 64px;
    height: 4px;
    background-color: rgb(209 213 219);
    border-radius: 2px;
    pointer-events: none;
  }

  .dark .resize-handle-bar {
    background-color: rgb(75 85 99);
  }
</style>
