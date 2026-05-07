<script lang="ts">
  import photoOne from '../assets/me/1.jpg';
  import photoTwo from '../assets/me/2.jpg';
  import SpotifyActivity from '../components/SpotifyActivity.svelte';
  import ConnectWithMe from '../components/ConnectWithMe.svelte';

  let showPhoto = $state(false);
  let randPhoto = $state<string | null>(null);
  let imageLoading = $state(false);

  const togglePhoto = () => {
    const photos = [photoOne, photoTwo];
    if (!showPhoto) {
      // Open modal with loading state first
      showPhoto = true;
      imageLoading = true;
      randPhoto = null; // Reset previous photo so skeleton shows properly

      // Preload image to track actual network loading
      const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
      const img = new Image();

      img.onload = () => {
        // Image loaded successfully
        randPhoto = randomPhoto;
        imageLoading = false;
      };

      img.onerror = () => {
        // Image failed to load
        console.error('Failed to load image');
        randPhoto = randomPhoto; // Still show it even if failed
        imageLoading = false;
      };

      // Start loading the image
      img.src = randomPhoto;

      // Check if image is already cached
      if (img.complete) {
        randPhoto = randomPhoto;
        imageLoading = false;
      }
    } else {
      // Close modal
      showPhoto = false;
      randPhoto = null;
      imageLoading = false;
    }
  };
</script>

<main class="min-h-screen flex items-center justify-center px-4 py-8 relative">
  <!-- Main Content -->
  <div class="max-w-4xl w-full">
    <div class="text-left">
      <!-- Name with gradient effect -->
      <div class="mb-3">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-black via-yellow-700 to-black bg-clip-text text-transparent dark:from-white dark:via-primary-500 dark:to-white dark:text-transparent bg-[length:200%_auto] animate-gradient"
        >
          Nizar Alfarizi Akbar
        </h1>
      </div>

      <!-- Nickname -->
      <div class="mb-6">
        <p class="text-lg md:text-xl text-black dark:text-gray-400">
          known as
          <button
            type="button"
            onclick={() => togglePhoto()}
            class="font-bold text-warning-600 dark:text-primary-400 italic"
          >
            Fariz
          </button>
        </p>
      </div>

      <!-- Description -->
      <div class="mb-8">
        <p class="text-black dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Software engineer based in Sidoarjo, Indonesia. Specializing in backend development and
          high-quality web applications. Currently building <span
            class="italic text-warning-600 dark:text-primary-400">"gabut"</span
          > projects and crushing work tasks 🙂
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
  {#if showPhoto}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onclick={() => (showPhoto = false)}
      onkeydown={e => e.key === 'Escape' && (showPhoto = false)}
      role="dialog"
      aria-modal="true"
      aria-label="Photo modal"
      tabindex="-1"
    >
      <div class="relative group animate-scale-in" role="document" tabindex="-1">
        <!-- Close button -->
        <button
          onclick={() => (showPhoto = false)}
          class="btn-icon absolute hover:cursor-pointer -top-3 -right-3 z-10 w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-110"
          aria-label="Close photo modal"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </button>

        <!-- Photo card with natural ratio -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg relative min-w-[280px] sm:min-w-[320px]"
        >
          {#if imageLoading}
            <div
              class="aspect-[3/4] w-full min-h-[300px] sm:min-h-[400px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"
            >
              <div class="h-full w-full relative overflow-hidden">
                <div
                  class="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-600/50"
                ></div>
                <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    class="h-24 w-24 rounded-full bg-gray-300/50 dark:bg-gray-600/50 animate-pulse"
                  ></div>
                </div>
              </div>
            </div>
          {/if}
          {#if randPhoto}
            <img
              src={randPhoto}
              alt="Fariz"
              class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 {imageLoading
                ? 'opacity-0'
                : 'opacity-100'}"
            />
          {/if}
        </div>

        <!-- Subtle shadow effect -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none"
        ></div>
      </div>
    </div>
  {/if}
</main>
