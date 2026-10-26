<script lang="ts">
  // Loading placeholder — the only looping animation in the system. Remove as soon as data arrives.
  interface Props { variant?: 'block' | 'text'; lines?: number; width?: string | number; height?: string | number; round?: boolean; class?: string }
  let { variant = 'block', lines = 1, width = '100%', height = 16, round = false, class: klass = '' }: Props = $props();
  const css = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);
</script>

{#if variant === 'text'}
  <div class="flex flex-col gap-2 {klass}" aria-hidden="true">
    {#each Array.from({ length: lines }, (_, i) => i) as i (i)}
      <span class="fz-skeleton h-3" style="width:{i === lines - 1 && lines > 1 ? '60%' : '100%'}"></span>
    {/each}
  </div>
{:else}
  <span class="fz-skeleton {klass}" aria-hidden="true" style="width:{css(width)};height:{css(height)};{round ? 'border-radius:9999px' : ''}"></span>
{/if}
