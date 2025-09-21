import express from "express";
let router = express.Router();
import { registerUser,getAllUsers,loginUser } from "../controllers/userControllers.js";

router.post('/register',registerUser)

router.post('/login',loginUser)


export default router ;