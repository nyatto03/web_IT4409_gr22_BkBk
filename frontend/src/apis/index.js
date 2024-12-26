import axios from 'axios';
const API_URL = 'http://localhost:8080/api';
export const getAllRoom = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/rooms`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('call api get all rooms failed:', error);
        throw error;
    }
};

export const orderRoom = async (user_id, room_id, status, total_price, checkin_date, checkout_date) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/orders`,
            {
                user_id,
                room_id,
                status,
                total_price,
                checkin_date,
                checkout_date,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('call api get all rooms failed:', error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('call api get all rooms failed:', error);
        throw error;
    }
};

export const getRoom = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/rooms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('call api get all rooms failed:', error);
        throw error;
    }
};

export const editUser = async (updateData) => {
    console.log('🚀 ~ editUser ~ updateData:', updateData);
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/users/userId/${updateData.id}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('call api get all rooms failed:', error);
        throw error;
    }
};
