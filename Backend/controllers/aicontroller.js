// import { textOnly } from "../utils/textOnly.js";  // Assuming textOnly handles plain text generation

// export const aiController = async (req, res) => {
//   const { modelType, imageId, prompt } = req.body; // Assuming prompt is passed with the request

//   if (modelType === "text_only") {
//     // Fetch image data for Ayurvedic input
//     const imageData = await ImageData.findById(imageId).populate("user_id");
//     console.log(imageData);

//     if (!imageData) {
//       return res.status(404).json({ message: "Image data not found" });
//     }

//     // Map ImageData to Ayurvedic input
//     const ayurvedicInput = {
//       skinTone: imageData.skintone,
//       skinExpression: imageData.expression,
//       skinTexture: imageData.skin_texture,
//       darkCircles: imageData.dark_circles,
//       spots: imageData.spots,
//       wrinkles: imageData.wrinkles,
//       faceShape: imageData.face_shape,
//       symmetry: imageData.symmetry,
//       healthStatus: imageData.overall_health,
//     };

//     // Send the Ayurvedic input as the prompt
//     const botReply = await textOnly(ayurvedicInput);

//     if (botReply?.Error) {
//       return res.status(404).json({ Error: botReply.Error });
//     }

//     res.status(200).json({ result: botReply.result });

//   } else {
//     res.status(404).json({ result: "Invalid Model Selected" });
//   }
// };

import axios from 'axios';
import ImageData from '../models/ImageData.js';

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiEndpoint = 'https://api.gemini.example.com/v1/generate';

const getGeminiResponse = async (req, res) => {
  try {
    // Ensure the user ID exists
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found. Please ensure you are authenticated.' });
    }

    // Fetch or create ImageData
    let imageData = await ImageData.findOne({ user_id: userId });
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

    // Call the Gemini API
    const response = await axios.post(geminiEndpoint, {
      headers: {
        'Authorization': `Bearer ${geminiApiKey}`,
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

export default { getGeminiResponse };
