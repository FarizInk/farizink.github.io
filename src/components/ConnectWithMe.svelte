<script lang="ts">
  import GithubIcon from './icons/GithubIcon.svelte';
  import SpotifyIcon from './icons/SpotifyIcon.svelte';
  import UnsplashIcon from './icons/UnsplashIcon.svelte';
  import { CopyChip, IconButton } from '$lib/components/ds';

  const socials = [
    { label: 'GitHub', href: 'https://github.com/farizink', icon: GithubIcon },
    { label: 'Unsplash', href: 'https://unsplash.com/@tungaumayo', icon: UnsplashIcon },
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x',
      icon: SpotifyIcon
    }
  ];
</script>

<div class="flex flex-wrap items-center gap-3">
  <CopyChip value="me@fariz.dev" />
  {#each socials as social (social.label)}
    <IconButton label={social.label} href={social.href} target="_blank">
      <social.icon class="size-5" />
    </IconButton>
  {/each}
</div>
