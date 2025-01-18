import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "userdata/images", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "userdata/videos", // Folder in Cloudinary
    resource_type: "video",
    allowed_formats: ["mp4", "avi", "mov"],
  },
});

export { cloudinary, imageStorage, videoStorage };
