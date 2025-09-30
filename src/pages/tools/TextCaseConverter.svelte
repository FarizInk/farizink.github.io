<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Type, Copy, RotateCcw } from '@lucide/svelte';

  let inputText = $state('');
  let outputText = $state('');
  let copied = $state('');

  const caseTypes = [
    { id: 'uppercase', name: 'UPPERCASE', description: 'Convert all letters to uppercase' },
    { id: 'lowercase', name: 'lowercase', description: 'Convert all letters to lowercase' },
    {
      id: 'titlecase',
      name: 'Title Case',
      description: 'Capitalize The First Letter Of Each Word'
    },
    {
      id: 'sentencecase',
      name: 'Sentence case',
      description: 'Capitalize the first letter of each sentence'
    },
    { id: 'camelcase', name: 'camelCase', description: 'Convert to camelCase notation' },
    { id: 'pascalcase', name: 'PascalCase', description: 'Convert to PascalCase notation' },
    { id: 'snakecase', name: 'snake_case', description: 'Convert to snake_case notation' },
    { id: 'kebabcase', name: 'kebab-case', description: 'Convert to kebab-case notation' },
    {
      id: 'alternatingcase',
      name: 'AlTeRnAtInG CaSe',
      description: 'Convert to alternating letter case'
    },
    { id: 'inversecase', name: 'iNVERSE cASE', description: 'Invert the case of each letter' }
  ];

  function convertText(caseType: string) {
    if (!inputText.trim()) {
      outputText = '';
      return;
    }

    switch (caseType) {
      case 'uppercase':
        outputText = inputText.toUpperCase();
        break;
      case 'lowercase':
        outputText = inputText.toLowerCase();
        break;
      case 'titlecase':
        outputText = inputText.replace(
          /\w\S*/g,
          txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'sentencecase':
        outputText =
          inputText.charAt(0).toUpperCase() +
          inputText
            .slice(1)
            .toLowerCase()
            .replace(/[.!?]\s*/g, match => match.toUpperCase());
        break;
      case 'camelcase':
        outputText = inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, letter, offset) =>
            offset === 0 ? letter.toLowerCase() : letter.toUpperCase()
          );
        break;
      case 'pascalcase':
        outputText = inputText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, letter) => letter.toUpperCase());
        break;
      case 'snakecase':
        outputText = inputText
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '');
        break;
      case 'kebabcase':
        outputText = inputText
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        break;
      case 'alternatingcase':
        outputText = inputText
          .split('')
          .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join('');
        break;
      case 'inversecase':
        outputText = inputText
          .split('')
          .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
          .join('');
        break;
      default:
        outputText = inputText;
    }
  }

  function copyToClipboard() {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      copied = 'success';
      setTimeout(() => (copied = ''), 2000);
    }
  }

  function clearAll() {
    inputText = '';
    outputText = '';
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Update output when input or case changes
  let selectedCase = $state('uppercase');
  $effect(() => {
    if (inputText && selectedCase) {
      convertText(selectedCase);
    }
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4"
      >
        <Type class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Case Converter</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert text between different case formats with ease. Perfect for developers and content
        creators.
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

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Input Text</h2>
      <textarea
        bind:value={inputText}
        placeholder="Enter your text here..."
        class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      ></textarea>

      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {inputText.length} characters
        </div>
        <div class="flex gap-2">
          <button
            onclick={clearAll}
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw class="w-4 h-4 mr-1" />
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Output Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Converted Text</h2>
      <div class="relative">
        <textarea
          bind:value={outputText}
          readonly
          placeholder="Converted text will appear here..."
          class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
        ></textarea>
        {#if !outputText}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="text-gray-400 dark:text-gray-600">Converted text will appear here...</p>
          </div>
        {/if}
      </div>

      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {outputText.length} characters
        </div>
        <button
          onclick={copyToClipboard}
          class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!outputText}
        >
          {#if copied === 'success'}
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          {:else}
            <Copy class="w-4 h-4 mr-1" />
            Copy
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Case Selection -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Case Type</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each caseTypes as caseType (caseType.id)}
        <button
          onclick={() => {
            selectedCase = caseType.id;
            convertText(caseType.id);
          }}
          class="text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors {selectedCase ===
          caseType.id
            ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 dark:border-cyan-400'
            : ''}"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
            {caseType.name}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {caseType.description}
          </p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Sample Text -->
  <div
    class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sample Text</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Click below to load a sample text for testing:
    </p>
    <button
      onclick={() => {
        inputText =
          'This is a SAMPLE text for DEMONSTRATION purposes. You can try different CASE conversions to see how they work!';
        convertText(selectedCase);
      }}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Load Sample Text
    </button>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Type class="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Cases</h3>
      <p class="text-gray-600 dark:text-gray-400">Support for 10 different text case formats</p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <RotateCcw class="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Conversion</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instant conversion as you type or change case type
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Copy class="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy converted text to clipboard with one click
      </p>
    </div>
  </div>
</div>
