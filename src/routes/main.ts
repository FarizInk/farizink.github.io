import Home from '../pages/Home.svelte';
import Project from '../pages/Project.svelte';
import BentoProfile from '../pages/BentoProfile.svelte';

export const mainRoutes = [
  {
    path: '/',
    component: Home,
    title: 'Fariz - Software Engineer & Developer Tools Creator',
    description: 'Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.',
    keywords: 'fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte',
    robots: 'index, follow'
  },
  {
    path: '/projects',
    component: Project,
    title: 'Projects - Fariz',
    description: 'Explore my software development projects and open-source contributions. Building innovative solutions with modern technologies.',
    keywords: 'software projects, web development projects, open source, programming portfolio, github projects',
    robots: 'index, follow'
  },
  {
    path: '/example-bento-profile',
    component: BentoProfile,
    title: 'Bento Profile Example - Fariz',
    description: 'Modern bento grid layout personal profile example with cards, skills, and contact information.',
    keywords: 'bento grid, profile example, personal portfolio, modern design, responsive layout',
    robots: 'noindex, nofollow'
  }
];