import express from "express"
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/hotel";

const router = express.Router();

//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//get
router.get("/:id", getUser);

//get all
router.get("/:id", getUsers);

export default router