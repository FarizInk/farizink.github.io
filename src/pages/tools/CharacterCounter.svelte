<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import {
    Copy,
    FileText,
    Calculator,
    Hash,
    Clock,
    Type,
    BarChart3,
    Sparkles,
    Zap,
    Check
  } from '@lucide/svelte';

  // Component state
  let inputText = $state('');

  // Calculate text statistics
  const stats = $derived(
    inputText
      ? {
          // Character counts
          totalChars: inputText.length,
          charsNoSpaces: inputText.replace(/\s/g, '').length,
          charsIncludingSpaces: inputText.length,

          // Word counts
          words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
          uniqueWords: inputText.trim()
            ? new Set(inputText.toLowerCase().trim().split(/\s+/)).size
            : 0,

          // Sentence and paragraph counts
          sentences: inputText.trim()
            ? inputText.split(/[\\.!?]+/).filter(s => s.trim().length > 0).length
            : 0,
          paragraphs: inputText.trim()
            ? inputText.split(/\n\n+/).filter(p => p.trim().length > 0).length
            : 0,
          lines: inputText.split('\n').length,

          // Reading time calculations
          readingTimeSlow: Math.ceil(inputText.trim().split(/\s+/).length / 130), // 130 WPM (slow)
          readingTimeAvg: Math.ceil(inputText.trim().split(/\s+/).length / 200), // 200 WPM (average)
          readingTimeFast: Math.ceil(inputText.trim().split(/\s+/).length / 300), // 300 WPM (fast)

          // Character type breakdown
          letters: (inputText.match(/[a-zA-Z]/g) || []).length,
          numbers: (inputText.match(/[0-9]/g) || []).length,
          spaces: (inputText.match(/\s/g) || []).length,
          punctuation: (inputText.match(/[.,!?;:'"\-()[\]{}]/g) || []).length,
          specialChars:
            inputText.length - (inputText.match(/[a-zA-Z0-9\s.,!?;:'"\-()[\]{}]/g) || []).length,

          // Most frequent words
          wordFrequency: inputText.trim() ? getWordFrequency(inputText.toLowerCase()) : {}
        }
      : null
  );

  function getWordFrequency(text: string): Record<string, number> {
    const words = text.split(/\s+/);
    const frequency: Record<string, number> = {};

    words.forEach(word => {
      // Clean word from punctuation
      const cleanWord = word.replace(/[.,!?;:'"()[\]{}]/g, '');
      if (cleanWord.length > 0) {
        frequency[cleanWord] = (frequency[cleanWord] || 0) + 1;
      }
    });

    // Sort by frequency and return top 10
    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return Object.fromEntries(sorted);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function getLimitColor(current: number, limit: number): string {
    const percent = (current / limit) * 100;
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 80) return 'bg-warning-500';
    return 'bg-green-500';
  }

  function getLimitPercent(current: number, limit: number): number {
    return Math.min((current / limit) * 100, 100);
  }

  function clearAll() {
    inputText = '';
  }

  function loadSampleText() {
    inputText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This sample text contains 123 numbers and various punctuation marks! It's designed to test the character counter functionality comprehensively.`;
  }

  function downloadReport() {
    if (!stats) return;

    const report = `Character Counter Report
====================

Text Length: ${stats.totalChars} characters
Words: ${stats.words} words
Sentences: ${stats.sentences} sentences
Paragraphs: ${stats.paragraphs} paragraphs

Detailed Breakdown:
- Characters (with spaces): ${stats.charsIncludingSpaces}
- Characters (no spaces): ${stats.charsNoSpaces}
- Letters: ${stats.letters}
- Numbers: ${stats.numbers}
- Spaces: ${stats.spaces}
- Punctuation: ${stats.punctuation}
- Special characters: ${stats.specialChars}
- Lines: ${stats.lines}
- Unique words: ${stats.uniqueWords}

Reading Time:
- Slow reader (130 WPM): ${stats.readingTimeSlow} minutes
- Average reader (200 WPM): ${stats.readingTimeAvg} minutes
- Fast reader (300 WPM): ${stats.readingTimeFast} minutes

${
  Object.keys(stats.wordFrequency).length > 0
    ? `
Top 10 Most Frequent Words:
${Object.entries(stats.wordFrequency)
  .map(([word, count]) => `- ${word}: ${count} times`)
  .join('\n')}
`
    : ''
}

Original Text:
${inputText}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character-counter-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Character limit indicators
  const commonLimits = [
    { name: 'Twitter', limit: 280 },
    { name: 'SMS', limit: 160 },
    { name: 'LinkedIn Post', limit: 3000 },
    { name: 'Facebook Post', limit: 63206 },
    { name: 'Instagram Caption', limit: 2200 }
  ];
</script>

<ToolLayout
  title="Character Counter"
  description="Count characters, words, and analyze text with detailed statistics including reading time and frequency analysis"
  icon={Calculator}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Calculator class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Text Analysis</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive statistics including reading time and word frequency
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          class="btn btn-copy"
          onclick={loadSampleText}
        >
          Load Sample
        </button>
        <button
          class="btn btn-secondary"
          onclick={clearAll}
        >
          Clear
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Text Input Area -->
    <div class="lg:col-span-2">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {inputText.length} chars
          </div>
        </div>

        <textarea
          class="code-editor min-h-[320px]"
          bind:value={inputText}
          placeholder="Enter your text here to count characters, words, and analyze..."
        ></textarea>

        <!-- Character Limit Indicators -->
        {#if stats && stats.totalChars > 0}
          <div class="mt-4 space-y-2">
            {#each commonLimits as limit (limit.name)}
              {@const percentage = (stats.totalChars / limit.limit) * 100}
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400 min-w-[100px]">{limit.name}</span>
                <div class="flex items-center gap-2 flex-1">
                  <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all {percentage > 100
                        ? 'bg-red-500'
                        : percentage > 80
                          ? 'bg-warning-500'
                          : 'bg-green-500'}"
                      style="width: {Math.min(percentage, 100)}%"
                    ></div>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400 min-w-[60px] text-right">
                    {stats.totalChars}/{limit.limit}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Statistics Panel -->
    <div class="space-y-4">
      <!-- Quick Stats -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>

        {#if stats}
          <div class="space-y-3">
            <div
              class="flex items-center justify-between p-3 rounded-lg bg-warning-50 dark:bg-primary-900/20"
            >
              <div class="flex items-center">
                <Type class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Characters</span>
              </div>
              <span class="text-lg font-bold text-warning-600 dark:text-primary-400"
                >{stats.totalChars}</span
              >
            </div>

            <div
              class="flex items-center justify-between p-3 rounded-lg bg-warning-50 dark:bg-primary-900/20"
            >
              <div class="flex items-center">
                <FileText class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Words</span>
              </div>
              <span class="text-lg font-bold text-warning-600 dark:text-primary-400"
                >{stats.words}</span
              >
            </div>

            <div
              class="flex items-center justify-between p-3 rounded-lg bg-warning-50 dark:bg-primary-900/20"
            >
              <div class="flex items-center">
                <Hash class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Sentences</span>
              </div>
              <span class="text-lg font-bold text-warning-600 dark:text-primary-400"
                >{stats.sentences}</span
              >
            </div>

            <div
              class="flex items-center justify-between p-3 rounded-lg bg-warning-50 dark:bg-primary-900/20"
            >
              <div class="flex items-center">
                <Clock class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">Reading Time</span>
              </div>
              <span class="text-lg font-bold text-warning-600 dark:text-primary-400"
                >{stats.readingTimeAvg}m</span
              >
            </div>
          </div>
        {:else}
          <p class="text-gray-500 dark:text-gray-400 text-center py-8">
            Enter text to see statistics
          </p>
        {/if}
      </div>

      <!-- Action Buttons -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h2>

        <div class="space-y-3">
          <button
            class="btn btn-copy w-full"
            onclick={() => copyToClipboard(inputText)}
            disabled={!inputText}
          >
            <Copy class="w-4 h-4" />
            Copy Text
          </button>

          <button
            class="btn btn-copy w-full"
            onclick={downloadReport}
            disabled={!stats}
          >
            <Calculator class="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Statistics -->
  {#if stats}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <!-- Character Breakdown -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Character Breakdown
        </h3>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Letters</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.letters}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Numbers</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.numbers}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Spaces</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.spaces}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Punctuation</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.punctuation}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Special chars</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.specialChars}</span>
          </div>
        </div>
      </div>

      <!-- Reading Time -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reading Time</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-gray-400 mr-2" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Slow (130 WPM)</span>
            </div>
            <span class="font-medium text-gray-900 dark:text-white"
              >{stats.readingTimeSlow} min</span
            >
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-gray-400 mr-2" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Average (200 WPM)</span>
            </div>
            <span class="font-medium text-gray-900 dark:text-white">{stats.readingTimeAvg} min</span
            >
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-gray-400 mr-2" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Fast (300 WPM)</span>
            </div>
            <span class="font-medium text-gray-900 dark:text-white"
              >{stats.readingTimeFast} min</span
            >
          </div>
        </div>
      </div>

      <!-- Structure Analysis -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Structure Analysis</h3>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Paragraphs</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.paragraphs}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Lines</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.lines}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Unique words</span>
            <span class="font-medium text-gray-900 dark:text-white">{stats.uniqueWords}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-400">Avg word length</span>
            <span class="font-medium text-gray-900 dark:text-white">
              {stats.words > 0 ? (stats.charsNoSpaces / stats.words).toFixed(1) : 0}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Word Frequency -->
    {#if Object.keys(stats.wordFrequency).length > 0}
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-4 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Most Frequent Words</h3>
          <BarChart3 class="w-5 h-5 text-gray-400" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each Object.entries(stats.wordFrequency) as [word, count] (word)}
            <div
              class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <span class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {word}
              </span>
              <span class="text-sm text-gray-600 dark:text-gray-400">{count}x</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Sparkles class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Comprehensive Analysis
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Get detailed statistics including character counts, word counts, and reading time estimates.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        All statistics update instantly as you type with accurate calculations.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platform Limits</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Check character limits for popular platforms like Twitter, SMS, and social media.
      </p>
    </div>
  </div>
</ToolLayout>
