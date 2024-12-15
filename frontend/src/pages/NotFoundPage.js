import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(3); // Initialize countdown
  const navigate = useNavigate();

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer); // Clear interval when countdown reaches 0
          navigate('/'); // Redirect to landing page when countdown is over
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update every second

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Page Not Found</Title>
      <Paragraph>The page you are looking for does not exist.</Paragraph>
      <Paragraph>
        You will be redirected to the landing page in {countdown} second{countdown !== 1 ? 's' : ''}...
      </Paragraph>

      {/* Button to redirect to landing page immediately */}
      <Space>
        <Button type="primary" onClick={() => navigate('/')} size="large">
          Go to Landing Page
        </Button>
      </Space>
    </div>
  );
};

export default NotFoundPage;
