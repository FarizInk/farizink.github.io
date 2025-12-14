import { API_BASE_URL } from './constants';
import type { Tag } from './tags';

export interface NoteFile {
  id: string;
  noteId: string;
  data: string; // base64 encoded data (legacy support)
  url?: string; // file URL for multipart uploads
  presignedUrl?: string; // presigned URL for secure file access
  originalName: string;
  mimeType: string;
  size: number;
  metadata: {
    title?: string;
    description?: string;
    alt?: string;
    width?: number;
    height?: number;
    pages?: number;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Note {
  id: string;
  name: string | null;
  link: string | null;
  description: string | null;
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tags: Tag[];
  files?: NoteFile[];
}

export interface NotesResponse {
  success: boolean;
  data: {
    notes: Note[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface NoteResponse {
  success: boolean;
  data: Note;
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface DeleteResponse {
  success: boolean;
  data: {
    id: string;
    deleted: boolean;
    message: string;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface PermanentDeleteResponse {
  success: boolean;
  data: {
    id: string;
    permanentlyDeleted: boolean;
    message: string;
    deletedFilesCount: number;
    s3Errors: string[];
  };
  meta: {
    timestamp: string;
    path: string;
  };
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
  const token = localStorage.getItem('authToken');

  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  // Add filters if they exist
  if (filters?.isPublic !== undefined) {
    params.append('isPublic', filters.isPublic.toString());
  }
  if (filters?.isFavorite !== undefined) {
    params.append('isFavorite', filters.isFavorite.toString());
  }
  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters?.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }
  if (filters?.search) {
    params.append('search', filters.search.trim());
  }
  if (filters?.includeTags && filters.includeTags.length > 0) {
    params.append('includeTags', filters.includeTags.join(','));
  }
  if (filters?.excludeTags && filters.excludeTags.length > 0) {
    params.append('excludeTags', filters.excludeTags.join(','));
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // Add Authorization header only if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/note?${params.toString()}`, {
    method: 'GET',
    headers,
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }

  return await response.json();
}

/**
 * Get single note by ID
 * Can be accessed with or without authentication token
 */
export async function getNote(id: string): Promise<NoteResponse> {
  const token = localStorage.getItem('authToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // Add Authorization header only if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/note/${id}`, {
    method: 'GET',
    headers,
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.status}`);
  }

  return await response.json();
}

/**
 * Create new note with multipart/form-data support
 */
export async function createNote(noteData: CreateNoteData): Promise<NoteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  // Check if we have actual files to upload
  const hasFiles = noteData.files && noteData.files.some(f => f.file);

  if (hasFiles) {
    // Use multipart/form-data if we have actual files
    const formData = new FormData();

    // Add note data
    if (noteData.name) formData.append('name', noteData.name);
    if (noteData.link) formData.append('link', noteData.link);
    if (noteData.description) formData.append('description', noteData.description);
    if (noteData.isPublic !== undefined) formData.append('isPublic', noteData.isPublic.toString());
    if (noteData.isFavorite !== undefined) formData.append('isFavorite', noteData.isFavorite.toString());
    if (noteData.tags && noteData.tags.length > 0) {
      formData.append('tags', JSON.stringify(noteData.tags));
    }

    // Add files
    if (noteData.files) {
      noteData.files.forEach((file) => {
        if (file.file) {
          formData.append(`files`, file.file);
        } else if (file.data) {
          // Handle legacy base64 files - convert back to blob
          const byteCharacters = atob(file.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: file.mimeType });
          formData.append(`files`, blob, file.originalName);
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/api/note`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
        // Don't set Content-Type header for FormData - browser will set it with boundary
      },
      body: formData,
      signal: AbortSignal.timeout(30000) // Longer timeout for file uploads
    });

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.status}`);
    }

    return await response.json();
  } else {
    // Use regular JSON if no files or only base64 data
    const submissionData: any = {
      name: noteData.name,
      link: noteData.link,
      description: noteData.description,
      isPublic: noteData.isPublic,
      isFavorite: noteData.isFavorite,
      tags: noteData.tags || []
    };

    // Process files - only base64 data
    if (noteData.files && noteData.files.length > 0) {
      submissionData.files = noteData.files.map(file => ({
        data: file.data, // Only if present
        originalName: file.originalName,
        mimeType: file.mimeType
      })).filter(file => file.data);
    }

    const response = await fetch(`${API_BASE_URL}/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(submissionData),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.status}`);
    }

    return await response.json();
  }
}

/**
 * Update existing note with multipart/form-data support
 */
export async function updateNote(
  id: string,
  noteData: UpdateNoteData
): Promise<NoteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  // Check if we have actual files to upload
  const hasFiles = noteData.files && noteData.files.some(f => f.file);

  if (hasFiles) {
    // Use multipart/form-data if we have actual files
    const formData = new FormData();

    // Add note data
    if (noteData.name !== undefined) formData.append('name', noteData.name);
    if (noteData.link !== undefined) formData.append('link', noteData.link);
    if (noteData.description !== undefined) formData.append('description', noteData.description);
    if (noteData.isPublic !== undefined) formData.append('isPublic', noteData.isPublic.toString());
    if (noteData.isFavorite !== undefined) formData.append('isFavorite', noteData.isFavorite.toString());
    if (noteData.tags !== undefined) formData.append('tags', JSON.stringify(noteData.tags));
    if (noteData.deleteFileIds && noteData.deleteFileIds.length > 0) {
      formData.append('deleteFileIds', JSON.stringify(noteData.deleteFileIds));
    }

    // Add files
    if (noteData.files) {
      noteData.files.forEach((file) => {
        if (file.file) {
          formData.append(`files`, file.file);
        } else if (file.data) {
          // Handle legacy base64 files - convert back to blob
          const byteCharacters = atob(file.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: file.mimeType });
          formData.append(`files`, blob, file.originalName);
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
        // Don't set Content-Type header for FormData - browser will set it with boundary
      },
      body: formData,
      signal: AbortSignal.timeout(30000) // Longer timeout for file uploads
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.status}`);
    }

    return await response.json();
  } else {
    // Use regular JSON if no files or only base64 data
    const submissionData: any = {};

    // Only include fields that are explicitly provided
    if (noteData.name !== undefined) submissionData.name = noteData.name;
    if (noteData.link !== undefined) submissionData.link = noteData.link;
    if (noteData.description !== undefined) submissionData.description = noteData.description;
    if (noteData.isPublic !== undefined) submissionData.isPublic = noteData.isPublic;
    if (noteData.isFavorite !== undefined) submissionData.isFavorite = noteData.isFavorite;
    if (noteData.tags !== undefined) submissionData.tags = noteData.tags;
    if (noteData.deleteFileIds && noteData.deleteFileIds.length > 0) {
      submissionData.deleteFileIds = noteData.deleteFileIds;
    }

    // Process files - only base64 data
    if (noteData.files && noteData.files.length > 0) {
      submissionData.files = noteData.files.map(file => ({
        data: file.data, // Only if present
        originalName: file.originalName,
        mimeType: file.mimeType
      })).filter(file => file.data);
    }

    const response = await fetch(`${API_BASE_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(submissionData),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.status}`);
    }

    return await response.json();
  }
}

/**
 * Delete note (soft delete)
 */
export async function deleteNote(id: string): Promise<DeleteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/note/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note: ${response.status}`);
  }

  return await response.json();
}

/**
 * Get deleted notes (from trash/recycle bin)
 */
export async function getDeletedNotes(
  page: number = 1,
  limit: number = 10,
  filters?: NoteFilters
): Promise<NotesResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  // Add filters if they exist
  if (filters?.isPublic !== undefined) {
    params.append('isPublic', filters.isPublic.toString());
  }
  if (filters?.isFavorite !== undefined) {
    params.append('isFavorite', filters.isFavorite.toString());
  }
  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters?.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }
  if (filters?.search) {
    params.append('search', filters.search.trim());
  }
  if (filters?.includeTags && filters.includeTags.length > 0) {
    params.append('includeTags', filters.includeTags.join(','));
  }
  if (filters?.excludeTags && filters.excludeTags.length > 0) {
    params.append('excludeTags', filters.excludeTags.join(','));
  }

  const response = await fetch(`${API_BASE_URL}/api/note/deleted?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch deleted notes: ${response.status}`);
  }

  return await response.json();
}

/**
 * Permanently delete note (hard delete)
 */
export async function permanentDeleteNote(id: string): Promise<PermanentDeleteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/note/${id}/permanent`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(10000) // Longer timeout for S3 operations
  });

  if (!response.ok) {
    throw new Error(`Failed to permanently delete note: ${response.status}`);
  }

  return await response.json();
}


/**
 * Get file URL for preview - supports presigned URL, regular URL, and base64 formats
 */
export function getFileUrl(file: NoteFile): string {
  // Priority 1: Use presigned URL if available (most secure)
  if (file.presignedUrl) {
    return file.presignedUrl;
  }

  // Priority 2: Use regular URL if available
  if (file.url) {
    return file.url;
  }

  // Priority 3: If file has base64 data, create data URI (legacy support)
  if (file.data) {
    return `data:${file.mimeType};base64,${file.data}`;
  }

  // Fallback
  return '';
}

/**
 * Check if URL is a presigned URL that might expire
 */
export function isPresignedUrl(url: string): boolean {
  return url.includes('X-Amz-Credential') ||
         url.includes('X-Amz-Signature') ||
         url.includes('presigned') ||
         url.includes('signed-url');
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
export async function compressImage(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve) => {
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

      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          resolve(file);
        }
      }, file.type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Validate file type and size
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large (max 10MB)' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported' };
  }

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
    const response = await fetchTags(); // Get all tags
    return response.data.tags;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export function formatTagIds(tagIds: (string | Tag)[]): string[] {
  // Ensure we only return valid string tag values
  return tagIds.map(id => {
    if (typeof id === 'string') {
      return id.trim();
    } else if (id && typeof id === 'object' && id.tag) {
      return String(id.tag).trim(); // Extract tag value from object if needed
    } else {
      return String(id).trim(); // Convert to string as fallback
    }
  }).filter(id => id.length > 0);
}

// Convert tags array from API response to tagIds for frontend
export function convertApiTagsToTagIds(note: Note): string[] {
  // API returns tags as array of Tag objects with tag, name, and color properties
  if (!note.tags || !Array.isArray(note.tags)) {
    return [];
  }

  return note.tags.map(tag => tag.tag).filter(tag => tag && tag.trim().length > 0);
}

export function validateTagIds(tagIds: (string | Tag)[], availableTags: Tag[]): { valid: string[], invalid: string[] } {
  const validTagIds = new Set(availableTags.map(tag => tag.tag));

  // Ensure we're working with strings only
  const stringIds = tagIds.map(id => {
    if (typeof id === 'string') {
      return id;
    } else if (id && typeof id === 'object' && id.tag) {
      return id.tag; // Extract tag value from object if needed
    } else {
      return String(id); // Convert to string as fallback
    }
  }).filter(id => id && id.trim().length > 0);

  const valid = stringIds.filter(id => validTagIds.has(id));
  const invalid = stringIds.filter(id => !validTagIds.has(id));

  return { valid, invalid };
}
