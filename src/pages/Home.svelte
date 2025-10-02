<script lang="ts">
  import photoOne from '../assets/me/1.jpg';
  import photoTwo from '../assets/me/2.jpg';
  import SpotifyActivity from '../components/SpotifyActivity.svelte';
  import ConnectWithMe from '../components/ConnectWithMe.svelte';

  let showPhoto = $state(false);
  let randPhoto = $state<string | null>(null);

  const togglePhoto = () => {
    const photos = [photoOne, photoTwo];
    if (!showPhoto) {
      randPhoto = photos[Math.floor(Math.random() * photos.length)];
    }
    showPhoto = !showPhoto;
  };
</script>

<main class="min-h-screen flex items-center justify-center px-4 py-8 relative">

  <!-- Main Content -->
  <div class="max-w-4xl w-full">
    <div class="text-left">
      <!-- Name with hidden photo toggle -->
      <div class="mb-3">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <button
            type="button"
            onclick={() => togglePhoto()}
            class="cursor-text text-left w-full bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 dark:text-transparent animate-gradient"
          >
            Nizar Alfarizi Akbar
          </button>
        </h1>
      </div>

      <!-- Nickname -->
      <div class="mb-6">
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          known as <span class="font-bold text-blue-600 dark:text-blue-400 italic">Fariz</span>
        </p>
      </div>

      <!-- Description -->
      <div class="mb-8">
        <p class="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Software engineer based in Surabaya, Indonesia. Specializing in backend development and high-quality web applications. Currently building <span class="italic text-blue-600 dark:text-blue-400">"gabut"</span> projects and crushing work tasks 🙂
        </p>
      </div>

      <!-- Connect Section -->
      <div class="mb-12">
        <ConnectWithMe />
      </div>

      <!-- Spotify Widget -->
      <div>
        <SpotifyActivity />
      </div>
    </div>
  </div>

  <!-- Floating Photo Card -->
  {#if showPhoto && randPhoto}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onclick={() => showPhoto = false}
    >
      <div
        class="relative group animate-in zoom-in duration-300"
        onclick={(e) => e.stopPropagation()}
      >
        <!-- Close button -->
        <button
          onclick={() => showPhoto = false}
          class="absolute hover:cursor-pointer -top-3 -right-3 z-10 w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>

        <!-- Photo card with natural ratio -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg">
          <img
            src={randPhoto}
            alt="Fariz"
            class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Subtle shadow effect -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  {/if}

  <!-- Subtle hint about the hidden feature -->
  {#if !showPhoto}
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
      <p class="text-xs text-gray-400 dark:text-gray-600 italic">Click my name for a surprise</p>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: calc(100vh - (40px + 56px));
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
</style>