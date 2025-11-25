import { API_BASE_URL } from './constants';

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
  tags: string[];
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
  tags?: string[];
}

export interface NoteFilters {
  isPublic?: boolean;
  isFavorite?: boolean;
  sortBy?: 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
  search?: string;
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
