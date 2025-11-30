<script lang="ts">
  import { User, Lock, Eye, EyeOff, X } from '@lucide/svelte';
  import { saveAuth } from '../lib/auth';
  import { toast } from 'svelte-sonner';
  import { API_BASE_URL } from '../lib/constants';

  let { isOpen = $bindable(false) } = $props();

  let username = $state('');
  let password = $state('');
  let showPassword = $state(false);
  let isLoading = $state(false);
  let errorMessage = $state(''); // eslint-disable-line @typescript-eslint/no-unused-vars

  let usernameInput = $state<HTMLInputElement>();
  let modalElement = $state<HTMLDivElement>();

  function closeModal() {
    isOpen = false;
    username = '';
    password = '';
    showPassword = false;
    errorMessage = '';
  }

  // Handle ESC key to close modal
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      closeModal();
    }
  }

  // Set up autofocus and keyboard listeners when modal opens
  $effect(() => {
    if (isOpen) {
      // Focus username input when modal opens
      setTimeout(() => {
        usernameInput?.focus();
      }, 100);

      // Add global keyboard listener for ESC
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  async function handleLogin(event: Event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Username and password are required');
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      // Real login API call using auth utilities
      const loginData = {
        username: username.trim(),
        password: password.trim()
      };

      const response = await fetch(
        `${API_BASE_URL}/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData),
          signal: AbortSignal.timeout(10000) // 10 second timeout
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle HTTP errors with toast notifications
        if (response.status === 401) {
          toast.error('Invalid username or password');
        } else if (response.status === 429) {
          toast.warning('Too many login attempts. Please try again later.');
        } else {
          toast.error(data?.meta?.message || `Login failed (${response.status})`);
        }
        return;
      }

      // Check if API response is successful
      if (data.success && data.data?.token) {
        console.log('Login successful:', { username: loginData.username, token: data.data.token });

        // Store authentication data using auth utilities
        saveAuth(data.data.token, loginData.username, data.data.expiresIn);

        // Show success toast
        toast.success(`Welcome back, ${loginData.username}!`);

        closeModal();

        // Emit login success event for other components
        document.dispatchEvent(
          new CustomEvent('login-success', {
            detail: {
              username: loginData.username,
              token: data.data.token
            }
          })
        );
      } else {
        toast.error(data?.meta?.message || 'Invalid login response');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          toast.error('Login request timed out. Please try again.');
        } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          toast.error('Network error. Please check your connection.');
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else {
        toast.error('Login failed. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      isLoading = false;
      // Refocus username input after submit attempt
      setTimeout(() => {
        usernameInput?.focus();
      }, 100);
    }
  }
</script>

<!-- Backdrop -->
{#if isOpen}
  <div
    class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    onclick={e => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="login-modal-title"
    tabindex="-1"
  >
    <!-- Modal -->
    <div
      bind:this={modalElement}
      class="bg-white dark:bg-secondary-800 rounded-lg shadow-2xl w-full max-w-md border border-secondary-200 dark:border-secondary-700 overflow-hidden"
      role="document"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700"
      >
        <h2
          id="login-modal-title"
          class="text-xl font-semibold text-secondary-900 dark:text-secondary-50"
        >
          Login
        </h2>
        <button
          onclick={closeModal}
          class="w-8 h-8 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center justify-center transition-colors"
          aria-label="Close login modal"
        >
          <X class="w-4 h-4 text-secondary-500 dark:text-secondary-400" />
        </button>
      </div>

      <!-- Form -->
      <div class="p-6">
        <form onsubmit={handleLogin}>
          <!-- Username Field -->
          <div class="mb-4">
            <label for="username" class="label"> Username </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="w-4 h-4 text-secondary-400" />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                class="input !pl-10"
                bind:value={username}
                bind:this={usernameInput}
                disabled={isLoading}
                autocomplete="username"
                required
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-6">
            <label for="password" class="label"> Password </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="w-4 h-4 text-secondary-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                class="input !pl-10 pr-10"
                bind:value={password}
                disabled={isLoading}
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                onclick={() => (showPassword = !showPassword)}
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {#if showPassword}
                  <EyeOff
                    class="w-4 h-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                  />
                {:else}
                  <Eye
                    class="w-4 h-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                  />
                {/if}
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary w-full flex items-center justify-center"
            disabled={isLoading || !username.trim() || !password.trim()}
          >
            {#if isLoading}
              <div
                class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              ></div>
              Signing in...
            {:else}
              Sign In
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}
