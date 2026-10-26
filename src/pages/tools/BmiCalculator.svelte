<script lang="ts">
  import {
    Activity,
    Users,
    Target,
    Heart,
    Info,
    RotateCcw,
    CircleCheck,
    TriangleAlert,
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Units state
  let units = $state('metric'); // 'metric' or 'imperial'

  // Input values
  let height = $state('');
  let weight = $state('');
  let age = $state('');
  let gender = $state('male');
  let activityLevel = $state('moderate');

  // Results
  let bmi = $state(0);
  let bmiCategory = $state('');
  let bmiColorClass = $state('');
  let idealWeight = $state({ min: 0, max: 0 });
  let healthRisk = $state('');
  let bmr = $state(0);
  let dailyCalories = $state(0);
  let bodyFatEstimate = $state(0);

  // Activity levels with their multipliers
  const activityLevels = [
    {
      value: 'sedentary',
      label: 'Sedentary',
      multiplier: 1.2,
      description: 'Little or no exercise'
    },
    {
      value: 'light',
      label: 'Lightly Active',
      multiplier: 1.375,
      description: 'Light exercise/sports 1-3 days/week'
    },
    {
      value: 'moderate',
      label: 'Moderately Active',
      multiplier: 1.55,
      description: 'Moderate exercise/sports 3-5 days/week'
    },
    {
      value: 'active',
      label: 'Very Active',
      multiplier: 1.725,
      description: 'Hard exercise/sports 6-7 days a week'
    },
    {
      value: 'extra',
      label: 'Extra Active',
      multiplier: 1.9,
      description: 'Very hard exercise/sports & physical job'
    }
  ];

  // Calculate BMI and related metrics
  $effect(() => {
    if (height && weight && !isNaN(parseFloat(height)) && !isNaN(parseFloat(weight))) {
      let heightInMeters, weightInKg;

      if (units === 'metric') {
        heightInMeters = parseFloat(height) / 100; // Convert cm to meters
        weightInKg = parseFloat(weight);
      } else {
        // Imperial: height in inches, weight in pounds
        heightInMeters = parseFloat(height) * 0.0254; // Convert inches to meters
        weightInKg = parseFloat(weight) * 0.453592; // Convert pounds to kg
      }

      // Calculate BMI
      bmi = weightInKg / (heightInMeters * heightInMeters);

      // Determine BMI category
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        bmiColorClass = 'bmi-underweight';
        healthRisk = 'May have nutritional deficiency and osteoporosis risk';
      } else if (bmi < 25) {
        bmiCategory = 'Normal Weight';
        bmiColorClass = 'bmi-normal';
        healthRisk = 'Low risk of developing health problems';
      } else if (bmi < 30) {
        bmiCategory = 'Overweight';
        bmiColorClass = 'bmi-overweight';
        healthRisk = 'Increased risk of heart disease, diabetes, and high blood pressure';
      } else if (bmi < 35) {
        bmiCategory = 'Obese Class I';
        bmiColorClass = 'bmi-obese1';
        healthRisk = 'High risk of cardiovascular disease and diabetes';
      } else if (bmi < 40) {
        bmiCategory = 'Obese Class II';
        bmiColorClass = 'bmi-obese2';
        healthRisk = 'Very high risk of serious health conditions';
      } else {
        bmiCategory = 'Obese Class III';
        bmiColorClass = 'bmi-obese3';
        healthRisk = 'Extremely high risk of life-threatening health conditions';
      }

      // Calculate ideal weight range (BMI 18.5 - 24.9)
      const minHeightSquared = heightInMeters * heightInMeters;
      idealWeight.min = 18.5 * minHeightSquared;
      idealWeight.max = 24.9 * minHeightSquared;

      // Calculate BMR using Mifflin-St Jeor Equation
      if (age && !isNaN(parseFloat(age))) {
        const ageYears = parseFloat(age);
        if (gender === 'male') {
          bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * ageYears + 5;
        } else {
          bmr = 10 * weightInKg + 6.25 * (heightInMeters * 100) - 5 * ageYears - 161;
        }

        // Calculate daily calories based on activity level
        const activity = activityLevels.find(level => level.value === activityLevel);
        if (activity) {
          dailyCalories = bmr * activity.multiplier;
        }

        // Estimate body fat percentage (simplified formula)
        if (gender === 'male') {
          bodyFatEstimate = 1.2 * bmi + 0.23 * ageYears - 16.2;
        } else {
          bodyFatEstimate = 1.2 * bmi + 0.23 * ageYears - 5.4;
        }
      }
    } else {
      bmi = 0;
      bmiCategory = '';
      bmiColorClass = '';
      idealWeight = { min: 0, max: 0 };
      healthRisk = '';
      bmr = 0;
      dailyCalories = 0;
      bodyFatEstimate = 0;
    }
  });

  function switchUnits(newUnits: string) {
    units = newUnits;
    height = '';
    weight = '';
  }

  function loadExample() {
    units = 'metric';
    height = '175';
    weight = '70';
    age = '30';
    gender = 'male';
    activityLevel = 'moderate';
  }

  function reset() {
    height = '';
    weight = '';
    age = '';
    gender = 'male';
    activityLevel = 'moderate';
  }

  function getBMIProgressWidth() {
    // BMI range: 15 - 40
    if (bmi === 0) return 0;
    const position = ((bmi - 15) / 25) * 100;
    return Math.max(0, Math.min(100, position));
  }

  function formatWeight(value: number): string {
    if (units === 'metric') {
      return `${value.toFixed(1)} kg`;
    } else {
      const pounds = value * 2.20462;
      return `${pounds.toFixed(1)} lbs`;
    }
  }

  function formatCalories(value: number): string {
    return `${Math.round(value)} calories/day`;
  }

  function getHealthTips(): string[] {
    const tips = [];

    if (bmi < 18.5) {
      tips.push('Increase calorie intake with nutrient-dense foods');
      tips.push('Include protein-rich foods to build muscle mass');
      tips.push('Consider strength training exercises');
      tips.push('Consult with a healthcare provider or dietitian');
    } else if (bmi >= 18.5 && bmi < 25) {
      tips.push('Maintain your current healthy lifestyle');
      tips.push('Continue regular physical activity (150 min/week)');
      tips.push('Eat a balanced diet with variety');
      tips.push('Get adequate sleep (7-9 hours per night)');
    } else if (bmi >= 25 && bmi < 30) {
      tips.push('Aim for gradual weight loss (1-2 lbs per week)');
      tips.push('Increase physical activity to 300 min/week');
      tips.push('Focus on portion control and mindful eating');
      tips.push('Reduce processed foods and sugary drinks');
    } else {
      tips.push('Consult healthcare provider for a comprehensive plan');
      tips.push('Start with small, sustainable lifestyle changes');
      tips.push('Consider professional nutritional guidance');
      tips.push('Focus on both diet and exercise modifications');
    }

    return tips;
  }

  function getBMICardClass() {
    switch (bmiColorClass) {
      case 'bmi-underweight':
        return 'bg-tile-lime text-ink-on-bright';
      case 'bmi-normal':
        return 'bg-control text-ink';
      case 'bmi-overweight':
        return 'bg-tile-lilac text-ink-on-bright';
      case 'bmi-obese1':
        return 'bg-tile-violet text-ink-on-dark';
      case 'bmi-obese2':
      case 'bmi-obese3':
        return 'bg-tile-deep text-ink-on-dark';
      default:
        return 'bg-control text-ink';
    }
  }

  function getBMITextClass() {
    switch (bmiColorClass) {
      case 'bmi-normal':
        return 'text-live';
      case 'bmi-obese1':
      case 'bmi-obese2':
      case 'bmi-obese3':
        return 'text-negative';
      default:
        return 'text-ink';
    }
  }

  const isObese = $derived(bmiColorClass.startsWith('bmi-obese'));
</script>

<ToolLayout
  title="BMI Calculator"
  description="Calculate your Body Mass Index, ideal weight, and get personalized health insights"
  icon={Activity}
  color="warning"
>
  <!-- Unit Selection -->
  <div class="tool-card">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="section-title mb-0">Measurement units</h3>
      <div class="mode-toggle">
        <button
          class="mode-btn {units === 'metric' ? 'active' : ''}"
          onclick={() => switchUnits('metric')}
        >
          Metric
        </button>
        <button
          class="mode-btn {units === 'imperial' ? 'active' : ''}"
          onclick={() => switchUnits('imperial')}
        >
          Imperial
        </button>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Input Form -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Basic Information -->
      <div class="tool-card">
        <div class="card-header flex-wrap gap-3">
          <h3 class="section-title mb-0 flex items-center gap-2">
            <Users class="w-5 h-5 text-accent-text" />
            Personal information
          </h3>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm" onclick={loadExample}>Example</button>
            <button class="btn btn-ghost btn-sm" onclick={reset} title="Reset">
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="height-input" class="label">
              Height ({units === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              class="tool-input"
              id="height-input"
              type="number" inputmode="decimal"
              bind:value={height}
              placeholder={units === 'metric' ? '170' : '67'}
            />
          </div>

          <div>
            <label for="weight-input" class="label">
              Weight ({units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              class="tool-input"
              id="weight-input"
              type="number" inputmode="decimal"
              bind:value={weight}
              placeholder={units === 'metric' ? '70' : '154'}
            />
          </div>

          <div>
            <label for="age-input" class="label">Age</label>
            <input
              class="tool-input"
              id="age-input"
              type="number" inputmode="decimal"
              bind:value={age}
              placeholder="30"
            />
          </div>

          <div>
            <fieldset>
              <legend class="label">Gender</legend>
              <div class="flex gap-4 pt-2">
                <label class="custom-radio">
                  <input type="radio" bind:group={gender} value="male" />
                  <span class="radio-dot"></span>
                  <span class="label-text">Male</span>
                </label>
                <label class="custom-radio">
                  <input type="radio" bind:group={gender} value="female" />
                  <span class="radio-dot"></span>
                  <span class="label-text">Female</span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="mt-6">
          <label for="activity-level-select" class="label">Activity level</label>
          <select id="activity-level-select" bind:value={activityLevel} class="tool-select">
            {#each activityLevels as level (level.value)}
              <option value={level.value}>{level.label} - {level.description}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- BMI Result -->
      {#if bmi > 0}
        <div class="tool-card">
          <h3 class="section-title flex items-center gap-2">
            <Activity class="w-5 h-5 text-accent-text" />
            Your BMI results
          </h3>

          <!-- BMI Value and Category -->
          <div class="text-center mb-8">
            <div class="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-md {getBMICardClass()}">
              <span class="text-label">BMI</span>
              <p class="m-0 font-display text-[48px] leading-[52px] font-bold tracking-tight tabular-nums">
                {bmi.toFixed(1)}
              </p>
              <span
                class="inline-flex items-center gap-1.5 rounded-pill bg-card px-3 py-1 text-body-sm font-medium {getBMITextClass()}"
              >
                {#if bmiColorClass === 'bmi-normal'}
                  <CircleCheck class="w-4 h-4" />
                {:else if isObese}
                  <TriangleAlert class="w-4 h-4" />
                {/if}
                {bmiCategory}
              </span>
            </div>
          </div>

          <!-- BMI Visual Scale -->
          <div class="mb-8">
            <div class="relative">
              <div class="h-3 rounded-pill overflow-hidden flex" aria-hidden="true">
                <div class="h-full bg-tile-lime text-ink-on-bright" style="width: 14%;"></div>
                <div class="h-full bg-live/60" style="width: 26%;"></div>
                <div class="h-full bg-tile-lilac text-ink-on-bright" style="width: 20%;"></div>
                <div class="h-full bg-tile-violet text-ink-on-dark" style="width: 40%;"></div>
              </div>
              <div
                class="absolute top-1.5 w-4 h-4 rounded-pill {isObese ? 'bg-negative' : 'bg-ink'}"
                style="left: {getBMIProgressWidth()}%; transform: translate(-50%, -50%);"
              ></div>
              <div class="flex justify-between mt-2 font-mono text-xs text-ink-muted tabular-nums">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40+</span>
              </div>
            </div>
          </div>

          <!-- Health Risk -->
          <div class="info-card flex items-start">
            <Info class="w-5 h-5 text-accent-text mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p class="font-medium text-ink mb-1">Health risk assessment</p>
              <p class="text-body-sm text-ink-muted">{healthRisk}</p>
            </div>
          </div>
        </div>

        <!-- Detailed Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Ideal Weight -->
          <div class="tool-card">
            <h3 class="section-title flex items-center gap-2">
              <Target class="w-5 h-5 text-accent-text" />
              Ideal weight range
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="result-label">Minimum:</span>
                <span class="result-value">{formatWeight(idealWeight.min)}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="result-label">Maximum:</span>
                <span class="result-value">{formatWeight(idealWeight.max)}</span>
              </div>
              {#if units === 'imperial' && height}
                <div class="pt-2">
                  <p class="text-body-sm text-ink-muted">
                    For height: {height} inches ({(parseFloat(height) / 12).toFixed(1)} ft)
                  </p>
                </div>
              {/if}
            </div>
          </div>

          <!-- Metabolic Information -->
          {#if bmr > 0}
            <div class="tool-card">
              <h3 class="section-title flex items-center gap-2">
                <Heart class="w-5 h-5 text-accent-text" />
                Metabolic information
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="result-label">BMR:</span>
                  <span class="result-value">{Math.round(bmr)} calories/day</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="result-label">Daily calories:</span>
                  <span class="result-value">{formatCalories(dailyCalories)}</span>
                </div>
                {#if bodyFatEstimate > 0}
                  <div class="flex justify-between items-center">
                    <span class="result-label">Est. body fat:</span>
                    <span class="result-value">{Math.max(0, bodyFatEstimate).toFixed(1)}%</span>
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
      <!-- BMI Categories -->
      <div class="tool-card">
        <h3 class="section-title">BMI categories</h3>
        <div class="space-y-2">
          <div class="flex items-center justify-between px-3 py-2 rounded-md bg-tile-lime text-ink-on-bright">
            <span class="text-body-sm font-medium">Underweight</span>
            <span class="font-mono text-sm tabular-nums">&lt; 18.5</span>
          </div>
          <div class="flex items-center justify-between px-3 py-2 rounded-md bg-control text-ink">
            <span class="flex items-center gap-2 text-body-sm font-medium">
              <CircleCheck class="w-4 h-4 text-live" />
              Normal
            </span>
            <span class="font-mono text-sm tabular-nums">18.5 - 24.9</span>
          </div>
          <div class="flex items-center justify-between px-3 py-2 rounded-md bg-tile-lilac text-ink-on-bright">
            <span class="text-body-sm font-medium">Overweight</span>
            <span class="font-mono text-sm tabular-nums">25 - 29.9</span>
          </div>
          <div class="flex items-center justify-between px-3 py-2 rounded-md bg-tile-violet text-ink-on-dark">
            <span class="flex items-center gap-2 text-body-sm font-medium">
              <TriangleAlert class="w-4 h-4" />
              Obese
            </span>
            <span class="font-mono text-sm tabular-nums">≥ 30</span>
          </div>
        </div>
      </div>

      <!-- Health Tips -->
      {#if bmi > 0 && getHealthTips().length > 0}
        <div class="tool-card">
          <h3 class="section-title">Health tips</h3>
          <div class="space-y-3">
            {#each getHealthTips() as tip (tip)}
              <div class="flex items-start">
                <div class="w-2 h-2 rounded-pill mt-1.5 mr-3 flex-shrink-0 bg-accent"></div>
                <p class="text-body-sm text-ink-muted">{tip}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Important Notes -->
      <div class="rounded-lg p-6 bg-tile-lilac text-ink-on-bright">
        <div class="flex items-start">
          <Info class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 class="section-title-sm">Important notes</h3>
            <ul class="text-body-sm list-disc pl-4 space-y-1">
              <li>BMI is a screening tool, not a diagnostic tool</li>
              <li>It doesn't account for muscle mass or body composition</li>
              <li>Athletes may have high BMI but low body fat</li>
              <li>Consult healthcare providers for medical advice</li>
              <li>Children and teens use different BMI charts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="features-grid">
    <div class="card">
      <div class="feature-icon"><Activity class="w-5 h-5" /></div>
      <h3 class="feature-title">Accurate BMI</h3>
      <p class="feature-description">
        Calculate Body Mass Index with precision using metric or imperial units
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Heart class="w-5 h-5" /></div>
      <h3 class="feature-title">Metabolic insights</h3>
      <p class="feature-description">
        Get BMR and daily calorie estimates based on your activity level
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Target class="w-5 h-5" /></div>
      <h3 class="feature-title">Health guidance</h3>
      <p class="feature-description">
        Receive personalized health tips and ideal weight recommendations
      </p>
    </div>
  </div>
</ToolLayout>
