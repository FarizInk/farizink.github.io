<script lang="ts">
  import svelteLogo from '../assets/svelte.svg';
  import Counter from '../lib/Counter.svelte';
</script>

<div class="flex flex-col items-center gap-6 p-4 text-center text-ink">
  <div class="flex justify-center gap-2">
    <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="rounded-lg p-4 hover:bg-sunken">
      <img src="/vite.svg" class="h-16" alt="Vite logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="rounded-lg p-4 hover:bg-sunken">
      <img src={svelteLogo} class="h-16" alt="Svelte logo" />
    </a>
  </div>
  <h1 class="text-display">Vite + Svelte</h1>

  <Counter />

  <p class="text-body text-ink-muted">
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noopener noreferrer"
      class="text-accent-text underline underline-offset-2">SvelteKit</a
    >, the official Svelte app framework powered by Vite.
  </p>

  <p class="text-label text-ink-muted">Click the Vite and Svelte logos to learn more</p>
</div>
