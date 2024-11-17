import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AssistantPage from './pages/AssistantPage';
import CustomerPage from './pages/CustomerPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import NotFoundPage from './pages/NotFoundPage'; // Import trang NotFoundPage

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Trang LandingPage không cần bảo vệ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Các trang cần phải đăng nhập mới có thể vào */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPage />} />}
        />
        <Route
          path="/assistant"
          element={<ProtectedRoute element={<AssistantPage />} />}
        />
        <Route
          path="/customer"
          element={<ProtectedRoute element={<CustomerPage />} />}
        />

        {/* Route fallback cho các route không hợp lệ */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
