import {
  FileJson,
  Type,
  FileText,
  Calculator,
  GitCompare,
  Link2,
  Hash,
  QrCode,
  Palette,
  Calendar,
  Lock,
  RefreshCw,
  Zap
} from '@lucide/svelte';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  features: string[];
  comingSoon: boolean;
}

export interface Category {
  name: string;
  description: string;
  tools: Tool[];
}

export const toolsByCategory: Category[] = [
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
        icon: Link2,
        features: ['Protocol extraction', 'Domain parsing', 'Query parameters', 'Hash fragments'],
        comingSoon: false
      },
      {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate various hash values from text',
        icon: Hash,
        features: ['MD5', 'SHA1', 'SHA256', 'SHA512'],
        comingSoon: false
      },
      {
        id: 'base64-converter',
        name: 'Base64 Converter',
        description: 'Encode and decode Base64 strings',
        icon: Hash,
        features: ['Text encoding', 'File encoding', 'Batch processing', 'Download support'],
        comingSoon: false
      }
    ]
  },
  {
    name: 'Generators & Converters',
    description: 'Create and transform various content',
    tools: [
      {
        id: 'qr-code-generator',
        name: 'QR Code Generator',
        description: 'Generate custom QR codes for URLs, text, or any data',
        icon: QrCode,
        features: ['Custom colors', 'Error correction levels', 'Logo upload', 'Multiple formats'],
        comingSoon: false
      },
      {
        id: 'color-converter',
        name: 'Color Converter',
        description: 'Convert between different color formats',
        icon: Palette,
        features: ['HEX', 'RGB', 'HSL', 'HSV', 'CMYK'],
        comingSoon: false
      },
      {
        id: 'gradient-generator',
        name: 'CSS Gradient Generator',
        description: 'Create beautiful CSS gradients',
        icon: Palette,
        features: ['Linear gradients', 'Radial gradients', 'Color stops', 'CSS output'],
        comingSoon: false
      },
      {
        id: 'color-palette',
        name: 'Color Palette Generator',
        description: 'Generate color palettes for your projects',
        icon: Palette,
        features: ['Complementary colors', 'Analogous colors', 'Export options'],
        comingSoon: false
      },
      {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Generate secure and random passwords',
        icon: Lock,
        features: ['Custom length', 'Character options', 'Strength indicator', 'History'],
        comingSoon: false
      },
      {
        id: 'slug-generator',
        name: 'Slug Generator',
        description: 'Generate URL-friendly slugs from text',
        icon: Link2,
        features: ['Multiple formats', 'Custom separators', 'Lowercase options'],
        comingSoon: false
      },
      {
        id: 'timestamp-converter',
        name: 'Timestamp Converter',
        description: 'Convert between different timestamp formats',
        icon: RefreshCw,
        features: ['Unix timestamp', 'ISO format', 'Human readable', 'Multiple timezones'],
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
        description: 'Encode and decode URLs for safe transmission',
        icon: Link2,
        features: ['URL encoding', 'URL decoding', 'Batch processing', 'Copy to clipboard'],
        comingSoon: false
      },
      {
        id: 'html-encoder',
        name: 'HTML Encoder/Decoder',
        description: 'Encode and decode HTML entities',
        icon: FileText,
        features: ['HTML encoding', 'HTML decoding', 'Character escaping', 'Safe for XSS'],
        comingSoon: false
      },
      {
        id: 'css-minifier',
        name: 'CSS Minifier',
        description: 'Minify and optimize CSS code',
        icon: FileText,
        features: ['Remove whitespace', 'Optimize properties', 'Compress output', 'Before/after comparison'],
        comingSoon: false
      },
      {
        id: 'js-minifier',
        name: 'JavaScript Minifier',
        description: 'Minify and optimize JavaScript code',
        icon: FileText,
        features: ['Remove comments', 'Variable renaming', 'Dead code elimination', 'Compression'],
        comingSoon: false
      },
      {
        id: 'css-shadow-generator',
        name: 'CSS Shadow Generator',
        description: 'Generate CSS box shadows with visual preview',
        icon: Palette,
        features: ['Multiple shadows', 'Inset/outset', 'Color picker', 'CSS output'],
        comingSoon: false
      },
      {
        id: 'meta-tag-generator',
        name: 'Meta Tag Generator',
        description: 'Generate SEO-friendly meta tags',
        icon: FileText,
        features: ['Open Graph', 'Twitter Cards', 'JSON-LD structured data', 'Preview'],
        comingSoon: false
      }
    ]
  },
  {
    name: 'Utilities & Calculators',
    description: 'Helpful tools for everyday tasks',
    tools: [
      {
        id: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate exact age and time between dates',
        icon: Calendar,
        features: ['Exact age calculation', 'Birthday countdown', 'Zodiac signs', 'Fun facts'],
        comingSoon: false
      },
      {
        id: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Calculate Body Mass Index and health metrics',
        icon: Calculator,
        features: ['BMI calculation', 'Weight categories', 'Health tips', 'Metric/imperial units'],
        comingSoon: false
      },
      {
        id: 'percentage-calculator',
        name: 'Percentage Calculator',
        description: 'Calculate percentages and related values',
        icon: Calculator,
        features: ['Percentage of', 'Percentage increase/decrease', 'Reverse percentage', 'Step-by-step'],
        comingSoon: false
      },
      {
        id: 'tip-calculator',
        name: 'Tip Calculator',
        description: 'Calculate tips and split bills',
        icon: Calculator,
        features: ['Tip calculation', 'Bill splitting', 'Tax inclusion', 'Custom percentages'],
        comingSoon: false
      },
      {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert between different units of measurement',
        icon: RefreshCw,
        features: ['Length', 'Weight', 'Temperature', 'Area', 'Volume'],
        comingSoon: false
      },
      {
        id: 'random-picker',
        name: 'Random Picker',
        description: 'Randomly pick items from a list',
        icon: Zap,
        features: ['Fair randomization', 'Multiple selections', 'Import/export lists', 'History'],
        comingSoon: false
      },
      {
        id: 'hash-comparer',
        name: 'Hash Comparer',
        description: 'Compare hash values to verify integrity',
        icon: Hash,
        features: ['Multiple hash types', 'File support', 'Integrity checking', 'Bulk comparison'],
        comingSoon: false
      },
      {
        id: 'jwt-decoder',
        name: 'JWT Decoder',
        description: 'Decode and validate JWT tokens',
        icon: Lock,
        features: ['Header parsing', 'Payload decoding', 'Signature validation', 'Pretty printing'],
        comingSoon: false
      },
      {
        id: 'cron-generator',
        name: 'Cron Expression Generator',
        description: 'Generate and validate cron expressions',
        icon: RefreshCw,
        features: ['Visual builder', 'Next run times', 'Expression validation', 'Common presets'],
        comingSoon: false
      },
      {
        id: 'ascii-art-generator',
        name: 'ASCII Art Generator',
        description: 'Create ASCII art from text and images',
        icon: FileText,
        features: ['Text to ASCII', 'Image to ASCII', 'Multiple fonts', 'Custom styles'],
        comingSoon: false
      },
      {
        id: 'markdown-preview',
        name: 'Markdown Preview',
        description: 'Preview and export Markdown documents',
        icon: FileText,
        features: ['Live preview', 'Export options', 'Syntax highlighting', 'Custom themes'],
        comingSoon: false
      }
    ]
  }
];

export const getAllTools = (): Tool[] => {
  return toolsByCategory.flatMap(category => category.tools);
};

export const getToolById = (id: string): Tool | undefined => {
  return getAllTools().find(tool => tool.id === id);
};

export const getToolsByCategory = (categoryName: string): Tool[] => {
  const category = toolsByCategory.find(cat => cat.name === categoryName);
  return category?.tools || [];
};

export const searchTools = (query: string): Tool[] => {
  if (!query) return getAllTools();

  const lowercaseQuery = query.toLowerCase();
  return getAllTools().filter(tool =>
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};