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
      { value: 'created_at', label: 'Date created', icon: Calendar },
      { value: 'updated_at', label: 'Last updated', icon: Calendar }
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
  let simpleSearchInput = $state<HTMLInputElement | undefined>(undefined);
  let expertSearchInput = $state<HTMLInputElement | undefined>(undefined);

  function focusInput(input: HTMLInputElement | undefined) {
    if (!input) return;
    setTimeout(() => {
      input?.focus();
      input?.select();
    }, 50);
  }

  const SortIcon = $derived(getSortIcon(tempFilters.sortBy || defaultSortBy));

  // Reset temp values when modal opens
  $effect(() => {
    if (isOpen) {
      tempFilters = { ...initialFilters };
      // searchQuery is bound to parent, no need to reset
      tempSelectedIncludeTags = [...initialIncludeTags];
      tempSelectedExcludeTags = [...initialExcludeTags];
    }
  });

  // Focus search input based on mode when modal opens
  $effect(() => {
    if (isOpen) {
      if (expertFilterMode) {
        focusInput(expertSearchInput);
      } else {
        focusInput(simpleSearchInput);
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
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-deep text-ink-on-dark">
            {#if expertFilterMode}
              <SlidersHorizontal class="size-5" />
            {:else}
              <Filter class="size-5" />
            {/if}
          </div>
          <div>
            <h2 id="modal-title" class="text-title text-ink">
              {title}
            </h2>
            <p class="text-body-sm text-ink-muted">
              {expertFilterMode ? 'Advanced filtering options' : 'Quick filters for notes'}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- Mode Toggle Button -->
          <button
            type="button"
            onclick={() => (expertFilterMode = !expertFilterMode)}
            class="btn-icon"
            title={expertFilterMode ? 'Switch to simple mode' : 'Switch to expert mode'}
            aria-label={expertFilterMode ? 'Switch to simple mode' : 'Switch to expert mode'}
          >
            {#if expertFilterMode}
              <Filter class="size-4" />
            {:else}
              <SlidersHorizontal class="size-4" />
            {/if}
          </button>
          <!-- Close Button -->
          <button
            type="button"
            onclick={onClose}
            class="btn-icon"
            aria-label="Close modal"
          >
            <X class="size-5" />
          </button>
        </div>
      </div>
    </div>
  

  
    
    {#if expertFilterMode}
      <!-- Expert Mode -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search - Full Width -->
        <div class="md:col-span-2">
          <span class="label">Search</span>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                class="size-4 text-ink-muted transition-colors group-focus-within:text-accent-text"
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
          <span class="label">Sort by</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each sortOptions as sortOption (sortOption.value)}
              {@const Icon = sortOption.icon}
              <div class="rounded-md bg-sunken p-3">
                <div
                  class="mb-2 flex items-center gap-1 text-body-sm font-medium text-ink"
                >
                  <Icon class="size-4" />
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
                    class="preset-btn flex-1 flex items-center justify-center gap-1 {tempFilters.sortBy ===
                     sortOption.value && tempFilters.sortOrder === 'desc'
                      ? 'active'
                      : ''}"
                  >
                    <ArrowDown class="size-3" />
                    Newest
                  </button>
                  <button
                    onclick={() =>
                      (tempFilters = {
                        ...tempFilters,
                        sortBy: sortOption.value,
                        sortOrder: 'asc'
                      })}
                    class="preset-btn flex-1 flex items-center justify-center gap-1 {tempFilters.sortBy ===
                     sortOption.value && tempFilters.sortOrder === 'asc'
                      ? 'active'
                      : ''}"
                  >
                    <ArrowUp class="size-3" />
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
            <span class="label">Public status</span>
            <div class="flex flex-col gap-2">
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: true })}
                class="preset-btn text-left {tempFilters.isPublic ===
                true
                  ? 'active'
                  : ''}"
              >
                Public only
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: false })}
                class="preset-btn text-left {tempFilters.isPublic ===
                false
                  ? 'active'
                  : ''}"
              >
                Private only
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: undefined })}
                class="preset-btn text-left {tempFilters.isPublic ===
                undefined
                  ? 'active'
                  : ''}"
              >
                All
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorite Status Filter -->
        <div>
          <span class="label">Favorite status</span>
          <div class="flex flex-col gap-2">
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: true })}
              class="preset-btn text-left {tempFilters.isFavorite ===
              true
                ? 'active'
                : ''}"
            >
              Favorites only
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: false })}
              class="preset-btn text-left {tempFilters.isFavorite ===
              false
                ? 'active'
                : ''}"
            >
              Non-Favorites
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: undefined })}
              class="preset-btn text-left {tempFilters.isFavorite ===
              undefined
                ? 'active'
                : ''}"
            >
              All
            </button>
          </div>
        </div>

        <!-- Tag Filters -->
        {#if $tags.length > 0}
          <div>
            <label for="include-tags" class="label">Include tags</label>
            <TagsSelector
              id="include-tags"
              options={$tagOptions}
              bind:selectedValues={tempSelectedIncludeTags}
              placeholder="Select tags to include (OR logic)..."
              maxHeight="max-h-32"
            />
          </div>

          <div>
            <label for="exclude-tags" class="label">Exclude tags</label>
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
              class="flex items-center justify-center rounded-md bg-sunken py-4"
            >
              <RotateCw class="mr-2 size-4 animate-spin text-ink-muted" />
              <span class="text-body-sm text-ink-muted">Loading tags...</span>
            </div>
          </div>
        {:else}
          <div class="md:col-span-2">
            <div
              class="rounded-md bg-sunken py-4 text-center"
            >
              <TagIcon class="mx-auto mb-2 size-8 text-ink-muted" />
              <p class="text-body-sm text-ink-muted">No tags available</p>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <!-- Simple Mode -->
      <div class="space-y-4">
        <!-- Search -->
        <div>
          <label class="label flex items-center gap-1.5" for="simple-search-input">
            <Search class="size-4" />
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
          <label class="label flex items-center gap-1.5">
            <SortIcon class="size-4" />
            Sort by
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              onclick={() =>
                (tempFilters = {
                  ...tempFilters,
                  sortBy: tempFilters.sortBy || defaultSortBy,
                  sortOrder: 'desc'
                })}
              class="preset-btn flex items-center justify-center gap-1.5 {tempFilters.sortOrder ===
              'desc'
                ? 'active'
                : ''}"
            >
              <ArrowDown class="size-3.5" />
              Newest
            </button>
            <button
              onclick={() =>
                (tempFilters = {
                  ...tempFilters,
                  sortBy: tempFilters.sortBy || defaultSortBy,
                  sortOrder: 'asc'
                })}
              class="preset-btn flex items-center justify-center gap-1.5 {tempFilters.sortOrder ===
              'asc'
                ? 'active'
                : ''}"
            >
              <ArrowUp class="size-3.5" />
              Oldest
            </button>
          </div>
        </div>

        <!-- Visibility -->
        {#if showPublicFilter}
          <div>
            <label class="label flex items-center gap-1.5">
              <Globe class="size-4" />
              Visibility
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: undefined })}
                class="preset-btn text-center {tempFilters.isPublic ===
                undefined
                  ? 'active'
                  : ''}"
              >
                All
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: true })}
                class="preset-btn flex items-center justify-center gap-1 {tempFilters.isPublic ===
                true
                  ? 'active'
                  : ''}"
              >
                <Globe class="size-3.5" />
                Public
              </button>
              <button
                onclick={() => (tempFilters = { ...tempFilters, isPublic: false })}
                class="preset-btn flex items-center justify-center gap-1 {tempFilters.isPublic ===
                false
                  ? 'active'
                  : ''}"
              >
                <Lock class="size-3.5" />
                Private
              </button>
            </div>
          </div>
        {/if}

        <!-- Favorites -->
        <div>
          <label class="label flex items-center gap-1.5">
            <Star class="size-4" />
            Favorites
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: undefined })}
              class="preset-btn text-center {tempFilters.isFavorite ===
              undefined
                ? 'active'
                : ''}"
            >
              All
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: true })}
              class="preset-btn flex items-center justify-center gap-1 {tempFilters.isFavorite ===
              true
                ? 'active'
                : ''}"
            >
              <Star class="size-3.5 fill-current text-accent-text" />
              Yes
            </button>
            <button
              onclick={() => (tempFilters = { ...tempFilters, isFavorite: false })}
              class="preset-btn flex items-center justify-center gap-1 {tempFilters.isFavorite ===
              false
                ? 'active'
                : ''}"
            >
              <Star class="size-3.5 text-ink-muted" />
              No
            </button>
          </div>
        </div>

        <!-- Tags -->
        {#if $tags.length > 0}
          <div>
            <label class="label flex items-center gap-1.5">
              <TagIcon class="size-4" />
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
            class="flex items-center justify-center rounded-md bg-sunken py-4"
          >
            <RotateCw class="mr-2 size-4 animate-spin text-ink-muted" />
            <span class="text-body-sm text-ink-muted">Loading tags...</span>
          </div>
        {:else}
          <div
            class="rounded-md bg-sunken py-4 text-center"
          >
            <TagIcon class="mx-auto mb-2 size-8 text-ink-muted" />
            <p class="text-body-sm text-ink-muted">No tags available</p>
          </div>
        {/if}
      </div>
    {/if}
  

  
    <div class="mt-2 pt-5">
      <div class="flex items-center justify-between gap-6">
        <div class="text-body-sm text-ink-muted">
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
            class="btn btn-secondary"
          >
            Clear
          </button>
          <button
            type="button"
            onclick={handleApply}
            class="btn btn-primary"
          >
            <Filter class="size-4" />
            Apply
          </button>
        </div>
      </div>
    </div>
  
</Modal>
