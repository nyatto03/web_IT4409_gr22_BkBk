import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import apiClient from '../utils/axiosConfig';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [form] = Form.useForm();

    // Fetch rooms from API
    const fetchRooms = async () => {
        try {
            const response = await apiClient.get('/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (editingRoom) {
            form.setFieldsValue(editingRoom); // Set the fields with the editing room values
        }
    }, [editingRoom, form]);

    const handleSaveRoom = async (values) => {
        try {
            if (editingRoom) {
                // Chỉ cho phép thay đổi status giữa "Sẵn sàng" và "Bảo trì"
                const status =
                    values.status === 'available' || values.status === 'maintenance' ? values.status : editingRoom.status;
                const updatedValues = { ...values, status };

                await apiClient.put(`/rooms/${editingRoom._id}`, updatedValues); // Update the room
                message.success('Room updated successfully');
            } else {
                await apiClient.post('/rooms', values); // Add a new room
                message.success('Room added successfully');
            }

            fetchRooms(); // Refetch rooms after saving
            setIsModalVisible(false);
            setEditingRoom(null);
            form.resetFields();
        } catch (error) {
            console.error('Error saving room:', error);
            message.error('Error saving room');
        }
    };

    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingRoom(null);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        { title: 'Room Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, room) => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                    <Button
                        onClick={() => handleEditRoom(room)}
                        type="default"
                        style={{ color: 'blue', borderColor: 'blue' }}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalVisible(true);
                    setEditingRoom(null);
                }}
                style={{ marginBottom: 20 }}
            >
                Add Room
            </Button>
            <Table
                columns={columns}
                dataSource={rooms}
                rowKey="_id"
                className="custom-table"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={editingRoom ? 'Edit Room' : 'Add Room'}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText={editingRoom ? 'Save Changes' : 'Add Room'}
            >
                <Form
                    form={form} // Pass form instance here
                    onFinish={handleSaveRoom}
                    initialValues={editingRoom}
                    layout="vertical"
                >
                    <Form.Item
                        label="Room Name"
                        name="name"
                        rules={[{ required: true, message: 'Room name is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status is required' }]}>
                        <Select disabled={editingRoom && editingRoom.status !== 'available' && editingRoom.status !== 'maintenance'}>
                            <Select.Option value="available">available</Select.Option>
                            <Select.Option value="maintenance">maintenance</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RoomTable;
