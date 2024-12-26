import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col, Typography, Select, Button, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import apiClient from '../utils/axiosConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Utility function to calculate total price
const calculateTotalPrice = (price, checkinDate, checkoutDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const days = (checkout - checkin) / (1000 * 60 * 60 * 24);
    return price * days;
};

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [orderCount, setOrderCount] = useState(0); // Track number of orders
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders from API
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/orders');
            const updatedOrders = response.data.orders
                .map((order) => ({
                    ...order,
                    total_price: calculateTotalPrice(order.room_id.price, order.checkin_date, order.checkout_date), // Calculate total price
                }))
                .reverse();

            setOrders(updatedOrders);
            calculateTotalRevenue(updatedOrders); // Calculate total revenue after fetching orders
            generateChartData(updatedOrders); // Generate chart data for revenue by date
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Calculate total revenue and number of orders
    const calculateTotalRevenue = (orders) => {
        const revenue = orders.reduce((sum, order) => sum + order.total_price, 0);
        setTotalRevenue(revenue);
        setOrderCount(orders.length); // Set the number of orders
    };

    // Generate chart data for revenue over time (by month for example)
    const generateChartData = (orders) => {
        const groupedByMonth = orders.reduce((acc, order) => {
            const month =
                new Date(order.checkin_date).toLocaleString('default', { month: 'short' }) +
                ' ' +
                new Date(order.checkin_date).getFullYear();
            if (!acc[month]) acc[month] = 0;
            acc[month] += order.total_price;
            return acc;
        }, {});

        const chartData = Object.keys(groupedByMonth).map((month) => ({
            month,
            revenue: groupedByMonth[month],
        }));
        setChartData(chartData);
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]); // Add fetchOrders to the dependency array

    const handleFilterChange = () => {
        const filteredData = orders.filter(
            (order) => (statusFilter ? order.status === statusFilter : true),
        );
        setOrders(filteredData);
        calculateTotalRevenue(filteredData);
        generateChartData(filteredData);
    };

    return (
        <div>
            {loading ? <Spin size="large" /> : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '24px' }}>
                        <div>
                            <Select
                                placeholder="Filter by status"
                                value={statusFilter}
                                onChange={(value) => setStatusFilter(value)}
                                style={{ width: 200 }}
                            >
                                <Select.Option value="">All</Select.Option>
                                <Select.Option value="pending">Pending</Select.Option>
                                <Select.Option value="approved">Approved</Select.Option>
                                <Select.Option value="paid">Paid</Select.Option>
                                <Select.Option value="canceled">Canceled</Select.Option>
                            </Select>
                        </div>

                        <div style={{ marginLeft: '14px' }}>
                            <Button type="default" icon={<SearchOutlined />} onClick={handleFilterChange}>
                                Filter
                            </Button>
                        </div>
                    </div>

                    <Row gutter={16}>
                        {/* Total Revenue and Order Count */}
                        <Col span={8}>
                            <Card title="Total Revenue" bordered>
                                <Typography.Title level={3}>{totalRevenue.toLocaleString()} VND</Typography.Title>
                                <Typography.Paragraph>
                                    <strong>{orderCount} Orders</strong>
                                </Typography.Paragraph>
                            </Card>
                        </Col>

                        {/* Revenue Chart */}
                        <Col span={16}>
                            <Card title="Revenue by Month" bordered>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Dashboard;
