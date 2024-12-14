import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    user_id: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    room_id: {
      type: Schema.Types.ObjectId, 
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "Pending_Payment", "paid", "canceled"],
      default: "pending",
      required: true,
    },
    booking_date: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    checkin_date: {
      type: Date,
      required: true, // Bắt buộc phải có ngày nhận phòng
    },
    checkout_date: {
      type: Date,
      required: true, // Bắt buộc phải có ngày trả phòng
    },
    total_price: {
      type: Number,
      required: true, // Bắt buộc phải có tổng giá tiền
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Tự động lưu thời gian tạo
      updatedAt: "updated_at", // Tự động lưu thời gian cập nhật
    },
  }
);

export default mongoose.model("Order", orderSchema);
