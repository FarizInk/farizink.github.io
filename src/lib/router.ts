import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export interface Route {
  path: string;
  component: Component<any>;
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
}

export interface RouterState {
  currentPath: string;
  currentRoute: Route | null;
  params: Record<string, string>;
}

// Router store (backward compatibility)
export const router = writable<RouterState>({
  currentPath: '/',
  currentRoute: null,
  params: {}
});

// Current router state for direct access
let currentRouterState: RouterState = {
  currentPath: '/',
  currentRoute: null,
  params: {}
};

// Subscribe and update local state
router.subscribe(state => {
  currentRouterState = state;
});

// Export current state getter
export function getCurrentRouterState(): RouterState {
  return currentRouterState;
}

let routes: Route[] = [];

// Initialize the router
export function createRouter(routeList: Route[]) {
  routes = routeList;

  // Handle GitHub Pages SPA redirect hack
  (function (l) {
    if (l.search[1] === '/') {
      const decoded = l.search
        .slice(1)
        .split('&')
        .map(function (s) {
          return s.replace(/~and~/g, '&');
        })
        .join('?');
      window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash);
    }
  })(window.location);

  // Handle initial load
  handleLocationChange();

  // Listen for browser navigation
  window.addEventListener('popstate', handleLocationChange);

  return router;
}

// Navigate to a new path
export function navigate(path: string) {
  console.log('Navigate function called with:', path);
  console.log('Current path before navigation:', getCurrentPath());

  if (path !== getCurrentPath()) {
    window.history.pushState({}, '', path);
    handleLocationChange();
  } else {
    console.log('Path is the same, not navigating');
  }
}

// Get current path
function getCurrentPath(): string {
  return window.location.pathname;
}

// Update meta tags for social media sharing and SEO
function updateMetaTags(route: Route) {
  if (route?.title) {
    document.title = route.title;

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');

    if (ogTitle) ogTitle.setAttribute('content', route.title);
    if (twitterTitle) twitterTitle.setAttribute('content', route.title);
  }

  if (route?.description) {
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const metaDescription = document.querySelector('meta[name="description"]');

    if (ogDescription) ogDescription.setAttribute('content', route.description);
    if (twitterDescription) twitterDescription.setAttribute('content', route.description);
    if (metaDescription) metaDescription.setAttribute('content', route.description);
  }

  // Update keywords
  if (route?.keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', route.keywords);
  }

  // Update robots directive
  if (route?.robots) {
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) metaRobots.setAttribute('content', route.robots);
  }

  // Update canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', `https://farizink.github.io${route.path}`);
  }

  // Update Open Graph URL
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://farizink.github.io${route.path}`);
  }
}

// Handle location changes
function handleLocationChange() {
  const currentPath = getCurrentPath();
  console.log('handleLocationChange called with path:', currentPath);

  const matchedRoute = findMatchingRoute(currentPath);
  const params = extractParams(currentPath, matchedRoute);

  console.log('Matched route:', matchedRoute?.path || 'null');

  // Update document title and meta tags if route has them
  if (matchedRoute) {
    updateMetaTags(matchedRoute);
  }

  router.set({
    currentPath,
    currentRoute: matchedRoute,
    params
  });
}

// Find matching route
function findMatchingRoute(path: string): Route | null {
  console.log('Available routes:', routes.map(r => r.path));
  console.log('Checking path:', path);

  for (const route of routes) {
    if (isRouteMatch(path, route.path)) {
      console.log('Found matching route:', route.path);
      return route;
    }
  }
  console.log('No matching route found');
  return null;
}

// Check if path matches route pattern
function isRouteMatch(path: string, pattern: string): boolean {
  const pathSegments = path.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);

  if (pathSegments.length !== patternSegments.length) {
    return false;
  }

  return patternSegments.every((segment, index) => {
    return segment.startsWith(':') || segment === pathSegments[index];
  });
}

// Extract parameters from path
function extractParams(path: string, route: Route | null): Record<string, string> {
  if (!route) return {};

  const pathSegments = path.split('/').filter(Boolean);
  const routeSegments = route.path.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      params[paramName] = pathSegments[index] || '';
    }
  });

  return params;
}

// Clean up function
export function destroyRouter() {
  window.removeEventListener('popstate', handleLocationChange);
}
