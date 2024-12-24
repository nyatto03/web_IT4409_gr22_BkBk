import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';
const API_URL = 'http://localhost:8080/api';
console.log('API_URL:', API_URL);

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
        console.log('AuthService register request:', {
            url: `${API_URL}/auth/register`,
            data: { name, email, phone, address },
        });
        const response = await axios.post(`${API_URL}/auth/register`, {
            name,
            email,
            password,
            phone,
            address,
        });
        console.log('🚀 ~ register ~ response:', response.data);
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
