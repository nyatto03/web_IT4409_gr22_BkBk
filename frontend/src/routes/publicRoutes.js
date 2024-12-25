import LandingPage from '../pages/landingPage/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
// import CustomerPage from '../pages/CustomerPage/CustomerPage';

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
    // {
    //     path: '/allrooms',
    //     element: <CustomerPage />,
    //     requiresAuth: false,
    // },
];

export default publicRoutes;
