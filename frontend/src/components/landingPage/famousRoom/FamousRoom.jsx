import './famousRoom.css';
import { useNavigate } from 'react-router-dom';

const FamousRoom = () => {
    const navigate = useNavigate();
    return (
        <div className="room">
            <div className="room-container">
                <p className="title">Phòng nổi bật</p>
                <div className="cards">
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng cao cấp</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>2.000.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng giá rẻ</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>1.000.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng đơn</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>1.500.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng đôi</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>2.500.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng trống</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>2.000.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <div className="card-front">
                                <button>Phòng vip</button>
                            </div>
                            <div className="card-back">
                                <div className="room-price">
                                    <p>3.000.000đ/Ngày</p>
                                </div>
                                <div className="card-content">
                                    <h3>Phòng cao cấp</h3>
                                    <p>-View đẹp</p>
                                    <p>-Vệ sinh phòng hàng ngày</p>
                                    <p>-Wifi</p>
                                    <p>-Bãi đỗ xe</p>
                                    <p>-Đồ uống tại phòng</p>
                                </div>
                                <div className="booknow">
                                    <button onClick={() => navigate('/login')}>Đặt phòng ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamousRoom;
