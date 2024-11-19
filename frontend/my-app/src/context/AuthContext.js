import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      localStorage.setItem('token', data.token); // Lưu JWT vào localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Lưu thông tin người dùng vào localStorage

      // Kiểm tra và chuyển hướng dựa trên role của người dùng
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else if (data.user.role === 'assistant') {
        navigate('/assistant');
      } else if (data.user.role === 'customer') {
        navigate('/customer');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;  // Quan trọng: ném lỗi để `LoginPage` có thể xử lý
    }
  };

  const register = async (name, email, password, phone, address) => {
    try {
      await authService.register(name, email, password, phone, address); // Không cần lưu kết quả vào data
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = (redirectPath = '/login') => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(redirectPath);
  };
  

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
