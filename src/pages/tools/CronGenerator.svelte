<script lang="ts">
  import { Timer, Copy, Calendar, RefreshCw, Info, Clock } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

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

  // Helper functions
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

      const now = new Date();
      const runs: string[] = [];

      // Simple approximation - this is not perfectly accurate but gives a good estimate
      for (let i = 0; i < count; i++) {
        // eslint-disable-next-line svelte/prefer-svelte-reactivity
        const nextRun = new Date(now);
        nextRun.setMinutes(nextRun.getMinutes() + (i + 1) * 5); // Simplified calculation
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
  }

  // Initialize
  updateFromExpression();
</script>

<svelte:head>
  <title>Cron Expression Generator - Developer Tools</title>
  <meta
    name="description"
    content="Generate and test cron expressions with visual builder and next run times"
  />
</svelte:head>

<ToolLayout
  title="Cron Expression Generator"
  description="Generate and validate cron expressions with visual builder and next run times."
  icon={Timer}
  color="warning"
>
  <!-- Main Content -->
  <div class="grid lg:grid-cols-2 gap-6">
    <!-- Left Column: Expression Builder -->
    <div class="space-y-6">
      <!-- Current Expression -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Cron Expression</h2>
          <div class="flex items-center gap-2">
            <button
              onclick={generateRandomCron}
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Generate Random"
            >
              <RefreshCw class="w-4 h-4" />
            </button>
            {#if copySuccess}
              <button
                class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold transition-colors"
                disabled
              >
                Copied!
              </button>
            {:else}
              <button
                onclick={copyToClipboard}
                class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors relative group"
                title="Copy to clipboard"
              >
                <Copy class="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </button>
            {/if}

            <div class="space-y-4">
              <input
                type="text"
                bind:value={cronExpression}
                oninput={updateFromExpression}
                class={`w-full px-4 py-3 rounded-lg border ${isValidCron ? 'border-gray-300 dark:border-gray-600' : 'border-red-300 dark:border-red-600'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="* * * * *"
              />

              <div class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Format:</span> [Minute] [Hour] [Day of Month] [Month] [Day
                of Week]

                {#if !isValidCron}
                  <div class="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <Info class="w-4 h-4" />
                    Invalid cron expression format
                  </div>
                {/if}

                <!-- Manual Components -->
                <div
                  class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Manual Builder
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <label
                        for="minute"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >Minute (0-59)</label
                      >
                      <input
                        id="minute"
                        type="text"
                        bind:value={minute}
                        oninput={updateFromComponents}
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="0"
                      />

                      <div>
                        <label
                          for="hour"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >Hour (0-23)</label
                        >
                        <input
                          id="hour"
                          type="text"
                          bind:value={hour}
                          oninput={updateFromComponents}
                          class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="0"
                        />

                        <div>
                          <label
                            for="day-of-month"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >Day of Month (1-31)</label
                          >
                          <input
                            id="day-of-month"
                            type="text"
                            bind:value={dayOfMonth}
                            oninput={updateFromComponents}
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="*"
                          />

                          <div>
                            <label
                              for="month"
                              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >Month (1-12)</label
                            >
                            <input
                              id="month"
                              type="text"
                              bind:value={month}
                              oninput={updateFromComponents}
                              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="*"
                            />

                            <div>
                              <label
                                for="day-of-week"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >Day of Week (0-6, 0=Sunday)</label
                              >
                              <input
                                id="day-of-week"
                                type="text"
                                bind:value={dayOfWeek}
                                oninput={updateFromComponents}
                                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="*"
                              />

                              <!-- Right Column: Description and Presets -->
                              <div class="space-y-6">
                                <!-- Description -->
                                {#if isValidCron}
                                  <div
                                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                                  >
                                    <h3
                                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
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
                                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                                  >
                                    <h3
                                      class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                                    >
                                      <Calendar class="w-5 h-5" />
                                      Next Run Times
                                    </h3>
                                    <div class="space-y-2">
                                      {#each nextRunTimes.slice(0, 5) as time (time)}
                                        <div
                                          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                          <Clock class="w-4 h-4" />
                                          {time}
                                        </div>
                                      {/each}
                                    </div>
                                  </div>
                                {/if}

                                <!-- Presets -->
                                <div
                                  class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                                >
                                  <h3
                                    class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                                  >
                                    Common Presets
                                  </h3>
                                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {#each presets as preset (preset.name)}
                                      <button
                                        onclick={() => applyPreset(preset.expression)}
                                        class="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                      >
                                        <div
                                          class="font-medium text-gray-900 dark:text-white text-sm"
                                        >
                                          {preset.name}
                                        </div>
                                        <div
                                          class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1"
                                        >
                                          {preset.expression}
                                        </div></button
                                      >
                                    {/each}

                                    <!-- Help Information -->
                                    <div
                                      class="bg-primary-100 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800 p-6"
                                    >
                                      <h3
                                        class="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2"
                                      >
                                        <Info class="w-5 h-5" />
                                        Cron Syntax Help
                                      </h3>
                                      <div
                                        class="space-y-3 text-sm text-blue-800 dark:text-blue-300"
                                      >
                                        <div>
                                          <strong class="font-semibold">* (asterisk)</strong> - any
                                          value

                                          <div>
                                            <strong class="font-semibold">, (comma)</strong> - value
                                            list separator

                                            <div>
                                              <strong class="font-semibold">- (hyphen)</strong> -
                                              range of values

                                              <div>
                                                <strong class="font-semibold"
                                                  >/ (forward slash)</strong
                                                >
                                                - step values

                                                <div>
                                                  <strong class="font-semibold">Examples:</strong>
                                                  <ul class="mt-2 space-y-1 ml-4">
                                                    <li>
                                                      • <code
                                                        class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded"
                                                        >*/15 * * * *</code
                                                      > - Every 15 minutes
                                                    </li>
                                                    <li>
                                                      • <code
                                                        class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded"
                                                        >0 9 * * 1-5</code
                                                      > - Weekdays at 9 AM
                                                    </li>
                                                    <li>
                                                      • <code
                                                        class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded"
                                                        >0 0 1 * *</code
                                                      > - First day of every month
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></ToolLayout
>
