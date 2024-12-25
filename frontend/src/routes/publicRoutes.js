import LandingPage from '../pages/landingPage/LandingPage';
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
        guestOnly: true,
    },
    {
        path: '/register',
        element: <RegisterPage />,
        requiresAuth: false,
        guestOnly: true,
    },
];

export default publicRoutes;
