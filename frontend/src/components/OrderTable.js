import React, { useEffect, useState } from 'react';
import { Table, Select, message } from 'antd';
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
    const [loading, setLoading] = useState(false);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const response = await apiClient.get('/orders');
            const updatedOrders = response.data.orders
                .map((order) => ({
                    ...order,
                    total_price: calculateTotalPrice(order.room_id.price, order.checkin_date, order.checkout_date), // Tính tổng giá
                }))
                .reverse();
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus, currentStatus) => {
        setLoading(true);
        try {
            // Kiểm tra nếu trạng thái hiện tại là pending hoặc approved, chỉ cho phép chuyển sang các trạng thái hợp lệ
            if (currentStatus === 'pending') {
                if (newStatus !== 'approved' && newStatus !== 'canceled') {
                    return message.error('Chỉ có thể chuyển từ pending sang approved hoặc canceled.');
                }
            } else if (currentStatus === 'approved') {
                if (newStatus !== 'paid' && newStatus !== 'canceled') {
                    return message.error('Chỉ có thể chuyển từ approved sang paid hoặc canceled.');
                }
            }

            // Cập nhật trạng thái đơn đặt phòng
            const response = await apiClient.put(`/orders/${orderId}`, { status: newStatus });
            message.success(response.data.message); // Hiển thị thông báo thành công

            // Cập nhật lại danh sách đơn sau khi cập nhật trạng thái
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)),
            );
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái.');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (user) => user?.name || 'N/A', // Hiển thị tên người dùng
        },
        {
            title: 'Room Name',
            dataIndex: 'room_id',
            key: 'room_id',
            render: (room) => room?.name || 'N/A', // Hiển thị mô tả phòng
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
            render: (status, record) => (
                <Select
                    value={status}
                    onChange={(newStatus) => handleUpdateStatus(record._id, newStatus, status)}
                    loading={loading}
                    style={{ width: 120 }}
                >
                    {/* Chỉ hiển thị các lựa chọn trạng thái hợp lệ dựa trên trạng thái hiện tại */}
                    {status === 'pending' && (
                        <>
                            <Select.Option value="approved">Approved</Select.Option>
                            <Select.Option value="canceled">Canceled</Select.Option>
                        </>
                    )}
                    {status === 'approved' && (
                        <>
                            <Select.Option value="paid">Paid</Select.Option>
                            <Select.Option value="canceled">Canceled</Select.Option>
                        </>
                    )}
                    {/* Các trạng thái khác không cho phép chuyển */}
                </Select>
            ),
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
            className="custom-table"
            dataSource={orders}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            bordered
        />
    );
};

export default OrderTable;
