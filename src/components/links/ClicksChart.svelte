<!--
  Clicks over time: one accent column per day (per week past 120 days).
  Hover, touch or arrow keys move the readout; a table view carries every value.
-->
<script lang="ts">
  import { chartBars, niceMax, formatBarRange, formatCount, formatTick, type DailyPoint } from '../../lib/linkHelpers';

  interface Props {
    daily: DailyPoint[];
    timezone?: string;
  }
  let { daily, timezone }: Props = $props();

  const chart = $derived(chartBars(daily));
  const bars = $derived(chart.bars);
  const peak = $derived(bars.reduce((m, b) => Math.max(m, b.clicks), 0));
  const max = $derived(niceMax(peak));
  const gap = $derived(bars.length <= 45 ? 'px-px' : 'pr-px');

  let picked = $state<number | null>(null);
  let engaged = $state(false);
  // Default readout: the last bar (today / this week).
  const index = $derived(picked !== null && picked < bars.length ? picked : bars.length - 1);
  const current = $derived(bars[index]);
  const unitLabel = $derived(chart.unit === 'week' ? 'Clicks per week' : 'Clicks per day');
  const valueText = $derived(current ? `${formatBarRange(current, true)}: ${formatCount(current.clicks)} clicks` : '');

  function fromPointer(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !bars.length) return;
    const i = Math.floor(((e.clientX - rect.left) / rect.width) * bars.length);
    picked = Math.min(bars.length - 1, Math.max(0, i));
    engaged = true;
  }

  function onKey(e: KeyboardEvent) {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowDown: -1, ArrowUp: 1, PageDown: -7, PageUp: 7 };
    let next: number | null = null;
    if (e.key in step) next = index + step[e.key];
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = bars.length - 1;
    if (next === null) return;
    e.preventDefault();
    picked = Math.min(bars.length - 1, Math.max(0, next));
    engaged = true;
  }
</script>

<figure class="m-0 flex min-w-0 flex-col gap-4">
  <figcaption class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
    <span class="text-label text-ink-muted">{unitLabel}</span>
    {#if current}
      <span class="font-mono text-body-sm text-ink" aria-live="polite">
        <span class="text-ink-muted">{formatBarRange(current, true)}</span>
        <span class="ml-2 font-medium tabular-nums">{formatCount(current.clicks)}</span>
        <span class="text-ink-muted">{current.clicks === 1 ? 'click' : 'clicks'}</span>
      </span>
    {/if}
  </figcaption>

  <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
    <!-- y axis -->
    <div class="relative h-44 w-8 font-mono text-[11px] text-ink-muted tabular-nums sm:h-52" aria-hidden="true">
      <span class="absolute top-0 right-0 -translate-y-1/2">{formatTick(max)}</span>
      <span class="absolute top-1/2 right-0 -translate-y-1/2">{formatTick(max / 2)}</span>
      <span class="absolute right-0 bottom-0 translate-y-1/2">0</span>
    </div>

    <!-- plot -->
    <div class="relative h-44 sm:h-52">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-control" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-control" aria-hidden="true"></div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-control-hover" aria-hidden="true"></div>

      <div
        class="absolute inset-0 flex cursor-crosshair touch-pan-y items-end rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
        role="slider"
        tabindex="0"
        aria-label="{unitLabel}. Use the arrow keys to read each value."
        aria-valuemin={0}
        aria-valuemax={Math.max(0, bars.length - 1)}
        aria-valuenow={index}
        aria-valuetext={valueText}
        onpointermove={fromPointer}
        onpointerdown={fromPointer}
        onpointerleave={() => {
          engaged = false;
          picked = null;
        }}
        onkeydown={onKey}
        onfocus={() => (engaged = true)}
        onblur={() => {
          engaged = false;
          picked = null;
        }}
      >
        {#each bars as bar, i (bar.start)}
          <div class="flex h-full min-w-0 flex-1 items-end justify-center {gap}">
            {#if bar.clicks > 0}
              <div
                class="w-full max-w-6 rounded-t-[4px] bg-accent transition-opacity duration-fast {engaged && i !== index ? 'opacity-45' : ''}"
                style="height: {(bar.clicks / max) * 100}%"
              ></div>
            {:else if engaged && i === index}
              <div class="h-0.5 w-full max-w-6 rounded-pill bg-accent"></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div></div>
    {#if bars.length}
      <div class="mt-2 flex justify-between gap-4 font-mono text-[11px] text-ink-muted" aria-hidden="true">
        <span>{formatBarRange(bars[0])}</span>
        <span>{formatBarRange(bars[bars.length - 1])}</span>
      </div>
    {/if}
  </div>

  <details class="group text-body-sm">
    <summary class="w-fit cursor-pointer rounded-pill text-ink-muted hover:text-ink">
      Show as table{#if timezone}<span class="ml-1 font-mono text-[11px]">· {timezone}</span>{/if}
    </summary>
    <div class="mt-3 max-h-64 overflow-auto rounded-md bg-control">
      <table class="w-full text-left font-mono text-[13px]">
        <thead class="sticky top-0 bg-control text-ink-muted">
          <tr>
            <th scope="col" class="px-4 py-2 font-medium">{chart.unit === 'week' ? 'Week' : 'Day'}</th>
            <th scope="col" class="px-4 py-2 text-right font-medium">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {#each [...bars].reverse() as bar (bar.start)}
            <tr>
              <td class="px-4 py-1.5">{formatBarRange(bar, true)}</td>
              <td class="px-4 py-1.5 text-right tabular-nums">{formatCount(bar.clicks)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </details>
</figure>
