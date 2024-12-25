import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header'; 
import Sidebar from '../components/Sidebar';  
import RoomTable from '../components/RoomTable';  
import UserTable from '../components/UserTable';  
import OrderTable from '../components/OrderTable'; 

const { Content } = Layout;

const AdminPage = () => {
  const savedSelectedKey = localStorage.getItem('selectedKey') || '1'; 

  const [selectedKey, setSelectedKey] = useState(savedSelectedKey);

  const handleSelectMenu = (e) => {
    const key = e.key;
    setSelectedKey(key);
    localStorage.setItem('selectedKey', key); 
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
