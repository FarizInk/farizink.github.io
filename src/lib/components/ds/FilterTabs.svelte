<script lang="ts">
  interface Item { id: string; label: string; count?: number }
  interface Props { items: Item[]; value?: string; onchange?: (id: string) => void }
  let { items, value = $bindable(items[0]?.id), onchange }: Props = $props();
</script>

<div class="flex flex-wrap gap-2" role="tablist">
  {#each items as it (it.id)}
    {@const on = value === it.id}
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onclick={() => { value = it.id; onchange?.(it.id); }}
      class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-pill py-0 pr-1.5 pl-4 text-body-sm transition-[background-color,color,scale] duration-fast ease-spring active:scale-[.96]
        {on ? 'bg-ink text-card' : 'bg-control text-ink hover:bg-control-hover'}"
    >
      {it.label}
      {#if it.count != null}
        <span class="grid h-7 min-w-7 place-items-center rounded-pill px-1.5 font-mono text-xs font-medium {on ? 'bg-accent text-ink-on-accent' : 'bg-card text-ink'}">{it.count}</span>
      {/if}
    </button>
  {/each}
</div>
