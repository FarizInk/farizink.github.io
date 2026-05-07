<script lang="ts">
  import { fade } from 'svelte/transition';
  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import { preventBodyScroll, restoreBodyScroll, isTopmostModal, getModalZIndex, getOpenModalCount } from '../lib/modalScroll';

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
    isOpen = $bindable(false),
    maxW = 'max-w-md',
    onClose = () => {},
    children
  } = $props<{
    isOpen?: boolean;
    maxW?: string;
    onClose?: () => void;
    children?: Snippet;
  }>();

  let currentModalId = $state<string>('');
  let modalOpenedAt = $state<number>(0);

  let isNestedModal = $derived(getOpenModalCount() > 1);
  let modalZIndex = $derived(currentModalId ? getModalZIndex(currentModalId) : 50);

  function close() {
    onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    const timeSinceOpened = Date.now() - modalOpenedAt;
    if (timeSinceOpened < 200) return;

    if (e.key === 'Escape' && isTopmostModal(currentModalId)) {
      close();
    }
  }

  $effect(() => {
    if (isOpen) {
      modalOpenedAt = Date.now();
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
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 {isNestedModal ? 'bg-black/60' : 'bg-black/50'} backdrop-blur-sm"
      transition:fade
      role="button"
      tabindex="0"
      onclick={() => {
        if (isTopmostModal(currentModalId)) {
          close();
        }
      }}
    ></div>

    <div
      class="relative w-full {maxW} bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
      transition:modernScale
    >
      <div class="p-6">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}
