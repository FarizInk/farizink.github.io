<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    label?: string;
    /** Hint like "Ctrl ⇧ F" — wire the actual shortcut in the page. */
    shortcut?: string;
  }
  let { value = $bindable(''), placeholder = 'Search…', label, shortcut }: Props = $props();
</script>

<label class="relative flex w-full items-center">
  <svg class="pointer-events-none absolute left-4 size-5 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /><path d="M20 20l-4-4" />
  </svg>
  <input
    type="search"
    bind:value
    {placeholder}
    aria-label={label ?? placeholder}
    class="text-body h-13 w-full rounded-pill bg-control pr-4 pl-12 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring text-ink placeholder:text-ink-muted"
  />
  {#if shortcut}
    <kbd class="absolute right-4 rounded-md bg-card px-1.5 py-0.5 font-mono text-xs text-ink-muted">{shortcut}</kbd>
  {/if}
</label>
