<script lang="ts">
  import { Search, X, Check, CircleX } from '@lucide/svelte';
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
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        option.description?.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
      );
      return filtered;
    }
  });

  // Computed: Get selected options
  let selectedOptions = $derived.by(() => options.filter(option => selectedValues.includes(option.value)));

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
      onchange(new CustomEvent('change', {
        detail: { selectedValues, option, action: isSelected ? 'remove' : 'add' }
      }));
    }
  }

  function removeValue(value: string) {
    selectedValues = selectedValues.filter(v => v !== value);
    const option = options.find(opt => opt.value === value);
    if (onchange) {
      onchange(new CustomEvent('change', {
        detail: { selectedValues, option, action: 'remove' }
      }));
    }
  }

  function clearAll() {
    selectedValues = [];
    if (onchange) {
      onchange(new CustomEvent('change', {
        detail: { selectedValues, option: null, action: 'clear' }
      }));
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
    class="input flex items-center gap-2 min-h-10 text-left cursor-pointer disabled:cursor-not-allowed"
    class:border-yellow-500={isOpen}
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    disabled={disabled}
    aria-expanded={isOpen}
    aria-haspopup="dialog"
    aria-labelledby={id ? undefined : "tags-selector-label"}
  >
    <!-- Selected Chips Display -->
    <div class="flex-1 flex flex-wrap items-center gap-2">
      {#if selectedOptions.length === 0}
        <span class="text-secondary-400">{placeholder}</span>
      {:else}
        {#each selectedOptions as option (option.value)}
          <span
            class="tag-chip text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 hover:shadow-sm {!option.color ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700' : ''}"
            style="background-color: {option.color ? option.color + '20' : undefined}; color: {option.color || undefined}; border-color: {option.color ? option.color + '40' : undefined}"
            onkeydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                // Don't remove on chip Enter/Space - only on X button
              }
            }}
          >
            <div
              class="w-2 h-2 rounded-full {!option.color ? 'bg-yellow-600 dark:bg-primary-600' : ''}"
              style="background-color: {option.color || undefined}"
            ></div>
            {option.label}
            <span
              role="button"
              tabindex="0"
              class="hover:bg-black/10 dark:hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
              onclick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeValue(option.value);
              }}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  removeValue(option.value);
                }
              }}
              aria-label={`Remove ${option.label}`}
            >
              <X class="w-3 h-3" />
            </span>
          </span>
        {/each}
      {/if}
    </div>
  </button>

  <!-- Clear All Button (only show when there are selected items) -->
  {#if selectedOptions.length > 0}
    <button
      type="button"
      class="absolute top-4 right-3 text-secondary-400 hover:text-danger-500 transition-colors"
      onclick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        clearAll();
      }}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          clearAll();
        }
      }}
      title="Clear all selections"
    >
      <CircleX class="w-4 h-4" />
    </button>
  {/if}
</div>

<!-- Tags Selector Modal -->
<Modal
  bind:isOpen={isOpen}
  onClose={handleModalClose}
  maxW="max-w-md"
  title="Select Tags"
  showCloseButton={true}
>
  {#snippet body()}
    <div class="space-y-4">
      <!-- Search Input -->
      {#if searchable}
        <div>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              bind:this={searchInputElement}
              type="text"
              class="input !pl-9"
              placeholder="Search tags..."
              bind:value={searchQuery}
              onkeydown={handleKeydown}
              aria-label="Search tags"
            />
          </div>
        </div>
      {/if}

      <!-- Tags Grid Display -->
      <div class={`${maxHeight} overflow-y-auto`}>
        {#if filteredOptions.length === 0}
          <div class="text-center text-secondary-500 text-sm py-8">
            {searchQuery ? 'No tags found' : 'No tags available'}
          </div>
        {:else}
          <div role="listbox" aria-label="Tags" class="flex flex-wrap gap-2">
            {#each filteredOptions as option, index (option.value)}
              <button
                type="button"
                class="tag-option text-sm px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-2 {focusedIndex === index ? 'ring-2 ring-yellow-500 dark:ring-primary-500 ring-offset-1' : ''} {selectedValues.includes(option.value) ? 'shadow-sm' : 'hover:shadow-sm opacity-80 hover:opacity-100'} {option.color ? '' : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700'}"
                onclick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectOption(option);
                }}
                onkeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    selectOption(option);
                  }
                }}
                onmouseenter={() => focusedIndex = index}
                role="option"
                aria-selected={selectedValues.includes(option.value)}
                style="background-color: {option.color ? option.color + '20' : undefined}; color: {option.color || undefined}; border-color: {option.color ? option.color + '40' : undefined}"
              >
                <!-- Selected Indicator -->
                {#if selectedValues.includes(option.value)}
                  <div class="w-3.5 h-3.5 bg-yellow-600 dark:bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check class="w-2.5 h-2.5 text-white" />
                  </div>
                {:else}
                  <div
                    class="w-3.5 h-3.5 rounded-full border-2 border-current flex-shrink-0"
                    style="border-color: {option.color || 'currentColor'}"
                  ></div>
                {/if}

                <!-- Tag Color Dot -->
                <div
                  class="w-2 h-2 rounded-full flex-shrink-0 {!option.color ? 'bg-yellow-600 dark:bg-primary-600' : ''}"
                  style="background-color: {option.color || undefined}"
                ></div>

                <!-- Tag Label -->
                <span class="font-medium truncate max-w-[100px]">{option.label}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400">
      <span>
        {selectedOptions.length} of {options.length} selected
      </span>
      {#if selectedOptions.length > 0}
        <button
          type="button"
          class="ml-2 text-danger-500 hover:text-danger-600 font-medium"
          onclick={clearAll}
        >
          Clear All
        </button>
      {/if}
    </div>
  {/snippet}
</Modal>

<style>
  /* Tag chip animation */
  .tag-chip {
    animation: chipIn 0.2s ease-out;
  }

  @keyframes chipIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Tag option hover effect */
  .tag-option {
    animation: optionIn 0.15s ease-out;
  }

  @keyframes optionIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
