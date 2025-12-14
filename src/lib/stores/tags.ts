import { getTags } from '../tags';
import type { Tag } from '../tags';
import { toast } from 'svelte-sonner';
import { writable, derived } from 'svelte/store';

// Basic stores
export const tags = writable<Tag[]>([]);
export const isLoadingTags = writable<boolean>(false);
export const tagsError = writable<string | null>(null);

// Derived store for tag options
export const tagOptions = derived(
  tags,
  $tags => $tags.map(tag => ({
    value: tag.tag,
    label: tag.name || tag.tag,
    description: tag.tag,
    color: tag.color // Keep null as null, components will handle fallback
  }))
);

// Global Tags Store class with methods
class TagsStore {
  // Actions
  async loadTags(search?: string): Promise<void> {
    const loading = get(isLoadingTags);
    if (loading) return;

    isLoadingTags.set(true);
    tagsError.set(null);

    try {
      const response = await getTags(search);
      const fetchedTags = response.data.tags;

      // Use only real data from API
      tags.set(fetchedTags);
    } catch (error) {
      tagsError.set(error instanceof Error ? error.message : String(error));
      tags.set([]); // Empty array on error - no fake data
      toast.error('Failed to load tags');
    } finally {
      isLoadingTags.set(false);
    }
  }

  // Add a new tag to the store
  addTag(tag: Tag): void {
    tags.update(currentTags => [...currentTags, tag]);
  }

  // Update a tag in the store
  updateTag(tagId: string, updates: Partial<Tag>): void {
    tags.update(currentTags =>
      currentTags.map(tag =>
        tag.tag === tagId ? { ...tag, ...updates } : tag
      )
    );
  }

  // Remove a tag from the store
  removeTag(tagId: string): void {
    tags.update(currentTags => currentTags.filter(tag => tag.tag !== tagId));
  }

  // Clear all tags
  clearTags(): void {
    tags.set([]);
  }

  // Reset store state
  reset(): void {
    tags.set([]);
    isLoadingTags.set(false);
    tagsError.set(null);
  }
}

// Create singleton instance
export const tagsStore = new TagsStore();

// Helper function to get current store value
function get<T>(store: { subscribe: (fn: (value: T) => void) => () => void }): T {
  let value: T = undefined as T;
  const unsubscribe = store.subscribe((v: T) => {
    value = v;
  });
  unsubscribe();
  return value;
}