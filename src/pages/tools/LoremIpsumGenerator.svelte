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
  <!-- Controls -->
  <div class="tool-card">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Amount Input -->
      <div class="flex flex-col">
        <label for="amount-input" class="label">Amount</label>
        <input
          class="tool-input"
          id="amount-input"
          type="number" inputmode="decimal"
          bind:value={amount}
          min="1"
          max="100"
        />
      </div>

      <!-- Unit Selector -->
      <div class="flex flex-col">
        <label for="unit-select" class="label">Unit</label>
        <select id="unit-select" bind:value={unit} class="tool-select">
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </div>

      <!-- Start with Lorem -->
      <div class="flex items-end pb-3">
        <label class="custom-checkbox">
          <input type="checkbox" bind:checked={startWithLorem} />
          <span class="checkmark"></span>
          <span class="label-text">Start with "Lorem ipsum"</span>
        </label>
      </div>

      <!-- Generate Button -->
      <div class="flex items-end">
        <button class="btn btn-primary w-full" onclick={generateLoremText}>
          <RefreshCw class="w-4 h-4" />
          Generate
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="flex flex-wrap gap-4 text-body-sm text-ink-muted">
      <div class="flex items-center">
        <FileText class="w-4 h-4 mr-1" />
        <span><span class="font-mono text-ink">{generatedText.split(/\s+/).filter(word => word.length > 0).length}</span> words</span>
      </div>
      <div class="flex items-center">
        <Type class="w-4 h-4 mr-1" />
        <span>
          <span class="font-mono text-ink">{generatedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length}</span> sentences
        </span>
      </div>
      <div class="flex items-center">
        <Hash class="w-4 h-4 mr-1" />
        <span>
          <span class="font-mono text-ink">{generatedText.split(/\n\n+/).filter(paragraph => paragraph.trim().length > 0).length}</span> paragraphs
        </span>
      </div>
    </div>
  </div>

  <!-- Generated Text -->
  <div class="tool-card">
    <div class="card-header">
      <h2 class="section-title !mb-0">Generated text</h2>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-secondary" onclick={copyToClipboard}>
          <Copy class="w-3.5 h-3.5" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button class="btn btn-sm btn-ghost" onclick={downloadAsFile}>Download</button>
      </div>
    </div>

    <div class="max-w-none rounded-md bg-sunken p-4">
      <div class="whitespace-pre-wrap text-body text-ink">
        {generatedText}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="card">
      <div class="feature-icon">
        <Sparkles class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Customizable length</h3>
      <p class="feature-description">
        Generate text by paragraphs, sentences, or words with precise control over the amount.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Zap class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Instant generation</h3>
      <p class="feature-description">
        Generate fresh Lorem Ipsum text instantly with a single click for your design mockups.
      </p>
    </div>

    <div class="card">
      <div class="feature-icon">
        <Check class="w-5 h-5" />
      </div>
      <h3 class="feature-title">Download support</h3>
      <p class="feature-description">
        Download the generated text as a text file for use in your design projects.
      </p>
    </div>
  </div>
</ToolLayout>
