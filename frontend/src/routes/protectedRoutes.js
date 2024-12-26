import AdminPage from '../pages/AdminPage';
import AssistantPage from '../pages/AssistantPage';
import CustomerPage from '../pages/customerPage/CustomerPage';
import ForbiddenPage from '../pages/ForbiddenPage';
import HistoryPage from '../pages/historyPage/HistoryPage';
import RoomPage from '../pages/roomPage/RoomPage';
import ProfilePage from '../pages/profilePage/ProfilePage';

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
        path: '/history',
        element: <HistoryPage />,
        requiresAuth: true,
        requiredRole: 'customer',
    },
    {
        path: '/room/:roomId',
        element: <RoomPage />,
        requiresAuth: true,
        requiredRole: 'customer',
    },
    {
        path: '/profile',
        element: <ProfilePage />,
        requiresAuth: true,
        requiredRole: 'customer',
    },
    {
        path: '/forbidden',
        element: <ForbiddenPage />,
        requiresAuth: true,
    },
];

export default protectedRoutes;
