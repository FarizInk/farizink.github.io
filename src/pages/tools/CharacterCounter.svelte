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
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary btn-sm" onclick={loadSampleText}>Load sample</button>
    <button class="btn btn-ghost btn-sm" onclick={clearAll}>Clear</button>
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Text Input Area -->
    <div class="lg:col-span-2">
      <div class="tool-card">
        <div class="card-header">
          <h2 class="section-title mb-0">Input text</h2>
          <div class="text-count">
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
              <div class="flex items-center justify-between text-body-sm">
                <span class="text-ink-muted min-w-[100px]">{limit.name}</span>
                <div class="flex items-center gap-2 flex-1">
                  <div class="w-32 bg-sunken rounded-pill h-2">
                    <div
                      class="h-2 rounded-pill transition-[width] {percentage > 100
                        ? 'bg-negative'
                        : 'bg-accent'}"
                      style="width: {Math.min(percentage, 100)}%"
                    ></div>
                  </div>
                  <span class="font-mono text-code text-ink-muted min-w-[60px] text-right">
                    {stats.totalChars}/{limit.limit}
                  </span>
                  {#if percentage > 100}
                    <span class="text-label text-negative">Over</span>
                  {/if}
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
      <div class="tool-card">
        <h2 class="section-title">Quick stats</h2>

        {#if stats}
          <div class="space-y-3">
            <div class="result-row">
              <div class="flex items-center">
                <Type class="w-5 h-5 mr-2 text-accent-text" />
                <span class="text-body-sm text-ink">Characters</span>
              </div>
              <span class="result-value">{stats.totalChars}</span>
            </div>

            <div class="result-row">
              <div class="flex items-center">
                <FileText class="w-5 h-5 mr-2 text-accent-text" />
                <span class="text-body-sm text-ink">Words</span>
              </div>
              <span class="result-value">{stats.words}</span>
            </div>

            <div class="result-row">
              <div class="flex items-center">
                <Hash class="w-5 h-5 mr-2 text-accent-text" />
                <span class="text-body-sm text-ink">Sentences</span>
              </div>
              <span class="result-value">{stats.sentences}</span>
            </div>

            <div class="result-row">
              <div class="flex items-center">
                <Clock class="w-5 h-5 mr-2 text-accent-text" />
                <span class="text-body-sm text-ink">Reading time</span>
              </div>
              <span class="result-value">{stats.readingTimeAvg}m</span>
            </div>
          </div>
        {:else}
          <p class="text-body text-ink-muted text-center py-8">Enter text to see statistics</p>
        {/if}
      </div>

      <!-- Action Buttons -->
      <div class="tool-card">
        <h2 class="section-title">Actions</h2>

        <div class="space-y-3">
          <button
            class="btn btn-secondary w-full"
            onclick={() => copyToClipboard(inputText)}
            disabled={!inputText}
          >
            <Copy class="w-4 h-4" />
            Copy text
          </button>

          <button class="btn btn-primary w-full" onclick={downloadReport} disabled={!stats}>
            <Calculator class="w-4 h-4" />
            Download report
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Statistics -->
  {#if stats}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Character Breakdown -->
      <div class="tool-card">
        <h3 class="section-title">Character breakdown</h3>
        <div class="space-y-2">
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Letters</span>
            <span class="font-mono text-ink">{stats.letters}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Numbers</span>
            <span class="font-mono text-ink">{stats.numbers}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Spaces</span>
            <span class="font-mono text-ink">{stats.spaces}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Punctuation</span>
            <span class="font-mono text-ink">{stats.punctuation}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Special chars</span>
            <span class="font-mono text-ink">{stats.specialChars}</span>
          </div>
        </div>
      </div>

      <!-- Reading Time -->
      <div class="tool-card">
        <h3 class="section-title">Reading time</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-ink-muted mr-2" />
              <span class="text-body-sm text-ink-muted">Slow (130 WPM)</span>
            </div>
            <span class="font-mono text-ink">{stats.readingTimeSlow} min</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-ink-muted mr-2" />
              <span class="text-body-sm text-ink-muted">Average (200 WPM)</span>
            </div>
            <span class="font-mono text-ink">{stats.readingTimeAvg} min</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Clock class="w-4 h-4 text-ink-muted mr-2" />
              <span class="text-body-sm text-ink-muted">Fast (300 WPM)</span>
            </div>
            <span class="font-mono text-ink">{stats.readingTimeFast} min</span>
          </div>
        </div>
      </div>

      <!-- Structure Analysis -->
      <div class="tool-card">
        <h3 class="section-title">Structure analysis</h3>
        <div class="space-y-2">
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Paragraphs</span>
            <span class="font-mono text-ink">{stats.paragraphs}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Lines</span>
            <span class="font-mono text-ink">{stats.lines}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Unique words</span>
            <span class="font-mono text-ink">{stats.uniqueWords}</span>
          </div>
          <div class="flex justify-between text-body-sm">
            <span class="text-ink-muted">Avg word length</span>
            <span class="font-mono text-ink">
              {stats.words > 0 ? (stats.charsNoSpaces / stats.words).toFixed(1) : 0}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Word Frequency -->
    {#if Object.keys(stats.wordFrequency).length > 0}
      <div class="tool-card">
        <div class="card-header">
          <h3 class="section-title mb-0">Most frequent words</h3>
          <BarChart3 class="w-5 h-5 text-ink-muted" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each Object.entries(stats.wordFrequency) as [word, count] (word)}
            <div class="result-row">
              <span class="text-body-sm text-ink capitalize">
                {word}
              </span>
              <span class="font-mono text-code text-ink-muted">{count}x</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <Sparkles class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Comprehensive analysis</h3>
      <p class="feature-description">
        Get detailed statistics including character counts, word counts, and reading time estimates.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Real-time updates</h3>
      <p class="feature-description">
        All statistics update instantly as you type with accurate calculations.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Platform limits</h3>
      <p class="feature-description">
        Check character limits for popular platforms like Twitter, SMS, and social media.
      </p>
    </div>
  </div>
</ToolLayout>
