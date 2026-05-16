<script lang="ts">
  import { DollarSign, Calculator, Users, Copy, Sparkles } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';
  import ToolLayout from '../../components/ToolLayout.svelte';

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
    toast.success('Copied to clipboard');
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
    toast.success('Cleared all');
  }

  // React to changes in bill amount or tax amount
  $effect(() => {
    if (billAmount || taxAmount) {
      calculateTip();
    }
  });
</script>

<ToolLayout
  title="Tip Calculator"
  description="Calculate tips, split bills, and handle taxes with ease."
  icon={Calculator}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Calculator class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Tip Calculator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Calculate tips and split bills easily
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button class="btn btn-copy" onclick={loadSampleBill}>
      <Sparkles class="w-4 h-4 mr-2" />
      Load Sample Bill
    </button>
    <button class="btn btn-secondary" onclick={clearAll}>
      Clear All
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bill Details</h3>

      <div class="space-y-4">
        <!-- Bill Amount -->
        <div>
          <label
            for="bill-amount"
            class="label"
            >Bill Amount ($)</label
          >
          <input
            id="bill-amount"
            type="number" inputmode="decimal"
            bind:value={billAmount}
            placeholder="0.00"
            step="0.01"
            min="0"
            class="tool-input text-lg"
          />
        </div>

        <!-- Tip Percentage -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label
              for="tip-slider"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Tip Percentage</label
            >
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {tipPercentage}%
            </span>
          </div>
          <input
            id="tip-slider"
            type="range"
            bind:value={tipPercentage}
            min="0"
            max="50"
            step="1"
            class="slider w-full"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>

          <!-- Preset Buttons -->
          <div class="grid grid-cols-5 gap-2 mt-3">
            {#each tipPresets as preset (preset)}
              <button
                onclick={() => (tipPercentage = preset)}
                class="preset-btn {tipPercentage === preset ? 'active' : ''}"
              >
                {preset}%
              </button>
            {/each}
          </div>
        </div>

        <!-- Number of People -->
        <div>
          <label
            for="number-people"
            class="label"
            >Number of People</label
          >
          <div class="flex items-center gap-2">
            <button
              onclick={() => (numberOfPeople = Math.max(1, numberOfPeople - 1))}
              class="btn btn-secondary btn-sm"
            >
              -
            </button>
            <input
              id="number-people"
              type="number" inputmode="decimal"
              bind:value={numberOfPeople}
              min="1"
              class="inline-input flex-1 text-center"
            />
            <button
              onclick={() => (numberOfPeople = numberOfPeople + 1)}
              class="btn btn-secondary btn-sm"
            >
              +
            </button>
          </div>
        </div>

        <!-- Tax Options -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Tax Options</h3>

          <label class="relative flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              bind:checked={includeTax}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 checked:bg-warning-500 dark:checked:bg-primary-500 checked:border-warning-500 dark:checked:border-primary-500 checked:after:absolute checked:after:left-1.5 checked:after:top-0.5 checked:after:w-1.25 checked:after:h-2.25 checked:after:border-solid checked:after:border-white checked:after:border-r-0 checked:after:border-t-0 checked:after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Include tax in total</span
            >
          </label>

          <div class="space-y-3">
            <div>
              <label
                for="tax-amount"
                class="label"
                >Tax Amount ($)</label
              >
              <input
                id="tax-amount"
                type="number" inputmode="decimal"
                bind:value={taxAmount}
                placeholder="0.00"
                step="0.01"
                min="0"
                oninput={updateTaxRate}
                class="tool-input"
              />
            </div>

            <div>
              <label
                for="tax-rate"
                class="label"
                >Tax Rate (%)</label
              >
              <input
                id="tax-rate"
                type="number" inputmode="decimal"
                bind:value={taxRate}
                placeholder="0.00"
                step="0.1"
                min="0"
                oninput={updateTaxAmount}
                class="tool-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Results</h3>

      <div class="space-y-4">
        <!-- Tip Amount -->
        <div
          class="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
        >
          <span class="text-gray-600 dark:text-gray-400">Tip Amount:</span>
          <div class="flex items-center gap-2">
            <span class="text-xl font-semibold text-gray-900 dark:text-white"
              >${tipAmount.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(tipAmount.toFixed(2))}
              class="btn-icon"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Total Amount -->
        <div
          class="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
        >
          <span class="text-gray-600 dark:text-gray-400">Total Amount:</span>
          <div class="flex items-center gap-2">
            <span class="text-xl font-semibold text-gray-900 dark:text-white"
              >${totalAmount.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(totalAmount.toFixed(2))}
              class="btn-icon"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Per Person -->
        <div
          class="flex items-center justify-between p-4 rounded-lg border-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 border-warning-200 dark:border-primary-800"
        >
          <span class="text-base text-gray-600 dark:text-gray-400">Per Person:</span>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold text-warning-600 dark:text-primary-400"
              >${amountPerPerson.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(amountPerPerson.toFixed(2))}
              class="btn-icon"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Breakdown -->
        {#if numberOfPeople > 1}
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Bill Breakdown
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Bill per person:</span>
                <span class="font-medium text-gray-900 dark:text-white">
                  ${((parseFloat(billAmount) || 0) / numberOfPeople).toFixed(2)}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Tip per person:</span>
                <span class="font-medium text-gray-900 dark:text-white">
                  ${(tipAmount / numberOfPeople).toFixed(2)}
                </span>
              </div>
              <div
                class="flex justify-between font-semibold pt-2 border-t border-gray-200 dark:border-gray-700"
              >
                <span class="text-gray-900 dark:text-white">Total per person:</span>
                <span class="text-warning-600 dark:text-primary-400">
                  ${amountPerPerson.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Calculator class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip Calculation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Calculate tips with customizable percentages and preset options
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Users class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill Splitting</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Split bills easily among multiple people with fair distribution
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <DollarSign class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Support</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Include tax calculations by amount or percentage for accurate totals
      </p>
    </div>
  </div>
</ToolLayout>
