<script lang="ts">
  import { FileText } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, Switch, Textarea, TextField } from '$lib/components/ds';
  import {
    claimDate,
    decodeJwt,
    isHmacAlg,
    relativeTime,
    verifyHmac,
    type FindingLevel,
    type VerifyStatus
  } from '$lib/tools/jwt';

  // HS256 sample signed with SAMPLE_SECRET; UTF-8 claims and a `-` in the signature on purpose.
  const SAMPLE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkrDtmhuIETFkyIsImxvY2FsZSI6IuaXpeacrCIsImlzcyI6Imh0dHBzOi8vZmFyaXouZGV2IiwiYXVkIjoiZmFyaXppbmstdG9vbHMiLCJpYXQiOjE3NjI4MTkyMDAsImV4cCI6NDEwMjQ0NDgwMCwianRpIjoic2FtcGxlLTAxIn0.Vpo57i8pt8Ido-jE1opXccqWa2cnkSOXs2YmLafUBp8';
  const SAMPLE_SECRET = 'fariz-sample-secret';

  const CLAIMS = [
    ['iss', 'Issuer'],
    ['sub', 'Subject'],
    ['aud', 'Audience'],
    ['exp', 'Expires'],
    ['nbf', 'Not before'],
    ['iat', 'Issued at'],
    ['jti', 'JWT ID']
  ] as const;

  const LEVEL: Record<FindingLevel, { marker: string; cls: string }> = {
    error: { marker: '▼', cls: 'text-negative' },
    warning: { marker: 'Warning:', cls: 'text-accent-text' },
    info: { marker: 'Note:', cls: 'text-ink-muted' }
  };

  // Tokens are credentials: kept in memory only, never persisted.
  let input = $state('');
  let secret = $state('');
  let secretBase64 = $state(false);

  // Ticks so relative times ("expires in 3 h") and expiry findings stay current.
  let now = $state(Date.now());
  $effect(() => {
    const timer = setInterval(() => (now = Date.now()), 30_000);
    return () => clearInterval(timer);
  });

  const decoded = $derived(decodeJwt(input, now));
  const jws = $derived(decoded.kind === 'jws' ? decoded : null);
  const header = $derived(decoded.kind === 'jws' || decoded.kind === 'jwe' ? decoded.header : null);
  const headerJson = $derived(header ? JSON.stringify(header, null, 2) : '');
  const payloadJson = $derived(jws ? JSON.stringify(jws.payload, null, 2) : '');
  const alg = $derived(decoded.kind === 'jws' || decoded.kind === 'jwe' ? decoded.alg : undefined);
  const algNone = $derived(alg?.toLowerCase() === 'none');

  /** The token split into labelled, coloured parts. */
  const pieces = $derived.by(() => {
    if (decoded.kind === 'jws') {
      return [
        { label: 'Header', text: decoded.segments.header, cls: 'text-accent-text' },
        { label: 'Payload', text: decoded.segments.payload, cls: 'text-live' },
        { label: 'Signature', text: decoded.segments.signature, cls: 'text-ink-muted' }
      ];
    }
    if (decoded.kind === 'jwe') {
      const names = ['Header', 'Encrypted key', 'IV', 'Ciphertext', 'Tag'];
      return decoded.parts.map((text, i) => ({
        label: names[i],
        text,
        cls: i === 0 ? 'text-accent-text' : 'text-ink-muted'
      }));
    }
    return [];
  });

  const claimRows = $derived.by(() => {
    if (!jws) return [];
    const payload = jws.payload;
    return CLAIMS.filter(([key]) => key in payload).map(([key, label]) => {
      const value = payload[key];
      const date = key === 'exp' || key === 'nbf' || key === 'iat' ? claimDate(payload, key) : undefined;
      const text = Array.isArray(value) ? value.map(String).join(', ') : typeof value === 'string' ? value : undefined;
      return {
        key,
        label,
        raw: JSON.stringify(value),
        human: date ? date.toLocaleString() : text,
        relative: date ? relativeTime(date, now) : undefined
      };
    });
  });

  // Signature verification (HS* only) runs async; only the latest run may write its result.
  const verifyToken = $derived(jws && isHmacAlg(jws.alg) ? jws.token : '');
  let verifyStatus = $state<VerifyStatus | 'checking' | null>(null);
  let run = 0;
  $effect(() => {
    const token = verifyToken;
    const key = secret;
    const secretEncoding = secretBase64 ? 'base64' : 'utf8';
    const id = ++run;
    if (!token || key === '') {
      verifyStatus = null;
      return;
    }
    verifyStatus = 'checking';
    verifyHmac(token, key, { secretEncoding })
      .then(status => {
        if (id === run) verifyStatus = status;
      })
      .catch(() => {
        if (id === run) verifyStatus = 'invalid';
      });
  });

  function loadSample() {
    input = SAMPLE;
    secret = '';
    secretBase64 = false;
  }

  function clearAll() {
    input = '';
    secret = '';
    secretBase64 = false;
  }
</script>

<ToolLayout
  title="JWT Decoder"
  description="Inspect JSON Web Tokens: header, payload, claims and expiry, with optional HMAC signature verification — all in your browser."
  icon={FileText}
  color="warning"
>
  <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-label="Token">
    <Textarea
      label="JWT"
      bind:value={input}
      rows={5}
      mono
      class="break-all"
      placeholder="Paste a token — eyJhbGciOi… (a leading “Bearer ” is fine)"
      spellcheck={false}
      autocomplete="off"
      autocapitalize="off"
      error={decoded.kind === 'error' ? decoded.error : undefined}
      hint="Decoded as you type. Nothing is stored or sent anywhere."
    />
    <div class="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" onclick={loadSample}>Load sample</Button>
      <Button variant="ghost" size="sm" onclick={clearAll} disabled={!input && !secret}>Clear</Button>
    </div>

    {#if pieces.length}
      <div class="flex flex-col gap-3 rounded-md bg-sunken p-4">
        <p class="m-0 font-mono text-code break-all text-ink">
          {#each pieces as piece, i (i)}{#if i > 0}<span aria-hidden="true">.</span>{/if}<span
              class={piece.cls}
              title={piece.label}>{piece.text}</span
            >{/each}
        </p>
        <ul class="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-label font-mono" aria-label="Colour key">
          {#each pieces as piece, i (i)}
            <li class={piece.cls}>
              <span aria-hidden="true">■</span>
              {piece.label}<span class="text-ink-muted"> · {piece.text.length} chars</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </section>

  {#if decoded.kind === 'empty'}
    <section class="rounded-lg bg-card" aria-label="Result">
      <EmptyState title="Nothing to decode yet" text="Paste a JWT above, or load a signed sample to see how it works.">
        {#snippet actions()}
          <Button variant="secondary" size="sm" onclick={loadSample}>Load sample</Button>
        {/snippet}
      </EmptyState>
    </section>
  {:else if decoded.kind === 'jwe'}
    <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-label="Status" aria-live="polite">
      <p class="m-0 text-body text-ink">Well-formed JWE{alg ? ` · alg ${alg}` : ''}</p>
      <p class="m-0 text-body-sm text-ink-muted">{decoded.message}</p>
    </section>
  {:else if jws}
    <section class="flex flex-col gap-3 rounded-lg bg-card p-6" aria-label="Status" aria-live="polite">
      <p class="m-0 text-body text-ink">
        Well-formed JWS{alg ? ` · alg ${alg}` : ''}
        {#if verifyStatus === 'valid'}<span class="text-live"> · ▲ Signature verified</span>{/if}
        {#if verifyStatus === 'invalid'}<span class="text-negative"> · ▼ Signature does not match</span>{/if}
      </p>
      {#if jws.findings.length}
        <ul class="m-0 flex list-none flex-col gap-1 p-0 text-body-sm">
          {#each jws.findings as finding (finding.code)}
            <li class="text-ink">
              <span class="font-mono {LEVEL[finding.level].cls}">{LEVEL[finding.level].marker}</span>
              {finding.message}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="m-0 text-body-sm text-ink-muted">No problems with the time claims. Decoding alone doesn't prove who signed it.</p>
      {/if}
    </section>
  {/if}

  {#if header}
    <div class="grid min-w-0 gap-4 {jws ? 'lg:grid-cols-2' : ''}">
      <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="jwt-header-title">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="jwt-header-title" class="m-0 text-title text-accent-text">Header</h2>
          <CopyChip value={headerJson}>Copy header</CopyChip>
        </div>
        <pre class="m-0 rounded-md bg-sunken p-4 font-mono text-code whitespace-pre-wrap text-ink [overflow-wrap:anywhere]">{headerJson}</pre>
      </section>

      {#if jws}
        <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="jwt-payload-title">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="jwt-payload-title" class="m-0 text-title text-live">Payload</h2>
            <CopyChip value={payloadJson}>Copy payload</CopyChip>
          </div>
          <pre class="m-0 rounded-md bg-sunken p-4 font-mono text-code whitespace-pre-wrap text-ink [overflow-wrap:anywhere]">{payloadJson}</pre>
        </section>
      {/if}
    </div>
  {/if}

  {#if jws && claimRows.length}
    <section class="flex min-w-0 flex-col gap-3 rounded-lg bg-card p-6" aria-labelledby="jwt-claims-title">
      <h2 id="jwt-claims-title" class="m-0 text-title">Registered claims</h2>
      <dl class="m-0 flex flex-col gap-2">
        {#each claimRows as row (row.key)}
          <div class="flex min-w-0 flex-col gap-1 rounded-md bg-control p-4 sm:flex-row sm:gap-4">
            <dt class="flex shrink-0 items-baseline gap-2 sm:w-36 sm:flex-col sm:gap-0">
              <span class="font-mono text-label text-ink">{row.key}</span>
              <span class="text-body-sm text-ink-muted">{row.label}</span>
            </dt>
            <dd class="m-0 flex min-w-0 flex-1 flex-col gap-1">
              {#if row.human !== undefined}
                <span class="text-body-sm break-all text-ink">
                  {row.human}{#if row.relative}<span class="text-ink-muted"> · {row.relative}</span>{/if}
                </span>
              {/if}
              <code class="font-mono text-code break-all text-ink-muted">{row.raw}</code>
            </dd>
          </div>
        {/each}
      </dl>
    </section>
  {/if}

  {#if jws}
    <section class="flex min-w-0 flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="jwt-signature-title">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="jwt-signature-title" class="m-0 text-title">Signature</h2>
        {#if jws.signature}<CopyChip value={jws.signature}>Copy signature</CopyChip>{/if}
      </div>

      {#if algNone}
        <p class="m-0 text-body-sm text-ink">
          <span class="font-mono text-accent-text">Warning:</span> Unsecured token (alg "none"): there is no signature,
          so nothing can be verified and any server should reject it.
        </p>
      {:else if isHmacAlg(jws.alg)}
        <p class="m-0 text-body-sm text-ink-muted">
          {jws.alg} is signed with a shared secret. Enter it to check the signature.
          {#if input.trim() === SAMPLE}The sample's secret is <code class="font-mono text-ink">{SAMPLE_SECRET}</code>.{/if}
        </p>
        <TextField
          label="HMAC secret"
          type="password"
          mono
          bind:value={secret}
          autocomplete="off"
          spellcheck={false}
          hint="Verified locally with WebCrypto — the secret never leaves your browser and isn't saved."
        />
        <Switch label="Secret is base64-encoded" bind:checked={secretBase64} />
        <p class="m-0 text-body-sm" aria-live="polite">
          {#if verifyStatus === 'checking'}
            <span class="text-ink-muted">Checking…</span>
          {:else if verifyStatus === 'valid'}
            <span class="text-live">▲ Signature verified with this secret.</span>
          {:else if verifyStatus === 'invalid'}
            <span class="text-negative">▼ Signature does not match this secret{secretBase64 ? ' (or it is not valid base64)' : ''}.</span>
          {:else}
            <span class="text-ink-muted">Not verified.</span>
          {/if}
        </p>
      {:else}
        <p class="m-0 text-body-sm text-ink-muted">
          {jws.alg ? `${jws.alg} signatures` : 'Signatures without a known alg'} need the issuer's public key to verify, which
          this tool doesn't support. The token is decoded but its signature is <strong class="text-ink">not verified</strong>.
        </p>
      {/if}
    </section>
  {/if}
</ToolLayout>
