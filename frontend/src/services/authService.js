import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/auth';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // Return user and token data
  } catch (error) {
    console.error('Login request failed:', error);
    throw error;
  }
};

const register = async (name, email, password, phone, address) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      phone,
      address
    });
    return response.data; // Return user data on successful registration
  } catch (error) {
    console.error('Registration request failed:', error);
    throw error;
  }
};

const authService = {
  login,
  register,
};

export default authService;
