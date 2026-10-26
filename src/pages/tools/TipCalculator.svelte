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
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary" onclick={loadSampleBill}>
      <Sparkles class="w-4 h-4" />
      Load sample bill
    </button>
    <button class="btn btn-ghost" onclick={clearAll}>
      Clear all
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div class="tool-card">
      <h3 class="section-title">Bill details</h3>

      <div class="space-y-4">
        <!-- Bill Amount -->
        <div>
          <label for="bill-amount" class="label">Bill amount ($)</label>
          <input
            id="bill-amount"
            type="number" inputmode="decimal"
            bind:value={billAmount}
            placeholder="0.00"
            step="0.01"
            min="0"
            class="tool-input font-mono text-lg tabular-nums"
          />
        </div>

        <!-- Tip Percentage -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label for="tip-slider" class="text-body-sm font-medium text-ink-muted">Tip percentage</label>
            <span class="font-mono text-body-sm font-medium text-ink tabular-nums">
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
            style="--p: {((tipPercentage - 0) / (50 - 0)) * 100}%"
          />
          <div class="flex justify-between font-mono text-xs text-ink-muted mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>

          <!-- Preset Buttons -->
          <div class="grid grid-cols-5 gap-2 mt-3">
            {#each tipPresets as preset (preset)}
              <button
                onclick={() => (tipPercentage = preset)}
                class="preset-btn text-center font-mono {tipPercentage === preset ? 'active' : ''}"
              >
                {preset}%
              </button>
            {/each}
          </div>
        </div>

        <!-- Number of People -->
        <div>
          <label for="number-people" class="label">Number of people</label>
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
              class="inline-input flex-1 text-center font-mono tabular-nums"
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
        <div class="pt-4">
          <h3 class="section-title-sm mb-4">Tax options</h3>

          <label class="custom-checkbox mb-4">
            <input type="checkbox" bind:checked={includeTax} />
            <span class="checkmark"></span>
            <span class="label-text">Include tax in total</span>
          </label>

          <div class="space-y-3">
            <div>
              <label for="tax-amount" class="label">Tax amount ($)</label>
              <input
                id="tax-amount"
                type="number" inputmode="decimal"
                bind:value={taxAmount}
                placeholder="0.00"
                step="0.01"
                min="0"
                oninput={updateTaxRate}
                class="tool-input font-mono tabular-nums"
              />
            </div>

            <div>
              <label for="tax-rate" class="label">Tax rate (%)</label>
              <input
                id="tax-rate"
                type="number" inputmode="decimal"
                bind:value={taxRate}
                placeholder="0.00"
                step="0.1"
                min="0"
                oninput={updateTaxAmount}
                class="tool-input font-mono tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="tool-card">
      <h3 class="section-title">Calculation results</h3>

      <div class="space-y-3">
        <!-- Tip Amount -->
        <div class="result-row">
          <span class="result-label">Tip amount</span>
          <div class="flex items-center gap-2">
            <span class="font-display text-xl font-bold text-ink tabular-nums"
              >${tipAmount.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(tipAmount.toFixed(2))}
              class="btn-icon"
              title="Copy tip amount"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Total Amount -->
        <div class="result-row">
          <span class="result-label">Total amount</span>
          <div class="flex items-center gap-2">
            <span class="font-display text-xl font-bold text-ink tabular-nums"
              >${totalAmount.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(totalAmount.toFixed(2))}
              class="btn-icon"
              title="Copy total amount"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Per Person -->
        <div class="flex items-center justify-between p-4 rounded-md bg-tile-lime text-ink-on-bright">
          <span class="text-label">Per person</span>
          <div class="flex items-center gap-2">
            <span class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums"
              >${amountPerPerson.toFixed(2)}</span
            >
            <button
              onclick={() => copyToClipboard(amountPerPerson.toFixed(2))}
              class="btn-icon text-current hover:bg-current/10"
              title="Copy amount per person"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Breakdown -->
        {#if numberOfPeople > 1}
          <div class="info-card">
            <h3 class="section-title-sm mb-3">Bill breakdown</h3>
            <div class="space-y-2 text-body-sm">
              <div class="flex justify-between">
                <span class="text-ink-muted">Bill per person</span>
                <span class="font-mono font-medium text-ink tabular-nums">
                  ${((parseFloat(billAmount) || 0) / numberOfPeople).toFixed(2)}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-ink-muted">Tip per person</span>
                <span class="font-mono font-medium text-ink tabular-nums">
                  ${(tipAmount / numberOfPeople).toFixed(2)}
                </span>
              </div>
              <div class="flex justify-between font-semibold pt-2">
                <span class="text-ink">Total per person</span>
                <span class="font-mono text-accent-text tabular-nums">
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Calculator class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Tip calculation</h3>
      <p class="feature-description">
        Calculate tips with customizable percentages and preset options
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Users class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Bill splitting</h3>
      <p class="feature-description">
        Split bills easily among multiple people with fair distribution
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <DollarSign class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Tax support</h3>
      <p class="feature-description">
        Include tax calculations by amount or percentage for accurate totals
      </p>
    </div>
  </div>
</ToolLayout>
