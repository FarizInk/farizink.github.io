<script lang="ts">
  import { fade } from 'svelte/transition';
  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import { preventBodyScroll, restoreBodyScroll, isTopmostModal, getModalZIndex, getOpenModalCount } from '../lib/modalScroll';

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

  // Portal action: moves modal DOM to document.body
  // This prevents nested modals from being clipped by parent modal's overflow/transform
  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
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
  let modalOpenedAt = $state<number>(0);

  // Get open modal count for nesting detection
  // isNestedModal = true only if there's MORE than one modal open (meaning this modal is NOT the first one)
  let openCount = $derived(getOpenModalCount());
  let isNestedModal = $derived(openCount > 1);

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
    // Ignore keydown events that happen too soon after modal opens (grace period)
    const timeSinceOpened = Date.now() - modalOpenedAt;
    const GRACE_PERIOD_MS = 200;

    if (timeSinceOpened < GRACE_PERIOD_MS) {
      return;
    }

    // ESC key only closes modal if this is the topmost modal
    if (e.key === 'Escape') {
      if (isTopmostModal(currentModalId)) {
        close();
      }
      return;
    }

    // Enter and Space only close modal if:
    // - forceClose is true AND
    // - not in a form element AND
    // - this is the topmost modal
    if (forceClose && isTopmostModal(currentModalId) && !isFormElement()) {
      if (e.key === 'Enter' || e.key === ' ') {
        close();
      }
    }
  }

  // Add window-level event listener for ESC key
  $effect(() => {
    if (isOpen) {
      modalOpenedAt = Date.now();
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
    use:portal
    class="fixed inset-0 flex items-center justify-center p-4"
    style="z-index: {modalZIndex}"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop: always full screen, darker for nested modals -->
    <div
      class="fixed inset-0 {isNestedModal ? 'bg-black/60' : 'bg-black/50'} backdrop-blur-sm"
      transition:fade
      role="button"
      tabindex="0"
      onclick={() => {
        // Only close on backdrop click if this is the topmost modal
        if (isTopmostModal(currentModalId) && forceClose) {
          close();
        }
      }}
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
