import mongoose, { Schema } from "mongoose";

const hostelSchema = new Schema({
    title : {
     type : String,
     default : "Kindly update title"
    },
    description : {
     type : String,
     default : "Kindly update description"
    },
    HcontactNoP : {
      type : Number,
    }, 
    HcontactNoW : {
      type : Number
    },
    rooms : [{
     roomType : {
      type : String
     },
     details : {
      type : String
     },
     noOfBeds : {
      type : Number
     },
     charges : {
      type : Number
     }
    }],
    category : {
      male : {
        type : Boolean
      },
      female : {
        type : Boolean
      },
      both : {
         type : Boolean
      }
    },
    facilities : [{
     CCTv : {
      type : Boolean
     },
     Wifi : {
      type : Boolean
     },
     Lawn  : {
        type : Boolean,
     },
     UPS_OR_Generator : {
        type :  Boolean
     },
     Laundry : {
        type : Boolean
     },
     Attach_Bath : {
        type : Boolean
     },
     Free_Parking : {
        type : Boolean
     },
     AC : {
        type : Boolean
     },
     Roof_Top : {
        type : Boolean
     },
     Geyser : {
        type : Boolean
     },
     Air_Cooler : {
        type : Boolean
     },
     Kitchen : {
        type : Boolean
     },  
     Gym : {
        type : Boolean
     },
     Outdoor_Sitting : {
        type : Boolean
     },
     Fridge : {
        type : Boolean
     }
    }],
    rules : [{
      Advance_Security : {
        type : Boolean,
     },
     No_Smoking : {
        type : Boolean,
     },
     No_Pets : {
      type : Boolean,
     },
     Paid_Mess : {
      type : Boolean,
     },
     Paid_Parking : {
      type : Boolean,
     },
     Pay_AC_Bill : {
      type: Boolean
     },
     Time_Limits : {
      type: Boolean
     }
    }],
    city : {
      type : String,
      default : "Faisalabad"
    },
    completeAdress :{
      type : String
    },
    province : {
      type : String,
      default : "Punjab"
    },
    country : {
      type : String,
      default : "Pakistan"
    },
    hostelImages : {
      type : Schema.Types.ObjectId,
      ref : "Images"
    },
    owner : {
      type : Schema.Types.ObjectId,
      ref : "User"
    }
},{timestamps : true});

const Hostel = new mongoose.model("Hostel", hostelSchema);

export {Hostel}
