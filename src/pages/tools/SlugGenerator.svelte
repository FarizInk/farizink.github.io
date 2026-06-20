<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Type, Zap, Link2 } from '@lucide/svelte';

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

  // React to changes in input text
  $effect(() => {
    if (inputText) {
      generateSlug();
    }
  });
</script>

<ToolLayout
  title="Slug Generator"
  description="Create URL-friendly slugs from text with customizable separators."
  icon={Type}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Link2 class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">URL Slug Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Create clean, SEO-friendly URLs from any text
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-copy" onclick={loadSampleText}>
          Load Sample
        </button>
        <button class="btn btn-secondary" onclick={clearAll}>
          Clear
        </button>
      </div>
    </div>
  </div>

  <!-- Options -->
  <div
    class="tool-card mb-4"
  >
    <h2 class="section-title">Slug Options</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="flex flex-col">
        <label
          for="separator-select"
          class="label">Separator</label
        >
        <select id="separator-select" bind:value={separator} class="tool-select">
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value="">No separator</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label
          for="max-length-input"
          class="label">Max Length</label
        >
        <input
          id="max-length-input"
          type="number" inputmode="decimal"
          bind:value={maxLength}
          min="0"
          max="500"
          class="tool-input"
        />
      </div>

      <div class="flex items-end">
        <label class="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            bind:checked={toLowerCase}
            class="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <span
            class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45 peer-checked:after:block"
          ></span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
            >Convert to lowercase</span
          >
        </label>
      </div>

      <div class="flex items-end">
        <label class="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            bind:checked={removeStopWords}
            class="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <span
            class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45 peer-checked:after:block"
          ></span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
            >Remove stop words</span
          >
        </label>
      </div>
    </div>
  </div>

  <!-- Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div
      class="tool-card"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {inputText.length} characters
        </span>
      </div>

      <textarea
        class="code-editor min-h-[160px]"
        bind:value={inputText}
        placeholder="Enter your text here to generate a URL-friendly slug..."
      ></textarea>
    </div>

    <!-- Output Section -->
    <div
      class="tool-card"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Slug</h2>
        {#if generatedSlug}
          <button class="btn btn-sm btn-copy" onclick={() => copyToClipboard(generatedSlug)}>
            {copiedText === 'slug' ? '✓ Copied!' : 'Copy'}
          </button>
        {/if}
      </div>

      <div class="relative">
        <input
          type="text"
          bind:value={generatedSlug}
          placeholder="Generated slug will appear here..."
          class="tool-input font-mono text-sm bg-gray-50 dark:bg-gray-900"
        />
        {#if !generatedSlug}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
            <p class="text-gray-400 dark:text-gray-600">Enter text above to generate slug</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Slug Examples -->
  <div
    class="tool-card mb-4"
  >
    <h2 class="section-title">Common Examples</h2>
    <div class="space-y-3">
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Post Title</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "How to Create Amazing URL Slugs for Your Blog Posts"
        </p>
        <p class="font-mono text-sm text-warning-600 dark:text-primary-400">
          how-to-create-amazing-url-slugs-for-your-blog-posts
        </p>
      </div>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "Super Pro Max 3000 Widget with Advanced Features"
        </p>
        <p class="font-mono text-sm text-warning-600 dark:text-primary-400">
          super-pro-max-3000-widget-with-advanced-features
        </p>
      </div>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          "The Ultimate Guide to Web Development in 2024"
        </p>
        <p class="font-mono text-sm text-warning-600 dark:text-primary-400">
          ultimate-guide-web-development-2024
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Link2 class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL-Friendly Slugs</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Create clean, readable URLs that are SEO-friendly and user-friendly
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Type class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Separators</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Choose between hyphens, underscores, or no separators for your slugs
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Processing</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Remove special characters, stop words, and apply length limits automatically
      </p>
    </div>
  </div>
</ToolLayout>
