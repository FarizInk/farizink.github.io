<script lang="ts">
  import { navigate } from '../lib/router.js';
  import {
    Search,
    X,
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
    ArrowRight,
    Check,
    Zap,
    Key,
    QrCode,
    Droplets,
    Box,
    Timer,
    Users,
    ArrowUpDown,
    Percent
  } from '@lucide/svelte';

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
          color: 'blue',
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
          comingSoon: true
        },
        {
          id: 'lorem-ipsum-generator',
          name: 'Lorem Ipsum Generator',
          description: 'Generate placeholder text for design and testing',
          icon: FileText,
          color: 'indigo',
          features: ['Multiple variations', 'Custom length', 'Paragraphs', 'Sentences', 'Words'],
          comingSoon: true
        },
        {
          id: 'character-counter',
          name: 'Character Counter',
          description: 'Count characters, words, and analyze text',
          icon: Calculator,
          color: 'purple',
          features: ['Character count', 'Word count', 'Reading time', 'Sentences', 'Paragraphs'],
          comingSoon: true
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
          color: 'green',
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
          color: 'yellow',
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
          icon: Code,
          color: 'violet',
          features: ['SEO tags', 'Open Graph', 'Twitter Cards', 'JSON-LD structured data'],
          comingSoon: true
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
          color: 'red',
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
          color: 'teal',
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
          color: 'amber',
          features: ['MD5', 'SHA1', 'SHA256', 'SHA512', 'Multiple formats'],
          comingSoon: false
        },
        {
          id: 'jwt-decoder',
          name: 'JWT Decoder',
          description: 'Decode JWT tokens safely',
          icon: Key,
          color: 'slate',
          features: ['Header decoding', 'Payload decoding', 'Signature validation', 'Pretty print'],
          comingSoon: true
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
          color: 'pink',
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
          comingSoon: true
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
          comingSoon: true
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
          comingSoon: true
        },
        {
          id: 'bmi-calculator',
          name: 'BMI Calculator',
          description: 'Calculate Body Mass Index',
          icon: Users,
          color: 'red',
          features: [
            'BMI calculation',
            'Health indicators',
            'Weight categories',
            'Ideal weight range'
          ],
          comingSoon: true
        },
        {
          id: 'age-calculator',
          name: 'Age Calculator',
          description: 'Calculate exact age from birth date',
          icon: Calendar,
          color: 'indigo',
          features: ['Exact age', 'Years, months, days', 'Next birthday countdown', 'Zodiac sign'],
          comingSoon: true
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
          icon: Zap,
          color: 'yellow',
          features: ['Random selection', 'Weighted picks', 'Multiple items', 'History tracking'],
          comingSoon: true
        },
        {
          id: 'cron-generator',
          name: 'Cron Expression Generator',
          description: 'Generate and test cron expressions',
          icon: Timer,
          color: 'teal',
          features: ['Visual cron builder', 'Expression testing', 'Next run times', 'Presets'],
          comingSoon: true
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
    }
  }

  function getColorClasses(color: string) {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/10'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800',
        hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/10'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        hover: 'hover:bg-green-50 dark:hover:bg-green-900/10'
      },
      indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-800',
        hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        text: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        hover: 'hover:bg-red-50 dark:hover:bg-red-900/10'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900/20',
        text: 'text-teal-600 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800',
        hover: 'hover:bg-teal-50 dark:hover:bg-teal-900/10'
      },
      cyan: {
        bg: 'bg-cyan-100 dark:bg-cyan-900/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-200 dark:border-cyan-800',
        hover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/10'
      },
      lime: {
        bg: 'bg-lime-100 dark:bg-lime-900/20',
        text: 'text-lime-600 dark:text-lime-400',
        border: 'border-lime-200 dark:border-lime-800',
        hover: 'hover:bg-lime-50 dark:hover:bg-lime-900/10'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/10'
      },
      rose: {
        bg: 'bg-rose-100 dark:bg-rose-900/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800',
        hover: 'hover:bg-rose-50 dark:hover:bg-rose-900/10'
      },
      emerald: {
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10'
      },
      violet: {
        bg: 'bg-violet-100 dark:bg-violet-900/20',
        text: 'text-violet-600 dark:text-violet-400',
        border: 'border-violet-200 dark:border-violet-800',
        hover: 'hover:bg-violet-50 dark:hover:bg-violet-900/10'
      },
      amber: {
        bg: 'bg-amber-100 dark:bg-amber-900/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/10'
      },
      slate: {
        bg: 'bg-slate-100 dark:bg-slate-900/20',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-800',
        hover: 'hover:bg-slate-50 dark:hover:bg-slate-900/10'
      },
      pink: {
        bg: 'bg-pink-100 dark:bg-pink-900/20',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-800',
        hover: 'hover:bg-pink-50 dark:hover:bg-pink-900/10'
      },
      gray: {
        bg: 'bg-gray-100 dark:bg-gray-900/20',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-800',
        hover: 'hover:bg-gray-50 dark:hover:bg-gray-900/10'
      }
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  }
</script>

<div class="max-w-7xl mx-auto p-6">
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Developer Tools</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
      A comprehensive collection of useful tools for developers, designers, and everyday tasks
    </p>

    <!-- Search Input -->
    <div class="max-w-2xl mx-auto mb-8">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search tools by name, description, or features..."
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        />
        {#if searchQuery}
          <button
            onclick={() => (searchQuery = '')}
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X class="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        {/if}
      </div>
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
          <button
            type="button"
            class="group relative bg-white dark:bg-gray-800 rounded-xl border {colors.border} overflow-hidden transition-all duration-300 {colors.hover} cursor-pointer text-left"
            onclick={() => handleToolClick(tool.id)}
            disabled={tool.comingSoon}
          >
            <!-- Tool Content -->
            <div class="p-6">
              <!-- Icon -->
              <div
                class="w-16 h-16 {colors.bg} rounded-lg flex items-center justify-center mb-4 {colors.text}"
              >
                {#if typeof tool.icon === 'string'}
                  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                  {@html tool.icon}
                {:else}
                  {@const IconComponent = tool.icon}
                  <IconComponent class="w-8 h-8" />
                {/if}
              </div>

              <!-- Title and Status -->
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </h3>
                {#if tool.comingSoon}
                  <span
                    class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                  >
                    Coming Soon
                  </span>
                {/if}
              </div>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {tool.description}
              </p>

              <!-- Features -->
              <div class="space-y-2">
                {#each tool.features.slice(0, 3) as feature, i (feature + i)}
                  <div class="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <Check class="w-4 h-4 mr-2 {colors.text}" />
                    {feature}
                  </div>
                {/each}
              </div>
            </div>

            <!-- Hover Effect Overlay -->
            {#if !tool.comingSoon}
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              >
                <div class="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    class="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <div
                      class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-white/20 dark:border-gray-700/20"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-gray-900 dark:text-white font-semibold text-sm">
                          Open Tool
                        </span>
                        <div class="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                          <span class="text-xs font-medium">Launch</span>
                          <ArrowRight class="w-4 h-4" />
                        </div>
                      </div>
                      <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {tool.features.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          </button>
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
      <div class="flex justify-center space-x-4">
        <a
          href="https://github.com/FarizInk"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Follow on GitHub
        </a>
      </div>
    </div>
  </div>
</div>
