import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
    userSignUp, 
    verifyOtp,
    userLogIn, 
    changePassword, 
    myProfile, 
    editProfile,
    changeProfileImage,
    deleteUserAccount
} from "../controllers/userFunc.js";
import multer from "multer";
import { userImageStorage } from "../middlewares/cloudinaryConfig.js";
import { isLoggedIn } from "../middlewares/authentication.js";
const uploadUserImage = multer({storage : userImageStorage});
const router = express.Router();

router.route("/signup").post(userSignUp);
router.route("/verifyotp").post(wrapAsync(verifyOtp));
router.route("/login").post(wrapAsync(userLogIn));

// router.route("/logout").post(wrapAsync(isLoggedIn), wrapAsync(userLogOut));
router.route("/changepassword").post(wrapAsync(isLoggedIn) , wrapAsync(changePassword));
router.route("/myprofile").get(wrapAsync(isLoggedIn) , wrapAsync(myProfile));
router.route("/editprofile").post(wrapAsync(isLoggedIn), editProfile);
router.route("/changeprofileimage").put(wrapAsync(isLoggedIn), uploadUserImage.single('userPic'), wrapAsync(changeProfileImage))
router.route("/deleteuseraccount").delete(wrapAsync(isLoggedIn), wrapAsync(deleteUserAccount));
export default router;