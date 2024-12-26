import apiClient from "../utils/axiosConfig";

// Lấy tất cả các phòng
export const getAllRoom = async () => {
    try {
        const response = await apiClient.get('/rooms');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all rooms:', error);
        throw error;
    }
};

// Đặt phòng
export const orderRoom = async (user_id, room_id, status, total_price, checkin_date, checkout_date) => {
    try {
        const response = await apiClient.post('/orders', {
            user_id,
            room_id,
            status,
            total_price,
            checkin_date,
            checkout_date,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to order room:', error);
        throw error;
    }
};

// Lấy danh sách đặt phòng
export const getOrders = async () => {
    try {
        const response = await apiClient.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw error;
    }
};

// Lấy chi tiết phòng
export const getRoom = async (id) => {
    try {
        const response = await apiClient.get(`/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch room with ID ${id}:`, error);
        throw error;
    }
};

// Chỉnh sửa thông tin người dùng
export const editUser = async (updateData) => {
    console.log('🚀 ~ editUser ~ updateData:', updateData);
    try {
        const response = await apiClient.put(`/users/userId/${updateData.id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Failed to edit user with ID ${updateData.id}:`, error);
        throw error;
    }
};
