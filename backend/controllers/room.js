import Room from "../models/mRoom.js";
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

// Cập nhật thông tin phòng không bao gồm ảnh
export const updateRoom = async (req, res, next) => {
  const { name, status, description, price } = req.body;

  try {
    // Kiểm tra nếu không có dữ liệu cần cập nhật
    if (!name && !status && !description && !price) {
      return res.status(400).json({
        message: "Không có dữ liệu để cập nhật.",
      });
    }

    // Xây dựng truy vấn cập nhật
    const updateQuery = {
      $set: {}
    };

    // Cập nhật các trường cần thiết nếu có
    if (name) updateQuery.$set.name = name;
    if (status) updateQuery.$set.status = status;
    if (description) updateQuery.$set.description = description;
    if (price !== undefined) updateQuery.$set.price = price;

    // Thực hiện cập nhật
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { new: true }
    );

    // Kiểm tra nếu phòng không tồn tại
    if (!updatedRoom) {
      return res.status(404).json({
        message: "Không tìm thấy phòng với ID được cung cấp.",
      });
    }

    // Phản hồi thành công
    res.status(200).json({
      message: "Thông tin phòng đã được cập nhật thành công.",
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


// Tìm kiếm phòng
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
    // Lấy tên phòng từ query parameters
    const { name } = req.query;

    // Xây dựng bộ lọc
    const filter = name ? { name: { $regex: name, $options: "i" } } : {};

    // Tìm phòng với bộ lọc
    const rooms = await Room.find(filter).select(
      "name description status price room_type images"
    );

    // Trả về danh sách phòng
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
