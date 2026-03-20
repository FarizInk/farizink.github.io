import Home from '../pages/Home.svelte';
import Notes from '../pages/Notes.svelte';
import TempUpload from '../pages/TempUpload.svelte';
import Files from '../pages/Files.svelte';
import { House, FileText, User, Upload } from '@lucide/svelte';

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
    path: '/login',
    component: null, // Modal component, handled by Navigation
    title: 'Login - Fariz',
    description: 'Sign in to your account to access personalized features.',
    keywords: 'login, sign in, authentication, account',
    robots: 'noindex, nofollow',
    icon: User
  },
  {
    path: '/temp-upload',
    component: TempUpload,
    title: 'Temp File Upload - Fariz',
    description:
      'Upload and share files temporarily with auto-delete after 24 hours. Fast, secure, and free temporary file hosting.',
    keywords:
      'file upload, temp file, share files, temporary storage, file sharing, upload files, 24 hour storage',
    robots: 'index, follow',
    icon: Upload
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
