<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, GitCompare, FileText, Zap } from '@lucide/svelte';

  let text1 = $state('');
  let text2 = $state('');
  let diffResult = $state<{ added: string[]; removed: string[]; unchanged: string[] } | null>(null);
  let showLineNumbers = $state(true);
  let ignoreWhitespace = $state(false);
  let ignoreCase = $state(false);
  let copiedText = $state('');
  let isProcessing = $state(false);

  function calculateDiff() {
    isProcessing = true;

    try {
      let lines1 = text1.split('\n');
      let lines2 = text2.split('\n');

      if (ignoreWhitespace) {
        lines1 = lines1.map(line => line.trim());
        lines2 = lines2.map(line => line.trim());
      }

      if (ignoreCase) {
        lines1 = lines1.map(line => line.toLowerCase());
        lines2 = lines2.map(line => line.toLowerCase());
      }

      const result = {
        added: [] as string[],
        removed: [] as string[],
        unchanged: [] as string[]
      };

      const maxLines = Math.max(lines1.length, lines2.length);

      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        if (i >= lines1.length) {
          result.added.push(line2);
        } else if (i >= lines2.length) {
          result.removed.push(line1);
        } else if (line1 === line2) {
          result.unchanged.push(line1);
        } else {
          result.removed.push(line1);
          result.added.push(line2);
        }
      }

      diffResult = result;
    } catch (error) {
      console.error('Error calculating diff:', error);
    } finally {
      isProcessing = false;
    }
  }

  function loadSampleText() {
    text1 = `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`;

    text2 = `function calculateSum(a, b, c) {
  return a + b + c;
}

const result = calculateSum(5, 3, 2);
console.log('Result:', result);`;

    calculateDiff();
  }

  function copyDiff() {
    if (!diffResult) return;

    let diffText = '';

    diffResult.removed?.forEach((line, index) => {
      diffText += `- ${line}\n`;
      if (diffResult?.added?.[index]) {
        diffText += `+ ${diffResult.added[index]}\n`;
      }
    });

    diffResult.unchanged?.forEach(line => {
      diffText += `  ${line}\n`;
    });

    // Add remaining added lines
    if (diffResult.added.length > diffResult.removed.length) {
      for (let i = diffResult.removed.length; i < diffResult.added.length; i++) {
        diffText += `+ ${diffResult.added[i]}\n`;
      }
    }

    navigator.clipboard.writeText(diffText);
    copiedText = 'diff';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadDiff() {
    if (!diffResult) return;

    let diffText = '';

    diffResult.removed?.forEach((line, index) => {
      diffText += `- ${line}\n`;
      if (diffResult?.added?.[index]) {
        diffText += `+ ${diffResult.added[index]}\n`;
      }
    });

    diffResult.unchanged?.forEach(line => {
      diffText += `  ${line}\n`;
    });

    if (diffResult.added.length > diffResult.removed.length) {
      for (let i = diffResult.removed.length; i < diffResult.added.length; i++) {
        diffText += `+ ${diffResult.added[i]}\n`;
      }
    }

    const blob = new Blob([diffText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-result.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    text1 = '';
    text2 = '';
    diffResult = null;
  }

  function getStats() {
    if (!diffResult) return null;

    return {
      added: diffResult.added.length,
      removed: diffResult.removed.length,
      unchanged: diffResult.unchanged.length,
      total: diffResult.added.length + diffResult.removed.length + diffResult.unchanged.length
    };
  }

  function handleBackToTools() {
    navigate('/tools');
  }
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <GitCompare class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Diff Tool</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Compare two text blocks and highlight differences with detailed analysis.
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
      <li class="text-gray-900 dark:text-white font-medium">Text Diff Tool</li>
    </ol>
  </nav>

  <!-- Options -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diff Options</h3>
    <div class="flex flex-wrap gap-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={showLineNumbers}
          class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">Show line numbers</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={ignoreWhitespace}
          class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">Ignore whitespace</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={ignoreCase}
          class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">Ignore case</span>
      </label>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={calculateDiff}
      disabled={isProcessing || !text1 || !text2}
      class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? 'Calculating...' : 'Compare Text'}
    </button>
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
    {#if diffResult}
      <button
        onclick={copyDiff}
        class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {copiedText === 'diff' ? '✓ Copied!' : 'Copy Diff'}
      </button>
      <button
        onclick={downloadDiff}
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Download Diff
      </button>
    {/if}
  </div>

  <!-- Input Text Areas -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Original Text</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {text1.split('\n').length} lines
        </span>
      </div>
      <textarea
        bind:value={text1}
        placeholder="Enter the original text here..."
        class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      ></textarea>
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Modified Text</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {text2.split('\n').length} lines
        </span>
      </div>
      <textarea
        bind:value={text2}
        placeholder="Enter the modified text here..."
        class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      ></textarea>
    </div>
  </div>

  <!-- Diff Result -->
  {#if diffResult}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Diff Result</h3>
        {#if getStats()}
          <div class="flex gap-4 text-sm">
            <span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">+{getStats()!.added} added</span>
            <span class="text-red-600 dark:text-red-400">-{getStats()!.removed} removed</span>
            <span class="text-gray-600 dark:text-gray-400">{getStats()!.unchanged} unchanged</span>
          </div>
        {/if}
      </div>

      <div class="overflow-x-auto">
        <div class="min-w-full">
          {#each diffResult.removed as line, index (line + index + 'removed')}
            <div class="flex items-start gap-2 py-1">
              {#if showLineNumbers}
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"
                  >{index + 1}</span
                >
              {/if}
              <span class="text-red-600 dark:text-red-400">-</span>
              <pre
                class="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded flex-1">{line ||
                  '\u00A0'}</pre>
            </div>
            {#if diffResult.added[index]}
              <div class="flex items-start gap-2 py-1">
                {#if showLineNumbers}
                  <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"
                    >{index + 1}</span
                  >
                {/if}
                <span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">+</span>
                <pre
                  class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1">{diffResult
                    .added[index] || '\u00A0'}</pre>
              </div>
            {/if}
          {/each}

          {#each diffResult.unchanged as line, index (line + index + 'unchanged')}
            <div class="flex items-start gap-2 py-1">
              {#if showLineNumbers}
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"
                  >{diffResult.removed.length + index + 1}</span
                >
              {/if}
              <span class="text-gray-400 dark:text-gray-600"> </span>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-1">{line ||
                  '\u00A0'}</pre>
            </div>
          {/each}

          {#each diffResult.added.slice(diffResult.removed.length) as line, index (line + index + 'added')}
            <div class="flex items-start gap-2 py-1">
              {#if showLineNumbers}
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"
                  >{diffResult.removed.length + diffResult.unchanged.length + index + 1}</span
                >
              {/if}
              <span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">+</span>
              <pre
                class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1">{line ||
                  '\u00A0'}</pre>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <GitCompare class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Side by Side Comparison
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Compare two text blocks and easily identify added, removed, and unchanged lines
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Copy diff results to clipboard or download as a text file for easy sharing
      </p>
    </div>
  </div>
</div>
