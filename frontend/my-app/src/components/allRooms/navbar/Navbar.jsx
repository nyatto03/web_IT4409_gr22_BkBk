import './navbar.css';
const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="nav">
                <div className="nav-logo">
                    <span>BKBK PREMIUM</span>
                </div>
                <div className="nav-infor">
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">About us</a>
                        </li>
                        <li>
                            <a href="#">Category</a>
                        </li>
                        <li>
                            <a href="#">Room</a>
                        </li>
                    </ul>
                </div>
                <div className="nav-item">
                    <button className="nav-btn">Login</button>
                    <button className="nav-btn">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
