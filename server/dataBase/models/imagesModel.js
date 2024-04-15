import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    userImage : {
        path : String,
        filename : String
    },
    hostelImages : [{
        path : String,
        filename : String
    }],
    messImages : [{
        path : String,
        filename : String    
    }],
    postImages : [{
        path : String,
        filename : String
    }]
}, {timestamps : true});

const Images = new mongoose.model("Images", imagesSchema);

export {Images};