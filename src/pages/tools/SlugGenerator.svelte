<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Type, Zap, Link2, Copy, Check } from '@lucide/svelte';

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
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary" onclick={loadSampleText}>Load sample</button>
    <button class="btn btn-ghost" onclick={clearAll}>Clear</button>
  </div>

  <!-- Options -->
  <div class="tool-card">
    <h2 class="section-title">Slug options</h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="flex flex-col">
        <label for="separator-select" class="label">Separator</label>
        <select id="separator-select" bind:value={separator} class="tool-select">
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
          <option value="">No separator</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="max-length-input" class="label">Max length</label>
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
        <label class="custom-checkbox">
          <input type="checkbox" bind:checked={toLowerCase} />
          <span class="checkmark"></span>
          <span class="label-text">Convert to lowercase</span>
        </label>
      </div>

      <div class="flex items-end">
        <label class="custom-checkbox">
          <input type="checkbox" bind:checked={removeStopWords} />
          <span class="checkmark"></span>
          <span class="label-text">Remove stop words</span>
        </label>
      </div>
    </div>
  </div>

  <!-- Input and Output -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Input Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title mb-0!">Input text</h2>
        <span class="text-count">
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
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title mb-0!">Generated slug</h2>
        {#if generatedSlug}
          <button class="btn btn-sm btn-primary" onclick={() => copyToClipboard(generatedSlug)}>
            {#if copiedText === 'slug'}
              <Check class="size-4" />
              Copied!
            {:else}
              <Copy class="size-4" />
              Copy
            {/if}
          </button>
        {/if}
      </div>

      <input
        type="text"
        bind:value={generatedSlug}
        placeholder="Enter text above to generate a slug…"
        class="tool-input font-mono! text-sm!"
      />
    </div>
  </div>

  <!-- Slug Examples -->
  <div class="tool-card">
    <h2 class="section-title">Common examples</h2>
    <div class="space-y-3">
      <div class="info-card">
        <p class="text-body-sm mb-1 font-medium text-ink">Blog post title</p>
        <p class="mb-2 text-xs text-ink-muted">
          "How to Create Amazing URL Slugs for Your Blog Posts"
        </p>
        <p class="font-mono text-sm break-all text-accent-text">
          how-to-create-amazing-url-slugs-for-your-blog-posts
        </p>
      </div>

      <div class="info-card">
        <p class="text-body-sm mb-1 font-medium text-ink">Product name</p>
        <p class="mb-2 text-xs text-ink-muted">
          "Super Pro Max 3000 Widget with Advanced Features"
        </p>
        <p class="font-mono text-sm break-all text-accent-text">
          super-pro-max-3000-widget-with-advanced-features
        </p>
      </div>

      <div class="info-card">
        <p class="text-body-sm mb-1 font-medium text-ink">Article title</p>
        <p class="mb-2 text-xs text-ink-muted">
          "The Ultimate Guide to Web Development in 2024"
        </p>
        <p class="font-mono text-sm break-all text-accent-text">
          ultimate-guide-web-development-2024
        </p>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Link2 class="size-5" /></div>
      <h3 class="feature-title">URL-friendly slugs</h3>
      <p class="feature-description">
        Create clean, readable URLs that are SEO-friendly and user-friendly
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Type class="size-5" /></div>
      <h3 class="feature-title">Custom separators</h3>
      <p class="feature-description">
        Choose between hyphens, underscores, or no separators for your slugs
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Zap class="size-5" /></div>
      <h3 class="feature-title">Smart processing</h3>
      <p class="feature-description">
        Remove special characters, stop words, and apply length limits automatically
      </p>
    </div>
  </div>
</ToolLayout>
