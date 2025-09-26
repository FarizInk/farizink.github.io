import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export interface Route {
  path: string;
  component: Component<any>;
  title?: string;
}

export interface RouterState {
  currentPath: string;
  currentRoute: Route | null;
  params: Record<string, string>;
}

// Router store
export const router = writable<RouterState>({
  currentPath: '/',
  currentRoute: null,
  params: {}
});

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
  if (path !== getCurrentPath()) {
    window.history.pushState({}, '', path);
    handleLocationChange();
  }
}

// Get current path
function getCurrentPath(): string {
  return window.location.pathname;
}

// Handle location changes
function handleLocationChange() {
  const currentPath = getCurrentPath();
  const matchedRoute = findMatchingRoute(currentPath);
  const params = extractParams(currentPath, matchedRoute);

  // Update document title if route has one
  if (matchedRoute?.title) {
    document.title = matchedRoute.title;
  }

  router.set({
    currentPath,
    currentRoute: matchedRoute,
    params
  });
}

// Find matching route
function findMatchingRoute(path: string): Route | null {
  for (const route of routes) {
    if (isRouteMatch(path, route.path)) {
      return route;
    }
  }
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
