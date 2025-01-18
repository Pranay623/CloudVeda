// import "dotenv/config";
// import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// export const aiConfig = {
//   gemini: {
//     textOnlyModel: "gemini-1.5-flash",
//     textAndImageModel: "gemini-1.5-flash",
//     apiKey: process.env.GEMINI_API_KEY,

//     // Gemini Safety Settings
//     safetySettings: [
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ],
    
//   },
// };


import axios from 'axios';
import ImageData from '../models/ImageData';

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiEndpoint = 'https://api.gemini.example.com/v1/generate';

const getGeminiResponse = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found. Please ensure you are authenticated.' });
    }

    const imageData = await ImageData.findOne({ user_id: userId });
    if (!imageData) {
      return res.status(404).json({ error: 'Image data not found for the user.' });
    }

    const ayurvedicInput = {
      skinTone: imageData.skintone,
      skinExpression: imageData.expression,
      skinTexture: imageData.skin_texture,
      darkCircles: imageData.dark_circles,
      spots: imageData.spots,
      wrinkles: imageData.wrinkles,
      faceShape: imageData.face_shape,
      symmetry: imageData.symmetry,
      healthStatus: imageData.health_index,
    };

    const response = await axios.post(geminiEndpoint, {
      headers: {
        Authorization: `Bearer ${geminiApiKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        prompt: ayurvedicInput,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Failed to generate response from Gemini.',
      message: error.response ? error.response.data : error.message,
    });
  }
};

export default { getGeminiResponse }; // Export as an object
