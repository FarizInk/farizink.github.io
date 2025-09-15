<script lang="ts">
  import MailIcon from "./icons/MailIcon.svelte";
  import LinkedinIcon from "./icons/LinkedinIcon.svelte";
  import GithubIcon from "./icons/GithubIcon.svelte";
  import DiscordIcon from "./icons/DiscordIcon.svelte";
  import TwitterIcon from "./icons/TwitterIcon.svelte";
  import XIcon from "./icons/XIcon.svelte";
  import SpotifyIcon from "./icons/SpotifyIcon.svelte";
</script>

<div class="flex flex-wrap gap-2">
  <div class="rounded-full bg-gray-100 dark:bg-gray-800 flex gap-2 justify-center items-center">
    <a
      href="mailto:me@fariz.dev"
      target="_blank"
      rel="noreferrer"
      class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full dark:hover:bg-gray-900 hover:bg-zasifer-yellow-1 border border-transparent hover:border-zasifer-yellow-1 group"
    >
      <MailIcon class="w-4 h-4 text-black dark:text-white dark:group-hover:text-zasifer-yellow-1" />
    </a>
    <div class="mr-3 text-gray-700 dark:text-gray-200">me@fariz.dev</div>
  </div>
  <a
    href="https://www.linkedin.com/in/farizink"
    target="_blank"
    rel="noreferrer"
    class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full flex justify-center items-center hover:bg-linkedin-blue-1 dark:hover:bg-gray-900 border border-transparent hover:border-linkedin-blue-1 group"
  >
    <LinkedinIcon class="w-4 h-4 text-black dark:text-gray-200 group-hover:text-white dark:group-hover:text-linkedin-blue-1" />
  </a>
  <a
    href="https://github.com/farizink"
    target="_blank"
    rel="noreferrer"
    class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full flex justify-center items-center hover:bg-gray-900 border border-transparent hover:border-gray-50 group"
  >
    <GithubIcon class="w-4 h-4 text-black dark:text-gray-200 group-hover:text-gray-50" />
  </a>
  <a
    href="https://discord.com/users/383164336450830336"
    target="_blank"
    rel="noreferrer"
    class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full flex justify-center items-center hover:bg-discord-blurple dark:hover:bg-gray-900 border border-transparent hover:border-discord-blurple group"
  >
    <DiscordIcon class="w-4 h-4 text-black dark:text-white group-hover:text-white dark:group-hover:text-discord-blurple"/>
  </a>
  <a
    href="https://x.com/farizink"
    target="_blank"
    rel="noreferrer"
    class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full flex justify-center items-center hover:bg-gray-900 dark:hover:bg-gray-900 border border-transparent hover:border-gray-50 group"
  >
    <XIcon class="w-4 h-4 text-black dark:text-white group-hover:text-gray-50" />
  </a>
  <a
    href="https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x"
    class="bg-gray-200 dark:bg-gray-700 p-3 rounded-full flex justify-center items-center hover:bg-gray-900 dark:hover:bg-gray-900 border border-transparent hover:border-spotify-green group"
  >
    <SpotifyIcon class="w-4 h-4 text-black dark:text-white group-hover:text-spotify-green" />
  </a>
</div>
