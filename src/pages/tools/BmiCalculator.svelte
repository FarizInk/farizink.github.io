<script lang="ts">
  import {
    Activity,
    Users,
    Target,
    Heart,
    Info,
    RotateCcw,
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
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'bmi-normal':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'bmi-overweight':
        return 'bg-warning-50 dark:bg-yellow-900/20 border-warning-200 dark:border-yellow-800';
      case 'bmi-obese1':
      case 'bmi-obese2':
      case 'bmi-obese3':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  }

  function getBMITextClass() {
    switch (bmiColorClass) {
      case 'bmi-underweight':
        return 'text-blue-700 dark:text-blue-300';
      case 'bmi-normal':
        return 'text-green-700 dark:text-green-300';
      case 'bmi-overweight':
        return 'text-warning-700 dark:text-warning-300';
      case 'bmi-obese1':
      case 'bmi-obese2':
      case 'bmi-obese3':
        return 'text-red-700 dark:text-red-300';
      default:
        return 'text-green-700 dark:text-green-300';
    }
  }
</script>

<ToolLayout
  title="BMI Calculator"
  description="Calculate your Body Mass Index, ideal weight, and get personalized health insights"
  icon={Activity}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Activity class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">BMI Calculator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Calculate your Body Mass Index and health insights
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Unit Selection -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Measurement Units</h3>
      <div class="flex gap-2">
        <button
          class="btn btn-copy {units === 'metric' ? '' : 'btn-secondary'}"
          onclick={() => switchUnits('metric')}
        >
          Metric
        </button>
        <button
          class="btn btn-copy {units === 'imperial' ? '' : 'btn-secondary'}"
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
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Users class="w-6 h-6 mr-2 text-warning-600 dark:text-primary-400" />
            Personal Information
          </h3>
          <div class="flex gap-2">
            <button
              class="btn btn-copy btn-sm"
              onclick={loadExample}>Example</button
            >
            <button
              class="btn btn-secondary btn-sm"
              onclick={reset}
            >
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="height-input"
              class="label"
            >
              Height ({units === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              class="tool-input"
              id="height-input"
              type="number"
              bind:value={height}
              placeholder={units === 'metric' ? '170' : '67'}
            />
          </div>

          <div>
            <label
              for="weight-input"
              class="label"
            >
              Weight ({units === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              class="tool-input"
              id="weight-input"
              type="number"
              bind:value={weight}
              placeholder={units === 'metric' ? '70' : '154'}
            />
          </div>

          <div>
            <label
              for="age-input"
              class="label">Age</label
            >
            <input
              class="tool-input"
              id="age-input"
              type="number"
              bind:value={age}
              placeholder="30"
            />
          </div>

          <div>
            <fieldset>
              <legend class="label"
                >Gender</legend
              >
              <div class="flex gap-4">
                <label class="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    bind:group={gender}
                    value="male"
                    class="absolute opacity-0 cursor-pointer h-0 w-0"
                  />
                  <span
                    class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 checked:border-warning-500 dark:checked:border-primary-500"
                  ></span>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">Male</span
                  >
                </label>
                <label class="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    bind:group={gender}
                    value="female"
                    class="absolute opacity-0 cursor-pointer h-0 w-0"
                  />
                  <span
                    class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 checked:border-warning-500 dark:checked:border-primary-500"
                  ></span>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
                    >Female</span
                  >
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="mt-6">
          <label
            for="activity-level-select"
            class="label"
            >Activity Level</label
          >
          <select
            id="activity-level-select"
            bind:value={activityLevel}
            class="tool-select"
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
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity class="w-6 h-6 mr-2 text-warning-600 dark:text-primary-400" />
            Your BMI Results
          </h3>

          <!-- BMI Value and Category -->
          <div class="text-center mb-8">
            <div class="inline-block p-6 rounded-xl border-2 {getBMICardClass()}">
              <p class="text-5xl font-bold mb-2 {getBMITextClass()}">{bmi.toFixed(1)}</p>
              <p class="text-lg font-medium {getBMITextClass()}">{bmiCategory}</p>
            </div>
          </div>

          <!-- BMI Visual Scale -->
          <div class="mb-8">
            <div class="relative">
              <div
                class="h-8 rounded-full relative bg-gradient-to-r from-blue-400 via-green-400 to-red-400"
              ></div>
              <div
                class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 bg-gray-900 dark:bg-white border-white dark:border-gray-900"
                style="left: {getBMIProgressWidth()}%; transform: translate(-50%, -50%);"
              ></div>
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
          <div class="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <Info class="w-5 h-5 text-warning-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white mb-1">Health Risk Assessment</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{healthRisk}</p>
            </div>
          </div>
        </div>

        <!-- Detailed Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Ideal Weight -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
              Ideal Weight Range
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Minimum:</span>
                <span class="font-medium text-gray-900 dark:text-white"
                  >{formatWeight(idealWeight.min)}</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Maximum:</span>
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
              class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"
              >
                <Heart class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
                Metabolic Information
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">BMR:</span>
                  <span class="font-medium text-gray-900 dark:text-white"
                    >{Math.round(bmr)} calories/day</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Daily Calories:</span>
                  <span class="font-medium text-gray-900 dark:text-white"
                    >{formatCalories(dailyCalories)}</span
                  >
                </div>
                {#if bodyFatEstimate > 0}
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Est. Body Fat:</span>
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
    <div class="space-y-4">
      <!-- BMI Categories -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">BMI Categories</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-2 rounded bg-blue-50 dark:bg-blue-900/20">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3 bg-blue-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Underweight</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-900/20"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3 bg-green-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Normal</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">18.5 - 24.9</span>
          </div>
          <div
            class="flex items-center justify-between p-2 rounded bg-warning-50 dark:bg-yellow-900/20"
          >
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3 bg-warning-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Overweight</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">25 - 29.9</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-900/20">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3 bg-red-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Obese</span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">≥ 30</span>
          </div>
        </div>
      </div>

      <!-- Health Tips -->
      {#if bmi > 0 && getHealthTips().length > 0}
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h3>
          <div class="space-y-3">
            {#each getHealthTips() as tip (tip)}
              <div class="flex items-start">
                <div
                  class="w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 bg-warning-500 dark:bg-primary-500"
                ></div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{tip}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Important Notes -->
      <div
        class="border rounded-lg p-6 bg-warning-50 dark:bg-yellow-900/20 border-warning-200 dark:border-yellow-800"
      >
        <div class="flex items-start">
          <Info class="w-5 h-5 text-warning-600 dark:text-warning-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3>
            <ul class="text-sm text-warning-700 dark:text-warning-300 space-y-1">
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

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Activity class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accurate BMI</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Calculate Body Mass Index with precision using metric or imperial units
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Heart class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Metabolic Insights</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Get BMR and daily calorie estimates based on your activity level
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Target class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Health Guidance</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Receive personalized health tips and ideal weight recommendations
      </p>
    </div>
  </div>
</ToolLayout>
