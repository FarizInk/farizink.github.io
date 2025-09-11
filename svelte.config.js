import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('svelte').Config} */
const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    // Enable Svelte 5 features
    runes: true
  }
};

export default config;
