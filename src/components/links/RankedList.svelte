<!-- Top-10 breakdown (referrers, countries, …): label, count, and a bar scaled to the leader. -->
<script lang="ts">
  import { formatCount } from '../../lib/linkHelpers';

  interface Props {
    title: string;
    items: { label: string; count: number }[];
    /** Turns an API label into display text (e.g. ISO-2 → country name). */
    format?: (label: string) => string;
  }
  let { title, items, format = (l: string) => l }: Props = $props();
  const top = $derived(items.reduce((m, it) => Math.max(m, it.count), 0));
</script>

<section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6">
  <h3 class="text-label m-0 text-ink-muted">{title}</h3>
  {#if items.length === 0}
    <p class="m-0 text-body-sm text-ink-muted">No clicks in this range.</p>
  {:else}
    <ol class="m-0 flex list-none flex-col gap-3 p-0">
      {#each items as item (item.label)}
        {@const label = format(item.label)}
        <li class="flex flex-col gap-1.5">
          <div class="flex items-baseline justify-between gap-3 text-body-sm">
            <span class="min-w-0 truncate" title={label !== item.label ? `${label} (${item.label})` : label}>{label}</span>
            <span class="font-mono tabular-nums text-ink">{formatCount(item.count)}</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-pill bg-sunken" aria-hidden="true">
            <div class="h-full rounded-pill bg-accent" style="width: {top ? Math.max(2, (item.count / top) * 100) : 0}%"></div>
          </div>
        </li>
      {/each}
    </ol>
  {/if}
</section>
