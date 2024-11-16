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
      navigate('/user'); // Redirect user tới trang user (hoặc trang phù hợp)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (name, email, password, phone, address) => {
    try {
      const data = await authService.register(name, email, password, phone, address);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/user');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
