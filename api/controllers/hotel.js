import hotel from "../models/mhotel.js";
import room from "../models/mroom.js";

//Create
export const createHotel = async (req, res, next) => {
    const newHotel = new hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

//update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

//delete
export const deleteHotel = async (req, res, next) => {
    try {
        const updatedHotel = await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        next(error)
    }
}

//get
export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}

//getall
export const getHotels = async (req, res, next) => {
    try {
        const getHotels = await hotel.findById(req.params.id)
        res.status(200).json(getHotels)
    } catch (error) {
        next(error)
    }
}