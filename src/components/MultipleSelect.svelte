<script lang="ts">
  import { Search, X, ChevronDown, Check } from '@lucide/svelte';

  // Props interface
  interface Option {
    value: string;
    label: string;
    description?: string;
    color?: string;
  }

  interface Props {
    options: Option[];
    selectedValues?: string[];
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    maxHeight?: string;
    onchange?: (event: CustomEvent) => void;
  }

  let {
    options = [],
    selectedValues = $bindable<string[]>([]),
    placeholder = 'Select options...',
    searchable = true,
    disabled = false,
    maxHeight = 'max-h-48',
    onchange
  }: Props = $props();

  
  // Component state
  let isOpen = $state(false);
  let searchQuery = $state('');
  let focusedIndex = $state(-1);

  // Portal state
  let dropdownElement = $state<HTMLDivElement | null>(null);
  let triggerElement = $state<HTMLButtonElement | null>(null);
  let dropdownPosition = $state({ top: 0, left: 0, width: 0 });

  
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

  // Close dropdown when clicking outside and handle scroll/resize
  $effect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // Check if click is outside trigger button and dropdown portal
        const clickedInsideTrigger = triggerElement?.contains(target);
        const clickedInsideDropdown = dropdownElement?.contains(target);

        if (!clickedInsideTrigger && !clickedInsideDropdown) {
          isOpen = false;
          searchQuery = '';
        }
      };

      // Handle escape key
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          isOpen = false;
          searchQuery = '';
        }
      };

      // Update position on scroll and resize
      const handleScrollOrResize = () => {
        if (isOpen && triggerElement) {
          updateDropdownPosition();
        }
      };

      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);

      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    }
  });

  // Calculate dropdown position
  function updateDropdownPosition() {
    if (!triggerElement) return;

    const rect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 240; // Approximate height (max-h-48 = 12rem = 192px + padding)

    let top;
    // Check if there's enough space below, if not show above
    if (rect.bottom + dropdownHeight <= viewportHeight) {
      // Show below (no scroll offset needed for position: fixed)
      top = rect.bottom + 4; // 4px gap
    } else {
      // Show above (no scroll offset needed for position: fixed)
      top = rect.top - dropdownHeight - 4; // 4px gap
    }

    const position = {
      top,
      left: rect.left, // No scroll offset needed for position: fixed
      width: rect.width
    };

    dropdownPosition = position;
  }

  function toggleDropdown() {
    if (disabled) return;

    isOpen = !isOpen;
    searchQuery = '';

    // Always update position when opening
    if (isOpen) {
      // Use setTimeout to ensure DOM is updated before calculating position
      setTimeout(() => {
        updateDropdownPosition();
      }, 0);
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

  function handleKeydown(event: KeyboardEvent) {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusedIndex = Math.max(focusedIndex - 1, 0);
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          selectOption(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        isOpen = false;
        searchQuery = '';
        break;
    }
  }
</script>

<div class="multiple-select-dropdown">
  <!-- Trigger Button -->
  <button
    bind:this={triggerElement}
    type="button"
    class="input flex items-center gap-2 min-h-10 text-left cursor-pointer disabled:cursor-not-allowed"
    class:border-primary-500={isOpen}
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    disabled={disabled}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-labelledby="multiselect-label"
  >
    <!-- Selected Items Display -->
    <div class="flex-1 flex flex-wrap items-center gap-1">
      {#if selectedOptions.length === 0}
        <span class="text-secondary-400">{placeholder}</span>
      {:else}
        {#each selectedOptions as option}
          <span
            class="text-xs flex items-center gap-1 px-2 py-1 rounded-full border {!option.color ? 'bg-primary-100 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-700' : ''}"
            style="background-color: {option.color ? option.color + '20' : undefined}; color: {option.color || undefined}; border-color: {option.color ? option.color + '40' : undefined}"
          >
            <div
              class="w-2 h-2 rounded-full {!option.color ? 'bg-primary-600' : ''}"
              style="background-color: {option.color || undefined}"
            ></div>
            {option.label}
            <span
              role="button"
              tabindex="0"
              class="hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5 transition-colors cursor-pointer"
              onclick={(e) => {
                e.stopPropagation();
                removeValue(option.value);
              }}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
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

    <!-- Dropdown Arrow -->
    <ChevronDown
      class={`w-4 h-4 text-secondary-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>

  <!-- Clear All Button (only show when there are selected items) -->
  {#if selectedOptions.length > 0}
    <button
      type="button"
      class="absolute top-2 right-8 text-xs text-secondary-400 hover:text-danger-500 transition-colors"
      onclick={(e) => {
        e.stopPropagation();
        clearAll();
      }}
      title="Clear all selections"
    >
      Clear all
    </button>
  {/if}

  <!-- Dropdown Content (Portal) -->
{#if isOpen}
  {@const portalId = `multiple-select-portal-${Math.random().toString(36).substr(2, 9)}`}

  <!-- Portal container -->
  {#if typeof document !== 'undefined'}
    <div
      bind:this={dropdownElement}
      id={portalId}
      role="listbox"
      tabindex="-1"
      class="fixed z-[9999] bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-600 rounded-lg shadow-lg overflow-hidden"
      style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px; min-width: 200px;"
      onkeydown={handleKeydown}
    >
      <!-- Search Input -->
      {#if searchable}
        <div class="p-3 border-b border-secondary-200 dark:border-secondary-600">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              class="input !pl-9"
              placeholder="Search options..."
              bind:value={searchQuery}
              onfocus={(e) => e.target.select()}
              aria-label="Search options"
            />
          </div>
        </div>
      {/if}

      <!-- Options List -->
      <div class={`${maxHeight} overflow-y-auto`}>
        {#if filteredOptions.length === 0}
          <div class="p-4 text-center text-secondary-500 text-sm">
            {searchQuery ? 'No options found' : 'No options available'}
                      </div>
        {:else}
          <div role="listbox" aria-label="Options">
            {#each filteredOptions as option, index}
              <button
                type="button"
                class={`w-full px-3 py-2 text-left text-sm hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors flex items-center gap-3 border-b border-secondary-100 dark:border-secondary-700 last:border-b-0 ${
                  focusedIndex === index ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
                onclick={() => selectOption(option)}
                role="option"
                aria-selected={selectedValues.includes(option.value)}
              >
                <!-- Checkbox/Icon -->
                <div class="flex-shrink-0">
                  {#if selectedValues.includes(option.value)}
                    <div class="w-4 h-4 bg-primary-600 rounded flex items-center justify-center">
                      <Check class="w-3 h-3 text-white" />
                    </div>
                  {:else}
                    <div class="w-4 h-4 border border-secondary-300 dark:border-secondary-600 rounded"></div>
                  {/if}
                </div>

                <!-- Option Content -->
                <div class="flex-1 min-w-0 flex items-center gap-2">
                  <div
                    class="w-3 h-3 rounded-full border border-secondary-300 dark:border-secondary-600 flex-shrink-0 {!option.color ? 'bg-primary-600 border-primary-500' : ''}"
                    style="background-color: {option.color || undefined}"
                  ></div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-secondary-900 dark:text-white truncate">
                      {option.label}
                    </div>
                    {#if option.description}
                      <div class="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                        {option.description}
                      </div>
                    {/if}
                  </div>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Footer with selection count -->
      {#if selectedOptions.length > 0}
        <div class="p-2 border-t border-secondary-200 dark:border-secondary-600 bg-secondary-50 dark:bg-secondary-700">
          <p class="text-xs text-secondary-600 dark:text-secondary-400 text-center">
            {selectedOptions.length} of {options.length} selected
          </p>
        </div>
      {/if}
    </div>
  {/if}
{/if}
</div>