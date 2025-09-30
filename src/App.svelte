<script lang="ts">
  import { onMount } from "svelte";
  import { createRouter } from "./lib/router.js";
  import Router from "./lib/Router.svelte";
  import Navigation from "./components/Navigation.svelte";
  import PixelBackground from "./components/PixelBackground.svelte";
  import LoveIcon from "./components/icons/LoveIcon.svelte";
  import Thanks from "./components/Thanks.svelte";
  import Modal from "./components/Modal.svelte";

  // Import pages
  import Home from "./pages/Home.svelte";
  import Project from "./pages/Project.svelte";
  import Tools from "./pages/Tools.svelte";
  import JsonParser from "./pages/tools/JsonParser.svelte";
  import ColorConverter from "./pages/tools/ColorConverter.svelte";
  import UrlEncoder from "./pages/tools/UrlEncoder.svelte";
  import MarkdownPreview from "./pages/tools/MarkdownPreview.svelte";
  import Base64Converter from "./pages/tools/Base64Converter.svelte";
  import PasswordGenerator from "./pages/tools/PasswordGenerator.svelte";
  import QRCodeGenerator from "./pages/tools/QRCodeGenerator.svelte";
  import TextCaseConverter from "./pages/tools/TextCaseConverter.svelte";
  import LoremIpsumGenerator from "./pages/tools/LoremIpsumGenerator.svelte";
  import CharacterCounter from "./pages/tools/CharacterCounter.svelte";
  import TextDiff from "./pages/tools/TextDiff.svelte";
  import UrlParser from "./pages/tools/UrlParser.svelte";
  import CssMinifier from "./pages/tools/CssMinifier.svelte";
  import JsMinifier from "./pages/tools/JsMinifier.svelte";
  import HtmlEncoder from "./pages/tools/HtmlEncoder.svelte";
  import SlugGenerator from "./pages/tools/SlugGenerator.svelte";
  import ColorPalette from "./pages/tools/ColorPalette.svelte";
  import GradientGenerator from "./pages/tools/GradientGenerator.svelte";
  import HashGenerator from "./pages/tools/HashGenerator.svelte";
  import JwtDecoder from "./pages/tools/JwtDecoder.svelte";
  import TipCalculator from "./pages/tools/TipCalculator.svelte";
  import TimestampConverter from "./pages/tools/TimestampConverter.svelte";

  // Define routes
  const routes = [
    { path: "/", component: Home, title: "Fariz - Software Engineer" },
    { path: "/projects", component: Project, title: "Project - Fariz" },
    { path: "/tools", component: Tools, title: "Tools - Fariz" },
    { path: "/tools/json-parser", component: JsonParser, title: "JSON Parser - Fariz" },
    { path: "/tools/color-converter", component: ColorConverter, title: "Color Converter - Fariz" },
    { path: "/tools/url-encoder", component: UrlEncoder, title: "URL Encoder/Decoder - Fariz" },
    { path: "/tools/markdown-preview", component: MarkdownPreview, title: "Markdown Preview - Fariz" },
    { path: "/tools/base64-converter", component: Base64Converter, title: "Base64 Converter - Fariz" },
    { path: "/tools/password-generator", component: PasswordGenerator, title: "Password Generator - Fariz" },
    { path: "/tools/qr-code-generator", component: QRCodeGenerator, title: "QR Code Generator - Fariz" },
    { path: "/tools/text-case-converter", component: TextCaseConverter, title: "Text Case Converter - Fariz" },
    { path: "/tools/lorem-ipsum-generator", component: LoremIpsumGenerator, title: "Lorem Ipsum Generator - Fariz" },
    { path: "/tools/character-counter", component: CharacterCounter, title: "Character Counter - Fariz" },
    { path: "/tools/text-diff", component: TextDiff, title: "Text Diff Tool - Fariz" },
    { path: "/tools/url-parser", component: UrlParser, title: "URL Parser/Analyzer - Fariz" },
    { path: "/tools/css-minifier", component: CssMinifier, title: "CSS Minifier/Beautifier - Fariz" },
    { path: "/tools/js-minifier", component: JsMinifier, title: "JavaScript Minifier/Beautifier - Fariz" },
    { path: "/tools/html-encoder", component: HtmlEncoder, title: "HTML Entity Encoder/Decoder - Fariz" },
    { path: "/tools/slug-generator", component: SlugGenerator, title: "URL Slug Generator - Fariz" },
    { path: "/tools/color-palette", component: ColorPalette, title: "Color Palette Generator - Fariz" },
    { path: "/tools/gradient-generator", component: GradientGenerator, title: "CSS Gradient Generator - Fariz" },
    { path: "/tools/hash-generator", component: HashGenerator, title: "Hash Generator - Fariz" },
    { path: "/tools/jwt-decoder", component: JwtDecoder, title: "JWT Decoder - Fariz" },
    { path: "/tools/tip-calculator", component: TipCalculator, title: "Tip Calculator - Fariz" },
    { path: "/tools/timestamp-converter", component: TimestampConverter, title: "Unix Timestamp Converter - Fariz" },
  ];

  let showThanksModal = $state(false);

  const openThanksModal = () => {
    showThanksModal = true;
  };

  const closeThanksModal = () => {
    showThanksModal = false;
  };

  onMount(() => {
    createRouter(routes);
  });
</script>

<div class="min-h-screen flex flex-col justify-between relative">
  <PixelBackground />
  <Navigation />
  <div class="flex-1 pt-[56px]">
    <div class="container mx-auto">
      <Router />
    </div>
  </div>

  <footer
    class="flex justify-center items-center text-black dark:text-white py-4"
  >
    Made with <button
      type="button"
      onclick={openThanksModal}
      class="hover:cursor-pointer"
    >
      <LoveIcon class="w-5 h-5 mx-1 text-rose-600" />
    </button> in Surabaya.
  </footer>
</div>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  {#snippet children()}
    <Thanks />
  {/snippet}
</Modal>
