import './navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <span>BKBK PREMIUM</span>
                </div>
                <div className="nav-infor">
                    <ul>
                        <li>
                            <a
                                className={location.pathname === '/customer' ? 'active' : ''}
                                onClick={() => navigate('/customer')}
                            >
                                Tìm phòng
                            </a>
                        </li>
                        <li>
                            <a href="#">Lịch sử đặt phòng</a>
                        </li>
                        <li>
                            <a href="#">Thông tin cá nhân</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
