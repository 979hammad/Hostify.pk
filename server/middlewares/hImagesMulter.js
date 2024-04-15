import multer from "multer";
import fs from 'fs';
import path from "path";

// Get the directory path of the current module
const currentDir = decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

// Resolve the absolute path to the HostelImages directory
const uploadDir = path.resolve(currentDir, '..', 'HostelImages');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Specify the destination directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Define the file name
    }
});

// Configuring multer for uploading multiple images
const upload = multer({ storage: storage, limits: { files: 3 } }).array('hostelPics', 3);

export default upload;
