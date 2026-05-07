import Tools from '../pages/Tools.svelte';
import { Wrench } from '@lucide/svelte';
import { getAllTools } from '../lib/toolsConfig';
import JsonParser from '../pages/tools/JsonParser.svelte';
import ColorConverter from '../pages/tools/ColorConverter.svelte';
import UrlEncoder from '../pages/tools/UrlEncoder.svelte';
import MarkdownPreview from '../pages/tools/MarkdownPreview.svelte';
import Base64Converter from '../pages/tools/Base64Converter.svelte';
import PasswordGenerator from '../pages/tools/PasswordGenerator.svelte';
import QRCodeGenerator from '../pages/tools/QRCodeGenerator.svelte';
import TextCaseConverter from '../pages/tools/TextCaseConverter.svelte';
import LoremIpsumGenerator from '../pages/tools/LoremIpsumGenerator.svelte';
import CharacterCounter from '../pages/tools/CharacterCounter.svelte';
import TextDiff from '../pages/tools/TextDiff.svelte';
import UrlParser from '../pages/tools/UrlParser.svelte';
import CssMinifier from '../pages/tools/CssMinifier.svelte';
import JsMinifier from '../pages/tools/JsMinifier.svelte';
import HtmlEncoder from '../pages/tools/HtmlEncoder.svelte';
import SlugGenerator from '../pages/tools/SlugGenerator.svelte';
import ColorPalette from '../pages/tools/ColorPalette.svelte';
import GradientGenerator from '../pages/tools/GradientGenerator.svelte';
import HashGenerator from '../pages/tools/HashGenerator.svelte';
import JwtDecoder from '../pages/tools/JwtDecoder.svelte';
import TipCalculator from '../pages/tools/TipCalculator.svelte';
import TimestampConverter from '../pages/tools/TimestampConverter.svelte';
import MetaTagGenerator from '../pages/tools/MetaTagGenerator.svelte';
import CssShadowGenerator from '../pages/tools/CssShadowGenerator.svelte';
import UnitConverter from '../pages/tools/UnitConverter.svelte';
import PercentageCalculator from '../pages/tools/PercentageCalculator.svelte';
import BmiCalculator from '../pages/tools/BmiCalculator.svelte';
import AgeCalculator from '../pages/tools/AgeCalculator.svelte';
import RandomPicker from '../pages/tools/RandomPicker.svelte';
import CronGenerator from '../pages/tools/CronGenerator.svelte';
import HashComparer from '../pages/tools/HashComparer.svelte';
import AsciiArtGenerator from '../pages/tools/AsciiArtGenerator.svelte';
import PomodoroTimer from '../pages/tools/PomodoroTimer.svelte';
import TempUpload from '../pages/tools/TempUpload.svelte';
import type { Route } from '../lib/router';

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
    component: Tools,
    title: 'Developer Tools',
    description:
      'Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.',
    keywords:
      'developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools',
    robots: 'index, follow',
    icon: Wrench
  },
  { path: '/tools/json-parser', component: JsonParser, title: 'JSON Parser', icon: getToolIconByPath('/tools/json-parser') },
  { path: '/tools/color-converter', component: ColorConverter, title: 'Color Converter', icon: getToolIconByPath('/tools/color-converter') },
  { path: '/tools/url-encoder', component: UrlEncoder, title: 'URL Encoder/Decoder', icon: getToolIconByPath('/tools/url-encoder') },
  {
    path: '/tools/markdown-preview',
    component: MarkdownPreview,
    title: 'Markdown Preview',
    icon: getToolIconByPath('/tools/markdown-preview')
  },
  {
    path: '/tools/base64-converter',
    component: Base64Converter,
    title: 'Base64 Converter',
    icon: getToolIconByPath('/tools/base64-converter')
  },
  {
    path: '/tools/password-generator',
    component: PasswordGenerator,
    title: 'Password Generator',
    icon: getToolIconByPath('/tools/password-generator')
  },
  {
    path: '/tools/qr-code-generator',
    component: QRCodeGenerator,
    title: 'QR Code Generator',
    icon: getToolIconByPath('/tools/qr-code-generator')
  },
  {
    path: '/tools/text-case-converter',
    component: TextCaseConverter,
    title: 'Text Case Converter',
    icon: getToolIconByPath('/tools/text-case-converter')
  },
  {
    path: '/tools/lorem-ipsum-generator',
    component: LoremIpsumGenerator,
    title: 'Lorem Ipsum Generator',
    icon: getToolIconByPath('/tools/lorem-ipsum-generator')
  },
  {
    path: '/tools/character-counter',
    component: CharacterCounter,
    title: 'Character Counter',
    icon: getToolIconByPath('/tools/character-counter')
  },
  { path: '/tools/text-diff', component: TextDiff, title: 'Text Diff Tool', icon: getToolIconByPath('/tools/text-diff') },
  { path: '/tools/url-parser', component: UrlParser, title: 'URL Parser/Analyzer', icon: getToolIconByPath('/tools/url-parser') },
  {
    path: '/tools/css-minifier',
    component: CssMinifier,
    title: 'CSS Minifier/Beautifier',
    icon: getToolIconByPath('/tools/css-minifier')
  },
  {
    path: '/tools/js-minifier',
    component: JsMinifier,
    title: 'JavaScript Minifier/Beautifier',
    icon: getToolIconByPath('/tools/js-minifier')
  },
  {
    path: '/tools/html-encoder',
    component: HtmlEncoder,
    title: 'HTML Entity Encoder/Decoder',
    icon: getToolIconByPath('/tools/html-encoder')
  },
  {
    path: '/tools/slug-generator',
    component: SlugGenerator,
    title: 'URL Slug Generator',
    icon: getToolIconByPath('/tools/slug-generator')
  },
  {
    path: '/tools/color-palette',
    component: ColorPalette,
    title: 'Color Palette Generator',
    icon: getToolIconByPath('/tools/color-palette')
  },
  {
    path: '/tools/gradient-generator',
    component: GradientGenerator,
    title: 'CSS Gradient Generator',
    icon: getToolIconByPath('/tools/gradient-generator')
  },
  { path: '/tools/hash-generator', component: HashGenerator, title: 'Hash Generator', icon: getToolIconByPath('/tools/hash-generator') },
  { path: '/tools/jwt-decoder', component: JwtDecoder, title: 'JWT Decoder', icon: getToolIconByPath('/tools/jwt-decoder') },
  { path: '/tools/tip-calculator', component: TipCalculator, title: 'Tip Calculator', icon: getToolIconByPath('/tools/tip-calculator') },
  {
    path: '/tools/timestamp-converter',
    component: TimestampConverter,
    title: 'Unix Timestamp Converter',
    icon: getToolIconByPath('/tools/timestamp-converter')
  },
  {
    path: '/tools/meta-tag-generator',
    component: MetaTagGenerator,
    title: 'Meta Tag Generator',
    icon: getToolIconByPath('/tools/meta-tag-generator')
  },
  {
    path: '/tools/css-shadow-generator',
    component: CssShadowGenerator,
    title: 'CSS Shadow Generator',
    icon: getToolIconByPath('/tools/css-shadow-generator')
  },
  { path: '/tools/unit-converter', component: UnitConverter, title: 'Unit Converter', icon: getToolIconByPath('/tools/unit-converter') },
  {
    path: '/tools/percentage-calculator',
    component: PercentageCalculator,
    title: 'Percentage Calculator',
    icon: getToolIconByPath('/tools/percentage-calculator')
  },
  {
    path: '/tools/bmi-calculator',
    component: BmiCalculator,
    title: 'BMI Calculator',
    icon: getToolIconByPath('/tools/bmi-calculator')
  },
  {
    path: '/tools/age-calculator',
    component: AgeCalculator,
    title: 'Age Calculator',
    icon: getToolIconByPath('/tools/age-calculator')
  },
  {
    path: '/tools/random-picker',
    component: RandomPicker,
    title: 'Random Picker',
    icon: getToolIconByPath('/tools/random-picker')
  },
  {
    path: '/tools/cron-generator',
    component: CronGenerator,
    title: 'Cron Expression Generator',
    icon: getToolIconByPath('/tools/cron-generator')
  },
  {
    path: '/tools/hash-comparer',
    component: HashComparer,
    title: 'Hash Comparer',
    icon: getToolIconByPath('/tools/hash-comparer')
  },
  {
    path: '/tools/ascii-art-generator',
    component: AsciiArtGenerator,
    title: 'ASCII Art Generator',
    icon: getToolIconByPath('/tools/ascii-art-generator')
  },
  {
    path: '/tools/pomodoro-timer',
    component: PomodoroTimer,
    title: 'Pomodoro Timer',
    icon: getToolIconByPath('/tools/pomodoro-timer')
  },
  {
    path: '/tools/temp-upload',
    component: TempUpload,
    title: 'Temp File Upload',
    icon: getToolIconByPath('/tools/temp-upload')
  }
];
