<!-- Placeholder with the footprint of a NoteCard: title, three-line excerpt, footer. -->
<script lang="ts">
  import { BentoCard, Skeleton } from '$lib/components/ds';
</script>

<BentoCard class="min-h-[184px]">
  <Skeleton width="68%" height={20} />
  <Skeleton variant="text" lines={3} />
  <div class="mt-auto pt-2"><Skeleton width="34%" height={12} /></div>
</BentoCard>
