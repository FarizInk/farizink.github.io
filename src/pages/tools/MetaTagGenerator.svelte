<script lang="ts">
  import {
    Copy,
    RefreshCw,
    Code,
    Globe,
    Twitter,
    Search,
    FileText,
    ChevronLeft
  } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

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
  let contentType = $state('text/html; charset=utf-8');
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
  let copied = $state(false);
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
      tags += String.fromCharCode(10);
    }
    if (description) {
      tags += '<meta name="description" content="' + escapeHtml(description) + '">';
      tags += String.fromCharCode(10);
    }
    if (keywords) {
      tags += '<meta name="keywords" content="' + escapeHtml(keywords) + '">';
      tags += String.fromCharCode(10);
    }
    if (author) {
      tags += '<meta name="author" content="' + escapeHtml(author) + '">';
      tags += String.fromCharCode(10);
    }
    if (canonicalUrl) {
      tags += '<link rel="canonical" href="' + escapeHtml(canonicalUrl) + '">';
      tags += String.fromCharCode(10);
    }
    if (robots) {
      tags += '<meta name="robots" content="' + escapeHtml(robots) + '">';
      tags += String.fromCharCode(10);
    }

    // Open Graph Meta Tags
    tags += String.fromCharCode(10) + '<!-- Open Graph Meta Tags -->' + String.fromCharCode(10);
    tags += '<meta property="og:type" content="' + escapeHtml(ogType) + '">';
    tags += String.fromCharCode(10);
    if (ogTitle) {
      tags += '<meta property="og:title" content="' + escapeHtml(ogTitle) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogDescription) {
      tags += '<meta property="og:description" content="' + escapeHtml(ogDescription) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogImage) {
      tags += '<meta property="og:image" content="' + escapeHtml(ogImage) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogImageAlt) {
      tags += '<meta property="og:image:alt" content="' + escapeHtml(ogImageAlt) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogUrl) {
      tags += '<meta property="og:url" content="' + escapeHtml(ogUrl) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogSitename) {
      tags += '<meta property="og:site_name" content="' + escapeHtml(ogSitename) + '">';
      tags += String.fromCharCode(10);
    }
    if (ogLocale) {
      tags += '<meta property="og:locale" content="' + escapeHtml(ogLocale) + '">';
      tags += String.fromCharCode(10);
    }

    // Twitter Card Meta Tags
    tags += String.fromCharCode(10) + '<!-- Twitter Card Meta Tags -->' + String.fromCharCode(10);
    tags += '<meta name="twitter:card" content="' + escapeHtml(twitterCard) + '">';
    tags += String.fromCharCode(10);
    if (twitterTitle) {
      tags += '<meta name="twitter:title" content="' + escapeHtml(twitterTitle) + '">';
      tags += String.fromCharCode(10);
    }
    if (twitterDescription) {
      tags += '<meta name="twitter:description" content="' + escapeHtml(twitterDescription) + '">';
      tags += String.fromCharCode(10);
    }
    if (twitterImage) {
      tags += '<meta name="twitter:image" content="' + escapeHtml(twitterImage) + '">';
      tags += String.fromCharCode(10);
    }
    if (twitterImageAlt) {
      tags += '<meta name="twitter:image:alt" content="' + escapeHtml(twitterImageAlt) + '">';
      tags += String.fromCharCode(10);
    }
    if (twitterSite) {
      tags += '<meta name="twitter:site" content="' + escapeHtml(twitterSite) + '">';
      tags += String.fromCharCode(10);
    }
    if (twitterCreator) {
      tags += '<meta name="twitter:creator" content="' + escapeHtml(twitterCreator) + '">';
      tags += String.fromCharCode(10);
    }

    // Article specific tags
    if (ogType === 'article') {
      tags +=
        String.fromCharCode(10) + '<!-- Article Specific Meta Tags -->' + String.fromCharCode(10);
      if (articlePublishedTime) {
        tags +=
          '<meta property="article:published_time" content="' +
          escapeHtml(articlePublishedTime) +
          '">';
        tags += String.fromCharCode(10);
      }
      if (articleModifiedTime) {
        tags +=
          '<meta property="article:modified_time" content="' +
          escapeHtml(articleModifiedTime) +
          '">';
        tags += String.fromCharCode(10);
      }
      if (articleAuthor) {
        tags += '<meta property="article:author" content="' + escapeHtml(articleAuthor) + '">';
        tags += String.fromCharCode(10);
      }
      if (articleSection) {
        tags += '<meta property="article:section" content="' + escapeHtml(articleSection) + '">';
        tags += String.fromCharCode(10);
      }
      if (articleTag) {
        tags += '<meta property="article:tag" content="' + escapeHtml(articleTag) + '">';
        tags += String.fromCharCode(10);
      }
    }

    // Additional Meta Tags
    tags += String.fromCharCode(10) + '<!-- Additional Meta Tags -->' + String.fromCharCode(10);
    tags += '<meta charset="utf-8">';
    tags += String.fromCharCode(10);
    tags += '<meta name="viewport" content="' + escapeHtml(viewport) + '">';
    tags += String.fromCharCode(10);
    tags += '<meta http-equiv="content-type" content="' + escapeHtml(contentType) + '">';
    tags += String.fromCharCode(10);
    if (language) {
      tags += '<meta name="language" content="' + escapeHtml(language) + '">';
      tags += String.fromCharCode(10);
    }
    if (themeColor) {
      tags += '<meta name="theme-color" content="' + escapeHtml(themeColor) + '">';
      tags += String.fromCharCode(10);
    }
    if (favicon) {
      tags += '<link rel="icon" href="' + escapeHtml(favicon) + '">';
      tags += String.fromCharCode(10);
    }

    // JSON-LD Structured Data
    if (enableJsonLd) {
      tags +=
        String.fromCharCode(10) + '<!-- JSON-LD Structured Data -->' + String.fromCharCode(10);
      const jsonLd = generateJsonLd();
      tags += '<script type="application/ld+json">' + jsonLd + '</scr' + 'ipt>';
      tags += String.fromCharCode(10);
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
    navigator.clipboard.writeText(generatedTags).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
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
    contentType = 'text/html; charset=utf-8';
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
  }

  function downloadAsHtml() {
    if (!generatedTags) return;

    const htmlContent =
      '<!DOCTYPE html>' +
      String.fromCharCode(10) +
      '<html lang="' +
      language +
      '">' +
      String.fromCharCode(10) +
      '<head>' +
      String.fromCharCode(10) +
      generatedTags +
      '</head>' +
      String.fromCharCode(10) +
      '<body>' +
      String.fromCharCode(10) +
      '  <!-- Your content goes here -->' +
      String.fromCharCode(10) +
      '  <h1>Welcome to ' +
      (title || 'Your Website') +
      '</h1>' +
      String.fromCharCode(10) +
      '  <p>' +
      (description || 'Your description here.') +
      '</p>' +
      String.fromCharCode(10) +
      '</body>' +
      String.fromCharCode(10) +
      '</html>';

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-tags-example.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Auto-generate when inputs change
  $effect(() => {
    generateMetaTags();
  });
</script>

<svelte:head>
  <title>Meta Tag Generator - Developer Tools</title>
  <meta
    name="description"
    content="Generate SEO meta tags, Open Graph tags, Twitter cards, and JSON-LD structured data for better search engine optimization"
  />
</svelte:head>

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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl mb-4"
      >
        <Globe class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Meta Tag Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate SEO meta tags, Open Graph tags, Twitter cards, and structured data
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
      <li class="text-gray-900 dark:text-white font-medium">Meta Tag Generator</li>
    </ol>
  </nav>

  <!-- Tab Navigation -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
      {#each [{ id: 'basic', label: 'Basic SEO', icon: Search }, { id: 'opengraph', label: 'Open Graph', icon: Globe }, { id: 'twitter', label: 'Twitter Cards', icon: Twitter }, { id: 'additional', label: 'Additional', icon: Code }, { id: 'jsonld', label: 'JSON-LD', icon: FileText }] as tab (tab.id)}
        <button
          onclick={() => (activeTab = tab.id)}
          class="flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab ===
          tab.id
            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          <tab.icon class="w-4 h-4 mr-2" />
          {tab.label}
        </button>
      {/each}
    </div>

    <div class="p-6">
      <!-- Basic SEO Tab -->
      {#if activeTab === 'basic'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Page Title *
            </label>
            <input
              type="text"
              bind:value={title}
              placeholder="Enter page title (50-60 characters recommended)"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {title.length}/60 characters
            </p>
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Meta Description *
            </label>
            <textarea
              bind:value={description}
              placeholder="Enter page description (150-160 characters recommended)"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description.length}/160 characters
            </p>
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Keywords
            </label>
            <input
              type="text"
              bind:value={keywords}
              placeholder="Enter keywords separated by commas"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Author
            </label>
            <input
              type="text"
              bind:value={author}
              placeholder="Enter author name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Canonical URL
            </label>
            <input
              type="url"
              bind:value={canonicalUrl}
              placeholder="https://example.com/page"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Robots
            </label>
            <select
              bind:value={robots}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Title
            </label>
            <input
              type="text"
              bind:value={ogTitle}
              placeholder="Enter Open Graph title"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Description
            </label>
            <textarea
              bind:value={ogDescription}
              placeholder="Enter Open Graph description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Image URL
            </label>
            <input
              type="url"
              bind:value={ogImage}
              placeholder="https://example.com/image.jpg"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Image Alt
            </label>
            <input
              type="text"
              bind:value={ogImageAlt}
              placeholder="Describe the image for accessibility"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG URL
            </label>
            <input
              type="url"
              bind:value={ogUrl}
              placeholder="https://example.com/page"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Type
            </label>
            <select
              bind:value={ogType}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Site Name
            </label>
            <input
              type="text"
              bind:value={ogSitename}
              placeholder="Your website name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              OG Locale
            </label>
            <input
              type="text"
              bind:value={ogLocale}
              placeholder="en_US"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Article specific fields -->
        {#if ogType === 'article'}
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Article Specific Tags
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Published Time
                </label>
                <input
                  type="datetime-local"
                  bind:value={articlePublishedTime}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Modified Time
                </label>
                <input
                  type="datetime-local"
                  bind:value={articleModifiedTime}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Article Author
                </label>
                <input
                  type="text"
                  bind:value={articleAuthor}
                  placeholder="Author name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Article Section
                </label>
                <input
                  type="text"
                  bind:value={articleSection}
                  placeholder="Technology, Business, etc."
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="md:col-span-2">
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Article Tags
                </label>
                <input
                  type="text"
                  bind:value={articleTag}
                  placeholder="tag1, tag2, tag3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Twitter Cards Tab -->
      {#if activeTab === 'twitter'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Card Type
            </label>
            <select
              bind:value={twitterCard}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary with Large Image</option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Title
            </label>
            <input
              type="text"
              bind:value={twitterTitle}
              placeholder="Enter Twitter card title"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Description
            </label>
            <textarea
              bind:value={twitterDescription}
              placeholder="Enter Twitter card description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Image URL
            </label>
            <input
              type="url"
              bind:value={twitterImage}
              placeholder="https://example.com/twitter-image.jpg"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Image Alt
            </label>
            <input
              type="text"
              bind:value={twitterImageAlt}
              placeholder="Describe the Twitter image"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Site
            </label>
            <input
              type="text"
              bind:value={twitterSite}
              placeholder="@yourwebsite"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Twitter Creator
            </label>
            <input
              type="text"
              bind:value={twitterCreator}
              placeholder="@author"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      {/if}

      <!-- Additional Tab -->
      {#if activeTab === 'additional'}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Theme Color
            </label>
            <input
              type="color"
              bind:value={themeColor}
              class="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 cursor-pointer"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Language
            </label>
            <input
              type="text"
              bind:value={language}
              placeholder="en"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Viewport
            </label>
            <input
              type="text"
              bind:value={viewport}
              placeholder="width=device-width, initial-scale=1.0"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="auto-id-{Math.random().toString(36).substr(2, 9)}"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Favicon
            </label>
            <input
              type="text"
              bind:value={favicon}
              placeholder="/favicon.ico"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      {/if}

      <!-- JSON-LD Tab -->
      {#if activeTab === 'jsonld'}
        <div class="space-y-6">
          <div class="flex items-center">
            <input
              id="enable-jsonld"
              type="checkbox"
              bind:checked={enableJsonLd}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="enable-jsonld"
              class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enable JSON-LD Structured Data
            </label>
          </div>

          {#if enableJsonLd}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  JSON-LD Type
                </label>
                <select
                  bind:value={jsonLdType}
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  bind:value={jsonLdName}
                  placeholder="Enter name/title"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  bind:value={jsonLdDescription}
                  placeholder="Enter description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  URL
                </label>
                <input
                  type="url"
                  bind:value={jsonLdUrl}
                  placeholder="https://example.com"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="auto-id-{Math.random().toString(36).substr(2, 9)}"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Image
                </label>
                <input
                  type="url"
                  bind:value={jsonLdImage}
                  placeholder="https://example.com/image.jpg"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-wrap gap-3 mb-6">
    <button
      onclick={loadExample}
      class="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
    >
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Example
    </button>
    <button
      onclick={clearAll}
      class="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <!-- Generated Output -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <div
      class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2>
      <div class="flex gap-2">
        <button
          onclick={copyToClipboard}
          disabled={!generatedTags}
          class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Copy class="w-4 h-4 mr-1" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onclick={downloadAsHtml}
          disabled={!generatedTags}
          class="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Download HTML
        </button>
      </div>
    </div>

    <div class="p-6">
      <pre
        class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code
          >{generatedTags || 'Fill in the form above to generate meta tags...'}</code
        ></pre>
    </div>
  </div>
</div>
