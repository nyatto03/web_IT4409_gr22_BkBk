// src/components/RoomTable.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import apiClient from '../utils/axiosConfig'; // Assuming axiosConfig is exported from this file

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

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

  // Handle adding or editing a room
  const handleSaveRoom = async (values) => {
    try {
      if (editingRoom) {
        // Update existing room
        await apiClient.patch(`/rooms/${editingRoom._id}`, values);
      } else {
        // Add new room
        await apiClient.post('/rooms', values);
      }

      // After saving, fetch the updated list of rooms
      fetchRooms();
      setIsModalVisible(false);
      setEditingRoom(null);
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  // Show the modal for adding or editing a room
  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRoom(null);
  };

  // Handle deleting a room
  const handleDeleteRoom = async (roomId) => {
    try {
      await apiClient.delete(`/rooms/${roomId}`);
      fetchRooms(); // Fetch updated list after deletion
    } catch (error) {
      console.error('Error deleting room:', error);
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
        <>
          <Button onClick={() => handleEditRoom(room)} type="link">Edit</Button>
          <Button onClick={() => handleDeleteRoom(room._id)} type="link" danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={rooms}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
      />
      
      {/* Modal for adding/editing rooms */}
      <Modal
        title={editingRoom ? 'Edit Room' : 'Add Room'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingRoom || {}}
          onFinish={handleSaveRoom}
        >
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
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRoom ? 'Save Changes' : 'Add Room'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoomTable;
