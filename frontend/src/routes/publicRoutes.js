import LandingPage from '../pages/landingPage/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AllRoom from '../pages/allRooms/AllRoom';

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
    {
        path: '/allrooms',
        element: <AllRoom />,
        requiresAuth: false,
    },
];

export default publicRoutes;
