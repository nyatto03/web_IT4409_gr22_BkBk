import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RouteGuard = ({ element, requiresAuth, requiredRole, guestOnly }) => {
    const { user } = useAuth();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = user || storedUser;

    const roleBasedRedirects = {
        admin: '/admin',
        assistant: '/assistant',
        customer: '/customer',
    };

    if (guestOnly && currentUser) {
        const redirectPath = roleBasedRedirects[currentUser.role] || '/';
        return <Navigate to={redirectPath} replace />;
    }

    if (requiresAuth && !currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requiresAuth && requiredRole && currentUser.role !== requiredRole) {
        return <Navigate to="/forbidden" replace />;
    }

    return element;
};

export default RouteGuard;
