<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { EmptyState } from '$lib/components/ds';
  import { API_BASE_URL } from '../../lib/constants';
  import { toast } from 'svelte-sonner';
  import { onMount, onDestroy } from 'svelte';
  import { readApiError, isPresignedUrlFresh, withFreshUrls } from '../../lib/tempUpload';
  import {
    Upload,
    File,
    X,
    Copy,
    Link as LinkIcon,
    Clock,
    Trash2,
    Check,
    Download,
    ExternalLink,
    RefreshCw
  } from '@lucide/svelte';

  // Types
  interface UploadedFile {
    id: string;
    original_name: string;
    filename: string;
    mime_type: string;
    size: number;
    presigned_url: string;
  }

  interface UploadResponse {
    success: boolean;
    data: {
      id: string;
      name: string;
      data: {
        expires_at: string;
        file_count: number;
        files: UploadedFile[];
        uploaded_at: string;
      };
      files: UploadedFile[];
    };
  }

  interface ShortlinkResponse {
    success: boolean;
    data: {
      id: string;
      shortlink_code: string;
      shortlink_url: string;
      file_ids: string[];
      expires_at: string;
    };
  }

  interface StoredUpload {
    uploadId: string;
    files: UploadedFile[];
    uploadedAt: string;
    expiresAt: string;
    /** When the stored presigned URLs were issued (they live 1h). Older entries lack it → falls back to uploadedAt. */
    urlsIssuedAt?: string;
    shortlinkCode?: string;
    shortlinkUrl?: string;
  }

  // State
  let selectedFiles = $state<File[]>([]);
  let isUploading = $state(false);
  let isCreatingShortlink = $state(false);
  let uploadedFiles = $state<UploadedFile[]>([]);
  let currentUploadId = $state<string>('');
  let currentExpiresAt = $state<string>('');
  let currentShortlink = $state<ShortlinkResponse['data'] | null>(null);
  let currentUrlsIssuedAt = $state<string>('');
  let isRefreshingUrls = $state(false);
  // Ticks so link freshness / expiry labels update while the page stays open.
  let now = $state(Date.now());
  const urlsFresh = $derived(isPresignedUrlFresh(currentUrlsIssuedAt, now));
  let uploadHistory = $state<StoredUpload[]>([]);
  let dragActive = $state(false);

  // Constants
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

  let tick: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    loadHistory();
    cleanupExpiredHistory();
    tick = setInterval(() => (now = Date.now()), 30_000);
  });

  onDestroy(() => clearInterval(tick));

  function persistHistory() {
    localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
  }

  /**
   * Presigned URLs expire after 1h but files live 24h. A shortlink GET returns
   * freshly signed URLs, so use it to revive links for an upload.
   */
  async function refreshUrls(uploadId: string, code: string): Promise<boolean> {
    isRefreshingUrls = true;
    try {
      const response = await fetch(`${API_BASE_URL}/api/temp-upload/shortlink/${encodeURIComponent(code)}`);
      if (!response.ok) {
        const msg =
          response.status === 404
            ? 'Share link not found or expired — files are no longer available'
            : await readApiError(response, 'Failed to refresh download links');
        throw new Error(msg);
      }
      const result = await response.json();
      const fresh: { id: string; presigned_url: string | null }[] = result.data?.files ?? [];
      const issuedAt = new Date().toISOString();

      const item = uploadHistory.find(h => h.uploadId === uploadId);
      const base = currentUploadId === uploadId ? uploadedFiles : (item?.files ?? []);
      const { files, missing } = withFreshUrls(
        base,
        fresh.filter((f): f is { id: string; presigned_url: string } => !!f.presigned_url)
      );

      if (item) {
        item.files = files;
        item.urlsIssuedAt = issuedAt;
        persistHistory();
      }
      // Ignore if the user switched to another upload meanwhile.
      if (currentUploadId === uploadId) {
        uploadedFiles = files;
        currentUrlsIssuedAt = issuedAt;
        now = Date.now();
      }
      if (missing > 0) {
        toast.warning(`${missing} file${missing > 1 ? 's are' : ' is'} no longer available`);
      }
      return true;
    } catch (error) {
      console.error('Refresh links error:', error);
      if (currentUploadId === uploadId) {
        toast.error(error instanceof Error ? error.message : 'Failed to refresh download links');
      }
      return false;
    } finally {
      isRefreshingUrls = false;
    }
  }

  function loadHistory() {
    const stored = localStorage.getItem('temp-upload-history');
    if (stored) {
      try {
        uploadHistory = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }

  function cleanupExpiredHistory() {
    if (uploadHistory.length === 0) return;

    const now = new Date().getTime();
    const initialLength = uploadHistory.length;

    // Remove expired entries
    uploadHistory = uploadHistory.filter(item => {
      const expiresAt = new Date(item.expiresAt).getTime();
      return expiresAt > now;
    });

    // Update localStorage if any entries were removed
    if (uploadHistory.length !== initialLength) {
      localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
    }
  }

  function saveToHistory(data: StoredUpload) {
    uploadHistory.unshift(data);
    if (uploadHistory.length > 20) {
      uploadHistory = uploadHistory.slice(0, 20);
    }
    localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  function formatExpiresAt(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24);
      return `Expires in ${days} day${days > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Expires in ${diffHours}h ${diffMins}m`;
    } else if (diffMins > 0) {
      return `Expires in ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else {
      return 'Expires soon';
    }
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;

    const files = e.dataTransfer?.files;
    if (files) {
      addFiles(Array.from(files));
    }
  }

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      addFiles(Array.from(input.files));
      input.value = '';
    }
  }

  function addFiles(files: File[]) {
    const totalFiles = selectedFiles.length + files.length;

    if (totalFiles > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" exceeds 100MB limit`);
        continue;
      }

      // Check for duplicates
      if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
        selectedFiles = [...selectedFiles, file];
      }
    }
  }

  function removeFile(index: number) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
  }

  async function uploadFiles() {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    isUploading = true;

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files[]', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/temp-upload/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, 'Upload failed'));
      }

      const result: UploadResponse = await response.json();

      uploadedFiles = result.data.files;
      currentUploadId = result.data.id;
      currentExpiresAt = result.data.data.expires_at;
      currentShortlink = null;
      currentUrlsIssuedAt = new Date().toISOString();
      now = Date.now();

      toast.success(`Successfully uploaded ${result.data.files.length} file${result.data.files.length > 1 ? 's' : ''}`);

      // Save to history
      saveToHistory({
        uploadId: result.data.id,
        files: result.data.files,
        uploadedAt: result.data.data.uploaded_at,
        expiresAt: result.data.data.expires_at,
        urlsIssuedAt: currentUrlsIssuedAt
      });

      // Clear selected files
      selectedFiles = [];
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      isUploading = false;
    }
  }

  async function createShortlink() {
    if (uploadedFiles.length === 0) {
      toast.error('No files to create shortlink for');
      return;
    }

    isCreatingShortlink = true;

    try {
      const fileIds = uploadedFiles.map(f => f.id);

      const response = await fetch(`${API_BASE_URL}/api/temp-upload/shortlink`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file_ids: fileIds })
      });

      if (!response.ok) {
        throw new Error(await readApiError(response, 'Failed to create shortlink'));
      }

      const result: ShortlinkResponse = await response.json();

      // Construct shortlink URL using frontend domain
      const frontendUrl = `${window.location.origin}/files/${result.data.shortlink_code}`;

      currentShortlink = {
        ...result.data,
        shortlink_url: frontendUrl
      };

      toast.success('Shortlink created successfully!');

      // Update history with shortlink
      const historyItem = uploadHistory.find(h => h.uploadId === currentUploadId);
      if (historyItem) {
        historyItem.shortlinkCode = result.data.shortlink_code;
        historyItem.shortlinkUrl = frontendUrl;
        persistHistory();
      }

      // Download links had already expired: the new shortlink can re-sign them.
      if (!urlsFresh) {
        await refreshUrls(currentUploadId, result.data.shortlink_code);
      }
    } catch (error) {
      console.error('Shortlink error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create shortlink');
    } finally {
      isCreatingShortlink = false;
    }
  }

  function copyShortlink() {
    if (currentShortlink?.shortlink_url) {
      navigator.clipboard.writeText(currentShortlink.shortlink_url);
      toast.success('Shortlink copied to clipboard');
    }
  }

  function copyFileUrl(url: string) {
    navigator.clipboard.writeText(url);
    toast.success('File URL copied to clipboard');
  }

  function resetUpload() {
    selectedFiles = [];
    uploadedFiles = [];
    currentUploadId = '';
    currentExpiresAt = '';
    currentShortlink = null;
    currentUrlsIssuedAt = '';
  }

  function deleteFromHistory(uploadId: string) {
    uploadHistory = uploadHistory.filter(h => h.uploadId !== uploadId);
    localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
    toast.success('Removed from history');
  }

  function loadFromHistory(item: StoredUpload) {
    uploadedFiles = item.files;
    currentUploadId = item.uploadId;
    currentExpiresAt = item.expiresAt;
    currentUrlsIssuedAt = item.urlsIssuedAt ?? item.uploadedAt;
    now = Date.now();

    // Reconstruct shortlink URL using current frontend domain
    if (item.shortlinkCode) {
      const frontendUrl = `${window.location.origin}/files/${item.shortlinkCode}`;
      currentShortlink = {
        id: item.uploadId,
        shortlink_code: item.shortlinkCode,
        shortlink_url: frontendUrl,
        file_ids: item.files.map(f => f.id),
        expires_at: item.expiresAt
      };

      // Update the stored item with the correct URL
      item.shortlinkUrl = frontendUrl;
      persistHistory();

      if (!urlsFresh) {
        refreshUrls(item.uploadId, item.shortlinkCode);
      }
    } else {
      currentShortlink = null;
    }
  }

</script>

<ToolLayout
  title="Temp File Upload"
  description="Upload and share files temporarily. Auto-deleted after 24h. Max 10 files, 100MB each."
  icon={Upload}
  color="primary"
>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Upload Section -->
    <div class="lg:col-span-2 flex flex-col gap-4">
      {#if uploadedFiles.length === 0}
        <!-- Dropzone -->
        <div
          role="button"
          tabindex="-1"
          class="relative overflow-hidden rounded-lg p-6 transition-colors {dragActive
            ? 'bg-tile-deep text-ink-on-dark'
            : 'bg-control text-ink hover:bg-control-hover'}"
          ondragenter={handleDragEnter}
          ondragleave={handleDragLeave}
          ondragover={handleDragOver}
          ondrop={handleDrop}
        >
          <div class="text-center py-8">
            <div
              class="w-14 h-14 mx-auto mb-4 rounded-md flex items-center justify-center {dragActive
                ? 'bg-accent text-ink-on-accent'
                : 'bg-tile-deep text-ink-on-dark'}"
            >
              <Upload class="w-7 h-7" />
            </div>
            <h2 class="text-title mb-1">
              {dragActive ? 'Drop files here' : 'Upload files'}
            </h2>
            <p class="text-body-sm mb-4 {dragActive ? 'text-ink-on-dark-muted' : 'text-ink-muted'}">
              {dragActive ? 'Release to add your files' : 'Drag & drop files here, or click to browse'}
            </p>
            <label
              class="btn btn-primary cursor-pointer inline-flex items-center gap-2 {dragActive ? 'opacity-0 pointer-events-none' : ''} transition-opacity"
            >
              <input type="file" multiple accept="*" onchange={handleFileSelect} class="hidden" />
              <Upload class="w-4 h-4" />
              Choose files
            </label>
          </div>
        </div>

        <!-- Selected Files -->
        {#if selectedFiles.length > 0}
          <div class="tool-card">
            <div class="card-header">
              <div>
                <h3 class="section-title mb-1!">Selected files</h3>
                <p class="text-count">
                  {selectedFiles.length}/{MAX_FILES} files &middot; {formatFileSize(selectedFiles.reduce((sum, f) => sum + f.size, 0))} total
                </p>
              </div>
              <button
                class="btn btn-primary btn-sm"
                onclick={uploadFiles}
                disabled={isUploading}
              >
                {#if isUploading}
                  <span class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 border-2 border-ink-on-accent/30 border-t-ink-on-accent rounded-pill animate-spin"></span>
                    Uploading...
                  </span>
                {:else}
                  <Upload class="w-4 h-4" />
                  Upload
                {/if}
              </button>
            </div>
            <div class="space-y-2">
              {#each selectedFiles as file, index (file.name + index)}
                <div class="result-row group">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="w-8 h-8 rounded-sm bg-control flex items-center justify-center flex-shrink-0">
                      <File class="w-4 h-4 text-ink-muted" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-ink truncate">{file.name}</p>
                      <p class="text-count">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onclick={() => removeFile(index)}
                    class="btn-icon hover:text-negative opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                    title="Remove file"
                    aria-label="Remove file"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <!-- Uploaded Files Section -->
        <div class="tool-card">
          <div class="card-header">
            <div>
              <h3 class="section-title mb-1!">Uploaded files</h3>
              {#if currentExpiresAt}
                <p class="text-count flex items-center gap-1 mt-0.5">
                  <Clock class="w-3 h-3" />
                  {formatExpiresAt(currentExpiresAt)}
                </p>
              {/if}
            </div>
            <button class="btn btn-secondary btn-sm" onclick={resetUpload}>
              <Upload class="w-4 h-4" />
              Upload more
            </button>
          </div>

          {#if !urlsFresh}
            <div class="mb-3 p-3 rounded-md bg-sunken flex items-start gap-3" role="status">
              {#if isRefreshingUrls}
                <RefreshCw class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0 animate-spin" />
                <p class="text-body-sm text-ink-muted">Refreshing download links…</p>
              {:else if currentShortlink}
                <Clock class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0" />
                <p class="text-body-sm text-ink-muted flex-1">
                  Download links expire after 1 hour and couldn't be refreshed. The share link below may still work.
                </p>
                <button
                  class="btn btn-secondary btn-sm"
                  onclick={() => currentShortlink && refreshUrls(currentUploadId, currentShortlink.shortlink_code)}
                >
                  <RefreshCw class="w-4 h-4" />
                  Retry
                </button>
              {:else}
                <Clock class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0" />
                <p class="text-body-sm text-ink-muted">
                  Download links expired — they're only valid for 1 hour after upload. Generate a share link below to
                  get fresh links, or upload the files again.
                </p>
              {/if}
            </div>
          {/if}

          <div class="space-y-2">
            {#each uploadedFiles as file (file.id)}
              <div class="result-row group">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-8 h-8 rounded-sm bg-tile-deep text-ink-on-dark flex items-center justify-center flex-shrink-0">
                    <File class="w-4 h-4 text-ink" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-ink truncate">{file.original_name}</p>
                    <p class="text-count">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                {#if !urlsFresh || !file.presigned_url}
                  <span class="text-count flex-shrink-0">{isRefreshingUrls ? 'Refreshing…' : 'Link expired'}</span>
                {:else}
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <a
                    href={file.presigned_url}
                    target="_blank"
                    rel="noopener"
                    class="btn-icon"
                    title="Download"
                  >
                    <Download class="w-4 h-4" />
                  </a>
                  <button
                    onclick={() => copyFileUrl(file.presigned_url)}
                    class="btn-icon"
                    title="Copy URL"
                  >
                    <Copy class="w-4 h-4" />
                  </button>
                </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Create Shortlink Section -->
          {#if !currentShortlink}
            <div class="mt-5 p-4 rounded-md bg-sunken">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-sm bg-tile-deep text-ink-on-dark flex items-center justify-center flex-shrink-0">
                  <LinkIcon class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-ink">Create share link</h4>
                  <p class="text-body-sm text-ink-muted">One link for all files</p>
                </div>
                <button
                  class="btn btn-primary btn-sm"
                  onclick={createShortlink}
                  disabled={isCreatingShortlink}
                >
                  {#if isCreatingShortlink}
                    <span class="flex items-center gap-2">
                      <span class="w-3.5 h-3.5 border-2 border-ink-on-accent/30 border-t-ink-on-accent rounded-pill animate-spin"></span>
                      Creating...
                    </span>
                  {:else}
                    Generate
                  {/if}
                </button>
              </div>
            </div>
          {:else}
            <!-- Shortlink Result -->
            <div class="mt-5 p-4 rounded-md bg-sunken">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-pill bg-live flex items-center justify-center">
                  <Check class="w-3.5 h-3.5 text-ink-on-accent" />
                </div>
                <h4 class="text-sm font-medium text-ink">Share link ready</h4>
              </div>
              <div class="flex items-center gap-2">
                <input
                  readonly
                  value={currentShortlink.shortlink_url}
                  class="tool-input flex-1 font-mono text-sm"
                />
                <button class="btn btn-primary btn-sm" onclick={copyShortlink} title="Copy link" aria-label="Copy link">
                  <Copy class="w-4 h-4" />
                </button>
                <a
                  href={currentShortlink.shortlink_url}
                  target="_blank"
                  rel="noopener"
                  class="btn btn-secondary btn-sm"
                  title="Open link"
                >
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
              <p class="text-count mt-2 flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {formatExpiresAt(currentShortlink.expires_at)}
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- History Sidebar -->
    <div>
      <div class="tool-card">
        <div class="card-header">
          <h3 class="section-title mb-0!">Recent uploads</h3>
          {#if uploadHistory.length > 0}
            <button
              class="btn-icon"
              onclick={() => {
                uploadHistory = [];
                localStorage.removeItem('temp-upload-history');
                toast.success('History cleared');
              }}
              title="Clear history"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          {/if}
        </div>

        {#if uploadHistory.length === 0}
          <EmptyState title="No uploads yet" text="Files you upload here show up for 24 hours." />
        {:else}
          <div class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
            {#each uploadHistory as item (item.uploadId)}
              <div
                role="button"
                tabindex="0"
                class="p-3 rounded-md bg-control hover:bg-control-hover transition-colors cursor-pointer group"
                onclick={() => loadFromHistory(item)}
                onkeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    loadFromHistory(item);
                  }
                }}
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      {#if item.shortlinkUrl}
                        <LinkIcon class="w-3.5 h-3.5 text-accent-text flex-shrink-0" />
                      {:else}
                        <File class="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                      {/if}
                      <p class="text-sm font-medium text-ink truncate">
                        {item.files.length} file{item.files.length > 1 ? 's' : ''}
                      </p>
                      <span class="badge h-5! px-1.5! text-[10px]! flex-shrink-0 bg-card">
                        {formatFileSize(item.files.reduce((s, f) => s + f.size, 0))}
                      </span>
                    </div>
                    <p class="text-count mt-1">
                      {new Date(item.uploadedAt).toLocaleDateString()} {new Date(item.uploadedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {#if !item.shortlinkCode && !isPresignedUrlFresh(item.urlsIssuedAt ?? item.uploadedAt, now)}
                        &middot; links expired
                      {/if}
                    </p>
                    {#if item.shortlinkUrl}
                      <p class="text-xs font-mono text-accent-text mt-0.5 truncate">
                        /{item.shortlinkCode}
                      </p>
                    {/if}
                  </div>
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      deleteFromHistory(item.uploadId);
                    }}
                    class="btn-icon hover:text-negative p-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                    title="Remove from history"
                    aria-label="Remove from history"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</ToolLayout>
