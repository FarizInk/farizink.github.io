<script lang="ts">
  import { Activity, Users, Target, Heart, ChevronLeft, Info } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

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
  let bmiColor = $state('');
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
        bmiColor = 'blue';
        healthRisk = 'May have nutritional deficiency and osteoporosis risk';
      } else if (bmi < 25) {
        bmiCategory = 'Normal Weight';
        bmiColor = 'green';
        healthRisk = 'Low risk of developing health problems';
      } else if (bmi < 30) {
        bmiCategory = 'Overweight';
        bmiColor = 'yellow';
        healthRisk = 'Increased risk of heart disease, diabetes, and high blood pressure';
      } else if (bmi < 35) {
        bmiCategory = 'Obese Class I';
        bmiColor = 'orange';
        healthRisk = 'High risk of cardiovascular disease and diabetes';
      } else if (bmi < 40) {
        bmiCategory = 'Obese Class II';
        bmiColor = 'red';
        healthRisk = 'Very high risk of serious health conditions';
      } else {
        bmiCategory = 'Obese Class III';
        bmiColor = 'red';
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
      bmiColor = '';
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

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<svelte:head>
  <title>BMI Calculator - Developer Tools</title>
  <meta
    name="description"
    content="Calculate BMI, ideal weight, BMR, and daily calorie needs with health insights"
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"
      >
        <Activity class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">BMI Calculator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Calculate your Body Mass Index, ideal weight, and get personalized health insights
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
      <li class="text-gray-900 dark:text-white font-medium">BMI Calculator</li>
    </ol>
  </nav>

  <!-- Unit Selection -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Measurement Units</h2>
        <div class="flex gap-2">
          <button
            class="btn {units === 'metric' ? 'btn-primary' : 'btn-secondary'}"
            onclick={() => switchUnits('metric')}
          >
            Metric
          </button>
          <button
            class="btn {units === 'imperial' ? 'btn-primary' : 'btn-secondary'}"
            onclick={() => switchUnits('imperial')}
          >
            Imperial
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Input Form -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Basic Information -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Users class="w-6 h-6 mr-2" />
            Personal Information
          </h2>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm" onclick={loadExample}>Example</button>
            <button class="btn btn-primary btn-sm" onclick={reset}>Reset</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="height-input"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Height ({units === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              class="input"
              id="height-input"
              type="number"
              bind:value={height}
              placeholder={units === 'metric' ? '170' : '5\'7"'}
            />
          </div>

          <div>
            <label
              for="weight-input"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Weight ({units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              class="input"
              id="weight-input"
              type="number"
              bind:value={weight}
              placeholder={units === 'metric' ? '70' : '154'}
            />
          </div>

          <input class="input" id="age-input" type="number" bind:value={age} placeholder="30" />

          <div>
            <fieldset>
              <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </legend>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    bind:group={gender}
                    value="male"
                    class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Male</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    bind:group={gender}
                    value="female"
                    class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Female</span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="mt-6">
          <label
            for="activity-level-select"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Activity Level
          </label>
          <select
            id="activity-level-select"
            bind:value={activityLevel}
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {#each activityLevels as level (level.value)}
              <option value={level.value}>{level.label} - {level.description}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- BMI Result -->
      {#if bmi > 0}
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity class="w-6 h-6 mr-2" />
            Your BMI Results
          </h2>

          <!-- BMI Value and Category -->
          <div class="text-center mb-8">
            <div
              class="inline-block p-6 bg-{bmiColor}-50 dark:bg-{bmiColor}-900/20 rounded-lg border-2 border-{bmiColor}-200 dark:border-{bmiColor}-800"
            >
              <p class="text-5xl font-bold text-{bmiColor}-700 dark:text-{bmiColor}-300 mb-2">
                {bmi.toFixed(1)}
              </p>
              <p class="text-lg font-medium text-{bmiColor}-600 dark:text-{bmiColor}-400">
                {bmiCategory}
              </p>
            </div>
          </div>

          <!-- BMI Visual Scale -->
          <div class="mb-8">
            <div class="relative">
              <div
                class="h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full relative"
              >
                <div
                  class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300"
                  style="left: {getBMIProgressWidth()}%"
                ></div>
              </div>
              <div class="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
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
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div class="flex items-start">
              <Info class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" />
              <div>
                <p class="font-medium text-gray-900 dark:text-white mb-1">Health Risk Assessment</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{healthRisk}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Ideal Weight -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target class="w-5 h-5 mr-2" />
              Ideal Weight Range
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Minimum:</span>
                <span class="font-medium text-gray-900 dark:text-white"
                  >{formatWeight(idealWeight.min)}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Maximum:</span>
                <span class="font-medium text-gray-900 dark:text-white"
                  >{formatWeight(idealWeight.max)}</span
                >
              </div>
              {#if units === 'imperial' && height}
                <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    For height: {height} inches ({(parseFloat(height) / 12).toFixed(1)} ft)
                  </p>
                </div>
              {/if}
            </div>
          </div>

          <!-- Metabolic Information -->
          {#if bmr > 0}
            <div
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"
              >
                <Heart class="w-5 h-5 mr-2" />
                Metabolic Information
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">BMR:</span>
                  <span class="font-medium text-gray-900 dark:text-white"
                    >{Math.round(bmr)} calories/day</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Daily Calories:</span>
                  <span class="font-medium text-gray-900 dark:text-white"
                    >{formatCalories(dailyCalories)}</span
                  >
                </div>
                {#if bodyFatEstimate}
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Est. Body Fat:</span>
                    <span class="font-medium text-gray-900 dark:text-white"
                      >{Math.max(0, bodyFatEstimate).toFixed(1)}%</span
                    >
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- BMI Categories -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">BMI Categories</h3>
        <div class="space-y-3">
          <div
            class="flex items-center justify-between p-2 rounded bg-primary-100 dark:bg-primary-900/20"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Underweight</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-900/20"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Normal</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">18.5 - 24.9</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-900/20"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Overweight</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">25 - 29.9</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-900/20">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Obese</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">≥ 30</span>
          </div>
        </div>
      </div>

      <!-- Health Tips -->
      {#if bmi > 0 && getHealthTips().length > 0}
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h3>
          <div class="space-y-3">
            {#each getHealthTips() as tip (tip)}
              <div class="flex items-start">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{tip}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Important Notes -->
      <div
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
      >
        <div class="flex items-start">
          <Info class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
          <div>
            <h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3>
            <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• BMI is a screening tool, not a diagnostic tool</li>
              <li>• It doesn't account for muscle mass or body composition</li>
              <li>• Athletes may have high BMI but low body fat</li>
              <li>• Consult healthcare providers for medical advice</li>
              <li>• Children and teens use different BMI charts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
