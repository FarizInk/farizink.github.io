<script lang="ts">
  interface Props { label: string; value?: number; min?: number; max?: number; step?: number; unit?: string; marks?: string[]; onchange?: (v: number) => void }
  let { label, value = $bindable(0), min = 0, max = 100, step = 1, unit = '', marks, onchange }: Props = $props();
  const uid = $props.id();
  const pct = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="fz-slider">
  <div class="fz-slider-top"><label class="fz-field-label" for={`sl-${uid}`}>{label}</label><span class="fz-slider-val">{value}{unit}</span></div>
  <input id={`sl-${uid}`} type="range" class="fz-range" {min} {max} {step} bind:value style="--p:{pct}%" oninput={() => onchange?.(value)} />
  {#if marks}<div class="fz-slider-scale">{#each marks as m (m)}<span>{m}</span>{/each}</div>{/if}
</div>
