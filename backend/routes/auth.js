import express from "express"
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// Đăng ký
router.post("/register", register) 

//Đăng nhập
router.post("/login", login)

export default router