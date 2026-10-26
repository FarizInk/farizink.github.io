<script lang="ts">
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { Code, Zap, FileText, Copy, RefreshCw } from '@lucide/svelte';

  let inputText = $state('');
  let encodedText = $state('');
  let decodedText = $state('');
  let copiedText = $state('');
  let activeTab = $state<'encode' | 'decode'>('encode');

  function encodeHtml() {
    const div = document.createElement('div');
    div.textContent = inputText;
    encodedText = div.innerHTML;
    decodedText = '';
  }

  function decodeHtml() {
    const div = document.createElement('div');
    div.innerHTML = inputText;
    decodedText = div.textContent || div.innerText || '';
    encodedText = '';
  }

  function loadSampleText() {
    inputText =
      '<div class="container">\n  <h1>Hello World!</h1>\n  <p>This is a <strong>sample</strong> text with <em>HTML</em> tags.</p>\n</div>';
    activeTab = 'encode';
    encodeHtml();
  }


  function copyToClipboard(text: string, format: string) {
    navigator.clipboard.writeText(text);
    copiedText = format;
    setTimeout(() => {
      copiedText = '';
    }, 2000);
  }

  function clearAll() {
    inputText = '';
    encodedText = '';
    decodedText = '';
  }
</script>

<ToolLayout
  title="HTML Entity Encoder"
  description="Encode and decode HTML entities to prevent XSS attacks and display special characters."
  icon={FileText}
  color="warning"
>
  <!-- Tab Navigation -->
  <div class="tab-nav" role="tablist">
    <button
      role="tab"
      aria-selected={activeTab === 'encode'}
      onclick={() => (activeTab = 'encode')}
      class="tab-btn {activeTab === 'encode' ? 'active' : ''}"
    >
      Encode HTML
    </button>
    <button
      role="tab"
      aria-selected={activeTab === 'decode'}
      onclick={() => (activeTab = 'decode')}
      class="tab-btn {activeTab === 'decode' ? 'active' : ''}"
    >
      Decode HTML
    </button>
  </div>

  <!-- Controls -->
  <div class="flex flex-wrap gap-2 items-center">
    <button
      onclick={activeTab === 'encode' ? encodeHtml : decodeHtml}
      disabled={!inputText.trim()}
      class="btn btn-primary"
    >
      {activeTab === 'encode' ? 'Encode HTML' : 'Decode HTML'}
    </button>
    <button class="btn btn-secondary" onclick={loadSampleText}>
      <RefreshCw class="w-4 h-4" />
      Load sample
    </button>
    <button class="btn btn-ghost" onclick={clearAll}>
      Clear all
    </button>
  </div>

  <!-- Input and Output -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">Input</h2>
        <span class="text-count">
          {inputText.length} characters
        </span>
      </div>

      <textarea
        bind:value={inputText}
        placeholder="Enter {activeTab === 'encode'
          ? 'HTML code or text'
          : 'HTML entities'} to {activeTab === 'encode' ? 'encode' : 'decode'}..."
        class="code-editor h-64"
      ></textarea>
    </div>

    <!-- Results Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">
          {activeTab === 'encode' ? 'Encoded' : 'Decoded'} result
        </h2>
        {#if (activeTab === 'encode' && encodedText) || (activeTab === 'decode' && decodedText)}
          <button
            onclick={() =>
              copyToClipboard(activeTab === 'encode' ? encodedText : decodedText, 'result')}
            class="btn btn-copy btn-sm"
          >
            <Copy class="w-4 h-4" />
            {copiedText === 'result' ? 'Copied!' : 'Copy'}
          </button>
        {/if}
      </div>

      <div class="relative">
        {#if activeTab === 'encode'}
          <textarea
            bind:value={encodedText}
            placeholder="Encoded HTML will appear here..."
            class="code-editor h-64"
            readonly
          ></textarea>
          {#if !encodedText}
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-body-sm text-ink-muted">Enter text above to see encoded result</p>
            </div>
          {/if}
        {:else}
          <textarea
            bind:value={decodedText}
            placeholder="Decoded HTML will appear here..."
            class="code-editor h-64"
            readonly
          ></textarea>
          {#if !decodedText}
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p class="text-body-sm text-ink-muted">
                Enter HTML entities above to see decoded result
              </p>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>

  <!-- Common HTML Entities Reference -->
  <div class="tool-card">
    <h3 class="section-title">Common HTML entities</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-body-sm">
        <thead>
          <tr>
            <th class="text-left py-2 px-3 text-label text-ink-muted">Character</th>
            <th class="text-left py-2 px-3 text-label text-ink-muted">Entity name</th>
            <th class="text-left py-2 px-3 text-label text-ink-muted">Entity number</th>
            <th class="text-left py-2 px-3 text-label text-ink-muted">Description</th>
          </tr>
        </thead>
        <tbody class="text-ink">
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono">&lt;</td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;lt;</td>
            <td class="py-2 px-3 font-mono">&amp;#60;</td>
            <td class="py-2 px-3 text-ink-muted">Less than</td>
          </tr>
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono">&gt;</td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;gt;</td>
            <td class="py-2 px-3 font-mono">&amp;#62;</td>
            <td class="py-2 px-3 text-ink-muted">Greater than</td>
          </tr>
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono">&amp;</td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;amp;</td>
            <td class="py-2 px-3 font-mono">&amp;#38;</td>
            <td class="py-2 px-3 text-ink-muted">Ampersand</td>
          </tr>
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono">"</td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;quot;</td>
            <td class="py-2 px-3 font-mono">&amp;#34;</td>
            <td class="py-2 px-3 text-ink-muted">Quotation mark</td>
          </tr>
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono">'</td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;apos;</td>
            <td class="py-2 px-3 font-mono">&amp;#39;</td>
            <td class="py-2 px-3 text-ink-muted">Apostrophe</td>
          </tr>
          <tr class="odd:bg-sunken">
            <td class="py-2 px-3 font-mono"> </td>
            <td class="py-2 px-3 font-mono text-accent-text">&amp;nbsp;</td>
            <td class="py-2 px-3 font-mono">&amp;#160;</td>
            <td class="py-2 px-3 text-ink-muted">Non-breaking space</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Code class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Encode HTML</h3>
      <p class="feature-description">
        Convert HTML tags and special characters to entities for safe display
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <FileText class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Decode HTML</h3>
      <p class="feature-description">
        Convert HTML entities back to readable characters
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Unicode support</h3>
      <p class="feature-description">
        Full support for Unicode characters and special symbols
      </p>
    </div>
  </div>
</ToolLayout>
