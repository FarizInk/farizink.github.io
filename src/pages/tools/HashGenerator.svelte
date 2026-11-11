<script lang="ts">
  import { Hash } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { CopyChip, EmptyState, FileDrop, Segmented, Switch, Textarea, TextField } from '$lib/components/ds';
  import {
    formatBytes,
    formatDigest,
    hashAll,
    matchesDigest,
    normalizeExpected,
    textToBytes,
    type DigestResult,
    type OutputEncoding
  } from '$lib/tools/hash';

  const SOURCES = [
    { value: 'text', label: 'Text' },
    { value: 'file', label: 'File' }
  ];
  const ENCODINGS = [
    { value: 'hex', label: 'Hex' },
    { value: 'base64', label: 'Base64' }
  ];
  /** Inputs above this many characters wait for typing to pause before hashing. */
  const DEBOUNCE_FROM = 10_000;

  let source = $state('text');
  let text = $state('');
  let file = $state<File | null>(null);
  let encoding = $state<OutputEncoding>('hex');
  let uppercase = $state(false);
  let expected = $state('');

  let results = $state<DigestResult[]>([]);
  let busy = $state(false);
  let error = $state('');
  // Bumped on every new input; a result is only applied if it belongs to the latest run.
  let run = 0;

  $effect(() => {
    const current = source;
    const input = text;
    const picked = file;
    const id = ++run;
    error = '';

    if (current === 'text') {
      busy = false;
      if (!input) {
        results = [];
        return;
      }
      const timer = setTimeout(
        async () => {
          const r = await hashAll(textToBytes(input));
          if (id === run) results = r;
        },
        input.length > DEBOUNCE_FROM ? 150 : 0
      );
      return () => clearTimeout(timer);
    }

    if (!picked) {
      busy = false;
      results = [];
      return;
    }
    busy = true;
    results = [];
    picked
      .arrayBuffer()
      .then(buf => hashAll(new Uint8Array(buf)))
      .then(r => {
        if (id === run) results = r;
      })
      .catch((e: unknown) => {
        if (id === run) error = `Could not read “${picked.name}”: ${e instanceof Error ? e.message : String(e)}`;
      })
      .finally(() => {
        if (id === run) busy = false;
      });
  });

  const byteCount = $derived(source === 'text' ? textToBytes(text).length : (file?.size ?? 0));
  const comparing = $derived(normalizeExpected(expected) !== '');

  const rows = $derived(
    results.map(r => ({
      algorithm: r.algorithm,
      value: formatDigest(r.bytes, encoding, uppercase),
      match: comparing && matchesDigest(expected, r.bytes)
    }))
  );
  const matched = $derived(rows.find(r => r.match)?.algorithm);

  const fileRows = $derived(
    file
      ? [
          {
            name: file.name,
            meta: `${formatBytes(file.size)} · ${file.type || 'unknown type'}`,
            onremove: () => (file = null)
          }
        ]
      : []
  );

  function pickFiles(list: FileList) {
    file = list[0] ?? null;
  }
</script>

<ToolLayout
  title="Hash Generator"
  description="MD5, SHA-1, SHA-256, SHA-384 and SHA-512 digests of text or a file, computed locally in your browser."
  icon={Hash}
  color="warning"
>
  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-label="Input">
    <div class="w-full sm:w-64">
      <Segmented label="Input source" options={SOURCES} bind:value={source} />
    </div>

    {#if source === 'text'}
      <Textarea
        label="Text to hash"
        bind:value={text}
        rows={6}
        mono
        placeholder="Paste or type text…"
        spellcheck={false}
        hint={text ? `${text.length.toLocaleString()} characters · ${byteCount.toLocaleString()} bytes (UTF-8)` : 'Hashed as UTF-8 as you type.'}
      />
    {:else}
      <FileDrop hint="Any file · read and hashed on this device, nothing is uploaded" files={fileRows} onfiles={pickFiles} />
    {/if}
  </section>

  <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-label="Digests">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div class="w-full sm:w-56">
        <Segmented label="Output encoding" options={ENCODINGS} bind:value={encoding as string} />
      </div>
      <Switch label="Uppercase hex" bind:checked={uppercase} disabled={encoding !== 'hex'} />
    </div>

    <TextField
      label="Compare with expected hash"
      optional
      mono
      bind:value={expected}
      placeholder="e.g. sha256:e3b0c442…"
      spellcheck={false}
      autocomplete="off"
      hint="Hex (any case) or Base64. Labels like sha256: or 0x are ignored."
    />

    <p class="sr-only" aria-live="polite">
      {#if busy}Hashing…{:else if comparing && rows.length}{matched ? `Matches ${matched}` : 'No algorithm matches'}{/if}
    </p>

    {#if error}
      <p class="text-body-sm text-negative" role="alert">▼ {error}</p>
    {:else if busy}
      <p class="text-body-sm text-ink-muted">Hashing {file?.name ?? 'file'}…</p>
    {:else if rows.length === 0}
      <EmptyState
        title="Nothing to hash yet"
        text={source === 'text' ? 'Type or paste text above to see every digest at once.' : 'Drop a file above or browse to pick one.'}
      />
    {:else}
      {#if comparing}
        <p class="text-body-sm {matched ? 'text-live' : 'text-negative'}">
          {#if matched}▲ Matches {matched}{:else}▼ No algorithm matches the expected hash{/if}
        </p>
      {/if}
      <ul class="flex flex-col gap-2">
        {#each rows as row (row.algorithm)}
          <li class="flex flex-col gap-3 rounded-md bg-control p-4 sm:flex-row sm:items-center">
            <div class="flex shrink-0 items-center gap-2 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
              <span class="text-label font-mono text-ink">{row.algorithm}</span>
              {#if row.match}
                <span class="text-label font-mono text-live">✓ Match</span>
              {/if}
            </div>
            <code class="min-w-0 flex-1 font-mono text-code break-all text-ink">{row.value}</code>
            <div class="shrink-0">
              <CopyChip value={row.value}>Copy<span class="sr-only"> {row.algorithm}</span></CopyChip>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</ToolLayout>
