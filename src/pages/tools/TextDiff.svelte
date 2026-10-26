<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { GitCompare, FileText, Zap, Download, Copy, Check } from '@lucide/svelte';
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
  <!-- Options -->
  <div class="tool-card">
    <h3 class="section-title">Diff options</h3>
    <div class="flex flex-wrap gap-4">
      <label class="custom-checkbox">
        <input type="checkbox" bind:checked={showLineNumbers} />
        <span class="checkmark"></span>
        <span class="label-text">Show line numbers</span>
      </label>
      <label class="custom-checkbox">
        <input type="checkbox" bind:checked={ignoreWhitespace} />
        <span class="checkmark"></span>
        <span class="label-text">Ignore whitespace</span>
      </label>
      <label class="custom-checkbox">
        <input type="checkbox" bind:checked={ignoreCase} />
        <span class="checkmark"></span>
        <span class="label-text">Ignore case</span>
      </label>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    <button
      onclick={calculateDiff}
      disabled={isProcessing || !text1 || !text2}
      class="btn btn-primary"
    >
      {isProcessing ? 'Calculating...' : 'Compare text'}
    </button>
    <button onclick={loadSampleText} class="btn btn-secondary">Load sample text</button>
    <button onclick={clearAll} class="btn btn-ghost">Clear all</button>
    {#if diffResult}
      <button onclick={copyDiff} class="btn btn-secondary">
        {#if copiedText === 'diff'}
          <Check class="w-4 h-4" />
          Copied
        {:else}
          <Copy class="w-4 h-4" />
          Copy diff
        {/if}
      </button>
      <button onclick={downloadDiff} class="btn btn-secondary">
        <Download class="w-4 h-4" />
        Download diff
      </button>
    {/if}
  </div>

  <!-- Input Text Areas -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="tool-card">
      <div class="card-header">
        <h3 class="section-title mb-0">Original text</h3>
        <span class="text-count">
          {text1.split('\n').length} lines
        </span>
      </div>

      <textarea
        bind:value={text1}
        placeholder="Enter the original text here..."
        class="code-editor min-h-[400px]"
      ></textarea>
    </div>

    <div class="tool-card">
      <div class="card-header">
        <h3 class="section-title mb-0">Modified text</h3>
        <span class="text-count">
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
    <div class="tool-card">
      <div class="card-header flex-wrap gap-2">
        <h3 class="section-title mb-0">Diff result</h3>
        {#if getStats()}
          <div class="flex gap-4 font-mono text-code">
            <span class="text-live">+{getStats()!.added} added</span>
            <span class="text-negative">-{getStats()!.removed} removed</span>
            <span class="text-ink-muted">{getStats()!.unchanged} unchanged</span>
          </div>
        {/if}
      </div>

      <div class="overflow-x-auto rounded-md bg-sunken p-3">
        <div class="min-w-full font-mono text-code">
          {#each diffResult.removed as line, index (line + index + 'removed')}
            <div class="flex items-start gap-2 py-0.5">
              {#if showLineNumbers}
                <span class="text-ink-muted w-8 text-right py-1">
                  {index + 1}
                </span>
              {/if}
              <span class="text-negative py-1">-</span>
              <pre
                class="font-mono text-code px-2 py-1 rounded-sm flex-1 text-ink bg-negative/15">{line ||
                  ' '}</pre>
            </div>
            {#if diffResult.added[index]}
              <div class="flex items-start gap-2 py-0.5">
                {#if showLineNumbers}
                  <span class="text-ink-muted w-8 text-right py-1">
                    {index + 1}
                  </span>
                {/if}
                <span class="text-live py-1">+</span>
                <pre
                  class="font-mono text-code px-2 py-1 rounded-sm flex-1 text-ink bg-live/15">{diffResult
                    .added[index] || ' '}</pre>
              </div>
            {/if}
          {/each}

          {#each diffResult.unchanged as line, index (line + index + 'unchanged')}
            <div class="flex items-start gap-2 py-0.5">
              {#if showLineNumbers}
                <span class="text-ink-muted w-8 text-right py-1">
                  {diffResult.removed.length + index + 1}
                </span>
              {/if}
              <span class="text-ink-muted py-1"> </span>
              <pre class="font-mono text-code px-2 py-1 rounded-sm flex-1 text-ink-muted">{line ||
                  ' '}</pre>
            </div>
          {/each}

          {#each diffResult.added.slice(diffResult.removed.length) as line, index (line + index + 'added')}
            <div class="flex items-start gap-2 py-0.5">
              {#if showLineNumbers}
                <span class="text-ink-muted w-8 text-right py-1">
                  {diffResult.removed.length + diffResult.unchanged.length + index + 1}
                </span>
              {/if}
              <span class="text-live py-1">+</span>
              <pre
                class="font-mono text-code px-2 py-1 rounded-sm flex-1 text-ink bg-live/15">{line ||
                  ' '}</pre>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <GitCompare class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Side by side comparison</h3>
      <p class="feature-description">
        Compare two text blocks and easily identify added, removed, and unchanged lines
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Flexible options</h3>
      <p class="feature-description">
        Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Export & share</h3>
      <p class="feature-description">
        Copy diff results to clipboard or download as a text file for easy sharing
      </p>
    </div>
  </div>
</ToolLayout>
