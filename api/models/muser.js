import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingHistorySchema = new mongoose.Schema({
  order_id: {
    type: Schema.Types.ObjectId, // Tham chiếu đến `orders`
    ref: "Order",
    required: true,
  },
  room_id: {
    type: Schema.Types.ObjectId, // Tham chiếu đến `rooms`
    ref: "Room",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"], // Status
    required: true,
  },
  booking_date: {
    type: Date,
    required: true,
  },
  checkin_date: {
    type: Date,
    required: true,
  },
  checkout_date: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true, // Tự động tạo ID
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "assistant", "customer"], // Roles
      default: "customer",
      required: true,
    },
    booking_history: [bookingHistorySchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("User", userSchema);
