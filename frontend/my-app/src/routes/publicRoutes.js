import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const publicRoutes = [
  {
    path: '/',
    element: <LandingPage />,
    requiresAuth: false,
  },
  {
    path: '/login',
    element: <LoginPage />,
    requiresAuth: false,
    guestOnly: true, // Chỉ dành cho người dùng chưa đăng nhập
  },
  {
    path: '/register',
    element: <RegisterPage />,
    requiresAuth: false,
    guestOnly: true, // Chỉ dành cho người dùng chưa đăng nhập
  },
];

export default publicRoutes;
