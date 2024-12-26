import Navbar from '../../components/allRooms/navbar/Navbar';
import OrderHistory from '../../components/histories/orderHistory/OrderHistory';

const HistoryPage = () => {
    return (
        <div className="all-room">
            <Navbar />
            <OrderHistory />
        </div>
    );
};

export default HistoryPage;
