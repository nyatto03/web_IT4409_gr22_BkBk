import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.js";
import { VerifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();
//create
router.post("/:hotelid", VerifyAdmin, createRoom);

//update
//router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", VerifyAdmin, updateRoom);

//delete
router.delete("/:id/:hotelid", VerifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//getall
router.get("/", getRooms);

export default router;