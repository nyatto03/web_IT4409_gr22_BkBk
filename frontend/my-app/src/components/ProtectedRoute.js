// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute nhận component và các props route như path, element
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  // Kiểm tra nếu người dùng chưa đăng nhập (user == null) thì chuyển hướng về trang đăng nhập
  if (!user) {
    return <Navigate to="/login" />;
  }

  return element; // Nếu đã đăng nhập, hiển thị component tương ứng
};

export default ProtectedRoute;
