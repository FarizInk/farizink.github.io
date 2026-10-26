<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';
  interface Props extends Omit<HTMLInputAttributes, 'type'> { checked?: boolean; label?: string; description?: string; children?: Snippet }
  let { checked = $bindable(false), label, description, children, ...rest }: Props = $props();
</script>

<label class="fz-check">
  <input type="checkbox" bind:checked {...rest} />
  <span class="fz-box"><Icon name="check" stroke={3} /></span>
  <span class="fz-check-text">{#if children}{@render children()}{:else}{label}{/if}{#if description}<small>{description}</small>{/if}</span>
</label>
