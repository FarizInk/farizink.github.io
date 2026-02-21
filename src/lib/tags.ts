import { apiClient } from './axios';

// Tag Types
export interface Tag {
  id: string;  // UUID (primary key)
  tag: string;  // Unique slug/identifier
  name: string;
  color?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TagCreateRequest {
  tag: string; // required, unique, max 50 chars
  name?: string; // optional, max 255 chars
  color?: string; // optional, hex color, max 7 chars
}

export interface TagUpdateRequest {
  name?: string;
  color?: string;
}

export interface TagsResponse {
  data: Tag[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface TagResponse {
  data: Tag;
}

/**
 * Get all tags with pagination
 * GET /api/tags?page=1&per_page=10
 */
export async function getTags(page: number = 1, perPage: number = 100): Promise<TagsResponse> {
  const response = await apiClient.get('/api/tags', {
    params: {
      page: page.toString(),
      per_page: perPage.toString()
    }
  });

  return response.data;
}

/**
 * Get single tag by ID
 * GET /api/tags/{tag}
 */
export async function getTagById(tagId: string): Promise<Tag> {
  const response = await apiClient.get(`/api/tags/${tagId}`);

  const result: TagResponse = response.data;
  return result.data;
}

/**
 * Create or update tag (upsert)
 * POST /api/tags
 * Uses updateOrCreate - if tag exists, will update
 */
export async function createTag(tagData: TagCreateRequest): Promise<Tag> {
  const response = await apiClient.post('/api/tags', tagData);

  const result = response.data;
  // Handle both { data: Tag } and direct Tag response
  return result.data || result;
}

/**
 * Update tag (name and color only, tag field cannot be changed)
 * PUT/PATCH /api/tags/{tag}
 */
export async function updateTag(tagId: string, tagData: TagUpdateRequest): Promise<Tag> {
  const response = await apiClient.put(`/api/tags/${tagId}`, tagData);

  const result = response.data;
  // Handle both { data: Tag } and direct Tag response
  return result.data || result;
}

/**
 * Delete tag (soft delete)
 * DELETE /api/tags/{tag}
 * Returns 204 No Content
 */
export async function deleteTag(tagId: string): Promise<void> {
  await apiClient.delete(`/api/tags/${tagId}`);
}
