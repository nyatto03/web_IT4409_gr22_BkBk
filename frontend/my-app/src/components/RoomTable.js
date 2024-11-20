import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import apiClient from '../utils/axiosConfig';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [form] = Form.useForm();
    const [isTrashView, setIsTrashView] = useState(false); // New state to toggle trash view
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Quản lý các hàng được chọn

    // Fetch rooms from API, with support for trash view
    const fetchRooms = async (showTrash = false) => {
        try {
            const response = await apiClient.get('/rooms', {
                params: { trash: showTrash ? 'true' : 'false' },
            });
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchRooms(isTrashView);
    }, [isTrashView]);

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

            fetchRooms(isTrashView); // Refetch rooms after saving
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
        const formValues = form.getFieldsValue();

        // Kiểm tra thay đổi tùy theo chế độ (add/edit)
        const isModified = editingRoom
            ? Object.keys(formValues).some((key) => formValues[key] !== editingRoom[key]) // Chế độ edit
            : Object.keys(formValues).some((key) => formValues[key] !== undefined); // Chế độ add

        if (isModified) {
            Modal.confirm({
                title: editingRoom ? 'Unsaved Changes in Edit Mode' : 'Unsaved Changes in Add Mode',
                content: editingRoom
                    ? 'Do you want to save the changes to the room details?'
                    : 'Do you want to save the new room details?',
                okText: 'Save',
                cancelText: 'Discard',
                onOk: () => {
                    form.submit();
                },
                onCancel: () => {
                    setIsModalVisible(false);
                    setEditingRoom(null);
                    form.resetFields();
                },
            });
        } else {
            setIsModalVisible(false);
            setEditingRoom(null);
            form.resetFields();
        }
    };

    const handleDeleteRoom = async (roomIds, isTrash = true) => {
        // Xử lý nếu chỉ xóa một phòng
        // Ensure roomIds is always an array for consistency
        if (!Array.isArray(roomIds)) {
            roomIds = [roomIds]; // Wrap the single ID in an array if necessary
        }

        const title =
            roomIds.length === 1
                ? isTrash
                    ? 'Are you sure you want to move this room to the trash?'
                    : 'Are you sure you want to permanently delete this room?'
                : isTrash
                  ? 'Are you sure you want to move the selected rooms to the trash?'
                  : 'Are you sure you want to permanently delete the selected rooms?';

        const content =
            roomIds.length === 1
                ? isTrash
                    ? 'This action can be undone.'
                    : 'This action cannot be undone.'
                : isTrash
                  ? 'This action can be undone for all selected rooms.'
                  : 'This action cannot be undone for all selected rooms.';

        Modal.confirm({
            title: title,
            content: content,
            okText: isTrash ? 'Move to Trash' : 'Delete',
            cancelText: 'Cancel',
            okButtonProps: {
                style: {
                    backgroundColor: isTrash ? '#ffc107' : '#f44336', // Yellow for soft delete, Red for delete
                    borderColor: isTrash ? '#ffc107' : '#f44336',
                    color: '#fff', // White text color
                },
            },
            cancelButtonProps: {
                style: {
                    color: '#757575', // Grey color for the cancel button
                },
            },
            onOk: async () => {
                try {
                    // Xử lý xóa phòng
                    const promises = roomIds.map(async (roomId) => {
                        if (isTrash) {
                            return await apiClient.patch(`/rooms/${roomId}/soft-delete`);
                        } else {
                            return await apiClient.delete(`/rooms/${roomId}`);
                        }
                    });

                    await Promise.all(promises); // Chờ đợi tất cả các yêu cầu xóa
                    fetchRooms(isTrashView); // Refetch the rooms after action
                    message.success(`${isTrash ? 'Moved to trash' : 'Permanently deleted'} successfully`);
                } catch (error) {
                    console.error('Error performing delete action:', error);
                    message.error(`Error performing ${isTrash ? 'soft delete' : 'permanent delete'}`);
                }
            },
        });
    };

    const handleRestoreRoom = async (roomId) => {
        try {
            await apiClient.patch(`/rooms/${roomId}/restore`);
            fetchRooms(isTrashView); // Refetch after restore
            message.success('Room restored successfully');
        } catch (error) {
            console.error('Error restoring room:', error);
            message.error('Error restoring room');
        }
    };

    const columns = [
        {
            title: 'Index',
            key: 'index',
            render: (_, __, index) => index + 1, // Số thứ tự của mỗi phòng
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
                    {isTrashView ? (
                        <>
                            <Button
                                onClick={() => handleRestoreRoom(room._id)}
                                type="default"
                                style={{ color: 'green', borderColor: 'green' }}
                            >
                                Restore
                            </Button>
                            <Button
                                onClick={() => handleDeleteRoom(room._id, false)}
                                type="default"
                                danger
                                style={{ color: 'red', borderColor: 'red' }}
                            >
                                Permanently Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => handleEditRoom(room)}
                                type="default"
                                style={{ color: 'blue', borderColor: 'blue' }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDeleteRoom(room._id, true)}
                                type="default"
                                style={{ color: 'orange', borderColor: 'orange' }}
                            >
                                Move to Trash
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys); // Cập nhật các hàng được chọn
        },
    };

    const getAvailableStatusTransitions = (currentStatus) => {
        switch (currentStatus) {
            case 'available':
            case 'pending_confirmation':
                return ['maintenance'];
            case 'maintenance':
                return ['available'];
            default:
                return [];
        }
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
            <Button
                type="default"
                onClick={() => {
                    setIsTrashView(!isTrashView);
                }}
                style={{ marginBottom: 20, marginLeft: 10 }}
            >
                {isTrashView ? 'View All Rooms' : 'View Trash'}
            </Button>
            {/* Only show "Move to Trash" button if at least one row is selected and not in Trash view */}
            {!isTrashView && selectedRowKeys.length > 0 && (
                <Button
                    type="default"
                    onClick={() => handleDeleteRoom(selectedRowKeys, true)} // Soft delete action
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#ffc107', // Yellow color for soft delete (Move to Trash)
                        borderColor: '#ffc107', // Yellow border
                        color: '#fff', // White text color
                    }}
                >
                    Move Selected to Trash
                </Button>
            )}

            {/* Only show "Delete Selected" button if at least one row is selected and in Trash view */}
            {isTrashView && selectedRowKeys.length > 0 && (
                <Button
                    type="default"
                    onClick={() => handleDeleteRoom(selectedRowKeys, false)} // Permanent delete action
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#f44336', // Red color for permanent delete (Delete Selected)
                        borderColor: '#f44336', // Red border
                        color: '#fff', // White text color
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
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        initialValue={editingRoom ? editingRoom.status : 'available'}
                        rules={[{ required: true, message: 'Please select the room status!' }]}
                    >
                        <Select
                            value={editingRoom ? editingRoom.status : undefined} // Dynamically set value based on editing mode
                            disabled={
                                editingRoom && (editingRoom.status === 'confirmed' || editingRoom.status === 'booked')
                            }
                        >
                            {/* Default options for adding a room */}
                            {!editingRoom && (
                                <>
                                    <Select.Option value="available">Available</Select.Option>
                                    <Select.Option value="maintenance">Maintenance</Select.Option>
                                </>
                            )}

                            {/* Dynamic status transitions for editing a room */}
                            {editingRoom &&
                                getAvailableStatusTransitions(editingRoom.status).map((status) => (
                                    <Select.Option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RoomTable;
