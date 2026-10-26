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
        return 'text-negative';
      case 'medium':
        return 'text-ink';
      case 'strong':
        return 'text-live';
      case 'very-strong':
        return 'text-live';
      default:
        return 'text-ink-muted';
    }
  }

  function getStrengthBgColor(strength: string): string {
    switch (strength) {
      case 'medium':
        return 'bg-tile-lilac text-ink-on-bright';
      default:
        return `bg-sunken ${getStrengthColor(strength)}`;
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
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary" onclick={() => generateMultiplePasswords(5)}>
      Generate 5
    </button>
    <button class="btn btn-ghost" onclick={clearAll}>
      <Trash2 class="size-4" />
      Clear
    </button>
  </div>

  <!-- Presets -->
  <div class="flex flex-wrap gap-2">
    {#each ['strong', 'memorable', 'pin', 'passphrase'] as preset (preset)}
      <button
        onclick={() => usePreset(preset as 'strong' | 'memorable' | 'pin' | 'passphrase')}
        class="preset-btn capitalize"
      >
        {preset}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <!-- Settings Panel -->
    <div class="flex flex-col gap-4 lg:col-span-2">
      <!-- Main Password Display -->
      <div class="tool-card">
        <div class="card-header">
          <h2 class="section-title mb-0!">Generated password</h2>
          <div class="flex items-center gap-2">
            {#if password}
              <span
                class="text-body-sm inline-flex items-center gap-1 font-medium {getStrengthColor(calculatePasswordStrength(password))}"
              >
                <Shield class="size-4" />
                {getStrengthText(calculatePasswordStrength(password))}
              </span>
            {/if}
            <button class="btn btn-sm btn-secondary" onclick={copyToClipboard}>
              <Copy class="size-3.5" />
              Copy
            </button>
          </div>
        </div>

        <input
          bind:value={password}
          readonly
          placeholder="Click 'Generate Password' to create a secure password"
          class="tool-input w-full py-3! font-mono! text-lg!"
        />

        <!-- Strength Indicator -->
        {#if password}
          <div class="mt-4">
            <div class="h-2 w-full overflow-hidden rounded-pill bg-sunken">
              <div
                class="h-full rounded-pill transition-[width] duration-150 {calculatePasswordStrength(password) ===
                'weak'
                  ? 'w-1/4 bg-negative'
                  : calculatePasswordStrength(password) === 'medium'
                    ? 'w-2/4 bg-tile-lilac'
                    : calculatePasswordStrength(password) === 'strong'
                      ? 'w-3/4 bg-live'
                      : 'w-full bg-live'}"
              ></div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Settings -->
      <div class="tool-card">
        <h2 class="section-title">Password settings</h2>

        <!-- Length Slider -->
        <div class="mb-6">
          <div class="mb-2 flex items-center justify-between">
            <label for="password-length-slider" class="label mb-0!">Password length</label>
            <span class="font-mono text-sm font-semibold text-ink">
              {passwordLength}
            </span>
          </div>
          <input
            id="password-length-slider"
            type="range"
            min="4"
            max="64"
            bind:value={passwordLength}
            class="slider"
            style="--p: {((passwordLength - 4) / (64 - 4)) * 100}%"
          />
          <div class="text-count mt-1 flex justify-between">
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <!-- Character Options -->
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={includeUppercase} />
            <span class="checkmark"></span>
            <span class="label-text">Uppercase (A-Z)</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={includeLowercase} />
            <span class="checkmark"></span>
            <span class="label-text">Lowercase (a-z)</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={includeNumbers} />
            <span class="checkmark"></span>
            <span class="label-text">Numbers (0-9)</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={includeSymbols} />
            <span class="checkmark"></span>
            <span class="label-text">Symbols (!@#$%)</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={useCustomCharacters} />
            <span class="checkmark"></span>
            <span class="label-text">Custom characters</span>
          </label>
        </div>

        {#if useCustomCharacters}
          <div class="mb-6">
            <input
              bind:value={customCharacters}
              placeholder="Enter custom characters..."
              class="tool-input w-full py-2! font-mono! text-sm!"
            />
          </div>
        {/if}

        <!-- Exclusion Options -->
        <div class="flex flex-col gap-4 pt-4">
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={excludeSimilar} />
            <span class="checkmark"></span>
            <span class="label-text">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" bind:checked={excludeAmbiguous} />
            <span class="checkmark"></span>
            <span class="label-text">Exclude ambiguous characters</span>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex gap-3">
          <button class="btn btn-primary flex-1" onclick={generatePassword}>
            <RefreshCw class="size-4" />
            Generate password
          </button>
        </div>
      </div>
    </div>

    <!-- Password History -->
    <div>
      <div class="tool-card">
        <div class="card-header">
          <h2 class="section-title mb-0!">History</h2>
          {#if passwordHistory.length > 0}
            <button class="btn btn-sm btn-ghost" onclick={clearAll}>Clear</button>
          {/if}
        </div>

        {#if passwordHistory.length === 0}
          <div class="flex flex-col items-center justify-center py-8 text-ink-muted">
            <History class="mb-2 size-8" />
            <p class="text-body-sm">No passwords generated yet</p>
          </div>
        {:else}
          <div class="max-h-[400px] space-y-2 overflow-y-auto">
            {#each passwordHistory as item (item.id)}
              <div class="rounded-md bg-sunken p-3">
                <div class="mr-2 min-w-0 flex-1">
                  <div class="font-mono text-sm break-all text-ink">
                    {item.password}
                  </div>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="text-count">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                    <div class="flex items-center gap-2">
                      <span
                        class="inline-flex h-6 items-center rounded-pill px-2.5 font-mono text-xs font-medium {getStrengthBgColor(item.strength)}"
                      >
                        {getStrengthText(item.strength)}
                      </span>
                      <button
                        class="btn-icon"
                        onclick={() => copyHistoryPassword(item.password)}
                        aria-label="Copy password"
                        title="Copy password"
                      >
                        <Copy class="size-3.5" />
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
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="card">
      <div class="feature-icon"><Shield class="size-5" /></div>
      <h3 class="feature-title">Strong security</h3>
      <p class="feature-description">
        Generate cryptographically secure passwords with customizable complexity
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><Settings2 class="size-5" /></div>
      <h3 class="feature-title">Customizable options</h3>
      <p class="feature-description">
        Fine-tune character sets, length, and exclusions for your specific needs
      </p>
    </div>

    <div class="card">
      <div class="feature-icon"><History class="size-5" /></div>
      <h3 class="feature-title">Password history</h3>
      <p class="feature-description">Keep track of generated passwords with strength analysis</p>
    </div>
  </div>
</ToolLayout>
