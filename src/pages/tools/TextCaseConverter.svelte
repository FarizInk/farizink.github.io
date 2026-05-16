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
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <Type class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Case Converter</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Transform text between 10 different case formats
          </p>
        </div>
      </div>
      <button
        onclick={clearAll}
        class="btn btn-secondary"
      >
        Clear All
      </button>
    </div>
  </div>

  <!-- Case Selection -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-4 shadow-sm"
  >
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Case Type</h2>

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
          class="preset-btn {activeCase === caseType ? 'active' : ''}"
        >
          <div
            class="flex items-center justify-center mb-2 {activeCase === caseType
              ? 'text-warning-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400'}"
          >
            <Type class="w-5 h-5" />
          </div>

          <div class="text-sm font-medium text-gray-900 dark:text-white capitalize mb-1">
            {caseType.replace(/([A-Z])/g, ' $1').trim()}
          </div>

          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono text-center">
            {examples[caseType as keyof typeof examples]}
          </div>

          {#if activeCase === caseType}
            <div
              class="absolute top-1 right-1 w-2 h-2 bg-warning-500 dark:bg-primary-500 rounded-full"
            ></div>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {inputText.length} chars
        </div>
      </div>

      <textarea
        class="code-editor min-h-[240px]"
        bind:value={inputText}
        placeholder="Enter your text here..."
      ></textarea>

      {#if textStats}
        <div
          class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-3 gap-2"
        >
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">Characters:</span>
            <span class="ml-1 text-gray-900 dark:text-white">{textStats.characters}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">No spaces:</span>
            <span class="ml-1 text-gray-900 dark:text-white">{textStats.charactersNoSpaces}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">Words:</span>
            <span class="ml-1 text-gray-900 dark:text-white">{textStats.words}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">Sentences:</span>
            <span class="ml-1 text-gray-900 dark:text-white">{textStats.sentences}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">Lines:</span>
            <span class="ml-1 text-gray-900 dark:text-white">{textStats.lines}</span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Output Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Converted Text</h2>
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
            class="btn btn-sm btn-copy"
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
          class="btn btn-copy w-full"
          onclick={downloadAsFile}
          disabled={!convertedText}
        >
          Download as File
        </button>
      </div>
    </div>
  </div>

  <!-- Quick Actions -->
  <div
    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-4 shadow-sm"
  >
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onclick={() => {
          inputText = 'Hello World! This is a SAMPLE text for TESTING.';
          activeCase = 'uppercase';
        }}
        class="btn btn-copy"
      >
        Load Sample Text
      </button>

      <button
        onclick={() => (activeCase = 'uppercase')}
        class="btn btn-secondary"
      >
        UPPERCASE
      </button>

      <button
        onclick={() => (activeCase = 'lowercase')}
        class="btn btn-secondary"
      >
        lowercase
      </button>

      <button
        onclick={() => (activeCase = 'title')}
        class="btn btn-secondary"
      >
        Title Case
      </button>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Sparkles class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Cases</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Convert between 10 different case formats including camelCase, snake_case, and kebab-case.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Zap class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Conversion</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Text is converted automatically as you type with instant visual feedback.
      </p>
    </div>

    <div
      class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"
    >
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"
      >
        <Check class="w-6 h-6 text-warning-600 dark:text-primary-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Text Statistics</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        View character count, word count, and more statistics about your input text.
      </p>
    </div>
  </div>
</ToolLayout>
