// import express from "express";
// // import { analyzeAyurvedicPrinciples } from "../utils/chatbot.js";
// import { aiController } from "../controllers/aicontroller.js";

// const router = express.Router();

// // Route to analyze Ayurvedic principles based on ImageData
// router.post("/analyze", aiController);

// export default router;

import express from 'express';
import getGeminiResponse from '../controllers/aicontroller.js';

const router = express.Router();

// Define the POST route for generating a response using the Gemini model
router.post('/', getGeminiResponse);

module.exports = router;
