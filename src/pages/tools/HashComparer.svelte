<script lang="ts">
  import { ArrowUpDown, Hash } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, IconButton, Textarea } from '$lib/components/ds';
  import {
    compareDigests,
    detectAlgorithm,
    type DigestEncoding,
    type NormalizedDigest
  } from '$lib/tools/hashcompare';

  // SHA-256 of "hello world".
  const SAMPLE_HEX = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

  const ENCODING_LABEL: Record<DigestEncoding | 'empty', string> = {
    hex: 'Hex (case-insensitive)',
    base64: 'Base64 (case-sensitive)',
    base64url: 'Base64url (case-sensitive)',
    unknown: 'Unrecognized encoding',
    empty: ''
  };

  let expected = $state('');
  let actual = $state('');

  const result = $derived(compareDigests(expected, actual));
  const guesses = $derived([
    detectAlgorithm(result.left.value, result.left.encoding),
    detectAlgorithm(result.right.value, result.right.encoding)
  ]);
  const anyPasswordHash = $derived(!!(result.left.passwordHash || result.right.passwordHash));
  const both = $derived(result.status !== 'empty' && result.status !== 'waiting');

  function hintFor(d: NormalizedDigest, label: string): string {
    if (d.encoding === 'empty') return 'Hex, base64, an SRI value (sha256-…) or a sha256sum line.';
    if (d.passwordHash) return 'Looks like a salted password hash — see the note below.';
    const parts = [ENCODING_LABEL[d.encoding]];
    if (label) parts.push(label);
    if (d.filename) parts.push(`file: ${d.filename}`);
    return parts.join(' · ');
  }

  const status = $derived.by(() => {
    const r = result;
    const how =
      r.comparedAs === 'hex'
        ? 'Compared as hex, ignoring letter case.'
        : r.comparedAs === 'bytes'
          ? 'Different encodings — decoded and compared byte for byte (shown as hex below).'
          : 'Compared exactly — base64 and unrecognized text are case-sensitive.';
    switch (r.status) {
      case 'empty':
        return { tone: 'neutral', title: 'Paste two hashes to compare', text: 'Labels, prefixes and whitespace are ignored.' };
      case 'waiting':
        return { tone: 'neutral', title: 'Paste a second hash to compare', text: 'Nothing is compared until both fields have a value.' };
      case 'match':
        return { tone: 'live', title: '▲ Hashes match', text: how };
      case 'different-encoding':
        return { tone: 'live', title: '▲ Hashes match (different encoding)', text: how };
      default: {
        const extra =
          r.lengths[0] !== r.lengths[1] && r.comparedAs !== 'bytes'
            ? ` Lengths differ: ${r.lengths[0]} vs ${r.lengths[1]} characters.`
            : r.sameAlgorithm === false
              ? ' The digests look like different algorithms.'
              : '';
        return {
          tone: 'negative',
          title: `▼ Hashes differ at character ${(r.firstDifferenceIndex ?? 0) + 1}`,
          text: how + extra
        };
      }
    }
  });

  /** Split a digest at the first difference: same part, first differing char, and the rest. */
  function split(s: string, idx: number | null) {
    if (idx === null) return { same: s, first: '', rest: '' };
    return { same: s.slice(0, idx), first: s.slice(idx, idx + 1), rest: s.slice(idx + 1) };
  }
  const diffRows = $derived([
    { label: 'Expected', ...split(result.display[0], result.firstDifferenceIndex) },
    { label: 'Actual', ...split(result.display[1], result.firstDifferenceIndex) }
  ]);

  function swap() {
    [expected, actual] = [actual, expected];
  }

  function clearAll() {
    expected = '';
    actual = '';
  }

  function loadMatching() {
    expected = `${SAMPLE_HEX}  hello.txt`;
    actual = SAMPLE_HEX.toUpperCase();
  }

  function loadDifferent() {
    expected = SAMPLE_HEX;
    actual = SAMPLE_HEX.slice(0, 40) + '0' + SAMPLE_HEX.slice(41);
  }
</script>

<ToolLayout
  title="Hash Comparer"
  description="Compare two checksums precisely: hex is case-insensitive, base64 is exact, and you see where they differ."
  icon={Hash}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-label="Hashes">
    <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_auto_1fr]">
      <Textarea
        label="Expected hash"
        bind:value={expected}
        rows={4}
        mono
        class="break-all"
        placeholder="e.g. the checksum published on the download page"
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
        hint={hintFor(result.left, guesses[0].label)}
      />
      <div class="flex justify-center lg:pt-9">
        <IconButton label="Swap expected and actual" onclick={swap}>
          <ArrowUpDown class="lg:rotate-90" aria-hidden="true" />
        </IconButton>
      </div>
      <Textarea
        label="Actual hash"
        bind:value={actual}
        rows={4}
        mono
        class="break-all"
        placeholder="e.g. output of sha256sum on your file"
        spellcheck={false}
        autocomplete="off"
        autocapitalize="off"
        hint={hintFor(result.right, guesses[1].label)}
      />
    </div>
    <div class="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onclick={loadMatching}>Load matching sample</Button>
      <Button variant="secondary" size="sm" onclick={loadDifferent}>Load different sample</Button>
      <Button variant="ghost" size="sm" onclick={clearAll} disabled={!expected && !actual}>Clear</Button>
    </div>
  </section>

  <div class="rounded-lg bg-card p-6" role="status" aria-live="polite" aria-atomic="true">
    <p
      class="text-title m-0 {status.tone === 'live'
        ? 'text-live'
        : status.tone === 'negative'
          ? 'text-negative'
          : 'text-ink-muted'}"
    >
      {status.title}
    </p>
    <p class="text-body-sm m-0 mt-1 text-ink-muted">{status.text}</p>
  </div>

  {#if both}
    <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="hc-diff-title">
      <h2 id="hc-diff-title" class="section-title m-0">Side by side</h2>
      <p class="text-body-sm m-0 text-ink-muted">
        Normalized digests{result.comparedAs === 'bytes' ? ', both shown as hex' : ''}.
        {#if result.firstDifferenceIndex !== null}
          Highlighted from the first difference (character {result.firstDifferenceIndex + 1}) to the end.
        {/if}
      </p>
      <div class="grid grid-cols-1 gap-x-4 gap-y-1 rounded-md bg-sunken p-4 sm:grid-cols-[72px_1fr]">
        {#each diffRows as row, i (row.label)}
          <span class="text-label pt-0.5 text-ink-muted">{row.label}</span>
          <code class="text-code block min-w-0 break-all text-ink"
            >{row.same}{#if row.first}<mark class="rounded-[3px] bg-negative/35 text-ink">{row.first}</mark
              >{/if}{#if row.rest}<mark class="bg-negative/15 text-ink">{row.rest}</mark>{/if}</code
          >
          {#if i === 0 && result.firstDifferenceIndex !== null}
            <span class="hidden sm:block" aria-hidden="true"></span>
            <code class="text-code block min-w-0 break-all text-negative" aria-hidden="true"
              ><span class="invisible">{result.display[0].slice(0, result.firstDifferenceIndex)}</span>^</code
            >
          {/if}
        {/each}
      </div>
    </section>

    <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="hc-details-title">
      <h2 id="hc-details-title" class="section-title m-0">Details</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        {#each [result.left, result.right] as d, i (i)}
          <dl class="m-0 flex flex-col gap-2 rounded-md bg-sunken p-4 text-body-sm">
            <div class="text-label text-ink-muted">{i === 0 ? 'Expected' : 'Actual'}</div>
            <div class="flex justify-between gap-3">
              <dt class="text-ink-muted">Normalized length</dt>
              <dd class="m-0 font-mono text-ink tabular-nums">{result.lengths[i]} chars</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-ink-muted">Encoding</dt>
              <dd class="m-0 text-right text-ink">{ENCODING_LABEL[d.encoding]}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-ink-muted">Algorithm</dt>
              <dd class="m-0 text-right text-ink">{guesses[i].label}</dd>
            </div>
            {#if d.declaredAlgorithm}
              <div class="flex justify-between gap-3">
                <dt class="text-ink-muted">Labelled as</dt>
                <dd class="m-0 text-right text-ink">{d.declaredAlgorithm}</dd>
              </div>
            {/if}
            {#if d.prefix}
              <div class="flex justify-between gap-3">
                <dt class="text-ink-muted">Stripped prefix</dt>
                <dd class="m-0 font-mono text-ink">{d.prefix}</dd>
              </div>
            {/if}
            {#if d.filename}
              <div class="flex justify-between gap-3">
                <dt class="text-ink-muted">Filename</dt>
                <dd class="m-0 min-w-0 truncate font-mono text-ink" title={d.filename}>{d.filename}</dd>
              </div>
            {/if}
            <div class="pt-1">
              <CopyChip value={d.value}>Copy normalized</CopyChip>
            </div>
          </dl>
        {/each}
      </div>
      {#if result.sameAlgorithm !== null}
        <p class="text-body-sm m-0 text-ink-muted">
          Algorithm guesses {result.sameAlgorithm ? 'agree' : 'disagree'} — they come from digest length only, so
          they can't prove which algorithm produced a hash.
        </p>
      {/if}
    </section>
  {/if}

  <p class="text-body-sm m-0 px-2 {anyPasswordHash ? 'text-accent-text' : 'text-ink-muted'}">
    {#if anyPasswordHash}<strong>Note:</strong>{/if}
    This compares checksum digests (MD5, SHA-1, SHA-2) as text. Password hashes such as bcrypt or argon2 are salted, so
    the same password gives a different hash every time — they can't be compared this way; verify them with the
    library that created them. Everything runs in your browser.
  </p>
</ToolLayout>
