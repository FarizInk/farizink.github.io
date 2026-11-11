<script lang="ts">
  import { Calendar } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { BentoCard, BentoGrid, Button, CopyChip, StatTile, TextField } from '$lib/components/ds';
  import {
    ageSummary,
    calculateAge,
    formatAge,
    formatDateInput,
    formatDateLong,
    plural,
    todayLocal
  } from '../../lib/tools/age';

  // The viewer's local calendar date (WIB for the site owner), captured once on load.
  const today = todayLocal();
  const todayInput = formatDateInput(today);

  let birthInput = $state('');
  let targetInput = $state(todayInput);

  const result = $derived(calculateAge(birthInput, targetInput, today));
  const ok = $derived(result?.ok ? result : null);
  const birthError = $derived(result && !result.ok && result.field === 'birth' ? result.error : undefined);
  const targetError = $derived(result && !result.ok && result.field === 'target' ? result.error : undefined);
  const isToday = $derived(targetInput === todayInput);
  const summary = $derived(ok ? ageSummary(ok.birth, ok.target, ok.age) : '');

  const nextCaption = $derived.by(() => {
    if (!ok) return '';
    const { next } = ok;
    if (next.daysUntil === 0) return `Happy birthday! Turning ${next.turning} ${isToday ? 'today' : 'on this day'}.`;
    const when = isToday ? `in ${plural(next.daysUntil, 'day')}` : `${plural(next.daysUntil, 'day')} after the chosen date`;
    return `${when} · turning ${next.turning}`;
  });
</script>

<ToolLayout
  title="Age Calculator"
  description="Calculate an exact age in years, months and days, plus totals and the next birthday."
  icon={Calendar}
  color="warning"
>
  <section aria-labelledby="age-input-title" class="flex flex-col gap-5 rounded-lg bg-card p-6">
    <h2 id="age-input-title" class="text-title text-ink">Dates</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <TextField
        type="date"
        label="Date of birth"
        bind:value={birthInput}
        max={todayInput}
        error={birthError}
        autocomplete="bday"
      />
      <TextField
        type="date"
        label="Age at"
        bind:value={targetInput}
        error={targetError}
        hint={isToday ? 'Today (your local date)' : undefined}
      />
    </div>
    {#if !isToday}
      <div>
        <Button variant="secondary" size="sm" onclick={() => (targetInput = todayInput)}>Use today</Button>
      </div>
    {/if}
  </section>

  <div aria-live="polite" class="flex flex-col gap-4">
    {#if ok}
      {@const { age, next } = ok}
      <BentoGrid enter={false}>
        <BentoCard tone="violet" colSpan={4} size="lg" label="Age on {formatDateLong(ok.target)}">
          <p class="m-0 font-display text-[32px] leading-10 font-bold tracking-tight tabular-nums sm:text-[44px] sm:leading-[52px]">
            {formatAge(age)}
          </p>
          <div>
            <CopyChip value={summary}>Copy summary</CopyChip>
          </div>
        </BentoCard>

        <StatTile label="Total months" value={age.totalMonths.toLocaleString('en-US')} />
        <StatTile
          label="Weeks"
          value={age.totalWeeks.toLocaleString('en-US')}
          caption={age.weekRemainderDays ? `+ ${plural(age.weekRemainderDays, 'day')}` : 'exactly'}
        />
        <StatTile label="Total days" value={age.totalDays.toLocaleString('en-US')} />
        <StatTile label="Hours" value={age.approxHours.toLocaleString('en-US')} caption="≈ days × 24" />

        <BentoCard tone="deep" colSpan={4} label="Next birthday">
          <p class="m-0 text-title">{formatDateLong(next.date)}</p>
          <p class="m-0 text-body text-ink-on-dark">{nextCaption}</p>
          {#if next.shiftedFromLeapDay}
            <p class="m-0 text-body-sm text-ink-on-dark-muted">
              Feb 29 birthdays are counted on Feb 28 in non-leap years.
            </p>
          {/if}
        </BentoCard>
      </BentoGrid>
    {:else if !result}
      <p class="rounded-lg bg-card p-6 text-body text-ink-muted">
        Enter a date of birth to see the exact age, totals and the next birthday.
      </p>
    {/if}
  </div>
</ToolLayout>
