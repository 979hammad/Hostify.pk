import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    user : {
     type : String,
     required : true
    },
    otp : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : () => new Date()
    },
  
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10*60 });

const OTP = new mongoose.model("userOTP", otpSchema);

export {OTP}
