<script lang="ts">
  import { Play, Pause, RotateCcw, Coffee, Settings, Clock } from '@lucide/svelte';

  // Default timer settings (Pomodoro recommended)
  const DEFAULT_WORK_DURATION = 25 * 60; // 25 minutes in seconds
  const DEFAULT_SHORT_BREAK = 5 * 60; // 5 minutes in seconds
  const DEFAULT_LONG_BREAK = 15 * 60; // 15 minutes in seconds

  // Customizable timer settings
  let workDuration = $state(DEFAULT_WORK_DURATION);
  let shortBreakDuration = $state(DEFAULT_SHORT_BREAK);
  let longBreakDuration = $state(DEFAULT_LONG_BREAK);

  // Timer state
  let timeLeft = $state(DEFAULT_WORK_DURATION);
  let isRunning = $state(false);
  let currentSession = $state<'work' | 'shortBreak' | 'longBreak'>('work');
  let sessionCount = $state(0);
  let interval: ReturnType<typeof setInterval> | null = null;
  let showSettings = $state(false);

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

  function applyCustomSettings(): void {
    pauseTimer();
    // Only reset timeLeft if we're at the beginning of a session
    if (timeLeft === sessionDuration || timeLeft > sessionDuration) {
      timeLeft = sessionDuration;
    }
    showSettings = false;
  }

  function resetToDefaults(): void {
    workDuration = DEFAULT_WORK_DURATION;
    shortBreakDuration = DEFAULT_SHORT_BREAK;
    longBreakDuration = DEFAULT_LONG_BREAK;
    pauseTimer();
    // Only reset timeLeft if we're at the beginning of a session
    if (timeLeft === sessionDuration || timeLeft > sessionDuration) {
      timeLeft = sessionDuration;
    }
    showSettings = false;
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
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
      Notification.requestPermission();
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

<svelte:head>
  <title>Pomodoro Timer - Productivity Timer</title>
  <meta
    name="description"
    content="Free Pomodoro timer for productivity and time management. Boost your focus with work/break cycles, notifications, and progress tracking."
  />
  <meta
    name="keywords"
    content="pomodoro timer, productivity timer, focus timer, time management, work timer, break timer"
  />
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
  <!-- Header -->
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pomodoro Timer</h1>
    <p class="text-gray-600 dark:text-gray-400">
      Boost your productivity with focused work sessions and regular breaks
    </p>
  </div>

  <div class="grid lg:grid-cols-3 gap-6">
    <!-- Main Timer Section -->
    <div class="lg:col-span-2">
      <!-- Timer Display -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <!-- Session Type -->
        <div class="text-center mb-6">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
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
        <div class="relative w-64 h-64 mx-auto mb-8">
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
            <div class="text-5xl font-mono font-bold text-gray-900 dark:text-white mb-2">
              {formattedTime}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Session {sessionCount + 1}
            </div>
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="flex justify-center gap-4 mb-6">
          {#if !isRunning}
            <button
              onclick={startTimer}
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Play class="w-5 h-5" />
              Start
            </button>
          {:else}
            <button
              onclick={pauseTimer}
              class="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <Pause class="w-5 h-5" />
              Pause
            </button>
          {/if}

          <button
            onclick={resetTimer}
            class="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <RotateCcw class="w-5 h-5" />
            Reset
          </button>
        </div>

        <!-- Notification Permission -->
        {#if 'Notification' in window && Notification.permission === 'default'}
          <div class="text-center">
            <button
              onclick={requestNotificationPermission}
              class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              Enable notifications to know when sessions end
            </button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Settings Sidebar -->
    <div class="lg:col-span-1">
      <!-- Timer Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings class="w-5 h-5" />
            Timer Settings
          </h3>
          <button
            onclick={() => (showSettings = !showSettings)}
            class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>

        {#if showSettings}
          <div class="space-y-4">
            <!-- Work Duration -->
            <div>
              <label
                for="work-duration"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Work Duration (minutes)
              </label>
              <input
                id="work-duration"
                type="number"
                bind:value={workDuration}
                min="1"
                max="60"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pomodoro recommends: 25 minutes
              </p>
            </div>

            <!-- Short Break -->
            <div>
              <label
                for="short-break"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Short Break (minutes)
              </label>
              <input
                id="short-break"
                type="number"
                bind:value={shortBreakDuration}
                min="1"
                max="30"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pomodoro recommends: 5 minutes
              </p>
            </div>

            <!-- Long Break -->
            <div>
              <label
                for="long-break"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Long Break (minutes)
              </label>
              <input
                id="long-break"
                type="number"
                bind:value={longBreakDuration}
                min="1"
                max="60"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pomodoro recommends: 15 minutes
              </p>
            </div>

            <!-- Apply/Reset Buttons -->
            <div class="flex gap-2">
              <button
                onclick={applyCustomSettings}
                class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Apply Settings
              </button>
              <button
                onclick={resetToDefaults}
                class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Reset to Default
              </button>
            </div>
          </div>
        {:else}
          <!-- Current Settings Display -->
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Work:</span>
              <span class="font-medium text-gray-900 dark:text-white"
                >{Math.floor(workDuration / 60)} min</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Short Break:</span>
              <span class="font-medium text-gray-900 dark:text-white"
                >{Math.floor(shortBreakDuration / 60)} min</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Long Break:</span>
              <span class="font-medium text-gray-900 dark:text-white"
                >{Math.floor(longBreakDuration / 60)} min</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Sessions:</span>
              <span class="font-medium text-gray-900 dark:text-white">{sessionCount}</span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Pomodoro Info -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Coffee class="w-5 h-5" />
          Pomodoro Method
        </h3>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
            <p><strong>Work Session:</strong> 25 minutes of focused work</p>
          </div>
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
            <p><strong>Short Break:</strong> 5 minutes to recharge</p>
          </div>
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></div>
            <p><strong>Long Break:</strong> 15 minutes after 4 sessions</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- How to Use Section -->
  <div class="mt-8 grid md:grid-cols-2 gap-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Clock class="w-5 h-5" />
        How to Use
      </h3>
      <ol class="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
        <li>Customize your timer settings or use Pomodoro defaults</li>
        <li>Click "Start" to begin your work session</li>
        <li>Work continuously without distractions until the timer ends</li>
        <li>Take a short break when the session completes</li>
        <li>After 4 sessions, enjoy a longer break</li>
        <li>Repeat the cycle for maximum productivity</li>
      </ol>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 class="font-semibold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
      <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <li class="flex items-start gap-2">
          <span>•</span>
          <span>Use the timer for focused work without distractions</span>
        </li>
        <li class="flex items-start gap-2">
          <span>•</span>
          <span>During breaks, step away from your screen and move around</span>
        </li>
        <li class="flex items-start gap-2">
          <span>•</span>
          <span>Combine with a to-do list for maximum productivity</span>
        </li>
        <li class="flex items-start gap-2">
          <span>•</span>
          <span>Adjust timing based on your personal workflow and energy</span>
        </li>
        <li class="flex items-start gap-2">
          <span>•</span>
          <span>Stay hydrated and take care of your posture during sessions</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Pomodoro Recommendation Note -->
  <div
    class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
  >
    <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🍅 Why Pomodoro Technique?</h4>
    <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
      The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. It's a time
      management method that uses a timer to break work into intervals, traditionally 25 minutes in
      length, separated by short breaks.
    </p>
    <div class="text-sm text-blue-800 dark:text-blue-200">
      <strong>Benefits:</strong> Improved focus, reduced burnout, better time estimation, increased productivity,
      and sustainable work habits.
    </div>
  </div>
</div>

<style>
  /* Ensure smooth transitions */
  circle {
    transition: stroke-dashoffset 1s linear;
  }
</style>
