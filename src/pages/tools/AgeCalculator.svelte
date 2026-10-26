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
      return 'Happy birthday!';
    } else if (daysUntilNextBirthday === 1) {
      return 'Tomorrow is your birthday!';
    } else if (daysUntilNextBirthday <= 7) {
      return `${daysUntilNextBirthday} days until your birthday!`;
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
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button onclick={loadExample} class="btn btn-secondary">
      <Sparkles class="w-4 h-4" />
      Load example
    </button>
    <button onclick={reset} class="btn btn-ghost">
      <RotateCcw class="w-4 h-4" />
      Reset
    </button>
  </div>

  <!-- Input Section -->
  <div class="tool-card">
    <h3 class="section-title">Enter dates</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label for="birth-date" class="label">Birth date</label>
        <input
          id="birth-date"
          type="date"
          bind:value={birthDate}
          max={currentDate}
          class="tool-input font-mono"
        />
      </div>
      <div>
        <label for="current-date" class="label">Current date</label>
        <input
          id="current-date"
          type="date"
          bind:value={currentDate}
          class="tool-input font-mono"
        />
      </div>
    </div>

    <!-- Calculation Mode -->
    <div>
      <fieldset>
        <legend class="label">Calculation mode</legend>
        <div class="flex flex-wrap gap-4">
          <label class="custom-radio">
            <input type="radio" bind:group={calculationMode} value="exact" />
            <span class="radio-dot"></span>
            <span class="label-text">Exact age (years, months, days)</span>
          </label>
          <label class="custom-radio">
            <input type="radio" bind:group={calculationMode} value="difference" />
            <span class="radio-dot"></span>
            <span class="label-text">Total difference</span>
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
        <div class="tool-card">
          <h3 class="section-title flex items-center gap-2">
            <Clock class="w-5 h-5 text-accent-text" />
            Your age
          </h3>

          <div class="text-center mb-6">
            <div class="inline-block min-w-48 px-10 py-8 rounded-md bg-tile-lime text-ink-on-bright">
              <div class="font-display text-[64px] leading-[64px] font-bold tracking-tight tabular-nums mb-3">
                {years}
              </div>
              <div class="text-label">Years</div>

              {#if months > 0 || days > 0}
                <div class="mt-4 text-body-sm">
                  {months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : ''}
                  {#if months > 0 && days > 0},{/if}
                  {days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : ''}
                </div>
              {/if}
            </div>
          </div>

          <!-- Total Time Units -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalDays.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Days</div>
            </div>
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalWeeks.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Weeks</div>
            </div>
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalMonths.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Months</div>
            </div>
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalHours.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Hours</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mt-3">
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalMinutes.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Minutes</div>
            </div>
            <div class="text-center p-4 rounded-md bg-sunken">
              <div class="font-display text-2xl font-bold text-ink tabular-nums">
                {totalSeconds.toLocaleString()}
              </div>
              <div class="text-label text-ink-muted mt-1">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Next Birthday -->
        <div class="tool-card">
          <h3 class="section-title flex items-center gap-2">
            <Gift class="w-5 h-5 text-accent-text" />
            Next birthday
          </h3>

          <div class="text-center">
            {#if isBirthdayToday}
              <div class="inline-block p-6 rounded-md mb-6 bg-tile-violet text-ink-on-dark">
                <Gift class="w-8 h-8 mx-auto mb-3" />
                <div class="font-display text-2xl font-bold">Happy birthday!</div>
                <div class="text-body mt-2">
                  You are now {years} years old!
                </div>
              </div>

              <!-- Countdown to next year's birthday -->
              <div class="p-4 rounded-md bg-tile-lilac text-ink-on-bright">
                <h3 class="section-title-sm">Countdown to next birthday</h3>
                <div class="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div class="font-display text-2xl font-bold tabular-nums">
                      {countdownTime.days}
                    </div>
                    <div class="text-label">Days</div>
                  </div>
                  <div>
                    <div class="font-display text-2xl font-bold tabular-nums">
                      {countdownTime.hours}
                    </div>
                    <div class="text-label">Hours</div>
                  </div>
                  <div>
                    <div class="font-display text-2xl font-bold tabular-nums">
                      {countdownTime.minutes}
                    </div>
                    <div class="text-label">Minutes</div>
                  </div>
                  <div>
                    <div class="font-display text-2xl font-bold tabular-nums">
                      {countdownTime.seconds}
                    </div>
                    <div class="text-label">Seconds</div>
                  </div>
                </div>
              </div>
            {:else}
              <div class="p-6 rounded-md bg-sunken">
                <div class="section-title-sm">
                  {getNextBirthdayMessage()}
                </div>
                <div class="font-display text-[32px] leading-9 font-bold tracking-tight tabular-nums mb-1">
                  {daysUntilNextBirthday}
                </div>
                <div class="text-body-sm text-ink-muted">
                  {daysUntilNextBirthday === 1 ? 'day' : 'days'} remaining
                </div>
                {#if nextBirthday}
                  <div class="mt-4 text-body-sm text-ink-muted">
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
        <div class="tool-card">
          <h3 class="section-title flex items-center gap-2">
            <Calendar class="w-5 h-5 text-accent-text" />
            Birth details
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center gap-3">
              <span class="text-body-sm text-ink-muted">Day of week</span>
              <span class="text-ink font-medium">{birthDayOfWeek}</span>
            </div>
            {#if isLeapYear}
              <div class="flex justify-between items-center gap-3">
                <span class="text-body-sm text-ink-muted">Birth year</span>
                <span class="text-ink font-medium">Leap year</span>
              </div>
            {/if}
            <div class="flex justify-between items-center gap-3">
              <span class="text-body-sm text-ink-muted">Age in milliseconds</span>
              <span class="font-mono text-ink font-medium tabular-nums break-all text-right"
                >{ageInMilliseconds.toLocaleString()}</span
              >
            </div>
          </div>
        </div>

        <!-- Zodiac Signs -->
        <div class="tool-card">
          <h3 class="section-title flex items-center gap-2">
            <Star class="w-5 h-5 text-accent-text" />
            Zodiac signs
          </h3>

          {#if zodiacSign}
            {@const zodiacInfo = getZodiacInfo()}
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-2xl text-accent-text" aria-hidden="true">{zodiacInfo?.symbol}&#xFE0E;</span>
                <span class="text-title text-ink">{zodiacSign}</span>
              </div>
              <div class="font-mono text-body-sm text-ink-muted">
                {zodiacInfo?.dates}
              </div>
              <div class="text-body-sm text-ink-muted mt-1">
                Element: {zodiacInfo?.element}
              </div>
            </div>
          {/if}

          {#if chineseZodiac}
            <div>
              <div class="section-title-sm mb-1">Chinese zodiac</div>
              <div class="text-body-sm text-ink-muted">
                Year of the {chineseZodiac}
              </div>
            </div>
          {/if}
        </div>

        <!-- Fun Facts -->
        <div class="p-6 rounded-lg bg-tile-deep text-ink-on-dark">
          <h3 class="section-title flex items-center gap-2">
            <Heart class="w-5 h-5" />
            Fun facts
          </h3>
          <div class="space-y-3 text-body-sm">
            <div>
              <strong class="font-mono tabular-nums">{totalWeeks.toLocaleString()}</strong> weeks old
            </div>
            <div>
              Lived through <strong class="font-mono tabular-nums">{years}</strong> seasons
            </div>
            <div>
              Approximately <strong class="font-mono tabular-nums">{(totalDays * 8).toLocaleString()}</strong> hours of sleep (average)
            </div>
            <div>
              About <strong class="font-mono tabular-nums">{(totalDays * 50).toLocaleString()}</strong> meals eaten
            </div>
            <div>
              Heart has beaten <strong class="font-mono tabular-nums">{(totalMinutes * 80).toLocaleString()}</strong> times (average)
            </div>
          </div>
        </div>

        <!-- Copy Results -->
        <div class="tool-card">
          <h3 class="section-title">Quick copy</h3>
          <div class="space-y-2">
            <button
              class="btn btn-primary w-full"
              onclick={() => copyToClipboard(formatAgeText())}
            >
              <Copy class="w-4 h-4" />
              Copy age text
            </button>
            <button
              class="btn btn-secondary w-full"
              onclick={() => copyToClipboard(`${years} years, ${months} months, ${days} days`)}
            >
              Copy detailed age
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Calendar class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Precise calculations</h3>
      <p class="feature-description">
        Calculate exact age including years, months, and days with precision
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Gift class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Birthday countdown</h3>
      <p class="feature-description">
        Never miss a birthday with live countdown and zodiac sign information
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Heart class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Fun facts</h3>
      <p class="feature-description">
        Discover interesting facts about your age in various time units
      </p>
    </div>
  </div>
</ToolLayout>
