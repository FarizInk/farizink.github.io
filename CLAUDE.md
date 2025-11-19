# Project Documentation - Fariz Ink Website

## Project Overview

This is a personal portfolio website for Fariz Ink, built with modern web technologies. The site features a collection of developer tools, blog functionality, and a minimalist design with dark mode support.

## Technology Stack

- **Framework**: Svelte 5 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide Svelte (@lucide/svelte)
- **Deployment**: GitHub Pages
- **Package Manager**: npm

## Project Structure

```
/
├── src/
│   ├── app.css                 # Global styles and design system
│   ├── app.d.ts               # Svelte type declarations
│   ├── app.html               # HTML template
│   ├── main.ts                # Application entry point
│   ├── routes.ts              # Route configuration
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utility libraries
│   │   ├── constants.js       # Application constants
│   │   ├── designSystem.js    # Design system configuration
│   │   ├── router.js          # Client-side routing
│   │   └── toolsConfig.ts     # Tools configuration
│   ├── pages/                 # Page components
│   │   ├── tools/             # Developer tools pages
│   │   └── [slug]/            # Dynamic route pages
│   └── content/               # Markdown content
├── static/                    # Static assets
├── package.json               # Dependencies
└── vite.config.ts            # Vite configuration
```

## Key Features

### Developer Tools Collection

32+ developer tools organized into 4 categories:

- **Text & Data Processing**: JSON parser, text case converter, character counter
- **Generators & Converters**: QR code generator, color converter, password generator
- **Web Development**: URL encoder, HTML encoder, CSS minifier
- **Utilities & Calculators**: Age calculator, BMI calculator, unit converter

### Design System

- Custom CSS variables with semantic naming (--ds-primary-500, --ds-success-500)
- Dark mode support with consistent theming
- Component-based styling classes (.btn, .input, .textarea, .select)
- Responsive design with mobile-first approach

### Routing & Navigation

- Client-side routing with custom router implementation
- Dynamic routes for blog posts and tools
- Breadcrumb navigation for better UX

## Code Architecture

### Svelte 5 Features

- Modern Svelte syntax with runes ($state, $derived)
- TypeScript integration throughout the application
- Reactive state management

### Component Organization

- Modular component structure
- Shared design system across all pages
- Consistent icon usage with Lucide
- Reusable UI patterns

### Configuration Management

- Centralized tools configuration in TypeScript
- Type-safe interfaces for tool definitions
- Helper functions for tool management

## Design Patterns Used

### Color Theming

- Contextual colors based on tool categories:
  - Primary colors for general tools
  - Success colors for generators
  - Danger colors for security-related tools
  - Warning colors for utilities

### UI Components

- Consistent button styling with hover effects
- Form elements with proper focus states
- Card layouts with shadows and borders
- Responsive grid systems

### Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Proper semantic HTML structure
- Focus management for interactive elements

## Development Guidelines

### Styling Approach

1. Use Tailwind classes for layout
2. Custom CSS variables for theming
3. Component classes from app.css
4. Consistent spacing and typography

### File Organization

1. Pages in /src/pages/
2. Components in /src/components/
3. Utilities in /src/lib/
4. Static assets in /static/

### Code Standards

1. TypeScript for type safety
2. Svelte 5 modern syntax
3. Consistent naming conventions
4. Proper error handling

## Deployment & Build

- Vite build system optimized for production
- GitHub Pages deployment
- Static site generation
- Asset optimization and minification

## Important Notes

- No Git commands that modify the repository
- Focus on maintaining functionality while updating design
- Consistent use of design system variables
- Mobile-responsive design is essential
- Dark mode support across all components

## Recent Improvements

1. Unified design system across all tools
2. Centralized tools configuration
3. Improved accessibility features
4. Compact list layout for tools navigation
5. Consistent CSS class usage throughout the application

This project demonstrates modern web development practices with Svelte, TypeScript, and Tailwind CSS, creating a maintainable and scalable portfolio website with useful developer tools.
