import Room from "../models/room.js";
import { createError } from "../utils/err.js";

// Thêm phòng mới
export const createRoom = async (req, res, next) => {
  //const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    res.status(201).json({
      message: "Phòng đã được tạo thành công.",
      room: savedRoom,
    });
  } catch (err) {
    next(err);
  }
};

// Cập nhật thông tin phòng và quản lý ảnh
export const updateRoom = async (req, res, next) => {
  const { imagesToAdd, imageToRemove, ...roomData } = req.body;

  try {
    // Kiểm tra nếu không có dữ liệu cần cập nhật
    if (!imagesToAdd && !imageToRemove && Object.keys(roomData).length === 0) {
      return res.status(400).json({
        message: "Không có dữ liệu để cập nhật.",
      });
    }

    // Xây dựng truy vấn cập nhật
    const updateQuery = {};

    // Thêm các trường khác vào $set nếu có dữ liệu
    if (Object.keys(roomData).length > 0) {
      updateQuery.$set = roomData;
    }

    // Nếu có ảnh cần thêm, thêm chúng vào truy vấn
    if (imagesToAdd && imagesToAdd.length > 0) {
      updateQuery.$push = { images: { $each: imagesToAdd } };
    }

    // Nếu có ảnh cần xóa, thêm lệnh $pull vào truy vấn
    if (imageToRemove) {
      updateQuery.$pull = { images: imageToRemove };
    }

    // Thực hiện cập nhật
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updateQuery, { new: true });

    // Kiểm tra nếu phòng không tồn tại
    if (!updatedRoom) {
      return res.status(404).json({
        message: "Không tìm thấy phòng với ID được cung cấp.",
      });
    }

    // Phản hồi thành công
    res.status(200).json({
      message: "Thông tin phòng và hình ảnh đã được cập nhật thành công.",
      room: updatedRoom,
    });
  } catch (err) {
    // Xử lý lỗi và gửi phản hồi
    res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật thông tin phòng.",
      error: err.message,
    });
    next(err);
  }
};

export const searchRooms = async (req, res, next) => {
  const { room_type, status, min_price, max_price } = req.query;

  const query = {};

  if (room_type) {
    query.room_type = { $in: room_type.split(",") }; // Split chuỗi loại phòng từ query và tìm kiếm các phòng phù hợp
  }

  if (status) {
    query.status = status; // Tìm phòng theo trạng thái
  }

  if (min_price || max_price) {
    query.total_price = {}; 

    if (min_price) {
      query.total_price.$gte = min_price; 
    }

    if (max_price) {
      query.total_price.$lte = max_price;
    }
  }

  try {
    // Tìm kiếm phòng với các tiêu chí đã lọc
    const rooms = await Room.find(query);
    res.status(200).json(rooms);
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
    const rooms = await Room.find().select("Mô tả trạng thái giá cả");
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
