<script>
  import SpotifyLogoIcon from "./icons/SpotifyLogoIcon.svelte";
  import { onMount } from "svelte";
  
  let spotifyToken = null;
  let spotify = false;
  let isPlaying = false;
  let track = {
    album_img: null,
    album_url: null,
    artists: [],
    url: null,
    name: null,
    percent: 0,
  };
  const defaultDevice = {
    name: null,
    type: null,
  };
  let device = { ...defaultDevice };

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
      .then((data) => {
        if (data.devices.length >= 1) {
          const activeDevice = data.devices.find((device) => device.is_active);
          if (activeDevice !== undefined) {
            device.name = activeDevice.name
            device.type = activeDevice.type
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
    fetch("https://spotapi-token.fariz.dev/refresh")
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
    fetch("https://api.spotify.com/v1/me/player/currently-playing?market=ID", {
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
        } else if (response.status === 401) {
          refreshToken();
        } else {
          setTimeout(() => getCurrentPlayingTrack(), 3000);
          return false;
        }
      })
      .then((data) => {
        if (data) {
          isPlaying = data.is_playing;
          const item = data.item;
          track.artists = item.artists;
          track.url = item.external_urls.spotify;
          track.name = item.name;
          track.album_img = item?.album?.images[0]?.url;
          track.album_url = item.album.external_urls.spotify;
          track.percent = (data.progress_ms * 100) / item.duration_ms;
          spotify = true;
          // console.log("item: ", item);
          // console.log("spotify: ", spotify);
          // console.log("is playing: ", isPlaying);
          // console.log("track: ", track);
          getDevice();
          setTimeout(() => getCurrentPlayingTrack(), 1000);
        }
      })
      .catch((error) => {
        spotify = false;
        console.log(error);
        setTimeout(() => getCurrentPlayingTrack(), 7000)
        return [];
      });
  };

  onMount(() => {
    fetch("https://spotapi-token.fariz.dev/token")
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
  });
</script>

{#if spotify}
<div
  class="overflow-hidden bg-spotify-black-2 rounded-lg shadow-lg"
>
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
        class="text-base font-bold {isPlaying
          ? 'text-black'
          : 'text-white'}"
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
    <div />
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
          class="rounded-full h-1 w-full bg-opacity-40 overflow-hidden {isPlaying
            ? 'bg-spotify-green'
            : 'bg-spotify-black-1'}"
        >
          <div
            class="h-full {isPlaying
              ? 'bg-spotify-green'
              : 'bg-spotify-black-1'}"
            style="width: {track.percent}%;"
          />
        </div>
      </div>
      <div>
        <a
          href="https://open.spotify.com"
          rel="noreferrer"
          target="_blank"
        >
          <SpotifyLogoIcon class="h-4 w-auto text-white" />
        </a>
      </div>
    </div>
  </div>
</div>
{/if}