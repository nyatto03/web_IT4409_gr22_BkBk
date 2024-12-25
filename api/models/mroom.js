import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema(
  {
    room_id: {
      type: Schema.Types.ObjectId,
      auto: true, 
    },
    name: {
      type: String,
      required: true,
    },
    room_type: {
      type: [String], 
      enum: ["Single", "Double"], 
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Pending", "Confirmed", "Booked", "Maintenance"], // Chỉ nhận 5 giá trị
      required: true,
    },
    images: {
      type: [String], // Mảng các URL hình ảnh
      default: [], // Mặc định là mảng rỗng nếu không có hình ảnh
    },
    created_at: {
      type: Date,
      default: Date.now, 
      immutable: true, 
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Mapping timestamps vào created_at
      updatedAt: "updated_at", // Mapping timestamps vào updated_at
    },
  }
);

export default mongoose.model("Room", roomSchema);
