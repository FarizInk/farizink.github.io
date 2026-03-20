<script lang="ts">
  import { API_BASE_URL } from '../lib/constants';
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
    AlertCircle,
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

  function getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return '';
    if (mimeType.startsWith('video/')) return '';
    if (mimeType.startsWith('audio/')) return '';
    if (mimeType.includes('pdf')) return '';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return '';
    return '';
  }
</script>

<svelte:head>
  <title>Temp File Upload - Fariz</title>
  <meta name="description" content="Upload and share files temporarily with auto-delete after 24 hours. Fast, secure, and free." />
  <meta name="keywords" content="file upload, temp file, share files, temporary storage, file sharing" />
</svelte:head>

<div class="notes-page">
  <!-- Hero Section -->
  <div class="notes-hero-section">
    <div class="notes-hero-badge">
      <span class="badge badge-primary">Free Tool</span>
    </div>
    <h1 class="notes-hero-title">Temp File Upload</h1>
    <p class="notes-hero-description">
      Upload and share files temporarily. Files are automatically deleted after 24 hours.
      Max 10 files per upload, 100MB per file.
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Upload Section -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Upload Area -->
      {#if uploadedFiles.length === 0}
        <div
          class="card"
          ondragenter={handleDragEnter}
          ondragleave={handleDragLeave}
          ondragover={handleDragOver}
          ondrop={handleDrop}
          class:border-dashed={dragActive}
          class:border-primary-500={dragActive}
        >
          <div class="text-center py-12">
            <div
              class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center"
            >
              <Upload class="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {dragActive ? 'Drop files here' : 'Upload Files'}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Drag & drop files here, or click to browse
            </p>
            <div class="flex justify-center gap-4 mb-6">
              <label class="btn btn-primary cursor-pointer">
                <input type="file" multiple accept="*" onchange={handleFileSelect} class="hidden" />
                <Upload class="w-4 h-4" />
                Choose Files
              </label>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              Max {MAX_FILES} files, 100MB per file • Auto-delete after 24 hours
            </p>
          </div>
        </div>

        <!-- Selected Files -->
        {#if selectedFiles.length > 0}
          <div class="card">
            <div class="card-header">
              <h3 class="section-title">Selected Files ({selectedFiles.length}/{MAX_FILES})</h3>
            </div>
            <div class="space-y-3">
              {#each selectedFiles as file, index (file.name + index)}
                <div class="result-row">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <File class="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div class="min-w-0 flex-1">
                      <p class="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onclick={() => removeFile(index)}
                    class="btn-icon text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X class="w-4 h-4" />
                  </button>
                </div>
              {/each}
            </div>
            <div class="flex justify-end mt-4">
              <button
                class="btn btn-primary"
                onclick={uploadFiles}
                disabled={isUploading}
              >
                {#if isUploading}
                  Uploading...
                {:else}
                  <Upload class="w-4 h-4" />
                  Upload Files
                {/if}
              </button>
            </div>
          </div>
        {/if}
      {:else}
        <!-- Uploaded Files Section -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="section-title">Uploaded Files</h3>
              {#if currentExpiresAt}
                <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                  <Clock class="w-3.5 h-3.5" />
                  {formatExpiresAt(currentExpiresAt)}
                </p>
              {/if}
            </div>
            <button class="btn btn-secondary btn-sm" onclick={resetUpload}>
              <Upload class="w-4 h-4" />
              Upload More
            </button>
          </div>

          <div class="space-y-3">
            {#each uploadedFiles as file (file.id)}
              <div class="result-row">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <File class="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <div class="min-w-0 flex-1">
                    <p class="font-medium text-gray-900 dark:text-white truncate">{file.original_name}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
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
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Create Share Link</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Generate a short link to share all files at once
              </p>
              <button
                class="btn btn-primary w-full"
                onclick={createShortlink}
                disabled={isCreatingShortlink}
              >
                {#if isCreatingShortlink}
                  Creating...
                {:else}
                  <LinkIcon class="w-4 h-4" />
                  Create Shortlink
                {/if}
              </button>
            </div>
          {:else}
            <!-- Shortlink Result -->
            <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <Check class="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 class="font-medium text-green-900 dark:text-green-100">Shortlink Created!</h4>
              </div>
              <div class="flex items-center gap-2 mt-3">
                <input
                  readonly
                  value={currentShortlink.shortlink_url}
                  class="tool-input flex-1 font-mono text-sm"
                />
                <button class="btn btn-primary" onclick={copyShortlink}>
                  <Copy class="w-4 h-4" />
                </button>
                <a
                  href={currentShortlink.shortlink_url}
                  target="_blank"
                  rel="noopener"
                  class="btn btn-secondary"
                  title="Open link"
                >
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
              <p class="text-sm text-green-700 dark:text-green-300 mt-2 flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                {formatExpiresAt(currentShortlink.expires_at)}
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- History Sidebar -->
    <div>
      <div class="card">
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
          <div class="placeholder">
            <File class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p class="text-sm">No upload history yet</p>
          </div>
        {:else}
          <div class="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {#each uploadHistory as item (item.uploadId)}
              <div
                class="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onclick={() => loadFromHistory(item)}
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      {#if item.shortlinkUrl}
                        <LinkIcon class="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                      {/if}
                      <p class="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {item.files.length} file{item.files.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(item.uploadedAt).toLocaleDateString()} {new Date(item.uploadedAt).toLocaleTimeString()}
                    </p>
                    {#if item.shortlinkUrl}
                      <p class="text-xs text-primary-600 dark:text-primary-400 mt-1 truncate">
                        /files/{item.shortlinkCode}
                      </p>
                    {/if}
                  </div>
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      deleteFromHistory(item.uploadId);
                    }}
                    class="btn-icon text-red-400 hover:text-red-600 p-1"
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
</div>
