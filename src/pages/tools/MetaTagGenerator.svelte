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
  <!-- Actions -->
  <div class="flex flex-wrap gap-2 items-center">
    <button
      class="btn btn-secondary"
      onclick={loadExample}
    >
      <RefreshCw class="w-4 h-4" />
      Load example
    </button>
    <button
      class="btn btn-ghost"
      onclick={clearAll}>Clear all</button
    >
  </div>

  <!-- Tab Navigation -->
  <div class="card !p-0 overflow-hidden">
    <div class="tab-nav !mb-0 px-4 pt-2" role="tablist">
      {#each [{ id: 'basic', label: 'Basic SEO', icon: Search }, { id: 'opengraph', label: 'Open Graph', icon: Globe }, { id: 'twitter', label: 'Twitter cards', icon: Twitter }, { id: 'additional', label: 'Additional', icon: Code }, { id: 'jsonld', label: 'JSON-LD', icon: FileText }] as tab (tab.id)}
        <button
          role="tab"
          aria-selected={activeTab === tab.id}
          onclick={() => (activeTab = tab.id)}
          class="tab-btn inline-flex items-center gap-2 {activeTab === tab.id ? 'active' : ''}"
        >
          <tab.icon class="w-4 h-4" />
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
              >Page title *</label
            >
            <input
              class="tool-input"
              type="text"
              bind:value={title}
              placeholder="Enter page title (50-60 characters recommended)"
            />
            <p class="text-count mt-1">
              {title.length}/60 characters
            </p>
          </div>

          <div>
            <label
              for="description-input"
              class="label"
              >Meta description *</label
            >
            <textarea
              class="code-editor min-h-[80px]"
              bind:value={description}
              placeholder="Enter page description (150-160 characters recommended)"
            ></textarea>
            <p class="text-count mt-1">
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
              >OG title</label
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
              >OG description</label
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
              >OG image URL</label
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
              >OG image alt</label
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
              class="label">OG type</label
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
              >OG site name</label
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
              >OG locale</label
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
          <div class="mt-8">
            <h3 class="section-title">
              Article-specific tags
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="published-input"
                  class="label"
                  >Published time</label
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
                  >Modified time</label
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
                  >Article author</label
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
                  >Article section</label
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
                  >Article tags</label
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
              >Twitter card type</label
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
              >Twitter title</label
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
              >Twitter description</label
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
              >Twitter image URL</label
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
              >Twitter image alt</label
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
              >Twitter site</label
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
              >Twitter creator</label
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
              >Theme color</label
            >
            <input type="color" bind:value={themeColor} class="input h-12 w-full p-1! cursor-pointer" />
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
            <label class="custom-checkbox">
              <input
                type="checkbox"
                bind:checked={enableJsonLd}
                id="enable-jsonld"
              />
              <span class="checkmark"></span>
              <span class="label-text">Enable JSON-LD structured data</span>
            </label>
          </div>

          {#if enableJsonLd}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="jsonld-type"
                  class="label"
                  >JSON-LD type</label
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
  <div class="tool-card">
    <div class="card-header flex-wrap gap-2">
      <h2 class="section-title !mb-0">Generated meta tags</h2>
      <div class="flex flex-wrap gap-2">
        <button
          class="btn btn-primary"
          onclick={copyToClipboard}
          disabled={!generatedTags}
        >
          <Copy class="w-4 h-4" />
          Copy
        </button>
        <button
          class="btn btn-secondary"
          onclick={downloadAsHtml}
          disabled={!generatedTags}
        >
          <Download class="w-4 h-4" />
          Download HTML
        </button>
      </div>
    </div>

    <div class="p-4 rounded-md bg-sunken">
      <pre class="text-code {generatedTags ? 'text-ink' : 'text-ink-muted'} overflow-x-auto"><code
          >{generatedTags || 'Fill in the form above to generate meta tags...'}</code
        ></pre>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Search class="w-5 h-5" />
      </div>
      <h3 class="feature-title">SEO optimized</h3>
      <p class="feature-description">
        Generate meta tags that follow SEO best practices for better search rankings
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Twitter class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Social media ready</h3>
      <p class="feature-description">
        Full support for Open Graph and Twitter Cards for rich social sharing
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Code class="w-5 h-5" />
      </div>
      <h3 class="feature-title">JSON-LD support</h3>
      <p class="feature-description">
        Generate structured data for search engines to better understand your content
      </p>
    </div>
  </div>
</ToolLayout>
