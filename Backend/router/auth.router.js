import express from 'express';
import cors from 'cors';
import { login, createUser } from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';
import userDataController from '../controllers/user.data.js';
const router = express.Router();

router.use(cors());

router.post('/login', login);
router.post('/signup', createUser);

router.post(
    "/userdata",
    upload,  // Use the previously configured upload middleware here
    userDataController.saveUserData  // Save the user data after file upload
  );
export default router;