import { mainRoutes } from './main';
import { toolsRoutes } from './tools';

export { mainRoutes, toolsRoutes };

// Combine all routes for the router
export const allRoutes = [...mainRoutes, ...toolsRoutes];

// Export routes by category
export const routesByCategory = {
  main: mainRoutes,
  tools: toolsRoutes,
  all: allRoutes
};
