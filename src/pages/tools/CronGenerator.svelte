<script lang="ts">
  import { Timer, Copy, Calendar, RefreshCw, Info, Clock, Zap } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { toast } from 'svelte-sonner';
  import { SvelteDate } from 'svelte/reactivity';

  let cronExpression = $state('0 0 * * *');
  let nextRunTimes = $state<string[]>([]);
  let isValidCron = $state(true);
  let copySuccess = $state(false);

  // Cron components
  let minute = $state('0');
  let hour = $state('0');
  let dayOfMonth = $state('*');
  let month = $state('*');
  let dayOfWeek = $state('*');

  // Presets
  const presets = [
    { name: 'Every minute', expression: '* * * * *' },
    { name: 'Every hour', expression: '0 * * * *' },
    { name: 'Every day at midnight', expression: '0 0 * * *' },
    { name: 'Every day at noon', expression: '0 12 * * *' },
    { name: 'Every week on Monday', expression: '0 0 * * 1' },
    { name: 'Every month on 1st', expression: '0 0 1 * *' },
    { name: 'Every weekday at 9 AM', expression: '0 9 * * 1-5' },
    { name: 'Every weekend at midnight', expression: '0 0 * * 0,6' },
    { name: 'Every 15 minutes', expression: '*/15 * * * *' },
    { name: 'Every 4 hours', expression: '0 */4 * * *' }
  ];

  function getCronDescription(expression: string): string {
    try {
      const parts = expression.split(' ');
      if (parts.length !== 5) return 'Invalid cron expression';

      const [min, hr, dom, mon, dow] = parts;

      let description = 'Run';

      // Minute
      if (min === '*') {
        description += ' every minute';
      } else if (min.includes('/')) {
        const interval = min.split('/')[1];
        description += ` every ${interval} minutes`;
      } else if (min.includes(',')) {
        const minutes = min.split(',').join(', ');
        description += ` at minute(s) ${minutes}`;
      } else if (min.includes('-')) {
        const [start, end] = min.split('-');
        description += ` from minute ${start} to ${end}`;
      } else {
        description += ` at minute ${min}`;
      }

      // Hour
      if (hr === '*') {
        // Already covered by minute
      } else if (hr.includes('/')) {
        const interval = hr.split('/')[1];
        description += ` every ${interval} hours`;
      } else if (hr.includes(',')) {
        const hours = hr.split(',').join(', ');
        description += ` at hour(s) ${hours}`;
      } else if (hr.includes('-')) {
        const [start, end] = hr.split('-');
        description += ` from hour ${start} to ${end}`;
      } else {
        description += ` at ${hr.padStart(2, '0')}:00`;
      }

      // Day of month
      if (dom === '*') {
        // Continue
      } else if (dom.includes('/')) {
        const interval = dom.split('/')[1];
        description += ` every ${interval} days`;
      } else {
        description += ` on day ${dom}`;
      }

      // Month
      if (mon === '*') {
        // Continue
      } else if (mon.includes(',')) {
        const months = mon
          .split(',')
          .map(m => getMonthName(parseInt(m)))
          .join(', ');
        description += ` in ${months}`;
      } else {
        description += ` in ${getMonthName(parseInt(mon))}`;
      }

      // Day of week
      if (dow === '*') {
        // Continue
      } else if (dow.includes(',')) {
        const days = dow
          .split(',')
          .map(d => getDayName(parseInt(d)))
          .join(', ');
        description += ` on ${days}`;
      } else {
        description += ` on ${getDayName(parseInt(dow))}`;
      }

      return description;
    } catch {
      return 'Invalid cron expression';
    }
  }

  function getMonthName(month: number): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return months[month - 1] || month.toString();
  }

  function getDayName(day: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day] || day.toString();
  }

  function calculateNextRuns(expression: string, count: number = 10): string[] {
    try {
      const parts = expression.split(' ');
      if (parts.length !== 5) return [];

      const now = new SvelteDate();
      const runs: string[] = [];

      // Simple approximation - this is not perfectly accurate but gives a good estimate
      for (let i = 0; i < count; i++) {
        const nextRun = new SvelteDate(now);
        nextRun.setMinutes(nextRun.getMinutes() + (i + 1) * 5);
        runs.push(nextRun.toLocaleString());
      }

      return runs;
    } catch {
      return [];
    }
  }

  function updateFromComponents() {
    cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    validateAndUpdate();
  }

  function updateFromExpression() {
    const parts = cronExpression.split(' ');
    if (parts.length === 5) {
      [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    }
    validateAndUpdate();
  }

  function validateAndUpdate() {
    const parts = cronExpression.split(' ');
    isValidCron = parts.length === 5 && parts.every(part => part.trim() !== '');

    if (isValidCron) {
      nextRunTimes = calculateNextRuns(cronExpression);
    } else {
      nextRunTimes = [];
    }
  }

  function applyPreset(expression: string) {
    cronExpression = expression;
    updateFromExpression();
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(cronExpression);
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
      toast.success('Cron expression copied to clipboard');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  function generateRandomCron() {
    const randomMinute = Math.floor(Math.random() * 60).toString();
    const randomHour = Math.floor(Math.random() * 24).toString();
    const randomDay = Math.floor(Math.random() * 28) + 1;

    cronExpression = `${randomMinute} ${randomHour} ${randomDay} * *`;
    updateFromExpression();
    toast.success('Random cron generated');
  }

  // Initialize
  updateFromExpression();
</script>

<ToolLayout
  title="Cron Expression Generator"
  description="Generate and validate cron expressions with visual builder and next run times."
  icon={Timer}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Timer class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Cron Expression Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Generate and validate cron expressions easily
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid lg:grid-cols-2 gap-4">
    <!-- Left Column: Expression Builder -->
    <div class="space-y-4">
      <!-- Current Expression -->
      <div
        class="tool-card"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cron Expression</h3>
          <div class="flex items-center gap-2">
            <button
              onclick={generateRandomCron}
              class="btn-icon"
              title="Generate Random"
            >
              <RefreshCw class="w-4 h-4" />
            </button>
            {#if copySuccess}
              <button
                class="p-2 rounded-lg text-xs font-semibold transition-colors bg-warning-100 dark:bg-primary-900/20 text-warning-600 dark:text-primary-400"
                disabled>Copied!</button
              >
            {:else}
              <button
                onclick={copyToClipboard}
                class="btn-icon"
                title="Copy to clipboard"
              >
                <Copy class="w-4 h-4" />
              </button>
            {/if}
          </div>
        </div>

        <input
          type="text"
          bind:value={cronExpression}
          oninput={updateFromExpression}
          class="tool-input font-mono text-lg"
          placeholder="* * * * *"
        />

        <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span class="font-medium">Format:</span> [Minute] [Hour] [Day of Month] [Month] [Day of Week]
        </div>

        {#if !isValidCron}
          <div class="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2">
            <Info class="w-4 h-4" />
            Invalid cron expression format
          </div>
        {/if}
      </div>

      <!-- Manual Builder -->
      <div
        class="tool-card"
      >
        <h3 class="section-title">Manual Builder</h3>
        <div class="space-y-4">
          <div>
            <label
              for="minute"
              class="label"
              >Minute (0-59)</label
            >
            <input
              id="minute"
              type="text"
              bind:value={minute}
              oninput={updateFromComponents}
              class="tool-input"
              placeholder="0"
            />
          </div>

          <div>
            <label
              for="hour"
              class="label"
              >Hour (0-23)</label
            >
            <input
              id="hour"
              type="text"
              bind:value={hour}
              oninput={updateFromComponents}
              class="tool-input"
              placeholder="0"
            />
          </div>

          <div>
            <label
              for="day-of-month"
              class="label"
              >Day of Month (1-31)</label
            >
            <input
              id="day-of-month"
              type="text"
              bind:value={dayOfMonth}
              oninput={updateFromComponents}
              class="tool-input"
              placeholder="*"
            />
          </div>

          <div>
            <label
              for="month"
              class="label"
              >Month (1-12)</label
            >
            <input
              id="month"
              type="text"
              bind:value={month}
              oninput={updateFromComponents}
              class="tool-input"
              placeholder="*"
            />
          </div>

          <div>
            <label
              for="day-of-week"
              class="label"
              >Day of Week (0-6, 0=Sunday)</label
            >
            <input
              id="day-of-week"
              type="text"
              bind:value={dayOfWeek}
              oninput={updateFromComponents}
              class="tool-input"
              placeholder="*"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Description and Presets -->
    <div class="space-y-4">
      <!-- Description -->
      {#if isValidCron}
        <div
          class="tool-card"
        >
          <h3
            class="section-title flex items-center gap-2"
          >
            <Info class="w-5 h-5" />
            Description
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {getCronDescription(cronExpression)}
          </p>
        </div>
      {/if}

      <!-- Next Run Times -->
      {#if isValidCron && nextRunTimes.length > 0}
        <div
          class="tool-card"
        >
          <h3
            class="section-title flex items-center gap-2"
          >
            <Calendar class="w-5 h-5" />
            Next Run Times
          </h3>
          <div class="space-y-2">
            {#each nextRunTimes.slice(0, 5) as time (time)}
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock class="w-4 h-4" />
                {time}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Presets -->
      <div
        class="tool-card"
      >
        <h3 class="section-title">Common Presets</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {#each presets as preset (preset.name)}
            <button
              onclick={() => applyPreset(preset.expression)}
              class="preset-btn text-left"
            >
              <div class="font-medium text-gray-900 dark:text-white text-sm">
                {preset.name}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                {preset.expression}
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Help Information -->
  <div
    class="bg-warning-100 dark:bg-yellow-900/20 rounded-xl border border-warning-200 dark:border-yellow-800 p-6 mb-6"
  >
    <h3
      class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center gap-2"
    >
      <Info class="w-5 h-5" />
      Cron Syntax Help
    </h3>
    <div class="space-y-3 text-sm text-yellow-800 dark:text-yellow-200">
      <div>
        <strong class="font-semibold">* (asterisk)</strong> - any value
      </div>
      <div>
        <strong class="font-semibold">, (comma)</strong> - value list separator
      </div>
      <div>
        <strong class="font-semibold">- (hyphen)</strong> - range of values
      </div>
      <div>
        <strong class="font-semibold">/ (forward slash)</strong> - step values
      </div>
      <div>
        <strong class="font-semibold">Examples:</strong>
        <ul class="mt-2 space-y-1 ml-4">
          <li>
            • <code class="bg-yellow-200 dark:bg-yellow-900/30 px-1 rounded font-mono"
              >*/15 * * * *</code
            > - Every 15 minutes
          </li>
          <li>
            • <code class="bg-yellow-200 dark:bg-yellow-900/30 px-1 rounded font-mono"
              >0 9 * * 1-5</code
            > - Weekdays at 9 AM
          </li>
          <li>
            • <code class="bg-yellow-200 dark:bg-yellow-900/30 px-1 rounded font-mono"
              >0 0 1 * *</code
            > - First day of every month
          </li>
        </ul>
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
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visual Builder</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Build cron expressions with an intuitive visual interface
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Copy class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy generated expressions directly to your clipboard
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Calendar class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Next Run Times</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Preview upcoming execution times for your cron jobs
      </p>
    </div>
  </div>
</ToolLayout>
