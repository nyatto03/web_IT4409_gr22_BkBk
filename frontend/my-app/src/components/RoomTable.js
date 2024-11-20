import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import apiClient from '../utils/axiosConfig';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [form] = Form.useForm();
    const [isTrashView, setIsTrashView] = useState(false); // New state to toggle trash view

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
        const isModified = Object.keys(formValues).some((key) => formValues[key] !== editingRoom[key]);

        if (isModified) {
            Modal.confirm({
                title: 'You have unsaved changes',
                content: 'Do you want to save your changes?',
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

    const handleDeleteRoom = async (roomId, isTrash = true) => {
        Modal.confirm({
            title: isTrash
                ? 'Are you sure you want to move this room to the trash?'
                : 'Are you sure you want to permanently delete this room?',
            content: isTrash ? 'This action can be undone.' : 'This action cannot be undone.',
            okText: isTrash ? 'Move to Trash' : 'Delete',
            cancelText: 'Cancel',
            okButtonProps: {
                style: {
                    backgroundColor: isTrash ? '#ffc107' : '#f44336', // Yellow for move to trash, Red for delete
                    borderColor: isTrash ? '#ffc107' : '#f44336',
                    color: '#fff', // Text color white
                },
            },
            cancelButtonProps: {
                style: {
                    color: '#757575', // Grey color for the cancel button
                },
            },
            onOk: async () => {
                try {
                    if (isTrash) {
                        // Xóa mềm phòng (chuyển phòng vào thùng rác)
                        await apiClient.patch(`/rooms/${roomId}/soft-delete`);
                        message.success('Room moved to trash');
                    } else {
                        // Xóa cứng phòng
                        await apiClient.delete(`/rooms/${roomId}`);
                        message.success('Room permanently deleted');
                    }

                    fetchRooms(isTrashView); // Lấy lại danh sách phòng sau khi xóa hoặc xóa mềm
                } catch (error) {
                    console.error(isTrash ? 'Error moving room to trash:' : 'Error permanently deleting room:', error);
                    message.error(isTrash ? 'Error moving room to trash' : 'Error permanently deleting room');
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
                              type="default" // Outline button style
                              style={{ color: 'green', borderColor: 'green' }} // Custom style for outline
                          >
                              Restore
                          </Button>
                          <Button
                              onClick={() => handleDeleteRoom(room._id, false)}
                              type="default" // Outline button style
                              danger
                              style={{ color: 'red', borderColor: 'red' }} // Red outline for hard delete
                          >
                              Permanently Delete
                          </Button>
                      </>
                  ) : (
                      <>
                          <Button
                              onClick={() => handleEditRoom(room)}
                              type="default" // Outline button style
                              style={{ color: 'blue', borderColor: 'blue' }} // Custom style for outline
                          >
                              Edit
                          </Button>
                          <Button
                              onClick={() => handleDeleteRoom(room._id, true)}
                              type="default" // Outline button style
                              style={{ color: 'orange', borderColor: 'orange' }} // Custom style for soft delete
                          >
                              Move to Trash
                          </Button>
                          <Button
                              onClick={() => handleDeleteRoom(room._id, false)}
                              type="default" // Outline button style
                              danger
                              style={{ color: 'red', borderColor: 'red' }} // Red outline for hard delete
                          >
                              Delete
                          </Button>
                      </>
                  )}
              </div>
          ),
      },
  ];
  

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
            <Button type="primary" onClick={() => setIsTrashView(!isTrashView)} style={{ marginBottom: 16 }}>
                {isTrashView ? 'View Active Rooms' : 'View Trash'}
            </Button>
            <Table dataSource={rooms} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} bordered />

            <Modal
                title={editingRoom ? 'Edit Room' : 'Add Room'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        {editingRoom ? 'Save Changes' : 'Add Room'}
                    </Button>,
                ]}
            >
                <Form form={form} initialValues={editingRoom || {}} onFinish={handleSaveRoom}>
                    <Form.Item
                        label="Room Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the room name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the room description!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the room price!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select the room status!' }]}
                    >
                        <Select
                            defaultValue={editingRoom ? editingRoom.status : 'available'}
                            disabled={
                                editingRoom && (editingRoom.status === 'confirmed' || editingRoom.status === 'booked')
                            }
                        >
                            <Select.Option value={editingRoom ? editingRoom.status : 'available'}>
                                {editingRoom ? editingRoom.status : 'available'}
                            </Select.Option>

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
