<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from '../../lib/router.js';
  import QRCode from 'qrcode';
  import { Download, Copy, ChevronLeft, QrCode } from '@lucide/svelte';
  import Button from '../../components/ui/Button.svelte';
  import Input from '../../components/ui/Input.svelte';
  import Textarea from '../../components/ui/Textarea.svelte';

  let text = $state('');
  let qrDataUrl = $state('');
  let error = $state('');
  let size = $state(300);
  let bgColor = $state('#FFFFFF');
  let fgColor = $state('#000000');
  let errorCorrection = $state('M');
  let includeMargin = $state(true);

  async function generateQRCode() {
    if (!text.trim()) {
      error = 'Please enter some text or URL';
      qrDataUrl = '';
      return;
    }

    try {
      // Convert error correction level string to qrcode library format
      const errorCorrectionMap: Record<string, 'L' | 'M' | 'Q' | 'H'> = {
        L: 'L', // Low
        M: 'M', // Medium
        Q: 'Q', // Quartile
        H: 'H' // High
      };

      const options = {
        width: size,
        margin: includeMargin ? 4 : 0,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorCorrectionMap[errorCorrection] || 'M'
      };

      qrDataUrl = await QRCode.toDataURL(text, options);
      error = '';
    } catch (err) {
      error = 'Failed to generate QR code';
      qrDataUrl = '';
      console.error('QR Code generation error:', err);
    }
  }

  function downloadQRCode() {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  }

  function copyToClipboard() {
    if (!qrDataUrl) return;

    fetch(qrDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
      });
  }

  function resetForm() {
    text = '';
    qrDataUrl = '';
    error = '';
    size = 300;
    bgColor = '#FFFFFF';
    fgColor = '#000000';
    errorCorrection = 'M';
    includeMargin = true;
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  onMount(() => {
    // Generate initial QR code with example text
    text = 'https://farizink.dev';
    generateQRCode();
  });
</script>

<div class="max-w-4xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mb-4"
        style="background: linear-gradient(to bottom right, var(--color-qrcode-teal-light), var(--color-qrcode-teal))"
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
    <ol class="flex items-center space-x-2 text-sm">
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
        <Textarea
          id="text-input"
          bind:value={text}
          placeholder="Enter text, URL, or any data to encode..."
          rows="4"
        />
      </div>

      <!-- Customization Options -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Customization</h3>

        <!-- Size -->
        <div>
          <label for="size" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Size: {size}px
          </label>
          <Input
            id="size"
            type="range"
            min="100"
            max="500"
            step="50"
            bind:value={size}
            label={`Size: ${size}px`}
          />
        </div>

        <!-- Colors -->
        <div class="grid grid-cols-2 gap-4">
          <Input
            id="bg-color"
            type="color"
            bind:value={bgColor}
            label="Background Color"
            placeholder="#FFFFFF"
          />
          <Input
            id="fg-color"
            type="color"
            bind:value={fgColor}
            label="Foreground Color"
            placeholder="#000000"
          />
        </div>

        <!-- Error Correction Level -->
        <div>
          <label
            for="error-correction"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Error Correction Level
          </label>
          <select
            id="error-correction"
            bind:value={errorCorrection}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>

        <!-- Margin -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="include-margin"
            bind:checked={includeMargin}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            for="include-margin"
            class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Include margin
          </label>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3">
        <Button
          onclick={generateQRCode}
          variant="primary"
        >
          Generate QR Code
        </Button>
        <Button
          onclick={resetForm}
          variant="flat"
        >
          Reset
        </Button>
      </div>
    </div>

    <!-- Output Section -->
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h3>

        {#if qrDataUrl}
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div class="flex justify-center mb-4">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                class="max-w-full h-auto rounded-lg shadow-lg"
                style="max-width: {size}px; max-height: {size}px;"
              />
            </div>

            <div class="flex flex-wrap gap-3 justify-center">
              <Button
                onclick={downloadQRCode}
                variant="success"
              >
                <Download slot="leftIcon" class="w-4 h-4" />
                Download
              </Button>
              <Button
                onclick={copyToClipboard}
                variant="secondary"
              >
                <Copy slot="leftIcon" class="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>
        {:else if error}
          <div
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
          >
            <p class="text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        {:else}
          <div
            class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12"
          >
            <p class="text-gray-500 dark:text-gray-400 text-center">
              Enter text and click "Generate QR Code" to create your QR code
            </p>
          </div>
        {/if}
      </div>

      <!-- Info Section -->
      <div
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Tips</h4>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• QR codes can store up to 4,296 alphanumeric characters</li>
          <li>• Higher error correction levels create more complex but more robust codes</li>
          <li>• Test your QR code before using it in production</li>
          <li>• Ensure good contrast between foreground and background colors</li>
        </ul>
      </div>
    </div>
  </div>
</div>
