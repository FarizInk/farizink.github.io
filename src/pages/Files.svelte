<script lang="ts">
  import { API_BASE_URL } from '../lib/constants';
  import { toast } from 'svelte-sonner';
  import { onMount, onDestroy } from 'svelte';
  import { router, getCurrentRouterState, navigate } from '../lib/router';
  import {
    Download,
    Copy,
    Clock,
    File,
    Package,
    Loader2,
    ArrowRight,
    Upload
  } from '@lucide/svelte';
  import Skeleton from 'boneyard-js/svelte';
  import { Button, EmptyState, PageHeader } from '$lib/components/ds';
  import { fixtureShortlinkData as fixtureData } from '../lib/fixtures';
  import { isBoneyardCapture } from '../lib/boneyard';

  // Types
  interface ShortlinkFile {
    id: string;
    original_name: string;
    presigned_url: string;
  }

  interface ShortlinkData {
    shortlink_code: string;
    expires_at: string;
    files: ShortlinkFile[];
  }

  // State
  let shortlinkCode = $state('');
  let inputCode = $state('');
  // Start "loading" during boneyard capture so the skeleton branch (with its
  // fixture files) renders for the headless snapshot.
  let isLoading = $state(isBoneyardCapture);
  let error = $state<string | null>(null);
  let data = $state<ShortlinkData | null>(null);

  // Get shortlink code from router or URL
  function getShortlinkCode(): string {
    const routerState = getCurrentRouterState();
    let code = routerState.params.code || '';

    // Fallback: try to get from URL path directly (for GitHub Pages redirect)
    if (!code) {
      const pathParts = window.location.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1] || '';
      if (lastPart && lastPart !== 'files') {
        code = lastPart;
      }
    }

    // Fallback: check query param for backwards compatibility
    if (!code) {
      const urlParams = new URLSearchParams(window.location.search);
      code = urlParams.get('shortlink') || '';
    }

    return code;
  }

  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    // Keep the skeleton branch mounted during boneyard capture.
    if (isBoneyardCapture) return;

    shortlinkCode = getShortlinkCode();

    if (!shortlinkCode) {
      isLoading = false;
    } else {
      loadFiles();
    }

    // Subscribe to router changes
    unsubscribe = router.subscribe((state) => {
      const newCode = state.params.code || getShortlinkCode();
      if (newCode && newCode !== shortlinkCode) {
        shortlinkCode = newCode;
        loadFiles();
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function handleSubmitCode() {
    const code = inputCode.trim();
    if (!code) {
      toast.error('Please enter a shortlink code');
      return;
    }

    // Navigate to the new URL with the code
    navigate(`/files/${code}`);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmitCode();
    }
  }

  async function loadFiles() {
    isLoading = true;
    error = null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/temp-upload/shortlink/${shortlinkCode}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Shortlink not found or has expired');
        }
        const err = await response.json();
        throw new Error(err.message || 'Failed to load files');
      }

      const result = await response.json();
      data = result.data;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load files';
      console.error('Load files error:', e);
    } finally {
      isLoading = false;
    }
  }


  function formatExpiresAt(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Expired';
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24);
      return `Expires in ${days} day${days > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Expires in ${diffHours}h ${diffMins}m`;
    } else {
      return `Expires in ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    }
  }

  function copyFileUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success('Download link copied to clipboard');
  }

  function copyAllLinks() {
    if (!data) return;

    const links = data.files
      .map(f => `${f.original_name}: ${f.presigned_url}`)
      .join('\n');

    navigator.clipboard.writeText(links);
    toast.success('All download links copied to clipboard');
  }

  function getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  }

  function getFileIcon(filename: string) {
    const ext = getExtension(filename);

    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
    const videoExts = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'];
    const audioExts = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
    const docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    const codeExts = ['js', 'ts', 'py', 'html', 'css', 'json', 'md', 'txt'];
    const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz'];

    if (imageExts.includes(ext)) return 'image';
    if (videoExts.includes(ext)) return 'video';
    if (audioExts.includes(ext)) return 'audio';
    if (docExts.includes(ext)) return 'document';
    if (codeExts.includes(ext)) return 'code';
    if (archiveExts.includes(ext)) return 'archive';

    return 'file';
  }

  function getFileColor(type: string): string {
    switch (type) {
      case 'image': return 'bg-tile-deep text-ink-on-dark';
      case 'video': return 'bg-tile-violet text-ink-on-dark';
      case 'audio': return 'bg-tile-violet text-ink-on-dark';
      case 'document': return 'bg-tile-violet text-ink-on-dark';
      case 'code': return 'bg-tile-lilac text-ink-on-bright';
      case 'archive': return 'bg-tile-lilac text-ink-on-bright';
      default: return 'bg-sunken text-ink';
    }
  }
</script>

<svelte:head>
  <title>Shared Files - Fariz</title>
  <meta name="description" content="Download shared temporary files" />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="mx-auto flex max-w-[1120px] flex-col gap-6 pt-16 pb-12">
  <PageHeader
    align="center"
    badge="TEMP SHARE"
    title="Shared"
    highlight="files"
    subtitle={data
      ? `${data.files.length} file${data.files.length > 1 ? 's' : ''} shared with you.`
      : !shortlinkCode
        ? 'Enter your shortlink code to access shared files.'
        : 'Loading shared files…'}
  />

  <!-- Input Code Form (when no code provided) -->
  {#if !shortlinkCode && !isLoading && !error}
    <div class="mx-auto w-full max-w-md">
      <div class="card">
        <div class="text-center mb-6">
          <div class="mx-auto mb-4 grid size-14 place-items-center rounded-md bg-tile-deep text-ink-on-dark">
            <Package class="size-6" />
          </div>
          <h2 class="text-title mb-2">Enter shortlink code</h2>
          <p class="text-body-sm font-normal text-ink-muted">
            Paste the code from your shared link to access the files
          </p>
        </div>

        <div class="flex gap-2">
          <input
            bind:value={inputCode}
            onkeypress={handleKeyPress}
            placeholder="e.g., lf64h4vm"
            class="tool-input flex-1 font-mono"
          />
          <button onclick={handleSubmitCode} class="btn btn-primary px-4" aria-label="Open files">
            <ArrowRight class="size-4" />
          </button>
        </div>

        <div class="mt-4 text-center">
          <a
            href="/tools/temp-upload"
            class="inline-flex items-center gap-1.5 text-body-sm text-accent-text hover:underline"
          >
            <Upload class="size-4" />
            Upload your own files
          </a>
        </div>
      </div>
    </div>

  <!-- Loading State -->
  {:else if isLoading}
    <div class="mx-auto w-full max-w-4xl">
      <!-- Info Card -->
      <div class="card mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 class="section-title mb-1">Files ready to download</h2>
            <p class="text-code flex items-center gap-1.5 text-ink-muted">
              <Clock class="size-4" />
              {formatExpiresAt(fixtureData.expires_at)}
            </p>
          </div>
          <div class="btn btn-secondary">
            <Copy class="size-4" />
            Copy all links
          </div>
        </div>
      </div>

      <!-- Files skeleton -->
      <Skeleton name="files-list" loading={true}>
        <div class="grid gap-4">
          {#each fixtureData.files as file (file.id)}
            {@const iconType = getFileIcon(file.original_name)}
            {@const iconColor = getFileColor(iconType)}
            <div class="card overflow-hidden p-4">
              <div class="flex items-center gap-4 min-w-0">
                <div class="flex-shrink-0">
                  <div class={`grid size-12 place-items-center rounded-md ${iconColor}`}>
                    {#if iconType === 'image'}
                      <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/>
                        <path d="M21 15l-5-5L5 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    {:else}
                      <File class="size-6" />
                    {/if}
                  </div>
                </div>
                <div class="flex-1 min-w-0 overflow-hidden">
                  <h3 class="text-body-sm leading-tight break-all">
                    {file.original_name}
                  </h3>
                  <p class="text-code truncate text-ink-muted">
                    {getExtension(file.original_name).toUpperCase()} file
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="btn-icon">
                    <Copy class="size-4" />
                  </div>
                  <div class="btn btn-secondary">
                    <Download class="size-4" />
                    <span class="hidden sm:inline">Download</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </Skeleton>
    </div>

  <!-- Error State -->
  {:else if error}
    <div class="mx-auto w-full max-w-md rounded-lg bg-card">
      <EmptyState title="Unable to load files" text={error}>
        {#snippet actions()}
          <Button
            onclick={() => {
              error = null;
              inputCode = '';
            }}
          >
            Try a different code
          </Button>
          <Button variant="secondary" href="/tools/temp-upload">Go to upload page</Button>
        {/snippet}
      </EmptyState>
    </div>

  <!-- Files List -->
  {:else if data}
    <div class="mx-auto w-full max-w-4xl">
      <!-- Info Card -->
      <div class="card mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 class="section-title mb-1">Files ready to download</h2>
            {#if data.expires_at}
              <p class="text-code flex items-center gap-1.5 text-ink-muted">
                <Clock class="size-4" />
                {formatExpiresAt(data.expires_at)}
              </p>
            {/if}
          </div>
          <button
            class="btn btn-secondary"
            onclick={copyAllLinks}
          >
            <Copy class="size-4" />
            Copy all links
          </button>
        </div>
      </div>

      <!-- Files Grid -->
      <div class="grid gap-4">
        {#each data.files as file (file.id)}
          {@const iconType = getFileIcon(file.original_name)}
          {@const iconColor = getFileColor(iconType)}

          <div class="card overflow-hidden p-4">
            <div class="flex items-center gap-4 min-w-0">
              <!-- File Icon -->
              <div class="flex-shrink-0">
                <div class={`grid size-12 place-items-center rounded-md ${iconColor}`}>
                  {#if iconType === 'image'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/>
                      <path d="M21 15l-5-5L5 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else if iconType === 'video'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else if iconType === 'audio'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 18V5l12-2v13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="6" cy="18" r="3" stroke-width="2"/>
                      <circle cx="18" cy="16" r="3" stroke-width="2"/>
                    </svg>
                  {:else if iconType === 'document'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else if iconType === 'code'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else if iconType === 'archive'}
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else}
                    <File class="size-6" />
                  {/if}
                </div>
              </div>

              <!-- File Info -->
              <div class="flex-1 min-w-0 overflow-hidden">
                <h3 class="text-body-sm leading-tight break-all" title={file.original_name}>
                  {file.original_name}
                </h3>
                <p class="text-code truncate text-ink-muted">
                  {getExtension(file.original_name).toUpperCase()} file
                </p>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <button
                  onclick={() => copyFileUrl(file.presigned_url)}
                  class="btn-icon"
                  title="Copy download link"
                >
                  <Copy class="size-4" />
                </button>
                <a
                  href={file.presigned_url}
                  target="_blank"
                  rel="noopener"
                  class="btn btn-secondary"
                  title="Download file"
                >
                  <Download class="size-4" />
                  <span class="hidden sm:inline">Download</span>
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center">
        <p class="text-body-sm font-normal text-ink-muted">
          Files are hosted temporarily and will be automatically deleted after 24 hours.
        </p>
        <a
          href="/tools/temp-upload"
          class="mt-2 inline-flex items-center gap-1.5 text-body-sm text-accent-text hover:underline"
        >
          <Package class="size-4" />
          Upload your own files
        </a>
      </div>
    </div>
  {/if}
</div>
