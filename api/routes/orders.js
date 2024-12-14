import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js"; 
import { VerifyAdmin, VerifyAssistant, VerifyUser } from "../utils/VerifyToken.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

//Tạo order (Chỉ customer)
router.get("/", authMiddleware, VerifyUser, createOrder);

// Hiển thị danh sách đơn đặt phòng (Admin và Assistant)
router.get("/", authMiddleware, VerifyAdmin, VerifyAssistant, getOrders);

// Cập nhật trạng thái đơn đặt phòng (Admin và Assistant)
router.patch("/:id/status", authMiddleware, VerifyAdmin, VerifyAssistant, updateOrderStatus);

export default router;
