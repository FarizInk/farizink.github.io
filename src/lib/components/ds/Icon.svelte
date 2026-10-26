<script lang="ts">
  import { I } from './icons';
  let { name, class: klass = '', stroke = 2 }: { name: keyof typeof I; class?: string; stroke?: number } = $props();
</script>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class={klass}>
  {#each I[name] as d (d)}<path {d} />{/each}
</svg>
