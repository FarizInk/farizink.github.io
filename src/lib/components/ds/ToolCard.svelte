<script lang="ts">
  import type { Snippet } from 'svelte';
  import BentoCard from './BentoCard.svelte';
  import Tag from './Tag.svelte';
  import { tileClass, type TileTone } from './tones';

  interface Props {
    name: string;
    description: string;
    /** 24px stroke icon (lucide-svelte works). */
    icon: Snippet;
    /** Category tile: text-data lilac · generators violet · web-dev deep · utilities lime (see categoryTone). */
    tone?: TileTone;
    features?: string[];
    maxFeatures?: number;
    href?: string;
  }
  let { name, description, icon, tone = 'lilac', features = [], maxFeatures = 3, href }: Props = $props();
</script>

<BentoCard {href}>
  <div class="flex items-start gap-3">
    <span class="grid size-11 flex-none place-items-center rounded-md [&_svg]:size-[22px] {tileClass[tone]}">{@render icon()}</span>
    <div class="min-w-0">
      <h3 class="m-0 font-display text-[17px] leading-6 font-semibold">{name}</h3>
      <p class="mt-1 mb-0 text-body-sm font-normal text-ink-muted">{description}</p>
    </div>
  </div>
  {#if features.length}
    <div class="flex flex-wrap gap-2">
      {#each features.slice(0, maxFeatures) as f (f)}<Tag>{f}</Tag>{/each}
      {#if features.length > maxFeatures}<Tag tone="accent">+{features.length - maxFeatures}</Tag>{/if}
    </div>
  {/if}
</BentoCard>
