import { User } from "../dataBase/models/userModel.js";
import { Images } from "../dataBase/models/imagesModel.js";
import { Hostel } from "../dataBase/models/hostelsModel.js";
import bcrypt from "bcrypt";
import ExpressError from "../middlewares/ExpressError.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import { OTP } from "../dataBase/models/userOtpModel.js";
import { data } from "../modules/helper.js";

const userSignUp = async (req, res) => {
  const { email, password, cPassword } = req.body
  if (
    !email ||
    !password ||
    !cPassword
  ) {
    throw new ExpressError(400, "Please Enter all required fields");
  } else {
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new ExpressError(404, "Email already registered kindly login");
    }
    if (password === cPassword) {
      const salt = await bcrypt.genSalt();
      data(salt)
      const hashedPassword = await bcrypt.hash(password, salt);

      const dataToSave = new User({
        email,
        password: hashedPassword,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "979hammadakram@gmail.com",
          pass: "uzfumoyxpemzoqrt",
        },
      });

      const otp = Math.floor(1000 + Math.random() * 9000)
      const mailOptions = {
        from: {
          name: "Hostify.pk",
          address: "979hammadakram@gmail.com"
        },
        to: email, // list of receivers
        subject: "Your Hostify.pk Login OTP", // Subject line
        // text: "Hello world?", // plain text body
        html:
          `<b>otp is: ${otp}</b>`, // html body
      }

      const sendMail = async (transporter, mailOptions) => {
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.log(error)
        }
      }

      await sendMail(transporter, mailOptions);

      const newUser = await dataToSave.save();
      // const token = jwt.sign({ id: newUser._id }, process.env.jwtkey);
      const otpData = new OTP({
        otp,
        user: newUser._id,
      })
      await otpData.save();
      // res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      res.status(201).json({
        success: true,
        newUser
      });
    } else {
      throw new ExpressError(400, "Password and Confirm Password don't match");
    }
  }
};

const verifyOtp = async (req, res) => {
  const { otp, userId } = req.body;

  const otpExists = await OTP.findOne({ user: userId });
  console.log(otpExists)
  if (!otpExists) {
    await User.deleteOne({ _id: userId });
    await OTP.deleteOne({ user: userId });
    throw new ExpressError(400, "InValid OTP, Register agian");

  }

  if (parseInt(otpExists.otp) === parseInt(otp)) {

    const newUser = await User.findByIdAndUpdate(userId, { verified: true });
    const token = jwt.sign({ id: newUser._id }, process.env.jwtkey);

    await OTP.deleteOne({ user: userId });

    return res.status(200).json({
      success: true,
      token,
      newUser
    });
  } else {
    await User.deleteOne({ _id: userId });
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
      if (!userFound.password) {
        throw new ExpressError(404, "Kindly login with google as before")
      }
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
  await Hostel.deleteMany({owner : req.user.id})
  await User.findByIdAndDelete(req.user.id);

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
