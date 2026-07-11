import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', '@lucide/svelte'],
          router: ['./src/lib/router.ts', './src/lib/Router.svelte'],
          notifications: ['svelte-sonner']
        }
      }
    }
  },
  // Enable PWA build optimizations
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version || '1.0.0')
  },
  // Handle client-side routing for SPA
  preview: {
    port: 3000,
    host: true
  },
  server: {
    port: 3000,
    host: true,
    // Allow access via Tailscale MagicDNS hostnames (e.g. http://mayo:3000).
    // Dev-only: has no effect on the static production build.
    allowedHosts: true
  }
});
