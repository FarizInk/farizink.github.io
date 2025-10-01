<script lang="ts">
  import { Copy, RefreshCw, Type, ArrowRight, ChevronLeft } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

  // Component state
  let inputText = $state('');
  let convertedText = $state('');
  let copied = $state(false);
  let activeCase = $state('uppercase');

  // Case conversion functions
  const caseConversions = {
    uppercase: (text: string) => text.toUpperCase(),
    lowercase: (text: string) => text.toLowerCase(),
    title: (text: string) => {
      return text.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    },
    camelCase: (text: string) => {
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
    },
    snakeCase: (text: string) => {
      return text.toLowerCase().replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).join('_');
    },
    kebabCase: (text: string) => {
      return text.toLowerCase().replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).join('-');
    },
    pascalCase: (text: string) => {
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
        return word.toUpperCase();
      }).replace(/\s+/g, '');
    },
    sentence: (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    alternating: (text: string) => {
      return text.split('').map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
      }).join('');
    },
    inverse: (text: string) => {
      return text.split('').map(char => {
        return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
      }).join('');
    }
  };

  // Convert text based on selected case
  function convertText() {
    if (!inputText.trim()) {
      convertedText = '';
      return;
    }

    const converter = caseConversions[activeCase as keyof typeof caseConversions];
    convertedText = converter(inputText);
  }

  // Auto-convert when input or case changes
  $effect(() => {
    if (inputText) {
      convertText();
    } else {
      convertedText = '';
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(convertedText).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function clearAll() {
    inputText = '';
    convertedText = '';
  }

  function swapTexts() {
    const temp = inputText;
    inputText = convertedText;
  }

  function downloadAsFile() {
    const blob = new Blob([convertedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${activeCase}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Get text statistics
  const textStats = $derived(inputText ? {
    characters: inputText.length,
    charactersNoSpaces: inputText.replace(/\s/g, '').length,
    words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
    sentences: inputText.trim() ? inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
    lines: inputText.split('\n').length
  } : null);
</script>

<svelte:head>
  <title>Text Case Converter - Developer Tools</title>
  <meta name="description" content="Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more" />
</svelte:head>

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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4"
      >
        <Type class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Text Case Converter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert text between different case formats with ease
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
      <li class="text-gray-900 dark:text-white font-medium">Text Case Converter</li>
    </ol>
  </nav>

  <!-- Case Selection -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Select Case Type
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {#each Object.entries(caseConversions) as [caseType, converter]}
        {@const examples = {
          uppercase: 'HELLO WORLD',
          lowercase: 'hello world',
          title: 'Hello World',
          camelCase: 'helloWorld',
          snakeCase: 'hello_world',
          kebabCase: 'hello-world',
          pascalCase: 'HelloWorld',
          sentence: 'Hello world',
          alternating: 'hElLo wOrLd',
          inverse: 'HELLO WORLD'
        }}

        <button
          type="button"
          onclick={() => activeCase = caseType}
          class="relative p-3 rounded-lg border-2 transition-all {activeCase === caseType
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }"
        >
          <div class="flex items-center justify-center mb-2">
            <Type class="w-5 h-5 {activeCase === caseType ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}" />
          </div>

          <div class="text-sm font-medium text-gray-900 dark:text-white capitalize mb-1">
            {caseType.replace(/([A-Z])/g, ' $1').trim()}
          </div>

          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono text-center">
            {examples[caseType as keyof typeof examples]}
          </div>

          {#if activeCase === caseType}
            <div class="absolute top-1 right-1">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Input Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Input Text
        </h2>
        <button
          onclick={clearAll}
          class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>

      <textarea
        bind:value={inputText}
        placeholder="Enter your text here..."
        class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      ></textarea>

      {#if textStats}
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span class="font-medium">Characters:</span> {textStats.characters}
            </div>
            <div>
              <span class="font-medium">No spaces:</span> {textStats.charactersNoSpaces}
            </div>
            <div>
              <span class="font-medium">Words:</span> {textStats.words}
            </div>
            <div>
              <span class="font-medium">Sentences:</span> {textStats.sentences}
            </div>
            <div>
              <span class="font-medium">Lines:</span> {textStats.lines}
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Output Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Converted Text
        </h2>
        <div class="flex items-center gap-2">
          <button
            onclick={swapTexts}
            disabled={!inputText || !convertedText}
            class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Swap input and output"
          >
            <ArrowRight class="w-4 h-4 rotate-180" />
          </button>
          <button
            onclick={copyToClipboard}
            disabled={!convertedText}
            class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Copy class="w-4 h-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <textarea
        bind:value={convertedText}
        readonly
        placeholder="Converted text will appear here..."
        class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
      ></textarea>

      <div class="mt-4 flex gap-2">
        <button
          onclick={downloadAsFile}
          disabled={!convertedText}
          class="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Download as File
        </button>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Quick Actions
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onclick={() => {
          inputText = 'Hello World! This is a SAMPLE text for TESTING.';
          activeCase = 'uppercase';
        }}
        class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        Load Sample Text
      </button>

      <button
        onclick={() => activeCase = 'uppercase'}
        class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        UPPERCASE
      </button>

      <button
        onclick={() => activeCase = 'lowercase'}
        class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        lowercase
      </button>

      <button
        onclick={() => activeCase = 'title'}
        class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        Title Case
      </button>
    </div>
  </div>
</div>