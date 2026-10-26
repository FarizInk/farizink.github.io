<script lang="ts">
  import { Mail, Lock, Eye, EyeOff, User, X, LoaderCircle } from '@lucide/svelte';
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
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="flex size-10 items-center justify-center rounded-md bg-tile-deep text-ink-on-dark">
        <User class="size-5" />
      </div>
      <div>
        <h2 class="text-title text-ink">Welcome back</h2>
        <p class="text-body-sm text-ink-muted">Log in to your account</p>
      </div>
    </div>
    <button type="button" onclick={closeModal} class="btn-icon" aria-label="Close">
      <X class="size-5" />
    </button>
  </div>

  <form onsubmit={handleLogin} class="space-y-5">
    <div>
      <label for="email" class="label">
        Email address
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail class="size-5 text-ink-muted" />
        </div>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          class="input !pl-11"
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
          <Lock class="size-5 text-ink-muted" />
        </div>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          class="input !pl-11 !pr-12"
          bind:value={password}
          disabled={isLoading}
          autocomplete="current-password"
          required
        />
        <button
          type="button"
          onclick={() => (showPassword = !showPassword)}
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-ink-muted transition-colors duration-150 hover:text-ink"
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
      class="btn btn-primary w-full"
    >
      {#if isLoading}
        <LoaderCircle class="size-5 animate-spin" />
        <span>Logging in...</span>
      {:else}
        <span>Log in</span>
      {/if}
    </button>
  </form>
</Modal>
