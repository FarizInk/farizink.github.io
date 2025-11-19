<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Link, Globe, FileText, Copy, Zap } from '@lucide/svelte';

  let urlInput = $state('');
  let parsedUrl = $state<{
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    origin: string;
    host: string;
    searchParams: { key: string; value: string }[];
  } | null>(null);
  let error = $state('');

  function parseUrl() {
    if (!urlInput.trim()) {
      error = 'Please enter a URL to parse';
      parsedUrl = null;
      return;
    }

    try {
      // Add protocol if missing
      let urlToParse = urlInput.trim();
      if (!urlToParse.match(/^https?:\/\//) && !urlToParse.match(/^ftp:\/\//)) {
        urlToParse = 'https://' + urlToParse;
      }

      const url = new URL(urlToParse);

      const searchParams: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
        searchParams.push({ key, value });
      });

      parsedUrl = {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443' : '80'),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        host: url.host,
        searchParams
      };

      error = '';
    } catch {
      error = 'Invalid URL format. Please enter a valid URL.';
      parsedUrl = null;
    }
  }

  function loadSampleUrl() {
    urlInput =
      'https://example.com:8080/path/to/page?query=search&category=tools&sort=popular#section-1';
    parseUrl();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function clearAll() {
    urlInput = '';
    parsedUrl = null;
    error = '';
  }

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <Link class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Parser/Analyzer</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Parse URLs and extract components including domain, path, query parameters, and hash
        fragments.
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
      <li class="text-gray-900 dark:text-white font-medium">URL Parser</li>
    </ol>
  </nav>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter URL</h2>

    <div class="flex gap-4 mb-4">
      <input
        type="text"
        bind:value={urlInput}
        placeholder="https://example.com/path?query=value#section"
        class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"
        onkeydown={e => e.key === 'Enter' && parseUrl()}
      />
      <button
        onclick={parseUrl}
        class="btn btn-primary"
      >
        Parse URL
      </button>
    </div>

    <div class="flex gap-4">
      <button
        onclick={loadSampleUrl}
        class="btn btn-primary"
      >
        Load Sample URL
      </button>
      <button
        onclick={clearAll}
        class="btn btn-primary"
      >
        Clear
      </button>
    </div>
  </div>

  <!-- Error Display -->
  {#if error}
    <div
      class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-red-700 dark:text-red-400 font-medium">{error}</p>
    </div>
  {/if}

  <!-- Parsed URL Results -->
  {#if parsedUrl}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Basic Components -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Components</h3>

        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Protocol</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white">{parsedUrl.protocol}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.protocol)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hostname</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white">{parsedUrl.hostname}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.hostname)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Port</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white">{parsedUrl.port}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.port)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Path</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                >{parsedUrl.pathname}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.pathname)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hash</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                >{parsedUrl.hash || '(none)'}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.hash || '')}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Complete Components -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Complete Components
        </h3>

        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Origin</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                >{parsedUrl.origin}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.origin)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Host</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                >{parsedUrl.host}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.host)}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Search Query</span>
            <div class="flex items-center gap-2">
              <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                >{parsedUrl.search || '(none)'}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.search || '')}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Query Parameters -->
    {#if parsedUrl.searchParams.length > 0}
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Query Parameters</h3>
          <span class="text-sm text-gray-500 dark:text-gray-400"
            >{parsedUrl.searchParams.length} parameters</span
          >
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Parameter</th
                >
                <th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Value</th
                >
                <th
                  class="text-center py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Actions</th
                >
              </tr>
            </thead>
            <tbody>
              {#each parsedUrl.searchParams as param, index (param.key + index)}
                <tr class="border-b border-gray-100 dark:border-gray-800">
                  <td class="py-2 px-3">
                    <code class="text-sm text-gray-900 dark:text-white">{param.key}</code>
                  </td>
                  <td class="py-2 px-3">
                    <code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"
                      >{param.value}</code
                    >
                  </td>
                  <td class="py-2 px-3 text-center">
                    <div class="flex justify-center gap-2">
                      <button
                        onclick={() => copyToClipboard(param.key)}
                        class="btn btn-primary btn-sm"
                        title="Copy parameter name"
                      >
                        <Copy class="w-4 h-4" />
                      </button>
                      <button
                        onclick={() => copyToClipboard(param.value)}
                        class="btn btn-primary btn-sm"
                        title="Copy parameter value"
                      >
                        <Copy class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"
      >
        <Globe class="w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Extract Domain</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Extract domain, subdomain, and port information from any URL
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"
      >
        <FileText class="w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Path Analysis</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Analyze URL paths, query parameters, and hash fragments
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"
      >
        <Zap class="w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Query Parameters</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Parse and extract all query parameters with their values
      </p>
    </div>
  </div>
</div>
