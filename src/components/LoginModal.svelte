<script lang="ts">
  import { Mail, Lock, Eye, EyeOff, X } from '@lucide/svelte';
  import { saveAuth, login } from '../lib/auth';
  import { toast } from 'svelte-sonner';
  import { API_BASE_URL } from '../lib/constants';

  let { isOpen = $bindable(false) } = $props();

  let email = $state('');
  let password = $state('');
  let showPassword = $state(false);
  let isLoading = $state(false);
  let errorMessage = $state(''); // eslint-disable-line @typescript-eslint/no-unused-vars

  let emailInput = $state<HTMLInputElement>();
  let modalElement = $state<HTMLDivElement>();

  function closeModal() {
    isOpen = false;
    email = '';
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
      // Focus email input when modal opens
      setTimeout(() => {
        emailInput?.focus();
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

    if (!email.trim() || !password.trim()) {
      toast.error('Email and password are required');
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      // Use login function from auth.ts
      const result = await login(email.trim(), password.trim());

      if (!result.success || !result.data) {
        // Handle error
        toast.error(result.error || 'Login failed');
        return;
      }

      // Laravel API returns: { token, token_type, expires_in, user: { name, email, ... } }
      const { token, user } = result.data;

      console.log('Login successful:', { email: user.email, token });

      // Store authentication data using auth utilities
      saveAuth(token, user.name);

      // Show success toast
      toast.success(`Welcome back, ${user.name}!`);

      closeModal();

      // Emit login success event for other components
      document.dispatchEvent(
        new CustomEvent('login-success', {
          detail: {
            username: user.name,
            email: user.email,
            token: token
          }
        })
      );
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
      // Refocus email input after submit attempt
      setTimeout(() => {
        emailInput?.focus();
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
          <!-- Email Field -->
          <div class="mb-4">
            <label for="email" class="label"> Email </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="w-4 h-4 text-secondary-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                class="input !pl-10"
                bind:value={email}
                bind:this={emailInput}
                disabled={isLoading}
                autocomplete="email"
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
            disabled={isLoading || !email.trim() || !password.trim()}
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
