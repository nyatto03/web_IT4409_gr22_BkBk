import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, message, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook để chuyển hướng

  const onFinish = async (values) => {
    setLoading(true);
    const { name, email, password, phone, address } = values;
    try {
      await register(name, email, password, phone, address);  // Gọi hàm register từ context
      message.success('Registration successful!');
      navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>

      <Space style={{ width: '100%', marginTop: '16px' }} direction="vertical" align="center">
        <Button type="link" onClick={() => navigate('/login')}>
          Already have an account? Login here
        </Button>
        <Button type="link" onClick={() => navigate('/')}>
          Back to Landing Page
        </Button>
      </Space>
    </div>
  );
};

export default RegisterPage;
