import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
cloud_name : process.env.cloudName,
    api_key : process.env.apiKey,
    api_secret : process.env.apiSecret
})    

const userImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'hostify.pk[UserImages]',
      allowedFormats: ["png", "jpg", "jpeg"]
    }
});

const hostelImagesStorage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
      folder: "hostify.pk[HostelImages]",
      allowedFormats : ["png", "jpg", "jpeg"]
    }
})

export {userImageStorage, hostelImagesStorage};