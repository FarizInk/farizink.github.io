<script lang="ts">
  import {
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
    Users,
    CircleAlert
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';

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
    toast.success(`Loaded ${preset.name} preset`);
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
    toast.success('Cleared all');
  }

  // Copy result
  function copyResult() {
    if (selectedItem && selectedItem.items) {
      const text = selectedItem.items.map((item: PickerItem) => item.text).join(', ');
      navigator.clipboard.writeText(text);
    } else if (selectedItem) {
      navigator.clipboard.writeText(selectedItem.text);
    }
    toast.success('Copied to clipboard');
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
    toast.success('Loaded from history');
  }

  // Calculate total weight
  const totalWeight = $derived(
    items.reduce((sum, item) => sum + (parseFloat(String(item.weight)) || 1), 0)
  );
</script>

<ToolLayout
  title="Random Picker"
  description="Fairly randomize items from a list with customizable options."
  icon={Shuffle}
  color="warning"
>
  <!-- Presets -->
  <div class="tool-card">
    <h2 class="section-title">Quick presets</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {#each presets as preset (preset.name)}
        <button onclick={() => loadPreset(preset)} class="preset-btn rounded-md p-3 text-left">
          <preset.icon class="w-5 h-5 text-accent-text mb-2" />
          <div class="text-body-sm font-medium text-ink">{preset.name}</div>
          <div class="font-mono text-xs text-ink-muted">{preset.items.length} items</div>
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Picker -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Items Input -->
      <div class="tool-card">
        <div class="card-header flex-wrap gap-3">
          <h2 class="section-title mb-0 flex items-center gap-2">
            <List class="w-5 h-5 text-accent-text" />
            Items to pick from
          </h2>
          <div class="flex gap-2">
            <button class="btn btn-sm btn-secondary" onclick={addItem}>
              <Plus class="w-4 h-4" />
              Add item
            </button>
            <button class="btn btn-sm btn-ghost" onclick={clearAll}>Clear all</button>
          </div>
        </div>

        <div class="space-y-3">
          {#each items as item (item.id)}
            <div class="flex gap-3">
              <input
                type="text"
                bind:value={item.text}
                placeholder="Enter item name"
                class="tool-input flex-1"
              />

              {#if showWeights}
                <div class="flex items-center gap-1">
                  <label for="weight-{item.id}" class="text-body-sm text-ink-muted">Weight:</label>
                  <input
                    id="weight-{item.id}"
                    type="number" inputmode="decimal"
                    bind:value={item.weight}
                    min="0.1"
                    step="0.1"
                    class="tool-input w-20 text-sm px-2 py-2"
                  />
                </div>
              {/if}

              <button
                onclick={() => removeItem(item.id)}
                class="btn-icon"
                title="Remove item"
                disabled={items.length === 1}
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          {/each}
        </div>

        <div class="mt-4 flex items-center justify-between">
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={showWeights} />
            <span class="checkmark"></span>
            <span class="label-text">Enable weights</span>
          </label>

          {#if showWeights}
            <span class="font-mono text-sm text-ink-muted tabular-nums">
              Total weight: {totalWeight.toFixed(1)}
            </span>
          {/if}
        </div>
      </div>
    </div>

    <!-- Picker Controls -->
    <div class="tool-card">
      <h2 class="section-title">Picker settings</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label for="number-of-picks" class="label">Number of picks</label>
          <input
            id="number-of-picks"
            type="number" inputmode="decimal"
            bind:value={numberOfPicks}
            min="1"
            max={items.filter(item => item.text.trim() !== '').length}
            class="tool-input"
          />
        </div>

        <div>
          <label for="animation-speed" class="label">Animation speed (ms)</label>
          <input
            id="animation-speed"
            type="range"
            bind:value={animationDuration}
            min="500"
            max="5000"
            step="500"
            class="slider w-full"
            style="--p: {((animationDuration - 500) / (5000 - 500)) * 100}%"
          />
          <div class="font-mono text-xs text-ink-muted tabular-nums">
            {animationDuration}ms
          </div>
        </div>
      </div>

      <label class="custom-checkbox mb-6" for="allow-duplicates">
        <input id="allow-duplicates" type="checkbox" bind:checked={allowDuplicates} />
        <span class="checkmark"></span>
        <span class="label-text">Allow duplicates (when picking multiple items)</span>
      </label>

      <button
        class="btn btn-primary w-full"
        onclick={spinPicker}
        disabled={isSpinning || items.filter(item => item.text.trim() !== '').length === 0}
      >
        {#if isSpinning}
          <div class="flex items-center">
            <div class="animate-spin mr-2">
              <Shuffle class="w-5 h-5" />
            </div>
            Picking...
          </div>
        {:else}
          <Shuffle class="w-5 h-5" />
          Pick random item{numberOfPicks > 1 ? 's' : ''}
        {/if}
      </button>

      <!-- Result Display -->
      {#if selectedItem}
        <div class="result-card mt-6">
          <div class="card-header flex-wrap gap-3">
            <h2 class="section-title mb-0 flex items-center gap-2">
              <Gift class="w-5 h-5 text-accent-text" />
              Result
            </h2>
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm" onclick={copyResult}>
                <Copy class="w-4 h-4" />
                Copy
              </button>
              <button class="btn btn-ghost btn-sm" onclick={resetPicker} title="Reset">
                <RotateCcw class="w-4 h-4" />
              </button>
            </div>
          </div>

          {#if selectedItem.type === 'error'}
            <div class="flex items-center justify-center gap-2 p-4 rounded-md bg-negative/15 text-ink">
              <CircleAlert class="w-4 h-4 flex-shrink-0 text-negative" />
              <p class="text-center">
                {selectedItem.text}
              </p>
            </div>
          {:else if selectedItem.type === 'animating'}
            <div class="text-center py-8">
              <div class="inline-block">
                <Dices class="w-16 h-16 text-accent-text" />
              </div>
              <p class="mt-4 font-display text-title text-ink-muted">
                {selectedItem.text}
              </p>
            </div>
          {:else}
            <div class="text-center py-8">
              <div class="inline-block p-6 rounded-md bg-tile-lime text-ink-on-bright">
                <Star class="w-12 h-12 mx-auto mb-3" />
                <h3 class="font-display text-[28px] leading-8 font-bold tracking-tight mb-2">
                  {selectedItem.text}
                </h3>
                {#if selectedItem.items && selectedItem.items.length > 1}
                  <div class="mt-4 space-y-2">
                    {#each selectedItem.items as item (item.text)}
                      <div class="px-3 py-1 bg-card text-ink rounded-pill">
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
    <div class="space-y-4">
      <!-- History -->
      <div class="tool-card">
        <h3 class="section-title">History</h3>

        {#if history.length === 0}
          <p class="text-body-sm text-ink-muted">No picks yet</p>
        {:else}
          <div class="space-y-3 max-h-96 overflow-y-auto">
            {#each history as entry (entry.id)}
              <button onclick={() => loadFromHistory(entry)} class="preset-btn rounded-md w-full text-left">
                <div class="text-body-sm font-medium text-ink">
                  {entry.items.slice(0, 2).join(', ')}
                  {#if entry.items.length > 2}
                    +{entry.items.length - 2} more
                  {/if}
                </div>

                <div class="font-mono text-xs text-ink-muted">
                  {entry.timestamp.toLocaleTimeString()} · {entry.totalItems} total items
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Tips -->
      <div class="rounded-lg p-6 bg-tile-lilac text-ink-on-bright">
        <h3 class="section-title flex items-center gap-2">
          <Zap class="w-5 h-5" />
          Pro tips
        </h3>
        <div class="space-y-3 text-body-sm">
          <div class="flex items-start">
            <div class="w-2 h-2 bg-current rounded-pill mt-1.5 mr-3 flex-shrink-0"></div>
            <p>Use weights to give some items higher chances of being selected</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-current rounded-pill mt-1.5 mr-3 flex-shrink-0"></div>
            <p>Enable multiple picks for selecting more than one item at once</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-current rounded-pill mt-1.5 mr-3 flex-shrink-0"></div>
            <p>History helps you track previous random selections</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-current rounded-pill mt-1.5 mr-3 flex-shrink-0"></div>
            <p>Use presets for quick decision-making scenarios</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</ToolLayout>
