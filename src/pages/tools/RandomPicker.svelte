<script lang="ts">
  import { Dices, Shuffle, Users } from '@lucide/svelte';
  import { fly } from 'svelte/transition';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EASE, EmptyState, Segmented, Switch, TextField, Textarea, dur } from '$lib/components/ds';
  import {
    parseItems,
    pickMany,
    removeLines,
    shuffle,
    splitIntoGroups,
    validateItems,
    type Item
  } from '$lib/tools/random';

  type Mode = 'pick' | 'shuffle' | 'teams';
  type Result =
    | { id: number; mode: 'pick' | 'shuffle'; items: string[] }
    | { id: number; mode: 'teams'; groups: string[][] };
  interface HistoryEntry {
    id: number;
    label: string;
    text: string;
    at: Date;
  }

  const STORAGE_KEY = 'randomPicker.items';
  const HISTORY_MAX = 10;
  const PLACEHOLDER = 'Alice\nBob\nCarol';
  const SAMPLE = 'Alice\nBob\nCarol\nDave\nEve\nFrank\nGrace\nHeidi';
  const MODES = [
    { value: 'pick', label: 'Pick' },
    { value: 'shuffle', label: 'Shuffle' },
    { value: 'teams', label: 'Teams' }
  ];
  const MODE_LABEL: Record<Mode, string> = { pick: 'Pick', shuffle: 'Shuffle', teams: 'Teams' };

  function loadSaved(): string {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  }

  let text = $state(loadSaved());
  let mode = $state<string>('pick');
  let picks = $state<number | null>(1);
  let groupCount = $state<number | null>(2);
  let noRepeats = $state(true);
  let useWeights = $state(false);
  let removePicked = $state(false);
  let result = $state<Result | null>(null);
  let runError = $state('');
  let history = $state<HistoryEntry[]>([]);
  let nextId = 1;

  $effect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {
      /* storage blocked: list just isn't remembered */
    }
  });

  const items = $derived(parseItems(text, { weights: useWeights }));
  const itemError = $derived(
    items.length === 0 ? 'Add at least one item.' : mode === 'pick' ? validateItems(items, useWeights) : null
  );
  const picksError = $derived.by(() => {
    if (mode !== 'pick') return '';
    if (picks === null || !Number.isFinite(picks)) return 'Enter how many items to pick.';
    if (!Number.isInteger(picks) || picks < 1) return 'Use a whole number of 1 or more.';
    if (noRepeats && items.length > 0 && picks > items.length) {
      return `Only ${items.length} item${items.length === 1 ? '' : 's'} — pick fewer or turn off No repeats.`;
    }
    return '';
  });
  const groupsError = $derived.by(() => {
    if (mode !== 'teams') return '';
    if (groupCount === null || !Number.isFinite(groupCount)) return 'Enter how many groups to make.';
    if (!Number.isInteger(groupCount) || groupCount < 2) return 'Use a whole number of 2 or more.';
    if (items.length > 0 && groupCount > items.length) return `Only ${items.length} items — make fewer groups.`;
    return '';
  });
  const canRun = $derived(!itemError && !picksError && !groupsError);
  const runLabel = $derived(mode === 'pick' ? (picks === 1 ? 'Pick one' : 'Pick') : mode === 'shuffle' ? 'Shuffle' : 'Make teams');

  const resultText = $derived.by(() => {
    if (!result) return '';
    if (result.mode === 'teams') return result.groups.map((g, i) => `Group ${i + 1}: ${g.join(', ')}`).join('\n');
    return result.items.join('\n');
  });

  function names(list: Item[]): string[] {
    return list.map(i => i.text);
  }

  function run() {
    if (!canRun) return;
    runError = '';
    const id = nextId++;
    try {
      if (mode === 'pick') {
        const picked = pickMany(items, picks as number, { unique: noRepeats, weighted: useWeights });
        result = { id, mode: 'pick', items: names(picked) };
        if (removePicked) text = removeLines(text, picked.map(p => p.line));
      } else if (mode === 'shuffle') {
        result = { id, mode: 'shuffle', items: names(shuffle(items)) };
      } else {
        result = { id, mode: 'teams', groups: splitIntoGroups(items, groupCount as number).map(names) };
      }
    } catch (e) {
      runError = e instanceof Error ? e.message : 'Something went wrong.';
      result = null;
      return;
    }
    const label = MODE_LABEL[mode as Mode];
    history = [{ id, label, text: resultText, at: new Date() }, ...history].slice(0, HISTORY_MAX);
  }

  function onTextareaKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run();
    }
  }

  function clearList() {
    text = '';
    result = null;
  }

  const timeFmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
</script>

<ToolLayout
  title="Random Picker"
  description="Pick, shuffle or split a list into teams — fairly, with your browser's cryptographic random generator."
  icon={Shuffle}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-[3fr_2fr]">
    <!-- List -->
    <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="rp-list-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="rp-list-title" class="text-label text-ink-muted">Your list</h2>
        <p class="text-body-sm text-ink-muted" aria-live="polite">
          {items.length} item{items.length === 1 ? '' : 's'}
        </p>
      </div>
      <Textarea
        label="Items, one per line"
        hint={useWeights
          ? 'Paste a list. End a line with * 3 to make it 3× as likely. Ctrl+Enter runs.'
          : 'Paste a list — empty lines are ignored. Ctrl+Enter runs.'}
        rows={10}
        placeholder={PLACEHOLDER}
        spellcheck="false"
        bind:value={text}
        onkeydown={onTextareaKey}
      />
      <div class="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onclick={() => (text = SAMPLE)}>Load sample</Button>
        <Button size="sm" variant="ghost" onclick={clearList} disabled={!text}>Clear</Button>
      </div>
    </section>

    <!-- Options -->
    <section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="rp-options-title">
      <h2 id="rp-options-title" class="text-label text-ink-muted">Options</h2>
      <Segmented label="Mode" options={MODES} bind:value={mode} />

      {#if mode === 'pick'}
        <TextField
          label="Number of picks"
          type="number"
          inputmode="numeric"
          min={1}
          max={noRepeats ? Math.max(items.length, 1) : undefined}
          step={1}
          bind:value={picks}
          error={picksError || undefined}
        />
        <div class="flex flex-col gap-3">
          <Switch label="No repeats" description="Each item can come up at most once" bind:checked={noRepeats} />
          <Switch
            label="Use weights"
            description="End a line with * 3 to make it 3× as likely (e.g. Pizza * 3)"
            bind:checked={useWeights}
          />
          <Switch
            label="Remove picked from list"
            description="Elimination draw: picked lines are deleted after each pick"
            bind:checked={removePicked}
          />
        </div>
      {:else if mode === 'teams'}
        <TextField
          label="Number of groups"
          type="number"
          inputmode="numeric"
          min={2}
          max={Math.max(items.length, 2)}
          step={1}
          bind:value={groupCount}
          error={groupsError || undefined}
          hint="Group sizes differ by at most one."
        />
      {:else}
        <p class="text-body-sm text-ink-muted">Puts the whole list in a random order. Every order is equally likely.</p>
      {/if}

      {#if itemError && items.length > 0}
        <p class="text-body-sm text-negative">▼ {itemError}</p>
      {/if}

      <Button onclick={run} disabled={!canRun} class="mt-auto w-full">
        {#snippet icon()}
          {#if mode === 'teams'}<Users class="size-4" />{:else if mode === 'shuffle'}<Shuffle class="size-4" />{:else}<Dices
              class="size-4"
            />{/if}
        {/snippet}
        {runLabel}
      </Button>
    </section>
  </div>

  <!-- Result -->
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="rp-result-title">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 id="rp-result-title" class="text-label text-ink-muted">Result</h2>
      {#if result}
        <CopyChip value={resultText}>Copy results</CopyChip>
      {/if}
    </div>

    <div aria-live="polite" aria-atomic="true">
      {#if runError}
        <p class="text-body text-negative" role="alert">▼ {runError}</p>
      {:else if !result}
        <EmptyState
          title="Nothing drawn yet"
          text={items.length ? `Choose a mode and press ${runLabel}.` : 'Add some items to your list, or load the sample.'}
        />
      {:else}
        {#key result.id}
          <div in:fly={{ y: 8, duration: dur(240), easing: EASE.soft }}>
            {#if result.mode === 'teams'}
              <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {#each result.groups as group, gi (gi)}
                  <div class="flex flex-col gap-2 rounded-md bg-control p-4">
                    <h3 class="text-label text-ink-muted">Group {gi + 1} · {group.length}</h3>
                    <ul class="m-0 flex list-none flex-col gap-1 p-0">
                      {#each group as name, ni (ni)}
                        <li class="text-body break-words text-ink">{name}</li>
                      {/each}
                    </ul>
                  </div>
                {/each}
              </div>
            {:else if result.items.length === 1}
              <p class="rounded-md bg-sunken px-5 py-6 text-center font-display text-display break-words text-ink">
                {result.items[0]}
              </p>
            {:else}
              <ol class="m-0 flex list-none flex-col gap-2 p-0">
                {#each result.items as name, i (i)}
                  <li class="flex items-baseline gap-3 rounded-md bg-control px-4 py-3">
                    <span class="w-6 shrink-0 text-right font-mono text-body-sm text-ink-muted">{i + 1}</span>
                    <span class="text-body break-words text-ink">{name}</span>
                  </li>
                {/each}
              </ol>
            {/if}
          </div>
        {/key}
      {/if}
    </div>
  </section>

  <!-- History -->
  {#if history.length}
    <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="rp-history-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="rp-history-title" class="text-label text-ink-muted">Recent results</h2>
        <Button size="sm" variant="ghost" onclick={() => (history = [])}>Clear history</Button>
      </div>
      <ul class="m-0 flex list-none flex-col gap-2 p-0">
        {#each history as entry (entry.id)}
          <li class="flex flex-col gap-1 rounded-md bg-control px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4">
            <span class="shrink-0 font-mono text-body-sm text-ink-muted">{entry.label} · {timeFmt(entry.at)}</span>
            <span class="text-body-sm break-words whitespace-pre-line text-ink">{entry.text}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</ToolLayout>
