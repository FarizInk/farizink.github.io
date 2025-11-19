<script lang="ts">
  import { Copy, RefreshCw, FileText, Hash, Type, ChevronLeft } from '@lucide/svelte';
  import { navigate } from '../../lib/router.js';

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

  function handleBackToTools() {
    navigate('/tools');
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
        class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"
      >
        <FileText class="w-10 h-10 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Lorem Ipsum Generator</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Generate placeholder text for your designs and prototypes
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
      <li class="text-gray-900 dark:text-white font-medium">Lorem Ipsum Generator</li>
    </ol>
  </nav>

  <!-- Controls -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Amount Input -->
      <div>
        <label
          for="amount-input"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Amount
        </label>
        <input
          class="input"
          id="amount-input"
          type="number"
          bind:value={amount}
          min="1"
          max="100"
        />
      </div>

      <!-- Unit Selector -->
      <div>
        <label
          for="unit-select"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Unit
        </label>
        <select
          id="unit-select"
          bind:value={unit}
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </div>

      <!-- Start with Lorem -->
      <div class="flex items-end">
        <label class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            bind:checked={startWithLorem}
            class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Start with "Lorem ipsum"
          </span>
        </label>
      </div>

      <!-- Generate Button -->
      <div class="flex items-end">
        <button class="btn btn-primary w-full" onclick={generateLoremText}>
          <RefreshCw class="w-4 h-4 mr-2" />
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
        <span
          >{generatedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length} sentences</span
        >
      </div>
      <div class="flex items-center">
        <Hash class="w-4 h-4 mr-1" />
        <span
          >{generatedText.split(/\n\n+/).filter(paragraph => paragraph.trim().length > 0).length} paragraphs</span
        >
      </div>
    </div>
  </div>

  <!-- Generated Text -->
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Text</h2>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" onclick={copyToClipboard}>
          <Copy class="w-4 h-4 mr-1" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button class="btn btn-primary btn-sm" onclick={downloadAsFile}>Download</button>
      </div>
    </div>

    <div class="prose prose-gray dark:prose-invert max-w-none">
      <div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
        {generatedText}
      </div>
    </div>
  </div>
</div>
