import express from 'express';
import { saveImageData } from '../controllers/mlData.controller.js';

const router = express.Router();

router.post('/', saveImageData);

export default router;