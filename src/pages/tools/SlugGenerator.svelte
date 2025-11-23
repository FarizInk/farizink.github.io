<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Type, Zap, FileText } from '@lucide/svelte';

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
  color="primary"
>
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

            <!-- Controls -->
            <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
              <button class="btn btn-primary" onclick={generateSlug} disabled={!inputText.trim()}>
                Generate Slug
              </button>
              <button class="btn btn-primary" onclick={loadSampleText}>Load Sample Text</button>
              <button class="btn btn-primary" onclick={clearAll}>Clear All</button>

              <!-- Input and Output -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Input Section -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {inputText.length} characters
                    </span>

                    <textarea
                      class="textarea"
                      bind:value={inputText}
                      placeholder="Enter your text here to generate a URL-friendly slug..."
                    ></textarea>

                    <!-- Output Section -->
                    <div>
                      <div class="flex justify-between items-center mb-2">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Generated Slug
                        </h2>
                        {#if generatedSlug}
                          <button
                            class="btn btn-primary btn-sm"
                            onclick={() => copyToClipboard(generatedSlug)}
                          >
                            {copiedText === 'slug' ? '✓ Copied!' : 'Copy'}
                          </button>
                        {/if}

                        <div class="relative">
                          <input
                            type="text"
                            bind:value={generatedSlug}
                            placeholder="Generated slug will appear here..."
                            class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                          />
                          {#if !generatedSlug}
                            <div
                              class="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                              <p class="text-gray-400 dark:text-gray-600">
                                Enter text above to generate slug
                              </p>
                            </div>
                          {/if}
                        </div>
                      </div>
                    </div>

                    <!-- Slug Examples -->
                    <div
                      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
                    >
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Common Examples
                      </h3>
                      <div class="space-y-3">
                        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Blog Post Title
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            "How to Create Amazing URL Slugs for Your Blog Posts"
                          </p>
                          <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                            how-to-create-amazing-url-slugs-for-your-blog-posts
                          </p>
                        </div>

                        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Product Name
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            "Super Pro Max 3000 Widget with Advanced Features"
                          </p>
                          <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                            super-pro-max-3000-widget-with-advanced-features
                          </p>
                        </div>

                        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Article Title
                          </p>
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

                          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            URL-Friendly Slugs
                          </h3>
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

                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Custom Separators
                            </h3>
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

                              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Smart Processing
                              </h3>
                              <p class="text-gray-600 dark:text-gray-400">
                                Remove special characters, stop words, and apply length limits
                                automatically
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></ToolLayout
>
