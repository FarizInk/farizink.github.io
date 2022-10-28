<script>
  import svelteLogo from "../assets/svelte.svg";
  import Counter from "../lib/Counter.svelte";
</script>

<div id="thanks-container">
  <div class="thanks-content">
    <div class="flex gap-2 justify-center">
      <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="logo" alt="Vite Logo" />
      </a>
      <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
        <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
      </a>
    </div>
    <h1>Vite + Svelte</h1>
  
    <div class="card">
      <Counter />
    </div>
  
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noopener noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
    </p>
  
    <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
  </div>
</div>

<style>

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  #thanks-container {
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  .card {
    padding: 2em;
  }

  .thanks-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  @media (prefers-color-scheme: light) {
    #thanks-container {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
