<script lang="ts">
  import { navigate } from '../lib/router.js';
  import {
    Search,
    FileText,
    Hash,
    Type,
    GitCompare,
    Link,
    Code,
    FileJson,
    Palette,
    Lock,
    Calculator,
    Calendar,
    DollarSign,
    Shuffle,
    Key,
    QrCode,
    Droplets,
    Box,
    Timer,
    Activity,
    ArrowUpDown,
    Percent,
    Globe,
    Image,
    Wrench,
    ArrowRight
  } from '@lucide/svelte';

  let searchQuery = $state('');

  interface Tool {
    id: string;
    name: string;
    description: string;
    icon: any;
    features: string[];
    comingSoon: boolean;
    popular?: boolean;
  }

  interface Category {
    name: string;
    description: string;
    tools: Tool[];
  }

  const toolsByCategory: Category[] = [
    {
      name: 'Text & Data Processing',
      description: 'Tools for working with text and data',
      tools: [
        {
          id: 'json-parser',
          name: 'JSON Parser & Formatter',
          description: 'Format, validate, and minify JSON data with ease',
          icon: FileJson,
          features: [
            'Validate JSON',
            'Format with custom indentation',
            'Minify JSON',
            'Copy to clipboard'
          ],
          comingSoon: false
        },
        {
          id: 'text-case-converter',
          name: 'Text Case Converter',
          description: 'Convert between different text cases',
          icon: Type,
          features: [
            'UPPERCASE',
            'lowercase',
            'Title Case',
            'camelCase',
            'snake_case',
            'kebab-case'
          ],
          comingSoon: false
        },
        {
          id: 'lorem-ipsum-generator',
          name: 'Lorem Ipsum Generator',
          description: 'Generate placeholder text for design and testing',
          icon: FileText,
          features: ['Multiple variations', 'Custom length', 'Paragraphs', 'Sentences', 'Words'],
          comingSoon: false
        },
        {
          id: 'character-counter',
          name: 'Character Counter',
          description: 'Count characters, words, and analyze text',
          icon: Calculator,
          features: ['Character count', 'Word count', 'Reading time', 'Sentences', 'Paragraphs'],
          comingSoon: false
        },
        {
          id: 'text-diff',
          name: 'Text Diff Tool',
          description: 'Compare two text blocks and highlight differences',
          icon: GitCompare,
          features: ['Side by side comparison', 'Highlight differences', 'Merge suggestions'],
          comingSoon: false
        },
        {
          id: 'url-parser',
          name: 'URL Parser/Analyzer',
          description: 'Parse URLs and extract components',
          icon: Link,
          features: ['Extract domain', 'Path analysis', 'Query parameters', 'Hash fragments'],
          comingSoon: false
        }
      ]
    },
    {
      name: 'Web Development',
      description: 'Essential tools for web developers',
      tools: [
        {
          id: 'url-encoder',
          name: 'URL Encoder/Decoder',
          description: 'Encode and decode URLs safely',
          icon: Link,
          features: ['URL encode', 'URL decode', 'Batch processing', 'Safe for special characters'],
          comingSoon: false
        },
        {
          id: 'markdown-preview',
          name: 'Markdown Preview',
          description: 'Preview and write markdown with live formatting',
          icon: FileText,
          features: ['Live preview', 'Syntax highlighting', 'Export to HTML', 'CommonMark support'],
          comingSoon: false
        },
        {
          id: 'base64-converter',
          name: 'Base64 Converter',
          description: 'Encode and decode Base64 strings',
          icon: Hash,
          features: ['String to Base64', 'Base64 to string', 'File support', 'Batch conversion'],
          comingSoon: false
        },
        {
          id: 'css-minifier',
          name: 'CSS Minifier/Beautifier',
          description: 'Minify and format CSS code',
          icon: Code,
          features: ['Minify CSS', 'Beautify CSS', 'Copy to clipboard', 'Download result'],
          comingSoon: false
        },
        {
          id: 'js-minifier',
          name: 'JavaScript Minifier/Beautifier',
          description: 'Minify and format JavaScript code',
          icon: Code,
          features: ['Minify JS', 'Beautify JS', 'Syntax validation', 'Copy to clipboard'],
          comingSoon: false
        },
        {
          id: 'html-encoder',
          name: 'HTML Entity Encoder/Decoder',
          description: 'Convert HTML entities and special characters',
          icon: Code,
          features: ['Encode HTML', 'Decode HTML', 'Special characters', 'Unicode support'],
          comingSoon: false
        },
        {
          id: 'slug-generator',
          name: 'URL Slug Generator',
          description: 'Create URL-friendly slugs from text',
          icon: Type,
          features: [
            'URL-friendly slugs',
            'Custom separators',
            'Lowercase conversion',
            'Special character removal'
          ],
          comingSoon: false
        },
        {
          id: 'meta-tag-generator',
          name: 'Meta Tag Generator',
          description: 'Generate SEO meta tags for websites',
          icon: Globe,
          features: ['SEO tags', 'Open Graph', 'Twitter Cards', 'JSON-LD structured data'],
          comingSoon: false
        }
      ]
    },
    {
      name: 'Encoding & Security',
      description: 'Encoding, decoding, and security tools',
      tools: [
        {
          id: 'password-generator',
          name: 'Password Generator',
          description: 'Generate secure and random passwords',
          icon: Lock,
          features: [
            'Customizable length',
            'Character sets',
            'Password strength',
            'Copy to clipboard'
          ],
          comingSoon: false
        },
        {
          id: 'qr-code-generator',
          name: 'QR Code Generator',
          description: 'Generate custom QR codes for URLs and text',
          icon: QrCode,
          features: [
            'Custom size and colors',
            'Error correction levels',
            'Download as image',
            'Copy to clipboard'
          ],
          comingSoon: false
        },
        {
          id: 'hash-generator',
          name: 'Hash Generator',
          description: 'Generate MD5, SHA1, SHA256 hashes',
          icon: Hash,
          features: ['MD5', 'SHA1', 'SHA256', 'SHA512', 'Multiple formats'],
          comingSoon: false
        },
        {
          id: 'hash-comparer',
          name: 'Hash Comparer',
          description: 'Compare two hash values for verification',
          icon: GitCompare,
          features: [
            'Real-time comparison',
            'Supports all hash types',
            'Detailed analysis',
            'Easy copy/paste'
          ],
          comingSoon: false
        },
        {
          id: 'jwt-decoder',
          name: 'JWT Decoder',
          description: 'Decode JWT tokens safely',
          icon: Key,
          features: ['Header decoding', 'Payload decoding', 'Signature validation', 'Pretty print'],
          comingSoon: false
        }
      ]
    },
    {
      name: 'Color & Design',
      description: 'Tools for designers and color management',
      tools: [
        {
          id: 'color-converter',
          name: 'Color Converter',
          description: 'Convert between different color formats',
          icon: Palette,
          features: ['HEX to RGB', 'RGB to HEX', 'HSL support', 'Color picker'],
          comingSoon: false
        },
        {
          id: 'color-palette',
          name: 'Color Palette Generator',
          description: 'Generate harmonious color palettes',
          icon: Palette,
          features: [
            'Complementary colors',
            'Triadic palettes',
            'Analogous colors',
            'Export palettes'
          ],
          comingSoon: false
        },
        {
          id: 'gradient-generator',
          name: 'CSS Gradient Generator',
          description: 'Create CSS gradients with preview',
          icon: Droplets,
          features: ['Linear gradients', 'Radial gradients', 'Multiple stops', 'CSS export'],
          comingSoon: false
        },
        {
          id: 'css-shadow-generator',
          name: 'CSS Shadow Generator',
          description: 'Generate box-shadow and text-shadow CSS',
          icon: Box,
          features: ['Box shadows', 'Text shadows', 'Multiple shadows', 'CSS export'],
          comingSoon: false
        },
        {
          id: 'ascii-art-generator',
          name: 'ASCII Art Generator',
          description: 'Convert text into ASCII art with different styles',
          icon: Image,
          features: [
            'Multiple art styles',
            'Real-time preview',
            'Easy export',
            'Character support'
          ],
          comingSoon: false
        }
      ]
    },
    {
      name: 'Math & Calculation',
      description: 'Useful calculation and math tools',
      tools: [
        {
          id: 'tip-calculator',
          name: 'Tip Calculator',
          description: 'Calculate tips and split bills',
          icon: DollarSign,
          features: ['Tip calculation', 'Bill splitting', 'Custom percentages', 'Tax calculation'],
          comingSoon: false
        },
        {
          id: 'unit-converter',
          name: 'Unit Converter',
          description: 'Convert between metric and imperial units',
          icon: ArrowUpDown,
          features: ['Length conversion', 'Weight conversion', 'Temperature', 'Volume conversion'],
          comingSoon: false
        },
        {
          id: 'percentage-calculator',
          name: 'Percentage Calculator',
          description: 'Calculate percentages and discounts',
          icon: Percent,
          features: [
            'Percentage calculation',
            'Discount calculator',
            'Tax calculator',
            'Tip calculator'
          ],
          comingSoon: false
        },
        {
          id: 'bmi-calculator',
          name: 'BMI Calculator',
          description: 'Calculate Body Mass Index',
          icon: Activity,
          features: [
            'BMI calculation',
            'Health indicators',
            'Weight categories',
            'Ideal weight range'
          ],
          comingSoon: false
        },
        {
          id: 'age-calculator',
          name: 'Age Calculator',
          description: 'Calculate exact age from birth date',
          icon: Calendar,
          features: ['Exact age', 'Years, months, days', 'Next birthday countdown', 'Zodiac sign'],
          comingSoon: false
        }
      ]
    },
    {
      name: 'Utility Tools',
      description: 'General purpose utility tools',
      tools: [
        {
          id: 'random-picker',
          name: 'Random Picker',
          description: 'Random item picker from lists',
          icon: Shuffle,
          features: ['Random selection', 'Weighted picks', 'Multiple items', 'History tracking'],
          comingSoon: false
        },
        {
          id: 'cron-generator',
          name: 'Cron Expression Generator',
          description: 'Generate and test cron expressions',
          icon: Timer,
          features: ['Visual cron builder', 'Expression testing', 'Next run times', 'Presets'],
          comingSoon: false
        },
        {
          id: 'timestamp-converter',
          name: 'Unix Timestamp Converter',
          description: 'Convert timestamps to human-readable dates',
          icon: Calendar,
          features: ['Unix timestamps', 'ISO dates', 'Multiple formats', 'Current timestamp'],
          comingSoon: false
        }
      ]
    }
  ];

  let selectedCategory = $state('All');

  const categories = ['All', ...toolsByCategory.map(c => c.name)];

  // Filter tools based on search query and selected category
  const filteredTools = $derived.by(() => {
    let tools = toolsByCategory.flatMap(category => category.tools);

    if (selectedCategory !== 'All') {
      tools = toolsByCategory.find(c => c.name === selectedCategory)?.tools || [];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(
        tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    return tools;
  });

  function handleToolClick(toolId: string) {
    if (toolId === 'json-parser') {
      navigate('/tools/json-parser');
    } else if (toolId === 'color-converter') {
      navigate('/tools/color-converter');
    } else if (toolId === 'url-encoder') {
      navigate('/tools/url-encoder');
    } else if (toolId === 'markdown-preview') {
      navigate('/tools/markdown-preview');
    } else if (toolId === 'base64-converter') {
      navigate('/tools/base64-converter');
    } else if (toolId === 'password-generator') {
      navigate('/tools/password-generator');
    } else if (toolId === 'qr-code-generator') {
      navigate('/tools/qr-code-generator');
    } else if (toolId === 'text-diff') {
      navigate('/tools/text-diff');
    } else if (toolId === 'url-parser') {
      navigate('/tools/url-parser');
    } else if (toolId === 'css-minifier') {
      navigate('/tools/css-minifier');
    } else if (toolId === 'js-minifier') {
      navigate('/tools/js-minifier');
    } else if (toolId === 'html-encoder') {
      navigate('/tools/html-encoder');
    } else if (toolId === 'slug-generator') {
      navigate('/tools/slug-generator');
    } else if (toolId === 'hash-generator') {
      navigate('/tools/hash-generator');
    } else if (toolId === 'color-palette') {
      navigate('/tools/color-palette');
    } else if (toolId === 'gradient-generator') {
      navigate('/tools/gradient-generator');
    } else if (toolId === 'tip-calculator') {
      navigate('/tools/tip-calculator');
    } else if (toolId === 'timestamp-converter') {
      navigate('/tools/timestamp-converter');
    } else if (toolId === 'lorem-ipsum-generator') {
      navigate('/tools/lorem-ipsum-generator');
    } else if (toolId === 'text-case-converter') {
      navigate('/tools/text-case-converter');
    } else if (toolId === 'character-counter') {
      navigate('/tools/character-counter');
    } else if (toolId === 'meta-tag-generator') {
      navigate('/tools/meta-tag-generator');
    } else if (toolId === 'jwt-decoder') {
      navigate('/tools/jwt-decoder');
    } else if (toolId === 'css-shadow-generator') {
      navigate('/tools/css-shadow-generator');
    } else if (toolId === 'unit-converter') {
      navigate('/tools/unit-converter');
    } else if (toolId === 'percentage-calculator') {
      navigate('/tools/percentage-calculator');
    } else if (toolId === 'bmi-calculator') {
      navigate('/tools/bmi-calculator');
    } else if (toolId === 'age-calculator') {
      navigate('/tools/age-calculator');
    } else if (toolId === 'random-picker') {
      navigate('/tools/random-picker');
    } else if (toolId === 'cron-generator') {
      navigate('/tools/cron-generator');
    } else if (toolId === 'hash-comparer') {
      navigate('/tools/hash-comparer');
    } else if (toolId === 'ascii-art-generator') {
      navigate('/tools/ascii-art-generator');
    }
  }
</script>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen animate-fade-in">
  <div class="text-center mb-16">
    <div
      class="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[var(--ds-primary-50)] dark:bg-[var(--ds-primary-900)]/30 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"
    >
      <Wrench class="w-8 h-8" />
    </div>
    <h1
      class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-6 tracking-tight"
    >
      Developer Tools
    </h1>
    <p
      class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed"
    >
      A collection of useful tools for developers and designers. Fast, secure, and easy to use.
    </p>
  </div>

  <div class="relative max-w-2xl mx-auto mb-12">
    <div
      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ds-secondary-400)] pointer-events-none"
    >
      <Search class="w-5 h-5" />
    </div>
    <input
      type="search"
      placeholder="Search tools..."
      bind:value={searchQuery}
      class="input pl-11 shadow-sm text-lg"
    />
  </div>

  <div class="flex flex-wrap justify-center gap-3 mb-12">
    {#each categories as category}
      <button
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {selectedCategory ===
        category
          ? 'bg-[var(--ds-primary-600)] text-white shadow-md shadow-[var(--ds-primary-500)]/20'
          : 'bg-white dark:bg-[var(--ds-secondary-800)] text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] hover:bg-[var(--ds-secondary-50)] dark:hover:bg-[var(--ds-secondary-700)] border border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)]'}"
        onclick={() => (selectedCategory = category)}
      >
        {category}
      </button>
    {/each}
  </div>

  {#if filteredTools.length === 0}
    <div class="text-center py-12">
      <div
        class="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] text-[var(--ds-secondary-400)]"
      >
        <Search class="w-8 h-8" />
      </div>
      <h3 class="text-lg font-medium text-[var(--ds-secondary-900)] dark:text-white mb-2">
        No tools found
      </h3>
      <p class="text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-400)]">
        Try adjusting your search or category filter.
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredTools as tool (tool.id)}
        <button
          class="text-left w-full h-full group focus:outline-none"
          onclick={() => handleToolClick(tool.id)}
        >
          <div class="card card-elevated card-hover h-full flex flex-col relative overflow-hidden">
            <div class="flex items-start justify-between mb-4 relative z-10">
              <div
                class="p-3 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
              >
                <tool.icon class="w-6 h-6" />
              </div>
              {#if tool.popular}
                <span
                  class="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full border border-yellow-200 dark:border-yellow-800"
                >
                  Popular
                </span>
              {/if}
            </div>

            <h3
              class="text-xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-2 group-hover:text-[var(--ds-primary-600)] dark:group-hover:text-[var(--ds-primary-400)] transition-colors duration-200"
            >
              {tool.name}
            </h3>

            <p
              class="text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] mb-6 leading-relaxed flex-grow"
            >
              {tool.description}
            </p>

            <div
              class="flex items-center text-sm font-medium text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mt-auto"
            >
              Open Tool <ArrowRight
                class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
              />
            </div>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</main>
