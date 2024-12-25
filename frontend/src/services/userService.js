import apiClient from "../utils/axiosConfig";

export const updateUserRole = async (userId, newRole) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, { role: newRole });

        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error.response?.data || { message: 'Lỗi khi cập nhật vai trò người dùng' };
    }
};
