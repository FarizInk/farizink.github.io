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
  <!-- Mode Selection -->
  <div class="tool-card">
    <h3 class="section-title">Choose calculator</h3>
    <div class="flex flex-wrap gap-2">
      {#each modes as mode (mode.id)}
        <button
          onclick={() => {
            activeMode = mode.id;
            resetCurrentMode();
          }}
          class="preset-btn inline-flex items-center gap-2 {activeMode === mode.id ? 'active' : ''}"
          title={mode.description}
        >
          <mode.icon class="w-4 h-4" />
          {mode.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Calculator Content -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Main Calculator -->
    <div class="lg:col-span-2 space-y-4">
      <div class="tool-card">
        <div class="card-header gap-3">
          <div class="min-w-0">
            <h3 class="section-title mb-0 flex items-center gap-2">
              {#each modes as mode (mode.id)}
                {#if mode.id === activeMode}
                  <mode.icon class="w-5 h-5 text-accent-text" />
                  {mode.name}
                {/if}
              {/each}
            </h3>
            {#each modes as mode (mode.id)}
              {#if mode.id === activeMode}
                <p class="text-body-sm text-ink-muted mt-1">{mode.description}</p>
              {/if}
            {/each}
          </div>
          <div class="flex gap-2 shrink-0">
            <button class="btn btn-sm btn-secondary" onclick={() => loadExample(activeMode)}>
              Example
            </button>
            <button
              class="btn btn-sm btn-ghost"
              onclick={resetCurrentMode}
              aria-label="Reset"
              title="Reset"
            >
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Basic Percentage Calculator -->
        {#if activeMode === 'basic'}
          <div class="space-y-6">
            <div>
              <label class="label text-ink">
                What is <input
                  type="number" inputmode="decimal"
                  bind:value={percentage}
                  class="inline-input w-20 mx-2 text-center"
                />% of
                <input
                  type="number" inputmode="decimal"
                  bind:value={number}
                  class="inline-input w-20 mx-2 text-center"
                />?
              </label>
            </div>

            <!-- Quick percentages -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-body-sm text-ink-muted">Quick:</span>
              {#each commonPercentages as percent (percent)}
                <button
                  onclick={() => setPercentage(percent.toString())}
                  class="quick-btn font-mono"
                >
                  {percent}%
                </button>
              {/each}
            </div>

            {#if result}
              <div class="result-card flex items-center justify-between gap-3">
                <div>
                  <p class="text-label text-ink-muted mb-1">Result</p>
                  <p class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums text-ink">
                    {result}
                  </p>
                </div>
                <button
                  onclick={() => copyToClipboard(result)}
                  class="btn-icon"
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                >
                  <Copy class="w-5 h-5" />
                </button>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Increase Calculator -->
        {#if activeMode === 'increase'}
          <div class="space-y-6">
            <div>
              <label class="label text-ink">
                Increase <input
                  type="number" inputmode="decimal"
                  bind:value={originalValue}
                  class="inline-input w-20 mx-2 text-center"
                />
                by
                <input
                  type="number" inputmode="decimal"
                  bind:value={changePercentage}
                  class="inline-input w-20 mx-2 text-center"
                />%
              </label>
            </div>

            {#if changedResult}
              <div class="result-card flex items-center justify-between gap-3">
                <div>
                  <p class="text-label text-ink-muted mb-1">New value</p>
                  <p class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums text-ink">
                    {changedResult}
                  </p>
                  <p class="font-mono text-[13px] leading-5 font-medium mt-1 text-live">
                    ▲ +{(
                      ((parseFloat(changedResult) - parseFloat(originalValue)) /
                        parseFloat(originalValue)) *
                      100
                    ).toFixed(2)}%
                  </p>
                </div>
                <button
                  onclick={() => copyToClipboard(changedResult)}
                  class="btn-icon"
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                >
                  <Copy class="w-5 h-5" />
                </button>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Decrease Calculator -->
        {#if activeMode === 'decrease'}
          <div class="space-y-6">
            <div>
              <label class="label text-ink">
                Decrease <input
                  type="number" inputmode="decimal"
                  bind:value={originalValue}
                  class="inline-input w-20 mx-2 text-center"
                />
                by
                <input
                  type="number" inputmode="decimal"
                  bind:value={changePercentage}
                  class="inline-input w-20 mx-2 text-center"
                />%
              </label>
            </div>

            {#if changedResult}
              <div class="result-card flex items-center justify-between gap-3">
                <div>
                  <p class="text-label text-ink-muted mb-1">New value</p>
                  <p class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums text-ink">
                    {changedResult}
                  </p>
                  <p class="font-mono text-[13px] leading-5 font-medium mt-1 text-negative">
                    ▼ −{(
                      ((parseFloat(originalValue) - parseFloat(changedResult)) /
                        parseFloat(originalValue)) *
                      100
                    ).toFixed(2)}%
                  </p>
                </div>
                <button
                  onclick={() => copyToClipboard(changedResult)}
                  class="btn-icon"
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                >
                  <Copy class="w-5 h-5" />
                </button>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Difference Calculator -->
        {#if activeMode === 'difference'}
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="first-value" class="label">First value</label>
                <input
                  id="first-value"
                  type="number" inputmode="decimal"
                  bind:value={value1}
                  class="tool-input"
                />
              </div>
              <div>
                <label for="second-value" class="label">Second value</label>
                <input
                  id="second-value"
                  type="number" inputmode="decimal"
                  bind:value={value2}
                  class="tool-input"
                />
              </div>
            </div>

            {#if differenceResult}
              <div class="result-card flex items-center justify-between gap-3">
                <div>
                  <p class="text-label text-ink-muted mb-1">Percentage difference</p>
                  <p class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums text-ink">
                    {differenceResult}%
                  </p>
                </div>
                <button
                  onclick={() => copyToClipboard(differenceResult + '%')}
                  class="btn-icon"
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                >
                  <Copy class="w-5 h-5" />
                </button>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Discount Calculator -->
        {#if activeMode === 'discount'}
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="original-price" class="label">Original price</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">$</span>
                  <input
                    id="original-price"
                    type="number" inputmode="decimal"
                    bind:value={originalPrice}
                    class="tool-input pl-8"
                  />
                </div>
              </div>

              <div>
                <label for="discount-percent" class="label">Discount (%)</label>
                <input
                  id="discount-percent"
                  type="number" inputmode="decimal"
                  bind:value={discountPercent}
                  class="tool-input"
                />
              </div>
            </div>

            {#if discountedPrice}
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="result-card flex items-center justify-between gap-3">
                  <div>
                    <p class="text-label text-ink-muted mb-1">Final price</p>
                    <p class="font-display text-2xl font-bold tracking-tight tabular-nums text-ink">
                      {formatCurrency(discountedPrice)}
                    </p>
                  </div>
                  <button
                    onclick={() => copyToClipboard(discountedPrice)}
                    class="btn-icon"
                    aria-label="Copy to clipboard"
                    title="Copy to clipboard"
                  >
                    <Copy class="w-5 h-5" />
                  </button>
                </div>

                <div class="result-card">
                  <p class="text-label text-ink-muted mb-1">You save</p>
                  <p class="font-display text-2xl font-bold tracking-tight tabular-nums text-ink">
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
              <label for="bill-amount" class="label">Bill amount</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">$</span>
                <input
                  id="bill-amount"
                  type="number" inputmode="decimal"
                  bind:value={billAmount}
                  class="tool-input pl-8"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="tip-percentage" class="label">Tip percentage</label>
                <input
                  id="tip-percentage"
                  type="number" inputmode="decimal"
                  bind:value={tipPercentage}
                  class="tool-input"
                />
                <!-- Quick tip percentages -->
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each commonTips as tip (tip)}
                    <button
                      onclick={() => setTipPercentage(tip.toString())}
                      class="quick-btn font-mono"
                    >
                      {tip}%
                    </button>
                  {/each}
                </div>
              </div>
              <div>
                <label for="number-of-people" class="label">Number of people</label>
                <input
                  id="number-of-people"
                  type="number" inputmode="decimal"
                  bind:value={numberOfPeople}
                  min="1"
                  class="tool-input"
                />
              </div>
            </div>

            {#if tipAmount}
              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="result-card">
                    <p class="text-label text-ink-muted mb-1">Tip amount</p>
                    <p class="font-display text-2xl font-bold tracking-tight tabular-nums text-ink">
                      {formatCurrency(tipAmount)}
                    </p>
                  </div>
                  <div class="result-card">
                    <p class="text-label text-ink-muted mb-1">Total with tip</p>
                    <p class="font-display text-2xl font-bold tracking-tight tabular-nums text-ink">
                      {formatCurrency(totalWithTip)}
                    </p>
                  </div>
                </div>

                {#if parseInt(numberOfPeople) > 1}
                  <div class="rounded-md bg-tile-deep text-ink-on-dark p-4 flex items-center justify-between gap-3">
                    <div>
                      <p class="text-label mb-1">Per person</p>
                      <p class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums">
                        {formatCurrency(amountPerPerson)}
                      </p>
                    </div>
                    <button
                      onclick={() => copyToClipboard(amountPerPerson)}
                      class="btn-icon text-current hover:bg-current/10"
                      aria-label="Copy to clipboard"
                      title="Copy to clipboard"
                    >
                      <Copy class="w-5 h-5" />
                    </button>
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
      <div class="tool-card">
        <h3 class="section-title flex items-center gap-2">
          <Calculator class="w-5 h-5 text-accent-text" />
          Formulas
        </h3>

        {#if activeMode === 'basic'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Basic percentage</p>
            <p class="font-mono text-code text-ink-muted">Result = (Percentage × Number) ÷ 100</p>
          </div>
        {:else if activeMode === 'increase'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Increase</p>
            <p class="font-mono text-code text-ink-muted">
              New = Original + (Original × Percentage ÷ 100)
            </p>
          </div>
        {:else if activeMode === 'decrease'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Decrease</p>
            <p class="font-mono text-code text-ink-muted">
              New = Original - (Original × Percentage ÷ 100)
            </p>
          </div>
        {:else if activeMode === 'difference'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Percentage difference</p>
            <p class="font-mono text-code text-ink-muted">
              Diff = |Value2 - Value1| ÷ ((Value1 + Value2) ÷ 2) × 100
            </p>
          </div>
        {:else if activeMode === 'discount'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Discount</p>
            <p class="font-mono text-code text-ink-muted">Final = Price - (Price × Discount ÷ 100)</p>
            <p class="font-mono text-code text-ink-muted">Saved = Price × Discount ÷ 100</p>
          </div>
        {:else if activeMode === 'tip'}
          <div class="space-y-2 text-body-sm">
            <p class="font-medium text-ink">Tip calculator</p>
            <p class="font-mono text-code text-ink-muted">Tip = Bill × Tip ÷ 100</p>
            <p class="font-mono text-code text-ink-muted">Total = Bill + Tip</p>
            <p class="font-mono text-code text-ink-muted">Per Person = Total ÷ Number of People</p>
          </div>
        {/if}
      </div>

      <!-- Tips -->
      <div class="tool-card">
        <h3 class="section-title">Quick tips</h3>
        <div class="space-y-3 text-body-sm text-ink-muted">
          <div class="flex items-start">
            <div class="w-2 h-2 bg-accent rounded-pill mt-1.5 mr-2 flex-shrink-0"></div>
            <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-accent rounded-pill mt-1.5 mr-2 flex-shrink-0"></div>
            <p>For tips, 15-20% is standard in most countries</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-accent rounded-pill mt-1.5 mr-2 flex-shrink-0"></div>
            <p>Percentage difference uses the average of two values as the base</p>
          </div>
          <div class="flex items-start">
            <div class="w-2 h-2 bg-accent rounded-pill mt-1.5 mr-2 flex-shrink-0"></div>
            <p>Double-check discount calculations to avoid errors</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="features-grid mt-4">
    <div class="card">
      <div class="feature-icon">
        <Percent class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Multiple modes</h3>
      <p class="feature-description">
        Six different calculators for all percentage-related needs
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Instant results</h3>
      <p class="feature-description">
        Real-time calculations as you type with no need to press enter
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Quick actions</h3>
      <p class="feature-description">
        Copy results to clipboard and use example values for quick testing
      </p>
    </div>
  </div>
</ToolLayout>
