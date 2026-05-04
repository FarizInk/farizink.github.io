<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { GitCompare, FileText, Zap, Download } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

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
    toast.success('Sample text loaded');
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
    toast.success('Diff copied to clipboard');
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
    toast.success('Diff downloaded');
  }

  function clearAll() {
    text1 = '';
    text2 = '';
    diffResult = null;
    toast.success('Cleared all');
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
</script>

<ToolLayout
  title="Text Diff Tool"
  description="Compare two texts side-by-side and highlight differences."
  icon={GitCompare}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <GitCompare class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Text Diff Tool</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Compare texts and highlight differences
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Options -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diff Options</h3>
    <div class="flex flex-wrap gap-4">
      <label class="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          bind:checked={showLineNumbers}
          class="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <span
          class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500"
        ></span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
          >Show line numbers</span
        >
      </label>
      <label class="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          bind:checked={ignoreWhitespace}
          class="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <span
          class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500"
        ></span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
          >Ignore whitespace</span
        >
      </label>
      <label class="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          bind:checked={ignoreCase}
          class="absolute opacity-0 cursor-pointer h-0 w-0"
        />
        <span
          class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500"
        ></span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">Ignore case</span>
      </label>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={calculateDiff}
      disabled={isProcessing || !text1 || !text2}
      class="btn btn-copy"
    >
      {isProcessing ? 'Calculating...' : 'Compare Text'}
    </button>
    <button
      onclick={loadSampleText}
      class="btn btn-secondary">Load Sample Text</button
    >
    <button
      onclick={clearAll}
      class="btn btn-secondary">Clear All</button
    >
    {#if diffResult}
      <button
        onclick={copyDiff}
        class="btn btn-copy"
      >
        {copiedText === 'diff' ? '✓ Copied!' : 'Copy Diff'}
      </button>
      <button
        onclick={downloadDiff}
        class="btn btn-copy"
      >
        <Download class="w-4 h-4 mr-2" />
        Download Diff
      </button>
    {/if}
  </div>

  <!-- Input Text Areas -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-0">Original Text</h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {text1.split('\n').length} lines
        </span>
      </div>

      <textarea
        bind:value={text1}
        placeholder="Enter the original text here..."
        class="code-editor min-h-[400px]"
      ></textarea>
    </div>

    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-0">Modified Text</h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {text2.split('\n').length} lines
        </span>
      </div>

      <textarea
        bind:value={text2}
        placeholder="Enter the modified text here..."
        class="code-editor min-h-[400px]"
      ></textarea>
    </div>
  </div>

  <!-- Diff Result -->
  {#if diffResult}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-0">Diff Result</h3>
        {#if getStats()}
          <div class="flex gap-4 text-sm">
            <span class="text-green-600 dark:text-green-400">+{getStats()!.added} added</span>
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
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                  {index + 1}
                </span>
              {/if}
              <span class="text-red-600 dark:text-red-400">-</span>
              <pre
                class="text-sm px-2 py-1 rounded flex-1 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20">{line ||
                  '\u00A0'}</pre>
            </div>
            {#if diffResult.added[index]}
              <div class="flex items-start gap-2 py-1">
                {#if showLineNumbers}
                  <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                    {index + 1}
                  </span>
                {/if}
                <span class="text-green-600 dark:text-green-400">+</span>
                <pre
                  class="text-sm px-2 py-1 rounded flex-1 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20">{diffResult
                    .added[index] || '\u00A0'}</pre>
              </div>
            {/if}
          {/each}

          {#each diffResult.unchanged as line, index (line + index + 'unchanged')}
            <div class="flex items-start gap-2 py-1">
              {#if showLineNumbers}
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                  {diffResult.removed.length + index + 1}
                </span>
              {/if}
              <span class="text-gray-400 dark:text-gray-600"> </span>
              <pre
                class="text-sm px-2 py-1 rounded flex-1 text-gray-700 dark:text-gray-300">{line ||
                  '\u00A0'}</pre>
            </div>
          {/each}

          {#each diffResult.added.slice(diffResult.removed.length) as line, index (line + index + 'added')}
            <div class="flex items-start gap-2 py-1">
              {#if showLineNumbers}
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                  {diffResult.removed.length + diffResult.unchanged.length + index + 1}
                </span>
              {/if}
              <span class="text-green-600 dark:text-green-400">+</span>
              <pre
                class="text-sm px-2 py-1 rounded flex-1 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20">{line ||
                  '\u00A0'}</pre>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <GitCompare class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Side by Side Comparison
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Compare two text blocks and easily identify added, removed, and unchanged lines
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <FileText class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy diff results to clipboard or download as a text file for easy sharing
      </p>
    </div>
  </div>
</ToolLayout>
