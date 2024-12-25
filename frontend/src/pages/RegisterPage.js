import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, message, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const { name, email, password, phone, address } = values;
        try {
            console.log('Register values:', values);
            await register(name, email, password, phone, address);
            message.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            message.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1890ff' }}>
                Register
            </Title>
            <Form
                name="register"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ remember: true }}
                style={{ marginBottom: '16px' }}
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input
                        placeholder="Enter your full name"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input
                        placeholder="Enter your email"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Enter your password"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input
                        placeholder="Enter your phone number"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input
                        placeholder="Enter your address"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={{
                            height: 45,
                            fontSize: '16px',
                            borderRadius: '8px',
                            backgroundColor: '#1890ff',
                        }}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>

            <Space
                style={{
                    width: '100%',
                    marginTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    type="link"
                    onClick={() => navigate('/login')}
                    style={{ fontSize: '14px', color: '#1890ff' }}
                >
                    Already have an account? Login here
                </Button>
                <Button
                    type="link"
                    onClick={() => navigate('/')}
                    style={{ fontSize: '14px', color: '#1890ff' }}
                >
                    Back to Landing Page
                </Button>
            </Space>
        </div>
    );
};

export default RegisterPage;
