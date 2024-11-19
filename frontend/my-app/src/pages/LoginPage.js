import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Typography, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const { login } = useAuth(); // Lấy hàm login từ context
  const [email, setEmail] = useState(''); // State để lưu email
  const [password, setPassword] = useState(''); // State để lưu mật khẩu
  const [error, setError] = useState(''); // State để lưu lỗi
  const navigate = useNavigate(); // Hook dùng để chuyển hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Gọi hàm login từ context
      message.success('Login successful!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        message.error(error.response.data.error);
      } else {
        setError('Login failed. Please check your credentials.');
        message.error('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Login</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </form>

      <Space style={{ marginTop: 16, width: '100%' }} direction="vertical" align="center">
        <Button type="link" onClick={() => navigate('/register')}>
          Don't have an account? Register here
        </Button>
        <Button type="link" onClick={() => navigate('/')}>
          Back to Landing Page
        </Button>
      </Space>
    </div>
  );
};

export default LoginPage;
