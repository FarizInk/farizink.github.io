<script lang="ts">
  import { ChevronLeft, Calendar, Clock, Gift, Heart, Star, RotateCcw, Copy } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

  // Input state
  let birthDate = $state('');
  let currentDate = $state('');
  let calculationMode = $state('exact'); // 'exact' or 'difference'

  // Results
  let years = $state(0);
  let months = $state(0);
  let days = $state(0);
  let totalDays = $state(0);
  let totalWeeks = $state(0);
  let totalMonths = $state(0);
  let totalHours = $state(0);
  let totalMinutes = $state(0);
  let totalSeconds = $state(0);

  // Additional info
  let nextBirthday = $state('');
  let daysUntilNextBirthday = $state(0);
  let zodiacSign = $state('');
  let chineseZodiac = $state('');
  let birthDayOfWeek = $state('');
  let ageInMilliseconds = $state(0);
  let isBirthdayToday = $state(false);
  let isLeapYear = $state(false);

  // Timer for countdown
  let countdownInterval: ReturnType<typeof setInterval> | null = null;

  // Countdown timer
  let countdownTime = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Zodiac signs data
  const zodiacSigns = [
    { name: 'Aries', dates: 'Mar 21 - Apr 19', symbol: '♈', element: 'Fire' },
    { name: 'Taurus', dates: 'Apr 20 - May 20', symbol: '♉', element: 'Earth' },
    { name: 'Gemini', dates: 'May 21 - Jun 20', symbol: '♊', element: 'Air' },
    { name: 'Cancer', dates: 'Jun 21 - Jul 22', symbol: '♋', element: 'Water' },
    { name: 'Leo', dates: 'Jul 23 - Aug 22', symbol: '♌', element: 'Fire' },
    { name: 'Virgo', dates: 'Aug 23 - Sep 22', symbol: '♍', element: 'Earth' },
    { name: 'Libra', dates: 'Sep 23 - Oct 22', symbol: '♎', element: 'Air' },
    { name: 'Scorpio', dates: 'Oct 23 - Nov 21', symbol: '♏', element: 'Water' },
    { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', symbol: '♐', element: 'Fire' },
    { name: 'Capricorn', dates: 'Dec 22 - Jan 19', symbol: '♑', element: 'Earth' },
    { name: 'Aquarius', dates: 'Jan 20 - Feb 18', symbol: '♒', element: 'Air' },
    { name: 'Pisces', dates: 'Feb 19 - Mar 20', symbol: '♓', element: 'Water' }
  ];

  // Set current date as default
  $effect(() => {
    if (!currentDate) {
      const today = new Date();
      currentDate = today.toISOString().split('T')[0];
    }
  });

  // Calculate age and related information
  $effect(() => {
    if (birthDate && currentDate) {
      const birth = new Date(birthDate);
      const current = new Date(currentDate);

      if (birth > current) {
        resetResults();
        return;
      }

      if (calculationMode === 'exact') {
        calculateExactAge(birth, current);
      } else {
        calculateDifference(birth, current);
      }

      calculateAdditionalInfo(birth, current);
    } else {
      resetResults();
    }
  });

  // Countdown timer effect
  $effect(() => {
    if (isBirthdayToday && nextBirthday) {
      // Update every second for live countdown
      countdownInterval = setInterval(updateCountdown, 1000);
    } else {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  });

  function calculateExactAge(birth: Date, current: Date) {
    // Calculate exact years, months, days
    let yearDiff = current.getFullYear() - birth.getFullYear();
    let monthDiff = current.getMonth() - birth.getMonth();
    let dayDiff = current.getDate() - birth.getDate();

    if (dayDiff < 0) {
      monthDiff--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      dayDiff += lastMonth.getDate();
    }

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    years = yearDiff;
    months = monthDiff;
    days = dayDiff;

    // Calculate totals
    const totalMilliseconds = current.getTime() - birth.getTime();
    ageInMilliseconds = totalMilliseconds;
    totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    totalWeeks = Math.floor(totalDays / 7);
    totalMonths = Math.floor(totalDays / 30.44); // Average month length
    totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
    totalSeconds = Math.floor(totalMilliseconds / 1000);
  }

  function calculateDifference(birth: Date, current: Date) {
    const totalMilliseconds = current.getTime() - birth.getTime();
    ageInMilliseconds = totalMilliseconds;

    totalSeconds = Math.floor(totalMilliseconds / 1000);
    totalMinutes = Math.floor(totalSeconds / 60);
    totalHours = Math.floor(totalMinutes / 60);
    totalDays = Math.floor(totalHours / 24);
    totalWeeks = Math.floor(totalDays / 7);
    totalMonths = Math.floor(totalDays / 30.44);
    years = Math.floor(totalDays / 365.25);

    // Calculate remaining components
    const remainingDays = totalDays % 365.25;
    months = Math.floor(remainingDays / 30.44);
    days = Math.floor(remainingDays % 30.44);
  }

  function calculateAdditionalInfo(birth: Date, current: Date) {
    // Next birthday
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const nextBday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < current) {
      nextBday.setFullYear(current.getFullYear() + 1);
    }
    nextBirthday = nextBday.toISOString().split('T')[0];

    const timeUntilNext = nextBday.getTime() - current.getTime();
    daysUntilNextBirthday = Math.ceil(timeUntilNext / (1000 * 60 * 60 * 24));

    // Check if birthday is today
    isBirthdayToday =
      birth.getDate() === current.getDate() && birth.getMonth() === current.getMonth();

    // Zodiac sign
    zodiacSign = getZodiacSign(birth);

    // Chinese zodiac
    chineseZodiac = getChineseZodiac(birth.getFullYear());

    // Day of week
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    birthDayOfWeek = daysOfWeek[birth.getDay()];

    // Check if leap year
    isLeapYear = isLeapYearCheck(birth.getFullYear());
  }

  function getZodiacSign(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

    return '';
  }

  function getChineseZodiac(year: number): string {
    const chineseZodiacSigns = [
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
      'Dog',
      'Pig'
    ];
    return chineseZodiacSigns[(year - 4) % 12];
  }

  function isLeapYearCheck(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function updateCountdown() {
    if (isBirthdayToday && nextBirthday) {
      const now = new Date();
      // eslint-disable-next-line svelte/prefer-svelte-reactivity
      const next = new Date(nextBirthday);
      next.setFullYear(now.getFullYear() + 1); // Next year's birthday

      const diff = next.getTime() - now.getTime();

      countdownTime.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      countdownTime.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      countdownTime.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      countdownTime.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }

  function resetResults() {
    years = 0;
    months = 0;
    days = 0;
    totalDays = 0;
    totalWeeks = 0;
    totalMonths = 0;
    totalHours = 0;
    totalMinutes = 0;
    totalSeconds = 0;
    nextBirthday = '';
    daysUntilNextBirthday = 0;
    zodiacSign = '';
    chineseZodiac = '';
    birthDayOfWeek = '';
    ageInMilliseconds = 0;
    isBirthdayToday = false;
    isLeapYear = false;
    countdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  function loadExample() {
    birthDate = '1990-06-15';
    const today = new Date();
    currentDate = today.toISOString().split('T')[0];
  }

  function reset() {
    birthDate = '';
    const today = new Date();
    currentDate = today.toISOString().split('T')[0];
    calculationMode = 'exact';
    resetResults();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  function formatAgeText(): string {
    if (years === 0 && months === 0 && days === 0) return '0 days';

    const parts = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

    return parts.join(', ');
  }

  function getZodiacInfo() {
    return zodiacSigns.find(sign => sign.name === zodiacSign);
  }

  function getNextBirthdayMessage(): string {
    if (isBirthdayToday) {
      return '🎉 Happy Birthday! 🎂';
    } else if (daysUntilNextBirthday === 1) {
      return 'Tomorrow is your birthday! 🎈';
    } else if (daysUntilNextBirthday <= 7) {
      return `${daysUntilNextBirthday} days until your birthday! 🎁`;
    } else {
      return `${daysUntilNextBirthday} days until your birthday`;
    }
  }
</script>

<svelte:head>
  <title>Age Calculator - Developer Tools</title>
  <meta
    name="description"
    content="Calculate exact age, countdown to next birthday, zodiac signs, and more"
  />
</svelte:head>

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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <Calendar class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Age Calculator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Calculate exact age, countdown to next birthday, and discover interesting facts
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
      <li class="text-gray-900 dark:text-white font-medium">Age Calculator</li>
    </ol>
  </nav>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Enter Dates</h2>
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm" onclick={loadExample}>Example</button>
          <button class="btn btn-primary btn-sm" onclick={reset}>
            <RotateCcw class="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input class="input" id="birth-date" type="date" bind:value={birthDate} max={currentDate} />

        <input class="input" id="current-date" type="date" bind:value={currentDate} />
      </div>

      <!-- Calculation Mode -->
      <div class="mt-6">
        <fieldset>
          <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Calculation Mode
          </legend>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input
                type="radio"
                bind:group={calculationMode}
                value="exact"
                class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"
              />
              <span class="ml-2 text-gray-700 dark:text-gray-300"
                >Exact Age (Years, Months, Days)</span
              >
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                bind:group={calculationMode}
                value="difference"
                class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"
              />
              <span class="ml-2 text-gray-700 dark:text-gray-300">Total Difference</span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  </div>

  {#if years > 0 || months > 0 || days > 0}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Age Display -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Age Result -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock
              class="w-5 h-5 mr-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
            />
            Your Age
          </h2>

          <div class="text-center mb-8">
            <div
              class="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)]"
            >
              <div
                class="text-6xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-4"
              >
                {years}
              </div>
              <div
                class="text-lg font-medium text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
              >
                Years
              </div>

              {#if months > 0 || days > 0}
                <div class="mt-4 text-gray-600 dark:text-gray-400">
                  {months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : ''}
                  {#if months > 0 && days > 0},
                  {/if}
                  {days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : ''}
                </div>
              {/if}
            </div>
          </div>

          <!-- Total Time Units -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalDays.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalWeeks.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalMonths.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Months</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalHours.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalMinutes.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalSeconds.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Next Birthday -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Gift class="w-6 h-6 mr-2" />
            Next Birthday
          </h2>

          <div class="text-center">
            {#if isBirthdayToday}
              <div
                class="inline-block p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-800 mb-6"
              >
                <div class="text-3xl mb-4">🎉🎂🎈</div>
                <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  Happy Birthday!
                </div>
                <div class="text-pink-700 dark:text-pink-300 mt-2">
                  You are now {years} years old!
                </div>
              </div>

              <!-- Countdown to next year's birthday -->
              <div
                class="p-4 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg"
              >
                <h3
                  class="text-lg font-medium text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-2"
                >
                  Countdown to Next Birthday
                </h3>
                <div class="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div
                      class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
                    >
                      {countdownTime.days}
                    </div>
                    <div
                      class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
                    >
                      Days
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
                    >
                      {countdownTime.hours}
                    </div>
                    <div
                      class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
                    >
                      Hours
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
                    >
                      {countdownTime.minutes}
                    </div>
                    <div
                      class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
                    >
                      Minutes
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
                    >
                      {countdownTime.seconds}
                    </div>
                    <div
                      class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"
                    >
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            {:else}
              <div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div class="text-lg text-gray-900 dark:text-white mb-2">
                  {getNextBirthdayMessage()}
                </div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {daysUntilNextBirthday}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {daysUntilNextBirthday === 1 ? 'day' : 'days'} remaining
                </div>
                {#if nextBirthday}
                  <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Next birthday: {new Date(nextBirthday + 'T00:00:00').toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Birth Details -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar class="w-5 h-5 mr-2" />
            Birth Details
          </h3>
          <div class="space-y-3">
            <div>
              <span class="text-sm text-gray-600 dark:text-gray-400">Day of Week:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium">{birthDayOfWeek}</span>
            </div>
            {#if isLeapYear}
              <div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Birth Year:</span>
                <span class="ml-2 text-gray-900 dark:text-white font-medium">Leap Year 🗓️</span>
              </div>
            {/if}
            <div>
              <span class="text-sm text-gray-600 dark:text-gray-400">Age in Milliseconds:</span>
              <span class="ml-2 text-gray-900 dark:text-white font-medium"
                >{ageInMilliseconds.toLocaleString()}</span
              >
            </div>
          </div>
        </div>

        <!-- Zodiac Signs -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Star class="w-5 h-5 mr-2" />
            Zodiac Signs
          </h3>

          {#if zodiacSign}
            {@const zodiacInfo = getZodiacInfo()}
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">{zodiacInfo?.symbol}</span>
                <span class="text-lg font-medium text-gray-900 dark:text-white">{zodiacSign}</span>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {zodiacInfo?.dates}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Element: {zodiacInfo?.element}
              </div>
            </div>
          {/if}

          {#if chineseZodiac}
            <div>
              <div class="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Chinese Zodiac
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Year of the {chineseZodiac}
              </div>
            </div>
          {/if}
        </div>

        <!-- Fun Facts -->
        <div
          class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6"
        >
          <h3
            class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center"
          >
            <Heart class="w-5 h-5 mr-2" />
            Fun Facts
          </h3>
          <div class="space-y-3 text-sm text-purple-700 dark:text-purple-300">
            <div>
              <strong>{totalWeeks.toLocaleString()}</strong> weeks old
            </div>
            <div>
              Lived through <strong
                >{new Date(birthDate).getFullYear() +
                  years -
                  new Date(birthDate).getFullYear()}</strong
              > seasons
            </div>
            <div>
              Approximately <strong>{(totalDays * 8).toLocaleString()}</strong> hours of sleep (average)
            </div>
            <div>
              About <strong>{(totalDays * 50).toLocaleString()}</strong> meals eaten
            </div>
            <div>
              Heart has beaten <strong>{(totalMinutes * 80).toLocaleString()}</strong> times (average)
            </div>
          </div>
        </div>

        <!-- Copy Results -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Copy</h3>
          <div class="space-y-2">
            <button class="btn btn-primary w-full" onclick={() => copyToClipboard(formatAgeText())}>
              <Copy class="w-4 h-4 mr-2" />
              Copy Age Text
            </button>
            <button
              class="btn btn-primary w-full"
              onclick={() => copyToClipboard(`${years} years, ${months} months, ${days} days`)}
            >
              Copy Detailed Age
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
