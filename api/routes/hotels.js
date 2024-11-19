import express from "express"
import Hotel from "../models/mhotel.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { VerifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();

//create
router.post("/", VerifyAdmin, createHotel);

//update
router.put("/:id", VerifyAdmin, updateHotel);

//delete
router.delete("/:id", VerifyAdmin, deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/:id", getHotels);
 
export default router