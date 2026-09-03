import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Per-file preprocess wrapper.
 *
 * vitePreprocess runs Vite's CSS pipeline (PostCSS → @tailwindcss/postcss) on
 * every <style> block, which breaks components that ship dynamic Svelte style
 * expressions (e.g. boneyard-js's `<style>{`@keyframes …${uid}`}</style>` —
 * PostCSS can't parse the JS template literal and errors with "Unknown word").
 *
 * We skip style preprocessing entirely for anything in node_modules
 * (third-party components already ship valid CSS and don't need Tailwind's
 * @apply/postcss pipeline), while keeping full preprocessing for our own
 * src/ files.
 */
const preprocessor = vitePreprocess();

/** @type {import('svelte').PreprocessorGroup} */
const config = {
  name: 'conditional-vite-preprocess',
  script: preprocessor.script, // script preprocessing is language-gated and safe everywhere
  style: async (args) => {
    // Skip Vite/PostCSS style preprocessing for third-party components so
    // dynamic Svelte <style> expressions (boneyard-js) aren't run through PostCSS.
    if (args.filename?.includes('/node_modules/')) return;
    return preprocessor.style ? preprocessor.style(args) : undefined;
  }
};

/** @type {import('svelte').Config} */
const svelteConfig = {
  preprocess: config,
  compilerOptions: {
    // Enable Svelte 5 features
    runes: true
  }
};

export default svelteConfig;