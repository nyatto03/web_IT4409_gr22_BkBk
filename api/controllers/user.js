import User from "../models/muser.js";

//update
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

//delete
export const deleteUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}

//get
export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (error) {
        next(error)
    }
}

//getall
export const getUsers = async (req, res, next) => {
    try {
        const getUsers = await User.findById(req.params.id)
        res.status(200).json(getUsers)
    } catch (error) {
        next(error)
    }
}