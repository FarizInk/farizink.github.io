<script lang="ts">
  import { navigate } from '../../lib/router.js';
  import { ChevronLeft, Shield, AlertCircle, CheckCircle, Clock, Eye, EyeOff } from '@lucide/svelte';

  let jwtToken = $state('');
  let decodedHeader = $state('');
  let decodedPayload = $state('');
  let signatureInfo = $state('');
  let error = $state('');
  let copiedText = $state('');
  let showSignature = $state(false);

  function decodeJWT() {
    try {
      error = '';
      decodedHeader = '';
      decodedPayload = '';
      signatureInfo = '';

      if (!jwtToken.trim()) {
        error = 'Please enter a JWT token to decode.';
        return;
      }

      const parts = jwtToken.split('.');

      if (parts.length !== 3) {
        error = 'Invalid JWT format. A JWT should have 3 parts separated by dots.';
        return;
      }

      // Decode header
      try {
        const headerData = JSON.parse(atob(parts[0]));
        decodedHeader = JSON.stringify(headerData, null, 2);
      } catch (e) {
        error = 'Failed to decode JWT header. The token may be corrupted.';
        return;
      }

      // Decode payload
      try {
        const payloadData = JSON.parse(atob(parts[1]));
        decodedPayload = JSON.stringify(payloadData, null, 2);

        // Check if token is expired
        if (payloadData.exp) {
          const expirationTime = new Date(payloadData.exp * 1000);
          const currentTime = new Date();
          const isExpired = currentTime > expirationTime;

          if (isExpired) {
            signatureInfo = `⚠️ Token expired on ${expirationTime.toLocaleString()}`;
          } else {
            signatureInfo = `✅ Token expires on ${expirationTime.toLocaleString()}`;
          }
        } else {
          signatureInfo = 'ℹ️ No expiration time (exp claim) found in token';
        }
      } catch (e) {
        error = 'Failed to decode JWT payload. The token may be corrupted.';
        return;
      }

      // Store signature info
      if (parts[2]) {
        signatureInfo += (signatureInfo ? '\n' : '') + `🔐 Signature: ${parts[2].substring(0, 20)}... (${parts[2].length} characters)`;
      }

    } catch (e) {
      error = 'Failed to decode JWT token. Please check if the token is valid.';
    }
  }

  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    jwtToken = '';
    decodedHeader = '';
    decodedPayload = '';
    signatureInfo = '';
    error = '';
    copiedText = '';
    showSignature = false;
  }

  function loadSampleToken() {
    // This is a sample JWT token for demonstration purposes
    jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.example_signature';
    decodeJWT();
  }

  function formatJSON(jsonString: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return jsonString;
    }
  }

  function handleBackToTools() {
    navigate('/tools');
  }

  function toggleSignature() {
    showSignature = !showSignature;
  }
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
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
        <Shield class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        JWT Decoder
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Decode and analyze JSON Web Tokens (JWT) to view headers, payloads, and signature information.
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center justify-center space-x-2 text-sm">
      <li>
        <a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">JWT Decoder</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div class="mb-6 flex flex-wrap gap-4 items-center justify-center">
    <button
      onclick={decodeJWT}
      class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      Decode JWT
    </button>
    <button
      onclick={loadSampleToken}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Load Sample Token
    </button>
    <button
      onclick={clearAll}
      class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Clear All
    </button>
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-start gap-3">
        <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div>
          <p class="text-red-700 dark:text-red-400 font-medium">Error</p>
          <p class="text-red-600 dark:text-red-300 text-sm">{error}</p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Input Section -->
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        JWT Token
      </h2>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {jwtToken.length} characters
      </span>
    </div>
    <textarea
      bind:value={jwtToken}
      placeholder="Enter your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
      class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    ></textarea>
    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
      JWT tokens are typically in the format: header.payload.signature
    </p>
  </div>

  <!-- Results Section -->
  {#if decodedHeader || decodedPayload}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Header Section -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Header
          </h2>
          {#if decodedHeader}
            <button
              onclick={() => copyToClipboard(decodedHeader, 'header')}
              class="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              {copiedText === 'header' ? '✓ Copied!' : 'Copy'}
            </button>
          {/if}
        </div>
        <div class="relative">
          <pre class="w-full h-48 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto whitespace-pre-wrap">{decodedHeader}</pre>
        </div>
      </div>

      <!-- Payload Section -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Payload
          </h2>
          {#if decodedPayload}
            <button
              onclick={() => copyToClipboard(decodedPayload, 'payload')}
              class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {copiedText === 'payload' ? '✓ Copied!' : 'Copy'}
            </button>
          {/if}
        </div>
        <div class="relative">
          <pre class="w-full h-48 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto whitespace-pre-wrap">{decodedPayload}</pre>
        </div>
      </div>
    </div>

    <!-- Signature Information -->
    {#if signatureInfo}
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Signature Information
          </h2>
          <button
            onclick={toggleSignature}
            class="flex items-center gap-2 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            {#if showSignature}
            <EyeOff class="w-4 h-4" />
          {:else}
            <Eye class="w-4 h-4" />
          {/if}
            {showSignature ? 'Hide' : 'Show'} Full Signature
          </button>
        </div>
        <div class="space-y-2">
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{signatureInfo}</p>
          {#if showSignature && jwtToken.includes('.')}
            <div class="mt-4">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Full Signature:</span>
              <div class="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <code class="text-xs font-mono text-gray-900 dark:text-white break-all">
                  {jwtToken.split('.')[2]}
                </code>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  {/if}

  <!-- Features Section -->
  <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Shield class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Secure Decoding
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Decode JWT tokens locally in your browser without sending them to any server, ensuring complete security
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <Clock class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Expiration Check
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Automatically check if tokens are expired and display expiration times in your local timezone
      </p>
    </div>

    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
        <CheckCircle class="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Formatted Output
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        View decoded JWT components in beautifully formatted JSON with proper indentation and syntax highlighting
      </p>
    </div>
  </div>

  <!-- Security Notice -->
  <div class="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
    <div class="flex items-start gap-3">
      <AlertCircle class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
      <div>
        <h3 class="text-yellow-800 dark:text-yellow-200 font-medium mb-1">Security Notice</h3>
        <p class="text-yellow-700 dark:text-yellow-300 text-sm">
          JWT tokens are decoded locally in your browser and are never sent to any server. However, be cautious when decoding tokens containing sensitive information.
        </p>
      </div>
    </div>
  </div>
</div>