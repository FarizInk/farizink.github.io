<script lang="ts">
  import { Mail, Lock, Eye, EyeOff, User, Sparkles } from '@lucide/svelte';
  import { saveAuth, login } from '../lib/auth';
  import { toast } from 'svelte-sonner';
  import Modal from './Modal.svelte';

  let { isOpen = $bindable(false) } = $props();

  let email = $state('');
  let password = $state('');
  let showPassword = $state(false);
  let isLoading = $state(false);
  let emailInput = $state<HTMLInputElement>();

  function closeModal() {
    isOpen = false;
    email = '';
    password = '';
    showPassword = false;
  }

  async function handleLogin(event: Event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Email and password are required');
      return;
    }

    isLoading = true;

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
    }
  }

  // Focus email input when modal opens
  $effect(() => {
    if (isOpen) {
      setTimeout(() => {
        emailInput?.focus();
      }, 100);
    }
  });
</script>

<Modal
  bind:isOpen={isOpen}
  onClose={closeModal}
  maxW="max-w-md"
  title=""
  showCloseButton={true}
>
  {#snippet header()}
    <div class="py-6 bg-gradient-to-br from-warning-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20">
      <div class="flex items-center gap-3 px-6">
        <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-primary-500 dark:to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
          <User class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet body()}
    <div class="py-6">
      <form onsubmit={handleLogin} class="px-6 space-y-5">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              class="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-warning-500 dark:focus:border-purple-500 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              bind:value={email}
              bind:this={emailInput}
              disabled={isLoading}
              autocomplete="email"
              required
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              class="w-full pl-11 pr-12 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-warning-500 dark:focus:border-purple-500 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] dark:focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              bind:value={password}
              disabled={isLoading}
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              onclick={() => (showPassword = !showPassword)}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {#if showPassword}
                <EyeOff class="w-5 h-5" />
              {:else}
                <Eye class="w-5 h-5" />
              {/if}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          disabled={isLoading || !email.trim() || !password.trim()}
          class="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
        >
          {#if isLoading}
            <div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Signing in...</span>
          {:else}
            <Sparkles class="w-5 h-5" />
            <span>Sign In</span>
          {/if}
        </button>
      </form>
    </div>
  {/snippet}
</Modal>
