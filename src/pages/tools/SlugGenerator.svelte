<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Type, Zap, FileText } from '@lucide/svelte';
  import Button from '../../components/ui/Button.svelte';
  import Input from '../../components/ui/Input.svelte';
  import Textarea from '../../components/ui/Textarea.svelte';

  let inputText = $state('');
  let generatedSlug = $state('');
  let separator = $state('-');
  let toLowerCase = $state(true);
  let removeStopWords = $state(false);
  let maxLength = $state(100);
  let copiedText = $state('');

  const stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'must',
    'can',
    'this',
    'that',
    'these',
    'those'
  ]);

  function generateSlug() {
    if (!inputText.trim()) {
      generatedSlug = '';
      return;
    }

    let slug = inputText;

    // Convert to lowercase if requested
    if (toLowerCase) {
      slug = slug.toLowerCase();
    }

    // Remove stop words if requested
    if (removeStopWords) {
      slug = slug
        .split(/\s+/)
        .filter(word => !stopWords.has(word.toLowerCase()))
        .join(' ');
    }

    // Remove special characters except spaces, hyphens, and underscores
    slug = slug.replace(/[^\w\s-_]/g, '');

    // Replace spaces and underscores with separator
    slug = slug.replace(/[\s_]+/g, separator);

    // Remove multiple consecutive separators
    slug = slug.replace(new RegExp(`${separator}+`, 'g'), separator);

    // Remove leading/trailing separators
    slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

    // Apply max length
    if (maxLength > 0) {
      slug = slug.substring(0, maxLength);
      // Remove trailing separator if truncated
      slug = slug.replace(new RegExp(`${separator}$`), '');
    }

    generatedSlug = slug;
  }

  function loadSampleText() {
    inputText = 'How to Create Amazing URL Slugs for Your Blog Posts and Articles';
    generateSlug();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedText = 'slug';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    inputText = '';
    generatedSlug = '';
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in input text
  $effect(() => {
    if (inputText) {
      generateSlug();
    }
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
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4"
      >
        <Type class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Slug Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Create URL-friendly slugs from text with customizable separators and options.
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
      <li class="text-gray-900 dark:text-white font-medium">URL Slug Generator</li>
    </ol>
  </nav>

  <!-- Options -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Slug Options</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div>
        <label
          for="separator-select"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Separator
        </label>
        <select
          id="separator-select"
          bind:value={separator}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value="">No separator</option>
        </select>
      </div>

      <div>
        <label
          for="max-length-input"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Max Length
        </label>
        <input
          id="max-length-input"
          type="number"
          bind:value={maxLength}
          min="0"
          max="500"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={toLowerCase}
          class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">Convert to lowercase</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={removeStopWords}
          class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">Remove stop words</span>
      </label>
    </div>
  </div>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <Button
      onclick={generateSlug}
      disabled={!inputText.trim()}
      variant="primary"
    >
      Generate Slug
    </Button>
    <Button
      onclick={loadSampleText}
      variant="secondary"
    >
      Load Sample Text
    </Button>
    <Button
      onclick={clearAll}
      variant="destructive"
    >
      Clear All
    </Button>
  </div>

  <!-- Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Input Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {inputText.length} characters
        </span>
      </div>
      <Textarea
        bind:value={inputText}
        placeholder="Enter your text here to generate a URL-friendly slug..."
        rows="4"
        variant="default"
      />
    </div>

    <!-- Output Section -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Slug</h2>
        {#if generatedSlug}
          <Button
            onclick={() => copyToClipboard(generatedSlug)}
            variant="success"
            size="sm"
          >
            {copiedText === 'slug' ? '✓ Copied!' : 'Copy'}
          </Button>
        {/if}
      </div>
      <div class="relative">
        <input
          type="text"
          bind:value={generatedSlug}
          readonly
          placeholder="Generated slug will appear here..."
          class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        {#if !generatedSlug}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="text-gray-400 dark:text-gray-600">Enter text above to generate slug</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Slug Examples -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Examples</h3>
    <div class="space-y-3">
      <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Post Title</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "How to Create Amazing URL Slugs for Your Blog Posts"
        </p>
        <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          how-to-create-amazing-url-slugs-for-your-blog-posts
        </p>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "Super Pro Max 3000 Widget with Advanced Features"
        </p>
        <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          super-pro-max-3000-widget-with-advanced-features
        </p>
      </div>

      <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "The Ultimate Guide to Web Development in 2024"
        </p>
        <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          ultimate-guide-web-development-2024
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Type class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL-Friendly Slugs</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Create clean, readable URLs that are SEO-friendly and user-friendly
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Separators</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Choose between hyphens, underscores, or no separators for your slugs
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Processing</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Remove special characters, stop words, and apply length limits automatically
      </p>
    </div>
  </div>
</div>
