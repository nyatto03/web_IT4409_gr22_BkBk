import React, { useEffect, useState } from 'react';
import { Table, Select, Input, Button, message, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import apiClient from '../utils/axiosConfig';

// Utility function to format dates
const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
};

// Utility function to calculate total price
const calculateTotalPrice = (price, checkinDate, checkoutDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const days = (checkout - checkin) / (1000 * 60 * 60 * 24); 
    return price * days;
};

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

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
            setFilteredOrders(updatedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSearch = () => {
        const filteredData = orders.filter(
            (order) =>
                (order.user_id?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                order.room_id?.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                order.room_id?.description?.toLowerCase().includes(searchKeyword.toLowerCase())) &&
                (statusFilter ? order.status === statusFilter : true)
        );
        setFilteredOrders(filteredData);
    };

    const handleUpdateStatus = async (orderId, newStatus, currentStatus) => {
        setLoading(true);
        try {
            if (currentStatus === 'pending') {
                if (newStatus !== 'approved' && newStatus !== 'canceled') {
                    return message.error('Chỉ có thể chuyển từ pending sang approved hoặc canceled.');
                }
            } else if (currentStatus === 'approved') {
                if (newStatus !== 'paid' && newStatus !== 'canceled') {
                    return message.error('Chỉ có thể chuyển từ approved sang paid hoặc canceled.');
                }
            }

            const response = await apiClient.put(`/orders/${orderId}`, { status: newStatus });
            message.success(response.data.message);

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
            render: (price) => `${price?.toLocaleString()} USD`,
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                <Row gutter={16}>
                    <Col>
                        <Input
                            placeholder="Search by user name or room name"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            style={{ width: 300 }}
                        />
                    </Col>
                    <Col>
                        <Select
                            placeholder="Filter by status"
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)} 
                            style={{ width: 200, marginLeft: 10 }}
                        >
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="approved">Approved</Select.Option>
                            <Select.Option value="paid">Paid</Select.Option>
                            <Select.Option value="canceled">Canceled</Select.Option>
                        </Select>
                    </Col>
                    <Col>
                        <Button
                            type="default"
                            icon={<SearchOutlined />}
                            onClick={handleSearch} 
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table
                className="custom-table"
                dataSource={filteredOrders}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                bordered
            />
        </div>
    );
};

export default OrderTable;
