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
  color="danger"
>
  <!-- Input Section -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
  >
    <div class="p-6">
      <div class="mb-4">
        <label
          for="jwt-token-input"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          JWT Token
        </label>
        <div class="relative">
          <textarea
            id="jwt-token-input"
            bind:value={jwtToken}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            rows={showToken ? 4 : 1}
            class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm resize-none"
          ></textarea>
          <button
            onclick={() => (showToken = !showToken)}
            class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {#if showToken}
              <EyeOff class="w-5 h-5" />
            {:else}
              <Eye class="w-5 h-5" />
            {/if}
          </button>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Token will be decoded in real-time. No data is sent to any server.
          </p>
          <div class="flex gap-2">
            <button
              onclick={loadExample}
              class="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw class="w-3 h-3 mr-1" />
              Load Example
            </button>
            <button
              onclick={clearAll}
              class="flex items-center px-3 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <!-- Validation Status -->
      {#if isValid !== null}
        <div
          class="flex items-center p-3 rounded-md {isValid
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}"
        >
          {#if isValid}
            <Check class="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
            <span class="text-sm text-green-700 dark:text-green-300">Valid JWT format</span>
          {:else}
            <X class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <span class="text-sm text-red-700 dark:text-red-300">Invalid JWT format</span>
          {/if}
        </div>
      {/if}

      {#if errorMessage}
        <div
          class="flex items-start p-3 mt-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
        >
          <AlertCircle class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
          <span class="text-sm text-yellow-700 dark:text-yellow-300">{errorMessage}</span>
        </div>
      {/if}
    </div>
  </div>

  <!-- Token Info Card -->
  {#if isValid && getPayloadInfo()}
    {@const payload = getPayloadInfo()}
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"
    >
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Info class="w-5 h-5 mr-2" />
          Token Information
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {payload.sub || 'N/A'}
            </p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued At</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {payload.iat ? formatTimestamp(payload.iat) : 'N/A'}
            </p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires At</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {payload.exp ? formatTimestamp(payload.exp) : 'N/A'}
            </p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
            <p
              class="text-sm font-medium {isTokenExpired()
                ? 'text-red-600 dark:text-red-400'
                : 'text-primary-600 dark:text-primary-400'}"
            >
              {isTokenExpired() ? 'Expired' : `Valid (${getTokenValidityTime()})`}
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Decoded Sections -->
  {#if isValid}
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <!-- Tab Navigation -->
      <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        <button
          onclick={() => (activeTab = 'header')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'header'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          Header
        </button>
        <button
          onclick={() => (activeTab = 'payload')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab === 'payload'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        >
          Payload
        </button>
        <button
          onclick={() => (activeTab = 'signature')}
          class="px-4 py-3 text-sm font-medium border-b-2 transition-colors {activeTab ===
          'signature'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
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
              class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
              class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
              class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy class="w-4 h-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div
            class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4"
          >
            <div class="flex items-start">
              <Info class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
              <div>
                <p class="text-sm text-yellow-700 dark:text-yellow-300 font-medium mb-1">
                  Security Note
                </p>
                <p class="text-xs text-yellow-600 dark:text-yellow-400">
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
</ToolLayout>
