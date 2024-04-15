import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import { registerHostel, registerHostelImages } from "../controllers/hostelFunc.js";
import { isLoggedIn, isOwner } from "../middlewares/authentication.js";
// import upload from "../middlewares/hImagesMulter.js";
import { hostelImagesStorage } from "../middlewares/cloudinaryConfig.js";
import multer from "multer";
const uploadHostelImages = multer({ storage: hostelImagesStorage });
// import { hostelFacilitesAndRules, hostelImages, hostelbasicInfo, hostelTypeAndContact, diplayAllHostels, displayHostelDetail, diplayMyHostel } from "../controllers/hostelFunc.js";

const router = express.Router();
// new hostel creation routes
router.route("/new/register-hostel").post(wrapAsync(isLoggedIn), wrapAsync(registerHostel));
router.route("/new/register-hostel-images").post(wrapAsync(isLoggedIn), uploadHostelImages.array("hostelPics", 4), registerHostelImages);


// router.route("/display/myhostel").get(wrapAsync(isLoggedIn), wrapAsync(isOwner), wrapAsync(diplayMyHostel));
// router.route("/new/basicinfo").post(/*wrapAsync(isLoggedIn),*/ wrapAsync(hostelbasicInfo));
// router.route("/new/hosteltype").post(/*wrapAsync(isLoggedIn),*/ wrapAsync(hostelTypeAndContact));
// router.route("/new/addfacilitiesandrules/:id").post(/*wrapAsync(isLoggedIn),*/ wrapAsync(hostelFacilitesAndRules));
// //router.route("/new/addrules/:hostelId").post(wrapAsync(isLoggedIn), wrapAsync(hostelRules));
// router.route("/new/addimages/:hostelId").post(wrapAsync(isLoggedIn), uploadHostelImages.array("hostelPics", 3) , wrapAsync(hostelImages));
// router.route("/display/all").get(wrapAsync(diplayAllHostels));
// router.route("/display/:hostelId").get(wrapAsync(displayHostelDetail));

export default router;
