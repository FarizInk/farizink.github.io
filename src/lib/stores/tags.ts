import { getTags } from '../tags';
import type { Tag } from '../tags';
import { toast } from 'svelte-sonner';
import { writable, derived } from 'svelte/store';

// Basic stores
export const tags = writable<Tag[]>([]);
export const isLoadingTags = writable<boolean>(false);
export const tagsError = writable<string | null>(null);

// Derived store for tag options
export const tagOptions = derived(tags, $tags =>
  $tags.map(tag => ({
    value: tag.id, // Use UUID as value
    label: tag.name || tag.tag,
    description: tag.tag, // Show slug as description
    color: tag.color // Keep null as null, components will handle fallback
  }))
);

// Global Tags Store class with methods
class TagsStore {
  // Actions
  async loadTags(force: boolean = false): Promise<void> {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) {
      tags.set([]);
      return;
    }

    // Get current tags to check if we need to fetch
    const currentTags = get(tags);

    // If not forced and we already have tags, skip the API call
    if (!force && currentTags && currentTags.length > 0) {
      return;
    }

    const loading = get(isLoadingTags);
    if (loading) return;

    isLoadingTags.set(true);
    tagsError.set(null);

    try {
      // getTags now returns TagsResponse with pagination
      const response = await getTags(1, 100);
      // Extract data array from response
      tags.set(response.data);
    } catch (error) {
      tagsError.set(error instanceof Error ? error.message : String(error));
      tags.set([]);
      toast.error('Failed to load tags');
    } finally {
      isLoadingTags.set(false);
    }
  }

  // Add a new tag to the store
  addTag(tag: Tag): void {
    // Get current value
    let currentTags: Tag[] = [];
    const unsub = tags.subscribe(v => {
      currentTags = v;
    });
    unsub();

    // Create new array with tag added
    const newTags = [...currentTags, tag];

    // Use set() for explicit reactivity
    tags.set(newTags);
  }

  // Update a tag in the store
  updateTag(tagId: string, newTag: Tag): void {
    // Get current value
    let currentTags: Tag[] = [];
    const unsub = tags.subscribe(v => {
      currentTags = v;
    });
    unsub();

    // Create new array with updated tag
    const newTags = currentTags.map(tag => (tag.tag === tagId ? newTag : tag));

    // Use set() for explicit reactivity
    tags.set(newTags);
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
