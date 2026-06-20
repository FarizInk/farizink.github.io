<script lang="ts">
  import { Copy, RefreshCw, FileText, Hash, Type, Sparkles, Zap, Check } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';

  // Component state
  let amount = $state(5);
  let unit = $state('paragraphs');
  let startWithLorem = $state(true);
  let generatedText = $state('');
  let copied = $state(false);

  // Lorem ipsum word pool
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'ut',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'dolor',
    'in',
    'reprehenderit',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum'
  ];

  const sentenceWords = [
    'at',
    'vero',
    'eos',
    'et',
    'accusamus',
    'et',
    'iusto',
    'odio',
    'dignissimos',
    'ducimus',
    'qui',
    'blanditiis',
    'praesentium',
    'voluptatum',
    'deleniti',
    'atque',
    'corrupti',
    'quos',
    'dolores',
    'et',
    'quas',
    'molestias',
    'excepturi',
    'sint',
    'obcaecati',
    'cupiditate',
    'non',
    'provident',
    'similique',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollitia',
    'animi',
    'id',
    'est',
    'laborum',
    'et',
    'dolorum',
    'fuga',
    'et',
    'harum',
    'quidem',
    'rerum',
    'facilis',
    'est',
    'et',
    'expedita',
    'distinctio',
    'nam',
    'libero',
    'tempore',
    'cum',
    'soluta',
    'nobis',
    'est',
    'eligendi',
    'optio',
    'cumque',
    'nihil',
    'impedit',
    'quo',
    'porro',
    'quisquam',
    'est',
    'qui',
    'minus',
    'id',
    'quod',
    'maxime',
    'placeat',
    'facere',
    'possimus',
    'omnis',
    'voluptas',
    'assumenda',
    'est',
    'omnis',
    'dolor',
    'repellendus',
    'temporibus',
    'autem',
    'quibusdam',
    'et',
    'aut',
    'consequatur',
    'vel',
    'illum',
    'qui',
    'dolorem',
    'eum',
    'fugiat',
    'quo',
    'voluptas',
    'nulla',
    'pariatur',
    'at',
    'vero',
    'eos',
    'et',
    'accusamus',
    'et',
    'iusto',
    'odio',
    'dignissimos',
    'ducimus',
    'qui',
    'blanditiis',
    'praesentium',
    'voluptatum'
  ];

  function getRandomWord() {
    const allWords = [...words, ...sentenceWords];
    return allWords[Math.floor(Math.random() * allWords.length)];
  }

  function generateSentence() {
    const sentenceLength = Math.floor(Math.random() * 10) + 5; // 5-15 words
    const sentence = [];

    for (let i = 0; i < sentenceLength; i++) {
      const word = getRandomWord();
      sentence.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }

    return sentence.join(' ') + '.';
  }

  function generateParagraph() {
    const paragraphLength = Math.floor(Math.random() * 5) + 3; // 3-8 sentences
    const paragraph = [];

    for (let i = 0; i < paragraphLength; i++) {
      paragraph.push(generateSentence());
    }

    return paragraph.join(' ');
  }

  function generateLoremText() {
    let result = '';

    if (startWithLorem && unit !== 'words') {
      result =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n';

      // Adjust amount since we already generated one paragraph
      const adjustedAmount = Math.max(0, amount - 1);

      switch (unit) {
        case 'paragraphs':
          for (let i = 0; i < adjustedAmount; i++) {
            result += generateParagraph() + '\n\n';
          }
          break;
        case 'sentences':
          for (let i = 0; i < adjustedAmount; i++) {
            result += generateSentence() + ' ';
          }
          break;
        case 'words':
          // Handle words case separately
          result = generateWords(amount);
          break;
      }
    } else {
      switch (unit) {
        case 'paragraphs':
          for (let i = 0; i < amount; i++) {
            result += generateParagraph() + '\n\n';
          }
          break;
        case 'sentences':
          for (let i = 0; i < amount; i++) {
            result += generateSentence() + ' ';
          }
          break;
        case 'words':
          result = generateWords(amount);
          break;
      }
    }

    // Clean up trailing whitespace
    generatedText = result.trim();
  }

  function generateWords(count: number) {
    const wordList = [];
    for (let i = 0; i < count; i++) {
      const word = getRandomWord();
      wordList.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    return wordList.join(' ') + '.';
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedText).then(() => {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    });
  }

  function downloadAsFile() {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lorem-ipsum.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Generate initial text
  generateLoremText();
</script>

<svelte:head>
  <title>Lorem Ipsum Generator - Developer Tools</title>
  <meta
    name="description"
    content="Generate Lorem Ipsum placeholder text for design and testing purposes"
  />
</svelte:head>

<ToolLayout
  title="Lorem Ipsum Generator"
  description="Generate placeholder text with customizable length and formatting options."
  icon={FileText}
  color="warning"
>
  <!-- Hero Section -->
  <div
    class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"
  >
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl">
          <FileText class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Placeholder Text</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Generate Lorem Ipsum for design mockups and prototypes
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div
    class="tool-card mb-4"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Amount Input -->
      <div class="flex flex-col">
        <label
          for="amount-input"
          class="label">Amount</label
        >
        <input
          class="tool-input text-sm"
          id="amount-input"
          type="number" inputmode="decimal"
          bind:value={amount}
          min="1"
          max="100"
        />
      </div>

      <!-- Unit Selector -->
      <div class="flex flex-col">
        <label
          for="unit-select"
          class="label">Unit</label
        >
        <select
          id="unit-select"
          bind:value={unit}
          class="tool-select text-sm"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </div>

      <!-- Start with Lorem -->
      <div class="flex items-end">
        <label class="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            bind:checked={startWithLorem}
            class="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <span
            class="relative flex-shrink-0 w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 transition-all hover:border-warning-400 dark:hover:border-primary-400 hover:bg-warning-50 dark:hover:bg-primary-900/20 peer-checked:bg-warning-500 dark:peer-checked:bg-purple-500 peer-checked:border-warning-500 dark:peer-checked:border-purple-500 after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.25 after:h-2.25 after:border-solid after:border-white after:border-r-0 after:border-t-0 after:rotate-45 peer-checked:after:block"
          ></span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2"
            >Start with "Lorem ipsum"</span
          >
        </label>
      </div>

      <!-- Generate Button -->
      <div class="flex items-end">
        <button
          class="btn btn-copy w-full"
          onclick={generateLoremText}
        >
          <RefreshCw class="w-4 h-4" />
          Generate
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div class="flex items-center">
        <FileText class="w-4 h-4 mr-1" />
        <span>{generatedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
      </div>
      <div class="flex items-center">
        <Type class="w-4 h-4 mr-1" />
        <span>
          {generatedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length} sentences
        </span>
      </div>
      <div class="flex items-center">
        <Hash class="w-4 h-4 mr-1" />
        <span>
          {generatedText.split(/\n\n+/).filter(paragraph => paragraph.trim().length > 0).length} paragraphs
        </span>
      </div>
    </div>
  </div>

  <!-- Generated Text -->
  <div
    class="tool-card"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Text</h2>
      <div class="flex gap-2">
        <button
          class="btn btn-sm btn-copy"
          onclick={copyToClipboard}
        >
          <Copy class="w-3.5 h-3.5" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          class="btn btn-sm btn-secondary"
          onclick={downloadAsFile}>Download</button
        >
      </div>
    </div>

    <div class="prose prose-gray dark:prose-invert max-w-none">
      <div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
        {generatedText}
      </div>
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable Length</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate text by paragraphs, sentences, or words with precise control over the amount.
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Generation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Generate fresh Lorem Ipsum text instantly with a single click for your design mockups.
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
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download Support</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Download the generated text as a text file for use in your design projects.
      </p>
    </div>
  </div>
</ToolLayout>
