<script lang="ts">
  import { ArrowUpDown, RotateCcw, Copy, Calculator, Ruler, Weight, Thermometer, Volume, Clock, Zap, ChevronLeft } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

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
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800,
      month: 1/2592000,
      year: 1/31536000
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
  let copied = $state(false);
  let showHistory = $state(false);
  let conversionHistory = $state([]);

  // Get units for active category
  const availableUnits = $derived(Object.keys(conversionFactors[activeCategory]));

  // Perform conversion
  $effect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const value = parseFloat(fromValue);
      let result;

      if (activeCategory === 'temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
      } else {
        // Convert to base unit first, then to target unit
        const baseValue = value / conversionFactors[activeCategory][fromUnit];
        result = baseValue * conversionFactors[activeCategory][toUnit];
      }

      toValue = result.toFixed(6).replace(/\.?0+$/, '');
    } else {
      toValue = '';
    }
  });

  function convertTemperature(value, from, to) {
    // First convert to Celsius
    let celsius;
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
    }

    // Then convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
    }
  }

  function swapUnits() {
    const temp = fromUnit;
    fromUnit = toUnit;
    toUnit = temp;

    const tempValue = fromValue;
    fromValue = toValue;
  }

  function copyResult() {
    navigator.clipboard.writeText(toValue).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);

      // Add to history
      addToHistory();
    });
  }

  function addToHistory() {
    const fromLabel = unitLabels[activeCategory][fromUnit];
    const toLabel = unitLabels[activeCategory][toUnit];

    conversionHistory = [{
      from: `${fromValue} ${fromLabel}`,
      to: `${toValue} ${toLabel}`,
      category: activeCategory,
      timestamp: new Date()
    }, ...conversionHistory.slice(0, 9)]; // Keep last 10
  }

  function loadHistoryItem(item) {
    fromValue = item.from.split(' ')[0];
    toValue = item.to.split(' ')[0];
    activeCategory = item.category;

    // Set the units based on the category
    const units = Object.keys(conversionFactors[item.category]);
    fromUnit = units[0];
    toUnit = units[1];
  }

  function clearHistory() {
    conversionHistory = [];
  }

  function reset() {
    fromValue = '1';
    toValue = '';
    const units = Object.keys(conversionFactors[activeCategory]);
    fromUnit = units[0];
    toUnit = units[1];
  }

  function getCategoryColor(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'blue';
  }

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<svelte:head>
  <title>Unit Converter - Developer Tools</title>
  <meta name="description" content="Convert between different units of measurement including length, weight, temperature, volume, time, and speed" />
</svelte:head>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"
      >
        <Calculator class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Unit Converter
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between different units of measurement with precision
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

  <!-- Category Selection -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {#each categories as category (category.id)}
          <button
            onclick={() => {
              activeCategory = category.id;
              reset();
            }}
            class="p-4 rounded-lg border-2 transition-all {
              activeCategory === category.id
                ? `border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-900/20`
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }"
          >
            <category.icon class="w-6 h-6 mx-auto mb-2 text-{category.color}-600 dark:text-{category.color}-400" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Converter -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Converter Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Calculator class="w-5 h-5 mr-2" />
          Convert {categories.find(c => c.id === activeCategory)?.name}
        </h2>

        <div class="space-y-6">
          <!-- From Unit -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="number"
                bind:value={fromValue}
                placeholder="Enter value"
                class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              <select
                bind:value={fromUnit}
                class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {#each availableUnits as unit}
                  <option value={unit}>{unitLabels[activeCategory][unit]}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Swap Button -->
          <div class="flex justify-center">
            <button
              onclick={swapUnits}
              class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowUpDown class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <!-- To Unit -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="relative">
                <input
                  type="text"
                  bind:value={toValue}
                  readonly
                  placeholder="Result"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-medium"
                />
                <button
                  onclick={copyResult}
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Copy result"
                >
                  {#if copied}
                    <div class="text-green-600 dark:text-green-400 text-xs">Copied!</div>
                  {:else}
                    <Copy class="w-4 h-4" />
                  {/if}
                </button>
              </div>
              <select
                bind:value={toUnit}
                class="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {#each availableUnits as unit}
                  <option value={unit}>{unitLabels[activeCategory][unit]}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Formula Information (for temperature) -->
          {#if activeCategory === 'temperature'}
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Conversion Formulas</h3>
              <div class="space-y-1 text-xs text-blue-700 dark:text-blue-300">
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
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {#if activeCategory === 'length'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 inch = 2.54 cm</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 foot = 12 inches</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 mile = 1.609 km</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 yard = 0.914 m</p>
            </div>
          {:else if activeCategory === 'weight'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 kg = 2.205 lbs</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 lb = 16 oz</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 ton = 1000 kg</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 stone = 14 lbs</p>
            </div>
          {:else if activeCategory === 'volume'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 gallon = 3.785 L</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 L = 1000 mL</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 cup = 236.6 mL</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 quart = 2 pints</p>
            </div>
          {:else if activeCategory === 'time'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 minute = 60 seconds</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 hour = 60 minutes</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 day = 24 hours</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 week = 7 days</p>
            </div>
          {:else if activeCategory === 'speed'}
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">100 km/h = 27.78 m/s</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">60 mph = 96.56 km/h</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">1 knot = 1.852 km/h</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
              <p class="font-medium text-gray-900 dark:text-white">Mach 1 = 343 m/s</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
        <div class="space-y-3">
          <button
            onclick={reset}
            class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <RotateCcw class="w-4 h-4 mr-2" />
            Reset
          </button>
          <button
            onclick={() => showHistory = !showHistory}
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Clock class="w-4 h-4 mr-2" />
            {showHistory ? 'Hide' : 'Show'} History
          </button>
        </div>
      </div>

      <!-- Conversion History -->
      {#if showHistory}
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">History</h3>
            {#if conversionHistory.length > 0}
              <button
                onclick={clearHistory}
                class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                Clear
              </button>
            {/if}
          </div>

          {#if conversionHistory.length === 0}
            <p class="text-gray-500 dark:text-gray-400 text-sm">No conversions yet</p>
          {:else}
            <div class="space-y-2 max-h-96 overflow-y-auto">
              {#each conversionHistory as item (item.timestamp)}
                <button
                  onclick={() => loadHistoryItem(item)}
                  class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
      {/if}
    </div>
  </div>
</div>