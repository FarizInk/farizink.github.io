import { mainRoutes } from './main.js';
import { toolsRoutes } from './tools.js';

export { mainRoutes, toolsRoutes };

// Combine all routes for the router
export const allRoutes = [...mainRoutes, ...toolsRoutes];

// Export routes by category
export const routesByCategory = {
  main: mainRoutes,
  tools: toolsRoutes,
  all: allRoutes
};