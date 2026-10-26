<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import IconButton from './IconButton.svelte';
  import Icon from './Icon.svelte';
  import { dur, EASE } from './motion';

  interface Props {
    open: boolean;
    title: string;
    description?: string;
    contained?: boolean;
    onclose?: () => void;
    children?: Snippet;
    /** Right-aligned buttons; primary last. */
    actions?: Snippet;
  }
  let { open = $bindable(false), title, description, contained = false, onclose, children, actions }: Props = $props();
  let panel: HTMLElement | undefined = $state();
  function close() { open = false; onclose?.(); }

  $effect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    if (!contained) document.documentElement.style.overflow = 'hidden';
    queueMicrotask(() => panel?.querySelector<HTMLElement>('input,select,textarea,button')?.focus());
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (!contained) document.documentElement.style.overflow = ''; prev?.focus?.(); };
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="fz-overlay {contained ? 'fz-contained' : ''}" out:fade={{ duration: dur(140), easing: EASE.exit }} onclick={(e) => e.target === e.currentTarget && close()}>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="fz-modal-wrap" onclick={(e) => e.target === e.currentTarget && close()}>
      <div bind:this={panel} out:scale={{ start: 0.98, opacity: 0, duration: dur(140), easing: EASE.exit }} class="fz-modal" role="dialog" aria-modal="true" aria-label={title}>
        <h2 class="fz-modal-title">{title}</h2>
        {#if description}<p class="fz-modal-desc">{description}</p>{/if}
        {@render children?.()}
        {#if actions}<div class="fz-modal-actions">{@render actions()}</div>{/if}
        <span class="fz-modal-close"><IconButton label="Close" onclick={close}><Icon name="x" /></IconButton></span>
      </div>
    </div>
  </div>
{/if}
