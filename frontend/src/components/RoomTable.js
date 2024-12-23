import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import apiClient from '../utils/axiosConfig';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Manage selected rows

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
            form.setFieldsValue(editingRoom);
        }
    }, [editingRoom, form]);

    const handleSaveRoom = async (values) => {
        try {
            if (editingRoom) {
                await apiClient.patch(`/rooms/${editingRoom._id}`, values);
                message.success('Room updated successfully');
            } else {
                await apiClient.post('/rooms', values);
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

    const handleDeleteRoom = async (roomIds) => {
        if (!Array.isArray(roomIds)) {
            roomIds = [roomIds]; // Wrap single ID in an array if necessary
        }

        const title = roomIds.length === 1
            ? 'Are you sure you want to delete this room?'
            : 'Are you sure you want to delete the selected rooms?';

        const content = roomIds.length === 1
            ? 'This action cannot be undone.'
            : 'This action cannot be undone for all selected rooms.';

        Modal.confirm({
            title,
            content,
            okText: 'Delete',
            cancelText: 'Cancel',
            okButtonProps: {
                style: { backgroundColor: '#f44336', borderColor: '#f44336', color: '#fff' },
            },
            cancelButtonProps: { style: { color: '#757575' } },
            onOk: async () => {
                try {
                    const promises = roomIds.map(async (roomId) => {
                        return await apiClient.delete(`/rooms/${roomId}`);
                    });

                    await Promise.all(promises); // Wait for all delete requests to finish
                    fetchRooms(); // Refetch the rooms after deletion
                    message.success('Rooms deleted successfully');
                } catch (error) {
                    console.error('Error deleting rooms:', error);
                    message.error('Error deleting rooms');
                }
            },
        });
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
        { title: 'Images', dataIndex: 'images', key: 'images' },
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
                    <Button
                        onClick={() => handleDeleteRoom(room._id)}
                        type="default"
                        danger
                        style={{ color: 'red', borderColor: 'red' }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

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
            {selectedRowKeys.length > 0 && (
                <Button
                    type="default"
                    onClick={() => handleDeleteRoom(selectedRowKeys)}
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#f44336',
                        borderColor: '#f44336',
                        color: '#fff',
                    }}
                >
                    Delete Selected
                </Button>
            )}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={rooms}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={editingRoom ? 'Edit Room' : 'Add Room'}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText={editingRoom ? 'Save Changes' : 'Add Room'}
            >
                <Form form={form} onFinish={handleSaveRoom} initialValues={editingRoom} layout="vertical">
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
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Price is required' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RoomTable;
