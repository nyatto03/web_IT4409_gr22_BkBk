import React, { useEffect, useState } from 'react';
import { Table, Select, Button, message } from 'antd';
import apiClient from '../utils/axiosConfig'; // Import apiClient đã cấu hình
import { updateUserRole } from '../services/userService'; // Import hàm cập nhật role

const { Option } = Select;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // User đang chỉnh sửa

  useEffect(() => {
    // Lấy danh sách người dùng từ API
    apiClient.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    // Cập nhật role của user trong state tạm thời
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleUpdateRole = async (userId, newRole) => {
    setLoading(true);
    setEditingUser(userId); // Đánh dấu user đang chỉnh sửa
    try {
      const result = await updateUserRole(userId, newRole);
      message.success(result.message); // Hiển thị thông báo thành công
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Error updating user role:', error);
      message.error(error.message || 'Lỗi khi cập nhật vai trò.');
    } finally {
      setLoading(false);
      setEditingUser(null); // Xóa đánh dấu user đang chỉnh sửa
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { 
      title: 'Role', 
      dataIndex: 'role', 
      key: 'role',
      render: (role, record) => (
        <Select
          value={role}
          onChange={(newRole) => handleRoleChange(record._id, newRole)}
          style={{ width: 120 }}
        >
          <Option value="customer">Customer</Option>
          <Option value="assistant">Assistant</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleUpdateRole(record._id, record.role)}
          loading={editingUser === record._id && loading} // Hiển thị trạng thái loading
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Table
     className="custom-table"
      dataSource={users}
      columns={columns}
      rowKey="_id"
      bordered
      pagination={{ pageSize: 10, align: "end" }}
    />
  );
};

export default UserTable;
