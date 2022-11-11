<script>
  import LoveIcon from "./components/icons/LoveIcon.svelte";
  import Thanks from "./components/Thanks.svelte";
  import Modal from "./components/Modal.svelte";
  import photo from "./assets/me.jpg";
  import SpotifyActivity from "./components/SpotifyActivity.svelte";
  import ConnectWithMe from "./components/ConnectWithMe.svelte";

  let modalThanks;
  let showPhoto = false;
</script>

<main class="flex flex-col justify-center items-center">
  <div class="p-4 relative max-w-4xl">
    <div class="z-10 relative text-black">
      <h1 class="text-2xl md:text-4xl font-bold">
        <button
          class="cursor-text text-left text-black dark:text-white {showPhoto
            ? 'bg-amber-300 dark:bg-purple-800 bg-opacity-0 dark:bg-opacity-0 md:bg-opacity-50 dark:md:bg-opacity-50'
            : ''}"
          on:click={() => (showPhoto = !showPhoto)}>Nizar Alfarizi Akbar</button
        >
      </h1>
      <h4 class="text-lg text-opacity-50 dark:text-opacity-50 text-black dark:text-white">
        <span
          class={showPhoto ? "bg-amber-300 dark:bg-purple-800 bg-opacity-0 dark:bg-opacity-0 md:bg-opacity-50 dark:md:bg-opacity-50" : ""}
          >known as <span class="italic font-bold">Fariz</span></span
        >
      </h4>

      <p class="mt-4 text-black dark:text-white text-sm md:text-base">
        <span
          class={showPhoto ? "bg-amber-300 dark:bg-purple-800 bg-opacity-0 dark:bg-opacity-0 md:bg-opacity-50 dark:md:bg-opacity-50" : ""}
          >I'm a software engineer based in Surabaya, Indonesia. Specializing in
          Backend Developer, high-quality websites and applications. Currently
          focused on making projects <span class="italic">"gabut"</span> in my github profile 🙂 and work task.</span
        >
      </p>

      <div class="mt-5">
        <ConnectWithMe/>
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
      class="w-80 rounded-xl overflow-hidden left-0 bottom-10 {showPhoto
        ? 'hidden md:block absolute'
        : 'hidden'}"
    >
      <img src={photo} alt="Fariz" />
    </div>
  </div>
</main>

<footer class="flex justify-center items-center backdrop-blur-md bg-white/30 dark:bg-gray-900/30 text-black dark:text-white">
  Made with <button on:click={modalThanks.open()}
    ><LoveIcon class="w-5 h-5 mx-1 text-rose-600" /></button
  > in Surabaya.
</footer>

<Modal bind:this={modalThanks} isRaw={true}>
  <Thanks />
</Modal>

<style>
</style>
