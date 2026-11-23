<!-- "Based in" tile: Fariz's local time (WIB) with a guessed status and the offset from the visitor. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { BentoCard } from '$lib/components/ds';
  import { zonedTime, clock, status, offsetFromViewer } from '../../lib/localTime';

  let now = $state(new Date());

  const t = $derived(zonedTime(now));
  const offset = $derived(offsetFromViewer(t.offset, -now.getTimezoneOffset()));

  onMount(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    // Tick on the minute boundary, then every minute.
    const timeout = setTimeout(
      () => {
        now = new Date();
        interval = setInterval(() => (now = new Date()), 60_000);
      },
      60_000 - (Date.now() % 60_000)
    );
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });
</script>

<BentoCard tone="deep" label="Based in">
  <p class="text-title m-0">Sidoarjo, Indonesia</p>
  <div class="mt-auto flex flex-col gap-1">
    <p class="m-0 flex items-baseline gap-2">
      <time
        datetime={now.toISOString()}
        class="text-display tabular-nums max-sm:text-[32px] max-sm:leading-[36px]"
      >
        {clock(t)}
      </time>
      <span class="text-label text-ink-on-dark-muted">WIB</span>
    </p>
    <p class="text-body-sm m-0 font-normal text-ink-on-dark-muted">{status(t)} · {offset}</p>
  </div>
</BentoCard>
