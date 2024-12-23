import Order from "../models/orders.js";
import User from "../models/user.js";
import Room from "../models/room.js";

// Tạo đơn đặt phòng mới
export const createOrder = async (req, res, next) => {
  const { user_id, room_id, status, checkin_date, checkout_date } = req.body;

  try {
    // Kiểm tra xem userId có tồn tại hay không
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại.",
      });
    }

    // Kiểm tra xem roomId có tồn tại hay không
    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({
        message: "Phòng không tồn tại.",
      });
    }

    // Calculate total price based on room price and the number of days
    const checkinDate = new Date(checkin_date);
    const checkoutDate = new Date(checkout_date);

    if (checkoutDate <= checkinDate) {
      return res.status(400).json({
        message: "Ngày trả phòng phải sau ngày nhận phòng.",
      });
    }

    const durationInDays = (checkoutDate - checkinDate) / (1000 * 3600 * 24); // Convert milliseconds to days
    const totalPrice = room.price * durationInDays; // Calculate total price

    // Create the new order
    const newOrder = new Order({
      user_id,
      room_id,
      status: status || "pending", // Default status
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      total_price: totalPrice, // Calculated total price
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with success
    res.status(201).json({
      message: "Đơn đặt phòng đã được tạo thành công.",
      order: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// Hiển thị danh sách đơn đặt phòng
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email") // Lấy thông tin người dùng
      .populate("room_id", "description price status") // Lấy thông tin phòng
      .select("user_id room_id status checkin_date checkout_date"); // Lọc các trường cần thiết

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
    ).populate("user_id", "name email") // Lấy thông tin người dùng
      .populate("room_id", "description price status"); // Lấy thông tin phòng

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
