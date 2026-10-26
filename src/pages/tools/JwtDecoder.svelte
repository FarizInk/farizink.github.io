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
  <!-- Controls -->
  <div class="flex flex-wrap gap-2">
    <button class="btn btn-secondary btn-sm" onclick={loadExample}>
      <RefreshCw class="w-4 h-4" />
      Load example
    </button>
    <button class="btn btn-ghost btn-sm" onclick={clearAll}>
      Clear
    </button>
  </div>

  <!-- Input Section -->
  <div class="tool-card">
    <div class="mb-4">
      <label
        for="jwt-token-input"
        class="label"
      >
        JWT token
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
          class="btn-icon absolute right-3 top-3"
        >
          {#if showToken}
            <EyeOff class="w-5 h-5" />
          {:else}
            <Eye class="w-5 h-5" />
          {/if}
        </button>
      </div>
      <p class="text-body-sm text-ink-muted mt-2">
        Token will be decoded in real-time. No data is sent to any server.
      </p>
    </div>

    <!-- Validation Status -->
    {#if isValid !== null}
      <div
        class="flex items-center p-3 rounded-md {isValid ? 'status-success' : 'status-error'}"
      >
        {#if isValid}
          <Check class="w-5 h-5 mr-2" />
          <span class="text-sm">Valid JWT format</span>
        {:else}
          <X class="w-5 h-5 mr-2" />
          <span class="text-sm">Invalid JWT format</span>
        {/if}
      </div>
    {/if}

    {#if errorMessage}
      <div class="flex items-start p-3 mt-3 rounded-md status-warning">
        <AlertCircle class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <span class="text-sm">{errorMessage}</span>
      </div>
    {/if}
  </div>

  <!-- Token Info Card -->
  {#if isValid && getPayloadInfo()}
    {@const payload = getPayloadInfo()}
    <div class="tool-card">
      <h2 class="section-title flex items-center">
        <Info class="w-5 h-5 mr-2 text-accent-text" />
        Token information
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="info-card p-3">
          <p class="text-label text-ink-muted mb-1">Subject</p>
          <p class="text-sm font-medium font-mono text-ink">
            {payload.sub || 'N/A'}
          </p>
        </div>
        <div class="info-card p-3">
          <p class="text-label text-ink-muted mb-1">Issued at</p>
          <p class="text-sm font-medium font-mono text-ink">
            {payload.iat ? formatTimestamp(payload.iat) : 'N/A'}
          </p>
        </div>
        <div class="info-card p-3">
          <p class="text-label text-ink-muted mb-1">Expires at</p>
          <p class="text-sm font-medium font-mono text-ink">
            {payload.exp ? formatTimestamp(payload.exp) : 'N/A'}
          </p>
        </div>
        <div class="info-card p-3">
          <p class="text-label text-ink-muted mb-1">Status</p>
          <p
            class="flex items-center gap-1 text-sm font-medium {isTokenExpired()
              ? 'text-negative'
              : 'text-live'}"
          >
            {#if isTokenExpired()}
              <X class="w-4 h-4 flex-shrink-0" />
            {:else}
              <Check class="w-4 h-4 flex-shrink-0" />
            {/if}
            {isTokenExpired() ? 'Expired' : `Valid (${getTokenValidityTime()})`}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Decoded Sections -->
  {#if isValid}
    <div class="tool-card">
      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button
          onclick={() => (activeTab = 'header')}
          class="tab-btn {activeTab === 'header' ? 'active' : ''}"
        >
          Header
        </button>
        <button
          onclick={() => (activeTab = 'payload')}
          class="tab-btn {activeTab === 'payload' ? 'active' : ''}"
        >
          Payload
        </button>
        <button
          onclick={() => (activeTab = 'signature')}
          class="tab-btn {activeTab === 'signature' ? 'active' : ''}"
        >
          Signature
        </button>
      </div>

      <div>
        <!-- Header Tab -->
        {#if activeTab === 'header'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-title-sm mb-0! flex items-center gap-2">
              <span class="badge bg-tile-violet text-ink-on-dark">Header</span>
              Decoded header
            </h3>
            <button
              onclick={() => copyToClipboard(decodedHeader)}
              class="btn btn-ghost btn-sm"
            >
              <Copy class="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <pre
            class="bg-tile-violet text-ink-on-dark p-4 rounded-md overflow-x-auto font-mono text-code"><code
              >{decodedHeader}</code
            ></pre>
        {/if}

        <!-- Payload Tab -->
        {#if activeTab === 'payload'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-title-sm mb-0! flex items-center gap-2">
              <span class="badge bg-tile-deep text-ink-on-dark">Payload</span>
              Decoded payload
            </h3>
            <button
              onclick={() => copyToClipboard(decodedPayload)}
              class="btn btn-ghost btn-sm"
            >
              <Copy class="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <pre
            class="bg-tile-deep text-ink-on-dark p-4 rounded-md overflow-x-auto font-mono text-code"><code
              >{decodedPayload}</code
            ></pre>
        {/if}

        <!-- Signature Tab -->
        {#if activeTab === 'signature'}
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-title-sm mb-0! flex items-center gap-2">
              <span class="badge bg-tile-lime text-ink-on-bright">Signature</span>
              Signature
            </h3>
            <button
              onclick={() => copyToClipboard(signature)}
              class="btn btn-ghost btn-sm"
            >
              <Copy class="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div class="status-warning rounded-md p-4 mb-4">
            <div class="flex items-start">
              <Info class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-sm font-medium mb-1">
                  Security note
                </p>
                <p class="text-body-sm">
                  The signature cannot be verified in the browser for security reasons. Always
                  verify JWT signatures on your server using a proper secret key.
                </p>
              </div>
            </div>
          </div>

          <pre
            class="bg-tile-lime text-ink-on-bright p-4 rounded-md overflow-x-auto font-mono text-code break-all whitespace-pre-wrap"><code
              >{signature}</code
            ></pre>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="tool-card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Real-time decoding</h3>
      <p class="feature-description">
        Instantly decode JWT tokens as you type with automatic format validation
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <AlertCircle class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Token validation</h3>
      <p class="feature-description">
        Check token expiration and validity status with detailed information display
      </p>
    </div>

    <div class="tool-card">
      <div class="feature-icon">
        <Copy class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Easy copy</h3>
      <p class="feature-description">
        Copy decoded header, payload, or signature with a single click
      </p>
    </div>
  </div>
</ToolLayout>
