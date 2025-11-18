<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Image, Copy, Download, Type, Zap, Palette, Check } from '@lucide/svelte';

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
  }

  function downloadAsciiArt() {
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    inputText = '';
    asciiArt = '';
  }

  function loadSampleText() {
    inputText = 'HELLO';
    generateAsciiArt();
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in input text or style
  $effect(() => {
    generateAsciiArt();
  });
</script>

<div class="max-w-6xl mx-auto p-6">
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"
      >
        <Image class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">ASCII Art Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert text into ASCII art with different styles. Perfect for terminal displays and
        creative text art.
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
      <li class="text-gray-900 dark:text-white font-medium">ASCII Art Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSampleText}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Load Sample Text
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <!-- Style Selector -->
  <div class="mb-6">
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Art Style</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each Object.entries(asciiStyles) as [key, style], index (index)}
          <button
            onclick={() => (selectedStyle = key)}
            class="p-4 border-2 rounded-lg transition-all {selectedStyle === key
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}"
          >
            <div class="text-left">
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">{style.name}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">
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
  </div>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {inputText.length} characters
      </span>
    </div>
    <input
      type="text"
      bind:value={inputText}
      placeholder="Enter text to convert to ASCII art..."
      class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      maxlength={10}
    />
    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.
    </p>
  </div>

  <!-- ASCII Art Result -->
  {#if asciiArt}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">ASCII Art Result</h3>
        <div class="flex gap-2">
          <button
            onclick={copyToClipboard}
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            {#if copiedText === 'ascii'}
              <Check class="w-4 h-4" />
              Copied!
            {:else}
              <Copy class="w-4 h-4" />
              Copy
            {/if}
          </button>
          <button
            onclick={downloadAsciiArt}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download class="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div class="relative">
        <pre
          class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto whitespace-pre">{asciiArt}</pre>
      </div>
    </div>
  {/if}

  <!-- Character Set Reference -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Characters</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="text-sm">
        <span class="font-medium text-gray-900 dark:text-white">Letters:</span>
        <span class="text-gray-600 dark:text-gray-400"> A-Z</span>
      </div>
      <div class="text-sm">
        <span class="font-medium text-gray-900 dark:text-white">Numbers:</span>
        <span class="text-gray-600 dark:text-gray-400"> 0-9</span>
      </div>
      <div class="text-sm">
        <span class="font-medium text-gray-900 dark:text-white">Punctuation:</span>
        <span class="text-gray-600 dark:text-gray-400"> ! ? . ,</span>
      </div>
      <div class="text-sm">
        <span class="font-medium text-gray-900 dark:text-white">Space:</span>
        <span class="text-gray-600 dark:text-gray-400"> Supported</span>
      </div>
    </div>
  </div>

  <!-- Usage Tips -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Tips</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Best Practices</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Keep text short (under 10 characters)</li>
          <li>• Use uppercase letters for better results</li>
          <li>• Experiment with different styles</li>
          <li>• Works great in terminal applications</li>
        </ul>
      </div>
      <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Terminal splash screens</li>
          <li>• Code comments and signatures</li>
          <li>• Social media bio text</li>
          <li>• Email signatures and greetings</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Type class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Styles</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Choose from standard, block, and simple ASCII art styles for different use cases
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3>
      <p class="text-gray-600 dark:text-gray-400">
        See your ASCII art generated instantly as you type with automatic updates
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Palette class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy to clipboard or download your ASCII art as a text file for easy sharing
      </p>
    </div>
  </div>
</div>
