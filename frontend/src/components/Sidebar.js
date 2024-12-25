import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreAddOutlined, FileDoneOutlined, ApartmentOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const CustomSidebar = ({ selectedKey, onSelect }) => {
  return (
    <Sider width={200} style={{ height: '100vh', position: 'fixed', left: 0 }}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={onSelect}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<AppstoreAddOutlined />}>Dashboard</Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>Users</Menu.Item>
        <Menu.Item key="3" icon={<FileDoneOutlined />}>Orders</Menu.Item>
        <Menu.Item key="4" icon={<ApartmentOutlined />}>Rooms</Menu.Item> {/* Thêm mục Rooms */}
      </Menu>
    </Sider>
  );
};

export default CustomSidebar;
