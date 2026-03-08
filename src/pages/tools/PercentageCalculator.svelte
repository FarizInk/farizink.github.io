<script lang="ts">
  import {
    Percent,
    Calculator,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Tag,
    Copy,
    RotateCcw,
    Sparkles,
    Zap,
    Check
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Calculator modes
  const modes = [
    {
      id: 'basic',
      name: 'Basic %',
      icon: Percent,
      description: 'Calculate percentage of a number'
    },
    {
      id: 'increase',
      name: 'Increase',
      icon: TrendingUp,
      description: 'Increase number by percentage'
    },
    {
      id: 'decrease',
      name: 'Decrease',
      icon: TrendingDown,
      description: 'Decrease number by percentage'
    },
    {
      id: 'difference',
      name: 'Difference',
      icon: Percent,
      description: 'Percentage difference between numbers'
    },
    {
      id: 'discount',
      name: 'Discount',
      icon: Tag,
      description: 'Calculate discount and final price'
    },
    {
      id: 'tip',
      name: 'Tip Calculator',
      icon: DollarSign,
      description: 'Calculate tip and split bill'
    }
  ];

  // State
  let activeMode = $state('basic');

  // Basic percentage calculator
  let percentage = $state('');
  let number = $state('');
  let result = $state('');

  // Increase/Decrease calculator
  let originalValue = $state('');
  let changePercentage = $state('');
  let changedResult = $state('');

  // Difference calculator
  let value1 = $state('');
  let value2 = $state('');
  let differenceResult = $state('');

  // Discount calculator
  let originalPrice = $state('');
  let discountPercent = $state('');
  let discountedPrice = $state('');
  let savedAmount = $state('');

  // Tip calculator
  let billAmount = $state('');
  let tipPercentage = $state('15');
  let numberOfPeople = $state('1');
  let tipAmount = $state('');
  let totalWithTip = $state('');
  let amountPerPerson = $state('');

  // Common percentages
  const commonPercentages = [5, 10, 15, 20, 25, 50, 75, 100];
  const commonTips = [10, 15, 18, 20, 25];

  // Calculate basic percentage
  $effect(() => {
    if (percentage && number && !isNaN(parseFloat(percentage)) && !isNaN(parseFloat(number))) {
      const percent = parseFloat(percentage) / 100;
      const num = parseFloat(number);
      result = (num * percent).toFixed(2);
    } else {
      result = '';
    }
  });

  // Calculate increase/decrease
  $effect(() => {
    if (
      originalValue &&
      changePercentage &&
      !isNaN(parseFloat(originalValue)) &&
      !isNaN(parseFloat(changePercentage))
    ) {
      const original = parseFloat(originalValue);
      const change = parseFloat(changePercentage) / 100;

      if (activeMode === 'increase') {
        changedResult = (original + original * change).toFixed(2);
      } else if (activeMode === 'decrease') {
        changedResult = (original - original * change).toFixed(2);
      }
    } else {
      changedResult = '';
    }
  });

  // Calculate percentage difference
  $effect(() => {
    if (value1 && value2 && !isNaN(parseFloat(value1)) && !isNaN(parseFloat(value2))) {
      const val1 = parseFloat(value1);
      const val2 = parseFloat(value2);
      const difference = Math.abs(val2 - val1);
      const avg = (val1 + val2) / 2;
      differenceResult = ((difference / avg) * 100).toFixed(2);
    } else {
      differenceResult = '';
    }
  });

  // Calculate discount
  $effect(() => {
    if (
      originalPrice &&
      discountPercent &&
      !isNaN(parseFloat(originalPrice)) &&
      !isNaN(parseFloat(discountPercent))
    ) {
      const price = parseFloat(originalPrice);
      const discount = parseFloat(discountPercent) / 100;
      const saved = price * discount;
      const final = price - saved;

      savedAmount = saved.toFixed(2);
      discountedPrice = final.toFixed(2);
    } else {
      discountedPrice = '';
      savedAmount = '';
    }
  });

  // Calculate tip
  $effect(() => {
    if (
      billAmount &&
      tipPercentage &&
      !isNaN(parseFloat(billAmount)) &&
      !isNaN(parseFloat(tipPercentage))
    ) {
      const bill = parseFloat(billAmount);
      const tip = parseFloat(tipPercentage) / 100;
      const people = parseInt(numberOfPeople) || 1;

      const tipTotal = bill * tip;
      const total = bill + tipTotal;
      const perPerson = total / people;

      tipAmount = tipTotal.toFixed(2);
      totalWithTip = total.toFixed(2);
      amountPerPerson = perPerson.toFixed(2);
    } else {
      tipAmount = '';
      totalWithTip = '';
      amountPerPerson = '';
    }
  });

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function setPercentage(value: string) {
    percentage = value;
  }

  function setTipPercentage(value: string) {
    tipPercentage = value;
  }

  function resetCurrentMode() {
    switch (activeMode) {
      case 'basic':
        percentage = '';
        number = '';
        break;
      case 'increase':
      case 'decrease':
        originalValue = '';
        changePercentage = '';
        break;
      case 'difference':
        value1 = '';
        value2 = '';
        break;
      case 'discount':
        originalPrice = '';
        discountPercent = '';
        break;
      case 'tip':
        billAmount = '';
        tipPercentage = '15';
        numberOfPeople = '1';
        break;
    }
  }

  function loadExample(mode: string) {
    switch (mode) {
      case 'basic':
        percentage = '25';
        number = '200';
        break;
      case 'increase':
        originalValue = '100';
        changePercentage = '20';
        break;
      case 'decrease':
        originalValue = '150';
        changePercentage = '30';
        break;
      case 'difference':
        value1 = '80';
        value2 = '100';
        break;
      case 'discount':
        originalPrice = '50';
        discountPercent = '20';
        break;
      case 'tip':
        billAmount = '85.50';
        tipPercentage = '18';
        numberOfPeople = '3';
        break;
    }
  }

  function formatCurrency(value: string): string {
    if (!value) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(value) || 0);
  }
</script>

<ToolLayout
  title="Percentage Calculator"
  description="Calculate percentages, percentage changes, and ratios with ease."
  icon={Calculator}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Calculator class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Percentage Calculator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Calculate percentages and changes with ease
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mode Selection -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Calculator</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each modes as mode (mode.id)}
        <button
          onclick={() => {
            activeMode = mode.id;
            resetCurrentMode();
          }}
          class="p-4 rounded-xl border-2 transition-all text-left {activeMode === mode.id
            ? 'border-warning-400 dark:border-primary-500 bg-warning-50 dark:bg-primary-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}"
        >
          <mode.icon class="w-6 h-6 mb-2 text-warning-600 dark:text-primary-400" />
          <h3 class="font-medium text-gray-900 dark:text-white mb-1">{mode.name}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{mode.description}</p>
        </button>
      {/each}
    </div>
  </div>

  <!-- Calculator Content -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Calculator -->
    <div class="lg:col-span-2 space-y-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            {#each modes as mode (mode.id)}
              {#if mode.id === activeMode}
                <mode.icon class="w-6 h-6 mr-2 text-warning-600 dark:text-primary-400" />
                {mode.name}
              {/if}
            {/each}
          </h3>
          <div class="flex gap-2">
            <button class="btn btn-sm btn-secondary" onclick={() => loadExample(activeMode)}>
              Example
            </button>
            <button class="btn btn-sm btn-secondary" onclick={resetCurrentMode}>
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Basic Percentage Calculator -->
        {#if activeMode === 'basic'}
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What is <input
                  type="number"
                  bind:value={percentage}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />% of
                <input
                  type="number"
                  bind:value={number}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />?
              </label>
            </div>

            <!-- Quick percentages -->
            <div class="flex flex-wrap gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Quick:</span>
              {#each commonPercentages as percent (percent)}
                <button
                  onclick={() => setPercentage(percent.toString())}
                  class="px-2 py-1 text-xs rounded transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {percent}%
                </button>
              {/each}
            </div>

            {#if result}
              <div
                class="p-4 rounded-lg border-2 bg-warning-50 dark:bg-yellow-900/20 border-warning-200 dark:border-yellow-800"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-warning-600 dark:text-warning-400 mb-1">Result</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{result}</p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(result)}
                    class="btn btn-secondary p-2"
                  >
                    <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Increase Calculator -->
        {#if activeMode === 'increase'}
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Increase <input
                  type="number"
                  bind:value={originalValue}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />
                by
                <input
                  type="number"
                  bind:value={changePercentage}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />%
              </label>
            </div>

            {#if changedResult}
              <div
                class="p-4 rounded-lg border-2 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-green-600 dark:text-green-400 mb-1">New Value</p>
                    <p class="text-2xl font-bold text-green-700 dark:text-green-300">
                      {changedResult}
                    </p>
                    <p class="text-sm mt-1 text-green-600 dark:text-green-400">
                      (+{(
                        ((parseFloat(changedResult) - parseFloat(originalValue)) /
                          parseFloat(originalValue)) *
                        100
                      ).toFixed(2)}%)
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(changedResult)}
                    class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Decrease Calculator -->
        {#if activeMode === 'decrease'}
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Decrease <input
                  type="number"
                  bind:value={originalValue}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />
                by
                <input
                  type="number"
                  bind:value={changePercentage}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all"
                />%
              </label>
            </div>

            {#if changedResult}
              <div
                class="p-4 rounded-lg border-2 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-orange-600 dark:text-orange-400 mb-1">New Value</p>
                    <p class="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {changedResult}
                    </p>
                    <p class="text-sm mt-1 text-orange-600 dark:text-orange-400">
                      (-{(
                        ((parseFloat(originalValue) - parseFloat(changedResult)) /
                          parseFloat(originalValue)) *
                        100
                      ).toFixed(2)}%)
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(changedResult)}
                    class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Difference Calculator -->
        {#if activeMode === 'difference'}
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="first-value"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >First Value</label
                >
                <input
                  id="first-value"
                  type="number"
                  bind:value={value1}
                  class="tool-input"
                />
              </div>
              <div>
                <label
                  for="second-value"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Second Value</label
                >
                <input
                  id="second-value"
                  type="number"
                  bind:value={value2}
                  class="tool-input"
                />
              </div>
            </div>

            {#if differenceResult}
              <div
                class="p-4 rounded-lg border-2 bg-purple-50 dark:bg-primary-900/20 border-purple-200 dark:border-primary-800"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-purple-600 dark:text-primary-400 mb-1">
                      Percentage Difference
                    </p>
                    <p class="text-2xl font-bold text-purple-700 dark:text-primary-300">
                      {differenceResult}%
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(differenceResult + '%')}
                    class="btn btn-secondary p-2"
                  >
                    <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Discount Calculator -->
        {#if activeMode === 'discount'}
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="original-price"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Original Price</label
                >
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="original-price"
                    type="number"
                    bind:value={originalPrice}
                    class="tool-input pl-8"
                  />
                </div>
              </div>

              <div>
                <label
                  for="discount-percent"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Discount (%)</label
                >
                <input
                  id="discount-percent"
                  type="number"
                  bind:value={discountPercent}
                  class="tool-input"
                />
              </div>
            </div>

            {#if discountedPrice}
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="p-4 rounded-lg border-2 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-red-600 dark:text-red-400 mb-1">Final Price</p>
                      <p class="text-2xl font-bold text-red-700 dark:text-red-300">
                        {formatCurrency(discountedPrice)}
                      </p>
                    </div>
                    <button
                      onclick={() => copyToClipboard(discountedPrice)}
                      class="btn btn-secondary p-2"
                    >
                      <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                <div
                  class="p-4 rounded-lg border-2 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                >
                  <p class="text-sm text-green-600 dark:text-green-400 mb-1">You Save</p>
                  <p class="text-2xl font-bold text-green-700 dark:text-green-300">
                    {formatCurrency(savedAmount)}
                  </p>
                </div>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Tip Calculator -->
        {#if activeMode === 'tip'}
          <div class="space-y-6">
            <div>
              <label
                for="bill-amount"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >Bill Amount</label
              >
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="bill-amount"
                  type="number"
                  bind:value={billAmount}
                  class="tool-input pl-8"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="tip-percentage"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Tip Percentage</label
                >
                <input
                  id="tip-percentage"
                  type="number"
                  bind:value={tipPercentage}
                  class="tool-input"
                />
                <!-- Quick tip percentages -->
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each commonTips as tip (tip)}
                    <button
                      onclick={() => setTipPercentage(tip.toString())}
                      class="px-2 py-1 text-xs rounded transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {tip}%
                    </button>
                  {/each}
                </div>
              </div>
              <div>
                <label
                  for="number-of-people"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Number of People</label
                >
                <input
                  id="number-of-people"
                  type="number"
                  bind:value={numberOfPeople}
                  min="1"
                  class="tool-input"
                />
              </div>
            </div>

            {#if tipAmount}
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="p-4 rounded-lg border-2 bg-warning-50 dark:bg-yellow-900/20 border-warning-200 dark:border-yellow-800"
                  >
                    <p class="text-sm text-warning-600 dark:text-warning-400 mb-1">Tip Amount</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(tipAmount)}
                    </p>
                  </div>
                  <div
                    class="p-4 rounded-lg border-2 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  >
                    <p class="text-sm text-green-600 dark:text-green-400 mb-1">Total with Tip</p>
                    <p class="text-2xl font-bold text-green-700 dark:text-green-300">
                      {formatCurrency(totalWithTip)}
                    </p>
                  </div>
                </div>

                {#if parseInt(numberOfPeople) > 1}
                  <div
                    class="p-4 rounded-lg border-2 bg-purple-50 dark:bg-primary-900/20 border-purple-200 dark:border-primary-800"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm text-purple-600 dark:text-primary-400 mb-1">Per Person</p>
                        <p class="text-2xl font-bold text-purple-700 dark:text-primary-300">
                          {formatCurrency(amountPerPerson)}
                        </p>
                      </div>
                      <button
                        onclick={() => copyToClipboard(amountPerPerson)}
                        class="btn btn-secondary p-2"
                      >
                        <Copy class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-4">
      <!-- Formulas -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calculator class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
          Formulas
        </h3>

        {#if activeMode === 'basic'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Basic Percentage</p>
            <p class="text-gray-600 dark:text-gray-400">Result = (Percentage × Number) ÷ 100</p>
          </div>
        {:else if activeMode === 'increase'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Increase</p>
            <p class="text-gray-600 dark:text-gray-400">
              New = Original + (Original × Percentage ÷ 100)
            </p>
          </div>
        {:else if activeMode === 'decrease'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Decrease</p>
            <p class="text-gray-600 dark:text-gray-400">
              New = Original - (Original × Percentage ÷ 100)
            </p>
          </div>
        {:else if activeMode === 'difference'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Percentage Difference</p>
            <p class="text-gray-600 dark:text-gray-400">
              Diff = |Value2 - Value1| ÷ ((Value1 + Value2) ÷ 2) × 100
            </p>
          </div>
        {:else if activeMode === 'discount'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Discount</p>
            <p class="text-gray-600 dark:text-gray-400">Final = Price - (Price × Discount ÷ 100)</p>
            <p class="text-gray-600 dark:text-gray-400">Saved = Price × Discount ÷ 100</p>
          </div>
        {:else if activeMode === 'tip'}
          <div class="space-y-2 text-sm">
            <p class="font-medium text-gray-900 dark:text-white">Tip Calculator</p>
            <p class="text-gray-600 dark:text-gray-400">Tip = Bill × Tip ÷ 100</p>
            <p class="text-gray-600 dark:text-gray-400">Total = Bill + Tip</p>
            <p class="text-gray-600 dark:text-gray-400">Per Person = Total ÷ Number of People</p>
          </div>
        {/if}
      </div>

      <!-- Tips -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start">
            <div
              class="w-2 h-2 bg-warning-500 dark:bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"
            ></div>
            <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p>
          </div>
          <div class="flex items-start">
            <div
              class="w-2 h-2 bg-warning-500 dark:bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"
            ></div>
            <p>For tips, 15-20% is standard in most countries</p>
          </div>
          <div class="flex items-start">
            <div
              class="w-2 h-2 bg-warning-500 dark:bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"
            ></div>
            <p>Percentage difference uses the average of two values as the base</p>
          </div>
          <div class="flex items-start">
            <div
              class="w-2 h-2 bg-warning-500 dark:bg-primary-500 rounded-full mt-1.5 mr-2 flex-shrink-0"
            ></div>
            <p>Double-check discount calculations to avoid errors</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Percent class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Modes</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Six different calculators for all percentage-related needs
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Real-time calculations as you type with no need to press enter
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Actions</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy results to clipboard and use example values for quick testing
      </p>
    </div>
  </div>
</ToolLayout>
