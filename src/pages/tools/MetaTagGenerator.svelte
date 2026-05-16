<script lang="ts">
  import {
    Copy,
    RefreshCw,
    FileText,
    Search,
    Globe,
    Twitter,
    Code,
    Download
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Basic SEO Meta Tags
  let title = $state('');
  let description = $state('');
  let keywords = $state('');
  let author = $state('');
  let canonicalUrl = $state('');
  let robots = $state('index,follow');

  // Open Graph Meta Tags
  let ogTitle = $state('');
  let ogDescription = $state('');
  let ogImage = $state('');
  let ogImageAlt = $state('');
  let ogUrl = $state('');
  let ogType = $state('website');
  let ogSitename = $state('');
  let ogLocale = $state('en_US');

  // Twitter Card Meta Tags
  let twitterCard = $state('summary_large_image');
  let twitterTitle = $state('');
  let twitterDescription = $state('');
  let twitterImage = $state('');
  let twitterImageAlt = $state('');
  let twitterSite = $state('');
  let twitterCreator = $state('');

  // Additional Meta Tags
  let themeColor = $state('#ffffff');
  let viewport = $state('width=device-width, initial-scale=1.0');
  let language = $state('en');
  let favicon = $state('/favicon.ico');

  // Article specific (if type is article)
  let articlePublishedTime = $state('');
  let articleModifiedTime = $state('');
  let articleAuthor = $state('');
  let articleSection = $state('');
  let articleTag = $state('');

  // JSON-LD Structured Data
  let enableJsonLd = $state(false);
  let jsonLdType = $state('WebPage');
  let jsonLdName = $state('');
  let jsonLdDescription = $state('');
  let jsonLdUrl = $state('');
  let jsonLdImage = $state('');

  // Component state
  let generatedTags = $state('');
  let activeTab = $state('basic');

  // Auto-synchronize fields
  $effect(() => {
    if (title && !ogTitle) ogTitle = title;
    if (title && !twitterTitle) twitterTitle = title;
    if (description && !ogDescription) ogDescription = description;
    if (description && !twitterDescription) twitterDescription = description;
    if (canonicalUrl && !ogUrl) ogUrl = canonicalUrl;
    if (ogImage && !twitterImage) twitterImage = ogImage;
    if (ogImageAlt && !twitterImageAlt) twitterImageAlt = ogImageAlt;
  });

  function generateMetaTags() {
    let tags = '';

    // Basic SEO Meta Tags
    if (title) {
      tags += '<title>' + escapeHtml(title) + '</title>';
      tags += '\n';
    }
    if (description) {
      tags += '<meta name="description" content="' + escapeHtml(description) + '">';
      tags += '\n';
    }
    if (keywords) {
      tags += '<meta name="keywords" content="' + escapeHtml(keywords) + '">';
      tags += '\n';
    }
    if (author) {
      tags += '<meta name="author" content="' + escapeHtml(author) + '">';
      tags += '\n';
    }
    if (canonicalUrl) {
      tags += '<link rel="canonical" href="' + escapeHtml(canonicalUrl) + '">';
      tags += '\n';
    }
    if (robots) {
      tags += '<meta name="robots" content="' + escapeHtml(robots) + '">';
      tags += '\n';
    }

    // Open Graph Meta Tags
    tags += '\n<!-- Open Graph Meta Tags -->\n';
    tags += '<meta property="og:type" content="' + escapeHtml(ogType) + '">\n';
    if (ogTitle) {
      tags += '<meta property="og:title" content="' + escapeHtml(ogTitle) + '">\n';
    }
    if (ogDescription) {
      tags += '<meta property="og:description" content="' + escapeHtml(ogDescription) + '">\n';
    }
    if (ogImage) {
      tags += '<meta property="og:image" content="' + escapeHtml(ogImage) + '">\n';
    }
    if (ogImageAlt) {
      tags += '<meta property="og:image:alt" content="' + escapeHtml(ogImageAlt) + '">\n';
    }
    if (ogUrl) {
      tags += '<meta property="og:url" content="' + escapeHtml(ogUrl) + '">\n';
    }
    if (ogSitename) {
      tags += '<meta property="og:site_name" content="' + escapeHtml(ogSitename) + '">\n';
    }
    if (ogLocale) {
      tags += '<meta property="og:locale" content="' + escapeHtml(ogLocale) + '">\n';
    }

    // Twitter Card Meta Tags
    tags += '\n<!-- Twitter Card Meta Tags -->\n';
    tags += '<meta name="twitter:card" content="' + escapeHtml(twitterCard) + '">\n';
    if (twitterTitle) {
      tags += '<meta name="twitter:title" content="' + escapeHtml(twitterTitle) + '">\n';
    }
    if (twitterDescription) {
      tags +=
        '<meta name="twitter:description" content="' + escapeHtml(twitterDescription) + '">\n';
    }
    if (twitterImage) {
      tags += '<meta name="twitter:image" content="' + escapeHtml(twitterImage) + '">\n';
    }
    if (twitterImageAlt) {
      tags += '<meta name="twitter:image:alt" content="' + escapeHtml(twitterImageAlt) + '">\n';
    }
    if (twitterSite) {
      tags += '<meta name="twitter:site" content="' + escapeHtml(twitterSite) + '">\n';
    }
    if (twitterCreator) {
      tags += '<meta name="twitter:creator" content="' + escapeHtml(twitterCreator) + '">\n';
    }

    // Article specific tags
    if (ogType === 'article') {
      tags += '\n<!-- Article Specific Meta Tags -->\n';
      if (articlePublishedTime) {
        tags +=
          '<meta property="article:published_time" content="' +
          escapeHtml(articlePublishedTime) +
          '">\n';
      }
      if (articleModifiedTime) {
        tags +=
          '<meta property="article:modified_time" content="' +
          escapeHtml(articleModifiedTime) +
          '">\n';
      }
      if (articleAuthor) {
        tags += '<meta property="article:author" content="' + escapeHtml(articleAuthor) + '">\n';
      }
      if (articleSection) {
        tags += '<meta property="article:section" content="' + escapeHtml(articleSection) + '">\n';
      }
      if (articleTag) {
        tags += '<meta property="article:tag" content="' + escapeHtml(articleTag) + '">\n';
      }
    }

    // Additional Meta Tags
    tags += '\n<!-- Additional Meta Tags -->\n';
    tags += '<meta charset="utf-8">\n';
    tags += '<meta name="viewport" content="' + escapeHtml(viewport) + '">\n';
    tags +=
      '<meta http-equiv="content-type" content="' + escapeHtml('text/html; charset=utf-8') + '">\n';
    if (language) {
      tags += '<meta name="language" content="' + escapeHtml(language) + '">\n';
    }
    if (themeColor) {
      tags += '<meta name="theme-color" content="' + escapeHtml(themeColor) + '">\n';
    }
    if (favicon) {
      tags += '<link rel="icon" href="' + escapeHtml(favicon) + '">\n';
    }

    // JSON-LD Structured Data
    if (enableJsonLd) {
      tags += '\n<!-- JSON-LD Structured Data -->\n';
      const jsonLd = generateJsonLd();
      tags += '<script type="application/ld+json">' + jsonLd + '</scr' + 'ipt>\n';
    }

    generatedTags = tags;
  }

  function generateJsonLd() {
    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': jsonLdType
    };

    if (jsonLdName) jsonLd.name = jsonLdName;
    if (jsonLdDescription) jsonLd.description = jsonLdDescription;
    if (jsonLdUrl) jsonLd.url = jsonLdUrl;
    if (jsonLdImage) jsonLd.image = jsonLdImage;

    return JSON.stringify(jsonLd, null, 2);
  }

  function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedTags);
    toast.success('Copied to clipboard');
  }

  function clearAll() {
    title = '';
    description = '';
    keywords = '';
    author = '';
    canonicalUrl = '';
    robots = 'index,follow';
    ogTitle = '';
    ogDescription = '';
    ogImage = '';
    ogImageAlt = '';
    ogUrl = '';
    ogType = 'website';
    ogSitename = '';
    ogLocale = 'en_US';
    twitterCard = 'summary_large_image';
    twitterTitle = '';
    twitterDescription = '';
    twitterImage = '';
    twitterImageAlt = '';
    twitterSite = '';
    twitterCreator = '';
    themeColor = '#ffffff';
    viewport = 'width=device-width, initial-scale=1.0';
    language = 'en';
    favicon = '/favicon.ico';
    articlePublishedTime = '';
    articleModifiedTime = '';
    articleAuthor = '';
    articleSection = '';
    articleTag = '';
    enableJsonLd = false;
    jsonLdType = 'WebPage';
    jsonLdName = '';
    jsonLdDescription = '';
    jsonLdUrl = '';
    jsonLdImage = '';
    generatedTags = '';
    toast.success('Cleared all');
  }

  function loadExample() {
    title = 'My Awesome Website - Home Page';
    description =
      'Welcome to my awesome website! Discover amazing content, services, and resources that will help you achieve your goals.';
    keywords = 'awesome website, web development, technology, innovation, digital solutions';
    author = 'John Doe';
    canonicalUrl = 'https://myawesomewebsite.com';
    robots = 'index,follow';
    ogType = 'website';
    ogSitename = 'My Awesome Website';
    ogLocale = 'en_US';
    twitterCard = 'summary_large_image';
    twitterSite = '@myawesomewebsite';
    twitterCreator = '@johndoe';
    themeColor = '#3b82f6';
    language = 'en';
    enableJsonLd = true;
    jsonLdType = 'WebPage';
    jsonLdName = 'My Awesome Website - Home Page';
    jsonLdDescription = description;
    jsonLdUrl = canonicalUrl;
    toast.success('Example loaded');
  }

  function downloadAsHtml() {
    if (!generatedTags) return;

    const htmlContent =
      '<!DOCTYPE html>\n' +
      '<html lang="' +
      language +
      '">\n' +
      '<head>\n' +
      generatedTags +
      '</head>\n' +
      '<body>\n' +
      '  <!-- Your content goes here -->\n' +
      '  <h1>Welcome to ' +
      (title || 'Your Website') +
      '</h1>\n' +
      '  <p>' +
      (description || 'Your description here.') +
      '</p>\n' +
      '</body>\n' +
      '</html>\n';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-tags-example.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML downloaded');
  }

  // Auto-generate when inputs change
  $effect(() => {
    generateMetaTags();
  });
</script>

<ToolLayout
  title="Meta Tag Generator"
  description="Generate SEO-friendly meta tags for better search engine optimization."
  icon={FileText}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <FileText class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Meta Tag Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Generate SEO-friendly meta tags</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      class="btn btn-copy"
      onclick={loadExample}
    >
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Example
    </button>
    <button
      class="btn btn-secondary"
      onclick={clearAll}>Clear All</button
    >
  </div>

  <!-- Tab Navigation -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 shadow-sm"
  >
    <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
      {#each [{ id: 'basic', label: 'Basic SEO', icon: Search }, { id: 'opengraph', label: 'Open Graph', icon: Globe }, { id: 'twitter', label: 'Twitter Cards', icon: Twitter }, { id: 'additional', label: 'Additional', icon: Code }, { id: 'jsonld', label: 'JSON-LD', icon: FileText }] as tab (tab.id)}
        <button
          onclick={() => (activeTab = tab.id)}
          class="tab-btn {activeTab === tab.id ? 'active' : ''}"
        >
          <tab.icon class="w-4 h-4 mr-2" />
          {tab.label}
        </button>
      {/each}
    </div>

    <div class="p-6">
      <!-- Basic SEO Tab -->
      {#if activeTab === 'basic'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="title-input"
              class="label"
              >Page Title *</label
            >
            <input
              class="tool-input"
              type="text"
              bind:value={title}
              placeholder="Enter page title (50-60 characters recommended)"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {title.length}/60 characters
            </p>
          </div>

          <div>
            <label
              for="description-input"
              class="label"
              >Meta Description *</label
            >
            <textarea
              class="code-editor min-h-[80px]"
              bind:value={description}
              placeholder="Enter page description (150-160 characters recommended)"
            ></textarea>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description.length}/160 characters
            </p>
          </div>

          <div>
            <label
              for="keywords-input"
              class="label"
              >Keywords</label
            >
            <input
              type="text"
              bind:value={keywords}
              placeholder="Enter keywords separated by commas"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="author-input"
              class="label">Author</label
            >
            <input
              type="text"
              bind:value={author}
              placeholder="Enter author name"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="canonical-input"
              class="label"
              >Canonical URL</label
            >
            <input
              type="url"
              bind:value={canonicalUrl}
              placeholder="https://example.com/page"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="robots-input"
              class="label">Robots</label
            >
            <select
              bind:value={robots}
              class="tool-select"
            >
              <option value="index,follow">Index, Follow</option>
              <option value="index,nofollow">Index, No Follow</option>
              <option value="noindex,follow">No Index, Follow</option>
              <option value="noindex,nofollow">No Index, No Follow</option>
            </select>
          </div>
        </div>
      {/if}

      <!-- Open Graph Tab -->
      {#if activeTab === 'opengraph'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="og-title-input"
              class="label"
              >OG Title</label
            >
            <input
              type="text"
              bind:value={ogTitle}
              placeholder="Enter Open Graph title"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="og-description-input"
              class="label"
              >OG Description</label
            >
            <textarea
              bind:value={ogDescription}
              placeholder="Enter Open Graph description"
              class="code-editor min-h-[80px]"
            ></textarea>
          </div>

          <div>
            <label
              for="og-image-input"
              class="label"
              >OG Image URL</label
            >
            <input
              type="url"
              bind:value={ogImage}
              placeholder="https://example.com/image.jpg"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="og-alt-input"
              class="label"
              >OG Image Alt</label
            >
            <input
              type="text"
              bind:value={ogImageAlt}
              placeholder="Describe the image for accessibility"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="og-url-input"
              class="label">OG URL</label
            >
            <input
              type="url"
              bind:value={ogUrl}
              placeholder="https://example.com/page"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="og-type-input"
              class="label">OG Type</label
           >
           <select
             bind:value={ogType}
              class="tool-select"
           >
             <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="profile">Profile</option>
              <option value="video">Video</option>
              <option value="music">Music</option>
            </select>
          </div>

          <div>
            <label
              for="og-site-input"
              class="label"
              >OG Site Name</label
            >
            <input
              type="text"
              bind:value={ogSitename}
              placeholder="Your website name"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="og-locale-input"
              class="label"
              >OG Locale</label
            >
            <input
              type="text"
              bind:value={ogLocale}
              placeholder="en_US"
              class="tool-input"
            />
          </div>
        </div>

        <!-- Article specific fields -->
        {#if ogType === 'article'}
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Article Specific Tags
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="published-input"
                  class="label"
                  >Published Time</label
                >
                <input
                  type="datetime-local"
                  bind:value={articlePublishedTime}
                  class="tool-input"
                />
              </div>

              <div>
                <label
                  for="modified-input"
                  class="label"
                  >Modified Time</label
                >
                <input
                  type="datetime-local"
                  bind:value={articleModifiedTime}
                  class="tool-input"
                />
              </div>

              <div>
                <label
                  for="article-author-input"
                  class="label"
                  >Article Author</label
                >
                <input
                  type="text"
                  bind:value={articleAuthor}
                  placeholder="Author name"
                  class="tool-input"
                />
              </div>

              <div>
                <label
                  for="section-input"
                  class="label"
                  >Article Section</label
                >
                <input
                  type="text"
                  bind:value={articleSection}
                  placeholder="Technology, Business, etc."
                  class="tool-input"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  for="article-tag-input"
                  class="label"
                  >Article Tags</label
                >
                <input
                  type="text"
                  bind:value={articleTag}
                  placeholder="tag1, tag2, tag3"
                  class="tool-input"
                />
              </div>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Twitter Cards Tab -->
      {#if activeTab === 'twitter'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="twitter-card-type"
              class="label"
              >Twitter Card Type</label
           >
           <select
             bind:value={twitterCard}
              class="tool-select"
           >
             <option value="summary">Summary</option>
              <option value="summary_large_image">Summary with Large Image</option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
          </div>

          <div>
            <label
              for="twitter-title-input"
              class="label"
              >Twitter Title</label
            >
            <input
              type="text"
              bind:value={twitterTitle}
              placeholder="Enter Twitter card title"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="twitter-desc-input"
              class="label"
              >Twitter Description</label
            >
          <textarea
            bind:value={twitterDescription}
            placeholder="Enter Twitter card description"
            class="textarea min-h-[80px] resize-none"
          ></textarea>
          </div>

          <div>
            <label
              for="twitter-image-input"
              class="label"
              >Twitter Image URL</label
            >
            <input
              type="url"
              bind:value={twitterImage}
              placeholder="https://example.com/twitter-image.jpg"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="twitter-alt-input"
              class="label"
              >Twitter Image Alt</label
            >
            <input
              type="text"
              bind:value={twitterImageAlt}
              placeholder="Describe the Twitter image"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="twitter-site-input"
              class="label"
              >Twitter Site</label
            >
            <input
              type="text"
              bind:value={twitterSite}
              placeholder="@yourwebsite"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="twitter-creator-input"
              class="label"
              >Twitter Creator</label
            >
            <input
              type="text"
              bind:value={twitterCreator}
              placeholder="@author"
              class="tool-input"
            />
          </div>
        </div>
      {/if}

      <!-- Additional Tab -->
      {#if activeTab === 'additional'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="theme-color-input"
              class="label"
              >Theme Color</label
            >
            <input type="color" bind:value={themeColor} class="w-full h-8 rounded cursor-pointer" />
          </div>

          <div>
            <label
              for="language-input"
              class="label"
              >Language</label
            >
            <input
              type="text"
              bind:value={language}
              placeholder="en"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="viewport-input"
              class="label"
              >Viewport</label
            >
            <input
              type="text"
              bind:value={viewport}
              placeholder="width=device-width, initial-scale=1.0"
              class="tool-input"
            />
          </div>

          <div>
            <label
              for="favicon-input"
              class="label">Favicon</label
            >
            <input
              type="text"
              bind:value={favicon}
              placeholder="/favicon.ico"
              class="tool-input"
            />
          </div>
        </div>
      {/if}

      <!-- JSON-LD Tab -->
      {#if activeTab === 'jsonld'}
        <div class="space-y-6">
          <div class="flex items-center">
            <label class="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                bind:checked={enableJsonLd}
                id="enable-jsonld"
                class="peer w-5 h-5 text-warning-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-purple-400"
              />
              <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >Enable JSON-LD Structured Data</span
              >
            </label>
          </div>

          {#if enableJsonLd}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="jsonld-type"
                  class="label"
                  >JSON-LD Type</label
               >
               <select
                 bind:value={jsonLdType}
                  class="tool-select"
               >
                 <option value="WebPage">Web Page</option>
                  <option value="Article">Article</option>
                  <option value="Product">Product</option>
                  <option value="Organization">Organization</option>
                  <option value="Person">Person</option>
                  <option value="Recipe">Recipe</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label
                  for="jsonld-name"
                  class="label"
                  >Name</label
                >
                <input
                  type="text"
                  bind:value={jsonLdName}
                  placeholder="Enter name/title"
                  class="tool-input"
                />
              </div>

              <div>
                <label
                  for="jsonld-description"
                  class="label"
                  >Description</label
                >
              <textarea
                bind:value={jsonLdDescription}
                placeholder="Enter description"
                class="textarea min-h-[80px] resize-none"
              ></textarea>
              </div>

              <div>
                <label
                  for="jsonld-url"
                  class="label">URL</label
                >
                <input
                  type="url"
                  bind:value={jsonLdUrl}
                  placeholder="https://example.com"
                  class="tool-input"
                />
              </div>

              <div>
                <label
                  for="jsonld-image"
                  class="label"
                  >Image</label
                >
                <input
                  type="url"
                  bind:value={jsonLdImage}
                  placeholder="https://example.com/image.jpg"
                  class="tool-input"
                />
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <!-- Generated Output -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2>
      <div class="flex gap-2">
        <button
          class="btn-copy"
          onclick={copyToClipboard}
          disabled={!generatedTags}
        >
          <Copy class="w-4 h-4 mr-1" />
          Copy
        </button>
        <button
          class="btn btn-secondary"
          onclick={downloadAsHtml}
          disabled={!generatedTags}
        >
          <Download class="w-4 h-4 mr-1" />
          Download HTML
        </button>
      </div>
    </div>

    <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
      <pre class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"><code
          >{generatedTags || 'Fill in the form above to generate meta tags...'}</code
        ></pre>
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
        <Search class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">SEO Optimized</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate meta tags that follow SEO best practices for better search rankings
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Twitter class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Social Media Ready</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Full support for Open Graph and Twitter Cards for rich social sharing
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Code class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">JSON-LD Support</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate structured data for search engines to better understand your content
      </p>
    </div>
  </div>
</ToolLayout>
