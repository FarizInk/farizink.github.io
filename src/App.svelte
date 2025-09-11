<script lang="ts">
  import LoveIcon from "./components/icons/LoveIcon.svelte";
  import Thanks from "./components/Thanks.svelte";
  import Modal from "./components/Modal.svelte";
  import photoOne from "./assets/me/1.jpg";
  import photoTwo from "./assets/me/2.jpg";
  import SpotifyActivity from "./components/SpotifyActivity.svelte";
  import ConnectWithMe from "./components/ConnectWithMe.svelte";

  let modalThanks;
  let showThanksModal = $state(false);

  let showPhoto = $state(false);
  let randPhoto = $state<string | null>(null);

  const togglePhoto = () => {
    const photos = [photoOne, photoTwo];
    if (!showPhoto) {
      randPhoto = photos[Math.floor(Math.random() * photos.length)];
    }
    showPhoto = !showPhoto;
  };

  const openThanksModal = () => {
    showThanksModal = true;
  };

  const closeThanksModal = () => {
    showThanksModal = false;
  };
</script>

<main class="flex flex-col justify-center items-center">
  <div class="p-4 relative max-w-4xl">
    <div class="z-10 relative text-black">
      <h1 class="text-2xl md:text-4xl font-bold">
        <button
          type="button"
          class="cursor-text text-left text-black dark:text-white {showPhoto
            ? 'bg-amber-300/0 md:bg-amber-300/50 dark:bg-purple-800/0 md:dark:bg-purple-800/50'
            : ''}"
          onclick={() => togglePhoto()}>Nizar Alfarizi Akbar</button
        >
      </h1>
      <h4 class="text-lg text-black/50 dark:text-white/50">
        <span
          class={showPhoto
            ? "bg-amber-300/0 md:bg-amber-300/50 dark:bg-purple-800/0 md:dark:bg-purple-800/50"
            : ""}>known as <span class="italic font-bold">Fariz</span></span
        >
      </h4>

      <p class="mt-4 text-black dark:text-white text-sm md:text-base">
        <span
          class={showPhoto
            ? "bg-amber-300/0 md:bg-amber-300/50 dark:bg-purple-800/0 md:dark:bg-purple-800/50"
            : ""}
          >I'm a software engineer based in Surabaya, Indonesia. Specializing in
          Backend Developer, high-quality websites and applications. Currently
          focused on making projects <span class="italic">"gabut"</span> in my github
          profile 🙂 and work task.</span
        >
      </p>

      <div class="mt-5">
        <ConnectWithMe />
      </div>
      <!-- <p class="mt-1 truncate">
        The longest word in any of the major English language dictionaries is <span
          class="text-slate-900 font-medium"
          >pneumonoultramicroscopicsilicovolcanoconiosis,</span
        > a word that refers to a lung disease contracted from the inhalation of
        very fine silica particles, specifically from a volcano; medically, it is
        the same as silicosis.
      </p> -->
      <div class="mt-10">
        <SpotifyActivity />
      </div>
    </div>

    <!-- my photo 😬 -->
    <div
      class="w-80 rounded-xl overflow-hidden left-0 bottom-10 bg-gray-100 dark:bg-black {showPhoto
        ? 'hidden md:block absolute'
        : 'hidden'}"
    >
      <img src={randPhoto} alt="Fariz" />
    </div>
  </div>
</main>

<footer
  class="flex justify-center items-center backdrop-blur-md bg-white/30 dark:bg-gray-900/30 text-black dark:text-white"
>
  Made with <button type="button" onclick={openThanksModal} class="hover:cursor-pointer">
    <LoveIcon class="w-5 h-5 mx-1 text-rose-600" />
  </button> in Surabaya.
</footer>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  {#snippet children()}
    <Thanks />
  {/snippet}
</Modal>

<style>
</style>
