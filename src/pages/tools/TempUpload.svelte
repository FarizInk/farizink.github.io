<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { API_BASE_URL } from '../../lib/constants';
  import { toast } from 'svelte-sonner';
  import { onMount } from 'svelte';
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
    ExternalLink
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
  let uploadHistory = $state<StoredUpload[]>([]);
  let dragActive = $state(false);

  // Constants
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

  onMount(() => {
    loadHistory();
    cleanupExpiredHistory();
  });

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
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const result: UploadResponse = await response.json();

      uploadedFiles = result.data.files;
      currentUploadId = result.data.id;
      currentExpiresAt = result.data.data.expires_at;
      currentShortlink = null;

      toast.success(`Successfully uploaded ${result.data.files.length} file${result.data.files.length > 1 ? 's' : ''}`);

      // Save to history
      saveToHistory({
        uploadId: result.data.id,
        files: result.data.files,
        uploadedAt: result.data.data.uploaded_at,
        expiresAt: result.data.data.expires_at
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
        const error = await response.json();
        throw new Error(error.message || 'Failed to create shortlink');
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
        localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
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
      localStorage.setItem('temp-upload-history', JSON.stringify(uploadHistory));
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
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Upload Section -->
    <div class="lg:col-span-2 space-y-5">
      {#if uploadedFiles.length === 0}
        <!-- Dropzone -->
        <div
          class="tool-card relative overflow-hidden transition-all duration-200 {dragActive
            ? 'border-2 border-dashed !border-primary-400 dark:!border-primary-500 !bg-primary-50/50 dark:!bg-primary-900/10'
            : ''}"
          ondragenter={handleDragEnter}
          ondragleave={handleDragLeave}
          ondragover={handleDragOver}
          ondrop={handleDrop}
        >
          <div class="text-center py-8">
            <div
              class="w-14 h-14 mx-auto mb-4 rounded-2xl {dragActive
                ? 'bg-primary-200 dark:bg-primary-800/40 scale-110'
                : 'bg-primary-100 dark:bg-primary-900/20'} flex items-center justify-center transition-transform duration-200"
            >
              <Upload
                class="w-7 h-7 text-primary-600 dark:text-primary-400 {dragActive ? 'animate-bounce' : ''}"
              />
            </div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {dragActive ? 'Drop files here!' : 'Upload Files'}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {dragActive ? 'Release to add your files' : 'Drag & drop files here, or click to browse'}
            </p>
            <label
              class="btn btn-primary cursor-pointer inline-flex items-center gap-2 {dragActive ? 'opacity-0 pointer-events-none' : ''} transition-opacity"
            >
              <input type="file" multiple accept="*" onchange={handleFileSelect} class="hidden" />
              <Upload class="w-4 h-4" />
              Choose Files
            </label>
          </div>
        </div>

        <!-- Selected Files -->
        {#if selectedFiles.length > 0}
          <div class="tool-card">
            <div class="card-header">
              <div>
                <h3 class="section-title !mb-1">Selected Files</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">
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
                    <span class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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
                    <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-600/50 flex items-center justify-center flex-shrink-0">
                      <File class="w-4 h-4 text-gray-400" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onclick={() => removeFile(index)}
                    class="btn-icon text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
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
              <h3 class="section-title !mb-1">Uploaded Files</h3>
              {#if currentExpiresAt}
                <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                  <Clock class="w-3 h-3" />
                  {formatExpiresAt(currentExpiresAt)}
                </p>
              {/if}
            </div>
            <button class="btn btn-secondary btn-sm" onclick={resetUpload}>
              <Upload class="w-4 h-4" />
              Upload More
            </button>
          </div>

          <div class="space-y-2">
            {#each uploadedFiles as file (file.id)}
              <div class="result-row group">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <File class="w-4 h-4 text-primary-500" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{file.original_name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
              </div>
            {/each}
          </div>

          <!-- Create Shortlink Section -->
          {#if !currentShortlink}
            <div class="mt-5 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600/50">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-white dark:bg-gray-600/50 flex items-center justify-center shadow-sm flex-shrink-0">
                  <LinkIcon class="w-4 h-4 text-primary-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">Create Share Link</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">One link for all files</p>
                </div>
                <button
                  class="btn btn-primary btn-sm"
                  onclick={createShortlink}
                  disabled={isCreatingShortlink}
                >
                  {#if isCreatingShortlink}
                    <span class="flex items-center gap-2">
                      <span class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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
            <div class="mt-5 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/60">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check class="w-3.5 h-3.5 text-white" />
                </div>
                <h4 class="text-sm font-medium text-green-900 dark:text-green-100">Share Link Ready</h4>
              </div>
              <div class="flex items-center gap-2">
                <input
                  readonly
                  value={currentShortlink.shortlink_url}
                  class="tool-input flex-1 font-mono text-sm !bg-white dark:!bg-gray-800 !border-green-300 dark:!border-green-700"
                />
                <button class="btn btn-primary btn-sm" onclick={copyShortlink}>
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
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
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
          <h3 class="section-title">Recent Uploads</h3>
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
          <div class="flex flex-col items-center justify-center py-10">
            <File class="w-10 h-10 text-gray-200 dark:text-gray-700 mb-2" />
            <p class="text-sm text-gray-400 dark:text-gray-600">No uploads yet</p>
          </div>
        {:else}
          <div class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
            {#each uploadHistory as item (item.uploadId)}
              <div
                class="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-all cursor-pointer group border border-transparent hover:border-gray-200 dark:hover:border-gray-600/50"
                onclick={() => loadFromHistory(item)}
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      {#if item.shortlinkUrl}
                        <LinkIcon class="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                      {:else}
                        <File class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {/if}
                      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.files.length} file{item.files.length > 1 ? 's' : ''}
                      </p>
                      <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex-shrink-0">
                        {formatFileSize(item.files.reduce((s, f) => s + f.size, 0))}
                      </span>
                    </div>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(item.uploadedAt).toLocaleDateString()} {new Date(item.uploadedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    {#if item.shortlinkUrl}
                      <p class="text-xs text-primary-600 dark:text-primary-400 mt-0.5 truncate">
                        /{item.shortlinkCode}
                      </p>
                    {/if}
                  </div>
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      deleteFromHistory(item.uploadId);
                    }}
                    class="btn-icon text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
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
