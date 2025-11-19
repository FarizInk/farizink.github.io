<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from '../../lib/router.js';
  import QRCode from 'qrcode';
  import { QrCode, Download, Copy, RefreshCw, Settings2, Info, ChevronLeft } from '@lucide/svelte';
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

  function handleBackToTools() {
    navigate('/tools');
  }

  onMount(() => {
    text = 'https://farizink.dev';
    generateQRCode();
  });
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-success-400)] to-[var(--ds-success-600)] rounded-2xl mb-4"
      >
        <QrCode class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">QR Code Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate custom QR codes for URLs, text, or any data with customizable options.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a
          href="/"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a
          href="/tools"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">QR Code Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex justify-center flex-wrap gap-2">
    <button onclick={generateQRCode} class="btn btn-primary btn-sm">
      <RefreshCw class="w-4 h-4 mr-2" />
      Generate
    </button>
    <button onclick={resetForm} class="btn btn-primary btn-sm">Reset</button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Input Section -->
    <div class="space-y-6">
      <!-- Text Input -->
      <div>
        <label
          for="text-input"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Text or URL
        </label>
        <textarea
          id="text-input"
          bind:value={text}
          placeholder="Enter text, URL, or any data to encode..."
          rows="4"
          class="textarea {error ? 'border-[var(--ds-danger-500)] focus:border-[var(--ds-danger-500)] focus:ring-[var(--ds-danger-500)]' : ''}"
        ></textarea>
        {#if error}
          <p class="mt-1 text-sm text-[var(--ds-danger-500)]">{error}</p>
        {/if}
      </div>

      <!-- Customization Options -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"
      >
        <div class="flex items-center gap-2 mb-2 text-gray-900 dark:text-white">
          <Settings2 class="w-5 h-5" />
          <h3 class="text-lg font-semibold">Customization</h3>
        </div>

        <!-- Size -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label for="size" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Size: {size}px
            </label>
          </div>
          <input
            id="size"
            type="range"
            min="100"
            max="500"
            step="50"
            bind:value={size}
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--ds-success-500)]"
          />
        </div>

        <!-- Colors -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="bg-color"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Background</label
            >
            <input id="bg-color" type="color" bind:value={bgColor} class="input h-12 p-1 w-full" />
          </div>
          <div>
            <label
              for="fg-color"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Foreground</label
            >
            <input id="fg-color" type="color" bind:value={fgColor} class="input h-12 p-1 w-full" />
          </div>
        </div>

        <!-- Error Correction Level -->
        <div>
          <label
            for="error-correction"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Error Correction Level
          </label>
          <select id="error-correction" bind:value={errorCorrection} class="select">
            {#each errorCorrectionOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Margin -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="include-margin"
            bind:checked={includeMargin}
            class="w-4 h-4 text-[var(--ds-success-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-success-500)] dark:focus:ring-[var(--ds-success-600)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="include-margin"
            class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Include margin
          </label>
        </div>
      </div>
    </div>

    <!-- Output Section -->
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h3>

        {#if qrDataUrl}
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center"
          >
            <div class="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                class="max-w-full h-auto rounded"
                style="max-width: {size}px; max-height: {size}px;"
              />
            </div>

            <div class="flex flex-wrap gap-3 justify-center w-full">
              <button onclick={downloadQRCode} class="btn btn-primary btn-block sm:w-auto">
                <Download class="w-4 h-4 mr-2" />
                Download PNG
              </button>
              <button onclick={copyToClipboard} class="btn btn-secondary btn-block sm:w-auto">
                <Copy class="w-4 h-4 mr-2" />
                Copy Image
              </button>
            </div>
          </div>
        {:else if error}
          <div
            class="bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20] border border-[var(--ds-danger-200)] dark:border-[var(--ds-danger-800)] rounded-xl p-6"
          >
            <p class="text-[var(--ds-danger-600)] dark:text-[var(--ds-danger-400)] text-center">
              {error}
            </p>
          </div>
        {:else}
          <div
            class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
          >
            <QrCode class="w-12 h-12 mb-4 opacity-50" />
            <p class="text-center">Enter text and click "Generate" to create your QR code</p>
          </div>
        {/if}
      </div>

      <!-- Info Section -->
      <div
        class="bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] border border-[var(--ds-success-200)] dark:border-[var(--ds-success-800)] rounded-xl p-4"
      >
        <div class="flex items-center gap-2 mb-2 text-[var(--ds-success-800)] dark:text-[var(--ds-success-200)]">
          <Info class="w-4 h-4" />
          <h4 class="text-sm font-semibold">Tips</h4>
        </div>
        <ul class="text-sm text-[var(--ds-success-700)] dark:text-[var(--ds-success-300)] space-y-1 list-disc list-inside">
          <li>QR codes can store up to 4,296 alphanumeric characters</li>
          <li>Higher error correction levels create more complex but more robust codes</li>
          <li>Test your QR code before using it in production</li>
          <li>Ensure good contrast between foreground and background colors</li>
        </ul>
      </div>
    </div>
  </div>
</div>
