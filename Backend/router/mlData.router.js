import express from 'express';
import { saveImageData } from '../controllers/mlData.controller.js';
import { mlresponse } from '../controllers/mlData.controller.js';
import { getHealthAnalysis } from '../controllers/mlData.controller.js';

const router = express.Router();

router.post('/img', saveImageData);
router.post('/ml',mlresponse)
router.get('/health-analysis', getHealthAnalysis);


export default router;