<script lang="ts">
  import { MonitorSmartphone, Play, Pause, X } from '@lucide/svelte';
  import SpotifyLogoIcon from './icons/SpotifyLogoIcon.svelte';
  import { onMount, onDestroy } from 'svelte';

  interface SpotifyDevice {
    name: string | null;
    type: string | null;
    is_active?: boolean;
  }

  interface SpotifyDevicesResponse {
    devices: SpotifyDevice[];
  }

  interface SpotifyArtist {
    name: string;
    external_urls: {
      spotify: string;
    };
  }

  interface SpotifyTrack {
    album_img: string | null;
    album_url: string | null;
    artists: SpotifyArtist[];
    url: string | null;
    name: string | null;
    percent: number;
    duration_ms: number;
    progress_ms: number;
  }

  let spotifyToken = $state<string | null>(null);
  let spotify = $state(false);
  let isPlaying = $state(false);
  let track = $state<SpotifyTrack>({
    album_img: null,
    album_url: null,
    artists: [],
    url: null,
    name: null,
    percent: 0,
    duration_ms: 0,
    progress_ms: 0
  });
  const defaultDevice: SpotifyDevice = {
    name: null,
    type: null
  };
  let device = $state<SpotifyDevice>({ ...defaultDevice });

  // Track timeout IDs for cleanup
  let timeoutIds = $state(new Set<number>());
  let isComponentMounted = false;

  // Helper function to manage timeouts
  const setManagedTimeout = (callback: () => void, delay: number): number => {
    if (!isComponentMounted) return -1;

    const timeoutId = window.setTimeout(() => {
      timeoutIds.delete(timeoutId);
      if (isComponentMounted) {
        callback();
      }
    }, delay);

    timeoutIds.add(timeoutId);
    return timeoutId;
  };

  // Cleanup function
  const cleanup = () => {
    isComponentMounted = false;
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds.clear();
  };

  // Helper function to calculate remaining time
  const getRemainingTime = (): string => {
    if (!track.duration_ms || !track.progress_ms) return '';

    const remainingMs = track.duration_ms - track.progress_ms;
    const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

    if (remainingMinutes <= 0) return '';
    if (remainingMinutes === 1) return '1 min left';
    return `${remainingMinutes} min left`;
  };

  const getDevice = () => {
    fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + spotifyToken
      })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return false;
        }
      })
      .then((data: SpotifyDevicesResponse) => {
        if (data.devices.length >= 1) {
          const activeDevice = data.devices.find((device: SpotifyDevice) => device.is_active);
          if (activeDevice !== undefined) {
            device.name = activeDevice.name;
            device.type = activeDevice.type;
          } else {
            device = { ...defaultDevice };
          }
        } else {
          device = { ...defaultDevice };
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  };

  const refreshToken = () => {
    fetch('https://core.fariz.dev/api/spotify/refresh')
      .then(response => response.json())
      .then(data => {
        if (data.data !== null) {
          spotifyToken = data.data.access_token;
          getCurrentPlayingTrack();
        }
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  };

  const getCurrentPlayingTrack = () => {
    if (!isComponentMounted) return;

    fetch('https://api.spotify.com/v1/me/player/currently-playing?market=ID', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + spotifyToken
      })
    })
      .then(response => {
        if (!isComponentMounted) return null;

        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          refreshToken();
          return null;
        } else {
          setManagedTimeout(() => getCurrentPlayingTrack(), 3000);
          return null;
        }
      })
      .then(data => {
        if (!isComponentMounted || !data) return;

        isPlaying = data.is_playing;
        const item = data.item;
        track.artists = item.artists;
        track.url = item.external_urls.spotify;
        track.name = item.name;
        track.album_img = item?.album?.images[0]?.url;
        track.album_url = item.album.external_urls.spotify;
        track.duration_ms = item.duration_ms;
        track.progress_ms = data.progress_ms;
        track.percent = (data.progress_ms * 100) / item.duration_ms;
        spotify = true;
        getDevice();
        setManagedTimeout(() => getCurrentPlayingTrack(), 1000);
      })
      .catch(error => {
        if (!isComponentMounted) return;

        spotify = false;
        console.log(error);
        setManagedTimeout(() => getCurrentPlayingTrack(), 7000);
      });
  };

  onMount(() => {
    isComponentMounted = true;

    fetch('https://core.fariz.dev/api/spotify/token')
      .then(response => response.json())
      .then(data => {
        if (!isComponentMounted) return;

        if (data.data !== null) {
          spotifyToken = data.data.access_token;
          getCurrentPlayingTrack();
        }
      })
      .catch(error => {
        if (!isComponentMounted) return;

        console.log(error);
      });
  });

  onDestroy(() => {
    cleanup();
  });
</script>

{#if spotify}
  <div class="group relative bg-gradient-to-br from-spotify-black-2 to-spotify-black-1 rounded-2xl shadow-xl border {isPlaying ? 'border-spotify-green/50 shadow-spotify-green/20' : 'border-spotify-black-3/50'} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-spotify-green/30">

    <!-- Main content -->
    <div class="p-4">
      <!-- Header with album and track info -->
      <div class="flex items-center gap-4 mb-4">
        <!-- Album art -->
        <div class="relative">
          <a href={track.album_url} target="_blank" rel="noreferrer" class="block">
            <img
              src={track.album_img}
              alt=""
              class="w-16 h-16 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
            />
            {#if isPlaying}
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-spotify-green rounded-full flex items-center justify-center shadow-lg">
                <Play class="w-2.5 h-2.5 text-white" />
              </div>
            {/if}
          </a>
        </div>

        <!-- Track information -->
        <div class="flex-1 min-w-0">
          <div class="font-bold text-white text-base mb-1 truncate group-hover:text-spotify-green transition-colors duration-200">
            <a
              target="_blank"
              rel="noreferrer"
              class="hover:underline"
              href={track.url}
            >
              {track.name}
            </a>
          </div>
          <div class="text-sm text-gray-300 truncate">
            {#each track.artists as { external_urls, name }, i (i)}
              <span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  class="hover:text-white hover:underline transition-colors duration-200"
                  href={external_urls.spotify}
                >
                  {name}
                </a>
                {#if i + 1 !== track.artists.length}
                  <span class="text-gray-500 mx-1">•</span>
                {/if}
              </span>
            {/each}
          </div>
        </div>

        <!-- Spotify logo -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block">
            <SpotifyLogoIcon class="h-5 w-auto text-spotify-green hover:scale-110 transition-transform duration-200" />
          </a>
        </div>
      </div>

      <!-- Progress bar section -->
      <div class="space-y-3">
        <!-- Progress bar -->
        <div class="relative">
          <div
            class="h-2 rounded-full overflow-hidden {isPlaying
              ? 'bg-spotify-black-4'
              : 'bg-spotify-black-3/50'}"
          >
            <div
              class="h-full rounded-full transition-all duration-300 ease-out {isPlaying
                ? 'bg-gradient-to-r from-spotify-green to-spotify-green/80'
                : 'bg-gradient-to-r from-gray-400 to-gray-500'}"
              style="width: {track.percent}%;"
            >
              {#if isPlaying}
                <div class="h-full rounded-full animate-pulse bg-white/20"></div>
              {/if}
            </div>
          </div>
          {#if isPlaying}
            <div
              class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300"
              style="left: calc({track.percent}% - 6px);"
            ></div>
          {/if}
        </div>

        <!-- Bottom info -->
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            {#if device.name !== null}
              <div class="flex items-center gap-1 text-gray-400">
                <MonitorSmartphone class="w-3 h-3 opacity-70" />
                <span class="font-medium text-gray-300">{device.name}</span>
              </div>
            {/if}
          </div>

          <div class="flex items-center gap-3">
            {#if isPlaying && getRemainingTime()}
              <span class="text-gray-400 font-medium">
                {getRemainingTime()}
              </span>
            {/if}
            <div class="flex items-center gap-1">
              {#if isPlaying}
                <div class="w-2 h-2 bg-spotify-green rounded-full animate-pulse"></div>
                <span class="text-spotify-green font-medium">LIVE</span>
              {:else}
                <Pause class="w-3 h-3 text-gray-400" />
                <span class="text-gray-400">PAUSED</span>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="group relative bg-gradient-to-br from-spotify-black-2 to-spotify-black-1 rounded-2xl shadow-xl border border-spotify-black-3/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/30">
    <!-- Offline state -->
    <div class="p-4">
      <div class="flex items-center gap-4 mb-4">
        <!-- Animated album placeholder -->
        <div class="relative">
          <div class="w-16 h-16 rounded-lg bg-spotify-black-3 flex items-center justify-center">
            <div class="w-8 h-8 rounded bg-spotify-black-4 animate-pulse"></div>
          </div>
          <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <X class="w-3 h-3 text-gray-400" />
          </div>
        </div>

        <!-- Offline info -->
        <div class="flex-1">
          <div class="font-bold text-gray-400 text-base mb-1">Not Playing</div>
          <div class="text-sm text-gray-500">Connect to Spotify to see current track</div>
        </div>

        <!-- Spotify logo -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block">
            <SpotifyLogoIcon class="h-5 w-auto text-gray-400 hover:text-spotify-green hover:scale-110 transition-all duration-200" />
          </a>
        </div>
      </div>

      <!-- Offline progress bar placeholder -->
      <div class="space-y-3">
        <div class="h-2 rounded-full bg-spotify-black-3/30 overflow-hidden">
          <div class="h-full w-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div>
        </div>

        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1 text-gray-500">
            <Pause class="w-3 h-3" />
            <span>Offline</span>
          </div>
          <span class="text-gray-500">--:--</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style scoped>
  .spotify-offline {
    height: 100px;
  }
</style>
