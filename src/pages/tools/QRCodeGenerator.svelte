<script lang="ts">
  import { onMount } from 'svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import QRCode from 'qrcode';
  import { QrCode, Download, Copy, RefreshCw, Settings2, Info } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  let text = $state('');
  let qrDataUrl = $state('');
  let error = $state('');
  let size = $state('300');
  let bgColor = $state('#FFFFFF');
  let fgColor = $state('#000000');
  let errorCorrection = $state('M');
  let includeMargin = $state(true);

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' }
  ];

  async function generateQRCode() {
    if (!text.trim()) {
      error = 'Please enter some text or URL';
      qrDataUrl = '';
      return;
    }

    try {
      const options = {
        width: parseInt(size),
        margin: includeMargin ? 4 : 0,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorCorrection as 'L' | 'M' | 'Q' | 'H'
      };

      qrDataUrl = await QRCode.toDataURL(text, options);
      error = '';
      toast.success('QR Code generated successfully');
    } catch (err) {
      error = 'Failed to generate QR code';
      qrDataUrl = '';
      console.error('QR Code generation error:', err);
      toast.error('Failed to generate QR code');
    }
  }

  function downloadQRCode() {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
    toast.success('QR Code downloaded');
  }

  function copyToClipboard() {
    if (!qrDataUrl) return;

    fetch(qrDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
        toast.success('QR Code copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy QR Code');
      });
  }

  function resetForm() {
    text = '';
    qrDataUrl = '';
    error = '';
    size = '300';
    bgColor = '#FFFFFF';
    fgColor = '#000000';
    errorCorrection = 'M';
    includeMargin = true;
    toast.success('Form reset');
  }

  onMount(() => {
    text = 'https://farizink.dev';
    generateQRCode();
  });
</script>

<ToolLayout
  title="QR Code Generator"
  description="Generate custom QR codes for URLs, text, or any data with customizable options."
  icon={QrCode}
  color="warning"
>
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-primary" onclick={generateQRCode}>
      <RefreshCw class="size-4" />
      Generate
    </button>
    <button class="btn btn-secondary" onclick={resetForm}>Reset</button>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Input Section -->
    <div class="flex flex-col gap-4">
      <!-- Text Input -->
      <div class="tool-card">
        <label for="text-input" class="label">Text or URL</label>
        <textarea
          id="text-input"
          bind:value={text}
          placeholder="Enter text, URL, or any data to encode..."
          rows="4"
          class="textarea"
          aria-invalid={error ? 'true' : undefined}
        ></textarea>
        {#if error}
          <p class="text-body-sm mt-2 text-negative">Error: {error}</p>
        {/if}
      </div>

      <!-- Customization Options -->
      <div class="tool-card flex flex-col gap-6">
        <div class="flex items-center gap-2 text-ink">
          <Settings2 class="size-5 text-ink-muted" />
          <h3 class="section-title mb-0!">Customization</h3>
        </div>

        <!-- Size -->
        <div>
          <label for="size" class="label">
            Size: <span class="font-mono text-ink">{size}px</span>
          </label>
          <input
            id="size"
            type="range"
            min="100"
            max="500"
            step="50"
            bind:value={size}
            class="slider"
            style="--p: {((Number(size) - 100) / (500 - 100)) * 100}%"
          />
        </div>

        <!-- Colors -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="bg-color" class="label">Background</label>
            <input id="bg-color" type="color" bind:value={bgColor} class="input h-12 w-full p-1!" />
          </div>
          <div>
            <label for="fg-color" class="label">Foreground</label>
            <input id="fg-color" type="color" bind:value={fgColor} class="input h-12 w-full p-1!" />
          </div>
        </div>

        <!-- Error Correction Level -->
        <div>
          <label for="error-correction" class="label">Error correction level</label>
          <select id="error-correction" bind:value={errorCorrection} class="select">
            {#each errorCorrectionOptions as option (option.value)}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Margin -->
        <label class="custom-checkbox" for="include-margin">
          <input type="checkbox" id="include-margin" bind:checked={includeMargin} />
          <span class="checkmark"></span>
          <span class="label-text">Include margin</span>
        </label>
      </div>
    </div>

    <!-- Output Section -->
    <div class="flex flex-col gap-4">
      <div class="tool-card">
        <h3 class="section-title">Generated QR code</h3>

        {#if qrDataUrl}
          <div class="flex flex-col items-center">
            <div class="mb-6 rounded-md bg-sunken p-4">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                class="h-auto max-w-full rounded-sm"
                style="max-width: {size}px; max-height: {size}px;"
              />
            </div>

            <div class="flex w-full flex-wrap justify-center gap-2">
              <button onclick={downloadQRCode} class="btn btn-secondary">
                <Download class="size-4" />
                Download PNG
              </button>
              <button onclick={copyToClipboard} class="btn btn-ghost">
                <Copy class="size-4" />
                Copy image
              </button>
            </div>
          </div>
        {:else if error}
          <div class="status-error rounded-md p-6">
            <p class="text-center">Error: {error}</p>
          </div>
        {:else}
          <div
            class="flex flex-col items-center justify-center rounded-md bg-sunken p-12 text-ink-muted"
          >
            <QrCode class="mb-4 size-12" />
            <p class="text-body-sm text-center">Enter text and click "Generate" to create your QR code</p>
          </div>
        {/if}
      </div>

      <!-- Info Section -->
      <div class="info-card">
        <div class="mb-2 flex items-center gap-2 text-ink">
          <Info class="size-4 text-accent-text" />
          <h4 class="text-label text-ink-muted">Tips</h4>
        </div>
        <ul class="text-body-sm list-inside list-disc space-y-1 text-ink-muted">
          <li>QR codes can store up to 4,296 alphanumeric characters</li>
          <li>Higher error correction levels create more complex but more robust codes</li>
          <li>Test your QR code before using it in production</li>
          <li>Ensure good contrast between foreground and background colors</li>
        </ul>
      </div>
    </div>
  </div>
</ToolLayout>
