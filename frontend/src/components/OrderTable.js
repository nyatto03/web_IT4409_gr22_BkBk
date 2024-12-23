import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import apiClient from '../utils/axiosConfig';

// Utility function to format dates
const formatDate = (date) => {
  if (!date) return 'N/A'; // Trả về N/A nếu không có ngày
  return new Date(date).toLocaleString();
};

// Utility function to calculate total price
const calculateTotalPrice = (price, checkinDate, checkoutDate) => {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);
  const days = (checkout - checkin) / (1000 * 60 * 60 * 24); // Số ngày
  return price * days;
};

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders');
      const updatedOrders = response.data.orders.map((order) => ({
        ...order,
        total_price: calculateTotalPrice(order.room_id.price, order.checkin_date, order.checkout_date), // Tính tổng giá
      }));
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (user) => user?.name || 'N/A', // Hiển thị tên người dùng
    },
    {
      title: 'Room Description',
      dataIndex: 'room_id',
      key: 'room_id',
      render: (room) => room?.description || 'N/A', // Hiển thị mô tả phòng
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Check-in Date',
      dataIndex: 'checkin_date',
      key: 'checkin_date',
      render: formatDate,
    },
    {
      title: 'Check-out Date',
      dataIndex: 'checkout_date',
      key: 'checkout_date',
      render: formatDate,
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `${price?.toLocaleString()} VND`, // Hiển thị giá theo định dạng tiền tệ
    },
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
