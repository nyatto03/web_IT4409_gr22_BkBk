import Order from "../models/morders.js";
import User from "../models/muser.js";
import Room from "../models/mroom.js";

// Hiển thị danh sách đơn đặt phòng
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Lấy thông tin người dùng
      .populate("roomId", "description price status") // Lấy thông tin phòng
      .select("userId roomId status totalPrice createdAt"); // Lọc các trường cần thiết

    res.status(200).json({
      message: "Danh sách đơn đặt phòng:",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật trạng thái đơn đặt phòng
export const updateOrderStatus = async (req, res, next) => {
  const { status } = req.body; // Lấy trạng thái từ yêu cầu
  const validStatuses = ["pending", "approved", "paid", "canceled"]; // Trạng thái hợp lệ

  try {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ.",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    ).populate("userId", "name email") // Lấy thông tin người dùng
      .populate("roomId", "description price status"); // Lấy thông tin phòng

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Không tìm thấy đơn đặt phòng.",
      });
    }

    res.status(200).json({
      message: 'Trạng thái đơn đặt phòng đã được cập nhật thành ${status}.',
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
