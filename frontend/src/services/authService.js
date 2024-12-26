import apiClient from "../utils/axiosConfig";

const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data; // Return user and token data
    } catch (error) {
        console.error('Login request failed:', error);
        throw error;
    }
};

const register = async (name, email, password, phone, address) => {
    try {
        console.log('AuthService register request:', {
            url: '/auth/register',
            data: { name, email, phone, address },
        });
        const response = await apiClient.post('/auth/register', {
            name,
            email,
            password,
            phone,
            address,
        });
        console.log('🚀 ~ register ~ response:', response.data);
        return response.data;
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
