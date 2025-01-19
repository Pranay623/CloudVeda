import express from 'express';
import getImageDataByExpertId from '../controllers/getUserData.controller.js';

const router = express.Router();

// Route to get image data by expert_id
router.get('/image-data', getImageDataByExpertId);

export default router;
