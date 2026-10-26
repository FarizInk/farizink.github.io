<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Link, Globe, FileText, Copy, Zap, AlertCircle } from '@lucide/svelte';

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
</script>

<ToolLayout
  title="URL Parser"
  description="Extract and analyze URL components: protocol, domain, path, query parameters."
  icon={Link}
  color="warning"
>
  <!-- Input Section -->
  <div class="tool-card">
    <h2 class="section-title">Enter URL</h2>

    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        bind:value={urlInput}
        placeholder="https://example.com/path?query=value#section"
        class="tool-input flex-1"
        onkeydown={e => e.key === 'Enter' && parseUrl()}
      />
      <button class="btn btn-primary" onclick={parseUrl}>
        Parse URL
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button class="btn btn-secondary btn-sm" onclick={loadSampleUrl}>
        Load sample URL
      </button>
      <button class="btn btn-ghost btn-sm" onclick={clearAll}>
        Clear
      </button>
    </div>
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="status-error flex items-center gap-2 p-4 rounded-md" role="alert">
      <AlertCircle class="w-5 h-5 shrink-0" />
      <p class="text-body-sm">Error: {error}</p>
    </div>
  {/if}

  <!-- Parsed URL Results -->
  {#if parsedUrl}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Basic components -->
      <div class="tool-card">
        <h3 class="section-title">Basic components</h3>

        <div class="space-y-3">
          <div class="result-row gap-3">
            <span class="result-label shrink-0">Protocol</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink">{parsedUrl.protocol}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.protocol)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Hostname</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink">{parsedUrl.hostname}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.hostname)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Port</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink">{parsedUrl.port}</code>
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.port)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Path</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink truncate max-w-xs"
                >{parsedUrl.pathname}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.pathname)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Hash</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink truncate max-w-xs"
                >{parsedUrl.hash || '(none)'}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.hash || '')}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Complete Components -->
      <div class="tool-card">
        <h3 class="section-title">Complete components</h3>

        <div class="space-y-3">
          <div class="result-row gap-3">
            <span class="result-label shrink-0">Origin</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink truncate max-w-xs"
                >{parsedUrl.origin}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.origin)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Host</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink truncate max-w-xs"
                >{parsedUrl.host}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.host)}
                class="btn-icon w-8 h-8 min-w-8"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="result-row gap-3">
            <span class="result-label shrink-0">Search query</span>
            <div class="flex items-center gap-2 min-w-0">
              <code class="font-mono text-code text-ink truncate max-w-xs"
                >{parsedUrl.search || '(none)'}</code
              >
              <button
                onclick={() => parsedUrl && copyToClipboard(parsedUrl.search || '')}
                class="btn-icon w-8 h-8 min-w-8"
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
      <div class="tool-card">
        <div class="card-header">
          <h3 class="section-title mb-0">Query parameters</h3>
          <span class="text-count"
            >{parsedUrl.searchParams.length} parameters</span
          >
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th class="text-left py-2 px-3 text-label text-ink-muted"
                  >Parameter</th
                >
                <th class="text-left py-2 px-3 text-label text-ink-muted"
                  >Value</th
                >
                <th
                  class="text-center py-2 px-3 text-label text-ink-muted"
                  >Actions</th
                >
              </tr>
            </thead>
            <tbody>
              {#each parsedUrl.searchParams as param, index (param.key + index)}
                <tr class="bg-control [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md">
                  <td class="py-2 px-3">
                    <code class="font-mono text-code text-ink">{param.key}</code>
                  </td>
                  <td class="py-2 px-3">
                    <code class="font-mono text-code text-ink truncate max-w-xs"
                      >{param.value}</code
                    >
                  </td>
                  <td class="py-2 px-3 text-center">
                    <div class="flex justify-center gap-2">
                      <button
                        onclick={() => copyToClipboard(param.key)}
                        class="btn-icon w-8 h-8 min-w-8"
                        title="Copy parameter name"
                      >
                        <Copy class="w-4 h-4" />
                      </button>
                      <button
                        onclick={() => copyToClipboard(param.value)}
                        class="btn-icon w-8 h-8 min-w-8"
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <div class="feature-icon">
        <Globe class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Extract domain</h3>
      <p class="feature-description">
        Extract domain, subdomain, and port information from any URL
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Path analysis</h3>
      <p class="feature-description">
        Analyze URL paths, query parameters, and hash fragments
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Query parameters</h3>
      <p class="feature-description">
        Parse and extract all query parameters with their values
      </p>
    </div>
  </div>
</ToolLayout>
