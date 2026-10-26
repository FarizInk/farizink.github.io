<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Opt { value: string; label: string; icon?: Snippet }
  let { label, options, value = $bindable(options[0]?.value), onchange }: { label: string; options: Opt[]; value?: string; onchange?: (v: string) => void } = $props();
</script>

<div class="fz-seg" role="radiogroup" aria-label={label}>
  {#each options as o (o.value)}
    <button type="button" role="radio" aria-checked={value === o.value} onclick={() => { value = o.value; onchange?.(o.value); }}>
      {@render o.icon?.()}{o.label}
    </button>
  {/each}
</div>
