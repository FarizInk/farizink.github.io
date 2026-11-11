<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Clock, ArrowUp, CornerLeftUp } from '@lucide/svelte';
  import { Button, CopyChip, Segmented, TextField } from '$lib/components/ds';
  import {
    parseTimeInput,
    describeParse,
    isNumericInput,
    formatAll,
    toDateTimeLocal,
    fromDateTimeLocal,
    type TimeUnit,
    type WallZone
  } from '$lib/tools/timestamp';

  const INPUT_ID = 'timestamp-input';
  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  // Live clock: drives the Now card, "now" input and relative time.
  let nowMs = $state(Date.now());
  $effect(() => {
    const id = setInterval(() => (nowMs = Date.now()), 1000);
    return () => clearInterval(id);
  });
  const nowDate = $derived(new Date(nowMs));
  const nowSeconds = $derived(String(Math.floor(nowMs / 1000)));

  // --- Main converter ----------------------------------------------------
  let input = $state(String(Math.floor(Date.now() / 1000)));
  let unitChoice = $state('auto');
  let zoneMode = $state('local');

  const unitOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 's', label: 's' },
    { value: 'ms', label: 'ms' },
    { value: 'us', label: 'µs' },
    { value: 'ns', label: 'ns' }
  ];
  const zoneOptions = [
    { value: 'local', label: 'Local' },
    { value: 'utc', label: 'UTC' }
  ];

  const numeric = $derived(isNumericInput(input));
  const result = $derived(
    input.trim()
      ? parseTimeInput(input, nowDate, numeric ? (unitChoice as TimeUnit | 'auto') : 'auto')
      : null
  );
  const parsed = $derived(result?.ok ? result.value : null);
  const error = $derived(result && !result.ok ? result.error : undefined);
  const hint = $derived(
    parsed ? describeParse(parsed) : 'Unix seconds, ms, µs or ns · ISO 8601 · RFC 2822 · "now"'
  );

  const formatZone = $derived(zoneMode === 'utc' ? 'UTC' : localTz);
  const out = $derived(parsed ? formatAll(parsed.date, formatZone, nowDate) : null);
  const rows = $derived.by(() => {
    if (!out) return [];
    const local = zoneMode === 'local';
    return [
      { label: 'Unix seconds', value: out.unixSeconds },
      { label: 'Unix milliseconds', value: out.unixMilliseconds },
      { label: 'ISO 8601 (UTC)', value: out.isoUtc },
      { label: local ? 'ISO 8601 (local offset)' : 'ISO 8601 (+00:00)', value: out.isoOffset },
      { label: 'RFC 2822 / HTTP', value: out.rfc2822 },
      ...(local ? [{ label: 'Local time', value: out.human }] : []),
      { label: 'UTC time', value: out.humanUtc },
      { label: 'Relative', value: out.relative },
      { label: 'Day of week', value: out.dayOfWeek },
      { label: 'ISO week', value: out.isoWeek },
      { label: 'Day of year', value: out.dayOfYear }
    ];
  });

  function useNow() {
    input = nowSeconds;
    unitChoice = 'auto';
  }

  // --- Pick a date (independent state) -----------------------------------
  let pickZone = $state('local');
  let pickValue = $state(toDateTimeLocal(new Date(), 'local'));

  const pickDate = $derived(pickValue ? fromDateTimeLocal(pickValue, pickZone as WallZone) : null);
  const pickError = $derived(pickValue && !pickDate ? 'Enter a full date and time.' : undefined);
  const pickSeconds = $derived(pickDate ? String(Math.floor(pickDate.getTime() / 1000)) : '');
  const pickMillis = $derived(pickDate ? String(pickDate.getTime()) : '');

  function sendToConverter() {
    if (!pickDate) return;
    input = pickSeconds;
    unitChoice = 'auto';
    document.getElementById(INPUT_ID)?.focus();
  }
</script>

{#snippet copyLabel(label: string)}Copy<span class="sr-only"> {label}</span>{/snippet}

<ToolLayout
  title="Timestamp Converter"
  description="Convert between Unix timestamps, ISO dates, and human-readable formats."
  icon={Clock}
  color="warning"
>
  <!-- Now -->
  <section aria-labelledby="ts-now-title" class="flex flex-col gap-4 rounded-lg bg-card p-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id="ts-now-title" class="text-title text-ink">Now</h2>
      <p class="text-body-sm text-ink-muted">{nowDate.toLocaleString()} · {localTz}</p>
    </div>
    <div class="flex flex-wrap items-end gap-4">
      <div class="flex flex-col gap-2">
        <span class="text-label text-ink-muted">Unix seconds</span>
        <CopyChip value={nowSeconds}><span class="font-mono">{nowSeconds}</span></CopyChip>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-label text-ink-muted">Unix milliseconds</span>
        <CopyChip value={String(nowMs)}><span class="font-mono">{nowMs}</span></CopyChip>
      </div>
      <Button variant="secondary" onclick={useNow} class="sm:ml-auto">
        {#snippet icon()}<ArrowUp class="size-4" />{/snippet}
        Use now
      </Button>
    </div>
  </section>

  <!-- Converter -->
  <section aria-labelledby="ts-convert-title" class="flex flex-col gap-5 rounded-lg bg-card p-6">
    <h2 id="ts-convert-title" class="text-title text-ink">Convert</h2>

    <TextField
      id={INPUT_ID}
      label="Timestamp or date"
      bind:value={input}
      mono
      {error}
      {hint}
      placeholder="1704067200, 2024-01-01T00:00:00Z, now…"
      autocomplete="off"
      spellcheck={false}
    />

    {#if numeric}
      <div class="flex flex-col gap-2 sm:max-w-sm">
        <span class="text-label text-ink-muted" aria-hidden="true">Unit</span>
        <Segmented label="Timestamp unit" options={unitOptions} bind:value={unitChoice} />
      </div>
    {/if}

    {#if out}
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div class="flex flex-col gap-1">
          <h3 class="text-body font-medium text-ink">Results</h3>
          <p class="text-body-sm text-ink-muted">
            Local time zone: <span class="font-mono">{localTz}</span>
          </p>
        </div>
        <div class="w-full sm:w-56">
          <Segmented label="Show calendar fields in" options={zoneOptions} bind:value={zoneMode} />
        </div>
      </div>

      <dl class="flex flex-col gap-2">
        {#each rows as row (row.label)}
          <div
            class="flex flex-col gap-2 rounded-md bg-sunken px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <dt class="text-label shrink-0 text-ink-muted sm:w-48">{row.label}</dt>
            <dd class="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span class="text-code min-w-0 break-all font-mono text-ink">{row.value}</span>
              <CopyChip value={row.value}>{@render copyLabel(row.label)}</CopyChip>
            </dd>
          </div>
        {/each}
      </dl>
    {/if}
  </section>

  <!-- Pick a date -->
  <section aria-labelledby="ts-pick-title" class="flex flex-col gap-5 rounded-lg bg-card p-6">
    <div class="flex flex-col gap-1">
      <h2 id="ts-pick-title" class="text-title text-ink">Pick a date</h2>
      <p class="text-body-sm text-ink-muted">Choose a date and time to get its Unix timestamp.</p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div class="flex-1">
        <TextField
          label="Date and time"
          type="datetime-local"
          step="1"
          bind:value={pickValue}
          mono
          error={pickError}
        />
      </div>
      <div class="flex flex-col gap-2 sm:w-56">
        <span class="text-label text-ink-muted" aria-hidden="true">Read as</span>
        <Segmented label="Read the date and time as" options={zoneOptions} bind:value={pickZone} />
      </div>
    </div>

    {#if pickDate}
      <div class="flex flex-wrap items-end gap-4">
        <div class="flex flex-col gap-2">
          <span class="text-label text-ink-muted">Unix seconds</span>
          <CopyChip value={pickSeconds}><span class="font-mono">{pickSeconds}</span></CopyChip>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-label text-ink-muted">Unix milliseconds</span>
          <CopyChip value={pickMillis}><span class="font-mono">{pickMillis}</span></CopyChip>
        </div>
        <Button variant="secondary" onclick={sendToConverter} class="sm:ml-auto">
          {#snippet icon()}<CornerLeftUp class="size-4" />{/snippet}
          Send to converter
        </Button>
      </div>
    {/if}
  </section>
</ToolLayout>
