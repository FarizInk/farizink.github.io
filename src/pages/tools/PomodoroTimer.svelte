<script lang="ts">
  import {
    Play,
    Pause,
    RotateCcw,
    Coffee,
    Clock,
    Bell,
    BellOff,
    BellRing,
    Settings,
    Timer
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Default timer settings (Pomodoro recommended)
  const DEFAULT_WORK_DURATION = 25 * 60; // 25 minutes in seconds
  const DEFAULT_SHORT_BREAK = 5 * 60; // 5 minutes in seconds
  const DEFAULT_LONG_BREAK = 15 * 60; // 15 minutes in seconds

  // Customizable timer settings (stored in seconds)
  let workDuration = $state(DEFAULT_WORK_DURATION);
  let shortBreakDuration = $state(DEFAULT_SHORT_BREAK);
  let longBreakDuration = $state(DEFAULT_LONG_BREAK);

  // Helper getters for minute values for input fields with writable derived
  const workMinutesInput = $derived.by(() => Math.floor(workDuration / 60));
  const shortBreakMinutesInput = $derived.by(() => Math.floor(shortBreakDuration / 60));
  const longBreakMinutesInput = $derived.by(() => Math.floor(longBreakDuration / 60));

  // Editor state for modifying values
  let editingWorkMinutes = $state(Math.floor(DEFAULT_WORK_DURATION / 60));
  let editingShortBreakMinutes = $state(Math.floor(DEFAULT_SHORT_BREAK / 60));
  let editingLongBreakMinutes = $state(Math.floor(DEFAULT_LONG_BREAK / 60));

  // Backup values for editing
  let backupSessionCount = $state(0);

  // Timer state
  let timeLeft = $state(DEFAULT_WORK_DURATION);
  let isRunning = $state(false);
  let currentSession = $state<'work' | 'shortBreak' | 'longBreak'>('work');
  let sessionCount = $state(0);
  let interval: ReturnType<typeof setInterval> | null = null;
  let showSettings = $state(false);
  let isEditingSettings = $state(false);

  // Format time as MM:SS
  const formattedTime = $derived(formatTime(timeLeft));

  // Calculate progress percentage
  const progress = $derived(calculateProgress());

  // Get session duration based on current session type
  const sessionDuration = $derived(getSessionDuration());

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function getSessionDuration(): number {
    switch (currentSession) {
      case 'work':
        return workDuration;
      case 'shortBreak':
        return shortBreakDuration;
      case 'longBreak':
        return longBreakDuration;
      default:
        return workDuration;
    }
  }

  function calculateProgress(): number {
    return ((sessionDuration - timeLeft) / sessionDuration) * 100;
  }

  function startTimer(): void {
    if (!isRunning) {
      isRunning = true;
      interval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
          completeSession();
        }
      }, 1000);
    }
  }

  function pauseTimer(): void {
    isRunning = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function resetTimer(): void {
    pauseTimer();
    timeLeft = sessionDuration;
  }

  function startEditingSettings(): void {
    pauseTimer();
    editingWorkMinutes = workMinutesInput;
    editingShortBreakMinutes = shortBreakMinutesInput;
    editingLongBreakMinutes = longBreakMinutesInput;
    backupSessionCount = sessionCount;
    isEditingSettings = true;
  }

  function applySettings(): void {
    workDuration = editingWorkMinutes * 60;
    shortBreakDuration = editingShortBreakMinutes * 60;
    longBreakDuration = editingLongBreakMinutes * 60;
    isEditingSettings = false;

    // Reset timer if it was paused
    if (!isRunning) {
      timeLeft = sessionDuration;
    }
  }

  function resetToDefaultsInEditor(): void {
    editingWorkMinutes = Math.floor(DEFAULT_WORK_DURATION / 60);
    editingShortBreakMinutes = Math.floor(DEFAULT_SHORT_BREAK / 60);
    editingLongBreakMinutes = Math.floor(DEFAULT_LONG_BREAK / 60);
    sessionCount = 0;
  }

  function cancelEditingSettings(): void {
    // Restore the actual duration values from backup
    workDuration = editingWorkMinutes * 60;
    shortBreakDuration = editingShortBreakMinutes * 60;
    longBreakDuration = editingLongBreakMinutes * 60;
    sessionCount = backupSessionCount;

    isEditingSettings = false;
  }

  function completeSession(): void {
    pauseTimer();
    playNotificationSound();

    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      showNotification();
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }

    // Move to next session
    if (currentSession === 'work') {
      sessionCount++;
      if (sessionCount % 4 === 0) {
        currentSession = 'longBreak';
      } else {
        currentSession = 'shortBreak';
      }
    } else {
      currentSession = 'work';
    }

    timeLeft = sessionDuration;
  }

  function playNotificationSound(): void {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  function showNotification(): void {
    const title = currentSession === 'work' ? 'Break Time! ☕' : 'Work Time! 💪';

    const body =
      currentSession === 'work'
        ? 'Time to take a break and recharge.'
        : 'Time to focus and get things done.';

    new Notification(title, {
      body,
      icon: '/favicon.ico'
    });
  }

  function requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        // Update reactive state to trigger UI re-render
        showSettings = !showSettings;
        showSettings = showSettings;
        console.log('Notification permission:', permission);
      });
    }
  }

  function testNotification(): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Test Notification 🔔', {
        body: 'Notifications are working! You will receive alerts when sessions end.',
        icon: '/favicon.ico'
      });
    }
  }

  // Cleanup interval on component destroy
  $effect(() => {
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
</script>

<ToolLayout
  title="Pomodoro Timer"
  description="Boost your productivity with focused work sessions and regular breaks"
  icon={Timer}
  color="primary"
>
  <div class="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
    <!-- Main Timer Section -->
    <div class="xl:col-span-2 lg:col-span-1">
      <!-- Timer Display -->
      <div class="card card-elevated mb-4 sm:mb-6 lg:mb-8">
        {#if isEditingSettings}
          <!-- Settings Editor -->
          <div class="max-w-md mx-auto w-full">
            <h3
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center"
            >
              Timer Settings
            </h3>

            <div class="space-y-3 sm:space-y-4">
              <!-- Work Duration -->
              <div>
                <label for="edit-work-duration" class="label"> Work Duration (minutes) </label>
                <input
                  id="edit-work-duration"
                  type="number"
                  bind:value={editingWorkMinutes}
                  min="1"
                  max="60"
                  class="input"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended: 25 minutes</p>
              </div>

              <!-- Short Break -->
              <div>
                <label for="edit-short-break" class="label"> Short Break (minutes) </label>
                <input
                  id="edit-short-break"
                  type="number"
                  bind:value={editingShortBreakMinutes}
                  min="1"
                  max="30"
                  class="input"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended: 5 minutes</p>
              </div>

              <!-- Long Break -->
              <div>
                <label for="edit-long-break" class="label"> Long Break (minutes) </label>
                <input
                  id="edit-long-break"
                  type="number"
                  bind:value={editingLongBreakMinutes}
                  min="1"
                  max="60"
                  class="input"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended: 15 minutes</p>
              </div>

              <!-- Session Count -->
              <div>
                <label for="edit-session-count" class="label"> Sessions Completed </label>
                <input
                  id="edit-session-count"
                  type="number"
                  bind:value={sessionCount}
                  min="0"
                  max="999"
                  class="input"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Number of completed Pomodoro sessions
                </p>
              </div>
            </div>

            <!-- Settings Control Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6">
              <button onclick={applySettings} class="btn btn-primary flex-1">
                Apply Settings
              </button>
              <button onclick={resetToDefaultsInEditor} class="btn btn-secondary flex-1">
                Reset to Default
              </button>
              <button onclick={cancelEditingSettings} class="btn btn-danger flex-1"> Back </button>
            </div>
          </div>
        {:else}
          <!-- Normal Timer Display -->
          <!-- Session Type -->
          <div class="text-center mb-4 sm:mb-6">
            <div
              class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium
          {currentSession === 'work'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}"
            >
              {#if currentSession === 'work'}
                <span>🧠 Work Session</span>
              {:else if currentSession === 'shortBreak'}
                <span>☕ Short Break</span>
              {:else}
                <span>🌟 Long Break</span>
              {/if}
            </div>
          </div>

          <!-- Timer Circle -->
          <div class="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto mb-6 sm:mb-8">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <!-- Background circle -->
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                stroke-width="8"
                fill="none"
                class="text-gray-200 dark:text-gray-700"
              />
              <!-- Progress circle -->
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                stroke-width="8"
                fill="none"
                stroke-dasharray={2 * Math.PI * 45}
                stroke-dashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                class="transition-all duration-1000 ease-linear
              {currentSession === 'work'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-green-600 dark:text-green-400'}"
              />
            </svg>

            <!-- Time Display -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div
                class="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-gray-900 dark:text-white mb-1 sm:mb-2"
              >
                {formattedTime}
              </div>
              <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Session {sessionCount + 1}
              </div>
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {#if !isRunning}
              <button
                onclick={startTimer}
                disabled={isEditingSettings}
                class="btn btn-primary flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3"
              >
                <Play class="w-4 h-4 sm:w-5 sm:h-5" />
                <span class="text-sm sm:text-base">Start</span>
              </button>
            {:else}
              <button
                onclick={pauseTimer}
                disabled={isEditingSettings}
                class="btn btn-warning flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3"
                style="background-color: var(--color-warning-600);"
              >
                <Pause class="w-4 h-4 sm:w-5 sm:h-5" />
                <span class="text-sm sm:text-base">Pause</span>
              </button>
            {/if}

            <button
              onclick={resetTimer}
              disabled={isEditingSettings}
              class="btn btn-secondary flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3"
            >
              <RotateCcw class="w-4 h-4 sm:w-5 sm:h-5" />
              <span class="text-sm sm:text-base">Reset</span>
            </button>

            <button
              onclick={startEditingSettings}
              disabled={isRunning || isEditingSettings}
              class="btn flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3"
              style="background-color: var(--color-primary-600); color: white;"
              title="Edit Timer Settings"
            >
              <Settings class="w-4 h-4 sm:w-5 sm:h-5" />
              <span class="hidden sm:inline text-sm sm:text-base">Settings</span>
            </button>
          </div>

          <!-- Notification Permission -->
          {#if 'Notification' in window}
            <div class="text-center">
              {#if Notification.permission === 'default'}
                <button
                  onclick={requestNotificationPermission}
                  class="btn btn-outline btn-sm flex items-center gap-2 mx-auto"
                  style="border-color: var(--color-primary-300); color: var(--color-primary-700);"
                >
                  <Bell class="w-4 h-4" />
                  <span class="text-xs sm:text-sm">Enable Notifications</span>
                </button>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Get notified when your sessions end
                </p>
              {:else if Notification.permission === 'granted'}
                <div class="space-y-2 sm:space-y-3">
                  <div
                    class="flex items-center justify-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400"
                  >
                    <BellRing class="w-4 h-4" />
                    <span>Notifications enabled</span>
                  </div>
                  <button
                    onclick={testNotification}
                    class="text-xs text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 underline"
                  >
                    Test notification
                  </button>
                </div>
              {:else if Notification.permission === 'denied'}
                <div
                  class="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600 dark:text-red-400"
                >
                  <BellOff class="w-4 h-4" />
                  <span>Notifications blocked</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enable in browser settings to receive session alerts
                </p>
              {/if}
            </div>
          {/if}
        {/if}
      </div>
    </div>

    <!-- Info Sidebar -->
    <div class="xl:col-span-1 lg:col-span-1">
      <!-- Current Settings Info -->
      <div class="card card-elevated mb-4 sm:mb-6">
        <div class="flex items-center mb-4 sm:mb-6">
          <h3
            class="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-base sm:text-lg"
          >
            <Clock class="w-4 h-4 sm:w-5 sm:h-5" />
            Current Settings
          </h3>
        </div>

        <!-- Settings Display -->
        <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Work Duration:</span>
            <span class="font-medium text-gray-900 dark:text-white">
              {Math.floor(workDuration / 60)} min
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Short Break:</span>
            <span class="font-medium text-gray-900 dark:text-white">
              {Math.floor(shortBreakDuration / 60)} min
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Long Break:</span>
            <span class="font-medium text-gray-900 dark:text-white">
              {Math.floor(longBreakDuration / 60)} min
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Sessions Completed:</span>
            <span class="font-medium text-gray-900 dark:text-white">{sessionCount}</span>
          </div>
        </div>
      </div>

      <!-- Pomodoro Info -->
      <div class="card card-elevated">
        <h3
          class="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg"
        >
          <Coffee class="w-4 h-4 sm:w-5 sm:h-5" />
          Pomodoro Method
        </h3>
        <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style="background-color: var(--color-primary-600);"
            ></div>
            <p><strong>Work Session:</strong> 25 minutes of focused work</p>
          </div>
          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style="background-color: var(--color-success-600);"
            ></div>
            <p><strong>Short Break:</strong> 5 minutes to recharge</p>
          </div>
          <div class="flex items-start gap-2">
            <div
              class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style="background-color: var(--color-warning-600);"
            ></div>
            <p><strong>Long Break:</strong> 15 minutes after 4 sessions</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- How to Use Section -->
  <div class="mt-6 sm:mt-8 grid md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <div class="card">
      <h3
        class="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg"
      >
        <Clock class="w-4 h-4 sm:w-5 sm:h-5" />
        How to Use
      </h3>
      <ol
        class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside"
      >
        <li>Customize your timer settings or use Pomodoro defaults</li>
        <li>Click "Start" to begin your work session</li>
        <li>Work continuously without distractions until the timer ends</li>
        <li>Take a short break when the session completes</li>
        <li>After 4 sessions, enjoy a longer break</li>
        <li>Repeat the cycle for maximum productivity</li>
      </ol>
    </div>

    <div class="card">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">
        💡 Pro Tips
      </h3>
      <ul class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-2 sm:space-y-3">
        <li class="flex items-start gap-2">
          <span class="text-primary-600 dark:text-primary-400">•</span>
          <span>Use the timer for focused work without distractions</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-primary-600 dark:text-primary-400">•</span>
          <span>During breaks, step away from your screen and move around</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-primary-600 dark:text-primary-400">•</span>
          <span>Combine with a to-do list for maximum productivity</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-primary-600 dark:text-primary-400">•</span>
          <span>Adjust timing based on your personal workflow and energy</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-primary-600 dark:text-primary-400">•</span>
          <span>Stay hydrated and take care of your posture during sessions</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Pomodoro Recommendation Note -->
  <div
    class="mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg border dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-100"
    style="background-color: var(--color-primary-50); border-color: var(--color-primary-200); color: var(--color-primary-900);"
  >
    <h4 class="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">🍅 Why Pomodoro Technique?</h4>
    <p class="text-xs sm:text-sm mb-3 sm:mb-4">
      The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. It's a time
      management method that uses a timer to break work into intervals, traditionally 25 minutes in
      length, separated by short breaks.
    </p>
    <div class="text-xs sm:text-sm">
      <strong>Benefits:</strong> Improved focus, reduced burnout, better time estimation, increased productivity,
      and sustainable work habits.
    </div>
  </div>
</ToolLayout>

<style>
  /* Ensure smooth transitions */
  circle {
    transition: stroke-dashoffset 1s linear;
  }
</style>
