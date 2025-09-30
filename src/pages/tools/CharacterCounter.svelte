<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Calculator, Copy, FileText, Hash, Clock } from '@lucide/svelte';

  let inputText = $state('');
  let copied = $state('');

  function calculateStats() {
    const text = inputText;
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const readingTime = Math.ceil(words.length / 200); // Average 200 words per minute

    return {
      characters,
      charactersNoSpaces,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime,
      lines: text.split('\n').length
    };
  }

  // Reactive stats calculation
  const stats = $derived(calculateStats());

  function copyToClipboard() {
    const text = `
Character Count Tool Analysis
========================

Characters (with spaces): ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading Time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}

Original Text:
${inputText}
    `.trim();

    navigator.clipboard.writeText(text);
    copied = 'success';
    setTimeout(() => copied = '', 2000);
  }

  function clearAll() {
    inputText = '';
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Update stats whenever text changes
  $effect(() => {
    calculateStats();
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
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
        <Calculator class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Character Counter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Count characters, words, and analyze text with real-time statistics and reading time estimation.
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
      <li class="text-gray-900 dark:text-white font-medium">Character Counter</li>
    </ol>
  </nav>

  <!-- Stats Overview -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <FileText class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.characters.toLocaleString()}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Characters
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <Hash class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.charactersNoSpaces.toLocaleString()}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        No Spaces
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <FileText class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.words.toLocaleString()}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Words
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <FileText class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.sentences.toLocaleString()}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Sentences
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <FileText class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.paragraphs.toLocaleString()}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Paragraphs
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div class="flex items-center justify-center mb-2">
        <Clock class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        {stats.readingTime}
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Min Read
      </div>
    </div>
  </div>

  <!-- Text Input Area -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Input Text
      </h2>
      <div class="flex gap-2">
        <button
          onclick={copyToClipboard}
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputText}
        >
          {#if copied === 'success'}
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          {:else}
            <Copy class="w-4 h-4 mr-1" />
            Copy Stats
          {/if}
        </button>
        <button
          onclick={clearAll}
          class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>

    <textarea
      bind:value={inputText}
      placeholder="Type or paste your text here to see real-time character count, word count, and more..."
      class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    ></textarea>

    <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
      Lines: {stats.lines} • {stats.characters} characters • {stats.words} words • {stats.sentences} sentences
    </div>
  </div>

  <!-- Sample Text -->
  <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Sample Text
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Click below to load a sample text for testing:
    </p>
    <button
      onclick={() => {
        inputText = `The quick brown fox jumps over the lazy dog. This pangram contains all letters of the alphabet and is commonly used for testing purposes.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
      }}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Load Sample Text
    </button>
  </div>

  <!-- Detailed Statistics -->
  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Text Analysis -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Text Analysis
      </h3>

      <div class="space-y-4">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Total Characters:</span>
          <span class="font-medium text-gray-900 dark:text-white">{stats.characters.toLocaleString()}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Characters (no spaces):</span>
          <span class="font-medium text-gray-900 dark:text-white">{stats.charactersNoSpaces.toLocaleString()}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Total Words:</span>
          <span class="font-medium text-gray-900 dark:text-white">{stats.words.toLocaleString()}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Average Word Length:</span>
          <span class="font-medium text-gray-900 dark:text-white">
            {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : '0'}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Total Sentences:</span>
          <span class="font-medium text-gray-900 dark:text-white">{stats.sentences.toLocaleString()}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Total Paragraphs:</span>
          <span class="font-medium text-gray-900 dark:text-white">{stats.paragraphs.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Reading Metrics -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Reading Metrics
      </h3>

      <div class="space-y-4">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Reading Time:</span>
          <span class="font-medium text-gray-900 dark:text-white">
            {stats.readingTime} minute{stats.readingTime !== 1 ? 's' : ''}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Reading Speed:</span>
          <span class="font-medium text-gray-900 dark:text-white">~200 wpm</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Words per Line:</span>
          <span class="font-medium text-gray-900 dark:text-white">
            {stats.lines > 0 ? Math.round(stats.words / stats.lines) : 0}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Characters per Line:</span>
          <span class="font-medium text-gray-900 dark:text-white">
            {stats.lines > 0 ? Math.round(stats.characters / stats.lines) : 0}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Calculator class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Real-time Analysis
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Instant character and word count as you type
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Clock class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Reading Time
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Estimate reading time based on average reading speed
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Copy class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Export Stats
      </h3>
      <p class="text-color-600 dark:text-gray-400">
        Copy analysis results with one click
      </p>
    </div>
  </div>
</div>