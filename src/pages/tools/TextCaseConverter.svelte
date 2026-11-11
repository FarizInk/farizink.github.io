<script lang="ts">
  import { Type } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, Segmented, Switch, Textarea } from '$lib/components/ds';
  import { convertAll } from '$lib/tools/textcase';

  const SAMPLE = [
    'XMLHttpRequest getHTTPResponseCode',
    'the lord of the rings: café olé!',
    'user_id field version2Beta 🙂'
  ].join('\n');

  const FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'code', label: 'Code cases' },
    { value: 'text', label: 'Text cases' }
  ];

  let text = $state('');
  let perLine = $state(false);
  let filter = $state('all');

  const hasInput = $derived(text.trim() !== '');
  const results = $derived(convertAll(text, { perLine }));
  const visible = $derived(filter === 'all' ? results : results.filter(r => r.group === filter));
</script>

<ToolLayout
  title="Text Case Converter"
  description="Convert text to camelCase, snake_case, kebab-case, Title Case and more — every case at once."
  icon={Type}
  color="warning"
>
  <div class="flex flex-col gap-4">
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="case-input-title">
      <h2 id="case-input-title" class="text-label text-ink-muted">Input</h2>

      <Textarea
        label="Text to convert"
        hint="Words are split on spaces, punctuation, _ - . / and camelCase humps. Accents and non-Latin letters are kept."
        rows={5}
        bind:value={text}
        placeholder="helloWorld, user_id field, The Lord of the Rings …"
      />

      <div class="flex flex-wrap items-center justify-between gap-4">
        <Switch
          label="Convert each line separately"
          description="Keep line breaks and convert every line on its own"
          bind:checked={perLine}
        />
        <div class="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onclick={() => (text = SAMPLE)}>Load sample</Button>
          <Button variant="ghost" size="sm" onclick={() => (text = '')} disabled={text === ''}
            >Clear</Button
          >
        </div>
      </div>
    </section>

    <section
      class="flex flex-col gap-5 rounded-lg bg-card p-6"
      aria-labelledby="case-results-title"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="case-results-title" class="text-label text-ink-muted">All cases</h2>
        <div class="w-full sm:w-auto">
          <Segmented label="Show cases" options={FILTERS} bind:value={filter} />
        </div>
      </div>

      {#if hasInput}
        <ul class="flex flex-col gap-2">
          {#each visible as r (r.id)}
            <li class="flex flex-col gap-3 rounded-md bg-sunken p-4 sm:flex-row sm:items-center">
              <span class="text-label shrink-0 text-ink-muted sm:w-40">{r.label}</span>
              {#if r.value.trim() !== ''}
                <output
                  class="min-w-0 flex-1 font-mono text-code whitespace-pre-wrap text-ink [overflow-wrap:anywhere]"
                  aria-label={r.label}>{r.value}</output
                >
                <div class="shrink-0">
                  <CopyChip value={r.value}>Copy<span class="sr-only"> {r.label}</span></CopyChip>
                </div>
              {:else}
                <span class="flex-1 text-body-sm text-ink-muted"
                  >No letters or digits to convert</span
                >
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        <EmptyState
          title="No text yet"
          text="Type or paste text above and every case appears here as you type."
        />
      {/if}
    </section>
  </div>
</ToolLayout>
