import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  searchRooms,
} from "../controllers/room.js";
import { VerifyAdmin, VerifyAssistant, VerifyUser } from "../utils/VerifyToken.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();
//create
router.post("/", authMiddleware, VerifyAdmin, createRoom);

//update
//router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", authMiddleware, VerifyAdmin, updateRoom);

//Tìm kiếm phòng
router.get('/rooms/search', authMiddleware, VerifyUser, searchRooms);

//delete
router.delete("/:id", authMiddleware, VerifyAdmin, deleteRoom);

//get
router.get("/:id", authMiddleware, getRoom);

//getall
router.get("/", authMiddleware, getRooms);

export default router;