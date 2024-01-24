import express from "express";

import { login, loginWithOTP, otpVerification, signup, signUpGoogle } from "../controllers/auth.js";
import { getAllUsers, updateProfile, getAvatars } from '../controllers/users.js'
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signupgoogle", signUpGoogle);
router.post("/send-otp", otpVerification);
router.post("/loginwithotp", loginWithOTP);

router.get('/getAllUsers', getAllUsers)
router.get('/getAvatars', getAvatars)
router.patch('/update/:id',auth,updateProfile)

export default router;
