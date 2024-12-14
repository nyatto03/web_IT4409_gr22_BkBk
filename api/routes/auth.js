import express from "express"
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// Đăng nhập
router.post("/register", register)

//Đăng ký
router.post("/login", login)

export default router