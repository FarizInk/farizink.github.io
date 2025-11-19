<script lang="ts">
  import {
    ChevronLeft,
    Shuffle,
    Plus,
    X,
    Dices,
    RotateCcw,
    Copy,
    List,
    Star,
    Zap,
    Gift,
    Utensils,
    Users
  } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

  // Types
  interface PickerItem {
    id: number;
    text: string;
    weight: number;
  }

  interface SelectedResult {
    text: string;
    type: 'success' | 'error' | 'animating';
    items?: PickerItem[];
  }

  interface HistoryEntry {
    id: number;
    items: string[];
    timestamp: Date;
    totalItems: number;
  }

  interface Preset {
    name: string;
    icon: typeof Dices; // Use the type of a Lucide icon
    items: { text: string; weight: number }[];
  }

  // State
  let items = $state<PickerItem[]>([
    { id: 1, text: '', weight: 1 },
    { id: 2, text: '', weight: 1 },
    { id: 3, text: '', weight: 1 }
  ]);
  let selectedItem = $state<SelectedResult | null>(null);
  let history = $state<HistoryEntry[]>([]);
  let isSpinning = $state(false);
  let numberOfPicks = $state(1);
  let allowDuplicates = $state(false);
  let showWeights = $state(false);
  let animationDuration = $state(2000);

  // Presets
  const presets: Preset[] = [
    {
      name: 'Decision Maker',
      icon: Dices,
      items: [
        { text: 'Yes', weight: 1 },
        { text: 'No', weight: 1 },
        { text: 'Maybe', weight: 1 }
      ]
    },
    {
      name: 'Restaurant Picker',
      icon: Utensils,
      items: [
        { text: 'Pizza', weight: 1 },
        { text: 'Burger', weight: 1 },
        { text: 'Sushi', weight: 1 },
        { text: 'Pasta', weight: 1 },
        { text: 'Thai', weight: 1 }
      ]
    },
    {
      name: 'Team Selector',
      icon: Users,
      items: [
        { text: 'Team A', weight: 1 },
        { text: 'Team B', weight: 1 },
        { text: 'Team C', weight: 1 },
        { text: 'Team D', weight: 1 }
      ]
    },
    {
      name: 'Activity Ideas',
      icon: Zap,
      items: [
        { text: 'Go for a walk', weight: 1 },
        { text: 'Read a book', weight: 1 },
        { text: 'Watch a movie', weight: 1 },
        { text: 'Call a friend', weight: 1 },
        { text: 'Try a new recipe', weight: 1 }
      ]
    }
  ];

  // Add new item
  function addItem() {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    items = [...items, { id: newId, text: '', weight: 1 }];
  }

  // Remove item
  function removeItem(id: number) {
    if (items.length > 1) {
      items = items.filter(item => item.id !== id);
    }
  }

  // Load preset
  function loadPreset(preset: Preset) {
    items = preset.items.map((item, index) => ({
      id: index + 1,
      text: item.text,
      weight: item.weight
    }));
    resetPicker();
  }

  // Random pick function
  function pickRandom(): PickerItem[] {
    const validItems = items.filter(item => item.text.trim() !== '');

    if (validItems.length === 0) {
      return [];
    }

    // Calculate total weight
    const totalWeight = validItems.reduce((sum, item) => sum + item.weight, 0);

    // Pick items
    const results: PickerItem[] = [];
    const availableItems = [...validItems];

    for (let i = 0; i < Math.min(numberOfPicks, availableItems.length); i++) {
      let random = Math.random() * totalWeight;
      let selectedIndex = 0;

      // Weighted selection
      for (let j = 0; j < availableItems.length; j++) {
        random -= availableItems[j].weight;
        if (random <= 0) {
          selectedIndex = j;
          break;
        }
      }

      const selected = availableItems[selectedIndex];
      results.push(selected);

      // Remove if no duplicates allowed
      if (!allowDuplicates) {
        availableItems.splice(selectedIndex, 1);
      }
    }

    return results;
  }

  // Spin animation
  async function spinPicker() {
    const validItems = items.filter(item => item.text.trim() !== '');

    if (validItems.length === 0) {
      selectedItem = { text: 'Please add some items first!', type: 'error' };
      return;
    }

    isSpinning = true;
    selectedItem = null;

    // Create animation effect
    const animationSteps = 20;
    const stepDuration = animationDuration / animationSteps;

    for (let i = 0; i < animationSteps; i++) {
      const tempItem = validItems[Math.floor(Math.random() * validItems.length)];
      selectedItem = { text: tempItem.text, type: 'animating' };

      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    // Final selection
    const results = pickRandom();
    if (results.length === 0) {
      selectedItem = { text: 'Please add some items first!', type: 'error' };
      isSpinning = false;
      return;
    }

    selectedItem = {
      text: results.length === 1 ? results[0].text : `${results.length} items selected`,
      type: 'success',
      items: results
    };

    // Add to history
    const historyEntry: HistoryEntry = {
      id: Date.now(),
      items: results.map(r => r.text),
      timestamp: new Date(),
      totalItems: validItems.length
    };
    history = [historyEntry, ...history.slice(0, 9)]; // Keep last 10

    isSpinning = false;
  }

  // Reset picker
  function resetPicker() {
    selectedItem = null;
    isSpinning = false;
  }

  // Clear all
  function clearAll() {
    items = [{ id: 1, text: '', weight: 1 }];
    selectedItem = null;
    history = [];
    resetPicker();
  }

  // Copy result
  function copyResult() {
    if (selectedItem && selectedItem.items) {
      const text = selectedItem.items.map((item: PickerItem) => item.text).join(', ');
      navigator.clipboard.writeText(text);
    } else if (selectedItem) {
      navigator.clipboard.writeText(selectedItem.text);
    }
  }

  // Load from history
  function loadFromHistory(entry: HistoryEntry) {
    // Convert history items back to picker items
    items = entry.items.map((text, index) => ({
      id: index + 1,
      text: text,
      weight: 1
    }));
    resetPicker();
  }

  // Calculate total weight
  const totalWeight = $derived(
    items.reduce((sum, item) => sum + (parseFloat(String(item.weight)) || 1), 0)
  );
</script>

<svelte:head>
  <title>Random Picker - Developer Tools</title>
  <meta
    name="description"
    content="Random item picker with weighted selections, multiple picks, and history tracking"
  />
</svelte:head>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={() => navigate('/tools')}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <Shuffle class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Random Picker</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Make random selections with weighted options and multiple picks
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a
          href="/"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a
          href="/tools"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">Random Picker</li>
    </ol>
  </nav>

  <!-- Presets -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {#each presets as preset (preset.name)}
          <button
            onclick={() => loadPreset(preset)}
            class="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <preset.icon class="w-5 h-5 text-gray-600 dark:text-gray-400 mb-2" />
            <div class="text-sm font-medium text-gray-900 dark:text-white">{preset.name}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{preset.items.length} items</div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Picker -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Items Input -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <List class="w-5 h-5 mr-2" />
            Items to Pick From
          </h2>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm" onclick={addItem}>
              <Plus class="w-4 h-4 mr-1" />
              Add Item
            </button>
            <button class="btn btn-primary btn-sm" onclick={clearAll}>Clear All</button>
          </div>
        </div>

        <div class="space-y-3">
          {#each items as item (item.id)}
            <div class="flex gap-3">
              <input
                type="text"
                bind:value={item.text}
                placeholder="Enter item name"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"
              />

              {#if showWeights}
                <div class="flex items-center gap-1">
                  <label for="weight-{item.id}" class="text-sm text-gray-600 dark:text-gray-400"
                    >Weight:</label
                  >
                  <input
                    id="weight-{item.id}"
                    type="number"
                    bind:value={item.weight}
                    min="0.1"
                    step="0.1"
                    class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              {/if}

              <button
                onclick={() => removeItem(item.id)}
                class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                disabled={items.length === 1}
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          {/each}
        </div>

        <div class="mt-4 flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              bind:checked={showWeights}
              class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"
            />
            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Weights</span>
          </label>

          {#if showWeights}
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Total Weight: {totalWeight.toFixed(1)}
            </span>
          {/if}
        </div>
      </div>

      <!-- Picker Controls -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Picker Settings</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              for="number-of-picks"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Number of Picks
            </label>
            <input
              id="number-of-picks"
              type="number"
              bind:value={numberOfPicks}
              min="1"
              max={items.filter(item => item.text.trim() !== '').length}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"
            />
          </div>

          <div>
            <label
              for="animation-speed"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Animation Speed (ms)
            </label>
            <input
              id="animation-speed"
              type="range"
              bind:value={animationDuration}
              min="500"
              max="5000"
              step="500"
              class="w-full"
            />
            <div class="text-xs text-gray-500 dark:text-gray-400">{animationDuration}ms</div>
          </div>
        </div>

        <div class="flex items-center mb-6">
          <input
            id="allow-duplicates"
            type="checkbox"
            bind:checked={allowDuplicates}
            class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"
          />
          <label for="allow-duplicates" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Allow Duplicates (when picking multiple items)
          </label>
        </div>

        <button
          class="btn btn-primary w-full"
          onclick={spinPicker}
          disabled={isSpinning || items.filter(item => item.text.trim() !== '').length === 0}
        >
          {#if isSpinning}
            <div class="flex items-center">
              <div class="animate-spin">
                <Shuffle class="w-5 h-5 mr-2" />
              </div>
              Picking...
            </div>
          {:else}
            <Shuffle class="w-5 h-5 mr-2" />
            Pick Random Item{numberOfPicks > 1 ? 's' : ''}
          {/if}
        </button>
      </div>

      <!-- Result Display -->
      {#if selectedItem}
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Gift class="w-5 h-5 mr-2" />
              Result
            </h2>
            <div class="flex gap-2">
              <button class="btn btn-primary btn-sm" onclick={copyResult}>
                <Copy class="w-4 h-4 mr-1" />
                Copy
              </button>
              <button class="btn btn-primary btn-sm" onclick={resetPicker}>
                <RotateCcw class="w-4 h-4" />
              </button>
            </div>
          </div>

          {#if selectedItem.type === 'error'}
            <div
              class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p class="text-red-700 dark:text-red-300 text-center">{selectedItem.text}</p>
            </div>
          {:else if selectedItem.type === 'animating'}
            <div class="text-center py-8">
              <div class="inline-block animate-bounce">
                <Dices
                  class="w-16 h-16 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
                />
              </div>
              <p class="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">{selectedItem.text}</p>
            </div>
          {:else}
            <div class="text-center py-8">
              <div
                class="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-800"
              >
                <Star
                  class="w-12 h-12 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mx-auto mb-3"
                />
                <h3 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                  {selectedItem.text}
                </h3>
                {#if selectedItem.items && selectedItem.items.length > 1}
                  <div class="mt-4 space-y-2">
                    {#each selectedItem.items as item (item.text)}
                      <div
                        class="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-green-200 dark:border-green-700"
                      >
                        {item.text}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- History -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">History</h3>

        {#if history.length === 0}
          <p class="text-gray-500 dark:text-gray-400 text-sm">No picks yet</p>
        {:else}
          <div class="space-y-3 max-h-96 overflow-y-auto">
            {#each history as entry (entry.id)}
              <button
                onclick={() => loadFromHistory(entry)}
                class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {entry.items.slice(0, 2).join(', ')}
                  {#if entry.items.length > 2}
                    +{entry.items.length - 2} more
                  {/if}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {entry.timestamp.toLocaleTimeString()} • {entry.totalItems} total items
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Tips -->
      <div
        class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] p-6"
      >
        <h3
          class="text-lg font-semibold text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-4 flex items-center"
        >
          <Zap class="w-5 h-5 mr-2" />
          Pro Tips
        </h3>
        <div
          class="space-y-3 text-sm text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
        >
          <div class="flex items-start">
            <div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div>
            <p>Use weights to give some items higher chances of being selected</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div>
            <p>Enable multiple picks for selecting more than one item at once</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div>
            <p>History helps you track previous random selections</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div>
            <p>Use presets for quick decision-making scenarios</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
