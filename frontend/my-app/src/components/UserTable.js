// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import apiClient from '../utils/axiosConfig'; // Import apiClient from axiosConfig

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Use apiClient instead of axios
    apiClient.get('/users') // Use the base URL from axiosConfig
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default UserTable;
