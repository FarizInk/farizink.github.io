<script lang="ts">
  import { Calculator } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, Segmented, StatTile, Textarea, TextField } from '$lib/components/ds';
  import {
    LIMITS,
    READING_WPM,
    SPEAKING_WPM,
    formatBytes,
    formatCount,
    formatDuration,
    limitStatus,
    parseLimit,
    plural,
    smsInfo,
    statsSummary,
    textStats,
    type LimitStatus
  } from '$lib/tools/textstats';

  const SAMPLE = `Café notes — draft 2 ✍️

Ship the résumé to São Paulo by Friday! The config lives in C:\\Users\\fariz\\app.json, and the build is 3.2 MB.

Does 👍🏽 count as one character? Here it does: that's what people see, even though it's 2 code points, 4 UTF-16 units and 8 UTF-8 bytes.`;

  /** Above this many UTF-16 units, wait for a typing pause before recounting. */
  const DEBOUNCE_ABOVE = 100_000;

  let text = $state('');
  let analysed = $state('');
  let customInput = $state('');
  let customUnit = $state('graphemes');

  $effect(() => {
    const t = text;
    if (t.length <= DEBOUNCE_ABOVE) {
      analysed = t;
      return;
    }
    const id = setTimeout(() => (analysed = t), 250);
    return () => clearTimeout(id);
  });

  const stats = $derived(textStats(analysed));
  const sms = $derived(smsInfo(analysed));
  const pending = $derived(text !== analysed);
  const customMax = $derived(parseLimit(customInput));
  const customError = $derived(
    customInput.trim() && customMax === null ? 'Enter a whole number above 0' : undefined
  );

  const UNITS = [
    { value: 'graphemes', label: 'Characters' },
    { value: 'words', label: 'Words' },
    { value: 'utf8Bytes', label: 'UTF-8 bytes' }
  ];
  const unitCount = $derived(
    customUnit === 'words' ? stats.words : customUnit === 'utf8Bytes' ? stats.utf8Bytes : stats.graphemes
  );
  const unitName = $derived(
    customUnit === 'words' ? 'word' : customUnit === 'utf8Bytes' ? 'byte' : 'character'
  );

  interface Row {
    label: string;
    status: LimitStatus;
    unit: string;
    note?: string;
  }
  const rows = $derived<Row[]>([
    ...LIMITS.map(l => ({
      label: l.label,
      note: l.note,
      unit: 'character',
      status: limitStatus(stats.graphemes, l.max)
    })),
    ...(customMax ? [{ label: 'Custom', unit: unitName, status: limitStatus(unitCount, customMax) }] : [])
  ]);
  const smsStatus = $derived(limitStatus(sms.units, Math.max(sms.segments, 1) * sms.perSegment));

  const details = $derived([
    { label: 'Code points', value: formatCount(stats.codePoints) },
    { label: 'UTF-16 units', value: formatCount(stats.utf16Units) },
    { label: 'Sentences', value: formatCount(stats.sentences) },
    { label: 'Paragraphs', value: formatCount(stats.paragraphs) },
    { label: 'Letters', value: formatCount(stats.letters) },
    { label: 'Digits', value: formatCount(stats.digits) },
    { label: 'Whitespace', value: formatCount(stats.whitespace) },
    { label: 'Punctuation', value: formatCount(stats.punctuation) },
    { label: 'Symbols & emoji', value: formatCount(stats.symbols) },
    { label: `Reading · ${READING_WPM} wpm`, value: formatDuration(stats.readingSeconds) },
    { label: `Speaking · ${SPEAKING_WPM} wpm`, value: formatDuration(stats.speakingSeconds) }
  ]);
</script>

{#snippet bar(label: string, s: LimitStatus, unit: string, note?: string, extra?: string)}
  <li class="flex flex-col gap-2">
    <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <span class="text-body-sm text-ink">{label}</span>
      <span class="font-mono text-code tabular-nums text-ink">
        {formatCount(s.count)} / {formatCount(s.max)}
        {#if s.over}
          <span class="text-negative">· over by {plural(s.diff, unit)}</span>
        {:else}
          <span class="text-ink-muted">· {formatCount(s.diff)} left</span>
        {/if}
      </span>
    </div>
    <div class="h-2 overflow-hidden rounded-pill bg-sunken" aria-hidden="true">
      <div
        class="h-full rounded-pill transition-[width] duration-base ease-soft {s.over ? 'bg-negative' : 'bg-accent'}"
        style="width: {s.percent}%"
      ></div>
    </div>
    {#if extra}<span class="text-body-sm text-ink-muted">{extra}</span>{/if}
    {#if note}<span class="text-body-sm text-ink-muted">{note}</span>{/if}
  </li>
{/snippet}

<ToolLayout
  title="Character Counter"
  description="Count characters the way people see them, plus words, UTF-8 bytes, lines, SMS segments and common length limits."
  icon={Calculator}
  color="warning"
>
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6">
    <Textarea
      label="Text"
      bind:value={text}
      rows={10}
      placeholder="Type or paste text…"
      hint="Characters are counted as you see them: 👍🏽 and é count as 1."
    />
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm" onclick={() => (text = SAMPLE)}>Load sample</Button>
      <Button variant="ghost" size="sm" onclick={() => (text = '')} disabled={!text}>Clear</Button>
      {#if pending}<span class="text-body-sm text-ink-muted" role="status">Counting…</span>{/if}
      <span class="ml-auto"><CopyChip value={statsSummary(stats)}>Copy stats</CopyChip></span>
    </div>
  </section>

  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <StatTile label="Characters" tone="lilac" value={formatCount(stats.graphemes)} caption="as displayed" />
    <StatTile
      label="Words"
      value={formatCount(stats.words)}
      caption="{formatDuration(stats.readingSeconds)} to read"
    />
    <StatTile label="UTF-8 bytes" value={formatCount(stats.utf8Bytes)} caption={formatBytes(stats.utf8Bytes)} />
    <StatTile label="Lines" value={formatCount(stats.lines)} caption={plural(stats.paragraphs, 'paragraph')} />
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cc-details">
      <h2 id="cc-details" class="text-title m-0 text-ink">Details</h2>
      <dl class="m-0 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {#each details as d (d.label)}
          <div class="flex flex-col gap-1 rounded-md bg-control px-4 py-3">
            <dt class="text-label text-ink-muted">{d.label}</dt>
            <dd class="m-0 font-mono text-body tabular-nums text-ink">{d.value}</dd>
          </div>
        {/each}
      </dl>
    </section>

    <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="cc-limits">
      <h2 id="cc-limits" class="text-title m-0 text-ink">Limits</h2>
      <ul class="m-0 flex list-none flex-col gap-5 p-0">
        {#each rows.slice(0, 1) as r (r.label)}
          {@render bar(r.label, r.status, r.unit, r.note)}
        {/each}
        {@render bar(
          'SMS',
          smsStatus,
          'unit',
          sms.encoding === 'UCS-2'
            ? `Unicode forced by: ${sms.unicodeChars.slice(0, 8).join(' ')}${sms.unicodeChars.length > 8 ? ' …' : ''}`
            : '€ { } [ ] \\ ~ ^ | count as 2.',
          `${sms.encoding} · ${plural(sms.segments, 'segment')} of ${sms.perSegment}`
        )}
        {#each rows.slice(1) as r (r.label)}
          {@render bar(r.label, r.status, r.unit, r.note)}
        {/each}
      </ul>
      <div class="flex flex-col gap-3">
        <TextField
          label="Custom limit"
          type="text"
          inputmode="numeric"
          placeholder="e.g. 500"
          optional
          bind:value={customInput}
          error={customError}
        />
        <Segmented label="Custom limit counts" options={UNITS} bind:value={customUnit} />
      </div>
    </section>
  </div>
</ToolLayout>
