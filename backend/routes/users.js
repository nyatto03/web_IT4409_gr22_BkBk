import express from "express";
import { isAdmin, isCustomer } from "../utils/roleMiddleware.js";
import {
  updateUser,
  assignRole,
  createUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

// Tạo người dùng mới (Chỉ Admin)
router.post("/", authMiddleware, isAdmin, createUser);

// Phân quyền người dùng (Chỉ Admin)
router.put("/:id", authMiddleware, isAdmin, assignRole);

//update
router.put("/userId/:id", authMiddleware, isCustomer, updateUser);

//get
router.get("/:id", authMiddleware, isCustomer, getUser);

//get all
router.get("/", authMiddleware, isAdmin, getUsers);

export default router;
