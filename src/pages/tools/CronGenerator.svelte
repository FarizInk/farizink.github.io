<script lang="ts">
  import { Timer } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, Segmented, TextField } from '$lib/components/ds';
  import {
    CRON_FIELDS,
    CRON_MACROS,
    describeCron,
    nextRuns,
    parseCron,
    relativeFromNow,
    summarizeField,
    type CronTimeZone
  } from '$lib/tools/cron';

  const STORAGE_KEY = 'cronGenerator.expression';
  const TZ_KEY = 'cronGenerator.timeZone';
  const RUN_COUNT = 5;

  const presets = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Every 5 min', expr: '*/5 * * * *' },
    { label: 'Every 15 min', expr: '*/15 * * * *' },
    { label: 'Hourly', expr: '0 * * * *' },
    { label: 'Daily at midnight', expr: '0 0 * * *' },
    { label: 'Weekdays 09:00', expr: '0 9 * * 1-5' },
    { label: 'Weekly (Sun)', expr: '0 0 * * 0' },
    { label: 'Monthly', expr: '0 0 1 * *' },
    { label: 'Yearly', expr: '0 0 1 1 *' }
  ];

  const fieldTitles = ['Minute', 'Hour', 'Day of month', 'Month', 'Weekday'];

  function readStored(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  let expression = $state(readStored(STORAGE_KEY) ?? '0 9 * * 1-5');
  let timeZone = $state<string>(readStored(TZ_KEY) === 'UTC' ? 'UTC' : 'local');
  let now = $state(Date.now());

  const localZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local time';

  const result = $derived(parseCron(expression));
  const cron = $derived(result.ok ? result.cron : null);
  const error = $derived(result.ok ? null : result.error);
  const description = $derived(cron ? describeCron(cron) : '');
  const tz = $derived<CronTimeZone>(timeZone === 'UTC' ? 'UTC' : 'local');
  const schedule = $derived(cron ? nextRuns(cron, new Date(now), RUN_COUNT, tz) : null);

  /** Raw field texts for the breakdown, also when the expression is invalid. */
  const rawFields = $derived.by(() => {
    if (cron) return cron.expression.split(' ');
    const t = expression.trim();
    if (t.startsWith('@')) return CRON_MACROS[t.toLowerCase()]?.split(' ') ?? [];
    return t.split(/\s+/);
  });

  const breakdown = $derived(
    CRON_FIELDS.map((spec, i) => {
      const field = cron
        ? [cron.minute, cron.hour, cron.dayOfMonth, cron.month, cron.dayOfWeek][i]
        : null;
      return {
        title: fieldTitles[i],
        range: `${spec.min}–${spec.max}`,
        text: rawFields[i] ?? '',
        summary: field ? summarizeField(field) : '',
        invalid: error?.index === i
      };
    })
  );

  const formatter = $derived(
    new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: tz === 'UTC' ? 'UTC' : undefined
    })
  );

  // Keep relative times fresh and drop runs that have passed.
  $effect(() => {
    const id = setInterval(() => (now = Date.now()), 30_000);
    return () => clearInterval(id);
  });

  $effect(() => {
    const value = expression;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable */
    }
  });

  $effect(() => {
    const value = timeZone;
    try {
      localStorage.setItem(TZ_KEY, value);
    } catch {
      /* storage unavailable */
    }
  });
</script>

<ToolLayout
  title="Cron Expression Generator"
  description="Parse and explain standard 5-field cron expressions and preview the next run times in local time or UTC."
  icon={Timer}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
    <div class="flex min-w-0 flex-col gap-4">
      <section class="tool-card flex flex-col gap-5" aria-labelledby="cron-expr-title">
        <h2 id="cron-expr-title" class="section-title mb-0!">Expression</h2>
        <TextField
          label="Cron expression"
          mono
          bind:value={expression}
          error={error?.message}
          hint="minute hour day-of-month month weekday — names (JAN, MON) and @daily-style macros work too"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
        />

        <div class="flex flex-wrap items-center gap-3">
          <span class="text-label text-ink-muted">Copy</span>
          <CopyChip value={expression.trim()} />
        </div>

        <div class="flex flex-col gap-2">
          <span id="cron-presets-label" class="text-label text-ink-muted">Presets</span>
          <div class="flex flex-wrap gap-2" role="group" aria-labelledby="cron-presets-label">
            {#each presets as p (p.expr)}
              {@const active = cron?.expression === p.expr && !cron?.macro}
              <button
                type="button"
                class="quick-btn {active ? 'active' : ''}"
                aria-pressed={active}
                title={p.expr}
                onclick={() => (expression = p.expr)}
              >
                {p.label}
              </button>
            {/each}
          </div>
        </div>
      </section>

      <section class="tool-card flex flex-col gap-4" aria-labelledby="cron-fields-title">
        <h2 id="cron-fields-title" class="section-title mb-0!">Fields</h2>
        <dl class="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {#each breakdown as f, i (i)}
            <div
              class="flex min-w-0 flex-col gap-1 rounded-md p-3 {f.invalid
                ? 'bg-sunken'
                : 'bg-control'}"
            >
              <dt class="text-label {f.invalid ? 'text-negative' : 'text-ink-muted'}">
                {f.title}
                {#if f.invalid}<span class="sr-only">(invalid)</span><span aria-hidden="true">
                    ▼</span
                  >{/if}
              </dt>
              <dd class="m-0 flex min-w-0 flex-col gap-1">
                <span class="font-mono text-body-lg break-all text-ink">{f.text || '—'}</span>
                <span class="text-body-sm break-words text-ink-muted">
                  {#if f.invalid}
                    <span class="text-negative">invalid · range {f.range}</span>
                  {:else if f.summary}
                    {f.summary}
                  {:else}
                    range {f.range}
                  {/if}
                </span>
              </dd>
            </div>
          {/each}
        </dl>
      </section>
    </div>

    <div class="flex min-w-0 flex-col gap-4">
      <section
        class="flex flex-col gap-3 rounded-lg bg-tile-deep p-6 text-ink-on-dark"
        aria-labelledby="cron-desc-title"
      >
        <h2 id="cron-desc-title" class="text-label text-ink-on-dark-muted">In plain English</h2>
        {#if cron}
          <p class="text-title m-0" aria-live="polite">{description}</p>
          {#if cron.macro}
            <p class="text-body-sm m-0 text-ink-on-dark-muted">
              <span class="font-mono">{cron.macro}</span> =
              <span class="font-mono">{cron.expression}</span>
            </p>
          {/if}
        {:else}
          <p class="text-body m-0 text-ink-on-dark-muted">
            Fix the expression to see what it means.
          </p>
        {/if}
      </section>

      <section class="tool-card flex flex-col gap-4" aria-labelledby="cron-runs-title">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="cron-runs-title" class="section-title mb-0!">Next {RUN_COUNT} runs</h2>
          <Segmented
            label="Time zone"
            bind:value={timeZone}
            options={[
              { value: 'local', label: 'Local' },
              { value: 'UTC', label: 'UTC' }
            ]}
          />
        </div>
        <p class="text-body-sm m-0 text-ink-muted">
          Times in <span class="font-mono text-ink">{tz === 'UTC' ? 'UTC' : localZoneName}</span>
        </p>

        {#if !cron}
          <EmptyState
            title="No schedule"
            text="Enter a valid cron expression to preview its run times."
          />
        {:else if schedule?.impossible}
          <EmptyState
            title="Never runs"
            text="No month allows that day of the month, so this schedule can never fire."
          />
        {:else if schedule && schedule.runs.length === 0}
          <EmptyState title="No runs soon" text="This schedule doesn't fire in the next 5 years." />
        {:else if schedule}
          <ol class="m-0 flex list-none flex-col gap-2 p-0">
            {#each schedule.runs as run (run.getTime())}
              <li
                class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-md bg-control px-4 py-3"
              >
                <time datetime={run.toISOString()} class="font-mono text-body-sm text-ink"
                  >{formatter.format(run)}</time
                >
                <span class="text-body-sm text-ink-muted"
                  >{relativeFromNow(run, new Date(now))}</span
                >
              </li>
            {/each}
          </ol>
          {#if schedule.limitReached}
            <p class="text-body-sm m-0 text-ink-muted">
              Only {schedule.runs.length} run(s) in the next 5 years.
            </p>
          {/if}
        {/if}
      </section>
    </div>
  </div>
</ToolLayout>
