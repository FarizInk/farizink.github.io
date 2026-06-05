import axios from 'axios';
import { apiClient, isAxiosError } from './axios';
import { API_BASE_URL } from './constants';
import type { Tag } from './tags';

export interface NoteFile {
  id: string;
  note_id: string;
  data: string; // base64 encoded data (legacy support)
  url?: string; // file URL for multipart uploads
  presigned_url?: string; // presigned URL for secure file access
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  metadata: {
    title?: string;
    description?: string;
    alt?: string;
    width?: number;
    height?: number;
    pages?: number;
    [key: string]: string | number | undefined;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  related_id: string;
  related_type: string;
  upload_source: string;
}

export interface Note {
  id: string;
  name: string | null;
  link: string | null;
  link_summarize: string | null;
  description: string | null;
  is_public: boolean;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tags: Tag[];
  files?: NoteFile[];
}

export interface NotesResponse {
  notes: Note[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface NoteResponse {
  data: Note;
}

export interface DeleteResponse {
  message: string;
}

export interface PermanentDeleteResponse {
  message: string;
  deletedFilesCount: number;
  s3Errors: string[];
}

export interface NoteFileData {
  data?: string; // base64 encoded data (legacy support)
  file?: File; // Actual file for multipart upload
  url?: string; // File URL from server response
  originalName: string;
  mimeType: string;
  size?: number;
}

export interface CreateNoteData {
  name?: string;
  link?: string;
  description?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  tags?: string[]; // Changed from tagIds to tags
  files?: NoteFileData[];
}

export interface UpdateNoteData {
  name?: string;
  link?: string;
  description?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  files?: NoteFileData[];
  deleteFileIds?: string[];
}

export interface NoteFilters {
  isPublic?: boolean;
  isFavorite?: boolean;
  sortBy?: 'created_at' | 'updated_at' | 'deleted_at';
  sortOrder?: 'asc' | 'desc';
  search?: string;
  includeTags?: string[];
  excludeTags?: string[];
}

/**
 * Get all notes with pagination and filters
 * Can be accessed with or without authentication token
 */
export async function getNotes(
  page: number = 1,
  limit: number = 10,
  filters?: NoteFilters
): Promise<NotesResponse> {
  // Build query params - use snake_case for API parameters
  const params: Record<string, string | number> = {
    page: page.toString(),
    limit: limit.toString()
  };

  // Add filters if they exist - convert to snake_case for API
  if (filters?.isPublic !== undefined) {
    params.is_public = filters.isPublic.toString();
  }
  if (filters?.isFavorite !== undefined) {
    params.is_favorite = filters.isFavorite.toString();
  }
  if (filters?.sortBy) {
    params.sort_by = filters.sortBy;
  }
  if (filters?.sortOrder) {
    params.sort_order = filters.sortOrder;
  }
  if (filters?.search) {
    params.search = filters.search.trim();
  }
  if (filters?.includeTags && filters.includeTags.length > 0) {
    params.include_tags = filters.includeTags.join(',');
  }
  if (filters?.excludeTags && filters.excludeTags.length > 0) {
    params.exclude_tags = filters.excludeTags.join(',');
  }

  try {
    const response = await apiClient.get('/api/notes', {
      params,
      timeout: 10000
    });

    // API returns { success: true, data: { notes: [...], pagination: {...} } }
    return response.data.data || response.data;
  } catch (error) {
    console.error('getNotes error:', error);
    if (isAxiosError(error)) {
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
    }
    throw error;
  }
}

/**
 * Get single note by ID
 * Can be accessed with or without authentication token
 */
export async function getNote(id: string): Promise<NoteResponse> {
  const response = await apiClient.get(`/api/notes/${id}`, {
    timeout: 5000
  });

  return response.data;
}

/**
 * Create new note with FormData (for file uploads)
 * Call this directly from components to avoid File object proxy issues with Svelte 5
 */
export async function createNoteWithFormData(formData: FormData): Promise<NoteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  // Use raw axios to avoid apiClient's default headers
  const response = await axios.post(`${API_BASE_URL}/api/notes`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
      // Don't set Content-Type - browser will set it with boundary for FormData
    },
    timeout: 30000
  });

  return response.data.data ? { data: response.data.data } : { data: response.data };
}

/**
 * Create new note with multipart/form-data support
 */
export async function createNote(noteData: CreateNoteData): Promise<NoteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  // Check if we have actual files to upload
  const hasFiles = noteData.files && noteData.files.some(f => f.file);

  if (hasFiles) {
    // Use multipart/form-data if we have actual files
    const formData = new FormData();

    // Add note data - use snake_case for API
    // Laravel expects "1" or "0" for boolean fields in FormData
    if (noteData.name) formData.append('name', noteData.name);
    if (noteData.link) formData.append('link', noteData.link);
    if (noteData.description) formData.append('description', noteData.description);
    formData.append('is_public', noteData.isPublic ? '1' : '0');
    formData.append('is_favorite', noteData.isFavorite ? '1' : '0');

    // Send tag_ids as individual entries for Laravel to auto-convert to array
    if (noteData.tags && noteData.tags.length > 0) {
      noteData.tags.forEach(tagId => {
        formData.append('tag_ids[]', tagId);
      });
    }

    // Add files
    if (noteData.files) {
      noteData.files.forEach(file => {
        if (file.file) {
          formData.append('files[]', file.file);
        } else if (file.data) {
          // Handle legacy base64 files - convert back to blob
          const byteCharacters = atob(file.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: file.mimeType });
          formData.append('files[]', blob, file.originalName);
        }
      });
    }

    const response = await apiClient.post('/api/notes', formData, {
      headers: {
        // Don't set Content-Type for FormData - axios will set it with boundary
        Authorization: `Bearer ${token}`
      },
      timeout: 30000 // Longer timeout for file uploads
    });

    // Handle API response format { success: true, data: Note }
    return response.data.data ? { data: response.data.data } : { data: response.data };
  } else {
    // Use regular JSON if no files or only base64 data
    // Use snake_case for API fields
    const submissionData: Record<string, unknown> = {};

    // Only include fields that are provided
    if (noteData.name !== undefined) submissionData.name = noteData.name;
    if (noteData.link !== undefined) submissionData.link = noteData.link;
    if (noteData.description !== undefined) submissionData.description = noteData.description;
    if (noteData.isPublic !== undefined) submissionData.is_public = noteData.isPublic;
    if (noteData.isFavorite !== undefined) submissionData.is_favorite = noteData.isFavorite;
    if (noteData.tags && noteData.tags.length > 0) submissionData.tag_ids = noteData.tags;

    // Process files - only base64 data
    if (noteData.files && noteData.files.length > 0) {
      const filesData = noteData.files
        .map(file => ({
          data: file.data, // Only if present
          originalName: file.originalName,
          mimeType: file.mimeType
        }))
        .filter(file => file.data);

      if (filesData.length > 0) {
        submissionData.files = filesData;
      }
    }

    const response = await apiClient.post('/api/notes', submissionData, {
      timeout: 10000
    });

    // Handle API response format { success: true, data: Note }
    return response.data.data ? { data: response.data.data } : { data: response.data };
  }
}

/**
 * Update existing note with multipart/form-data support
 */
export async function updateNote(id: string, noteData: UpdateNoteData): Promise<NoteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  // Check if we have actual files to upload
  const hasFiles = noteData.files && noteData.files.some(f => f.file);

  if (hasFiles) {
    // Use multipart/form-data if we have actual files
    const formData = new FormData();

    // Add note data - use snake_case for API
    // Laravel expects "1" or "0" for boolean fields in FormData
    if (noteData.name !== undefined) formData.append('name', noteData.name);
    if (noteData.link !== undefined) formData.append('link', noteData.link);
    if (noteData.description !== undefined) formData.append('description', noteData.description);
    if (noteData.isPublic !== undefined)
      formData.append('is_public', noteData.isPublic ? '1' : '0');
    if (noteData.isFavorite !== undefined)
      formData.append('is_favorite', noteData.isFavorite ? '1' : '0');

    // Send tag_ids as individual entries for Laravel to auto-convert to array
    if (noteData.tags !== undefined) {
      noteData.tags.forEach(tagId => {
        formData.append('tag_ids[]', tagId);
      });
    }

    if (noteData.deleteFileIds && noteData.deleteFileIds.length > 0) {
      formData.append('delete_file_ids', JSON.stringify(noteData.deleteFileIds));
    }

    // Add files
    if (noteData.files) {
      noteData.files.forEach(file => {
        if (file.file) {
          formData.append('files[]', file.file);
        } else if (file.data) {
          // Handle legacy base64 files - convert back to blob
          const byteCharacters = atob(file.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: file.mimeType });
          formData.append('files[]', blob, file.originalName);
        }
      });
    }

    const response = await apiClient.put(`/api/notes/${id}`, formData, {
      headers: {
        // Don't set Content-Type for FormData - axios will set it with boundary
        Authorization: `Bearer ${token}`
      },
      timeout: 30000 // Longer timeout for file uploads
    });

    // Handle API response format { success: true, data: Note }
    return response.data.data ? { data: response.data.data } : { data: response.data };
  } else {
    // Use regular JSON if no files or only base64 data
    const submissionData: Record<string, unknown> = {};

    // Only include fields that are explicitly provided - use snake_case for API
    if (noteData.name !== undefined) submissionData.name = noteData.name;
    if (noteData.link !== undefined) submissionData.link = noteData.link;
    if (noteData.description !== undefined) submissionData.description = noteData.description;
    if (noteData.isPublic !== undefined) submissionData.is_public = noteData.isPublic;
    if (noteData.isFavorite !== undefined) submissionData.is_favorite = noteData.isFavorite;
    if (noteData.tags !== undefined) submissionData.tag_ids = noteData.tags;
    if (noteData.deleteFileIds && noteData.deleteFileIds.length > 0) {
      submissionData.delete_file_ids = noteData.deleteFileIds;
    }

    // Process files - only base64 data
    if (noteData.files && noteData.files.length > 0) {
      const filesData = noteData.files
        .map(file => ({
          data: file.data, // Only if present
          originalName: file.originalName,
          mimeType: file.mimeType
        }))
        .filter(file => file.data);

      if (filesData.length > 0) {
        submissionData.files = filesData;
      }
    }

    const response = await apiClient.put(`/api/notes/${id}`, submissionData, {
      timeout: 10000
    });

    // Handle API response format { success: true, data: Note }
    return response.data.data ? { data: response.data.data } : { data: response.data };
  }
}

/**
 * Delete note (soft delete)
 */
export async function deleteNote(id: string): Promise<DeleteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await apiClient.delete(`/api/notes/${id}`, {
    timeout: 5000
  });

  return response.data;
}

/**
 * Get deleted notes (from trash/recycle bin)
 */
export async function getDeletedNotes(
  page: number = 1,
  limit: number = 10,
  filters?: NoteFilters
): Promise<NotesResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  // Build query params - use snake_case for API parameters
  const params: Record<string, string | number> = {
    page: page.toString(),
    limit: limit.toString()
  };

  // Add filters if they exist - convert to snake_case for API
  if (filters?.isPublic !== undefined) {
    params.is_public = filters.isPublic.toString();
  }
  if (filters?.isFavorite !== undefined) {
    params.is_favorite = filters.isFavorite.toString();
  }
  if (filters?.sortBy) {
    params.sort_by = filters.sortBy;
  }
  if (filters?.sortOrder) {
    params.sort_order = filters.sortOrder;
  }
  if (filters?.search) {
    params.search = filters.search.trim();
  }
  if (filters?.includeTags && filters.includeTags.length > 0) {
    params.include_tags = filters.includeTags.join(',');
  }
  if (filters?.excludeTags && filters.excludeTags.length > 0) {
    params.exclude_tags = filters.excludeTags.join(',');
  }

  const response = await apiClient.get('/api/notes/deleted', {
    params,
    timeout: 5000
  });

  // API returns { success: true, data: { notes: [...], pagination: {...} } }
  return response.data.data || response.data;
}

/**
 * Permanently delete note (hard delete)
 */
export async function permanentDeleteNote(id: string): Promise<PermanentDeleteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await apiClient.delete(`/api/notes/${id}/permanent`, {
    timeout: 10000
  });

  return response.data;
}

/**
 * Restore deleted note
 */
export async function restoreNote(id: string): Promise<NoteResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await apiClient.post(
    `/api/notes/${id}/restore`,
    {},
    {
      timeout: 5000
    }
  );

  return response.data;
}

/**
 * Get file URL for preview - supports presigned URL, regular URL, and base64 formats
 */
export function getFileUrl(file: NoteFile): string {
  // Priority 1: Use presigned URL if available (most secure)
  if (file.presigned_url) {
    return file.presigned_url;
  }

  // Priority 2: Use regular URL if available
  if (file.url) {
    return file.url;
  }

  // Priority 3: If file has base64 data, create data URI (legacy support)
  if (file.data) {
    return `data:${file.mime_type};base64,${file.data}`;
  }

  // Fallback
  return '';
}

/**
 * Check if URL is a presigned URL that might expire
 */
export function isPresignedUrl(url: string): boolean {
  return (
    url.includes('X-Amz-Credential') ||
    url.includes('X-Amz-Signature') ||
    url.includes('presigned') ||
    url.includes('signed-url')
  );
}

/**
 * Add timestamp to URL to force refresh (for presigned URLs)
 */
export function addRefreshParam(url: string): string {
  if (!url) return url;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}`;
}

/**
 * Create object URL for temporary preview
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke object URL to free memory
 */
export function revokePreviewUrl(url: string): void {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

/**
 * Compress image if needed
 */
export async function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8
): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise(resolve => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;

        if (width > height) {
          width = Math.min(width, maxWidth);
          height = width / aspectRatio;
        } else {
          height = Math.min(height, maxHeight);
          width = height * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Validate file type and size
 * Accepts all file types, only validates size (max 100MB)
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 100 * 1024 * 1024; // 100MB

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large (max 100MB)' };
  }

  // Accept all file types
  return { valid: true };
}

/**
 * Format date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Check if note is recently updated (within 24 hours)
 */
export function isRecentlyUpdated(updatedAt: string): boolean {
  const updateTime = new Date(updatedAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - updateTime.getTime()) / (1000 * 60 * 60);
  return hoursDiff < 24;
}

// Tag-related helper functions
export async function getAvailableTags(): Promise<Tag[]> {
  try {
    // Dynamic import to avoid circular dependency
    const { getTags: fetchTags } = await import('./tags');
    const response = await fetchTags(1, 100);
    return response.data; // Extract data array from paginated response
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export function formatTagIds(tagIds: (string | Tag)[]): string[] {
  // Ensure we only return valid string tag values
  return tagIds
    .map(id => {
      if (typeof id === 'string') {
        return id.trim();
      } else if (id && typeof id === 'object' && id.tag) {
        return String(id.tag).trim(); // Extract tag value from object if needed
      } else {
        return String(id).trim(); // Convert to string as fallback
      }
    })
    .filter(id => id.length > 0);
}

// Convert tags array from API response to tag UUIDs for frontend
export function convertApiTagsToTagIds(note: Note): string[] {
  // API returns tags as array of Tag objects with id, tag, name, and color properties
  if (!note.tags || !Array.isArray(note.tags)) {
    return [];
  }

  return note.tags.map(tag => tag.id).filter(id => id && id.trim().length > 0);
}

export interface RegenerateSummarizeResponse {
  data: Note;
}

/**
 * Regenerate link summarize for a note
 * Requires authentication
 */
export async function regenerateSummarize(id: string): Promise<RegenerateSummarizeResponse> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await apiClient.post(
    `/api/notes/${id}/regenerate-summarize`,
    {},
    {
      timeout: 30000 // Longer timeout for AI summarization
    }
  );

  return response.data;
}

export function validateTagIds(
  tagIds: (string | Tag)[],
  availableTags?: Tag[] | null
): { valid: string[]; invalid: string[] } {
  // Handle undefined or null availableTags
  if (!availableTags || !Array.isArray(availableTags)) {
    // If no available tags provided, assume all tag IDs are invalid
    const stringIds = (tagIds || [])
      .map(id => {
        if (typeof id === 'string') {
          return id;
        } else if (id && typeof id === 'object' && id.id) {
          return id.id; // Use UUID
        } else {
          return String(id);
        }
      })
      .filter(id => id && id.trim().length > 0);

    return { valid: [], invalid: stringIds };
  }

  // Use tag.id (UUID) for validation
  const validTagIds = new Set(availableTags.map(tag => tag.id));

  // Ensure we're working with strings only
  const stringIds = (tagIds || [])
    .map(id => {
      if (typeof id === 'string') {
        return id;
      } else if (id && typeof id === 'object' && id.id) {
        return id.id; // Use UUID
      } else {
        return String(id); // Convert to string as fallback
      }
    })
    .filter(id => id && id.trim().length > 0);

  const valid = stringIds.filter(id => validTagIds.has(id));
  const invalid = stringIds.filter(id => !validTagIds.has(id));

  return { valid, invalid };
}
