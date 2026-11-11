<script lang="ts">
  import { Activity, RotateCcw } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, Segmented, Select, StatTile, TextField, type Option } from '$lib/components/ds';
  import {
    STANDARDS,
    adultCategoriesApply,
    bmiPrime,
    classify,
    cmToFtIn,
    computeBmi,
    distanceToRange,
    ftInToCm,
    healthyWeightRange,
    kgToLb,
    lbToKg,
    parseAge,
    parseDecimal,
    plain,
    rangeText,
    type CategoryKey,
    type Standard,
    type Units
  } from '$lib/tools/bmi';

  let units = $state<Units>('metric');
  let standard = $state<Standard>('asia');
  let weightText = $state('');
  let cmText = $state('');
  let ftText = $state('');
  let inText = $state('');
  let ageText = $state('');

  const unitOptions = [
    { value: 'metric', label: 'Metric (kg, cm)' },
    { value: 'imperial', label: 'Imperial (lb, ft)' }
  ];
  const standardOptions: Option[] = (['asia', 'kemenkes', 'who'] as const).map((s) => ({
    value: s,
    label: STANDARDS[s].name
  }));

  const NOT_NUMBER = 'Enter a positive number, e.g. 70 or 70,5.';

  // ---- Parsing (live) ----
  const weightNum = $derived(parseDecimal(weightText));
  const cmNum = $derived(parseDecimal(cmText));
  const ftNum = $derived(parseDecimal(ftText));
  const inNum = $derived(parseDecimal(inText));
  const ageParsed = $derived(parseAge(ageText));

  const weightKg = $derived(weightNum === null ? null : units === 'metric' ? weightNum : lbToKg(weightNum));
  const inchError = $derived(
    Number.isNaN(inNum) ? NOT_NUMBER : inNum !== null && inNum >= 12 ? 'Inches must be under 12.' : undefined
  );
  const heightCm = $derived.by(() => {
    if (units === 'metric') return cmNum;
    if (ftNum === null && inNum === null) return null;
    return ftInToCm(ftNum ?? 0, inNum ?? 0);
  });

  const result = $derived(
    weightKg !== null && heightCm !== null && !inchError ? computeBmi(weightKg, heightCm, units) : null
  );
  const bmi = $derived(result?.ok ? result : null);

  // Field errors: syntax errors right away, range errors once both values are there.
  const rangeErr = (f: 'weight' | 'height') => (result && !result.ok && result.field === f ? result.error : undefined);
  const weightError = $derived(Number.isNaN(weightNum) ? NOT_NUMBER : rangeErr('weight'));
  const cmError = $derived(Number.isNaN(cmNum) ? NOT_NUMBER : rangeErr('height'));
  const ftError = $derived(Number.isNaN(ftNum) ? NOT_NUMBER : inchError ? undefined : rangeErr('height'));

  const adult = $derived(adultCategoriesApply(ageParsed.ok ? ageParsed.age : null));
  const category = $derived(bmi ? classify(bmi.bmi, standard) : null);
  const healthy = $derived(heightCm !== null && bmi ? healthyWeightRange(heightCm, standard) : null);
  const distance = $derived(healthy && weightKg !== null ? distanceToRange(weightKg, healthy) : null);

  const wUnit = $derived(units === 'metric' ? 'kg' : 'lb');
  const toUnit = (kg: number) => plain(units === 'metric' ? kg : kgToLb(kg));
  const healthyText = $derived(healthy ? `${toUnit(healthy.min)}–${toUnit(healthy.max)} ${wUnit}` : '');
  const distanceText = $derived.by(() => {
    if (!distance) return '';
    if (distance.direction === 'within') return 'Your weight is inside this range.';
    const amount = `${toUnit(distance.kg)} ${wUnit}`;
    return distance.direction === 'lose' ? `${amount} above the range.` : `${amount} below the range.`;
  });

  // ---- Scale (positions proportional to BMI value) ----
  const MIN = 15;
  const MAX = 40;
  const pos = (v: number) => ((Math.min(MAX, Math.max(MIN, v)) - MIN) / (MAX - MIN)) * 100;
  const fill: Record<CategoryKey, string> = {
    underweight: 'bg-tile-lilac',
    normal: 'bg-live',
    overweight: 'bg-accent',
    obese1: 'bg-negative/55',
    obese2: 'bg-negative/80',
    obese3: 'bg-negative'
  };
  const segments = $derived(
    STANDARDS[standard].bands.map((b, i, all) => {
      const start = pos(b.min ?? MIN);
      const next = all[i + 1]?.min;
      return { ...b, range: rangeText(b), left: start, width: pos(next ?? MAX) - start };
    })
  );
  const ticks = $derived(STANDARDS[standard].bands.filter((b) => b.min !== null).map((b) => b.min as number));

  // ---- Actions ----
  function switchUnits(next: string) {
    const to: Units = next === 'imperial' ? 'imperial' : 'metric';
    if (to === units) return;
    const w = weightKg !== null && Number.isFinite(weightKg) ? weightKg : null;
    const h = heightCm !== null && Number.isFinite(heightCm) && !inchError ? heightCm : null;
    if (to === 'imperial') {
      weightText = w === null ? '' : plain(kgToLb(w));
      const fi = h === null ? null : cmToFtIn(h);
      ftText = fi ? String(fi.ft) : '';
      inText = fi ? plain(fi.in) : '';
    } else {
      weightText = w === null ? '' : plain(w);
      cmText = h === null ? '' : plain(h);
    }
    units = to;
  }

  function reset() {
    weightText = cmText = ftText = inText = ageText = '';
  }
</script>

<ToolLayout
  title="BMI Calculator"
  description="Body Mass Index with Asia-Pacific, Kemenkes RI and WHO cut-offs, plus the healthy weight range for your height."
  icon={Activity}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="bmi-input-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="bmi-input-title" class="text-label text-ink-muted">Your measurements</h2>
        <Button variant="ghost" size="sm" onclick={reset}>
          {#snippet icon()}<RotateCcw class="size-4" />{/snippet}
          Reset
        </Button>
      </div>

      <div class="flex flex-col gap-2">
        <span class="fz-field-label">Units</span>
        <Segmented label="Units" options={unitOptions} value={units} onchange={switchUnits} />
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <TextField label="Weight" suffix={wUnit} inputmode="decimal" autocomplete="off" placeholder={units === 'metric' ? '70' : '154'} error={weightError} bind:value={weightText} class="tabular-nums" />
        {#if units === 'metric'}
          <TextField label="Height" suffix="cm" inputmode="decimal" autocomplete="off" placeholder="170" error={cmError} bind:value={cmText} class="tabular-nums" />
        {:else}
          <div class="grid grid-cols-2 gap-3">
            <TextField label="Height (feet)" suffix="ft" inputmode="decimal" autocomplete="off" placeholder="5" error={ftError} bind:value={ftText} class="tabular-nums" />
            <TextField label="Height (inches)" suffix="in" inputmode="decimal" autocomplete="off" placeholder="7" error={inchError} bind:value={inText} class="tabular-nums" />
          </div>
        {/if}
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <TextField label="Age" optional suffix="years" inputmode="numeric" autocomplete="off" placeholder="30" hint="Adult categories apply from 18." error={ageParsed.ok ? undefined : ageParsed.error} bind:value={ageText} class="tabular-nums" />
        <Select label="Standard" options={standardOptions} bind:value={standard} hint={STANDARDS[standard].note} />
      </div>
    </section>

    <section class="flex flex-col gap-4" aria-labelledby="bmi-result-title" aria-live="polite">
      <h2 id="bmi-result-title" class="sr-only">Result</h2>
      {#if bmi && !adult}
        <StatTile tone="deep" label="Your BMI" value={bmi.rounded.toFixed(1)} caption="Under 18: adult categories don't apply." />
        <div class="flex flex-col gap-2 rounded-lg bg-card p-6">
          <h3 class="text-label text-ink-muted">Children and teens</h3>
          <p class="text-body text-ink">
            Below 18, BMI is judged against age- and sex-specific percentile charts (WHO growth charts, or the KMS / Permenkes
            No. 2 Tahun 2020 standards in Indonesia). This tool doesn't include those charts, so it shows no category or
            healthy range. Ask a doctor or Posyandu to plot it.
          </p>
        </div>
      {:else if bmi && category}
        <StatTile
          tone="deep"
          label="Your BMI · {STANDARDS[standard].name}"
          value={bmi.rounded.toFixed(1)}
          caption="{category.label} ({category.range}) · BMI Prime {bmiPrime(bmi.bmi, standard).toFixed(2)}"
        />

        <div class="flex flex-col gap-4 rounded-lg bg-card p-6">
          <div class="flex items-center gap-2">
            <span class="size-3 shrink-0 rounded-pill {fill[category.key]}" aria-hidden="true"></span>
            <p class="text-body-lg font-medium text-ink">{category.label}</p>
          </div>
          <dl class="flex flex-col gap-2 text-body">
            <div class="flex items-baseline justify-between gap-4">
              <dt class="text-ink-muted">Healthy weight for your height</dt>
              <dd class="font-mono tabular-nums text-ink">{healthyText}</dd>
            </div>
          </dl>
          <p class="text-body-sm text-ink-muted">{distanceText}</p>

          <div
            class="flex flex-col gap-1 pt-2"
            role="img"
            aria-label="Scale: BMI {bmi.rounded.toFixed(1)} falls in {category.label}, {category.range}."
          >
            <div class="relative h-5">
              <span
                class="absolute top-0 -translate-x-1/2 font-mono text-[11px] leading-4 text-ink"
                style="left: {pos(bmi.bmi)}%"
                aria-hidden="true">▼</span
              >
            </div>
            <div class="relative h-3 overflow-hidden rounded-pill bg-sunken">
              {#each segments as s (s.key)}
                <span class="absolute inset-y-0 {fill[s.key]}" style="left: {s.left}%; width: {s.width}%"></span>
              {/each}
            </div>
            <div class="relative h-5 font-mono text-[11px] leading-5 text-ink-muted" aria-hidden="true">
              {#each ticks as t (t)}
                <span class="absolute top-0 -translate-x-1/2 tabular-nums" style="left: {pos(t)}%">{t.toFixed(1)}</span>
              {/each}
            </div>
          </div>

          <ul class="grid gap-1.5 text-body-sm sm:grid-cols-2" aria-label="Categories">
            {#each segments as s (s.key)}
              <li class="flex items-center gap-2 {s.key === category.key ? 'font-medium text-ink' : 'text-ink-muted'}">
                <span class="size-2.5 shrink-0 rounded-pill {fill[s.key]}" aria-hidden="true"></span>
                {s.label} <span class="font-mono tabular-nums">{s.range}</span>
                {#if s.key === category.key}<span class="sr-only">(you)</span><span aria-hidden="true">◀</span>{/if}
              </li>
            {/each}
          </ul>
        </div>
      {:else}
        <div class="flex flex-col gap-2 rounded-lg bg-card p-6">
          <h3 class="text-label text-ink-muted">Your BMI</h3>
          <p class="text-body text-ink-muted">
            {#if weightError || cmError || ftError || inchError}
              ▼ Fix the highlighted field to see your BMI.
            {:else}
              Enter your weight and height to see your BMI.
            {/if}
          </p>
        </div>
      {/if}
      <p class="px-2 text-body-sm text-ink-muted">
        BMI is a screening number, not a diagnosis: it doesn't see muscle, frame or where fat sits.
      </p>
    </section>
  </div>
</ToolLayout>
