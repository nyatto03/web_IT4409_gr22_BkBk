import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  // Giả sử bạn có một API để lấy thông tin các phòng đã đặt
  useEffect(() => {
    // Lấy dữ liệu đặt phòng từ API (giả sử)
    const fetchBookings = async () => {
      // Ví dụ về dữ liệu đã đặt phòng
      setBookings([
        { room: 'Phòng Deluxe', date: '2024-11-20', status: 'Đã xác nhận' },
        { room: 'Phòng Suite', date: '2024-11-25', status: 'Đang chờ' }
      ]);
    };

    fetchBookings();
  }, []);

  return (
    <div className="user-page">
      <header>
        <h1>Xin chào, {user?.name}</h1>
        <button onClick={logout}>Đăng xuất</button>
      </header>

      <section className="bookings">
        <h2>Danh sách phòng đã đặt</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <h3>{booking.room}</h3>
              <p>Ngày đặt: {booking.date}</p>
              <p>Trạng thái: {booking.status}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 Khách sạn ABC</p>
      </footer>
    </div>
  );
};

export default UserPage;
