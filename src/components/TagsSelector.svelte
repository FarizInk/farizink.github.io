<script lang="ts">
  import { Search, X, Check, CircleX, Tags } from '@lucide/svelte';
  import Modal from './Modal.svelte';

  // Props interface
  interface Option {
    value: string;
    label: string;
    description?: string;
    color?: string | null;
  }

  interface Props {
    options: Option[];
    selectedValues?: string[];
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    maxHeight?: string;
    onchange?: (event: CustomEvent) => void;
    id?: string;
  }

  let {
    options = [],
    selectedValues = $bindable<string[]>([]),
    placeholder = 'Select tags...',
    searchable = true,
    disabled = false,
    maxHeight = 'max-h-48',
    onchange,
    id
  }: Props = $props();

  // Component state
  let isOpen = $state(false);
  let searchQuery = $state('');
  let focusedIndex = $state(-1);
  let searchInputElement = $state<HTMLInputElement | null>(null);

  // Computed: Filter options based on search query
  let filteredOptions = $derived.by(() => {
    if (!searchQuery.trim()) {
      return options;
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = options.filter(
        option =>
          option.label.toLowerCase().includes(query) ||
          option.description?.toLowerCase().includes(query) ||
          option.value.toLowerCase().includes(query)
      );
      return filtered;
    }
  });

  // Computed: Get selected options
  let selectedOptions = $derived.by(() =>
    options.filter(option => selectedValues.includes(option.value))
  );

  // Auto-focus search input when dropdown opens
  $effect(() => {
    if (isOpen && searchInputElement && searchable) {
      setTimeout(() => {
        searchInputElement?.focus();
        searchInputElement?.select();
      }, 50);
    }
  });

  function toggleDropdown() {
    if (disabled) return;
    isOpen = !isOpen;
    searchQuery = '';
    focusedIndex = -1;
  }

  function handleKeydown(event: KeyboardEvent) {
    // Global keyboard shortcuts for dropdown
    if (isOpen) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          event.stopPropagation();
          if (filteredOptions.length > 0) {
            focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          event.stopPropagation();
          if (filteredOptions.length > 0) {
            focusedIndex = Math.max(focusedIndex - 1, 0);
          }
          break;
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            selectOption(filteredOptions[focusedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();
          isOpen = false;
          searchQuery = '';
          focusedIndex = -1;
          break;
      }
    } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      // Open dropdown on Enter, Space, or ArrowDown when closed
      event.preventDefault();
      event.stopPropagation();
      toggleDropdown();
    }
  }

  function selectOption(option: Option) {
    const isSelected = selectedValues.includes(option.value);

    if (isSelected) {
      selectedValues = selectedValues.filter(value => value !== option.value);
    } else {
      selectedValues = [...selectedValues, option.value];
    }

    if (onchange) {
      onchange(
        new CustomEvent('change', {
          detail: { selectedValues, option, action: isSelected ? 'remove' : 'add' }
        })
      );
    }
  }

  function removeValue(value: string) {
    selectedValues = selectedValues.filter(v => v !== value);
    const option = options.find(opt => opt.value === value);
    if (onchange) {
      onchange(
        new CustomEvent('change', {
          detail: { selectedValues, option, action: 'remove' }
        })
      );
    }
  }

  function clearAll() {
    selectedValues = [];
    if (onchange) {
      onchange(
        new CustomEvent('change', {
          detail: { selectedValues, option: null, action: 'clear' }
        })
      );
    }
  }

  function handleModalClose() {
    isOpen = false;
    searchQuery = '';
    focusedIndex = -1;
  }
</script>

<div class="tags-selector relative">
  <!-- Trigger Button -->
  <button
    type="button"
    class="input flex items-center gap-2 min-h-11 text-left cursor-pointer disabled:cursor-not-allowed transition-all duration-200 {isOpen
      ? 'ring-2 ring-warning-400 dark:ring-primary-500 shadow-lg'
      : 'hover:shadow-md hover:border-warning-300 dark:hover:border-primary-600'}"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    {disabled}
    aria-expanded={isOpen}
    aria-haspopup="dialog"
    aria-labelledby={id ? undefined : 'tags-selector-label'}
  >
    <!-- Tags Icon -->
    <div class="flex-shrink-0">
      <div
        class="w-8 h-8 rounded-lg flex items-center justify-center {selectedOptions.length > 0
          ? 'bg-gradient-to-br from-warning-100 to-amber-100 dark:from-primary-900/40 dark:to-primary-800/40'
          : 'bg-secondary-100 dark:bg-secondary-700'}"
      >
        <Tags
          class="w-4 h-4 {selectedOptions.length > 0
            ? 'text-warning-600 dark:text-primary-400'
            : 'text-secondary-500'}"
        />
      </div>
    </div>

    <!-- Selected Chips Display -->
    <div class="flex-1 flex flex-wrap items-center gap-2">
      {#if selectedOptions.length === 0}
        <span class="text-secondary-400">{placeholder}</span>
      {:else}
        {#each selectedOptions.slice(0, 5) as option (option.value)}
          <span
            class="tag-chip text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 hover:shadow-sm hover:scale-105 {!option.color
              ? 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700'
              : ''}"
            style="background-color: {option.color
              ? option.color + '20'
              : undefined}; color: {option.color || undefined}; border-color: {option.color
              ? option.color + '40'
              : undefined}"
            onkeydown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <div
              class="w-1.5 h-1.5 rounded-full {!option.color
                ? 'bg-warning-600 dark:bg-primary-600'
                : ''}"
              style="background-color: {option.color || undefined}"
            ></div>
            {option.label}
          </span>
        {/each}
        {#if selectedOptions.length > 5}
          <span
            class="text-xs font-medium text-secondary-500 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-700 px-2 py-1 rounded-full"
          >
            +{selectedOptions.length - 5}
          </span>
        {/if}
      {/if}
    </div>

    <!-- Dropdown Indicator -->
    <div class="flex items-center gap-2 flex-shrink-0">
      <!-- Clear All Button (when items selected) -->
      {#if selectedOptions.length > 0}
        <button
          type="button"
          class="p-1.5 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-400 hover:text-danger-500 transition-colors"
          onclick={e => {
            e.stopPropagation();
            e.preventDefault();
            clearAll();
          }}
          onkeydown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              clearAll();
            }
          }}
          title="Clear all selections"
          aria-label="Clear all selections"
        >
          <CircleX class="w-4 h-4" />
        </button>
      {/if}

      <!-- Chevron -->
      <div
        class="p-1 rounded-md transition-transform duration-200 {isOpen
          ? 'rotate-180'
          : ''}"
      >
        <svg
          class="w-4 h-4 text-secondary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </button>
</div>

<!-- Tags Selector Modal -->
<Modal
  bind:isOpen
  onClose={handleModalClose}
  maxW="max-w-lg"
  showCloseButton={false}
>
  {#snippet header()}
    <div class="py-5 px-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-b border-warning-200 dark:border-primary-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-warning-400 to-amber-500 dark:from-primary-500 dark:to-primary-600 flex items-center justify-center shadow-lg">
            <Tags class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 id="modal-title" class="text-lg font-bold text-gray-900 dark:text-white">
              Select Tags
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {selectedOptions.length} selected
            </p>
          </div>
        </div>
        <button
          type="button"
          onclick={handleModalClose}
          class="w-8 h-8 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <!-- Search Input -->
      {#if searchable}
        <div class="mt-4">
          <div class="relative group">
            <Search
              class="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-secondary-400 group-focus-within:text-warning-500 dark:group-focus-within:text-primary-400 transition-colors"
            />
            <input
              bind:this={searchInputElement}
              type="text"
              class="input !pl-11 !py-2.5 border-secondary-200 dark:border-secondary-600 focus:border-warning-500 dark:focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
              placeholder="Search tags by name or identifier..."
              bind:value={searchQuery}
              onkeydown={handleKeydown}
              aria-label="Search tags"
            />
            {#if searchQuery}
              <button
                type="button"
                onclick={() => (searchQuery = '')}
                class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                aria-label="Clear search"
              >
                <CircleX class="w-4 h-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300" />
              </button>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {/snippet}

  {#snippet body()}
    <div class="px-6 py-5">
      <!-- Selected Tags Preview (when tags are selected) -->
      {#if selectedOptions.length > 0}
        <div class="mb-5 p-4 bg-gradient-to-r from-warning-50/50 to-amber-50/50 dark:from-primary-900/20 dark:to-primary-800/10 rounded-xl border border-warning-200 dark:border-primary-700">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Selected Tags</span>
            <button
              type="button"
              class="text-xs font-medium text-danger-500 hover:text-danger-600 dark:hover:text-danger-400 transition-colors flex items-center gap-1"
              onclick={clearAll}
            >
              <CircleX class="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            {#each selectedOptions as option (option.value)}
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm {option.color
                  ? ''
                  : 'bg-white dark:bg-secondary-800 text-warning-700 dark:text-primary-300 border-warning-300 dark:border-primary-600'}"
                style="background-color: {option.color
                  ? (option.color + '15')
                  : undefined}; color: {option.color || undefined}; border-color: {option.color
                  ? (option.color + '40')
                  : undefined}"
              >
                <div
                  class="w-2 h-2 rounded-full {option.color
                    ? ''
                    : 'bg-warning-500 dark:bg-primary-500'}"
                  style="background-color: {option.color || undefined}"
                ></div>
                {option.label}
                <button
                  type="button"
                  onclick={() => removeValue(option.value)}
                  class="ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 p-0.5 transition-colors"
                  aria-label={`Remove ${option.label}`}
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </span>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Available Tags Grid -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Available Tags
            <span class="ml-2 text-xs font-normal text-secondary-500">
              ({filteredOptions.length})
            </span>
          </h3>
          {#if searchQuery}
            <button
              type="button"
              class="text-xs text-warning-600 dark:text-primary-400 hover:underline"
              onclick={() => (searchQuery = '')}
            >
              Clear search
            </button>
          {/if}
        </div>

        <div class={`${maxHeight} overflow-y-auto p-2`}>
          {#if filteredOptions.length === 0}
            <div class="text-center py-10">
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center"
              >
                <Search class="w-8 h-8 text-secondary-400" />
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">
                {searchQuery ? 'No tags found' : 'No tags available'}
              </h3>
              <p class="text-sm text-secondary-500 dark:text-secondary-400">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Create tags to get started'}
              </p>
            </div>
          {:else}
            <div
              role="listbox"
              aria-label="Available tags"
              class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {#each filteredOptions as option, index (option.value)}
                {@const isSelected = selectedValues.includes(option.value)}
                {@const isFocused = focusedIndex === index}
                <button
                  type="button"
                  class="tag-card group relative p-3 rounded-xl border-2 text-left transition-all duration-200 {isFocused
                    ? 'ring-2 ring-warning-400 dark:ring-primary-500 ring-offset-1'
                    : ''} {isSelected
                    ? (option.color
                      ? 'border-current shadow-md scale-[1.02]'
                      : 'bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/30 dark:to-primary-800/20 border-warning-400 dark:border-primary-500 shadow-md scale-[1.02]')
                    : 'bg-white dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 hover:border-warning-300 dark:hover:border-primary-600 hover:shadow-md'}"
                  onclick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectOption(option);
                  }}
                  onkeydown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      selectOption(option);
                    }
                  }}
                  onmouseenter={() => (focusedIndex = index)}
                  role="option"
                  aria-selected={isSelected}
                  style="{option.color && isSelected
                    ? `background-color: ${option.color}10; border-color: ${option.color}; color: ${option.color}`
                    : option.color && !isSelected
                      ? `color: ${option.color}80`
                      : ''}"
                >
                  <!-- Selection Indicator -->
                  <div
                    class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 {isSelected
                      ? (option.color
                        ? ''
                        : 'bg-warning-500 dark:bg-primary-500')
                      : 'border-2 border-secondary-300 dark:border-secondary-600'}"
                    style="{isSelected && option.color
                      ? `background-color: ${option.color}`
                      : ''}"
                  >
                    {#if isSelected}
                      <Check class="w-3 h-3 text-white" />
                    {/if}
                  </div>

                  <!-- Tag Content -->
                  <div class="flex items-start gap-3 pr-6">
                    <!-- Tag Color -->
                    <div
                      class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 {option.color
                        ? ''
                        : 'bg-gradient-to-br from-warning-100 to-amber-100 dark:from-primary-900/40 dark:to-primary-800/40'}"
                      style="background-color: {option.color
                        ? option.color + '20'
                        : undefined}"
                    >
                      <div
                        class="w-4 h-4 rounded-full {option.color
                          ? ''
                          : 'bg-warning-500 dark:bg-primary-500'}"
                        style="background-color: {option.color || undefined}"
                      ></div>
                    </div>

                    <!-- Tag Info -->
                    <div class="flex-1 min-w-0">
                      <span
                        class="block text-sm font-semibold truncate {option.color && isSelected
                          ? ''
                          : 'text-gray-900 dark:text-white'}"
                        style="{option.color && isSelected
                          ? `color: ${option.color}`
                          : ''}"
                      >
                        {option.label}
                      </span>
                      {#if option.description}
                        <span
                          class="block text-xs truncate mt-0.5 {option.color && isSelected
                            ? ''
                            : 'text-secondary-500 dark:text-secondary-400'}"
                          style="{option.color && isSelected
                            ? `color: ${option.color}80`
                            : ''}"
                        >
                          {option.description}
                        </span>
                      {/if}
                    </div>
                  </div>

                  <!-- Hover Glow Effect (only when not selected) -->
                  {#if !isSelected}
                    <div
                      class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style="background: radial-gradient(circle at center, {option.color || 'rgb(251,191,36)'}10 0%, transparent 70%)"
                    ></div>
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="py-4 bg-secondary-50 dark:bg-secondary-900/30">
      <div class="flex items-center justify-between px-6 gap-6">
        <div class="text-sm text-secondary-600 dark:text-secondary-400">
          <span>
            {selectedOptions.length} of {options.length} selected
          </span>
        </div>
        <button
          type="button"
          onclick={handleModalClose}
          class="px-5 py-2.5 bg-gradient-to-r from-warning-500 to-amber-500 hover:from-warning-600 hover:to-amber-600 dark:hover:from-primary-600 dark:hover:to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {#if selectedOptions.length > 0}
            <Check class="w-4 h-4" />
          {:else}
            <Tags class="w-4 h-4" />
          {/if}
          {selectedOptions.length > 0
            ? `Done (${selectedOptions.length})`
            : 'Skip'}
        </button>
      </div>
    </div>
  {/snippet}
</Modal>

<style>
  /* Tag chip animation */
  .tag-chip {
    animation: chipIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes chipIn {
    from {
      opacity: 0;
      transform: scale(0.85);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Tag card animation */
  .tag-card {
    animation: cardIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes cardIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Stagger animation for cards */
  .tag-card:nth-child(1) {
    animation-delay: 0ms;
  }
  .tag-card:nth-child(2) {
    animation-delay: 25ms;
  }
  .tag-card:nth-child(3) {
    animation-delay: 50ms;
  }
  .tag-card:nth-child(4) {
    animation-delay: 75ms;
  }
  .tag-card:nth-child(5) {
    animation-delay: 100ms;
  }
  .tag-card:nth-child(n+6) {
    animation-delay: 125ms;
  }

  /* Glow pulse for selected cards */
  .tag-card:has(.bg-warning-500.dark\\:bg-primary-500) {
    animation: selectedPulse 2s ease-in-out infinite;
  }

  @keyframes selectedPulse {
    0%,
    100% {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    50% {
      box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }

  :global(.dark) .tag-card:has(.bg-warning-500.dark\\:bg-primary-500) {
    animation: selectedPulseDark 2s ease-in-out infinite;
  }

  @keyframes selectedPulseDark {
    0%,
    100% {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    }
    50% {
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }
  }
</style>
