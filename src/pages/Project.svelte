<script lang="ts">
  import { onMount } from 'svelte';

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
      
      const response = await fetch('https://api.github.com/users/FarizInk/repos?sort=updated&per_page=12', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }
      
      const data = await response.json();
      repositories = data.filter((repo: any) => !repo.fork); // Show all non-fork repos
      
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
    <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Projects</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">Here are some of my recent projects and repositories</p>
  </div>

  {#if loading}
    <div class="flex flex-col items-center justify-center min-h-[300px] text-gray-600 dark:text-gray-400">
      <div class="w-10 h-10 border-3 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p>Loading repositories...</p>
    </div>
  {:else if error}
    <div class="flex flex-col items-center justify-center min-h-[300px] text-gray-600 dark:text-gray-400">
      <p class="mb-4">Error: {error}</p>
      <button 
        onclick={fetchPinnedRepos}
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  {:else}

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each repositories as repo}
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col">
          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-2">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
              >
                {repo.name}
              </a>
            </h3>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow">{repo.description}</p>
          
          {#if repo.topics && repo.topics.length > 0}
            <div class="flex flex-wrap gap-2 mb-4">
              {#each repo.topics.slice(0, 3) as topic}
                <span class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                  {topic}
                </span>
              {/each}
            </div>
          {/if}
          
          <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-4">
              {#if repo.language}
                <span class="flex items-center gap-1">
                  <span 
                    class="w-3 h-3 rounded-full" 
                    style="background-color: {languageColors[repo.language] || '#888'}"
                  ></span>
                  {repo.language}
                </span>
              {/if}
              
              {#if repo.stargazers_count > 0}
                <span class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="opacity-70">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                  {repo.stargazers_count}
                </span>
              {/if}
              
              {#if repo.forks_count > 0}
                <span class="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="opacity-70">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25V5.372a2.25 2.25 0 10-1.5 0v.878A.75.75 0 0110.25 7H5.75A.75.75 0 015 6.25v-.878z"/>
                  </svg>
                  {repo.forks_count}
                </span>
              {/if}
            </div>
            
            <span class="text-xs">Updated {formatDate(repo.updated_at)}</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>


