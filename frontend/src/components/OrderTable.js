// src/components/OrderTable.js
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

// Utility function to format dates
const formatDate = (date) => new Date(date).toLocaleString();

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { title: 'User', dataIndex: 'user_id', key: 'user_id', render: user => user.name },
    { title: 'Room', dataIndex: 'room_id', key: 'room_id', render: room => room.name },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Booking Date', dataIndex: 'booking_date', key: 'booking_date', render: formatDate },
    { title: 'Check-in Date', dataIndex: 'checkin_date', key: 'checkin_date', render: formatDate },
    { title: 'Check-out Date', dataIndex: 'checkout_date', key: 'checkout_date', render: formatDate },
    { title: 'Total Price', dataIndex: 'total_price', key: 'total_price' },
  ];

  return (
    <Table
      dataSource={orders}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default OrderTable;
