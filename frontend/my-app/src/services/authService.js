//service/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users'; // Địa chỉ API backend của bạn

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Trả về thông tin user và token
};

const register = async (name, email, password, phone, address) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    phone,
    address
  });
  return response.data; // Trả về thông tin user và token
};

// Gán đối tượng vào biến trước khi xuất khẩu
const authService = {
  login,
  register
};

export default authService;
