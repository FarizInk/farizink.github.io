<script lang="ts">
  import { onMount } from 'svelte';
  import { Activity, CheckCircle, CircleX, AlertCircle } from '@lucide/svelte';
  import { API_BASE_URL } from '../lib/constants';

  // Health status interface
  interface HealthData {
    success: boolean;
    data: {
      status: string;
      uptime: number;
      environment: string;
      version: string;
      memory: {
        rss: number;
        heapTotal: number;
        heapUsed: number;
        external: number;
        arrayBuffers: number;
      };
    };
    meta: {
      timestamp: string;
      path: string;
    };
  }

  let healthData = $state<HealthData | null>(null);
  let isChecking = $state(false);
  let error = $state<string | null>(null);
  let lastChecked = $state<Date | null>(null);

  // Function to check API health status
  // Note: This is intentionally not a $state function as it's an action, not reactive data
  // svelte-ignore non_reactive_update
  async function checkHealth() {
    if (isChecking) return;

    isChecking = true;
    error = null;

    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: HealthData = await response.json();
      healthData = data;
      lastChecked = new Date();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to check health';
      healthData = null;
    } finally {
      isChecking = false;
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  // Helper functions for potential future use
  // function getStatusIcon() {
  //   if (isChecking) return Activity;
  //   if (error) return CircleX;
  //   if (healthData?.data.status === 'ok') return CheckCircle;
  //   return AlertCircle;
  // }

  // function getStatusColor() {
  //   if (isChecking) return 'text-blue-600 dark:text-blue-400';
  //   if (error) return 'text-red-600 dark:text-red-400';
  //   if (healthData?.data.status === 'ok') return 'text-green-600 dark:text-green-400';
  //   return 'text-yellow-600 dark:text-yellow-400';
  // }

  function getStatusText() {
    if (isChecking) return 'Checking...';
    if (error) return 'Error';
    if (healthData?.data.status === 'ok') return 'Online';
    return 'Unknown';
  }

  // Auto-check health when component mounts
  onMount(() => {
    checkHealth();
  });

  // Export the checkHealth function so parent can call it
  export { checkHealth };
</script>

<!-- Compact Health Status -->
<div class="relative group">
  <!-- Main Status Bar -->
  <div
    class="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
  >
    <!-- Status Indicator -->
    <div class="flex items-center gap-2">
      <!-- Status Icon with Animation -->
      <div class="relative">
        {#if isChecking}
          <Activity class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
        {:else if error}
          <CircleX class="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
        {:else if healthData?.data.status === 'ok'}
          <CheckCircle class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <div
            class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"
          ></div>
        {:else}
          <AlertCircle class="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
        {/if}
      </div>

      <!-- Status Text -->
      <div class="flex items-center gap-1.5">
        <span class="text-xs font-medium text-gray-900 dark:text-white">
          {isChecking ? 'Checking' : getStatusText()}
        </span>
        {#if lastChecked && !isChecking}
          <span class="text-xs text-gray-400 dark:text-gray-500">
            • {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        {/if}
      </div>
    </div>

    <!-- Compact Refresh Button -->
    <button
      onclick={checkHealth}
      disabled={isChecking}
      class="w-6 h-6 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-105"
      title={isChecking ? 'Checking...' : 'Refresh health status'}
    >
      <Activity
        class={`w-3 h-3 text-gray-500 dark:text-gray-400 ${isChecking ? 'animate-spin' : ''}`}
      />
    </button>
  </div>

  <!-- Hover Details Card -->
  {#if healthData && !error}
    <div
      class="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 top-full left-0 right-0 mt-2 p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
    >
      <!-- Mini Stats Grid -->
      <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <!-- Version -->
        <div class="flex items-center gap-1">
          <div class="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
          <span class="text-gray-600 dark:text-gray-400">v</span>
          <span class="text-gray-900 dark:text-white font-medium">{healthData.data.version}</span>
        </div>

        <!-- Environment -->
        <div class="flex items-center gap-1">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span class="text-gray-900 dark:text-white font-medium"
            >{healthData.data.environment}</span
          >
        </div>

        <!-- Uptime -->
        <div class="flex items-center gap-1">
          <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span class="text-gray-900 dark:text-white font-medium"
            >{formatUptime(healthData.data.uptime)}</span
          >
        </div>

        <!-- Memory -->
        <div class="flex items-center gap-1">
          <div class="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
          <span class="text-gray-900 dark:text-white font-medium"
            >{formatBytes(healthData.data.memory.heapUsed)}</span
          >
        </div>
      </div>

      <!-- Footer -->
      <div
        class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center"
      >
        API Server Status
      </div>
    </div>
  {:else if error}
    <div
      class="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 top-full left-0 right-0 mt-2 p-2.5 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-lg shadow-lg"
    >
      <div class="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
        <CircleX class="w-3 h-3" />
        <span class="font-medium">Connection Error</span>
      </div>
      <div class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
        {error}
      </div>
    </div>
  {/if}
</div>
