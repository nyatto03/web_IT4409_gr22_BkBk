import express from "express"
import { VerifyAdmin, VerifyToken, VerifyUser } from "../utils/VerifyToken.js";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/checkauthentication", VerifyToken, (req, res, next)=>{
    res.send("Hello user, you are logged in")
})

router.get("/checkuser/:id", VerifyUser, (req, res, next)=>{
    res.send("Hello user, you can delete your account")
})

router.get("/checkadmin/:id", VerifyAdmin, (req, res, next)=>{
    res.send("Hello admin, you can delete all accounts")
})

//update
router.put("/:id", VerifyUser, updateUser);

//delete
router.delete("/:id", VerifyUser, deleteUser);

//get
router.get("/:id", VerifyUser, getUser);

//get all
router.get("/", VerifyAdmin, getUsers);

export default router