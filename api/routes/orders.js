import express from "express";
import {
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js"; // Đường dẫn tới controller

const router = express.Router();

// Route: Hiển thị danh sách đơn đặt phòng
router.get("/", getOrders);

// Route: Cập nhật trạng thái đơn đặt phòng
router.patch("/:id/status", updateOrderStatus);

export default router;
