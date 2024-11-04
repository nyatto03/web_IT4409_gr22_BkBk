import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <span className="navbar-logo">HotelBooking</span>
        <div className="navbar-items">
          <button className="navbar-login-btn">Login</button>
          <button className="navbar-register-btn">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
