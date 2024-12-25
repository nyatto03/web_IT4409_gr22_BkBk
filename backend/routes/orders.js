import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js";
import {
  isAdmin,
  isAdminOrAssistant,
  isCustomer,
} from "../utils/roleMiddleware.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

//Tạo order (Chỉ customer)
router.post("/", authMiddleware, isCustomer, createOrder);

// Hiển thị danh sách đơn đặt phòng (Admin và Assistant)
router.get("/", authMiddleware, getOrders);

// Cập nhật trạng thái đơn đặt phòng (Admin và Assistant)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  isAdminOrAssistant,
  updateOrderStatus
);

export default router;
