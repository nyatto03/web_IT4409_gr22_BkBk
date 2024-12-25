import React from 'react';
import { Layout, Button, Typography, Avatar, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';  

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();  

  const handleLogout = () => {
    logout();  
    navigate('/login'); 
  };

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Row justify="space-between" align="middle" style={{ padding: '0 16px', height: '100%' }}>
        <Col>
          <Typography.Title level={3} style={{ margin: 0, fontSize: '20px' }}>
            My Application
          </Typography.Title>
        </Col>

        <Col>
          <Row justify="end" align="middle">
            {user && user.name && (
              <Avatar style={{ marginRight: '16px' }} size="large">{user.name.charAt(0)}</Avatar>
            )}
            <Text strong style={{ marginRight: '16px' }}>
              Xin chào, {user ? user.name : 'Admin'}
            </Text>
            <Button type="primary" danger onClick={handleLogout}>Logout</Button>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
