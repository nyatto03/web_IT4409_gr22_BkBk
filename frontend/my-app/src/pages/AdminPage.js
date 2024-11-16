import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Giả sử bạn có API để lấy danh sách phòng và đặt phòng
  useEffect(() => {
    const fetchRoomsAndBookings = async () => {
      // Lấy danh sách phòng và booking từ API (giả sử)
      setRooms([
        { name: 'Phòng Deluxe', price: 1000000, available: true },
        { name: 'Phòng Suite', price: 2000000, available: false }
      ]);
      setBookings([
        { room: 'Phòng Deluxe', user: 'Nguyễn Văn A', status: 'Đã xác nhận' },
        { room: 'Phòng Suite', user: 'Trần Thị B', status: 'Đang chờ' }
      ]);
    };

    fetchRoomsAndBookings();
  }, []);

  return (
    <div className="admin-page">
      <header>
        <h1>Trang Quản Trị Viên</h1>
      </header>

      <section className="rooms-management">
        <h2>Quản lý phòng</h2>
        <ul>
          {rooms.map((room, index) => (
            <li key={index}>
              <h3>{room.name}</h3>
              <p>Giá: {room.price} VND</p>
              <p>{room.available ? 'Có sẵn' : 'Hết phòng'}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bookings-management">
        <h2>Quản lý đặt phòng</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <h3>{booking.room}</h3>
              <p>Người đặt: {booking.user}</p>
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

export default AdminPage;
