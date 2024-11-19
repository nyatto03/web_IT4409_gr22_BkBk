// src/pages/AdminPage.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';  // Cập nhật đường dẫn
import Sidebar from '../components/Sidebar';  // Cập nhật đường dẫn
import RoomTable from '../components/RoomTable';  // Cập nhật đường dẫn
import UserTable from '../components/UserTable';  // Cập nhật đường dẫn
import OrderTable from '../components/OrderTable';  // Cập nhật đường dẫn

const { Content } = Layout;

const AdminPage = () => {
  // Đọc giá trị từ localStorage khi trang load
  const savedSelectedKey = localStorage.getItem('selectedKey') || '1'; // Nếu không có thì mặc định là '1'

  const [selectedKey, setSelectedKey] = useState(savedSelectedKey); // Sử dụng giá trị lưu trong localStorage

  // Cập nhật selectedKey và lưu vào localStorage mỗi khi người dùng chọn tab mới
  const handleSelectMenu = (e) => {
    const key = e.key;
    setSelectedKey(key);
    localStorage.setItem('selectedKey', key); // Lưu trạng thái vào localStorage
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar selectedKey={selectedKey} onSelect={handleSelectMenu} />
      <Layout style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {selectedKey === '1' && (
              <>
                {/* Dashboard content */}
              </>
            )}
            {selectedKey === '2' && (
              <>
                <UserTable />
              </>
            )}
            {selectedKey === '3' && (
              <>
                <OrderTable />
              </>
            )}
            {selectedKey === '4' && (
              <>
                <RoomTable />
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
