<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Shield, Lock, Settings2 } from '@lucide/svelte';

  let password = $state('');
  let passwordLength = $state(16);
  let includeUppercase = $state(true);
  let includeLowercase = $state(true);
  let includeNumbers = $state(true);
  let includeSymbols = $state(true);
  let excludeSimilar = $state(false);
  let excludeAmbiguous = $state(false);
  let passwordHistory = $state<Array<{ password: string; timestamp: Date; strength: string }>>([]);
  let copiedText = $state('');
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
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'strong':
        return 'text-green-600 dark:text-green-400';
      case 'very-strong':
        return 'text-emerald-600 dark:text-emerald-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  function getStrengthBgColor(strength: string): string {
    switch (strength) {
      case 'weak':
        return 'bg-red-100 dark:bg-red-900/20';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'strong':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'very-strong':
        return 'bg-emerald-100 dark:bg-emerald-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
    copiedText = 'password';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function copyHistoryPassword(pwd: string) {
    navigator.clipboard.writeText(pwd);
    copiedText = 'history';
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function regeneratePassword() {
    generatePassword();
  }

  function clearAll() {
    password = '';
    passwordHistory = [];
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
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  // Generate initial password
  generatePassword();
</script>

<div class="max-w-6xl mx-auto p-6">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <button
        onclick={handleBackToTools}
        class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft class="w-5 h-5" />
        Back to Tools
      </button>
    </div>

    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl mb-4"
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

  <!-- Presets -->
  <div class="mb-6">
    <div class="flex justify-center">
      <div
        class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
      >
        <button
          onclick={() => usePreset('strong')}
          class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Strong
        </button>
        <button
          onclick={() => usePreset('memorable')}
          class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Memorable
        </button>
        <button
          onclick={() => usePreset('pin')}
          class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          PIN
        </button>
        <button
          onclick={() => usePreset('passphrase')}
          class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Passphrase
        </button>
      </div>
    </div>
  </div>

  <!-- Main Password Display -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Password</h2>
      <div class="flex items-center gap-2">
        {#if password}
          <span class="text-sm font-medium {getStrengthColor(calculatePasswordStrength(password))}">
            {getStrengthText(calculatePasswordStrength(password))}
          </span>
        {/if}
        <button
          onclick={copyToClipboard}
          class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          {copiedText === 'password' ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>

    <div class="relative">
      <input
        type="text"
        bind:value={password}
        readonly
        placeholder="Click 'Generate Password' to create a secure password"
        class="w-full p-4 font-mono text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
      />
      {#if !password}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p class="text-gray-400 dark:text-gray-600">
            Click 'Generate Password' to create a secure password
          </p>
        </div>
      {/if}
    </div>

    <!-- Strength Indicator -->
    {#if password}
      <div class="mt-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600 dark:text-gray-400">Password Strength</span>
          <span class="font-medium {getStrengthColor(calculatePasswordStrength(password))}">
            {getStrengthText(calculatePasswordStrength(password))}
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-300 {calculatePasswordStrength(
              password
            ) === 'weak'
              ? 'w-1/4 bg-red-500'
              : calculatePasswordStrength(password) === 'medium'
                ? 'w-2/4 bg-yellow-500'
                : calculatePasswordStrength(password) === 'strong'
                  ? 'w-3/4 bg-green-500'
                  : 'w-full bg-emerald-500'}"
          ></div>
        </div>
      </div>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Settings Panel -->
    <div class="lg:col-span-2">
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password Settings</h2>

        <!-- Length Slider -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Length
            </label>
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {passwordLength}
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            bind:value={passwordLength}
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <!-- Character Options -->
        <div class="space-y-4 mb-6">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeUppercase}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Uppercase Letters (A-Z)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeLowercase}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Lowercase Letters (a-z)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeNumbers}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Numbers (0-9)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeSymbols}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Symbols (!@#$%^&*)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={useCustomCharacters}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Use Custom Characters
            </span>
          </label>

          {#if useCustomCharacters}
            <input
              type="text"
              bind:value={customCharacters}
              placeholder="Enter custom characters..."
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            />
          {/if}
        </div>

        <!-- Exclusion Options -->
        <div class="space-y-4 mb-6">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeSimilar}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Exclude Similar Characters (i, l, 1, L, o, 0, O)
            </span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={excludeAmbiguous}
              class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Exclude Ambiguous Characters (&lbrace; &rbrace; &lsqb; &rsqb; &lpar; &rpar; / \ ' " `
              ~ , ; . &lt; &gt;)
            </span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3">
          <button
            onclick={generatePassword}
            class="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Generate Password
          </button>
          <button
            onclick={regeneratePassword}
            class="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Regenerate
          </button>
          <button
            onclick={() => generateMultiplePasswords(5)}
            class="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Generate 5
          </button>
          <button
            onclick={clearAll}
            class="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Password History -->
    <div>
      <div
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Passwords</h2>
          {#if passwordHistory.length > 0}
            <button
              onclick={clearAll}
              class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear
            </button>
          {/if}
        </div>

        {#if passwordHistory.length === 0}
          <p class="text-gray-500 dark:text-gray-400 text-center py-8">
            No passwords generated yet
          </p>
        {:else}
          <div class="space-y-2 max-h-96 overflow-y-auto">
            {#each passwordHistory as item (item.timestamp.getTime())}
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 mr-2">
                    <div class="font-mono text-sm text-gray-900 dark:text-white break-all">
                      {item.password}
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                      <div class="flex items-center gap-2">
                        <span
                          class="text-xs px-2 py-1 rounded-full {getStrengthBgColor(
                            item.strength
                          )} {getStrengthColor(item.strength)}"
                        >
                          {getStrengthText(item.strength)}
                        </span>
                        <button
                          onclick={() => copyHistoryPassword(item.password)}
                          class="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          {copiedText === 'history' ? '✓' : 'Copy'}
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
    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Shield class="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strong Security</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Generate cryptographically secure passwords with customizable complexity
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Settings2 class="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable Options</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Fine-tune character sets, length, and exclusions for your specific needs
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4"
      >
        <Lock class="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Password History</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Keep track of generated passwords with strength analysis
      </p>
    </div>
  </div>
</div>
