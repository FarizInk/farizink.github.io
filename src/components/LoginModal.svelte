<script lang="ts">
  import { Mail, Lock, Eye, EyeOff, User, Sparkles, X } from '@lucide/svelte';
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
      const result = await login(email.trim(), password.trim());

      if (!result.success || !result.data) {
        toast.error(result.error || 'Login failed');
        return;
      }

      const { token, user } = result.data;

      saveAuth(token, user.name);
      toast.success(`Welcome back, ${user.name}!`);
      closeModal();

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

  $effect(() => {
    if (isOpen) {
      setTimeout(() => {
        emailInput?.focus();
      }, 100);
    }
  });
</script>

<Modal bind:isOpen={isOpen} onClose={closeModal} maxW="max-w-md">
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 dark:from-purple-500 dark:to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <User class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </div>
    </div>
    <button onclick={closeModal} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <X class="w-5 h-5 text-gray-500" />
    </button>
  </div>

  <form onsubmit={handleLogin} class="space-y-5">
    <div>
      <label for="email" class="label">
        Email Address
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail class="w-5 h-5 text-gray-400" />
        </div>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          class="input !pl-11 !py-3"
          bind:value={email}
          bind:this={emailInput}
          disabled={isLoading}
          autocomplete="email"
          required
        />
      </div>
    </div>

    <div>
      <label for="password" class="label">
        Password
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock class="w-5 h-5 text-gray-400" />
        </div>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          class="input !pl-11 !pr-12 !py-3"
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

    <button
      type="submit"
      disabled={isLoading || !email.trim() || !password.trim()}
      class="btn btn-primaryw-full flex items-center justify-center gap-2 py-3.5   font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
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
</Modal>
