<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, FileText, Copy, RotateCcw, FilePlus, FileMinus } from '@lucide/svelte';

  let loremText = $state('');
  let wordCount = $state(50);
  let sentenceCount = $state(5);
  let paragraphCount = $state(3);
  let startWithLorem = $state(true);
  let copied = $state('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
    'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse',
    'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
    'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum', 'dolorum', 'fugiat', 'veniam', 'aliqua',
    'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco',
    'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
    'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse',
    'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
    'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  function generateLorem() {
    let result = [];

    // Always start with "Lorem ipsum dolor sit amet"
    if (startWithLorem) {
      result.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
    }

    // Generate remaining words
    const remainingWords = Math.max(0, wordCount - (startWithLorem ? 5 : 0));
    for (let i = 0; i < remainingWords; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      result.push(loremWords[randomIndex]);
    }

    // Create sentences
    let sentences = [];
    let currentSentence = [];

    for (const word of result) {
      currentSentence.push(word);

      // End sentence randomly every 5-15 words
      if (Math.random() < 0.15 || currentSentence.length >= 15) {
        sentences.push(currentSentence.join(' ') + '.');
        currentSentence = [];
      }
    }

    // Add final sentence if needed
    if (currentSentence.length > 0) {
      sentences.push(currentSentence.join(' ') + '.');
    }

    // Limit to requested sentence count
    sentences = sentences.slice(0, sentenceCount);

    // Create paragraphs
    let paragraphs = [];
    const wordsPerParagraph = Math.ceil(sentences.length / paragraphCount);

    for (let i = 0; i < paragraphCount; i++) {
      const startIdx = i * wordsPerParagraph;
      const endIdx = Math.min(startIdx + wordsPerParagraph, sentences.length);
      if (startIdx < sentences.length) {
        paragraphs.push(sentences.slice(startIdx, endIdx).join(' '));
      }
    }

    loremText = paragraphs.join('\n\n');
  }

  function copyToClipboard() {
    if (loremText) {
      navigator.clipboard.writeText(loremText);
      copied = 'success';
      setTimeout(() => copied = '', 2000);
    }
  }

  function clearAll() {
    loremText = '';
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Auto-generate when parameters change
  $effect(() => {
    generateLorem();
  });

  // Generate initial lorem text
  generateLorem();
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
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
        <FileText class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Lorem Ipsum Generator
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate placeholder text for design and testing purposes with customizable options.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">Lorem Ipsum Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      Generator Settings
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Word Count -->
      <div>
        <label for="wordCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Word Count: {wordCount}
        </label>
        <input
          id="wordCount"
          type="range"
          min="10"
          max="500"
          step="10"
          bind:value={wordCount}
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10</span>
          <span>500</span>
        </div>
      </div>

      <!-- Sentence Count -->
      <div>
        <label for="sentenceCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sentence Count: {sentenceCount}
        </label>
        <input
          id="sentenceCount"
          type="range"
          min="1"
          max="50"
          step="1"
          bind:value={sentenceCount}
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1</span>
          <span>50</span>
        </div>
      </div>

      <!-- Paragraph Count -->
      <div>
        <label for="paragraphCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Paragraph Count: {paragraphCount}
        </label>
        <input
          id="paragraphCount"
          type="range"
          min="1"
          max="20"
          step="1"
          bind:value={paragraphCount}
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <!-- Start with Lorem -->
      <div>
        <label class="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            bind:checked={startWithLorem}
            class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Start with "Lorem ipsum"
          </span>
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 mt-6">
      <button
        onclick={generateLorem}
        class="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Generate Text
      </button>
      <button
        onclick={clearAll}
        class="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
      >
        <RotateCcw class="w-4 h-4 mr-1" />
        Clear
      </button>
    </div>
  </div>

  <!-- Output -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Generated Text
      </h2>
      <div class="flex gap-2">
        <button
          onclick={copyToClipboard}
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!loremText}
        >
          {#if copied === 'success'}
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          {:else}
            <Copy class="w-4 h-4 mr-1" />
            Copy
          {/if}
        </button>
      </div>
    </div>

    <div class="relative">
      <textarea
        bind:value={loremText}
        readonly
        placeholder="Generated Lorem ipsum text will appear here..."
        class="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none font-serif"
      ></textarea>
      {#if !loremText}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p class="text-gray-400 dark:text-gray-600">
            Click "Generate Text" to create Lorem ipsum text
          </p>
        </div>
      {/if}
    </div>

    <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
      {loremText.split(/\s+/).length} words • {loremText.split('.').length - 1} sentences • {loremText.split(/\n\n/).filter(p => p.trim()).length} paragraphs
    </div>
  </div>

  <!-- Quick Presets -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Quick Presets
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onclick={() => {
          wordCount = 50;
          sentenceCount = 5;
          paragraphCount = 2;
          generateLorem();
        }}
        class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors text-left"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
          Short Text
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          50 words, 2 paragraphs
        </p>
      </button>

      <button
        onclick={() => {
          wordCount = 100;
          sentenceCount = 8;
          paragraphCount = 3;
          generateLorem();
        }}
        class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors text-left"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
          Medium Text
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          100 words, 3 paragraphs
        </p>
      </button>

      <button
        onclick={() => {
          wordCount = 250;
          sentenceCount = 20;
          paragraphCount = 5;
          generateLorem();
        }}
        class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors text-left"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
          Long Text
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          250 words, 5 paragraphs
        </p>
      </button>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <FilePlus class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Customizable Length
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Adjust word, sentence, and paragraph counts to your needs
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <RotateCcw class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Regenerate Instantly
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Create new variations with a single click
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <Copy class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Easy Copy
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy generated text with one click
      </p>
    </div>
  </div>
</div>