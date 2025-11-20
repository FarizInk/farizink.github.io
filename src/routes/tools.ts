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
import PomodoroTimer from '../pages/tools/PomodoroTimer.svelte';

export const toolsRoutes = [
  {
    path: '/tools',
    component: Tools,
    title: 'Developer Tools',
    description:
      'Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.',
    keywords:
      'developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools',
    robots: 'index, follow'
  },
  { path: '/tools/json-parser', component: JsonParser, title: 'JSON Parser' },
  { path: '/tools/color-converter', component: ColorConverter, title: 'Color Converter' },
  { path: '/tools/url-encoder', component: UrlEncoder, title: 'URL Encoder/Decoder' },
  {
    path: '/tools/markdown-preview',
    component: MarkdownPreview,
    title: 'Markdown Preview'
  },
  {
    path: '/tools/base64-converter',
    component: Base64Converter,
    title: 'Base64 Converter'
  },
  {
    path: '/tools/password-generator',
    component: PasswordGenerator,
    title: 'Password Generator'
  },
  {
    path: '/tools/qr-code-generator',
    component: QRCodeGenerator,
    title: 'QR Code Generator'
  },
  {
    path: '/tools/text-case-converter',
    component: TextCaseConverter,
    title: 'Text Case Converter'
  },
  {
    path: '/tools/lorem-ipsum-generator',
    component: LoremIpsumGenerator,
    title: 'Lorem Ipsum Generator'
  },
  {
    path: '/tools/character-counter',
    component: CharacterCounter,
    title: 'Character Counter'
  },
  { path: '/tools/text-diff', component: TextDiff, title: 'Text Diff Tool' },
  { path: '/tools/url-parser', component: UrlParser, title: 'URL Parser/Analyzer' },
  {
    path: '/tools/css-minifier',
    component: CssMinifier,
    title: 'CSS Minifier/Beautifier'
  },
  {
    path: '/tools/js-minifier',
    component: JsMinifier,
    title: 'JavaScript Minifier/Beautifier'
  },
  {
    path: '/tools/html-encoder',
    component: HtmlEncoder,
    title: 'HTML Entity Encoder/Decoder'
  },
  {
    path: '/tools/slug-generator',
    component: SlugGenerator,
    title: 'URL Slug Generator'
  },
  {
    path: '/tools/color-palette',
    component: ColorPalette,
    title: 'Color Palette Generator'
  },
  {
    path: '/tools/gradient-generator',
    component: GradientGenerator,
    title: 'CSS Gradient Generator'
  },
  { path: '/tools/hash-generator', component: HashGenerator, title: 'Hash Generator' },
  { path: '/tools/jwt-decoder', component: JwtDecoder, title: 'JWT Decoder' },
  { path: '/tools/tip-calculator', component: TipCalculator, title: 'Tip Calculator' },
  {
    path: '/tools/timestamp-converter',
    component: TimestampConverter,
    title: 'Unix Timestamp Converter'
  },
  {
    path: '/tools/meta-tag-generator',
    component: MetaTagGenerator,
    title: 'Meta Tag Generator'
  },
  {
    path: '/tools/css-shadow-generator',
    component: CssShadowGenerator,
    title: 'CSS Shadow Generator'
  },
  {
    path: '/tools/unit-converter',
    component: UnitConverter,
    title: 'Unit Converter'
  },
  {
    path: '/tools/percentage-calculator',
    component: PercentageCalculator,
    title: 'Percentage Calculator'
  },
  {
    path: '/tools/bmi-calculator',
    component: BmiCalculator,
    title: 'BMI Calculator'
  },
  {
    path: '/tools/age-calculator',
    component: AgeCalculator,
    title: 'Age Calculator'
  },
  {
    path: '/tools/random-picker',
    component: RandomPicker,
    title: 'Random Picker'
  },
  {
    path: '/tools/cron-generator',
    component: CronGenerator,
    title: 'Cron Expression Generator'
  },
  {
    path: '/tools/hash-comparer',
    component: HashComparer,
    title: 'Hash Comparer'
  },
  {
    path: '/tools/ascii-art-generator',
    component: AsciiArtGenerator,
    title: 'ASCII Art Generator'
  },
  {
    path: '/tools/pomodoro-timer',
    component: PomodoroTimer,
    title: 'Pomodoro Timer'
  }
];
