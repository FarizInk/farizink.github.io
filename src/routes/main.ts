import Home from '../pages/Home.svelte';
import Notes from '../pages/Notes.svelte';
import NotesCreate from '../pages/NotesCreate.svelte';
import NotesEdit from '../pages/NotesEdit.svelte';
import Finance from '../pages/Finance.svelte';
import Files from '../pages/Files.svelte';
import { House, FileText, User, Upload, Plus, Edit2, Wallet } from '@lucide/svelte';

export const mainRoutes = [
  {
    path: '/',
    component: Home,
    title: 'Fariz - Software Engineer',
    description:
      'Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.',
    keywords:
      'fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte',
    robots: 'index, follow',
    icon: House
  },
  {
    path: '/notes',
    component: Notes,
    title: 'Notes - Fariz',
    description:
      'Manage your personal notes, thoughts, and ideas with our intuitive note-taking application.',
    keywords: 'notes, notebook, writing, personal notes, ideas, thoughts, documentation',
    robots: 'index, follow',
    icon: FileText
  },
  {
    path: '/notes/create',
    component: NotesCreate,
    title: 'Create Note - Fariz',
    description: 'Create a new note to save your thoughts, ideas, and resources.',
    keywords: 'create note, new note, write note, save thoughts',
    robots: 'noindex, nofollow',
    icon: Plus
  },
  {
    path: '/notes/edit/:id',
    component: NotesEdit,
    title: 'Edit Note - Fariz',
    description: 'Edit your note to update your thoughts, ideas, and resources.',
    keywords: 'edit note, update note, modify note',
    robots: 'noindex, nofollow',
    icon: Edit2
  },
  {
    path: '/login',
    component: null, // Modal component, handled by Navigation
    title: 'Login - Fariz',
    description: 'Sign in to your account to access personalized features.',
    keywords: 'login, sign in, authentication, account',
    robots: 'noindex, nofollow',
    icon: User
  },
  {
    path: '/finance',
    component: Finance,
    title: 'Finance - Fariz',
    description: 'Track your personal income and expenses.',
    keywords: 'finance, money tracker, income, expense, budget',
    robots: 'noindex, nofollow',
    icon: Wallet
  },
  {
    path: '/files/:code',
    component: Files,
    title: 'Shared Files - Fariz',
    description: 'Download shared temporary files',
    keywords: 'download, shared files, temp files',
    robots: 'noindex, nofollow',
    icon: FileText
  }
];
