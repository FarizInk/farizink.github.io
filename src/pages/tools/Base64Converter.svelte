<script lang="ts">
  import { ArrowUpDown, Download, Hash } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import {
    Button,
    CopyChip,
    EmptyState,
    FileDrop,
    Icon,
    Segmented,
    Switch,
    Textarea,
    type UploadFile
  } from '$lib/components/ds';
  import {
    bytesToText,
    decodeToBytes,
    encodeBytes,
    extForMime,
    formatBytes,
    sniffMime,
    toDataUri,
    toHexPreview
  } from '$lib/tools/base64';

  type Mode = 'encode' | 'decode';
  type Source = 'text' | 'file';

  /** Outputs above this are only previewed; copy and download still use the full value. */
  const BIG_OUTPUT = 1_000_000;
  const PREVIEW_CHARS = 20_000;
  const MAX_FILE = 50 * 1024 * 1024;

  const SAMPLE_TEXT = 'Hello, Fariz! héllo 日本 🎉';
  const SAMPLE_B64 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  let mode = $state<Mode>('encode');
  let source = $state<Source>('text');
  let input = $state('');

  let urlSafe = $state(false);
  let noPadding = $state(false);
  let wrap76 = $state(false);
  let asDataUri = $state(false);

  // Per-mode file state and errors so Encode and Decode never clobber each other.
  let encFile = $state.raw<{ name: string; size: number; type: string; bytes: Uint8Array } | null>(null);
  let encFileError = $state('');
  let decFile = $state.raw<{ name: string; size: number; text: string } | null>(null);
  let decFileError = $state('');
  let reading = $state(false);
  let readToken = 0;

  const encoder = new TextEncoder();

  // ---- Encode ---------------------------------------------------------------
  const encodeOpts = $derived({
    urlSafe: !asDataUri && urlSafe,
    padding: asDataUri || !noPadding,
    lineWrap76: !asDataUri && wrap76
  });
  const textBytes = $derived(encoder.encode(input));
  const encoded = $derived.by(() => {
    if (source === 'text') {
      if (!input) return '';
      return asDataUri ? toDataUri(textBytes, 'text/plain;charset=utf-8') : encodeBytes(textBytes, encodeOpts);
    }
    if (!encFile) return '';
    if (asDataUri) {
      const mime = encFile.type || sniffMime(encFile.bytes)?.mime || 'application/octet-stream';
      return toDataUri(encFile.bytes, mime);
    }
    return encodeBytes(encFile.bytes, encodeOpts);
  });
  const encodeInputSize = $derived(source === 'text' ? textBytes.length : (encFile?.size ?? 0));

  // ---- Decode ---------------------------------------------------------------
  const decodeInput = $derived(source === 'text' ? input : (decFile?.text ?? ''));
  const decoded = $derived(decodeInput.trim() ? decodeToBytes(decodeInput) : null);
  const decodedBytes = $derived(decoded?.ok ? decoded.bytes : null);
  const decodeError = $derived(decoded && !decoded.ok ? decoded.error : '');
  const decodedText = $derived.by(() => {
    if (!decodedBytes) return null;
    const t = bytesToText(decodedBytes);
    // NUL bytes are valid UTF-8 but almost always mean binary data.
    return t.ok && !t.text.includes('\0') ? t.text : null;
  });
  const sniffed = $derived(decodedBytes ? sniffMime(decodedBytes) : null);
  const hexPreview = $derived(decodedBytes && decodedText === null ? toHexPreview(decodedBytes, 256) : '');

  // ---- Shared output ---------------------------------------------------------
  /** The textual output (Base64 when encoding, decoded text when decoding). */
  const output = $derived(mode === 'encode' ? encoded : (decodedText ?? ''));
  const isBig = $derived(output.length > BIG_OUTPUT);
  const shownOutput = $derived(isBig ? output.slice(0, PREVIEW_CHARS) : output);

  const canSwap = $derived(source === 'text' && output.length > 0);

  const fileRows = $derived.by<UploadFile[]>(() => {
    const f = mode === 'encode' ? encFile : decFile;
    if (!f) return [];
    return [{ name: f.name, meta: formatBytes(f.size), onremove: clearFile }];
  });

  const sizeLine = $derived.by(() => {
    if (mode === 'encode') {
      if (!encoded) return '';
      const pct = encodeInputSize ? Math.round((encoded.length / encodeInputSize - 1) * 100) : 0;
      return `Input ${formatBytes(encodeInputSize)} · Output ${encoded.length.toLocaleString()} chars${encodeInputSize ? ` (+${pct}%)` : ''}`;
    }
    if (!decodedBytes) return '';
    return `Input ${decodeInput.length.toLocaleString()} chars · Output ${formatBytes(decodedBytes.length)}`;
  });

  // ---- Actions -----------------------------------------------------------------
  function swap() {
    if (!canSwap) return;
    input = output;
    mode = mode === 'encode' ? 'decode' : 'encode';
    if (mode === 'encode') asDataUri = false;
  }

  function loadSample() {
    source = 'text';
    input = mode === 'encode' ? SAMPLE_TEXT : SAMPLE_B64;
  }

  function clearFile() {
    readToken++;
    reading = false;
    if (mode === 'encode') {
      encFile = null;
      encFileError = '';
    } else {
      decFile = null;
      decFileError = '';
    }
  }

  async function onFiles(files: FileList) {
    const file = files[0];
    if (!file) return;
    const forMode = mode;
    const token = ++readToken;
    const setError = (msg: string) => (forMode === 'encode' ? (encFileError = msg) : (decFileError = msg));
    setError('');
    if (file.size > MAX_FILE) {
      setError(`${file.name} is ${formatBytes(file.size)}; the limit is ${formatBytes(MAX_FILE)}.`);
      return;
    }
    reading = true;
    try {
      if (forMode === 'encode') {
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (token !== readToken) return;
        encFile = { name: file.name, size: file.size, type: file.type, bytes };
      } else {
        const text = await file.text();
        if (token !== readToken) return;
        decFile = { name: file.name, size: file.size, text };
      }
    } catch {
      if (token === readToken) setError(`Couldn't read ${file.name}.`);
    } finally {
      if (token === readToken) reading = false;
    }
  }

  function save(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadTxt() {
    const base = source === 'file' && encFile ? encFile.name : 'text';
    save(new Blob([encoded], { type: 'text/plain' }), `${base}.base64.txt`);
  }

  function downloadDecoded() {
    if (!decodedBytes) return;
    const mime = sniffed?.mime ?? (decoded?.ok ? decoded.mime : undefined);
    const ext = sniffed?.ext ?? extForMime(mime);
    const base = source === 'file' && decFile ? decFile.name.replace(/\.(b64|base64|txt)$/i, '').replace(/\.[^.]+$/, '') || 'decoded' : 'decoded';
    save(new Blob([decodedBytes as Uint8Array<ArrayBuffer>], { type: mime ?? 'application/octet-stream' }), `${base}.${ext}`);
  }

  function downloadDecodedText() {
    const base = source === 'file' && decFile ? decFile.name.replace(/\.[^.]+$/, '') || 'decoded' : 'decoded';
    save(new Blob([output], { type: 'text/plain;charset=utf-8' }), `${base}.txt`);
  }
</script>

<ToolLayout
  title="Base64 Converter"
  description="Encode and decode Base64 live — text or files, standard or URL-safe, with binary detection — all in your browser."
  icon={Hash}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-5 rounded-lg bg-card p-6" aria-label="Input">
    <div class="flex flex-wrap items-center gap-3">
      <Segmented
        label="Direction"
        bind:value={mode}
        options={[
          { value: 'encode', label: 'Encode' },
          { value: 'decode', label: 'Decode' }
        ]}
      />
      {#if source === 'text'}
        <Button
          variant="secondary"
          size="sm"
          onclick={swap}
          disabled={!canSwap}
          aria-label={mode === 'encode' ? 'Swap: use the Base64 output as input and switch to Decode' : 'Swap: use the decoded text as input and switch to Encode'}
        >
          {#snippet icon()}<ArrowUpDown class="size-4" aria-hidden="true" />{/snippet}
          Swap
        </Button>
      {/if}
      <div class="ml-auto">
        <Segmented
          label="Source"
          bind:value={source}
          options={[
            { value: 'text', label: 'Text' },
            { value: 'file', label: 'File' }
          ]}
        />
      </div>
    </div>

    {#if source === 'text'}
      {#if mode === 'encode'}
        <Textarea
          label="Text to encode"
          bind:value={input}
          rows={6}
          mono
          placeholder="Type or paste text — encoded as UTF-8 as you type"
          spellcheck={false}
          autocomplete="off"
          hint="Encoded live. Nothing is stored or sent anywhere."
        />
      {:else}
        <Textarea
          label="Base64 to decode"
          bind:value={input}
          rows={6}
          mono
          class="break-all"
          placeholder="Paste Base64 — standard or URL-safe, padding optional, data: URIs welcome"
          spellcheck={false}
          autocomplete="off"
          autocapitalize="off"
          error={decodeError || undefined}
          hint="Whitespace and line breaks are ignored. Missing = padding is restored."
        />
      {/if}
      <div class="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onclick={loadSample}>Load sample</Button>
        <Button variant="ghost" size="sm" onclick={() => (input = '')} disabled={!input}>Clear</Button>
      </div>
    {:else}
      <div class="flex flex-col gap-2">
        <p class="m-0 text-label text-ink-muted" id="b64-file-label">
          {mode === 'encode' ? 'File to encode' : 'Text file containing Base64'}
        </p>
        <div aria-labelledby="b64-file-label" role="group">
          <FileDrop
            hint={mode === 'encode'
              ? `Any file type · up to ${formatBytes(MAX_FILE)} · stays in your browser`
              : `A .txt / .b64 file with Base64 · up to ${formatBytes(MAX_FILE)}`}
            files={fileRows}
            onfiles={onFiles}
          />
        </div>
        {#if reading}
          <p class="m-0 text-body-sm text-ink-muted" role="status">Reading file…</p>
        {/if}
        {#if mode === 'encode' && encFileError}
          <p class="fz-field-error" role="alert"><Icon name="alert" class="size-[15px]" />{encFileError}</p>
        {/if}
        {#if mode === 'decode' && (decFileError || decodeError)}
          <p class="fz-field-error" role="alert"><Icon name="alert" class="size-[15px]" />{decFileError || decodeError}</p>
        {/if}
      </div>
    {/if}

    {#if mode === 'encode'}
      <fieldset class="m-0 flex flex-col gap-3 border-0 p-0">
        <legend class="mb-3 p-0 text-label text-ink-muted">Options</legend>
        <div class="grid gap-3 sm:grid-cols-2">
          <Switch bind:checked={urlSafe} label="URL-safe" description="- and _ instead of + and /" disabled={asDataUri} />
          <Switch bind:checked={noPadding} label="No padding" description="Drop trailing =" disabled={asDataUri} />
          <Switch bind:checked={wrap76} label="Wrap at 76" description="Line break every 76 chars (MIME)" disabled={asDataUri} />
          <Switch bind:checked={asDataUri} label="As data URI" description="data:<type>;base64,… (standard alphabet)" />
        </div>
      </fieldset>
    {/if}
  </section>

  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="b64-output-title">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex min-w-0 flex-col gap-1">
        <h2 id="b64-output-title" class="m-0 text-title">{mode === 'encode' ? 'Base64' : 'Decoded'}</h2>
        <p class="m-0 font-mono text-label text-ink-muted" aria-live="polite">{sizeLine}</p>
      </div>
      {#if output}
        <div class="flex flex-wrap items-center gap-2">
          <CopyChip value={output}>Copy output</CopyChip>
          {#if mode === 'encode' && (source === 'file' || isBig)}
            <Button variant="secondary" onclick={downloadTxt}>
              {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
              Download .txt
            </Button>
          {:else if mode === 'decode' && isBig}
            <Button variant="secondary" onclick={downloadDecodedText}>
              {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
              Download .txt
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if output}
      <pre
        class="m-0 max-h-[28rem] overflow-auto rounded-md bg-sunken p-4 font-mono text-code whitespace-pre-wrap text-ink [overflow-wrap:anywhere]"
        aria-label="Output (read only)">{shownOutput}</pre>
      {#if isBig}
        <p class="m-0 text-body-sm text-ink-muted">
          Showing the first {PREVIEW_CHARS.toLocaleString()} of {output.length.toLocaleString()} characters to keep the page responsive.
          Copy and download use the full output.
        </p>
      {/if}
    {:else if mode === 'decode' && decodedBytes && decodedText === null}
      <div class="flex flex-col gap-3">
        <p class="m-0 text-body text-ink">
          Binary data ({decodedBytes.length.toLocaleString()} bytes{sniffed ? `, looks like ${sniffed.label}` : ''})
        </p>
        <p class="m-0 text-body-sm text-ink-muted">
          Not valid UTF-8 text{decoded?.ok && decoded.mime ? ` · data URI type ${decoded.mime}` : ''}. Hex preview of the first bytes:
        </p>
        <pre
          class="m-0 overflow-auto rounded-md bg-sunken p-4 font-mono text-code text-ink"
          aria-label="Hex preview">{hexPreview}</pre>
        <div>
          <Button onclick={downloadDecoded}>
            {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
            Download file
          </Button>
        </div>
      </div>
    {:else if mode === 'decode' && decodedBytes}
      <p class="m-0 text-body-sm text-ink-muted">Decoded to 0 bytes.</p>
    {:else if (mode === 'decode' && decodeError) || (mode === 'encode' && encFileError) || (mode === 'decode' && decFileError)}
      <p class="m-0 text-body-sm text-ink-muted">Fix the input above to see the result.</p>
    {:else}
      <EmptyState
        title={mode === 'encode' ? 'Nothing to encode yet' : 'Nothing to decode yet'}
        text={source === 'text'
          ? mode === 'encode'
            ? 'Type some text above and its Base64 appears here as you type.'
            : 'Paste Base64 above — text is shown as text, anything else as a downloadable file.'
          : mode === 'encode'
            ? 'Drop a file above, or press Enter on the drop zone to browse.'
            : 'Drop a text file that contains Base64.'}
      />
    {/if}
  </section>
</ToolLayout>
