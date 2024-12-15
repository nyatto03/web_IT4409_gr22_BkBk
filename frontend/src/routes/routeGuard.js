import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RouteGuard = ({ element, requiresAuth, requiredRole, guestOnly }) => {
  const { user } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const currentUser = user || storedUser;

  // Định nghĩa các đường dẫn mặc định theo vai trò
  const roleBasedRedirects = {
    admin: '/admin',
    assistant: '/assistant',
    customer: '/customer',
  };

  // Nếu route chỉ dành cho khách và người dùng đã đăng nhập
  if (guestOnly && currentUser) {
    const redirectPath = roleBasedRedirects[currentUser.role] || '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Nếu route yêu cầu xác thực nhưng người dùng chưa đăng nhập
  if (requiresAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Nếu route yêu cầu vai trò cụ thể nhưng người dùng không có quyền
  if (requiresAuth && requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return element;
};

export default RouteGuard;
