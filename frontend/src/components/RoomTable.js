import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import apiClient from '../utils/axiosConfig';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [form] = Form.useForm();

    // Fetch rooms from API
    const fetchRooms = async () => {
        try {
            const response = await apiClient.get('/rooms');
            setRooms(response.data);
            setFilteredRooms(response.data);
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

    const handleSearch = () => {
        const filteredData = rooms.filter(
            (room) =>
                (room.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    (room.description && room.description.toLowerCase().includes(searchKeyword.toLowerCase()))) &&
                (statusFilter ? room.status === statusFilter : true),
        );
        setFilteredRooms(filteredData);
    };

    const handleSaveRoom = async (values) => {
        try {
            if (editingRoom) {
                const status =
                    values.status === 'available' ||
                    values.status === 'pending' ||
                    values.status === 'confirmed' ||
                    values.status === 'maintenance'
                        ? values.status
                        : editingRoom.status;
                const updatedValues = { ...values, status };

                await apiClient.put(`/rooms/${editingRoom._id}`, updatedValues);
                message.success('Room updated successfully');
            } else {
                await apiClient.post('/rooms', values);
                message.success('Room added successfully');
            }

            fetchRooms();
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
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `${price?.toLocaleString()} VND` },
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Row gutter={16}>
                    <Col>
                        <Input
                            placeholder="Search by room name or description"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật giá trị từ khóa tìm kiếm
                            style={{ width: 300 }}
                        />
                    </Col>
                    <Col>
                        <Select
                            placeholder="Select status"
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)}
                            style={{ width: 200, marginLeft: 10 }}
                        >
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="available">Available</Select.Option>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="confirmed">Confirmed</Select.Option>
                            <Select.Option value="maintenance">Maintenance</Select.Option>
                        </Select>
                    </Col>
                    <Col>
                        <Button type="default" icon={<SearchOutlined />} onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => {
                                setIsModalVisible(true);
                                setEditingRoom(null);
                            }}
                        >
                            Add Room
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table
                columns={columns}
                dataSource={filteredRooms} // Hiển thị dữ liệu đã lọc
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
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status is required' }]}>
                        <Select
                            disabled={
                                editingRoom &&
                                editingRoom.status !== 'available' &&
                                editingRoom.status !== 'maintenance'
                            }
                        >
                            <Select.Option value="available">available</Select.Option>
                            <Select.Option value="pending">pending</Select.Option>
                            <Select.Option value="confirmed">confirmed</Select.Option>
                            <Select.Option value="maintenance">maintenance</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RoomTable;
