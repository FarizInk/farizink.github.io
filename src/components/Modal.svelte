<script lang="ts">
  import { X } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { dur, EASE } from '$lib/components/ds';
  import { preventBodyScroll, restoreBodyScroll, isTopmostModal, getModalZIndex, getOpenModalCount } from '../lib/modalScroll';

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
    locked = false,
    onClose = () => {},
    children,
    overlay
  } = $props<{
    isOpen?: boolean;
    maxW?: string;
    locked?: boolean;
    onClose?: () => void;
    children?: Snippet;
    overlay?: Snippet;
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
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="fz-overlay z-0 {isNestedModal ? 'motion-safe:animate-none' : ''}"
      out:fade={{ duration: dur(140), easing: EASE.exit }}
      role="button"
      tabindex="0"
      onclick={() => {
        if (isTopmostModal(currentModalId)) {
          close();
        }
      }}
      onkeydown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isTopmostModal(currentModalId)) {
          e.preventDefault();
          close();
        }
      }}
    ></div>

    <div
      out:scale={{ start: 0.98, opacity: 0, duration: dur(140), easing: EASE.exit }}
      class="relative z-10 w-full {maxW} bg-raised text-ink rounded-lg max-h-[90vh] overflow-hidden flex flex-col motion-safe:animate-[fz-pop_var(--duration-base)_var(--fz-ease-soft)]"
    >
      <div class="p-6 flex-1 min-h-0 {locked ? 'overflow-hidden' : 'overflow-y-auto'}">
        {#if children}
          {@render children()}
        {/if}
      </div>
      {#if overlay}
        {@render overlay()}
      {/if}
    </div>
  </div>
{/if}
