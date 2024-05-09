import express from 'express';
import passport from 'passport';
import { User } from '../dataBase/models/userModel.js';
import { Images } from '../dataBase/models/imagesModel.js';
import jwt from "jsonwebtoken";
const router = express.Router();

router.route("/login/success").get(async(req, res) => {
  try {
    if (req.user) {
      const { id, name, emails } = req.user;
      const { familyName, givenName } = name;
      
      // Check if user exists in the database
      let user = await User.findOne({ googleId: id });
      console.log(user);

      if (!user) {
        // If user doesn't exist, create a new user record
        const path = req.user._json.picture;
  
        const dataToSave = new User({
          googleId: id,
          fName: givenName, 
          lName: familyName, 
          email: emails[0].value, 
          userPic: path,
          verified: true 
        });
      
        await dataToSave.save();
      }
      const idd = user._id;
      const token = jwt.sign({ id: idd }, process.env.jwtkey)
      // Send success response along with user data
      return res.status(200).json({
        success: true,
        user: req.user,
        token: token
      });
      
    } else {
      return res.status(401).json({
        success: false,
        message: "User data not available"
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error processing login"
    });
  }
});

router.route("/login/failed").get((req, res) => {
  res.status(401).json({
    success: false,
    message: "failure"
  });
});

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("http://localhost:5173");
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:5173', 
  failureRedirect: '/login/failed',  
}));


export default router;
