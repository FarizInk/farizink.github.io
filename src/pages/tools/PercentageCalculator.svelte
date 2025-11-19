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
    ChevronLeft
  } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

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

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<svelte:head>
  <title>Percentage Calculator - Developer Tools</title>
  <meta
    name="description"
    content="Calculate percentages, discounts, tips, and percentage differences with ease"
  />
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"
      >
        <Percent class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Percentage Calculator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Calculate percentages, discounts, tips, and more with precision
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
      <li class="text-gray-900 dark:text-white font-medium">Percentage Calculator</li>
    </ol>
  </nav>

  <!-- Mode Selection -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Calculator</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each modes as mode (mode.id)}
          <button
            onclick={() => {
              activeMode = mode.id;
              resetCurrentMode();
            }}
            class="p-4 rounded-lg border-2 transition-all text-left {activeMode === mode.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}"
          >
            <mode.icon class="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
            <h3 class="font-medium text-gray-900 dark:text-white mb-1">{mode.name}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{mode.description}</p>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Calculator Content -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Calculator -->
    <div class="lg:col-span-2">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            {#each modes as mode (mode.id)}
              {#if mode.id === activeMode}
                <mode.icon class="w-6 h-6 mr-2" />
                {mode.name}
              {/if}
            {/each}
          </h2>
          <div class="flex gap-2">
            <button
              onclick={() => loadExample(activeMode)}
              class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Example
            </button>
            <button
              onclick={resetCurrentMode}
              class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
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
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />% of
                <input
                  type="number"
                  bind:value={number}
                  class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />?
              </label>
            </div>

            <!-- Quick percentages -->
            <div class="flex flex-wrap gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Quick:</span>
              {#each commonPercentages as percent (percent)}
                <button
                  onclick={() => setPercentage(percent.toString())}
                  class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {percent}%
                </button>
              {/each}
            </div>

            {#if result}
              <div
                class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Result</p>
                    <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">{result}</p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(result)}
                    class="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <Copy class="w-5 h-5" />
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
                  class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />
                by
                <input
                  type="number"
                  bind:value={changePercentage}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />%
              </label>
            </div>

            {#if changedResult}
              <div
                class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-green-600 dark:text-green-400 mb-1">New Value</p>
                    <p class="text-2xl font-bold text-green-700 dark:text-green-300">
                      {changedResult}
                    </p>
                    <p class="text-sm text-green-600 dark:text-green-400 mt-1">
                      (+{(
                        ((parseFloat(changedResult) - parseFloat(originalValue)) /
                          parseFloat(originalValue)) *
                        100
                      ).toFixed(2)}%)
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(changedResult)}
                    class="p-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                  >
                    <Copy class="w-5 h-5" />
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
                  class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />
                by
                <input
                  type="number"
                  bind:value={changePercentage}
                  class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"
                />%
              </label>
            </div>

            {#if changedResult}
              <div
                class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-orange-600 dark:text-orange-400 mb-1">New Value</p>
                    <p class="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {changedResult}
                    </p>
                    <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">
                      (-{(
                        ((parseFloat(originalValue) - parseFloat(changedResult)) /
                          parseFloat(originalValue)) *
                        100
                      ).toFixed(2)}%)
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(changedResult)}
                    class="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                  >
                    <Copy class="w-5 h-5" />
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
                >
                  First Value
                </label>
                <input
                  id="first-value"
                  type="number"
                  bind:value={value1}
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  for="second-value"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Second Value
                </label>
                <input
                  id="second-value"
                  type="number"
                  bind:value={value2}
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {#if differenceResult}
              <div
                class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">
                      Percentage Difference
                    </p>
                    <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {differenceResult}%
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(differenceResult + '%')}
                    class="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    <Copy class="w-5 h-5" />
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
                >
                  Original Price
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="original-price"
                    type="number"
                    bind:value={originalPrice}
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  for="discount-percent"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Discount (%)
                </label>
                <input
                  id="discount-percent"
                  type="number"
                  bind:value={discountPercent}
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {#if discountedPrice}
              <div class="space-y-4">
                <div
                  class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
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
                      class="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <Copy class="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div
                  class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p class="text-sm text-green-600 dark:text-green-400 mb-1">You Save</p>
                  <p class="text-xl font-bold text-green-700 dark:text-green-300">
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
              >
                Bill Amount
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="bill-amount"
                  type="number"
                  bind:value={billAmount}
                  class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="tip-percentage"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Tip Percentage
                </label>
                <input
                  id="tip-percentage"
                  type="number"
                  bind:value={tipPercentage}
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <!-- Quick tip percentages -->
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each commonTips as tip (tip)}
                    <button
                      onclick={() => setTipPercentage(tip.toString())}
                      class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                >
                  Number of People
                </label>
                <input
                  id="number-of-people"
                  type="number"
                  bind:value={numberOfPeople}
                  min="1"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {#if tipAmount}
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Tip Amount</p>
                    <p class="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {formatCurrency(tipAmount)}
                    </p>
                  </div>
                  <div
                    class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <p class="text-sm text-green-600 dark:text-green-400 mb-1">Total with Tip</p>
                    <p class="text-xl font-bold text-green-700 dark:text-green-300">
                      {formatCurrency(totalWithTip)}
                    </p>
                  </div>
                </div>

                {#if parseInt(numberOfPeople) > 1}
                  <div
                    class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">Per Person</p>
                        <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">
                          {formatCurrency(amountPerPerson)}
                        </p>
                      </div>
                      <button
                        onclick={() => copyToClipboard(amountPerPerson)}
                        class="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        <Copy class="w-5 h-5" />
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
    <div class="space-y-6">
      <!-- Formulas -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calculator class="w-5 h-5 mr-2" />
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
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
            <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
            <p>For tips, 15-20% is standard in most countries</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
            <p>Percentage difference uses the average of two values as the base</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
            <p>Double-check discount calculations to avoid errors</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
