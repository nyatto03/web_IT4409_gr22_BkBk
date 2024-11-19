import AdminPage from '../pages/AdminPage';
import AssistantPage from '../pages/AssistantPage';
import CustomerPage from '../pages/CustomerPage';
import ForbiddenPage from '../pages/ForbiddenPage';

const protectedRoutes = [
  {
    path: '/admin',
    element: <AdminPage />,
    requiresAuth: true,
    requiredRole: 'admin',
  },
  {
    path: '/assistant',
    element: <AssistantPage />,
    requiresAuth: true,
    requiredRole: 'assistant',
  },
  {
    path: '/customer',
    element: <CustomerPage />,
    requiresAuth: true,
    requiredRole: 'customer',
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
    requiresAuth: true,
  }
];

export default protectedRoutes;