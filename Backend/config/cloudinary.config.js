
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const imageStorage = new CloudinaryStorage({
    //   cloudinary: cloudinary.v2,
    //   params: {
//     folder: "userdata/images", // Folder in Cloudinary
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });

// const videoStorage = new CloudinaryStorage({
    //   cloudinary: cloudinary.v2,
//   params: {
//     folder: "userdata/videos", // Folder in Cloudinary
//     resource_type: "video",
//     allowed_formats: ["mp4", "avi", "mov"],
//   },
// });

// export { cloudinary, imageStorage, videoStorage };


import multer from ('multer');
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage });

const express = require('express');
const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({
    message: 'File uploaded successfully',
    fileUrl: req.file.path, 
  });
});