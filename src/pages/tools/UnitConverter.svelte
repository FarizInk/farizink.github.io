<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
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
    { id: 'length', name: 'Length', icon: Ruler },
    { id: 'weight', name: 'Weight', icon: Weight },
    { id: 'temperature', name: 'Temperature', icon: Thermometer },
    { id: 'volume', name: 'Volume', icon: Volume },
    { id: 'time', name: 'Time', icon: Clock },
    { id: 'speed', name: 'Speed', icon: Zap }
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
</script>

<ToolLayout
  title="Unit Converter"
  description="Convert between different units of measurement with precision."
  icon={Calculator}
  color="warning"
>
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary" onclick={reset}>
      <RotateCcw class="w-4 h-4" />
      Reset
    </button>
    <button class="btn btn-ghost" onclick={clearHistory}>
      <Trash2 class="w-4 h-4" />
      Clear history
    </button>
  </div>

  <!-- Category Selection -->
  <div class="flex gap-2 overflow-x-auto pb-2">
    {#each categories as category (category.id)}
      <button
        onclick={() => {
          activeCategory = category.id;
          reset();
        }}
        class="preset-btn inline-flex shrink-0 items-center gap-2 {activeCategory === category.id ? 'active' : ''}"
      >
        <category.icon class="w-4 h-4" />
        <span>{category.name}</span>
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Converter -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Converter Card -->
      <div class="tool-card">
        <h2 class="section-title flex items-center gap-2">
          <Calculator class="w-5 h-5 text-accent-text" />
          Convert {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}
        </h2>

        <div class="space-y-6">
          <!-- From Unit -->
          <div>
            <label for="from-value-input" class="label">From</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                id="from-value-input"
                type="number" inputmode="decimal"
                bind:value={fromValue}
                placeholder="Enter value"
                class="tool-input font-mono tabular-nums text-lg"
              />
              <select bind:value={fromUnit} class="tool-select">
                {#each unitOptions as option (option.value)}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Swap Button -->
          <div class="flex justify-center">
            <button
              class="btn-icon bg-control hover:bg-control-hover text-ink"
              onclick={swapUnits}
              aria-label="Swap units"
              title="Swap units"
            >
              <ArrowUpDown class="w-5 h-5" />
            </button>
          </div>

          <!-- To Unit -->
          <div>
            <label for="to-value-input" class="label">To</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="relative">
                <input
                  id="to-value-input"
                  type="text"
                  bind:value={toValue}
                  readonly
                  placeholder="Result"
                  class="tool-input font-display text-xl font-bold tabular-nums pr-14"
                />
                <button
                  onclick={copyResult}
                  class="btn-icon absolute right-1 top-1/2 -translate-y-1/2"
                  title="Copy result"
                  aria-label="Copy result"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
              <select bind:value={toUnit} class="tool-select">
                {#each unitOptions as option (option.value)}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <!-- Formula Information (for temperature) -->
          {#if activeCategory === 'temperature'}
            <div class="info-card">
              <h3 class="text-label text-ink-muted mb-2">Conversion formulas</h3>
              <div class="space-y-1 font-mono text-code text-ink">
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
      <div class="tool-card">
        <h3 class="section-title">Quick reference</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-code text-ink">
          {#if activeCategory === 'length'}
            <div class="result-row"><p>1 inch = 2.54 cm</p></div>
            <div class="result-row"><p>1 foot = 12 inches</p></div>
            <div class="result-row"><p>1 mile = 1.609 km</p></div>
            <div class="result-row"><p>1 yard = 0.914 m</p></div>
          {:else if activeCategory === 'weight'}
            <div class="result-row"><p>1 kg = 2.205 lbs</p></div>
            <div class="result-row"><p>1 lb = 16 oz</p></div>
            <div class="result-row"><p>1 ton = 1000 kg</p></div>
            <div class="result-row"><p>1 stone = 14 lbs</p></div>
          {:else if activeCategory === 'volume'}
            <div class="result-row"><p>1 gallon = 3.785 L</p></div>
            <div class="result-row"><p>1 L = 1000 mL</p></div>
            <div class="result-row"><p>1 cup = 236.6 mL</p></div>
            <div class="result-row"><p>1 quart = 2 pints</p></div>
          {:else if activeCategory === 'time'}
            <div class="result-row"><p>1 minute = 60 seconds</p></div>
            <div class="result-row"><p>1 hour = 60 minutes</p></div>
            <div class="result-row"><p>1 day = 24 hours</p></div>
            <div class="result-row"><p>1 week = 7 days</p></div>
          {:else if activeCategory === 'speed'}
            <div class="result-row"><p>100 km/h = 27.78 m/s</p></div>
            <div class="result-row"><p>60 mph = 96.56 km/h</p></div>
            <div class="result-row"><p>1 knot = 1.852 km/h</p></div>
            <div class="result-row"><p>Mach 1 = 343 m/s</p></div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-4">
      <!-- Conversion History -->
      <div class="tool-card sticky">
        <div class="card-header">
          <h3 class="section-title mb-0">History</h3>
          {#if conversionHistory.length > 0}
            <button class="btn btn-sm btn-ghost">Clear</button>
          {/if}
        </div>

        {#if conversionHistory.length === 0}
          <div class="flex flex-col items-center justify-center py-8 text-ink-muted">
            <History class="w-8 h-8 mb-2 opacity-50" />
            <p class="text-body-sm">No conversions yet</p>
          </div>
        {:else}
          <div class="space-y-2 max-h-[400px] overflow-y-auto">
            {#each conversionHistory as item (item.timestamp)}
              <button
                onclick={() => loadHistoryItem(item)}
                class="w-full text-left rounded-md bg-control px-4 py-3 transition-colors hover:bg-control-hover"
              >
                <div class="font-mono text-code text-ink">
                  {item.from}
                </div>
                <div class="font-mono text-code text-ink-muted">
                  → {item.to}
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="features-grid mt-4">
    <div class="card">
      <div class="feature-icon">
        <Calculator class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Precision</h3>
      <p class="feature-description">
        High-precision calculations for accurate results every time
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <History class="w-5 h-5" />
      </div>
      <h3 class="feature-title">History</h3>
      <p class="feature-description">
        Automatically saves your recent conversions for quick reference
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Fast</h3>
      <p class="feature-description">
        Instant conversion as you type with no page reloads
      </p>
    </div>
  </div>
</ToolLayout>
