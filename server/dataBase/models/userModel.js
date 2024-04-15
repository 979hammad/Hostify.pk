import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId : {
        type : String
    },
    fName: {
        type: String,
        min: 3,
        max: 20
    },
    lName: {
        type: String,
        min: 3,
        max: 20
    },
    gender : {
        type : String
    },
    city :{
        type  : String
    },
    district : {
        type : String
    },
    province : {
        type : String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pNumber: {
        type: Number,
    },
    userPic: {
        type: Schema.Types.ObjectId,
        ref: "Images"
    },
    city: {
        type: String,
    },
    dob: {
        type : Date
    },
    province: {
        type: String,

    },
    password: {
        type: String,
        min: 5
    },
    role: {
        type: String,
        default: "user"
    },
    registeredHostels : [{
        type : Schema.Types.ObjectId,
        ref : "Hostel"
    }],
    // registeredHomes : {
    //     type : Schema.Types.ObjectId,
    //     ref : "Images"
    // },
    // registeredMess : {
    //     type : Schema.Types.ObjectId,
    //     ref : "Images"
    // },
    verified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const User = new mongoose.model("User", userSchema);

export { User };
