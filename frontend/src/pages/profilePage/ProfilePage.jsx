import Navbar from '../../components/allRooms/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons';
import { editUser } from '../../apis';
import { useState } from 'react';
import { Modal, Form, Input, message, Avatar } from 'antd';
const ProfilePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const userData = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleEdit = () => {
        form.setFieldsValue({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
        });
        setIsModalVisible(true);
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await editUser({
                id: userData._id,
                ...values,
            });
            const updatedUser = { ...userData, ...values };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            message.success('Cập nhật thông tin thành công!');
            setIsModalVisible(false);
        } catch (error) {
            message.error('Cập nhật thất bại: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="profile">
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <Avatar size={100} icon={<UserOutlined />} className="profile-avatar" />
                        <h1>{userData.name}</h1>
                        <button className="edit-btn" onClick={handleEdit}>
                            Chỉnh sửa thông tin
                        </button>
                        <Modal
                            title="Chỉnh sửa thông tin"
                            open={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Form form={form} onFinish={handleUpdate} layout="vertical">
                                <Form.Item
                                    name="name"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <button type="submit" className="update-btn" disabled={loading}>
                                        {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                                    </button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>

                    <div className="profile-content">
                        <div className="info-item">
                            <MailOutlined className="info-icon" />
                            <div className="info-detail">
                                <label>Email</label>
                                <span>{userData.email}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <PhoneOutlined className="info-icon" />
                            <div className="info-detail">
                                <label>Số điện thoại</label>
                                <span>{userData.phone}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <HomeOutlined className="info-icon" />
                            <div className="info-detail">
                                <label>Địa chỉ</label>
                                <span>{userData.address}</span>
                            </div>
                        </div>

                        <div className="info-item history-order" onClick={() => navigate('/history')}>
                            <IdcardOutlined className="info-icon" />
                            <div className="info-detail ">
                                <label>Lịch sử đặt phòng</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
