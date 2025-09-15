<script lang="ts">
  import SpotifyLogoIcon from "./icons/SpotifyLogoIcon.svelte";
  import { onMount, onDestroy } from "svelte";

  interface SpotifyDevice {
    name: string | null;
    type: string | null;
    is_active?: boolean;
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
    progress_ms: 0,
  });
  const defaultDevice: SpotifyDevice = {
    name: null,
    type: null,
  };
  let device = $state<SpotifyDevice>({ ...defaultDevice });

  // Track timeout IDs for cleanup
  let timeoutIds: Set<number> = new Set();
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
    fetch("https://api.spotify.com/v1/me/player/devices", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + spotifyToken,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return false;
        }
      })
      .then((data: any) => {
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
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  const refreshToken = () => {
    fetch("https://spotapi.fariz.dev/refresh")
      .then((response) => response.json())
      .then((data) => {
        if (data.data !== null) {
          spotifyToken = data.data.access_token;
          getCurrentPlayingTrack();
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  const getCurrentPlayingTrack = () => {
    if (!isComponentMounted) return;
    
    fetch("https://api.spotify.com/v1/me/player/currently-playing?market=ID", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + spotifyToken,
      }),
    })
      .then((response) => {
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
      .then((data) => {
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
      .catch((error) => {
        if (!isComponentMounted) return;
        
        spotify = false;
        console.log(error);
        setManagedTimeout(() => getCurrentPlayingTrack(), 7000);
      });
  };

  onMount(() => {
    isComponentMounted = true;
    
    fetch("https://spotapi.fariz.dev/token")
      .then((response) => response.json())
      .then((data) => {
        if (!isComponentMounted) return;
        
        if (data.data !== null) {
          spotifyToken = data.data.access_token;
          getCurrentPlayingTrack();
        }
      })
      .catch((error) => {
        if (!isComponentMounted) return;
        
        console.log(error);
      });
  });

  onDestroy(() => {
    cleanup();
  });
</script>

{#if spotify}
  <div class="overflow-hidden bg-spotify-black-2 rounded-lg shadow-lg">
    <div
      class="w-full flex gap-4 h-16 max-w-full overflow-hidden p-2 justify-between items-center {isPlaying
        ? 'bg-spotify-green'
        : 'bg-spotify-black-1'}"
    >
      <div class="h-full w-12">
        <a href={track.album_url} target="_blank" rel="noreferrer">
          <img
            src={track.album_img}
            alt=""
            class="h-full overflow-hidden rounded-sm"
          />
        </a>
      </div>
      <div class="flex-1 flex flex-col justify-start">
        <div
          class="text-base font-bold {isPlaying ? 'text-black' : 'text-white'}"
        >
          <a
            target="_blank"
            rel="noreferrer"
            class="hover:underline"
            href={track.url}
            id="track-title"
          >
            {track.name}
          </a>
        </div>
        <div class="text-sm {isPlaying ? 'text-gray-800' : 'text-white'}">
          {#each track.artists as { external_urls, name }, i}
            <span>
              <a
                target="_blank"
                rel="noreferrer"
                class="hover:underline truncate text-ellipsis"
                href={external_urls.spotify}
              >
                {name}
              </a>
              {#if i + 1 !== track.artists.length}
                ,
              {/if}
            </span>
          {/each}
        </div>
      </div>
      <div></div>
    </div>
    <div
      class="text-sm text-white p-2 flex gap-0 sm:gap-3 flex-col sm:flex-row items-center justify-between"
    >
      <div class="w-full sm:w-auto text-left">
        {#if device.name !== null}
          On <span class="font-bold">{device.name}</span>
        {/if}
      </div>
      <div class="flex-1 w-full flex gap-3 items-center">
        <div class="flex-1">
          <div
            class="rounded-full h-1 w-full overflow-hidden {isPlaying
              ? 'bg-spotify-green/40'
              : 'bg-spotify-black-1/40'}"
          >
            <div
              class="h-full ease-in-out duration-200 {isPlaying
                ? 'bg-spotify-green'
                : 'bg-spotify-black-1'}"
              style="width: {track.percent}%;"
            ></div>
          </div>
        </div>
        {#if isPlaying && getRemainingTime()}
          <div class="text-xs text-gray-300 whitespace-nowrap">
            {getRemainingTime()}
          </div>
        {/if}
        <div>
          <a href="https://open.spotify.com" rel="noreferrer" target="_blank">
            <SpotifyLogoIcon class="h-4 w-auto text-white" />
          </a>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div
    class="spotify-offline w-full bg-spotify-black-1 rounded-lg flex flex-col overflow-hidden"
  >
    <div
      class="bg-spotify-black-2 w-full flex items-center p-2  gap-4 h-16"
    >
      <div class="rounded-sm w-12 h-12 animate-pulse bg-spotify-black-4">
        
      </div>
      <div class="flex flex-col justify-center gap-3 flex-1">
        <div class="w-1/2 h-4 animate-pulse bg-spotify-black-4 rounded-sm"></div>
        <div class="w-1/3 h-4 animate-pulse bg-spotify-black-4 rounded-sm"></div>
      </div>
    </div>
    <div
      class="text-white flex-1 px-3 w-full bg-spotify-black-3 flex gap-2 justify-between items-center"
    >
      <div class="text-gray-300">Offline</div>
      <a href="https://open.spotify.com" rel="noreferrer" target="_blank">
        <SpotifyLogoIcon class="h-4 w-auto text-white" />
      </a>
    </div>
  </div>
{/if}

<style scoped>
  .spotify-offline {
    height: 100px;
  }
</style>
