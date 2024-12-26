import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button, Typography, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            message.success('Đăng nhập thành công!');
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
        <div
            style={{
                maxWidth: 400,
                margin: '150px auto',
                padding: '30px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1890ff' }}>
                Đăng nhập
            </Title>
            {error && (
                <p
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        marginBottom: 16,
                        height: 45,
                        borderRadius: '8px',
                        fontSize: '16px',
                    }}
                />
                <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        marginBottom: 16,
                        height: 45,
                        borderRadius: '8px',
                        fontSize: '16px',
                    }}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                        height: 45,
                        fontSize: '16px',
                        borderRadius: '8px',
                        backgroundColor: '#1890ff',
                    }}
                >
                    Đăng nhập
                </Button>
            </form>

            <Space
                style={{
                    marginTop: 16,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    type="link"
                    onClick={() => navigate('/register')}
                    style={{ fontSize: '14px', color: '#1890ff' }}
                >
                    Chưa có tài khoản ? Đăng ký tại đây
                </Button>
                <Button type="link" onClick={() => navigate('/')} style={{ fontSize: '14px', color: '#1890ff' }}>
                    Trở về trang Landing Page
                </Button>
            </Space>
        </div>
    );
};

export default LoginPage;
