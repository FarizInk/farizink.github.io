<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import {
    Lock,
    Shield,
    Settings2,
    Copy,
    RefreshCw,
    History,
    Trash2,
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
  let passwordHistory = $state<Array<{ id: string; password: string; timestamp: Date; strength: string }>>([]);
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
      id: crypto.randomUUID(),
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
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'strong':
        return 'text-green-500';
      case 'very-strong':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  }

  function getStrengthBgColor(strength: string): string {
    switch (strength) {
      case 'weak':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'medium':
        return 'bg-warning-100 dark:bg-yellow-900/20';
      case 'strong':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'very-strong':
        return 'bg-green-200 dark:bg-green-900/30';
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

  // Generate initial password once on mount
  let hasInitialized = $state(false);
  $effect(() => {
    if (!hasInitialized) {
      generatePassword();
      hasInitialized = true;
    }
  });
</script>

<ToolLayout
  title="Password Generator"
  description="Generate secure and random passwords with customizable options for maximum security."
  icon={Lock}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Lock class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Password Generator</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Generate secure random passwords with customizable options
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-copy" onclick={() => generateMultiplePasswords(5)}>
          Generate 5
        </button>
        <button class="btn btn-secondary" onclick={clearAll}>
          <Trash2 class="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  </div>

  <!-- Presets -->
  <div class="flex justify-center flex-wrap gap-3 mb-6">
    {#each ['strong', 'memorable', 'pin', 'passphrase'] as preset (preset)}
      <button
        onclick={() => usePreset(preset as 'strong' | 'memorable' | 'pin' | 'passphrase')}
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-warning-300 dark:hover:border-primary-400"
      >
        {preset}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Settings Panel -->
    <div class="lg:col-span-2 space-y-4">
      <!-- Main Password Display -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
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
            <button class="btn btn-sm btn-copy" onclick={copyToClipboard}>
              <Copy class="w-3.5 h-3.5" />
              Copy
            </button>
          </div>
        </div>

        <input
          bind:value={password}
          readonly
          placeholder="Click 'Generate Password' to create a secure password"
          class="tool-input w-full font-mono text-lg py-3"
        />

        <!-- Strength Indicator -->
        {#if password}
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                class="h-full transition-all duration-300 {calculatePasswordStrength(password) ===
                'weak'
                  ? 'bg-red-500 w-1/4'
                  : calculatePasswordStrength(password) === 'medium'
                    ? 'bg-warning-500 w-2/4'
                    : calculatePasswordStrength(password) === 'strong'
                      ? 'bg-green-500 w-3/4'
                      : 'bg-green-600 w-full'}"
              ></div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password Settings</h2>

        <!-- Length Slider -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <label
              for="password-length-slider"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 dark:accent-purple-500"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <!-- Character Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeUppercase}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Uppercase (A-Z)</span
            >
          </label>

          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeLowercase}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Lowercase (a-z)</span
            >
          </label>

          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeNumbers}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Numbers (0-9)</span
            >
          </label>

          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeSymbols}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Symbols (!@#$%)</span
            >
          </label>

          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={useCustomCharacters}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Custom Characters</span
            >
          </label>
        </div>

        {#if useCustomCharacters}
          <div class="mb-6">
            <input
              bind:value={customCharacters}
              placeholder="Enter custom characters..."
              class="tool-input w-full font-mono text-sm py-2"
            />
          </div>
        {/if}

        <!-- Exclusion Options -->
        <div class="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeSimilar}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Exclude Similar Characters (i, l, 1, L, o, 0, O)</span
            >
          </label>

          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeAmbiguous}
              class="absolute opacity-0 cursor-pointer h-0 w-0"
            />
            <span
              class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45"
            ></span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
              >Exclude Ambiguous Characters</span
            >
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 mt-6">
          <button class="btn btn-copy flex-1" onclick={generatePassword}>
            <RefreshCw class="w-4 h-4" />
            Generate Password
          </button>
        </div>
      </div>
    </div>

    <!-- Password History -->
    <div>
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
          {#if passwordHistory.length > 0}
            <button class="btn btn-sm btn-secondary" onclick={clearAll}>Clear</button>
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
          <div class="space-y-2 max-h-[400px] overflow-y-auto">
            {#each passwordHistory as item (item.id)}
              <div
                class="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
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
                      <button class="btn btn-sm btn-secondary" onclick={() => copyHistoryPassword(item.password)}>
                        <Copy class="w-3.5 h-3.5" />
                      </button>
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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Shield class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strong Security</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate cryptographically secure passwords with customizable complexity
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Settings2 class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable Options</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Fine-tune character sets, length, and exclusions for your specific needs
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <History class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Password History</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Keep track of generated passwords with strength analysis
      </p>
    </div>
  </div>
</ToolLayout>
