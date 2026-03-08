<script lang="ts">
  import {
    Calendar,
    Clock,
    Gift,
    Heart,
    Star,
    RotateCcw,
    Copy,
    Sparkles,
    Zap,
    Check
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

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

<ToolLayout
  title="Age Calculator"
  description="Calculate exact age, countdown to next birthday, and discover interesting facts"
  icon={Calendar}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Calendar class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Age Calculator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Calculate exact age and discover fun facts
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button
      onclick={loadExample}
      class="btn btn-copy"
    >
      <Sparkles class="w-4 h-4 mr-2" />
      Load Example
    </button>
    <button
      onclick={reset}
      class="btn btn-secondary"
    >
      <RotateCcw class="w-4 h-4 mr-2" />
      Reset
    </button>
  </div>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter Dates</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label
          for="birth-date"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Birth Date</label
        >
        <input
          id="birth-date"
          type="date"
          bind:value={birthDate}
          max={currentDate}
          class="tool-input"
        />
      </div>
      <div>
        <label
          for="current-date"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Current Date</label
        >
        <input
          id="current-date"
          type="date"
          bind:value={currentDate}
          class="tool-input"
        />
      </div>
    </div>

    <!-- Calculation Mode -->
    <div>
      <fieldset>
        <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Calculation Mode</legend
        >
        <div class="flex gap-4">
          <label class="relative flex items-center cursor-pointer">
            <input
              type="radio"
              bind:group={calculationMode}
              value="exact"
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 checked:border-warning-500 dark:checked:border-primary-500"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Exact Age (Years, Months, Days)</span
            >
          </label>
          <label class="relative flex items-center cursor-pointer">
            <input
              type="radio"
              bind:group={calculationMode}
              value="difference"
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 checked:border-warning-500 dark:checked:border-primary-500"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Total Difference</span
            >
          </label>
        </div>
      </fieldset>
    </div>
  </div>

  {#if years > 0 || months > 0 || days > 0}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main Age Display -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Age Result -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
            Your Age
          </h3>

          <div class="text-center mb-8">
            <div
              class="inline-block p-8 rounded-xl border-2 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 border-warning-200 dark:border-primary-800"
            >
              <div class="text-6xl font-bold text-warning-600 dark:text-primary-400 mb-4">
                {years}
              </div>
              <div class="text-lg font-medium text-warning-700 dark:text-primary-300">Years</div>

              {#if months > 0 || days > 0}
                <div class="mt-4 text-gray-600 dark:text-gray-400">
                  {months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : ''}
                  {#if months > 0 && days > 0},{/if}
                  {days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : ''}
                </div>
              {/if}
            </div>
          </div>

          <!-- Total Time Units -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalDays.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalWeeks.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalMonths.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Months</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalHours.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalMinutes.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                {totalSeconds.toLocaleString()}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Next Birthday -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Gift class="w-6 h-6 mr-2 text-warning-600 dark:text-primary-400" />
            Next Birthday
          </h3>

          <div class="text-center">
            {#if isBirthdayToday}
              <div
                class="inline-block p-6 rounded-lg border-2 mb-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-primary-900/20 border-pink-200 dark:border-pink-800"
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
              <div class="p-4 rounded-lg bg-warning-100 dark:bg-primary-900/20">
                <h3 class="text-lg font-medium text-yellow-800 dark:text-primary-200 mb-2">
                  Countdown to Next Birthday
                </h3>
                <div class="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div class="text-2xl font-bold text-warning-600 dark:text-primary-400">
                      {countdownTime.days}
                    </div>
                    <div class="text-xs text-warning-700 dark:text-primary-300">Days</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-warning-600 dark:text-primary-400">
                      {countdownTime.hours}
                    </div>
                    <div class="text-xs text-warning-700 dark:text-primary-300">Hours</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-warning-600 dark:text-primary-400">
                      {countdownTime.minutes}
                    </div>
                    <div class="text-xs text-warning-700 dark:text-primary-300">Minutes</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-warning-600 dark:text-primary-400">
                      {countdownTime.seconds}
                    </div>
                    <div class="text-xs text-warning-700 dark:text-primary-300">Seconds</div>
                  </div>
                </div>
              </div>
            {:else}
              <div class="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
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
      <div class="space-y-4">
        <!-- Birth Details -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
            Birth Details
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Day of Week:</span>
              <span class="text-gray-900 dark:text-white font-medium">{birthDayOfWeek}</span>
            </div>
            {#if isLeapYear}
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Birth Year:</span>
                <span class="text-gray-900 dark:text-white font-medium">Leap Year 🗓️</span>
              </div>
            {/if}
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Age in Milliseconds:</span>
              <span class="text-gray-900 dark:text-white font-medium"
                >{ageInMilliseconds.toLocaleString()}</span
              >
            </div>
          </div>
        </div>

        <!-- Zodiac Signs -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Star class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
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
              <div class="text-base font-semibold text-gray-900 dark:text-white mb-1">
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
          class="p-6 rounded-xl border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-primary-900/20 dark:to-pink-900/20 border-purple-200 dark:border-primary-800"
        >
          <h3
            class="text-lg font-semibold text-purple-800 dark:text-primary-200 mb-4 flex items-center"
          >
            <Heart class="w-5 h-5 mr-2" />
            Fun Facts
          </h3>
          <div class="space-y-3 text-sm text-purple-700 dark:text-primary-300">
            <div>
              <strong>{totalWeeks.toLocaleString()}</strong> weeks old
            </div>
            <div>
              Lived through <strong>{years}</strong> seasons
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
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Copy</h3>
          <div class="space-y-2">
            <button
              class="btn btn-copy w-full"
              onclick={() => copyToClipboard(formatAgeText())}
            >
              <Copy class="w-4 h-4 mr-2" />
              Copy Age Text
            </button>
            <button
              class="btn btn-secondary w-full"
              onclick={() => copyToClipboard(`${years} years, ${months} months, ${days} days`)}
            >
              Copy Detailed Age
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Calendar class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precise Calculations</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Calculate exact age including years, months, and days with precision
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Gift class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Birthday Countdown</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Never miss a birthday with live countdown and zodiac sign information
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fun Facts</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Discover interesting facts about your age in various time units
      </p>
    </div>
  </div>
</ToolLayout>
