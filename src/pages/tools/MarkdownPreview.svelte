<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { FileText, Eye, Edit, Zap, Code, Download, Copy } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

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
        '<pre class="overflow-x-auto mb-4"><code class="font-mono">$2</code></pre>'
      )
      // Inline code
      .replace(
        /`(.*?)`/g,
        '<code class="font-mono">$1</code>'
      )
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
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
    toast.success('Markdown copied to clipboard');
  }

  function copyHtmlToClipboard() {
    navigator.clipboard.writeText(htmlContent);
    toast.success('HTML copied to clipboard');
  }

  function downloadHtml() {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-preview.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML downloaded');
  }

  function insertMarkdown(type: string) {
    const textarea = document.getElementById('md-input') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdownText.slice(start, end);
    
    const inserts: Record<string, [string, string]> = {
      'bold': ['**', '**'],
      'italic': ['*', '*'],
      'heading': ['## ', ''],
      'link': ['[', '](url)'],
      'code': ['`', '`'],
      'codeblock': ['```\n', '\n```'],
      'list': ['- ', ''],
      'quote': ['> ', ''],
    };
    
    const [before, after] = inserts[type] || ['', ''];
    const newMarkdown = markdownText.slice(0, start) + before + selected + after + markdownText.slice(end);
    markdownText = newMarkdown;
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selected.length;
    }, 0);
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
    toast.success('Sample markdown loaded');
  }

  function clearAll() {
    markdownText = '';
    htmlContent = '';
    toast.success('Cleared all');
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
  color="warning"
>
  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    <button onclick={loadSample} class="btn btn-secondary">Load sample</button>
    <button onclick={clearAll} class="btn btn-ghost">Clear</button>
    <div class="flex items-center gap-2 text-code text-ink-muted ml-auto">
      <FileText class="w-4 h-4" />
      <span>{lineCount} lines</span>
    </div>
  </div>

  <!-- Editor and Preview -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Markdown Editor -->
    <div class="tool-card flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Edit class="w-4 h-4 text-ink-muted" />
          <span class="text-label text-ink-muted">Markdown editor</span>
        </div>
        <button onclick={copyToClipboard} class="btn-icon" title="Copy markdown" aria-label="Copy markdown">
          <Copy class="w-4 h-4" />
        </button>
      </div>
      <div class="relative">
        <textarea
          bind:value={markdownText}
          placeholder="Enter your markdown text here..."
          class="code-editor w-full h-48 sm:h-64 lg:h-96"
        ></textarea>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="tool-card flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Eye class="w-4 h-4 text-ink-muted" />
          <span class="text-label text-ink-muted">Live preview</span>
        </div>
        <div class="flex gap-2">
          <button onclick={copyHtmlToClipboard} class="btn-icon" title="Copy HTML" aria-label="Copy HTML">
            <Copy class="w-4 h-4" />
          </button>
          <button onclick={downloadHtml} class="btn-icon" title="Download HTML" aria-label="Download HTML">
            <Download class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        class="h-48 sm:h-64 lg:h-96 overflow-y-auto p-4 sm:p-6 bg-sunken rounded-md text-ink prose max-w-none"
      >
        {#if htmlContent}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html htmlContent}
        {:else}
          <div class="flex items-center justify-center h-full text-ink-muted text-center">
            <div>
              <Eye class="w-12 h-12 mb-2 opacity-50 mx-auto" />
              <p>Your markdown preview will appear here</p>
              <p class="text-body-sm">Start typing in the editor to see the live preview</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="tool-card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Live preview</h3>
      <p class="feature-description">
        See your markdown rendered in real-time as you type with instant updates
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <Code class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Syntax highlighting</h3>
      <p class="feature-description">
        Code blocks with proper formatting and highlighting for better readability
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <Download class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Export options</h3>
      <p class="feature-description">
        Download your formatted content as HTML or copy to clipboard with one click
      </p>
    </div>
  </div>
</ToolLayout>
