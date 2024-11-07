import express from "express"
import hotel from "../models/mhotel.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";

const router = express.Router();

//create
router.post("/", createHotel);

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/:id", getHotels);
 
export default router