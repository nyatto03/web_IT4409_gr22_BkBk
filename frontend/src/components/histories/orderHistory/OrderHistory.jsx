import { getOrders } from '../../../apis';
import OrderItem from '../orderItem/orderItem';
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';

const OrderHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const [userOrders, setUserOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await getOrders();
        return res;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                const { orders } = await fetchOrders();

                // Filter orders for current user
                const userBookings = orders.filter((order) => order.user_id._id === userData._id);
                // Map to array of order details including room info
                const orderDetails = userBookings.map((order) => ({
                    _id: order._id,
                    room: order.room_id,
                    checkin_date: order.checkin_date,
                    checkout_date: order.checkout_date,
                    status: order.status,
                }));
                setUserOrders(orderDetails);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchData();
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userOrders.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listResult">
                    {currentItems.map((order, index) => (
                        <OrderItem
                            key={order._id}
                            room={order.room}
                            checkinDate={order.checkin_date}
                            checkoutDate={order.checkout_date}
                            orderStatus={order.status}
                        />
                    ))}
                    <Pagination
                        current={currentPage}
                        total={userOrders.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
