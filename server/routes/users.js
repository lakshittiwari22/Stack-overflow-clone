import express from "express";

import { login, signup, signUpGoogle } from "../controllers/auth.js";
import { getAllUsers, updateProfile, getAvatars } from '../controllers/users.js'
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signupgoogle", signUpGoogle);

router.get('/getAllUsers', getAllUsers)
router.get('/getAvatars', getAvatars)
router.patch('/update/:id',auth,updateProfile)

export default router;
