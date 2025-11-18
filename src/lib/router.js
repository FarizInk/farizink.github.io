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
// Update meta tags for social media sharing and SEO
function updateMetaTags(route) {
    if (route?.title) {
        document.title = route.title;
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (ogTitle)
            ogTitle.setAttribute('content', route.title);
        if (twitterTitle)
            twitterTitle.setAttribute('content', route.title);
    }
    if (route?.description) {
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (ogDescription)
            ogDescription.setAttribute('content', route.description);
        if (twitterDescription)
            twitterDescription.setAttribute('content', route.description);
        if (metaDescription)
            metaDescription.setAttribute('content', route.description);
    }
    // Update keywords
    if (route?.keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords)
            metaKeywords.setAttribute('content', route.keywords);
    }
    // Update robots directive
    if (route?.robots) {
        const metaRobots = document.querySelector('meta[name="robots"]');
        if (metaRobots)
            metaRobots.setAttribute('content', route.robots);
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
    const matchedRoute = findMatchingRoute(currentPath);
    const params = extractParams(currentPath, matchedRoute);
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