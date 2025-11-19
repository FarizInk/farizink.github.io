<script lang="ts">
  import MailIcon from '../components/icons/MailIcon.svelte';
  import GithubIcon from '../components/icons/GithubIcon.svelte';
  import LinkedinIcon from '../components/icons/LinkedinIcon.svelte';
  import XIcon from '../components/icons/XIcon.svelte';
  import { toast } from 'svelte-sonner';

  const copyEmail = () => {
    navigator.clipboard.writeText('john.doe@example.com');
    toast.success('Email copied to clipboard!');
  };
</script>

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Full Stack Developer & UI/UX Enthusiast
      </p>
    </div>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
      <!-- About Me (2x2) -->
      <div
        class="md:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <span class="text-white text-xl font-bold">JD</span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">About Me</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Passionate full-stack developer with 5+ years of experience building web applications. I
          love creating intuitive user interfaces and solving complex problems with elegant code
          solutions.
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >JavaScript</span
          >
          <span
            class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
            >TypeScript</span
          >
          <span
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
            >React</span
          >
          <span
            class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
            >Node.js</span
          >
        </div>
      </div>

      <!-- Contact Info -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <MailIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3>
        </div>
        <button onclick={copyEmail} class="btn btn-outline btn-sm">john.doe@example.com</button>
      </div>

      <!-- Location -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="w-5 h-5 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 class="font-semibold text-gray-900 dark:text-white">Location</h3>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</p>
      </div>

      <!-- Experience -->
      <div
        class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="w-5 h-5 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 class="font-semibold text-gray-900 dark:text-white">Experience</h3>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Senior Frontend Developer</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">TechCorp Inc.</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-500">2021 - Present</span>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Full Stack Developer</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">StartupXYZ</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-500">2019 - 2021</span>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="w-5 h-5 text-purple-600 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 class="font-semibold text-gray-900 dark:text-white">Education</h3>
        </div>
        <div class="space-y-2">
          <p class="font-medium text-gray-900 dark:text-white text-sm">BS Computer Science</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">Stanford University</p>
          <p class="text-xs text-gray-500 dark:text-gray-500">2015 - 2019</p>
        </div>
      </div>

      <!-- Skills -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="w-5 h-5 text-orange-600 dark:text-orange-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <h3 class="font-semibold text-gray-900 dark:text-white">Skills</h3>
        </div>
        <div class="flex flex-wrap gap-1">
          <span
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >React</span
          >
          <span
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >Vue</span
          >
          <span
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >Node.js</span
          >
          <span
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >Python</span
          >
          <span
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >Docker</span
          >
        </div>
      </div>

      <!-- Hobbies -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="w-5 h-5 text-pink-600 dark:text-pink-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 class="font-semibold text-gray-900 dark:text-white">Hobbies</h3>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="text-sm text-gray-600 dark:text-gray-400">Coffee enthusiast</span>
          </div>
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <span class="text-sm text-gray-600 dark:text-gray-400">Guitar player</span>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div
        class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 01.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 00-3.138 3.138 3.42 3.42 0 01-1.946.806 3.42 3.42 0 00-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 00-3.138-3.138 3.42 3.42 0 01-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 003.138-3.138z"
            />
          </svg>
          <h3 class="font-semibold">Achievements</h3>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">🏆 Best Innovation Award 2023</p>
          <p class="text-sm font-medium">🌟 1000+ GitHub Stars</p>
          <p class="text-sm font-medium">📚 Published Tech Author</p>
        </div>
      </div>

      <!-- Social Links -->
      <div
        class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="flex items-center gap-3 mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Connect With Me</h3>
        </div>
        <div class="flex gap-4">
          <a
            href="https://github.com/farizink"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <GithubIcon class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/farizink"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <LinkedinIcon
              class="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            />
          </a>
          <a
            href="https://x.com/farizink"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <XIcon
              class="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"
            />
          </a>
        </div>
      </div>

      <!-- Current Status -->
      <div
        class="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <h3 class="font-semibold">Available for Work</h3>
        </div>
        <p class="text-sm">Open to exciting opportunities and freelance projects!</p>
      </div>
    </div>
  </div>
</main>
