import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  searchRooms,
} from "../controllers/room.js";
import { authMiddleware } from "../utils/authMiddleware.js";
import { isAdmin, isCustomer } from "../utils/roleMiddleware.js";

const router = express.Router();
//create
router.post("/", authMiddleware, isAdmin, createRoom); 

//update
//router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", authMiddleware, isAdmin, updateRoom); 

//Tìm kiếm phòng
router.get('/search', authMiddleware, isCustomer, searchRooms);

//delete
router.delete("/:id", authMiddleware, isAdmin, deleteRoom);

//getall
router.get("/", authMiddleware, getRooms);

//get
router.get("/:id", authMiddleware, getRoom);

export default router;