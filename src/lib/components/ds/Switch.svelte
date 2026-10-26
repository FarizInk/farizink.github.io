<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  interface Props extends Omit<HTMLInputAttributes, 'type'> { checked?: boolean; label: string; description?: string }
  let { checked = $bindable(false), label, description, ...rest }: Props = $props();
</script>

<label class="fz-switch">
  <input type="checkbox" role="switch" bind:checked {...rest} />
  <span class="fz-track"></span>
  <span class="fz-check-text">{label}{#if description}<small>{description}</small>{/if}</span>
</label>
