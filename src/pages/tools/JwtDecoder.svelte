<script lang="ts">
  import {
    Copy,
    Eye,
    EyeOff,
    RefreshCw,
    Check,
    X,
    Info,
    AlertCircle,
    FileText
  } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  let jwtToken = $state('');
  let showToken = $state(false);
  let decodedHeader = $state('');
  let decodedPayload = $state('');
  let signature = $state('');
  let isValid = $state<boolean | null>(null);
  let errorMessage = $state('');
  let copied = $state(false);
  let activeTab = $state('header');

  $effect(() => {
    if (jwtToken) {
      decodeJWT();
    } else {
      clearDecoded();
    }
  });

  function decodeJWT() {
    try {
      const parts = jwtToken.split('.');

      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.');
      }

      // Decode header
      try {
        const headerJson = atob(parts[0]);
        const header = JSON.parse(headerJson);
        decodedHeader = JSON.stringify(header, null, 2);
      } catch {
        throw new Error('Invalid header format. Cannot decode base64 or parse JSON.');
      }

      // Decode payload
      try {
        const payloadJson = atob(parts[1]);
        const payload = JSON.parse(payloadJson);
        decodedPayload = JSON.stringify(payload, null, 2);

        // Check if token is expired
        if (payload.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (currentTime > payload.exp) {
            errorMessage = 'Warning: This token has expired!';
          } else {
            errorMessage = '';
          }
        }
      } catch {
        throw new Error('Invalid payload format. Cannot decode base64 or parse JSON.');
      }

      signature = parts[2];
      isValid = true;
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to decode JWT token';
      clearDecoded();
      isValid = false;
    }
  }

  function clearDecoded() {
    decodedHeader = '';
    decodedPayload = '';
    signature = '';
    isValid = null;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function clearAll() {
    jwtToken = '';
    clearDecoded();
    errorMessage = '';
    isValid = null;
    activeTab = 'header';
  }

  function loadExample() {
    jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  function getPayloadInfo() {
    if (!decodedPayload) return null;

    try {
      const payload = JSON.parse(decodedPayload);
      return payload;
    } catch {
      return null;
    }
  }

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  function isTokenExpired(): boolean {
    const payload = getPayloadInfo();
    if (!payload || !payload.exp) return false;

    return Math.floor(Date.now() / 1000) > payload.exp;
  }

  function getTokenValidityTime(): string {
    const payload = getPayloadInfo();
    if (!payload || !payload.exp) return 'N/A';

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = payload.exp - currentTime;

    if (timeLeft <= 0) return 'Expired';

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
</script>

<svelte:head>
  <title>JWT Decoder - Developer Tools</title>
  <meta
    name="description"
    content="Securely decode and analyze JWT tokens. View header, payload, and check token validity"
  />
</svelte:head>

<ToolLayout
  title="JWT Decoder"
  description="Decode and validate JSON Web Tokens (JWT) with header, payload, and signature analysis."
  icon={FileText}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <FileText class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">JWT Decoder</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Decode and validate JSON Web Tokens
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-3 items-center justify-center mb-6">
    <button class="btn btn-copy" onclick={loadExample}>
      <RefreshCw class="w-4 h-4 mr-2" />
      Load Example
    </button>
    <button class="btn btn-secondary" onclick={clearAll}>
      Clear
    </button>
  </div>

  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
  >
    <div class="mb-4">
      <label
        for="jwt-token-input"
        class="label"
      >
        JWT Token
      </label>
      <div class="relative">
        <textarea
          id="jwt-token-input"
          bind:value={jwtToken}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          rows={showToken ? 4 : 1}
          class="code-editor pr-12 font-mono text-sm"
        ></textarea>
        <button
          onclick={() => (showToken = !showToken)}
          class="btn-icon absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {#if showToken}
            <EyeOff class="w-5 h-5" />
          {:else}
            <Eye class="w-5 h-5" />
          {/if}
        </button>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Token will be decoded in real-time. No data is sent to any server.
      </p>
    </div>

    <!-- Validation Status -->
    {#if isValid !== null}
      <div
        class="flex items-center p-3 rounded-lg {isValid
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}"
      >
        {#if isValid}
          <Check class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
          <span class="text-sm text-green-700 dark:text-green-300">Valid JWT format</span>
        {:else}
          <X class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
          <span class="text-sm text-red-700 dark:text-red-300">Invalid JWT format</span>
        {/if}
      </div>
    {/if}

    {#if errorMessage}
      <div
        class="flex items-start p-3 mt-3 rounded-lg bg-warning-50 dark:bg-yellow-900/20 border border-warning-200 dark:border-yellow-800"
      >
        <AlertCircle
          class="w-5 h-5 text-warning-600 dark:text-warning-400 mr-2 mt-0.5 flex-shrink-0"
        />
        <span class="text-sm text-warning-700 dark:text-warning-300">{errorMessage}</span>
      </div>
    {/if}
  </div>

  <!-- Token Info Card -->
  {#if isValid && getPayloadInfo()}
    {@const payload = getPayloadInfo()}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm"
    >
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Info class="w-5 h-5 mr-2 text-warning-600 dark:text-primary-400" />
        Token Information
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {payload.sub || 'N/A'}
          </p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued At</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {payload.iat ? formatTimestamp(payload.iat) : 'N/A'}
          </p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires At</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {payload.exp ? formatTimestamp(payload.exp) : 'N/A'}
          </p>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
          <p
            class="text-sm font-medium {isTokenExpired()
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'}"
          >
            {isTokenExpired() ? 'Expired' : `Valid (${getTokenValidityTime()})`}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Decoded Sections -->
  {#if isValid}
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <!-- Tab Navigation -->
      <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <button
          onclick={() => (activeTab = 'header')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'header'
            ? 'border-warning-500 dark:border-primary-500 text-warning-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          Header
        </button>
        <button
          onclick={() => (activeTab = 'payload')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'payload'
            ? 'border-warning-500 dark:border-primary-500 text-warning-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          Payload
        </button>
        <button
          onclick={() => (activeTab = 'signature')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab ===
          'signature'
            ? 'border-warning-500 dark:border-primary-500 text-warning-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          Signature
        </button>
      </div>

      <div class="p-6">
        <!-- Header Tab -->
        {#if activeTab === 'header'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Header</h3>
            <button
              onclick={() => copyToClipboard(decodedHeader)}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <pre
            class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code
              >{decodedHeader}</code
            ></pre>
        {/if}

        <!-- Payload Tab -->
        {#if activeTab === 'payload'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Payload</h3>
            <button
              onclick={() => copyToClipboard(decodedPayload)}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <pre
            class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code
              >{decodedPayload}</code
            ></pre>
        {/if}

        <!-- Signature Tab -->
        {#if activeTab === 'signature'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Signature</h3>
            <button
              onclick={() => copyToClipboard(signature)}
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div
            class="bg-warning-50 dark:bg-yellow-900/20 border border-warning-200 dark:border-yellow-800 rounded-lg p-4 mb-4"
          >
            <div class="flex items-start">
              <Info
                class="w-5 h-5 text-warning-600 dark:text-warning-400 mr-2 mt-0.5 flex-shrink-0"
              />
              <div>
                <p class="text-sm text-warning-700 dark:text-warning-300 font-medium mb-1">
                  Security Note
                </p>
                <p class="text-xs text-warning-600 dark:text-warning-400">
                  The signature cannot be verified in the browser for security reasons. Always
                  verify JWT signatures on your server using a proper secret key.
                </p>
              </div>
            </div>
          </div>

          <pre
            class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300 break-all"><code
              >{signature}</code
            ></pre>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Decoding</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Instantly decode JWT tokens as you type with automatic format validation
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <AlertCircle class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Token Validation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Check token expiration and validity status with detailed information display
      </p>
    </div>

    <div
      class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Copy class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Copy decoded header, payload, or signature with a single click
      </p>
    </div>
  </div>
</ToolLayout>
