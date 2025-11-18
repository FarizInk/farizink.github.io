<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';

  interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    updated_at: string;
    fork: boolean;
  }

  let repositories: Repository[] = $state([]);
  let loading = $state(false);
  let error = $state('');

  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Vue: '#4FC08D',
    Svelte: '#ff3e00',
    React: '#61dafb',
    Go: '#00ADD8',
    Rust: '#dea584',
    'C++': '#f34b7d',
    C: '#555555'
  };

  async function fetchPinnedRepos() {
    try {
      loading = true;
      error = '';

      const response = await fetch(
        'https://api.github.com/users/FarizInk/repos?sort=updated&per_page=12',
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Website'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const data = await response.json();
      repositories = data.filter((repo: Repository) => !repo.fork); // Show all non-fork repos
    } catch (err) {
      console.error('Fetch error:', err);
      error = err instanceof Error ? err.message : 'An error occurred while fetching repositories';
    } finally {
      loading = false;
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  onMount(() => {
    fetchPinnedRepos();
  });
</script>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
  <div class="text-center mb-12">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Explore my latest work and open-source contributions on GitHub
    </p>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each Array(6) as i (i)}
        <Card variant="default" padding="lg">
          <div class="animate-pulse">
            <div class="mb-4">
              <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2 w-3/4"></div>
            </div>
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
            </div>
            <div
              class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-4">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  {:else if error}
    <Card variant="default" padding="xl" class="max-w-md mx-auto">
      <div class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
        <p class="mb-4">Error: {error}</p>
        <Button onclick={fetchPinnedRepos} variant="primary">Try Again</Button>
      </div>
    </Card>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each repositories as repo (repo.id)}
        <Card variant="elevated" clickable hover class="group">
          <div
            class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <div class="mb-4 relative z-10">
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-xl font-semibold">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group/link"
                >
                  {repo.name}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="opacity-0 group-hover/link:opacity-70 transition-opacity duration-200"
                  >
                    <path
                      d="M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0111.25 15h-8.5A1.75 1.75 0 011 13.25v-8.5A1.75 1.75 0 012.75 3h3.5a.75.75 0 010 1.5h-3.5z"
                    />
                    <path
                      d="M15.22 1.28a.75.75 0 010 1.06l-6.22 6.22H11a.75.75 0 010 1.5H7.25a.75.75 0 01-.75-.75V6a.75.75 0 011.5 0v2.19l6.22-6.22a.75.75 0 011.06 0z"
                    />
                  </svg>
                </a>
              </h3>
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow relative z-10">
            {repo.description || 'No description available'}
          </p>

          {#if repo.topics && repo.topics.length > 0}
            <div class="flex flex-wrap gap-2 mb-4 relative z-10">
              {#each repo.topics.slice(0, 3) as topic (topic)}
                <span
                  class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800"
                >
                  {topic}
                </span>
              {/each}
              {#if repo.topics.length > 3}
                <span class="text-gray-500 dark:text-gray-400 text-xs px-2 py-1">
                  +{repo.topics.length - 3} more
                </span>
              {/if}
            </div>
          {/if}

          <div
            class="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 relative z-10"
          >
            <div class="flex items-center gap-4">
              {#if repo.language}
                <span class="flex items-center gap-1.5">
                  <span
                    class="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-white dark:ring-gray-800"
                    style="background-color: {languageColors[repo.language] || '#888'}"
                  ></span>
                  <span class="text-xs font-medium">{repo.language}</span>
                </span>
              {/if}

              {#if repo.stargazers_count > 0}
                <span class="flex items-center gap-1.5 group/star">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="text-yellow-500 group-hover/star:fill-current transition-all duration-200"
                  >
                    <path
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
                    />
                  </svg>
                  <span class="text-xs font-medium">{repo.stargazers_count}</span>
                </span>
              {/if}

              {#if repo.forks_count > 0}
                <span class="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="text-gray-500"
                  >
                    <path
                      d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25V5.372a2.25 2.25 0 10-1.5 0v.878A.75.75 0 0110.25 7H5.75A.75.75 0 015 6.25v-.878z"
                    />
                  </svg>
                  <span class="text-xs font-medium">{repo.forks_count}</span>
                </span>
              {/if}
            </div>

            <span class="text-xs text-gray-500 dark:text-gray-500 font-medium">
              {formatDate(repo.updated_at)}
            </span>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</main>
