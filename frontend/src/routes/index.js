import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';
import notFoundRoute from './notFoundRoute';
import RouteGuard from './routeGuard';

const routesConfig = [
    ...publicRoutes.map((route) => ({
        ...route,
        element: <RouteGuard {...route} element={route.element} />,
    })),
    ...protectedRoutes.map((route) => ({
        ...route,
        element: <RouteGuard {...route} element={route.element} />,
    })),
    ...notFoundRoute,
];

export default routesConfig;
