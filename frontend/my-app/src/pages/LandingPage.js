import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Chào mừng đến với khách sạn ABC</h1>
        <p>Khám phá các phòng tuyệt vời và đặt ngay hôm nay!</p>
      </header>

      <section className="rooms">
        <h2>Các phòng của chúng tôi</h2>
        <div className="room-card">
          <h3>Phòng Deluxe</h3>
          <p>Giá: 1,000,000 VND/đêm</p>
          <Link to="/user">Đặt phòng ngay</Link>
        </div>
        <div className="room-card">
          <h3>Phòng Suite</h3>
          <p>Giá: 2,000,000 VND/đêm</p>
          <Link to="/user">Đặt phòng ngay</Link>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Khách sạn ABC</p>
      </footer>
    </div>
  );
};

export default LandingPage;
