import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true, 
    },
    name: {
      type: String,
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
      enum: ["available", "booked", "maintenance"], // Chỉ nhận 3 giá trị
      required: true,
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
