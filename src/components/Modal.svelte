<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  let {
    isOpen = false,
    maxW = 'max-w-full',
    forceClose = true,
    onClose = () => {},
    title = '',
    showCloseButton = true,
    children,
    header,
    body,
    footer
  } = $props<{
    isOpen?: boolean;
    maxW?: string;
    forceClose?: boolean;
    onClose?: () => void;
    title?: string;
    showCloseButton?: boolean;
    children?: Snippet;
    header?: Snippet;
    body?: Snippet;
    footer?: Snippet;
  }>();

  function close() {
    onClose();
  }

  // Check if current focused element is a form element
  function isFormElement(): boolean {
    const activeElement = document.activeElement;
    if (!activeElement) return false;

    const tagName = activeElement.tagName.toLowerCase();
    const formElements = ['input', 'textarea', 'select'];
    const isEditable = activeElement.getAttribute('contenteditable') === 'true';

    return formElements.includes(tagName) || isEditable;
  }

  function handleKeydown(e: KeyboardEvent) {
    // ESC key always closes modal
    if (e.key === 'Escape') {
      close();
      return;
    }

    // Enter and Space only close modal if not focused on form elements
    if (forceClose && !isFormElement()) {
      if (e.key === 'Enter' || e.key === ' ') {
        close();
      }
    }
  }

  // Add window-level event listener for ESC key
  $effect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm"
      transition:fade
      role="button"
      tabindex="0"
      onclick={forceClose ? close : null}
    ></div>

    <!-- Modal Container -->
    <div
      class="flex items-center justify-center min-h-full w-full p-4 text-center"
    >
      <div
        class="relative bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 w-full {maxW}"
        transition:scale={{ duration: 300 }}
      >
        <!-- Header Slot with Title and Close Button -->
        {#if header}
          {@render header()}
        {:else if title}
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            {#if showCloseButton}
              <button
                onclick={close}
                class="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            {/if}
          </div>
        {/if}

        <!-- Body Slot -->
        {#if body}
          <div class="px-6 py-4">
            {@render body()}
          </div>
        {:else if children}
          <div class="px-6 py-4">
            {@render children()}
          </div>
        {/if}

        <!-- Footer Slot -->
        {#if footer}
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            {@render footer()}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
