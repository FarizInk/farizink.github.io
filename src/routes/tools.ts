import { Wrench } from '@lucide/svelte';
import type { Route } from '../lib/router';
import { getAllTools } from '../lib/toolsConfig';

// Helper function to get tool icon by path
function getToolIconByPath(path: string) {
  // Extract tool ID from path (e.g., /tools/json-parser -> json-parser)
  const toolId = path.replace('/tools/', '').replace('/', '-');
  const tool = getAllTools().find(t => t.id === toolId);
  return tool?.icon || null;
}

export const toolsRoutes: Route[] = [
  {
    path: '/tools',
    load: () => import('../pages/Tools.svelte'),
    title: 'Developer Tools',
    description:
      'Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.',
    keywords:
      'developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools',
    robots: 'index, follow',
    icon: Wrench
  },
  { path: '/tools/json-parser', load: () => import('../pages/tools/JsonParser.svelte'), title: 'JSON Parser', icon: getToolIconByPath('/tools/json-parser') },
  { path: '/tools/color-converter', load: () => import('../pages/tools/ColorConverter.svelte'), title: 'Color Converter', icon: getToolIconByPath('/tools/color-converter') },
  { path: '/tools/url-encoder', load: () => import('../pages/tools/UrlEncoder.svelte'), title: 'URL Encoder/Decoder', icon: getToolIconByPath('/tools/url-encoder') },
  {
    path: '/tools/markdown-preview',
    load: () => import('../pages/tools/MarkdownPreview.svelte'),
    title: 'Markdown Preview',
    icon: getToolIconByPath('/tools/markdown-preview')
  },
  {
    path: '/tools/base64-converter',
    load: () => import('../pages/tools/Base64Converter.svelte'),
    title: 'Base64 Converter',
    icon: getToolIconByPath('/tools/base64-converter')
  },
  {
    path: '/tools/password-generator',
    load: () => import('../pages/tools/PasswordGenerator.svelte'),
    title: 'Password Generator',
    icon: getToolIconByPath('/tools/password-generator')
  },
  {
    path: '/tools/qr-code-generator',
    load: () => import('../pages/tools/QRCodeGenerator.svelte'),
    title: 'QR Code Generator',
    icon: getToolIconByPath('/tools/qr-code-generator')
  },
  {
    path: '/tools/text-case-converter',
    load: () => import('../pages/tools/TextCaseConverter.svelte'),
    title: 'Text Case Converter',
    icon: getToolIconByPath('/tools/text-case-converter')
  },
  {
    path: '/tools/lorem-ipsum-generator',
    load: () => import('../pages/tools/LoremIpsumGenerator.svelte'),
    title: 'Lorem Ipsum Generator',
    icon: getToolIconByPath('/tools/lorem-ipsum-generator')
  },
  {
    path: '/tools/character-counter',
    load: () => import('../pages/tools/CharacterCounter.svelte'),
    title: 'Character Counter',
    icon: getToolIconByPath('/tools/character-counter')
  },
  { path: '/tools/text-diff', load: () => import('../pages/tools/TextDiff.svelte'), title: 'Text Diff Tool', icon: getToolIconByPath('/tools/text-diff') },
  { path: '/tools/url-parser', load: () => import('../pages/tools/UrlParser.svelte'), title: 'URL Parser/Analyzer', icon: getToolIconByPath('/tools/url-parser') },
  {
    path: '/tools/css-minifier',
    load: () => import('../pages/tools/CssMinifier.svelte'),
    title: 'CSS Minifier/Beautifier',
    icon: getToolIconByPath('/tools/css-minifier')
  },
  {
    path: '/tools/js-minifier',
    load: () => import('../pages/tools/JsMinifier.svelte'),
    title: 'JavaScript Minifier/Beautifier',
    icon: getToolIconByPath('/tools/js-minifier')
  },
  {
    path: '/tools/html-encoder',
    load: () => import('../pages/tools/HtmlEncoder.svelte'),
    title: 'HTML Entity Encoder/Decoder',
    icon: getToolIconByPath('/tools/html-encoder')
  },
  {
    path: '/tools/slug-generator',
    load: () => import('../pages/tools/SlugGenerator.svelte'),
    title: 'URL Slug Generator',
    icon: getToolIconByPath('/tools/slug-generator')
  },
  {
    path: '/tools/color-palette',
    load: () => import('../pages/tools/ColorPalette.svelte'),
    title: 'Color Palette Generator',
    icon: getToolIconByPath('/tools/color-palette')
  },
  {
    path: '/tools/gradient-generator',
    load: () => import('../pages/tools/GradientGenerator.svelte'),
    title: 'CSS Gradient Generator',
    icon: getToolIconByPath('/tools/gradient-generator')
  },
  { path: '/tools/hash-generator', load: () => import('../pages/tools/HashGenerator.svelte'), title: 'Hash Generator', icon: getToolIconByPath('/tools/hash-generator') },
  { path: '/tools/jwt-decoder', load: () => import('../pages/tools/JwtDecoder.svelte'), title: 'JWT Decoder', icon: getToolIconByPath('/tools/jwt-decoder') },
  { path: '/tools/tip-calculator', load: () => import('../pages/tools/TipCalculator.svelte'), title: 'Tip Calculator', icon: getToolIconByPath('/tools/tip-calculator') },
  {
    path: '/tools/timestamp-converter',
    load: () => import('../pages/tools/TimestampConverter.svelte'),
    title: 'Unix Timestamp Converter',
    icon: getToolIconByPath('/tools/timestamp-converter')
  },
  {
    path: '/tools/meta-tag-generator',
    load: () => import('../pages/tools/MetaTagGenerator.svelte'),
    title: 'Meta Tag Generator',
    icon: getToolIconByPath('/tools/meta-tag-generator')
  },
  {
    path: '/tools/css-shadow-generator',
    load: () => import('../pages/tools/CssShadowGenerator.svelte'),
    title: 'CSS Shadow Generator',
    icon: getToolIconByPath('/tools/css-shadow-generator')
  },
  { path: '/tools/unit-converter', load: () => import('../pages/tools/UnitConverter.svelte'), title: 'Unit Converter', icon: getToolIconByPath('/tools/unit-converter') },
  {
    path: '/tools/percentage-calculator',
    load: () => import('../pages/tools/PercentageCalculator.svelte'),
    title: 'Percentage Calculator',
    icon: getToolIconByPath('/tools/percentage-calculator')
  },
  {
    path: '/tools/bmi-calculator',
    load: () => import('../pages/tools/BmiCalculator.svelte'),
    title: 'BMI Calculator',
    icon: getToolIconByPath('/tools/bmi-calculator')
  },
  {
    path: '/tools/age-calculator',
    load: () => import('../pages/tools/AgeCalculator.svelte'),
    title: 'Age Calculator',
    icon: getToolIconByPath('/tools/age-calculator')
  },
  {
    path: '/tools/random-picker',
    load: () => import('../pages/tools/RandomPicker.svelte'),
    title: 'Random Picker',
    icon: getToolIconByPath('/tools/random-picker')
  },
  {
    path: '/tools/cron-generator',
    load: () => import('../pages/tools/CronGenerator.svelte'),
    title: 'Cron Expression Generator',
    icon: getToolIconByPath('/tools/cron-generator')
  },
  {
    path: '/tools/hash-comparer',
    load: () => import('../pages/tools/HashComparer.svelte'),
    title: 'Hash Comparer',
    icon: getToolIconByPath('/tools/hash-comparer')
  },
  {
    path: '/tools/ascii-art-generator',
    load: () => import('../pages/tools/AsciiArtGenerator.svelte'),
    title: 'ASCII Art Generator',
    icon: getToolIconByPath('/tools/ascii-art-generator')
  },
  {
    path: '/tools/pomodoro-timer',
    load: () => import('../pages/tools/PomodoroTimer.svelte'),
    title: 'Pomodoro Timer',
    icon: getToolIconByPath('/tools/pomodoro-timer')
  },
  {
    path: '/tools/temp-upload',
    load: () => import('../pages/tools/TempUpload.svelte'),
    title: 'Temp File Upload',
    icon: getToolIconByPath('/tools/temp-upload')
  }
];
