<script lang="ts">
  import { X, Check, Tags, CircleX } from '@lucide/svelte';
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
    onchange?: (event: CustomEvent) => void;
    id?: string;
  }

  let {
    options = [],
    selectedValues = $bindable<string[]>([]),
    placeholder = 'Select tags...',
    searchable = true,
    disabled = false,
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
  maxW="max-w-md"
  showCloseButton={false}
>
  {#snippet header()}
    <div class="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-secondary-200 dark:border-secondary-700">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-warning-100 dark:bg-primary-900 flex items-center justify-center">
          <Tags class="w-4 h-4 text-warning-600 dark:text-primary-400" />
        </div>
        <div>
          <h2 id="modal-title" class="text-sm font-semibold text-gray-900 dark:text-white">
            Select Tags
          </h2>
        </div>
      </div>
      <button
        type="button"
        onclick={handleModalClose}
        class="w-7 h-7 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center"
        aria-label="Close"
      >
        <X class="w-4 h-4 text-gray-500" />
      </button>
    </div>
    {#if searchable}
      <div class="px-4 py-2 border-b border-secondary-100 dark:border-secondary-800">
        <input
          bind:this={searchInputElement}
          type="text"
          class="input !py-1.5 text-sm"
          placeholder="Search..."
          bind:value={searchQuery}
          onkeydown={handleKeydown}
        />
      </div>
    {/if}
  {/snippet}

{#snippet body()}
    <div class="p-3 max-h-[50vh] overflow-y-auto">
      {#if filteredOptions.length === 0}
        <div class="text-center py-8 text-sm text-secondary-500">
          No tags found
        </div>
      {:else}
        <div class="flex flex-wrap gap-2">
          {#each filteredOptions as option (option.value)}
            {@const isSelected = selectedValues.includes(option.value)}
            {@const hasColor = !!option.color}
            <button
              type="button"
              onclick={() => selectOption(option)}
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 {isSelected
                ? 'shadow-sm ring-1'
                : 'hover:shadow-sm'} {hasColor
                ? (isSelected ? 'border-warning-400 dark:border-primary-500 ring-warning-200 dark:ring-primary-800' : 'border-secondary-200 dark:border-secondary-700 hover:border-warning-300 dark:hover:border-primary-600')
                : (isSelected ? 'bg-warning-100 text-warning-700 border-warning-400 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-500 ring-warning-200 dark:ring-primary-800' : 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700 hover:border-warning-300 dark:hover:border-primary-600')}"
              style={hasColor ? `background-color: ${option.color}${isSelected ? '20' : '10'}; color: ${option.color}` : ''}
            >
              <span
                class="w-2 h-2 rounded-full flex-shrink-0 {hasColor ? '' : 'bg-warning-500 dark:bg-primary-400'}"
                style={hasColor ? `background-color: ${option.color}` : ''}
              ></span>
              {option.label}
              {#if isSelected}
                <Check class="w-3 h-3" />
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/snippet}
  {#snippet footer()}
    <span class="text-xs text-secondary-500 mr-auto">
      {selectedOptions.length} selected
    </span>
    <button
      type="button"
      onclick={handleModalClose}
      class="px-3 py-1.5 text-sm bg-warning-500 hover:bg-warning-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg"
    >
      {selectedOptions.length > 0 ? 'Done' : 'Skip'}
    </button>
  {/snippet}
</Modal>
