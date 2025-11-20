<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import {
    Lock,
    Shield,
    Settings2,
    Copy,
    RefreshCw,
    History,
    Trash2,
    ChevronLeft
  } from '@lucide/svelte';
  import { toast } from 'svelte-sonner';

  let password = $state('');
  let passwordLength = $state(16);
  let includeUppercase = $state(true);
  let includeLowercase = $state(true);
  let includeNumbers = $state(true);
  let includeSymbols = $state(true);
  let excludeSimilar = $state(false);
  let excludeAmbiguous = $state(false);
  let passwordHistory = $state<Array<{ password: string; timestamp: Date; strength: string }>>([]);
  let customCharacters = $state('');
  let useCustomCharacters = $state(false);

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similarChars = 'il1Lo0O';
  const ambiguousChars = '{}[]()/\\\'"`~,;.<>';

  function generatePassword() {
    let charset = '';

    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
    if (useCustomCharacters) charset += customCharacters;

    if (excludeSimilar) {
      charset = charset
        .split('')
        .filter(char => !similarChars.includes(char))
        .join('');
    }

    if (excludeAmbiguous) {
      charset = charset
        .split('')
        .filter(char => !ambiguousChars.includes(char))
        .join('');
    }

    if (charset === '') {
      password = '';
      toast.error('Please select at least one character type');
      return;
    }

    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    password = result;
    addToHistory(result);
  }

  function addToHistory(pwd: string) {
    const strength = calculatePasswordStrength(pwd);
    passwordHistory.unshift({
      password: pwd,
      timestamp: new Date(),
      strength
    });
    if (passwordHistory.length > 10) {
      passwordHistory = passwordHistory.slice(0, 10);
    }
  }

  function calculatePasswordStrength(pwd: string): string {
    if (pwd.length === 0) return 'none';

    let strength = 0;

    // Length bonus
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (pwd.length >= 16) strength++;

    // Character variety bonus
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    if (strength <= 6) return 'strong';
    return 'very-strong';
  }

  function getStrengthColor(strength: string): string {
    switch (strength) {
      case 'weak':
        return 'text-danger-500';
      case 'medium':
        return 'text-warning-500';
      case 'strong':
        return 'text-success-500';
      case 'very-strong':
        return 'text-success-600';
      default:
        return 'text-gray-500';
    }
  }

  function getStrengthBgColor(strength: string): string {
    switch (strength) {
      case 'weak':
        return 'bg-danger-100 dark:bg-danger-900/20';
      case 'medium':
        return 'bg-warning-100 dark:bg-warning-900/20';
      case 'strong':
        return 'bg-success-100 dark:bg-success-900/20';
      case 'very-strong':
        return 'bg-success-200 dark:bg-success-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  }

  function copyToClipboard() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard');
  }

  function copyHistoryPassword(pwd: string) {
    navigator.clipboard.writeText(pwd);
    toast.success('Password copied to clipboard');
  }

  function clearAll() {
    password = '';
    passwordHistory = [];
    toast.success('Cleared history');
  }

  function getStrengthText(strength: string): string {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      case 'very-strong':
        return 'Very Strong';
      default:
        return 'No Password';
    }
  }

  function generateMultiplePasswords(count: number) {
    for (let i = 0; i < count; i++) {
      generatePassword();
    }
    toast.success(`Generated ${count} passwords`);
  }

  function usePreset(preset: 'strong' | 'memorable' | 'pin' | 'passphrase') {
    switch (preset) {
      case 'strong':
        passwordLength = 16;
        includeUppercase = true;
        includeLowercase = true;
        includeNumbers = true;
        includeSymbols = true;
        excludeSimilar = true;
        excludeAmbiguous = false;
        break;
      case 'memorable':
        passwordLength = 12;
        includeUppercase = true;
        includeLowercase = true;
        includeNumbers = true;
        includeSymbols = false;
        excludeSimilar = false;
        excludeAmbiguous = false;
        break;
      case 'pin':
        passwordLength = 4;
        includeUppercase = false;
        includeLowercase = false;
        includeNumbers = true;
        includeSymbols = false;
        excludeSimilar = false;
        excludeAmbiguous = false;
        break;
      case 'passphrase':
        passwordLength = 32;
        includeUppercase = false;
        includeLowercase = true;
        includeNumbers = false;
        includeSymbols = true;
        excludeSimilar = false;
        excludeAmbiguous = false;
        customCharacters = ' -_';
        useCustomCharacters = true;
        break;
    }
    generatePassword();
    toast.success(`Applied ${preset} preset`);
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Generate initial password
  $effect(() => {
    generatePassword();
  });
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-5 h-5 mr-2" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-danger-400 to-danger-600 rounded-2xl mb-4"
      >
        <Lock class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Password Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate secure and random passwords with customizable options for maximum security.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a
          href="/"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a
          href="/tools"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">Password Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex justify-center flex-wrap gap-2">
    <button onclick={() => generateMultiplePasswords(5)} class="btn btn-primary btn-sm">
      Generate 5
    </button>
    <button onclick={clearAll} class="btn btn-primary btn-sm text-red-500 hover:text-red-600">
      <Trash2 class="w-4 h-4 mr-2" />
      Clear
    </button>
  </div>

  <!-- Presets -->
  <div class="mb-6 flex justify-center">
    <div
      class="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-sm"
    >
      {#each ['strong', 'memorable', 'pin', 'passphrase'] as preset (preset)}
        <button
          onclick={() => usePreset(preset as 'strong' | 'memorable' | 'pin' | 'passphrase')}
          class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"
        >
          {preset}
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Settings Panel -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Main Password Display -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Password</h2>
          <div class="flex items-center gap-2">
            {#if password}
              <span
                class="text-sm font-medium {getStrengthColor(calculatePasswordStrength(password))}"
              >
                {getStrengthText(calculatePasswordStrength(password))}
              </span>
            {/if}
            <button onclick={copyToClipboard} class="btn btn-secondary btn-sm">
              <Copy class="w-4 h-4 mr-2" />
              Copy
            </button>
          </div>
        </div>

        <div class="relative">
          <input
            bind:value={password}
            readonly
            placeholder="Click 'Generate Password' to create a secure password"
            class="input font-mono text-lg"
          />
        </div>

        <!-- Strength Indicator -->
        {#if password}
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="h-full transition-all duration-300 {calculatePasswordStrength(password) ===
                'weak'
                  ? 'bg-danger-500 w-1/4'
                  : calculatePasswordStrength(password) === 'medium'
                    ? 'bg-warning-500 w-2/4'
                    : calculatePasswordStrength(password) === 'strong'
                      ? 'bg-success-500 w-3/4'
                      : 'bg-success-600 w-full'}"
              ></div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password Settings</h2>

        <!-- Length Slider -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <label
              for="password-length-slider"
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password Length
            </label>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {passwordLength}
            </span>
          </div>
          <input
            id="password-length-slider"
            type="range"
            min="4"
            max="64"
            bind:value={passwordLength}
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-danger-500"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <!-- Character Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeUppercase}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Uppercase (A-Z)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeLowercase}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Lowercase (a-z)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeNumbers}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Numbers (0-9)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeSymbols}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Symbols (!@#$%)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={useCustomCharacters}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Characters
            </span>
          </label>
        </div>

        {#if useCustomCharacters}
          <div class="mb-6">
            <input
              bind:value={customCharacters}
              placeholder="Enter custom characters..."
              class="input font-mono text-sm"
            />
          </div>
        {/if}

        <!-- Exclusion Options -->
        <div class="space-y-4 mb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeSimilar}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Exclude Similar Characters (i, l, 1, L, o, 0, O)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeAmbiguous}
              class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Exclude Ambiguous Characters ({`{ } [ ] ( ) / \\ ' " \` ~ , ; . < >`})
            </span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3">
          <button onclick={generatePassword} class="btn btn-primary btn-lg w-full">
            <RefreshCw class="w-4 h-4 mr-2" />
            Generate Password
          </button>
        </div>
      </div>
    </div>

    <!-- Password History -->
    <div>
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
          {#if passwordHistory.length > 0}
            <button onclick={clearAll} class="text-sm text-red-500 hover:text-red-600">
              Clear
            </button>
          {/if}
        </div>

        {#if passwordHistory.length === 0}
          <div
            class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"
          >
            <History class="w-8 h-8 mb-2 opacity-50" />
            <p class="text-sm">No passwords generated yet</p>
          </div>
        {:else}
          <div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            {#each passwordHistory as item (item.timestamp.getTime())}
              <div
                class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 mr-2 min-w-0">
                    <div class="font-mono text-sm text-gray-900 dark:text-white break-all">
                      {item.password}
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                      <div class="flex items-center gap-2">
                        <span
                          class="text-xs px-2 py-0.5 rounded-full {getStrengthBgColor(
                            item.strength
                          )} {getStrengthColor(item.strength)}"
                        >
                          {getStrengthText(item.strength)}
                        </span>
                        <button
                          onclick={() => copyHistoryPassword(item.password)}
                          class="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Copy class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400">
        <Shield class="w-5 h-5" />
        <h3 class="font-medium">Strong Security</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Generate cryptographically secure passwords with customizable complexity
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400">
        <Settings2 class="w-5 h-5" />
        <h3 class="font-medium">Customizable Options</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Fine-tune character sets, length, and exclusions for your specific needs
      </p>
    </div>
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400">
        <History class="w-5 h-5" />
        <h3 class="font-medium">Password History</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Keep track of generated passwords with strength analysis
      </p>
    </div>
  </div>
</div>
