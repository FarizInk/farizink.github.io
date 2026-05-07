<script lang="ts">
  import type { NoteFilters } from '../lib/notes';
  import { tagOptions, isLoadingTags, tags } from '../lib/stores/tags';
  import Modal from './Modal.svelte';
  import TagsSelector from './TagsSelector.svelte';
  import {
    Search,
    ArrowUp,
    ArrowDown,
    Calendar,
    Globe,
    Lock,
    Star,
    Tag as TagIcon,
    RotateCw,
    Filter,
    X,
    SlidersHorizontal
  } from '@lucide/svelte';

  interface SortOption {
    value: 'created_at' | 'updated_at' | 'deleted_at';
    label: string;
    icon: typeof Calendar;
  }

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onApply: (
      filters: NoteFilters,
      searchQuery: string,
      includeTags: string[],
      excludeTags: string[]
    ) => void;
    onClear: () => void;
    title: string;
    searchPlaceholder: string;
    sortOptions?: SortOption[];
    showPublicFilter?: boolean;
    defaultSortBy?: NoteFilters['sortBy'];
    defaultSortOrder?: NoteFilters['sortOrder'];
    // Initial values
    initialFilters: NoteFilters;
    searchQuery: string;
    initialIncludeTags: string[];
    initialExcludeTags: string[];
  }

  let {
    isOpen,
    onClose,
    onApply,
    onClear,
    title,
    searchPlaceholder,
    sortOptions = [
      { value: 'created_at', label: 'Date Created', icon: Calendar },
      { value: 'updated_at', label: 'Last Updated', icon: Calendar }
    ],
    showPublicFilter = true,
    defaultSortBy = 'created_at',
    defaultSortOrder = 'desc',
    initialFilters,
    searchQuery = $bindable(),
    initialIncludeTags,
    initialExcludeTags
  }: Props = $props();

  let expertFilterMode = $state(false);
  let tempFilters = $state<NoteFilters>({ ...initialFilters });
  let tempSelectedIncludeTags = $state<string[]>([...initialIncludeTags]);
  let tempSelectedExcludeTags = $state<string[]>([...initialExcludeTags]);
  let simpleSearchInput: HTMLInputElement | undefined = undefined;
  let expertSearchInput: HTMLInputElement | undefined = undefined;

  const SortIcon = $derived(getSortIcon(tempFilters.sortBy || defaultSortBy));

  // Reset temp values when modal opens
  $effect(() => {
    if (isOpen) {
      tempFilters = { ...initialFilters };
      // searchQuery is bound to parent, no need to reset
      tempSelectedIncludeTags = [...initialIncludeTags];
      tempSelectedExcludeTags = [...initialExcludeTags];
      // Focus search input based on mode
      if (expertFilterMode && expertSearchInput) {
        setTimeout(() => expertSearchInput.focus(), 50);
      } else if (!expertFilterMode && simpleSearchInput) {
        setTimeout(() => simpleSearchInput.focus(), 50);
      }
    }
  });

  function handleApply() {
    onApply(tempFilters, searchQuery, tempSelectedIncludeTags, tempSelectedExcludeTags);
    onClose();
  }

  function handleClear() {
    tempFilters = {
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder
    };
    searchQuery = ''; // Clears parent's searchQuery via binding
    tempSelectedIncludeTags = [];
    tempSelectedExcludeTags = [];
    onClear();
  }

  function getSortIcon(sortBy: string) {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option?.icon || Calendar;
  }
</script>

<Modal {isOpen} {onClose} maxW={expertFilterMode ? 'max-w-3xl' : 'max-w-lg'}>
  
    <div class="mb-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
            {#if expertFilterMode}
              <SlidersHorizontal class="w-6 h-6 text-white" />
            {:else}
              <Filter class="w-6 h-6 text-white" />
            {/if}
          </div>
          <div>
            <h2 id="modal-title" class="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {expertFilterMode ? 'Advanced filtering options' : 'Quick filters for notes'}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- Mode Toggle Button -->
          <button
            type="button"
            onclick={() => (expertFilterMode = !expertFilterMode)}
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={expertFilterMode ? 'Switch to Simple Mode' : 'Switch to Expert Mode'}
          >
            {#if expertFilterMode}
              <Filter class="w-4 h-4 text-gray-500" />
            {:else}
              <SlidersHorizontal class="w-4 h-4 text-gray-500" />
            {/if}
          </button>
          <!-- Close Button -->
          <button
            type="button"
            onclick={onClose}
            class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <X class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  

  
    
    {#if expertFilterMode}
      <!-- Expert Mode -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search - Full Width -->
        <div class="md:col-span-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Search</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                class="w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              class="input w-full !pl-10"
              bind:value={searchQuery}
              onkeydown={e => e.key === 'Enter' && handleApply()}
              autocomplete="off"
              bind:this={expertSearchInput}
            />
          </div>
        </div>

        <!-- Sort Options - Full Width -->
        <div class="md:col-span-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Sort By</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each sortOptions as sortOption (sortOption.value)}
              {@const Icon = sortOption.icon}
              <div class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div
                  class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"
                >
                  <Icon class="w-4 h-4" />
                  {sortOption.label}
                </div>
                <div class="flex gap-2">
                  <button
                    onclick={() =>
                      (tempFilters = {
                        ...tempFilters,
                        sortBy: sortOption.value,
                        sortOrder: 'desc'
                      })}
                    class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                      sortOption.value && tempFilters.sortOrder === 'desc'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  >
                    <ArrowDown class="w-3 h-3" />
                    Newest
                  </button>
                  <button
                    onclick={() =>
                      (tempFilters = {
                        ...tempFilters,
                        sortBy: sortOption.value,
                        sortOrder: 'asc'
                      })}
                    class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                      sortOption.value && tempFilters.sortOrder === 'asc'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                  >
                    <ArrowUp class="w-3 h-3" />
                    Oldest
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Public Status Filter -->
        {#if showPublicFilter}
          <div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Public Status</span>
            <div class="flex flex-col gap-2">
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: true })}
                class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic ===
                true
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                Public Only
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: false })}
                class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic ===
                false
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                Private Only
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: undefined })}
                class="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left {tempFilters.isPublic ===
                undefined
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : ''}"
              >
                All
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorite Status Filter -->
        <div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Favorite Status</span>
          <div class="flex flex-col gap-2">
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: true })}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite ===
              true
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              Favorites Only
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: false })}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite ===
              false
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              Non-Favorites
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: undefined })}
              class="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left {tempFilters.isFavorite ===
              undefined
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : ''}"
            >
              All
            </button>
          </div>
        </div>

        <!-- Tag Filters -->
        {#if $tags.length > 0}
          <div>
            <label for="include-tags" class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Include Tags</label>
            <TagsSelector
              id="include-tags"
              options={$tagOptions}
              bind:selectedValues={tempSelectedIncludeTags}
              placeholder="Select tags to include (OR logic)..."
              maxHeight="max-h-32"
            />
          </div>

          <div>
            <label for="exclude-tags" class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Exclude Tags</label>
            <TagsSelector
              id="exclude-tags"
              options={$tagOptions}
              bind:selectedValues={tempSelectedExcludeTags}
              placeholder="Select tags to exclude..."
              maxHeight="max-h-32"
            />
          </div>
        {:else if $isLoadingTags}
          <div class="md:col-span-2">
            <div
              class="flex items-center justify-center py-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <RotateCw class="w-4 h-4 text-gray-400 animate-spin mr-2" />
              <span class="text-sm text-gray-500">Loading tags...</span>
            </div>
          </div>
        {:else}
          <div class="md:col-span-2">
            <div
              class="text-center py-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <TagIcon class="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p class="text-sm text-gray-500">No tags available</p>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Simple Mode -->
      <div class="space-y-4">
        <!-- Search -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5" for="simple-search-input">
            <Search class="w-4 h-4" />
            Search
          </label>
          <input
            id="simple-search-input"
            type="text"
            placeholder={searchPlaceholder}
            class="input w-full"
            bind:value={searchQuery}
            onkeydown={e => e.key === 'Enter' && handleApply()}
            autocomplete="off"
            bind:this={simpleSearchInput}
          />
        </div>

        <!-- Sort -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <SortIcon class="w-4 h-4" />
            Sort By
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              onclick={() =>
                (tempFilters = {
                  ...tempFilters,
                  sortBy: tempFilters.sortBy || defaultSortBy,
                  sortOrder: 'desc'
                })}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1.5 {tempFilters.sortOrder ===
              'desc'
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              <ArrowDown class="w-3.5 h-3.5" />
              Newest
            </button>
            <button
              onclick={() =>
                (tempFilters = {
                  ...tempFilters,
                  sortBy: tempFilters.sortBy || defaultSortBy,
                  sortOrder: 'asc'
                })}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1.5 {tempFilters.sortOrder ===
              'asc'
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              <ArrowUp class="w-3.5 h-3.5" />
              Oldest
            </button>
          </div>
        </div>

        <!-- Visibility -->
        {#if showPublicFilter}
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <Globe class="w-4 h-4" />
              Visibility
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: undefined })}
                class="px-3 py-2 text-sm rounded-lg border transition-colors {tempFilters.isPublic ===
                undefined
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                All
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: true })}
                class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isPublic ===
                true
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                <Globe class="w-3.5 h-3.5" />
                Public
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: false })}
                class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isPublic ===
                false
                  ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
              >
                <Lock class="w-3.5 h-3.5" />
                Private
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorites -->
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <Star class="w-4 h-4" />
            Favorites
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: undefined })}
              class="px-3 py-2 text-sm rounded-lg border transition-colors {tempFilters.isFavorite ===
              undefined
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              All
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: true })}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isFavorite ===
              true
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Yes
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: false })}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isFavorite ===
              false
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}"
            >
              <Star class="w-3.5 h-3.5 text-gray-400" />
              No
            </button>
          </div>
        </div>

        <!-- Tags -->
        {#if $tags.length > 0}
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
              <TagIcon class="w-4 h-4" />
              Tags
            </label>
            <TagsSelector
              options={$tagOptions}
              bind:selectedValues={tempSelectedIncludeTags}
              placeholder="Select tags to filter..."
              maxHeight="max-h-32"
            />
          </div>
        {:else if $isLoadingTags}
          <div
            class="flex items-center justify-center py-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <RotateCw class="w-4 h-4 text-gray-400 animate-spin mr-2" />
            <span class="text-sm text-gray-500">Loading tags...</span>
          </div>
        {:else}
          <div
            class="text-center py-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <TagIcon class="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p class="text-sm text-gray-500">No tags available</p>
          </div>
        {/if}
      </div>
    {/if}
  

  
    <div class="pt-5 border-t border-gray-200 dark:border-gray-700 mt-2">
      <div class="flex items-center justify-between gap-6">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <span>
            {expertFilterMode
              ? 'Use advanced filters to find specific notes'
              : 'Quick filters to find notes'}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            onclick={handleClear}
            class="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onclick={handleApply}
            class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            <Filter class="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>
    </div>
  
</Modal>
