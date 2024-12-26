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
            message.success('Đăng ký thành công!');
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
                Đăng ký
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
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Nhập họ và tên của bạn!' }]}
                >
                    <Input
                        placeholder="Nhập họ và tên của bạn"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Nhập email hợp lệ!' }]}
                >
                    <Input
                        placeholder="Nhập email của bạn"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                >
                    <Input
                        placeholder="Nhập số điện thoại"
                        style={{ height: 45, borderRadius: '8px', fontSize: '16px' }}
                    />
                </Form.Item>

                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Nhập địa chỉ!' }]}>
                    <Input placeholder="Nhập địa chỉ" style={{ height: 45, borderRadius: '8px', fontSize: '16px' }} />
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
                        Đăng ký
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
                <Button type="link" onClick={() => navigate('/login')} style={{ fontSize: '14px', color: '#1890ff' }}>
                    Đã có tài khoản? Đăng nhập tại đây
                </Button>
                <Button type="link" onClick={() => navigate('/')} style={{ fontSize: '14px', color: '#1890ff' }}>
                    Trở về trang Landing Page
                </Button>
            </Space>
        </div>
    );
};

export default RegisterPage;
