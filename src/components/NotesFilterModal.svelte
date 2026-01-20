<script lang="ts">
  import type { NoteFilters } from '../lib/notes';
  import { tagOptions, isLoadingTags, tags } from '../lib/stores/tags';
  import Modal from './Modal.svelte';
  import MultipleSelect from './MultipleSelect.svelte';
  import {
    Search,
    Settings,
    ArrowUp,
    ArrowDown,
    Calendar,
    Globe,
    Lock,
    Star,
    Tag as TagIcon,
    RotateCw,
    Clock
  } from '@lucide/svelte';

  interface SortOption {
    value: 'created_at' | 'updated_at' | 'deleted_at';
    label: string;
    icon: typeof Calendar;
  }

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: NoteFilters, searchQuery: string, includeTags: string[], excludeTags: string[]) => void;
    onClear: () => void;
    title: string;
    searchPlaceholder: string;
    sortOptions?: SortOption[];
    showPublicFilter?: boolean;
    defaultSortBy?: NoteFilters['sortBy'];
    defaultSortOrder?: NoteFilters['sortOrder'];
    // Initial values
    initialFilters: NoteFilters;
    initialSearchQuery: string;
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
    initialSearchQuery,
    initialIncludeTags,
    initialExcludeTags
  }: Props = $props();

  let expertFilterMode = $state(false);
  let tempFilters = $state<NoteFilters>({ ...initialFilters });
  let tempSearchQuery = $state(initialSearchQuery);
  let tempSelectedIncludeTags = $state<string[]>([...initialIncludeTags]);
  let tempSelectedExcludeTags = $state<string[]>([...initialExcludeTags]);
  let simpleSearchInput: HTMLInputElement | undefined = undefined;
  let expertSearchInput: HTMLInputElement | undefined = undefined;

  const SortIcon = $derived(getSortIcon(tempFilters.sortBy || defaultSortBy));

  // Reset temp values when modal opens
  $effect(() => {
    if (isOpen) {
      tempFilters = { ...initialFilters };
      tempSearchQuery = initialSearchQuery;
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
    onApply(tempFilters, tempSearchQuery, tempSelectedIncludeTags, tempSelectedExcludeTags);
    onClose();
  }

  function handleClear() {
    tempFilters = {
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder
    };
    tempSearchQuery = '';
    tempSelectedIncludeTags = [];
    tempSelectedExcludeTags = [];
    onClear();
  }

  function getSortIcon(sortBy: string) {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option?.icon || Calendar;
  }
</script>

<Modal
  {isOpen}
  {onClose}
  maxW={expertFilterMode ? 'max-w-3xl' : 'max-w-lg'}
  {title}
>
  {#snippet body()}
    <!-- Mode Toggle -->
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-secondary-200 dark:border-secondary-700">
      <span class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        {expertFilterMode ? 'Expert Mode' : 'Simple Mode'}
      </span>
      <button
        onclick={() => expertFilterMode = !expertFilterMode}
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors {expertFilterMode
          ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
          : 'border-secondary-300 dark:border-secondary-600 text-secondary-600 dark:text-secondary-400 hover:border-secondary-400 dark:hover:border-secondary-500'}"
      >
        <Settings class="w-3.5 h-3.5" />
        <span class="hidden sm:inline">{expertFilterMode ? 'Expert' : 'Simple'}</span>
      </button>
    </div>

    {#if expertFilterMode}
      <!-- Expert Mode -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search - Full Width -->
        <div class="md:col-span-2">
          <label class="label">Search</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search class="w-4 h-4 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              class="input w-full !pl-10"
              bind:value={tempSearchQuery}
              onkeydown={(e) => e.key === 'Enter' && handleApply()}
              autocomplete="off"
              bind:this={expertSearchInput}
            />
          </div>
        </div>

        <!-- Sort Options - Full Width -->
        <div class="md:col-span-2">
          <span class="label block mb-2">Sort By</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each sortOptions as sortOption}
              {@const Icon = sortOption.icon}
              <div class="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <div class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2 flex items-center gap-1">
                  <Icon class="w-4 h-4" />
                  {sortOption.label}
                </div>
                <div class="flex gap-2">
                  <button
                    onclick={() => tempFilters = { ...tempFilters, sortBy: sortOption.value, sortOrder: 'desc' }}
                    class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                      sortOption.value && tempFilters.sortOrder === 'desc'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
                  >
                    <ArrowDown class="w-3 h-3" />
                    Newest
                  </button>
                  <button
                    onclick={() => tempFilters = { ...tempFilters, sortBy: sortOption.value, sortOrder: 'asc' }}
                    class="flex-1 px-3 py-2 text-sm rounded-md border transition-colors flex items-center justify-center gap-1 {tempFilters.sortBy ===
                      sortOption.value && tempFilters.sortOrder === 'asc'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
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
            <span class="label block mb-2">Public Status</span>
            <div class="flex flex-col gap-2">
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: true }}
                class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic === true
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
              >
                Public Only
              </button>
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: false }}
                class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isPublic === false
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
              >
                Private Only
              </button>
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: undefined }}
                class="px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors text-left {tempFilters.isPublic ===
                  undefined
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : ''}"
              >
                All
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorite Status Filter -->
        <div>
          <span class="label block mb-2">Favorite Status</span>
          <div class="flex flex-col gap-2">
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: true }}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite === true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Favorites Only
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: false }}
              class="px-3 py-2 text-sm rounded-md border transition-colors text-left {tempFilters.isFavorite === false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              Non-Favorites
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: undefined }}
              class="px-3 py-2 text-sm rounded-md border border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500 transition-colors text-left {tempFilters.isFavorite ===
              undefined
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : ''}"
            >
              All
            </button>
          </div>
        </div>

        <!-- Tag Filters -->
        {#if $tags.length > 0}
          <div>
            <label for="include-tags" class="label">Include Tags</label>
            <MultipleSelect
              id="include-tags"
              options={$tagOptions}
              bind:selectedValues={tempSelectedIncludeTags}
              placeholder="Select tags to include (OR logic)..."
              maxHeight="max-h-32"
            />
          </div>

          <div>
            <label for="exclude-tags" class="label">Exclude Tags</label>
            <MultipleSelect
              id="exclude-tags"
              options={$tagOptions}
              bind:selectedValues={tempSelectedExcludeTags}
              placeholder="Select tags to exclude..."
              maxHeight="max-h-32"
            />
          </div>
        {:else if $isLoadingTags}
          <div class="md:col-span-2">
            <div class="flex items-center justify-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
              <RotateCw class="w-4 h-4 text-secondary-400 animate-spin mr-2" />
              <span class="text-sm text-secondary-500">Loading tags...</span>
            </div>
          </div>
        {:else}
          <div class="md:col-span-2">
            <div class="text-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
              <TagIcon class="w-8 h-8 text-secondary-300 mx-auto mb-2" />
              <p class="text-sm text-secondary-500">No tags available</p>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Simple Mode -->
      <div class="space-y-4">
        <!-- Search -->
        <div>
          <label class="label !flex items-center gap-1.5" for="simple-search-input">
            <Search class="w-4 h-4" />
            Search
          </label>
          <input
            id="simple-search-input"
            type="text"
            placeholder={searchPlaceholder}
            class="input w-full"
            bind:value={tempSearchQuery}
            onkeydown={(e) => e.key === 'Enter' && handleApply()}
            autocomplete="off"
            bind:this={simpleSearchInput}
          />
        </div>

        <!-- Sort -->
        <div>
          <label class="label !flex items-center gap-1.5 mb-2">
            <SortIcon class="w-4 h-4" />
            Sort By
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              onclick={() => tempFilters = { ...tempFilters, sortBy: tempFilters.sortBy || defaultSortBy, sortOrder: 'desc' }}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1.5 {tempFilters.sortOrder === 'desc'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              <ArrowDown class="w-3.5 h-3.5" />
              Newest
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, sortBy: tempFilters.sortBy || defaultSortBy, sortOrder: 'asc' }}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1.5 {tempFilters.sortOrder === 'asc'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              <ArrowUp class="w-3.5 h-3.5" />
              Oldest
            </button>
          </div>
        </div>

        <!-- Visibility -->
        {#if showPublicFilter}
          <div>
            <label class="label !flex items-center gap-1.5 mb-2">
              <Globe class="w-4 h-4" />
              Visibility
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: undefined }}
                class="px-3 py-2 text-sm rounded-lg border transition-colors {tempFilters.isPublic === undefined
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
              >
                All
              </button>
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: true }}
                class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isPublic === true
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
              >
                <Globe class="w-3.5 h-3.5" />
                Public
              </button>
              <button
                onclick={() => tempFilters = { ...tempFilters, isPublic: false }}
                class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isPublic === false
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
              >
                <Lock class="w-3.5 h-3.5" />
                Private
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorites -->
        <div>
          <label class="label !flex items-center gap-1.5 mb-2">
            <Star class="w-4 h-4" />
            Favorites
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: undefined }}
              class="px-3 py-2 text-sm rounded-lg border transition-colors {tempFilters.isFavorite === undefined
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              All
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: true }}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isFavorite === true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Yes
            </button>
            <button
              onclick={() => tempFilters = { ...tempFilters, isFavorite: false }}
              class="px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 {tempFilters.isFavorite === false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-secondary-300 dark:border-secondary-600 hover:border-secondary-400 dark:hover:border-secondary-500'}"
            >
              <Star class="w-3.5 h-3.5 text-secondary-400" />
              No
            </button>
          </div>
        </div>

        <!-- Tags -->
        {#if $tags.length > 0}
          <div>
            <label class="label !flex items-center gap-1.5">
              <TagIcon class="w-4 h-4" />
              Tags
            </label>
            <MultipleSelect
              options={$tagOptions}
              bind:selectedValues={tempSelectedIncludeTags}
              placeholder="Select tags to filter..."
              maxHeight="max-h-32"
            />
          </div>
        {:else if $isLoadingTags}
          <div class="flex items-center justify-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
            <RotateCw class="w-4 h-4 text-secondary-400 animate-spin mr-2" />
            <span class="text-sm text-secondary-500">Loading tags...</span>
          </div>
        {:else}
          <div class="text-center py-4 border border-secondary-200 dark:border-secondary-600 rounded-lg">
            <TagIcon class="w-8 h-8 text-secondary-300 mx-auto mb-2" />
            <p class="text-sm text-secondary-500">No tags available</p>
          </div>
        {/if}
      </div>
    {/if}
  {/snippet}

  {#snippet footer()}
    <button
      onclick={handleClear}
      class="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
    >
      Clear
    </button>
    <button
      onclick={handleApply}
      class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
    >
      Apply
    </button>
  {/snippet}
</Modal>
