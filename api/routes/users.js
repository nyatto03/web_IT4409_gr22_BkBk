import express from "express"
import { VerifyAdmin, VerifyToken, VerifyUser } from "../utils/VerifyToken.js";
import { updateUser, assignRole, createUser, getUser, getUsers } from "../controllers/user.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

// Tạo người dùng mới (Chỉ Admin)
router.post("/", authMiddleware, VerifyAdmin, createUser);

// Phân quyền người dùng (Chỉ Admin)
router.put("/:id/role", VerifyAdmin, assignRole);

//update
router.put("/:id", authMiddleware, VerifyUser, updateUser);

//get
router.get("/:id", authMiddleware, VerifyUser, getUser);

//get all
router.get("/", authMiddleware, VerifyAdmin, getUsers);

export default router