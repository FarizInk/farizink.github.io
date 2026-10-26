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
    class="input flex min-h-11 cursor-pointer items-center gap-2 text-left transition-colors disabled:cursor-not-allowed {isOpen
      ? 'outline-2 outline-offset-2 outline-focus-ring'
      : ''}"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    {disabled}
    aria-expanded={isOpen}
    aria-haspopup="dialog"
    aria-labelledby={id ? undefined : 'tags-selector-label'}
  >
    <!-- Tags Icon -->
    <div class="shrink-0">
      <div
        class="flex size-8 items-center justify-center rounded-sm {selectedOptions.length > 0
          ? 'bg-tile-deep text-ink-on-dark'
          : 'bg-sunken text-ink-muted'}"
      >
        <Tags class="size-4" />
      </div>
    </div>

    <!-- Selected Chips Display -->
    <div class="flex flex-1 flex-wrap items-center gap-2">
      {#if selectedOptions.length === 0}
        <span class="text-ink-muted">{placeholder}</span>
      {:else}
        {#each selectedOptions.slice(0, 5) as option (option.value)}
          <span
            role="button"
            tabindex="-1"
            class="tag-chip inline-flex h-7 items-center gap-1.5 rounded-pill bg-sunken px-3 text-code text-ink"
          >
            <span
              class="size-2 shrink-0 rounded-pill {!option.color ? 'bg-accent' : ''}"
              style="background-color: {option.color || undefined}"
              aria-hidden="true"
            ></span>
            {option.label}
          </span>
        {/each}
        {#if selectedOptions.length > 5}
          <span class="inline-flex h-7 items-center rounded-pill bg-sunken px-2.5 font-mono text-xs text-ink-muted">
            +{selectedOptions.length - 5}
          </span>
        {/if}
      {/if}
    </div>

    <!-- Dropdown Indicator -->
    <div class="flex shrink-0 items-center gap-2">
      <!-- Clear All Button (when items selected) -->
      {#if selectedOptions.length > 0}
        <span
          role="button"
          tabindex="0"
          class="btn-icon hover:!text-negative"
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
          <CircleX class="size-4" />
        </span>
      {/if}

      <!-- Chevron -->
      <div class="rounded-sm p-1 transition-transform duration-150 {isOpen ? 'rotate-180' : ''}">
        <svg class="size-4 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </button>
</div>

<!-- Tags Selector Modal -->
<Modal bind:isOpen onClose={handleModalClose} maxW="max-w-md">
  <div class="mb-6 flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-tile-violet text-ink-on-dark">
        <Tags class="size-5" />
      </div>
      <div>
        <h2 class="text-title text-ink">Select tags</h2>
        <p class="text-body-sm text-ink-muted">Choose tags to filter your notes</p>
      </div>
    </div>
    <button type="button" onclick={handleModalClose} class="btn-icon" aria-label="Close">
      <X class="size-5" />
    </button>
  </div>

  {#if searchable}
    <div class="mb-4">
      <input
        bind:this={searchInputElement}
        type="text"
        class="input"
        placeholder="Search tags..."
        bind:value={searchQuery}
        onkeydown={handleKeydown}
      />
    </div>
  {/if}

  <div class="max-h-[50vh] overflow-y-auto">
    {#if filteredOptions.length === 0}
      <div class="py-8 text-center text-body-sm text-ink-muted">No tags found</div>
    {:else}
      <div class="flex flex-wrap gap-2">
        {#each filteredOptions as option (option.value)}
          {@const isSelected = selectedValues.includes(option.value)}
          {@const hasColor = !!option.color}
          <button
            type="button"
            onclick={() => selectOption(option)}
            aria-pressed={isSelected}
            class="inline-flex h-8 items-center gap-1.5 rounded-pill px-3 text-code transition-colors {isSelected
              ? 'bg-accent text-ink-on-accent'
              : 'bg-control text-ink hover:bg-control-hover'}"
          >
            {#if isSelected}
              <Check class="size-3.5 shrink-0" />
            {:else}
              <span
                class="size-2 shrink-0 rounded-pill {hasColor ? '' : 'bg-accent'}"
                style={hasColor ? `background-color: ${option.color}` : ''}
                aria-hidden="true"
              ></span>
            {/if}
            {option.label}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <div class="mt-5 flex items-center justify-end gap-3 pt-4">
    <span class="mr-auto font-mono text-xs text-ink-muted">
      {selectedOptions.length} selected
    </span>
    <button type="button" onclick={handleModalClose} class="btn btn-primary">
      {selectedOptions.length > 0 ? 'Done' : 'Skip'}
    </button>
  </div>
</Modal>
