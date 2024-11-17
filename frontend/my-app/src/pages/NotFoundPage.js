import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Sau 3 giây, tự động chuyển hướng về trang landing page
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Chờ 3 giây

    // Dọn dẹp bộ đếm nếu component bị hủy
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Page Not Found</Title>
      <p>The page you are looking for does not exist.</p>
      <Button type="primary" onClick={() => navigate('/')}>
        Go to Landing Page
      </Button>
    </div>
  );
};

export default NotFoundPage;
