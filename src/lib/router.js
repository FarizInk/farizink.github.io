import { writable } from 'svelte/store';
// Router store
export const router = writable({
    currentPath: '/',
    currentRoute: null,
    params: {}
});
let routes = [];
// Initialize the router
export function createRouter(routeList) {
    routes = routeList;
    // Handle GitHub Pages SPA redirect hack
    (function (l) {
        if (l.search[1] === '/') {
            var decoded = l.search.slice(1).split('&').map(function (s) {
                return s.replace(/~and~/g, '&');
            }).join('?');
            window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash);
        }
    }(window.location));
    // Handle initial load
    handleLocationChange();
    // Listen for browser navigation
    window.addEventListener('popstate', handleLocationChange);
    return router;
}
// Navigate to a new path
export function navigate(path) {
    if (path !== getCurrentPath()) {
        window.history.pushState({}, '', path);
        handleLocationChange();
    }
}
// Get current path
function getCurrentPath() {
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
function findMatchingRoute(path) {
    for (const route of routes) {
        if (isRouteMatch(path, route.path)) {
            return route;
        }
    }
    return null;
}
// Check if path matches route pattern
function isRouteMatch(path, pattern) {
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
function extractParams(path, route) {
    if (!route)
        return {};
    const pathSegments = path.split('/').filter(Boolean);
    const routeSegments = route.path.split('/').filter(Boolean);
    const params = {};
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
//# sourceMappingURL=router.js.map