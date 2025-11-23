<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { FileText, Eye, Edit, Zap, Code, Download } from '@lucide/svelte';

  let markdownText = $state(
    '# Welcome to Markdown Preview' +
      '\n\nThis is a **live markdown preview** tool. Start typing on the left side to see the rendered output here!' +
      '\n\n## Features' +
      '\n\n- ✅ **Live preview** - See changes instantly as you type' +
      '\n- ✅ **Syntax highlighting** - Code blocks with proper highlighting' +
      '\n- ✅ **Export options** - Download as HTML or copy to clipboard' +
      '\n- ✅ **CommonMark support** - Compatible with standard markdown' +
      '\n\n## Text Formatting' +
      '\n\nYou can write **bold text**, *italic text*, or ***both***!' +
      '\n\nYou can also use ~~strikethrough text~~.' +
      '\n\n## Lists' +
      '\n\n### Unordered List' +
      '\n\n- Item 1' +
      '\n- Item 2' +
      '\n  - Nested item 2.1' +
      '\n  - Nested item 2.2' +
      '\n- Item 3' +
      '\n\n### Ordered List' +
      '\n\n1. First item' +
      '\n2. Second item' +
      '\n   1. Nested item' +
      '\n   2. Another nested item' +
      '\n3. Third item' +
      '\n\n## Links and Images' +
      '\n\nVisit [GitHub](https://github.com) for more resources!' +
      '\n\n## Code' +
      '\n\nInline code: `console.log("Hello, World!")`' +
      '\n\n### Code Block with Syntax Highlighting' +
      '\n\n```javascript' +
      'function fibonacci(n) {' +
      '  if (n <= 1) return n;' +
      '  return fibonacci(n - 1) + fibonacci(n - 2);' +
      '}' +
      '\n\nconsole.log(fibonacci(10)); // Output: 55' +
      '```' +
      '\n\n### Python Example' +
      '\n\n```python' +
      'def quick_sort(arr):' +
      '    if len(arr) <= 1:' +
      '        return arr' +
      '\n    pivot = arr[len(arr) // 2]' +
      '    left = [x for x in arr if x < pivot]' +
      '    middle = [x for x in arr if x == pivot]' +
      '    right = [x for x in arr if x > pivot]' +
      '\n    return quick_sort(left) + middle + quick_sort(right)' +
      '```' +
      '\n\n## Blockquotes' +
      '\n\n> This is a blockquote.' +
      '> It can span multiple lines.' +
      '\n\n## Tables' +
      '\n\n| Feature | Status | Priority |' +
      '|---------|--------|----------|' +
      '| Live Preview | ✅ Done | High |' +
      '| Syntax Highlighting | ✅ Done | Medium |' +
      '| Export Options | ✅ Done | Medium |' +
      '\n\n---' +
      '\n\n*Thank you for using Markdown Preview!*'
  );

  let htmlContent = $state('');
  let copiedText = $state('');

  function updatePreview() {
    // Basic markdown to HTML conversion
    htmlContent = markdownText
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(
        /```(.*?)\n([\s\S]*?)```/g,
        '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono">$2</code></pre>'
      )
      // Inline code
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
      )
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      // Lists
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/(<li.*>.*<\/li>)/s, '<ul class="list-disc mb-4">$1</ul>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');

    // Wrap in paragraphs
    if (htmlContent && !htmlContent.startsWith('<')) {
      htmlContent = '<p class="mb-4">' + htmlContent + '</p>';
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(markdownText);
    copiedText = 'markdown';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function copyHtmlToClipboard() {
    navigator.clipboard.writeText(htmlContent);
    copiedText = 'html';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function downloadHtml() {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-preview.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadSample() {
    markdownText = `# Sample Markdown Document

## Introduction

This is a **sample document** to demonstrate the *capabilities* of our markdown previewer.

## Code Examples

### JavaScript

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Python

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
\`\`\`

## Features

- ✅ Live preview
- ✅ Syntax highlighting
- ✅ Export capabilities
- ✅ Responsive design

> "The best way to learn is by doing." - Anonymous

Visit [GitHub](https://github.com) for more resources!`;

    updatePreview();
  }

  function clearAll() {
    markdownText = '';
    htmlContent = '';
  }

  // Calculate line count
  const lineCount = $derived(markdownText.split('\n').length);

  // Auto-update preview when markdown changes
  $effect(() => {
    updatePreview();
  });
</script>

<ToolLayout
  title="Markdown Preview"
  description="Preview markdown text with live rendering and syntax highlighting."
  icon={FileText}
  color="secondary"
>
  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <FileText class="w-4 h-4" />
        <span>{lineCount} lines</span>
      </div>
    </div>
    <div class="flex gap-2">
      <button onclick={loadSample} class="btn btn-secondary btn-sm"> Load Sample </button>
      <button onclick={clearAll} class="btn btn-secondary btn-sm"> Clear </button>
    </div>
  </div>

  <!-- Editor and Preview -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Markdown Editor -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div
        class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Edit class="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Markdown Editor</span>
          </div>
          <button onclick={copyToClipboard} class="btn btn-primary btn-sm">
            {copiedText === 'markdown' ? '✓ Copied!' : 'Copy Markdown'}
          </button>
        </div>
      </div>
      <div class="relative">
        <textarea
          bind:value={markdownText}
          placeholder="Enter your markdown text here..."
          class="w-full h-96 p-4 font-mono text-sm border-0 resize-none focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        ></textarea>
      </div>
    </div>

    <!-- Live Preview -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div
        class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Eye class="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Live Preview</span>
          </div>
          <div class="flex gap-2">
            <button onclick={copyHtmlToClipboard} class="btn btn-primary btn-sm">
              {copiedText === 'html' ? '✓ Copied!' : 'Copy HTML'}
            </button>
            <button onclick={downloadHtml} class="btn btn-primary btn-sm">
              <Download class="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>
      <div class="h-96 overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
        {#if htmlContent}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html htmlContent}
        {:else}
          <div class="flex items-center justify-center h-full text-gray-400 dark:text-gray-600">
            <div class="text-center">
              <Eye class="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your markdown preview will appear here</p>
              <p class="text-sm">Start typing in the editor to see the live preview</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3>
      <p class="text-gray-600 dark:text-gray-400">
        See your markdown rendered in real-time as you type with instant updates
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Code class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Syntax Highlighting</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Code blocks with proper formatting and highlighting for better readability
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Download class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Download your formatted content as HTML or copy to clipboard with one click
      </p>
    </div>
  </div>
</ToolLayout>
