import multer from 'multer';
import path from 'path';

// Set up storage for files (images and video)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Create a unique filename
  },
});

// Define allowed file types for images and video
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Invalid file type. Only image/video files are allowed.'));
  }
};

// Multer configuration to accept multiple image files and a single video file
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: 'images', maxCount: 10 },  // Accept up to 10 images
  { name: 'video', maxCount: 1 },  // Accept only 1 video
]);

export default upload;
