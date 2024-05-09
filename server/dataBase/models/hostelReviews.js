import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User" 
   },
   hostel: {
      type: Schema.Types.ObjectId,
      ref: "Hostel" 
   },
   rating: {
      type: Number,
      required: true
   },
   comment: {
      type: String,
      required: true
   }
}, { timestamps: true });

const HostelReview = mongoose.model("HostelReview", reviewSchema);

export { HostelReview };
