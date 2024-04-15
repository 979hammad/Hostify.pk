import { Hostel } from "../dataBase/models/hostelsModel.js";
import { User } from "../dataBase/models/userModel.js";
import jwt from "jsonwebtoken";
import ExpressError from "./ExpressError.js";

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  
  if (token) {
    const decodedToken = jwt.verify(token, process.env.jwtkey);
    const loggedInUser = await User.findById(decodedToken.id);
    if (!loggedInUser) {
      throw new ExpressError(403, "You are not allowed");
    }
    req.user = loggedInUser;
    next();
  } else {
    throw new ExpressError(403, "Please login First");
  }
};

const isOwner = async (req, res, next) => {
  const userLoggedInId = req.user._id;

  const hostelFound = await Hostel.findOne({ owner: userLoggedInId });
  if (!hostelFound) {
    // Handle the case where the user is not the owner of any hostel
    return res.status(403).json({ error: "You are not the owner of any hostel." });
  }

  req.hostel = hostelFound;
  next();
};

export { isLoggedIn, isOwner };
