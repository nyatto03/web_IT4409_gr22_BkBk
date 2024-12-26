import './navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            localStorage.clear();
            await navigate('/');
            window.location.replace('/'); // Force page reload and navigation
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <span onClick={() => navigate('/customer')}>BKBK PREMIUM</span>
                </div>
                <div className="nav-infor">
                    <ul>
                        <li>
                            <a
                                href="/customer" // Added href here
                                className={location.pathname === '/customer' ? 'active' : ''}
                            >
                                Tìm phòng
                            </a>
                        </li>
                        <li>
                            <a
                                href="/history" // Added href here
                                className={location.pathname === '/history' ? 'active' : ''}
                            >
                                Lịch sử đặt phòng
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile" // Added href here
                                className={location.pathname === '/profile' ? 'active' : ''}
                            >
                                Thông tin cá nhân
                            </a>
                        </li>
                    </ul>
                    <button className="logout-btn" onClick={() => handleLogout()}>
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
