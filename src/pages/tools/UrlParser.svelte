<script lang="ts">
  import { untrack } from 'svelte';
  import { Link, Plus, X } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, IconButton, Switch, TextField } from '$lib/components/ds';
  import { buildUrl, parseUrl } from '$lib/tools/url';

  const SAMPLE =
    'https://al%20ice:s3cr%40t@shop.example.com:8443/docs/my%20file/index.html?q=hello%20world&tag=a+b&tag=c#section-2';

  interface Row {
    id: number;
    key: string;
    value: string;
    /** Source spelling + decoded original, for parsed rows only (hidden once the row is edited). */
    raw?: string;
    origKey?: string;
    origValue?: string;
  }

  let input = $state('');
  let showPassword = $state(false);

  const result = $derived(parseUrl(input));
  const url = $derived(result.kind === 'ok' ? result.url : null);

  // Editable params: reseeded from the parse whenever the URL changes, then edited freely.
  let nextId = 0;
  let rows = $state<Row[]>([]);
  $effect(() => {
    const params = url?.params ?? [];
    untrack(() => {
      rows = params.map(p => ({
        id: nextId++,
        key: p.key,
        value: p.value,
        raw: p.rawKey !== p.key || p.rawValue !== p.value ? `${p.rawKey}${p.rawValue ? `=${p.rawValue}` : ''}` : undefined,
        origKey: p.key,
        origValue: p.value
      }));
    });
  });

  const rebuilt = $derived(url ? buildUrl(url, rows) : '');
  const changed = $derived(!!url && rebuilt !== url.href);

  interface Detail {
    label: string;
    value: string;
    /** Shown instead of `value` (e.g. masked password, "443 (default)"). */
    display?: string;
    note?: string;
    secret?: boolean;
  }

  const details = $derived.by((): Detail[] => {
    if (!url) return [];
    const port = url.effectivePort
      ? `${url.effectivePort}${url.portImplicit ? ' (default)' : ''}`
      : '';
    const raw = (decoded: string, rawText: string) => (rawText !== decoded ? `raw: ${rawText}` : undefined);
    return [
      { label: 'href', value: url.href },
      {
        label: 'origin',
        value: url.origin ?? '',
        note: url.origin ? undefined : 'Opaque: only special schemes (http, https, ws, wss, ftp) have an origin.'
      },
      { label: 'protocol', value: url.protocol, note: url.assumedScheme ? 'Assumed: the input had no scheme.' : undefined },
      { label: 'username', value: url.username, note: raw(url.username, url.rawUsername) },
      {
        label: 'password',
        value: url.password,
        secret: true,
        display: url.password && !showPassword ? '•'.repeat(Math.min(url.password.length, 12)) : undefined,
        note: showPassword ? raw(url.password, url.rawPassword) : undefined
      },
      { label: 'host', value: url.host },
      {
        label: 'hostname',
        value: url.hostname,
        note: url.hostnameUnicode ? `Unicode: ${url.hostnameUnicode}` : undefined
      },
      {
        label: 'port',
        value: url.effectivePort,
        display: port,
        note: url.portImplicit ? `Not in the URL; the ${url.scheme} default.` : undefined
      },
      { label: 'pathname', value: url.pathname },
      { label: 'search', value: url.search },
      { label: 'hash', value: url.hash }
    ];
  });

  function loadSample() {
    input = SAMPLE;
  }

  function addRow() {
    rows.push({ id: nextId++, key: '', value: '' });
  }

  function removeRow(id: number) {
    rows = rows.filter(r => r.id !== id);
  }

  function useRebuilt() {
    input = rebuilt;
  }
</script>

<ToolLayout
  title="URL Parser"
  description="Inspect and edit any URL live: scheme, credentials, host, port, path, query parameters and fragment."
  icon={Link}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-label="Input">
    <TextField
      label="URL"
      bind:value={input}
      mono
      type="text"
      inputmode="url"
      placeholder="https://example.com/path?query=value#section"
      spellcheck={false}
      autocomplete="off"
      autocapitalize="off"
      error={result.kind === 'error' ? result.error : undefined}
      hint={url?.assumedScheme
        ? `No scheme given, so it was read as ${url.protocol}//…`
        : 'Parsed as you type with the browser’s URL parser. Any scheme works: ws:, mailto:, postgres: …'}
    />
    <div class="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onclick={loadSample}>Load sample</Button>
      <Button variant="ghost" size="sm" onclick={() => (input = '')} disabled={!input}>Clear</Button>
    </div>
  </section>

  {#if result.kind === 'empty'}
    <section class="rounded-lg bg-card" aria-label="Result">
      <EmptyState title="Nothing to parse yet" text="Type or paste a URL above, or load a sample with credentials, a port, an encoded path and repeated parameters.">
        {#snippet actions()}
          <Button variant="secondary" size="sm" onclick={loadSample}>Load sample</Button>
        {/snippet}
      </EmptyState>
    </section>
  {:else if url}
    <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="url-parts-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="url-parts-title" class="m-0 text-title">Components</h2>
        {#if url.password}
          <Switch label="Show password" bind:checked={showPassword} />
        {/if}
      </div>
      <dl class="m-0 flex flex-col gap-2">
        {#each details as d (d.label)}
          <div class="flex min-w-0 items-center gap-3 rounded-md bg-control py-3 pr-3 pl-4">
            <div class="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <dt class="shrink-0 font-mono text-label text-ink-muted sm:w-24">{d.label}</dt>
              <dd class="m-0 flex min-w-0 flex-1 flex-col gap-1">
                {#if d.value}
                  <code class="font-mono text-code break-all text-ink">{d.display ?? d.value}</code>
                {:else}
                  <span class="text-body-sm text-ink-muted">(none)</span>
                {/if}
                {#if d.label === 'pathname' && url.pathSegments.length > 1}
                  <ol class="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Decoded path segments">
                    {#each url.pathSegments as seg, i (i)}
                      <li class="rounded-pill bg-sunken px-2.5 py-0.5 font-mono text-label break-all text-ink">
                        <span class="text-ink-muted">{i + 1}</span> {seg || '(empty)'}
                      </li>
                    {/each}
                  </ol>
                {:else if d.label === 'pathname' && url.pathSegments.length === 1 && url.pathSegments[0] !== url.pathname.replace(/^\//, '')}
                  <span class="font-mono text-label break-all text-ink-muted">decoded: {url.pathSegments[0]}</span>
                {/if}
                {#if d.note}<span class="font-mono text-label break-all text-ink-muted">{d.note}</span>{/if}
              </dd>
            </div>
            {#if d.value}
              <div class="shrink-0">
                <CopyChip value={d.value}><span class="sr-only">Copy {d.label}</span></CopyChip>
              </div>
            {/if}
          </div>
        {/each}
      </dl>
    </section>

    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="url-params-title">
      <div class="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="url-params-title" class="m-0 text-title">Query parameters</h2>
        <span class="font-mono text-label text-ink-muted">{rows.length} {rows.length === 1 ? 'row' : 'rows'} · decoded</span>
      </div>

      {#if rows.length}
        <ol class="m-0 flex list-none flex-col gap-2 p-0">
          {#each rows as row, i (row.id)}
            <li class="flex min-w-0 items-start gap-2 rounded-md bg-sunken p-3">
              <div class="grid min-w-0 flex-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <TextField mono bind:value={row.key} placeholder="key" aria-label="Parameter {i + 1} key" spellcheck={false} autocomplete="off" autocapitalize="off" />
                <TextField mono bind:value={row.value} placeholder="value" aria-label="Parameter {i + 1} value" spellcheck={false} autocomplete="off" autocapitalize="off" />
                {#if row.raw && row.key === row.origKey && row.value === row.origValue}
                  <p class="m-0 font-mono text-label break-all text-ink-muted sm:col-span-2">raw: {row.raw}</p>
                {/if}
              </div>
              <div class="shrink-0 pt-0.5">
                <IconButton label="Remove parameter {i + 1}{row.key ? ` (${row.key})` : ''}" onclick={() => removeRow(row.id)}>
                  <X aria-hidden="true" />
                </IconButton>
              </div>
            </li>
          {/each}
        </ol>
      {:else}
        <p class="m-0 text-body-sm text-ink-muted">This URL has no query string. Add a parameter to build one.</p>
      {/if}

      <div>
        <Button variant="secondary" size="sm" onclick={addRow}>
          {#snippet icon()}<Plus class="size-4" aria-hidden="true" />{/snippet}
          Add parameter
        </Button>
      </div>

      <div class="flex min-w-0 flex-col gap-3 rounded-md bg-sunken p-4" aria-live="polite">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="m-0 font-mono text-label text-ink-muted">
            Rebuilt URL{#if changed}<span class="text-accent-text"> · edited</span>{/if}
          </h3>
          <div class="flex flex-wrap gap-2">
            {#if changed}
              <Button variant="ghost" size="sm" onclick={useRebuilt}>Use as input</Button>
            {/if}
            <CopyChip value={rebuilt}>Copy URL</CopyChip>
          </div>
        </div>
        <code class="font-mono text-code break-all text-ink">{rebuilt}</code>
      </div>
    </section>
  {/if}
</ToolLayout>
