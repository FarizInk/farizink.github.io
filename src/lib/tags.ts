import { API_BASE_URL } from './constants';

// Tag Types
export interface Tag {
  tag: string;
  name: string;
  color?: string | null;
  createdAt: string | number;
  deletedAt?: number | null;
}

export interface TagCreateRequest {
  tag: string;
  name: string;
  color?: string | null;
}

export interface TagUpdateRequest {
  name: string;
  color?: string | null;
}

export interface TagsResponse {
  success: boolean;
  data: {
    tags: Tag[];
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface TagResponse {
  success: boolean;
  data: Tag;
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

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

// Helper function to get auth token
function getAuthToken(): string {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('authToken') || '';
  }
  return '';
}

// API Functions
export async function getTags(search?: string): Promise<TagsResponse> {
  const token = getAuthToken();

  const url = new URL(`${API_BASE_URL}/api/tags`);
  if (search && search.trim()) {
    url.searchParams.set('search', search.trim());
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getTagById(id: string): Promise<TagResponse> {
  const response = await fetch(`${API_BASE_URL}/api/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function createTag(tagData: TagCreateRequest): Promise<TagResponse> {
  const response = await fetch(`${API_BASE_URL}/api/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(tagData)
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function updateTag(tagId: string, tagData: TagUpdateRequest): Promise<TagResponse> {
  // Note: The endpoint uses the tag value (not UUID) as the identifier
  const response = await fetch(`${API_BASE_URL}/api/tags/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(tagData)
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteTag(tagId: string): Promise<DeleteResponse> {
  // Note: The endpoint uses the tag value (not UUID) as the identifier
  const response = await fetch(`${API_BASE_URL}/api/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getTagNotes(tagId: string, page: number = 1, limit: number = 20): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/tags/${tagId}/notes?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}