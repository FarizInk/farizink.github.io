<script lang="ts">
  import { QrCode, Download, Copy, TriangleAlert, Check } from '@lucide/svelte';
  import QRCode from 'qrcode';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, Segmented, Slider, Switch, Textarea, TextField } from '$lib/components/ds';
  import {
    capacityHint,
    emailPayload,
    normalizeHex,
    phonePayload,
    scanWarning,
    smsPayload,
    utf8Length,
    vcardPayload,
    wifiPayload,
    ECC_RECOVERY,
    type Ecc,
    type WifiSecurity
  } from '$lib/tools/qr';

  const KINDS = [
    { value: 'text', label: 'Text/URL' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
    { value: 'vcard', label: 'vCard' }
  ];
  const ECC_OPTIONS = [
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'Q', label: 'Q' },
    { value: 'H', label: 'H' }
  ];
  const ECC_HELP: Record<Ecc, string> = {
    L: 'Smallest code; fine for clean screens.',
    M: 'Good default for most print and screen use.',
    Q: 'Sturdier for printed labels that may get scuffed.',
    H: 'Most robust; use when placing a logo over the code.'
  };
  const SECURITY_OPTIONS = [
    { value: 'WPA', label: 'WPA/WPA2/WPA3' },
    { value: 'WEP', label: 'WEP' },
    { value: 'nopass', label: 'None' }
  ];

  // ── Content ─────────────────────────────────────────
  let kind = $state<string>('text');
  let text = $state('https://fariz.dev');
  let wifi = $state({ ssid: '', password: '', security: 'WPA' as string, hidden: false });
  let email = $state({ to: '', subject: '', body: '' });
  let phone = $state('');
  let sms = $state({ phone: '', message: '' });
  let vcard = $state({ firstName: '', lastName: '', phone: '', email: '', org: '', url: '' });

  // ── Options ─────────────────────────────────────────
  let eccValue = $state<string>('M');
  const ecc = $derived(eccValue as Ecc);
  let size = $state(320);
  let margin = $state(4);
  let fg = $state('#000000');
  let bg = $state('#ffffff');

  const payload = $derived.by(() => {
    switch (kind) {
      case 'wifi':
        return wifiPayload({ ...wifi, security: wifi.security as WifiSecurity });
      case 'email':
        return emailPayload(email);
      case 'phone':
        return phonePayload(phone);
      case 'sms':
        return smsPayload(sms.phone, sms.message);
      case 'vcard':
        return vcardPayload(vcard);
      default:
        return text;
    }
  });

  const fgHex = $derived(normalizeHex(fg));
  const bgHex = $derived(normalizeHex(bg));
  const warning = $derived(fgHex && bgHex ? scanWarning(fgHex, bgHex) : null);
  const capacity = $derived(capacityHint(ecc));
  const bytes = $derived(utf8Length(payload));
  const overCapacity = $derived(bytes > capacity.bytes);
  const fillPct = $derived(Math.min(100, (bytes / capacity.bytes) * 100));

  // ── Live generation ─────────────────────────────────
  let pngUrl = $state('');
  let svgMarkup = $state('');
  let genError = $state('');
  let copyStatus = $state<{ ok: boolean; text: string } | null>(null);
  // Bumped on every input change; async results are applied only if they belong to the latest run.
  let run = 0;

  $effect(() => {
    const data = payload;
    const level = ecc;
    const width = size;
    const quiet = margin;
    const dark = fgHex;
    const light = bgHex;
    const id = ++run;
    copyStatus = null;

    if (!data) {
      pngUrl = '';
      svgMarkup = '';
      genError = '';
      return;
    }
    if (!dark || !light) {
      genError = 'Colors must be hex values like #000000.';
      return;
    }

    const timer = setTimeout(async () => {
      const opts = { errorCorrectionLevel: level, width, margin: quiet, color: { dark, light } };
      try {
        const [png, svg] = await Promise.all([
          QRCode.toDataURL(data, opts),
          QRCode.toString(data, { ...opts, type: 'svg' })
        ]);
        if (id !== run) return;
        pngUrl = png;
        svgMarkup = svg;
        genError = '';
      } catch (err) {
        if (id !== run) return;
        pngUrl = '';
        svgMarkup = '';
        genError = err instanceof Error ? err.message : String(err);
      }
    }, 150);
    return () => clearTimeout(timer);
  });

  // ── Actions ─────────────────────────────────────────
  function save(href: string, name: string) {
    const a = document.createElement('a');
    a.href = href;
    a.download = name;
    a.click();
  }

  function downloadPng() {
    if (pngUrl) save(pngUrl, `qrcode-${kind}.png`);
  }

  function downloadSvg() {
    if (!svgMarkup) return;
    const url = URL.createObjectURL(new Blob([svgMarkup], { type: 'image/svg+xml' }));
    save(url, `qrcode-${kind}.svg`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function copyImage() {
    if (!pngUrl) return;
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('this browser cannot copy images');
      }
      const blob = await (await fetch(pngUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      copyStatus = { ok: true, text: 'Image copied to clipboard.' };
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      copyStatus = { ok: false, text: `Couldn't copy image: ${reason}. Use Download PNG instead.` };
    }
  }
</script>

<ToolLayout
  title="QR Code Generator"
  description="Generate QR codes for links, Wi-Fi, email, phone, SMS and contacts — updates live as you type."
  icon={QrCode}
  color="warning"
>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="flex flex-col gap-4">
      <!-- Content -->
      <section class="tool-card flex flex-col gap-5" aria-labelledby="qr-content-title">
        <h2 id="qr-content-title" class="section-title mb-0!">Content</h2>
        <div class="overflow-x-auto">
          <Segmented label="Content type" options={KINDS} bind:value={kind} />
        </div>

        {#if kind === 'text'}
          <Textarea label="Text or URL" bind:value={text} rows={4} placeholder="https://example.com or any text" />
        {:else if kind === 'wifi'}
          <TextField label="Network name (SSID)" bind:value={wifi.ssid} autocomplete="off" />
          <div class="flex flex-col gap-2">
            <span class="label">Security</span>
            <Segmented
              label="Wi-Fi security"
              options={SECURITY_OPTIONS}
              bind:value={wifi.security}
            />
          </div>
          {#if wifi.security !== 'nopass'}
            <TextField label="Password" bind:value={wifi.password} autocomplete="off" mono />
          {/if}
          <Switch label="Hidden network" description="The SSID is not broadcast" bind:checked={wifi.hidden} />
        {:else if kind === 'email'}
          <TextField label="To" type="email" bind:value={email.to} placeholder="name@example.com" />
          <TextField label="Subject" optional bind:value={email.subject} />
          <Textarea label="Message" optional bind:value={email.body} rows={3} />
        {:else if kind === 'phone'}
          <TextField label="Phone number" type="tel" bind:value={phone} placeholder="+62 812 3456 789" />
        {:else if kind === 'sms'}
          <TextField label="Phone number" type="tel" bind:value={sms.phone} placeholder="+62 812 3456 789" />
          <Textarea label="Message" optional bind:value={sms.message} rows={3} />
        {:else}
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="First name" bind:value={vcard.firstName} autocomplete="off" />
            <TextField label="Last name" bind:value={vcard.lastName} autocomplete="off" />
            <TextField label="Phone" type="tel" optional bind:value={vcard.phone} />
            <TextField label="Email" type="email" optional bind:value={vcard.email} />
            <TextField label="Organization" optional bind:value={vcard.org} />
            <TextField label="Website" type="url" optional bind:value={vcard.url} />
          </div>
        {/if}
      </section>

      <!-- Options -->
      <section class="tool-card flex flex-col gap-5" aria-labelledby="qr-options-title">
        <h2 id="qr-options-title" class="section-title mb-0!">Options</h2>

        <div class="flex flex-col gap-2">
          <span class="label">Error correction</span>
          <Segmented label="Error correction level" options={ECC_OPTIONS} bind:value={eccValue} />
          <p class="text-body-sm text-ink-muted">
            Recovers {ECC_RECOVERY[ecc]} damage. {ECC_HELP[ecc]}
          </p>
        </div>

        <Slider label="Size" bind:value={size} min={128} max={1024} step={32} unit=" px" />
        <div class="flex flex-col gap-2">
          <Slider label="Quiet zone (margin)" bind:value={margin} min={0} max={10} step={1} unit=" modules" />
          {#if margin < 2}
            <p class="text-body-sm text-ink-muted">Readers expect ~4 modules of margin; keep it unless the code sits on a plain light area.</p>
          {/if}
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="flex items-end gap-2">
            <div class="min-w-0 flex-1">
              <TextField
                label="Foreground (hex)"
                bind:value={fg}
                mono
                spellcheck="false"
                error={fgHex ? undefined : 'Use a hex color like #000000'}
              />
            </div>
            <input
              type="color"
              aria-label="Pick foreground color"
              value={fgHex ?? '#000000'}
              oninput={e => (fg = e.currentTarget.value)}
              class="h-11 w-11 shrink-0 cursor-pointer rounded-pill border-0 bg-control p-1.5"
            />
          </div>
          <div class="flex items-end gap-2">
            <div class="min-w-0 flex-1">
              <TextField
                label="Background (hex)"
                bind:value={bg}
                mono
                spellcheck="false"
                error={bgHex ? undefined : 'Use a hex color like #ffffff'}
              />
            </div>
            <input
              type="color"
              aria-label="Pick background color"
              value={bgHex ?? '#ffffff'}
              oninput={e => (bg = e.currentTarget.value)}
              class="h-11 w-11 shrink-0 cursor-pointer rounded-pill border-0 bg-control p-1.5"
            />
          </div>
        </div>

        {#if warning}
          <p class="text-body-sm flex items-start gap-2 text-negative" role="status">
            <TriangleAlert class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{warning}</span>
          </p>
        {/if}
      </section>
    </div>

    <!-- Output -->
    <section class="tool-card flex flex-col gap-5 self-start" aria-labelledby="qr-output-title">
      <h2 id="qr-output-title" class="section-title mb-0!">QR code</h2>

      <div class="flex min-h-64 items-center justify-center rounded-md bg-sunken p-4">
        {#if genError}
          <div class="flex max-w-sm flex-col gap-2 text-center" role="alert">
            <p class="text-body flex items-center justify-center gap-2 text-negative">
              <TriangleAlert class="size-4 shrink-0" aria-hidden="true" />
              {genError}
            </p>
            {#if overCapacity || /too big|amount of data/i.test(genError)}
              <p class="text-body-sm text-ink-muted">{capacity.text}</p>
            {/if}
          </div>
        {:else if pngUrl}
          <img
            src={pngUrl}
            alt="QR code for the content above"
            width={size}
            height={size}
            class="h-auto w-full max-w-80 [image-rendering:pixelated]"
          />
        {:else}
          <p class="text-body-sm text-center text-ink-muted">Fill in the content to see the QR code.</p>
        {/if}
      </div>

      <!-- Encoded length vs capacity -->
      <div class="flex flex-col gap-2">
        <div class="text-body-sm flex justify-between gap-2">
          <span class="text-ink-muted">Encoded length</span>
          <span class="font-mono {overCapacity ? 'text-negative' : 'text-ink'}">
            {bytes.toLocaleString('en-US')} / {capacity.bytes.toLocaleString('en-US')} bytes
            {#if overCapacity}<span class="sr-only">(over capacity)</span> ▲{/if}
          </span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-pill bg-sunken" aria-hidden="true">
          <div class="h-full rounded-pill {overCapacity ? 'bg-negative' : 'bg-accent'}" style="width: {fillPct}%"></div>
        </div>
        <p class="text-body-sm text-ink-muted">
          {size} × {size} px · level {ecc} · margin {margin}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <Button onclick={downloadPng} disabled={!pngUrl || !!genError}>
          {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
          Download PNG
        </Button>
        <Button variant="secondary" onclick={downloadSvg} disabled={!svgMarkup || !!genError}>
          {#snippet icon()}<Download class="size-4" aria-hidden="true" />{/snippet}
          Download SVG
        </Button>
        <Button variant="ghost" onclick={copyImage} disabled={!pngUrl || !!genError}>
          {#snippet icon()}<Copy class="size-4" aria-hidden="true" />{/snippet}
          Copy image
        </Button>
      </div>

      <p class="text-body-sm min-h-5" role="status" aria-live="polite">
        {#if copyStatus}
          <span class="inline-flex items-center gap-1.5 {copyStatus.ok ? 'text-live' : 'text-negative'}">
            {#if copyStatus.ok}<Check class="size-4" aria-hidden="true" />{:else}<TriangleAlert
                class="size-4"
                aria-hidden="true"
              />{/if}
            {copyStatus.text}
          </span>
        {/if}
      </p>

      {#if payload}
        <div class="flex flex-col gap-2">
          <span class="label">Encoded content</span>
          <pre class="text-code max-h-40 overflow-auto rounded-md bg-control p-3 whitespace-pre-wrap break-all text-ink">{payload}</pre>
          <div><CopyChip value={payload}>Copy text</CopyChip></div>
        </div>
      {/if}
    </section>
  </div>
</ToolLayout>
