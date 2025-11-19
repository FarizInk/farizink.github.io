<script lang="ts">
  import MailIcon from './icons/MailIcon.svelte';
  import LinkedinIcon from './icons/LinkedinIcon.svelte';
  import GithubIcon from './icons/GithubIcon.svelte';
  import DiscordIcon from './icons/DiscordIcon.svelte';
  import SpotifyIcon from './icons/SpotifyIcon.svelte';
  import { toast } from 'svelte-sonner';

  const copyEmail = () => {
    navigator.clipboard.writeText('me@fariz.dev');
    toast.success('Email copied to clipboard!');
  };
</script>

<div class="flex flex-col sm:flex-row items-center gap-4 relative">
  <!-- Email Contact -->
  <div class="group relative">
    <button
      onclick={copyEmail}
      class="flex items-center gap-3 pr-4 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600 h-10"
    >
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300"
      >
        <MailIcon class="w-5 h-5 text-amber-600 dark:text-amber-400" />
      </div>
      <span
        class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
      >
        me@fariz.dev
      </span>
    </button>
    <!-- Click hint -->
    <div
      class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
    >
      Click to copy email
    </div>
  </div>

  <!-- Social Links -->
  <div class="flex items-center gap-2">
    <!-- GitHub -->
    <a
      href="https://github.com/farizink"
      target="_blank"
      rel="noreferrer"
      class="group/social relative"
    >
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-gray-900 hover:bg-gray-900"
      >
        <GithubIcon
          class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"
        />
      </div>
      <div
        class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
      >
        GitHub
      </div>
    </a>

    <!-- Discord -->
    <a
      href="https://discord.com/users/383164336450830336"
      target="_blank"
      rel="noreferrer"
      class="group/social relative"
    >
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500"
      >
        <DiscordIcon
          class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"
        />
      </div>
      <div
        class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
      >
        Discord
      </div>
    </a>

    <!-- Spotify -->
    <a
      href="https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x"
      target="_blank"
      rel="noreferrer"
      class="group/social relative"
    >
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500"
      >
        <SpotifyIcon
          class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"
        />
      </div>
      <div
        class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
      >
        Spotify
      </div>
    </a>
  </div>
</div>
