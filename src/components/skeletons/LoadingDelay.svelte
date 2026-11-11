<!--
  Wraps a loading placeholder so it only appears when loading is actually slow.
  Fast responses (most Soul API calls) never flash a skeleton: the placeholder
  mounts after `delay` ms, and unmounting the branch before then shows nothing.
  Screen readers get the status immediately.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';

  interface Props {
    /** ms before the placeholder is shown */
    delay?: number;
    /** announced to assistive tech */
    label?: string;
    class?: string;
    children: Snippet;
  }
  let { delay = 200, label = 'Loading', class: klass = '', children }: Props = $props();

  let shown = $state(false);
  onMount(() => {
    const t = setTimeout(() => (shown = true), delay);
    return () => clearTimeout(t);
  });
</script>

<div role="status" aria-busy="true" class={klass}>
  <span class="sr-only">{label}</span>
  {#if shown}
    <div aria-hidden="true" class="contents">{@render children()}</div>
  {/if}
</div>
