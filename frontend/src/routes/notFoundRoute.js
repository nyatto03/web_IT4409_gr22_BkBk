import NotFoundPage from '../pages/NotFoundPage';

const notFoundRoute = [
  {
    path: '*',
    element: <NotFoundPage />,
    requiresAuth: false,
  },
];

export default notFoundRoute;