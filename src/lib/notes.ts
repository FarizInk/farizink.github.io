import { API_BASE_URL } from './constants';
import type { Tag } from './tags';

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

export interface CreateNoteData {
  name?: string;
  link?: string;
  description?: string;
  isPublic?: boolean;
  isFavorite?: boolean;
  tagIds?: string[];
}

export interface NoteFilters {
  isPublic?: boolean;
  isFavorite?: boolean;
  sortBy?: 'created_at' | 'updated_at';
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
 * Create new note
 */
export async function createNote(noteData: CreateNoteData): Promise<NoteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(noteData),
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error(`Failed to create note: ${response.status}`);
  }

  return await response.json();
}

/**
 * Update existing note
 */
export async function updateNote(
  id: string,
  noteData: Partial<CreateNoteData>
): Promise<NoteResponse> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_BASE_URL}/api/note/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(noteData),
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error(`Failed to update note: ${response.status}`);
  }

  return await response.json();
}

/**
 * Delete note
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
    const response = await fetchTags(1, 100); // Get up to 100 tags
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
