<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, DollarSign, Calculator, Users, Copy } from '@lucide/svelte';

  let billAmount = $state('');
  let tipPercentage = $state(15);
  let numberOfPeople = $state(1);
  let taxAmount = $state('');
  let taxRate = $state(0);
  let includeTax = $state(false);
  let tipAmount = $state(0);
  let totalAmount = $state(0);
  let amountPerPerson = $state(0);

  const tipPresets = [10, 15, 18, 20, 25];

  function calculateTip() {
    let bill = parseFloat(billAmount) || 0;
    let tax = parseFloat(taxAmount) || 0;

    if (includeTax) {
      bill += tax;
    } else if (taxRate > 0) {
      tax = bill * (taxRate / 100);
      bill += tax;
    }

    tipAmount = bill * (tipPercentage / 100);
    totalAmount = bill + tipAmount;
    amountPerPerson = totalAmount / numberOfPeople;
  }

  function updateTaxAmount() {
    const bill = parseFloat(billAmount) || 0;
    taxAmount = (bill * (taxRate / 100)).toFixed(2);
    calculateTip();
  }

  function updateTaxRate() {
    const bill = parseFloat(billAmount) || 0;
    const tax = parseFloat(taxAmount) || 0;
    if (bill > 0) {
      taxRate = Math.round((tax / bill) * 100 * 100) / 100;
    }
    calculateTip();
  }

  function loadSampleBill() {
    billAmount = '125.50';
    tipPercentage = 18;
    numberOfPeople = 4;
    taxAmount = '10.04';
    includeTax = true;
    calculateTip();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function clearAll() {
    billAmount = '';
    tipPercentage = 15;
    numberOfPeople = 1;
    taxAmount = '';
    taxRate = 0;
    includeTax = false;
    tipAmount = 0;
    totalAmount = 0;
    amountPerPerson = 0;
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // React to changes in bill amount or tax amount
  $effect(() => {
    if (billAmount || taxAmount) {
      calculateTip();
    }
  });
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"
      >
        <DollarSign class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tip Calculator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Calculate tips and split bills easily with support for tax and multiple people.
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
      <li class="text-gray-900 dark:text-white font-medium">Tip Calculator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button onclick={loadSampleBill} class="btn btn-primary"> Load Sample Bill </button>
    <button onclick={clearAll} class="btn btn-primary"> Clear All </button>
  </div>

  <!-- Input Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div class="space-y-4">
      <!-- Bill Amount -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <label
          for="bill-amount"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Bill Amount ($)
        </label>
        <input
          id="bill-amount"
          type="number"
          bind:value={billAmount}
          placeholder="0.00"
          step="0.01"
          min="0"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
        />
      </div>

      <!-- Tip Percentage -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <label
          for="tip-percentage"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tip Percentage: {tipPercentage}%
        </label>
        <input
          id="tip-percentage"
          type="range"
          bind:value={tipPercentage}
          min="0"
          max="50"
          step="1"
          class="w-full mb-3"
        />
        <div class="grid grid-cols-5 gap-2">
          {#each tipPresets as preset (preset)}
            <button
              onclick={() => (tipPercentage = preset)}
              class="px-3 py-2 text-sm rounded-lg border transition-colors {tipPercentage === preset
                ? 'bg-primary-100 dark:bg-primary-900/20 border-green-500 text-green-700 dark:text-green-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400'}"
            >
              {preset}%
            </button>
          {/each}
        </div>
      </div>

      <!-- Number of People -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <label
          for="number-people"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Number of People
        </label>
        <div class="flex items-center gap-2">
          <button
            onclick={() => (numberOfPeople = Math.max(1, numberOfPeople - 1))}
            class="btn btn-primary btn-sm"
          >
            -
          </button>
          <input
            id="number-people"
            type="number"
            bind:value={numberOfPeople}
            min="1"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onclick={() => (numberOfPeople = numberOfPeople + 1)}
            class="btn btn-primary btn-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Tax Options -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Options</h3>

        <label class="flex items-center gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            bind:checked={includeTax}
            class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span class="text-sm text-gray-700 dark:text-gray-300">Include tax in total</span>
        </label>

        <div class="space-y-3">
          <div>
            <label
              for="tax-amount"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Tax Amount ($)
            </label>
            <input
              id="tax-amount"
              type="number"
              bind:value={taxAmount}
              placeholder="0.00"
              step="0.01"
              min="0"
              oninput={updateTaxRate}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              for="tax-rate"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Tax Rate (%)
            </label>
            <input
              id="tax-rate"
              type="number"
              bind:value={taxRate}
              placeholder="0.00"
              step="0.1"
              min="0"
              oninput={updateTaxAmount}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Results -->
      <div
        class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Calculation Results
        </h3>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Tip Amount:</span>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold text-gray-900 dark:text-white"
                >${tipAmount.toFixed(2)}</span
              >
              <button
                onclick={() => copyToClipboard(tipAmount.toFixed(2))}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Total Amount:</span>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold text-gray-900 dark:text-white"
                >${totalAmount.toFixed(2)}</span
              >
              <button
                onclick={() => copyToClipboard(totalAmount.toFixed(2))}
                class="btn btn-primary btn-sm"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="pt-3 border-t border-green-200 dark:border-green-800">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Per Person:</span>
              <div class="flex items-center gap-2">
                <span
                  class="text-2xl font-bold text-primary-600 dark:text-primary-400"
                  >${amountPerPerson.toFixed(2)}</span
                >
                <button
                  onclick={() => copyToClipboard(amountPerPerson.toFixed(2))}
                  class="btn btn-primary btn-sm"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Calculator
          class="w-6 h-6 text-primary-600 dark:text-primary-400"
        />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip Calculation</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Calculate tips with customizable percentages and preset options
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Users class="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill Splitting</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Split bills easily among multiple people with fair distribution
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <DollarSign
          class="w-6 h-6 text-primary-600 dark:text-primary-400"
        />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Support</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Include tax calculations by amount or percentage for accurate totals
      </p>
    </div>
  </div>
</div>
