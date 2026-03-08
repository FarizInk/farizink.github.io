<script lang="ts">
  import { fade } from 'svelte/transition';
  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import { preventBodyScroll, restoreBodyScroll, isTopmostModal, getModalZIndex } from '../lib/modalScroll';

  // Enhanced scale transition - smooth & modern
  function modernScale(_node: HTMLElement, { duration = 200 }: { duration?: number } = {}) {
    return {
      duration,
      easing: (t: number) => t * (2 - t),
      css: (t: number) => {
        const scale = 0.92 + t * 0.08;
        const opacity = t;

        return `
          opacity: ${opacity};
          transform: scale(${scale}) translateY(${10 * (1 - t)}px);
        `;
      }
    };
  }

  let {
    isOpen = false,
    maxW = 'max-w-full',
    forceClose = true,
    onClose = () => {},
    title = '',
    showCloseButton = true,
    showHeaderIcon = false,
    headerIcon,
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
    showHeaderIcon?: boolean;
    headerIcon?: Record<string, unknown>;
    children?: Snippet;
    header?: Snippet;
    body?: Snippet;
    footer?: Snippet;
  }>();

  // Store this modal's unique ID
  let currentModalId = $state<string>('');

  // Dynamic z-index based on stack position
  let modalZIndex = $derived(currentModalId ? getModalZIndex(currentModalId) : 50);

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
    // ESC key only closes modal if this is the topmost modal
    if (e.key === 'Escape') {
      if (isTopmostModal(currentModalId)) {
        close();
      }
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
      // Register this modal and get unique ID
      currentModalId = preventBodyScroll();
      window.addEventListener('keydown', handleKeydown);
      return () => {
        window.removeEventListener('keydown', handleKeydown);
        restoreBodyScroll(currentModalId);
        currentModalId = '';
      };
    }
  });
</script>

{#if isOpen}
  <div
    class="fixed inset-0 flex items-center justify-center p-4"
    style="z-index: {modalZIndex}"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      transition:fade
      role="button"
      tabindex="0"
      onclick={forceClose ? close : null}
    ></div>

    <!-- Modal Container -->
    <div class="flex items-center justify-center w-full">
      <div
        class="relative w-full {maxW} bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-all"
        transition:modernScale
      >
        <!-- Header Slot with Title and Close Button -->
        {#if header}
          {@render header()}
        {:else if title}
          <div class="modal-header">
            <div class="flex items-center gap-3 flex-1 min-w-0 px-1">
              {#if showHeaderIcon && headerIcon}
                <div class="modal-icon">
                  <svelte:component this={headerIcon} class="w-5 h-5" />
                </div>
              {/if}
              <h2 id="modal-title" class="modal-title flex-1">
                {title}
              </h2>
            </div>
            {#if showCloseButton}
              <button
                type="button"
                onclick={close}
                class="modal-close-btn"
                aria-label="Close modal"
              >
                <X class="w-5 h-5" />
              </button>
            {/if}
          </div>
        {/if}

        <!-- Body Slot -->
        {#if body}
          <div class="modal-body overflow-y-auto">
            {@render body()}
          </div>
        {:else if children}
          <div class="modal-body overflow-y-auto">
            {@render children()}
          </div>
        {/if}

        <!-- Footer Slot -->
        {#if footer}
          <div class="modal-footer">
            {@render footer()}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
  }

  .modal-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(135deg, rgb(254 252 232), rgb(250 204 21));
    border-radius: 0.5rem;
    color: rgb(161 98 7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  :global(.dark) .modal-icon {
    background: linear-gradient(135deg, rgb(30 20 50), rgb(88 28 135));
    color: rgb(250 204 21);
  }

  .modal-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: rgb(17 24 39);
    line-height: 1.4;
  }

  :global(.dark) .modal-title {
    color: rgb(255 255 255);
  }

  .modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    background: rgb(243 244 246);
    border-radius: 0.5rem;
    color: rgb(107 114 128);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .modal-close-btn:hover {
    background: rgb(229 231 235);
    color: rgb(17 24 39);
  }

  :global(.dark) .modal-close-btn {
    background: rgb(31 41 55);
  }

  :global(.dark) .modal-close-btn:hover {
    background: rgb(55 65 81);
    color: rgb(255 255 255);
  }

  .modal-close-btn:focus-visible {
    outline: 2px solid rgb(251 191 36);
    outline-offset: 2px;
  }

  :global(.dark) .modal-close-btn:focus-visible {
    outline-color: rgb(139 92 246);
  }

  .modal-body {
    max-height: calc(100vh - 240px);
  }

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
  }

  :global(.dark) .modal-footer {
    border-top-color: rgb(55 65 81);
  }

  /* Custom scrollbar */
  .modal-body::-webkit-scrollbar {
    width: 6px;
  }

  .modal-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .modal-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  :global(.dark) .modal-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Responsive padding */
  @media (min-width: 640px) {
    .modal-header {
      padding: 1rem 1.5rem;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
    }
  }

  /* Animation for backdrop */
  @keyframes modalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Animation for modal content */
  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Accessibility - focus trap */
  .modal-content:focus-visible {
    outline: none;
  }
</style>
