<script lang="ts">
  import { navigate } from '../lib/router.js';

  let markdownText = $state(
  "# Welcome to Markdown Preview" +
  "\n\nThis is a **live markdown preview** tool. Start typing on the left side to see the rendered output here!" +
  "\n\n## Features" +
  "\n\n- ✅ **Live preview** - See changes instantly as you type" +
  "\n- ✅ **Syntax highlighting** - Code blocks with proper highlighting" +
  "\n- ✅ **Export options** - Download as HTML or copy to clipboard" +
  "\n- ✅ **CommonMark support** - Compatible with standard markdown" +
  "\n\n## Text Formatting" +
  "\n\nYou can write **bold text**, *italic text*, or ***both***!" +
  "\n\nYou can also use ~~strikethrough text~~." +
  "\n\n## Lists" +
  "\n\n### Unordered List" +
  "\n\n- Item 1" +
  "\n- Item 2" +
  "\n  - Nested item 2.1" +
  "\n  - Nested item 2.2" +
  "\n- Item 3" +
  "\n\n### Ordered List" +
  "\n\n1. First item" +
  "\n2. Second item" +
  "\n   1. Nested item" +
  "\n   2. Another nested item" +
  "\n3. Third item" +
  "\n\n## Links and Images" +
  "\n\nVisit [GitHub](https://github.com) for more resources!" +
  "\n\n## Code" +
  "\n\nInline code: `console.log(\"Hello, World!\")`" +
  "\n\n### Code Block with Syntax Highlighting" +
  "\n\n```javascript" +
  "function fibonacci(n) {" +
  "  if (n <= 1) return n;" +
  "  return fibonacci(n - 1) + fibonacci(n - 2);" +
  "}" +
  "\n\nconsole.log(fibonacci(10)); // Output: 55" +
  "```" +
  "\n\n### Python Example" +
  "\n\n```python" +
  "def quick_sort(arr):" +
  "    if len(arr) <= 1:" +
  "        return arr" +
  "\n    pivot = arr[len(arr) // 2]" +
  "    left = [x for x in arr if x < pivot]" +
  "    middle = [x for x in arr if x == pivot]" +
  "    right = [x for x in arr if x > pivot]" +
  "\n    return quick_sort(left) + middle + quick_sort(right)" +
  "\n# Test the function" +
  "numbers = [3, 6, 8, 10, 1, 2, 1]" +
  "sorted_numbers = quick_sort(numbers)" +
  "print(\"Sorted: {}\".format(sorted_numbers))" +
  "```" +
  "\n\n## Tables" +
  "\n\n| Feature | Status | Priority |" +
  "|---------|--------|----------|" +
  "| Live Preview | ✅ Complete | High |" +
  "| Export | ✅ Complete | Medium |" +
  "| Themes | 🚧 In Progress | Low |" +
  "\n\n## Blockquotes" +
  "\n\n> \"The best way to learn is by doing.\"" +
  "\n> — Anonymous Developer" +
  "\n\n> This is a multi-line blockquote that demonstrates" +
  "> how line breaks are preserved within blockquote" +
  "> sections." +
  "\n\n## Task Lists" +
  "\n\n- [x] Set up development environment" +
  "- [x] Implement basic markdown parsing" +
  "- [x] Add syntax highlighting" +
  "- [ ] Add dark theme support" +
  "- [ ] Implement export to PDF" +
  "- [ ] Add collaborative editing" +
  "\n\n---" +
  "\n\n## Horizontal Rules" +
  "\n\nYou can use horizontal rules to separate content sections." +
  "\n\n## Math Support" +
  "\n\nInline math: $E = mc^2$" +
  "\n\nBlock math:" +
  "\n\n$$" +
  "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" +
  "$$" +
  "\n\n## Footnotes" +
  "\n\nHere's a sentence with a footnote [^1]." +
  "\n\n[^1]: This is the footnote content." +
  "\n\nHappy markdown editing! 🎉"
);

  let htmlOutput = $state('');
  let copiedText = $state('');
  let wordCount = $state(0);
  let charCount = $state(0);
  let lineCount = $state(0);

  function parseMarkdown(markdown: string): string {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'text';
      return `<div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
        <div class="text-xs text-gray-400 mb-2 font-mono">${language}</div>
        <pre class="font-mono text-sm"><code>${escapeHtml(code.trim())}</code></pre>
      </div>`;
    });

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1</blockquote>');
    html = html.replace(/^> (.+?)\n> (.+?)\n> (.+?)$/gim, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1<br>$2<br>$3</blockquote>');

    // Lists - Unordered
    html = html.replace(/^\* (.+)$/gim, '<li class="ml-4">• $1</li>');
    html = html.replace(/^- (.+)$/gim, '<li class="ml-4">• $1</li>');

    // Lists - Ordered
    html = html.replace(/^\d+\. (.+)$/gim, '<li class="ml-4 list-decimal list-inside">$1</li>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-300 dark:border-gray-600">');
    html = html.replace(/^\*\*\*$/gim, '<hr class="my-8 border-gray-300 dark:border-gray-600">');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\/p>/g, '');
    html = html.replace(/<p class="mb-4"><h/g, '<h');
    html = html.replace(/<\/h[1-6]><\/p>/g, '</h$1>');
    html = html.replace(/<p class="mb-4"><blockquote/g, '<blockquote');
    html = html.replace(/<\/blockquote><\/p>/g, '</blockquote>');
    html = html.replace(/<p class="mb-4"><div/g, '<div');
    html = html.replace(/<\/div><\/p>/g, '</div>');
    html = html.replace(/<p class="mb-4"><hr/g, '<hr');
    html = html.replace(/<\/p><li/g, '<li');
    html = html.replace(/<\/li><\/p>/g, '</li>');

    // Math (basic support)
    html = html.replace(/\$\$([^$]+)\$\$/g, '<div class="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded text-center font-mono text-lg">$1</div>');
    html = html.replace(/\$([^$]+)\$/g, '<span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</span>');

    // Task lists
    html = html.replace(/- \[ \] (.+)$/gim, '<div class="flex items-center gap-2 ml-4"><input type="checkbox" disabled class="rounded"> <span>$1</span></div>');
    html = html.replace(/- \[x\] (.+)$/gim, '<div class="flex items-center gap-2 ml-4"><input type="checkbox" checked disabled class="rounded"> <span>$1</span></div>');

    // Tables (basic support)
    const tableRegex = /\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n?)*)/gim;
    html = html.replace(tableRegex, (match, headers, separator, rows) => {
      const headerCells = headers.split('|').map(cell => `<th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left bg-gray-50 dark:bg-gray-800">${cell.trim()}</th>`).join('');
      const rowCells = rows.split('\n').filter(row => row.trim()).map(row => {
        const cells = row.split('|').slice(1, -1).map(cell => `<td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${cell.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

      return `<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${rowCells}</tbody>
      </table></div>`;
    });

    // Emojis (basic support)
    const emojis: { [key: string]: string } = {
      ':)': '😊',
      ':-)': '😊',
      ':(': '😢',
      ':-(': '😢',
      ':D': '😃',
      ':-D': '😃',
      ':P': '😛',
      ':-P': '😛',
      ';)': '😉',
      ';-)': '😉',
      ':heart:': '❤️',
      ':+1:': '👍',
      ':-1:': '👎',
      ':fire:': '🔥',
      ':star:': '⭐',
      ':check:': '✅',
      ':x:': '❌',
      ':warning:': '⚠️',
      ':rocket:': '🚀'
    };

    for (const [emoji, unicode] of Object.entries(emojis)) {
      html = html.replace(new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), unicode);
    }

    return html;
  }

  function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updatePreview() {
    htmlOutput = parseMarkdown(markdownText);
    updateStats();
  }

  function updateStats() {
    const lines = markdownText.split('\n');
    lineCount = lines.length;
    charCount = markdownText.length;
    wordCount = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
  }

  function clearAll() {
    markdownText = '';
    htmlOutput = '';
    updateStats();
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(htmlOutput);
    copiedText = 'html';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function copyMarkdown() {
    navigator.clipboard.writeText(markdownText);
    copiedText = 'markdown';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function exportAsHtml() {
    const scriptTag = "</scr" + "ipt>";
    const fullHtml =
      "<!DOCTYPE html>" +
      "<html lang=\"en\">" +
      "<head>" +
      "<meta charset=\"UTF-8\">" +
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
      "<title>Markdown Export</title>" +
      "<script src=\"https://cdn.tailwindcss.com\">" + scriptTag +
      "</head>" +
      "<body class=\"max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white\">" +
      "<div class=\"prose prose-lg dark:prose-invert max-w-none\">" +
      htmlOutput +
      "</div>" +
      "</body>" +
      "</html>";

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadSample() {
    markdownText =
      "# Project Documentation" +
      "\n\n## Overview" +
      "\n\nThis project demonstrates a **real-time markdown preview** application built with modern web technologies." +
      "\n\n## Features" +
      "\n\n### Core Functionality" +
      "- [x] **Live Preview**: Real-time markdown rendering" +
      "- [x] **Syntax Highlighting**: Beautiful code blocks" +
      "- [x] **Export Options**: HTML export functionality" +
      "- [ ] **Dark Theme**: Automatic theme switching" +
      "- [ ] **File Upload**: Import .md files" +
      "- [ ] **Cloud Sync**: Save to cloud storage" +
      "\n\n### Technical Stack" +
      "\n\n```javascript" +
      "const techStack = {" +
      "  frontend: ['Svelte', 'Tailwind CSS']," +
      "  backend: ['Node.js', 'Express']," +
      "  deployment: ['Vercel', 'GitHub Actions']" +
      "};" +
      "```" +
      "\n\n## Quick Start" +
      "\n\n1. **Installation**" +
      "   ```bash" +
      "   npm install" +
      "   npm run dev" +
      "   ```" +
      "\n\n2. **Usage**" +
      "   Simply start typing markdown in the editor and see the live preview!" +
      "\n\n## API Reference" +
      "\n\n### Endpoints" +
      "\n\n| Method | Endpoint | Description |" +
      "|--------|----------|-------------|" +
      "| GET    | /api/render | Render markdown to HTML |" +
      "| POST   | /api/export | Export as HTML file |" +
      "\n\n### Code Example" +
      "\n\n```python" +
      "def process_markdown(content):" +
      '    """' +
      "    Process markdown content and return HTML" +
      '    """' +
      "    # Processing logic here" +
      "    return render_html(content)" +
      "```" +
      "\n\n## Contributing" +
      "\n> \"Great things are built by passionate people\"" +
      "\nWe welcome contributions! Please read our [contributing guidelines](https://github.com/example/contributing)." +
      "\n\n## License" +
      "\nThis project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details." +
      "\n\n---" +
      "\n\n*Last updated: " + new Date().toLocaleDateString() + "*";
    updatePreview();
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Auto-update preview when markdown changes
  $effect(() => {
    updatePreview();
  });
</script>

<div class="max-w-7xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Markdown Preview
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Preview and write markdown with live formatting. Perfect for documentation and content creation.
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
      <li class="text-gray-900 dark:text-white font-medium">Markdown Preview</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={loadSample}
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Load Sample
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
    <button
      onclick={copyMarkdown}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      {copiedText === 'markdown' ? '✓ Copied!' : 'Copy Markdown'}
    </button>
    <button
      onclick={copyToClipboard}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {copiedText === 'html' ? '✓ Copied!' : 'Copy HTML'}
    </button>
    <button
      onclick={exportAsHtml}
      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      Export HTML
    </button>
  </div>

  <!-- Stats -->
  <div class="mb-6 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
    <div class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>{wordCount} words</span>
    </div>
    <div class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{charCount} characters</span>
    </div>
    <div class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <span>{lineCount} lines</span>
    </div>
  </div>

  <!-- Editor and Preview -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Markdown Editor -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Markdown Editor
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">.md</span>
        </div>
      </div>
      <div class="p-6">
        <textarea
          bind:value={markdownText}
          placeholder="Start typing your markdown here..."
          class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        ></textarea>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Preview
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">HTML</span>
        </div>
      </div>
      <div class="p-6 h-96 overflow-y-auto">
        <div class="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          {@html htmlOutput}
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Live Preview
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Real-time markdown rendering as you type with instant visual feedback
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Syntax Highlighting
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Beautiful code blocks with syntax highlighting for multiple programming languages
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Export Options
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Export your markdown as styled HTML with one click for easy sharing
      </p>
    </div>
  </div>
</div>