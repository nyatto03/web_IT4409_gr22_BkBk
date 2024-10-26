import express from "express"
import hotel from "../models/hotel.js";
import { createError } from "../../utils/err.js";

//create
const router = express.Router();

router.post("/", async (req,res) =>{

    const newHotel = new hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
});

//update
router.put("/:id", async (req,res) =>{
    try {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(err)
    }
});

//delete
router.delete("/:id", async (req,res) =>{
    try {
        const updatedHotel = await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        res.status(500).json(err)
    }
});

//get
router.get("/:id", async (req,res) =>{
    try {
        const getHotel = await hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (error) {
        res.status(500).json(err)
    }
});

//get all
router.get("/:id", async (req,res,next) =>{

    try {
        const getHotels = await hotel.findById(req.params.id)
        res.status(200).json(getHotels)
    } catch (error) {
        res.status(500).json(err)
    }
});
 
export default router