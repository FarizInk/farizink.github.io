<script lang="ts">
  import { onMount } from 'svelte';
  import { Star, GitFork, ExternalLink, Github } from '@lucide/svelte';

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

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen animate-fade-in">
  <div class="text-center mb-16">
    <h1
      class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-6 tracking-tight"
    >
      Projects
    </h1>
    <p
      class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed"
    >
      Explore my latest work and open-source contributions on GitHub. From web applications to
      developer tools.
    </p>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {#each Array(6) as i (i)}
        <div class="card h-full">
          <div class="animate-pulse">
            <div class="mb-6">
              <div
                class="h-8 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-lg mb-3 w-3/4"
              ></div>
            </div>
            <div class="space-y-3 mb-6">
              <div
                class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-full"
              ></div>
              <div
                class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-5/6"
              ></div>
              <div
                class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-4/6"
              ></div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
              <div
                class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-16"
              ></div>
              <div
                class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-20"
              ></div>
              <div
                class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-14"
              ></div>
            </div>
            <div
              class="flex justify-between items-center pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)]"
            >
              <div class="flex items-center gap-4">
                <div
                  class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-16"
                ></div>
                <div
                  class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-12"
                ></div>
              </div>
              <div
                class="h-3 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-20"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if error}
    <div class="card max-w-md mx-auto text-center">
      <div
        class="flex flex-col items-center justify-center text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"
      >
        <p class="mb-6 text-lg">Error: {error}</p>
        <button onclick={fetchPinnedRepos} class="btn btn-primary btn-lg">Try Again</button>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {#each repositories as repo (repo.id)}
        <div class="card card-elevated card-hover group h-full flex flex-col">
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--ds-primary-500)]/10 to-[var(--ds-primary-600)]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          ></div>

          <div class="mb-4 relative z-10">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-bold tracking-tight">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[var(--ds-secondary-900)] dark:text-white hover:text-[var(--ds-primary-600)] dark:hover:text-[var(--ds-primary-400)] transition-colors duration-200 flex items-center gap-2 group/link"
                >
                  <Github class="w-5 h-5" />
                  {repo.name}
                  <ExternalLink
                    class="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </h3>
            </div>
          </div>

          <p
            class="text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] mb-6 leading-relaxed flex-grow relative z-10"
          >
            {repo.description || 'No description available'}
          </p>

          {#if repo.topics && repo.topics.length > 0}
            <div class="flex flex-wrap gap-2 mb-6 relative z-10">
              {#each repo.topics.slice(0, 3) as topic (topic)}
                <span
                  class="bg-[var(--ds-primary-50)] dark:bg-[var(--ds-primary-900)]/30 text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)] px-3 py-1 rounded-full text-xs font-medium border border-[var(--ds-primary-100)] dark:border-[var(--ds-primary-800)]"
                >
                  {topic}
                </span>
              {/each}
              {#if repo.topics.length > 3}
                <span
                  class="text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-500)] text-xs px-2 py-1 font-medium"
                >
                  +{repo.topics.length - 3} more
                </span>
              {/if}
            </div>
          {/if}

          <div
            class="flex justify-between items-center mt-auto pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)] text-sm text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-400)] relative z-10"
          >
            <div class="flex items-center gap-5">
              {#if repo.language}
                <span class="flex items-center gap-2">
                  <span
                    class="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-white dark:ring-[var(--ds-secondary-800)]"
                    style="background-color: {languageColors[repo.language] || '#888'}"
                  ></span>
                  <span class="font-medium">{repo.language}</span>
                </span>
              {/if}

              {#if repo.stargazers_count > 0}
                <span class="flex items-center gap-1.5 group/star">
                  <Star
                    class="w-4 h-4 text-yellow-500 group-hover/star:fill-current transition-all duration-200"
                  />
                  <span class="font-medium">{repo.stargazers_count}</span>
                </span>
              {/if}

              {#if repo.forks_count > 0}
                <span class="flex items-center gap-1.5">
                  <GitFork class="w-4 h-4" />
                  <span class="font-medium">{repo.forks_count}</span>
                </span>
              {/if}
            </div>

            <span class="text-xs font-medium opacity-70">
              {formatDate(repo.updated_at)}
            </span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
