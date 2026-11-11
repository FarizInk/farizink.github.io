<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Button, CopyChip, EmptyState, FileDrop, IconButton } from '$lib/components/ds';
  import type { UploadFile } from '$lib/components/ds';
  import { API_BASE_URL } from '../../lib/constants';
  import { toast } from 'svelte-sonner';
  import { onMount, onDestroy } from 'svelte';
  import {
    readApiError,
    isPresignedUrlFresh,
    withFreshUrls,
    selectFiles,
    formatEta,
    formatSpeed,
    formatExpiresAt,
    formatFileSize,
    perFileProgress,
    uploadWithProgress,
    UploadAbortedError
  } from '../../lib/tempUpload';
  import {
    Upload,
    File as FileIcon,
    X,
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

  // Constants
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
  const HISTORY_KEY = 'temp-upload-history';

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
  /** Inline note about files that were skipped or an upload that was cancelled. */
  let notice = $state('');
  let confirmClear = $state(false);

  // Upload progress
  let uploadLoaded = $state(0);
  let uploadTotal = $state(0);
  let uploadSpeed = $state(0);
  let abortUpload: (() => void) | undefined;
  let speedSamples: { t: number; loaded: number }[] = [];

  const uploadFraction = $derived(uploadTotal > 0 ? Math.min(uploadLoaded / uploadTotal, 1) : 0);
  const uploadPercent = $derived(Math.floor(uploadFraction * 100));
  const selectedBytes = $derived(selectedFiles.reduce((sum, f) => sum + f.size, 0));
  const fileProgress = $derived(perFileProgress(selectedFiles.map(f => f.size), uploadFraction));
  const isProcessing = $derived(isUploading && uploadTotal > 0 && uploadLoaded >= uploadTotal);
  const uploadStats = $derived.by(() => {
    if (!isUploading) return '';
    if (isProcessing) return 'Processing on the server…';
    const parts = [`${uploadPercent}%`, `${formatFileSize(uploadLoaded)} of ${formatFileSize(uploadTotal || selectedBytes)}`];
    const speed = formatSpeed(uploadSpeed);
    if (speed) parts.push(speed);
    const eta = formatEta(uploadTotal - uploadLoaded, uploadSpeed);
    if (eta) parts.push(`${eta} left`);
    return parts.join(' · ');
  });

  const dropFiles = $derived<UploadFile[]>(
    selectedFiles.map((file, i) => ({
      name: file.name,
      meta: isUploading
        ? fileProgress[i] >= 100
          ? `${formatFileSize(file.size)} · sent`
          : `${formatFileSize(file.size)} · ${fileProgress[i]}%`
        : formatFileSize(file.size),
      progress: isUploading ? fileProgress[i] : undefined,
      onremove: isUploading ? undefined : () => removeFile(file.name)
    }))
  );

  let tick: ReturnType<typeof setInterval> | undefined;
  let confirmTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    loadHistory();
    cleanupExpiredHistory();
    tick = setInterval(() => {
      now = Date.now();
      cleanupExpiredHistory();
    }, 30_000);
  });

  onDestroy(() => {
    clearInterval(tick);
    clearTimeout(confirmTimer);
    abortUpload?.();
  });

  function persistHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(uploadHistory));
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
    const stored = localStorage.getItem(HISTORY_KEY);
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

    const nowMs = Date.now();
    const kept = uploadHistory.filter(item => new Date(item.expiresAt).getTime() > nowMs);

    if (kept.length !== uploadHistory.length) {
      uploadHistory = kept;
      persistHistory();
    }
  }

  function saveToHistory(data: StoredUpload) {
    uploadHistory.unshift(data);
    if (uploadHistory.length > 20) {
      uploadHistory = uploadHistory.slice(0, 20);
    }
    persistHistory();
  }

  function plural(n: number, word: string): string {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
  }

  function addFiles(files: File[]) {
    if (isUploading || files.length === 0) return;

    const { accepted, skippedTooMany, skippedTooLarge, skippedDuplicate } = selectFiles(selectedFiles, files, {
      maxFiles: MAX_FILES,
      maxBytes: MAX_FILE_SIZE
    });

    if (accepted.length) selectedFiles = [...selectedFiles, ...accepted];

    const notes: string[] = [];
    if (skippedTooMany) notes.push(`${plural(skippedTooMany, 'file')} skipped — max ${MAX_FILES} files per upload`);
    if (skippedTooLarge.length === 1) notes.push(`"${skippedTooLarge[0].name}" skipped — over 100 MB`);
    else if (skippedTooLarge.length > 1) notes.push(`${skippedTooLarge.length} files skipped — over 100 MB each`);
    if (skippedDuplicate) notes.push(`${plural(skippedDuplicate, 'file')} already selected`);
    notice = notes.join('. ');
  }

  function removeFile(name: string) {
    selectedFiles = selectedFiles.filter(f => f.name !== name);
    notice = '';
  }

  function handlePaste(e: ClipboardEvent) {
    const files = e.clipboardData?.files;
    if (!files?.length || uploadedFiles.length > 0 || isUploading) return;
    e.preventDefault();
    addFiles(Array.from(files));
  }

  function trackSpeed(loaded: number) {
    const t = performance.now();
    speedSamples.push({ t, loaded });
    // Speed over the last ~4 s so it follows the connection without jumping around.
    while (speedSamples.length > 2 && t - speedSamples[0].t > 4000) speedSamples.shift();
    const first = speedSamples[0];
    const dt = (t - first.t) / 1000;
    if (dt >= 0.5) uploadSpeed = (loaded - first.loaded) / dt;
  }

  async function uploadFiles() {
    if (selectedFiles.length === 0 || isUploading) return;

    isUploading = true;
    notice = '';
    uploadLoaded = 0;
    uploadTotal = 0;
    uploadSpeed = 0;
    speedSamples = [{ t: performance.now(), loaded: 0 }];

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files[]', file);
    });

    const handle = uploadWithProgress<UploadResponse>(`${API_BASE_URL}/api/temp-upload/upload`, formData, p => {
      uploadLoaded = p.loaded;
      uploadTotal = p.total;
      trackSpeed(p.loaded);
    });
    abortUpload = handle.abort;

    try {
      const result = await handle.promise;

      uploadedFiles = result.data.files;
      currentUploadId = result.data.id;
      currentExpiresAt = result.data.data.expires_at;
      currentShortlink = null;
      currentUrlsIssuedAt = new Date().toISOString();
      now = Date.now();

      saveToHistory({
        uploadId: result.data.id,
        files: result.data.files,
        uploadedAt: result.data.data.uploaded_at,
        expiresAt: result.data.data.expires_at,
        urlsIssuedAt: currentUrlsIssuedAt
      });

      selectedFiles = [];
    } catch (error) {
      if (error instanceof UploadAbortedError) {
        notice = 'Upload cancelled — your files are still selected.';
      } else {
        console.error('Upload error:', error);
        toast.error(error instanceof Error ? error.message : 'Upload failed');
      }
    } finally {
      isUploading = false;
      abortUpload = undefined;
    }
  }

  function cancelUpload() {
    abortUpload?.();
  }

  async function createShortlink() {
    if (uploadedFiles.length === 0) return;

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

  function resetUpload() {
    selectedFiles = [];
    uploadedFiles = [];
    currentUploadId = '';
    currentExpiresAt = '';
    currentShortlink = null;
    currentUrlsIssuedAt = '';
    notice = '';
  }

  function deleteFromHistory(uploadId: string) {
    uploadHistory = uploadHistory.filter(h => h.uploadId !== uploadId);
    persistHistory();
  }

  function clearHistory() {
    if (!confirmClear) {
      confirmClear = true;
      clearTimeout(confirmTimer);
      confirmTimer = setTimeout(() => (confirmClear = false), 4000);
      return;
    }
    clearTimeout(confirmTimer);
    confirmClear = false;
    uploadHistory = [];
    localStorage.removeItem(HISTORY_KEY);
  }

  function loadFromHistory(item: StoredUpload) {
    uploadedFiles = item.files;
    currentUploadId = item.uploadId;
    currentExpiresAt = item.expiresAt;
    currentUrlsIssuedAt = item.urlsIssuedAt ?? item.uploadedAt;
    now = Date.now();
    notice = '';

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

<svelte:window onpaste={handlePaste} />

<ToolLayout
  title="Temp File Upload"
  description="Upload and share files temporarily. Auto-deleted after 24h. Max 10 files, 100MB each."
  icon={Upload}
  color="primary"
>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Upload Section -->
    <div class="lg:col-span-2 flex flex-col gap-4 min-w-0">
      {#if uploadedFiles.length === 0}
        <div class="tool-card">
          <FileDrop
            multiple
            hint="Up to {MAX_FILES} files · 100 MB each · paste with Ctrl/⌘+V · deleted after 24h"
            files={dropFiles}
            onfiles={list => addFiles(Array.from(list))}
          />

          {#if notice}
            <p class="mt-3 mb-0 p-3 rounded-md bg-sunken text-body-sm text-ink-muted" role="status">{notice}</p>
          {/if}

          {#if selectedFiles.length > 0}
            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p class="text-count m-0">
                {selectedFiles.length}/{MAX_FILES} files &middot; {formatFileSize(selectedBytes)} total
              </p>
              {#if isUploading}
                <Button variant="secondary" size="sm" onclick={cancelUpload} disabled={isProcessing}>
                  {#snippet icon()}<X class="w-4 h-4" />{/snippet}
                  Cancel
                </Button>
              {:else}
                <Button size="sm" onclick={uploadFiles}>
                  {#snippet icon()}<Upload class="w-4 h-4" />{/snippet}
                  Upload {plural(selectedFiles.length, 'file')}
                </Button>
              {/if}
            </div>

            {#if isUploading}
              <div class="mt-3">
                <div
                  class="h-2 rounded-pill bg-sunken overflow-hidden"
                  role="progressbar"
                  aria-label="Upload progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={uploadPercent}
                  aria-valuetext={uploadStats}
                >
                  <div
                    class="h-full rounded-pill bg-accent transition-[width] duration-base ease-smooth"
                    style="width: {uploadPercent}%"
                  ></div>
                </div>
                <p class="text-count mt-2 mb-0" aria-live="polite">{uploadStats}</p>
              </div>
            {/if}
          {/if}
        </div>
      {:else}
        <!-- Uploaded Files Section -->
        <div class="tool-card">
          <div class="card-header flex-wrap gap-3">
            <div>
              <h3 class="section-title mb-1!">Uploaded files</h3>
              {#if currentExpiresAt}
                <p class="text-count flex items-center gap-1 mt-0.5">
                  <Clock class="w-3 h-3" />
                  {formatExpiresAt(currentExpiresAt, now)}
                </p>
              {/if}
            </div>
            <Button variant="secondary" size="sm" onclick={resetUpload}>
              {#snippet icon()}<Upload class="w-4 h-4" />{/snippet}
              Upload more
            </Button>
          </div>

          {#if !urlsFresh}
            <div class="mb-3 p-3 rounded-md bg-sunken flex flex-wrap items-start gap-3" role="status">
              {#if isRefreshingUrls}
                <RefreshCw class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0 animate-spin" />
                <p class="text-body-sm text-ink-muted">Refreshing download links…</p>
              {:else if currentShortlink}
                <Clock class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0" />
                <p class="text-body-sm text-ink-muted flex-1 min-w-[12rem]">
                  Download links expire after 1 hour and couldn't be refreshed. The share link below may still work.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onclick={() => currentShortlink && refreshUrls(currentUploadId, currentShortlink.shortlink_code)}
                >
                  {#snippet icon()}<RefreshCw class="w-4 h-4" />{/snippet}
                  Retry
                </Button>
              {:else}
                <Clock class="w-4 h-4 mt-0.5 text-ink-muted flex-shrink-0" />
                <p class="text-body-sm text-ink-muted flex-1 min-w-[12rem]">
                  Download links expired — they're only valid for 1 hour after upload. Generate a share link below to
                  get fresh links, or upload the files again.
                </p>
              {/if}
            </div>
          {/if}

          <div class="flex flex-col gap-2">
            {#each uploadedFiles as file (file.id)}
              <div class="result-row flex-wrap gap-3">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-8 h-8 rounded-sm bg-tile-deep text-ink-on-dark flex items-center justify-center flex-shrink-0">
                    <FileIcon class="w-4 h-4 text-ink-on-dark" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-ink truncate">{file.original_name}</p>
                    <p class="text-count">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                {#if !urlsFresh || !file.presigned_url}
                  <span class="text-count flex-shrink-0">{isRefreshingUrls ? 'Refreshing…' : 'Link expired'}</span>
                {:else}
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <IconButton label="Download {file.original_name}" href={file.presigned_url} target="_blank">
                      <Download />
                    </IconButton>
                    <CopyChip value={file.presigned_url}>Copy URL</CopyChip>
                  </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Create Shortlink Section -->
          {#if !currentShortlink}
            <div class="mt-5 p-4 rounded-md bg-sunken">
              <div class="flex flex-wrap items-center gap-3">
                <div class="w-9 h-9 rounded-sm bg-tile-deep text-ink-on-dark flex items-center justify-center flex-shrink-0">
                  <LinkIcon class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-ink">Create share link</h4>
                  <p class="text-body-sm text-ink-muted">One link for all files</p>
                </div>
                <Button size="sm" onclick={createShortlink} disabled={isCreatingShortlink}>
                  {#if isCreatingShortlink}
                    <span class="w-3.5 h-3.5 border-2 border-ink-on-accent/30 border-t-ink-on-accent rounded-pill animate-spin" aria-hidden="true"></span>
                    Creating…
                  {:else}
                    Generate
                  {/if}
                </Button>
              </div>
            </div>
          {:else}
            <!-- Shortlink Result -->
            <div class="mt-5 p-4 rounded-md bg-sunken">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-pill bg-live flex items-center justify-center">
                  <Check class="w-3.5 h-3.5 text-card" />
                </div>
                <h4 class="text-sm font-medium text-ink">Share link ready</h4>
              </div>
              <p class="font-mono text-sm text-ink break-all mb-3 select-all">{currentShortlink.shortlink_url}</p>
              <div class="flex flex-wrap items-center gap-2">
                <CopyChip value={currentShortlink.shortlink_url}>Copy link</CopyChip>
                <IconButton label="Open share link" href={currentShortlink.shortlink_url} target="_blank">
                  <ExternalLink />
                </IconButton>
              </div>
              <p class="text-count mt-2 flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {formatExpiresAt(currentShortlink.expires_at, now)}
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- History Sidebar -->
    <div class="min-w-0">
      <div class="tool-card">
        <div class="card-header gap-3">
          <h3 class="section-title mb-0!">Recent uploads</h3>
          {#if uploadHistory.length > 0}
            <Button variant={confirmClear ? 'primary' : 'ghost'} size="sm" onclick={clearHistory}>
              {#snippet icon()}<Trash2 class="w-4 h-4" />{/snippet}
              {confirmClear ? 'Confirm clear' : 'Clear'}
            </Button>
          {/if}
        </div>

        {#if uploadHistory.length === 0}
          <EmptyState title="No uploads yet" text="Files you upload here show up for 24 hours." />
        {:else}
          <ul class="flex flex-col gap-2 max-h-[500px] overflow-y-auto custom-scrollbar m-0 p-0 list-none">
            {#each uploadHistory as item (item.uploadId)}
              <li
                class="flex items-center gap-1 rounded-md transition-colors {item.uploadId === currentUploadId
                  ? 'bg-control-hover'
                  : 'bg-control hover:bg-control-hover'}"
              >
                <button
                  type="button"
                  class="flex-1 min-w-0 p-3 text-left cursor-pointer bg-transparent rounded-md"
                  onclick={() => loadFromHistory(item)}
                  aria-current={item.uploadId === currentUploadId ? 'true' : undefined}
                >
                  <span class="flex items-center gap-2">
                    {#if item.shortlinkUrl}
                      <LinkIcon class="w-3.5 h-3.5 text-accent-text flex-shrink-0" />
                    {:else}
                      <FileIcon class="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                    {/if}
                    <span class="text-sm font-medium text-ink truncate">
                      {plural(item.files.length, 'file')}
                    </span>
                    <span class="badge h-5! px-1.5! text-[10px]! flex-shrink-0 bg-card">
                      {formatFileSize(item.files.reduce((s, f) => s + f.size, 0))}
                    </span>
                  </span>
                  <span class="block text-count mt-1">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                    {new Date(item.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {#if !item.shortlinkCode && !isPresignedUrlFresh(item.urlsIssuedAt ?? item.uploadedAt, now)}
                      &middot; links expired
                    {/if}
                  </span>
                  <span class="block text-count mt-0.5">{formatExpiresAt(item.expiresAt, now)}</span>
                  {#if item.shortlinkUrl}
                    <span class="block text-xs font-mono text-accent-text mt-0.5 truncate">
                      /{item.shortlinkCode}
                    </span>
                  {/if}
                </button>
                <button
                  type="button"
                  onclick={() => deleteFromHistory(item.uploadId)}
                  class="btn-icon text-ink-muted hover:text-negative mr-1 flex-shrink-0"
                  title="Remove from history"
                  aria-label="Remove upload of {plural(item.files.length, 'file')} from history"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
</ToolLayout>
