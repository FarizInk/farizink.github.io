<script lang="ts">
  import { Image, Copy, Download, Type, Zap, Palette, Check } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

  let inputText = $state('');
  let asciiArt = $state('');
  let selectedStyle = $state('standard');
  let copiedText = $state('');

  const asciiStyles = {
    standard: {
      name: 'Standard',
      chars: {
        A: '  #  \n ### \n# # #\n#####\n#   #',
        B: '#### \n#   #\n#### \n#   #\n#### ',
        C: ' ### \n#    \n#    \n#    \n ### ',
        D: '#### \n#   #\n#   #\n#   #\n#### ',
        E: '#####\n#    \n###  \n#    \n#####',
        F: '#####\n#    \n###  \n#    \n#    ',
        G: ' ### \n#    \n#  ##\n#   #\n ### ',
        H: '#   #\n#   #\n#####\n#   #\n#   #',
        I: '#####\n  #  \n  #  \n  #  \n#####',
        J: ' #####\n    #\n    #\n#   #\n ### ',
        K: '#  # \n# #  \n##   \n# #  \n#  # ',
        L: '#    \n#    \n#    \n#    \n#####',
        M: '#   #\n## ##\n# # #\n#   #\n#   #',
        N: '#   #\n##  #\n# # #\n#  ##\n#   #',
        O: ' ### \n#   #\n#   #\n#   #\n ### ',
        P: '#### \n#   #\n#### \n#    \n#    ',
        Q: ' ### \n#   #\n#   #\n#  ##\n ## #',
        R: '#### \n#   #\n#### \n# #  \n#  # ',
        S: ' ### \n#    \n ### \n    #\n ####',
        T: '#####\n  #  \n  #  \n  #  \n  #  ',
        U: '#   #\n#   #\n#   #\n#   #\n ### ',
        V: '#   #\n#   #\n#   #\n # # \n  #  ',
        W: '#   #\n#   #\n# # #\n## ##\n#   #',
        X: '#   #\n # # \n  #  \n # # \n#   #',
        Y: '#   #\n # # \n  #  \n  #  \n  #  ',
        Z: '#####\n   # \n  #  \n #   \n#####',
        ' ': '     \n     \n     \n     \n     ',
        '!': '  #  \n  #  \n  #  \n     \n  #  ',
        '?': ' ### \n#   #\n   # \n  #  \n  #  ',
        '.': '     \n     \n     \n     \n  #  ',
        ',': '     \n     \n     \n  #  \n #   ',
        '0': ' ### \n#  # \n# # #\n##  #\n ### ',
        '1': '  #  \n ##  \n  #  \n  #  \n ### ',
        '2': ' ### \n#   #\n   # \n  #  \n#####',
        '3': '#### \n    #\n ### \n    #\n#### ',
        '4': '#   #\n#   #\n#####\n    #\n    #',
        '5': '#####\n#    \n#### \n    #\n#### ',
        '6': ' ### \n#    \n#### \n#   #\n ### ',
        '7': '#####\n    #\n   # \n  #  \n  #  ',
        '8': ' ### \n#   #\n ### \n#   #\n ### ',
        '9': ' ### \n#   #\n ####\n    #\n ### '
      }
    },
    block: {
      name: 'Block',
      chars: {
        A: '█████\n█   █\n█████\n█   █\n█   █',
        B: '█████\n█   █\n█████\n█   █\n█████',
        C: ' █████\n█     \n█     \n█     \n █████',
        D: '█████ \n█   █ \n█   █ \n█   █ \n█████ ',
        E: '█████\n█     \n████  \n█     \n█████',
        F: '█████\n█     \n████  \n█     \n█    ',
        G: ' █████\n█     \n█  ███\n█   █ \n █████',
        H: '█   █\n█   █\n█████\n█   █\n█   █',
        I: '█████\n  █  \n  █  \n  █  \n█████',
        J: '  ████\n     █\n     █\n█   █ \n ███ ',
        K: '█   █ \n█  █  \n███   \n█  █  \n█   █ ',
        L: '█     \n█     \n█     \n█     \n█████',
        M: '█   █\n██ ██\n█ █ █\n█   █\n█   █',
        N: '█   █\n██  █\n█ █ █\n█  ██\n█   █',
        O: ' █████\n█   █ \n█   █ \n█   █ \n █████',
        P: '█████ \n█   █ \n█████ \n█     \n█    ',
        Q: ' █████\n█   █ \n█   █ \n█  ██ \n ██ █ ',
        R: '█████ \n█   █ \n█████ \n█  █  \n█   █ ',
        S: ' █████\n█     \n ████ \n     █\n█████ ',
        T: '█████\n  █  \n  █  \n  █  \n  █  ',
        U: '█   █\n█   █\n█   █\n█   █ \n ███ ',
        V: '█   █\n█   █\n█   █\n █ █ \n  █  ',
        W: '█   █\n█   █\n█ █ █\n██ ██\n█   █',
        X: '█   █\n █ █ \n  █  \n █ █ \n█   █',
        Y: '█   █\n █ █ \n  █  \n  █  \n  █  ',
        Z: '█████\n   █ \n  █  \n █   \n█████',
        ' ': '     \n     \n     \n     \n     ',
        '!': '  █  \n  █  \n  █  \n     \n  █  ',
        '?': ' ████\n█   █\n   █ \n  █  \n  █  ',
        '.': '     \n     \n     \n     \n  █  ',
        ',': '     \n     \n     \n  █  \n █   ',
        '0': ' ████\n█  ██\n█ █ █\n██  █\n ████',
        '1': '  █  \n ██  \n  █  \n  █  \n ████',
        '2': ' ████\n█   █\n   █ \n  █  \n█████',
        '3': '█████\n    █\n ███ \n    █\n█████',
        '4': '█   █\n█   █\n█████\n    █\n    █',
        '5': '█████\n█    \n████ \n    █\n████ ',
        '6': ' ███ \n█    \n████ \n█   █\n ███ ',
        '7': '█████\n    █\n   █ \n  █  \n  █  ',
        '8': ' ███ \n█   █\n ███ \n█   █\n ███ ',
        '9': ' ███ \n█   █\n ████\n    █\n ███ '
      }
    },
    simple: {
      name: 'Simple',
      chars: {
        A: '/\\  \n/\\_\\',
        B: '| __\n|__)',
        C: ' __ \n/  |',
        D: '|  \\\n|__/',
        E: '___ \n|__ ',
        F: '___ \n|  ',
        G: ' __ \n| __|',
        H: '|__|\n|  |',
        I: '_ \n|',
        J: ' __\n|__',
        K: '|_/\n| \\',
        L: '|   \n|__ ',
        M: '|\\/|\n|  |',
        N: '|\\ |\n| \\|',
        O: ' __ \n|__)',
        P: ' __ \n|__)',
        Q: ' __ \n|__\\',
        R: ' __ \n|__/',
        S: ' __ \n/__)',
        T: '___ \n  | ',
        U: '|  |\n|__|',
        V: '\\  /\n \\/ ',
        W: '|\\/|\n|  |',
        X: '\\_/\n/ \\',
        Y: '\\_/\n  |',
        Z: '__ \n/__',
        ' ': '   \n   ',
        '!': '   \n  )',
        '?': ' _ \n(_)',
        '.': '   \n  )',
        ',': '   \n(_ ',
        '0': ' __ \n/__)',
        '1': '  \n| ',
        '2': ' __ \n/__)',
        '3': ' __ \n/__)',
        '4': '    \n|__|',
        '5': ' __ \n/__ ',
        '6': ' __ \n|__)',
        '7': ' __ \n   /',
        '8': ' __ \n|__)',
        '9': ' __ \n|__/'
      }
    }
  };

  function generateAsciiArt() {
    if (!inputText.trim()) {
      asciiArt = '';
      return;
    }

    const text = inputText.toUpperCase();
    const style = asciiStyles[selectedStyle as keyof typeof asciiStyles];
    const lines = [];

    for (let line = 0; line < 5; line++) {
      let lineText = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (style.chars[char as keyof typeof style.chars]) {
          const charLines = style.chars[char as keyof typeof style.chars].split('\n');
          if (charLines[line]) {
            lineText += charLines[line] + ' ';
          } else {
            lineText += ' '.repeat(6) + ' ';
          }
        } else {
          lineText += ' '.repeat(6) + ' ';
        }
      }
      lines.push(lineText.trimEnd());
    }

    asciiArt = lines.join('\n');
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(asciiArt);
    copiedText = 'ascii';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
    toast.success('ASCII art copied to clipboard');
  }

  function downloadAsciiArt() {
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('ASCII art downloaded');
  }

  function clearAll() {
    inputText = '';
    asciiArt = '';
    toast.success('Cleared all');
  }

  function loadSampleText() {
    inputText = 'HELLO';
    generateAsciiArt();
    toast.success('Sample text loaded');
  }

  // React to changes in input text or style
  $effect(() => {
    generateAsciiArt();
  });
</script>

<ToolLayout
  title="ASCII Art Generator"
  description="Convert text into ASCII art with different styles. Perfect for terminal displays and creative text art."
  icon={Image}
  color="warning"
>
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button onclick={loadSampleText} class="btn btn-secondary">Load sample text</button>
    <button onclick={clearAll} class="btn btn-ghost">Clear all</button>
  </div>

  <!-- Style Selector -->
  <div class="tool-card">
    <h3 class="section-title">Art style</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each Object.entries(asciiStyles) as [key, style], index (index)}
        <button
          onclick={() => (selectedStyle = key)}
          class="preset-btn rounded-md! p-4 text-left {selectedStyle === key ? 'active' : ''}"
          aria-pressed={selectedStyle === key}
        >
          <div class="text-left">
            <h4 class="font-medium text-ink mb-1">{style.name}</h4>
            <p class="text-body-sm text-ink-muted">
              {key === 'standard'
                ? 'Classic ASCII style with standard characters'
                : key === 'block'
                  ? 'Bold block style using full Unicode blocks'
                  : 'Minimal style using basic ASCII characters'}
            </p>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Input Section -->
  <div class="tool-card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="section-title mb-0">Input text</h3>
      <span class="text-count">
        {inputText.length} characters
      </span>
    </div>
    <input
      type="text"
      bind:value={inputText}
      placeholder="Enter text to convert to ASCII art..."
      class="tool-input w-full font-mono text-sm"
      maxlength={10}
    />
    <p class="mt-2 text-body-sm text-ink-muted">
      Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.
    </p>
  </div>

  <!-- ASCII Art Result -->
  {#if asciiArt}
    <div class="tool-card">
      <div class="flex flex-wrap justify-between items-center gap-2 mb-4">
        <h3 class="section-title mb-0">ASCII art result</h3>
        <div class="flex gap-2">
          <button onclick={copyToClipboard} class="btn btn-primary btn-sm">
            {#if copiedText === 'ascii'}
              <Check class="w-4 h-4" />
              Copied!
            {:else}
              <Copy class="w-4 h-4" />
              Copy
            {/if}
          </button>
          <button onclick={downloadAsciiArt} class="btn btn-secondary btn-sm">
            <Download class="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div class="relative">
        <pre
          class="p-6 bg-sunken rounded-md font-mono text-sm text-ink overflow-x-auto whitespace-pre">{asciiArt}</pre>
      </div>
    </div>
  {/if}

  <!-- Character Set Reference -->
  <div class="tool-card">
    <h3 class="section-title">Supported characters</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="text-body-sm">
        <span class="font-medium text-ink">Letters:</span>
        <span class="font-mono text-ink-muted"> A-Z</span>
      </div>
      <div class="text-body-sm">
        <span class="font-medium text-ink">Numbers:</span>
        <span class="font-mono text-ink-muted"> 0-9</span>
      </div>
      <div class="text-body-sm">
        <span class="font-medium text-ink">Punctuation:</span>
        <span class="font-mono text-ink-muted"> ! ? . ,</span>
      </div>
      <div class="text-body-sm">
        <span class="font-medium text-ink">Space:</span>
        <span class="text-ink-muted"> Supported</span>
      </div>
    </div>
  </div>

  <!-- Usage Tips -->
  <div class="tool-card">
    <h3 class="section-title">Usage tips</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="info-card">
        <h4 class="section-title-sm">Best practices</h4>
        <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4">
          <li>Keep text short (under 10 characters)</li>
          <li>Use uppercase letters for better results</li>
          <li>Experiment with different styles</li>
          <li>Works great in terminal applications</li>
        </ul>
      </div>
      <div class="info-card">
        <h4 class="section-title-sm">Common uses</h4>
        <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4">
          <li>Terminal splash screens</li>
          <li>Code comments and signatures</li>
          <li>Social media bio text</li>
          <li>Email signatures and greetings</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="tool-card">
      <div class="feature-icon">
        <Type class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Multiple styles</h3>
      <p class="feature-description">
        Choose from standard, block, and simple ASCII art styles for different use cases
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Real-time preview</h3>
      <p class="feature-description">
        See your ASCII art generated instantly as you type with automatic updates
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <Palette class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Easy export</h3>
      <p class="feature-description">
        Copy to clipboard or download your ASCII art as a text file for easy sharing
      </p>
    </div>
  </div>
</ToolLayout>
