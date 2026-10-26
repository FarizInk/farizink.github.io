<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  import Placeholder from '@tiptap/extension-placeholder';
  import { Button, EditorShell, Modal, TextField } from '$lib/components/ds';

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
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder })
      ],
      content: content || '',
      editable: !disabled,
      editorProps: {
        attributes: {
          class: 'fz-prose h-full overflow-y-auto max-sm:p-4'
        }
      },
      onUpdate: () => {
        if (!isExternalUpdate) {
          content = editor!.getHTML();
          lastContent = content;
        }
        isExternalUpdate = false;
      },
    });
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

  // Link: the toolbar asks for a URL; an active link is removed instead.
  let linkOpen = $state(false);
  let linkUrl = $state('');

  function requestLink(kind: 'link' | 'image') {
    if (!editor || kind !== 'link') return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    linkUrl = editor.getAttributes('link').href ?? '';
    linkOpen = true;
  }

  function applyLink() {
    if (editor && linkUrl.trim()) editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    linkOpen = false;
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

<EditorShell
  {editor}
  {disabled}
  onrequest={requestLink}
  tools={['bold', 'italic', 'strike', 'code', 'h1', 'h2', 'h3', 'bulletList', 'orderedList', 'blockquote', 'codeBlock', 'link', 'hr', 'undo', 'redo']}
>
  <div class="relative" bind:this={editorContainer} style="height: 250px; overflow: hidden;">
    <div bind:this={editorElement} class="h-full"></div>

    <!-- Resize Handle -->
    {#if !disabled}
      <button
        type="button"
        aria-label="Drag to resize editor"
        class="group absolute right-0 bottom-0 left-0 h-1.5 cursor-ns-resize border-0 bg-transparent p-0 transition-colors duration-150 hover:bg-accent"
        onmousedown={startResize}
        onkeydown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            startResize(e as unknown as MouseEvent);
          }
        }}
      ></button>
    {/if}
  </div>
</EditorShell>

<Modal bind:open={linkOpen} title="Add link" description="Paste the address this text should point to.">
  <form
    id="tiptap-link-form"
    onsubmit={e => {
      e.preventDefault();
      applyLink();
    }}
  >
    <TextField label="URL" type="url" placeholder="https://" bind:value={linkUrl} mono />
  </form>
  {#snippet actions()}
    <Button variant="secondary" onclick={() => (linkOpen = false)}>Cancel</Button>
    <Button type="submit" form="tiptap-link-form">Add link</Button>
  {/snippet}
</Modal>
