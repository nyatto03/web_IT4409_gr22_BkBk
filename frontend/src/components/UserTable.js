import React, { useEffect, useState } from 'react';
import { Table, Select, Input, Button, message, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import apiClient from '../utils/axiosConfig';
import { updateUserRole } from '../services/userService'; 

const { Option } = Select;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    apiClient.get('/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Khởi tạo filteredUsers
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = () => {
    const filteredData = users.filter(
      (user) =>
        (user.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
         user.email.toLowerCase().includes(searchKeyword.toLowerCase())) &&
        (roleFilter ? user.role === roleFilter : true)
    );
    setFilteredUsers(filteredData);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleUpdateRole = async (userId, newRole) => {
    setLoading(true);
    setEditingUser(userId); 
    try {
      const result = await updateUserRole(userId, newRole);
      message.success(result.message); 
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
      setEditingUser(null);
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
          loading={editingUser === record._id && loading} 
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
        <Row gutter={16}>
          <Col>
            <Input
              placeholder="Search by name or email"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật từ khóa tìm kiếm
              style={{ width: 300 }}
            />
          </Col>
          <Col>
            <Select
              placeholder="Filter by role"
              value={roleFilter}
              onChange={(value) => setRoleFilter(value)} 
              style={{ width: 200, marginLeft: 10 }}
            >
              <Option value="">All</Option>
              <Option value="customer">Customer</Option>
              <Option value="assistant">Assistant</Option>
            </Select>
          </Col>
          <Col>
            <Button
              type="default"
              icon={<SearchOutlined />}
              onClick={handleSearch} // Chỉ tìm kiếm khi click nút Search
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        className="custom-table"
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 10, align: "end" }}
      />
    </div>
  );
};

export default UserTable;
