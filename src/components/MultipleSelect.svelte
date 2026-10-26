<script lang="ts">
  import { Search, X, ChevronDown, Check } from '@lucide/svelte';

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
    placeholder = 'Select options...',
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

  // Portal state
  let dropdownElement = $state<HTMLDivElement | null>(null);
  let triggerElement = $state<HTMLButtonElement | null>(null);
  let searchInputElement = $state<HTMLInputElement | null>(null);
  let dropdownPosition = $state({ top: 0, left: 0, width: 0 });

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
      searchInputElement.focus();
      searchInputElement.select();
    }
  });

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
          focusedIndex = -1;
        }
      };

      // Handle escape key
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          isOpen = false;
          searchQuery = '';
          focusedIndex = -1;
          // Return focus to trigger button
          triggerElement?.focus();
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
    focusedIndex = -1;

    // Always update position when opening
    if (isOpen) {
      // Use setTimeout to ensure DOM is updated before calculating position
      setTimeout(() => {
        updateDropdownPosition();
      }, 0);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    // Global keyboard shortcuts for dropdown
    if (isOpen) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (filteredOptions.length > 0) {
            focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (filteredOptions.length > 0) {
            focusedIndex = Math.max(focusedIndex - 1, 0);
          }
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
          focusedIndex = -1;
          triggerElement?.focus();
          break;
      }
    } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      // Open dropdown on Enter, Space, or ArrowDown when closed
      event.preventDefault();
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
</script>

<div class="multiple-select-dropdown relative">
  <!-- Trigger Button -->
  <button
    bind:this={triggerElement}
    type="button"
    class="input flex items-center gap-2 min-h-10 text-left cursor-pointer disabled:cursor-not-allowed {isOpen ? 'outline-2 outline-offset-2 outline-focus-ring' : ''}"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    {disabled}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-labelledby={id ? undefined : 'multiselect-label'}
  >
    <!-- Selected Items Display -->
    <div class="flex-1 flex flex-wrap items-center gap-1">
      {#if selectedOptions.length === 0}
        <span class="text-ink-muted">{placeholder}</span>
      {:else}
        {#each selectedOptions as option (option.value)}
          <span
            class="inline-flex h-7 items-center gap-1.5 rounded-pill bg-sunken pr-1.5 pl-3 text-code text-ink"
          >
            <span
              class="size-2 shrink-0 rounded-pill {!option.color ? 'bg-accent' : ''}"
              style="background-color: {option.color || undefined}"
              aria-hidden="true"
            ></span>
            {option.label}
            <span
              role="button"
              tabindex="0"
              class="cursor-pointer rounded-pill p-0.5 text-ink-muted transition-colors hover:bg-control-hover hover:text-ink"
              onclick={e => {
                e.stopPropagation();
                removeValue(option.value);
              }}
              onkeydown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  removeValue(option.value);
                }
              }}
              aria-label={`Remove ${option.label}`}
            >
              <X class="size-3" />
            </span>
          </span>
        {/each}
      {/if}
    </div>

    <!-- Dropdown Arrow -->
    <ChevronDown
      class={`size-4 shrink-0 text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>

  <!-- Clear All Button (only show when there are selected items) -->
  {#if selectedOptions.length > 0}
    <button
      type="button"
      class="quick-btn absolute top-2 right-8 text-xs text-ink-muted transition-colors hover:text-negative"
      onclick={e => {
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
        class="fixed z-[9999] overflow-hidden rounded-md bg-raised shadow-pop"
        style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px; min-width: 200px;"
      >
        <!-- Search Input -->
        {#if searchable}
          <div class="p-3">
            <div class="relative">
              <Search
                class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted"
              />
              <input
                bind:this={searchInputElement}
                type="text"
                class="input !pl-9"
                placeholder="Search options..."
                bind:value={searchQuery}
                onkeydown={handleKeydown}
                aria-label="Search options"
              />
            </div>
          </div>
        {/if}

        <!-- Options List -->
        <div class={`${maxHeight} overflow-y-auto`}>
          {#if filteredOptions.length === 0}
            <div class="p-4 text-center text-body-sm text-ink-muted">
              {searchQuery ? 'No options found' : 'No options available'}
            </div>
          {:else}
            <div role="listbox" aria-label="Options">
              {#each filteredOptions as option, index (option.value)}
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-3 py-2 text-left text-body-sm transition-colors {focusedIndex ===
                  index
                    ? 'bg-control'
                    : 'hover:bg-control'}"
                  onclick={() => selectOption(option)}
                  onmouseenter={() => (focusedIndex = index)}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                >
                  <!-- Checkbox/Icon -->
                  <div class="flex-shrink-0">
                    {#if selectedValues.includes(option.value)}
                      <div class="flex size-4 items-center justify-center rounded-[4px] bg-accent">
                        <Check class="size-3 text-ink-on-accent" />
                      </div>
                    {:else}
                      <div class="size-4 rounded-[4px] bg-control"></div>
                    {/if}
                  </div>

                  <!-- Option Content -->
                  <div class="flex-1 min-w-0 flex items-center gap-2">
                    <div
                      class="size-2.5 shrink-0 rounded-pill {!option.color ? 'bg-accent' : ''}"
                      style="background-color: {option.color || undefined}"
                    ></div>
                    <div class="flex-1 min-w-0">
                      <div class="truncate font-medium text-ink">
                        {option.label}
                      </div>
                      {#if option.description}
                        <div class="truncate text-xs text-ink-muted">
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
          <div class="bg-sunken p-2">
            <p class="text-center font-mono text-xs text-ink-muted">
              {selectedOptions.length} of {options.length} selected
            </p>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
