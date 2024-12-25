import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Navbar = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('home');
    useEffect(() => {
        const options = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);
    return (
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <a href="#home">
                        <span>BKBK PREMIUM</span>
                    </a>
                </div>
                <div className="nav-infor">
                    <ul>
                        <li>
                            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
                                Trang đầu
                            </a>
                        </li>
                        <li>
                            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
                                Về chúng tôi
                            </a>
                        </li>
                        <li>
                            <a href="#famous-room" className={activeSection === 'famous-room' ? 'active' : ''}>
                                Phòng
                            </a>
                        </li>
                        <li>
                            <a href="#amenities" className={activeSection === 'amenities' ? 'active' : ''}>
                                Tiện nghi
                            </a>
                        </li>
                        <li>
                            <a href="#comment" className={activeSection === 'comment' ? 'active' : ''}>
                                Ý kiến khách hàng
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="nav-item">
                    <button className="nav-btn" onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
