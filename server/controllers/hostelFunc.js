import ExpressError from "../middlewares/ExpressError.js";
import { Hostel } from "../dataBase/models/hostelsModel.js";
import { Images } from "../dataBase/models/imagesModel.js";
import { User } from "../dataBase/models/userModel.js";
// New Hostel creation functions
const registerHostel = async (req, res) => {
  let { basicInfo, typeAndContact, facilities, rules, roomCharges, manualAddress } = req.body;

  //parsing data to JSON
  basicInfo = JSON.parse(basicInfo)
  typeAndContact = JSON.parse(typeAndContact)
  facilities = JSON.parse(facilities)
  rules = JSON.parse(rules)
  roomCharges = JSON.parse(roomCharges)
  manualAddress = JSON.parse(manualAddress)
  
  //Saving room data 
  const rooms = roomCharges.map(room => ({
    roomType: room.roomType,
    details: room.detail,
    noOfBeds: parseInt(room.noOfBeds), 
    charges: parseFloat(room.charges) 
  }));

  //Saving data to database
  const hostelBasicInfo = new Hostel({
    title: basicInfo.title,
    description: basicInfo.description,
    HcontactNoP: typeAndContact.HcontactNoP,
    HcontactNoW: typeAndContact.HcontactNoW,
    category: typeAndContact.category,
    city: manualAddress.cityName,
    completeAdress: manualAddress.streetNo,
    province: manualAddress.province,
    country: manualAddress.country,
    facilities,
    rules,
    rooms,
    owner: req.user._id
  });

  const savedHostel = await hostelBasicInfo.save(); // Save the hostel details

  // Update the user model with the registered hostel ID
  await User.findOneAndUpdate(
    { _id: req.user._id }, // Find the user by their ID
    { $addToSet: { registeredHostels: savedHostel._id } } // Add the hostel ID to the registeredHostels array if not already present
  );

  return res.json({
    msg: "saved successfully now add other info",
  });
}

const registerHostelImages = async (req, res) => {
  console.log(req.files)
  return res.json({
    msg: "saved successfully now add other info",
  });
  // if (req.files && req.files.length > 0 || typeof req.file !== 'undefined') {
    //     const findHostel = await Hostel.findById(hostelId);
    
    //     if (!findHostel) {
    //       throw new ExpressError(404,"You have to create account again from start");
    //     }
    
    //     const images = req.files.map((file) => ({
    //       path: file.path,
    //       filename: file.filename,
    //     }));
    
    //     // Save images in the Images model 
    //     let imagesModel = await Images.findByIdAndUpdate(
    //           req.user.userPic,
    //           { $push: { hostelImages: { $each: images } } },
    //           { new: true, useFindAndModify: false }
    //         );
    
    //     // Update Hostel model with the Images model ID
    //     findHostel.hostelImages = imagesModel._id;
    //     await findHostel.save();
    
    //     res.status(201).json({
    //       msg: "Images added successfully",
    //     });
    //   } else {
    //     throw new ExpressError(404, "Please upload atleast one image");
    //   }
}

// const hostelbasicInfo = async (req, res) => {
//   console.log(req.body)
//   const {
//     title,
//     description,
//   } = req.body;
//   if (
//     !title ||
//     !description
//   ) {
//     throw new ExpressError(404, "Please Fill all required fields");
//   } else {
//     const hostelbasicInfo = new Hostel({
//       title,
//       description,
//       // owner: /*req.user._id*/ObjectId('65f428c0ce9c30e0ccd5ab48'),
//     });
//     const { _id } = await hostelbasicInfo.save();

//     return res.json({
//       msg: "saved successfully now add other info",
//       hostelId: _id,
//     });
//   }
// };

// const hostelTypeAndContact = async (req, res) => {
//   console.log(req.body)

//   const {
//     id,
//     HcontactNoP,
//     HcontactNoW,
//     category
//   } = req.body;
//   if (
//     !HcontactNoP ||
//     !category
//   ) {
//     throw new ExpressError(404, "Please Fill all required fields");
//   } else {
//     const hostelType = {
//       HcontactNoP,
//       HcontactNoW,
//       category
//     };

//     const findhostel = await Hostel.findByIdAndUpdate(id, hostelType, {new : true})
//     console.log(findhostel)
//     if(!findhostel){
//       throw new ExpressError(404, "Kindly create account from start");
//     }

//     return res.json({
//       msg: "saved successfully now add other info",
//       hostelId: id,
//     });
//   }
// };

// const hostelFacilitesAndRules = async (req, res) => {
//   const { facilities } = req.body;
//   const { hostelId } = req.params;

//   const findHostel = await Hostel.findByIdAndUpdate(
//     hostelId,
//     { $push: { facilities } },
//     { new: true, useFindAndModify: false }
//   );

//   if (!findHostel) {
//     throw new ExpressError(404, "You have to create account again from start");
//   }
//   res.status(201).json({
//     msg: "Facilites added successfully",
//   });
// };

// const hostelRules = async (req, res) => {
//   const { rules } = req.body;
//   const { hostelId } = req.params;

//   const findHostel = await Hostel.findByIdAndUpdate(
//     hostelId,
//     { $push: { rules } },
//     { new: true, useFindAndModify: false }
//   );

//   if (!findHostel) {
//     throw new ExpressError(404, "You have to create account again from start");
//   }
//   res.status(201).json({
//     msg: "Rules added successfully",
//   });
// };

// const hostelImages = async (req, res) => {
//   const { hostelId } = req.params;
//   if (req.files && req.files.length > 0 || typeof req.file !== 'undefined') {
//     const findHostel = await Hostel.findById(hostelId);

//     if (!findHostel) {
//       throw new ExpressError(404,"You have to create account again from start");
//     }

//     const images = req.files.map((file) => ({
//       path: file.path,
//       filename: file.filename,
//     }));

//     // Save images in the Images model 
//     let imagesModel = await Images.findByIdAndUpdate(
//           req.user.userPic,
//           { $push: { hostelImages: { $each: images } } },
//           { new: true, useFindAndModify: false }
//         );

//     // Update Hostel model with the Images model ID
//     findHostel.hostelImages = imagesModel._id;
//     await findHostel.save();

//     res.status(201).json({
//       msg: "Images added successfully",
//     });
//   } else {
//     throw new ExpressError(404, "Please upload atleast one image");
//   }
// };

// // display all hostels
// const diplayAllHostels = async (req, res) => {
//   const allHostels = await Hostel.find();

//   res.status(200).json({
//     msg : "All hostels are here",
//     allHostels
//   })
// }

// // dispaly hostel detail
// const displayHostelDetail = async (req, res) => {
//   const {hostelId} = req.params;
//   const hostelDetail = await Hostel.findById(hostelId);

//   if(hostelDetail){
//     res.status(200).json({
//       msg : "Hostel detail is as follows",
//       hostelDetail
//     })
//   }else{
//     throw new ExpressError(404, "No hostel detail found")
//   }
// }

// const diplayMyHostel = async (req, res) => {
//   const myHostel = await Hostel.findById(req.hostel._id).populate("hostelImages");

//   if(!myHostel){
//     throw new ExpressError(404, "You have no registered hostel");
//   }
//   res.json({
//     msg : "your hostel detail is here",
//     myHostel
//   })
// }

// export { hostelbasicInfo, hostelTypeAndContact , hostelFacilitesAndRules, hostelRules, hostelImages, diplayAllHostels, displayHostelDetail, diplayMyHostel };
export { registerHostel, registerHostelImages }