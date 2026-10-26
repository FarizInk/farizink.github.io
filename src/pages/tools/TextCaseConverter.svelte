<script lang="ts">
  import { Copy, Type, ArrowRight, Check, Sparkles, Zap } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Component state
  let inputText = $state('');
  let convertedText = $state('');
  let copied = $state(false);
  let activeCase = $state('uppercase');

  // Case conversion functions
  const caseConversions = {
    uppercase: (text: string) => text.toUpperCase(),
    lowercase: (text: string) => text.toLowerCase(),
    title: (text: string) => {
      return text.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    },
    camelCase: (text: string) => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
    },
    snakeCase: (text: string) => {
      return text
        .toLowerCase()
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .join('_');
    },
    kebabCase: (text: string) => {
      return text
        .toLowerCase()
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .join('-');
    },
    pascalCase: (text: string) => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, word => {
          return word.toUpperCase();
        })
        .replace(/\s+/g, '');
    },
    sentence: (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    alternating: (text: string) => {
      return text
        .split('')
        .map((char, index) => {
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        })
        .join('');
    },
    inverse: (text: string) => {
      return text
        .split('')
        .map(char => {
          return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        })
        .join('');
    }
  };

  // Convert text based on selected case
  function convertText() {
    if (!inputText.trim()) {
      convertedText = '';
      return;
    }

    const converter = caseConversions[activeCase as keyof typeof caseConversions];
    convertedText = converter(inputText);
  }

  // Auto-convert when input or case changes
  $effect(() => {
    if (inputText) {
      convertText();
    } else {
      convertedText = '';
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(convertedText).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function clearAll() {
    inputText = '';
    convertedText = '';
  }

  function swapTexts() {
    const temp = inputText;
    inputText = convertedText;
    convertedText = temp;
  }

  function downloadAsFile() {
    const blob = new Blob([convertedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${activeCase}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Get text statistics
  const textStats = $derived(
    inputText
      ? {
          characters: inputText.length,
          charactersNoSpaces: inputText.replace(/\s/g, '').length,
          words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
          sentences: inputText.trim()
            ? inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
            : 0,
          lines: inputText.split('\n').length
        }
      : null
  );
</script>

<svelte:head>
  <title>Text Case Converter - Developer Tools</title>
  <meta
    name="description"
    content="Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more"
  />
</svelte:head>

<ToolLayout
  title="Text Case Converter"
  description="Convert text between different cases: UPPERCASE, lowercase, Title Case, and more."
  icon={Type}
  color="warning"
>
  <!-- Toolbar -->
  <div class="flex flex-wrap gap-2">
    <button onclick={clearAll} class="btn btn-sm btn-secondary">Clear all</button>
  </div>

  <!-- Case Selection -->
  <div class="tool-card">
    <h2 class="section-title">Select case type</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {#each Object.entries(caseConversions) as [caseType] (caseType)}
        {@const examples = {
          uppercase: 'HELLO WORLD',
          lowercase: 'hello world',
          title: 'Hello World',
          camelCase: 'helloWorld',
          snakeCase: 'hello_world',
          kebabCase: 'hello-world',
          pascalCase: 'HelloWorld',
          sentence: 'Hello world',
          alternating: 'hElLo wOrLd',
          inverse: 'HELLO WORLD'
        }}

        <button
          type="button"
          onclick={() => (activeCase = caseType)}
          class="preset-btn relative !rounded-md !text-center {activeCase === caseType ? 'active' : ''}"
        >
          <div
            class="flex items-center justify-center mb-2 {activeCase === caseType
              ? 'text-accent-text'
              : 'text-ink-muted'}"
          >
            <Type class="w-5 h-5" />
          </div>

          <div class="text-body-sm text-ink capitalize mb-1">
            {caseType.replace(/([A-Z])/g, ' $1').trim()}
          </div>

          <div class="text-code text-ink-muted text-center">
            {examples[caseType as keyof typeof examples]}
          </div>

          {#if activeCase === caseType}
            <div class="absolute top-2 right-2 w-2 h-2 bg-accent rounded-pill"></div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">Input text</h2>
        <div class="text-count">
          {inputText.length} chars
        </div>
      </div>

      <textarea
        class="code-editor min-h-[240px]"
        bind:value={inputText}
        placeholder="Enter your text here..."
      ></textarea>

      {#if textStats}
        <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          <div class="text-body-sm text-ink-muted">
            <span>Characters:</span>
            <span class="ml-1 font-mono text-ink">{textStats.characters}</span>
          </div>
          <div class="text-body-sm text-ink-muted">
            <span>No spaces:</span>
            <span class="ml-1 font-mono text-ink">{textStats.charactersNoSpaces}</span>
          </div>
          <div class="text-body-sm text-ink-muted">
            <span>Words:</span>
            <span class="ml-1 font-mono text-ink">{textStats.words}</span>
          </div>
          <div class="text-body-sm text-ink-muted">
            <span>Sentences:</span>
            <span class="ml-1 font-mono text-ink">{textStats.sentences}</span>
          </div>
          <div class="text-body-sm text-ink-muted">
            <span>Lines:</span>
            <span class="ml-1 font-mono text-ink">{textStats.lines}</span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Output Section -->
    <div class="tool-card">
      <div class="card-header">
        <h2 class="section-title !mb-0">Converted text</h2>
        <div class="flex items-center gap-2">
          <button
            onclick={swapTexts}
            disabled={!inputText || !convertedText}
            class="btn btn-sm btn-secondary"
            title="Swap input and output"
          >
            <ArrowRight class="w-4 h-4 rotate-180" />
          </button>
          <button
            onclick={copyToClipboard}
            disabled={!convertedText}
            class="btn btn-sm btn-primary"
          >
            <Copy class="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <textarea
        class="code-editor min-h-[240px]"
        bind:value={convertedText}
        placeholder="Converted text will appear here..."
      ></textarea>

      <div class="flex gap-2 mt-4">
        <button
          class="btn btn-secondary w-full"
          onclick={downloadAsFile}
          disabled={!convertedText}
        >
          Download as file
        </button>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="tool-card">
    <h2 class="section-title">Quick actions</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onclick={() => {
          inputText = 'Hello World! This is a SAMPLE text for TESTING.';
          activeCase = 'uppercase';
        }}
        class="btn btn-secondary"
      >
        Load sample text
      </button>

      <button onclick={() => (activeCase = 'uppercase')} class="btn btn-secondary">
        UPPERCASE
      </button>

      <button onclick={() => (activeCase = 'lowercase')} class="btn btn-secondary">
        lowercase
      </button>

      <button onclick={() => (activeCase = 'title')} class="btn btn-secondary">
        Title Case
      </button>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Sparkles class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Multiple cases</h3>
      <p class="feature-description">
        Convert between 10 different case formats including camelCase, snake_case, and kebab-case.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Real-time conversion</h3>
      <p class="feature-description">
        Text is converted automatically as you type with instant visual feedback.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Text statistics</h3>
      <p class="feature-description">
        View character count, word count, and more statistics about your input text.
      </p>
    </div>
  </div>
</ToolLayout>
