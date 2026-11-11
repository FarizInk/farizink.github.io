<!-- A StatTile whose tile, tone and label are already real; only the figures wait. -->
<script lang="ts">
  import { BentoCard, Skeleton } from '$lib/components/ds';
  import type { Tone } from '$lib/components/ds/tones';

  interface Props { label: string; tone?: Tone }
  let { label, tone = 'surface' }: Props = $props();
</script>

<BentoCard {label} {tone}>
  <Skeleton width="62%" height={36} />
  <Skeleton width="38%" height={14} />
</BentoCard>
