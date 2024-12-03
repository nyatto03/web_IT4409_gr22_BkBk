import Room from "../models/mroom.js";
import { createError } from "../utils/err.js";

// Thêm phòng mới
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(201).json({
      message: "Phòng mới đã được thêm thành công.",
      room: savedRoom,
    });
  } catch (err) {
    next(err);
  }
};

// Cập nhật thông tin phòng
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Thông tin phòng đã được cập nhật.",
      room: updatedRoom,
    });
  } catch (err) {
    next(err);
  }
};

// Xóa phòng
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({
      message: "Phòng đã được xóa khỏi hệ thống.",
    });
  } catch (err) {
    next(err);
  }
};

// Xem chi tiết phòng
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return next(createError(404, "Không tìm thấy phòng."));
    }
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// Xem danh sách các phòng
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().select("description price status");
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
