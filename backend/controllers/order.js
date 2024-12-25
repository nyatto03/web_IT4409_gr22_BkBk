import Order from "../models/morders.js";
import User from "../models/mUser.js";
import Room from "../models/mRoom.js";

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

    // Kiểm tra trạng thái phòng
    if (room.status.toLowerCase() !== "available") {
      return res.status(400).json({
        message: "Phòng hiện không khả dụng.",
      });
    }

    // Tính toán tổng giá tiền
    const checkinDate = new Date(checkin_date);
    const checkoutDate = new Date(checkout_date);

    if (checkoutDate <= checkinDate) {
      return res.status(400).json({
        message: "Ngày trả phòng phải sau ngày nhận phòng.",
      });
    }

    const durationInDays = (checkoutDate - checkinDate) / (1000 * 3600 * 24); // Chuyển đổi mili giây thành ngày
    const totalPrice = room.price * durationInDays; // Tính tổng giá tiền

    // Cập nhật trạng thái phòng thành Pending
    room.status = "pending";
    await room.save();

    // Tạo đơn đặt phòng mới
    const newOrder = new Order({
      user_id,
      room_id,
      status: "pending", // Trạng thái mặc định
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      total_price: totalPrice, // Giá tiền đã tính
    });

    // Lưu đơn đặt phòng vào cơ sở dữ liệu
    const savedOrder = await newOrder.save();

    // Phản hồi thành công
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
      .populate(
        "room_id",
        "name description price status name status room_type images"
      ) // Lấy thông tin phòng
      .select("user_id room_id status checkin_date checkout_date"); // Lọc các trường cần thiết

    res.status(200).json({
      message: "Danh sách đơn đặt phòng:",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  const { status } = req.body; // Lấy trạng thái từ yêu cầu
  const validStatuses = [
    "pending", // Trạng thái ban đầu
    "approved", // Trạng thái đã được phê duyệt
    "paid", // Trạng thái đã thanh toán
    "canceled", // Trạng thái đã hủy
  ]; // Trạng thái hợp lệ

  try {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ.",
      });
    }

    const updatedOrder = await Order.findById(req.params.id).populate(
      "room_id"
    );
    if (!updatedOrder) {
      return res.status(404).json({
        message: "Không tìm thấy đơn đặt phòng.",
      });
    }

    const room = updatedOrder.room_id;

    // Xử lý cập nhật trạng thái của đơn đặt phòng và phòng
    if (updatedOrder.status === "pending") {
      if (status === "approved") {
        // Từ pending sang approved
        room.status = "confirmed"; // Cập nhật trạng thái phòng thành Confirmed
        updatedOrder.status = "approved"; // Cập nhật trạng thái đơn đặt phòng thành approved
      } else if (status === "canceled") {
        // Từ pending sang canceled
        room.status = "available"; // Cập nhật trạng thái phòng thành available
        updatedOrder.status = "canceled"; // Cập nhật trạng thái đơn đặt phòng thành canceled
      } else {
        return res.status(400).json({
          message: "Chỉ có thể chuyển từ pending sang approved hoặc canceled.",
        });
      }
    } else if (updatedOrder.status === "approved") {
      if (status === "paid") {
        // Từ approved sang paid
        room.status = "available"; // Cập nhật trạng thái phòng thành available
        updatedOrder.status = "paid"; // Cập nhật trạng thái đơn đặt phòng thành paid
      } else if (status === "canceled") {
        // Từ approved sang canceled
        room.status = "available"; // Cập nhật trạng thái phòng thành available
        updatedOrder.status = "canceled"; // Cập nhật trạng thái đơn đặt phòng thành canceled
      } else {
        return res.status(400).json({
          message: "Chỉ có thể chuyển từ approved sang paid hoặc canceled.",
        });
      }
    } else {
      return res.status(400).json({
        message: "Trạng thái hiện tại không thể thay đổi.",
      });
    }

    // Lưu cập nhật trạng thái phòng và đơn đặt phòng
    await room.save();
    await updatedOrder.save();

    // Phản hồi thành công
    res.status(200).json({
      message: `Trạng thái đơn đặt phòng đã được cập nhật thành ${status}.`,
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
