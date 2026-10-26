<script lang="ts">
  import BentoCard from './BentoCard.svelte';
  import { mutedClass, type Tone } from './tones';
  interface Props {
    label: string;
    value: string;
    delta?: { direction: 'up' | 'down'; text: string };
    caption?: string;
    tone?: Tone;
    colSpan?: 1 | 2;
  }
  let { label, value, delta, caption, tone = 'surface', colSpan = 1 }: Props = $props();
</script>

<BentoCard {label} {tone} {colSpan}>
  <p class="m-0 font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums">{value}</p>
  {#if delta}
    <span class="font-mono text-[13px] leading-5 font-medium {delta.direction === 'down' ? 'text-negative' : 'text-live'}">
      {delta.direction === 'down' ? '▼' : '▲'} {delta.text}
    </span>
  {/if}
  {#if caption}<span class="text-body-sm font-normal {mutedClass[tone]}">{caption}</span>{/if}
</BentoCard>
