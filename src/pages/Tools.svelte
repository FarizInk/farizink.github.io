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
    Image
  } from '@lucide/svelte';
  import Button from '../components/ui/Button.svelte';
  import Input from '../components/ui/Input.svelte';
  import ToolCard from '../components/ui/ToolCard.svelte';

  let searchQuery = $state('');

  const toolsByCategory = [
    {
      name: 'Text & Data Processing',
      description: 'Tools for working with text and data',
      tools: [
        {
          id: 'json-parser',
          name: 'JSON Parser & Formatter',
          description: 'Format, validate, and minify JSON data with ease',
          icon: FileJson,
          color: 'json-green',
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
          color: 'cyan',
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
          color: 'indigo',
          features: ['Multiple variations', 'Custom length', 'Paragraphs', 'Sentences', 'Words'],
          comingSoon: false
        },
        {
          id: 'character-counter',
          name: 'Character Counter',
          description: 'Count characters, words, and analyze text',
          icon: Calculator,
          color: 'purple',
          features: ['Character count', 'Word count', 'Reading time', 'Sentences', 'Paragraphs'],
          comingSoon: false
        },
        {
          id: 'text-diff',
          name: 'Text Diff Tool',
          description: 'Compare two text blocks and highlight differences',
          icon: GitCompare,
          color: 'orange',
          features: ['Side by side comparison', 'Highlight differences', 'Merge suggestions'],
          comingSoon: false
        },
        {
          id: 'url-parser',
          name: 'URL Parser/Analyzer',
          description: 'Parse URLs and extract components',
          icon: Link,
          color: 'lime',
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
          color: 'url-orange',
          features: ['URL encode', 'URL decode', 'Batch processing', 'Safe for special characters'],
          comingSoon: false
        },
        {
          id: 'markdown-preview',
          name: 'Markdown Preview',
          description: 'Preview and write markdown with live formatting',
          icon: FileText,
          color: 'indigo',
          features: ['Live preview', 'Syntax highlighting', 'Export to HTML', 'CommonMark support'],
          comingSoon: false
        },
        {
          id: 'base64-converter',
          name: 'Base64 Converter',
          description: 'Encode and decode Base64 strings',
          icon: Hash,
          color: 'base64-purple',
          features: ['String to Base64', 'Base64 to string', 'File support', 'Batch conversion'],
          comingSoon: false
        },
        {
          id: 'css-minifier',
          name: 'CSS Minifier/Beautifier',
          description: 'Minify and format CSS code',
          icon: Code,
          color: 'blue',
          features: ['Minify CSS', 'Beautify CSS', 'Copy to clipboard', 'Download result'],
          comingSoon: false
        },
        {
          id: 'js-minifier',
          name: 'JavaScript Minifier/Beautifier',
          description: 'Minify and format JavaScript code',
          icon: Code,
          color: 'yellow',
          features: ['Minify JS', 'Beautify JS', 'Syntax validation', 'Copy to clipboard'],
          comingSoon: false
        },
        {
          id: 'html-encoder',
          name: 'HTML Entity Encoder/Decoder',
          description: 'Convert HTML entities and special characters',
          icon: Code,
          color: 'rose',
          features: ['Encode HTML', 'Decode HTML', 'Special characters', 'Unicode support'],
          comingSoon: false
        },
        {
          id: 'slug-generator',
          name: 'URL Slug Generator',
          description: 'Create URL-friendly slugs from text',
          icon: Type,
          color: 'emerald',
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
          color: 'violet',
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
          color: 'password-red',
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
          color: 'qrcode-teal',
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
          color: 'hash-blue',
          features: ['MD5', 'SHA1', 'SHA256', 'SHA512', 'Multiple formats'],
          comingSoon: false
        },
        {
          id: 'hash-comparer',
          name: 'Hash Comparer',
          description: 'Compare two hash values for verification',
          icon: GitCompare,
          color: 'blue',
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
          color: 'slate',
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
          color: 'purple',
          features: ['HEX to RGB', 'RGB to HEX', 'HSL support', 'Color picker'],
          comingSoon: false
        },
        {
          id: 'color-palette',
          name: 'Color Palette Generator',
          description: 'Generate harmonious color palettes',
          icon: Palette,
          color: 'palette-pink',
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
          color: 'blue',
          features: ['Linear gradients', 'Radial gradients', 'Multiple stops', 'CSS export'],
          comingSoon: false
        },
        {
          id: 'css-shadow-generator',
          name: 'CSS Shadow Generator',
          description: 'Generate box-shadow and text-shadow CSS',
          icon: Box,
          color: 'gray',
          features: ['Box shadows', 'Text shadows', 'Multiple shadows', 'CSS export'],
          comingSoon: false
        },
        {
          id: 'ascii-art-generator',
          name: 'ASCII Art Generator',
          description: 'Convert text into ASCII art with different styles',
          icon: Image,
          color: 'purple',
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
          color: 'green',
          features: ['Tip calculation', 'Bill splitting', 'Custom percentages', 'Tax calculation'],
          comingSoon: false
        },
        {
          id: 'unit-converter',
          name: 'Unit Converter',
          description: 'Convert between metric and imperial units',
          icon: ArrowUpDown,
          color: 'blue',
          features: ['Length conversion', 'Weight conversion', 'Temperature', 'Volume conversion'],
          comingSoon: false
        },
        {
          id: 'percentage-calculator',
          name: 'Percentage Calculator',
          description: 'Calculate percentages and discounts',
          icon: Percent,
          color: 'purple',
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
          color: 'red',
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
          color: 'indigo',
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
          color: 'yellow',
          features: ['Random selection', 'Weighted picks', 'Multiple items', 'History tracking'],
          comingSoon: false
        },
        {
          id: 'cron-generator',
          name: 'Cron Expression Generator',
          description: 'Generate and test cron expressions',
          icon: Timer,
          color: 'teal',
          features: ['Visual cron builder', 'Expression testing', 'Next run times', 'Presets'],
          comingSoon: false
        },
        {
          id: 'timestamp-converter',
          name: 'Unix Timestamp Converter',
          description: 'Convert timestamps to human-readable dates',
          icon: Calendar,
          color: 'orange',
          features: ['Unix timestamps', 'ISO dates', 'Multiple formats', 'Current timestamp'],
          comingSoon: false
        }
      ]
    }
  ];

  // Filter tools based on search query
  const filteredTools = $derived(
    searchQuery
      ? toolsByCategory
          .map(category => ({
            ...category,
            tools: category.tools.filter(
              tool =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.features.some(feature =>
                  feature.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
          }))
          .filter(category => category.tools.length > 0)
      : toolsByCategory
  );

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

  function getColorClasses(color: string) {
    const colorMap = {
      // Tool-specific colors with enhanced gradients
      'password-red': {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        hover: 'hover:bg-red-50 dark:hover:bg-red-900/10',
        gradient: 'from-red-500 to-red-700'
      },
      'qrcode-teal': {
        bg: 'bg-teal-100 dark:bg-teal-900/20',
        text: 'text-teal-600 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800',
        hover: 'hover:bg-teal-50 dark:hover:bg-teal-900/10',
        gradient: 'from-teal-500 to-teal-700'
      },
      'palette-pink': {
        bg: 'bg-pink-100 dark:bg-pink-900/20',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-800',
        hover: 'hover:bg-pink-50 dark:hover:bg-pink-900/10',
        gradient: 'from-pink-500 to-pink-700'
      },
      'hash-blue': {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
        gradient: 'from-blue-500 to-blue-700'
      },
      'base64-purple': {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
        gradient: 'from-purple-500 to-purple-700'
      },
      'json-green': {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:bg-green-50 dark:hover:bg-green-900/10',
        gradient: 'from-green-500 to-green-700'
      },
      'url-orange': {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/10',
        gradient: 'from-orange-500 to-orange-700'
      },

      // Fallback colors
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
        gradient: 'from-blue-500 to-blue-700'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
        gradient: 'from-purple-500 to-purple-700'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:bg-green-50 dark:hover:bg-green-900/10',
        gradient: 'from-green-500 to-green-700'
      },
      indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-800',
        hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/10',
        gradient: 'from-indigo-500 to-indigo-700'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        text: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10',
        gradient: 'from-yellow-500 to-yellow-600'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        hover: 'hover:bg-red-50 dark:hover:bg-red-900/10',
        gradient: 'from-red-500 to-red-700'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900/20',
        text: 'text-teal-600 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800',
        hover: 'hover:bg-teal-50 dark:hover:bg-teal-900/10',
        gradient: 'from-teal-500 to-teal-700'
      },
      cyan: {
        bg: 'bg-cyan-100 dark:bg-cyan-900/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-200 dark:border-cyan-800',
        hover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/10',
        gradient: 'from-cyan-500 to-cyan-700'
      },
      lime: {
        bg: 'bg-lime-100 dark:bg-lime-900/20',
        text: 'text-lime-600 dark:text-lime-400',
        border: 'border-lime-200 dark:border-lime-800',
        hover: 'hover:bg-lime-50 dark:hover:bg-lime-900/10',
        gradient: 'from-lime-500 to-lime-700'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/10',
        gradient: 'from-orange-500 to-orange-700'
      },
      rose: {
        bg: 'bg-rose-100 dark:bg-rose-900/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800',
        hover: 'hover:bg-rose-50 dark:hover:bg-rose-900/10',
        gradient: 'from-rose-500 to-rose-700'
      },
      emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10',
        gradient: 'from-emerald-500 to-emerald-700'
      },
      violet: {
        bg: 'bg-violet-100 dark:bg-violet-900/20',
        text: 'text-violet-600 dark:text-violet-400',
        border: 'border-violet-200 dark:border-violet-800',
        hover: 'hover:bg-violet-50 dark:hover:bg-violet-900/10',
        gradient: 'from-violet-500 to-violet-700'
      },
      amber: {
        bg: 'bg-amber-100 dark:bg-amber-900/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/10',
        gradient: 'from-amber-500 to-amber-600'
      },
      slate: {
        bg: 'bg-slate-100 dark:bg-slate-900/20',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-800',
        hover: 'hover:bg-slate-50 dark:hover:bg-slate-900/10',
        gradient: 'from-slate-500 to-slate-700'
      },
      pink: {
        bg: 'bg-pink-100 dark:bg-pink-900/20',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-800',
        hover: 'hover:bg-pink-50 dark:hover:bg-pink-900/10',
        gradient: 'from-pink-500 to-pink-700'
      },
      gray: {
        bg: 'bg-gray-100 dark:bg-gray-900/20',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-800',
        hover: 'hover:bg-gray-50 dark:hover:bg-gray-900/10',
        gradient: 'from-gray-500 to-gray-700'
      }
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  }
</script>

<div class="max-w-7xl mx-auto p-6">
  <div class="mb-8">
    <h1
      class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient"
    >
      Developer Tools
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
      A comprehensive collection of useful tools for developers, designers, and everyday tasks. Each
      tool is carefully crafted with attention to detail and user experience.
    </p>

    <!-- Search Input -->
    <div class="max-w-2xl mx-auto mb-8">
      <Input
        bind:value={searchQuery}
        placeholder="Search tools by name, description, or features..."
        leftIcon={Search}
        size="lg"
        type="search"
      />
      {#if searchQuery && filteredTools.length === 0}
        <p class="text-center text-gray-500 dark:text-gray-400 mt-4">
          No tools found matching "{searchQuery}"
        </p>
      {/if}
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
      <li class="text-gray-900 dark:text-white font-medium">Tools</li>
    </ol>
  </nav>

  <!-- Categories -->
  {#each filteredTools as category (category.name)}
    <div class="mb-12">
      <!-- Category Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {category.name}
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          {category.description}
        </p>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each category.tools as tool (tool.id)}
          {@const colors = getColorClasses(tool.color)}
          <ToolCard {tool} {colors} on:toolClick={e => handleToolClick(e.detail.toolId)} />
        {/each}
      </div>
    </div>
  {/each}

  <!-- Call to Action -->
  <div
    class="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
  >
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">More Tools Coming Soon</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        I'm constantly adding new tools to make your development workflow easier. Check back
        regularly for updates!
      </p>
      <div class="flex justify-center">
        <Button
          href="https://github.com/FarizInk"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
        >
          <svg slot="leftIcon" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Follow on GitHub
        </Button>
      </div>
    </div>
  </div>
</div>
