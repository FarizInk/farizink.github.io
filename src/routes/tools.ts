import Tools from '../pages/Tools.svelte';
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

export const toolsRoutes = [
  {
    path: '/tools',
    component: Tools,
    title: 'Developer Tools - Fariz',
    description:
      'Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.',
    keywords:
      'developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools',
    robots: 'index, follow'
  },
  { path: '/tools/json-parser', component: JsonParser, title: 'JSON Parser - Fariz' },
  { path: '/tools/color-converter', component: ColorConverter, title: 'Color Converter - Fariz' },
  { path: '/tools/url-encoder', component: UrlEncoder, title: 'URL Encoder/Decoder - Fariz' },
  {
    path: '/tools/markdown-preview',
    component: MarkdownPreview,
    title: 'Markdown Preview - Fariz'
  },
  {
    path: '/tools/base64-converter',
    component: Base64Converter,
    title: 'Base64 Converter - Fariz'
  },
  {
    path: '/tools/password-generator',
    component: PasswordGenerator,
    title: 'Password Generator - Fariz'
  },
  {
    path: '/tools/qr-code-generator',
    component: QRCodeGenerator,
    title: 'QR Code Generator - Fariz'
  },
  {
    path: '/tools/text-case-converter',
    component: TextCaseConverter,
    title: 'Text Case Converter - Fariz'
  },
  {
    path: '/tools/lorem-ipsum-generator',
    component: LoremIpsumGenerator,
    title: 'Lorem Ipsum Generator - Fariz'
  },
  {
    path: '/tools/character-counter',
    component: CharacterCounter,
    title: 'Character Counter - Fariz'
  },
  { path: '/tools/text-diff', component: TextDiff, title: 'Text Diff Tool - Fariz' },
  { path: '/tools/url-parser', component: UrlParser, title: 'URL Parser/Analyzer - Fariz' },
  {
    path: '/tools/css-minifier',
    component: CssMinifier,
    title: 'CSS Minifier/Beautifier - Fariz'
  },
  {
    path: '/tools/js-minifier',
    component: JsMinifier,
    title: 'JavaScript Minifier/Beautifier - Fariz'
  },
  {
    path: '/tools/html-encoder',
    component: HtmlEncoder,
    title: 'HTML Entity Encoder/Decoder - Fariz'
  },
  {
    path: '/tools/slug-generator',
    component: SlugGenerator,
    title: 'URL Slug Generator - Fariz'
  },
  {
    path: '/tools/color-palette',
    component: ColorPalette,
    title: 'Color Palette Generator - Fariz'
  },
  {
    path: '/tools/gradient-generator',
    component: GradientGenerator,
    title: 'CSS Gradient Generator - Fariz'
  },
  { path: '/tools/hash-generator', component: HashGenerator, title: 'Hash Generator - Fariz' },
  { path: '/tools/jwt-decoder', component: JwtDecoder, title: 'JWT Decoder - Fariz' },
  { path: '/tools/tip-calculator', component: TipCalculator, title: 'Tip Calculator - Fariz' },
  {
    path: '/tools/timestamp-converter',
    component: TimestampConverter,
    title: 'Unix Timestamp Converter - Fariz'
  },
  {
    path: '/tools/meta-tag-generator',
    component: MetaTagGenerator,
    title: 'Meta Tag Generator - Fariz'
  },
  {
    path: '/tools/css-shadow-generator',
    component: CssShadowGenerator,
    title: 'CSS Shadow Generator - Fariz'
  },
  {
    path: '/tools/unit-converter',
    component: UnitConverter,
    title: 'Unit Converter - Fariz'
  },
  {
    path: '/tools/percentage-calculator',
    component: PercentageCalculator,
    title: 'Percentage Calculator - Fariz'
  },
  {
    path: '/tools/bmi-calculator',
    component: BmiCalculator,
    title: 'BMI Calculator - Fariz'
  },
  {
    path: '/tools/age-calculator',
    component: AgeCalculator,
    title: 'Age Calculator - Fariz'
  },
  {
    path: '/tools/random-picker',
    component: RandomPicker,
    title: 'Random Picker - Fariz'
  },
  {
    path: '/tools/cron-generator',
    component: CronGenerator,
    title: 'Cron Expression Generator - Fariz'
  },
  {
    path: '/tools/hash-comparer',
    component: HashComparer,
    title: 'Hash Comparer - Fariz'
  },
  {
    path: '/tools/ascii-art-generator',
    component: AsciiArtGenerator,
    title: 'ASCII Art Generator - Fariz'
  }
];
