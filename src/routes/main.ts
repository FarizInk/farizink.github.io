import Home from '../pages/Home.svelte';
import Notes from '../pages/Notes.svelte';
import DeletedNotes from '../pages/DeletedNotes.svelte';

export const mainRoutes = [
  {
    path: '/',
    component: Home,
    title: 'Fariz - Software Engineer',
    description:
      'Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.',
    keywords:
      'fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte',
    robots: 'index, follow'
  },
  {
    path: '/notes',
    component: Notes,
    title: 'Notes - Fariz',
    description:
      'Manage your personal notes, thoughts, and ideas with our intuitive note-taking application.',
    keywords: 'notes, notebook, writing, personal notes, ideas, thoughts, documentation',
    robots: 'index, follow'
  },
  {
    path: '/notes/deleted',
    component: DeletedNotes,
    title: 'Deleted Notes - Fariz',
    description: 'View and manage your deleted notes. Permanently remove notes from trash.',
    keywords: 'deleted notes, trash, recycle bin, permanent delete',
    robots: 'noindex, nofollow'
  },
  {
    path: '/login',
    component: null, // Modal component, handled by Navigation
    title: 'Login - Fariz',
    description: 'Sign in to your account to access personalized features.',
    keywords: 'login, sign in, authentication, account',
    robots: 'noindex, nofollow'
  }
];
