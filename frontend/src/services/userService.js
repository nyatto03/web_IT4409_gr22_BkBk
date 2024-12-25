import apiClient from "../utils/axiosConfig";

export const updateUserRole = async (userId, newRole) => {
    try {
        // Gửi request PUT tới endpoint cập nhật role
        const response = await apiClient.put(`/users/${userId}`, { role: newRole });

        // Trả về dữ liệu user sau khi cập nhật
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về message lỗi
        console.error('Error updating user role:', error);
        throw error.response?.data || { message: 'Lỗi khi cập nhật vai trò người dùng' };
    }
};
