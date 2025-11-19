<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import {
    Calculator,
    Ruler,
    Weight,
    Thermometer,
    Volume,
    Clock,
    Zap,
    ArrowUpDown,
    RotateCcw,
    Copy,
    History,
    Trash2,
    ChevronLeft
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  // Type definitions
  type Category = 'length' | 'weight' | 'temperature' | 'volume' | 'time' | 'speed';

  interface HistoryEntry {
    from: string;
    to: string;
    category: string;
    timestamp: Date;
  }

  // Categories
  const categories = [
    { id: 'length', name: 'Length', icon: Ruler, color: 'blue' },
    { id: 'weight', name: 'Weight', icon: Weight, color: 'green' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: 'red' },
    { id: 'volume', name: 'Volume', icon: Volume, color: 'purple' },
    { id: 'time', name: 'Time', icon: Clock, color: 'yellow' },
    { id: 'speed', name: 'Speed', icon: Zap, color: 'orange' }
  ];

  // Conversion factors (relative to base units)
  const conversionFactors = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701,
      nauticalMile: 0.000539957
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      stone: 0.157473
    },
    temperature: {
      // Special handling for temperature
      celsius: 'celsius',
      fahrenheit: 'fahrenheit',
      kelvin: 'kelvin'
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      fluidOunce: 33.814,
      cubicMeter: 0.001
    },
    time: {
      second: 1,
      millisecond: 1000,
      microsecond: 1000000,
      minute: 1 / 60,
      hour: 1 / 3600,
      day: 1 / 86400,
      week: 1 / 604800,
      month: 1 / 2592000,
      year: 1 / 31536000
    },
    speed: {
      meterPerSecond: 1,
      kilometerPerHour: 3.6,
      milePerHour: 2.23694,
      knot: 1.94384,
      footPerSecond: 3.28084,
      mach: 0.00291545
    }
  };

  const unitLabels = {
    length: {
      meter: 'Meter (m)',
      kilometer: 'Kilometer (km)',
      centimeter: 'Centimeter (cm)',
      millimeter: 'Millimeter (mm)',
      mile: 'Mile (mi)',
      yard: 'Yard (yd)',
      foot: 'Foot (ft)',
      inch: 'Inch (in)',
      nauticalMile: 'Nautical Mile (nm)'
    },
    weight: {
      kilogram: 'Kilogram (kg)',
      gram: 'Gram (g)',
      milligram: 'Milligram (mg)',
      pound: 'Pound (lb)',
      ounce: 'Ounce (oz)',
      ton: 'Ton (t)',
      stone: 'Stone (st)'
    },
    temperature: {
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    volume: {
      liter: 'Liter (L)',
      milliliter: 'Milliliter (mL)',
      gallon: 'Gallon (gal)',
      quart: 'Quart (qt)',
      pint: 'Pint (pt)',
      cup: 'Cup (cup)',
      fluidOunce: 'Fluid Ounce (fl oz)',
      cubicMeter: 'Cubic Meter (m³)'
    },
    time: {
      second: 'Second (s)',
      millisecond: 'Millisecond (ms)',
      microsecond: 'Microsecond (μs)',
      minute: 'Minute (min)',
      hour: 'Hour (hr)',
      day: 'Day (d)',
      week: 'Week (wk)',
      month: 'Month (mo)',
      year: 'Year (yr)'
    },
    speed: {
      meterPerSecond: 'Meter/Second (m/s)',
      kilometerPerHour: 'Kilometer/Hour (km/h)',
      milePerHour: 'Mile/Hour (mph)',
      knot: 'Knot (kn)',
      footPerSecond: 'Foot/Second (ft/s)',
      mach: 'Mach'
    }
  };

  // State
  let activeCategory = $state('length');
  let fromValue = $state('1');
  let fromUnit = $state('meter');
  let toUnit = $state('kilometer');
  let toValue = $state('');
  let conversionHistory = $state<HistoryEntry[]>([]);

  // Get units for active category
  const availableUnits = $derived(Object.keys(conversionFactors[activeCategory as Category]));
  const unitOptions = $derived(
    availableUnits.map(unit => ({
      value: unit,
      label: unitLabels[activeCategory as Category][unit as keyof (typeof unitLabels)[Category]]
    }))
  );

  // Perform conversion
  $effect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const value = parseFloat(fromValue);
      let result;

      if (activeCategory === 'temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
      } else {
        // Convert to base unit first, then to target unit
        const factors = conversionFactors[activeCategory as Category] as Record<string, number>;
        const baseValue = value / factors[fromUnit];
        result = baseValue * factors[toUnit];
      }

      toValue = result.toFixed(6).replace(/\.?0+$/, '');
    } else {
      toValue = '';
    }
  });

  function convertTemperature(value: number, from: string, to: string): number {
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = ((value - 32) * 5) / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        throw new Error(`Unknown temperature unit: ${from}`);
    }

    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return (celsius * 9) / 5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        throw new Error(`Unknown temperature unit: ${to}`);
    }
  }

  function swapUnits() {
    const temp = fromUnit;
    fromUnit = toUnit;
    toUnit = temp;

    const tempValue = fromValue;
    fromValue = toValue;
    toValue = tempValue;
  }

  function copyResult() {
    if (!toValue) return;
    navigator.clipboard.writeText(toValue).then(() => {
      toast.success('Copied result to clipboard');
      addToHistory();
    });
  }

  function addToHistory() {
    const labels = unitLabels[activeCategory as Category] as Record<string, string>;
    const fromLabel = labels[fromUnit];
    const toLabel = labels[toUnit];

    // Avoid duplicates at the top
    const entry = {
      from: `${fromValue} ${fromLabel}`,
      to: `${toValue} ${toLabel}`,
      category: activeCategory,
      timestamp: new Date()
    };

    if (
      conversionHistory.length > 0 &&
      conversionHistory[0].from === entry.from &&
      conversionHistory[0].to === entry.to
    ) {
      return;
    }

    conversionHistory = [entry, ...conversionHistory.slice(0, 9)];
  }

  function loadHistoryItem(item: HistoryEntry) {
    fromValue = item.from.split(' ')[0];
    activeCategory = item.category;

    // We can't easily restore exact units from the formatted string,
    // so we just set the category and value. The user can select units.
    // Or we could try to parse it if needed, but this is simpler.
    const units = Object.keys(conversionFactors[item.category as Category]);
    fromUnit = units[0];
    toUnit = units[1];
  }

  function clearHistory() {
    conversionHistory = [];
    toast.success('Cleared history');
  }

  function reset() {
    fromValue = '1';
    toValue = '';
    const units = Object.keys(conversionFactors[activeCategory as Category]);
    fromUnit = units[0];
    toUnit = units[1];
    toast.success('Reset converter');
  }

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <Calculator class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unit Converter</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between different units of measurement with precision.
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
      <li class="text-gray-900 dark:text-white font-medium">Unit Converter</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex justify-center flex-wrap gap-2">
    <button onclick={reset} class="btn btn-primary btn-sm">
      <RotateCcw class="w-4 h-4 mr-2" />
      Reset
    </button>
    <button
      onclick={clearHistory}
      class="btn btn-primary btn-sm text-red-500 hover:text-red-600 hover:border-red-200"
    >
      <Trash2 class="w-4 h-4 mr-2" />
      Clear History
    </button>
  </div>

  <!-- Category Selection -->
  <div class="mb-6 overflow-x-auto pb-2">
    <div class="flex gap-3 min-w-max">
      {#each categories as category (category.id)}
        <button
          onclick={() => {
            activeCategory = category.id;
            reset();
          }}
          class="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 {activeCategory ===
          category.id
            ? `border-[var(--ds-primary-500)] bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]`
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'}"
        >
          <category.icon class="w-4 h-4" />
          <span class="text-sm font-medium">{category.name}</span>
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Converter -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Converter Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Calculator class="w-5 h-5 mr-2 text-[var(--ds-primary-500)]" />
          Convert {categories.find(c => c.id === activeCategory)?.name}
        </h2>

        <div class="space-y-6">
          <!-- From Unit -->
          <div>
            <label
              for="from-value-input"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              From
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                id="from-value-input"
                type="number"
                bind:value={fromValue}
                placeholder="Enter value"
                class="input text-lg"
              />
              <select bind:value={fromUnit} class="select">
                {#each unitOptions as option (option.value)}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Swap Button -->
          <div class="flex justify-center">
            <button onclick={swapUnits} class="btn btn-primary btn-sm rounded-full">
              <ArrowUpDown class="w-5 h-5" />
            </button>
          </div>

          <!-- To Unit -->
          <div>
            <label
              for="to-value-input"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              To
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="relative">
                <input
                  id="to-value-input"
                  type="text"
                  bind:value={toValue}
                  readonly
                  placeholder="Result"
                  class="input text-lg font-medium pr-12"
                />
                <button
                  onclick={copyResult}
                  class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary btn-sm"
                  title="Copy result"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
              <select bind:value={toUnit} class="select">
                {#each unitOptions as option (option.value)}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Formula Information (for temperature) -->
          {#if activeCategory === 'temperature'}
            <div
              class="bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] rounded-xl p-4"
            >
              <h3
                class="text-sm font-medium text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-2"
              >
                Conversion Formulas
              </h3>
              <div
                class="space-y-1 text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
              >
                <p>°C to °F: (°C × 9/5) + 32</p>
                <p>°F to °C: (°F - 32) × 5/9</p>
                <p>°C to K: °C + 273.15</p>
                <p>K to °C: K - 273.15</p>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Quick Reference -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {#if activeCategory === 'length'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 inch = 2.54 cm</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 foot = 12 inches</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 mile = 1.609 km</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 yard = 0.914 m</p>
            </div>
          {:else if activeCategory === 'weight'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 kg = 2.205 lbs</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 lb = 16 oz</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 ton = 1000 kg</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 stone = 14 lbs</p>
            </div>
          {:else if activeCategory === 'volume'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 gallon = 3.785 L</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 L = 1000 mL</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 cup = 236.6 mL</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 quart = 2 pints</p>
            </div>
          {:else if activeCategory === 'time'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 minute = 60 seconds</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 hour = 60 minutes</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 day = 24 hours</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 week = 7 days</p>
            </div>
          {:else if activeCategory === 'speed'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">100 km/h = 27.78 m/s</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">60 mph = 96.56 km/h</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">1 knot = 1.852 km/h</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p class="font-medium text-gray-900 dark:text-white">Mach 1 = 343 m/s</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Conversion History -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">History</h3>
          {#if conversionHistory.length > 0}
            <button
              onclick={clearHistory}
              class="btn btn-primary btn-sm text-red-500 hover:text-red-600"
            >
              Clear
            </button>
          {/if}
        </div>

        {#if conversionHistory.length === 0}
          <div
            class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"
          >
            <History class="w-8 h-8 mb-2 opacity-50" />
            <p class="text-sm">No conversions yet</p>
          </div>
        {:else}
          <div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {#each conversionHistory as item (item.timestamp)}
              <button
                onclick={() => loadHistoryItem(item)}
                class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {item.from}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  → {item.to}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {item.timestamp.toLocaleTimeString()}
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div
        class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
      >
        <Calculator class="w-5 h-5" />
        <h3 class="font-medium">Precision</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        High-precision calculations for accurate results every time
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div
        class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
      >
        <History class="w-5 h-5" />
        <h3 class="font-medium">History</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Automatically saves your recent conversions for quick reference
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div
        class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
      >
        <Zap class="w-5 h-5" />
        <h3 class="font-medium">Fast</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Instant conversion as you type with no page reloads
      </p>
    </div>
  </div>
</div>
