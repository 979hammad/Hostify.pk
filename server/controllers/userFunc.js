import { User } from "../dataBase/models/userModel.js";
import { Images } from "../dataBase/models/imagesModel.js";
import bcrypt from "bcrypt";
import ExpressError from "../middlewares/ExpressError.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import { OTP } from "../dataBase/models/userOtpModel.js";

const userSignUp = async (req, res) => {
  const {email, password} = req.body
  if (
    !email ||
    !password 
  ) {
    throw new ExpressError(400, "Please Enter all required fields");
  } else {
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new ExpressError(404, "Email already registered kindly login");
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save the image in the Images model
      // let userImage;
      // if (req.file) {
      //   const { path, filename } = req.file;
      //   userImage = new Images({ userImage: { path, filename } });
      //   await userImage.save();
      // }else{
      //   const path = "https://res.cloudinary.com/dni5tyfft/image/upload/v1700908646/hostify.pk%5BUserImages%5D/tvqwpi9qzkjxyqjzl9ar.png";
      //   const filename = "hostify.pk[UserImages]/tvqwpi9qzkjxyqjzl9ar";
      //   userImage = new Images({ userImage: { path, filename } });
      //   await userImage.save();
      // }

      
      const dataToSave = new User({
        email,
        password: hashedPassword,
        // userPic: userImage ? userImage : null,
      });
      const transporter = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        auth: {
          user: "979hammadakram@gmail.com" ,
          pass: "proqlgznxvtaeopg",
        },
      });
    
      const otp = Math.floor(1000 + Math.random() * 9000)
      const mailOptions  = {
        from: {
          name : "Hostify.pk",
          address : "979hammadakram@gmail.com"
        },
        to: email, // list of receivers
        subject: "OTP-SignUp[Hostify.pk]", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b>Your OTP is ${otp}</b>`, // html body
      }
    
    
      const sendMail = async(transporter, mailOptions) => {
       
        try{
         await transporter.sendMail(mailOptions);
        }catch(error){
          console.log(error)
        }
      }    
      await sendMail(transporter, mailOptions); 

      const newUser = await dataToSave.save();
      const token = jwt.sign({ id: newUser._id }, process.env.jwtkey);
      const otpData = new OTP({
        otp,
        user : newUser._id,
      })
      await otpData.save();
      res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      res.status(201).json({
        success: true,
        // token,
        newUser,
      });
    } else {
      throw new ExpressError(400, "Password and Confirm Password don't match");
    }
  }
};

const verifyOtp = async (req,res) => {
    const {otp, userId} = req.body;
    const otpExists = await OTP.findOne({user : userId});
    
    if(!otpExists){
      await User.deleteOne({ _id : userId });
      throw new ExpressError(400, "InValid OTP, Register agian");
    }

    if(parseInt(otpExists.otp) === parseInt(otp)){
      await User.findByIdAndUpdate(userId, { verified: true });
      await OTP.deleteOne({ user: userId });

      return res.status(200).json({ success: true });
    }else{
      await User.deleteOne({ _id : userId });
      await OTP.deleteOne({ user: userId });
      throw new ExpressError(400, "InValid OTP, Register agian");
    }
   
}

const userLogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ExpressError(400, "Please enter both email and password");
  } else {
    const userFound = await User.findOne({ email });
    if (userFound) {
      const passwordMatched = await bcrypt.compare(
        password,
        userFound.password
      );
      if (passwordMatched) {
        const token = jwt.sign({ id: userFound._id }, process.env.jwtkey);
        res.status(200).json({
          success: true,
          token,
          userFound,
        });
      } else {
        throw new ExpressError(401, "Password or Email is incorrect");
      }
    } else {
      throw new ExpressError(401, "Email not registered");
    }
  }
};

// const userLogOut = async (req, res) => {
//   res.cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) });
//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully",
//   });
// };

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, cNewPassword } = req.body;
  if (!oldPassword || !newPassword || !cNewPassword) {
    throw new ExpressError(401, "Please fill all required password feilds");
  } else {
    const loggedInUser = req.user;
    const userFound = await User.findById(loggedInUser.id);
    const passwordMatched = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );
    if (!passwordMatched) {
      throw new ExpressError(403, "Please Enter correct Old password");
    } else {
      if (newPassword == cNewPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        userFound.password = hashedPassword;
        await userFound.save();
        res.status(200).json({
          success: true,
          msg: "Password changed successfully",
        });
      } else {
        throw new ExpressError(
          400,
          "Please Enter New Password and Confirm Password same"
        );
      }
    }
  }
};

const myProfile = async (req, res) => {
  const userFound = await User.findById(req.user.id, {
    password: 0,
  }).populate("userPic");

  res.status(200).json({
    success: true,
    user: userFound,
  });
};

const editProfile = async (req, res) => {
  const { fName, lName, dob, gender, city, province } = req.body;
  const loggedInUser = await User.findById(req.user.id);

  if (fName) loggedInUser.fName = fName;
  if (lName) loggedInUser.lName = lName;
  if (city) loggedInUser.city = city;
  if (dob) loggedInUser.dob = dob;
  if (gender) loggedInUser.gender = gender;
  if (province) loggedInUser.province = province;

  const updatedUser = await loggedInUser.save();
  res.status(200).json({
    success: true,
    user: updatedUser,
  });
};

const changeProfileImage = async (req, res) => {
  if (typeof req.file !== "undefined") {
    const { path, filename } = req.file;
    const previousImg = await Images.findById(req.user.userPic);

    // Deleting previous image from cloudinary
    await cloudinary.uploader.destroy(previousImg.userImage.filename);

    // Updating image link in database
    previousImg.userImage.path = path;
    previousImg.userImage.filename = filename;

    await previousImg.save();
    res.status(200).json({
      success: true,
      msg: "Image updated successfully",
    });
  }

  throw new ExpressError(400, "To change image please select new one");
};

const deleteUserAccount = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if(req.user.userPic){
    const imagesFound = await Images.findById(req.user.userPic);
    if(imagesFound.userImage.filename !== "userImage"){
      // Deleting user image from cloudinary storage
      await cloudinary.uploader.destroy(imagesFound.userImage.filename);
    }
    await imagesFound.deleteOne();
  }

  // Deleting data from database
  await userFound.deleteOne();

  return res.status(200).json({
    success: true,
    msg: "Account deleted",
  });
};

export {
  userSignUp,
  verifyOtp,
  userLogIn,
  changePassword,
  myProfile,
  editProfile,
  changeProfileImage,
  deleteUserAccount,
};
