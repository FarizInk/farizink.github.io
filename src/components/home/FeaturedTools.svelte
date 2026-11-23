<!-- Tools tile: count + a few shortcuts into the most-used tools. -->
<script lang="ts">
  import { ArrowRight } from '@lucide/svelte';
  import { BentoCard } from '$lib/components/ds';
  import { getAllTools, getToolById } from '../../lib/toolsConfig';

  const toolCount = getAllTools().length;

  const featured = [
    { id: 'json-parser', label: 'JSON Parser' },
    { id: 'jwt-decoder', label: 'JWT Decoder' },
    { id: 'cron-generator', label: 'Cron' },
    { id: 'hash-generator', label: 'Hash' }
  ]
    .map(f => ({ ...f, tool: getToolById(f.id) }))
    .filter(f => f.tool);
</script>

<BentoCard tone="lime" colSpan={2} label="Tools">
  <a
    href="/tools"
    class="text-title inline-flex w-fit items-center gap-2 text-ink-on-bright no-underline hover:underline"
  >
    {toolCount} utilities <ArrowRight class="size-5" aria-hidden="true" />
  </a>
  <p class="text-body-sm m-0 font-normal">Free dev tools that run in your browser.</p>
  <ul class="m-0 mt-auto flex list-none flex-wrap gap-2 p-0" aria-label="Popular tools">
    {#each featured as f (f.id)}
      {@const Icon = f.tool!.icon}
      <li>
        <a
          href="/tools/{f.id}"
          class="text-body-sm inline-flex h-8 items-center gap-1.5 rounded-pill bg-ink-on-bright/10 px-3 text-ink-on-bright no-underline transition-colors duration-fast hover:bg-ink-on-bright/20"
        >
          <Icon class="size-4" aria-hidden="true" />{f.label}
        </a>
      </li>
    {/each}
  </ul>
</BentoCard>
