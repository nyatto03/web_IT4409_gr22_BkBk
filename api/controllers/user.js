import User from "../models/muser.js";

// Cập nhật thông tin người dùng
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Thông tin người dùng đã được cập nhật.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa người dùng
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Người dùng đã bị xóa khỏi hệ thống.",
    });
  } catch (error) {
    next(error);
  }
};

// Xem thông tin cá nhân người dùng và lịch sử đặt phòng
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Không trả về mật khẩu
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    const bookingHistory = await Booking.find({ userId: req.params.id })
      .populate("roomId", "description price status") // Nếu cần thông tin chi tiết phòng
      .populate("hotelId", "name location"); // Nếu cần thông tin khách sạn

    res.status(200).json({
      user,
      bookingHistory,
    });
  } catch (error) {
    next(error);
  }
};

// Xem danh sách tất cả người dùng
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
